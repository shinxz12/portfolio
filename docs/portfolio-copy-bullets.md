# Portfolio and CV Copy Bank

This document contains reusable, portfolio-ready descriptions based on the repositories mapped in `projects-reference.md` and the existing CV data in `src/utils/data/projects-data.ts`.

The wording deliberately emphasizes backend engineering, system design, and business workflows. It avoids unsupported claims about scale, ownership, or measurable impact.

---

## Professional Positioning

### Portfolio summary

Backend-focused Software Engineer experienced in building domain-driven microservices, multi-tenant SaaS platforms, healthcare systems, and B2B marketplaces. Skilled in designing APIs and asynchronous workflows, modeling complex business domains, integrating third-party services, and improving the reliability and maintainability of production systems. Hands-on experience with NestJS, Django, Python, PostgreSQL, Kafka, gRPC, Temporal, Celery, AWS, and Google Cloud Platform.

### Short CV summary

Backend-focused Software Engineer specializing in microservices, multi-tenant SaaS, workflow orchestration, and API integrations across B2B commerce, healthcare, AI, cybersecurity, and consumer applications.

---

## Arobid Core Backend Platform - Backend Developer

Arobid is an AI-powered B2B trade infrastructure combining supplier discovery, product catalogs, RFQ workflows, order processing, and digital trade exhibitions.

**Tech:** NestJS, TypeScript, PostgreSQL, TypeORM, gRPC, Kafka, Kafka Connect, Debezium CDC, Temporal, Redis, Socket.IO, VNPay, S3-compatible storage, Google Cloud Translation, Gemini, Docker

- Helped build the shared backend foundation, standardizing microservice setup, configuration, database access, gRPC communication, error handling, and observability across services.
- Designed and implemented platform-wide authentication, role-based access control, audit logging, and transactional outbox patterns for secure operations and reliable Kafka event delivery.
- Implemented change data capture pipelines with Debezium and Kafka Connect sink connectors to propagate database changes reliably across platform data flows.
- Built an event-driven notification service supporting in-app, real-time, email, and localized communications across marketplace workflows.
- Delivered end-to-end product listing capabilities, enabling suppliers to create, enrich, manage, and publish offerings through structured review and approval workflows.
- Implemented optimistic locking and version history for product updates, preventing concurrent edits from silently overwriting data while preserving a traceable record of changes.
- Contributed to the order service, designing reliable workflows for multi-step order processing and coordination across distributed services using Temporal.
- Built payment service workflows and integrated VNPay to support secure payment initiation, callback handling, transaction tracking, and payment status updates within the order lifecycle.
- Built a provider-agnostic translation service integrating internal AI, Google Translate, and LLM-based translation through configurable routing and per-language fallback chains.
- Added resilience and efficiency controls for translation workloads, including bounded retries and deadlines, persisted translation reuse, glossary protection, batch processing, and concurrency limits.
- Enabled platform-wide multilingual content support, allowing marketplace domains to localize business content through a consistent translation workflow and terminology glossary.
- Built a centralized file service using presigned URLs, allowing clients to upload directly to object storage without routing file payloads through backend application servers.

### Key Backend Features

- Reusable microservice foundation and gRPC service contracts
- Authentication, RBAC, audit logging, and transactional outbox
- Debezium CDC and Kafka Connect data pipelines
- Event-driven notifications across real-time, in-app, and email channels
- Supplier product listing, approval, concurrency control, and change history
- Distributed order orchestration with Temporal
- VNPay payment processing and transaction lifecycle management
- Platform-wide multilingual content with provider fallback, caching, glossary, and batch controls
- Direct-to-object-storage uploads using secure presigned URLs

**Repositories:** `be-common`, `be-core-auth`, `be-core-file`, `be-core-notification`, `be-core-order`, `be-core-payment`, `be-core-translation`, `be-domain-product`, `database-migrations`, `api-tooling`

**Product:** [Arobid](https://arobid.com/vi)

---

## DNA Insights Platform - Backend Developer

An event-driven backend platform powering genetics analysis and AI-assisted healthcare workflows within GKIM's genetics-led Telehealth OS.

**Tech:** NestJS, TypeScript, PostgreSQL, MongoDB, gRPC, NATS JetStream, Turborepo

- Designed and built the microservice-based backend platform from scratch in a Turborepo monorepo, establishing clear service boundaries and ownership.
- Owned key backend architecture decisions for internal service communication, asynchronous processing, and integration with external AI/ML pipelines.
- Designed reliable workflows for long-running DNA processing tasks, including state tracking, retries, failure handling, and operational auditability.
- Modeled workflow, task, and processing data across PostgreSQL and MongoDB to support predictable execution and end-to-end traceability.
- Built internal administration capabilities that gave operations teams visibility into system state, task progress, and processing failures.

### Key Backend Features

- Event-driven microservices and asynchronous DNA processing
- Workflow state, retries, failure recovery, and auditability
- PostgreSQL and MongoDB data modeling
- AI/ML pipeline integration and operational administration

**Repositories:** `ai-console`, `dnai-services`

---

## Telehealth Core Platform - Backend Developer

A production healthcare platform connecting patients, providers, and laboratories through medical-record, appointment, diagnostic, and care workflows.

**Tech:** Django, Python, PostgreSQL, AWS, Celery, NMI, Stripe, React

- Maintained and evolved the core telehealth platform supporting patient records, provider operations, laboratory interactions, appointment booking, and ongoing care workflows.
- Optimized PostgreSQL queries, schema design, and connection handling to improve API performance and production stability.
- Designed and maintained Celery workflows for asynchronous processing, scheduled jobs, and operational tasks outside the request lifecycle.
- Integrated NMI and Stripe payment workflows for telehealth services, supporting payment collection, transaction status handling, and provider-facing billing operations.
- Collaborated with frontend and product teams to design stable APIs, clarify business rules, and maintain consistent data flow across patient and provider experiences.

### Key Backend Features

- Patient records and provider workflows
- Laboratory and diagnostic integrations
- Appointment booking and care operations
- NMI and Stripe payment processing
- Celery background processing and scheduled jobs

**Repositories:** `telehealth-platform`, `telehealth-provider-dashboard`

---

## E4G Multi-Tenant Healthcare Platform - Backend Developer

A configurable healthcare SaaS platform that enables third-party organizations to launch branded patient portals and offer their own examination and booking experiences.

**Tech:** NestJS, TypeScript, Django, PostgreSQL, REST APIs, Webhooks, RBAC

- Built multi-tenant foundations for tenant provisioning, data and configuration boundaries, role-based access control, and separate global and tenant-level administration.
- Enabled healthcare partners to configure branding and content, define examination offerings, and expose patient-facing appointment booking through their own portals.
- Developed backend APIs shared by global administrators, tenant administrators, and patient-facing applications while preserving clear permission and tenant boundaries.
- Implemented webhook-driven synchronization for workflow templates and related configuration across applications and deployment environments.

### Key Backend Features

- Tenant provisioning and configuration isolation
- Global and tenant-level RBAC
- Configurable healthcare offerings and branded portals
- Third-party booking and workflow synchronization

**Repositories:** `e4g-global-admin`, `e4g-tenant-instance`, `tms-workflow`, `tms-workflow-prod`

**Product:** [GKIM Digital](https://gkim.digital/)

---

## The Luxe Nomad

### Project overview

The Luxe Nomad is Asia-Pacific's largest luxury vacation rental management company, operating a curated portfolio of private villas, chalets, and condo hotels across destinations including Japan, Indonesia, and Thailand. The project supported the booking and operational systems behind its hospitality business.

### Role

Full Stack Developer, with significant backend responsibilities

### Portfolio-ready contributions

- Designed and implemented Django REST APIs for booking, sales, and marketing workflows and integrated external services required by the operational platform.
- Automated business reporting through the Google Sheets API, reducing manual data preparation for operational teams.
- Migrated Celery tasks and scheduled jobs to Google Cloud Tasks and cloud-managed cron jobs to modernize background processing and deployment operations.
- Upgraded the application from Django 2 to Django 4, addressing compatibility, security, and long-term maintainability requirements.
- Supported deployment, performance, security, and cloud cost considerations for the production application.
- Contributed to the React and Bootstrap front-end redesign while collaborating directly with clients to translate business requirements into technical solutions.
- Reviewed code and added unit tests to improve release confidence and maintain shared code quality.

### CV-ready bullets

- Designed Django REST APIs and third-party integrations for booking, sales, marketing, and reporting workflows in a luxury vacation rental platform.
- Migrated Celery tasks and cron jobs to Google Cloud Tasks and managed scheduling, improving the maintainability of background processing.
- Upgraded Django 2 to Django 4 and supported production deployment, performance, security, and cloud cost optimization.

### Technology stack

Django, Python, PostgreSQL, Celery, Google Cloud Platform, Google Sheets API, React, Bootstrap

Product source: [The Luxe Nomad](https://theluxenomad.com/)

---

## Hoplite Technology

### Project overview

Hoplite Technology provides cybersecurity awareness training and develops AI-assisted education and productivity tools.

### Role

Software Engineer

### Portfolio-ready contributions

- Developed AI-powered chat experiences using Next.js and the OpenAI API to support interactive cybersecurity education and assistant workflows.
- Designed serverless REST APIs with Python, AWS Lambda, and API Gateway for lightweight, independently deployable backend capabilities.
- Implemented streaming responses to work around API Gateway timeout constraints for long-running AI requests.
- Built and maintained chat backend services and integrations used by web and Microsoft Teams-oriented applications.
- Configured Nginx as a reverse proxy for backend services and improved application routing and deployment setup.
- Diagnosed and optimized front-end and backend performance to improve page load and API response behavior.
- Maintained TypeScript and React training applications and resolved production issues across existing product flows.

### CV-ready bullets

- Built AI-powered chat tools with Next.js and the OpenAI API for cybersecurity education and assistant workflows.
- Designed Python APIs with AWS Lambda and API Gateway, implementing response streaming for long-running AI operations.
- Maintained chat services, React training applications, and Nginx-based deployment infrastructure while improving API and page performance.

### Technology stack

TypeScript, React, Next.js, Python, FastAPI, Flask, AWS Lambda, API Gateway, MongoDB, Nginx, OpenAI API, Stripe

---

## Finexis eKYC

### Project overview

Finexis eKYC supported digital customer onboarding for Finexis, a Singapore-based, client-focused financial advisory firm. The system automated identity and verification workflows used to assess and onboard customers safely.

### Role

Software Engineer

### Portfolio-ready contributions

- Developed new eKYC verification types and Django REST APIs for integration with mobile applications.
- Configured Celery background processing for asynchronous verification and integration workflows.
- Integrated third-party insurance APIs into onboarding and customer verification processes.
- Refactored legacy backend code and database structures to improve maintainability and data access efficiency.
- Optimized SQL queries and schema design, reducing representative page load times from 23 seconds to 2 seconds and from 26 seconds to 5 seconds.

### CV-ready bullets

- Built eKYC verification workflows and Django REST APIs for mobile customer onboarding, including third-party insurance integrations and Celery background jobs.
- Optimized SQL queries and database structures, reducing page load times from 23s to 2s and from 26s to 5s.
- Refactored legacy backend components to improve maintainability, reliability, and data access performance.

### Technology stack

Django, Python, MySQL, Celery, AWS, REST APIs

Product source: [Finexis Advisory](https://www.finexis.com.sg/)

---

## Watchtowr

### Project overview

Watchtowr is a preemptive exposure-management platform that continuously discovers an organization's external attack surface and validates exploitable security risks from an attacker's perspective.

### Role

Full Stack Developer

### Portfolio-ready contributions

- Developed UI and API capabilities for onboarding and managing additional security asset types.
- Built and maintained GraphQL integrations using NestJS and Apollo for security asset workflows.
- Implemented PDF reporting capabilities to present findings for newly supported asset types.
- Maintained production features and resolved defects across the asset management experience.

### CV-ready bullets

- Developed NestJS, Apollo, and GraphQL APIs for onboarding and managing external security assets.
- Implemented PDF reporting for security findings and maintained related Next.js user workflows.

### Technology stack

Next.js, NestJS, TypeScript, Chakra UI, Apollo, GraphQL, Kafka

Product source: [watchTowr](https://watchtowr.com/)

### Evidence note

No Watchtowr repository is available in the current workspace. Keep these statements aligned with personal work history and avoid adding deeper implementation claims unless supporting material is recovered.

---

## TurisVPN

### Project overview

TurisVPN is a VPN product delivered through mobile applications and browser extensions, supported by a Django-based administration platform.

### Role

Backend Developer

### Portfolio-ready contributions

- Built an email campaign feature that allows administrators to author rich content, schedule delivery, and process sends asynchronously using CKEditor and Celery.
- Added performance diagnostic tooling to identify inefficient data access patterns in Django administration workflows.
- Resolved N+1 query problems and optimized ORM usage to improve administrative page performance.
- Maintained backend functionality supporting marketing and operational users of the VPN platform.

### CV-ready bullets

- Developed scheduled email campaign workflows using Django, CKEditor, and Celery for a VPN platform's administration system.
- Diagnosed and resolved N+1 query issues, improving the performance of data-heavy Django Admin pages.

### Technology stack

Django, Python, Celery, Django Admin, CKEditor

---

## Clinger

### Project overview

Clinger is a mobile dating application with user profiles, matching, messaging, and content safety capabilities.

### Role

Backend Developer

### Portfolio-ready contributions

- Developed and maintained NestJS backend features for user profiles, matching, messaging, and other core dating application workflows.
- Analyzed PostgreSQL query performance and redesigned database structures to improve efficiency and data integrity.
- Refactored existing modules to establish clearer code organization, improve readability, and make feature development safer.
- Integrated automated content moderation, including nudity detection, to support a safer user-generated content experience.
- Improved backend stability and responsiveness as the product and its feature set evolved.

### CV-ready bullets

- Developed NestJS and PostgreSQL backend services for user profiles, matching, messaging, and content moderation in a mobile dating application.
- Redesigned database schemas and optimized queries to improve data integrity and backend responsiveness.
- Refactored legacy modules and integrated automated nudity detection to improve maintainability and user safety.

### Technology stack

NestJS, TypeScript, PostgreSQL, REST APIs, content moderation integrations

---

## Recommended Project Selection

### Backend-focused portfolio

Use these as the main case studies:

1. Arobid B2B Marketplace Platform
2. GKIM Healthcare and AI Platforms
3. Finexis eKYC
4. The Luxe Nomad

Use Hoplite, TurisVPN, and Clinger as shorter supporting projects. Include Watchtowr only as professional experience because its source code is not available in the current workspace.

### One-page CV

Prioritize the projects in this order:

1. Arobid: distributed systems, commerce domains, and backend architecture
2. GKIM: healthcare, AI integration, and multi-tenant SaaS
3. Finexis eKYC: measurable database performance improvement
4. The Luxe Nomad: modernization, cloud migration, and client delivery

---

## Safe Impact Upgrade Prompts

The current bullets are ready to use without inventing metrics. They can become stronger if the following facts are available later:

- Number of microservices or domains directly maintained
- Request volume, active businesses, tenants, providers, or patients supported
- Workflow failure-rate or processing-time improvements
- Database or API latency before and after optimization
- Deployment frequency or engineering time saved by shared tooling
- Number of notification channels, translation providers, or third-party integrations
- Reduction in incidents, manual operations, or onboarding time

Only add these metrics when they can be verified.
