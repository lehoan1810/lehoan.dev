import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** id of a section's <h2>, used for aria-labelledby. */
export const sectionTitleId = (id: string) => `${id}-title`;

/**
 * Every page section starts with a full-bleed top rule.
 * When it has an id and a SectionHeader, it is labelled by that header's <h2>.
 */
export function Section({
  id,
  labelled = false,
  className,
  children,
}: {
  id?: string;
  labelled?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={id && labelled ? sectionTitleId(id) : undefined}
      className={cn("line-t scroll-mt-16", className)}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "font-mono text-xs font-semibold tracking-widest text-brand-ink uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Eyebrow + big heading + intro paragraph, each sitting between guide lines. */
export function SectionHeader({
  id,
  eyebrow,
  title,
  description,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="px-5 pt-20 pb-14 sm:px-10 md:pt-28">
      <Eyebrow className="line-t line-b py-2">{eyebrow}</Eyebrow>
      <div className="reveal">
        <h2
          id={id ? sectionTitleId(id) : undefined}
          className="line-t line-b mt-3 max-w-[22ch] py-1.5 font-display text-4xl leading-[1.1] font-semibold tracking-tighter text-balance text-foreground sm:text-5xl">
          {title}
        </h2>
        <p className="line-t line-b mt-6 max-w-[62ch] py-1.5 text-base leading-7 text-muted">
          {description}
        </p>
      </div>
    </div>
  );
}
