# Axyntra Website with Editable Backend

## Install

1. `cd c:\Users\MacBook\Desktop\Axyntra\Website`
2. `npm install`
3. `npm run start`
4. Open `http://localhost:3000` for frontend
5. Open `http://localhost:3000/admin.html` for project management

## Backend endpoints

- GET `/api/site` - full site data
- GET `/api/projects` - product project list
- POST `/api/projects` - add new project
- PUT `/api/projects/:id` - update project
- DELETE `/api/projects/:id` - delete project

## Data store

- `data/site-data.json` contains all content persisted on disk.

## Notes

- Frontend product cards are rendered from API and reflect edits instantly.
- Use `admin.html` to add, delete projects without code deploy.
