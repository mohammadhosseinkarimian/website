// PainterlyBackground.jsx
import React, { useEffect, useRef } from "react";
import "./home.css";

/* ---------- helpers (unchanged look) ---------- */
function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) } : { r: 20, g: 20, b: 20 };
}
const mix = (a, b, t) => Math.round(a + (b - a) * t);
const toCss = ({ r, g, b }, a = 1) => `rgba(${r | 0},${g | 0},${b | 0},${a})`;
const darken = (rgb, t) => ({ r: mix(rgb.r, 0, t), g: mix(rgb.g, 0, t), b: mix(rgb.b, 0, t) });
const lighten = (rgb, t) => ({ r: mix(rgb.r, 255, t), g: mix(rgb.g, 255, t), b: mix(rgb.b, 255, t) });

function paint(ctx, W, H, baseHex) {
  const base = hexToRgb(baseHex);
  const bg = darken(base, 0.82);
  const inkDark = darken(base, 0.6);
  const inkDarker = darken(base, 0.86);
  const chalk = lighten(base, 0.8);

  // background fill
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = toCss(bg, 1);
  ctx.fillRect(0, 0, W, H);

  // cloudy blotches
  ctx.globalCompositeOperation = "overlay";
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * W, y = Math.random() * H, r = (Math.random() * 0.3 + 0.25) * Math.max(W, H);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, toCss(darken(base, 0.12), 0.06));
    g.addColorStop(1, toCss(darken(base, 0.92), 0));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  // big arcs
  ctx.globalCompositeOperation = "overlay";
  for (let i = 0; i < 18; i++) {
    const cx = Math.random() * W, cy = Math.random() * H;
    const radius = (Math.random() * 0.8 + 0.25) * Math.max(W, H);
    const start = Math.random() * Math.PI * 2;
    const end = start + (Math.random() * 0.8 + 0.2) * (Math.random() < 0.5 ? 1 : -1);
    ctx.strokeStyle = toCss(chalk, 0.08 + Math.random() * 0.07);
    ctx.lineWidth = 0.8 + Math.random() * 1.2;
    ctx.beginPath(); ctx.arc(cx, cy, radius, start, end); ctx.stroke();
  }

  // speckles + drips
  ctx.globalCompositeOperation = "multiply";
  for (let b = 0; b < 3; b++) {
    const count = 220 + Math.floor(Math.random() * 130);
    for (let i = 0; i < count; i++) {
      const x = Math.random() * W, y = Math.random() * H;
      const r = Math.pow(Math.random(), 2) * 6.5 + 0.6;
      ctx.fillStyle = Math.random() < 0.8 ? toCss(inkDarker, 0.54) : toCss(inkDark, 0.34);
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();

      // occasional drip
      if (Math.random() < 0.08) {
        const len = 7 + Math.random() * 48;
        ctx.strokeStyle = toCss(inkDarker, 0.35);
        ctx.lineWidth = 0.6 + Math.random() * 0.5;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (Math.random() - 0.5) * 5, y + len); ctx.stroke();
      }
    }
  }

  // tiny stars
  ctx.globalCompositeOperation = "screen";
  for (let i = 0; i < 240; i++) {
    const x = Math.random() * W, y = Math.random() * H, r = Math.random() * 2 + 0.4;
    ctx.fillStyle = toCss(chalk, 0.08 + Math.random() * 0.06);
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  // crackly lines
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = toCss(lighten(base, 0.92), 0.25);
  for (let i = 0; i < 160; i++) {
    const segs = 6 + Math.floor(Math.random() * 10);
    let px = Math.random() * W, py = Math.random() * H;
    ctx.lineWidth = 0.7 + Math.random() * 0.8;
    ctx.beginPath(); ctx.moveTo(px, py);
    for (let s = 0; s < segs; s++) {
      px += (Math.random() - 0.5) * 34;
      py += (Math.random() - 0.2) * 22;
      ctx.lineTo(px, py);
    }
    ctx.stroke();
  }
}

/* ---------- component ---------- */
export default function PainterlyBackground({ baseColor }) {
  // prefer provided baseColor, else CSS var --c-primary, else dark gray
  const color =
    baseColor ||
    getComputedStyle(document.documentElement).getPropertyValue("--c-primary")?.trim() ||
    "#1a1a1a";

  const ref = useRef(null);

  useEffect(() => {
    const cvs = ref.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d", { alpha: true, desynchronized: true });
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const vv = window.visualViewport;

    // optional legacy var used elsewhere in your CSS
    const setVHVar = () => {
      const vh = (vv?.height || window.innerHeight) * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    const getSize = () => {
      const w = Math.ceil(vv?.width || window.innerWidth);
      const h = Math.ceil(vv?.height || window.innerHeight);
      return { w, h };
    };

    const resizeOnce = () => {
      setVHVar();
      const { w, h } = getSize();
      // bitmap size follows visual viewport; CSS box size is via inset:0 in CSS
      cvs.width = Math.max(1, Math.floor(w * dpr));
      cvs.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);   // transparent clear
      paint(ctx, w, h, color);
    };

    // throttle reflow during URL bar animation
    let rafId = null;
    let lastW = 0, lastH = 0;
    const onVVChange = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const { w, h } = getSize();
        if (w !== lastW || h !== lastH) {
          lastW = w; lastH = h;
          resizeOnce();
        }
      });
    };

    resizeOnce();
    vv?.addEventListener("scroll", onVVChange, { passive: true });  // key: mid-gesture size changes
    vv?.addEventListener("resize", onVVChange);
    window.addEventListener("resize", onVVChange);

    return () => {
      vv?.removeEventListener("scroll", onVVChange);
      vv?.removeEventListener("resize", onVVChange);
      window.removeEventListener("resize", onVVChange);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [baseColor]); // repaint if theme color prop changes

  return (
    <>
      {/* base painterly halo under the canvas (unchanged visuals) */}
      <div
        className="pbg-layer fixed inset-0 z-0"
        aria-hidden
        style={{
          background:
            // same layered radial gradients you already use
            "radial-gradient(1200px 800px at 30% 20%, rgba(255,255,255,0.06), transparent 60%)," +
            "radial-gradient(1000px 700px at 70% 70%, rgba(0,0,0,0.15), transparent 65%)",
          backgroundColor: "rgba(0,0,0,.9)",
        }}
      />
      {/* canvas painterly texture */}
      <canvas
        ref={ref}
        className="pbg-canvas fixed inset-0 z-0 pointer-events-none"
        aria-hidden
      />
      {/* your pulse overlays stay above via CSS (z-index bumped in home.css) */}
      <div className="pulse-fill" />
      <div className="pulse-cracks" style={{ animationDelay: "160ms" }} />
    </>
  );
}
