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
  LuKey,
  LuBrush
} from "react-icons/lu";
export default function TourGuide () {
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
            Tour Guide — Community Platform for Leaders & Travelers (Scrum Master)
          </h1>
          <p className="text-2 mt-2 text-[clamp(1rem,2.6vw,1.35rem)]">
            Team Facilitation • Listings & Profiles • Realtime Chat
          </p>
          <p className="text-3 mt-4 
          leading-relaxed  mx-auto text-center text-[clamp(.95rem,2.1vw,1.125rem)]">
            I served as the <strong>Scrum Master</strong> for a cross-functional team building a platform where <strong>tour leaders</strong> 
            showcase their tours and <strong>travelers</strong> discover, connect, form <strong>groups/communities</strong>, and <strong>chat</strong>. 
            We turned scattered conversations into a <strong>single, trusted space</strong>—with searchable listings, leader profiles, 
            messaging, and community features that help people <strong>meet up and go</strong>.
          </p>
        </header>

        {/* SECTION 1 — image left, text right */}
        <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-first">
            <RevealImage
              className="w-full"
              dir="left"
              src="./images/tour1.png"
              alt="Hiker pictogram"
              caption={
                <>
                  <span className="img-caption  mx-auto text-center">TourGuide Landing Page</span>
                </>
              }
            />
          </div>

          <div className="order-last">
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">Role & Scope</h2>
            <ul className="text-3 space-y-2 text-[clamp(.95rem,2vw,1.05rem)]">
              <li><strong>Facilitated delivery:</strong> sprint planning, standups, reviews, and retros with tight <em>Definition of Done</em> and clear sprint goals.</li>
              <li><strong>Shaped the MVP:</strong> tour <strong>listings</strong>, leader <strong>profiles</strong>, traveler <strong>accounts</strong>, interest/DMs, and group <strong>chat</strong>.</li>
              <li><strong>Backlog & prioritization:</strong> value/risk slicing, acceptance criteria, and a roadmap aligned with stakeholder milestones.</li>
              <li><strong>Quality & flow:</strong> WIP limits, bug triage, release checklists, and demo-driven feedback loops to keep momentum honest.</li>
              <li><strong>Safety & trust:</strong> profile verification hooks, report/moderation flows, and privacy-first messaging defaults.</li>
            </ul>

            <div className="flex flex-wrap gap-2 mt-4 text-3">
              <span className="px-3 py-1 rounded-full border border-white/10">Scrum</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Kanban</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Backlog Refinement</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Listings</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Profiles</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Realtime Chat</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Groups & Community</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Moderation</span>
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
                <h3 className="text-1 font-semibold">Cadence, focus, and flow</h3>
                <p className="text-3 mt-1">
                  Locked a predictable sprint rhythm with crisp <strong>DoR/DoD</strong>, time-boxed ceremonies, and a visual risk board. 
                  Enforced WIP limits and small, testable slices so every increment could be demoed to real stakeholders.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Product & UX foundations</h3>
                <p className="text-3 mt-1">
                  Partnered on IA and flows for <strong>tour pages</strong>, <strong>leader profiles</strong>, discovery/search, 
                  <strong>DMs & group chats</strong>, and community guidelines. Built funnels for “discover → contact → group join” 
                  with notifications that nudge but don’t spam.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Quality, safety & observability</h3>
                <p className="text-3 mt-1">
                  Coordinated CI checks, release gates, and <strong>moderation/report</strong> workflows. 
                  Drove metrics reviews (activation, message starts, group formation rate) and ran <strong>no-blame retros</strong> with concrete experiments.
                </p>
              </article>
            </div>
          </div>

          <div className="md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
            <RevealImage
              className="w-full"
              dir="right"
              src="./images/tour2.png"
              alt=""
              caption={
                <>
                  <span className="img-caption">Tour Lists</span>
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
                We shipped an <strong>MVP that connects people</strong>: leaders publish compelling tour pages, travelers search and follow, 
                start <strong>DMs</strong>, form <strong>groups</strong>, and chat in real time. Clear verification and reporting increased trust; 
                transparent release notes and demo cadence kept stakeholders engaged and unblocked decisions.
              </p>
              <p className="text-3 leading-relaxed mt-3">
                The team matured from ad-hoc tasks to <strong>predictable delivery</strong> with honest metrics and lightweight playbooks— 
                a foundation for growing features (bookings, reviews, payments) without losing quality.
              </p>
              <ul className="text-3 grid gap-2 mt-3">
                <li>✓ <strong>Leader profiles & tour listings:</strong> searchable, sharable pages with media and availability.</li>
                <li>✓ <strong>Interest & contact:</strong> DM starts, message requests, and safe defaults for privacy.</li>
                <li>✓ <strong>Groups & chat:</strong> create/join groups, realtime conversations, and notification settings.</li>
                <li>✓ <strong>Community guidelines:</strong> report, block, and moderation queues with audit trails.</li>
                <li>✓ <strong>Delivery discipline:</strong> sprint goals, release checklists, and demo-driven feedback.</li>
                <li>✓ <strong>Metrics & retros:</strong> activation, group formation, message starts, and cycle time.</li>
                <li>✓ <strong>Docs & onboarding:</strong> ceremony checklists, contribution guide, and quickstart runbooks.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS — related to Tour Guide (Scrum Master) */}
        <section className="skills-section mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-4 text-center">
            Skills
          </h2>

          {(() => {
            const SKILLS = [
              { label: "Scrum & Agile",             Icon: LeadershipIcon },
              { label: "Backlog Prioritization",    Icon: SoftwareIcon },
              { label: "Roadmapping & MVP",         Icon: LearningIcon },
              { label: "Realtime Chat Patterns",    Icon: SoftwareIcon },
              { label: "UI/UX Design",        Icon: LuBrush },
              { label: "Moderation & Safety",       Icon: LuKey },
              { label: "Metrics & Facilitation",    Icon: TutoringIcon },
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
