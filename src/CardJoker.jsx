// CardJoker.jsx — Joker card (education), vertical "JOKER" rails and jester hat emblem
import React from "react";
import { GiJesterHat } from "react-icons/gi";

/* ===== theme tints ===== */
const toneHi = (p = 12) =>
  `color-mix(in srgb, var(--c-primary) 72%, white ${p}%)`;
const toneLo = (p = 80) =>
  `color-mix(in srgb, var(--c-primary) 34%, black ${p}%)`;

/* ===== vertical rails that spell J O K E R ===== */
function JokerRail({ bottomRight = false }) {
  const pos = bottomRight
    ? { inset: "auto 8px 8px auto", transform: "rotate(180deg)" }
    : { inset: "8px auto auto 8px", transform: "none" };

  const letterStyle = {
    fontFamily: "ui-serif,'Times New Roman',Georgia,serif",
    fontWeight: 900,
    letterSpacing: "1px",
    fontSize: "clamp(14px, 2.4vw, 18px)",
    lineHeight: 1.1,
    color: toneHi(16),
    textShadow: `0 0 8px ${toneHi(24)}`,
  };

  return (
    <div
      style={{
        position: "absolute",
        ...pos,
        display: "grid",
        gridAutoFlow: "row",
        gap: 2,
        alignItems: "start",
        justifyItems: "center",
        padding: "4px 6px",
        borderRadius: 8,
        mixBlendMode: "screen",
      }}
      aria-label="JOKER rail"
    >
      {["J","O","K","E","R"].map((ch, i) => (
        <div key={i} style={letterStyle}>{ch}</div>
      ))}
    </div>
  );
}

/* ===== center emblem (jester hat) ===== */
function JokerEmblem() {
  const iconProps = { size: "100%", style: { display: "block" } };
  return (
    <div
      style={{
        position: "absolute",
        inset: "12% 12% 26% 12%",
        display: "grid",
        justifyItems: "center",
        alignContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "clamp(72px, 20vw, 140px)",
          aspectRatio: "1",
          display: "grid",
          placeItems: "center",
          color: toneHi(18),
          mixBlendMode: "screen",
        }}
        aria-hidden
      >
        <GiJesterHat {...iconProps} />
      </div>
    </div>
  );
}

/* ===== title plaque ===== */
function TitlePlaque({ title, caption }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "10%",
        right: "10%",
        bottom: "10%",
        borderRadius: 14,
        padding: "12px 16px",
        background: `linear-gradient(180deg, ${toneHi(4)}, transparent 70%)`,
        border: `1px solid ${toneHi(8)}`,
        boxShadow: `0 1px 0 ${toneHi(12)} inset`,
        backdropFilter: "blur(1.5px)",
        color: "#fff",
      }}
    >
      <div
        style={{
          fontFamily:
            "ui-sans-serif,system-ui,Inter,Roboto,'Helvetica Neue'",
          fontWeight: 800,
          letterSpacing: ".6px",
          fontSize: "clamp(14px, 2.4vw, 20px)",
          lineHeight: 1.15,
          textShadow: "0 1px 8px rgba(0,0,0,.24)",
        }}
      >
        {title}
      </div>
      {caption && (
        <div
          style={{
            marginTop: 6,
            color: "rgba(255,255,255,.92)",
            fontSize: "clamp(12px, 2vw, 14px)",
            lineHeight: 1.45,
            textShadow: "0 1px 6px rgba(0,0,0,.2)",
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}

/* ===== PUBLIC: CardJoker ===== */
export default function CardJoker({ title, caption, fill = false }) {
  const wrapperStyle = fill
    ? { position: "relative", width: "100%", height: "100%", borderRadius: "1rem" }
    : { position: "relative", width: "var(--cardW, 280px)", aspectRatio: "5/7", borderRadius: "1rem" };

  return (
    <div className="deck-card" style={wrapperStyle}>
      <div style={{ position: "absolute", inset: 8 }}>
        {/* rails */}
        <JokerRail />
        <JokerRail bottomRight />

        {/* emblem */}
        <JokerEmblem />

        <TitlePlaque title={title} caption={caption} />
      </div>
    </div>
  );
}
