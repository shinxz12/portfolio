import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import TiltCard from "@/components/tilt-card";
import type { CaseStudy } from "@/data/types";

export default function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <TiltCard className="h-full">
      <Link
        href={`/work/${caseStudy.slug}`}
        className="gradient-border group flex h-full flex-col rounded-2xl bg-card p-6 shadow-lg shadow-black/[0.04] transition-shadow duration-300 hover:shadow-xl hover:shadow-accent/10"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="gradient-text text-xs font-semibold uppercase tracking-wider">
              {caseStudy.domain}
            </p>
            <h3 className="font-display mt-2 text-lg font-bold">{caseStudy.title}</h3>
          </div>
          <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{caseStudy.summary}</p>
        <p className="mt-auto pt-4 text-xs text-muted">
          {caseStudy.stack.slice(0, 6).join(" · ")}
        </p>
      </Link>
    </TiltCard>
  );
}
