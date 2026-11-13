import Link from "next/link";
import Tracks from "@/components/tracks";
import type { CaseStudy } from "@/data/types";

export default function WorkEntry({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <article className="grid gap-x-8 gap-y-2 border-t border-rule py-8 first:border-t-0 first:pt-0 sm:grid-cols-[9rem_1fr]">
      <div className="text-sm text-muted">
        <p className="tabular-nums">{caseStudy.period}</p>
        <p className="mt-1">{caseStudy.client}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          <Link href={`/work/${caseStudy.slug}`} className="hover:text-signal">
            {caseStudy.title}
          </Link>
        </h3>
        <p className="mt-2 max-w-2xl leading-relaxed text-muted">{caseStudy.summary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Tracks tracks={caseStudy.tracks} />
          <Link href={`/work/${caseStudy.slug}`} className="link text-sm font-medium">
            Read case study
          </Link>
        </div>
      </div>
    </article>
  );
}
