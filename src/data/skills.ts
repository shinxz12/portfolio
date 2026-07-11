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
