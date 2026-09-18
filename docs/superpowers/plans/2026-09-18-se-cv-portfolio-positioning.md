# Software Engineer CV and Portfolio Positioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revise the CV and portfolio copy so recruiters see Ngoc Bui as a Software Engineer with strong evidence in production systems, product delivery, modernization, integrations, and performance.

**Architecture:** Keep the existing static-content architecture. Update typed data files that feed the Next.js portfolio, update the standalone HTML CV, then regenerate the public PDF from that HTML.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind 4, static TypeScript content data, standalone HTML/CSS CV, headless Chrome PDF export.

---

## File Structure

- Modify `src/data/site.ts`: refine hero and metadata copy around Software Engineer positioning.
- Modify `src/data/services.ts`: reframe "What I do" as recruiter-visible engineering value.
- Modify `src/data/case-studies.ts`: tighten selected summaries/outcomes without inventing unsupported claims.
- Modify `cv/cv.html`: revise summary, skill labels, and selected bullets for the same positioning.
- Update `public/BUI THE NGOC - SOFTWARE ENGINEER.pdf`: regenerate from `cv/cv.html`.

### Task 1: Portfolio Positioning Copy

**Files:**
- Modify: `src/data/site.ts`
- Modify: `src/data/services.ts`

- [ ] **Step 1: Update site positioning copy**

Revise `site.headline`, `site.intro`, `site.tagline`, and `site.description` so the portfolio presents a broad Software Engineer identity with backend/platform strength.

Use copy in this direction:

```ts
headline: "I build production systems that stay clear, fast, and reliable.",
intro:
  "Software Engineer with 5+ years building APIs, workflows, integrations, and product features across B2B commerce, healthcare, fintech, travel, and cybersecurity.",
tagline:
  "Software Engineer with 5+ years building production systems across B2B commerce, healthcare, fintech, travel, cybersecurity, and consumer products. Strongest in backend platforms, APIs, asynchronous workflows, integrations, modernization, and performance.",
description:
  "Software Engineer with hands-on delivery across B2B commerce, healthcare, fintech onboarding, cybersecurity, travel, and consumer apps. I help teams design reliable APIs, ship product workflows end to end, integrate complex third-party systems, and modernize slow or aging platforms.",
```

- [ ] **Step 2: Update the hero line split**

Modify `src/components/hero.tsx` so `HEADLINE_LINES` matches the new headline:

```ts
const HEADLINE_LINES = ["I build production systems", "that stay clear, fast, and reliable."];
```

- [ ] **Step 3: Reframe services**

Update `src/data/services.ts` to these four capabilities:

```ts
export const services: Service[] = [
  {
    title: "Production systems & APIs",
    description:
      "Reliable REST, GraphQL, and gRPC APIs, domain services, RBAC, audit trails, and backend foundations that teams can build on.",
  },
  {
    title: "Workflow automation & integrations",
    description:
      "Asynchronous jobs, event-driven pipelines, payment flows, AI APIs, partner systems, and third-party services wired into product workflows.",
  },
  {
    title: "Product delivery across the stack",
    description:
      "End-to-end features across React/Next.js frontends and NestJS or Django backends, from business requirements to production rollout.",
  },
  {
    title: "Modernization & performance",
    description:
      "Framework upgrades, database and query optimization, cloud-managed background processing, and refactoring legacy systems so they stay maintainable.",
  },
];
```

- [ ] **Step 4: Run type/build validation**

Run:

```bash
npm run build
```

Expected: Next.js production build completes successfully.

### Task 2: Case Study Copy Tightening

**Files:**
- Modify: `src/data/case-studies.ts`

- [ ] **Step 1: Tighten headline project summaries**

Revise Arobid, GKIM, Finexis, and Luxe Nomad summaries so each reads as "problem -> technical work -> value" within one sentence. Keep all supported facts.

Use this copy:

```ts
// Arobid summary
"B2B marketplace backend platform spanning catalogs, RFQs, orders, payments, notifications, translation, and digital expos, built on reliable microservices and event-driven workflows."

// GKIM summary
"Healthcare and AI platforms covering telehealth operations, multi-tenant patient portals, and event-driven DNA analysis workflows with strong tenant boundaries and operational visibility."

// Finexis summary
"Digital identity onboarding for a Singapore financial advisory firm, including eKYC flows, mobile APIs, background processing, insurance integrations, and page-load reductions from 23s to 2s."

// Luxe Nomad summary
"Booking and operations systems for Asia-Pacific luxury villa rentals, modernized through Django REST APIs, cloud-managed background jobs, reporting automation, and a Django 2 to 4 upgrade."
```

- [ ] **Step 2: Tighten selected outcomes**

Adjust outcomes only where wording can be clearer without adding claims. Keep Finexis metrics exactly as supported.

- [ ] **Step 3: Run type/build validation**

Run:

```bash
npm run build
```

Expected: Next.js production build completes successfully.

### Task 3: CV HTML Copy Revision

**Files:**
- Modify: `cv/cv.html`

- [ ] **Step 1: Revise CV summary**

Replace the existing summary paragraph with:

```html
<p>
  Software Engineer with 5+ years of experience building production systems across B2B commerce,
  healthcare, fintech, travel, cybersecurity, and consumer products. Strongest in backend platforms,
  APIs, asynchronous workflows, third-party integrations, modernization, and performance optimization,
  with hands-on full-stack delivery from product requirements to production rollout.
</p>
```

- [ ] **Step 2: Refine skills table labels**

Keep the existing compact table but make labels more recruiter-oriented:

```html
<td>Languages &amp; APIs</td>
<td>Python, TypeScript, JavaScript, REST, gRPC, GraphQL</td>
```

Keep framework names visible in the remaining rows or add a row for:

```html
<td>Frameworks</td>
<td>Django, FastAPI, NestJS, Node.js, React, Next.js</td>
```

- [ ] **Step 3: Tighten selected CV bullets**

Edit bullets for Arobid, GKIM, Finexis, and The Luxe Nomad so the first bullet under each major project shows business context plus technical contribution. Preserve supported metrics and avoid adding scale/team-size claims.

- [ ] **Step 4: Export PDF**

Run:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --no-pdf-header-footer \
  --print-to-pdf="public/BUI THE NGOC - SOFTWARE ENGINEER.pdf" cv/cv.html
```

Expected: Chrome writes `public/BUI THE NGOC - SOFTWARE ENGINEER.pdf`.

### Task 4: Final Verification

**Files:**
- Inspect: `public/BUI THE NGOC - SOFTWARE ENGINEER.pdf`
- Inspect: Git diff

- [ ] **Step 1: Run final build**

Run:

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 2: Inspect PDF metadata/page count**

Run:

```bash
pdfinfo "public/BUI THE NGOC - SOFTWARE ENGINEER.pdf" | sed -n '1,20p'
```

Expected: A4-sized PDF is produced. Page count should remain reasonable for a CV.

- [ ] **Step 3: Review diff for unsupported claims**

Run:

```bash
git diff -- src/data/site.ts src/data/services.ts src/data/case-studies.ts cv/cv.html
```

Expected: diff keeps "Software Engineer" as the main title and does not add unsupported metrics, team sizes, or leadership claims.
