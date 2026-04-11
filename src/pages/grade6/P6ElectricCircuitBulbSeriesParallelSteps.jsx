import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const TRANSLATIONS = {
  th: {
    badge: "วงจรไฟฟ้าใกล้ตัว",
    title: "การต่อหลอดไฟฟ้าแบบอนุกรมและแบบขนาน",
    stepsHeading: "ขั้นตอนการทดลอง",
    back: "ย้อนกลับ",
    next: "ทดลอง",
    sound: "เปิดเสียง",
    steps: [
      {
        title: "ออกแบบและต่อวงจร",
        detail: "ต่อถ่านไฟฉาย 2 ก้อนแบบอนุกรม แล้วเชื่อมกับหลอดไฟและสวิตช์ให้ครบวงจร",
      },
      {
        title: "ทดลองและสังเกต",
        detail: "เปิดสวิตช์ สังเกตความสว่างของหลอดไฟ และเปรียบเทียบผล",
      },
      {
        title: "ทดลองซ้ำ",
        detail: "เปลี่ยนเป็นต่อถ่าน 4 ก้อน แล้วสังเกตความสว่างอีกครั้ง",
      },
      {
        title: "บันทึกผล",
        detail: "จดบันทึกสิ่งที่สังเกตได้และสรุปความสัมพันธ์ของจำนวนถ่านกับความสว่าง",
      },
    ],
  },
  en: {
    badge: "Electricity Around You",
    title: "Connecting Bulbs in Series and Parallel",
    stepsHeading: "Experiment Steps",
    stepsSub: "Tap a step to hear it",
    summary: "Compare the series and parallel results, then summarize the differences.",
    back: "Back",
    next: "Experiment",
    sound: "Sound",
    steps: [
      {
        title: "Design and build the circuit",
        detail: "Connect two batteries in series, then link to the bulb and switch to complete the circuit.",
      },
      {
        title: "Test and observe",
        detail: "Turn on the switch, observe bulb brightness, and compare.",
      },
      {
        title: "Test again",
        detail: "Use four batteries, reconnect, and observe brightness again.",
      },
      {
        title: "Record results",
        detail: "Write your observations and relate battery count to brightness.",
      },
    ],
  },
  ms: {
    badge: "Litar elektrik dekat kita",
    title: "Sambungan mentol siri dan selari",
    stepsHeading: "Langkah eksperimen",
    stepsSub: "Tekan setiap langkah untuk mendengar",
    summary: "Bandingkan keputusan siri dan selari kemudian rumuskan perbezaannya.",
    back: "Kembali",
    next: "Eksperimen",
    sound: "Bunyi",
    steps: [
      {
        title: "Reka dan bina litar",
        detail: "Sambungkan 2 bateri secara siri lalu hubungkan ke mentol dan suis hingga lengkap.",
      },
      {
        title: "Uji dan perhati",
        detail: "Hidupkan suis, perhatikan kecerahan mentol dan bandingkan.",
      },
      {
        title: "Uji lagi",
        detail: "Guna 4 bateri, sambung semula dan perhatikan kecerahan sekali lagi.",
      },
      {
        title: "Catat hasil",
        detail: "Catat pemerhatian dan hubungkan bilangan bateri dengan kecerahan.",
      },
    ],
  },
};

const SPEECH_LANGUAGES = {
  th: "th-TH",
  en: "en-US",
  ms: "ms-MY",
};

function speak(text, lang = "th-TH") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.98;
  window.speechSynthesis.speak(u);
}

export default function P6ElectricCircuitBulbSeriesParallelSteps() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TRANSLATIONS[lang] ?? TRANSLATIONS.th, [lang]);
  const langLabels = {
    th: { th: "ไทย", en: "English", ms: "Melayu" },
    en: { th: "Thai", en: "English", ms: "Melayu" },
    ms: { th: "Thai", en: "English", ms: "Melayu" },
  }[lang];
  const speechLang = useMemo(() => SPEECH_LANGUAGES[lang] ?? "th-TH", [lang]);
  const handleSpeak = useCallback((text) => speak(text, speechLang), [speechLang]);

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-5 pt-3 text-slate-900 md:px-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(110px,10vw,180px)] top-[10px] h-[clamp(96px,10vw,136px)] w-[clamp(60px,6vw,92px)] bg-[#f7bd2b]"
        style={{
          clipPath: "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.15))",
        }}
      />

      <div className="relative z-[1] mx-auto grid h-full w-full max-w-[1380px] grid-rows-[auto_auto_auto_auto] gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex w-fit items-center rounded-full bg-gradient-to-br from-[#6bc3f0] to-[#4c9ee1] px-[18px] py-2 text-base font-black text-white shadow-[0_12px_22px_rgba(16,24,39,0.14)]">
            {t.badge}
          </div>
        </div>

        <h1 className="m-0 text-[clamp(32px,2.5vw,54px)] font-black leading-[1.08]">
          {t.title}
        </h1>

        <div className="relative min-h-0 overflow-hidden rounded-[30px] bg-[#e5f3ff] px-[clamp(16px,1.8vw,26px)] py-[clamp(18px,2vw,28px)] shadow-[0_22px_40px_rgba(17,24,39,0.18)]">
          <div className="flex flex-col gap-4">
            <header className="flex flex-col gap-1">
              <p className="text-[clamp(32px,2.4vw,48px)] font-black leading-tight text-slate-900">
                {t.stepsHeading}
              </p>
              <p className="text-[clamp(14px,1vw,18px)] font-bold text-slate-700">
                {t.stepsSub}
              </p>
            </header>

            <div className="flex flex-col gap-3">
              {t.steps.map((step, index) => (
                <div
                  key={`${step.title}-${index}`}
                  className="flex items-center gap-4 rounded-[999px] border-[3px] border-slate-900 bg-white px-5 py-3 shadow-[0_18px_28px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  <div className="flex flex-1 items-center gap-4">
                    <div className="grid h-[56px] w-[56px] place-items-center rounded-full bg-gradient-to-br from-[#f8d67b] to-[#e3a92a] text-[30px] font-black text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.16),0_10px_26px_rgba(12,13,71,0.2)]">
                      {index + 1}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[clamp(20px,1.6vw,26px)] font-black text-slate-900">
                        {step.title}
                      </p>
                      <p className="text-[clamp(14px,1vw,18px)] font-semibold text-slate-700">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSpeak(`${index + 1}. ${step.title}. ${step.detail}`)}
                    className="grid h-[54px] w-[54px] place-items-center rounded-[16px] border border-slate-900/30 bg-[#fff7e3] text-slate-900 shadow-[0_10px_18px_rgba(17,24,39,0.18)] transition hover:-translate-y-0.5 hover:bg-white"
                    aria-label={`${t.sound} ${index + 1}`}
                    title={t.sound}
                  >
                    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className="h-8 w-8">
                      <path
                        d="M12 26h12l14-10v32l-14-10H12z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                      <path d="M44 22c4 4 4 16 0 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      <path d="M50 16c7 7 7 25 0 32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="rounded-[24px] border border-dashed border-slate-900/20 bg-white/80 px-4 py-3 text-sm font-bold text-slate-900 shadow-[0_12px_20px_rgba(15,23,42,0.12)]">
              {t.summary}
            </div>
          </div>
        </div>

        <div className="pointer-events-auto fixed bottom-3 left-3 z-20 flex gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_10px_22px_rgba(0,0,0,0.12)]">
          <button
            onClick={() => setLang("th")}
            className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
              lang === "th" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
            }`}
          >
            {langLabels.th}
          </button>

          <button
            onClick={() => setLang("en")}
            className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
              lang === "en" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
            }`}
          >
            {langLabels.en}
          </button>

          <button
            onClick={() => setLang("ms")}
            className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
              lang === "ms" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
            }`}
          >
            {langLabels.ms}
          </button>
        </div>

        <div className="fixed bottom-3 right-3 z-20 flex gap-3">
          <button
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-base font-bold text-slate-900 shadow"
            onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel")}
            type="button"
            aria-label={t.back}
            title={t.back}
          >
            <span className="text-xl leading-none">&lt;&lt;</span>
            <span>{t.back}</span>
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-base font-bold text-white shadow"
            onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/sim")}
            type="button"
            aria-label={t.next}
            title={t.next}
          >
            <span>{t.next}</span>
            <span className="text-xl leading-none">&gt;&gt;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
