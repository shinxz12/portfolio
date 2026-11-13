import type { ReactNode } from "react";

/** Two-column section: heading and short lede on the left rail, content on the right. */
export default function Section({
  id,
  title,
  lede,
  children,
}: {
  id: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="grid scroll-mt-8 gap-8 border-t border-rule py-16 sm:py-20 lg:grid-cols-[15rem_1fr] lg:gap-12"
    >
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {lede && <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{lede}</p>}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
