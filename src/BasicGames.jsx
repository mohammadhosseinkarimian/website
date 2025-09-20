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
  LuGraduationCap as EducationIcon // Education
} from "react-icons/lu";
export default function BasicGames() {
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
            Other Games — Chess, Arcade, Pac-Man AI, Lunar Lander
          </h1>
          <p className="text-2 mt-2 text-[clamp(1rem,2.6vw,1.35rem)]">
            C++ & Python • Pathfinding • Physics & Game AI
          </p>
          <p className="text-3 mt-4 
          leading-relaxed  mx-auto text-center text-[clamp(.95rem,2.1vw,1.125rem)]">
            A small collection of <strong>standalone games</strong> and engines I built to sharpen systems, AI, and feel:
            a <strong>C++ chess</strong> engine with <em>Minimax + Alpha-Beta</em>, a <strong>C++ arcade</strong> shooter with bosses and power-ups,
            a <strong>Python Pac-Man</strong> with pathfinding/ghost behaviors, and a <strong>Python lunar lander</strong> with tight
            thrust physics. Each project is <strong>cleanly engineered</strong>, <strong>data-driven</strong>, and <strong>fun to play</strong>.
          </p>
        </header>

        {/* SECTION 1 — image left, text right */}
        <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-first">
            <RevealImage
              className="w-full"
              dir="left"
              src="./images/chess.png"
              alt=""
              caption={
                <>
                  <span className="img-caption  mx-auto text-center">Sample Chess game with c++</span>
                </>
              }
            />
          </div>

          <div className="order-last">
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">Role & Scope</h2>
            <ul className="text-3 space-y-2 text-[clamp(.95rem,2vw,1.05rem)]">
              <li><strong>Chess (C++):</strong> full legal move generation (checks, castles, en passant, promotion), <strong>Minimax + Alpha-Beta</strong>, iterative deepening, basic evaluation, and PGN-style logging.</li>
              <li><strong>Arcade (C++):</strong> fast 2D loop (SDL/SFML), parallax, enemy waves, <strong>power-ups</strong>, telegraphed boss phases, juicy hit effects, and score/combo systems.</li>
              <li><strong>Pac-Man AI (Python):</strong> grid map loader, pellets/power pellets, <strong>A*/BFS</strong> pathfinding, and ghost <strong>FSM</strong> (chase/scatter/frightened) with timing rules.</li>
              <li><strong>Lunar Lander (Python):</strong> fixed-delta physics, gravity/thrust/rotation, collision + landing checks, <strong>fuel economy</strong>, wind variants, and tiered landing pads.</li>
              <li><strong>Tooling:</strong> JSON level/data files, debug overlays (FPS, path viz), and config-first balance passes for rapid iteration.</li>
            </ul>

            <div className="flex flex-wrap gap-2 mt-4 text-3">
              <span className="px-3 py-1 rounded-full border border-white/10">C++ (SDL/SFML)</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Python / Pygame</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Minimax / Alpha-Beta</span>
              <span className="px-3 py-1 rounded-full border border-white/10">A* / BFS</span>
              <span className="px-3 py-1 rounded-full border border-white/10">FSM / Behaviors</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Physics & Collisions</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Level Design</span>
              <span className="px-3 py-1 rounded-full border border-white/10">JSON Data</span>
            </div>
          </div>
        </section>

        {/* SECTION 2 — text left, image right */}
        <section className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">
              Systems that anchored the builds
            </h2>

            <div className="grid gap-3 sm:gap-4">
              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Chess engine — rules & search (C++)</h3>
                <p className="text-3 mt-1">
                  Built a <strong>legal-move generator</strong> with check detection and pins; added <strong>Minimax + Alpha-Beta</strong> with
                  iterative deepening and move ordering. Evaluation blends material, mobility, pawn structure, and king safety.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Pac-Man — grid pathfinding & ghosts (Python)</h3>
                <p className="text-3 mt-1">
                  Implemented <strong>A*</strong> on tile graphs with portals, plus ghost <strong>FSM</strong> states (chase/scatter/frightened).
                  Scatter corners, frightened timers, and power-pellet mode replicate classic pressure and evasion play.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Arcade & Lander — physics & feel</h3>
                <p className="text-3 mt-1">
                  Fixed-delta loops keep collisions reliable; tuned <strong>thrust/rotation</strong>, gravity, and landing checks for the lander.
                  The arcade shooter layers <strong>enemy patterns</strong>, telegraphs, and <em>juice</em> (screenshake, hitstop) for satisfying feedback.
                </p>
              </article>
            </div>
          </div>

          <div className="md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
            <RevealImage
              className="w-full"
              dir="right"
              src="https://cdn.mobygames.com/screenshots/16168810-jr-pac-man-arcade-the-dead-ghosts-eyes-return-to-base.png"
              alt=""
              caption={
                <>
                  <span className="img-caption">Pacman Project from AI Berkeley</span>
                </>
              }
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
                These projects demonstrate <strong>engineering depth</strong> (rules, search, physics) and <strong>player-first polish</strong>
                (telemetry, debugging, balance). They’re <strong>extensible</strong>—new levels, pieces, enemies, or maps drop in via data—
                and stable enough to teach from or evolve into full games.
              </p>
              <ul className="text-3 grid gap-2 mt-3">
                <li>✓ <strong>Chess (C++):</strong> full rules, Minimax/Alpha-Beta, iterative deepening, move ordering, PGN logs.</li>
                <li>✓ <strong>Arcade (C++):</strong> enemy waves, power-ups, boss phases, parallax, scoring/combos.</li>
                <li>✓ <strong>Pac-Man (Python):</strong> A*/BFS pathfinding, ghost FSM (chase/scatter/frightened), portals & pellets.</li>
                <li>✓ <strong>Lunar Lander (Python):</strong> gravity, thrust/rotation, collisions, fuel economy, graded landings.</li>
                <li>✓ <strong>Tooling:</strong> JSON data, debug overlays, fixed-delta loops, and quick balance passes.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS — Other Games */}
        <section className="skills-section mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-4 text-center">
            Skills
          </h2>

          {(() => {
            const SKILLS = [
              { label: "C++ (SDL/SFML)",        Icon: SoftwareIcon },
              { label: "Python / Pygame",        Icon: GameIcon },
              { label: "Minimax / Alpha-Beta",   Icon: GameIcon },
              { label: "A* / BFS Pathfinding",   Icon: intel },
              { label: "FSM / Behaviors",        Icon: LearningIcon },
              { label: "Physics & Collisions",   Icon: GameIcon },
              { label: "Level & Systems Design", Icon: GameIcon },
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
              See more game builds and technical write-ups in my{" "}
              <a className="see-publications underline underline-offset-4" href="https://github.com/mohammadhosseinkarimian">Github</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  </div>
);



}
