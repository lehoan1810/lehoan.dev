import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, Section } from "@/components/ui/section";
import { ctaSection } from "@/data/faq";
import { socials } from "@/data/site";

export function Cta() {
  return (
    <Section>
      <div className="px-5 pt-20 pb-24 sm:px-10 md:pt-28 md:pb-32">
        <Eyebrow className="line-t line-b py-2">{ctaSection.eyebrow}</Eyebrow>
        <h2 className="reveal line-t line-b mt-3 max-w-[20ch] py-1.5 font-display text-4xl leading-[1.1] font-semibold tracking-tighter text-balance text-foreground sm:text-6xl">
          {ctaSection.title}
        </h2>
        <p className="line-t line-b mt-6 max-w-[58ch] py-1.5 text-base leading-7 text-muted">
          {ctaSection.description}
        </p>
        <div className="line-t line-b mt-8 flex flex-col gap-3 py-3 sm:flex-row">
          <ButtonLink href={socials.youtube}>Theo dõi YouTube</ButtonLink>
          <ButtonLink href={socials.tiktok} variant="secondary">
            TikTok
          </ButtonLink>
          <ButtonLink href={socials.blog} variant="secondary">
            Blog
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
