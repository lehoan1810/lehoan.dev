import { motionTimings } from "./motion";
import { THEME_STORAGE_KEY } from "./theme";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  // Disable CSS transitions for one frame so colors swap instantly.
  const style = document.createElement("style");
  style.textContent = "*,*::before,*::after{transition:none!important}";
  document.head.appendChild(style);

  if (theme === "dark") root.dataset.theme = "dark";
  else delete root.dataset.theme;

  void window.getComputedStyle(document.body).backgroundColor;
  requestAnimationFrame(() => style.remove());

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // storage unavailable — theme still applies for this visit
  }
}

/**
 * Toggles light/dark. Where View Transitions are supported (and motion is allowed),
 * the new theme is revealed as a circle growing from `origin` (e.g. the toggle button).
 */
export function toggleTheme(origin?: { x: number; y: number }) {
  const root = document.documentElement;
  const next: Theme = root.dataset.theme === "dark" ? "light" : "dark";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!document.startViewTransition || reduceMotion) {
    applyTheme(next);
    return;
  }

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? 0;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  const transition = document.startViewTransition(() => applyTheme(next));
  transition.ready
    .then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: motionTimings.themeRevealMs,
          easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {
      // transition skipped (e.g. tab hidden) — the theme is already applied
    });
}
