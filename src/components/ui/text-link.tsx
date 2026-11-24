import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small mono link with a ↗ arrow, used under milestones and cards. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center gap-1 font-mono text-sm text-brand-ink transition-colors hover:text-foreground",
        className,
      )}
    >
      {children}
      <ArrowUpRight aria-hidden className="size-3.5" />
    </a>
  );
}
