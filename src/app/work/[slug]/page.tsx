import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/reveal";
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

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  return (
    <article className="py-16">
      <Link
        href="/#work"
        className="link-underline inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All work
      </Link>

      <header className="mt-8">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
          {caseStudy.domain} · {caseStudy.role}
        </p>
        <h1 className="font-display mt-4 max-w-3xl text-3xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
          {caseStudy.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{caseStudy.summary}</p>
      </header>

      <div className="mt-12 space-y-12">
        <Reveal>
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Context</h2>
            <p className="mt-4 max-w-2xl leading-relaxed">{caseStudy.problem}</p>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              What I did
            </h2>
            <ul className="mt-4 max-w-2xl space-y-3">
              {caseStudy.contributions.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="mt-2 size-1.5 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              Outcomes
            </h2>
            <ul className="mt-4 max-w-2xl space-y-3">
              {caseStudy.outcomes.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="mt-2 size-1.5 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {caseStudy.stack.map((tech) => (
                <span
                  key={tech}
                  className="border border-border px-3 py-1 text-xs text-muted transition-colors hover:border-foreground hover:text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </Reveal>
      </div>
    </article>
  );
}
