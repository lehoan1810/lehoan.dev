const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
const compactWhole = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 0 });

/** 41520 → "41.5K" */
export const formatCompact = (value: number) => compact.format(value);

/** 163402 → "163K+" */
export const formatInstalls = (value: number) => `${compactWhole.format(value)}+`;

/** "24/11/2026" in Vietnam time, independent of the server's timezone. */
export const formatDateVi = (date: Date) =>
  new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(date);

/** Remote data must never block a render for long. */
export const FETCH_TIMEOUT_MS = 4000;
