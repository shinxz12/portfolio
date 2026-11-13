import type { EarlierProject } from "./types";

/** Client projects delivered at Golden Owl Consulting, 03/2022 – 09/2024. */
export const earlierProjects: EarlierProject[] = [
  {
    name: "Finexis eKYC onboarding",
    summary:
      "eKYC verification types and mobile REST APIs in Django for a Singapore financial advisory firm; SQL and schema work cut representative page loads from 23 s to 2 s and 26 s to 5 s.",
  },
  {
    name: "The Luxe Nomad booking platform",
    summary:
      "Django booking, sales, and reporting APIs for luxury villa rentals; upgraded production from Django 2 to 4 and moved Celery jobs to Google Cloud Tasks.",
  },
  {
    name: "Hoplite AI chat tools",
    summary:
      "Python AI chat APIs on AWS Lambda that stream responses past API Gateway timeouts, behind Next.js chat frontends on the OpenAI API.",
  },
  {
    name: "watchTowr exposure management",
    summary: "NestJS GraphQL APIs, UI, and PDF reports for onboarding new security asset types.",
  },
];
