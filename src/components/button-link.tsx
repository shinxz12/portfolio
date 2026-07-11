import Link from "next/link";
import type { ReactNode } from "react";

const styles = {
  primary: "bg-accent text-white hover:opacity-90 dark:text-background",
  secondary: "border border-border text-foreground hover:border-accent hover:text-accent",
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
      className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}
