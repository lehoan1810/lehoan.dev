import { ArrowUpRight } from "lucide-react";
import { hobbyIcons } from "@/components/icons";
import { Section, SectionHeader } from "@/components/ui/section";
import { Spotlight } from "@/components/ui/spotlight";
import { hobbies, hobbiesSection } from "@/data/hobbies";

export function Hobbies() {
  return (
    <Section id={hobbiesSection.id} labelled>
      <SectionHeader {...hobbiesSection} />
      <div className="line-t grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
        {hobbies.map((hobby) => {
          const Icon = hobbyIcons[hobby.icon];
          return (
            <Spotlight
              key={hobby.title}
              className="bg-background sm:last:col-span-2 lg:last:col-span-1"
            >
              <article className="flex h-full flex-col p-6">
                <span className="grid size-10 place-items-center rounded-full bg-surface ring-1 ring-border-card">
                  <Icon aria-hidden className="size-5 text-brand" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {hobby.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-muted">{hobby.description}</p>
                {hobby.link ? (
                  <a
                    href={hobby.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto inline-flex items-center gap-1 pt-4 font-mono text-xs text-brand-ink transition-colors hover:text-foreground"
                  >
                    {hobby.link.label}
                    <ArrowUpRight aria-hidden className="size-3.5" />
                  </a>
                ) : null}
              </article>
            </Spotlight>
          );
        })}
      </div>
    </Section>
  );
}
