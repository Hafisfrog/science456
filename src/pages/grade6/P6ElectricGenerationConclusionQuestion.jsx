import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const TEXT = {
  th: {
    title: "คำถามนี้มีคำตอบ",
    question: "แรงไฟฟ้าเกิดขึ้นได้อย่างไรนะ",
    answer: [
      "แรงไฟฟ้าเกิดจากการมีประจุไฟฟ้าของวัตถุ",
      "ซึ่งทำให้วัตถุดูดหรือผลักกันได้",
      "เช่น ลูกโป่งกับผม แล้วนำไปใกล้เศษกระดาษ → กระดาษจะลอยเข้าหาลูกโป่ง",
    ],
    back: "ย้อนกลับ",
    next: "กลับเลือกการทดลอง",
    lang: { th: "ไทย", en: "English", ms: "Melayu" },
  },
  en: {
    title: "Question & Answer",
    question: "How does electric force happen?",
    answer: [
      "Electric force comes from electric charges on objects.",
      "That makes objects attract or repel each other.",
      "Example: rub a balloon, then bring it near paper bits → the paper moves toward the balloon.",
    ],
    back: "Back",
    next: "Back to Experiment Selection",
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    title: "Soalan & Jawapan",
    question: "Bagaimana daya elektrik berlaku?",
    answer: [
      "Daya elektrik berlaku kerana cas elektrik pada objek.",
      "Ini menyebabkan objek saling menarik atau menolak.",
      "Contoh: gosok belon, kemudian dekatkan dengan cebisan kertas → kertas akan bergerak ke arah belon.",
    ],
    back: "Kembali",
    next: "Kembali ke Pilihan Eksperimen",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

function LanguagePills({ lang, setLang, labels }) {
  const pills = [
    { code: "th", label: labels.th },
    { code: "en", label: labels.en },
    { code: "ms", label: labels.ms },
  ];

  return (
    <div className="flex max-w-[calc(100vw-24px)] flex-wrap items-center gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_10px_22px_rgba(0,0,0,0.12)]">
      {pills.map((p) => (
        <button
          key={p.code}
          type="button"
          onClick={() => setLang(p.code)}
          className={`whitespace-nowrap rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
            lang === p.code ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

function QuestionBadge({ text }) {
  return (
    <div className="inline-flex items-center rounded-[12px] bg-[#f5c500] px-4 py-2 text-[clamp(18px,1.9vw,20px)] font-black text-slate-900 shadow-[0_10px_18px_rgba(15,23,42,0.18)]">
      {text}
    </div>
  );
}

export default function P6ElectricGenerationConclusionQuestion() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TEXT[lang] ?? TEXT.th, [lang]);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-6 pt-4 text-slate-900 md:px-8"
      style={{
        fontFamily: "Prompt, sans-serif",
        background:
          "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
      }}
    >
      <div className="relative z-[1] mx-auto w-full max-w-[1280px]">
        <div className="rounded-[24px] bg-[#f6ece7] p-[clamp(20px,3vw,32px)] shadow-[0_18px_30px_rgba(17,24,39,0.16)]">
          <QuestionBadge text={t.title} />

          <div className="mt-5 text-[clamp(22px,2.6vw,26px)] font-black text-slate-900">
            {t.question}
          </div>

          <div className="relative mt-6 max-w-[720px] rounded-[18px] border-2 border-slate-800/80 bg-white px-7 py-6 text-[clamp(18px,1.9vw,20px)] font-semibold leading-[1.75] text-slate-900 shadow-[0_14px_24px_rgba(15,23,42,0.12)]">
            {t.answer.map((line, idx) => (
              <p key={idx} className="m-0">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-auto fixed bottom-3 left-3 z-50">
        <LanguagePills lang={lang} setLang={setLang} labels={t.lang} />
      </div>

      <div className="pointer-events-auto fixed bottom-6 right-6 z-20 flex gap-3">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-white px-4 py-3 text-slate-700 shadow"
          onClick={() => navigate("/p6/experiment/electric-generation/summary-2")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          <span className="text-[22px] leading-none">←</span>
          <span className="text-sm font-black leading-none">{t.back}</span>
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-blue-600 px-4 py-3 text-white shadow"
          onClick={() => navigate("/p6/electric-force/experiments")}
          type="button"
          aria-label={t.next}
          title={t.next}
        >
          <span className="text-sm font-black leading-none">{t.next}</span>
          <span className="text-[22px] leading-none">→</span>
        </button>
      </div>
    </div>
  );
}
