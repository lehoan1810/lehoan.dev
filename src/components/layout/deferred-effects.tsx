"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Purely decorative effects: split into their own chunks and loaded only once
// the browser is idle, so they never compete with hydration or the LCP.
const ClickSpark = dynamic(() => import("./click-spark").then((m) => m.ClickSpark), {
  ssr: false,
});
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
  return (
    <>
      <SpotlightTracker />
      <ClickSpark />
    </>
  );
}
