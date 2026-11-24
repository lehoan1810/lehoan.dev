import { Moon, Sun } from "lucide-react";
import { BrandIcon, brandPaths } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { mainNav, socials } from "@/data/site";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[85rem] items-center justify-between gap-6 px-5 sm:px-20">
        <Logo />

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-7 lg:flex">
          {mainNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle>
            <Moon aria-hidden className="size-[18px] dark:hidden" />
            <Sun aria-hidden className="hidden size-[18px] dark:block" />
          </ThemeToggle>
          <ButtonLink href={socials.github} size="sm">
            <BrandIcon path={brandPaths.github} className="size-4" />
            GitHub
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
