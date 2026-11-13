import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-between gap-4 border-t border-rule py-10 text-sm text-muted sm:flex-row">
      <p>
        {site.fullName}, {site.location}
      </p>
      <div className="flex gap-5">
        <a href={`mailto:${site.email}`} className="hover:text-ink">
          Email
        </a>
        {site.socials.map((s) => (
          <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            {s.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
