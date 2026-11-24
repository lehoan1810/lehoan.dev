import { BrandIcon } from "@/components/icons";
import { BentoCard, CardLabel, LiveDot } from "@/components/ui/bento-card";
import { Section, SectionHeader } from "@/components/ui/section";
import { stack, stackSection } from "@/data/stack";
import { techStack } from "@/data/tech-stack";

const iconOf = (name: string) => techStack.find((tech) => tech.name === name)?.path;

export function Stack() {
  const aiIcon = iconOf(stack.ai.tool);

  return (
    <Section id={stackSection.id} labelled>
      <SectionHeader {...stackSection} />
      <div className="grid gap-3 lg:grid-cols-3">
        <BentoCard className="reveal lg:col-span-2 lg:row-span-2">
          <CardLabel>Dùng mỗi ngày</CardLabel>
          <ul className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {stack.daily.map((name) => {
              const path = iconOf(name);
              return (
                <li
                  key={name}
                  className="flex flex-col items-center gap-2.5 rounded-2xl px-2 py-4 text-center transition-colors hover:bg-surface"
                >
                  {path ? (
                    <BrandIcon path={path} className="size-7 text-foreground/80" />
                  ) : (
                    <span aria-hidden className="size-7" />
                  )}
                  <span className="text-xs text-muted">{name}</span>
                </li>
              );
            })}
          </ul>
        </BentoCard>

        <BentoCard className="reveal">
          <CardLabel className="flex items-center gap-2">
            <LiveDot /> Đang học
          </CardLabel>
          <ul className="mt-5 flex flex-wrap gap-2">
            {stack.learning.map((name) => {
              const path = iconOf(name);
              return (
                <li
                  key={name}
                  className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-xs text-foreground ring-1 ring-border"
                >
                  {path ? <BrandIcon path={path} className="size-3.5" /> : null}
                  {name}
                </li>
              );
            })}
          </ul>
        </BentoCard>

        <BentoCard className="reveal">
          <CardLabel className="flex items-center gap-2">
            {aiIcon ? <BrandIcon path={aiIcon} className="size-3.5 text-brand" /> : null}
            Cặp với {stack.ai.tool}
          </CardLabel>
          <p className="mt-4 text-sm leading-6 text-muted">{stack.ai.note}</p>
        </BentoCard>
      </div>
    </Section>
  );
}
