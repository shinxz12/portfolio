import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    label: "Node.js",
    items: [
      "TypeScript",
      "NestJS, Fastify, Next.js",
      "TypeORM, Drizzle, Prisma, MikroORM",
      "Temporal, pg-boss",
      "Jest, Vitest, Playwright",
    ],
  },
  {
    label: "Python",
    items: [
      "Django, Django REST Framework",
      "FastAPI",
      "Celery",
      "pyHanko, psycopg",
      "AWS Lambda, pytest",
    ],
  },
  {
    label: "Data and messaging",
    items: [
      "PostgreSQL (row-level security, query tuning)",
      "MySQL, MongoDB, Redis, pgvector",
      "Kafka, Debezium CDC, NATS JetStream",
      "gRPC, REST, GraphQL, webhooks",
    ],
  },
  {
    label: "Infrastructure",
    items: [
      "Docker, Docker Compose",
      "OpenTelemetry tracing",
      "Keycloak, Zitadel (OIDC)",
      "GitLab CI, Coolify, Nginx",
      "AWS, Google Cloud, Cloudflare R2",
    ],
  },
];
