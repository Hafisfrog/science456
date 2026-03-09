import { useNavigate, useSearchParams } from "react-router-dom";

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

  const pageBg = {
    background:
      "radial-gradient(circle at 25% 12%, rgba(255, 255, 255, 0.7), transparent 55%), radial-gradient(circle at 85% 18%, rgba(255, 255, 255, 0.55), transparent 52%), repeating-linear-gradient(0deg, transparent 0 26px, rgba(44, 112, 201, 0.06) 26px 27px), repeating-linear-gradient(90deg, transparent 0 26px, rgba(44, 112, 201, 0.06) 26px 27px), linear-gradient(180deg, #e8f7ff, #dff3ff 55%, #edf9ff)",
  };

  return (
    <div
      className="grid min-h-screen place-items-center p-[clamp(18px,4vw,46px)] text-slate-900"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="relative w-[min(1100px,100%)]">
        <div className="relative overflow-hidden rounded-[22px] border-2 border-white/75 bg-[#e7f7ff]/92 p-[clamp(22px,4vw,34px)] pr-[clamp(70px,10vw,110px)] shadow-[0_28px_56px_rgba(17,24,39,0.14)] backdrop-blur-[10px] max-[720px]:pr-[22px]">
          <button
            className="absolute right-[18px] top-[18px] grid h-[58px] w-[58px] place-items-center rounded-[18px] border-2 border-slate-900/35 bg-white/75 shadow-[0_14px_22px_rgba(17,24,39,0.16)] max-[720px]:static max-[720px]:mb-2.5 max-[720px]:ml-auto"
            type="button"
            aria-label="sound"
          >
            <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
              <path
                d="M14 26h12l14-10v32l-14-10H14z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M46 22c4 4 4 16 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M52 16c7 7 7 25 0 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>

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

        <div className="mt-[18px] flex flex-wrap justify-between gap-3 max-[720px]:justify-center">
          <button
            className="cursor-pointer rounded-2xl bg-white/95 px-[18px] py-3 font-black text-slate-900 shadow-[0_16px_28px_rgba(17,24,39,0.14)] transition hover:-translate-y-0.5"
            type="button"
            onClick={() => navigate("/p6/experiment/electric-force-effect/sim")}
          >
            ← กลับหน้าจำลอง
          </button>
          <button
            className="cursor-pointer rounded-2xl bg-blue-600 px-[18px] py-3 font-black text-white shadow-[0_16px_28px_rgba(17,24,39,0.14)] transition hover:-translate-y-0.5"
            type="button"
            onClick={() => navigate("/p6/electric-force/experiments")}
          >
            กลับหน้าเลือกการทดลอง →
          </button>
        </div>

        <div className="relative mt-[18px] h-[220px] overflow-hidden rounded-[18px] bg-gradient-to-b from-[#e7f7ff]/0 to-sky-300/35" aria-hidden="true">
          <div
            className="absolute inset-[-30%_-10%_-10%_-10%] origin-top"
            style={{
              transform: "perspective(700px) rotateX(65deg)",
              background:
                "repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.85) 0 3px, transparent 3px 44px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.85) 0 3px, transparent 3px 88px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
