"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { motionTimings } from "@/lib/motion";

function parse(value: string) {
  const match = value.match(/^(\d+(?:\.(\d+))?)(.*)$/);
  if (!match) return null;
  return {
    number: Number.parseFloat(match[1]),
    decimals: match[2]?.length ?? 0,
    suffix: match[3],
  };
}

/** Animates "41.5K" → counts 0.0K…41.5K once the element scrolls into view. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const reducedMotion = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    const parsed = parse(value);
    if (!inView || reducedMotion || !parsed) return;

    const { number, decimals, suffix } = parsed;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / motionTimings.countUpMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${(eased * number).toFixed(decimals)}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reducedMotion, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden>{display}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
