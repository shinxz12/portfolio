import CaseStudyCard from "@/components/case-study-card";
import ContactForm from "@/components/contact-form";
import Hero from "@/components/hero";
import ProjectRow from "@/components/project-row";
import Reveal from "@/components/reveal";
import Section from "@/components/section";
import { featuredCaseStudies, supportingCaseStudies } from "@/data/case-studies";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section id="services" title="What I do" index="01">
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.title} y={-18} delay={i * 0.1} className="border-t border-border pt-5">
              <h3 className="font-display text-lg font-medium tracking-tight">{service.title}</h3>
              <p className="mt-2.5 max-w-md text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="work" title="Selected work" index="02">
        <div className="border-b border-border">
          {featuredCaseStudies.map((caseStudy, i) => (
            <Reveal key={caseStudy.slug} x={56} y={0} delay={i * 0.09}>
              <CaseStudyCard caseStudy={caseStudy} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="projects" title="More projects" index="03">
        <div>
          {supportingCaseStudies.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section id="skills" title="Tech stack" index="04">
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.label} className="border-t border-border pt-4">
              <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
                {group.label}
              </h3>
              <p className="mt-2 leading-relaxed">{group.items.join(", ")}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact" title="Contact" index="05">
        <p className="max-w-xl text-lg leading-relaxed text-muted">
          Have a project in mind, or need an extra engineer on your team? Email{" "}
          <a href={`mailto:${site.email}`} className="link-underline text-foreground">
            {site.email}
          </a>{" "}
          or use the form below.
        </p>
        <ContactForm />
      </Section>
    </>
  );
}
