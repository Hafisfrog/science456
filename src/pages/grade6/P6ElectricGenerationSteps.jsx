import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const LANGS = [
  { id: "th", label: "ไทย", voice: "th-TH" },
  { id: "en", label: "English", voice: "en-US" },
  { id: "ms", label: "Melayu", voice: "ms-MY" },
];

const TEXT = {
  th: {
    title: "การทดลองที่ 9 เรื่อง การเกิดแรงไฟฟ้า",
    heading: "ขั้นตอนการทดลอง",
    steps: ["เลือกวัตถุสำหรับทดลอง", "นำผ้าแห้งมาขัดลูกโป่ง", "สังเกตและบันทึกผล"],
    detail: [
      "ครั้งที่ 1 ไม่ขัดถูด้วยผ้าแห้ง",
      "ครั้งที่ 2 ถูด้วยผ้าแห้ง 2 นาที",
      "ครั้งที่ 3 ขัดถูด้วยผ้าแห้ง 5 นาที",
    ],
    start: "เริ่ม\nการทดลอง",
    readAll: "ฟังทั้งหมด",
    backToMaterials: "กลับหน้าอุปกรณ์",
  },
  en: {
    title: "Experiment 9: Electric Force Generation",
    heading: "Experiment Steps",
    steps: ["Choose an object for testing", "Rub the balloon with a dry cloth", "Observe and record"],
    detail: [
      "Round 1: no rubbing with a dry cloth",
      "Round 2: rub with a dry cloth for 2 minutes",
      "Round 3: rub with a dry cloth for 5 minutes",
    ],
    start: "Start\nExperiment",
    readAll: "Read all",
    backToMaterials: "Back to materials",
  },
  ms: {
    title: "Eksperimen 9: Pembentukan Daya Elektrik",
    heading: "Langkah Eksperimen",
    steps: ["Pilih objek untuk uji kaji", "Gosok belon dengan kain kering", "Perhati dan catat"],
    detail: [
      "Pusingan 1: tanpa gosokan kain kering",
      "Pusingan 2: gosok dengan kain kering selama 2 minit",
      "Pusingan 3: gosok dengan kain kering selama 5 minit",
    ],
    start: "Mula\nEksperimen",
    readAll: "Baca semua",
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

function StepPill({ no, text, onSpeak }) {
  return (
    <button
      type="button"
      onClick={onSpeak}
      className="group flex min-h-[68px] w-full items-center gap-3 rounded-full border-[3px] border-[#4b628e] bg-gradient-to-b from-[#eef4fb] to-[#d7e0ea] px-4 py-2 text-left shadow-[0_6px_0_#91a0b8,0_16px_22px_rgba(30,41,59,0.14)] transition hover:-translate-y-0.5"
    >
      <span className="inline-grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#80a8ff] to-[#537ce1] text-[38px] font-black leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
        {no}
      </span>
      <span className="text-[clamp(22px,2vw,28px)] font-bold leading-tight text-[#213760]">{text}</span>
    </button>
  );
}

export default function P6ElectricGenerationSteps() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [lang, setLang] = useState("th");

  const content = TEXT[lang];
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

  const readAll = useMemo(() => {
    const details = content.detail.join(" ");
    return `${content.heading}. 1. ${content.steps[0]}. 2. ${content.steps[1]}. ${details}. 3. ${content.steps[2]}.`;
  }, [content]);

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-[#cae1ee]"
      style={{ fontFamily: "Prompt, Noto Sans Thai, sans-serif" }}
    >
      <style>
        {`
          @keyframes p6Float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          @keyframes p6Pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .p6-lightning {
            animation: p6Float 2.9s ease-in-out infinite;
            filter: drop-shadow(0 8px 10px rgba(255, 191, 0, 0.34));
          }
          .p6-play-badge {
            animation: p6Pulse 2.1s ease-in-out infinite;
          }
        `}
      </style>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-[5vw] top-[11vh] bottom-[9vh] rounded-[48%] bg-[#f4efef]" />
        <div className="absolute left-[6vw] top-[11.8vh] h-[8vh] w-[88vw] rounded-full bg-[#f4efef]" />
        <div className="absolute left-[14vw] top-[39vh] h-[1px] w-[1px] rounded-full bg-transparent" />
        <div className="absolute -left-[4vw] top-[36vh] h-[22vh] w-[9vw] rounded-[58%_58%_44%_44%/58%_58%_42%_42%] border-[5px] border-slate-900 bg-[#fff3a2]" />
        <div className="absolute -right-[4vw] top-[36vh] h-[22vh] w-[9vw] scale-x-[-1] rounded-[58%_58%_44%_44%/58%_58%_42%_42%] border-[5px] border-slate-900 bg-[#fff3a2]" />
        <div className="absolute right-[8vw] top-[13vh] h-[18vh] w-[18vw] rounded-full bg-white/18 blur-[2px]" />
        <div
          aria-hidden="true"
          className="p6-lightning absolute right-[13vw] top-[5vh] h-[18vh] w-[7vw] bg-[#f7bd2b]"
          style={{ clipPath: "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)" }}
        />
        <span className="absolute right-[19vw] top-[18vh] text-[clamp(18px,1.6vw,28px)] text-[#f7bd2b]">✦</span>
        <span className="absolute right-[15.6vw] top-[21vh] text-[clamp(16px,1.3vw,22px)] text-[#f7bd2b]">✦</span>
        <div className="absolute bottom-[22vh] left-[6vw] text-[clamp(48px,5vw,72px)]">🧲</div>
        <div className="absolute bottom-[9vh] left-[3vw] text-[clamp(42px,4vw,64px)]">☀</div>
        <div className="absolute bottom-[2vh] left-[18vw] h-[3.8vh] w-[9vw] skew-x-[-18deg] rounded-[6px] border-[3px] border-[#2f6ba0] bg-[repeating-linear-gradient(90deg,#6ed0f6_0_18px,#5db6e6_18px_20px)]" />
        <div className="absolute bottom-[2.3vh] left-[29vw] h-[3.8vh] w-[10vw] skew-x-[-18deg] rounded-[6px] border-[3px] border-[#2f6ba0] bg-[repeating-linear-gradient(90deg,#6ed0f6_0_18px,#5db6e6_18px_20px)]" />
        <div className="absolute bottom-[2vh] right-[15vw] h-[10vh] w-[10vw]">
          <div className="absolute bottom-0 left-[18%] h-[8vh] w-[6px] rounded-full bg-[#4e4e7f]" />
          <div className="absolute bottom-[6.5vh] left-[6%] h-[6px] w-[22%] rounded-full bg-[#4e4e7f]" />
          <div className="absolute bottom-[7.4vh] left-[11%] h-[2.8vh] w-[8px] rounded-full bg-[#4e4e7f]" />
          <div className="absolute bottom-0 right-[18%] h-[6.2vh] w-[5px] rounded-full bg-[#4e4e7f]" />
          <div className="absolute bottom-[4.8vh] right-[10%] h-[5px] w-[20%] rounded-full bg-[#4e4e7f]" />
          <div className="absolute bottom-[5.6vh] right-[15%] h-[2.2vh] w-[8px] rounded-full bg-[#4e4e7f]" />
          <span className="absolute bottom-[5.8vh] left-[28%] h-[2px] w-[45%] origin-left rotate-[10deg] bg-[#6b75b5]" />
          <span className="absolute bottom-[5.4vh] left-[28%] h-[2px] w-[45%] origin-left rotate-[2deg] bg-[#6b75b5]" />
        </div>
      </div>

      <div className="relative mx-auto flex h-full w-full max-w-[1800px] flex-col px-[clamp(24px,4vw,72px)] pb-[120px] pt-[22px]">
        <h1 className="mx-auto max-w-[1100px] text-center text-[clamp(40px,4vw,66px)] font-bold leading-[0.98] text-black">
          {content.title}
        </h1>

        <section className="mt-[clamp(22px,3.5vh,44px)] ml-[clamp(6px,8vw,150px)] w-[min(58vw,780px)] max-w-[780px]">
          <h2 className="text-[clamp(34px,3.3vw,58px)] font-bold leading-none text-[#121826]">
            {content.heading}
          </h2>

          <div className="mt-[clamp(18px,3vh,32px)] space-y-[clamp(16px,2.4vh,26px)]">
            <StepPill no={1} text={content.steps[0]} onSpeak={() => speakText(content.steps[0], voice)} />
            <StepPill no={2} text={content.steps[1]} onSpeak={() => speakText(content.steps[1], voice)} />

            <div className="pl-[clamp(48px,5vw,110px)] text-[clamp(18px,2.1vw,24px)] font-medium leading-[1.35] text-[#111827]">
              {content.detail.map((line) => (
                <p className="m-0" key={line}>
                  {line}
                </p>
              ))}
            </div>

            <StepPill no={3} text={content.steps[2]} onSpeak={() => speakText(content.steps[2], voice)} />
          </div>
        </section>
      </div>

      <div className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-[18px] border border-[#6ca9d7]/40 bg-white/92 p-2 shadow-[0_10px_20px_rgba(15,23,42,0.18)] backdrop-blur-[2px]">
        {LANGS.map((item) => (
          <button
            key={item.id}
            className={`rounded-full px-4 py-2 text-[18px] font-bold ${
              lang === item.id
                ? "bg-gradient-to-b from-[#2cb0ff] to-[#178dd4] text-white shadow-[0_4px_10px_rgba(14,116,194,0.35)]"
                : "bg-[#d7edff] text-sky-700"
            }`}
            type="button"
            onClick={() => setLang(item.id)}
          >
            {item.label}
          </button>
        ))}
        <button
          className="inline-grid h-10 w-10 place-items-center rounded-[14px] border border-sky-500/35 bg-gradient-to-b from-[#f8fcff] to-sky-100 text-sky-700 shadow-[0_4px_8px_rgba(23,60,110,0.2)]"
          type="button"
          onClick={() => speakText(readAll, voice)}
          title={content.readAll}
          aria-label={content.readAll}
        >
          <SpeakerIcon />
        </button>
      </div>

      <div className="fixed bottom-4 right-4 z-40 flex items-end gap-3">
        <button
          type="button"
          onClick={() => navigate(materialsPath)}
          className="flex h-[108px] w-[80px] items-center justify-center rounded-[18px] border-2 border-[#7a82a3] bg-gradient-to-b from-white to-[#f2f5fb] text-[32px] font-black text-[#101727] shadow-[0_12px_24px_rgba(20,28,45,0.16)]"
          aria-label={content.backToMaterials}
          title={content.backToMaterials}
        >
          ←
        </button>

        <button
          type="button"
          onClick={() => navigate(simPath)}
          className="flex h-[132px] w-[110px] flex-col items-center rounded-[16px] border-2 border-[#5f6785] bg-gradient-to-b from-white to-[#f2f5fb] px-2 py-2 shadow-[0_12px_24px_rgba(20,28,45,0.26)]"
        >
          <span className="p6-play-badge inline-grid h-[56px] w-[56px] place-items-center rounded-full bg-gradient-to-br from-[#c9dcff] to-[#7ea7ef] text-[36px] text-white shadow-[inset_0_0_0_2px_rgba(64,98,170,0.35),0_4px_10px_rgba(72,105,170,0.4)]">
            ▶
          </span>
          <span className="mt-2 whitespace-pre-line text-center text-[18px] font-black leading-[1.02] text-[#101727]">
            {content.start}
          </span>
        </button>
      </div>
    </div>
  );
}
