import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import PainterlyBackground from "./PainterlyBackground";
import NavBar from "./NavBar";

export default function Software(){
  const initial = () => localStorage.getItem("ph.baseColor") || "#0B0F1A";
  const [uiColor, setUiColor] = useState(initial);
  const [paintColor, setPaintColor] = useState(initial);
  const debounceRef = useRef(null);
  const mainRef = useRef(null);

  const queueRepaint = (v) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setPaintColor(v), 150);
  };

  useEffect(() => {
    // fade page in + remove veil from DeckCards
    requestAnimationFrame(() => { if (mainRef.current) mainRef.current.classList.add("in"); });
    const veil = document.querySelector(".route-veil");
    if (veil) { veil.classList.add("fade-out"); veil.addEventListener("transitionend", () => veil.remove(), { once: true }); }
  }, []);

  return (
    <div className="relative min-h-screen theme" style={{ ["--c-primary"]: uiColor }}>
      <PainterlyBackground baseColor={paintColor} />
      <NavBar uiColor={uiColor} onColorChange={setUiColor} queueRepaint={queueRepaint} />

      <main ref={mainRef} className="page-fade-in relative z-10 px-3 sm:px-5 lg:px-10 pt-[calc(var(--nav-h,64px)+1.25rem)] pb-16">
        {/* your software content here */}
        <h1 className="text-1 font-bold text-[clamp(1.75rem,5.5vw,3rem)] mb-4">Software</h1>
        <p className="text-3 max-w-3xl mb-6">Selected software projects & experiments. More details coming soon.</p>
      </main>
    </div>
  );
}
