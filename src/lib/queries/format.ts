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
