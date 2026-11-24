import { Check } from "lucide-react";
import { LiveDot } from "@/components/ui/bento-card";
import { Section, SectionHeader } from "@/components/ui/section";
import { changelog, changelogSection } from "@/data/changelog";
import { githubUsername } from "@/data/site";
import { cn } from "@/lib/utils";
import type { ChangelogEntry, ChecklistState } from "@/types";

const stateLabel: Record<ChecklistState, string> = {
  done: "Đã xong",
  doing: "Đang làm",
  next: "Sắp tới",
};

function StateIcon({ state }: { state: ChecklistState }) {
  if (state === "done") {
    return (
      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground">
        <Check aria-hidden className="size-3" strokeWidth={3} />
      </span>
    );
  }
  if (state === "doing") {
    return (
      <span className="grid size-5 shrink-0 place-items-center rounded-full ring-1 ring-brand/50">
        <LiveDot />
      </span>
    );
  }
  return <span className="size-5 shrink-0 rounded-full ring-1 ring-border-card" />;
}

function Progress({ checklist }: { checklist: NonNullable<ChangelogEntry["checklist"]> }) {
  const total = checklist.length;
  const done = checklist.filter((item) => item.state === "done").length;
  const doing = checklist.filter((item) => item.state === "doing").length;
  // "Doing" items count as half-way there.
  const percent = Math.round(((done + doing / 2) / total) * 100);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>Tiến độ</span>
        <span className="font-mono tabular-nums text-foreground">{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-label="Tiến độ v4.0"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-foreground/[0.06]"
      >
        <span className="h-full bg-brand" style={{ width: `${(done / total) * 100}%` }} />
        <span className="h-full bg-brand/35" style={{ width: `${(doing / total) * 100}%` }} />
      </div>
      <ul className="mt-5 space-y-3">
        {checklist.map((item) => (
          <li key={item.label} className="flex items-center gap-3 text-sm">
            <StateIcon state={item.state} />
            <span className={cn(item.state === "next" ? "text-muted" : "text-foreground")}>
              {item.label}
            </span>
            <span className="sr-only ml-auto shrink-0 font-mono text-[10px] tracking-wider whitespace-nowrap text-faint uppercase sm:not-sr-only">
              {stateLabel[item.state]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Release({ entry }: { entry: ChangelogEntry }) {
  return (
    <li className="reveal relative grid gap-3 pb-12 pl-8 last:pb-0 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-12 md:pl-0">
      {/* Rail + node (mobile: left edge, desktop: between the columns) */}
      <span
        aria-hidden
        className="absolute top-2 bottom-0 left-[5px] w-px bg-border-card md:left-[calc(9rem+1.5rem)] [li:last-child>&]:hidden"
      />
      <span
        aria-hidden
        className={cn(
          "absolute top-1.5 left-0 size-[11px] rounded-full ring-4 ring-background md:left-[calc(9rem+1.5rem-5px)]",
          entry.beta ? "bg-brand" : "bg-border-card",
        )}
      />

      <div className="md:pt-0.5">
        <p
          className={cn(
            "inline-flex rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold",
            entry.beta ? "bg-brand/10 text-brand-ink" : "bg-surface text-foreground ring-1 ring-border",
          )}
        >
          {entry.version}
        </p>
        <p className="mt-2 text-xs text-muted">{entry.period}</p>
      </div>

      <div
        className={cn(
          entry.beta && "rounded-3xl border border-brand/30 bg-brand/[0.03] p-6",
        )}
      >
        <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
          {entry.title}
        </h3>
        <p className="mt-2 max-w-[62ch] text-sm leading-6 text-muted">{entry.description}</p>

        {entry.checklist ? <Progress checklist={entry.checklist} /> : null}

        {entry.repos?.length ? (
          <ul aria-label="Repo liên quan" className="mt-4 flex flex-wrap gap-2">
            {entry.repos.map((repo) => (
              <li key={repo}>
                <a
                  href={`https://github.com/${githubUsername}/${repo}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full px-2.5 py-1 font-mono text-[11px] text-muted ring-1 ring-border-card transition-colors hover:text-brand-ink hover:ring-brand/40"
                >
                  {repo}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}

export function Changelog() {
  return (
    <Section id={changelogSection.id} labelled>
      <SectionHeader {...changelogSection} />
      <ol className="md:pl-[calc(7rem+2rem)]">
        {changelog.map((entry) => (
          <Release key={entry.version} entry={entry} />
        ))}
      </ol>
    </Section>
  );
}
