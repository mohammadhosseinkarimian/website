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
export default function ResearchAssistant() {
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
            Research Assistant — Causality & Responsibility
          </h1>
          <p className="text-2 mt-2 text-[clamp(1rem,2.6vw,1.35rem)]">
            M.Sc. Computer Science, University of Regina
          </p>
          <p className="text-3 mt-4 
          leading-relaxed  mx-auto text-center text-[clamp(.95rem,2.1vw,1.125rem)]">
            I research on <strong>explainable</strong>, <strong>accountable</strong> AI by combining <strong>causality</strong> with <strong>responsibility anticipation and attribution</strong>. 
            Predictions alone aren’t enough—systems must say <em>what truly caused an outcome</em> and <em>who could be held to account</em>, 
            especially when multiple agents act <strong>concurrently</strong>. My work turns real questions into <strong>identifiable causal targets</strong>, 
            estimates effects with <strong>robust pipelines</strong>, and delivers <strong>auditable narratives</strong> that stand up to scrutiny.
          </p>
        </header>

        {/* SECTION 1 — image left, text right */}
        <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-first">
            <RevealImage
              className="w-full"
              dir="left"
              src="https://www.quantamagazine.org/wp-content/uploads/2018/05/Causality_2880x1655.jpg"
              alt="An example of Causality"
              caption={
                <>
                  <span className="img-caption  mx-auto text-center" >Causality</span>
                </>
              }
            />
          </div>

          <div className="order-last">
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">Role & Scope</h2>
            <ul className="text-3 space-y-2 text-[clamp(.95rem,2vw,1.05rem)]">
              <li><strong>Go beyond correlations:</strong> explain <em>why</em> outcomes happen, not just <em>whether</em> they will.</li>
              <li><strong>Design causal blueprints:</strong> translate domain questions into <strong>DAGs</strong> and valid adjustment sets so effects have precise meaning.</li>
              <li><strong>Engineer bulletproof pipelines:</strong> feature provenance, overlap checks, balance diagnostics, and bias audits for trustworthy evidence.</li>
              <li><strong>Make decisions auditable:</strong> log assumptions, do-calculus steps, and sensitivity analyses for transparent, reproducible findings.</li>
              <li><strong>Connect cause to accountability:</strong> link actions → agents → outcomes so responsibility can be assigned <em>fairly</em> in multi-agent settings.</li>
              <li><strong>Published Papers:</strong> I published two papers, one in Canadian AI and the other in AAAI, about using decicion making and find the causes in a concurrent domain, and also finding who is responsible.</li>
            </ul>

            <div className="flex flex-wrap gap-2 mt-4 text-3">
              <span className="px-3 py-1 rounded-full border border-white/10">DAGs</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Do-Calculus</span>
              <span className="px-3 py-1 rounded-full border border-white/10">ATE / CATE</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Matching</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Causality</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Reproducibility</span>
            </div>
          </div>
        </section>

        {/* SECTION 2 — Causality (text left, image right) */}
        <section className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">
              Causality
            </h2>

            <div className="grid gap-3 sm:gap-4">
              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Actual causation under concurrency</h3>
                <p className="text-3 mt-1">
                  I formalize <strong>actual causation</strong> when many agents act <strong>at the same time</strong>. 
                  For example, if a plane crashes, we want to understand what was the reason behind it and what caused it, to avoid future problems.
                  Working within synchronous game structures, I avoid turn-taking simplifications and capture how joint moves 
                  change the world. The result: <strong>precise “what caused what” statements</strong> that survive real system complexity.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Minimal causal chains & over-determination</h3>
                <p className="text-3 mt-1">
                  I isolate the <strong>smallest sets of actions</strong> that were <strong>sufficient</strong> for the effect—handling 
                  <em>preemption</em> (one event beats another) and <em>over-determination</em> (several alternatives each suffice). 
                  This makes causal attribution <strong>clean</strong> and <strong>defensible</strong> even when multiple paths exist.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Identification → Estimation → Validation</h3>
                <p className="text-3 mt-1">
                  I define the estimand from a <strong>DAG</strong>, estimate with <strong>matching/weighting/DR</strong>, and validate via 
                  <strong> balance checks</strong>, <strong> outcomes</strong>, <strong>negative controls</strong>, and <strong>sensitivity analyses</strong>. 
                  Every claim is tied to <strong>explicit assumptions</strong> and delivered with <strong>audit trails</strong>.
                </p>
              </article>
            </div>
          </div>

          <div className="md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
            <RevealImage
              className="w-full"
              dir="right"
              src="https://www.frontiersin.org/files/Articles/492625/fpsyg-11-01069-HTML/image_m/fpsyg-11-01069-g001.jpg"              
              alt=""
              style={{ maxHeight: "min(80%, 460px)" }}
              caption={
                <>
                  <span className="img-caption">Responsibility</span>
                </>
              }
            />
          </div>
        </section>

        {/* SECTION 3 — Responsibility (deeper narrative + checked list) */}
        <section className="mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-3">
            Responsibility in multi-agent systems
          </h2>

          <div className="grid md:grid-cols-1 gap-4 lg:gap-6">
            <div className="rounded-xl /10 p-5 shadow-lg">
              <p className="text-3 leading-relaxed">
                <strong>Responsibility</strong> goes a step beyond causation. It asks: given the choices available, 
                <strong> who should be held to account</strong>—for acting, or for failing to act? 
                I distinguish <em>causal responsibility</em> (what actually produced the outcome) from 
                <em> strategic responsibility</em> (what an agent <em>could</em> have done to ensure or prevent it), 
                then combine them for <strong>fair, transparent attribution</strong>.
              </p>
              <p className="text-3 leading-relaxed mt-3">
                In practice, I evaluate agents under two lenses. The <strong>causal lens</strong> credits the actions that truly changed the world. 
                The <strong>strategic lens</strong> audits the feasible alternatives at decision time—including doing nothing—and checks whether those 
                options would have changed the result. Together, the lenses deliver <strong>defensible accountability</strong> for complex, concurrent systems.
              </p>
              <ul className="text-3 grid gap-2 mt-3">
                <li>✓ <strong>Causal responsibility:</strong> pinpoint minimal action sets that produced the effect.</li>
                <li>✓ <strong>Strategic responsibility:</strong> analyze available choices and their counterfactual outcomes.</li>
                <li>✓ <strong>Combined attribution:</strong> align “what happened” with “who is accountable.”</li>
                <li>✓ <strong>Coalitions & concurrency:</strong> handle multi-agent, synchronous moves without ambiguity.</li>
                <li>✓ <strong>Preemption & over-determination:</strong> treat competing and redundant causes cleanly.</li>
                <li>✓ <strong>Reporting & auditability:</strong> deliver clear narratives with evidence trails and assumptions.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS — related to Research Assistant */}
        <section className="skills-section mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-4 text-center">
            Skills
          </h2>

          {/** Configure skills + icons here */}
          {(() => {
            const SKILLS = [
              { label: "Causality & SCSGS",         Icon: intel },
              { label: "Multi-Agent Modeling",       Icon: intel },
              { label: "Responsibility Attribution", Icon: intel },
              { label: "Game/Logic Reasoning",       Icon: GameIcon },
              { label: "Machine Learning",    Icon: intel },
              { label: "Teaching & Mentoring",       Icon: intel },
              { label: "Publications & Writing",     Icon: intel },
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
              See related write-ups and results in my{" "}
              <a className="see-publications underline underline-offset-4" href="/publish">Publications</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  </div>
);


}
