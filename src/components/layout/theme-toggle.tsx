"use client";

import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cx } from "@/lib/cx";
import { THEME_STORAGE_KEY } from "@/lib/theme";

/** `children` are the (server-rendered) sun/moon icons, swapped purely with CSS. */
export function ThemeToggle({ children }: { children: ReactNode }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";

    // Disable transitions for one frame so colors swap instantly.
    const style = document.createElement("style");
    style.textContent = "*,*::before,*::after{transition:none!important}";
    document.head.appendChild(style);

    if (next === "dark") root.dataset.theme = "dark";
    else delete root.dataset.theme;

    void window.getComputedStyle(document.body).backgroundColor;
    requestAnimationFrame(() => style.remove());

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // storage unavailable — theme still applies for this visit
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Đổi giao diện sáng / tối"
      title="Đổi giao diện sáng / tối"
      className={cx(buttonVariants({ variant: "ghost", size: "icon" }), "text-foreground")}
    >
      {children}
    </button>
  );
}
