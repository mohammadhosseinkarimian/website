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
export default function VR() {
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
            VR Escape — Haunted Asylum (Oculus • Unity)
          </h1>
          <p className="text-2 mt-2 text-[clamp(1rem,2.6vw,1.35rem)]">
            Puzzle Horror • Escape Room • 6DoF Interaction
          </p>
          <p className="text-3 mt-4 
          leading-relaxed  mx-auto text-center text-[clamp(.95rem,2.1vw,1.125rem)]">
            I built a <strong>virtual reality escape-room game</strong> for <strong>Oculus/Meta Quest</strong> in <strong>Unity</strong>—a haunted
            asylum with <strong>scripted puzzles</strong>, <strong>dynamic scares</strong>, and a tight <strong>gameplay loop</strong>. I assembled environments
            from high-quality <strong>Asset Store models</strong>, wrote all <strong>C#</strong> logic for interactions, pacing, jump-scare sequencing,
            and puzzle frameworks, and tuned performance for <strong>smooth VR framerates</strong> with baked lighting, occlusion culling,
            and spatial audio for presence.
          </p>
        </header>

        {/* SECTION 1 — image left, text right */}
        <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-first">
            <RevealImage
              className="w-full"
              dir="left"
              src="./images/vr2.png"
              alt=""
              caption={
                <>
                  <span className="img-caption  mx-auto text-center">In game footage</span>
                </>
              }
            />
          </div>

          <div className="order-last">
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">Role & Scope</h2>
            <ul className="text-3 space-y-2 text-[clamp(.95rem,2vw,1.05rem)]">
              <li><strong>Environment assembly:</strong> curated <em>Unity Asset Store</em> props/rooms; authored lightmaps, probes, and fog for mood.</li>
              <li><strong>Gameplay & systems:</strong> C# <em>puzzle framework</em> (keys/codes/circuits), <em>interaction</em> (grab/use), checkpoints, and hints.</li>
              <li><strong>Scare direction:</strong> event graph for <em>jump scares</em>, randomized timings, AI patrols, and tension ramp with safe rooms.</li>
              <li><strong>Locomotion & comfort:</strong> teleport/smooth locomotion, snap turn, vignette, and diegetic UI for menus/inventory.</li>
              <li><strong>Performance & build:</strong> occlusion culling, LODs, GPU instancing, Quest APK + PCVR builds, and QA playtests.</li>
            </ul>

            <div className="flex flex-wrap gap-2 mt-4 text-3">
              <span className="px-3 py-1 rounded-full border border-white/10">Unity</span>
              <span className="px-3 py-1 rounded-full border border-white/10">C#</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Oculus / Quest</span>
              <span className="px-3 py-1 rounded-full border border-white/10">XR Interaction</span>
              <span className="px-3 py-1 rounded-full border border-white/10">NavMesh</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Baked Lighting</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Occlusion Culling</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Spatial Audio</span>
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
                <h3 className="text-1 font-semibold">Immersion & performance</h3>
                <p className="text-3 mt-1">
                  Composed atmospheric spaces with <strong>baked GI</strong>, <strong>light probes</strong>, and <strong>volumetrics</strong>. Hit stable VR targets
                  using <strong>occlusion culling</strong>, <strong>LODs</strong>, batched materials, texture atlases, and <strong>GPU instancing</strong>—keeping
                  draw calls under budget for 72/90Hz comfort.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Interaction, locomotion & comfort</h3>
                <p className="text-3 mt-1">
                  Built on <strong>XR Interaction</strong>: physics grabs, sockets, ray/hand interactions, diegetic prompts. Offered <strong>teleport</strong> 
                  and <strong>smooth locomotion</strong> with snap turn and vignette options; diegetic inventory/notes to reduce UI friction.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Puzzles, AI & scare pacing</h3>
                <p className="text-3 mt-1">
                  Authored a reusable <strong>puzzle system</strong> (locks, codes, fuses, patterns) with event hooks. Directed scares via a 
                  <strong>finite-state “director”</strong>, randomized cues, and <strong>spatial audio</strong> (footsteps, whispers) to build tension without
                  cheap repetition; checkpoints + <em>hint drip</em> maintain flow.
                </p>
              </article>
            </div>
          </div>

          <div className="md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
             <RevealMedia
    className="w-full"
    dir="right"
  src={`${process.env.PUBLIC_URL}/images/vr.mp4`}
    poster="/images/vr1.png"
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
                Shipped a <strong>playable vertical slice</strong> (~20–30 min) that balances exploration, puzzle solving, and escalating
                horror beats. Stable performance on Quest with motion-comfort options keeps the experience intense but comfortable,
                while <strong>spatial audio</strong> and <strong>lighting</strong> sell the haunted asylum atmosphere.
              </p>
              <p className="text-3 leading-relaxed mt-3">
                The codebase is <strong>modular and extensible</strong>: new rooms, puzzles, and scare sequences drop in via events and
                scriptable objects. Builds produced for <strong>Quest APK</strong> and <strong>PCVR</strong>; playtest notes fed rapid polish passes.
              </p>
              <ul className="text-3 grid gap-2 mt-3">
                <li>✓ <strong>Vertical slice:</strong> start-to-exit loop with multiple puzzle types and branching scare triggers.</li>
                <li>✓ <strong>Comfort modes:</strong> teleport/smooth movement, snap turn, vignette, and diegetic menus.</li>
                <li>✓ <strong>Performance tuning:</strong> occlusion, LODs, batching, and lightmap baking for VR framerate.</li>
                <li>✓ <strong>Audio direction:</strong> spatialized cues and stingers synced to the scare director.</li>
                <li>✓ <strong>Reusable systems:</strong> puzzle framework, checkpoint/hint system, and event-driven scares.</li>
                <li>✓ <strong>Multi-target builds:</strong> Quest (APK) and PCVR with consistent interaction schema.</li>
                <li>✓ <strong>Documentation:</strong> scene setup guides, asset lists, and tuning checklists for new levels.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS — related to VR Escape */}
        <section className="skills-section mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-4 text-center">
            Skills
          </h2>

          {(() => {
            const SKILLS = [
              { label: "Unity (C#)",               Icon: SoftwareIcon },
              { label: "Oculus / Quest",           Icon: GameIcon },
              { label: "XR Interaction",           Icon: GameIcon },
              { label: "Lighting & GI",            Icon: GameIcon },
              { label: "Occlusion & LODs",         Icon: GameIcon },
              { label: "Spatial Audio",            Icon: SoftwareIcon },
              { label: "Game Design & Scripting",  Icon: GameIcon },
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
              See the whole game in my{" "}
              <a className="see-publications underline underline-offset-4" href="https://github.com/mohammadhosseinkarimian/EscapeRoomVR">Github</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  </div>
);




}
