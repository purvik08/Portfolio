# Architecture Document — Purvik Prajapati Portfolio

## Application Flow
- **Client (Browser)** → Static portfolio assets (`index.html`, `portfolio.css`, `portfolio.js`, `Resume/Purvik-Resume-2.1.pdf`).
- **Server (Node.js/Express)** → Serves static portfolio files and handles `/api/inquiries` POST route.
- **Database (SQLite)** → Stores received inquiry messages in `data/database.sqlite`.

## Architecture Overview
- **Presentation Layer** – Semantic HTML5, CSS3 (Charcoal & Gold luxury theme), Vanilla ES6+ JavaScript.
- **Backend Layer** – Express.js server (`server.js`) providing CORS, JSON parsing, static serving, and inquiry persistence.
- **Data Layer** – SQLite database accessed via `database.js` (`sqlite` and `sqlite3` driver).

## Folder & File Structure
```
c:\Users\MacBook\Desktop\Axyntra\Website\
│   index.html              # Main portfolio landing page
│   portfolio.html          # Portfolio HTML template
│   portfolio.css           # Portfolio design system & luxury styling
│   portfolio.js            # Active scroll spy, mobile menu, modal & form logic
│   server.js               # Node.js Express server entry point
│   database.js             # SQLite database initialization & helper methods
│   package.json            # Dependencies & scripts
│
├───Resume/
│       Purvik-Resume-2.1.pdf # Official PDF Resume
│
└───data/
        database.sqlite     # Persistent SQLite database store
```

## Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Fonts**: Google Fonts (Syne, Inter)
