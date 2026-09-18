import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CaseStudy } from "@/data/types";

export default function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group grid gap-x-8 gap-y-3 border-t border-border py-8 sm:grid-cols-[1fr_auto] sm:items-start"
    >
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
          {caseStudy.domain}
        </p>
        <h3 className="font-display mt-3 text-2xl font-medium tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
          {caseStudy.title}
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{caseStudy.summary}</p>
        <ul className="mt-5 grid gap-2 text-sm leading-relaxed text-foreground/85">
          {caseStudy.outcomes.slice(0, 2).map((outcome) => (
            <li key={outcome} className="flex gap-2">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-accent" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted">{caseStudy.stack.slice(0, 6).join(" · ")}</p>
      </div>
      <ArrowUpRight className="hidden size-6 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent sm:block" />
    </Link>
  );
}
