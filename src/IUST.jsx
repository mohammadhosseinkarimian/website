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
  LuBrush,
  LuEarth
} from "react-icons/lu";
export default function IUST() {
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
            B.Sc. in Computer Science — Iran University of Science & Technology (IUST)
          </h1>
          <p className="text-2 mt-2 text-[clamp(1rem,2.6vw,1.35rem)]">
            Graduated June 2023 • Teaching & Leadership during studies
          </p>
          <p className="text-3 mt-4 
          leading-relaxed  mx-auto text-center text-[clamp(.95rem,2.1vw,1.125rem)]">
            I completed a <strong>rigorous Computer Science degree</strong> at <strong>IUST</strong>—learning how to turn ideas into systems
            that actually run. I didn’t just study; I <strong>taught labs</strong>, served as a <strong>Scrum Master</strong>, and shipped projects
            across <strong>algorithms</strong>, <strong>systems</strong>, and <strong>AI</strong>. My final year focused on <strong>reinforcement learning</strong> and building
            software that is robust, readable, and real.
          </p>
        </header>

        {/* SECTION 1 — image left, text right */}
        <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-first">
            <RevealImage
              className="w-full"
              dir="left"
              src="https://images.irantarh.com/pr:sharp/rs:fit:0:0:0/plain/s3:/uploads/designs/logo/dolat/1/84.jpg"
              alt=""
              caption={
                <>
                  <span className="img-caption  mx-auto text-center">Iran University of Science & Technology</span>
                </>
              }
            />
          </div>

          <div className="order-last">
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">Role & Scope</h2>
            <ul className="text-3 space-y-2 text-[clamp(.95rem,2vw,1.05rem)]">
              <li><strong>Solid CS core:</strong> mastered <em>data structures</em>, <em>algorithms</em>, <em>OS</em>, <em>DB</em>, <em>networks</em>, and <em>OOP</em>—with projects that compile and ship.</li>
              <li><strong>TA & Lab Instructor:</strong> led <em>Basic Programming/OOP labs</em> and assisted in <em>AI / Computational Intelligence / Software Design</em>; weekly sessions, grading, mentoring.</li>
              <li><strong>Leadership in delivery:</strong> acted as <em>Scrum Master</em> for student teams—planning, standups, reviews, retros—turning specs into working features.</li>
              <li><strong>Capstone focus:</strong> final bachelor project on <em>SITS in a Reinforcement Learning environment</em>, implementing and evaluating RL behavior.</li>
            </ul>

            <div className="flex flex-wrap gap-2 mt-4 text-3">
              <span className="px-3 py-1 rounded-full border border-white/10">Algorithms</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Data Structures</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Operating Systems</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Databases</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Computer Networks</span>
              <span className="px-3 py-1 rounded-full border border-white/10">OOP</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Reinforcement Learning</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Agile / Scrum</span>
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
                <h3 className="text-1 font-semibold">Problem-solving with the CS toolkit</h3>
                <p className="text-3 mt-1">
                  I solved real assignments with <strong>time–space tradeoffs</strong> in mind: picked the right data structure,
                  reasoned about complexity, and wrote tests until edge cases stopped biting. Code was <strong>readable</strong>,
                  <strong>modular</strong>, and ready for teammates to extend.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Engineering practices that scale</h3>
                <p className="text-3 mt-1">
                  Version control, code reviews, backlog slicing, and <strong>definition of done</strong>. For team projects I ran
                  <strong> lightweight Scrum</strong>—short sprints, demos, retros—so features shipped regularly with fewer surprises.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Applied AI & RL in projects</h3>
                <p className="text-3 mt-1">
                  Prototyped ML/RL ideas in coursework and the <strong>capstone</strong> (SITS in RL). Focused on <strong>reproducible experiments</strong>,
                  clear metrics, and readable reports so results were credible and repeatable.
                </p>
              </article>
            </div>
          </div>

          <div className="md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
            <RevealImage
              className="w-full"
              dir="right"
              src="https://static.neshanmap.ir/places/images/004/439054_1107476--%D8%AF%D8%A7%D9%86%D8%B4%DA%A9%D8%AF%D9%87-%D9%85%D9%87%D9%86%D8%AF%D8%B3%DB%8C-%DA%A9%D8%A7%D9%85%D9%BE%DB%8C%D9%88%D8%AA%D8%B1-%D8%AF%D8%A7%D9%86%D8%B4%DA%AF%D8%A7%D9%87-%D8%B9%D9%84%D9%85-%D9%88-%D8%B5%D9%86%D8%B9%D8%AA.jpeg"
              alt=""
              caption={
                <>
                  <span className="img-caption">Computer Science Building (IUST)</span>
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
                I left IUST with a <strong>professional toolkit</strong>: I can model, implement, test, and deliver. Teaching sharpened
                my fundamentals; <strong>Scrum leadership</strong> improved my team outcomes; and the capstone made me comfortable
                building and evaluating <strong>intelligent agents</strong>.
              </p>
              <p className="text-3 leading-relaxed mt-3">
                Most importantly, I learned to <strong>turn requirements into running software</strong>—and to explain the “why” as well
                as the “how”.
              </p>
              <ul className="text-3 grid gap-2 mt-3">
                <li>✓ <strong>TA & Lab Instructor:</strong> Basic Programming/OOP; assisted AI/Comp. Intelligence/Software Design (mentoring & grading).</li>
                <li>✓ <strong>Team delivery:</strong> led sprints and shipped features as Scrum Master in student projects.</li>
                <li>✓ <strong>Capstone RL project:</strong> SITS in a Reinforcement Learning environment, with clear metrics and reports.</li>
                <li>✓ <strong>Project portfolio:</strong> web apps, games, and security/crypto implementations during 2020–2023.</li>
                <li>✓ <strong>Strong CS core:</strong> algorithms, systems, databases, networks, and software engineering practices.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS — related to IUST B.Sc. */}
        <section className="skills-section mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-4 text-center">
            Skills
          </h2>

          {(() => {
            const SKILLS = [
              { label: "Algorithms & DS",        Icon: EducationIcon },
              { label: "Operating Systems",      Icon: HardwareIcon },
              { label: "Databases & SQL",        Icon: SoftwareIcon },
              { label: "Networks & Protocols",   Icon: LuEarth },
              { label: "OOP & Design",           Icon: LuBrush },
              { label: "Reinforcement Learning", Icon: intel },
              { label: "Agile / Scrum",          Icon: TutoringIcon },
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
              See related projects to my bachelor's in my{" "}
              <a className="see-publications underline underline-offset-4" href="https://www.linkedin.com/in/mohammadhossein-karimian/">LinkedIn</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  </div>
);





}
