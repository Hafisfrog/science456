import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const LANGS = [
  { id: "th", voice: "th-TH" },
  { id: "ms", voice: "ms-MY" },
  { id: "en", voice: "en-US" },
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
        className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-700 shadow transition hover:scale-105"
        aria-label="ฟังขั้นตอน"
        title="ฟังขั้นตอน"
      >
        {"\uD83D\uDD0A"}
      </button>
    </div>
  );
}

export default function P6ElectricGenerationSteps() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [lang, setLang] = useState("th");

  const content = TEXT[lang];
  const langLabels = { th: "ไทย", ms: "มลายู", en: "อังกฤษ" };
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
      <div className="mx-auto flex min-h-[calc(100vh-170px)] max-w-[1260px] items-center pb-24 pt-20">
        <section className="w-full rounded-3xl bg-[#e6f3ff] p-6 shadow-lg">
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

      <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
        <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
          <button
            onClick={() => setLang("th")}
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "th"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
          >
            {langLabels.th}
          </button>
          <button
            onClick={() => setLang("ms")}
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "ms"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
          >
            {langLabels.ms}
          </button>
          <button
            onClick={() => setLang("en")}
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "en"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
          >
            {langLabels.en}
          </button>
        </div>
      </div>

      <div className="fixed bottom-3 right-3 z-40 flex items-center gap-3 md:bottom-7 md:right-7">
        <button
          type="button"
          onClick={() => navigate(materialsPath)}
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          aria-label={content.backToMaterials}
          title={content.backToMaterials}
        >
          &laquo; {content.back}
        </button>

        <button
          type="button"
          onClick={() => navigate(simPath)}
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          aria-label={content.start}
          title={content.start}
        >
          {content.next} &raquo;
        </button>
      </div>
    </div>
  );
}
