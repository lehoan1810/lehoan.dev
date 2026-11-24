"use client";

import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cx } from "@/lib/cx";
import { toggleTheme } from "@/lib/theme-client";

/** `children` are the (server-rendered) sun/moon icons, swapped purely with CSS. */
export function ThemeToggle({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      aria-label="Đổi giao diện sáng / tối"
      title="Đổi giao diện sáng / tối"
      className={cx(buttonVariants({ variant: "ghost", size: "icon" }), "text-foreground")}
    >
      {children}
    </button>
  );
}
