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

function AnswerCard({ card }) {
  const colorMap = {
    blue: "bg-blue-50 border-blue-300 text-blue-800",
    amber: "bg-amber-50 border-amber-300 text-amber-800",
    gray: "bg-gray-50 border-gray-300 text-gray-800",
  };

  return (
    <div className={`rounded-xl border-2 p-5 shadow-sm ${colorMap[card.color]}`}>
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white font-bold">
          {card.number}
        </div>
        <div className="font-bold">{card.title}</div>
      </div>

      <div className="pl-12 text-gray-700 leading-relaxed">
        <p>{card.examples}</p>
        <p className="font-semibold">{card.pass}</p>
        <p>{card.result}</p>
      </div>
    </div>
  );
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-blue-800 sm:text-3xl">{content.header}</h1>
          <p className="mt-1 text-blue-600">{content.subHeader}</p>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-md">
          <h2 className="mb-3 text-lg font-bold text-blue-800">{content.questionTitle}</h2>
          <p className="text-lg font-semibold text-gray-800">{content.questionText}</p>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-md">
          <p className="mb-4 text-lg font-semibold text-blue-800">{content.answerTitle}</p>

          <div className="space-y-4">
            {content.cards.map((card) => (
              <AnswerCard key={card.number} card={card} />
            ))}
          </div>
        </div>

        <div className="rounded-xl border-2 border-blue-200 bg-white p-4">
          <p className="mb-2 text-sm font-semibold text-blue-700">{content.speakLabel}</p>
          <SpeakButton
            th={speakTexts.th}
            en={speakTexts.en}
            ms={speakTexts.ms}
            activeLang={language}
            onLanguageChange={setLanguage}
          />
        </div>

        <div className="flex justify-between pt-2">
          <button
            onClick={() => navigate("/p4/light/summary")}
            className="rounded-xl bg-gray-500 px-6 py-3 text-white transition hover:bg-gray-600"
          >
            {content.back}
          </button>

          <button
            onClick={() => navigate("/p4")}
            className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-white transition hover:shadow-lg"
          >
            {content.finish}
          </button>
        </div>
      </div>
    </div>
  );
}
