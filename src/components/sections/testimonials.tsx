import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/section";
import { Spotlight } from "@/components/ui/spotlight";
import { testimonials, testimonialsSection } from "@/data/testimonials";
import type { Testimonial } from "@/types";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function Avatar({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.avatar) {
    return (
      <Image
        src={testimonial.avatar}
        alt=""
        width={40}
        height={40}
        className="size-10 shrink-0 rounded-full object-cover ring-1 ring-border-card"
      />
    );
  }
  return (
    <span
      aria-hidden
      className="grid size-10 shrink-0 place-items-center rounded-full bg-brand/10 text-sm font-semibold text-brand-ink ring-1 ring-brand/20"
    >
      {initials(testimonial.name)}
    </span>
  );
}

export function Testimonials() {
  return (
    <Section id={testimonialsSection.id} labelled>
      <SectionHeader {...testimonialsSection} />
      <div className="line-t columns-1 gap-4 px-2 pt-6 pb-16 sm:px-6 md:columns-2 lg:columns-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="reveal mb-4 break-inside-avoid rounded-2xl bg-frame p-1.5 ring-1 ring-border-card"
          >
            <Spotlight className="rounded-xl bg-background p-6 ring-1 ring-border">
              <blockquote className="text-[15px] leading-7 text-foreground">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar testimonial={t} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="truncate text-sm text-muted">{t.role}</p>
                </div>
              </figcaption>
            </Spotlight>
          </figure>
        ))}
      </div>
    </Section>
  );
}
