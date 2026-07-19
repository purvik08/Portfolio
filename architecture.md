# Architecture Document

## Application Flow
- **Client** (browser) → **Static assets** (HTML/CSS/JS) served via Express.
- **Server** (Node.js) handles API routes for admin CRUD operations and inquiry persistence.
- **Database** (SQLite) stores site content and inquiry records.
- **Authentication** uses JWT for admin sessions.

## Architecture Overview
- **Presentation Layer** – HTML5, CSS3, vanilla JavaScript (or optionally Vite for bundling).
- **Backend Layer** – Express.js, RESTful endpoints, middleware for validation and auth.
- **Data Layer** – SQLite accessed via `better-sqlite3` with prepared statements.
- **Deployment** – Can be hosted on any static‑file + Node server (e.g., Render, Railway).

## Folder & File Structure
```
project-root/
│   package.json
│   server.js               # Express entry point
│   db.js                   # SQLite wrapper
│   .env                    # Environment variables
└───public/                # Static assets served to client
│   │   index.html
│   │   styles.css
│   │   app.js
└───src/                    # Server‑side source code
    │   routes/
    │   controllers/
    │   models/
    │   middleware/
    └   utils/
```

## Tech Stack
- **Core**: HTML, CSS, JavaScript
- **Server**: Node.js ≥ 20, Express.js
- **Database**: SQLite (via `better-sqlite3`)
- **Auth**: JSON Web Tokens (jwt)
- **Build (optional)**: Vite for modern module bundling
- **Version Control**: Git

---
*Document created by Antigravity agent.*
