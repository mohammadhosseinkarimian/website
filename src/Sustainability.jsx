// ResearchAssistant.jsx — previous version + centered title, RevealImage animations fixed
import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import PainterlyBackground from "./PainterlyBackground";
import NavBar from "./NavBar";
import RevealImage from "./RevealImage";
import {
  LuBrush as design,
  LuKey,
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
export default function Sustainability() {
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
            Sustainability — Assistive & Smart-Home System
          </h1>
          <p className="text-2 mt-2 text-[clamp(1rem,2.6vw,1.35rem)]">
            Assistive Vision • Food Health Scanner • Smart Fridge • Home Awareness
          </p>
          <p className="text-3 mt-4 
          leading-relaxed  mx-auto text-center text-[clamp(.95rem,2.1vw,1.125rem)]">
            I built a four-part <strong>sustainability & safety</strong> project: (1) an <strong>assistive obstacle detector</strong> that warns blind/low-vision users, 
            (2) a <strong>food health scanner</strong> that rates products when you scan them, (3) a <strong>smart-fridge watcher</strong> that flags spoilage early, 
            and (4) a <strong>home awareness</strong> module that detects <em>open water</em> and <em>left-on lights</em> to save resources. One platform, four practical wins.
          </p>
        </header>

        {/* SECTION 1 — image left, text right */}
        <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-first">
            <RevealImage
              className="w-full"
              dir="left"
              src="https://markovate.com/wp-content/uploads/2023/04/The-Role-of-AI-and-ML-in-Energy-and-Environmental-Sustainability.webp"
              alt=""
              caption={
                <>
                  <span className="img-caption  mx-auto text-center">Sustainability in AI</span>
                </>
              }
            />
          </div>

          <div className="order-last">
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">Role & Scope</h2>
            <ul className="text-3 space-y-2 text-[clamp(.95rem,2vw,1.05rem)]">
              <li><strong>Assistive obstacle detection:</strong> camera/sensor fusion finds nearby obstacles and <em>speaks</em> concise warnings in real time (distance, direction).</li>
              <li><strong>Food health scanner:</strong> scan a barcode or label; the app parses ingredients/nutrition and returns a <em>health score</em> with simple guidance.</li>
              <li><strong>Smart fridge monitoring:</strong> shelf camera + sensors track freshness and temperature; suspicious color/texture change → <em>notify before it spoils</em>.</li>
              <li><strong>Home awareness (water & lights):</strong> detect running taps and lights left on; raise alerts and suggest actions to <em>save water and power</em>.</li>
              <li><strong>Privacy-by-design:</strong> on-device processing where possible, minimal data retention, and clear opt-ins for any cloud features.</li>
            </ul>

            <div className="flex flex-wrap gap-2 mt-4 text-3">
              <span className="px-3 py-1 rounded-full border border-white/10">Computer Vision</span>
              <span className="px-3 py-1 rounded-full border border-white/10">OCR / Barcode</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Edge AI</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Text-to-Speech</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Spoilage Detection</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Sensors (Temp/VOC)</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Home Automation</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Energy & Water Savings</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Privacy</span>
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
                <h3 className="text-1 font-semibold">Assistive vision & guidance</h3>
                <p className="text-3 mt-1">
                  Lightweight object detection (mobile-friendly) with <strong>range cues</strong> (stereo/depth proxy or ultrasonic) converts scenes into 
                  <strong>spoken directions</strong> (“chair at 2 meters, left”). Latency kept low so guidance is timely and safe outdoors/indoors.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Food scoring & fridge freshness</h3>
                <p className="text-3 mt-1">
                  <strong>OCR/barcode</strong> reads labels; a rule/ML hybrid maps nutrients/ingredients to a clear <strong>health score</strong>. 
                  In the fridge, a shelf camera + <strong>temperature/VOC</strong> signals track freshness; color/texture drift triggers <em>early</em> reminders.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Home awareness & automation hooks</h3>
                <p className="text-3 mt-1">
                  Detect <strong>running water</strong> (visual flow patterns / microphone cue) and <strong>lights-on</strong> via luminance. 
                  Notifications and optional <em>automation hooks</em> integrate with routines to shut things off or ping the user politely.
                </p>
              </article>
            </div>
          </div>

          <div className="md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
            <RevealImage
              className="w-full"
              dir="right"
              src="./images/s1.png"
              alt="Smart meter schematic"
              caption={
                <>
                  <span className="img-caption">Web page for my designed app</span>
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
                The system makes homes <strong>safer, healthier, and less wasteful</strong>: real-time obstacle warnings, clearer nutrition choices,
                fewer spoiled items, and fewer taps/lights left on. It’s practical, <strong>privacy-aware</strong>, and designed to run reliably on everyday devices.
              </p>
              <p className="text-3 leading-relaxed mt-3">
                Each module is <strong>config-driven</strong> and <strong>extensible</strong>—new product rules, sensors, or automation targets can be added without rewriting the core.
              </p>
              <ul className="text-3 grid gap-2 mt-3">
                <li>✓ <strong>Assistive guidance:</strong> obstacle detection with concise text-to-speech prompts.</li>
                <li>✓ <strong>Food health scanner:</strong> barcode/OCR → simple health score and advice.</li>
                <li>✓ <strong>Smart fridge:</strong> freshness tracking and <em>early</em> spoilage alerts to cut waste.</li>
                <li>✓ <strong>Water & light detection:</strong> alerts when taps run or lights are left on.</li>
                <li>✓ <strong>Resource savings:</strong> supports energy/water reduction with minimal user effort.</li>
                <li>✓ <strong>Privacy & reliability:</strong> on-device processing where possible; clear opt-ins for cloud.</li>
                <li>✓ <strong>Docs & handoff:</strong> setup guides, calibration steps, and extension points for new hardware.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS — related to Sustainability */}
        <section className="skills-section mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-4 text-center">
            Skills
          </h2>

          {/** Configure skills + icons here */}
          {(() => {
            const SKILLS = [
              { label: "Computer Vision (Edge)",   Icon: intel },
              { label: "OCR / Barcode Parsing",    Icon: intel },
              { label: "Sensors (Temp/VOC)",       Icon: HardwareIcon },
              { label: "Text-to-Speech UX",        Icon: intel },
              { label: "Home Automation Hooks",    Icon: intel },
              { label: "Privacy & On-Device AI",   Icon: LuKey },
              { label: "Monitoring & Alerts",      Icon: LuKey },
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
              <a className="see-publications underline underline-offset-4" href="https://github.com/mohammadhosseinkarimian/Sustainable_Life_Style">Github</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  </div>
);



}
