import { valueSignals } from "@/data/value-signals";

export default function ValueSignals() {
  return (
    <section
      aria-label="Engineering value signals"
      className="border-b border-border py-8 sm:py-10"
    >
      <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {valueSignals.map((signal) => (
          <div key={signal.value} className="bg-background p-5 sm:p-6">
            <p className="font-display text-2xl font-medium tracking-tight text-accent sm:text-3xl">
              {signal.value}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{signal.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
