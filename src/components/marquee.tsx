import { skillGroups } from "@/data/skills";

const allSkills = skillGroups.flatMap((group) => group.items);

export default function Marquee() {
  // Two copies of the list; the track animates -50% for a seamless loop.
  const items = [...allSkills, ...allSkills];

  return (
    <div className="marquee relative -mx-6 overflow-hidden sm:-mx-8" aria-hidden>
      <div className="marquee-track py-1">
        {items.map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="mr-3 whitespace-nowrap rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
