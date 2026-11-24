"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Purely decorative effect: split into its own chunk and loaded only once
// the browser is idle, so it never competes with hydration or the LCP.
const SpotlightTracker = dynamic(
  () => import("./spotlight-tracker").then((m) => m.SpotlightTracker),
  { ssr: false },
);

export function DeferredEffects() {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setIdle(true), { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setIdle(true), 1200);
    return () => clearTimeout(id);
  }, []);

  if (!idle) return null;
  return <SpotlightTracker />;
}
