import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย" },
  { id: "en", label: "อังกฤษ" },
  { id: "ms", label: "มลายู" },
];

const TEXT = {
  th: {
    title: "การแสดงผลการทดลอง",
    headers: ["วัสดุ", "ขัดถูด้วยกระดาษเยื่อทั้ง 2", "ขัดถูด้วยกระดาษเยื่อแค่ 1"],
    rows: [
      { label: "ลูกโป่ง", both: "ผลักกัน", one: "ดึงดูดกัน" },
      { label: "ปากกาเมจิก", both: "ผลักกัน", one: "ดึงดูดกัน" },
    ],
    back: "ย้อนกลับ",
    next: "ไปต่อ",
  },
  en: {
    title: "Experiment Results",
    headers: ["Material", "Both rubbed with tissue", "Only 1 rubbed with tissue"],
    rows: [
      { label: "Balloon", both: "Repel", one: "Attract" },
      { label: "Marker pen", both: "Repel", one: "Attract" },
    ],
    back: "Back",
    next: "Next",
  },
  ms: {
    title: "Hasil Eksperimen",
    headers: ["Bahan", "Kedua-duanya digosok dengan tisu", "Hanya 1 digosok dengan tisu"],
    rows: [
      { label: "Belon", both: "Tolak-menolak", one: "Tarik-menarik" },
      { label: "Pen marker", both: "Tolak-menolak", one: "Tarik-menarik" },
    ],
    back: "Kembali",
    next: "Seterusnya",
  },
};

const MERGED_SUMMARY = {
  th: {
    title: "สรุปผลการทดลอง",
    items: [
      "เมื่อขัดถูวัสดุทั้ง 2 ชิ้นด้วยกระดาษเยื่อ จะมีประจุชนิดเดียวกัน จึงเกิดแรงผลักกัน",
      "เมื่อขัดถูเพียง 1 ชิ้น อีกชิ้นไม่ได้ขัดถู จะเกิดการเหนี่ยวนำประจุ จึงเกิดแรงดึงดูดกัน",
    ],
    time: "เวลาการถู",
    next: "สรุปสาระสำคัญ",
  },
  en: {
    title: "Experiment Summary",
    items: [
      "When both objects are rubbed with tissue paper, they get the same type of charge, so they repel each other.",
      "When only one object is rubbed, charge induction occurs, so they attract each other.",
    ],
    time: "Rubbing time",
    next: "Key Takeaways",
  },
  ms: {
    title: "Ringkasan Eksperimen",
    items: [
      "Apabila kedua-dua objek digosok dengan kertas tisu, kedua-duanya mendapat cas yang sama lalu saling menolak.",
      "Apabila hanya satu objek digosok, aruhan cas berlaku lalu objek saling menarik.",
    ],
    time: "Masa menggosok",
    next: "Ringkasan Utama",
  },
};

const formatTime = (totalSeconds) => {
  const safe = Number.isFinite(totalSeconds) && totalSeconds >= 0 ? totalSeconds : 0;
  const minutes = Math.floor(safe / 60);
  const seconds = Math.floor(safe % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export default function P6ElectricForceEffectResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const timeParam = Number(searchParams.get("time") || 0);
  const [language, setLanguage] = useState("th");
  const t = useMemo(() => TEXT[language] ?? TEXT.th, [language]);
  const mergedSummary = useMemo(() => MERGED_SUMMARY[language] ?? MERGED_SUMMARY.th, [language]);
  const pageTitle =
    language === "th"
      ? "สรุปผลการทดลอง"
      : language === "en"
        ? "Experiment Summary"
        : "Ringkasan Eksperimen";

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  const pills = LANGUAGE_OPTIONS;

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-6 pt-3 text-slate-900 md:px-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="relative z-[1] mx-auto w-full max-w-[1280px]">
        <div className="inline-flex items-center rounded-[12px] bg-blue-600 px-4 py-1.5 text-[clamp(22px,2.4vw,34px)] font-black text-white shadow-[0_10px_18px_rgba(37,99,235,0.35)]">
          {pageTitle}
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

        <div className="mt-5 w-full max-w-[980px] rounded-[20px] border-2 border-white/80 bg-white/85 p-5 shadow-[0_16px_26px_rgba(17,24,39,0.12)]">
          <ol className="mb-0 mt-0 grid gap-[14px] pl-[22px]">
            {mergedSummary.items.map((item, idx) => (
              <li key={`${idx}-${item}`} className="text-[clamp(16px,1.8vw,18px)] font-bold leading-[1.6]">
                {item}
              </li>
            ))}
          </ol>

          {timeParam > 0 && (
            <div className="mt-[16px] inline-flex items-center gap-2.5 rounded-full border-2 border-slate-900/15 bg-white/70 px-[14px] py-2.5 text-base font-black shadow-[0_18px_26px_rgba(17,24,39,0.12)]">
              {mergedSummary.time}: {formatTime(timeParam)}
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-20 inline-flex gap-2 rounded-[20px] bg-white/95 px-3 py-[10px] shadow-[0_18px_40px_rgba(111,144,186,0.2)]">
        {pills.map((item) => (
          <button
            key={item.id}
            onClick={() => setLanguage(item.id)}
            className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
              language === item.id ? "bg-[#bdd9f8]" : "bg-[#eaf3ff]"
            }`}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="fixed bottom-6 right-6 z-20 flex items-center gap-3">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-white/90 px-[18px] py-[14px] font-black text-[#213a8f] shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
          type="button"
          onClick={() => navigate("/p6/experiment/electric-force-effect/sim")}
          aria-label={t.back}
          title={t.back}
        >
          <span className="text-[20px] leading-none">&laquo;</span>
          <span className="text-[20px] leading-none">{t.back}</span>
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-[#2563eb] px-[18px] py-[14px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
          type="button"
          onClick={() => navigate("/p6/experiment/electric-force-effect/key-summary")}
          aria-label={t.next}
          title={t.next}
        >
          <span className="text-[20px] leading-none">{t.next}</span>
          <span className="text-[20px] leading-none">&raquo;</span>
        </button>
      </div>
    </div>
  );
}
