import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { MediaFrame, MediaImage } from "@/components/ui/media-frame";
import { Section, SectionHeader } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { journey, journeyOutro, journeySection } from "@/data/journey";
import { cn } from "@/lib/utils";
import type { ChecklistState, JourneyItem } from "@/types";

function TimelineDot({ current }: { current?: boolean }) {
  return (
    <span aria-hidden className="absolute top-[3.1rem] -right-[6px] z-10 hidden lg:block">
      {current ? (
        <>
          <span className="absolute inset-0 rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
          <span className="relative block size-[11px] rounded-full bg-brand ring-1 ring-brand" />
        </>
      ) : (
        <span className="relative block size-[11px] rounded-full bg-background ring-2 ring-faint" />
      )}
    </span>
  );
}

const checklistStateLabel: Record<ChecklistState, string> = {
  done: "Đã xong",
  doing: "Đang làm",
  next: "Sắp tới",
};

/** Progress for the in-progress milestone: "doing" items count as half done. */
function Checklist({ items }: { items: NonNullable<JourneyItem["checklist"]> }) {
  const score = items.reduce((sum, item) => sum + (item.state === "done" ? 1 : item.state === "doing" ? 0.5 : 0), 0);
  const percent = Math.round((score / items.length) * 100);

  return (
    <div className="mt-6 max-w-[56ch]">
      <div className="flex items-center justify-between font-mono text-xs text-muted">
        <span>Tiến độ</span>
        <span>{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-label="Tiến độ"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-2 h-1 overflow-hidden rounded-full bg-surface ring-1 ring-border"
      >
        <div className="h-full bg-brand" style={{ width: `${percent}%` }} />
      </div>
      <ul className="mt-5 space-y-2.5">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2.5 text-sm">
            <span
              aria-hidden
              className={cn(
                "grid size-[18px] shrink-0 place-items-center rounded-full ring-1",
                item.state === "done" && "bg-brand text-brand-foreground ring-brand",
                item.state === "doing" && "ring-brand/50",
                item.state === "next" && "ring-border-card",
              )}
            >
              {item.state === "done" ? <Check className="size-3" strokeWidth={3} /> : null}
              {item.state === "doing" ? <span className="size-1.5 rounded-full bg-brand" /> : null}
            </span>
            <span className={item.state === "next" ? "text-muted" : "text-foreground"}>{item.label}</span>
            <span className="sr-only font-mono text-[11px] tracking-wide text-faint uppercase sm:not-sr-only">
              {checklistStateLabel[item.state]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Milestone({ item }: { item: JourneyItem }) {
  const media = item.media ?? [];
  const multi = media.length > 1;

  return (
    <li className="line-t grid lg:grid-cols-[260px_minmax(0,1fr)]">
      <div className="relative px-5 pt-10 sm:px-10 lg:border-r lg:border-border lg:px-8 lg:pb-12">
        <TimelineDot current={item.current} />
        <p
          className={cn(
            "font-display text-4xl font-semibold tracking-tighter whitespace-nowrap lg:sticky lg:top-24",
            item.current ? "text-brand-display" : "text-foreground",
          )}
        >
          {item.year}
        </p>
        {item.period ? (
          <p className="mt-2 font-mono text-xs text-muted lg:sticky lg:top-36">{item.period}</p>
        ) : null}
      </div>

      <div
        className={cn(
          "reveal grid gap-8 px-5 pt-4 pb-12 sm:px-10 lg:pt-10",
          media.length > 0 && "xl:grid-cols-[minmax(0,1fr)_440px]",
        )}
      >
        <div className="min-w-0">
          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {item.title}
          </h3>
          <p className="mt-3 max-w-[56ch] text-base leading-relaxed text-muted">
            {item.description}
          </p>
          {item.links?.length ? (
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {item.links.map((link) => (
                <TextLink key={link.href} href={link.href}>
                  {link.label}
                </TextLink>
              ))}
            </div>
          ) : null}
          {item.checklist?.length ? <Checklist items={item.checklist} /> : null}
        </div>

        {media.length > 0 ? (
          <div className={cn("grid content-start gap-2 self-start", multi && "grid-cols-2")}>
            {media.map((m) => (
              <MediaFrame key={m.alt} aspectClassName={multi ? "aspect-[4/3]" : "aspect-[16/10]"}>
                <MediaImage media={m} sizes="(max-width: 1280px) 90vw, 440px" />
              </MediaFrame>
            ))}
          </div>
        ) : null}
      </div>
    </li>
  );
}

export function Journey() {
  return (
    <Section id={journeySection.id} labelled>
      <SectionHeader {...journeySection} />

      <ol aria-label="Các phiên bản">
        {journey.map((item) => (
          <Milestone key={item.year} item={item} />
        ))}

        <li className="line-t grid lg:grid-cols-[260px_minmax(0,1fr)]">
          <div className="relative px-5 pt-10 sm:px-10 lg:border-r lg:border-dashed lg:border-border-card lg:px-8 lg:pb-12">
            <p aria-hidden className="font-display text-4xl font-semibold tracking-tighter text-faint">
              …
            </p>
          </div>
          <div className="flex flex-col items-start gap-6 px-5 pt-4 pb-12 sm:px-10 lg:pt-10">
            <div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {journeyOutro.title}
              </h3>
              <p className="mt-3 max-w-[56ch] text-base leading-relaxed text-muted">
                {journeyOutro.description}
              </p>
            </div>
            <ButtonLink href={journeyOutro.cta.href}>{journeyOutro.cta.label}</ButtonLink>
          </div>
        </li>
      </ol>
    </Section>
  );
}
