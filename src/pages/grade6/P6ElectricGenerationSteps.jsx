import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const LANGS = [
  { id: "th", voice: "th-TH" },
  { id: "en", voice: "en-US" },
  { id: "ms", voice: "ms-MY" },
];

const TEXT = {
  th: {
    title: "การทดลองที่ 9 เรื่อง การเกิดแรงไฟฟ้า",
    heading: "ขั้นตอนการทดลอง",
    steps: [
      "เลือกวัตถุสำหรับทดลอง",
      "นำผ้าแห้งมาขัดลูกโป่ง",
      "สังเกตและบันทึกผล",
    ],
    detail: [
      "ครั้งที่ 1 ไม่ขัดถูด้วยผ้าแห้ง",
      "ครั้งที่ 2 ถูด้วยผ้าแห้ง 2 นาที",
      "ครั้งที่ 3 ขัดถูด้วยผ้าแห้ง 5 นาที",
    ],
    start: "เริ่ม\nการทดลอง",
    backToMaterials: "กลับหน้าอุปกรณ์",
  },
  en: {
    title: "Experiment 9: Electric Force Generation",
    heading: "Experiment Steps",
    hint: "Press the speaker to hear",
    steps: [
      "Choose an object for testing",
      "Rub the balloon with a dry cloth",
      "Observe and record",
    ],
    detail: [
      "Round 1: no rubbing with a dry cloth",
      "Round 2: rub with a dry cloth for 2 minutes",
      "Round 3: rub with a dry cloth for 5 minutes",
    ],
    start: "Start\nExperiment",
    backToMaterials: "Back to materials",
  },
  ms: {
    title: "Eksperimen 9: Pembentukan Daya Elektrik",
    heading: "Langkah Eksperimen",
    hint: "Tekan pembesar suara",
    steps: [
      "Pilih objek untuk uji kaji",
      "Gosok belon dengan kain kering",
      "Perhati dan catat",
    ],
    detail: [
      "Pusingan 1: tanpa gosokan kain kering",
      "Pusingan 2: gosok dengan kain kering selama 2 minit",
      "Pusingan 3: gosok dengan kain kering selama 5 minit",
    ],
    start: "Mula\nEksperimen",
    backToMaterials: "Kembali ke bahan",
  },
};

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path d="M4 9H8L13 5V19L8 15H4V9Z" fill="currentColor" />
      <path d="M16 9C17.3 10.1 17.3 13.9 16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18.5 7C20.8 9.2 20.8 14.8 18.5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function StepPill({ no, text, onSpeak, children }) {
  return (
    <div className="group flex w-full items-center gap-4 rounded-full border-2 border-black bg-white px-5 py-3 shadow-[0_10px_18px_rgba(0,0,0,0.14)]">
      <span className="inline-grid h-[56px] w-[56px] shrink-0 place-items-center rounded-full bg-yellow-400 text-[30px] font-black leading-none text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.12),0_10px_14px_rgba(0,0,0,0.18)]">
        {no}
      </span>
      <div className="flex-1">
        <div className="text-[clamp(20px,2vw,32px)] font-bold leading-tight text-slate-900">{text}</div>
        {children}
      </div>
      <button
        type="button"
        onClick={onSpeak}
        className="ml-auto inline-grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-orange-100 text-orange-700 shadow-[0_8px_16px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
        aria-label="ฟังขั้นตอน"
        title="ฟังขั้นตอน"
      >
        <SpeakerIcon />
      </button>
    </div>
  );
}

export default function P6ElectricGenerationSteps() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [lang, setLang] = useState("th");

  const content = TEXT[lang];
  const langLabels = {
    th: { th: "ไทย", en: "English", ms: "Melayu" },
    en: { th: "Thai", en: "English", ms: "Melayu" },
    ms: { th: "Thai", en: "English", ms: "Melayu" },
  }[lang];
  const voice = LANGS.find((item) => item.id === lang)?.voice || "th-TH";
  const backLabel = lang === "th" ? "ย้อนกลับ" : lang === "en" ? "Back" : "Kembali";
  const nextLabel = lang === "th" ? "ทดลอง" : lang === "en" ? "Experiment" : "Eksperimen";

  const from = searchParams.get("from");
  const materialsPath =
    from === "unit"
      ? "/p6/experiment/electric-generation/materials?from=unit"
      : "/p6/experiment/electric-generation/materials";
  const simPath =
    from === "unit"
      ? "/p6/experiment/electric-generation/sim?from=unit&fresh=1"
      : "/p6/experiment/electric-generation/sim?fresh=1";

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden px-[clamp(14px,2vw,24px)] pb-[clamp(16px,2.2vw,24px)] pt-[clamp(18px,2.5vw,30px)]"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="mx-auto max-w-[1260px] pb-24">
        <section className="rounded-3xl bg-[#e6f3ff] p-6 shadow-lg">
          <div className="text-[clamp(34px,3.5vw,52px)] font-black">{content.heading}</div>
          <div className="mb-4 text-lg font-bold text-slate-600">{content.hint}</div>

          <div className="grid gap-4">
            <StepPill no={1} text={content.steps[0]} onSpeak={() => speakText(content.steps[0], voice)} />
            <StepPill no={2} text={content.steps[1]} onSpeak={() => speakText(content.steps[1], voice)}>
              <div className="mt-2 space-y-1 text-[clamp(16px,1.6vw,22px)] font-medium leading-[1.35] text-[#111827]">
                {content.detail.map((line) => (
                  <p className="m-0" key={line}>
                    {line}
                  </p>
                ))}
              </div>
            </StepPill>
            <StepPill no={3} text={content.steps[2]} onSpeak={() => speakText(content.steps[2], voice)} />
          </div>
        </section>
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

      <div className="fixed bottom-3 right-3 z-40 flex items-center gap-3 md:bottom-6 md:right-6">
        <button
          type="button"
          onClick={() => navigate(materialsPath)}
          className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-white px-4 py-3 text-slate-900 shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
          aria-label={content.backToMaterials}
          title={content.backToMaterials}
        >
          <span className="text-[28px] leading-none">&lt;&lt;</span>
          <span className="text-sm font-black leading-none">{backLabel}</span>
        </button>

        <button
          type="button"
          onClick={() => navigate(simPath)}
          className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-blue-600 px-4 py-3 text-white shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
          aria-label={content.start.replace("\n", " ")}
          title={content.start.replace("\n", " ")}
        >
          <span className="text-sm font-black leading-none">{nextLabel}</span>
          <span className="text-[28px] leading-none">&gt;&gt;</span>
        </button>
      </div>
    </div>
  );
}
