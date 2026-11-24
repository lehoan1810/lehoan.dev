import type { CSSProperties, ReactNode } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";

/** The base surface of the layout: rounded card with a hairline border and pointer glow. */
export function BentoCard({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Spotlight
      style={style}
      className={cn("rounded-3xl border border-border-card bg-background p-6", className)}
    >
      {children}
    </Spotlight>
  );
}

/** Small mono label at the top of a card. */
export function CardLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-[11px] tracking-widest text-faint uppercase", className)}>
      {children}
    </p>
  );
}

/** Brand dot with a soft ping: "this is live / in progress". */
export function LiveDot({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("relative inline-flex size-2", className)}>
      <span className="absolute inset-0 rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
      <span className="relative inline-flex size-2 rounded-full bg-brand" />
    </span>
  );
}
