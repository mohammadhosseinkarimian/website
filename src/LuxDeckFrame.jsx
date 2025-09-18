// LuxDeckFrame.jsx — ornate, responsive frame with centered title for each deck
import React from "react";

/** Props:
 *  - title: string shown centered as a badge at the top edge
 *  - id: optional for aria-labelledby
 *  - children: deck content
 */
export default function LuxDeckFrame({ title, id, children }) {
  const titleId = id ? `${id}-title` : undefined;

  return (
    <section className="lux-deck-frame" aria-labelledby={titleId}>
      <div className="lux-deck-inner">
        <div className="lux-title-badge">
          {/* top flourish */}
          <svg className="lux-flourish" viewBox="0 0 240 24" aria-hidden>
            <path d="M12 12 C 24 2, 48 2, 60 12 S 96 22, 120 12 144 2, 180 12 216 22, 228 12"
                  fill="none" stroke="currentColor" strokeWidth="1.6" strokeOpacity=".65" />
          </svg>

          <h3 id={titleId} className="lux-title">{title}</h3>

          {/* bottom flourish (mirrored) */}
          <svg className="lux-flourish flip" viewBox="0 0 240 24" aria-hidden>
            <path d="M12 12 C 24 2, 48 2, 60 12 S 96 22, 120 12 144 2, 180 12 216 22, 228 12"
                  fill="none" stroke="currentColor" strokeWidth="1.6" strokeOpacity=".65" />
          </svg>
        </div>

        <div className="lux-frame-body">
          {children}
        </div>
      </div>
    </section>
  );
}
