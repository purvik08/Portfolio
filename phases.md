# Build Phases — Purvik Prajapati Portfolio v2.0

## Phase 1 — Foundation ✅ Complete

- [x] Next.js 15 project setup
- [x] TypeScript config (`tsconfig.json`) with `@/*` alias
- [x] Tailwind CSS config with Charcoal & Gold tokens
- [x] PostCSS config
- [x] `next.config.mjs` build configuration
- [x] `lib/utils.ts` — `cn()` utility
- [x] `data/portfolioData.ts` — complete structured data layer

## Phase 2 — Core UI Primitives ✅ Complete

- [x] `components/ui/GlassCard.tsx` — glassmorphic card
- [x] `components/ui/Badge.tsx` — category chips
- [x] `components/ui/CommandPalette.tsx` — Ctrl+K overlay
- [x] `components/canvas/ParticleBg.tsx` — Canvas particle system
- [x] `components/layout/LenisProvider.tsx` — smooth scroll
- [x] `components/layout/CustomCursor.tsx` — animated cursor

## Phase 3 — Global Styles & Layout ✅ Complete

- [x] `app/globals.css` — full design system CSS
- [x] `app/layout.tsx` — root layout with fonts + SEO metadata

## Phase 4 — Sections ✅ Complete

- [x] `Navbar.tsx` — sticky glass nav, mobile menu, active detection
- [x] `Hero.tsx` — typing animation, stats, CTA
- [x] `Projects.tsx` — filterable cards, metrics, search
- [x] `TechStack.tsx` — skill bars, category cards, marquee
- [x] `Experience.tsx` — alternating timeline
- [x] `BlogSection.tsx` — categorized blog cards
- [x] `Contact.tsx` — form + sidebar + socials
- [x] `Footer.tsx` — footer with back-to-top

## Phase 5 — API Routes ✅ Complete

- [x] `app/api/contact/route.ts` — form submission handler
- [x] `app/api/github/route.ts` — GitHub stats proxy (ISR)

## Phase 6 — Assembly & Verification ✅ Complete

- [x] `app/page.tsx` — main page assembled
- [x] BOM encoding fixed on all config files
- [x] Dev server running: **HTTP 200** ✅
- [x] Compiled: **1,444 modules**, no errors

## Phase 7 — Content Adjustments ✅ Complete

- [x] Removed "AI / ML & Computer Vision Specialist" from hero subtitles
- [x] Removed Research & Findings section (page, navbar, command palette)
- [x] Updated all MD documentation files

## Phase 8 — Manual File Updates & Documentation Sync ✅ Complete

- [x] User updated source files (components, data, styles)
- [x] `memory.md` — updated to reflect Next.js architecture (removed legacy static file references)
- [x] `architecture.md` — library versions updated to match actual `package.json` (`next@15.5.22`, `react@19.2.8`, added gsap/cmdk/three)
- [x] All section components verified: Hero, Navbar, Projects, TechStack, Experience, BlogSection, Contact, Footer, Footer
- [x] `data/portfolioData.ts` — verified: 5 projects, 4 skill categories, 2 education entries, 2 research items, 2 blog posts

## Phase 9 — Future Improvements (Backlog)

- [ ] EmailJS integration for contact form
- [ ] GitHub stats displayed on page (public repos, followers)
- [ ] Dark/light mode toggle
- [ ] Project detail pages (`/projects/[slug]`)
- [ ] Blog post full pages (`/blog/[slug]`)
- [ ] Lighthouse audit & performance tuning
- [ ] Vercel deployment
- [ ] Analytics integration
