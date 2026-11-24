"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("vi-VN", {
  timeZone: "Asia/Ho_Chi_Minh",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

// A string snapshot is stable between ticks, so React only re-renders when the minute changes.
const getSnapshot = () => formatter.format(new Date());
// Prerendered HTML can't know the visitor's "now": render a placeholder, fill in on hydration.
const getServerSnapshot = () => null;

/** Current time in Vietnam (GMT+7), ticking every minute. */
export function LocalTime() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <time className="tabular-nums" suppressHydrationWarning>
      {time ?? "--:--"}
    </time>
  );
}
