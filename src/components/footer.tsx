import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 text-sm text-muted">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <div className="flex gap-4">
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-foreground">
            Email
          </a>
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
