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
  LuKeyRound,
  LuKey
} from "react-icons/lu";
export default function CyberSecurity() {
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
            Cybersecurity — Cryptography Projects (B.Sc.)
          </h1>
          <p className="text-2 mt-2 text-[clamp(1rem,2.6vw,1.35rem)]">
            RSA Attacks • Cipher Implementations • Enigma Simulator
          </p>
          <p className="text-3 mt-4 
          leading-relaxed  mx-auto text-center text-[clamp(.95rem,2.1vw,1.125rem)]">
            I built a <strong>from-scratch cryptography toolkit</strong>: complete <strong>RSA</strong> (keygen, encrypt/decrypt),
            hands-on <strong>attack demos</strong> (low-exponent, common-modulus, Fermat, Wiener), and a faithful <strong>Enigma</strong>
            simulator (rotors, ring settings, plugboard, reflector). The goal was simple and bold: <strong>show how ciphers work,
            why naive usage breaks, and how to verify behavior with code</strong>.
          </p>
        </header>

        {/* SECTION 1 — image left, text right */}
        <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-first">
            <RevealImage
              className="w-full"
              dir="left"
              src="https://www.simplilearn.com/ice9/free_resources_article_thumb/process.PNG"
              alt=""
              caption={
                <>
                  <span className="img-caption  mx-auto text-center">RSA Flow</span>
                </>
              }
            />
          </div>

          <div className="order-last">
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">Role & Scope</h2>
            <ul className="text-3 space-y-2 text-[clamp(.95rem,2vw,1.05rem)]">
              <li><strong>Mathematics → Code:</strong> big-integer ops, fast modular exponentiation, GCD/Extended-Euclid, modular inverse, Chinese Remainder Theorem.</li>
              <li><strong>RSA end-to-end:</strong> key generation, encrypt/decrypt, CRT decryption, and test vectors; demos for textbook vs. padded modes.</li>
              <li><strong>Attack implementations:</strong> <em>low-e broadcast</em>, <em>common modulus</em>, <em>Fermat factorization</em>, and <em>Wiener’s small-d</em> attack.</li>
              <li><strong>Enigma simulator:</strong> historically accurate <em>rotors</em>, <em>ring settings</em>, <em>stepping (including double-step)</em>, <em>plugboard</em>, and <em>reflector</em>.</li>
              <li><strong>Engineering discipline:</strong> reproducible CLI/notebooks, unit tests, timing notes, and clear “<em>do/don’t</em>” guidance.</li>
            </ul>

            <div className="flex flex-wrap gap-2 mt-4 text-3">
              <span className="px-3 py-1 rounded-full border border-white/10">RSA</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Modular Arithmetic</span>
              <span className="px-3 py-1 rounded-full border border-white/10">CRT</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Fermat / Wiener</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Common Modulus</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Enigma</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Rotors & Plugboard</span>
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
                <h3 className="text-1 font-semibold">RSA from first principles + attacks</h3>
                <p className="text-3 mt-1">
                  Implemented big-integer primitives and <strong>modexp</strong>, then built RSA keygen and decrypt/encrypt.
                  Added <strong>attack modules</strong> to demonstrate how careless parameters leak secrets:
                  broadcast/low-e recovery, <strong>common modulus</strong> recombination, <strong>Fermat</strong> for close primes,
                  and <strong>Wiener</strong> for tiny private exponents.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Cipher lab: classic → modern</h3>
                <p className="text-3 mt-1">
                  Built a <strong>cipher suite</strong> of educational implementations: shift/Vigenère, <strong>Enigma</strong> with true rotor stepping and plugboard,
                  and modern building blocks (hashing/HMAC demos). Each piece ships with <strong>tests</strong> and <strong>known-answer vectors</strong>.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Crypto engineering & verification</h3>
                <p className="text-3 mt-1">
                  Wrote <strong>CLI tools</strong> and notebooks for repeatable experiments, seeded RNG for determinism,
                  and benchmarked operations. Added <strong>padding cautions</strong> and timing notes to separate
                  “<em>demo-safe</em>” from “<em>production-safe</em>” usage in plain English.
                </p>
              </article>
            </div>
          </div>

          <div className="md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
            <RevealImage
              className="w-full"
              dir="right"
              src="https://www.101computing.net/enigma/images/enigma-how-to.png"
              alt=""
              caption={
                <>
                  <span className="img-caption">Enigma</span>
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
                Delivered a <strong>cryptography lab</strong> that teaches by doing: encrypt/decrypt,
                break misconfigured RSA, and trace Enigma wiring step by step. The code is
                <strong> documented, tested, and reproducible</strong>—perfect for demos, coursework, and interview-ready explanations.
              </p>
              <p className="text-3 leading-relaxed mt-3">
                Most importantly, it makes the <strong>limits</strong> of naive crypto obvious and shows how to verify claims
                with concrete experiments—not hand-waving.
              </p>
              <ul className="text-3 grid gap-2 mt-3">
                <li>✓ <strong>RSA toolkit:</strong> keygen, encrypt/decrypt, CRT decryption, and test vectors.</li>
                <li>✓ <strong>Attack modules:</strong> low-e broadcast, common modulus, Fermat factorization, Wiener’s small-d.</li>
                <li>✓ <strong>Enigma simulator:</strong> rotors, ring settings, double-stepping, plugboard, reflector; reversible path tracing.</li>
                <li>✓ <strong>CLI & notebooks:</strong> reproducible experiments with clear outputs and plots.</li>
                <li>✓ <strong>Safety notes:</strong> padding/parameter cautions; demo-safe vs production-safe guidance.</li>
                <li>✓ <strong>Docs & tests:</strong> KATs, unit tests, and readable comments for future maintainers.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS — related to Cryptography Projects */}
        <section className="skills-section mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-4 text-center">
            Skills
          </h2>

          {(() => {
            const SKILLS = [
              { label: "RSA & Attacks",          Icon: LuKey },
              { label: "Number Theory",          Icon: LuKeyRound },
              { label: "Modular Arithmetic",     Icon: SoftwareIcon },
              { label: "Classical Ciphers",      Icon: LearningIcon },
              { label: "Enigma Simulation",      Icon: GameIcon },
              { label: "Testing & Reproducibility", Icon: EducationIcon },
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
      </div>
    </main>
  </div>
);






}
