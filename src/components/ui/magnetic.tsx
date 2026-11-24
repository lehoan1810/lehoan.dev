"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { motionTimings } from "@/lib/motion";
import { cx } from "@/lib/cx";

/** Pulls its child slightly toward the mouse when the pointer is nearby. */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const { magnetPaddingPx, magnetStrength } = motionTimings;
    let frame = 0;

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !el) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const near =
          Math.abs(event.clientX - cx) < rect.width / 2 + magnetPaddingPx &&
          Math.abs(event.clientY - cy) < rect.height / 2 + magnetPaddingPx;
        el.style.transform = near
          ? `translate3d(${(event.clientX - cx) / magnetStrength}px, ${(event.clientY - cy) / magnetStrength}px, 0)`
          : "";
      });
    }

    window.addEventListener("pointermove", onPointerMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={cx("transition-transform duration-300 ease-out will-change-transform", className)}
    >
      {children}
    </div>
  );
}
