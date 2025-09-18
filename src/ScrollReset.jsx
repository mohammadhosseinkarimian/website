// ScrollReset.jsx — unlock body scroll + scroll to top on every route change
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollReset() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Unlock any leftover deck overlay locks
    document.documentElement.classList.remove("deck-lock");
    document.body.classList.remove("deck-lock");
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    // Remove any lingering overlay DOM from deck animation
    document.querySelectorAll(".deck-portal, .deck-scrim, .route-veil, .burn-veil").forEach(el => el.remove());
    // Jump to top for a clean start
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
