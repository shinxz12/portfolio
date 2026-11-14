import type { CSSProperties } from "react";
import type { FlowStage, Track } from "@/data/types";

type Props = {
  stages: FlowStage[];
  label: string;
  /** Hide each stage's detail line; the hero shows it in a separate panel. */
  compact?: boolean;
  /** Index of the last stage the request has reached. Every stage counts as reached when omitted. */
  reached?: number;
  /** Index of the stage the request is moving to while it is between stages. */
  traveling?: number | null;
  selected?: number | null;
  /** Makes stages selectable. Static pages omit it. */
  onSelect?: (index: number) => void;
};

type TrackRun = { track: Track; start: number; length: number };

/** Consecutive stages on the same track, drawn as one dimension line under the stages. */
function trackRuns(stages: FlowStage[]): TrackRun[] {
  const runs: TrackRun[] = [];
  stages.forEach((stage, i) => {
    if (!stage.track) return;
    const last = runs.at(-1);
    if (last && last.track === stage.track && last.start + last.length === i) last.length += 1;
    else runs.push({ track: stage.track, start: i, length: 1 });
  });
  return runs;
}

/**
 * A request's path through a system, stage by stage: vertical on narrow
 * screens, horizontal from lg, where dimension lines under the stages mark
 * which runtime each part runs on. Stage states and the travelling pulse are
 * styled in globals.css under "Drawing sheet and request path".
 */
export default function RequestFlow({
  stages,
  label,
  compact = false,
  reached = stages.length - 1,
  traveling = null,
  selected = null,
  onSelect,
}: Props) {
  const runs = stages.every((stage) => stage.track) ? trackRuns(stages) : [];

  return (
    <div>
      <ol aria-label={label} className="flow grid gap-6 lg:auto-cols-fr lg:grid-flow-col lg:gap-8">
        {stages.map((stage, i) => {
          const state = selected === i ? "selected" : i <= reached ? "lit" : "idle";
          const body = (
            <>
              <span className="flow-meta">
                <span className="flow-step">{i + 1}</span>
                {stage.track && <span className="flow-track">{stage.track}</span>}
              </span>
              <span className="flow-service">{stage.service}</span>
              <span className="flow-label">{stage.label}</span>
              {!compact && <span className="flow-detail">{stage.detail}</span>}
            </>
          );
          return (
            <li key={`${i}-${stage.service}`} className="relative">
              {i > 0 && (
                <span aria-hidden className="flow-link" data-filled={i <= reached || traveling === i ? "" : undefined}>
                  {traveling === i && <span className="flow-pulse" />}
                </span>
              )}
              {onSelect ? (
                <button
                  type="button"
                  className="flow-node"
                  data-state={state}
                  aria-pressed={selected === i}
                  onClick={() => onSelect(i)}
                  onFocus={() => onSelect(i)}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") onSelect(i);
                  }}
                >
                  {body}
                </button>
              ) : (
                <div className="flow-node" data-state={state}>
                  {body}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {runs.length > 0 && (
        <div aria-hidden className="flow-dims" style={{ "--stages": stages.length } as CSSProperties}>
          {runs.map((run) => (
            <span key={run.start} className="flow-dim" style={{ gridColumn: `span ${run.length}` }}>
              <span className="flow-dim-label">{run.track}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
