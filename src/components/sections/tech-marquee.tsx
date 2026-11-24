import { BrandIcon } from "@/components/icons";
import { Eyebrow, Section } from "@/components/ui/section";
import { techStack } from "@/data/tech-stack";

export function TechMarquee() {
  // The list is rendered twice so the -50% marquee loop is seamless.
  const loop = [...techStack, ...techStack];

  return (
    <Section>
      <div className="grid grid-cols-1 items-center sm:grid-cols-[auto_minmax(0,1fr)]">
        <Eyebrow className="px-5 pt-6 sm:border-r sm:border-border sm:px-10 sm:py-7">
          Mình hay dùng
        </Eyebrow>
        <div className="group/loop mask-fade-x overflow-hidden py-6 motion-reduce:overflow-x-auto">
          <ul
            aria-label="Công nghệ mình hay dùng"
            className="flex w-max gap-10 pl-10 group-hover/loop:[animation-play-state:paused] motion-safe:animate-marquee"
          >
            {loop.map((tech, i) => (
              <li
                key={`${tech.name}-${i}`}
                aria-hidden={i >= techStack.length}
                className="flex items-center gap-2.5 text-sm font-medium whitespace-nowrap text-muted transition-colors hover:text-foreground"
              >
                <BrandIcon path={tech.path} className="size-5" />
                {tech.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
