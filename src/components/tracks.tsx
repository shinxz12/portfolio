import type { Track } from "@/data/types";

export default function Tracks({ tracks }: { tracks: Track[] }) {
  return (
    <span className="inline-flex gap-1.5">
      {tracks.map((track) => (
        <span key={track} className="rounded-full border border-rule px-2 py-0.5 text-xs font-medium text-muted">
          {track}
        </span>
      ))}
    </span>
  );
}
