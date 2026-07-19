# Rules & Guidelines

## Technologies & Libraries
- **Use**: Vanilla HTML, CSS, and JavaScript (ES6+). No frameworks (React, Vue, Angular) unless explicitly requested.
- **Allowed CSS**: Custom CSS, CSS Variables, Flexbox, Grid. No TailwindCSS unless user asks.
- **Node.js**: Express.js for the backend, `better-sqlite3` for SQLite access.
- **Email**: Nodemailer only.
- **Testing**: Jest for unit tests (optional).

## What to Avoid
- Large bundlers (Webpack, Vite) for the simple front‑end.
- Deprecated packages or those with known security vulnerabilities.
- Inline styles; prefer external CSS files.
- Unchecked user input – always validate/sanitize on server side.
- AI‑generated code that bypasses security or writes to the filesystem without explicit permission.

## Error Handling
- Return proper HTTP status codes (`400` for validation errors, `500` for server errors).
- Use a global Express error‑handling middleware.
- Log errors to the console with clear messages; never expose stack traces to the client.

## AI Boundaries
- The assistant may suggest code snippets, but **must not execute commands** that modify the user's system without explicit approval.
- Do not write files outside the artifact directory unless the user grants permission.
- Do not make network calls that could expose sensitive data without user consent.
- All AI‑generated content should be reviewed by the user before being committed to the codebase.
