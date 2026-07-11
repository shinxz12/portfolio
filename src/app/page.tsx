import ButtonLink from "@/components/button-link";
import CaseStudyCard from "@/components/case-study-card";
import ContactForm from "@/components/contact-form";
import ProjectRow from "@/components/project-row";
import Section from "@/components/section";
import { featuredCaseStudies, supportingCaseStudies } from "@/data/case-studies";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";

export default function HomePage() {
  return (
    <>
      <section className="py-20 sm:py-28">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {site.name}
          <span className="mt-2 block text-2xl font-normal text-muted sm:text-3xl">
            {site.title}
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{site.tagline}</p>
        <div className="mt-8 flex gap-3">
          <ButtonLink href="/#work">View work</ButtonLink>
          <ButtonLink href={site.cvUrl} variant="secondary" newTab>
            View Resume
          </ButtonLink>
        </div>
      </section>

      <Section id="services" title="What I do">
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="work" title="Selected work">
        <div className="grid gap-4 lg:grid-cols-2">
          {featuredCaseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </Section>

      <Section id="projects" title="More projects">
        <div>
          {supportingCaseStudies.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section id="skills" title="Tech stack">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="text-sm font-medium">{group.label}</h3>
              <p className="mt-1.5 text-sm text-muted">{group.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact" title="Contact">
        <p className="max-w-xl leading-relaxed text-muted">
          Have a project in mind or need an extra engineer on your team? Email{" "}
          <a href={`mailto:${site.email}`} className="text-accent hover:underline">
            {site.email}
          </a>{" "}
          or use the form below.
        </p>
        <ContactForm />
      </Section>
    </>
  );
}
