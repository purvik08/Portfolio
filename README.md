# Purvik Prajapati — Portfolio v2.0

> **Premium 2026 portfolio** for Purvik Prajapati — Robotics & Embedded Systems Engineer, ESP32-S3 Hardware Architect, and ROS 2 Developer from Surat, Gujarat, India 🇮🇳

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion, GSAP |
| Smooth Scroll | Lenis (@studio-freight) |
| Canvas | HTML5 Canvas (Particle BG) |
| Icons | Lucide React |
| Fonts | Syne (headings) + Inter (body) |

---

## 🗂️ Project Structure

```
app/
├── globals.css           # Design system, animations, glass styles
├── layout.tsx            # Root layout — fonts, SEO metadata, LenisProvider
├── page.tsx              # Main page — assembles all sections
└── api/
    ├── contact/route.ts  # Contact form API endpoint
    └── github/route.ts   # GitHub stats proxy (1hr ISR cache)

components/
├── canvas/
│   └── ParticleBg.tsx    # Canvas particle system with mouse repulsion
├── layout/
│   ├── CustomCursor.tsx  # Animated custom cursor with ring
│   └── LenisProvider.tsx # Lenis smooth scroll wrapper
├── ui/
│   ├── Badge.tsx         # Styled badge pill component
│   ├── GlassCard.tsx     # Glassmorphic card container
│   └── CommandPalette.tsx# Ctrl+K command palette
└── sections/
    ├── Navbar.tsx         # Sticky glass nav + mobile menu
    ├── Hero.tsx           # Typing hero, stats, CTA buttons
    ├── Projects.tsx       # Filterable project cards with search
    ├── TechStack.tsx      # Animated skill bars + tech marquee
    ├── Experience.tsx     # Timeline education/experience
    ├── BlogSection.tsx    # Engineering blog post cards
    ├── Contact.tsx        # Contact form + socials + info
    └── Footer.tsx         # Footer with back-to-top

data/
└── portfolioData.ts      # All structured portfolio data

lib/
└── utils.ts              # cn() class merging utility
```

---

## ✨ Features

- **Typing hero** — cycles through 3 role titles with typewriter animation
- **Particle background** — Canvas-based with mouse repulsion & connecting lines
- **Command Palette** (`Ctrl+K`) — navigate to any section instantly
- **Custom cursor** — smooth animated ring cursor (desktop only)
- **Lenis smooth scroll** — buttery smooth page scrolling
- **Filterable projects** — filter by category + keyword search
- **Animated skill bars** — reveal on scroll with proficiency percentages
- **Tech marquee** — scrolling tech stack strip
- **Timeline experience** — alternating animated education cards
- **Engineering blog** — post cards with categories and dates
- **Contact form** — API route + mailto fallback
- **GitHub stats API** — cached proxy route
- **SEO optimized** — full metadata, OpenGraph, Twitter cards
- **Responsive** — mobile-first design
- **Glassmorphism** — throughout cards, navbar, command palette

---

## 🏗️ Projects Showcased

| Project | Category | Stack |
|---|---|---|
| ESP32-S3 Drone | Robotics & ROS | ESP32-S3, ROS 2, KiCad, PID |
| Warehouse Automation | Robotics & ROS | ROS 2, Mobile Robot, ESP32, QR |
| ESP32 Smart Display | Embedded Systems | ESP32-S3, SPI, FreeRTOS |
| App for Smart Display | Android / Apps | Java, Android Studio, Wi-Fi |
| Virtual Hand Mouse | AI / ML | Python, MediaPipe, OpenCV |

---

## 🛠️ Running Locally

```bash
npm install --legacy-peer-deps
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📄 Resume

Located at: `Resume/Purvik-Resume-2.1.pdf`

---

## 📬 Contact

- **Email**: sumritprajapati@gmail.com
- **GitHub**: [purvik08](https://github.com/purvik08)
- **LinkedIn**: [purvik-prajapati](https://linkedin.com/in/purvik-prajapati)
- **Location**: Surat, Gujarat, India
