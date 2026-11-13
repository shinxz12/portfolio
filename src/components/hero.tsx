import Link from "next/link";
import RequestFlow from "@/components/request-flow";
import { getCaseStudy } from "@/data/case-studies";
import { site } from "@/data/site";

/** Case study whose request path is drawn in the hero. */
const showcase = getCaseStudy("smart-tech");

export default function Hero() {
  return (
    <section className="pt-16 pb-16 sm:pt-24 sm:pb-20">
      <p className="text-muted">
        {site.title} in {site.location.split(",")[0]}
      </p>
      <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-6xl">
        {site.headline}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{site.intro}</p>
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

      {showcase?.flow && (
        <figure className="mt-16 sm:mt-20">
          <RequestFlow stages={showcase.flow} label="How a contract gets signed in the Smart Tech platform" compact />
          <figcaption className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
            How a contract gets signed in the Smart Tech platform. I designed, built, and operate every service on
            this path.{" "}
            <Link href={`/work/${showcase.slug}`} className="link font-medium text-ink">
              Read the case study
            </Link>
          </figcaption>
        </figure>
      )}
    </section>
  );
}
