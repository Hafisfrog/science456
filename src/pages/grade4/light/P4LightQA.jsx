import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeakButton from "../../../components/SpeakButton";

const UI = {
  th: {
    header: "📣 คำถามมีคำตอบ : ตัวกลางของแสง",
    subHeader: "ทำไมเรามองเห็นวัตถุด้านหลังไม่เหมือนกัน ?",
    questionTitle: "❓ คำถามชวนคิด",
    questionText: "ทำไมวัสดุแต่ละชนิดจึงทำให้เรามองเห็นสิ่งของด้านในได้ไม่เท่ากัน ?",
    answerTitle: "👉 เพราะวัสดุแต่ละชนิดยอมให้แสงผ่านได้ไม่เท่ากัน",
    cards: [
      {
        number: "1",
        title: "วัตถุโปร่งใส",
        color: "blue",
        examples: "เช่น กระจกใส แก้วใส พลาสติกใส",
        pass: "แสงผ่านได้เกือบทั้งหมด",
        result: "มองเห็นสิ่งของด้านหลังได้ชัดเจน",
      },
      {
        number: "2",
        title: "วัตถุโปร่งแสง",
        color: "amber",
        examples: "เช่น กระจกฝ้า กระดาษไข หมอก",
        pass: "แสงผ่านได้บางส่วน",
        result: "มองเห็นสิ่งของด้านหลังไม่ชัด",
      },
      {
        number: "3",
        title: "วัตถุทึบแสง",
        color: "gray",
        examples: "เช่น ไม้ โลหะ กำแพง",
        pass: "แสงผ่านไม่ได้",
        result: "ไม่สามารถมองเห็นด้านหลังได้",
      },
    ],
    speakLabel: "🔊 ฟังคำอธิบาย (ไทย / English / Malay)",
    back: "◀ กลับ",
    finish: "🎉 จบบทเรียน ▶",
  },
  en: {
    header: "📣 Question and Answer: Medium of Light",
    subHeader: "Why do we see objects behind materials differently?",
    questionTitle: "❓ Guiding Question",
    questionText: "Why do different materials make us see objects behind them differently?",
    answerTitle: "👉 Because each material allows light to pass through differently",
    cards: [
      {
        number: "1",
        title: "Transparent Objects",
        color: "blue",
        examples: "Examples: clear glass, clear cup, clear plastic",
        pass: "Light passes through almost completely",
        result: "Objects behind can be seen clearly",
      },
      {
        number: "2",
        title: "Translucent Objects",
        color: "amber",
        examples: "Examples: frosted glass, wax paper, fog",
        pass: "Light passes through partially",
        result: "Objects behind are not clearly visible",
      },
      {
        number: "3",
        title: "Opaque Objects",
        color: "gray",
        examples: "Examples: wood, metal, wall",
        pass: "Light cannot pass through",
        result: "Objects behind cannot be seen",
      },
    ],
    speakLabel: "🔊 Listen to explanation (Thai / English / Malay)",
    back: "◀ Back",
    finish: "🎉 Finish Lesson ▶",
  },
  ms: {
    header: "📣 Soalan dan Jawapan: Medium Cahaya",
    subHeader: "Mengapa kita melihat objek di belakang bahan secara berbeza?",
    questionTitle: "❓ Soalan Pemikiran",
    questionText: "Mengapa bahan yang berbeza menyebabkan objek di belakang kelihatan tidak sama?",
    answerTitle: "👉 Kerana setiap bahan membenarkan cahaya melalui pada tahap berbeza",
    cards: [
      {
        number: "1",
        title: "Objek Lutsinar",
        color: "blue",
        examples: "Contoh: kaca jernih, gelas jernih, plastik jernih",
        pass: "Cahaya menembusi hampir sepenuhnya",
        result: "Objek di belakang kelihatan jelas",
      },
      {
        number: "2",
        title: "Objek Lut Separa",
        color: "amber",
        examples: "Contoh: kaca kabur, kertas surih, kabus",
        pass: "Cahaya menembusi sebahagian",
        result: "Objek di belakang kurang jelas",
      },
      {
        number: "3",
        title: "Objek Legap",
        color: "gray",
        examples: "Contoh: kayu, logam, dinding",
        pass: "Cahaya tidak menembusi",
        result: "Objek di belakang tidak dapat dilihat",
      },
    ],
    speakLabel: "🔊 Dengar penerangan (Thai / English / Malay)",
    back: "◀ Kembali",
    finish: "🎉 Tamat Pelajaran ▶",
  },
};

function buildSpeakText(content) {
  const cardsText = content.cards
    .map(
      (card) =>
        `${card.title}. ${card.examples}. ${card.pass}. ${card.result}.`
    )
    .join(" ");

  return `${content.questionText} ${content.answerTitle}. ${cardsText}`;
}

export default function P4LightQA() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const content = UI[language] ?? UI.th;

  const speakTexts = useMemo(
    () => ({
      th: buildSpeakText(UI.th),
      en: buildSpeakText(UI.en),
      ms: buildSpeakText(UI.ms),
    }),
    []
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#8fb1bf] p-6 font-['Prompt',sans-serif]">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="qa-bg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#a5b2ba" />
            <stop offset="45%" stopColor="#8ab2bf" />
            <stop offset="100%" stopColor="#4f7f97" />
          </linearGradient>
          <linearGradient id="qa-glass" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#c7f2ff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#88d3e8" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#qa-bg)" />
        <path d="M0 0H1440V120C1060 200 380 200 0 120Z" fill="#9aa1a9" />
        <rect x="0" y="120" width="1440" height="170" fill="#6d8698" />
        <rect x="80" y="140" width="150" height="140" rx="10" fill="url(#qa-glass)" />
        <rect x="260" y="140" width="150" height="140" rx="10" fill="url(#qa-glass)" />
        <rect x="440" y="140" width="150" height="140" rx="10" fill="url(#qa-glass)" />
        <rect x="850" y="140" width="150" height="140" rx="10" fill="url(#qa-glass)" />
        <rect x="1030" y="140" width="150" height="140" rx="10" fill="url(#qa-glass)" />
        <rect x="1210" y="140" width="150" height="140" rx="10" fill="url(#qa-glass)" />

        <rect x="300" y="0" width="6" height="120" fill="#2f3c44" />
        <path d="M260 120H350L330 170H280Z" fill="#2f3c44" />
        <polygon points="280,170 330,170 360,270 250,270" fill="rgba(190,230,240,0.35)" />

        <rect x="1134" y="0" width="6" height="120" fill="#2f3c44" />
        <path d="M1094 120H1184L1164 170H1114Z" fill="#2f3c44" />
        <polygon points="1114,170 1164,170 1194,270 1084,270" fill="rgba(190,230,240,0.35)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl">
        <h1 className="mx-auto mb-4 w-fit rounded-md border-4 border-slate-900 bg-white px-6 py-3 text-center text-xl font-extrabold text-slate-900 shadow-[0_6px_18px_rgba(0,0,0,0.25)] sm:text-3xl">
          {content.header}
        </h1>

        <div className="relative">
          <img
            className="pointer-events-none absolute bottom-0 left-[-8px] h-auto w-[min(28%,280px)] select-none drop-shadow-[0_10px_14px_rgba(0,0,0,0.25)] max-[900px]:w-[min(32%,240px)] max-[640px]:hidden"
            src="/images/p4/exp3/teacher.png"
            alt="teacher"
          />

          <div className="ml-[230px] max-[900px]:ml-[190px] max-[640px]:ml-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-md border-2 border-slate-900 bg-[#ffd95a] px-3 py-1.5 text-base font-bold text-slate-900 shadow-[0_4px_10px_rgba(0,0,0,0.18)]">
              📣 คำถามมีคำตอบ
            </div>

            <div className="mb-4 text-base font-semibold text-slate-900 sm:text-lg">
              1. {content.questionText}
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-[28px] bg-[#2bb3a8]" />
              <div className="rounded-[28px] border-[6px] border-slate-800 bg-white p-6 shadow-[0_12px_26px_rgba(0,0,0,0.25)]">
                <div className="mb-4 text-base font-semibold text-slate-900 sm:text-lg">
                  {content.answerTitle}
                </div>

                <div className="space-y-4 text-slate-800">
                  {content.cards.map((card) => (
                    <div key={card.number} className="leading-relaxed">
                      <div className="font-bold">
                        {card.number}. {card.title}{" "}
                        <span className="font-normal">{card.examples}</span>
                      </div>
                      <div className="pl-5 text-sm font-semibold sm:text-base">
                        {card.pass}
                      </div>
                      <div className="pl-5 text-sm sm:text-base">👉 {card.result}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div className="rounded-2xl bg-white/90 p-3 shadow-[0_6px_16px_rgba(0,0,0,0.18)]">
            <SpeakButton
              th={speakTexts.th}
              en={speakTexts.en}
              ms={speakTexts.ms}
              activeLang={language}
              onLanguageChange={setLanguage}
            />
          </div>

          <div className="ml-auto flex gap-3">
            <button
              onClick={() => navigate("/p4/light/summary")}
              className="rounded-full bg-slate-600 px-6 py-3 text-base font-semibold text-white shadow-[0_6px_14px_rgba(0,0,0,0.25)] transition hover:bg-slate-700"
            >
              {content.back}
            </button>

            <button
              onClick={() => navigate("/p4")}
              className="rounded-full bg-red-500 px-7 py-3 text-base font-bold text-white shadow-[0_8px_18px_rgba(0,0,0,0.3)] transition hover:scale-105 hover:bg-red-600"
            >
              {content.finish}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
