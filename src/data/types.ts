export type Service = {
  title: string;
  description: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  domain: string;
  role: string;
  /** Featured case studies get large cards in "Selected work"; the rest list under "More projects". */
  featured: boolean;
  summary: string;
  problem: string;
  contributions: string[];
  outcomes: string[];
  stack: string[];
  productUrl?: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};
