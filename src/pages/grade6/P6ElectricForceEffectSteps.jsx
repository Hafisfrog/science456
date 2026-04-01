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
    hint: "กดที่ลำโพงเพื่อฟังเสียง",
    steps: [
      "ถูลูกโป่ง 2 ใบ ด้วยกระดาษเยื่อ",
      "วางลูกโป่งลูกหนึ่งบนฝาขวด นำลูกโป่งอีกลูกหนึ่งเข้าใกล้ลูกโป่งที่อยู่บนฝาขวด",
      "ถูลูกโป่ง 1 ใบ ด้วยกระดาษเยื่อ และอีกลูกไม่ต้องถู",
      "เปลี่ยนวัตถุแล้วทำตามขั้นตอนเหมือนเดิมตั้งแต่แรก",
      "สังเกตผล",
    ],
    back: "ย้อนกลับ",
    next: "ทดลอง",
  },
  en: {
    heading: "Experiment Steps",
    hint: "Press the speaker to hear",
    steps: [
      "Rub 2 balloons with tissue paper.",
      "Place one balloon on a bottle cap and bring another balloon close.",
      "Rub only one balloon with tissue paper.",
      "Change the object and repeat the same steps.",
      "Observe the results.",
    ],
    back: "Back",
    next: "Experiment",
  },
  ms: {
    heading: "Langkah Eksperimen",
    hint: "Tekan pembesar suara",
    steps: [
      "Gosok 2 belon dengan kertas tisu.",
      "Letakkan satu belon di atas penutup botol.",
      "Gosok hanya satu belon.",
      "Tukar objek dan ulang langkah.",
      "Perhatikan hasil.",
    ],
    back: "Kembali",
    next: "Eksperimen",
  },
};

function speakText(text, lang) {
  if (!text || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;

  window.speechSynthesis.speak(utterance);
}

export default function P6ElectricForceEffectSteps() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");

  const t = CONTENT[language];
  const speechLang =
    LANGUAGE_OPTIONS.find((item) => item.id === language)?.speechLang ||
    "th-TH";

  const steps = useMemo(() => t.steps, [t.steps]);

  const speakStep = useCallback(
    (stepText) => {
      speakText(stepText, speechLang);
    },
    [speechLang]
  );

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden px-[clamp(14px,2vw,24px)] pb-[clamp(16px,2.2vw,24px)] pt-[clamp(18px,2.5vw,30px)]"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="mx-auto max-w-[1260px]">

        <section className="rounded-3xl bg-[#e6f3ff] p-6 shadow-lg">

          <div className="text-[clamp(34px,3.5vw,52px)] font-black">
            {t.heading}
          </div>

          <div className="mb-4 text-lg font-bold text-slate-600">
            {t.hint}
          </div>

          <div className="grid gap-4">

            {steps.map((text, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 rounded-full border-2 border-black bg-white px-5 py-3 shadow"
              >

                <span className="grid h-12 w-12 place-items-center rounded-full bg-yellow-400 text-2xl font-black text-white">
                  {idx + 1}
                </span>

                <span className="flex-1 text-[clamp(20px,2vw,32px)] font-bold">
                  {text}
                </span>

                <button
                  onClick={() => speakStep(text)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-700 shadow hover:scale-105 transition"
                >
                  🔊
                </button>

              </div>
            ))}

          </div>
        </section>

        {/* LANGUAGE */}
        <div className="fixed bottom-6 left-6 z-20 flex gap-3 rounded-2xl bg-white p-2 shadow-lg">

          {LANGUAGE_OPTIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => setLanguage(item.id)}
              className={`rounded-xl px-4 py-2 font-bold ${
                language === item.id ? "bg-sky-500 text-white" : "bg-sky-100"
              }`}
              type="button"
            >
              {item.label}
            </button>
          ))}

        </div>

        {/* NAVIGATION */}
        <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-white px-4 py-3 text-slate-900 shadow"
            onClick={() => navigate("/p6/experiment/electric-force-effect")}
            type="button"
            aria-label={t.back}
            title={t.back}
          >
            <span className="text-[22px] leading-none">←</span>
            <span className="text-sm font-black leading-none">{t.back}</span>
          </button>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-blue-600 px-4 py-3 text-white shadow"
            onClick={() => navigate("/p6/experiment/electric-force-effect/sim")}
            type="button"
            aria-label={t.next}
            title={t.next}
          >
            <span className="text-sm font-black leading-none">{t.next}</span>
            <span className="text-[22px] leading-none">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
