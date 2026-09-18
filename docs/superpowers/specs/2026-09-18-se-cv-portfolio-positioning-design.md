# Software Engineer CV and Portfolio Positioning Design

## Goal

Refine the CV and portfolio copy so recruiters quickly understand Ngoc Bui's value as a Software Engineer with strong backend/platform depth, production delivery experience, and measurable problem-solving across multiple domains.

## Positioning

Use the title "Software Engineer" throughout the CV and portfolio. Do not narrow the public identity to "Backend Engineer", but make backend systems, APIs, workflow orchestration, integrations, reliability, and performance the strongest evidence underneath that broader title.

The core message:

> Software Engineer with 5+ years building production systems across B2B commerce, healthcare, fintech, travel, cybersecurity, and consumer products. Strongest in backend platforms, APIs, asynchronous workflows, third-party integrations, modernization, and performance optimization.

## Recruiter Value Signals

The revised content should make four values visible within the first screen of the portfolio and the top third of the CV:

1. Builds reliable production systems: microservices, APIs, RBAC, audit logging, outbox, CDC, event-driven workflows.
2. Ships product features end to end: collaborates across product, frontend, backend, integrations, and operations.
3. Modernizes slow or aging systems: Django upgrades, cloud-managed background jobs, query/schema optimization, legacy refactoring.
4. Handles complex domain workflows: B2B marketplace, healthcare SaaS, DNA processing, eKYC, payments, AI chat, cybersecurity tooling.

## CV Content Design

Keep the CV concise and evidence-led. The summary should be broader than backend-only, but it should immediately explain where the candidate is strongest.

Experience sections should use the following emphasis:

- Arobid: distributed B2B commerce platform, shared backend foundations, event reliability, product/order/payment/translation workflows.
- GKIM: healthcare systems, multi-tenant SaaS, AI/DNA processing workflows, production stability.
- Golden Owl: client delivery across fintech, travel, cybersecurity, AI tools, consumer products, with performance wins and modernization.

Bullets should prefer "built/designed/optimized/integrated" plus the business or operational result. Keep measurable claims only where already supported, such as Finexis page load reductions from 23s to 2s and 26s to 5s.

## Portfolio Content Design

The portfolio should read as a high-signal engineering profile, not a generic personal site.

Hero and introductory copy should communicate:

- Software Engineer
- production systems
- APIs/workflows/integrations/performance
- multi-domain delivery

"What I do" should be reframed around recruiter-friendly capabilities:

- Production systems and APIs
- Workflow automation and integrations
- Product delivery across the stack
- Modernization and performance

Case studies should keep the existing problem/contribution/outcome structure, but copy should be tightened so each project shows a clear "problem -> technical work -> value" arc. Arobid and GKIM remain the headline examples; Finexis remains a strong measurable performance example.

## Non-Goals

- Do not redesign the visual language from scratch.
- Do not invent new metrics, leadership scope, team size, traffic scale, or business impact that is not already supported.
- Do not remove backend/platform depth in an attempt to sound more general.
- Do not add a CMS, database, or new content architecture.

## Files Expected To Change

- `src/data/site.ts`: hero, intro, tagline, and description positioning.
- `src/data/services.ts`: recruiter-facing capability framing.
- `src/data/case-studies.ts`: tighten summaries, outcomes, and selected wording.
- `cv/cv.html`: revise summary, skills labels, and selected experience bullets.
- `public/BUI THE NGOC - SOFTWARE ENGINEER.pdf`: regenerate from `cv/cv.html`.

## Verification

- Run the project build or equivalent static validation.
- Regenerate the PDF from the HTML CV.
- Inspect the generated CV enough to confirm it still fits cleanly on A4 and the contact/header layout remains intact.
- Check that revised copy avoids unsupported claims and keeps "Software Engineer" as the main title.
