import { ButtonLink } from "@/components/ui/button";
import { MediaFrame, MediaImage } from "@/components/ui/media-frame";
import { Section, SectionHeader } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { journey, journeyOutro, journeySection } from "@/data/journey";
import { socials } from "@/data/site";
import { cn } from "@/lib/utils";
import type { JourneyItem } from "@/types";

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

function Milestone({ item }: { item: JourneyItem }) {
  const multi = item.media.length > 1;

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
      </div>

      <div className="reveal grid gap-8 px-5 pt-4 pb-12 sm:px-10 lg:pt-10 xl:grid-cols-[minmax(0,1fr)_440px]">
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
        </div>

        <div className={cn("grid content-start gap-2 self-start", multi && "grid-cols-2")}>
          {item.media.map((media) => (
            <MediaFrame key={media.alt} aspectClassName={multi ? "aspect-[4/3]" : "aspect-[16/10]"}>
              <MediaImage media={media} sizes="(max-width: 1280px) 90vw, 440px" />
            </MediaFrame>
          ))}
        </div>
      </div>
    </li>
  );
}

export function Journey() {
  return (
    <Section id={journeySection.id} labelled>
      <SectionHeader {...journeySection} />

      <ol aria-label="Các mốc trong hành trình">
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
            <ButtonLink href={socials.youtube}>{journeyOutro.cta}</ButtonLink>
          </div>
        </li>
      </ol>
    </Section>
  );
}
