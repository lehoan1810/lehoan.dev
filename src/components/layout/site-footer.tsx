import { cacheLife } from "next/cache";
import { BrandIcon, brandPaths } from "@/components/icons";
import { Logo } from "@/components/ui/logo";
import { siteConfig, socials } from "@/data/site";

/** Cached so the prerendered shell stays static (Cache Components). */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-muted">{siteConfig.shortDescription}</p>
        </div>
        <div className="flex flex-col gap-2 text-xs text-muted sm:items-end">
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono transition-colors hover:text-foreground"
          >
            <BrandIcon path={brandPaths.github} className="size-3.5" />
            github.com/{siteConfig.alternateName}
          </a>
          <p>
            © <CurrentYear /> {siteConfig.author} · Built with Next.js 16 &amp; Tailwind CSS v4
          </p>
        </div>
      </div>
    </footer>
  );
}
