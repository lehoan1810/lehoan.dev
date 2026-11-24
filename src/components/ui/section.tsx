import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SectionMeta } from "@/types";

/** id of a section's <h2>, used for aria-labelledby. */
export const sectionTitleId = (id: string) => `${id}-title`;

/** A page section; labelled by its SectionHeader's <h2> when it has an id. */
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
      className={cn("scroll-mt-20 py-14 sm:py-20", className)}
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

/**
 * Editorial header: a top rule, the section number in the margin, then
 * eyebrow / heading / intro. Collapses to a single column on small screens.
 */
export function SectionHeader({
  id,
  index,
  eyebrow,
  title,
  description,
  aside,
}: SectionMeta & { aside?: ReactNode }) {
  return (
    <div className="mb-10 grid gap-4 border-t border-border pt-6 sm:mb-14 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-8">
      <p aria-hidden className="font-mono text-sm text-faint">
        {index} /
      </p>
      <div className="reveal flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2
            id={sectionTitleId(id)}
            className="mt-3 max-w-[22ch] font-display text-3xl leading-[1.1] font-semibold tracking-tighter text-balance text-foreground sm:text-5xl"
          >
            {title}
          </h2>
          <p className="mt-4 max-w-[60ch] text-base leading-7 text-muted">{description}</p>
        </div>
        {aside}
      </div>
    </div>
  );
}
