import Link from "next/link";
import { siteConfig } from "@/data/site";

export function Logo() {
  const [name, tld] = siteConfig.name.split(".");
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name}, về trang chủ`}
      className="group flex items-center gap-2 py-1.5 font-display text-lg font-semibold tracking-tight text-foreground"
    >
      <span
        aria-hidden
        className="grid size-7 place-items-center rounded-lg bg-brand text-sm font-semibold text-brand-foreground transition-transform group-hover:-rotate-6"
      >
        h
      </span>
      <span>
        {name}
        {tld ? <span className="text-muted">.{tld}</span> : null}
      </span>
    </Link>
  );
}
