// RevealImage.jsx — center-grown hover scale + color reveal (1s)
import React from "react";

export default function RevealMedia({ src, poster, caption, dir="left", className="" }) {
  return (
    <figure className={`relative ${className}`}>
      <div className="overflow-hidden rounded-xl shadow-lg">
        <video
          className="block w-full h-auto"
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-neutral-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}