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
export default function ImageProcessing() {
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
            Machine Learning Intern — K. N. Toosi University of Technology
          </h1>
          <p className="text-2 mt-2 text-[clamp(1rem,2.6vw,1.35rem)]">
            Computer Vision & Deep Learning
          </p>
          <p className="text-3 mt-4 
                    leading-relaxed  mx-auto text-center text-[clamp(.95rem,2.1vw,1.125rem)]">
                      I worked in K.N. Toosi and improved their machine vision pipelines. The goal was to use Image processing and <strong> transfer learning</strong> to build a system that can recognize dogs and cats from each other. I focus on
                      <strong> clean data → robust training loops → honest metrics → reproducible results</strong>, with
                      <strong> explainability</strong> (Grad-CAM) and <strong>error analysis</strong> to make improvements obvious and actionable.
                    </p>
                  </header>
          
                  {/* SECTION 1 — image left, text right */}
                  <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="order-first">
                      <RevealImage
                        className="w-full"
                        dir="left"
                        src="https://letstalkscience.ca/sites/default/files/2021-01/Robot_thinking.jpg"
                        alt=""
                        caption={
                          <>
                            <span className="img-caption  mx-auto text-center">Machine Learning</span>
                          </>
                        }
                      />
                    </div>
          
                    <div className="order-last">
                      <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">Role & Scope</h2>
                      <ul className="text-3 space-y-2 text-[clamp(.95rem,2vw,1.05rem)]">
                        <li><strong>Prepare data:</strong>I cleaned labels, built stratified splits, and designed <strong>augmentations</strong> for real-world robustness.</li>
                        <li><strong>Build training pipelines:</strong> reproducible <strong>PyTorch</strong> loops with configs, seeding, checkpoints, and tidy experiment structure.</li>
                        <li><strong>Leverage transfer learning:</strong> fine-tuned strong CNN backbones; tuned LR schedules, regularization, and early-stopping for stability.</li>
                        <li><strong>Evaluate honestly:</strong> accuracy/F1, confusion matrices, classwise breakdowns, and targeted error analysis to surface failure modes.</li>
                        <li><strong>Explain & handoff:</strong> Grad-CAM insights, readable reports, and <strong>export-ready</strong> models for downstream integration.</li>
                      </ul>
          
                      <div className="flex flex-wrap gap-2 mt-4 text-3">
                        <span className="px-3 py-1 rounded-full border border-white/10">PyTorch</span>
                        <span className="px-3 py-1 rounded-full border border-white/10">CNNs</span>
                        <span className="px-3 py-1 rounded-full border border-white/10">Transfer Learning</span>
                        <span className="px-3 py-1 rounded-full border border-white/10">Data Augmentation</span>
                        <span className="px-3 py-1 rounded-full border border-white/10">Evaluation & F1</span>
                        <span className="px-3 py-1 rounded-full border border-white/10">Confusion Matrix</span>
                        <span className="px-3 py-1 rounded-full border border-white/10">Grad-CAM</span>
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
                          <h3 className="text-1 font-semibold">Data & augmentation</h3>
                          <p className="text-3 mt-1">
                            Built <strong>clean splits</strong> with class balance; designed <strong>augmentations</strong> (random crop/flip, color jitter, mild blur)
                            to simulate capture conditions. Reduced overfitting and improved out-of-distribution robustness.
                          </p>
                        </article>
          
                        <article className="rounded-xl /10 p-4 shadow-lg">
                          <h3 className="text-1 font-semibold">Modeling & training</h3>
                          <p className="text-3 mt-1">
                            Fine-tuned strong <strong>CNN backbones</strong> with <strong>transfer learning</strong>; stabilized training via <strong>AdamW</strong>,
                            <strong> cosine schedules</strong>, gradient clipping, and early stopping. <strong>Config-driven</strong> runs for easy replication.
                          </p>
                        </article>
          
                        <article className="rounded-xl /10 p-4 shadow-lg">
                          <h3 className="text-1 font-semibold">Evaluation</h3>
                          <p className="text-3 mt-1">
                           Evaluated the trained code, to check and confirm will the code recognize the pictures in the database to underestnad if they are cat, or dog</p>
                        </article>
                      </div>
                    </div>
          
                    <div className="md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
                      <RevealImage
                        className="w-full"
                        dir="right"
                        src="https://www.mocomakers.com/wp-content/uploads/2018/02/Cat-and-Dog.png"
                        alt=""
                        caption={
                          <>
                            <span className="img-caption">Classifying dogs and cats</span>
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
                          Delivered a <strong>robust image-classification baseline</strong> with clean data handling, transfer learning,
                          and rigorous evaluation. The pipeline is <strong>reproducible</strong> and <strong>extensible</strong>—ready for new classes,
                          larger datasets, and further fine-tuning. Explainability via <strong>Grad-CAM</strong> exposed failure modes,
                          guiding dataset fixes and better augmentation. Models shipped in an <strong>export-ready</strong> state for integration.
                        </p>
                        <p className="text-3 leading-relaxed mt-3">
                          The emphasis is <strong>clarity under pressure</strong>: honest metrics, readable reports, and choices you can trace
                          from input to output. It’s a template for small teams to iterate quickly without losing rigor.
                        </p>
                        <ul className="text-3 grid gap-2 mt-3">
                          <li>✓ <strong>End-to-end PyTorch pipeline:</strong> configs, seeding, checkpoints, clean training loops.</li>
                          <li>✓ <strong>Data curation & augmentation:</strong> balanced splits; effective transforms for generalization.</li>
                          <li>✓ <strong>Transfer learning:</strong> stable fine-tuning with robust schedulers and regularization.</li>
                          <li>✓ <strong>Evaluation you can trust:</strong> accuracy/F1, confusion matrices, classwise insights.</li>
                          <li>✓ <strong>Explainability:</strong> Grad-CAM visualizations for failure analysis and stakeholder clarity.</li>
                          <li>✓ <strong>Export-ready models:</strong> prepared for TorchScript/ONNX-style workflows and reuse.</li>
                          <li>✓ <strong>Documentation & handoff:</strong> clear guides, next-step recommendations, reproducible results.</li>
                        </ul>
                      </div>
                    </div>
                  </section>
          
                  {/* SKILLS — related to ML Internship */}
                  <section className="skills-section mt-12 md:mt-16">
                    <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-4 text-center">
                      Skills
                    </h2>
          
                    {(() => {
                      const SKILLS = [
                        { label: "Computer Vision",            Icon: intel },
                        { label: "PyTorch",                    Icon: intel },
                        { label: "CNNs & Transfer Learning",   Icon: intel },
                        { label: "Data Augmentation",          Icon: intel },
                        { label: "Evaluation & F1",            Icon: LeadershipIcon },
                        { label: "Grad-CAM & Explainability",  Icon: intel },
                        { label: "Python",                     Icon: intel },
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
                        <a className="see-publications underline underline-offset-4" href="https://github.com/mohammadhosseinkarimian/Image_Processing">Github</a>.
                      </p>
                    </div>
                  </section>
                </div>
              </main>
            </div>
          );
          
          
          
          }
          