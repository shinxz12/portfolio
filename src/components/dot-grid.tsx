"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

// Interactive monochrome dot field. Dots repel and light up toward the
// pointer; idle motion is a slow diagonal wave. rAF pauses when the tab is
// hidden. Honors prefers-reduced-motion (static grid, no interaction).
export default function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SPACING = 34;
    const DOT = 1.3;
    const MAX_DIST = 150;
    const pointer = { x: -9999, y: -9999 };
    let dots: { x: number; y: number }[] = [];
    let raf = 0;
    let running = false;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = SPACING / 2; y < rect.height; y += SPACING) {
        for (let x = SPACING / 2; x < rect.width; x += SPACING) {
          dots.push({ x, y });
        }
      }
    };

    const draw = (t: number) => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      for (const d of dots) {
        let px = d.x;
        let py = d.y;
        let r = DOT;
        let alpha = 0.2;
        let lit = 0;

        const dx = d.x - pointer.x;
        const dy = d.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MAX_DIST) {
          const force = 1 - dist / MAX_DIST;
          const ang = Math.atan2(dy, dx);
          px += Math.cos(ang) * force * 16;
          py += Math.sin(ang) * force * 16;
          r += force * 2.4;
          alpha += force * 0.65;
          lit = force;
        }

        if (!reduce) py += Math.sin((d.x + d.y) * 0.01 + t * 0.0011) * 1.2;

        const cr = Math.round(120 + (198 - 120) * lit);
        const cg = Math.round(132 + (255 - 132) * lit);
        const cb = Math.round(150 + (70 - 150) * lit);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      if (!running) return;
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onResize = () => {
      build();
      if (reduce) draw(0);
    };
    const onVis = () => {
      if (document.hidden) stop();
      else start();
    };

    build();
    if (reduce) draw(0);
    else start();

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });
    window.addEventListener("blur", onLeave);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}
