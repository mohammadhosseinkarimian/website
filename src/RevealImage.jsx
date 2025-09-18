// RevealImage.jsx — center-grown hover scale + color reveal (1s)
import React from "react";

export default function RevealImage({ src, alt = "", caption, dir="left", className="" }) {
  return (
    <figure className={`image-reveal reveal-io ${className}`} data-dir={dir}>
      <div className="img-wrap">
        {/* base (grayscale) */}
        <img className="img base" src={src} alt={alt} loading="lazy" decoding="async" draggable="false" />
        {/* overlay (color, revealed with radial mask on hover) */}
        <img className="img color" src={src} alt="" aria-hidden loading="lazy" decoding="async" draggable="false" />
      </div>
      {caption && <figcaption className="img-caption">{caption}</figcaption>}
    </figure>
  );
}
