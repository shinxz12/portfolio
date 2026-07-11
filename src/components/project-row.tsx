import Link from "next/link";
import type { CaseStudy } from "@/data/types";

export default function ProjectRow({ project }: { project: CaseStudy }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block border-b border-border py-5 last:border-b-0"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-medium transition-colors group-hover:text-accent">{project.title}</h3>
        <p className="shrink-0 text-xs text-muted">{project.stack.slice(0, 3).join(" · ")}</p>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.summary}</p>
    </Link>
  );
}
