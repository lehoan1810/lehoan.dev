import { Mail } from "lucide-react";
import { BrandIcon, brandPaths } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, Section, sectionTitleId } from "@/components/ui/section";
import { ctaSection } from "@/data/faq";
import { socials } from "@/data/site";

export function Cta() {
  return (
    <Section id={ctaSection.id} labelled>
      <div className="px-5 pt-20 pb-24 sm:px-10 md:pt-28 md:pb-32">
        <Eyebrow className="line-t line-b py-2">{ctaSection.eyebrow}</Eyebrow>
        <h2
          id={sectionTitleId(ctaSection.id)}
          className="reveal line-t line-b mt-3 max-w-[20ch] py-1.5 font-display text-4xl leading-[1.1] font-semibold tracking-tighter text-balance text-foreground sm:text-6xl"
        >
          {ctaSection.title}
        </h2>
        <p className="line-t line-b mt-6 max-w-[58ch] py-1.5 text-base leading-7 text-muted">
          {ctaSection.description}
        </p>
        <div className="line-t line-b mt-8 flex flex-col gap-3 py-3 sm:flex-row">
          {socials.email ? (
            <ButtonLink href={`mailto:${socials.email}`}>
              <Mail aria-hidden className="size-4" />
              Gửi email
            </ButtonLink>
          ) : null}
          <ButtonLink href={socials.github} variant={socials.email ? "secondary" : "primary"}>
            <BrandIcon path={brandPaths.github} className="size-4" />
            GitHub
          </ButtonLink>
          {socials.linkedin ? (
            <ButtonLink href={socials.linkedin} variant="secondary">
              <BrandIcon path={brandPaths.linkedin} className="size-4" />
              LinkedIn
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
