import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { CodeWindow } from "@/components/ui/code-window";
import { Magnetic } from "@/components/ui/magnetic";
import { MediaPlaceholder } from "@/components/ui/media-frame";
import { heroCode, heroDescription, heroHeading, heroPhoto, type CodeTone } from "@/data/hero";
import { announcement, socials, tagline } from "@/data/site";
import { motionTimings } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Tiny mono caption above a block, mimicking a design-inspector label. */
function SpecLabel({ children }: { children: string }) {
  return (
    <p aria-hidden className="mb-1 truncate font-mono text-[11px] leading-5 text-faint">
      {children}
    </p>
  );
}

function BlurHeading() {
  const lead = heroHeading.lead.split(" ");
  const highlight = heroHeading.highlight.split(" ");
  const words = [
    ...lead.map((w) => ({ w, brand: false })),
    ...highlight.map((w) => ({ w, brand: true })),
  ];

  return (
    <h1 className="line-t line-b py-1.5 font-display text-[2.5rem] leading-[1.1] font-semibold tracking-tighter text-balance text-foreground sm:text-6xl lg:text-7xl">
      {words.map(({ w, brand }, i) => (
        <span key={i}>
          <span
            className={cn("inline-block motion-safe:animate-blur-in", brand && "text-brand-display")}
            style={{ animationDelay: `${i * motionTimings.blurWordDelayMs}ms` }}
          >
            {w}
          </span>{" "}
        </span>
      ))}
    </h1>
  );
}

const toneClass: Record<CodeTone, string> = {
  accent: "text-code-accent",
  key: "text-code-foreground",
  punctuation: "text-code-muted",
  string: "text-code-string",
  number: "text-code-number",
};

function HeroCode() {
  const { terminalStartDelayMs, terminalLineDelayMs } = motionTimings;
  return (
    <CodeWindow title={heroCode.filename}>
      {heroCode.lines.map((line, i) => (
        <div
          key={i}
          className="flex motion-safe:animate-line-in"
          style={{ animationDelay: `${terminalStartDelayMs + i * terminalLineDelayMs}ms` }}
        >
          <span aria-hidden className="w-8 shrink-0 text-right text-code-muted/60 select-none">
            {i + 1}
          </span>
          <span
            className="min-w-0"
            style={{
              paddingInlineStart: `calc(1.25rem + ${(line.indent + 1) * 2}ch)`,
              textIndent: "-2ch",
            }}
          >
            {line.tokens.map((token, j) => (
              <span key={j} className={toneClass[token.tone]}>
                {token.text}
              </span>
            ))}
          </span>
        </div>
      ))}
    </CodeWindow>
  );
}

export function Hero() {
  return (
    <section>
      <div className="px-5 pt-14 pb-16 sm:px-10 md:pt-20 md:pb-20">
        <a
          href={announcement.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 text-sm text-foreground ring-1 ring-border-card transition-colors hover:bg-surface motion-safe:animate-hero-rise"
        >
          <span className="font-semibold text-brand-ink">{announcement.label}</span>
          <span aria-hidden className="h-3.5 w-px bg-border-card" />
          <span className="motion-safe:text-shine motion-safe:animate-shine">{announcement.text}</span>
          <ArrowRight aria-hidden className="size-3.5 text-muted" />
        </a>

        <div className="mt-10">
          <SpecLabel>h1 · text-7xl font-semibold tracking-tighter text-balance</SpecLabel>
          <BlurHeading />
        </div>

        <div className="mt-8 motion-safe:animate-hero-rise motion-safe:[animation-delay:500ms]">
          <SpecLabel>p · text-lg text-muted</SpecLabel>
          <p className="line-t line-b max-w-[62ch] py-1.5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {heroDescription}
          </p>
        </div>

        <div className="mt-8 motion-safe:animate-hero-rise motion-safe:[animation-delay:600ms]">
          <SpecLabel>div · flex gap-3</SpecLabel>
          <div className="line-t line-b flex flex-col gap-3 py-3 sm:flex-row sm:items-center">
            <Magnetic className="w-full sm:w-auto">
              <ButtonLink href={socials.youtube} className="w-full">
                Theo dõi kênh YouTube
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="#hanh-trinh" variant="secondary">
              Xem hành trình của mình
            </ButtonLink>
            <p className="font-mono text-xs text-muted sm:ml-3">{tagline}</p>
          </div>
        </div>
      </div>

      <div className="line-t grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="p-2 motion-safe:animate-hero-rise motion-safe:[animation-delay:320ms] sm:p-4">
          <HeroCode />
        </div>
        <div className="group/photo relative hidden overflow-hidden border-l border-border motion-safe:animate-hero-rise motion-safe:[animation-delay:400ms] lg:block">
          {heroPhoto.src ? (
            <Image
              src={heroPhoto.src}
              alt={heroPhoto.alt}
              fill
              // Above the fold on desktop only (the column is hidden below lg), so load
              // eagerly without a <head> preload that mobile would download for nothing.
              loading="eager"
              placeholder={typeof heroPhoto.src === "object" ? "blur" : "empty"}
              sizes="380px"
              style={{ objectPosition: heroPhoto.position }}
              className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover/photo:scale-[1.04]"
            />
          ) : (
            <MediaPlaceholder label={heroPhoto.alt} />
          )}
        </div>
      </div>
    </section>
  );
}
