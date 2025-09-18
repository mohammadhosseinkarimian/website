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
export default function Flora() {
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
            Floral Designer — 3D Bouquet Builder & Recommender
          </h1>
          <p className="text-2 mt-2 text-[clamp(1rem,2.6vw,1.35rem)]">
            Real-Time 3D • Exact Flower/Basket Models • ML Suggestions
          </p>
          <p className="text-3 mt-4 
          leading-relaxed  mx-auto text-center text-[clamp(.95rem,2.1vw,1.125rem)]">
            A web app for designing <strong>3D bouquets</strong> from <strong>exact models</strong> of flowers and baskets, and for <strong>finding your favorite bouquet</strong>. 
            Users can arrange stems in real time, then answer a short <strong>questionnaire</strong>—an ML model recommends the <strong>right bouquet</strong> for the 
            occasion, relationship, color/style preferences, and budget. Design play meets <strong>personalized suggestions</strong>.
          </p>
        </header>

        {/* SECTION 1 — image left, text right */}
        <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-first">
            <RevealImage
              className="w-full"
              dir="left"
              src="./images/flora1.png"
              alt=""
              caption={
                <>
                  <span className="img-caption  mx-auto text-center">Flora Homepage</span>
                </>
              }
            />
          </div>

          <div className="order-last">
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">Role & Scope</h2>
            <ul className="text-3 space-y-2 text-[clamp(.95rem,2vw,1.05rem)]">
              <li><strong>3D configurator:</strong> real-time bouquet builder with <em>exact</em> GLTF models of flowers/baskets, snapping, and collision-aware placement.</li>
              <li><strong>Product data & search:</strong> flower metadata (color, stem length, seasonality, price) for fast filtering and <em>favorite</em> discovery.</li>
              <li><strong>Questionnaire → ML recs:</strong> occasion, relationship, palette, style, and budget feed a model that suggests the most fitting bouquet.</li>
              <li><strong>Share & save:</strong> export images/configs; save designs to revisit, compare, and purchase later.</li>
              <li><strong>Performance & UX:</strong> lazy loading, instancing, and simple controls so anyone can design beautifully in minutes.</li>
            </ul>

            <div className="flex flex-wrap gap-2 mt-4 text-3">
              <span className="px-3 py-1 rounded-full border border-white/10">Three.js</span>
              <span className="px-3 py-1 rounded-full border border-white/10">WebGL / GLTF</span>
              <span className="px-3 py-1 rounded-full border border-white/10">React</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Real-Time 3D</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Recommender</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Questionnaire</span>
              <span className="px-3 py-1 rounded-full border border-white/10">UX / Accessibility</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Performance</span>
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
                <h3 className="text-1 font-semibold">Exact 3D assets & real-time rendering</h3>
                <p className="text-3 mt-1">
                  Modeled flowers and baskets with <strong>physically-based materials</strong>; exported <strong>GLTF/GLB</strong> with LODs and custom metadata 
                  (stem length, attachment points). Implemented <strong>Three.js</strong> scene with instancing, shadows, and orbit/drag controls for fluid arranging.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Configurator UX & constraints</h3>
                <p className="text-3 mt-1">
                  Snapping to basket sockets, stem collision hints, grid/arc guides, and palette presets (romantic, pastel, bold). 
                  Search/filter by color, species, price, season, and <strong>favorite</strong> tagging to speed up discovery.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Questionnaire → ML recommendations</h3>
                <p className="text-3 mt-1">
                  Short form captures <em>occasion</em>, <em>relationship</em>, <em>style</em>, <em>palette</em>, and <em>budget</em>. 
                  Trained a lightweight <strong>recommender</strong> (tree-based / shallow NN) on historical choices + item attributes to return 
                  ranked bouquets; includes <strong>explanations</strong> (“picked romantic palette for anniversary + roses preference”).
                </p>
              </article>
            </div>
          </div>

          <div className="md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
            <RevealImage
              className="w-full"
              dir="right"
              src="./images/flora2.png"
              alt=""
              caption={
                <>
                  <span className="img-caption">The page for creating 3d bouquet</span>
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
                Shipped a <strong>fast, playful 3D bouquet builder</strong> where anyone can compose professional-looking designs and discover a 
                <strong>favorite bouquet</strong> in minutes. The ML questionnaire turns intent into <strong>personalized suggestions</strong>—making choice 
                easier and more delightful—while the configurator keeps full creative control.
              </p>
              <p className="text-3 leading-relaxed mt-3">
                The stack is <strong>reproducible</strong> and <strong>extensible</strong>: add new flowers as GLTFs, tweak palettes, and update the model as 
                preferences evolve. Clear reports show what the recommender considered, keeping suggestions <strong>transparent</strong>.
              </p>
              <ul className="text-3 grid gap-2 mt-3">
                <li>✓ <strong>Exact 3D assets:</strong> GLTF flowers/baskets with PBR, LODs, and metadata.</li>
                <li>✓ <strong>Real-time configurator:</strong> snapping, collision hints, palette presets, and smooth controls.</li>
                <li>✓ <strong>Search & favorites:</strong> fast filtering by color/species/price/season; save and compare designs.</li>
                <li>✓ <strong>Questionnaire recommender:</strong> ranked bouquets with brief, human-readable explanations.</li>
                <li>✓ <strong>Performance:</strong> lazy loading, instancing, and asset compression for quick first paint.</li>
                <li>✓ <strong>Share/export:</strong> screenshots/config JSON for handoff or future edits.</li>
                <li>✓ <strong>Documentation:</strong> asset pipeline, metadata schema, and model training notes.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS — related to Floral Designer */}
        <section className="skills-section mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-4 text-center">
            Skills
          </h2>

          {(() => {
            const SKILLS = [
              { label: "Three.js / WebGL",         Icon: SoftwareIcon },
              { label: "UI/UX Design",        Icon: LuBrush },
              { label: "React (Configurator)",     Icon: SoftwareIcon },
              { label: "Recommender Systems",      Icon: EducationIcon },
              { label: "Decision Tree",     Icon: intel },
              { label: "Software Developement",    Icon: SoftwareIcon },
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
