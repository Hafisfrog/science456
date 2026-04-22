import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HomeButton from "../HomeButton";

const TEXT = {
  th: {
    title: "สรุปผลการทดลอง",
    summaries: {
      balloon: [
        "เมื่อขัดถูลูกโป่งทั้ง 2 ใบด้วยกระดาษเยื่อ ลูกโป่งทั้งสองจะมีประจุชนิดเดียวกัน เมื่อนำมาเข้าใกล้กันจึงเกิดแรงผลักกัน",
        "เมื่อขัดถูลูกโป่งเพียง 1 ใบ อีกใบไม่ได้ขัดถู จะเกิดการเหนี่ยวนำประจุ เมื่อนำมาเข้าใกล้กันจึงเกิดแรงดึงดูดกัน",
      ],
      marker: [
        "เมื่อขัดถูปากกาเมจิกทั้ง 2 ด้ามด้วยกระดาษเยื่อ ปากกาทั้งสองจะมีประจุชนิดเดียวกัน เมื่อนำมาเข้าใกล้กันจึงเกิดแรงผลักกัน",
        "เมื่อขัดถูปากกาเมจิกเพียง 1 ด้าม อีกด้ามไม่ได้ขัดถู จะเกิดการเหนี่ยวนำประจุ เมื่อนำมาเข้าใกล้กันจึงเกิดแรงดึงดูดกัน",
      ],
    },
    time: "เวลาการถู",
    back: "ย้อนกลับ",
    next: "สรุปสาระสำคัญ",
    lang: { th: "ไทย", en: "English", ms: "Melayu" },
  },
  en: {
    title: "Experiment Summary",
    summaries: {
      balloon: [
        "When both balloons are rubbed with tissue paper, they gain the same type of charge, so they repel each other.",
        "When only one balloon is rubbed, charge induction occurs and the balloons attract each other.",
      ],
      marker: [
        "When both marker pens are rubbed with tissue paper, they gain the same type of charge, so they repel each other.",
        "When only one marker pen is rubbed, charge induction occurs and the marker pens attract each other.",
      ],
    },
    time: "Rubbing time",
    back: "Back",
    next: "Key Takeaways",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
  },
  ms: {
    title: "Ringkasan Eksperimen",
    summaries: {
      balloon: [
        "Apabila kedua-dua belon digosok dengan kertas tisu, kedua-duanya mendapat cas yang sama lalu saling menolak.",
        "Apabila hanya satu belon digosok, aruhan cas berlaku lalu kedua-dua belon saling menarik.",
      ],
      marker: [
        "Apabila kedua-dua pen marker digosok dengan kertas tisu, kedua-duanya mendapat cas yang sama lalu saling menolak.",
        "Apabila hanya satu pen marker digosok, aruhan cas berlaku lalu kedua-dua pen marker saling menarik.",
      ],
    },
    time: "Masa menggosok",
    back: "Kembali",
    next: "Ringkasan Utama",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

const formatTime = (totalSeconds) => {
  const safe = Number.isFinite(totalSeconds) && totalSeconds >= 0 ? totalSeconds : 0;
  const minutes = Math.floor(safe / 60);
  const seconds = Math.floor(safe % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export default function P6ElectricForceEffectSummary() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const timeParam = Number(searchParams.get("time") || 0);
  const equipmentParam = searchParams.get("equipment");
  const [language, setLanguage] = useState("th");
  const t = useMemo(() => TEXT[language] ?? TEXT.th, [language]);
  const summaryItems = t.summaries[equipmentParam] || t.summaries.balloon;

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
      <HomeButton />

      <div className="relative z-[1] mx-auto w-full max-w-[1280px]">
        <div className="inline-flex items-center rounded-[12px] bg-blue-600 px-4 py-1.5 text-[clamp(22px,2.4vw,34px)] font-black text-white shadow-[0_10px_18px_rgba(37,99,235,0.35)]">
          {t.title}
        </div>

        <div className="mt-6 w-full max-w-[980px] rounded-[20px] border-2 border-white/80 bg-white/85 p-5 shadow-[0_16px_26px_rgba(17,24,39,0.12)]">
          <h2 className="m-0 text-[clamp(20px,2vw,28px)] font-black text-slate-900">{t.title}</h2>

          <ol className="mb-0 mt-4 grid gap-[18px] pl-[22px]">
            {summaryItems.map((item, idx) => (
              <li key={`${idx}-${item}`} className="text-[clamp(16px,1.8vw,18px)] font-bold leading-[1.7]">
                {item}
              </li>
            ))}
          </ol>

          {timeParam > 0 && (
            <div className="mt-[18px] inline-flex items-center gap-2.5 rounded-full border-2 border-slate-900/15 bg-white/70 px-[14px] py-2.5 text-base font-black shadow-[0_18px_26px_rgba(17,24,39,0.12)]">
              {t.time}: {formatTime(timeParam)}
            </div>
          )}
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
          onClick={() =>
            navigate(
              `/p6/experiment/electric-force-effect/result?time=${Number.isFinite(timeParam) ? timeParam : 0}`
            )
          }
          aria-label={t.back}
          title={t.back}
        >
          <span className="text-[22px] leading-none">&lt;&lt;</span>
          <span className="text-sm font-black leading-none">{t.back}</span>
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-blue-600 px-4 py-3 text-white shadow"
          type="button"
          onClick={() => navigate("/p6/experiment/electric-force-effect/key-summary")}
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
