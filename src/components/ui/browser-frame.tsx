import { Lock } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Screenshot frame: window dots + an address bar with the product's domain. */
export function BrowserFrame({
  url,
  children,
  className,
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  const host = new URL(url).host;
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border-card bg-surface shadow-[0_24px_48px_-32px_rgb(3_7_18/0.35)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
        </span>
        <span className="mx-auto flex min-w-0 items-center gap-1.5 rounded-full bg-background px-3 py-1 font-mono text-[11px] text-muted ring-1 ring-border">
          <Lock aria-hidden className="size-3 shrink-0" />
          <span className="truncate">{host}</span>
        </span>
        <span aria-hidden className="w-[42px]" />
      </div>
      <div className="group/media relative aspect-[16/10]">{children}</div>
    </div>
  );
}
