# Rules & Conventions — Purvik Prajapati Portfolio

## Code Style

- **TypeScript strict mode** — all components fully typed
- **Path alias** — always use `@/` (e.g. `@/components/ui/GlassCard`)
- **No inline styles** — use Tailwind utility classes or CSS variables
- **Client components** — mark with `'use client'` only when using hooks, browser APIs, or Framer Motion
- **Server components** — API routes (`app/api/`) are server-only, no browser APIs

## Component Conventions

- All section components live in `components/sections/`
- All reusable UI primitives live in `components/ui/`
- Canvas/WebGL elements live in `components/canvas/`
- Layout wrappers live in `components/layout/`

## Data Conventions

- All portfolio content lives in `data/portfolioData.ts`
- Add interfaces before data constants
- Never hardcode personal info inside components — always import from `portfolioData.ts`

## Design Conventions

- Use `GlassCard` for all card-style containers
- Use `Badge` for all category/status chips
- Use `gradient-text` class for section headline accents
- Section headings pattern: white text + `<span className="gradient-text">accent word</span>`
- Section intro badge pattern: gold border pill with `ChevronRight` icon + uppercase tracking

## Animation Conventions

- All scroll-triggered animations use Framer Motion `useInView` with `{ once: true }`
- Stagger delay: `index * 0.08` to `index * 0.1`
- Entry animation: `opacity: 0, y: 28` → `opacity: 1, y: 0`
- Duration: `0.5s` for cards, `0.6s` for headings

## Sections (Live)

| Section | File | Nav Link |
|---|---|---|
| Hero | `Hero.tsx` | — |
| Projects | `Projects.tsx` | `#projects` |
| Skills | `TechStack.tsx` | `#skills` |
| Experience | `Experience.tsx` | `#experience` |
| Blog | `BlogSection.tsx` | — |
| Contact | `Contact.tsx` | `#contact` |

> **Removed sections**: Research & Findings

## Running & Deploying

```bash
# Development
npm run dev

# Type check
npx tsc --noEmit

# Production build
npm run build
npm start
```

## File Encoding

- All files must be saved as **UTF-8 without BOM**
- PowerShell `Set-Content` adds BOM — use Node.js `fs.writeFileSync` or the agent write tools instead
