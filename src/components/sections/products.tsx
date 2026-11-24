import { CircleCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { CodeWindow } from "@/components/ui/code-window";
import { MediaFrame, MediaImage } from "@/components/ui/media-frame";
import { Eyebrow, Section, SectionHeader } from "@/components/ui/section";
import { products, productsSection, productStatusLabel } from "@/data/products";
import { cn } from "@/lib/utils";
import type { Product, ProductStatus } from "@/types";
import { ProductTabs } from "./product-tabs";

const statusClass: Record<ProductStatus, string> = {
  new: "bg-brand text-brand-foreground ring-brand",
  free: "bg-brand/5 text-brand-ink ring-brand/30",
  live: "text-muted ring-border-card",
  soon: "text-muted ring-border-card",
  oss: "bg-brand/5 text-brand-ink ring-brand/30",
};

/** Tab label; selected styles come from the parent button's aria-selected state. */
function ProductTab({ product, index }: { product: Product; index: number }) {
  return (
    <>
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-0.5 group-aria-selected/tab:bg-brand lg:inset-y-0 lg:right-auto lg:left-0 lg:h-auto lg:w-0.5"
      />
      <span className="flex w-full items-start gap-3">
        <span className="pt-1 font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
        <span className="flex min-w-0 flex-1 flex-col items-start gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
          <span className="min-w-0 text-base font-medium text-muted group-aria-selected/tab:text-foreground">
            {product.name}
          </span>
          <span
            className={cn(
              "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ring-1",
              statusClass[product.status],
            )}
          >
            {productStatusLabel[product.status]}
          </span>
        </span>
      </span>
      <span className="hidden text-sm leading-relaxed font-normal text-muted lg:line-clamp-2">
        {product.tagline}
      </span>
    </>
  );
}

function ProductPanel({ product }: { product: Product }) {
  return (
    <>
      <Eyebrow>{product.kind}</Eyebrow>
      <h3 className="mt-3 font-display text-2xl font-semibold tracking-tighter text-balance text-foreground sm:text-3xl">
        {product.tagline}
      </h3>

      <MediaFrame aspectClassName="aspect-[2/1]" className="mt-8">
        <MediaImage
          media={{ ...product.image, position: product.image.position ?? "top" }}
          sizes="(max-width: 1024px) 92vw, 780px"
          zoomOnHover={false}
        />
      </MediaFrame>

      <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div className="min-w-0">
          <p className="max-w-[52ch] text-base leading-7 text-muted">{product.description}</p>
          <ul className="mt-5 space-y-2.5">
            {product.points.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-sm text-foreground">
                <CircleCheck aria-hidden className="size-[18px] shrink-0 text-brand" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          {product.command ? (
            <CodeWindow title={product.commandLabel ?? "Terminal"} copyText={product.command}>
              <span>{product.command}</span>
            </CodeWindow>
          ) : null}
          <ButtonLink href={product.cta.href} className="w-full sm:w-auto sm:self-start">
            {product.cta.label}
          </ButtonLink>
        </div>
      </div>
    </>
  );
}

export function Products() {
  return (
    <Section id={productsSection.id} labelled>
      <SectionHeader {...productsSection} />
      <ProductTabs
        label="Dự án"
        items={products.map((product, i) => ({
          id: product.id,
          tab: <ProductTab product={product} index={i} />,
          panel: <ProductPanel product={product} />,
        }))}
      />
    </Section>
  );
}
