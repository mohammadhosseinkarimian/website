// ResearchAssistant.jsx — previous version + centered title, RevealImage animations fixed
import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import PainterlyBackground from "./PainterlyBackground";
import NavBar from "./NavBar";
import RevealImage from "./RevealImage";
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
  LuGraduationCap as EducationIcon, // Education
  LuBrush
} from "react-icons/lu";
export default function Boardgame() {
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
  }, []);

  return (
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
            Boardgame Project — Strategy Engine & AI Opponents
          </h1>
          <p className="text-2 mt-2 text-[clamp(1rem,2.6vw,1.35rem)]">
            Rules Engine • Game AI • Multiplayer-Ready
          </p>
          <p className="text-3 mt-4 
          leading-relaxed  mx-auto text-center text-[clamp(.95rem,2.1vw,1.125rem)]">
            I designed and built a <strong>complete boardgame system</strong>—from <strong>rules & turn logic</strong> to <strong>AI opponents</strong>, 
            <strong> polished UX</strong>, and <strong>replayable matches</strong>. The core is a <strong>deterministic rules engine</strong> with 
            seedable RNG, exhaustive tests, and a clean API for UI, bots, and (future) online play. Players get <strong>smart hints</strong>, 
            <strong>difficulty tiers</strong>, and <strong>instant replays</strong>; developers get a codebase that is <strong>modular, fast, and fun to extend</strong>.
          </p>
        </header>

        {/* SECTION 1 — image left, text right */}
        <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-first">
            <RevealImage
              className="w-full"
              dir="left"
              src="./images/Card.PNG"
              alt="Boardgame pieces"
              caption={
                <>
                  <span className="img-caption  mx-auto text-center">Home page and list of boardgames</span>
                </>
              }
            />
          </div>

          <div className="order-last">
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">Role & Scope</h2>
            <ul className="text-3 space-y-2 text-[clamp(.95rem,2vw,1.05rem)]">
              <li><strong>Rules-first architecture:</strong> formalized mechanics, win/lose/draw, turns, and effects as a <em>pure</em> state machine.</li>
              <li><strong>Deterministic core:</strong> seedable RNG, snapshot/rollback, and <em>authoritative state</em> for replays & fairness.</li>
              <li><strong>Game AI:</strong> <strong>Minimax/Alpha–Beta</strong> and <strong>MCTS</strong> bots with heuristics and configurable difficulty.</li>
              <li><strong>UX that teaches:</strong> move previews, legal-move highlights, <em>hint</em> system, animations, and an onboarding tutorial.</li>
              <li><strong>Online-ready design:</strong> clean separation of engine/UI, event log, and serialization for future network play.</li>
            </ul>

            <div className="flex flex-wrap gap-2 mt-4 text-3">
              <span className="px-3 py-1 rounded-full border border-white/10">Game AI</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Minimax</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Alpha–Beta</span>
              <span className="px-3 py-1 rounded-full border border-white/10">MCTS</span>
              <span className="px-3 py-1 rounded-full border border-white/10">State Machine</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Undo/Redo</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Replay</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Performance</span>
            </div>
          </div>
        </section>

        {/* SECTION 2 — text left, image right; removed frosted backgrounds */}
        <section className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">
              Methods that anchored my work
            </h2>

            <div className="grid gap-3 sm:gap-4">
              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Rules engine & testable core</h3>
                <p className="text-3 mt-1">
                  Encoded the game as a <strong>pure reducer</strong> (state, action) → state with strict invariants and type-checked moves. 
                  Deterministic <strong>RNG seeding</strong> enables identical replays; <strong>snapshot/rollback</strong> powers undo and fast bot simulations. 
                  Unit tests lock down win logic, move legality, and draw conditions.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Search, heuristics & difficulty</h3>
                <p className="text-3 mt-1">
                  Implemented <strong>Minimax with Alpha–Beta pruning</strong> and <strong>MCTS</strong> for stochastic modes. 
                  Added <strong>iterative deepening</strong>, <strong>transposition tables</strong>, and domain heuristics (material/territory/tempo). 
                  Difficulty scales via depth, rollouts, noise, and evaluation weights.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">UX, telemetry & balance</h3>
                <p className="text-3 mt-1">
                  Built <strong>hint</strong> and <strong>best-move</strong> previews, subtle animations, and clear turn cues. 
                  Logged bot-vs-bot leagues and player sessions to tune heuristics with an <strong>Elo-like</strong> ladder and A/B variations. 
                  Exportable <strong>PGN-style</strong> move logs keep matches shareable and debuggable.
                </p>
              </article>
            </div>
          </div>

          <div className="md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
            <RevealImage
              className="w-full"
              dir="right"
              src="./images/Boardgame.png"
              alt="Game-tree minimax illustration"
              caption={
                <>
                  <span className="img-caption">Catan profile in website</span>
                </>
              }
            />
          </div>
        </section>

        {/* SECTION 3 — deeper narrative (no frosted backgrounds; removed 'At a glance') */}
        <section className="mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-3">
            Outcomes & impact
          </h2>

          <div className="grid md:grid-cols-1 gap-4 lg:gap-6">
            <div className="rounded-xl /10 p-5 shadow-lg">
              <p className="text-3 leading-relaxed">
                Result: a <strong>fast, fair, and teachable</strong> strategy game. New players learn with <strong>visual hints</strong> and 
                a gentle AI; experts crank depth for a crisp challenge. Replays, undo/redo, and seeded matches make practice 
                and analysis <strong>addictive</strong>. The engine is clean enough to power <strong>variants</strong> and future <strong>online play</strong>.
              </p>
              <p className="text-3 leading-relaxed mt-3">
                The project doubles as an <strong>AI playground</strong>: swap heuristics, compare search methods, and run leagues to 
                track improvement over time—all on a deterministic, reproducible foundation.
              </p>
              <ul className="text-3 grid gap-2 mt-3">
                <li>✓ <strong>Rules engine & state machine:</strong> pure reducer, invariants, and exhaustive unit tests.</li>
                <li>✓ <strong>AI opponents:</strong> Minimax/Alpha–Beta and MCTS with scalable difficulty.</li>
                <li>✓ <strong>Heuristics & tables:</strong> iterative deepening, transposition caching, and domain scoring.</li>
                <li>✓ <strong>UX & onboarding:</strong> hints, legal-move highlights, animations, and tutorial.</li>
                <li>✓ <strong>Replay/undo/seeded matches:</strong> PGN-style logs and identical replays across devices.</li>
                <li>✓ <strong>Performance:</strong> memoized evaluators, pruning strategies, and lightweight rendering.</li>
                <li>✓ <strong>Online-ready:</strong> event log + serialization for future netcode.</li>
                <li>✓ <strong>Telemetry & balance:</strong> bot leagues, Elo-style tracking, and A/B heuristics.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS — related to Boardgame Project */}
        <section className="skills-section mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-4 text-center">
            Skills
          </h2>

          {(() => {
            const SKILLS = [
              { label: "React", Icon: SoftwareIcon },
              { label: "UI/UX Design",         Icon: LuBrush },
              { label: "Javascript", Icon: SoftwareIcon },
              { label: "HTML-CSS",   Icon: SoftwareIcon },
              { label: "Team Leadership",    Icon: LeadershipIcon },
              { label: "Front-End Development", Icon: SoftwareIcon },
            ];

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
              See more of this in my{" "}
              <a className="see-publications underline underline-offset-4" href="https://github.com/mohammadhosseinkarimian/Boardgame">Github</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  </div>
);



}
