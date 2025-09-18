// ClubIconLux.jsx — luxe ♣ from react-icons, clean masked sheen (no bg/halo)
import React from "react";
import { BsSuitClubFill } from "react-icons/bs";

/* Theme tints */
const toneHi = (p = 12) =>
  `color-mix(in srgb, var(--c-primary) 72%, white ${p}%)`;
const toneLo = (p = 80) =>
  `color-mix(in srgb, var(--c-primary) 34%, black ${p}%)`;
const foil = () =>
  `color-mix(in srgb, ${toneHi(16)} 74%, ${toneLo(72)} 26%)`;

export default function ClubIconLux({ className, style, outline }) {
  const stroke = outline || foil();
  return (
    <svg viewBox="0 0 100 120" className={className} style={{ display: "block", ...style }} aria-hidden shapeRendering="geometricPrecision">
      <defs>
        <radialGradient id="rgClubLux" cx="52%" cy="32%" r="70%">
          <stop offset="0%"  stopColor={toneHi(30)} stopOpacity=".95" />
          <stop offset="48%" stopColor={toneHi(16)} stopOpacity=".28" />
          <stop offset="100%" stopColor={toneHi(6)}  stopOpacity="0" />
        </radialGradient>
        <filter id="fClubLuxBlur"><feGaussianBlur stdDeviation="0.45" /></filter>
        <mask id="mClubLux" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="100" height="120" fill="black" />
          <g transform="translate(2,12) scale(6)">
            <BsSuitClubFill color="white" />
          </g>
        </mask>
      </defs>

      {/* Paint ONLY inside the club */}
      <g mask="url(#mClubLux)">
        <rect x="0" y="0" width="100" height="120" fill="url(#rgClubLux)" data-suit-shine="1" filter="url(#fClubLuxBlur)" />
        <circle cx="64" cy="28" r="1.4" fill={toneHi(32)} opacity=".9"/>
        <circle cx="68" cy="33" r="1.0" fill={toneHi(26)} opacity=".75"/>
      </g>

      {/* crisp rim (no drop-shadow/halo) */}
      <g transform="translate(2,12) scale(6)">
        <BsSuitClubFill color={stroke} />
      </g>
    </svg>
  );
}
