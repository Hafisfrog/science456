import { useNavigate, useSearchParams } from "react-router-dom";

const COMPLETED_TRIALS_KEY = "p6_electric_generation_completed_trials";
const TOTAL_TRIALS = 3;

const RESULTS = {
  1: {
    title: "ไม่ถูด้วยผ้า",
    outcome: "ไม่เกิดการเปลี่ยนแปลง",
    time: "0",
    intensity: "low",
  },
  2: {
    title: "ถู 2 นาที",
    outcome: "เศษกระดาษดูดเล็กน้อย",
    time: "2",
    intensity: "mid",
  },
  3: {
    title: "ถู 5 นาที",
    outcome: "เศษกระดาษดูดมากขึ้น",
    time: "5",
    intensity: "high",
  },
};

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

const PAPER_POSITIONS = [
  { left: 0, top: 18, rotate: -12 },
  { left: 14, top: 8, rotate: 10 },
  { left: 28, top: 20, rotate: -6 },
  { left: 42, top: 6, rotate: 16 },
  { left: 56, top: 18, rotate: -18 },
  { left: 70, top: 10, rotate: 8 },
];

const getPaperContainerStyle = (intensity) => {
  if (intensity === "high") {
    return {
      opacity: 1,
      transform: "translateX(-30%) translateY(-12px)",
      animation: "p6-result-float-high 2.2s ease-in-out infinite",
    };
  }

  if (intensity === "mid") {
    return {
      opacity: 1,
      transform: "translateX(-60%) translateY(0px)",
      animation: "p6-result-float-mid 2.2s ease-in-out infinite",
    };
  }

  return {
    opacity: 0.5,
    transform: "translateX(-60%) translateY(6px)",
  };
};

export default function P6ElectricGenerationResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selected = searchParams.get("trial") || "1";
  const data = RESULTS[selected] || RESULTS[1];
  const completedCount = readCompletedTrials().length;
  const allTrialsCompleted = completedCount === TOTAL_TRIALS;

  const pageBg = {
    background: "linear-gradient(180deg, #e7f8ff 0%, #dff3ff 55%, #cde9f9 100%)",
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-[#e9f7ff] p-[clamp(16px,4vw,36px)]"
      style={{ fontFamily: "Prompt, sans-serif" }}
    >
      <div className="relative min-h-[min(680px,90vh)] w-[min(1200px,96vw)] overflow-hidden rounded-[26px] border border-white/90 p-[clamp(24px,4vw,40px)] shadow-[0_24px_40px_rgba(17,24,39,0.18)]" style={pageBg}>
        <h1 className="mb-[18px] mt-0 text-center text-[clamp(26px,3vw,34px)] font-black text-slate-900">ผลการทดลอง</h1>

        <div className="overflow-hidden rounded-[22px] border border-slate-400/45 bg-white shadow-[0_16px_30px_rgba(17,24,39,0.12)]">
          <div className="grid grid-cols-1 items-center bg-[#fdeaa1] px-[10px] py-[14px] text-center text-base font-black text-slate-900 md:grid-cols-[1.1fr_1.2fr_0.8fr_1.6fr]">
            <div>วัตถุ</div>
            <div>ผลการทดลอง</div>
            <div>เวลา (นาที)</div>
            <div>ภาพแสดงการดูดของเศษกระดาษ</div>
          </div>

          <div className="grid grid-cols-1 gap-[10px] px-3 py-[18px] text-base font-bold text-slate-900 md:grid-cols-[1.1fr_1.2fr_0.8fr_1.6fr] md:items-center">
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

            <div className="text-center">{data.outcome}</div>
            <div className="text-center">{data.time}</div>

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
                style={getPaperContainerStyle(data.intensity)}
              >
                {PAPER_POSITIONS.map((paper, idx) => (
                  <span
                    key={idx}
                    className="absolute h-[7px] w-[14px] rounded bg-gradient-to-br from-red-500 to-blue-500"
                    style={{
                      left: `${paper.left}px`,
                      top: `${paper.top}px`,
                      transform: `rotate(${paper.rotate}deg)`,
                    }}
                  />
                ))}
              </div>

              <div className="absolute bottom-[10px] left-1/2 h-[30px] w-0 border-l-2 border-dashed border-slate-800 -translate-x-1/2">
                <span
                  className="absolute left-[-6px] top-[-6px] h-3 w-3 border-l-2 border-t-2 border-slate-800"
                  style={{ transform: "rotate(45deg)" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-[22px] flex flex-wrap justify-center gap-4">
          <button
            className="cursor-pointer rounded-[18px] border-2 border-slate-400/50 bg-white px-7 py-[14px] text-lg font-black text-slate-800 shadow-[0_12px_24px_rgba(17,24,39,0.12)]"
            type="button"
            onClick={() => navigate("/p6/experiment/electric-generation/sim")}
          >
            ← ย้อนกลับ
          </button>
          <button
            className="cursor-pointer rounded-[18px] bg-[#4b8bd1] px-10 py-[14px] text-lg font-black text-white shadow-[0_12px_24px_rgba(17,24,39,0.18)]"
            type="button"
            onClick={() => navigate("/p6/experiment/electric-generation/sim")}
          >
            ทดลองใหม่
          </button>
          {allTrialsCompleted && (
            <button
              className="cursor-pointer rounded-[18px] border-2 border-blue-500/40 bg-white px-9 py-[14px] text-lg font-black text-slate-800 shadow-[0_12px_24px_rgba(17,24,39,0.12)]"
              type="button"
              onClick={() =>
                navigate(`/p6/experiment/electric-generation/summary?trial=${selected}`)
              }
            >
              สรุปผลการทดลอง
            </button>
          )}
        </div>

        {!allTrialsCompleted && (
          <div className="mt-2.5 text-center text-[13px] font-bold text-blue-900">
            กรุณาทำการทดลองให้ครบทั้ง 3 ครั้งก่อนสรุปผล ({completedCount}/{TOTAL_TRIALS})
          </div>
        )}

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] origin-top opacity-90"
          style={{
            background:
              "linear-gradient(180deg, rgba(180, 223, 245, 0.7), rgba(154, 205, 235, 0.9)), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.55) 0 40px, rgba(146, 192, 221, 0.7) 40px 42px), repeating-linear-gradient(0deg, transparent 0 34px, rgba(146, 192, 221, 0.7) 34px 36px)",
            transform: "perspective(700px) rotateX(12deg)",
          }}
        />

        <style>{`
          @keyframes p6-result-float-mid {
            0%, 100% { transform: translateX(-60%) translateY(0px); }
            50% { transform: translateX(-60%) translateY(-8px); }
          }
          @keyframes p6-result-float-high {
            0%, 100% { transform: translateX(-30%) translateY(-12px); }
            50% { transform: translateX(-30%) translateY(-22px); }
          }
        `}</style>
      </div>
    </div>
  );
}
