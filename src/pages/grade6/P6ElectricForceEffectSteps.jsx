import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const pageBg = {
    background:
      "radial-gradient(circle at 20% 16%, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0)), linear-gradient(180deg, #f2eeed 0%, #ece7e6 100%)",
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden px-[clamp(14px,2vw,24px)] pb-[clamp(16px,2.2vw,24px)] pt-[clamp(18px,2.5vw,30px)] text-slate-900"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="mx-auto grid h-full w-full max-w-[1260px] gap-[14px]">
        <section className="rounded-3xl border border-white/85 bg-[#f3ead9] p-[clamp(16px,2.4vw,28px)] shadow-[0_12px_22px_rgba(15,23,42,0.1)]">
          <div className="text-[clamp(34px,3.5vw,52px)] font-black leading-[1.06] text-slate-900">{t.heading}</div>
          <div className="mb-[14px] mt-1.5 text-[clamp(14px,1.2vw,18px)] font-bold text-slate-600">{t.hint}</div>

          <div className="grid gap-[clamp(10px,1.2vw,14px)]">
            {steps.map((text, idx) => (
              <button
                key={`${idx}-${text}`}
                type="button"
                className="flex w-full cursor-pointer items-center gap-3 rounded-full border-2 border-slate-900/90 bg-slate-100 px-5 py-2 text-left shadow-[4px_6px_0_rgba(17,24,39,0.22)] transition hover:-translate-y-0.5 hover:shadow-[5px_9px_0_rgba(17,24,39,0.24)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                onClick={() => speakStep(text)}
                aria-label={`${t.speakPrefix} ${idx + 1}`}
                title={`${t.speakPrefix} ${idx + 1}`}
              >
                <span
                  className="grid h-[clamp(42px,3.3vw,56px)] w-[clamp(42px,3.3vw,56px)] shrink-0 place-items-center rounded-full text-[clamp(26px,2.4vw,40px)] font-black leading-none text-white"
                  style={{
                    background: "linear-gradient(145deg, #f6cb5a, #e9ad2d)",
                    textShadow: "0 2px 0 rgba(0, 0, 0, 0.16)",
                  }}
                  aria-hidden="true"
                >
                  {idx + 1}
                </span>
                <span className="text-[clamp(20px,2vw,34px)] font-black leading-[1.2] text-slate-900 max-[980px]:text-[clamp(18px,2.4vw,28px)]">
                  {text}
                </span>
              </button>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3 max-[720px]:justify-center">
          <div className="inline-flex items-center gap-2 rounded-[18px] border border-blue-500/30 bg-white/90 p-2 shadow-[0_10px_18px_rgba(15,23,42,0.14)]">
            {LANGUAGE_OPTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`cursor-pointer rounded-full px-[14px] py-[7px] text-[clamp(15px,1.6vw,20px)] font-black transition ${
                  language === item.id
                    ? "bg-sky-500 text-white"
                    : "bg-[#d7edff] text-sky-700 hover:-translate-y-0.5"
                }`}
                onClick={() => setLanguage(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              className="grid h-[42px] w-[42px] place-items-center rounded-[14px] border border-sky-500/35 bg-gradient-to-b from-[#f8fcff] to-sky-100 text-sky-700"
              onClick={speakAll}
              aria-label={t.listenAll}
              title={t.listenAll}
            >
              <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className="h-6 w-6">
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

          <div className="ml-auto mt-0 flex flex-nowrap justify-end gap-2 max-[720px]:ml-0">
            <button
              className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-[28px] font-black leading-none text-slate-900 shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
              onClick={() => navigate("/p6/experiment/electric-force-effect")}
              type="button"
              aria-label={t.back}
              title={t.back}
            >
              ←
            </button>
            <button
              className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br from-red-500 to-red-600 text-[28px] font-black leading-none text-white shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
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
