# Light Expressive Portfolio UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the portfolio into a light, eye-catching design with choreographed animations (hero intro, scroll reveals, hover micro-interactions) per `docs/superpowers/specs/2026-07-14-light-expressive-ui-design.md`.

**Architecture:** Presentation-layer-only change. Data files, routes, and the contact API are untouched. Animation lives in small client components (`Reveal`, `Magnetic`, `TiltCard`, `Hero`); everything else stays server-rendered. Decorative motion (mesh blobs, marquee, link underlines) is pure CSS in `globals.css`.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS v4, `motion` v12 (framer-motion successor), `next/font` (Inter + Space Grotesk), lucide-react.

## Global Constraints

- Light-only theme. Delete every `dark:` utility class and the `prefers-color-scheme: dark` CSS block.
- Only new dependency allowed: `motion`.
- Do NOT modify: `src/data/*`, `src/app/api/contact/route.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, `generateStaticParams`/`generateMetadata` logic.
- Every animation must respect `prefers-reduced-motion` (via `useReducedMotion()` in motion components, `@media (prefers-reduced-motion: reduce)` in CSS).
- No test framework exists in this repo and none is added — each task's verify step is `npm run build` (must pass) plus visual check in the dev server.
- Accent palette: indigo `#6366f1`, cyan `#06b6d4`, pink `#ec4899`.

---

### Task 1: Foundation — dependency, fonts, design tokens, CSS utilities

**Files:**
- Modify: `package.json` (via `npm install motion`)
- Modify: `src/app/globals.css` (full rewrite)
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: CSS custom props/utilities used by all later tasks: color tokens `--color-accent`, `--color-accent-cyan`, `--color-accent-pink`; font utilities `font-sans`, `font-display`; CSS classes `.gradient-text`, `.gradient-border`, `.mesh-blob`, `.link-underline`, `.marquee`, `.marquee-track`.

- [ ] **Step 1: Install motion**

Run: `npm install motion`
Expected: `motion` v12.x added to `package.json` dependencies.

- [ ] **Step 2: Rewrite `src/app/globals.css`**

Replace the entire file with:

```css
@import "tailwindcss";

:root {
  --background: #fcfcfd;
  --foreground: #101014;
  --muted: #5b5b66;
  --border: #e7e7ec;
  --card: #ffffff;
  --accent: #6366f1;
  --accent-cyan: #06b6d4;
  --accent-pink: #ec4899;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-border: var(--border);
  --color-card: var(--card);
  --color-accent: var(--accent);
  --color-accent-cyan: var(--accent-cyan);
  --color-accent-pink: var(--accent-pink);
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  -webkit-font-smoothing: antialiased;
}

/* Gradient headline text */
.gradient-text {
  background: linear-gradient(100deg, var(--accent), var(--accent-cyan) 55%, var(--accent-pink));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Card with a gradient border revealed on hover */
.gradient-border {
  position: relative;
  border: 1px solid var(--border);
}
.gradient-border::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(120deg, var(--accent), var(--accent-cyan), var(--accent-pink));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.gradient-border:hover::before {
  opacity: 1;
}

/* Slow-drifting blurred blobs behind the hero */
.mesh-blob {
  position: absolute;
  border-radius: 9999px;
  filter: blur(90px);
  opacity: 0.5;
  animation: mesh-drift 18s ease-in-out infinite alternate;
  pointer-events: none;
}
@keyframes mesh-drift {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    transform: translate3d(60px, -40px, 0) scale(1.15);
  }
}

/* Link underline sweep */
.link-underline {
  background-image: linear-gradient(currentColor, currentColor);
  background-repeat: no-repeat;
  background-position: 0 100%;
  background-size: 0% 1.5px;
  transition: background-size 0.3s ease;
}
.link-underline:hover {
  background-size: 100% 1.5px;
}

/* Infinite tech-stack marquee (track holds two copies of the list) */
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
}
.marquee:hover .marquee-track {
  animation-play-state: paused;
}
@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .mesh-blob,
  .marquee-track {
    animation: none;
  }
}
```

- [ ] **Step 3: Update `src/app/layout.tsx` fonts**

Change the font imports and body class. Replace:

```tsx
import { Inter } from "next/font/google";
```

with:

```tsx
import { Inter, Space_Grotesk } from "next/font/google";
```

Replace:

```tsx
const inter = Inter({ subsets: ["latin"] });
```

with:

```tsx
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
```

Replace the body tag:

```tsx
<body className={`${inter.className} bg-background text-foreground`}>
```

with:

```tsx
<body
  className={`${inter.variable} ${spaceGrotesk.variable} bg-background font-sans text-foreground`}
>
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build succeeds, no type or CSS errors.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/app/globals.css src/app/layout.tsx
git commit -m "feat: add motion dependency, display font, and light design tokens"
```

---

### Task 2: Motion primitives — Reveal, Magnetic, TiltCard

**Files:**
- Create: `src/components/reveal.tsx`
- Create: `src/components/magnetic.tsx`
- Create: `src/components/tilt-card.tsx`

**Interfaces:**
- Produces:
  - `Reveal({ children, delay?: number, className?: string })` — client wrapper; fades/slides children up on viewport entry, once.
  - `Magnetic({ children })` — client wrapper; children pulled toward cursor on hover.
  - `TiltCard({ children, className?: string })` — client wrapper; subtle 3D tilt following cursor.

- [ ] **Step 1: Create `src/components/reveal.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create `src/components/magnetic.tsx`**

```tsx
"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { MouseEvent, ReactNode } from "react";
import { useRef } from "react";

export default function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  function handleMouseMove(event: MouseEvent) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.25);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Create `src/components/tilt-card.tsx`**

```tsx
"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { MouseEvent, ReactNode } from "react";
import { useRef } from "react";

export default function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  function handleMouseMove(event: MouseEvent) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 6);
    rotateX.set(-py * 6);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build succeeds (components exist but are not yet imported anywhere — that's fine).

- [ ] **Step 5: Commit**

```bash
git add src/components/reveal.tsx src/components/magnetic.tsx src/components/tilt-card.tsx
git commit -m "feat: add Reveal, Magnetic, and TiltCard motion primitives"
```

---

### Task 3: Hero — choreographed intro with gradient mesh

**Files:**
- Create: `src/components/hero.tsx`
- Modify: `src/app/page.tsx` (replace inline hero `<section>` at lines 14–28)

**Interfaces:**
- Consumes: `Magnetic` from Task 2, `ButtonLink` (restyled in Task 4 but current API unchanged: `{ href, variant?, newTab?, children }`), `site` from `@/data/site`.
- Produces: `Hero()` — self-contained client component, no props.

- [ ] **Step 1: Create `src/components/hero.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import ButtonLink from "@/components/button-link";
import Magnetic from "@/components/magnetic";
import { site } from "@/data/site";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: "70%" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative py-24 sm:py-36">
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 overflow-visible"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mesh-blob -top-24 -left-24 h-96 w-96 bg-accent/50" />
        <div className="mesh-blob top-8 -right-16 h-80 w-80 bg-accent-cyan/40 [animation-delay:-6s]" />
        <div className="mesh-blob -bottom-32 left-1/3 h-96 w-96 bg-accent-pink/35 [animation-delay:-12s]" />
      </motion.div>

      <motion.div
        variants={container}
        initial={reduceMotion ? "visible" : "hidden"}
        animate="visible"
      >
        <h1 className="font-display text-5xl font-bold tracking-tight sm:text-7xl">
          {site.name.split(" ").map((part) => (
            <span key={part} className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span variants={word} className="mr-[0.22em] inline-block">
                {part}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          variants={fadeUp}
          className="gradient-text font-display mt-2 text-3xl font-semibold tracking-tight sm:text-5xl"
        >
          {site.title}
        </motion.p>

        <motion.p variants={fadeUp} className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          {site.tagline}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
          <Magnetic>
            <ButtonLink href="/#work">View work</ButtonLink>
          </Magnetic>
          <Magnetic>
            <ButtonLink href={site.cvUrl} variant="secondary" newTab>
              View Resume
            </ButtonLink>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Use it in `src/app/page.tsx`**

Add import `import Hero from "@/components/hero";`, remove the now-unused `import ButtonLink from "@/components/button-link";`, and replace the entire hero block (the `<section className="py-20 sm:py-28">…</section>` containing `site.name`) with:

```tsx
<Hero />
```

- [ ] **Step 3: Verify visually + build**

Run: `npm run build`
Expected: build succeeds.
Then `npm run dev` and check http://localhost:3000: mesh fades in, name reveals word by word, subtitle/CTA slide up, blobs drift slowly, buttons pull toward cursor.

- [ ] **Step 4: Commit**

```bash
git add src/components/hero.tsx src/app/page.tsx
git commit -m "feat: add choreographed hero with gradient mesh and staggered intro"
```

---

### Task 4: Chrome — navbar (glass), footer, button-link (gradient)

**Files:**
- Modify: `src/components/navbar.tsx`
- Modify: `src/components/footer.tsx`
- Modify: `src/components/button-link.tsx`

**Interfaces:**
- Consumes: `.link-underline` CSS class from Task 1.
- Produces: `ButtonLink` keeps the exact same props API (`href`, `variant`, `newTab`, `children`) — only class strings change.

- [ ] **Step 1: Rewrite `src/components/navbar.tsx`** (floating glass pill)

```tsx
import Link from "next/link";
import { site } from "@/data/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-4 z-50 py-2">
      <nav className="flex h-14 items-center justify-between rounded-2xl border border-border bg-white/70 px-5 shadow-lg shadow-black/[0.04] backdrop-blur-xl">
        <Link href="/" className="font-display font-bold tracking-tight">
          {site.name}
        </Link>
        <div className="flex items-center gap-5 text-sm text-muted">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-border rounded-lg bg-card px-3 py-1.5 text-foreground transition-colors hover:text-accent"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/button-link.tsx`** (gradient primary)

```tsx
import Link from "next/link";
import type { ReactNode } from "react";

const styles = {
  primary:
    "bg-gradient-to-r from-accent via-accent-cyan to-accent-pink bg-[length:200%_100%] bg-left text-white shadow-lg shadow-accent/25 transition-all duration-500 hover:bg-right hover:shadow-xl hover:shadow-accent/30",
  secondary:
    "gradient-border bg-card text-foreground transition-colors hover:text-accent",
};

export default function ButtonLink({
  href,
  variant = "primary",
  newTab = false,
  children,
}: {
  href: string;
  variant?: keyof typeof styles;
  newTab?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      {...(newTab && { target: "_blank", rel: "noopener noreferrer" })}
      className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}
```

- [ ] **Step 3: Update `src/components/footer.tsx`** links

Only change the two `<a>` class strings: replace `className="transition-colors hover:text-foreground"` with `className="link-underline transition-colors hover:text-foreground"` (both the mailto link and the socials links).

- [ ] **Step 4: Verify build + visual**

Run: `npm run build` — expected: pass.
Dev server: navbar floats with glass blur when scrolling, nav links get underline sweep on hover, primary button's gradient shifts on hover.

- [ ] **Step 5: Commit**

```bash
git add src/components/navbar.tsx src/components/button-link.tsx src/components/footer.tsx
git commit -m "feat: glass navbar, gradient buttons, footer link underlines"
```

---

### Task 5: Sections and cards — reveals, gradient borders, 3D tilt

**Files:**
- Modify: `src/components/section.tsx`
- Modify: `src/components/case-study-card.tsx`
- Modify: `src/components/project-row.tsx`
- Modify: `src/app/page.tsx` (services cards styling only)

**Interfaces:**
- Consumes: `Reveal`, `TiltCard` from Task 2; `.gradient-border` from Task 1.
- Produces: `Section` keeps props `{ id, title, children }`; `CaseStudyCard` keeps `{ caseStudy }`; `ProjectRow` keeps `{ project }`.

- [ ] **Step 1: Rewrite `src/components/section.tsx`**

```tsx
import type { ReactNode } from "react";
import Reveal from "@/components/reveal";

export default function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 py-16 sm:py-24">
      <Reveal>
        <h2 className="mb-10 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-muted">
          <span className="size-2 rounded-full bg-gradient-to-r from-accent to-accent-pink" />
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>{children}</Reveal>
    </section>
  );
}
```

Note: the old `fade-in-view` class is gone (its CSS was removed in Task 1).

- [ ] **Step 2: Rewrite `src/components/case-study-card.tsx`**

```tsx
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import TiltCard from "@/components/tilt-card";
import type { CaseStudy } from "@/data/types";

export default function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <TiltCard className="h-full">
      <Link
        href={`/work/${caseStudy.slug}`}
        className="gradient-border group flex h-full flex-col rounded-2xl bg-card p-6 shadow-lg shadow-black/[0.04] transition-shadow duration-300 hover:shadow-xl hover:shadow-accent/10"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="gradient-text text-xs font-semibold uppercase tracking-wider">
              {caseStudy.domain}
            </p>
            <h3 className="font-display mt-2 text-lg font-bold">{caseStudy.title}</h3>
          </div>
          <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{caseStudy.summary}</p>
        <p className="mt-auto pt-4 text-xs text-muted">
          {caseStudy.stack.slice(0, 6).join(" · ")}
        </p>
      </Link>
    </TiltCard>
  );
}
```

- [ ] **Step 3: Rewrite `src/components/project-row.tsx`**

```tsx
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CaseStudy } from "@/data/types";

export default function ProjectRow({ project }: { project: CaseStudy }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block border-b border-border py-5 transition-transform duration-300 last:border-b-0 hover:translate-x-1"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="flex items-center gap-1.5 font-medium transition-colors group-hover:text-accent">
          {project.title}
          <ArrowUpRight className="size-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </h3>
        <p className="shrink-0 text-xs text-muted">{project.stack.slice(0, 3).join(" · ")}</p>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.summary}</p>
    </Link>
  );
}
```

- [ ] **Step 4: Restyle services cards in `src/app/page.tsx`**

Replace the services card `<div>` class:

```tsx
<div key={service.title} className="rounded-xl border border-border bg-card p-6">
```

with:

```tsx
<div
  key={service.title}
  className="gradient-border rounded-2xl bg-card p-6 shadow-lg shadow-black/[0.04] transition-shadow duration-300 hover:shadow-xl hover:shadow-accent/10"
>
```

And its inner `<h3 className="font-semibold">` with `<h3 className="font-display font-bold">`.

- [ ] **Step 5: Verify build + visual**

Run: `npm run build` — expected: pass.
Dev server: sections reveal on scroll (title first, content 0.1s later), work cards tilt in 3D + show gradient border on hover, project rows slide right with arrow appearing.

- [ ] **Step 6: Commit**

```bash
git add src/components/section.tsx src/components/case-study-card.tsx src/components/project-row.tsx src/app/page.tsx
git commit -m "feat: scroll reveals, gradient-border cards, 3D tilt on work cards"
```

---

### Task 6: Skills marquee + contact form polish

**Files:**
- Create: `src/components/marquee.tsx`
- Modify: `src/app/page.tsx` (skills + contact sections)
- Modify: `src/components/contact-form.tsx` (class strings only)

**Interfaces:**
- Consumes: `.marquee`/`.marquee-track` CSS from Task 1; `skillGroups` from `@/data/skills`.
- Produces: `Marquee()` — server component, no props.

- [ ] **Step 1: Create `src/components/marquee.tsx`**

```tsx
import { skillGroups } from "@/data/skills";

const allSkills = skillGroups.flatMap((group) => group.items);

export default function Marquee() {
  // Two copies of the list; the track animates -50% for a seamless loop.
  const items = [...allSkills, ...allSkills];

  return (
    <div className="marquee relative -mx-6 overflow-hidden sm:-mx-8" aria-hidden>
      <div className="marquee-track py-1">
        {items.map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="mr-3 whitespace-nowrap rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
```

- [ ] **Step 2: Update skills section in `src/app/page.tsx`**

Add import `import Marquee from "@/components/marquee";`. Replace the skills `<Section>` body:

```tsx
<Section id="skills" title="Tech stack">
  <Marquee />
  <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {skillGroups.map((group) => (
      <div key={group.label}>
        <h3 className="text-sm font-semibold">{group.label}</h3>
        <p className="mt-1.5 text-sm text-muted">{group.items.join(" · ")}</p>
      </div>
    ))}
  </div>
</Section>
```

- [ ] **Step 3: Polish `src/components/contact-form.tsx`** (class strings only — no logic changes)

Replace `inputClass` with:

```tsx
const inputClass =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-sm outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20";
```

Replace the submit button's className with:

```tsx
className="rounded-xl bg-gradient-to-r from-accent via-accent-cyan to-accent-pink bg-[length:200%_100%] bg-left px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-500 hover:bg-right disabled:opacity-50"
```

(This also removes the `dark:text-background` class.)

- [ ] **Step 4: Verify build + visual**

Run: `npm run build` — expected: pass.
Dev server: marquee scrolls continuously, pauses on hover, edges fade out; form inputs show accent ring on focus; submit button matches primary ButtonLink.

- [ ] **Step 5: Commit**

```bash
git add src/components/marquee.tsx src/app/page.tsx src/components/contact-form.tsx
git commit -m "feat: tech-stack marquee and polished contact form"
```

---

### Task 7: Work detail page restyle

**Files:**
- Modify: `src/app/work/[slug]/page.tsx` (JSX classes only — keep `generateStaticParams`, `generateMetadata`, data fetching untouched)

**Interfaces:**
- Consumes: `Reveal` from Task 2, `.gradient-text`/`.link-underline` from Task 1.

- [ ] **Step 1: Restyle the article JSX**

In `src/app/work/[slug]/page.tsx`, add import `import Reveal from "@/components/reveal";` and apply these changes:

- Back link: add `link-underline` to its className.
- `<h1>`: change to `className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-5xl"`.
- Domain/role `<p>`: change to `className="gradient-text text-xs font-semibold uppercase tracking-wider"`.
- Wrap each of the four inner `<section>` blocks (Context, What I did, Outcomes, Stack) in `<Reveal>…</Reveal>`.
- Bullet dots: replace `bg-accent` with `bg-gradient-to-r from-accent to-accent-pink`.
- Stack chips: change className to `"rounded-full border border-border bg-card px-3 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent"`.

The resulting body (from `<article>`):

```tsx
<article className="py-16">
  <Link
    href="/#work"
    className="link-underline inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
  >
    <ArrowLeft className="size-4" /> All work
  </Link>

  <header className="mt-8">
    <p className="gradient-text text-xs font-semibold uppercase tracking-wider">
      {caseStudy.domain} · {caseStudy.role}
    </p>
    <h1 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
      {caseStudy.title}
    </h1>
    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{caseStudy.summary}</p>
  </header>

  <div className="mt-12 space-y-12">
    <Reveal>
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Context</h2>
        <p className="mt-4 max-w-2xl leading-relaxed">{caseStudy.problem}</p>
      </section>
    </Reveal>

    <Reveal>
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
          What I did
        </h2>
        <ul className="mt-4 max-w-2xl space-y-3">
          {caseStudy.contributions.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gradient-to-r from-accent to-accent-pink" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </Reveal>

    <Reveal>
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Outcomes</h2>
        <ul className="mt-4 max-w-2xl space-y-3">
          {caseStudy.outcomes.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gradient-to-r from-accent to-accent-pink" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </Reveal>

    <Reveal>
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Stack</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {caseStudy.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </Reveal>
  </div>
</article>
```

- [ ] **Step 2: Verify build + visual**

Run: `npm run build` — expected: pass, all `/work/*` pages still statically generated.
Dev server: open one case study — sections reveal on scroll, styling matches the home page.

- [ ] **Step 3: Commit**

```bash
git add "src/app/work/[slug]/page.tsx"
git commit -m "feat: restyle case study pages to match new design"
```

---

### Task 8: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Full build + lint**

Run: `npm run build && npm run lint`
Expected: both pass with zero errors.

- [ ] **Step 2: Grep for leftover dark-mode classes**

Run: `grep -rn "dark:" src/`
Expected: no matches. If any remain, remove them and re-run build.

- [ ] **Step 3: Visual pass**

Start `npm run dev` and check at desktop (~1280px) and mobile (~390px) widths:
- Hero intro sequence plays once, no layout shift.
- All sections reveal on scroll.
- Hover states: card tilt, gradient borders, magnetic buttons, link underlines, marquee pause.
- Mobile: no horizontal overflow (mesh blobs must not widen the page — they sit in an absolutely positioned `-z-10` container inside `relative overflow` context; verify no x-scrollbar).

- [ ] **Step 4: Reduced-motion pass**

In browser devtools, emulate `prefers-reduced-motion: reduce`. Expected: no drifting blobs, no marquee movement, no tilt/magnetic movement; content still fully visible (fades only).

- [ ] **Step 5: Commit any fixes**

```bash
git add -A && git commit -m "fix: polish issues found in final verification"
```

(Skip if nothing changed.)
