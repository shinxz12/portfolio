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
