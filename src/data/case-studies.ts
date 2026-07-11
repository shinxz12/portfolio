import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "arobid",
    title: "Arobid — B2B marketplace backend platform",
    client: "Arobid Tech JSC",
    domain: "B2B commerce",
    role: "Backend engineer on the core platform team",
    featured: true,
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
  },
  {
    slug: "gkim-healthcare",
    title: "GKIM — healthcare & AI platforms",
    client: "GKIM Digital",
    domain: "Healthcare / multi-tenant SaaS",
    role: "Backend engineer across telehealth, multi-tenant SaaS, and AI platforms",
    featured: true,
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
  },
  {
    slug: "finexis-ekyc",
    title: "Finexis — eKYC customer onboarding",
    client: "Finexis (Singapore)",
    domain: "Fintech / identity verification",
    role: "Software engineer",
    featured: true,
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
  },
  {
    slug: "luxe-nomad",
    title: "The Luxe Nomad — booking platform modernization",
    client: "The Luxe Nomad",
    domain: "Travel / hospitality",
    role: "Full-stack engineer",
    featured: true,
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
  },
  {
    slug: "hoplite",
    title: "Hoplite Technology — AI tools for cybersecurity education",
    client: "Hoplite Technology",
    domain: "Cybersecurity / AI tooling",
    role: "Software engineer",
    featured: false,
    summary:
      "AI-powered chat experiences and serverless APIs for a cybersecurity awareness company — Next.js + OpenAI frontends, Python AWS Lambda backends with response streaming.",
    problem:
      "Hoplite Technology provides cybersecurity awareness training and AI-assisted education and productivity tools. The products needed interactive AI chat experiences and lightweight backend APIs that deploy independently and handle long-running AI requests within AWS API Gateway constraints.",
    contributions: [
      "Developed AI-powered chat experiences using Next.js and the OpenAI API for interactive cybersecurity education and assistant workflows.",
      "Designed serverless REST APIs with Python, AWS Lambda, and API Gateway for independently deployable backend capabilities.",
      "Implemented streaming responses to work around API Gateway timeout constraints for long-running AI requests.",
      "Built and maintained chat backend services used by web and Microsoft Teams-oriented applications.",
      "Configured Nginx as a reverse proxy and improved application routing and deployment setup.",
      "Diagnosed and optimized frontend and backend performance, improving page load and API response behavior.",
    ],
    outcomes: [
      "Long-running AI requests stream to users despite API Gateway timeout limits.",
      "Chat services and React training applications kept stable across web and Microsoft Teams surfaces.",
    ],
    stack: [
      "TypeScript",
      "React",
      "Next.js",
      "Python",
      "FastAPI",
      "Flask",
      "AWS Lambda",
      "API Gateway",
      "MongoDB",
      "Nginx",
      "OpenAI API",
    ],
  },
  {
    slug: "watchtowr",
    title: "Watchtowr — exposure management platform",
    client: "watchTowr",
    domain: "Cybersecurity",
    role: "Full-stack developer",
    featured: false,
    summary:
      "GraphQL APIs and UI for onboarding new security asset types on a preemptive exposure-management platform, plus PDF reporting for findings.",
    problem:
      "Watchtowr continuously discovers an organization's external attack surface and validates exploitable security risks from an attacker's perspective. The platform needed support for onboarding and managing additional security asset types across API, UI, and reporting.",
    contributions: [
      "Developed UI and API capabilities for onboarding and managing additional security asset types.",
      "Built and maintained GraphQL integrations using NestJS and Apollo for security asset workflows.",
      "Implemented PDF reporting to present findings for newly supported asset types.",
      "Maintained production features and resolved defects across the asset management experience.",
    ],
    outcomes: [
      "New security asset types supported end-to-end across UI, API, and PDF reporting.",
      "Asset management features kept stable in production while the platform evolved.",
    ],
    stack: ["Next.js", "NestJS", "TypeScript", "Chakra UI", "Apollo", "GraphQL", "Kafka"],
  },
  {
    slug: "turisvpn",
    title: "TurisVPN — VPN administration platform",
    client: "TurisVPN",
    domain: "Consumer VPN",
    role: "Backend developer",
    featured: false,
    summary:
      "Email campaign workflows and admin performance fixes for a VPN product's Django administration platform.",
    problem:
      "TurisVPN ships mobile applications and browser extensions backed by a Django administration platform. Marketing needed rich, schedulable email campaigns, and data-heavy admin pages had grown slow.",
    contributions: [
      "Built an email campaign feature letting administrators author rich content, schedule delivery, and process sends asynchronously with CKEditor and Celery.",
      "Added performance diagnostic tooling to identify inefficient data access patterns in Django administration workflows.",
      "Resolved N+1 query problems and optimized ORM usage across administrative pages.",
      "Maintained backend functionality supporting marketing and operational users.",
    ],
    outcomes: [
      "Administrators author and schedule rich email campaigns without engineering help.",
      "Data-heavy admin pages sped up after N+1 fixes and ORM optimization.",
    ],
    stack: ["Django", "Python", "Celery", "Django Admin", "CKEditor"],
  },
  {
    slug: "clinger",
    title: "Clinger — mobile dating app backend",
    client: "Clinger",
    domain: "Consumer / social",
    role: "Backend developer",
    featured: false,
    summary:
      "NestJS backend for profiles, matching, and messaging, with automated content moderation and database redesign for a growing user base.",
    problem:
      "Clinger is a mobile dating application with user profiles, matching, messaging, and user-generated content. The backend needed new features, safer content handling, and database performance that kept up with product growth.",
    contributions: [
      "Developed and maintained NestJS backend features for user profiles, matching, messaging, and core dating workflows.",
      "Analyzed PostgreSQL query performance and redesigned database structures for efficiency and data integrity.",
      "Refactored existing modules for clearer code organization and safer feature development.",
      "Integrated automated content moderation, including nudity detection, for safer user-generated content.",
    ],
    outcomes: [
      "User-generated content screened automatically via nudity detection.",
      "Schema redesign and query optimization improved data integrity and backend responsiveness.",
    ],
    stack: ["NestJS", "TypeScript", "PostgreSQL"],
  },
];

export const featuredCaseStudies = caseStudies.filter((cs) => cs.featured);
export const supportingCaseStudies = caseStudies.filter((cs) => !cs.featured);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
