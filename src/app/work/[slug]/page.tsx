import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RequestFlow from "@/components/request-flow";
import Tracks from "@/components/tracks";
import { caseStudies, getCaseStudy } from "@/data/case-studies";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return {};
  return {
    title: caseStudy.title,
    description: caseStudy.summary,
    openGraph: { title: caseStudy.title, description: caseStudy.summary },
  };
}

function List({ items, large = false }: { items: string[]; large?: boolean }) {
  return (
    <ul
      className={`max-w-2xl list-disc space-y-3 pl-5 leading-relaxed marker:text-signal ${large ? "text-lg font-medium" : ""}`}
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();
  const next = caseStudies[(caseStudies.indexOf(caseStudy) + 1) % caseStudies.length];

  return (
    <article className="pb-20">
      <header className="py-14 sm:py-20">
        <Link href="/#work" className="link text-sm text-muted">
          All work
        </Link>
        <h1 className="mt-8 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          {caseStudy.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{caseStudy.summary}</p>
        <dl className="mt-8 grid max-w-3xl gap-x-8 gap-y-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-muted">Client</dt>
            <dd className="mt-1 font-medium">{caseStudy.client}</dd>
          </div>
          <div>
            <dt className="text-muted">Role</dt>
            <dd className="mt-1 font-medium">{caseStudy.role}</dd>
          </div>
          <div>
            <dt className="text-muted">Period</dt>
            <dd className="mt-1 font-medium tabular-nums">{caseStudy.period}</dd>
          </div>
        </dl>
      </header>

      {caseStudy.flow && (
        <section className="border-t border-rule py-12">
          <h2 className="text-xl font-semibold tracking-tight">Request path</h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-muted">{caseStudy.flow.caption}</p>
          <div className="sheet sheet-grid mt-6 p-4 sm:p-6 lg:p-8">
            <RequestFlow stages={caseStudy.flow.stages} label={`${caseStudy.flow.name}, step by step`} />
          </div>
        </section>
      )}

      <section className="grid gap-6 border-t border-rule py-12 lg:grid-cols-[15rem_1fr] lg:gap-12">
        <h2 className="text-xl font-semibold tracking-tight">Context</h2>
        <p className="max-w-2xl leading-relaxed">{caseStudy.problem}</p>
      </section>

      <section className="grid gap-6 border-t border-rule py-12 lg:grid-cols-[15rem_1fr] lg:gap-12">
        <h2 className="text-xl font-semibold tracking-tight">What I built</h2>
        <List items={caseStudy.contributions} />
      </section>

      <section className="grid gap-6 border-t border-rule py-12 lg:grid-cols-[15rem_1fr] lg:gap-12">
        <h2 className="text-xl font-semibold tracking-tight">Outcomes</h2>
        <List items={caseStudy.outcomes} large />
      </section>

      <section className="grid gap-6 border-t border-rule py-12 lg:grid-cols-[15rem_1fr] lg:gap-12">
        <h2 className="text-xl font-semibold tracking-tight">Stack</h2>
        <div className="max-w-2xl">
          <Tracks tracks={caseStudy.tracks} />
          <p className="mt-3 leading-relaxed text-muted">{caseStudy.stack.join(", ")}</p>
        </div>
      </section>

      {next !== caseStudy && (
        <nav aria-label="Next case study" className="border-t border-rule pt-12">
          <p className="text-sm text-muted">Next case study</p>
          <Link
            href={`/work/${next.slug}`}
            className="mt-2 inline-block max-w-3xl text-2xl font-semibold tracking-tight transition-colors hover:text-signal sm:text-3xl"
          >
            {next.title}
          </Link>
        </nav>
      )}
    </article>
  );
}
