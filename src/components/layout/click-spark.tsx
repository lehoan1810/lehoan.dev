"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { motionTimings } from "@/lib/motion";

type Spark = { x: number; y: number; angle: number; startTime: number };

/** Full-screen canvas that draws a small burst of brand-colored lines on every click. */
export function ClickSpark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || reducedMotion) return;

    const { sparkCount, sparkSizePx, sparkRadiusPx, sparkDurationMs } = motionTimings;
    let sparks: Spark[] = [];
    let frame = 0;

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      sparks = sparks.filter((s) => now - s.startTime < sparkDurationMs);

      const color =
        getComputedStyle(document.documentElement).getPropertyValue("--brand").trim() || "#fa5d19";

      for (const s of sparks) {
        const t = 1 - Math.pow(1 - (now - s.startTime) / sparkDurationMs, 2);
        const distance = t * sparkRadiusPx;
        const length = sparkSizePx * (1 - t);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x + distance * Math.cos(s.angle), s.y + distance * Math.sin(s.angle));
        ctx.lineTo(
          s.x + (distance + length) * Math.cos(s.angle),
          s.y + (distance + length) * Math.sin(s.angle),
        );
        ctx.stroke();
      }

      frame = sparks.length ? requestAnimationFrame(draw) : 0;
    }

    function onClick(event: MouseEvent) {
      const startTime = performance.now();
      for (let i = 0; i < sparkCount; i++) {
        sparks.push({
          x: event.clientX,
          y: event.clientY,
          angle: (2 * Math.PI * i) / sparkCount,
          startTime,
        });
      }
      if (!frame) frame = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 size-full"
    />
  );
}
