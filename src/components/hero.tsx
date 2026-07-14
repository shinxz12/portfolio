"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import Link from "next/link";
import DotGrid from "@/components/dot-grid";
import { site } from "@/data/site";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Headline split into lines for a masked line-by-line reveal.
const HEADLINE_LINES = ["I build reliable systems,", "and make slow ones fast."];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const line: Variants = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: 0.9, ease: EASE } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative -mx-6 overflow-hidden border-b border-border px-6 py-28 sm:-mx-8 sm:px-8 sm:py-40">
      <DotGrid />
      {/* Vignette so the type stays legible over the dot field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 30% 40%, transparent 0%, transparent 45%, var(--background) 100%)",
        }}
      />

      <motion.div
        className="relative"
        variants={container}
        initial={reduceMotion ? "visible" : "hidden"}
        animate="visible"
      >
        <motion.p
          variants={fade}
          className="text-sm font-medium uppercase tracking-[0.2em] text-muted"
        >
          {site.name}
          <span className="text-accent"> / </span>
          {site.title}
        </motion.p>

        <h1 className="font-display mt-8 max-w-4xl text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl">
          {HEADLINE_LINES.map((text) => (
            <span key={text} className="block overflow-hidden pb-1">
              <motion.span variants={line} className="block">
                {text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p variants={fade} className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          {site.intro}
        </motion.p>

        <motion.div variants={fade} className="mt-12 flex flex-wrap items-center gap-8">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            View work
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <a
            href={site.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            Resume
            <ArrowUpRight className="size-4 text-muted transition-colors group-hover:text-accent" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
