import { Check, Copy } from "lucide-react";
import type { ReactNode } from "react";
import { CopyButton } from "./copy-button";

/** Dark editor-style window with traffic-light dots, a title and optional copy action. */
export function CodeWindow({
  title,
  copyText,
  children,
}: {
  title: string;
  copyText?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-frame p-1.5 ring-1 ring-border-card">
      <div className="overflow-hidden rounded-xl bg-code-background text-code-foreground ring-1 ring-white/10">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2">
          <div className="flex min-w-0 items-center gap-3">
            <div aria-hidden className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
            </div>
            <span className="truncate font-mono text-xs text-code-muted">{title}</span>
          </div>
          {copyText ? (
            <CopyButton
              text={copyText}
              icon={<Copy aria-hidden className="size-3.5" />}
              copiedIcon={<Check aria-hidden className="size-3.5" />}
            />
          ) : null}
        </div>
        <div className="p-5 font-mono text-[13px] leading-7 break-words whitespace-pre-wrap sm:text-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
