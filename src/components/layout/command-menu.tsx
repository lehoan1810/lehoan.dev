"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cx } from "@/lib/cx";
import { toggleTheme } from "@/lib/theme-client";
import type { CommandItem } from "@/types";

/** Lowercase, strip Vietnamese diacritics: "Hỏi đáp" matches "hoi dap". */
const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/g, "d");

const COPIED_CLOSE_MS = 700;

export function CommandMenu({
  items,
  open,
  onClose,
}: {
  items: CommandItem[];
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync the native <dialog> (focus trap, Escape, top layer) with React state.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setQuery("");
      setActive(0);
      setCopiedId(null);
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const results = items.filter((item) => {
    const haystack = normalize(`${item.label} ${item.group} ${item.keywords ?? ""}`);
    return terms.every((term) => haystack.includes(term));
  });
  const groups = [...new Set(results.map((item) => item.group))];
  const current = Math.min(active, Math.max(results.length - 1, 0));
  const optionId = (index: number) => `${listId}-${index}`;

  function run(item: CommandItem) {
    const { action } = item;
    if (action.type === "copy") {
      void navigator.clipboard?.writeText(action.text).then(() => {
        setCopiedId(item.id);
        setTimeout(onClose, COPIED_CLOSE_MS);
      });
      return;
    }

    onClose();
    if (action.type === "theme") {
      toggleTheme();
    } else if (action.href.startsWith("#")) {
      window.location.assign(action.href);
    } else {
      window.open(action.href, "_blank", "noopener,noreferrer");
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      const next = (current + step + results.length) % results.length;
      setActive(next);
      document.getElementById(optionId(next))?.scrollIntoView({ block: "nearest" });
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(results[current]);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Tìm nhanh"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose(); // backdrop click
      }}
      className="m-auto mt-[12vh] w-[min(36rem,calc(100%-2rem))] overflow-hidden rounded-2xl border border-border-card bg-background text-foreground shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm open:animate-dialog-in"
    >
      <div className="flex items-center gap-3 border-b border-border px-4">
        <span aria-hidden className="font-mono text-sm text-brand-ink">
          ›
        </span>
        <input
          autoFocus
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Tìm mục, liên kết, thao tác…"
          role="combobox"
          aria-expanded
          aria-controls={listId}
          aria-activedescendant={results.length ? optionId(current) : undefined}
          aria-autocomplete="list"
          className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-faint"
        />
        <kbd className="hidden rounded-md border border-border-card px-1.5 py-0.5 font-mono text-[10px] text-faint sm:block">
          ESC
        </kbd>
      </div>

      <div id={listId} role="listbox" aria-label="Kết quả" className="max-h-80 overflow-y-auto p-2">
        {results.length === 0 ? (
          <p className="px-3 py-8 text-center text-sm text-muted">
            Không có kết quả cho “{query}”.
          </p>
        ) : (
          groups.map((group) => (
            <div key={group} role="group" aria-label={group} className="not-first:mt-2">
              <p
                aria-hidden
                className="px-3 pt-2 pb-1 font-mono text-[10px] tracking-widest text-faint uppercase"
              >
                {group}
              </p>
              {results.map((item, index) =>
                item.group !== group ? null : (
                  <div
                    key={item.id}
                    id={optionId(index)}
                    role="option"
                    aria-selected={index === current}
                    onPointerMove={() => setActive(index)}
                    onClick={() => run(item)}
                    className={cx(
                      "flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm",
                      index === current ? "bg-surface text-foreground" : "text-muted",
                    )}
                  >
                    <span className="truncate">{item.label}</span>
                    {copiedId === item.id ? (
                      <span className="font-mono text-[11px] text-brand-ink">Đã copy ✓</span>
                    ) : index === current ? (
                      <span aria-hidden className="font-mono text-[11px] text-faint">
                        ↵
                      </span>
                    ) : null}
                  </div>
                ),
              )}
            </div>
          ))
        )}
      </div>

      <div
        aria-hidden
        className="flex items-center gap-4 border-t border-border px-4 py-2.5 font-mono text-[10px] text-faint"
      >
        <span>↑↓ di chuyển</span>
        <span>↵ chọn</span>
        <span>esc đóng</span>
        <span className="ml-auto">⌘K / Ctrl K</span>
      </div>
    </dialog>
  );
}
