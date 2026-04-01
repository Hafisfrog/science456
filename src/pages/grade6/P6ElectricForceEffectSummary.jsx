import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย" },
  { id: "en", label: "English" },
  { id: "ms", label: "Melayu" },
];

const formatTime = (totalSeconds) => {
  const safe = Number.isFinite(totalSeconds) && totalSeconds >= 0 ? totalSeconds : 0;
  const minutes = Math.floor(safe / 60);
  const seconds = Math.floor(safe % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const SUMMARY_BY_EQUIPMENT = {
  balloon: [
    "เมื่อขัดถูลูกโป่งทั้ง 2 ใบด้วยกระดาษเยื่อ ลูกโป่งทั้งสองจะมีประจุชนิดเดียวกัน เมื่อนำมาเข้าใกล้กันจึงเกิดแรงผลักกัน",
    "เมื่อขัดถูลูกโป่งเพียง 1 ใบ อีกใบไม่ได้ขัดถู จะเกิดการเหนี่ยวนำประจุ เมื่อนำมาเข้าใกล้กันจึงเกิดแรงดึงดูดกัน",
  ],
  marker: [
    "เมื่อขัดถูปากกาเมจิกทั้ง 2 ด้ามด้วยกระดาษเยื่อ ปากกาทั้งสองจะมีประจุชนิดเดียวกัน เมื่อนำมาเข้าใกล้กันจึงเกิดแรงผลักกัน",
    "เมื่อขัดถูปากกาเมจิกเพียง 1 ด้าม อีกด้ามไม่ได้ขัดถู จะเกิดการเหนี่ยวนำประจุ เมื่อนำมาเข้าใกล้กันจึงเกิดแรงดึงดูดกัน",
  ],
};

export default function P6ElectricForceEffectSummary() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const timeParam = Number(searchParams.get("time") || 0);
  const equipmentParam = searchParams.get("equipment");
  const summaryItems = SUMMARY_BY_EQUIPMENT[equipmentParam] || SUMMARY_BY_EQUIPMENT.balloon;
  const [language, setLanguage] = useState("th");
  const backLabel = language === "th" ? "ย้อนกลับ" : language === "en" ? "Back" : "Kembali";
  const nextLabel =
    language === "th"
      ? "สรุปสาระสำคัญ"
      : language === "en"
        ? "Key Takeaways"
        : "Ringkasan Utama";

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="grid min-h-screen place-items-center p-[clamp(18px,4vw,46px)] text-slate-900"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="relative flex min-h-[calc(100vh-90px)] w-[min(1100px,100%)] flex-col">
        <div className="relative overflow-hidden rounded-[22px] bg-[#e7f7ff]/92 p-[clamp(22px,4vw,34px)] shadow-[0_28px_56px_rgba(17,24,39,0.14)] backdrop-blur-[10px]">
          <h1 className="mb-[14px] mt-0 text-[clamp(22px,2.6vw,30px)] font-black">สรุปผลการทดลอง</h1>

          <ol className="m-0 grid gap-[18px] pl-[22px]">
            {summaryItems.map((item, idx) => (
              <li key={`${idx}-${item}`} className="text-[clamp(16px,1.8vw,18px)] font-bold leading-[1.7]">
                {item}
              </li>
            ))}
          </ol>

          {timeParam > 0 && (
            <div className="mt-[18px] inline-flex items-center gap-2.5 rounded-full border-2 border-slate-900/15 bg-white/70 px-[14px] py-2.5 text-base font-black shadow-[0_18px_26px_rgba(17,24,39,0.12)]">
              เวลาการถู: {formatTime(timeParam)}
            </div>
          )}
        </div>

        <div className="mt-auto" />

        <div className="mt-auto" />
      </div>

      <div className="fixed bottom-6 left-6 z-20 flex gap-3 rounded-2xl bg-white p-2 shadow-lg">
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
          onClick={() =>
            navigate(
              `/p6/experiment/electric-force-effect/result?time=${Number.isFinite(timeParam) ? timeParam : 0}`
            )
          }
          aria-label={backLabel}
          title={backLabel}
        >
          <span className="text-[22px] leading-none">←</span>
          <span className="text-sm font-black leading-none">{backLabel}</span>
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-blue-600 px-4 py-3 text-white shadow"
          type="button"
          onClick={() => navigate("/p6/experiment/electric-force-effect/key-summary")}
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
