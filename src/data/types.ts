/** Primary language track of a piece of work. */
export type Track = "Node.js" | "Python";

export type FlowStage = {
  /** Plain-language name of the part of the system, e.g. "Payment service". */
  service: string;
  label: string;
  track?: Track;
  detail: string;
};

/** Work listed under "Work", each with its own page at /work/[slug]. */
export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  period: string;
  role: string;
  tracks: Track[];
  summary: string;
  problem: string;
  /** Optional request path rendered as a flow diagram on the case study page. */
  flow?: FlowStage[];
  contributions: string[];
  outcomes: string[];
  stack: string[];
};

/** Earlier client project, listed on the home page as one line without a case study page. */
export type EarlierProject = {
  name: string;
  summary: string;
};

export type Project = {
  slug: string;
  name: string;
  /** Short context label, e.g. "Open source, npm" or "Client MVP". */
  kind: string;
  tracks: Track[];
  summary: string;
  stack: string[];
  url?: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};
