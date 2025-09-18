// ResearchAssistant.jsx — previous version + centered title, RevealImage animations fixed
import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import PainterlyBackground from "./PainterlyBackground";
import NavBar from "./NavBar";
import RevealImage from "./RevealImage";
import RevealMedia from "./RevealMedia";
import {
  LuBrush as design,
  LuEarth as web,
  LuBrain as intel,
  LuCode as SoftwareIcon,      // Software
  LuCpu as HardwareIcon,        // Hardware
  LuGamepad2 as GameIcon,       // Game
  LuBookOpen as LearningIcon,   // Learning
  LuMessageSquare as TutoringIcon, // Tutoring
  LuCrown as LeadershipIcon,    // Leadership
  LuGraduationCap as EducationIcon // Education
} from "react-icons/lu";
export default function Games() {
  // === SAME THEME HANDLING AS HOME/SOFTWARE ===
  const initial = () => {
    try { return localStorage.getItem("ph.baseColor") || "#0B0F1A"; }
    catch { return "#0B0F1A"; }
  };
  const [uiColor, setUiColor] = useState(initial);
  const [paintColor, setPaintColor] = useState(initial);
  const debounceRef = useRef(null);
  const mainRef = useRef(null);

  const queueRepaint = (v) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setPaintColor(v), 150);
  };

  useEffect(() => {
    // page fade-in + clear route veil (matches Software.jsx)
    requestAnimationFrame(() => { if (mainRef.current) mainRef.current.classList.add("in"); });
    const veil = document.querySelector(".route-veil");
    if (veil) { veil.classList.add("fade-out"); veil.addEventListener("transitionend", () => veil.remove(), { once: true }); }
     document.documentElement.classList.remove("deck-lock");
  document.body.classList.remove("deck-lock");
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
  }, []);

  // === Scroll-reveal: bounce images in when they enter viewport ===
  useEffect(() => {
    const rootEl = mainRef.current || document;
    const targets = Array.from(rootEl.querySelectorAll(".reveal-io"));
    if (targets.length === 0) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.35, rootMargin: "0px 0px -5% 0px" });
    targets.forEach(t => io.observe(t));
    return () => io.disconnect();
  }, []);return (
  <div className="relative min-h-screen theme" style={{ ["--c-primary"]: uiColor }}>
    {/* SAME PAINTERLY BG + NAVBAR */}
    <PainterlyBackground baseColor={paintColor} />
    <NavBar uiColor={uiColor} onColorChange={setUiColor} queueRepaint={queueRepaint} />

    {/* CONTENT */}
    <main
      ref={mainRef}
      className="page-fade-in relative z-10 px-3 sm:px-5 lg:px-10 pt-[calc(var(--nav-h,64px)+1.25rem)] pb-16"
    >
      <div className="mx-auto w-full max-w-[110rem]">
        {/* HERO */}
        <header className="max-w-4xl  mx-auto text-center">
          <h1 className="page-title text-1 font-bold leading-tight text-[clamp(1.9rem,5.5vw,3rem)]">
            Clash Crusaders — Base Builder & Hero Tactics
          </h1>
          <p className="text-2 mt-2 text-[clamp(1rem,2.6vw,1.35rem)]">
            Python (Pygame) • A* Pathfinding • Data-Driven Balance
          </p>
          <p className="text-3 mt-4 
          leading-relaxed  mx-auto text-center text-[clamp(.95rem,2.1vw,1.125rem)]">
            <em>Clash Crusaders</em> is a <strong>Python-built</strong> hybrid that blends the <strong>medieval crusader fantasy</strong> with 
            <strong> Clash-of-Clans-style</strong> base building and asynchronous raids. The prototype uses a <strong>Python/Pygame</strong> gameplay layer, 
            <strong> JSON-driven</strong> content, and <strong>notebook-based telemetry</strong> for tuning. Players place <strong>walls, towers, traps, and resource buildings</strong>, 
            then attack rival keeps with <strong>hero-led squads</strong> and timed abilities—rewarding <strong>smart layouts</strong> and <strong>tactical raids</strong>.
          </p>
        </header>

        {/* SECTION 1 — image left, text right */}
        <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-first">
            <RevealImage
              className="w-full"
              dir="left"
              src="./images/clash.png"
              alt=""
              caption={
                <>
                  <span className="img-caption  mx-auto text-center">Loading section of the game</span>
                </>
              }
            />
          </div>

          <div className="order-last">
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">Role & Scope</h2>
            <ul className="text-3 space-y-2 text-[clamp(.95rem,2vw,1.05rem)]">
              <li><strong>Core loop:</strong> harvest → build/upgrade → raid → defend. Python timers, shields, and fair target selection for balanced encounters.</li>
              <li><strong>Building system:</strong> grid placement with <em>snapping</em> and collision masks; upgrade tiers for towers, traps, and walls via <strong>JSON configs</strong>.</li>
              <li><strong>Raid gameplay:</strong> deploy <strong>hero units</strong> with active skills (heal, taunt, charge); squad AI handles aggro, range, and role priorities.</li>
              <li><strong>Defense AI:</strong> implemented in <strong>pure Python</strong>—towers pick targets by role/nearest threat; traps trigger on cooldown; <strong>A*</strong> reroutes around new walls.</li>
              <li><strong>Balance & data:</strong> telemetry logs (win rate, path length, damage mix) analyzed in <strong>Python notebooks</strong> for rapid tuning and patches.</li>
            </ul>

            <div className="flex flex-wrap gap-2 mt-4 text-3">
              <span className="px-3 py-1 rounded-full border border-white/10">Python</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Pygame</span>
              <span className="px-3 py-1 rounded-full border border-white/10">A* Pathfinding</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Hero Abilities</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Towers & Traps</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Economy & Timers</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Telemetry</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Data-Driven Balance</span>
            </div>
          </div>
        </section>

        {/* SECTION 2 — text left, image right */}
        <section className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">
              Systems that make it work
            </h2>

            <div className="grid gap-3 sm:gap-4">
              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Economy & progression</h3>
                <p className="text-3 mt-1">
                  Gold/stone collectors, storages, and <strong>upgrade trees</strong> implemented in Python with smooth cost/timer curves. 
                  Daily caps and shields encourage <strong>fair, comeback-friendly pacing</strong>.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Pathfinding & combat AI</h3>
                <p className="text-3 mt-1">
                  Units follow <strong>A*</strong> with dynamic obstacles (Python grids), switching targets by <em>role priority</em> 
                  (walls→towers→storages→town hall). Heroes trigger <strong>activated skills</strong> on energy thresholds; towers track range, 
                  projectile flight, and <em>lead shots</em>.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Live-ops ready content</h3>
                <p className="text-3 mt-1">
                  <strong>Data-driven</strong> buildings, units, and levels loaded from <strong>JSON/YAML</strong>. Python telemetry 
                  (DPS mix, path length, leak points) guides <strong>buff/nerf</strong> decisions and new layout challenges—no engine rebuilds.
                </p>
              </article>
            </div>
          </div>

          <div className="md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
               <RevealMedia
                className="w-full"
                dir="right"
                src="/images/clash.mp4"
                poster="/images/clash2.png"
                caption={<span className="img-caption">P.S. This is my VERY FIRST project in CS in my first semester, that's why it looks simple:)</span>}
              />
          </div>
        </section>

        {/* SECTION 3 — deeper narrative */}
        <section className="mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-3">
            Outcomes & impact
          </h2>

          <div className="grid md:grid-cols-1 gap-4 lg:gap-6">
            <div className="rounded-xl /10 p-5 shadow-lg">
              <p className="text-3 leading-relaxed">
                <em>Clash Crusaders</em> is a <strong>fully playable Python prototype</strong> that proves the hybrid works: satisfying base layouts, 
                readable raids, and hero moments that feel earned. The codebase is clean, <strong>config-first</strong>, and instrumented 
                with Python logging for fast iteration and balance patches.
              </p>
              <p className="text-3 leading-relaxed mt-3">
                Content scales easily—new buildings, heroes, and scenarios drop in via data files. The result is a strong foundation 
                for <strong>progression</strong>, <strong>competitive raids</strong>, and future live-ops.
              </p>
              <ul className="text-3 grid gap-2 mt-3">
                <li>✓ <strong>Grid builder:</strong> snapping placement, collision, and upgrade tiers for walls/towers/traps.</li>
                <li>✓ <strong>Hero squads:</strong> deployable units with <em>active abilities</em> and role priorities.</li>
                <li>✓ <strong>Dynamic A*:</strong> Python rerouting around fresh walls; towers choose targets intelligently.</li>
                <li>✓ <strong>Economy loop:</strong> collectors, storages, costs/timers, shield windows, fair target selection.</li>
                <li>✓ <strong>Telemetry:</strong> win-rate, damage mix, path stats, and leak-point heatmaps analyzed in notebooks.</li>
                <li>✓ <strong>Data-driven content:</strong> JSON/YAML stats & levels; hot-fix balance without redeploys.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS — Clash Crusaders */}
        <section className="skills-section mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-4 text-center">
            Skills
          </h2>

          {(() => {
            const SKILLS = [
              { label: "Python",                 Icon: SoftwareIcon },
              { label: "Pygame",                 Icon: GameIcon },
              { label: "A* Pathfinding",         Icon: intel },
              { label: "Combat & Defense AI",    Icon: intel },
              { label: "Data-Driven Balance",    Icon: LearningIcon },
              { label: "Level/Layout Design",    Icon: SoftwareIcon }            ];

            return (
              <ul className="skills-grid">
                {SKILLS.map(({ label, Icon }) => (
                  <li key={label} className="skill-orb">
                    <span className="skill-inner">
                      <Icon className="skill-icon" aria-hidden />
                      <span className="skill-label">{label}</span>
                    </span>
                  </li>
                ))}
              </ul>
            );
          })()}
        </section>

        {/* CTA */}
        <section className="mt-12 md:mt-16">
          <div className="rounded-xl p-5 sm:p-6 shadow-lg flex flex-wrap items-center justify-between gap-3">
            <p className="text-3">
              See the game in my{" "}
              <a className="see-publications underline underline-offset-4" href="https://github.com/mohammadhosseinkarimian/ClashCrusader">Github</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  </div>
);



}
