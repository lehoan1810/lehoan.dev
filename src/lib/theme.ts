export const THEME_STORAGE_KEY = "evondev-theme";

/**
 * Runs in <head> before first paint so a saved dark theme doesn't flash light.
 * Must stay a plain string (no imports) — it executes before React hydrates.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="dark")document.documentElement.dataset.theme="dark";}catch(e){}})();`;
