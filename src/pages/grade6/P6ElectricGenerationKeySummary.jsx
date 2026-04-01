import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const TEXT = {
  th: {
    title: "สรุปผลการทดลอง",
    summaryLines: [
      "เมื่อขัดลูกโป่งทั้ง 2 ใบด้วยกระดาษเช็ด ลูกโป่งทั้งสองจะมีประจุชนิดเดียวกัน เมื่อนำมาเข้าใกล้กันจึงเกิดแรงผลักกัน",
      "เมื่อขัดลูกโป่งเพียง 1 ใบ อีกใบไม่ได้ถู จะเกิดการเหนี่ยวนำประจุ เมื่อนำมาเข้าใกล้กันจึงเกิดแรงดึงดูดกัน",
    ],
    back: "ย้อนกลับ",
    next: "สรุป",
    lang: { th: "ไทย", en: "English", ms: "Melayu" },
  },
  en: {
    title: "Experiment Summary",
    summaryLines: [
      "When both balloons are rubbed with tissue, they carry the same type of charge, so they repel each other when brought close.",
      "When only one balloon is rubbed, induction occurs and the balloons attract each other when brought close.",
    ],
    back: "Back",
    next: "Summary",
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    title: "Ringkasan Eksperimen",
    summaryLines: [
      "Apabila kedua-dua belon digosok dengan tisu, kedua-duanya bercas sama lalu menolak apabila didekatkan.",
      "Apabila hanya satu belon digosok, aruhan cas berlaku dan kedua-duanya akan menarik apabila didekatkan.",
    ],
    back: "Kembali",
    next: "Ringkasan",
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
    <div className="flex gap-3 rounded-2xl bg-white p-2 shadow-lg">
      {pills.map((p) => (
        <button
          key={p.code}
          type="button"
          onClick={() => setLang(p.code)}
          className={`rounded-xl px-4 py-2 font-bold ${
            lang === p.code ? "bg-sky-500 text-white" : "bg-sky-100"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

export default function P6ElectricGenerationKeySummary() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TEXT[lang] ?? TEXT.th, [lang]);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-6 pt-3 text-slate-900 md:px-8"
      style={{
        fontFamily: "Prompt, sans-serif",
        background:
          "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
      }}
    >
      <div className="relative z-[1] mx-auto flex w-full max-w-[1200px] flex-col gap-4">
        <div className="relative overflow-hidden rounded-[26px] border border-white/90 bg-[#e8f5ff]/95 p-[clamp(22px,3vw,34px)] shadow-[0_18px_30px_rgba(17,24,39,0.14)]">
          <h1 className="m-0 text-[clamp(28px,3.2vw,40px)] font-black text-slate-900">
            {t.title}
          </h1>

          <div className="mt-4 grid gap-4 text-[clamp(16px,1.6vw,18px)] font-semibold leading-[1.7] text-slate-900">
            {(t.summaryLines || []).map((line, idx) => (
              <p key={idx} className="m-0">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-auto fixed bottom-6 left-6 z-20">
        <LanguagePills lang={lang} setLang={setLang} labels={t.lang} />
      </div>

      <div className="pointer-events-auto fixed bottom-6 right-6 z-20 flex gap-3">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-white px-4 py-3 text-slate-700 shadow"
          onClick={() => navigate("/p6/experiment/electric-generation/summary")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          <span className="text-[22px] leading-none">←</span>
          <span className="text-sm font-black leading-none">{t.back}</span>
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-blue-600 px-4 py-3 text-white shadow"
          onClick={() => navigate("/p6/experiment/electric-generation/summary-2")}
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
