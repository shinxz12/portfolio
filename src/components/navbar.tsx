import Link from "next/link";
import { site } from "@/data/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-rule">
      <Link href="/" className="font-semibold tracking-tight">
        {site.fullName}
      </Link>
      <nav className="flex items-center gap-5 text-sm text-muted sm:gap-7">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="hidden hover:text-ink sm:inline">
            {link.label}
          </Link>
        ))}
        <a
          href={site.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-ink px-3 py-1.5 font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          Download CV
        </a>
      </nav>
    </header>
  );
}
