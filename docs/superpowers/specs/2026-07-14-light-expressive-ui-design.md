# Light Expressive Portfolio UI — Design Spec

**Date:** 2026-07-14
**Status:** Approved by user
**Goal:** Redesign the portfolio UI so it visibly demonstrates strong frontend/UI skill. Current site is clean but too plain. New design: light, eye-catching, with choreographed animations that surprise on first visit — without hurting readability or professionalism for client visitors.

## 1. Visual direction

- **Theme:** Light-only. Off-white background (`#fafafa`-family). No dark mode, no theme toggle. Remove the existing `prefers-color-scheme: dark` block.
- **Accent:** Vivid gradient (indigo → cyan → pink) used as:
  - Slow-moving blurred mesh blobs behind the hero.
  - Gradient text on key headline words.
  - Gradient borders on cards (revealed/brightened on hover).
- **Typography:**
  - Headings: Space Grotesk (display, tight tracking, large scale).
  - Body: Geist (or Inter fallback), loaded via `next/font` — zero external requests.
  - Editorial scale: hero name very large (clamp-based), section titles as small uppercase labels with the content itself carrying visual weight.
- **Depth:** Multi-layer soft shadows on cards, subtle glassmorphism (blur + translucency) on the sticky navbar.

## 2. Animation choreography

**Library:** `motion` v12 (framer-motion successor, React 19 compatible). Client components only where animation is needed; page stays server-rendered where possible.

- **Load sequence (hero):**
  1. Gradient mesh fades in (~0.4s).
  2. Name reveals word-by-word/letter-group stagger (clip-path or y-translate reveal, ~0.6s).
  3. Subtitle + CTA buttons slide up (~0.3s).
- **Scroll:** Each section stagger-reveals on viewport entry (`whileInView`, `once: true`).
- **Hover micro-interactions:**
  - Work cards: slight 3D tilt + gradient border glow.
  - Primary buttons: magnetic pull toward cursor.
  - Links: animated underline sweep.
  - Skill chips: subtle spring bounce.
- **Marquee:** Infinite horizontal tech-stack marquee, pauses on hover.
- **Accessibility:** Respect `prefers-reduced-motion` — disable transforms/marquee movement, keep simple fades. No content hidden behind animation.

## 3. Scope & structure

- Single-page layout unchanged: hero → services → selected work → more projects → skills → contact.
- **Unchanged:** all data files (`src/data/*`), `/work/[slug]` route, `/api/contact` route, sitemap/robots, contact form logic.
- **Changed (presentation layer only):** `globals.css`, `layout.tsx`, `page.tsx`, all components in `src/components/`, work-detail page restyled to match.
- New dependency: `motion`. New font imports via `next/font/google`.

## 4. Explicit non-goals (YAGNI)

- No WebGL/canvas/shader backgrounds.
- No preloader screen.
- No custom cursor.
- No dark mode / theme toggle.
- No page-transition system.
- No new content sections or data changes.

## 5. Verification

- `next build` and `next lint` pass.
- Dev-server visual check with screenshots at desktop and mobile widths.
- Reduced-motion check (emulate `prefers-reduced-motion`) — page fully readable, no motion sickness triggers.
- Lighthouse sanity: animations must not tank performance (target: no long main-thread blocks from animation on load).
