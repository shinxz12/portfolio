import type { ReactNode } from "react";

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
    <section id={id} className="fade-in-view scroll-mt-24 py-16 sm:py-20">
      <h2 className="mb-8 text-sm font-semibold uppercase tracking-widest text-muted">
        {title}
      </h2>
      {children}
    </section>
  );
}
