import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CaseStudy } from "@/data/types";

export default function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group block rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted">{caseStudy.domain}</p>
          <h3 className="mt-2 text-lg font-semibold">{caseStudy.title}</h3>
        </div>
        <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted transition-colors group-hover:text-accent" />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{caseStudy.summary}</p>
      <p className="mt-4 text-xs text-muted">{caseStudy.stack.slice(0, 6).join(" · ")}</p>
    </Link>
  );
}
