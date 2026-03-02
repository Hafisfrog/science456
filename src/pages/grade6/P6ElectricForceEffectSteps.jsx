import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P6ElectricGenerationSteps.css";
import "./P6ElectricForceEffectSteps.css";

const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย", speechLang: "th-TH" },
  { id: "en", label: "English", speechLang: "en-US" },
  { id: "ms", label: "Melayu", speechLang: "ms-MY" },
];

const CONTENT = {
  th: {
    heading: "ขั้นตอนการทดลอง",
    hint: "กดที่ขั้นตอนเพื่อฟังเสียง",
    steps: [
      "ถูลูกโป่ง 2 ใบ ด้วยกระดาษเยื่อ",
      "วางลูกโป่งลูกหนึ่งบนฝาขวด นำลูกโป่งอีกลูกหนึ่งเข้าใกล้ลูกโป่งที่อยู่บนฝาขวด",
      "ถูลูกโป่ง 1 ใบ ด้วยกระดาษเยื่อ และอีกลูกไม่ต้องถู",
      "เปลี่ยนวัตถุแล้วทำตามขั้นตอนเหมือนเดิมตั้งแต่แรก",
      "สังเกตผล",
    ],
    listenAll: "ฟังทุกขั้นตอน",
    back: "กลับหน้าอุปกรณ์",
    next: "ไปหน้าถัดไป",
    speakPrefix: "ฟังขั้นตอนที่",
  },
  en: {
    heading: "Experiment Steps",
    hint: "Tap a step to hear it",
    steps: [
      "Rub 2 balloons with tissue paper.",
      "Place one balloon on a bottle cap, then bring the other balloon close.",
      "Rub only 1 balloon with tissue paper, leave the other balloon unrubbed.",
      "Change the object and repeat the same process from the beginning.",
      "Observe the results.",
    ],
    listenAll: "Listen to all steps",
    back: "Back to materials",
    next: "Go to next page",
    speakPrefix: "Listen to step",
  },
  ms: {
    heading: "Langkah Eksperimen",
    hint: "Tekan langkah untuk dengar",
    steps: [
      "Gosok 2 belon menggunakan kertas tisu.",
      "Letakkan satu belon di atas penutup botol, kemudian dekatkan belon yang satu lagi.",
      "Gosok 1 belon dengan kertas tisu, biarkan satu lagi tanpa digosok.",
      "Tukar objek dan ulang langkah yang sama dari awal.",
      "Perhatikan hasilnya.",
    ],
    listenAll: "Dengar semua langkah",
    back: "Kembali ke bahan",
    next: "Pergi ke halaman seterusnya",
    speakPrefix: "Dengar langkah",
  },
};

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;

  const voices = window.speechSynthesis.getVoices();
  const exact = voices.find((voice) => voice.lang.toLowerCase() === lang.toLowerCase());
  const fallback = voices.find((voice) =>
    voice.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase()),
  );

  if (exact || fallback) {
    utterance.voice = exact || fallback;
  }

  window.speechSynthesis.speak(utterance);
}

export default function P6ElectricForceEffectSteps() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const t = CONTENT[language];
  const speechLang = LANGUAGE_OPTIONS.find((item) => item.id === language)?.speechLang || "th-TH";
  const steps = useMemo(() => t.steps, [t.steps]);

  const speakStep = useCallback(
    (stepText) => {
      speakText(stepText, speechLang);
    },
    [speechLang],
  );

  const speakAll = useCallback(() => {
    speakText(steps.map((step, idx) => `${idx + 1}. ${step}`).join(" "), speechLang);
  }, [speechLang, steps]);

  return (
    <div className="p6-gen-page p6-force-steps-page">
      <div className="p6-gen-container p6-force-steps-container">
        <section className="p6-force-steps-card">
          <div className="p6-force-steps-heading">{t.heading}</div>
          <div className="p6-force-steps-hint">{t.hint}</div>

          <div className="p6-force-steps-list">
            {steps.map((text, idx) => (
              <button
                key={`${idx}-${text}`}
                type="button"
                className="p6-force-steps-row"
                onClick={() => speakStep(text)}
                aria-label={`${t.speakPrefix} ${idx + 1}`}
                title={`${t.speakPrefix} ${idx + 1}`}
              >
                <span className="p6-force-steps-num" aria-hidden="true">
                  {idx + 1}
                </span>
                <span className="p6-force-steps-text">{text}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="p6-force-steps-bottom">
          <div className="p6-force-steps-langbar">
            {LANGUAGE_OPTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`p6-force-steps-chip ${language === item.id ? "active" : ""}`}
                onClick={() => setLanguage(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              className="p6-force-steps-audio"
              onClick={speakAll}
              aria-label={t.listenAll}
              title={t.listenAll}
            >
              <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
                <path
                  d="M12 26h12l14-10v32l-14-10H12z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path
                  d="M44 22c4 4 4 16 0 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="p6-gen-actions p6-force-steps-actions">
            <button
              className="p6-gen-btn ghost"
              onClick={() => navigate("/p6/experiment/electric-force-effect")}
              type="button"
              aria-label={t.back}
              title={t.back}
            >
              ←
            </button>
            <button
              className="p6-gen-btn primary"
              onClick={() => navigate("/p6/experiment/electric-force-effect/sim")}
              type="button"
              aria-label={t.next}
              title={t.next}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
