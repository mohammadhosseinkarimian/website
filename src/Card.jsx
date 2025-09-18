// Card.jsx — reusable playing card (Spades face), theme-aware luxe styling
import React from "react";
import SpadeIconLux from "./SpadeIconLux";
import { GiCrown, GiQueenCrown, GiCrossedSwords } from "react-icons/gi";

/* ===== theme tints (tone-on-tone, adapt to --c-primary) ===== */
const toneHi = (p = 10) =>
  `color-mix(in srgb, var(--c-primary) 70%, white ${p}%)`; // gentle highlight
const toneLo = (p = 82) =>
  `color-mix(in srgb, var(--c-primary) 35%, black ${p}%)`;  // deep engraving
const foil = () =>
  `color-mix(in srgb, ${toneHi(14)} 70%, ${toneLo(72)} 30%)`;

/* ===== corner marks (top-left normal, bottom-right reversed) ===== */
function CornerMark({ rank, bottomRight = false }) {
  const pos = bottomRight
    ? { inset: "auto 10px 10px auto", transform: "rotate(180deg)" }
    : { inset: "10px auto auto 10px", transform: "none" };

  return (
    <div
      style={{
        position: "absolute",
        ...pos,
        display: "grid",
        justifyItems: "center",
        alignItems: "center",
        gap: 6,
        lineHeight: 1,
        mixBlendMode: "screen",
        color: toneHi(12),
      }}
    >
      <div
        style={{
          fontFamily: "ui-serif,'Times New Roman',Georgia,serif",
          fontWeight: 800,
          letterSpacing: ".6px",
          fontSize: "clamp(16px, 2.8vw, 22px)",
          textShadow: `0 0 1px ${toneHi(18)}`,
        }}
      >
        {rank}
      </div>
      <div style={{ width: "clamp(20px, 3vw, 28px)", height: "clamp(24px, 3.6vw, 34px)" }}>
        <SpadeIconLux />
      </div>
    </div>
  );
}

/* ===== pip for 10♠ layout ===== */
const Pip = ({ x, y, size = 20, invert = false }) => (
  <div
    style={{
      position: "absolute",
      left: `${x}%`,
      top: `${y}%`,
      width: `${size}%`,
      height: `${size * 1.15}%`,
      transform: `translate(-50%, -50%) rotate(${invert ? 180 : 0}deg)`,
      mixBlendMode: "screen",
    }}
    aria-hidden
  >
    <SpadeIconLux />
  </div>
);

/* ===== royal emblem via react-icons ===== */
function RoyalEmblem({ letter }) {
  const iconProps = { size: "100%", style: { display: "block" } };
  return (
    <div
      style={{
        position: "absolute",
        inset: "12% 12% 26% 12%",
        display: "grid",
        justifyItems: "center",
        alignContent: "start",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "clamp(56px, 16vw, 120px)",
          aspectRatio: "1",
          display: "grid",
          placeItems: "center",
          color: toneHi(16),
          mixBlendMode: "screen",
          filter: "drop-shadow(0 6px 18px rgba(255,255,255,.08))",
        }}
        aria-hidden
      >
        {letter === "K" && <GiCrown {...iconProps} />}
        {letter === "Q" && <GiQueenCrown {...iconProps} />}
        {letter === "J" && <GiCrossedSwords {...iconProps} />}
      </div>

      {/* raised monogram */}
      <div
        style={{
          transform: "translateY(-10%)",
          fontFamily: "ui-serif,'Times New Roman',Georgia,serif",
          fontWeight: 900,
          fontSize: "clamp(34px, 5.2vw, 46px)",
          letterSpacing: "2px",
          color: toneHi(18),
          textShadow: `0 0 10px ${toneHi(24)}`,
          lineHeight: 1,
          mixBlendMode: "screen",
        }}
      >
        {letter}
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
        background: `linear-gradient(180deg, ${toneHi(3)}, transparent 70%)`,
        border: `1px solid ${toneHi(6)}`,
        boxShadow: `0 1px 0 ${toneHi(10)} inset`,
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

/* ===== PUBLIC: Card (Spades) ===== */
export default function Card({ rank = "A", title, caption, fill = false }) {
  const R = rank === "10" ? "10" : rank;

  const wrapperStyle = fill
    ? { position: "relative", width: "100%", height: "100%", borderRadius: "1rem" }
    : { position: "relative", width: "var(--cardW, 280px)", aspectRatio: "5/7", borderRadius: "1rem" };

  return (
    <div className="deck-card" style={wrapperStyle}>
      <div style={{ position: "absolute", inset: 8 }}>
        {/* corners */}
        <CornerMark rank={R} />
        <CornerMark rank={R} bottomRight />

        {/* center art */}
        {R === "A" && (
          <div style={{ position: "absolute", inset: "10% 10% 18% 10%", display: "grid", placeItems: "center" }}>
            <div style={{ width: "66%", maxWidth: 260, mixBlendMode: "screen" }}>
              <SpadeIconLux />
            </div>
            <div
              style={{
                position: "absolute",
                inset: "18% 18%",
                borderRadius: 18,
                border: `1px dashed ${toneHi(10)}`,
                opacity: 0.45,
              }}
            />
          </div>
        )}

        {(R === "K" || R === "Q" || R === "J") && <RoyalEmblem letter={R} />}

        {R === "10" && (
          <>
            {[10, 27.5, 45, 62.5, 80].map((y, i) => (
              <Pip key={"L" + i} x={28} y={y} size={18} invert={y > 50} />
            ))}
            {[10, 27.5, 45, 62.5, 80].map((y, i) => (
              <Pip key={"R" + i} x={72} y={y} size={18} invert={y > 50} />
            ))}
          </>
        )}

        <TitlePlaque title={title} caption={caption} />
      </div>
    </div>
  );
}
