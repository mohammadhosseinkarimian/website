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
export default function MBTIDetector() {
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
            MBTI Detector — Questionnaire & Rule-Based Inference
          </h1>
          <p className="text-2 mt-2 text-[clamp(1rem,2.6vw,1.35rem)]">
            20-Question Survey • Decision Tree • CSP Consistency
          </p>
          <p className="text-3 mt-4 
          leading-relaxed  mx-auto text-center text-[clamp(.95rem,2.1vw,1.125rem)]">
            I built an <strong>interactive MBTI app</strong> that asks <strong>20 targeted questions</strong> and infers both the <strong>16-type</strong> and the
            four axes (<em>E/I, S/N, T/F, J/P</em>). The engine combines a <strong>decision tree</strong> (for fast, interpretable routing)
            with a <strong>Constraint Satisfaction Problem (CSP)</strong> layer that enforces cross-question consistency and resolves
            ties. Results include the type, <strong>per-axis scores</strong>, and a short <strong>explanation</strong> of <em>why</em>.
          </p>
        </header>

        {/* SECTION 1 — image left, text right */}
        <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-first">
            <RevealImage
              className="w-full"
              dir="left"
              src="https://i.redd.it/kljk43qvqt871.jpg"
              alt=""
              caption={
                <>
                  <span className="img-caption  mx-auto text-center">MBTI Types</span>
                </>
              }
            />
          </div>

          <div className="order-last">
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">Role & Scope</h2>
            <ul className="text-3 space-y-2 text-[clamp(.95rem,2vw,1.05rem)]">
              <li><strong>Questionnaire design:</strong> wrote <em>20 concise items</em> balanced across the four MBTI axes; added reverse-keyed items to reduce bias.</li>
              <li><strong>Decision tree inference:</strong> branch logic maps answer patterns to <em>axis votes</em> and tentative 16-type candidates.</li>
              <li><strong>CSP consistency:</strong> constraints align axis votes with type candidates and resolve conflicts/ties deterministically.</li>
              <li><strong>Scoring & confidence:</strong> per-axis scores, margin-based confidence, and human-readable rationales.</li>
              <li><strong>UX & privacy:</strong> clear progress UI, immediate feedback, and local processing by default (no raw answer uploads).</li>
            </ul>

            <div className="flex flex-wrap gap-2 mt-4 text-3">
              <span className="px-3 py-1 rounded-full border border-white/10">Questionnaire</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Decision Tree</span>
              <span className="px-3 py-1 rounded-full border border-white/10">CSP</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Axis Scoring</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Explainability</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Confidence</span>
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
                <h3 className="text-1 font-semibold">Survey construction & scoring keys</h3>
                <p className="text-3 mt-1">
                  Crafted <strong>balanced items</strong> per axis with <em>reverse-keying</em> to counter acquiescence. Each answer increments
                  a signed score for its axis; neutral options dampen vote strength rather than forcing noise.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Decision tree → type candidates</h3>
                <p className="text-3 mt-1">
                  Implemented an interpretable <strong>decision tree</strong> that routes early high-signal questions to propose <em>type candidates</em>
                  while accumulating axis votes. This keeps the system <strong>fast</strong> and <strong>explainable</strong> for users and reviewers.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">CSP constraints & tie-breaking</h3>
                <p className="text-3 mt-1">
                  Framed <strong>consistency rules</strong> as a <strong>Constraint Satisfaction Problem</strong>: the final 16-type must agree with
                  majority axis votes; ties resolve by <em>confidence margins</em> and pre-declared soft constraints (e.g., stability across similar items).
                </p>
              </article>
            </div>
          </div>

          <div className="md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
            <RevealImage
              className="w-full"
              dir="right"
              src="./images/mbti.png"
              alt=""
              caption={
                <>
                  <span className="img-caption">Final results</span>
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
                The app produces a <strong>16-type result</strong> plus <strong>per-axis scores</strong>, a <strong>confidence estimate</strong>, and a short
                explanation citing the most influential questions. The combination of <em>decision tree</em> + <em>CSP</em> yields outputs that
                are <strong>fast, deterministic, and auditable</strong>—ideal for demos, classrooms, or quick self-assessments.
              </p>
              <p className="text-3 leading-relaxed mt-3">
                Everything is <strong>config-driven</strong>: questions, scoring keys, constraints, and copy can be updated without code changes.
              </p>
              <ul className="text-3 grid gap-2 mt-3">
                <li>✓ <strong>20-question survey:</strong> balanced across E/I, S/N, T/F, J/P with reverse-keyed items.</li>
                <li>✓ <strong>Decision tree core:</strong> interpretable routing to propose types early.</li>
                <li>✓ <strong>CSP layer:</strong> enforces consistency and resolves ties by margin rules.</li>
                <li>✓ <strong>Per-axis scoring:</strong> votes, margins, and overall confidence shown to users.</li>
                <li>✓ <strong>Explanations:</strong> highlights which answers drove the final inference.</li>
                <li>✓ <strong>Privacy-aware:</strong> local processing by default; no raw answer storage required.</li>
                <li>✓ <strong>Configurable:</strong> editable questions/weights/constraints without redeploys.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS — related to MBTI Questionnaire App */}
        <section className="skills-section mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-4 text-center">
            Skills
          </h2>

          {(() => {
            const SKILLS = [
              { label: "Decision Trees",         Icon: intel },
              { label: "Constraint Satisfaction",Icon: intel },
              { label: "Questionnaire Design",   Icon: SoftwareIcon },
              { label: "Scoring & Confidence",   Icon: EducationIcon },
              { label: "Explainable Results",    Icon: TutoringIcon },
              { label: "UX & Privacy",           Icon: SoftwareIcon },
              { label: "Reproducibility",        Icon: intel },
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
              <a className="see-publications underline underline-offset-4" href="https://github.com/mohammadhosseinkarimian">Github</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  </div>
);




}
