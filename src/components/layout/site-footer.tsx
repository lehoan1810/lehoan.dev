import { cacheLife } from "next/cache";
import { Logo } from "@/components/ui/logo";
import { Section } from "@/components/ui/section";
import { footerColumns, siteConfig } from "@/data/site";

/** Cached so the prerendered shell stays static (Cache Components). */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function SiteFooter() {
  return (
    <footer>
      <Section>
        <div className="grid grid-cols-1 gap-10 px-5 py-14 sm:grid-cols-[1.6fr_1fr_1fr] sm:px-10">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-muted">
              Frontend Developer, thích viết blog, làm YouTube và đang học tiếng Anh mỗi ngày.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-mono text-xs font-semibold tracking-widest text-muted uppercase">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href} className="text-sm">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-foreground transition-colors hover:text-brand-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="line-t px-5 py-6 text-xs text-muted sm:px-10">
          © <CurrentYear /> {siteConfig.author} · evondev
        </p>
      </Section>
    </footer>
  );
}
