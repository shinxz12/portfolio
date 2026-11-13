import type { CSSProperties } from "react";
import type { FlowStage } from "@/data/types";

/**
 * A request's path through the system, stage by stage. Horizontal on wide
 * screens, vertical on narrow ones. Animates once on load (see globals.css).
 * `compact` hides each stage's detail line.
 */
export default function RequestFlow({
  stages,
  label,
  compact = false,
}: {
  stages: FlowStage[];
  label: string;
  compact?: boolean;
}) {
  return (
    <ol aria-label={label} className="grid gap-4 lg:auto-cols-fr lg:grid-flow-col lg:gap-5">
      {stages.map((stage, i) => (
        <li key={`${i}-${stage.service}`} className="flow-stage relative" style={{ "--i": i } as CSSProperties}>
          {i > 0 && (
            <span
              aria-hidden
              className="flow-connector absolute -top-4 left-6 h-4 w-px bg-signal lg:top-7 lg:-left-5 lg:h-px lg:w-5"
            />
          )}
          <div className="flow-node h-full rounded-lg border border-signal bg-signal-soft p-4">
            <p className="flex items-baseline justify-between gap-2 text-xs">
              <span className="font-medium text-signal">{stage.service}</span>
              {stage.track && <span className="text-muted">{stage.track}</span>}
            </p>
            <p className="mt-2 font-semibold leading-snug">{stage.label}</p>
            {!compact && <p className="mt-1.5 text-sm leading-relaxed text-muted">{stage.detail}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
