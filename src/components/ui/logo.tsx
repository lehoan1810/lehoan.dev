import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="evon.dev, về trang chủ"
      className="py-1.5 font-display text-lg font-semibold tracking-tight text-foreground"
    >
      evon<span className="text-muted">.dev</span>
    </Link>
  );
}
