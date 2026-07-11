import Link from "next/link";
import { site } from "@/data/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 -mx-6 border-b border-border bg-background/80 px-6 backdrop-blur sm:-mx-8 sm:px-8">
      <nav className="flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold">
          {site.name}
        </Link>
        <div className="flex items-center gap-5 text-sm text-muted">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-border px-3 py-1.5 transition-colors hover:border-accent hover:text-accent"
          >
            CV
          </a>
        </div>
      </nav>
    </header>
  );
}
