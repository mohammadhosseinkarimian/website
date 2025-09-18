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
export default function EmotionDetection() {
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
            Emotion Detection — Multimodal Affect Recognition
          </h1>
          <p className="text-2 mt-2 text-[clamp(1rem,2.6vw,1.35rem)]">
            NLP • Sentiment Polarity • Intensity Scoring
          </p>
          <p className="text-3 mt-4 
          leading-relaxed  mx-auto text-center text-[clamp(.95rem,2.1vw,1.125rem)]">
            I analyzed <strong>IMDB movie reviews</strong> and built an NLP pipeline that classifies each review as 
            <strong> positive</strong> or <strong>negative</strong> and estimates <strong>how strongly</strong> the review leans that way. 
            The system pairs clean preprocessing with <strong>classic ML baselines</strong> and a <strong>Transformer</strong> model, then 
            reports a label <em>and</em> a calibrated <strong>confidence/score</strong> that reflects sentiment intensity.
          </p>
        </header>

        {/* SECTION 1 — image left, text right */}
        <section className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-first">
            <RevealImage
              className="w-full"
              dir="left"
              src="https://image.slidesharecdn.com/emotiondetectionfromtextusingdataminingandtextmining-130711205922-phpapp01/95/emotion-detection-from-text-using-data-mining-and-text-mining-15-638.jpg?cb=1386464160"
              alt=""
              caption={
                <>
                  <span className="img-caption  mx-auto text-center">Emotion Detection from Text</span>
                </>
              }
            />
          </div>

          <div className="order-last">
            <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-2">Role & Scope</h2>
            <ul className="text-3 space-y-2 text-[clamp(.95rem,2vw,1.05rem)]">
              <li><strong>Corpus & cleaning:</strong> deduplicated IMDB reviews, normalized text (lowercasing, punctuation, contractions), and removed leaks.</li>
              <li><strong>Text preprocessing:</strong> tokenization, stopword handling, lemmatization, and <em>negation marking</em> to keep “not good” distinct from “good”.</li>
              <li><strong>Baselines & SOTA:</strong> TF–IDF + Logistic Regression / SVM baselines, then fine-tuned a <strong>Transformer (BERT)</strong> for stronger context.</li>
              <li><strong>Intensity scoring:</strong> produced a <em>confidence/score</em> in [0–1] (or a regression head) to quantify <strong>how positive/negative</strong> a review is.</li>
              <li><strong>Explainability & packaging:</strong> top-word attributions (SHAP/LIME-style), clean reports, seeded runs, and exportable models.</li>
            </ul>

            <div className="flex flex-wrap gap-2 mt-4 text-3">
              <span className="px-3 py-1 rounded-full border border-white/10">Tokenization</span>
              <span className="px-3 py-1 rounded-full border border-white/10">TF–IDF</span>
              <span className="px-3 py-1 rounded-full border border-white/10">LogReg / SVM</span>
              <span className="px-3 py-1 rounded-full border border-white/10">BERT</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Class Imbalance</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Calibration</span>
              <span className="px-3 py-1 rounded-full border border-white/10">ROC–AUC / F1</span>
              <span className="px-3 py-1 rounded-full border border-white/10">Explainability</span>
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
                <h3 className="text-1 font-semibold">Text pipeline & preprocessing</h3>
                <p className="text-3 mt-1">
                  Built a robust pipeline: normalization, <strong>tokenization</strong>, <strong>lemmatization</strong>, and <strong>negation handling</strong>. 
                  Split data into train/val/test with stratification; added simple augmentations (synonym swap) for robustness without drift.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Modeling for polarity & strength</h3>
                <p className="text-3 mt-1">
                  Trained <strong>TF–IDF + Logistic Regression/SVM</strong> as baselines, then fine-tuned a <strong>BERT</strong>-style encoder. 
                  Produced both a <strong>polarity label</strong> and an <strong>intensity score</strong> via calibrated probabilities or a small regression head.
                </p>
              </article>

              <article className="rounded-xl /10 p-4 shadow-lg">
                <h3 className="text-1 font-semibold">Evaluation, calibration & explanation</h3>
                <p className="text-3 mt-1">
                  Reported <strong>accuracy</strong>, <strong>macro-F1</strong>, and <strong>ROC–AUC</strong>; inspected confusion matrices and hard-error slices 
                  (negation, sarcasm, OOV names). Applied <strong>temperature scaling</strong> for better confidence estimates and surfaced <strong>top phrases</strong> 
                  that drive each prediction for easy debugging.
                </p>
              </article>
            </div>
          </div>

          <div className="md:justify-self-end w-full md:max-w-[420px] lg:max-w-[560px]">
            <RevealImage
              className="w-full"
              dir="right"
              src="https://botpenguin-assets.s3.us-east-2.amazonaws.com/cdn/assets/website/NLP_Transformer_Models_Revolutionizing_Language_Processing_fdb759988f.webp"
              alt=""
              caption={
                <>
                  <span className="img-caption">Transformers</span>
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
                Delivered an <strong>end-to-end IMDB sentiment system</strong> that consistently <strong>outperforms TF–IDF baselines</strong> with the Transformer model. 
                Each prediction comes with a <strong>clear label</strong> and a <strong>confidence/intensity score</strong>, plus keywords that explain <em>why</em>.
              </p>
              <p className="text-3 leading-relaxed mt-3">
                The project is <strong>reproducible</strong> (configs, seeds, checkpoints) and <strong>deploy-ready</strong> (export to ONNX/TorchScript). 
                Error analysis guided fixes for negations and rare terms, improving <strong>real-world reliability</strong>.
              </p>
              <ul className="text-3 grid gap-2 mt-3">
                <li>✓ <strong>Clean IMDB corpus:</strong> normalized, deduped, stratified splits.</li>
                <li>✓ <strong>Baselines:</strong> TF–IDF + Logistic Regression / SVM with solid reference metrics.</li>
                <li>✓ <strong>Transformer model:</strong> BERT fine-tune that <em>consistently</em> beats baselines on F1/ROC–AUC.</li>
                <li>✓ <strong>Intensity scoring:</strong> calibrated probabilities or lightweight regression head (0–1 sentiment strength).</li>
                <li>✓ <strong>Explainability:</strong> top-word/phrase attributions for transparent decisions.</li>
                <li>✓ <strong>Reproducibility:</strong> configs, seeds, deterministic eval, and exportable artifacts.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS — related to IMDB Sentiment */}
        <section className="skills-section mt-12 md:mt-16">
          <h2 className="text-1 font-semibold text-[clamp(1.25rem,3vw,1.75rem)] mb-4 text-center">
            Skills
          </h2>

          {(() => {
            const SKILLS = [
              { label: "NLP Preprocessing",         Icon: intel },
              { label: "TF–IDF / LogReg / SVM",     Icon: intel },
              { label: "Transformers (BERT)",       Icon: intel },
              { label: "Calibration & Metrics",     Icon: intel },
              { label: "Explainability (SHAP/LIME)",Icon: TutoringIcon },
              { label: "PyTorch / scikit-learn",    Icon: SoftwareIcon },
              { label: "ONNX / Deployment",         Icon: intel },
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
