import { Mail } from "lucide-react";
import { BrandIcon, brandPaths } from "@/components/icons";
import { BentoCard } from "@/components/ui/bento-card";
import { ButtonLink } from "@/components/ui/button";
import { Section, sectionTitleId } from "@/components/ui/section";
import { contactSection } from "@/data/faq";
import { socials } from "@/data/site";

export function Contact() {
  return (
    <Section id={contactSection.id} labelled>
      <BentoCard className="reveal px-7 py-14 text-center sm:px-12 sm:py-20">
        <div
          aria-hidden
          className="bg-dots absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
        />
        <h2
          id={sectionTitleId(contactSection.id)}
          className="mx-auto max-w-[18ch] font-display text-3xl leading-[1.1] font-semibold tracking-tighter text-balance text-foreground sm:text-5xl"
        >
          {contactSection.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[52ch] text-base leading-7 text-muted">
          {contactSection.description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
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
      </BentoCard>
    </Section>
  );
}
