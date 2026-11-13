import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "entity-history",
    name: "entity-history",
    kind: "Open source, npm",
    tracks: ["Node.js"],
    summary:
      "Audit history for TypeORM and MikroORM, in the spirit of django-simple-history: one @Historized() decorator keeps a full snapshot of every write in a shadow table, with who changed it and why, time-travel queries, diffs, and revert. Five npm packages, including NestJS modules, tested in CI on SQLite and Postgres.",
    stack: ["TypeScript", "TypeORM", "MikroORM", "NestJS", "Testcontainers"],
    url: "https://github.com/shinxz12/entity-history",
  },
  {
    slug: "techino",
    name: "Techino",
    kind: "Product build",
    tracks: ["Node.js", "Python"],
    summary:
      "HR and attendance for construction crews, built alone in about six weeks: offline phone check-in with photo and GPS, door cameras that recognise faces, and a document module, the first build of my Document Hub design, whose search matches Vietnamese with or without diacritics.",
    stack: ["NestJS", "Prisma", "PostgreSQL", "pgvector", "React", "Python", "ONNX Runtime"],
  },
];
