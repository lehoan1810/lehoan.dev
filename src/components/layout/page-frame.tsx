import type { ReactNode } from "react";

/**
 * Centered content column flanked by two hatched rails (≥ sm).
 * Guide lines (`line-t` / `line-b`) extend past it, so the outer wrapper clips overflow.
 */
export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-clip">
      <div className="mx-auto grid max-w-[85rem] grid-cols-1 sm:grid-cols-[2.5rem_minmax(0,1fr)_2.5rem]">
        <div aria-hidden className="bg-hatch hidden border-r border-border sm:block" />
        <div className="min-w-0">{children}</div>
        <div aria-hidden className="bg-hatch hidden border-l border-border sm:block" />
      </div>
    </div>
  );
}
