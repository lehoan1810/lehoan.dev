import { Moon, Search, Sun } from "lucide-react";
import { BrandIcon, brandPaths } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { commandItems, mainNav, socials } from "@/data/site";
import { CommandMenuTrigger } from "./command-menu-trigger";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-6 lg:flex">
          {mainNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <CommandMenuTrigger items={commandItems} className="size-9 justify-center sm:w-auto sm:py-1.5 sm:pr-1.5 sm:pl-3">
            <Search aria-hidden className="size-4" />
            <span className="sr-only sm:not-sr-only">Tìm nhanh</span>
            <kbd className="hidden rounded-full bg-surface px-2 py-0.5 font-mono text-[10px] text-faint ring-1 ring-border sm:inline">
              ⌘K
            </kbd>
          </CommandMenuTrigger>
          <ThemeToggle>
            <Moon aria-hidden className="size-[18px] dark:hidden" />
            <Sun aria-hidden className="hidden size-[18px] dark:block" />
          </ThemeToggle>
          <ButtonLink href={socials.github} size="sm" className="hidden sm:inline-flex">
            <BrandIcon path={brandPaths.github} className="size-3.5" />
            GitHub
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
