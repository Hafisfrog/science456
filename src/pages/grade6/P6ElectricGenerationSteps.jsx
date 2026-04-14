import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const LANGS = [
  { id: "th", voice: "th-TH" },
  { id: "en", voice: "en-US" },
  { id: "ms", voice: "ms-MY" },
];

const TEXT = {
  th: {
    title: "การทดลองที่ 1 เรื่อง การเกิดแรงไฟฟ้า",
    heading: "ขั้นตอนการทดลอง",
    hint: "",
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
    start: "เริ่มการทดลอง",
    backToMaterials: "กลับหน้าวัสดุอุปกรณ์",
    back: "ย้อนกลับ",
    next: "ต่อไป",
  },
  en: {
    title: "Experiment 1: Electric Force Generation",
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
    start: "Start Experiment",
    backToMaterials: "Back to materials and equipment",
    back: "Back",
    next: "Next",
  },
  ms: {
    title: "Eksperimen 1: Penghasilan Daya Elektrik",
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
    start: "Mula eksperimen",
    backToMaterials: "Kembali ke bahan dan peralatan",
    back: "Kembali",
    next: "Seterusnya",
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
  const langLabels = { th: "ไทย", en: "อังกฤษ", ms: "มลายู" };
  const voice = LANGS.find((item) => item.id === lang)?.voice || "th-TH";

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
          {content.hint ? <div className="mb-4 text-lg font-bold text-slate-600">{content.hint}</div> : null}

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

      <div className="fixed bottom-6 left-6 z-20 inline-flex gap-2 rounded-[20px] bg-white/95 px-3 py-[10px] shadow-[0_18px_40px_rgba(111,144,186,0.2)]">
        <button
          onClick={() => setLang("th")}
          className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
            lang === "th" ? "bg-[#bdd9f8]" : "bg-[#eaf3ff]"
          }`}
        >
          {langLabels.th}
        </button>
        <button
          onClick={() => setLang("en")}
          className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
            lang === "en" ? "bg-[#bdd9f8]" : "bg-[#eaf3ff]"
          }`}
        >
          {langLabels.en}
        </button>
        <button
          onClick={() => setLang("ms")}
          className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
            lang === "ms" ? "bg-[#bdd9f8]" : "bg-[#eaf3ff]"
          }`}
        >
          {langLabels.ms}
        </button>
      </div>

      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(materialsPath)}
          className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-white/90 px-[18px] py-[14px] font-black text-[#213a8f] shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
          aria-label={content.backToMaterials}
          title={content.backToMaterials}
        >
          <span className="text-[20px] leading-none">&laquo;</span>
          <span className="text-[20px] leading-none">{content.back}</span>
        </button>

        <button
          type="button"
          onClick={() => navigate(simPath)}
          className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-[#2563eb] px-[18px] py-[14px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
          aria-label={content.start}
          title={content.start}
        >
          <span className="text-[20px] leading-none">{content.next}</span>
          <span className="text-[20px] leading-none">&raquo;</span>
        </button>
      </div>
    </div>
  );
}
