# Design Guidelines — Purvik Prajapati Portfolio

## Colour & Theme (Minimalist Luxury Charcoal & Gold)
- Background: `#0c0c0e` (Rich deep charcoal black)
- Subtle Background: `#121215`
- Card Background: `rgba(255, 255, 255, 0.03)` (Glassmorphism dark card)
- Gold Accent (Primary): `#f59e0b` (Amber Gold)
- Gold Dark: `#d97706`
- Gold Light: `#fbbf24`
- Gold Glow: `rgba(245, 158, 11, 0.2)`
- Text Primary: `#f3f4f6`
- Text Muted: `#9ca3af`

## Typography
- Primary Font: **Inter** (Google Fonts) for body text and navigation.
- Heading Font: **Syne** (Google Fonts) for titles and section headings.
- Hierarchy:
  - Hero H1: clamp(48px, 6.5vw, 84px), weight 800, line-height 0.95
  - Section H2: clamp(32px, 4vw, 52px), weight 800, line-height 1.05
  - Cards / Modal H3: 18px - 24px, weight 700/800

## Visual Style
- Glassmorphism dark cards with subtle gold borders (`rgba(245, 158, 11, 0.25)`).
- Micro-animations on hover (card translates Y -4px, glowing gold shadow).
- Interactive 'Hire Me' Modal with dark blur backdrop (`rgba(0,0,0,0.8)`).
- Custom smooth cursor dot + glowing ring effect.

## Accessibility
- High contrast ratio for text on dark background.
- Visible outline indicators on interactive elements.
- Accessible ARIA roles and labels for navigation and modals.
