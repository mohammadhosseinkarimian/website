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
export default function Regina() {
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
            M.Sc. in Computer Science — University of Regina
          </h1>
          <p className="text-2 mt-2 text-[clamp(1rem,2.6vw,1.35rem)]">
            Causality • Responsibility • Machine Learning
          </p>
          <p className="text-3 mt-4 
          leading-relaxed  mx-auto text-center text-[clamp(.95rem,2.1vw,1.125rem)]">
            Graduate study focused on <strong>causality</strong> and <strong>responsibility</strong> in multi-agent systems—turning domain questions
            into <em>identifiable</em> estimands, proving properties, and shipping <strong>reproducible pipelines</strong>. I worked on formal
            models (SCSGS), co-authored papers (causality & responsibility), and built practical tooling so results are not only
            correct on paper but <strong>auditable and usable</strong> in code.
          </p>
        </header>

        {/* SECTION 1 — image left, text right */}
        <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-first">
            <RevealImage
              className="w-full"
              dir="left"
              src="https://www.uregina.ca/communications-marketing/assets/images/ur-logo/ur_logo_secondary_stacked_2colour_pantone-1500x1500.jpg"
              alt=""
              caption={
                <>
                  <span className="img-caption  mx-auto text-center">University of Regina icon</span>
                </>
              }
            />
          </div>

          <div className="order-last">
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">Role & Scope</h2>
            <ul className="text-3 space-y-2 text-[clamp(.95rem,2vw,1.05rem)]">
              <li><strong>Graduate research:</strong> formalized <em>actual causation</em> in synchronous multi-agent settings and connected it to <strong>responsibility</strong>.</li>
              <li><strong>Coursework & reading:</strong> advanced ML/RL, probabilistic modeling, optimization, and research methods—always tied to <em>replicable</em> experiments.</li>
              <li><strong>Engineering the research:</strong> DAGs to estimands, estimation pipelines (matching/weighting/DR), and <strong>assumption logs</strong> with sensitivity checks.</li>
              <li><strong>Scholarly output:</strong> co-authored a peer-reviewed <em>Canadian AI</em> paper and a follow-up submission expanding responsibility notions.</li>
            </ul>

            <div className="flex flex-wrap gap-2 mt-4 text-3">
              <span className="px-3 py-1 rounded-full border border-white/10">Causality</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Responsibility</span>
              <span className="px-3 py-1 rounded-full border border-white/10">SCSGS</span>
              <span className="px-3 py-1 rounded-full border border-white/10">DAGs</span>
              <span className="px-3 py-1 rounded-full border border-white/10">ATE / CATE</span>
              <span className="px-3 py-1 rounded-full border border-white/10">PyTorch</span>
              <span className="px-3 py-1 rounded-full border border-white/10">LaTeX</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Reproducibility</span>
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
                <h3 className="text-1 font-semibold">Research foundations → usable results</h3>
                <p className="text-3 mt-1">
                  Combined formal modeling (logic & proofs) with <strong>empirical pipelines</strong>. Each claim traced to code,
                  datasets, and <strong>assumption logs</strong> so conclusions are testable—not just theoretical.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Identification → Estimation → Validation</h3>
                <p className="text-3 mt-1">
                  From DAG-based estimands to estimators (matching, IPW, doubly-robust), then <strong>validate</strong> with balance,
                  overlap, placebo outcomes, negative controls, and sensitivity analyses for honest effect reports.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Writing, figures & dissemination</h3>
                <p className="text-3 mt-1">
                  Camera-ready <strong>LaTeX</strong>, clear tables/diagrams, and reproducible appendices. Kept repositories tidy with configs,
                  seeds, and notebooks to make review and extension easy.
                </p>
              </article>
            </div>
          </div>

          <div className="md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
            <RevealImage
              className="w-full"
              dir="right"
              src="https://www.uregina.ca/admissions/assets/hero/aerial_campus_1600.jpg"
              alt=""
              caption={
                <>
                  <span className="img-caption">University  of Regina</span>
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
                Built a <strong>research + engineering</strong> profile: formal definitions that stand up to proofs <em>and</em> code that
                stands up to reruns. The program culminated in publications and tools that help separate “what caused it”
                from “who is accountable” in concurrent settings.
              </p>
              <p className="text-3 leading-relaxed mt-3">
                The same discipline carries into my applied work: clean repos, calibrated results, and claims that are small,
                precise, and <strong>reproducible</strong>.
              </p>
              <ul className="text-3 grid gap-2 mt-3">
                <li>✓ <strong>Peer-reviewed paper:</strong> actual causality in synchronous games (Canadian AI, camera-ready).</li>
                <li>✓ <strong>Follow-up submission:</strong> causal, strategic, and combined responsibility (under review).</li>
                <li>✓ <strong>Research pipelines:</strong> identification → estimation → validation with assumption tracking.</li>
                <li>✓ <strong>Open artifacts:</strong> code, configs, and reproducible notebooks for reviewers and collaborators.</li>
                <li>✓ <strong>Graduate depth:</strong> ML/RL foundations integrated with formal reasoning and clear writing.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS — related to University of Regina M.Sc. */}
        <section className="skills-section mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-4 text-center">
            Skills
          </h2>

          {(() => {
            const SKILLS = [
              { label: "Artificial Intelligence",         Icon: intel },
              { label: "Responsibility Models",    Icon: LeadershipIcon },
              { label: "ML & RL",                  Icon: intel },
              { label: "Python / PyTorch",         Icon: SoftwareIcon },
              { label: "Game developer",  Icon: GameIcon },
              { label: "Research Publications",     Icon: EducationIcon },
              { label: "Instructor",   Icon: EducationIcon },
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
              See related projects to my master's in my{" "}
              <a className="see-publications underline underline-offset-4" href="https://www.linkedin.com/in/mohammadhossein-karimian/">LinkedIn</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  </div>
);







}
