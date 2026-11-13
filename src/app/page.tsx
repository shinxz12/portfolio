import ContactForm from "@/components/contact-form";
import Hero from "@/components/hero";
import ProjectEntry from "@/components/project-entry";
import Section from "@/components/section";
import WorkEntry from "@/components/work-entry";
import { caseStudies } from "@/data/case-studies";
import { earlierProjects } from "@/data/earlier-work";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section id="work" title="Work">
        {caseStudies.map((caseStudy) => (
          <WorkEntry key={caseStudy.slug} caseStudy={caseStudy} />
        ))}
      </Section>

      <Section id="earlier" title="Earlier client work" lede="Delivered at Golden Owl Consulting, 03/2022 – 09/2024.">
        <ul>
          {earlierProjects.map((project) => (
            <li key={project.name} className="border-t border-rule py-5 first:border-t-0 first:pt-0">
              <h3 className="font-semibold tracking-tight">{project.name}</h3>
              <p className="mt-1.5 max-w-2xl leading-relaxed text-muted">{project.summary}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="projects" title="Projects" lede="Open-source libraries and products built outside my day job.">
        {projects.map((project) => (
          <ProjectEntry key={project.slug} project={project} />
        ))}
      </Section>

      <Section id="stack" title="Stack">
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="font-semibold">{group.label}</h3>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact" title="Contact">
        <p className="mb-8 max-w-xl leading-relaxed">
          Hiring, or need a backend built? Email{" "}
          <a href={`mailto:${site.email}`} className="link font-medium">
            {site.email}
          </a>{" "}
          or send a message here.
        </p>
        <ContactForm />
      </Section>
    </>
  );
}
