import type { ContributionCalendar, LanguageShare } from "@/lib/queries";
import { cn } from "@/lib/utils";

const levelClass = [
  "bg-foreground/[0.06]",
  "bg-brand/25",
  "bg-brand/50",
  "bg-brand/75",
  "bg-brand",
];

/**
 * GitHub-style contribution grid (weeks × weekdays). Newest weeks are on the right;
 * on narrow cards the oldest columns are simply clipped instead of scrolling.
 */
export function ContributionHeatmap({ calendar }: { calendar: ContributionCalendar }) {
  return (
    <figure className="flex flex-col gap-4">
      <div aria-hidden className="flex justify-end overflow-hidden">
        <div className="grid shrink-0 auto-cols-[10px] grid-flow-col grid-rows-7 gap-[3px]">
          {calendar.weeks.flatMap((days, week) =>
            days.map((level, day) => (
              <span
                key={`${week}-${day}`}
                className={cn("size-[10px] rounded-[2px]", levelClass[level])}
                style={week === 0 ? { gridRowStart: 8 - days.length + day } : undefined}
              />
            )),
          )}
        </div>
      </div>
      <figcaption className="flex items-center justify-between gap-4 text-xs text-muted">
        <span>
          <strong className="font-semibold text-foreground tabular-nums">
            {calendar.total.toLocaleString("vi-VN")}
          </strong>{" "}
          đóng góp trong 12 tháng qua
        </span>
        <span aria-hidden className="flex items-center gap-1 font-mono text-[10px] text-faint">
          ít
          {levelClass.map((cls) => (
            <span key={cls} className={cn("size-[10px] rounded-[2px]", cls)} />
          ))}
          nhiều
        </span>
      </figcaption>
    </figure>
  );
}

/** Stacked bar + legend of the primary language across public repos. */
export function LanguageBar({ languages }: { languages: LanguageShare[] }) {
  return (
    <figure className="flex flex-col gap-4">
      <div aria-hidden className="flex h-2.5 overflow-hidden rounded-full bg-foreground/[0.06]">
        {languages.map((lang) => (
          <span
            key={lang.name}
            className="h-full not-last:border-r-2 not-last:border-background"
            style={{ width: `${lang.percent}%`, backgroundColor: lang.color }}
          />
        ))}
      </div>
      <figcaption>
        <span className="sr-only">Tỉ lệ ngôn ngữ chính trong các repo public: </span>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
          {languages.map((lang) => (
            <li key={lang.name} className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="size-2 rounded-full"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-foreground">{lang.name}</span>
              <span className="tabular-nums">{Math.round(lang.percent)}%</span>
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
