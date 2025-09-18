// SpadeIconLux.jsx — luxe ♠ from react-icons, clean masked sheen (no bg/halo)
import React from "react";
import { BsSuitSpadeFill } from "react-icons/bs";

/* Theme tints */
const toneHi = (p = 12) =>
  `color-mix(in srgb, var(--c-primary) 72%, white ${p}%)`;
const toneLo = (p = 80) =>
  `color-mix(in srgb, var(--c-primary) 34%, black ${p}%)`;
const foil = () =>
  `color-mix(in srgb, ${toneHi(16)} 74%, ${toneLo(72)} 26%)`;

export default function SpadeIconLux({ className, style, outline }) {
  const stroke = outline || foil();
  return (
    <svg viewBox="0 0 100 120" className={className} style={{ display: "block", ...style }} aria-hidden shapeRendering="geometricPrecision">
      <defs>
        <radialGradient id="rgSpLux" cx="50%" cy="24%" r="70%">
          <stop offset="0%"  stopColor={toneHi(28)} stopOpacity=".95" />
          <stop offset="50%" stopColor={toneHi(16)} stopOpacity=".28" />
          <stop offset="100%" stopColor={toneHi(6)}  stopOpacity="0" />
        </radialGradient>
        <filter id="fSpLuxBlur"><feGaussianBlur stdDeviation="0.45" /></filter>
        {/* luminance mask from react-icon */}
        <mask id="mSpLux" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="100" height="120" fill="black" />
          <g transform="translate(2,12) scale(6)">
            <BsSuitSpadeFill color="white" />
          </g>
        </mask>
      </defs>

      {/* Paint ONLY inside the spade */}
      <g mask="url(#mSpLux)">
        <rect x="0" y="0" width="100" height="120" fill="url(#rgSpLux)" data-suit-shine="1" filter="url(#fSpLuxBlur)" />
        <circle cx="64" cy="26" r="1.4" fill={toneHi(30)} opacity=".9"/>
        <circle cx="68" cy="31" r="1.0" fill={toneHi(26)} opacity=".75"/>
      </g>

      {/* crisp rim (no drop-shadow/halo) */}
      <g transform="translate(2,12) scale(6)">
        <BsSuitSpadeFill color={stroke} />
      </g>
    </svg>
  );
}
