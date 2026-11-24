import { cx } from "@/lib/cx";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "plain";
export type ButtonSize = "sm" | "md" | "icon" | "none";
export type ButtonStyleProps = { variant?: ButtonVariant; size?: ButtonSize };

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand text-brand-foreground hover:bg-brand-hover",
  secondary: "bg-background text-foreground ring-1 ring-border-card hover:bg-surface",
  ghost: "bg-transparent hover:bg-background-hover hover:text-foreground",
  plain: "bg-transparent",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5",
  md: "px-5 py-2.5",
  icon: "size-9 p-0",
  none: "",
};

/** Safe in Client Components: base, variant and size never conflict, so no merge is needed. */
export function buttonVariants({ variant = "primary", size = "md" }: ButtonStyleProps = {}) {
  return cx(base, variants[variant], sizes[size]);
}
