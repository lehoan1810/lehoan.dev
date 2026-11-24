/**
 * Server-side buttons: `className` is merged with `cn()` so callers can override variants.
 * Client Components should use `buttonVariants` from "./button-variants" instead.
 */
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonStyleProps as StyleProps } from "./button-variants";

export { buttonVariants };

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

type ButtonLinkProps = StyleProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    /** Opens in a new tab with safe rel attributes. Defaults to true for http(s) links. */
    external?: boolean;
  };

export function ButtonLink({ variant, size, className, external, href, ...props }: ButtonLinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      {...props}
    />
  );
}
