# Portfolio Rebuild — Design Spec

**Date:** 2026-07-11
**Status:** Approved

## Goal

Full rebuild of the portfolio site (`src/` torn down and rewritten) into a minimal, professional site targeting **freelance/outsource clients**. Positioning title: **Software Engineer**. Content sourced from `docs/projects-reference.md` and `docs/portfolio-copy-bullets.md`, rewritten with a client-facing angle (business outcomes, delivery history) while keeping all technical facts unchanged.

## Decisions

| Decision | Choice |
|---|---|
| Audience | Freelance/outsource clients |
| Positioning | Software Engineer |
| Data | Static TypeScript files in repo (MongoDB removed) |
| Features | Contact form, CV download, per-case-study pages. No blog |
| Design | Minimal professional (linear.app / read.cv style) |
| Stack | Next.js 15 + React 19 + Tailwind 4, same repo, rewrite `src/` |
| Site structure | One-page home + `/work/[slug]` case study subpages |

## Routes

```
/                  one-page: Hero → What I do → Selected Work → More projects → Tech stack → Contact
/work/[slug]       4 case studies: arobid, gkim-healthcare, finexis-ekyc, luxe-nomad
/api/contact       POST, delivers message via Telegram bot (existing working path)
sitemap.ts, robots.ts
```

No `/blog`. All non-listed current routes are deleted.

### Homepage sections

- **Hero**: name, "Software Engineer", one client-facing positioning sentence, buttons `[View work]` `[Download CV]`.
- **What I do**: 3–4 service cards — Backend systems & APIs · Full-stack product delivery · System modernization & performance · Third-party integrations. Each backed by evidence from the docs.
- **Selected Work**: 4 large cards linking to `/work/[slug]`.
- **More projects**: compact list — Hoplite Technology, Watchtowr, TurisVPN, Clinger. No detail pages.
- **Tech stack**: grouped skills.
- **Contact**: form + direct links (email, LinkedIn, GitHub).
- **CV**: static `public/cv.pdf`; the button links to it. The PDF itself is provided by the owner (placeholder until then).

## Data layer

```
src/data/
  site.ts          personal info, contacts, socials, positioning copy
  services.ts      what-i-do cards
  case-studies.ts  4 full case studies
  projects.ts      supporting projects (compact)
  skills.ts        tech stack groups
```

Case study type: `slug, title, client, domain, summary, problem, contributions[], outcomes[], stack[], links`.

Rules:
- Pure typed TypeScript. No MDX, no CMS.
- Content ported from `docs/portfolio-copy-bullets.md`, rewritten client-facing. No invented metrics — only numbers already in docs (e.g. Finexis 23s→2s, 26s→5s).
- Watchtowr listed as professional experience only (no code evidence available).

## Dependency changes

**Remove:** mongoose, axios, lottie-react, react-fast-marquee, react-toastify, sass, nodemailer (contact ships via Telegram, and the old email path was already disabled), `src/models`, `src/services`, `src/lib/mongodb.ts`, `src/utils` (old data files).
**Keep:** next, react, react-dom, `@next/third-parties` (GoogleTagManager via `NEXT_PUBLIC_GTM`).
**Swap:** react-icons → lucide-react (lighter, fits minimal style).

## UI system

- Tailwind 4 design tokens in `globals.css` via `@theme`: single accent color, neutral scale.
- Font: modern sans (Geist or Inter) via `next/font`.
- Dark/light via `prefers-color-scheme` only — no toggle.
- Components in flat `src/components/`: `navbar`, `footer`, `section`, `case-study-card`, `project-row`, `contact-form`, `button`.
- No glow cards, lottie, or marquee. Animation limited to CSS transitions and a light fade-in-on-scroll (CSS `animation-timeline` or a small IntersectionObserver).

## Contact form

- API route (`/api/contact`) delivering to Telegram via `fetch` (env: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — already in use today).
- Server-side validation: required fields, email format, honeypot field for spam bots.
- Inline success/error states in the form — no toast library.
- Graceful failure: on delivery error, show "email me directly at <address>".

## SEO & meta

- Next Metadata API per page; unique title/description for each case study.
- Static OpenGraph image; JSON-LD `Person` schema in root layout.
- Keep Google Analytics via `@next/third-parties` if currently configured.

## Verification

- `next build` passes with no type/lint errors.
- Manual pass on dev server: all 5 pages render, contact form submits (mock SMTP or log transport), CV link works, mobile responsive.
- No unit tests — static content-driven site; build + manual review is sufficient.
