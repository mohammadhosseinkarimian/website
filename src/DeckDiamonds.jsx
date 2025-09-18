// DeckDiamonds.jsx — fan deck (Diamonds)
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardDiamond from "./CardDiamond";

const OPEN_MS = 1400;
const CLOSE_MS = 900;
const LOADER_MS = 1000;

function useDeckLayout() {
  const calc = (w) => {
    if (w < 420) return { 
  spreadDeg: 18, 
  spreadScale: 0.4,           // was 0.55
  deckH: "min(44vh, 360px)",   // was min(64vh,520px)
  cardW: "min(56vw, 210px)"    // was min(82vw,340px)
};
if (w < 640) return { 
  spreadDeg: 24, 
  spreadScale: 0.6,           // was 0.85
  deckH: "min(50vh, 440px)",   // was min(64vh,540px)
  cardW: "min(50vw, 260px)"    // was min(68vw,340px)
};
if (w < 900) return { spreadDeg: 36, spreadScale: 1.2,  deckH: "clamp(300px,56vw,520px)", cardW: "clamp(220px,28vw,300px)" };
    return              { spreadDeg: 46, spreadScale: 1.65, deckH: "clamp(320px,42vw,460px)", cardW: "clamp(230px,24vw,320px)" };
  };
  const [cfg, setCfg] = useState(calc(typeof window !== "undefined" ? window.innerWidth : 1200));
  useEffect(() => {
    const onR = () => setCfg(calc(window.innerWidth));
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);
  return cfg;
}

function ensureRouteVeil() {
  let veil = document.querySelector(".route-veil");
  if (!veil) {
    veil = document.createElement("div");
    veil.className = "route-veil";
    veil.innerHTML = `
      <div class="veil-bg"></div>
      <div class="veil-center">
        <div class="loader-aura"></div>
        <div class="loader-track"><div class="loader-fill"></div></div>
        <div class="loader-sparks"><span></span><span></span><span></span></div>
      </div>`;
    document.body.appendChild(veil);
  }
  return veil;
}

const diamondFive = [
  { rank: "A",  title: "VR",     caption: "Game developer" },
  { rank: "K",  title: "Clash Crusader",caption: "Game developer" },
  { rank: "Q",  title: "Basic Games",      caption: "Game Developer" },
  { rank: "J",  title: "Publications",   caption: "Author" }
];

export default function DeckDiamonds({ items = diamondFive, routeForItem = () => "/software" }) {
  const navigate = useNavigate();
  const layout = useDeckLayout();

  const deckRef   = useRef(null);
  const portalRef = useRef(null);
  const ghostRef  = useRef(null);

  const [active, setActive]   = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const deck = deckRef.current; if (!deck) return;
    const slots = Array.from(deck.querySelectorAll(".deck-card-slot"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("in", e.isIntersecting)),
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" }
    );
    slots.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeExpanded();
    if (active) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const getNavH = () => {
    const v = getComputedStyle(document.documentElement).getPropertyValue("--nav-h").trim();
    const px = parseInt(v || "0", 10);
    return Number.isFinite(px) && px > 0 ? px : 64;
  };

  function openExpanded(index, slotEl) {
    const item   = items[index];
    const cardEl = slotEl.querySelector(".deck-card");
    const rect   = cardEl.getBoundingClientRect();
    const angle  = parseFloat(slotEl.style.getPropertyValue("--angle")) || 0;

    setActive({ index, item });

    requestAnimationFrame(() => {
      const ghost  = ghostRef.current;
      const portal = portalRef.current;
      if (!ghost || !portal) return;

      document.documentElement.classList.add("deck-lock");
      portal.classList.add("show");
      setLoading(false);

      ghost.style.transformOrigin = "50% 50%";
      ghost.classList.remove("transparent","full","closing","fade-away");
      ghost.style.width  = rect.width + "px";
      ghost.style.height = rect.height + "px";
      ghost.style.transform = `translate(${rect.left}px, ${rect.top}px) rotate(${angle}deg) scale(1)`;

      const navH = getNavH();
      const vw   = window.innerWidth;
      const vh   = window.innerHeight - navH;
      const targetCx = vw / 2, targetCy = navH + vh / 2;
      const cardCx   = rect.left + rect.width / 2, cardCy = rect.top + rect.height / 2;
      const dx = targetCx - cardCx, dy = targetCy - cardCy;
      const s  = Math.max(vw / rect.width, vh / rect.height);

      requestAnimationFrame(() => {
        ghost.style.transition =
          `transform ${OPEN_MS}ms cubic-bezier(.22,1,.22,1), border-radius ${OPEN_MS}ms ease, box-shadow ${Math.round(OPEN_MS*0.64)}ms ease}`;
        ghost.style.borderRadius = "0.5rem";
        ghost.style.transform = `translate(${rect.left + dx}px, ${rect.top + dy}px) rotate(0deg) scale(${s})`;

        let finished = false;
        const finish = () => {
          if (finished) return; finished = true;

          ghost.classList.add("full","transparent");
          ghost.style.transition = "none";
          ghost.style.width = ""; ghost.style.height = ""; ghost.style.transform = "none";

          const scrim = portal.querySelector(".deck-scrim");
          try {
            const cvs = document.querySelector("canvas");
            if (scrim && cvs && cvs.width > 0 && cvs.height > 0) {
              const url = cvs.toDataURL("image/png");
              scrim.style.setProperty("--snap", `url(${url})`);
              scrim.classList.add("snap");
            }
          } catch {}

          ghost.classList.add("fade-away");
          setLoading(true);

          setTimeout(() => {
            const veil = ensureRouteVeil(); veil.classList.add("in");
            const path = routeForItem(item) || "/software";
            try { navigate(path, { state: { fromDeck: true, item } }); }
            catch { window.location.assign(path); }
          }, LOADER_MS);
        };

        ghost.addEventListener("transitionend", finish, { once: true });
        setTimeout(finish, OPEN_MS + 120);
      });
    });
  }

  function closeExpanded() {
    if (!active) return;
    const portal = portalRef.current, ghost = ghostRef.current, deck = deckRef.current;
    if (!portal || !ghost || !deck) return;

    const slot  = deck.querySelectorAll(".deck-card-slot")[active.index];
    if (!slot) return cleanup();

    const tCard = slot.querySelector(".deck-card");
    const tRect = tCard.getBoundingClientRect();
    const angle = parseFloat(slot.style.getPropertyValue("--angle")) || 0;

    ghost.classList.add("closing");
    const gRect = ghost.getBoundingClientRect();
    ghost.classList.remove("full","transparent","fade-away");
    ghost.style.width  = gRect.width + "px";
    ghost.style.height = gRect.height + "px";
    ghost.style.transform = `translate(${gRect.left}px, ${gRect.top}px) rotate(0deg) scale(1)`;

    requestAnimationFrame(() => {
      ghost.style.transition =
        `transform ${CLOSE_MS}ms cubic-bezier(.22,1,.22,1), border-radius ${CLOSE_MS}ms ease, box-shadow ${Math.round(CLOSE_MS*0.66)}ms ease`;
      ghost.style.borderRadius = "1rem";
      ghost.style.transform = `translate(${tRect.left}px, ${tRect.top}px) rotate(${angle}deg) scale(1)`;
      ghost.addEventListener("transitionend", cleanup, { once: true });
      setTimeout(cleanup, CLOSE_MS + 200);
    });

    function cleanup() {
      portal.classList.remove("show");
      setActive(null); setLoading(false);
      document.documentElement.classList.remove("deck-lock");
      const scrim = portal.querySelector(".deck-scrim");
      if (scrim) { scrim.classList.remove("snap"); scrim.style.removeProperty("--snap"); }
    }
  }

  const n = items.length - 1;

  return (
    <div className="deck-wrap theme">
      <div
        ref={deckRef}
        className="deck"
        role="list"
        aria-label="diamonds fan deck"
        style={{ "--deckH": layout.deckH, "--cardW": layout.cardW }}
      >
        {items.map((it, i) => {
          const angle = n > 0 ? (i - n / 2) * (layout.spreadDeg / n) : 0;
          const baseShift = n > 0 ? -50 + (i * (100 / n)) : 0;
          const shiftPct  = baseShift * layout.spreadScale;

          return (
            <article
              key={it.id ?? it.rank ?? i}
              role="listitem"
              className="deck-card-slot"
              style={{
                "--angle": `${angle}deg`,
                "--shift": `${shiftPct}%`,
                "--delay": `${i * 90}ms`,
                "--z": 10 + i,
              }}
              onClick={(e) => openExpanded(i, e.currentTarget)}
              title={`${it.rank} of Diamonds — ${it.title}`}
            >
              <CardDiamond rank={it.rank} title={it.title} caption={it.caption} />
            </article>
          );
        })}
      </div>

      {active && (
        <div ref={portalRef} className="deck-portal show" onClick={closeExpanded}>
          <div className="deck-scrim" />
          <div className="deck-ghost" ref={ghostRef} onClick={(e) => e.stopPropagation()}>
            <CardDiamond fill rank={active.item.rank} title={active.item.title} caption={active.item.caption} />
          </div>

          {loading && (
            <div className="route-loader" aria-hidden="true">
              <div className="loader-aura" />
              <div className="loader-track"><div className="loader-fill" /></div>
              <div className="loader-sparks"><span /><span /><span /></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
