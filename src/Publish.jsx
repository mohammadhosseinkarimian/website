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
export default function Publish() {
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
            Publications — Causality & Responsibility
          </h1>
          <p className="text-2 mt-2 text-[clamp(1rem,2.6vw,1.35rem)]">
            Canadian AI 2025 (peer-reviewed) • AAAI-26 submission (under review)
          </p>
          <p className="text-3 mt-4 
          leading-relaxed  mx-auto text-center text-[clamp(.95rem,2.1vw,1.125rem)]">
            I co-authored work that <strong>formalizes actual causation</strong> for <strong>multi-agent synchronous games</strong> and advances
            <strong> responsibility attribution</strong> by uniting <em>causal</em> and <em>strategic</em> perspectives. The first paper defines <strong>minimal causal
            chains</strong> in Situation Calculus Synchronous Game Structures (SCSGS), handling <strong>preemption</strong> and
            <strong> over-determination</strong>. The second (submitted to AAAI-26) introduces <strong>causal, strategic, and combined</strong>
            responsibility with clear <strong>theoretical guarantees</strong> and illustrative scenarios.
          </p>
        </header>

        {/* SECTION 1 — image left, text right */}
        <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-first">
            <RevealImage
              className="w-full"
              dir="left"
              src="https://www.caiac.ca/sites/all/themes/canadianai/2025/images/home-strip-with-logos.png"
              alt=""
              caption={
                <>
                  <span className="img-caption  mx-auto text-center">Canadian AI 2025</span>
                </>
              }
            />
          </div>

          <div className="order-last">
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">Role & Scope</h2>
            <ul className="text-3 space-y-2 text-[clamp(.95rem,2vw,1.05rem)]">
              <li><strong>Canadian AI 2025:</strong> Co-authored “On the Semantics of Actual Causality in SCSGS,” defining <em>actual cause</em> for concurrent multi-agent ticks and introducing <strong>minimal causal chains</strong> that handle preemption and over-determination.</li>
              <li><strong>AAAI-26 submission (under review):</strong> “Causal, Strategic, and Combined Responsibility Attribution in SCSGS,” formalizing <strong>causal responsibility</strong>, <strong>strategic responsibility</strong> (active/passive; anticipation vs attribution), and a <strong>combined</strong> notion grounded in actual causation.</li>
              <li><strong>Contributions:</strong> formal modeling in SCSGS, proof sketches & properties, examples (e.g., attempted-murder scenario table), and camera-ready writing & figures.</li>
            </ul>

            <div className="flex flex-wrap gap-2 mt-4 text-3">
              <span className="px-3 py-1 rounded-full border border-white/10">Situation Calculus</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Synchronous Games</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Actual Causality</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Responsibility</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Preemption</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Over-determination</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Proofs</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Camera-ready</span>
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
                <h3 className="text-1 font-semibold">Actual causality in SCSGS (Canadian AI)</h3>
                <p className="text-3 mt-1">
                  Modeled effects over <strong>synchronous ticks</strong> where joint moves by multiple agents produce outcomes.
                  Introduced <strong>minimal moves causal chains</strong> to isolate the exact sets of moves that suffice, addressing both
                  <strong> preemption</strong> and <strong>over-determination</strong> cleanly in a formal action-theoretic setting.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Responsibility: causal, strategic, combined (AAAI-26)</h3>
                <p className="text-3 mt-1">
                  Defined <strong>causal responsibility</strong> via non-wait participation in a <strong>complete minimal causal chain</strong>;
                  distinguished <strong>passive/active strategic</strong> responsibility (anticipation vs attribution); and proved a
                  <strong> combined</strong> notion that requires both causal involvement and strategic consistency.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Properties & guarantees</h3>
                <p className="text-3 mt-1">
                  Proved that the notions are <strong>extensionally distinct</strong> (neither implies the other), and established
                  <strong> persistence</strong> results for both causal chains and responsibility under scenario extensions, plus temporal consistency between anticipation and attribution.
                </p>
              </article>
            </div>
          </div>

          <div className="md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
            <RevealImage
              className="w-full"
              dir="right"
              src="https://aivestra.com/wp-content/uploads/2025/07/aaai-registration-fees-332x221.jpg"
              alt=""
              caption={
                <>
                  <span className="img-caption">AAAI 2026</span>
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
                Together, these works give <strong>precise tools</strong> to separate “<em>what caused it</em>” from “<em>who is accountable</em>” in
                <strong> concurrent multi-agent systems</strong>. The causality paper provides the <strong>semantics and chains</strong> needed to trace
                effects; the responsibility submission layers <strong>accountability</strong> on top with clear definitions and theorems.
              </p>
              <p className="text-3 leading-relaxed mt-3">
                This foundation supports <strong>explainable, auditable AI</strong> in settings where many agents act at once—bridging the gap
                between <strong>theory</strong> and <strong>practical accountability</strong>.
              </p>
              <ul className="text-3 grid gap-2 mt-3">
                <li>✓ <strong>Actual causality (SCSGS):</strong> minimal causal chains; handles <em>preemption</em> & <em>over-determination</em>.</li>
                <li>✓ <strong>Responsibility (SCSGS):</strong> formal <em>causal</em>, <em>strategic</em>, and <em>combined</em> notions; worked examples.</li>
                <li>✓ <strong>Distinctness theorems:</strong> causal ≠ strategic (proven extensionally distinct).</li>
                <li>✓ <strong>Persistence & consistency:</strong> causal chains and passive responsibility persist under conditions; links between anticipation and attribution.</li>
                <li>✓ <strong>Peer-reviewed venue:</strong> Canadian AI 2025 camera-ready; AAAI-26 paper <em>under review</em>.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS — related to Publications */}
        <section className="skills-section mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-4 text-center">
            Skills
          </h2>

          {(() => {
            const SKILLS = [
              { label: "Situation Calculus",        Icon: EducationIcon },
              { label: "Multi-Agent Systems",       Icon: intel },
              { label: "Logic & Proofs",            Icon: intel },
              { label: "Causality (Actual Cause)",  Icon: intel },
              { label: "Responsibility Models",     Icon: intel },
              { label: "Theorem Sketching",         Icon: EducationIcon },
              { label: "Game Theories",      Icon: GameIcon },
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
              See my published{" "}
              <a className="see-publications underline underline-offset-4" href="http://www.cse.yorku.ca/~lesperan/papers/CanAI25.pdf">Paper</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  </div>
);







}
