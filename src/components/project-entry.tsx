import Tracks from "@/components/tracks";
import type { Project } from "@/data/types";

export default function ProjectEntry({ project }: { project: Project }) {
  return (
    <article className="border-t border-rule py-7 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h3 className="text-lg font-semibold tracking-tight">
          {project.url ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:text-signal">
              {project.name}
            </a>
          ) : (
            project.name
          )}
        </h3>
        <span className="flex items-center gap-3 text-sm text-muted">
          {project.kind}
          <Tracks tracks={project.tracks} />
        </span>
      </div>
      <p className="mt-2 max-w-2xl leading-relaxed text-muted">{project.summary}</p>
      <p className="mt-3 text-sm text-muted">{project.stack.join(", ")}</p>
    </article>
  );
}
