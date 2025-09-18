// ThemedScrollbars.jsx — keep scrollbar colors in sync with theme
import { useEffect } from "react";

export default function ThemedScrollbars() {
  useEffect(() => {
    const root = document.documentElement;

    const applyFromTheme = () => {
      const themeEl = document.querySelector(".theme");
      if (!themeEl) return;
      const cs = getComputedStyle(themeEl);
      const s1 = cs.getPropertyValue("--surface-1").trim() || "#0B0F1A";

      // compute track/thumb from surface-1 using color-mix so it follows theme
      root.style.setProperty("--scroll-track", `color-mix(in srgb, ${s1} 85%, white 15%)`);
      root.style.setProperty("--scroll-thumb", `color-mix(in srgb, ${s1} 75%, white 25%)`);
      root.style.setProperty("--scroll-thumb-hover", `color-mix(in srgb, ${s1} 65%, white 35%)`);
      root.style.setProperty("--scroll-corner", `color-mix(in srgb, ${s1} 80%, white 20%)`);
    };

    // 1) apply immediately
    applyFromTheme();

    // 2) observe inline style changes on .theme (e.g., --c-primary updates)
    const themeEl = document.querySelector(".theme");
    let mo;
    if (themeEl) {
      mo = new MutationObserver(applyFromTheme);
      mo.observe(themeEl, { attributes: true, attributeFilter: ["style", "class"] });
    }

    // 3) also react to storage updates to ph.baseColor (if your picker writes there)
    const onStorage = (e) => { if (e.key === "ph.baseColor") applyFromTheme(); };
    window.addEventListener("storage", onStorage);

    // 4) as a fallback, re-apply on resize (some browsers recalc color-mix then)
    const onResize = () => applyFromTheme();
    window.addEventListener("resize", onResize);

    return () => {
      if (mo) mo.disconnect();
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
