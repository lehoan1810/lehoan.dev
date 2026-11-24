import { ArrowUpRight, Download, Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { MediaFrame, MediaImage } from "@/components/ui/media-frame";
import { Eyebrow, Section, SectionHeader } from "@/components/ui/section";
import { Spotlight } from "@/components/ui/spotlight";
import { vscodeSection } from "@/data/vscode";
import { getVSCodeData } from "@/lib/queries";
import type { VSCodeItem } from "@/types";

function VSCodeCard({ item }: { item: VSCodeItem }) {
  return (
    <Spotlight className="bg-background">
      <article className="flex h-full flex-col p-5 sm:p-10">
        <MediaFrame aspectClassName="aspect-[2/1]">
          <MediaImage
            media={{ ...item.image, position: "top" }}
            sizes="(max-width: 768px) 90vw, 560px"
            zoomOnHover={false}
          />
        </MediaFrame>
        <Eyebrow className="mt-6">{item.type}</Eyebrow>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{item.name}</h3>
        <p className="mt-3 max-w-[52ch] text-base leading-7 text-muted">{item.description}</p>

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-4 pt-6">
          <p className="inline-flex items-center gap-2 text-sm text-foreground">
            <Download aria-hidden className="size-4 text-muted" />
            <span className="font-semibold">{item.installs}</span> lượt cài
          </p>
          <p className="inline-flex items-center gap-2 text-sm text-foreground">
            <Star aria-hidden className="size-4 fill-brand text-brand" />
            <span className="font-semibold">{item.rating}</span>
          </p>
          <ButtonLink href={item.href} variant="secondary" className="sm:ml-auto">
            Xem trên Marketplace
            <ArrowUpRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </article>
    </Spotlight>
  );
}

export async function VSCode() {
  const { items, footnote } = await getVSCodeData();

  return (
    <Section id={vscodeSection.id} labelled>
      <SectionHeader {...vscodeSection} />
      <div className="line-t grid grid-cols-1 gap-px bg-border md:grid-cols-2">
        {items.map((item) => (
          <VSCodeCard key={item.name} item={item} />
        ))}
      </div>
      <p className="line-t px-5 py-4 font-mono text-xs text-faint sm:px-10">
        {footnote}
      </p>
    </Section>
  );
}
