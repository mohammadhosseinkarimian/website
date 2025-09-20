// Home.jsx — compact page using NavBar, PainterlyBackground, and DeckCards
import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import PainterlyBackground from "./PainterlyBackground";
import NavBar from "./NavBar";
import DeckCards from "./DeckCards";
import DeckHearts from "./DeckHearts";
import DeckClubs from "./DeckClubs";
import DeckDiamonds from "./DeckDiamonds";
import DeckJokers from "./DeckJokers";
import DeckSections from "./DeckSections";
import RevealImage from "./RevealImage";

export default function PortfolioHome() {
  // === THEME COLOR ===
  // uiColor updates the CSS instantly; paintColor drives the heavy canvas (debounced)
  const initial = () => {
    try { return localStorage.getItem("ph.baseColor") || "#0B0F1A"; }
    catch { return "#0B0F1A"; }
  };
  const [uiColor, setUiColor] = useState(initial);
  const [paintColor, setPaintColor] = useState(initial);

  // Debounce canvas repaint to avoid jank while dragging the color picker
  const debounceRef = useRef();
  const queueRepaint = (v) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setPaintColor(v), 150);
  };

  // ---- PAGE SHELL (everything below the navbar; sweep mounts here so NAV stays untouched) ----
  const shellRef = useRef(null);

  // === Performance helpers for color dragging ===
  const rafLock = useRef(false);        // throttle to one update per animation frame
  const pendingColorRef = useRef(null); // latest color while throttled
  const sweepElRef = useRef(null);      // reuse a single sweep element
  const sweepTimerRef = useRef(null);   // trailing timer to run sweep after a short pause

  // Create/reuse the diagonal sweep overlay INSIDE the shell (bg+content only)
  const runThemeSweepOnce = (nextColor) => {
    const host = shellRef.current || document.body;

    // create once and reuse
    if (!sweepElRef.current) {
      const el = document.createElement("div");
      el.className = "theme-sweep";
      el.addEventListener("animationend", () => {
        if (el.parentNode) el.parentNode.removeChild(el);
        sweepElRef.current = null;
      }, { once: true });
      sweepElRef.current = el;
      host.appendChild(el);
    }

    const el = sweepElRef.current;
    el.style.setProperty("--sweep", nextColor);
    // control both travel and fade durations here (longer/shorter as you like)
    el.style.animationDuration = "4000ms, 4000ms";

    // restart the CSS animations cleanly
    el.style.animation = "none";
    // force reflow
    // eslint-disable-next-line no-unused-expressions
    el.offsetHeight;
    el.style.animation = "";
  };

  // Throttled color setter + trailing/coalesced sweep
  const handleColorChange = (v) => {
    // rAF throttle: collapse rapid onChange events to ~60 FPS
    if (rafLock.current) {
      pendingColorRef.current = v;
      return;
    }
    rafLock.current = true;
    requestAnimationFrame(() => {
      setUiColor(v);   // instant CSS var update (UI reacts immediately)
      queueRepaint(v); // debounced heavy canvas repaint

      rafLock.current = false;
      if (pendingColorRef.current) {
        const next = pendingColorRef.current;
        pendingColorRef.current = null;
        handleColorChange(next); // process queued value
      }
    });

    // trailing sweep: only run when user pauses moving (~200ms)
    clearTimeout(sweepTimerRef.current);
    sweepTimerRef.current = setTimeout(() => runThemeSweepOnce(v), 200);
  };

  // Persist chosen color for cross-route consistency
  useEffect(() => {
    try { localStorage.setItem("ph.baseColor", uiColor); } catch {}
  }, [uiColor]);

  return (
    <div className="relative min-h-screen overflow-x-hidden theme" style={{ ["--c-primary"]: uiColor }}>
      {/* Global navbar (shared by all pages) — NOT affected by sweep */}
      <NavBar
        uiColor={uiColor}
        onColorChange={handleColorChange}
        queueRepaint={queueRepaint}
      />

      {/* PAGE SHELL: contains background + main content; sweep mounts here */}
      <div id="page-shell" ref={shellRef} className="relative z-0">
        {/* Reusable painterly background (reads debounced color) */}
        <PainterlyBackground baseColor={paintColor} />

        {/* CONTENT */}
        <main className="relative z-10">
          {/* Hero */}
          <section id="home" className="min-h-[70vh] sm:min-h-[75vh] md:min-h-screen flex items-center">
            <div className="mx-auto w-full max-w-[110rem] px-3 sm:px-5 lg:px-10">
              <div className="max-w-3xl">
                <h1 className="text-1 font-bold leading-tight text-[clamp(2rem,6vw,3.75rem)]">
                  <span className="block">Hey, I'm MohammadHossein Karimian (Mhmd).</span>
                  <span className="block text-2 font-medium mt-2 sm:mt-3 text-[clamp(1.05rem,2.6vw,1.5rem)]">
                    I build intelligent interfaces, design UI/UX, robust web apps, and also develope games for fun.
                  </span>
                </h1>
                <p className="mt-4 sm:mt-6 text-3 leading-relaxed text-[clamp(.95rem,2.2vw,1.125rem)] max-w-prose">
                  This site is a living sketchbook of my skills, projects, and experiments.
                </p>
              </div>
            </div>
          </section>

          {/* Work / Deck */}
          <section id="work" className="relative py-16 sm:py-20 md:py-24 lg:py-28">
            <div className="mx-auto w-full max-w-[110rem] px-3 sm:px-5 lg:px-10">
              <h2 className="text-1 font-semibold mb-4 sm:mb-6 text-[clamp(1.25rem,3vw,2rem)]">Featured Work</h2>
              <div className="mt-0">
                <DeckSections/>
              </div>
            </div>
          </section>

          {/* About */}
          <section id="about" className="relative py-16 sm:py-20 md:py-24 lg:py-28">
            <div className="mx-auto w-full max-w-[110rem] px-3 sm:px-5 lg:px-10">
              <h2 className="text-1 font-semibold mb-4 sm:mb-6 text-[clamp(1.25rem,3vw,2rem)]">About Me</h2>

              <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 lg:gap-12">
                {/* Text */}
                <div className="order-2 md:order-1 space-y-4">
                  <p className="text-2 text-[clamp(1rem,2.4vw,1.2rem)] leading-relaxed">
                    I specialize in AI system analysis and modern software development. Along the way I’ve served as a <strong>Front End Developer & UI/UX Designer</strong> at EcomSpiders for 12 months, <strong> Scrum Master</strong> for 6 months, completed a <strong>Machine Learning internship</strong> at K. N. Toosi
                    University, and taught as a <strong>Lab Instructor</strong> for 17 months—sharpening collaboration, communication,
                    and problem-solving skills.
                  </p>
                  <p className="text-3 text-[clamp(.95rem,2.1vw,1.09rem)] leading-relaxed">
                    My toolkit spans full-stack web (React, Node), computer vision (CNNs, image processing), and deep learning.
                    I’ve published at <strong>Canadian AI</strong> and have another one in <strong>AAAI 2026</strong> on AI decision-making and
                    responsibility. I enjoy bridging research insights with production constraints—turning ideas into reliable
                    products.
                  </p>

                  {/* Quick facts */}
                  <ul className="text-3 grid gap-2 sm:gap-2.5 mt-2">
                    <li>• Final semester, M.Sc. (AI), University of Regina</li>
                    <li>• 3 years software experience · Full-stack & UI/UX for several projects</li>
                    <li>• Front End Developer(12 mo) · ML Intern (4 mo) · Scrum Master (6 mo) · Lab Instructor (17 mo)</li>
                    <li>• Focus areas: Machine Learning, Software Developer, UI/UX Designer, Game Developer</li>
                  </ul>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-5">
                    <a className="btn" href="https://www.linkedin.com/in/mohammadhossein-karimian/" target="_blank" rel="noreferrer">View LinkedIn </a>
                    <a className="btn" href="#contact">Get in touch</a>
                  </div>
                </div>

                {/* Image */}
                <div className="order-1 md:order-2 md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
                  <RevealImage
                    className="w-full image-reveal in"
                    dir="right"
                    src="/images/me.png" // put your portrait at public/images/me.jpg (or adjust the path)
                    alt=""
                    caption={<span className="img-caption">That's me:)</span>}
                  />
                </div>
              </section>
            </div>
          </section>

          {/* Contact */}
          <footer className="site-footer" id="contact">
            <div className="footer-grid">
              {/* Brand + blurb */}
              <div className="brand-row group inline-flex items-center gap-3">
                <svg
                  className="brand-logo w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110"
                  viewBox="0 0 96 96"
                  aria-label="MK monogram"
                >
                  <defs>
                    <linearGradient id="mkGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%"  stopColor="#66fdfaff"/>
                      <stop offset="100%" stopColor="#207cc7ff"/>
                    </linearGradient>
                  </defs>

                  <g
                    className="brand-stroke"             /* we’ll style this in CSS below */
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="6"
                  >
                    <rect x="6" y="6" width="84" height="84" rx="16" ry="16"/>
                    <path d="M22 68V28l14 22 14-22v40"/>
                    <path d="M58 28v40M58 48l18-20M58 48l18 20"/>
                  </g>
                </svg>

                <p className="footer-muted m-0">
                  Designing intelligent interfaces and polished web experiences.
                </p>
              </div>

              {/* Social (GitHub + LinkedIn) */}
              <div>
                <div className="footer-title">Links</div>
                <div className="social-list">
                  <a className="social-link" href="https://github.com/mohammadhosseinkarimian" target="_blank" rel="noreferrer">
                    <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.8-.25.8-.56v-2.04c-3.26.71-3.95-1.57-3.95-1.57-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.26 3.39.96.11-.77.41-1.26.75-1.55-2.6-.3-5.33-1.3-5.33-5.79 0-1.28.46-2.33 1.2-3.15-.12-.3-.52-1.52.11-3.17 0 0 .98-.32 3.2 1.2a11.1 11.1 0 0 1 5.83 0c2.22-1.52 3.2-1.2 3.2-1.2.63 1.65.23 2.87.11 3.17.75.82 1.2 1.87 1.2 3.15 0 4.5-2.74 5.49-5.35 5.79.43.38.82 1.12.82 2.26v3.35c0 .31.22.68.81.56A11.5 11.5 0 0 0 12 .5z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                  <a className="social-link" href="https://www.linkedin.com/in/mohammadhossein-karimian" target="_blank" rel="noreferrer">
                    <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5.001 2.5 2.5 0 0 0 0-5.001zM3 9h4v12H3zM9 9h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06C20.09 8.58 21 11.03 21 14.49V21h-4v-5.49c0-1.31-.02-3-1.82-3s-2.1 1.42-2.1 2.9V21H9z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Reference */}
              <div>
                <div className="footer-title">Reference</div>
                <p className="footer-muted">
                  EcomSpiders: <a href="mailto:info@ecomspiders.com">info@ecomspiders.com</a>
                </p>
              </div>

              {/* Contact */}
              <div>
                <div className="footer-title">Contact me via</div>
                <p className="footer-muted mail-row">
                  <svg className="mail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                    <path d="M3.5 6.5h17v11h-17z"/><path d="M4 7l8 6 8-6"/>
                  </svg>
                  <a href="mailto:Mohammadkarimian122@gmail.com">Mohammadkarimian122@gmail.com</a>
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
