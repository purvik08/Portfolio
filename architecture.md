# Architecture — Purvik Prajapati Portfolio v2.0

## Framework

**Next.js 15** (App Router) with **React 19** and **TypeScript**

---

## Directory Architecture

```
Website/
├── app/                          # Next.js App Router
│   ├── globals.css               # Global styles & design tokens
│   ├── layout.tsx                # Root layout (fonts, metadata, providers)
│   ├── page.tsx                  # Home page — section assembly
│   └── api/
│       ├── contact/route.ts      # POST — contact form handler
│       └── github/route.ts       # GET — GitHub profile/repos proxy
│
├── components/
│   ├── canvas/
│   │   └── ParticleBg.tsx        # HTML5 Canvas particle network
│   ├── layout/
│   │   ├── CustomCursor.tsx      # Animated dot+ring cursor
│   │   └── LenisProvider.tsx     # Lenis smooth scroll context
│   ├── ui/
│   │   ├── Badge.tsx             # Badge pill (gold/cyan/outline/dark)
│   │   ├── GlassCard.tsx         # Glassmorphic card wrapper
│   │   └── CommandPalette.tsx    # Ctrl+K overlay palette
│   └── sections/
│       ├── Navbar.tsx            # Sticky navbar + mobile menu
│       ├── Hero.tsx              # Landing hero section
│       ├── Projects.tsx          # Filterable project showcase
│       ├── TechStack.tsx         # Skills + marquee
│       ├── Experience.tsx        # Timeline education
│       ├── BlogSection.tsx       # Blog post cards
│       ├── Contact.tsx           # Contact form + info
│       └── Footer.tsx            # Footer + back-to-top
│
├── data/
│   └── portfolioData.ts          # Typed data: projects, skills, experience, blog
│
├── lib/
│   └── utils.ts                  # cn() utility (clsx + tailwind-merge)
│
├── Resume/
│   └── Purvik-Resume-2.1.pdf     # Resume file (served as static asset)
│
├── tailwind.config.ts            # Custom color tokens + animations
├── tsconfig.json                 # TypeScript config with @/* alias
├── next.config.mjs               # Next.js 15 build config
└── postcss.config.js             # PostCSS + Tailwind
```

---

## Data Flow

```
portfolioData.ts
    │
    ├──► Hero.tsx          (PERSONAL_INFO: subtitles, socials, resumePath)
    ├──► Projects.tsx      (PROJECTS[]: category, metrics, hardware, tags)
    ├──► TechStack.tsx     (SKILL_CATEGORIES[]: skills with level %)
    ├──► Experience.tsx    (EXPERIENCES[]: period, title, highlights)
    ├──► BlogSection.tsx   (BLOG_POSTS[]: slug, title, date, category)
    ├──► Contact.tsx       (PERSONAL_INFO: email, phone, socials)
    ├──► Navbar.tsx        (PERSONAL_INFO: resumePath)
    ├──► Footer.tsx        (PERSONAL_INFO: socials, email)
    └──► CommandPalette.tsx(PERSONAL_INFO: resumePath, socials)
```

---

## API Routes

| Route | Method | Description |
|---|---|---|
| `/api/contact` | POST | Receives form data, logs, returns 200. Mailto fallback in client. |
| `/api/github` | GET | Fetches `purvik08` profile + repos from GitHub API. 1hr ISR cache. |

---

## Rendering Strategy

| Page | Strategy |
|---|---|
| `/` (home) | **CSR** — client components for animations/interactivity |
| `/api/github` | **ISR** — `next: { revalidate: 3600 }` |
| `/api/contact` | **Dynamic** — no cache |

---

## Key Libraries

| Library | Version | Purpose |
|---|---|---|
| `next` | 15.5.22 | Framework |
| `react` | 19.2.8 | UI runtime |
| `framer-motion` | 11.18.x | Scroll + enter animations |
| `@studio-freight/lenis` | 1.0.42 | Smooth scrolling |
| `lucide-react` | 0.454 | Icons |
| `tailwindcss` | 3.4 | Utility CSS |
| `clsx` + `tailwind-merge` | 2.x | Class merging |
| `typescript` | 5.6 | Type safety |
| `gsap` | 3.12.5 | Advanced animations |
| `cmdk` | 1.1.1 | Command palette (Ctrl+K) |
| `three` | 0.170.0 | 3D / Canvas utilities |

---

## Path Aliases

```json
{ "@/*": ["./*"] }
```

All imports use `@/` prefix (e.g. `@/components/ui/GlassCard`).
