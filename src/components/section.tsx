import type { ReactNode } from "react";
import Reveal from "@/components/reveal";

export default function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 py-16 sm:py-24">
      <Reveal>
        <h2 className="mb-10 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-muted">
          <span className="size-2 rounded-full bg-gradient-to-r from-accent to-accent-pink" />
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>{children}</Reveal>
    </section>
  );
}
