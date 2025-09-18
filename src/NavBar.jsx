// src/components/NavBar.jsx
import React, { useEffect, useState } from "react";
import "./home.css";

export default function NavBar({
  uiColor,
  onColorChange,            // (v: string) => void
  queueRepaint,             // optional debounced painter trigger
  presets = [
    { name: "Slate",  color: "#0B0F1A" },
    { name: "Rose",   color: "#B91C1C" },
    { name: "Indigo", color: "#3730A3" },
    { name: "Teal",   color: "#0F766E" },
    { name: "Amber",  color: "#B45309" },
  ],
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const setColor = (v) => {
    try { localStorage.setItem("ph.baseColor", v); } catch {}
    onColorChange?.(v);
    queueRepaint?.(v);
  };

  return (
    <header className={`navwrap fixed top-0 inset-x-0 z-20 ${scrolled ? "scrolled" : "bg-transparent"}`}>
      <nav className="mx-auto flex items-center justify-between gap-3 sm:gap-4 px-3 sm:px-5 lg:px-10 py-2.5 sm:py-3">
        <a href=".\" className="group inline-flex items-center gap-2 sm:gap-3">
          <span className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-xl border bd backdrop-blur-sm"
                style={{ background: `radial-gradient(100% 100% at 30% 30%, var(--c-primary), #000)` }}/>
          <span className="font-semibold tracking-wide text-1 group-hover:text-white transition-colors text-sm sm:text-base">
            Mhmd<span className="opacity-60">.dev</span>
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-2 sm:gap-3">
            <a href="#work" className="btn text-xs sm:text-sm">Work</a>
            <a href="#about" className="btn text-xs sm:text-sm">About</a>
            <a href="#contact" className="btn text-xs sm:text-sm">Contact</a>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            {presets.map(p => (
              <button key={p.name}
                      aria-label={p.name}
                      onClick={() => setColor(p.color)}
                      style={{ background: p.color, boxShadow: uiColor === p.color ? "0 0 0 2px #fff inset" : "0 0 0 2px rgba(255,255,255,.15) inset" }}
                      className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border bd transition-transform hover:scale-110"
                      title={p.name}/>
            ))}
            <label className="hidden lg:flex items-center gap-2 text-xs text-2 select-none">
              Custom
              <input className="color-input" type="color" value={uiColor}
                     onChange={(e)=>setColor(e.target.value)} title="Pick base color"/>
            </label>
          </div>

          <button className="md:hidden btn text-xs" onClick={()=>setMenuOpen(v=>!v)} aria-label="Menu">Menu</button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden px-3 pb-3 flex flex-col gap-2 bg-black/40 backdrop-blur-sm border-top bd theme">
          <a href="#work" className="btn text-sm">Work</a>
          <a href="#about" className="btn text-sm">About</a>
          <a href="#contact" className="btn text-sm">Contact</a>
          <div className="flex items-center gap-2">
            {presets.map(p => (
              <button key={p.name} aria-label={p.name} onClick={() => setColor(p.color)}
                      style={{ background: p.color, boxShadow: uiColor === p.color ? "0 0 0 2px #fff inset" : "0 0 0 2px rgba(255,255,255,.2) inset" }}
                      className="h-6 w-6 rounded-full border bd" title={p.name}/>
            ))}
            <input className="color-input ml-1" type="color" value={uiColor} onChange={(e)=>setColor(e.target.value)}/>
          </div>
        </div>
      )}
    </header>
  );
}
