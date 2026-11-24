import Link from "next/link";
import { siteConfig } from "@/data/site";
import { splitDomain } from "@/lib/utils";

export function Logo() {
  const [brand, tld] = splitDomain(siteConfig.name);
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name}, về trang chủ`}
      className="py-1.5 font-display text-lg font-semibold tracking-tight text-foreground"
    >
      {brand}
      <span className="text-muted">{tld}</span>
    </Link>
  );
}
