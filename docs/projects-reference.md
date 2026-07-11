# Projects Reference for Portfolio and CV

This document maps the major workspaces in `~/workspaces` to the product stories that can be used in a portfolio or CV.

It combines:
- current platform work at `Arobid`
- current platform work at `GKIM`
- legacy outsource/client projects listed in `src/utils/data/projects-data.ts`

The goal is to have one source of truth for:
- which projects are strong enough to show publicly
- which repository matches which product story
- which projects should be used as primary CV evidence

---

## 1. Portfolio Storylines

### A. Arobid

Arobid is a B2B marketplace platform built as a microservice-based backend system.

Core product story:
- onboard sellers and buyers
- publish products and manage catalog data
- support negotiation and quotation workflows between businesses
- support digital expo / trade-show scenarios
- support multi-tenant third-party storefronts and platform integrations

What this shows technically:
- distributed backend architecture
- service boundaries and shared libraries
- gRPC, Kafka, PostgreSQL, TypeORM, NestJS
- workflow orchestration, observability, migrations, and performance testing

### B. GKIM

GKIM is a set of enterprise platforms in healthcare and AI.

Core product story:
- manage patient medical records
- connect doctors, patients, and labs
- support telehealth workflows and booking
- run AI services for analysis, counseling, and document processing
- support multi-tenant third-party healthcare portals with configurable branding and content

What this shows technically:
- multi-tenant SaaS
- healthcare workflows
- React, NestJS, Django, Python services
- AI-assisted workflows and microservices
- enterprise admin dashboards and patient/provider experiences

### C. Legacy Outsource / Client Work

These projects are already listed in the CV data file and represent prior client work.

Core product story:
- vacation rental booking and operations
- cybersecurity awareness and AI tooling
- KYC / eKYC automation
- travel / VPN / messaging / dating / chat / assistant tooling

What this shows technically:
- delivery under client constraints
- maintenance and modernization
- performance optimization
- API integration
- cross-functional product work

---

## 2. Project to Repository Mapping

### Arobid repositories

| Project story | Repository | Notes |
|---|---|---|
| Core shared backend platform | `arobid/be-common` | Shared NestJS library used across Arobid services |
| Order orchestration | `arobid/be-core-order` | Central order service with Temporal/Saga workflows |
| Product catalog | `arobid/be-domain-product` | Categories, products, variants, media, approvals |
| RFQ / negotiation flow | `arobid/be-domain-commerce` | Buyer drafts, supplier quotations, AI-assisted parsing |
| Seller onboarding and KYB | `arobid/be-domain-seller` | Seller profile, onboarding, verification |
| Notifications | `arobid/be-core-notification` | Kafka, Socket.IO, email delivery, locale templates |
| Translation | `arobid/be-core-translation` | Multi-provider translation microservice |
| File service | `arobid/be-core-file` | S3-compatible file uploads and presigned URLs |
| Tenant / auth / master data | `arobid/be-core-tenant`, `arobid/be-core-auth`, `arobid/be-core-master-data` | Core platform infrastructure |
| Shared migrations | `arobid/database-migrations` | Centralized migrations and seeds across services |
| API documentation tooling | `arobid/api-tooling` | Postman collections and Swagger snapshot viewer |
| Performance/load testing | `arobid/be-performance-tests` | K6 tests for backend services |
| Expo / trade-show domain | `arobid/be-domain-expo` | Digital expo, halls, zones, booths |
| Partner / search / promotion / tracking | `arobid/be-domain-partner`, `arobid/be-domain-search`, `arobid/be-domain-promotion`, `arobid/be-domain-tracking` | Supporting marketplace services |

### GKIM repositories

| Project story | Repository | Notes |
|---|---|---|
| AI console / microservices platform | `gkim-devs/ai-console` | Enterprise AI microservices platform, React + NestJS |
| DNAI services / AI medical services | `gkim-devs/dnai-services` | Python 3.12 monorepo for OCR, counseling, clinical documentation |
| Global admin / multi-tenant admin platform | `gkim-devs/e4g-global-admin` | Full-stack admin platform with RBAC and tenant management |
| Tenant instance / SaaS platform | `gkim-devs/e4g-tenant-instance` | Multi-tenant SaaS with tenant portal and tenant admin |
| Telehealth platform | `gkim-devs/telehealth-platform` | Django-based multi-tenant healthcare platform |
| Telehealth provider dashboard | `gkim-devs/telehealth-provider-dashboard` | React dashboard for providers, real-time patient management |
| TMS workflow sync | `gkim-devs/tms-workflow` | Webhook-based synchronization for workflow templates and related data |
| TMS workflow production branch | `gkim-devs/tms-workflow-prod` | Production counterpart for the sync platform |
| Supporting email templates / tests / utilities | `gkim-devs/gth-email-templates`, `gkim-devs/test-console`, `gkim-devs/the-bot-lifefile`, `gkim-devs/tms-billing`, `gkim-devs/tms-extract-kareo-billing-data` | Useful support repos, but not main portfolio headlines |

### Legacy outsource / client repositories

| CV project | Repository | Evidence / notes |
|---|---|---|
| The Luxe Nomad | `workspaces/tlnproject/lvh`, `workspaces/tlnproject/tln` | Old booking platform repos for TheLuxeNomad.com |
| Clinger | `workspaces/clinger/godating-backend` | Backend repo for the dating application mentioned in CV data |
| TurisVPN | `workspaces/turisvpn-backend-internal` | Backend internal repo for VPN-related product work |
| Hoplite Technology | `workspaces/hoplite/chat-backend`, `workspaces/hoplite/AHO-Teams-API`, `workspaces/hoplite/AHOv2`, `workspaces/hoplite/AHOv4`, `workspaces/hoplite/multi-chat`, `workspaces/hoplite/AgentGPT` | Multiple product repos tied to Hoplite work: chat backend, Teams apps, chat tooling, AI assistant work |
| Finexis eKYC | `workspaces/ekyc/apihub`, `workspaces/ekyc/ekyc-v2`, `workspaces/ekyc/ndorse` | Matching workspace for the eKYC project family in the CV data |

---

## 3. Evidence Summary

### Arobid evidence from code

The Arobid workspace clearly shows a microservice architecture:
- `be-common` is a shared NestJS library
- core services are split by responsibility
- domain services implement business workflows separately
- `database-migrations` centralizes migration ownership
- `api-tooling` centralizes API snapshot and Postman generation

The strongest repositories for a portfolio are:
- `be-core-order`
- `be-domain-commerce`
- `be-domain-product`
- `be-core-notification`
- `be-domain-seller`
- `be-common`
- `database-migrations`
- `api-tooling`

### GKIM evidence from code

The GKIM workspace clearly shows:
- enterprise microservices in `ai-console`
- medical AI platform capabilities in `dnai-services`
- multi-tenant admin and portal products in `e4g-global-admin` and `e4g-tenant-instance`
- healthcare platform depth in `telehealth-platform` and `telehealth-provider-dashboard`
- workflow synchronization and production support in `tms-workflow` and `tms-workflow-prod`

The strongest repositories for a portfolio are:
- `ai-console`
- `dnai-services`
- `e4g-global-admin`
- `telehealth-platform`
- `telehealth-provider-dashboard`
- `e4g-tenant-instance`

### Legacy outsource evidence from CV data

The CV data in `src/utils/data/projects-data.ts` lists these client stories:
- The Luxe Nomad
- Hoplite Technology
- Finexis eKYC
- Watchtowr
- TurisVPN
- Clinger

The matching repositories found in `workspaces/` are:
- The Luxe Nomad -> `workspaces/tlnproject/lvh`, `workspaces/tlnproject/tln`
- Hoplite -> `workspaces/hoplite/*`
- Finexis eKYC -> `workspaces/ekyc/*`
- TurisVPN -> `workspaces/turisvpn-backend-internal`
- Clinger -> `workspaces/clinger/godating-backend`

Watchtowr:
- not found in the current workspace
- should be treated as external / unavailable code evidence unless the repository is recovered later

---

## 4. Recommended Portfolio Shortlist

If the goal is to impress backend / fullstack employers, the best headline projects are:

1. `arobid/be-core-order`
2. `arobid/be-domain-commerce`
3. `arobid/be-domain-product`
4. `arobid/be-core-notification`
5. `arobid/be-common`
6. `gkim-devs/ai-console`
7. `gkim-devs/telehealth-platform`
8. `gkim-devs/e4g-global-admin`
9. `gkim-devs/telehealth-provider-dashboard`
10. `workspaces/hoplite/chat-backend`

If you want the CV to emphasize legacy delivery experience, also include:
- `workspaces/tlnproject/lvh`
- `workspaces/clinger/godating-backend`
- `workspaces/ekyc/apihub`
- `workspaces/turisvpn-backend-internal`

---

## 5. How to Use This in a CV

Use the report in this order:

1. Lead with Arobid if you want to show platform / backend architecture.
2. Lead with GKIM if you want to show enterprise fullstack and healthcare SaaS experience.
3. Add legacy outsource projects as proof of delivery history, not as the main headline.
4. Keep Watchtowr as a named client only if you have separate evidence outside the current workspace.

Suggested structure for the CV:
- Summary
- Core platform work
- Selected projects
- Legacy client work
- Skills / stack

