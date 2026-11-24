"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { motionTimings } from "@/lib/motion";
import { cx } from "@/lib/cx";

const COPIES = 6;

/**
 * Big display text rows drifting in opposite directions.
 * Speed = base + scroll velocity, so scrolling makes the rows rush.
 */
export function ScrollMarqueeRows({ rows }: { rows: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = usePrefersReducedMotion();
  const inView = useInView(containerRef, { rootMargin: "100px" });

  useEffect(() => {
    if (!inView || reducedMotion) return;

    const { scrollVelocityBasePx, scrollVelocityBoost } = motionTimings;
    const offsets = rows.map(() => 0);
    let lastTime = performance.now();
    let lastScroll = window.scrollY;
    let velocity = 0;
    let frame = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      const scrolled = window.scrollY - lastScroll;
      const instant = dt > 0 ? Math.abs(scrolled) / dt : 0;
      velocity += (instant - velocity) * 0.1;
      lastTime = now;
      lastScroll = window.scrollY;

      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        const width = el.scrollWidth / COPIES;
        const speed = scrollVelocityBasePx + velocity * scrollVelocityBoost;
        offsets[i] = (offsets[i] + (i % 2 === 0 ? -1 : 1) * speed * dt) % width;
        const x = offsets[i] > 0 ? offsets[i] - width : offsets[i];
        el.style.transform = `translate3d(${x}px, 0, 0)`;
      });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reducedMotion, rows]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="overflow-hidden py-10 font-display text-5xl leading-tight font-semibold tracking-tighter select-none sm:text-7xl"
    >
      {rows.map((row, i) => (
        <div
          key={row}
          ref={(el) => {
            rowRefs.current[i] = el;
          }}
          className={cx(
            "flex w-max will-change-transform",
            i % 2 === 0
              ? "text-foreground"
              : "text-transparent [-webkit-text-stroke:1px_var(--faint)]",
          )}
        >
          {Array.from({ length: COPIES }, (_, j) => (
            <span key={j} className="shrink-0 pr-8 whitespace-nowrap">
              {row}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
