const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { initDB, getDB } = require('./database.js');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'axyntra-super-secret-key';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Static Files
app.use(express.static(__dirname));

// --- AUTHENTICATION & MIDDLEWARE ---
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
    res.cookie('auth_token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.json({ success: true, message: 'Logged in successfully' });
  }
  return res.status(401).json({ error: 'Invalid password' });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('auth_token');
  res.json({ success: true });
});

app.get('/api/check-auth', (req, res) => {
  const token = req.cookies.auth_token;
  if (!token) return res.json({ authenticated: false });
  try {
    jwt.verify(token, JWT_SECRET);
    res.json({ authenticated: true });
  } catch (e) {
    res.json({ authenticated: false });
  }
});

// Auth Middleware for protected routes
function requireAuth(req, res, next) {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// --- SITE DATA API (PUBLIC READ) ---
app.get('/api/site', async (req, res) => {
  try {
    const db = getDB();
    const hero = await db.get('SELECT * FROM hero WHERE id = 1');
    const why = await db.all('SELECT * FROM why_items');
    const learn = await db.all('SELECT * FROM learn_items');
    
    res.json({ hero, why, learn });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed' });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const db = getDB();
    const projects = await db.all('SELECT * FROM projects');
    const specs = await db.all('SELECT * FROM project_specs');

    const formattedProjects = projects.map(p => {
      return {
        ...p,
        specs: specs
          .filter(s => s.project_id === p.id)
          .map(s => ({ key: s.spec_key, value: s.spec_value }))
      };
    });

    res.json(formattedProjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed' });
  }
});

// --- PROTECTED ADMIN APIs ---

app.put('/api/site/hero', requireAuth, async (req, res) => {
  try {
    const db = getDB();
    const { kicker, title, subtitle } = req.body;
    let updateFields = [];
    let queryParams = [];

    if (kicker !== undefined) { updateFields.push('kicker = ?'); queryParams.push(kicker); }
    if (title !== undefined) { updateFields.push('title = ?'); queryParams.push(title); }
    if (subtitle !== undefined) { updateFields.push('subtitle = ?'); queryParams.push(subtitle); }

    if (updateFields.length > 0) {
      const query = `UPDATE hero SET ${updateFields.join(', ')} WHERE id = 1`;
      await db.run(query, queryParams);
    }
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update hero' });
  }
});

app.post('/api/site/why', requireAuth, async (req, res) => {
  const { icon, title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  
  try {
    const db = getDB();
    const result = await db.run('INSERT INTO why_items (icon, title, description) VALUES (?, ?, ?)', [icon || '', title, description || '']);
    
    res.status(201).json({
      id: result.lastID,
      icon: icon || '',
      title,
      description: description || ''
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

app.delete('/api/site/why/:id', requireAuth, async (req, res) => {
  try {
    const db = getDB();
    const result = await db.run('DELETE FROM why_items WHERE id = ?', [req.params.id]);
    if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

app.post('/api/site/learn', requireAuth, async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  
  try {
    const db = getDB();
    const result = await db.run('INSERT INTO learn_items (title, description) VALUES (?, ?)', [title, description || '']);
    
    res.status(201).json({
      id: result.lastID,
      title,
      description: description || ''
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

app.delete('/api/site/learn/:id', requireAuth, async (req, res) => {
  try {
    const db = getDB();
    const result = await db.run('DELETE FROM learn_items WHERE id = ?', [req.params.id]);
    if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

app.post('/api/projects', requireAuth, async (req, res) => {
  const { name, tag, tagClass, price, description, specs } = req.body;
  if (!name || !description) return res.status(400).json({ error: 'name and description required' });
  
  try {
    const db = getDB();
    await db.exec('BEGIN TRANSACTION');
    
    const result = await db.run(
      'INSERT INTO projects (name, tag, tagClass, price, description) VALUES (?, ?, ?, ?, ?)',
      [name, tag || 'New', tagClass || 'tag-n', price || 'Contact for pricing', description]
    );
    
    const projectId = result.lastID;
    
    if (specs && Array.isArray(specs)) {
      for (const spec of specs) {
        await db.run('INSERT INTO project_specs (project_id, spec_key, spec_value) VALUES (?, ?, ?)', [projectId, spec.key, spec.value]);
      }
    }
    
    await db.exec('COMMIT');
    
    res.status(201).json({
      id: projectId,
      name,
      tag: tag || 'New',
      tagClass: tagClass || 'tag-n',
      price: price || 'Contact for pricing',
      description,
      specs: specs || []
    });
  } catch (err) {
    const db = getDB();
    await db.exec('ROLLBACK');
    res.status(500).json({ error: 'Failed' });
  }
});

app.delete('/api/projects/:id', requireAuth, async (req, res) => {
  try {
    const db = getDB();
    const result = await db.run('DELETE FROM projects WHERE id = ?', [req.params.id]);
    if (result.changes === 0) return res.status(404).json({ error: 'Project not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

// --- INQUIRIES API ---

app.post('/api/inquiries', async (req, res) => {
  const { firstName, lastName, email, role, interest, message } = req.body;
  if (!email || !message) return res.status(400).json({ error: 'Email and message required' });
  
  try {
    const db = getDB();
    const date = new Date().toISOString();
    const result = await db.run(
      'INSERT INTO inquiries (firstName, lastName, email, role, interest, message, date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [firstName || '', lastName || '', email, role || '', interest || '', message, date]
    );
    res.status(201).json({ success: true, id: result.lastID });
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

app.get('/api/inquiries', requireAuth, async (req, res) => {
  try {
    const db = getDB();
    const inquiries = await db.all('SELECT * FROM inquiries ORDER BY date DESC');
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

app.delete('/api/inquiries/:id', requireAuth, async (req, res) => {
  try {
    const db = getDB();
    const result = await db.run('DELETE FROM inquiries WHERE id = ?', [req.params.id]);
    if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Failed to initialize database:", err);
});
