import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card wrapper with a soft brand-colored glow that follows the pointer.
 *
 * This is a Server Component: it ships no JS. A single delegated listener
 * (`SpotlightTracker`, loaded lazily) updates --spot-x/--spot-y on whichever
 * `[data-spotlight]` element is under the pointer, instead of hydrating one
 * client component per card.
 */
export function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div data-spotlight className={cn("group/spot relative isolate overflow-hidden", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(420px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgb(250_93_25/0.09),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
      />
      {children}
    </div>
  );
}
