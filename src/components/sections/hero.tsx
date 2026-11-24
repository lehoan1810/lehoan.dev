import { ArrowDownRight, MapPin } from "lucide-react";
import type { CSSProperties } from "react";
import { BrandIcon, brandPaths } from "@/components/icons";
import { BentoCard, CardLabel, LiveDot } from "@/components/ui/bento-card";
import { ButtonLink } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { LocalTime } from "@/components/ui/local-time";
import { hero, now } from "@/data/site";
import { motionTimings } from "@/lib/motion";
import { getGitHubData } from "@/lib/queries";
import { ContributionHeatmap, LanguageBar } from "./github-activity";

/** Entrance stagger for the secondary cards (the intro card holds the LCP and never animates). */
const rise = (step: number): CSSProperties => ({
  animationDelay: `${step * motionTimings.heroStaggerMs}ms`,
});
const riseClass = "motion-safe:animate-hero-rise";

export async function Hero() {
  const { profile, languages, contributions } = await getGitHubData();
  const stats = [
    { label: "Repo public", value: String(profile.publicRepos), animate: true },
    { label: "Followers", value: String(profile.followers), animate: true },
    // A year counting up from 0 reads oddly, so it stays static.
    { label: "Code từ", value: String(profile.createdYear), animate: false },
  ];

  return (
    <section aria-labelledby="hero-title" className="pt-6 pb-16 sm:pt-10 sm:pb-24">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {/* Intro */}
        <BentoCard className="flex min-h-[26rem] flex-col justify-between gap-10 p-7 sm:p-10 md:col-span-2 lg:col-span-3 lg:row-span-2">
          <div
            aria-hidden
            className="bg-dots absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
          />
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted ring-1 ring-border">
            <LiveDot />
            {now.status}
          </p>

          <div>
            <p className="font-mono text-sm text-muted">{hero.greeting}</p>
            <h1
              id="hero-title"
              className="mt-4 max-w-[18ch] font-display text-4xl leading-[1.05] font-semibold tracking-tighter text-balance text-foreground sm:text-6xl"
            >
              {hero.headline.lead}{" "}
              <span className="text-brand-display">{hero.headline.highlight}</span>
              <span
                aria-hidden
                className="ml-1 inline-block h-[0.85em] w-[0.08em] translate-y-[0.1em] bg-brand motion-safe:animate-caret"
              />
            </h1>
            <p className="mt-6 max-w-[56ch] text-base leading-7 text-muted">{hero.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#du-an">
                Xem dự án
                <ArrowDownRight aria-hidden className="size-4" />
              </ButtonLink>
              <ButtonLink href={profile.url} variant="secondary">
                <BrandIcon path={brandPaths.github} className="size-4" />
                GitHub
              </ButtonLink>
            </div>
          </div>
        </BentoCard>

        {/* Now */}
        <BentoCard className={`flex flex-col lg:row-span-2 ${riseClass}`} style={rise(1)}>
          <CardLabel>Now · {now.updatedAt}</CardLabel>
          <dl className="mt-6 flex flex-1 flex-col gap-6">
            {now.items.map((item) => (
              <div key={item.label} className="border-l-2 border-brand/40 pl-4">
                <dt className="text-xs font-medium text-faint">{item.label}</dt>
                <dd className="mt-1 text-sm leading-6 text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
        </BentoCard>

        {/* GitHub stats */}
        <BentoCard className={riseClass} style={rise(2)}>
          <CardLabel>GitHub</CardLabel>
          <dl className="mt-5 grid grid-cols-3 gap-3 md:grid-cols-1 md:gap-4 lg:grid-cols-1">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse md:flex-row md:items-baseline md:justify-between">
                <dt className="text-xs text-muted">{stat.label}</dt>
                <dd className="font-display text-2xl font-semibold tracking-tight text-foreground">
                  {stat.animate ? <CountUp value={stat.value} /> : stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </BentoCard>

        {/* Activity / languages */}
        <BentoCard className={`flex flex-col md:col-span-2 ${riseClass}`} style={rise(3)}>
          <CardLabel className="mb-5">
            {contributions ? "Hoạt động trên GitHub" : "Ngôn ngữ trong các repo"}
          </CardLabel>
          {contributions ? (
            <ContributionHeatmap calendar={contributions} />
          ) : (
            <LanguageBar languages={languages} />
          )}
          <p className="mt-auto pt-6 font-mono text-[11px] text-faint">
            Lấy từ GitHub API · cache 1 giờ ·{" "}
            <a href={profile.url} target="_blank" rel="noreferrer" className="underline-offset-2 hover:text-brand-ink hover:underline">
              {profile.url.replace("https://", "")}
            </a>
          </p>
        </BentoCard>

        {/* Bio */}
        <BentoCard className={`flex flex-col justify-between gap-6 md:col-span-2 lg:col-span-1 ${riseClass}`} style={rise(4)}>
          <blockquote className="text-sm leading-6 text-foreground">“{profile.bio}”</blockquote>
          <div className="flex items-center justify-between gap-3 font-mono text-[11px] text-muted">
            <span className="flex items-center gap-1.5 truncate">
              <MapPin aria-hidden className="size-3.5 shrink-0" />
              {profile.location}
            </span>
            <span className="shrink-0">
              VN <LocalTime />
            </span>
          </div>
        </BentoCard>
      </div>
    </section>
  );
}
