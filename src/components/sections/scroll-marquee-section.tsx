import { Section } from "@/components/ui/section";
import { ScrollMarqueeRows } from "./scroll-marquee";

/** Server wrapper: only the animated rows ship as client code. */
export function ScrollMarquee({ rows }: { rows: string[] }) {
  return (
    <Section>
      <ScrollMarqueeRows rows={rows} />
    </Section>
  );
}
