import type { ReactNode } from "react";
import Reveal from "@/components/reveal";

export default function Section({
  id,
  title,
  index,
  children,
}: {
  id: string;
  title: string;
  index?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-b border-border py-16 sm:py-24">
      <Reveal>
        <div className="mb-12 flex items-baseline gap-4">
          {index && <span className="text-sm font-medium text-accent">{index}</span>}
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-muted">{title}</h2>
        </div>
      </Reveal>
      <Reveal delay={0.08}>{children}</Reveal>
    </section>
  );
}
