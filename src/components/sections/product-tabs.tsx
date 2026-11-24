"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cx } from "@/lib/cx";

export type ProductTabItem = { id: string; tab: ReactNode; panel: ReactNode };

/**
 * Minimal client island: only owns which tab is selected.
 * Tab labels and panels are rendered on the server and passed in as props, so
 * every panel is in the HTML (indexable) and no icon/markup code ships as JS.
 */
export function ProductTabs({ items, label }: { items: ProductTabItem[]; label: string }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(index: number) {
    setActive(index);
    tabRefs.current[index]?.focus();
  }

  // WAI-ARIA tabs keyboard pattern.
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = items.length - 1;
    const next: Record<string, number> = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    select(next[event.key]);
  }

  return (
    <div className="line-t grid grid-cols-1 gap-px bg-border lg:grid-cols-[340px_1fr]">
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="grid grid-cols-2 gap-px lg:flex lg:flex-col"
      >
        {items.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cx(
                "group/tab relative inline-flex w-full cursor-pointer flex-col items-start justify-start gap-2 rounded-none px-4 py-4 text-left text-sm font-semibold transition-colors hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-inset sm:px-6 sm:py-5",
                selected ? "bg-surface" : "bg-background",
              )}
            >
              {item.tab}
            </button>
          );
        })}
        <div aria-hidden className="hidden flex-1 bg-background lg:block" />
      </div>

      {items.map((item, i) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`panel-${item.id}`}
          aria-labelledby={`tab-${item.id}`}
          hidden={i !== active}
          className="min-w-0 bg-background px-5 py-8 motion-safe:animate-panel-in sm:p-10"
        >
          {item.panel}
        </div>
      ))}
    </div>
  );
}
