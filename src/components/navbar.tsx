import Link from "next/link";
import { site } from "@/data/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 -mx-6 border-b border-border bg-background/90 px-6 backdrop-blur-sm sm:-mx-8 sm:px-8">
      <nav className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-sm font-medium uppercase tracking-[0.15em] text-foreground"
        >
          {site.name}
        </Link>
        <div className="flex items-center gap-6 text-sm text-muted">
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
            className="link-underline text-foreground"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
