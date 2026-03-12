import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const COMPLETED_TRIALS_KEY = "p6_electric_generation_completed_trials";

const RESULTS = {
  1: {
    outcome: "ไม่เกิดการเปลี่ยนแปลง",
    time: "0",
    intensity: "low",
  },
  2: {
    outcome: "เศษกระดาษถูกดูดเล็กน้อย",
    time: "2",
    intensity: "mid",
  },
  3: {
    outcome: "เศษกระดาษถูกดูดมากขึ้น",
    time: "5",
    intensity: "high",
  },
};

const PAPER_POSITIONS = [
  { left: 0, top: 18, rotate: -12 },
  { left: 14, top: 8, rotate: 10 },
  { left: 28, top: 20, rotate: -6 },
  { left: 42, top: 6, rotate: 16 },
  { left: 56, top: 18, rotate: -18 },
  { left: 70, top: 10, rotate: 8 },
];

const readCompletedTrials = () => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.sessionStorage.getItem(COMPLETED_TRIALS_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const allowed = new Set(["trial-1", "trial-2", "trial-3"]);
    return Array.from(new Set(parsed.filter((id) => allowed.has(id))));
  } catch {
    return [];
  }
};

const getPaperContainerStyle = (intensity) => {
  if (intensity === "high") {
    return {
      opacity: 1,
      transform: "translateX(-30%) translateY(-12px)",
      animation: "p6-summary-float-high 2.2s ease-in-out infinite",
    };
  }

  if (intensity === "mid") {
    return {
      opacity: 1,
      transform: "translateX(-60%) translateY(0px)",
      animation: "p6-summary-float-mid 2.2s ease-in-out infinite",
    };
  }

  return {
    opacity: 0.5,
    transform: "translateX(-60%) translateY(6px)",
  };
};

export default function P6ElectricGenerationSummary() {
  const navigate = useNavigate();
  const completedCount = readCompletedTrials().length;
  const allTrialsCompleted = completedCount === 3;
  const summaryRows = [RESULTS[1], RESULTS[2], RESULTS[3]];

  useEffect(() => {
    if (!allTrialsCompleted) {
      navigate("/p6/experiment/electric-generation/sim", { replace: true });
    }
  }, [allTrialsCompleted, navigate]);

  if (!allTrialsCompleted) return null;

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-[#e9f7ff] p-[clamp(16px,4vw,36px)]"
      style={{ fontFamily: "Prompt, sans-serif" }}
    >
      <div
        className="relative isolate min-h-[min(680px,90vh)] w-[min(1200px,96vw)] overflow-hidden rounded-[26px] border border-white/90 p-[clamp(24px,4vw,40px)] shadow-[0_24px_40px_rgba(17,24,39,0.18)]"
        style={{ background: "linear-gradient(180deg, #e7f8ff 0%, #dff3ff 55%, #cde9f9 100%)" }}
      >
        <div className="relative z-10 pb-[140px]">
          <h1 className="mb-[18px] mt-0 text-center text-[clamp(26px,3vw,34px)] font-black text-slate-900">
            ผลการทดลอง
          </h1>

          <div className="overflow-hidden rounded-[20px] border border-slate-400/45 bg-white shadow-[0_16px_30px_rgba(17,24,39,0.12)]">
            <div className="grid grid-cols-1 items-center bg-[#fdeaa1] px-[10px] py-[14px] text-center text-base font-black text-slate-900 md:grid-cols-[1.1fr_1.2fr_0.8fr_1.6fr]">
              <div>วัตถุ</div>
              <div>ผลการทดลอง</div>
              <div>เวลา (นาที)</div>
              <div>ภาพแสดงการดูดของเศษกระดาษ</div>
            </div>

            {summaryRows.map((row, index) => (
              <div
                className="grid grid-cols-1 gap-[10px] px-3 py-[18px] text-base font-bold text-slate-900 md:grid-cols-[1.1fr_1.2fr_0.8fr_1.6fr] md:items-center"
                key={`row-${index + 1}`}
              >
                <div className="flex items-center gap-3 pl-[10px] md:justify-start">
                  <div
                    className="relative h-[42px] w-[42px] rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 30%, #ffd7b0 0%, #f3a86e 45%, #e18a54 100%)",
                      boxShadow: "inset -5px -8px 12px rgba(102, 52, 25, 0.35)",
                    }}
                  >
                    <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-[#e18a54]" />
                  </div>
                  <div>ลูกโป่ง + เศษกระดาษ</div>
                </div>

                <div className="text-center">{row.outcome}</div>
                <div className="text-center">{row.time}</div>

                <div className="relative grid h-[90px] place-items-center">
                  <div
                    className="relative h-[54px] w-[54px] rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 30%, #ffd7b0 0%, #f3a86e 45%, #e18a54 100%)",
                      boxShadow: "inset -4px -6px 10px rgba(102, 52, 25, 0.35)",
                    }}
                  >
                    <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-[#e18a54]" />
                  </div>

                  <div
                    className="absolute bottom-[18px] left-1/2 h-10 w-[90px]"
                    style={getPaperContainerStyle(row.intensity)}
                  >
                    {PAPER_POSITIONS.map((paper, paperIdx) => (
                      <span
                        key={paperIdx}
                        className="absolute h-[7px] w-[14px] rounded bg-gradient-to-br from-red-500 to-blue-500"
                        style={{
                          left: `${paper.left}px`,
                          top: `${paper.top}px`,
                          transform: `rotate(${paper.rotate}deg)`,
                        }}
                      />
                    ))}
                  </div>

                  <div className="absolute bottom-[10px] left-1/2 h-[30px] w-0 -translate-x-1/2 border-l-2 border-dashed border-slate-800">
                    <span
                      className="absolute left-[-6px] top-[-6px] h-3 w-3 border-l-2 border-t-2 border-slate-800"
                      style={{ transform: "rotate(45deg)" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[18px] rounded-[18px] border border-slate-400/40 bg-white px-[18px] py-4 shadow-[0_14px_26px_rgba(17,24,39,0.12)]">
            <div className="mb-2 flex items-center justify-between gap-4">
              <h2 className="m-0 text-xl font-black text-blue-500">สรุปผลการทดลอง</h2>
              <button
                className="grid h-12 w-12 place-items-center rounded-[14px] border-2 border-slate-400/60 bg-white text-slate-900 shadow-[0_10px_18px_rgba(17,24,39,0.12)]"
                type="button"
                aria-label="sound"
              >
                <svg viewBox="0 0 64 64" aria-hidden="true">
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
            </div>
            <p className="m-0 text-[15px] font-semibold leading-[1.5] text-slate-800">
              เมื่อนำผ้าแห้งขัดถูกลูกโป่ง จะเกิดไฟฟ้าสถิต ทำให้เศษกระดาษถูกดูดเข้าหาลูกโป่ง
              ยิ่งขัดถูนาน แรงดึงดูดจะมากขึ้น
            </p>
          </div>

          <button
            className="mx-auto mt-5 block cursor-pointer rounded-[18px] border-2 border-slate-400/50 bg-white px-7 py-3 text-base font-black text-slate-800 shadow-[0_12px_24px_rgba(17,24,39,0.12)]"
            type="button"
            onClick={() => navigate("/p6/experiment/electric-generation/sim")}
          >
            ← ย้อนกลับ
          </button>

          <button
            className="mx-auto mt-2.5 block cursor-pointer rounded-[18px] bg-[#4b8bd1] px-10 py-[14px] text-lg font-black text-white shadow-[0_12px_24px_rgba(17,24,39,0.18)]"
            type="button"
            onClick={() => navigate("/p6/experiment/electric-generation/sim")}
          >
            ทดลองใหม่
          </button>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[28%] origin-top opacity-90"
          style={{
            background:
              "linear-gradient(180deg, rgba(180, 223, 245, 0.7), rgba(154, 205, 235, 0.9)), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.55) 0 40px, rgba(146, 192, 221, 0.7) 40px 42px), repeating-linear-gradient(0deg, transparent 0 34px, rgba(146, 192, 221, 0.7) 34px 36px)",
            transform: "perspective(700px) rotateX(12deg)",
          }}
        />

        <style>{`
          @keyframes p6-summary-float-mid {
            0%, 100% { transform: translateX(-60%) translateY(0px); }
            50% { transform: translateX(-60%) translateY(-8px); }
          }
          @keyframes p6-summary-float-high {
            0%, 100% { transform: translateX(-30%) translateY(-12px); }
            50% { transform: translateX(-30%) translateY(-22px); }
          }
        `}</style>
      </div>
    </div>
  );
}
