# Design System — Purvik Prajapati Portfolio v2.0

## Theme: Minimalist Luxury — Charcoal & Gold

---

## Color Palette

| Token | Value | Usage |
|---|---|---|
| `charcoal-950` | `#0a0a0c` | Page background |
| `charcoal-900` | `#0f0f13` | Card surface |
| `charcoal-800` | `#16161e` | Elevated card / code bg |
| `charcoal-700` | `#20202c` | Skill bar track |
| `charcoal-600` | `#2d2d3d` | Borders |
| `gold-500` | `#f59e0b` | Primary accent |
| `gold-400` | `#fbbf24` | Hover / highlight |
| `gold-600` | `#d97706` | Pressed state |
| `cyan-500` | `#06b6d4` | Secondary accent |
| `cyan-400` | `#38bdf8` | Skill bars (mid-level) |

---

## Typography

| Role | Font | Weight |
|---|---|---|
| Headings / Titles | **Syne** | 400–800 |
| Body / UI | **Inter** | 300–700 |
| Code / Architecture | **JetBrains Mono** | 400 |

CSS variables: `--font-inter`, `--font-syne`

---

## Glassmorphism Classes

| Class | Effect |
|---|---|
| `.glass` | `bg rgba(15,15,19,0.6)` + `backdrop-blur-xl` + border `rgba(255,255,255,0.08)` |
| `.glass-gold` | Gold-tinted glass — for status cards |
| `.glow-gold` | Gold glow box-shadow |
| `.glow-cyan` | Cyan glow box-shadow |

---

## Gradient Utilities

| Class | Effect |
|---|---|
| `.gradient-text` | Gold → Cyan diagonal gradient text |
| `.gradient-text-gold` | Gold only gradient text |

---

## Layout

| Token | Value |
|---|---|
| Max content width | `max-w-7xl` (1280px) |
| Section padding | `pt-24 pb-24` (`section-padding`) |
| Horizontal padding | `px-6` |
| Card border radius | `rounded-2xl` |

---

## Animation Catalogue

| Name | Trigger | Duration |
|---|---|---|
| Typing cursor | Auto — Hero section | Infinite |
| Particle network | Auto — Canvas | Infinite |
| Tech marquee | Auto | 20s loop |
| Skill bar fill | On scroll into view | 1.2s ease-out |
| Card slide-in | On scroll into view | 0.5s + stagger |
| Custom cursor ring | Mouse movement | 0.15s lerp |
| Navbar fade | Page load | 0.6s |
| Float animation | Decorative elements | 6s infinite |

---

## Component Inventory

### UI Primitives
- `GlassCard` — glassmorphic card, optional `glow` prop
- `Badge` — pill chip with 4 variants: `gold`, `cyan`, `outline`, `dark`
- `CommandPalette` — Ctrl+K overlay with navigation & action shortcuts

### Layout
- `LenisProvider` — Lenis smooth scroll wrapper
- `CustomCursor` — dot + ring cursor (desktop only)

### Sections
- `Navbar` — sticky glass, mobile menu, active section detection
- `Hero` — typing animation, stats, social links, CTA
- `Projects` — filter + search, metric cards, hardware tags
- `TechStack` — skill bars + scrolling marquee
- `Experience` — alternating timeline cards
- `BlogSection` — categorized blog post cards
- `Contact` — form + info sidebar + socials
- `Footer` — logo, socials, back-to-top

### Canvas
- `ParticleBg` — 80-particle network with mouse repulsion

---

## Responsive Breakpoints

| Breakpoint | Width |
|---|---|
| Mobile (base) | `< 640px` |
| Tablet (`sm`) | `≥ 640px` |
| Desktop (`md`) | `≥ 768px` |
| Wide (`lg`) | `≥ 1024px` |
| XL (`xl`) | `≥ 1280px` |
