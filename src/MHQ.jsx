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
export default function MHQ() {
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
            MHQ — Event-Driven App Automation
          </h1>
          <p className="text-2 mt-2 text-[clamp(1rem,2.6vw,1.35rem)]">
            Scenario Builder • Multi-App Orchestration • Safety Guardrails
          </p>
          <p className="text-3 mt-4 
          leading-relaxed  mx-auto text-center text-[clamp(.95rem,2.1vw,1.125rem)]">
            A web platform where users write <strong>scenarios</strong> that connect everyday apps to real-world <strong>events</strong>. 
            Example: “If I get an <strong>emergency call</strong> from my parent while I’m <strong>driving</strong> → <em>auto-text on WhatsApp</em> 
            and <em>dial 911</em>.” MHQ turns intent into <strong>safe, auditable automations</strong> with confirmations, fallbacks, 
            and clear logs—so powerful actions stay <strong>reliable</strong> and <strong>responsible</strong>.
          </p>
        </header>

        {/* SECTION 1 — image left, text right */}
        <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-first">
            <RevealImage
              className="w-full"
              dir="left"
              src="https://i0.wp.com/staceyoniot.com/wp-content/uploads/2019/05/IFTTT-Banner-2.png?resize=1280%2C640"
              alt=""
              caption={
                <>
                  <span className="img-caption  mx-auto text-center">IFTTT Website, the app that gave us the idea</span>
                </>
              }
            />
          </div>

          <div className="order-last">
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">Role & Scope</h2>
            <ul className="text-3 space-y-2 text-[clamp(.95rem,2vw,1.05rem)]">
              <li><strong>Scenario language & builder:</strong> triggers, conditions, and multi-step actions in a versioned JSON DSL with a visual editor.</li>
              <li><strong>Connectors to real apps:</strong> WhatsApp, Phone/SMS, Maps, Calendar via deep links, intents/URL schemes, webhooks, and background jobs.</li>
              <li><strong>Context awareness:</strong> driving mode, contact whitelists, time windows, location/geofences, rate limits, and debouncing.</li>
              <li><strong>Safety & permissions:</strong> explicit consent, confirmation for high-risk actions, dry-run previews, and <em>audit logs</em>.</li>
              <li><strong>Reliability engineering:</strong> retries with backoff, idempotency keys, transactional “all-or-nothing” groups, and offline queues.</li>
            </ul>

            <div className="flex flex-wrap gap-2 mt-4 text-3">
              <span className="px-3 py-1 rounded-full border border-white/10">Rules Engine</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Event Bus</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Webhooks</span>
              <span className="px-3 py-1 rounded-full border border-white/10">URL Schemes / Intents</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Geofencing</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Background Jobs</span>
              <span className="px-3 py-1 rounded-full border border-white/10">OAuth 2.0</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Auditability</span>
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
                <h3 className="text-1 font-semibold">Scenario DSL & engine</h3>
                <p className="text-3 mt-1">
                  Designed a <strong>JSON DSL</strong> for triggers (events), conditions (context), and actions (apps), with branching, 
                  parallel/series steps, timeouts, and timers. A <strong>visual builder</strong> plus a <em>simulator</em> lets users preview outcomes 
                  before enabling automations.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Connectors & device integrations</h3>
                <p className="text-3 mt-1">
                  Invoked apps via <strong>deep links</strong> and OS <strong>intents/URL schemes</strong> (e.g., <em>whatsapp:</em>, <em>tel:</em>, <em>sms:</em>), 
                  with <strong>fallbacks</strong> (e.g., SMS if WhatsApp unavailable). Managed permissions and structured messages; 
                  resolved contacts and respected user whitelists for emergencies.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Safety, reliability & observability</h3>
                <p className="text-3 mt-1">
                  Added <strong>confirmation gates</strong> for sensitive actions, <strong>retries/backoff</strong>, <strong>idempotency</strong>, 
                  and a <strong>dead-letter queue</strong>. Comprehensive <strong>logs</strong>, privacy-aware settings, and a clear <em>what happened & why</em> 
                  timeline keep automations <strong>trustworthy</strong>.
                </p>
              </article>
            </div>
          </div>

          <div className="md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
            <RevealImage
              className="w-full"
              dir="right"
              src="./images/BG.png"
              alt=""
              caption={
                <>
                  <span className="img-caption">A sample of scenario</span>
                </>
              }
            />
          </div>
        </section>

        {/* SECTION 3 — deeper narrative (no frosted backgrounds; removed 'At a glance') */}
        <section className="mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text:[clamp(1.25rem,3vw,1.75rem)] mb-3">
            Outcomes & impact
          </h2>

          <div className="grid md:grid-cols-1 gap-4 lg:gap-6">
            <div className="rounded-xl /10 p-5 shadow-lg">
              <p className="text-3 leading-relaxed">
                Users can express <strong>real-life safety logic</strong> in minutes. For the highlighted scenario—<em>emergency call from a parent while driving</em>—
                MHQ auto-sends a <strong>WhatsApp message</strong> and opens the <strong>Phone app to dial 911</strong>, with confirmations, fallbacks, 
                and a complete <strong>audit trail</strong>. The system is <strong>extensible</strong>, <strong>reliable</strong>, and easy to reason about.
              </p>
              <p className="text-3 leading-relaxed mt-3">
                The platform ships with a <strong>visual builder</strong>, robust <strong>scenario engine</strong>, and the guardrails needed for 
                <strong>responsible automation</strong>—so powerful actions happen exactly when (and only when) they should.
              </p>
              <ul className="text-3 grid gap-2 mt-3">
                <li>✓ <strong>Scenario builder:</strong> visual + JSON with branching, timers, and scheduling.</li>
                <li>✓ <strong>Event sources:</strong> calls/contacts, driving mode, time windows, location, battery/network.</li>
                <li>✓ <strong>Actions:</strong> WhatsApp/SMS, Phone dial, notifications, open apps, webhooks.</li>
                <li>✓ <strong>Safety guardrails:</strong> permissions, confirmations, emergency whitelists, dry-runs.</li>
                <li>✓ <strong>Reliability:</strong> retries, backoff, idempotency, offline queue, dead-letter.</li>
                <li>✓ <strong>Observability:</strong> step-by-step logs, explainable timelines, and exportable reports.</li>
                <li>✓ <strong>Extensibility:</strong> connector/plugin API for new apps with minimal boilerplate.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS — related to MHQ */}
        <section className="skills-section mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-4 text-center">
            Skills
          </h2>

          {(() => {
            const SKILLS = [
              { label: "React / TypeScript",        Icon: SoftwareIcon },
              { label: "Node.js (APIs & Jobs)",     Icon: SoftwareIcon },
              { label: "UI/UX Design",    Icon: LuBrush },
              { label: "Webhooks & OAuth2",         Icon: SoftwareIcon },
              { label: "URL Schemes / Intents",     Icon: SoftwareIcon },
              { label: "PWA / Service Workers",     Icon: SoftwareIcon },
              { label: "Logging & Audit Trails",    Icon: SoftwareIcon },
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
              <a className="see-publications underline underline-offset-4" href="https://github.com/mhq-dev/mhq-front">Github</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  </div>
);

}
