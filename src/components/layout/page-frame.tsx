import type { ReactNode } from "react";

/**
 * Blueprint frame: a centered column flanked by two hatched rails (≥ sm).
 * Guide lines (`line-t` / `line-b`) run past it to the viewport edges, so the outer
 * wrapper clips the overflow. `overflow-x: clip` (not hidden) keeps the sticky header working.
 */
export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-clip">
      <div className="mx-auto grid max-w-[77rem] grid-cols-1 sm:grid-cols-[2.5rem_minmax(0,1fr)_2.5rem]">
        <div aria-hidden className="bg-hatch hidden border-r border-border sm:block" />
        <div className="min-w-0">{children}</div>
        <div aria-hidden className="bg-hatch hidden border-l border-border sm:block" />
      </div>
    </div>
  );
}
