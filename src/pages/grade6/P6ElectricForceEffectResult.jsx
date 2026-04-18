import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const LANGUAGE_OPTIONS = [{ id: "th" }, { id: "en" }, { id: "ms" }];

const TEXT = {
  th: {
    title: "การแสดงผลการทดลอง",
    headers: ["วัสดุ", "ขัดถูด้วยกระดาษเยื่อทั้ง 2", "ขัดถูด้วยกระดาษเยื่อแค่ 1"],
    rows: [
      { label: "ลูกโป่ง", both: "ผลักกัน", one: "ดึงดูดกัน" },
      { label: "ปากกาเมจิก", both: "ผลักกัน", one: "ดึงดูดกัน" },
    ],
    back: "ย้อนกลับ",
    next: "ต่อไป",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
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
    lang: { th: "Thai", en: "English", ms: "Malay" },
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
    lang: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

const MERGED_SUMMARY = {
  th: {
    title: "สรุปผลการทดลอง",
    items: [
      "เมื่อขัดถูวัตถุทั้ง 2 ชิ้นด้วยกระดาษเยื่อ จะมีประจุชนิดเดียวกัน จึงเกิดแรงผลักกัน",
      "เมื่อขัดถูเพียง 1 ชิ้น อีกชิ้นไม่ได้ขัดถู จะเกิดการเหนี่ยวนำประจุ จึงเกิดแรงดึงดูดกัน",
    ],
    time: "เวลาการถู",
  },
  en: {
    title: "Experiment Summary",
    items: [
      "When both objects are rubbed with tissue paper, they get the same type of charge, so they repel each other.",
      "When only one object is rubbed, charge induction occurs, so they attract each other.",
    ],
    time: "Rubbing time",
  },
  ms: {
    title: "Ringkasan Eksperimen",
    items: [
      "Apabila kedua-dua objek digosok dengan kertas tisu, kedua-duanya mendapat cas yang sama lalu saling menolak.",
      "Apabila hanya satu objek digosok, aruhan cas berlaku lalu objek saling menarik.",
    ],
    time: "Masa menggosok",
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

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-28 pt-3 text-slate-900 md:px-8 md:pb-32"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="relative z-[1] mx-auto w-full max-w-[1280px]">
        <div className="inline-flex items-center rounded-[12px] bg-blue-600 px-4 py-1.5 text-[clamp(22px,2.4vw,34px)] font-black text-white shadow-[0_10px_18px_rgba(37,99,235,0.35)]">
          {mergedSummary.title}
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

      <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
        <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
          {LANGUAGE_OPTIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => setLanguage(item.id)}
              className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold text-slate-900 transition ${
                language === item.id
                  ? "bg-[#bfe0ff] text-slate-900"
                  : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
              }`}
              type="button"
            >
              {t.lang[item.id]}
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-7 md:right-7">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          type="button"
          onClick={() => navigate("/p6/experiment/electric-force-effect/sim")}
          aria-label={t.back}
          title={t.back}
        >
          &laquo; {t.back}
        </button>
        <button
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          type="button"
          onClick={() => navigate("/p6/experiment/electric-force-effect/key-summary")}
          aria-label={t.next}
          title={t.next}
        >
          {t.next} &raquo;
        </button>
      </div>
    </div>
  );
}
