/**
 * Plain class joiner for Client Components. Unlike `cn()` it does not resolve Tailwind
 * conflicts, which keeps tailwind-merge (~9KB gzip) out of the browser bundle.
 * Use it where the joined classes never override each other.
 */
export { clsx as cx } from "clsx";
