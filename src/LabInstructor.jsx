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
export default function LabInstructor() {
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
            Lab Instructor — Iran University of Science & Technology (IUST)
          </h1>
          <p className="text-2 mt-2 text-[clamp(1rem,2.6vw,1.35rem)]">
            Object-Oriented Programming • Teaching & Mentoring
          </p>
          <p className="text-3 mt-4 
          leading-relaxed  mx-auto text-center text-[clamp(.95rem,2.1vw,1.125rem)]">
            I ran <strong>hands-on OOP labs</strong> that turned theory into <strong>shippable code</strong>. 
            My focus: <strong>clean design</strong> (classes, interfaces, SOLID), <strong>practical tooling</strong> (Git/GitHub, build systems),
            and <strong>debugging discipline</strong>. I coached students through <strong>live coding</strong>, structured <strong>code reviews</strong>,
            and <strong>honest evaluation</strong>—so they left with habits that work in real projects.
          </p>
        </header>

        {/* SECTION 1 — image left, text right */}
        <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-first">
            <RevealImage
              className="w-full"
              dir="left"
              src="https://uregina.ca/~price11h/Publish/images/Lab%20pictures/ric7.jpg"
              alt="Code editor and tooling"
              caption={
                <>
                  <span className="img-caption  mx-auto text-center">University of Regina's lab</span>
                </>
              }
            />
          </div>

          <div className="order-last">
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">Role & Scope</h2>
            <ul className="text-3 space-y-2 text-[clamp(.95rem,2vw,1.05rem)]">
              <li><strong>Design lab experiences:</strong> weekly OOP exercises that build from classes/objects to interfaces, generics/templates, and design patterns.</li>
              <li><strong>Teach by doing:</strong> live-coding sessions, <em>step-through debugging</em>, and “fix-the-bug” clinics on real student code.</li>
              <li><strong>Set up real tooling:</strong> Git/GitHub workflows, project structure, Make/CMake or IDE tasks, unit testing, and linting.</li>
              <li><strong>Evaluate with clarity:</strong> rubrics, reproducible builds, and code reviews that reward readability, tests, and correctness.</li>
              <li><strong>Mentor & support:</strong> office hours, PR feedback, and targeted guidance for students at different skill levels.</li>
            </ul>

            <div className="flex flex-wrap gap-2 mt-4 text-3">
              <span className="px-3 py-1 rounded-full border border-white/10">Java / C++</span>
              <span className="px-3 py-1 rounded-full border border-white/10">OOP / SOLID</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Data Structures</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Git & GitHub Classroom</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Unit Testing</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Debugging</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Make/CMake</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Code Review</span>
            </div>
          </div>
        </section>

        {/* SECTION 2 — text left, image right; removed frosted backgrounds */}
        <section className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">
              Teaching practices that anchored my labs
            </h2>

            <div className="grid gap-3 sm:gap-4">
              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Hands-on OOP & design</h3>
                <p className="text-3 mt-1">
                  Scaffolded labs from <strong>classes/objects</strong> to <strong>interfaces/inheritance</strong>, composition over inheritance,
                  and <strong>SOLID</strong>. Students shipped small projects with <strong>readable APIs</strong>, <strong>encapsulation</strong>, and tests.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Tooling & reproducible envs</h3>
                <p className="text-3 mt-1">
                  Standardized toolchains (Git/GitHub, <strong>Make/CMake</strong> or IDE tasks), consistent folder structure, and
                  <strong> unit tests</strong> to catch regressions. Taught <em>how to debug</em>—breakpoints, watch variables, logs.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Assessment & feedback</h3>
                <p className="text-3 mt-1">
                  Clear rubrics (correctness, design, style, tests). PR-based <strong>code reviews</strong> and iterative feedback loops
                  so students practiced <strong>professional workflows</strong> and improved every lab.
                </p>
              </article>
            </div>
          </div>

          <div className="md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
            <RevealImage
              className="w-full"
              dir="right"
              src="https://t4.ftcdn.net/jpg/03/07/35/01/360_F_307350188_jpILxMKe44EjcLtpkU97HAtqcf6eb3xB.jpg"
              alt="Programming code"
              caption={
                <>
                  <span className="img-caption">Some animated picture to ensure you are not bored:)</span>
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
                Students left with <strong>industry-aligned habits</strong>: version control fluency, reproducible builds, 
                and the ability to <strong>debug under pressure</strong>. Projects compiled cleanly, passed tests, and were
                documented with clear READMEs and usage instructions. I kept the bar high but reachable—students could
                <strong> iterate, refactor, and resubmit</strong> based on precise feedback.
              </p>
              <p className="text-3 leading-relaxed mt-3">
                The result was a lab culture where <strong>correctness, readability, and testing</strong> mattered as much as output.
                That’s the bridge between classroom code and <strong>real-world software</strong>.
              </p>
              <ul className="text-3 grid gap-2 mt-3">
                <li>✓ <strong>Lab manuals & starter kits:</strong> consistent scaffolds for fast onboarding.</li>
                <li>✓ <strong>Git-first workflow:</strong> branching, PRs, and meaningful commit history.</li>
                <li>✓ <strong>Reproducible builds:</strong> Make/CMake or IDE tasks with documented commands.</li>
                <li>✓ <strong>Unit tests & debugging:</strong> test harnesses, breakpoints, logs, and assertions.</li>
                <li>✓ <strong>Rubrics & fairness:</strong> transparent grading with design/style criteria.</li>
                <li>✓ <strong>Mentorship:</strong> office hours, code reviews, and individualized guidance.</li>
                <li>✓ <strong>Documentation & handoff:</strong> READMEs, setup notes, and lab solutions for continuity.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS — related to Lab Instructor */}
        <section className="skills-section mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-4 text-center">
            Skills
          </h2>

          {(() => {
            const SKILLS = [
              { label: "Java / C++",               Icon: SoftwareIcon },
              { label: "OOP & SOLID",              Icon: EducationIcon },
              { label: "Git & Code Review",        Icon: EducationIcon },
              { label: "Unit Testing & Debugging", Icon: SoftwareIcon },
              { label: "Linux",        Icon: SoftwareIcon },
              { label: "Mentoring & Feedback",     Icon: LeadershipIcon },
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
         <section className="mt-12 md:mt-16">
          <div className="rounded-xl p-5 sm:p-6 shadow-lg flex flex-wrap items-center justify-between gap-3">
            <p className="text-3">
              See more descryption in my{" "}
              <a className="see-publications underline underline-offset-4" href="https://www.linkedin.com/in/mohammadhossein-karimian/">LinkedIn</a>.
            </p>
          </div>
        </section>

      </div>
    </main>
  </div>
);



}
