import Link from "next/link";
import { site } from "@/data/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-4 z-50 py-2">
      <nav className="flex h-14 items-center justify-between rounded-2xl border border-border bg-white/70 px-5 shadow-lg shadow-black/[0.04] backdrop-blur-xl">
        <Link href="/" className="font-display font-bold tracking-tight">
          {site.name}
        </Link>
        <div className="flex items-center gap-5 text-sm text-muted">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-border rounded-lg bg-card px-3 py-1.5 text-foreground transition-colors hover:text-accent"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
