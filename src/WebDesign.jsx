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
export default function WebDesign() {
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
            EcomSpiders — Front-End Developer & UI/UX Designer
          </h1>
          <p className="text-2 mt-2 text-[clamp(1rem,2.6vw,1.35rem)]">
            Shopify Design & Development • 1 year (full-time)
          </p>
          <p className="text-3 mt-4 
          leading-relaxed  mx-auto text-center text-[clamp(.95rem,2.1vw,1.125rem)]">
            I spent a full year helping EcomSpiders craft <strong>conversion-ready websites</strong> with clean UI,
            fast UX, and maintainable code. My work blended <strong>design</strong> with <strong>theme development</strong>
            so stores become readable, accessible, and optimized for real shoppers.
          </p>
        </header>

        {/* SECTION 1 — image left, text right */}
        <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-first">
            <RevealImage
              className="w-full"
              dir="left"
              src="./images/ecom.png"
              alt=""
              caption={
                <>
                  <span className="img-caption  mx-auto text-center">E-commerce Spiders page</span>
                </>
              }
            />
          </div>

          <div className="order-last">
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">Role & Scope</h2>
            <ul className="text-3 space-y-2 text-[clamp(.95rem,2vw,1.05rem)]">
              <li><strong>Theme development:</strong> Shopify sections, Liquid/JSON templates, metafields, and schema for <em>modular</em> pages.</li>
              <li><strong>UI/UX design:</strong> wireframes → hi-fi in Figma, design tokens, responsive breakpoints, and micro-interactions that guide buyers.</li>
              <li><strong>Performance & accessibility:</strong> Core Web Vitals budget, image pipelines, lazy-loading, keyboard/ARIA & color-contrast checks.</li>
              <li><strong>Storefront upkeep:</strong> iterations, theme tweaks, and redesigns; collaborated on content/SEO and ongoing site support.</li>
              <li><strong>Delivery:</strong> Git-based workflow, review environments, and clear handoff docs so teams can iterate safely after launch.</li>
            </ul>

            <div className="flex flex-wrap gap-2 mt-4 text-3">
              <span className="px-3 py-1 rounded-full border border-white/10">Liquid / JSON</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Figma</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Core Web Vitals</span>
              <span className="px-3 py-1 rounded-full border border-white/10">A11y (WCAG)</span>
              <span className="px-3 py-1 rounded-full border border-white/10">SEO-friendly HTML</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Analytics & A/B</span>
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
                <h3 className="text-1 font-semibold">Design-to-dev pipeline</h3>
                <p className="text-3 mt-1">
                  Started with <strong>flows and wireframes</strong>, then shipped pixel-accurate sections using tokens for
                  spacing/type/colors. Every component was <strong>content-driven</strong> so merchants can update copy and media
                  without touching code.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Theme customization & integrations</h3>
                <p className="text-3 mt-1">
                  Built <strong>reusable sections</strong> (hero, product grids, bundles, FAQs) and integrated common Shopify apps
                  (reviews, subscriptions, analytics). Metafields + dynamic sources kept settings tidy and safe for editors.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">CRO, performance & a11y</h3>
                <p className="text-3 mt-1">
                  Instrumented <strong>checkout paths</strong>, forms, and hero CTAs; shipped image/CDN tweaks and <em>preload</em> hints;
                  ran <strong>a11y passes</strong> (focus order, labels, contrast). Result: pages that <em>feel</em> fast and are easy to use.
                </p>
              </article>
            </div>
          </div>

          <div className="md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
            <RevealImage
              className="w-full"
              dir="right"
              src="https://webextra.ca/wp-content/uploads/2023/11/Shopify-features-list-for-eCommerce-website-Banner-850x508-1.jpeg"
              alt=""
              caption={
                <>
                  <span className="img-caption">Shopify</span>
                </>
              }
            />
          </div>
        </section>

        {/* SECTION 3 — deeper narrative */}
        <section className="mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-3">
            Outcomes & impact
          </h2>

          <div className="grid md:grid-cols-1 gap-4 lg:gap-6">
            <div className="rounded-xl /10 p-5 shadow-lg">
              <p className="text-3 leading-relaxed">
                Over the year, I delivered <strong>polished frontend</strong> and <strong>theme upgrades</strong> that balanced aesthetics,
                speed, and editor-friendliness. Sections are configurable, accessible, and <strong>safe to change</strong>—so merchants can
                run campaigns without dev help and costumers can navigate through a user-friendly UI, designed by me.
              </p>
              <p className="text-3 leading-relaxed mt-3">
                The result is a practical toolkit: <strong>reusable UI</strong>, <strong>clean Liquid</strong>, measured <strong>UX improvements</strong>, and
                documentation teammates can trust for ongoing iterations.
              </p>
              <ul className="text-3 grid gap-2 mt-3">
                <li>✓ <strong>Figma → Pixel-perfect UI:</strong> tokens, grids, and clear breakpoints.</li>
                <li>✓ <strong>Performance passes:</strong> CWV budgets, image/CDN strategy, lazy-loading.</li>
                <li>✓ <strong>Accessibility:</strong> keyboard nav, ARIA labels, color-contrast fixes.</li>
                <li>✓ <strong>CRO support:</strong> analytics events, form/CTA instrumentation, A/B hooks.</li>
                <li>✓ <strong>Docs & handoff:</strong> content schemas, editor guides, and rollback plans.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS — EcomSpiders */}
        <section className="skills-section mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-4 text-center">
            Skills
          </h2>

          {/** Configure skills + icons here */}
          {(() => {
            const SKILLS = [
              { label: "Shopify (Liquid/OS 2.0)", Icon: SoftwareIcon },
              { label: "JavaScript / CSS",        Icon: SoftwareIcon },
              { label: "UI/UX design",     Icon: LuBrush },
              { label: "Core Web Vitals",         Icon: LuEarth },
              { label: "Accessibility (WCAG)",    Icon: EducationIcon },
              { label: "CRO & Analytics",         Icon: SoftwareIcon },
              { label: "SEO-Friendly Markup",     Icon: SoftwareIcon },
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
              See the Ecom Spider's website from this{" "}
              <a className="see-publications underline underline-offset-4" href="https://ecomspiders.com/">link</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  </div>
);


}
