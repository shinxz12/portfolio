# Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio from scratch as a minimal, professional, client-facing site: one-page home + 4 case study pages, static TypeScript data, Telegram-backed contact form.

**Architecture:** Next.js 15 App Router, fully static pages (`/`, `/work/[slug]`) plus one API route (`/api/contact`). All content lives in typed files under `src/data/`. Tailwind 4 CSS-first tokens, light/dark via `prefers-color-scheme`.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind 4, lucide-react, Telegram Bot API.

## Global Constraints

- Positioning title everywhere: **"Software Engineer"** (not "Software Developer" / "Backend Developer").
- Domain: `https://btngoc.io.vn`. Owner: Ngoc Bui, email `ngocbthe@gmail.com`.
- No invented metrics — only numbers already in `docs/portfolio-copy-bullets.md` (Finexis 23s→2s, 26s→5s).
- Copy angle: client-facing (business outcomes, delivery), technical facts unchanged from docs.
- Dependencies after rebuild: next, react, react-dom, @next/third-parties, lucide-react + dev deps. Nothing else.
- No SCSS, no toast/animation libraries. Animation = CSS transitions only.
- No unit tests (per spec). Each task verifies with `npm run build` and/or manual dev-server checks.
- Package manager: npm (`yarn.lock` deleted in Task 1).
- Env vars used: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `NEXT_PUBLIC_GTM`.
- Case study slugs (exact): `arobid`, `gkim-healthcare`, `finexis-ekyc`, `luxe-nomad`.

---

### Task 1: Teardown + minimal shell

Delete all old UI/data/DB code and dependencies; leave a building app shell with design tokens.

**Files:**
- Delete: `src/app/components/`, `src/app/css/`, `src/app/assets/`, `src/app/blog/`, `src/app/api/data/`, `src/app/api/google/`, `src/app/api/contact/route.ts`, `src/models/`, `src/services/`, `src/lib/`, `src/utils/`, `tailwind.config.ts`, `yarn.lock`
- Rewrite: `src/app/layout.tsx`, `src/app/page.tsx`
- Create: `src/app/globals.css`
- Keep: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/favicon.ico` (sitemap rewritten in Task 7)

**Interfaces:**
- Produces: `globals.css` token classes used by ALL later tasks: `bg-background`, `text-foreground`, `text-muted`, `border-border`, `bg-card`, `text-accent`, `bg-accent`. Layout renders `{children}` inside `<main>` — later tasks only add components/pages.

- [ ] **Step 1: Delete old code and lockfile**

```bash
rm -rf src/app/components src/app/css src/app/assets src/app/blog \
  src/app/api src/models src/services src/lib src/utils \
  tailwind.config.ts yarn.lock
```

- [ ] **Step 2: Update dependencies**

```bash
npm uninstall mongoose axios lottie-react react-fast-marquee react-toastify sass react-icons nodemailer @types/nodemailer
npm install lucide-react
```

Expected: `package.json` dependencies = `@next/third-parties`, `lucide-react`, `next`, `react`, `react-dom`.

- [ ] **Step 3: Create `src/app/globals.css`**

```css
@import "tailwindcss";

:root {
  --background: #fafafa;
  --foreground: #18181b;
  --muted: #52525b;
  --border: #e4e4e7;
  --card: #ffffff;
  --accent: #2563eb;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0b;
    --foreground: #f4f4f5;
    --muted: #a1a1aa;
    --border: #27272a;
    --card: #131316;
    --accent: #60a5fa;
  }
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-border: var(--border);
  --color-card: var(--card);
  --color-accent: var(--accent);
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  -webkit-font-smoothing: antialiased;
}

/* Light fade-in on scroll — progressive enhancement, no JS */
@supports (animation-timeline: view()) {
  .fade-in-view {
    animation: fade-in-view linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 40%;
  }

  @keyframes fade-in-view {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
}
```

- [ ] **Step 4: Rewrite `src/app/layout.tsx`**

```tsx
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://btngoc.io.vn"),
  title: {
    default: "Ngoc Bui — Software Engineer",
    template: "%s — Ngoc Bui",
  },
  description:
    "Software Engineer building backend systems and full-stack products for startups and enterprises — B2B marketplaces, healthcare platforms, fintech onboarding, and more.",
  openGraph: {
    title: "Ngoc Bui — Software Engineer",
    description:
      "Software Engineer building backend systems and full-stack products for startups and enterprises.",
    url: "https://btngoc.io.vn",
    siteName: "Ngoc Bui",
    type: "website",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        <main className="mx-auto min-h-screen max-w-3xl px-6 sm:px-8">{children}</main>
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM ?? ""} />
    </html>
  );
}
```

- [ ] **Step 5: Rewrite `src/app/page.tsx` (temporary stub)**

```tsx
export default function HomePage() {
  return <h1 className="py-24 text-3xl font-semibold">Ngoc Bui — Software Engineer</h1>;
}
```

- [ ] **Step 6: Remove stale tsconfig include entry**

In `tsconfig.json`, the `include` array lists `src/app/blog/page.tsx` explicitly — a file deleted in Step 1, which makes `tsc` fail with TS6053. Change:

```json
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
```

- [ ] **Step 7: Fix `src/app/sitemap.ts` (temporary minimal, full version in Task 7)**

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://btngoc.io.vn", lastModified: new Date() }];
}
```

- [ ] **Step 8: Verify build**

Run: `npm run build`
Expected: build succeeds; routes `/`, `/sitemap.xml`, `/robots.txt` only.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: tear down old portfolio, add minimal shell with design tokens"
```

---

### Task 2: Data layer

All site content as typed TypeScript. Content below is final copy — port it verbatim.

**Files:**
- Create: `src/data/types.ts`, `src/data/site.ts`, `src/data/services.ts`, `src/data/case-studies.ts`, `src/data/projects.ts`, `src/data/skills.ts`

**Interfaces:**
- Produces (consumed by Tasks 3–7):
  - `site: { name, title, tagline, description, email, phone, location, cvUrl, socials: { label, url }[] }`
  - `services: Service[]` where `Service = { title: string; description: string }`
  - `caseStudies: CaseStudy[]` where `CaseStudy = { slug, title, client, domain, role, summary, problem, contributions: string[], outcomes: string[], stack: string[], productUrl?: string }`
  - `projects: SupportingProject[]` where `SupportingProject = { name, description, stack: string[], productUrl?: string }`
  - `skillGroups: SkillGroup[]` where `SkillGroup = { label: string; items: string[] }`

- [ ] **Step 1: Create `src/data/types.ts`**

```ts
export type Service = {
  title: string;
  description: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  domain: string;
  role: string;
  summary: string;
  problem: string;
  contributions: string[];
  outcomes: string[];
  stack: string[];
  productUrl?: string;
};

export type SupportingProject = {
  name: string;
  description: string;
  stack: string[];
  productUrl?: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};
```

- [ ] **Step 2: Create `src/data/site.ts`**

```ts
export const site = {
  name: "Ngoc Bui",
  title: "Software Engineer",
  tagline:
    "I design, build, and modernize backend systems and full-stack products — from B2B marketplaces to healthcare platforms.",
  description:
    "Software Engineer with hands-on delivery across B2B commerce, healthcare, fintech onboarding, cybersecurity, and consumer apps. I help teams ship reliable APIs, asynchronous workflows, and multi-tenant SaaS products, and I modernize systems that have slowed down.",
  email: "ngocbthe@gmail.com",
  phone: "+84969530042",
  location: "Ho Chi Minh City, Viet Nam",
  cvUrl: "/cv.pdf",
  socials: [
    { label: "GitHub", url: "https://github.com/shinxz12" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/ngocbthe/" },
  ],
};
```

- [ ] **Step 3: Create `src/data/services.ts`**

```ts
import type { Service } from "./types";

export const services: Service[] = [
  {
    title: "Backend systems & APIs",
    description:
      "Reliable REST and gRPC APIs, microservices, event-driven pipelines, and asynchronous workflows with NestJS, Django, Kafka, and Temporal.",
  },
  {
    title: "Full-stack product delivery",
    description:
      "End-to-end features across React and Next.js frontends and NestJS or Django backends — from business requirements to production.",
  },
  {
    title: "Modernization & performance",
    description:
      "Framework upgrades, database and query optimization, and refactoring legacy systems so they stay fast and maintainable.",
  },
  {
    title: "Third-party integrations",
    description:
      "Payments (Stripe, VNPay, NMI), AI APIs (OpenAI, Gemini), cloud services, and partner APIs integrated safely into existing products.",
  },
];
```

- [ ] **Step 4: Create `src/data/case-studies.ts`**

```ts
import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "arobid",
    title: "Arobid — B2B marketplace backend platform",
    client: "Arobid",
    domain: "B2B commerce",
    role: "Backend engineer on the core platform team",
    summary:
      "Microservice backend for an AI-powered B2B trade platform: product catalogs, RFQ negotiation, order orchestration, payments, and digital trade expos.",
    problem:
      "Arobid connects business buyers and suppliers through supplier discovery, product catalogs, quotation workflows, order processing, and digital exhibitions. The platform needed a dependable microservice foundation so many domain teams could ship independently without sacrificing reliability or consistency.",
    contributions: [
      "Helped build the shared backend foundation, standardizing microservice setup, configuration, database access, gRPC communication, error handling, and observability across services.",
      "Designed platform-wide authentication, role-based access control, audit logging, and transactional outbox patterns for reliable Kafka event delivery.",
      "Implemented change data capture pipelines with Debezium and Kafka Connect to propagate database changes reliably across the platform.",
      "Built an event-driven notification service covering in-app, real-time, email, and localized communications.",
      "Delivered end-to-end product listing: suppliers create, enrich, manage, and publish offerings through structured review and approval workflows, with optimistic locking and version history preventing silent overwrites.",
      "Contributed to order orchestration with Temporal for multi-step order processing across distributed services, and built VNPay payment workflows covering initiation, callbacks, and transaction tracking.",
      "Built a provider-agnostic translation service (internal AI, Google Translate, LLMs) with fallback chains, glossary protection, caching, and batch processing for platform-wide multilingual content.",
      "Built a centralized file service with presigned URLs so clients upload directly to object storage without loading backend servers.",
    ],
    outcomes: [
      "Domain teams build on one consistent service foundation instead of re-solving infrastructure per service.",
      "Marketplace events are delivered reliably end-to-end via outbox + CDC pipelines.",
      "Suppliers manage listings safely under concurrent edits, with traceable change history.",
      "The marketplace serves multilingual business content through one consistent translation workflow.",
    ],
    stack: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "TypeORM",
      "gRPC",
      "Kafka",
      "Debezium CDC",
      "Temporal",
      "Redis",
      "Socket.IO",
      "VNPay",
      "Docker",
    ],
    productUrl: "https://arobid.com/vi",
  },
  {
    slug: "gkim-healthcare",
    title: "GKIM — healthcare & AI platforms",
    client: "GKIM Digital",
    domain: "Healthcare / multi-tenant SaaS",
    role: "Backend engineer across telehealth, multi-tenant SaaS, and AI platforms",
    summary:
      "Production healthcare systems: a telehealth platform connecting patients, providers, and labs; a multi-tenant SaaS for branded patient portals; and an event-driven backend for AI-assisted DNA analysis workflows.",
    problem:
      "GKIM operates a genetics-led Telehealth OS spanning patient records, appointments, diagnostics, payments, and AI analysis. The work required evolving a live healthcare platform safely while building new multi-tenant and AI-driven capabilities alongside it.",
    contributions: [
      "Maintained and evolved the core telehealth platform: patient records, provider operations, laboratory interactions, appointment booking, and care workflows.",
      "Optimized PostgreSQL queries, schema design, and connection handling to improve API performance and production stability.",
      "Designed Celery workflows for asynchronous processing and scheduled jobs, and integrated NMI and Stripe payment flows for telehealth billing.",
      "Built multi-tenant foundations for the E4G platform: tenant provisioning, data and configuration boundaries, RBAC, and separate global and tenant-level administration.",
      "Enabled healthcare partners to launch branded patient portals with their own examination offerings and appointment booking, synchronized via webhook-driven workflow templates.",
      "Designed and built an event-driven microservice backend from scratch (Turborepo monorepo) for long-running DNA processing: state tracking, retries, failure handling, and operational auditability across PostgreSQL and MongoDB.",
    ],
    outcomes: [
      "A production healthcare platform kept stable and fast while gaining new capabilities.",
      "Third-party healthcare organizations launch branded portals on shared infrastructure with clear tenant boundaries.",
      "Operations teams gained visibility into DNA processing state, task progress, and failures.",
    ],
    stack: [
      "Django",
      "Python",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "Celery",
      "NATS JetStream",
      "gRPC",
      "AWS",
      "Stripe",
      "NMI",
      "React",
    ],
    productUrl: "https://gkim.digital/",
  },
  {
    slug: "finexis-ekyc",
    title: "Finexis — eKYC customer onboarding",
    client: "Finexis (Singapore)",
    domain: "Fintech / identity verification",
    role: "Software engineer",
    summary:
      "Digital identity verification for a Singapore financial advisory firm — new eKYC verification flows, mobile-facing APIs, and database optimization that cut page loads from 23s to 2s.",
    problem:
      "Finexis needed to onboard customers digitally with automated identity and verification workflows, but the legacy system was slow and hard to extend: representative pages took 23 and 26 seconds to load.",
    contributions: [
      "Developed new eKYC verification types and Django REST APIs consumed by mobile applications.",
      "Configured Celery background processing for asynchronous verification and integration workflows.",
      "Integrated third-party insurance APIs into onboarding and customer verification.",
      "Refactored legacy backend code and database structures for maintainability and data-access efficiency.",
    ],
    outcomes: [
      "Representative page load times dropped from 23s to 2s and from 26s to 5s after SQL and schema optimization.",
      "Mobile onboarding gained new verification types without destabilizing the legacy system.",
    ],
    stack: ["Django", "Python", "MySQL", "Celery", "AWS", "REST APIs"],
    productUrl: "https://www.finexis.com.sg/",
  },
  {
    slug: "luxe-nomad",
    title: "The Luxe Nomad — booking platform modernization",
    client: "The Luxe Nomad",
    domain: "Travel / hospitality",
    role: "Full-stack engineer",
    summary:
      "Booking and operations systems for Asia-Pacific's largest luxury villa rental company — Django REST APIs, cloud migration of background jobs, and a Django 2→4 upgrade.",
    problem:
      "The Luxe Nomad manages a curated portfolio of luxury villas and chalets across Japan, Indonesia, and Thailand. Its booking and operations platform ran on an aging Django 2 codebase with background processing that was costly to operate and hard to deploy.",
    contributions: [
      "Designed and implemented Django REST APIs for booking, sales, and marketing workflows, plus the external integrations the platform depends on.",
      "Migrated Celery tasks and scheduled jobs to Google Cloud Tasks and managed cron, modernizing background processing and deployments.",
      "Upgraded the application from Django 2 to Django 4, addressing compatibility, security, and long-term maintainability.",
      "Automated business reporting through the Google Sheets API, reducing manual data preparation for operations teams.",
      "Contributed to the React/Bootstrap front-end redesign, working directly with the client to translate business requirements into technical solutions.",
    ],
    outcomes: [
      "The platform moved to a supported framework version with modern, cloud-managed background processing.",
      "Operations teams got automated reporting instead of manual spreadsheet preparation.",
    ],
    stack: [
      "Django",
      "Python",
      "PostgreSQL",
      "Celery",
      "Google Cloud Platform",
      "Google Sheets API",
      "React",
      "Bootstrap",
    ],
    productUrl: "https://theluxenomad.com/",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
```

- [ ] **Step 5: Create `src/data/projects.ts`**

```ts
import type { SupportingProject } from "./types";

export const projects: SupportingProject[] = [
  {
    name: "Hoplite Technology",
    description:
      "AI-powered chat tools for cybersecurity education: Next.js + OpenAI experiences, serverless Python APIs on AWS Lambda with response streaming for long-running AI requests.",
    stack: ["Next.js", "TypeScript", "Python", "AWS Lambda", "OpenAI API", "MongoDB"],
  },
  {
    name: "Watchtowr",
    description:
      "Exposure-management security platform: GraphQL APIs and UI for onboarding new security asset types, plus PDF reporting for findings.",
    stack: ["Next.js", "NestJS", "GraphQL", "Apollo", "Kafka"],
    productUrl: "https://watchtowr.com/",
  },
  {
    name: "TurisVPN",
    description:
      "VPN product administration: scheduled email campaign workflows with CKEditor and Celery, and N+1 query fixes that sped up data-heavy Django Admin pages.",
    stack: ["Django", "Python", "Celery"],
  },
  {
    name: "Clinger",
    description:
      "Mobile dating app backend: profiles, matching, messaging, automated nudity detection for content safety, plus schema redesign and query optimization.",
    stack: ["NestJS", "TypeScript", "PostgreSQL"],
  },
];
```

- [ ] **Step 6: Create `src/data/skills.ts`**

```ts
import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Python"] },
  { label: "Backend", items: ["NestJS", "Django", "FastAPI", "Node.js"] },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  {
    label: "Data & messaging",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Kafka", "NATS", "gRPC"],
  },
  {
    label: "Cloud & infrastructure",
    items: ["AWS", "Google Cloud", "Docker", "Temporal", "Celery", "Nginx"],
  },
];
```

- [ ] **Step 7: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add src/data
git commit -m "feat: add typed static content data layer"
```

---

### Task 3: UI primitives + navbar/footer

**Files:**
- Create: `src/components/section.tsx`, `src/components/button-link.tsx`, `src/components/navbar.tsx`, `src/components/footer.tsx`
- Modify: `src/app/layout.tsx` (add Navbar/Footer)

**Interfaces:**
- Consumes: `site` from `src/data/site.ts`.
- Produces:
  - `<Section id={string} title={string}>{children}</Section>`
  - `<ButtonLink href={string} variant?: "primary" | "secondary">{children}</ButtonLink>`
  - `<Navbar />`, `<Footer />` (no props).

- [ ] **Step 1: Create `src/components/section.tsx`**

```tsx
import type { ReactNode } from "react";

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
    <section id={id} className="fade-in-view scroll-mt-24 py-16 sm:py-20">
      <h2 className="mb-8 text-sm font-semibold uppercase tracking-widest text-muted">
        {title}
      </h2>
      {children}
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/button-link.tsx`**

```tsx
import Link from "next/link";
import type { ReactNode } from "react";

const styles = {
  primary:
    "bg-accent text-white hover:opacity-90 dark:text-background",
  secondary:
    "border border-border text-foreground hover:border-accent hover:text-accent",
};

export default function ButtonLink({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: keyof typeof styles;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}
```

- [ ] **Step 3: Create `src/components/navbar.tsx`**

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
    <header className="sticky top-0 z-10 -mx-6 border-b border-border bg-background/80 px-6 backdrop-blur sm:-mx-8 sm:px-8">
      <nav className="flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold">
          {site.name}
        </Link>
        <div className="flex items-center gap-5 text-sm text-muted">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
          <a
            href={site.cvUrl}
            download
            className="rounded-md border border-border px-3 py-1.5 transition-colors hover:border-accent hover:text-accent"
          >
            CV
          </a>
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 4: Create `src/components/footer.tsx`**

```tsx
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 text-sm text-muted">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <div className="flex gap-4">
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-foreground">
            Email
          </a>
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Wire into `src/app/layout.tsx`** — replace the `<body>` content:

```tsx
      <body className={`${inter.className} bg-background text-foreground`}>
        <main className="mx-auto min-h-screen max-w-3xl px-6 sm:px-8">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
```

Add imports at the top of the file:

```tsx
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
```

- [ ] **Step 6: Verify**

Run: `npm run build`
Expected: build passes. Then `npm run dev`, open `http://localhost:3000` — navbar and footer render around stub heading, light/dark follows OS setting.

- [ ] **Step 7: Commit**

```bash
git add src/components src/app/layout.tsx
git commit -m "feat: add layout primitives, navbar, and footer"
```

---

### Task 4: Homepage

**Files:**
- Create: `src/components/case-study-card.tsx`, `src/components/project-row.tsx`
- Rewrite: `src/app/page.tsx`

**Interfaces:**
- Consumes: all data modules, `Section`, `ButtonLink`.
- Produces: home sections with anchor ids `services`, `work`, `projects`, `skills`, `contact` (contact section body is filled by Task 6; this task leaves contact links only).

- [ ] **Step 1: Create `src/components/case-study-card.tsx`**

```tsx
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CaseStudy } from "@/data/types";

export default function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group block rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted">{caseStudy.domain}</p>
          <h3 className="mt-2 text-lg font-semibold">{caseStudy.title}</h3>
        </div>
        <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted transition-colors group-hover:text-accent" />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{caseStudy.summary}</p>
      <p className="mt-4 text-xs text-muted">{caseStudy.stack.slice(0, 6).join(" · ")}</p>
    </Link>
  );
}
```

- [ ] **Step 2: Create `src/components/project-row.tsx`**

```tsx
import type { SupportingProject } from "@/data/types";

export default function ProjectRow({ project }: { project: SupportingProject }) {
  return (
    <div className="border-b border-border py-5 last:border-b-0">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-medium">
          {project.productUrl ? (
            <a
              href={project.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              {project.name}
            </a>
          ) : (
            project.name
          )}
        </h3>
        <p className="shrink-0 text-xs text-muted">{project.stack.slice(0, 3).join(" · ")}</p>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.description}</p>
    </div>
  );
}
```

- [ ] **Step 3: Rewrite `src/app/page.tsx`**

```tsx
import ButtonLink from "@/components/button-link";
import CaseStudyCard from "@/components/case-study-card";
import ProjectRow from "@/components/project-row";
import Section from "@/components/section";
import { caseStudies } from "@/data/case-studies";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";

export default function HomePage() {
  return (
    <>
      <section className="py-20 sm:py-28">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {site.name}
          <span className="mt-2 block text-2xl font-normal text-muted sm:text-3xl">
            {site.title}
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{site.tagline}</p>
        <div className="mt-8 flex gap-3">
          <ButtonLink href="/#work">View work</ButtonLink>
          <ButtonLink href={site.cvUrl} variant="secondary">
            Download CV
          </ButtonLink>
        </div>
      </section>

      <Section id="services" title="What I do">
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="work" title="Selected work">
        <div className="grid gap-4">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </Section>

      <Section id="projects" title="More projects">
        <div>
          {projects.map((project) => (
            <ProjectRow key={project.name} project={project} />
          ))}
        </div>
      </Section>

      <Section id="skills" title="Tech stack">
        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="text-sm font-medium">{group.label}</h3>
              <p className="mt-1.5 text-sm text-muted">{group.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact" title="Contact">
        <p className="max-w-xl leading-relaxed text-muted">
          Have a project in mind or need an extra engineer on your team? Email{" "}
          <a href={`mailto:${site.email}`} className="text-accent hover:underline">
            {site.email}
          </a>{" "}
          or use the form below.
        </p>
      </Section>
    </>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: all six sections render; navbar anchors scroll to sections; case study cards link to `/work/arobid` etc. (404 until Task 5 — expected).

- [ ] **Step 5: Commit**

```bash
git add src/components src/app/page.tsx
git commit -m "feat: build one-page home with services, work, projects, skills"
```

---

### Task 5: Case study pages

**Files:**
- Create: `src/app/work/[slug]/page.tsx`

**Interfaces:**
- Consumes: `caseStudies`, `getCaseStudy` from `src/data/case-studies.ts`.
- Produces: static routes `/work/arobid`, `/work/gkim-healthcare`, `/work/finexis-ekyc`, `/work/luxe-nomad` with per-page metadata.

- [ ] **Step 1: Create `src/app/work/[slug]/page.tsx`**

```tsx
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/data/case-studies";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return {};
  return {
    title: caseStudy.title,
    description: caseStudy.summary,
    openGraph: { title: caseStudy.title, description: caseStudy.summary },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  return (
    <article className="py-16">
      <Link
        href="/#work"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All work
      </Link>

      <header className="mt-8">
        <p className="text-xs uppercase tracking-wider text-muted">
          {caseStudy.domain} · {caseStudy.role}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {caseStudy.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{caseStudy.summary}</p>
        {caseStudy.productUrl && (
          <a
            href={caseStudy.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm text-accent hover:underline"
          >
            Visit product <ArrowUpRight className="size-4" />
          </a>
        )}
      </header>

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Context</h2>
          <p className="mt-4 max-w-2xl leading-relaxed">{caseStudy.problem}</p>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
            What I did
          </h2>
          <ul className="mt-4 max-w-2xl space-y-3">
            {caseStudy.contributions.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Outcomes</h2>
          <ul className="mt-4 max-w-2xl space-y-3">
            {caseStudy.outcomes.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Stack</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {caseStudy.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build output lists `/work/[slug]` with 4 static paths (SSG). Then in dev server, open `/work/arobid` and `/work/finexis-ekyc` — all sections render; `/work/nonexistent` → 404.

- [ ] **Step 3: Commit**

```bash
git add src/app/work
git commit -m "feat: add static case study pages with per-page metadata"
```

---

### Task 6: Contact form + API route

**Files:**
- Create: `src/app/api/contact/route.ts`, `src/components/contact-form.tsx`
- Modify: `src/app/page.tsx` (render form in contact section)

**Interfaces:**
- Produces: `POST /api/contact` accepting JSON `{ name, email, message, company }` (`company` = honeypot, must be empty). Responses: `200 {success:true}`, `400/500 {success:false, message}`.
- Consumes: env `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.

- [ ] **Step 1: Create `src/app/api/contact/route.ts`**

```ts
import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string; // honeypot — humans never see this field
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request): Promise<NextResponse> {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  if (payload.company) {
    return NextResponse.json({ success: true });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { success: false, message: "Please fill in all fields with a valid email." },
      { status: 400 },
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Contact: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing");
    return NextResponse.json(
      { success: false, message: "Message delivery is not configured." },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `New portfolio message from ${name}\n\nEmail: ${email}\n\n${message}`,
      }),
    });
    const data = await res.json();
    if (!data.ok) {
      throw new Error(`Telegram API error: ${JSON.stringify(data)}`);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact: delivery failed", error);
    return NextResponse.json(
      { success: false, message: "Could not send your message." },
      { status: 500 },
    );
  }
}
```

- [ ] **Step 2: Create `src/components/contact-form.tsx`**

```tsx
"use client";

import { useState } from "react";
import { site } from "@/data/site";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          company: formData.get("company"),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message ?? "Failed to send.");
      }
      setStatus("sent");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to send.");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent";

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className={inputClass} />
        <input
          name="email"
          type="email"
          required
          placeholder="Your email"
          className={inputClass}
        />
      </div>
      <textarea
        name="message"
        required
        rows={5}
        placeholder="Tell me about your project"
        className={inputClass}
      />
      <input
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 dark:text-background"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "sent" && (
        <p className="text-sm text-accent">Thanks — I&apos;ll get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-500">
          {errorMessage} You can also email me directly at{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
```

- [ ] **Step 3: Render form in `src/app/page.tsx`** — add import and place inside contact Section after the paragraph:

```tsx
import ContactForm from "@/components/contact-form";
```

```tsx
      <Section id="contact" title="Contact">
        <p className="max-w-xl leading-relaxed text-muted">
          Have a project in mind or need an extra engineer on your team? Email{" "}
          <a href={`mailto:${site.email}`} className="text-accent hover:underline">
            {site.email}
          </a>{" "}
          or use the form below.
        </p>
        <ContactForm />
      </Section>
```

- [ ] **Step 4: Verify API**

Run dev server, then:

```bash
curl -s -X POST http://localhost:3000/api/contact -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"bad","message":"hi"}'
```
Expected: `{"success":false,"message":"Please fill in all fields with a valid email."}`

```bash
curl -s -X POST http://localhost:3000/api/contact -H 'Content-Type: application/json' \
  -d '{"name":"Bot","email":"bot@x.com","message":"spam","company":"filled"}'
```
Expected: `{"success":true}` (honeypot short-circuits, nothing delivered).

With real env vars set, submit the form in the browser → message arrives on Telegram, form shows success state.

- [ ] **Step 5: Commit**

```bash
git add src/app/api src/components/contact-form.tsx src/app/page.tsx
git commit -m "feat: add contact form with Telegram delivery and honeypot"
```

---

### Task 7: SEO — sitemap, robots, JSON-LD

**Files:**
- Rewrite: `src/app/sitemap.ts`
- Verify/keep: `src/app/robots.ts`
- Modify: `src/app/layout.tsx` (JSON-LD Person schema)

**Interfaces:**
- Consumes: `caseStudies`, `site`.

- [ ] **Step 1: Rewrite `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";

const BASE_URL = "https://btngoc.io.vn";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...caseStudies.map((cs) => ({
      url: `${BASE_URL}/work/${cs.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
```

- [ ] **Step 2: Check `src/app/robots.ts`** — keep if it allows all and points at the sitemap; otherwise replace with:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://btngoc.io.vn/sitemap.xml",
  };
}
```

- [ ] **Step 3: Add JSON-LD to `src/app/layout.tsx`** — inside `<body>`, before `<main>`:

```tsx
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ngoc Bui",
              jobTitle: "Software Engineer",
              email: "mailto:ngocbthe@gmail.com",
              url: "https://btngoc.io.vn",
              sameAs: [
                "https://github.com/shinxz12",
                "https://www.linkedin.com/in/ngocbthe/",
              ],
            }),
          }}
        />
```

- [ ] **Step 4: Verify**

Run: `npm run build`, then in dev server open `http://localhost:3000/sitemap.xml` — 5 URLs (home + 4 case studies). View page source — JSON-LD script present.

- [ ] **Step 5: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts src/app/layout.tsx
git commit -m "feat: add sitemap, robots, and Person JSON-LD"
```

---

### Task 8: Asset cleanup + final verification

**Files:**
- Delete: unused files in `public/` (old template assets)
- Create: `public/cv.pdf` placeholder note (owner supplies the real PDF)

**Interfaces:**
- Consumes: everything.

- [ ] **Step 1: Clean `public/`**

```bash
cd /Users/riley/workspaces/portfolio
rm -f public/grid.svg public/card.png public/top-bg.svg public/section.svg \
  public/file.svg public/hero.svg public/blur-23.svg public/vercel.svg \
  "public/vercel copy.svg" public/next.svg public/globe.svg public/window.svg
rm -rf public/png public/image
```

Keep: `public/profile.jpg` (available for future use / OG image).

- [ ] **Step 2: CV placeholder**

If the owner has not yet provided `public/cv.pdf`, create `public/cv-README.md`:

```markdown
Place the exported CV as `public/cv.pdf`. The navbar and hero "Download CV" buttons link to `/cv.pdf`.
```

Do NOT commit a fake PDF.

- [ ] **Step 3: Full verification pass**

```bash
npm run lint
npm run build
```
Expected: both pass, zero errors.

Manual pass on `npm run dev`:
- `/` — all sections render, light and dark mode both readable, mobile viewport (375px) has no horizontal scroll.
- `/work/arobid`, `/work/gkim-healthcare`, `/work/finexis-ekyc`, `/work/luxe-nomad` — render with correct content.
- Navbar anchors scroll; "All work" link returns to `/#work`.
- Contact form validation + submit behavior (per Task 6 checks).
- `/sitemap.xml`, `/robots.txt` respond.

- [ ] **Step 4: Rewrite `README.md`**

```markdown
# btngoc.io.vn — portfolio

Personal portfolio of Ngoc Bui, Software Engineer. Minimal one-page site with
per-project case studies, fully static content, and a Telegram-backed contact form.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind 4 · lucide-react

## Structure

- `/` — one-page home: hero, services, selected work, more projects, tech stack, contact
- `/work/[slug]` — case study pages, statically generated
- `/api/contact` — contact form endpoint, delivers to Telegram
- `src/data/` — ALL site content, typed TypeScript (no CMS, no database)

## Editing content

- Case studies: `src/data/case-studies.ts` — add an object, the page and sitemap
  entry are generated automatically.
- Services, supporting projects, skills, personal info: sibling files in `src/data/`.
- CV: replace `public/cv.pdf`.

## Environment variables

- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — contact form delivery
- `NEXT_PUBLIC_GTM` — Google Tag Manager id

## Development

npm install
npm run dev     # http://localhost:3000
npm run build   # production build (static)
```

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: clean unused assets, update README for rebuilt portfolio"
```
