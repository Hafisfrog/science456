import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย" },
  { id: "en", label: "English" },
  { id: "ms", label: "Melayu" },
];

const TABLE = {
  headers: ["วัสดุ", "ขัดถูด้วยกระดาษเช็ดทั้ง 2", "ขัดถูด้วยกระดาษเช็ดแค่ 1"],
  rows: [
    { label: "ลูกโป่ง", both: "ผลักกัน", one: "ดึงดูดกัน" },
    { label: "ปากกาเมจิก", both: "ผลักกัน", one: "ดึงดูดกัน" },
  ],
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
  const backLabel = language === "th" ? "ย้อนกลับ" : language === "en" ? "Back" : "Kembali";
  const nextLabel =
    language === "th"
      ? "สรุปผลการทดลอง"
      : language === "en"
        ? "Experiment Summary"
        : "Ringkasan Eksperimen";
  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="min-h-screen px-[clamp(16px,4vw,36px)] py-[clamp(18px,4vw,40px)] text-slate-900"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="mx-auto flex min-h-[calc(100vh-80px)] w-[min(1200px,96vw)] flex-col">
        <h1 className="m-0 text-[clamp(22px,2.8vw,32px)] font-black">การแสดงผลการทดลอง</h1>

        <div className="mt-5 overflow-hidden rounded-[18px] border-2 border-slate-900 bg-[#fff7f3] shadow-[0_18px_30px_rgba(17,24,39,0.12)]">
          <div className="grid grid-cols-[1fr_1.3fr_1.3fr] bg-[#fff1ea] text-center text-[clamp(15px,1.6vw,18px)] font-black">
            {TABLE.headers.map((head) => (
              <div key={head} className="border-r-2 border-slate-900 px-3 py-4 last:border-r-0">
                {head}
              </div>
            ))}
          </div>
          {TABLE.rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[1fr_1.3fr_1.3fr] text-center text-[clamp(15px,1.6vw,18px)] font-bold"
            >
              <div className="border-r-2 border-t-2 border-slate-900 px-3 py-5">{row.label}</div>
              <div className="border-r-2 border-t-2 border-slate-900 px-3 py-5">{row.both}</div>
              <div className="border-t-2 border-slate-900 px-3 py-5">{row.one}</div>
            </div>
          ))}
        </div>

        {timeParam > 0 && (
          <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border-2 border-slate-900/20 bg-white px-4 py-2 text-base font-black shadow-[0_16px_26px_rgba(17,24,39,0.12)]">
            เวลาการถู: {formatTime(timeParam)}
          </div>
        )}

        <div className="mt-auto" />
      </div>

      <div className="fixed bottom-6 left-6 z-20 flex gap-3 rounded-2xl bg-white p-2 shadow">
        {LANGUAGE_OPTIONS.map((item) => (
          <button
            key={item.id}
            onClick={() => setLanguage(item.id)}
            className={`rounded-xl px-4 py-2 font-bold ${
              language === item.id ? "bg-sky-500 text-white" : "bg-sky-100"
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
          aria-label={backLabel}
          title={backLabel}
        >
          <span className="text-[22px] leading-none">←</span>
          <span className="text-sm font-black leading-none">{backLabel}</span>
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-blue-600 px-4 py-3 text-white shadow"
          type="button"
          onClick={() =>
            navigate(
              `/p6/experiment/electric-force-effect/summary?time=${Number.isFinite(timeParam) ? timeParam : 0}`
            )
          }
          aria-label={nextLabel}
          title={nextLabel}
        >
          <span className="text-sm font-black leading-none">{nextLabel}</span>
          <span className="text-[22px] leading-none">→</span>
        </button>
      </div>
    </div>
  );
}
