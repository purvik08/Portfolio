const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'database.sqlite');
const legacyDataPath = path.join(__dirname, 'data', 'site-data.json');

let dbInstance = null;

async function initDB() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await db.exec('PRAGMA foreign_keys = ON');

  // Create tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS hero (
      id INTEGER PRIMARY KEY,
      kicker TEXT,
      title TEXT,
      subtitle TEXT
    );

    CREATE TABLE IF NOT EXISTS why_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      icon TEXT,
      title TEXT,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS learn_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      tag TEXT,
      tagClass TEXT,
      price TEXT,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS project_specs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER,
      spec_key TEXT,
      spec_value TEXT,
      FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      email TEXT,
      role TEXT,
      interest TEXT,
      message TEXT,
      date TEXT
    );
  `);

  // Migration from JSON
  const rowCount = await db.get('SELECT COUNT(*) as count FROM hero');
  if (rowCount.count === 0 && fs.existsSync(legacyDataPath)) {
    console.log('Migrating legacy JSON data to SQLite...');
    try {
      const raw = fs.readFileSync(legacyDataPath, 'utf8');
      const data = JSON.parse(raw);

      if (data.hero) {
        await db.run('INSERT INTO hero (id, kicker, title, subtitle) VALUES (1, ?, ?, ?)', 
          [data.hero.kicker, data.hero.title, data.hero.subtitle]);
      } else {
        await db.run('INSERT INTO hero (id, kicker, title, subtitle) VALUES (1, "", "", "")');
      }

      if (data.why) {
        for (const item of data.why) {
          await db.run('INSERT INTO why_items (icon, title, description) VALUES (?, ?, ?)',
            [item.icon, item.title, item.description]);
        }
      }

      if (data.learn) {
        for (const item of data.learn) {
          await db.run('INSERT INTO learn_items (title, description) VALUES (?, ?)',
            [item.title, item.description]);
        }
      }

      if (data.projects) {
        for (const p of data.projects) {
          const res = await db.run('INSERT INTO projects (name, tag, tagClass, price, description) VALUES (?, ?, ?, ?, ?)',
            [p.name, p.tag, p.tagClass, p.price, p.description]);
          const projectId = res.lastID;
          if (p.specs && p.specs.length > 0) {
            for (const spec of p.specs) {
              await db.run('INSERT INTO project_specs (project_id, spec_key, spec_value) VALUES (?, ?, ?)',
                [projectId, spec.key, spec.value]);
            }
          }
        }
      }

      if (data.inquiries) {
        for (const i of data.inquiries) {
            await db.run('INSERT INTO inquiries (firstName, lastName, email, role, interest, message, date) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [i.firstName, i.lastName, i.email, i.role, i.interest, i.message, i.date]);
        }
      }
      console.log('Migration complete.');
    } catch(e) {
      console.error('Migration failed:', e);
    }
  }

  dbInstance = db;
  return db;
}

function getDB() {
  if (!dbInstance) {
    throw new Error('Database not initialized');
  }
  return dbInstance;
}

module.exports = {
  initDB,
  getDB
};
