import Link from "next/link";
import type { ReactNode } from "react";

const styles = {
  primary:
    "bg-gradient-to-r from-accent via-accent-cyan to-accent-pink bg-[length:200%_100%] bg-left text-white shadow-lg shadow-accent/25 transition-all duration-500 hover:bg-right hover:shadow-xl hover:shadow-accent/30",
  secondary:
    "gradient-border bg-card text-foreground transition-colors hover:text-accent",
};

export default function ButtonLink({
  href,
  variant = "primary",
  newTab = false,
  children,
}: {
  href: string;
  variant?: keyof typeof styles;
  newTab?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      {...(newTab && { target: "_blank", rel: "noopener noreferrer" })}
      className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}
