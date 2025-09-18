// DeckHeading.jsx — ornate title header with big wing + flourish (no full frame)
import React from "react";

/** Wing + flourish composite ornament */
function FlourishWing({ mirrored=false }) {
  const t = mirrored ? "scale(-1,1) translate(-240,0)" : "";
  return (
    <svg
      viewBox="0 0 240 64"
      className="ornament-svg"
      aria-hidden
      style={{ transform: mirrored ? "scaleX(-1)" : "none" }}
    >
      <defs>
        <linearGradient id="wingGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity=".95"/>
          <stop offset="100%" stopColor="currentColor" stopOpacity=".55"/>
        </linearGradient>
      </defs>
      <g transform={t} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* main wing (stylized) */}
        <path d="M20 44 C 50 10, 100 6, 150 18
                 C 125 22, 102 28, 82 38
                 C 116 22, 154 24, 188 34"
              stroke="url(#wingGrad)" strokeWidth="3.2"/>
        {/* small feathers */}
        <path d="M54 38 C 62 26, 84 22, 96 24" stroke="currentColor" strokeOpacity=".85" strokeWidth="2.4"/>
        <path d="M44 40 C 52 28, 70 24, 80 26" stroke="currentColor" strokeOpacity=".75" strokeWidth="2.2"/>
        <path d="M34 42 C 42 32, 58 28, 68 30" stroke="currentColor" strokeOpacity=".65" strokeWidth="2.0"/>

        {/* flourish vine inspired by provided image */}
        <path d="M140 42 C 156 40, 170 38, 188 42
                 C 204 46, 212 52, 220 58"
              stroke="currentColor" strokeWidth="2.2"/>
        <path d="M162 40 C 168 34, 176 30, 188 30" stroke="currentColor" strokeWidth="2"/>
        <path d="M176 48 C 182 44, 188 42, 196 42" stroke="currentColor" strokeWidth="2"/>
        {/* little heart leaves */}
        <path d="M168 48
                 c 2 -4, 8 -4, 10 0
                 c -3 4, -7 6, -10 0 z"
              fill="currentColor" opacity=".9"/>
        <path d="M198 52
                 c 2 -4, 8 -4, 10 0
                 c -3 4, -7 6, -10 0 z"
              fill="currentColor" opacity=".9"/>
        <path d="M152 46
                 c 2 -4, 8 -4, 10 0
                 c -3 4, -7 6, -10 0 z"
              fill="currentColor" opacity=".9"/>
      </g>
    </svg>
  );
}

/** Props:
 *  - title: string
 *  - accent: CSS color (optional, defaults to theme mix)
 *  - compact: reduce margins (optional)
 */
export default function DeckHeading({ title, accent, compact=false }) {
  const ac = accent || `color-mix(in srgb, var(--c-primary) 82%, white 24%)`;

  return (
    <div
      className="deck-heading ornate"
      style={{
        "--heading-accent": ac,
         margin: compact ? "0 auto 0.9rem" : "0 auto 1.1rem",
         paddingTop: "10rem"

      }}
    >
      <div className="ornament left"><FlourishWing /></div>
      <h3 className="title">{title}</h3>
      <div className="ornament right"><FlourishWing mirrored /></div>
    </div>
  );
}
