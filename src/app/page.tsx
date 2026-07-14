import CaseStudyCard from "@/components/case-study-card";
import ContactForm from "@/components/contact-form";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import ProjectRow from "@/components/project-row";
import Section from "@/components/section";
import { featuredCaseStudies, supportingCaseStudies } from "@/data/case-studies";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section id="services" title="What I do">
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="gradient-border rounded-2xl bg-card p-6 shadow-lg shadow-black/[0.04] transition-shadow duration-300 hover:shadow-xl hover:shadow-accent/10"
            >
              <h3 className="font-display font-bold">{service.title}</h3>
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
        <Marquee />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
