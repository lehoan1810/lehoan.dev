import { Check } from "lucide-react";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { MediaImage } from "@/components/ui/media-frame";
import { Section, SectionHeader } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { projects, projectsSection } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

function ProjectRow({ project, flip }: { project: Project; flip: boolean }) {
  const host = new URL(project.url).host;
  const meta = [project.role, project.period].filter(Boolean).join(" · ");

  return (
    <article
      aria-labelledby={`${project.id}-name`}
      className="reveal grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14"
    >
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        tabIndex={-1}
        aria-hidden
        className={cn("block", flip && "lg:order-2")}
      >
        <BrowserFrame url={project.url}>
          <MediaImage media={project.image} sizes="(min-width: 1024px) 560px, 100vw" />
        </BrowserFrame>
      </a>

      <div>
        <p className="font-mono text-xs text-brand-ink">{project.kind}</p>
        <h3
          id={`${project.id}-name`}
          className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {project.name}
        </h3>
        <p className="mt-2 text-base font-medium text-foreground/90">{project.tagline}</p>
        <p className="mt-4 text-sm leading-6 text-muted">{project.description}</p>

        <ul className="mt-5 space-y-2">
          {project.features.map((feature) => (
            <li key={feature} className="flex gap-2.5 text-sm text-foreground">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
              {feature}
            </li>
          ))}
        </ul>

        {project.contributions?.length ? (
          <div className="mt-6 rounded-2xl bg-surface p-4 ring-1 ring-border">
            <p className="font-mono text-[11px] tracking-widest text-faint uppercase">
              Phần mình làm
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm text-foreground marker:text-brand">
              {project.contributions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {project.stack?.length ? (
          <ul aria-label="Công nghệ" className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full px-2.5 py-1 font-mono text-[11px] text-muted ring-1 ring-border-card"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          {meta ? <p className="text-xs text-muted">{meta}</p> : <span />}
          <TextLink href={project.url}>{host}</TextLink>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <Section id={projectsSection.id} labelled>
      <SectionHeader {...projectsSection} />
      <div className="flex flex-col gap-20 sm:gap-28">
        {projects.map((project, index) => (
          <ProjectRow key={project.id} project={project} flip={index % 2 === 1} />
        ))}
      </div>
    </Section>
  );
}
