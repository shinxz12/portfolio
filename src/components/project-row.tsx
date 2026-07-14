import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CaseStudy } from "@/data/types";

export default function ProjectRow({ project }: { project: CaseStudy }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block border-b border-border py-5 transition-transform duration-300 last:border-b-0 hover:translate-x-1"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="flex items-center gap-1.5 font-medium transition-colors group-hover:text-accent">
          {project.title}
          <ArrowUpRight className="size-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </h3>
        <p className="shrink-0 text-xs text-muted">{project.stack.slice(0, 3).join(" · ")}</p>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.summary}</p>
    </Link>
  );
}
