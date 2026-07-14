"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import ButtonLink from "@/components/button-link";
import Magnetic from "@/components/magnetic";
import { site } from "@/data/site";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: "70%" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative py-24 sm:py-36">
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 overflow-visible"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mesh-blob -top-24 -left-24 h-96 w-96 bg-accent/50" />
        <div className="mesh-blob top-8 -right-16 h-80 w-80 bg-accent-cyan/40 [animation-delay:-6s]" />
        <div className="mesh-blob -bottom-32 left-1/3 h-96 w-96 bg-accent-pink/35 [animation-delay:-12s]" />
      </motion.div>

      <motion.div
        variants={container}
        initial={reduceMotion ? "visible" : "hidden"}
        animate="visible"
      >
        <h1 className="font-display text-5xl font-bold tracking-tight sm:text-7xl">
          {site.name.split(" ").map((part) => (
            <span key={part} className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span variants={word} className="mr-[0.22em] inline-block">
                {part}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          variants={fadeUp}
          className="gradient-text font-display mt-2 text-3xl font-semibold tracking-tight sm:text-5xl"
        >
          {site.title}
        </motion.p>

        <motion.p variants={fadeUp} className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          {site.tagline}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
          <Magnetic>
            <ButtonLink href="/#work">View work</ButtonLink>
          </Magnetic>
          <Magnetic>
            <ButtonLink href={site.cvUrl} variant="secondary" newTab>
              View Resume
            </ButtonLink>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
