import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const TEXT = {
  th: {
    title: "การแสดงผลการทดลอง",
    headers: ["วัสดุ", "ขัดถูด้วยกระดาษเยื่อทั้ง 2", "ขัดถูด้วยกระดาษเยื่อแค่ 1"],
    rows: [
      { label: "ลูกโป่ง", both: "ผลักกัน", one: "ดึงดูดกัน" },
      { label: "ปากกาเมจิก", both: "ผลักกัน", one: "ดึงดูดกัน" },
    ],
    back: "ย้อนกลับ",
    next: "สรุปผลการทดลอง",
    lang: { th: "ไทย", en: "English", ms: "Melayu" },
  },
  en: {
    title: "Experiment Results",
    headers: ["Material", "Both rubbed with tissue", "Only 1 rubbed with tissue"],
    rows: [
      { label: "Balloon", both: "Repel", one: "Attract" },
      { label: "Marker pen", both: "Repel", one: "Attract" },
    ],
    back: "Back",
    next: "Experiment Summary",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
  },
  ms: {
    title: "Hasil Eksperimen",
    headers: ["Bahan", "Kedua-duanya digosok dengan tisu", "Hanya 1 digosok dengan tisu"],
    rows: [
      { label: "Belon", both: "Tolak-menolak", one: "Tarik-menarik" },
      { label: "Pen marker", both: "Tolak-menolak", one: "Tarik-menarik" },
    ],
    back: "Kembali",
    next: "Ringkasan Eksperimen",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

export default function P6ElectricForceEffectResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const timeParam = Number(searchParams.get("time") || 0);
  const [language, setLanguage] = useState("th");
  const t = useMemo(() => TEXT[language] ?? TEXT.th, [language]);

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  const pills = [
    { id: "th", label: t.lang.th },
    { id: "en", label: t.lang.en },
    { id: "ms", label: t.lang.ms },
  ];

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-6 pt-3 text-slate-900 md:px-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="relative z-[1] mx-auto w-full max-w-[1280px]">
        <div className="inline-flex items-center rounded-[12px] bg-blue-600 px-4 py-1.5 text-[clamp(22px,2.4vw,34px)] font-black text-white shadow-[0_10px_18px_rgba(37,99,235,0.35)]">
          {t.title}
        </div>

        <div className="mt-6 overflow-hidden rounded-[20px] border-2 border-white/80 bg-white/85 shadow-[0_16px_26px_rgba(17,24,39,0.12)]">
          <div className="grid grid-cols-[1fr_1.3fr_1.3fr] bg-[#ffe7a3] text-center text-[clamp(15px,1.6vw,18px)] font-black">
            {t.headers.map((head) => (
              <div key={head} className="border-r-2 border-slate-900 px-3 py-4 last:border-r-0">
                {head}
              </div>
            ))}
          </div>

          {t.rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[1fr_1.3fr_1.3fr] bg-white/70 text-center text-[clamp(15px,1.6vw,18px)] font-bold"
            >
              <div className="border-r-2 border-t-2 border-slate-900 px-3 py-5">{row.label}</div>
              <div className="border-r-2 border-t-2 border-slate-900 px-3 py-5">{row.both}</div>
              <div className="border-t-2 border-slate-900 px-3 py-5">{row.one}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-auto fixed bottom-6 left-6 z-20 flex gap-3 rounded-[24px] bg-white/95 p-2 shadow-[0_10px_22px_rgba(0,0,0,0.12)]">
        {pills.map((item) => (
          <button
            key={item.id}
            onClick={() => setLanguage(item.id)}
            className={`rounded-[12px] px-4 py-2 text-[16px] font-bold leading-none transition duration-150 hover:-translate-y-[1px] ${
              language === item.id ? "bg-sky-200 text-slate-900" : "bg-sky-100 text-slate-800 hover:bg-sky-100"
            }`}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="fixed bottom-6 right-6 z-20 flex gap-3">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-white px-4 py-3 text-slate-900 shadow"
          type="button"
          onClick={() => navigate("/p6/experiment/electric-force-effect/sim")}
          aria-label={t.back}
          title={t.back}
        >
          <span className="text-[22px] leading-none">&lt;&lt;</span>
          <span className="text-sm font-black leading-none">{t.back}</span>
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-blue-600 px-4 py-3 text-white shadow"
          type="button"
          onClick={() =>
            navigate(
              `/p6/experiment/electric-force-effect/summary?time=${Number.isFinite(timeParam) ? timeParam : 0}`
            )
          }
          aria-label={t.next}
          title={t.next}
        >
          <span className="text-sm font-black leading-none">{t.next}</span>
          <span className="text-[22px] leading-none">&gt;&gt;</span>
        </button>
      </div>
    </div>
  );
}
