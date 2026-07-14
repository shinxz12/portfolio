"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { site } from "@/data/site";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-b border-border py-24 sm:py-32">
      <motion.div
        variants={container}
        initial={reduceMotion ? "visible" : "hidden"}
        animate="visible"
      >
        <motion.p
          variants={item}
          className="text-sm font-medium uppercase tracking-[0.2em] text-muted"
        >
          {site.name}
          <span className="text-accent"> / </span>
          {site.title}
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display mt-8 max-w-4xl text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl"
        >
          {site.headline}
        </motion.h1>

        <motion.p variants={item} className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          {site.intro}
        </motion.p>

        <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-8">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
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
