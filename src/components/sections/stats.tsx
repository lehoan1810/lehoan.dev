import { CountUp } from "@/components/ui/count-up";
import { Eyebrow, Section } from "@/components/ui/section";
import { getStats } from "@/lib/queries";

/** Async Server Component: numbers come from a "use cache" query baked into the static shell. */
export async function Stats() {
  const stats = await getStats();

  return (
    <Section>
      <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center bg-background px-5 py-6 sm:px-10">
          <Eyebrow>Đang theo dõi evondev</Eyebrow>
        </div>
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            target="_blank"
            rel="noreferrer"
            className="group bg-background px-5 py-6 transition-colors hover:bg-surface sm:px-10"
          >
            <p className="text-4xl font-semibold tracking-tighter">
              <span className="text-brand-display">
                <CountUp value={stat.value} />
              </span>
            </p>
            <p className="mt-1 text-sm text-foreground">{stat.label}</p>
            <p className="mt-0.5 font-mono text-xs text-muted transition-colors group-hover:text-foreground">
              {stat.handle}
            </p>
          </a>
        ))}
      </div>
    </Section>
  );
}
