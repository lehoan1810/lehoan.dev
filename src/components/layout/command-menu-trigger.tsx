"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";
import { cx } from "@/lib/cx";
import type { CommandItem } from "@/types";

// The palette is only needed after the first ⌘K / click, so it lives in its own chunk.
// Hovering or focusing the trigger warms that chunk up so opening feels instant.
const loadMenu = () => import("./command-menu");
const CommandMenu = dynamic(() => loadMenu().then((m) => m.CommandMenu), { ssr: false });

/** `children` is the (server-rendered) trigger content: icon, label, shortcut hint. */
export function CommandMenuTrigger({
  items,
  children,
  className,
}: {
  items: CommandItem[];
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  // Keep the dialog mounted after the first open so later opens skip loading entirely.
  const [mounted, setMounted] = useState(false);

  const show = () => {
    setMounted(true);
    setOpen(true);
  };

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setMounted(true);
        setOpen((value) => !value);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={show}
        onPointerEnter={() => void loadMenu()}
        onFocus={() => void loadMenu()}
        aria-haspopup="dialog"
        aria-keyshortcuts="Meta+K Control+K"
        className={cx(
          "inline-flex cursor-pointer items-center gap-2 rounded-full text-sm text-muted ring-1 ring-border-card transition-colors hover:bg-surface hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50",
          className,
        )}
      >
        {children}
      </button>
      {mounted ? <CommandMenu items={items} open={open} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
