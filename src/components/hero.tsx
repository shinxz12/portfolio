import SystemExplorer, { type Sheet } from "@/components/system-explorer";
import { caseStudies } from "@/data/case-studies";
import { site } from "@/data/site";

/** Case studies drawn in the hero, in tab order. */
const heroSlugs = ["smart-tech", "arobid", "gkim-healthcare"];

const sheets: Sheet[] = heroSlugs.flatMap((slug) => {
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);
  if (!caseStudy?.flow) return [];
  const { client, role, period, flow } = caseStudy;
  return [{ slug, client, role, period, path: flow }];
});

export default function Hero() {
  return (
    <section className="pt-14 pb-16 sm:pt-20 sm:pb-20">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
        <div>
          <p className="text-muted">
            {site.title} in {site.location.split(",")[0]}
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-6xl">
            {site.headline}
          </h1>
        </div>
        <div>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">{site.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="#work"
              className="rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-signal"
            >
              See my work
            </a>
            <a href={`mailto:${site.email}`} className="link text-sm font-medium">
              {site.email}
            </a>
          </div>
        </div>
      </div>

      {sheets.length > 0 && (
        <div className="mt-12 sm:mt-14">
          <SystemExplorer sheets={sheets} />
        </div>
      )}
    </section>
  );
}
