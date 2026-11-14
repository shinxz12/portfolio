"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import RequestFlow from "@/components/request-flow";
import type { RequestPath } from "@/data/types";

export type Sheet = {
  slug: string;
  client: string;
  role: string;
  period: string;
  path: RequestPath;
};

/** Time the request takes to cross one link. Must match --travel in globals.css. */
const TRAVEL_MS = 420;
/** Pause at each stage before the request moves on. */
const DWELL_MS = 180;
const START_MS = 300;

/**
 * The hero's drawing sheet: one tab per system. Once the sheet is in view a
 * request travels through the selected system; the panel below explains the
 * step a visitor points at, tabs to, or taps.
 */
export default function SystemExplorer({ sheets }: { sheets: Sheet[] }) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(0);
  const [inView, setInView] = useState(false);
  const [reached, setReached] = useState(-1);
  const [traveling, setTraveling] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const sheet = sheets[active];
  const stages = sheet.path.stages;
  const stage = selected === null ? null : stages[selected];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const last = stages.length - 1;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReached(last);
      return;
    }
    const timers: number[] = [];
    let at = START_MS;
    timers.push(window.setTimeout(() => setReached(0), at));
    for (let i = 1; i <= last; i++) {
      at += DWELL_MS;
      timers.push(window.setTimeout(() => setTraveling(i), at));
      at += TRAVEL_MS;
      timers.push(
        window.setTimeout(() => {
          setTraveling(null);
          setReached(i);
        }, at),
      );
    }
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [inView, active, run, stages.length]);

  /** Show sheet `index` and send a new request through it. */
  function play(index: number) {
    setActive(index);
    setReached(-1);
    setTraveling(null);
    setSelected(null);
    setRun((count) => count + 1);
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = sheets.length - 1;
    const targets: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const next = targets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    play(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div ref={rootRef} className="sheet overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-rule p-2 sm:px-4 sm:py-2.5">
        <div role="tablist" aria-label="Systems I built" className="grid flex-1 grid-cols-3 gap-1 sm:flex sm:flex-none">
          {sheets.map((item, i) => (
            <button
              key={item.slug}
              ref={(element) => {
                tabRefs.current[i] = element;
              }}
              id={`${id}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => {
                if (i !== active) play(i);
              }}
              onKeyDown={(event) => onTabKeyDown(event, i)}
              className="rounded-md px-2 py-1.5 text-sm leading-tight font-medium text-muted transition-colors hover:bg-signal-soft hover:text-ink aria-selected:bg-ink aria-selected:text-paper sm:px-3"
            >
              {item.path.name}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => play(active)}
          className="hidden rounded-md px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:text-signal sm:block"
        >
          Replay request
        </button>
      </div>

      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`}>
        <div className="sheet-grid px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <RequestFlow
            stages={stages}
            label={`${sheet.path.name}, step by step`}
            compact
            reached={reached}
            traveling={traveling}
            selected={selected}
            onSelect={setSelected}
          />
        </div>

        <div className="grid border-t border-rule lg:grid-cols-[1fr_22rem]">
          <div aria-live="polite" className="min-h-40 px-5 py-5 sm:px-6 lg:min-h-36">
            {stage && selected !== null ? (
              <>
                <p className="text-sm text-muted tabular-nums">
                  Step {selected + 1} of {stages.length}
                </p>
                <p className="mt-1 text-lg font-semibold tracking-tight">{stage.label}</p>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">{stage.detail}</p>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold tracking-tight">{sheet.path.caption}</p>
                <p className="mt-1.5 text-sm text-muted">Select a step to see what it does.</p>
              </>
            )}
          </div>

          <div className="border-t border-rule text-sm lg:border-t-0 lg:border-l">
            <dl>
              <div className="grid grid-cols-[4rem_1fr] gap-3 border-b border-rule px-5 py-2.5">
                <dt className="text-muted">Client</dt>
                <dd className="font-medium">{sheet.client}</dd>
              </div>
              <div className="grid grid-cols-[4rem_1fr] gap-3 border-b border-rule px-5 py-2.5">
                <dt className="text-muted">Role</dt>
                <dd className="font-medium">{sheet.role}</dd>
              </div>
              <div className="grid grid-cols-[4rem_1fr] gap-3 border-b border-rule px-5 py-2.5">
                <dt className="text-muted">Period</dt>
                <dd className="font-medium tabular-nums">{sheet.period}</dd>
              </div>
            </dl>
            <p className="px-5 py-3">
              <Link href={`/work/${sheet.slug}`} className="link font-medium">
                Read the case study
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
