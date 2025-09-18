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
export default function ReinforcementLearning() {
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
            Reinforcement Learning — OpenAI Gym
          </h1>
          <p className="text-2 mt-2 text-[clamp(1rem,2.6vw,1.35rem)]">
            Policy Gradients • DQN • PPO
          </p>
          <p className="text-3 mt-4 
          leading-relaxed  mx-auto text-center text-[clamp(.95rem,2.1vw,1.125rem)]">
            I turned classic OpenAI Gym problems into <strong>reproducible RL experiments</strong>: formalizing tasks as <strong>MDPs</strong>, 
            building <strong>training loops</strong> in PyTorch, and benchmarking <strong>DQN / A2C / PPO</strong>. I focused on the details that make 
            RL <strong>actually work</strong>—<strong>reward shaping</strong>, <strong>exploration</strong>, <strong>stability</strong>, and <strong>honest evaluation</strong> across seeds—so learned policies are 
            not just flashy demos but <strong>reliable behaviors</strong>.
          </p>
        </header>

        {/* SECTION 1 — image left, text right */}
        <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-first">
            <RevealImage
              className="w-full"
              dir="left"
              src="https://serokell.io/files/aq/aqhc398.Reinforcement_Learning_pic1.jpg"
              alt="Markov Decision Process diagram"
              caption={
                <>
                  <span className="img-caption  mx-auto text-center">Reinforcement Learning</span>
                </>
              }
            />
          </div>

          <div className="order-last">
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">Role & Scope</h2>
            <ul className="text-3 space-y-2 text-[clamp(.95rem,2vw,1.05rem)]">
              <li><strong>Define the task as an MDP:</strong> clarify states/observations, actions, transition dynamics, and termination; standardize <em>seeds</em> and episode caps.</li>
              <li><strong>Engineer the environment:</strong> design <em>reward shaping</em>, observation normalization, and Gym <em>wrappers</em> (frame stack, action repeat) that stabilize learning.</li>
              <li><strong>Build agents & loops:</strong> implement and benchmark <strong>DQN/A2C/PPO</strong> with replay buffers, target networks, GAE, entropy/exploration schedules.</li>
              <li><strong>Train with discipline:</strong> config-driven runs, checkpointing, gradient clipping, early-stopping on divergence, and <em>seed-averaged</em> metrics.</li>
              <li><strong>Evaluate honestly:</strong> rolling returns, sample efficiency, episode-length stability, ablations, and failure-mode analysis.</li>
            </ul>

            <div className="flex flex-wrap gap-2 mt-4 text-3">
              <span className="px-3 py-1 rounded-full border border-white/10">OpenAI Gym</span>
              <span className="px-3 py-1 rounded-full border border-white/10">PyTorch</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Stable-Baselines3</span>
              <span className="px-3 py-1 rounded-full border border-white/10">DQN</span>
              <span className="px-3 py-1 rounded-full border border-white/10">A2C</span>
              <span className="px-3 py-1 rounded-full border border-white/10">PPO</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Replay Buffer</span>
              <span className="px-3 py-1 rounded-full border border-white/10">GAE</span>
              <span className="px-3 py-1 rounded-full border border-white/10">TensorBoard</span>
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
                <h3 className="text-1 font-semibold">Environment & reward design</h3>
                <p className="text-3 mt-1">
                  Stabilized learning by crafting <strong>reward shaping</strong> aligned with final goals, consistent episode caps, and 
                  <strong> observation normalization</strong>. Used Gym <strong>wrappers</strong> (frame stack, action repeat) and <strong>vectorized envs</strong> 
                  for throughput and better gradient signal.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Agents & training loops</h3>
                <p className="text-3 mt-1">
                  Implemented <strong>DQN</strong> (replay, target networks, ε-greedy schedules) and <strong>PPO/A2C</strong> 
                  (clipped objectives, <strong>GAE</strong>, entropy bonuses). Controlled instabilities with <strong>grad clipping</strong>, 
                  <strong> adaptive LR</strong>, and <strong>checkpointing</strong>.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Evaluation & diagnostics</h3>
                <p className="text-3 mt-1">
                  Tracked <strong>rolling returns</strong>, success rates, and <strong>sample efficiency</strong> across multiple seeds. 
                  Used <strong>TensorBoard</strong> for learning curves and ran <strong>ablations</strong> on exploration, reward terms, and 
                  network capacity to separate what <em>actually</em> helps from noise.
                </p>
              </article>
            </div>
          </div>

          <div className="md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
            <RevealImage
              className="w-full"
              dir="right"
              src="https://miro.medium.com/v2/resize:fit:1200/1*ogM5UEf7kgGx0odB4i7jxQ.png"
              alt="Reinforcement learning agent–environment loop"
              caption={
                <>
                  <span className="img-caption">OpenAI LunarLander</span>
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
                Built <strong>solid baselines</strong> for Gym control tasks (e.g., CartPole, MountainCar, Pendulum) and produced 
                <strong> clear learning curves</strong> that hold up across seeds. The codebase is <strong>config-driven</strong>, 
                <strong> reproducible</strong>, and set up for fast experiments: swap algorithms, change networks, and rerun with one command. 
                Reports include <strong>failure analyses</strong> and <strong>next-step playbooks</strong> for stable improvement.
              </p>
              <p className="text-3 leading-relaxed mt-3">
                The result is an <strong>RL toolkit</strong> I can apply to new environments quickly—focused on <strong>stability</strong>, 
                <strong>honest metrics</strong>, and <strong>behaviors that generalize</strong>.
              </p>
              <ul className="text-3 grid gap-2 mt-3">
                <li>✓ <strong>DQN / A2C / PPO baselines:</strong> ready to train with sensible defaults and configs.</li>
                <li>✓ <strong>Gym wrappers:</strong> frame stack, action repeat, normalization, and vectorized envs.</li>
                <li>✓ <strong>Reproducible experiments:</strong> seeds, checkpoints, and deterministic eval loops.</li>
                <li>✓ <strong>Diagnostics:</strong> TensorBoard logs, learning curves, and instability alerts.</li>
                <li>✓ <strong>Hyperparameter sweeps:</strong> LR, entropy/ε schedules, batch/mini-batch sizes.</li>
                <li>✓ <strong>Ablations & reports:</strong> exploration, reward components, and network depth/width.</li>
                <li>✓ <strong>Clean handoff:</strong> documented configs, results tables, and next-step recommendations.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS — related to RL / Gym */}
        <section className="skills-section mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-4 text-center">
            Skills
          </h2>

          {(() => {
            const SKILLS = [
              { label: "OpenAI Gym",             Icon: GameIcon },
              { label: "PyTorch",                 Icon: intel },
              { label: "DQN / A2C / PPO",         Icon: EducationIcon },
              { label: "GAE & Policy Gradients",  Icon: intel },
              { label: "TensorBoard & Logging",   Icon: intel },
              { label: "Reinforcement Learning",   Icon: intel },
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
              <a className="see-publications underline underline-offset-4" href="https://github.com/mohammadhosseinkarimian/NeuroMatch_InternationalAcademy_Project">Github</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  </div>
);


}
