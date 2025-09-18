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
export default function ScrumMaster() {
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
            Scrum Master — Iran University of Science & Technology (IUST)
          </h1>
          <p className="text-2 mt-2 text-[clamp(1rem,2.6vw,1.35rem)]">
            Agile Delivery & Team Leadership
          </p>
          <p className="text-3 mt-4 
          leading-relaxed  mx-auto text-center text-[clamp(.95rem,2.1vw,1.125rem)]">
            I led cross-functional student engineering teams with a <strong>real shipping cadence</strong>: turning chaos into
            <strong> clear backlogs</strong>, <strong>predictable sprints</strong>, and <strong>measurable outcomes</strong>. I facilitated all core ceremonies,
            removed blockers at speed, coached on <strong>story writing</strong> and <strong>definition of done</strong>, and reported progress with
            <strong> honest, actionable metrics</strong> (velocity, burndown, cycle time). Result: an actual website that the tourleaders and people interested in that field can come up and talk, advertise or know each other, form communities and chat. Scrum helped my students to have a <strong>faster delivery</strong>, <strong>cleaner communication</strong>,
            and <strong>teams that improve every sprint</strong>.
          </p>
        </header>

        {/* SECTION 1 — image left, text right */}
        <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-first">
            <RevealImage
              className="w-full"
              dir="left"
              src="https://t2informatik.de/en/wp-content/uploads/sites/2/2023/01/scrum-master.png"
              alt="Scrum Master"
              caption={
                <>
                  <span className="img-caption  mx-auto text-center">Scrum Master (Wikimedia Commons)</span>
                </>
              }
            />
          </div>

          <div className="order-last">
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">Role & Scope</h2>
            <ul className="text-3 space-y-2 text-[clamp(.95rem,2vw,1.05rem)]">
              <li><strong>Facilitate the cadence:</strong> sprint planning, daily standups, reviews, and retros—on time, time-boxed, outcome-oriented.</li>
              <li><strong>Make work visible:</strong> backlog triage, story mapping, acceptance criteria, and WIP limits to protect flow.</li>
              <li><strong>Unblock delivery:</strong> remove impediments quickly; escalate risks early; align stakeholders and developers.</li>
              <li><strong>Coach the craft:</strong> estimation (story points), Definition of Ready/Done, PR guidelines, and quality gates.</li>
              <li><strong>Report with integrity:</strong> burndown/velocity/cycle-time dashboards; simple narratives stakeholders trust.</li>
            </ul>

            <div className="flex flex-wrap gap-2 mt-4 text-3">
              <span className="px-3 py-1 rounded-full border border-white/10">Scrum</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Agile</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Kanban</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Sprint Planning</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Backlog Refinement</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Burndown</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Retrospectives</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Jira/GitHub Projects</span>
            </div>
          </div>
        </section>

        {/* SECTION 2 — text left, image right; removed frosted backgrounds */}
        <section className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">
              Practices that anchored my work
            </h2>

            <div className="grid gap-3 sm:gap-4">
              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Cadence & flow</h3>
                <p className="text-3 mt-1">
                  Locked a <strong>stable sprint rhythm</strong> with clear working agreements, WIP limits, and a tough-but-fair
                  <strong> Definition of Done</strong>. Kept standups <strong>short and useful</strong>: blockers, plans, and commitments—not status theater.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Planning & prioritization</h3>
                <p className="text-3 mt-1">
                  Drove <strong>story slicing</strong>, estimation, and acceptance criteria. Partnered with product/stakeholders on
                  <strong> backlog ordering</strong> (value, risk, effort). Ensured each sprint goal was <strong>realistic and testable</strong>.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Metrics & continuous improvement</h3>
                <p className="text-3 mt-1">
                  Used <strong>burndown</strong>, <strong>velocity</strong>, and <strong>cycle/cumulative-flow</strong> to expose bottlenecks. Ran <strong>no-blame retros</strong>
                  with concrete experiments; tracked follow-ups to make improvement <strong>stick</strong> across sprints.
                </p>
              </article>
            </div>
          </div>

          <div className="md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
            <RevealImage
              className="w-full"
              dir="right"
              src="https://career.softserveinc.com/uploads/stories/what-is-scrum-methodology/scrum-process.jpg?1695042018536"
              alt=""
              caption={
                <>
                  <span className="img-caption">Scrum Process</span>
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
                Guided student teams to ship <strong>working software on a predictable cadence</strong>. Reduced cycle time by tightening WIP,
                improved <strong>on-time delivery</strong> with better slicing/estimation, and increased <strong>stakeholder confidence</strong> through
                concise, metric-backed updates. Established <strong>team rituals</strong> and <strong>lightweight playbooks</strong> that new members could adopt fast.
              </p>
              <p className="text-3 leading-relaxed mt-3">
                Outcomes included a <strong>functional web platform</strong> for real users, cleaner PR habits, and a culture of
                <strong> continuous improvement</strong>—turning lessons into measurable changes the very next sprint.
              </p>
              <ul className="text-3 grid gap-2 mt-3">
                <li>✓ <strong>Stable sprint cadence:</strong> predictable planning, crisp standups, focused reviews, actionable retros.</li>
                <li>✓ <strong>Backlog hygiene:</strong> stories with clear acceptance criteria; prioritized for value and risk.</li>
                <li>✓ <strong>Delivery metrics:</strong> burndown, velocity, cycle time, and cumulative flow for honest reporting.</li>
                <li>✓ <strong>Risk & blocker triage:</strong> impediments cleared quickly; escalation paths defined.</li>
                <li>✓ <strong>Quality gates:</strong> Definition of Done, PR review norms, and test-first mindsets.</li>
                <li>✓ <strong>Stakeholder alignment:</strong> transparent updates and demo-driven conversations.</li>
                <li>✓ <strong>Documentation & playbooks:</strong> onboarding guides, ceremony checklists, and retro action tracking.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS — related to Scrum Master */}
        <section className="skills-section mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-4 text-center">
            Skills
          </h2>

          {(() => {
            const SKILLS = [
              { label: "Scrum & Agile",            Icon: LeadershipIcon },
              { label: "Sprint Planning",          Icon: GameIcon },
              { label: "UI/UX Design",   Icon: LuBrush },
              { label: "GitHub Projects",   Icon: SoftwareIcon },
              { label: "Metrics & Burndown",       Icon: EducationIcon },
              { label: "Facilitation & Coaching",  Icon: TutoringIcon },
              { label: "Documentation & Playbooks",Icon: LearningIcon },
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
              <a className="see-publications underline underline-offset-4" href="https://github.com/IUST-Troy">Github</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  </div>
);


}
