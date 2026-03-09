import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const COMPLETED_TRIALS_KEY = "p6_electric_generation_completed_trials";

const PAPER_BASE = [
  { left: 0, top: 18, rotate: -12 },
  { left: 20, top: 8, rotate: 10 },
  { left: 38, top: 20, rotate: -6 },
  { left: 56, top: 6, rotate: 16 },
  { left: 72, top: 24, rotate: -18 },
  { left: 90, top: 12, rotate: 8 },
  { left: 48, top: 34, rotate: -4 },
  { left: 76, top: 36, rotate: 14 },
];

const PAPER_TESTING = {
  none: [
    { x: -6, y: 16, opacity: 0.45, scale: 1 },
    { x: -2, y: 18, opacity: 0.45, scale: 1 },
    { x: 3, y: 20, opacity: 0.45, scale: 1 },
    { x: 6, y: 17, opacity: 0.45, scale: 1 },
    { x: 4, y: 22, opacity: 0.45, scale: 1 },
    { x: 8, y: 18, opacity: 0.45, scale: 1 },
    { x: 0, y: 24, opacity: 0.45, scale: 1 },
    { x: 7, y: 25, opacity: 0.45, scale: 1 },
  ],
  mid: [
    { x: -5, y: 12, opacity: 0.4, scale: 1 },
    { x: 4, y: -56, opacity: 1, scale: 1.08 },
    { x: 1, y: 10, opacity: 0.4, scale: 1 },
    { x: 6, y: -54, opacity: 1, scale: 1.08 },
    { x: 6, y: 14, opacity: 0.35, scale: 1 },
    { x: 8, y: 10, opacity: 0.4, scale: 1 },
    { x: -7, y: -50, opacity: 1, scale: 1.08 },
    { x: 4, y: 16, opacity: 0.3, scale: 1 },
  ],
  high: [
    { x: -14, y: -66, opacity: 0.72, scale: 1.05 },
    { x: -6, y: -72, opacity: 0.72, scale: 1.05 },
    { x: 2, y: -64, opacity: 0.72, scale: 1.05 },
    { x: 10, y: -70, opacity: 0.72, scale: 1.05 },
    { x: 16, y: -62, opacity: 0.72, scale: 1.05 },
    { x: 22, y: -56, opacity: 0.72, scale: 1.05 },
    { x: 4, y: -50, opacity: 0.72, scale: 1.05 },
    { x: 8, y: -30, opacity: 0.48, scale: 0.98 },
  ],
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

const persistCompletedTrials = (ids) => {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(COMPLETED_TRIALS_KEY, JSON.stringify(ids));
  } catch {
    // ignore persistence errors
  }
};

const getBalloonStyle = ({ trialLevel, started, isTesting, selectedTrial }) => {
  let transform = "translateX(-50%) translateY(0px)";
  let animation;

  if (isTesting) {
    transform = "translateX(-36%) translateY(76px)";
  } else if (started) {
    if (trialLevel === "high") {
      transform = "translateX(-50%) translateY(-8px)";
      animation = "p6-balloon-high 2.6s ease-in-out infinite";
    } else if (trialLevel === "mid") {
      transform = "translateX(-50%) translateY(-4px)";
      animation = "p6-balloon-mid 2.6s ease-in-out infinite";
    }
  }

  let boxShadow =
    "inset -12px -14px 18px rgba(102, 52, 25, 0.36), inset 6px 8px 12px rgba(255, 244, 225, 0.2)";

  if (selectedTrial) {
    boxShadow += ", 0 0 0 4px rgba(255, 255, 255, 0.72), 0 18px 26px rgba(15, 23, 42, 0.2)";
  }

  if (selectedTrial && trialLevel === "mid") {
    boxShadow += ", 0 0 24px rgba(96, 165, 250, 0.45)";
  }

  if (selectedTrial && trialLevel === "high") {
    boxShadow += ", 0 0 30px rgba(59, 130, 246, 0.58)";
  }

  return { transform, animation, boxShadow };
};

const getPapersContainerStyle = ({ trialLevel, started, isTesting }) => {
  let transform = "translateX(-40%) translateY(0px)";
  let animation;
  let filter = "none";

  if (isTesting) {
    if (trialLevel === "high") {
      transform = "translateX(-30%) translateY(-16px)";
      filter = "drop-shadow(0 0 14px rgba(59, 130, 246, 0.58))";
    } else if (trialLevel === "mid") {
      transform = "translateX(-34%) translateY(-10px)";
      filter = "drop-shadow(0 0 8px rgba(96, 165, 250, 0.36))";
    } else {
      transform = "translateX(-40%) translateY(8px)";
      filter = "saturate(0.9)";
    }
  } else if (started) {
    if (trialLevel === "high") {
      transform = "translateX(-40%) translateY(-12px)";
      animation = "p6-paper-float-high 2.4s ease-in-out infinite";
      filter = "drop-shadow(0 0 12px rgba(59, 130, 246, 0.5))";
    } else if (trialLevel === "mid") {
      transform = "translateX(-40%) translateY(-6px)";
      animation = "p6-paper-float-mid 2.4s ease-in-out infinite";
      filter = "drop-shadow(0 0 8px rgba(96, 165, 250, 0.34))";
    }
  }

  return { transform, animation, filter };
};

const getPaperStyle = ({ index, trialLevel, isTesting }) => {
  const base = PAPER_BASE[index];
  let x = 0;
  let y = 0;
  let opacity = trialLevel === "none" ? 0.45 : 0.92;
  let scale = 1;
  let drop = "none";

  if (isTesting) {
    const state = PAPER_TESTING[trialLevel]?.[index] || { x: 0, y: 0, opacity, scale: 1 };
    x = state.x;
    y = state.y;
    opacity = state.opacity;
    scale = state.scale;

    if (trialLevel === "mid" && [1, 3, 6].includes(index)) {
      drop = "drop-shadow(0 0 4px rgba(191, 219, 254, 0.9))";
    }

    if (trialLevel === "high") {
      drop = "drop-shadow(0 0 5px rgba(191, 219, 254, 0.95))";
    }

    if (trialLevel === "none") {
      drop = "blur(0.2px)";
    }
  }

  return {
    left: `${base.left}px`,
    top: `${base.top}px`,
    opacity,
    filter: drop,
    transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${base.rotate}deg)`,
  };
};

export default function P6ElectricGenerationSim() {
  const navigate = useNavigate();

  const trialOptions = useMemo(
    () => [
      {
        id: "trial-1",
        label: "ครั้งที่ 1 ไม่ขัดถูกด้วยผ้าแห้ง",
        short: "ครั้งที่ 1 (ไม่ถู)",
      },
      {
        id: "trial-2",
        label: "ครั้งที่ 2 ขัดถูด้วยผ้าแห้ง 2 นาที",
        short: "ครั้งที่ 2 (2 นาที)",
      },
      {
        id: "trial-3",
        label: "ครั้งที่ 3 ขัดถูด้วยผ้าแห้ง 5 นาที",
        short: "ครั้งที่ 3 (5 นาที)",
      },
    ],
    [],
  );

  const [selectedTrial, setSelectedTrial] = useState(null);
  const [showTrialMenu, setShowTrialMenu] = useState(false);
  const [started, setStarted] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completedTrials, setCompletedTrials] = useState(() => readCompletedTrials());

  const totalTrials = trialOptions.length;
  const completedCount = completedTrials.length;
  const allTrialsCompleted = completedCount === totalTrials;
  const selectedTrialLabel =
    trialOptions.find((item) => item.id === selectedTrial)?.short || "ยังไม่เลือก";
  const canStart = Boolean(selectedTrial);
  const shouldShowHint = !canStart;

  const durationSeconds = useMemo(() => {
    if (selectedTrial === "trial-2") return 120;
    if (selectedTrial === "trial-3") return 300;
    return 0;
  }, [selectedTrial]);

  const trialLevel =
    selectedTrial === "trial-2" ? "mid" : selectedTrial === "trial-3" ? "high" : "none";
  const trialIndex = selectedTrial?.split("-")[1] || "";
  const isRubbing = isRunning && selectedTrial !== "trial-1";
  const canShowResult = Boolean(selectedTrial && started && isTesting);

  const markTrialCompleted = () => {
    if (!selectedTrial) return;
    const next = Array.from(new Set([...readCompletedTrials(), selectedTrial]));
    persistCompletedTrials(next);
    setCompletedTrials(next);
  };

  const handleToggleTrial = () => {
    setShowTrialMenu((prev) => !prev);
  };

  const handleSelectTrial = (id) => {
    setSelectedTrial(id);
    setShowTrialMenu(false);
    setStarted(false);
    setIsTesting(false);
    setIsRunning(false);
    const nextDuration = id === "trial-2" ? 120 : id === "trial-3" ? 300 : 0;
    setRemaining(nextDuration);
  };

  const startPaperTesting = () => {
    setIsTesting(true);
  };

  const handleStart = () => {
    if (!canStart) {
      setShowTrialMenu(true);
      return;
    }

    setShowTrialMenu(false);
    setStarted(true);
    setRemaining(durationSeconds);
    setIsTesting(false);

    if (durationSeconds > 0) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
      startPaperTesting();
    }
  };

  useEffect(() => {
    if (!isRunning) return undefined;

    const timerId = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          setIsRunning(false);
          startPaperTesting();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning]);

  const handleSkip = () => {
    if (!trialIndex) return;
    setIsRunning(false);
    setRemaining(0);
    startPaperTesting();
  };

  const handleShowResult = () => {
    if (!trialIndex || !isTesting) return;
    markTrialCompleted();
    navigate(`/p6/experiment/electric-generation/result?trial=${trialIndex}`);
  };

  const handleResetProgress = () => {
    persistCompletedTrials([]);
    setCompletedTrials([]);
    setSelectedTrial(null);
    setShowTrialMenu(false);
    setStarted(false);
    setIsTesting(false);
    setRemaining(0);
    setIsRunning(false);
  };

  const formatTime = (value) => {
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const pageBg = {
    background:
      "radial-gradient(80% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(74% 50% at 50% 70%, #f6efef 0 56%, transparent 57%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  const balloonStyle = getBalloonStyle({ trialLevel, started, isTesting, selectedTrial });
  const papersStyle = getPapersContainerStyle({ trialLevel, started, isTesting });

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden p-[clamp(16px,4vw,36px)]"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div
        className="pointer-events-none absolute right-[clamp(110px,10vw,180px)] top-[10px] h-[clamp(96px,10vw,136px)] w-[clamp(60px,6vw,92px)] bg-[#f7bd2b]"
        style={{
          clipPath:
            "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
          filter: "drop-shadow(0 8px 12px rgba(145, 101, 9, 0.22))",
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[210px]"
        style={{
          background:
            "linear-gradient(#4c4f75, #4c4f75) right 138px bottom 0 / 8px 124px no-repeat, linear-gradient(#4c4f75, #4c4f75) right 84px bottom 0 / 8px 98px no-repeat, linear-gradient(#4c4f75, #4c4f75) right 58px bottom 88px / 118px 8px no-repeat, repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.45) 0 2px, transparent 2px 20px) left 40px bottom 14px / 190px 56px no-repeat, repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.35) 0 2px, transparent 2px 16px) left 40px bottom 14px / 190px 56px no-repeat, linear-gradient(180deg, #43c4e8, #2c8dc9) left 40px bottom 14px / 190px 56px no-repeat, repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.45) 0 2px, transparent 2px 20px) left 252px bottom 14px / 158px 56px no-repeat, repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.35) 0 2px, transparent 2px 16px) left 252px bottom 14px / 158px 56px no-repeat, linear-gradient(180deg, #43c4e8, #2c8dc9) left 252px bottom 14px / 158px 56px no-repeat, linear-gradient(180deg, rgba(199, 227, 242, 0), rgba(190, 217, 233, 0.72)) center bottom / 100% 124px no-repeat",
        }}
      />

      <div
        className="relative isolate z-[1] h-[min(720px,92vh)] w-[min(1220px,96vw)] overflow-hidden rounded-[30px] border border-white/95 shadow-[0_24px_44px_rgba(15,23,42,0.2),inset_0_1px_0_rgba(255,255,255,0.82)]"
        style={{
          background:
            "radial-gradient(110% 64% at 50% 8%, rgba(255, 255, 255, 0.72) 0 36%, rgba(255, 255, 255, 0) 62%), radial-gradient(44% 22% at 12% 34%, rgba(187, 230, 246, 0.74) 0 68%, rgba(187, 230, 246, 0) 69%), radial-gradient(44% 22% at 88% 34%, rgba(187, 230, 246, 0.74) 0 68%, rgba(187, 230, 246, 0) 69%), linear-gradient(180deg, #e2eef8 0%, #d6e6f4 56%, #c6dced 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(125deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0)), radial-gradient(680px 210px at 50% 0%, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0))",
          }}
        />
        <div className="pointer-events-none absolute -bottom-[20%] -right-[10%] z-0 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.3),rgba(56,189,248,0))]" />

        <button
          className="absolute left-6 top-[18px] z-[6] cursor-pointer rounded-2xl border border-slate-400/35 bg-gradient-to-br from-white via-[#eef5ff] to-[#e1f0ff] px-[17px] py-2.5 text-[15px] font-black text-slate-800 shadow-[0_12px_22px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5"
          type="button"
          onClick={() => navigate("/p6/experiment/electric-generation/steps")}
        >
          ← ย้อนกลับ
        </button>

        <div className="p6-sim-mobile-left absolute left-8 top-[80px] z-[8] grid w-[128px] justify-items-center gap-6">
          <div className="hidden items-center justify-between gap-2">
            <div className="whitespace-nowrap rounded-[13px] border border-slate-400/40 bg-gradient-to-br from-white via-[#eef5ff] to-[#e1eeff] px-[13px] py-[9px] text-xs font-black text-blue-900 shadow-[0_10px_16px_rgba(15,23,42,0.1)]">
              ความคืบหน้า {completedCount}/{totalTrials}
            </div>
            <button
              className="cursor-pointer rounded-[11px] border border-red-500/30 bg-gradient-to-br from-white via-[#fff3f3] to-[#ffe8e8] px-3 py-[9px] text-xs font-black text-red-700 shadow-[0_8px_14px_rgba(17,24,39,0.08)] transition hover:-translate-y-0.5"
              type="button"
              onClick={handleResetProgress}
            >
              รีเซ็ต
            </button>
          </div>

          <div className="relative">
            <button
              className="grid w-[112px] cursor-pointer justify-items-center gap-1.5 text-center text-[34px] font-extrabold leading-[1.05] text-slate-900 transition hover:-translate-y-0.5"
              type="button"
              onClick={handleToggleTrial}
            >
              <div className="grid h-[66px] w-[66px] place-items-center rounded-full border-[6px] border-[#f8d8d8] bg-[radial-gradient(circle_at_30%_30%,#ffd7dc,#ef97a3)] text-white shadow-[0_10px_18px_rgba(15,23,42,0.16)]">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[28px] w-[28px]">
                  <path d="M9 6l9 6-9 6V6z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-[34px] font-extrabold leading-[1.05]">เลือกอุปกรณ์</span>
              <span className="block max-w-[112px] truncate text-[11px] font-bold text-slate-600">{selectedTrialLabel}</span>
            </button>

            {showTrialMenu && (
              <div className="p6-sim-mobile-menu absolute left-[calc(100%+12px)] top-0 z-[10] grid w-[min(310px,56vw)] gap-2 rounded-[14px] border border-slate-400/40 bg-gradient-to-br from-white to-[#f6faff] p-2.5 shadow-[0_18px_30px_rgba(15,23,42,0.18)]">
                {trialOptions.map((item) => (
                  <button
                    key={item.id}
                    className={`cursor-pointer rounded-[10px] px-[10px] py-2 text-left text-sm font-bold leading-[1.35] transition hover:-translate-y-0.5 ${
                      selectedTrial === item.id
                        ? "bg-blue-600/20 text-blue-900"
                        : "bg-blue-600/10 text-slate-800 hover:bg-blue-600/20"
                    }`}
                    type="button"
                    onClick={() => handleSelectTrial(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              className={`grid w-[112px] justify-items-center gap-1.5 text-center text-[34px] font-extrabold leading-[1.05] transition ${
                canStart ? "cursor-pointer text-slate-900 hover:-translate-y-0.5" : "cursor-not-allowed text-slate-400 opacity-60"
              }`}
              type="button"
              onClick={handleStart}
              aria-disabled={!canStart}
            >
              <div className="grid h-[66px] w-[66px] place-items-center rounded-full border-[6px] border-[#fff1a8] bg-[radial-gradient(circle_at_30%_30%,#ffd84c,#f4b400)] text-white shadow-[0_10px_18px_rgba(15,23,42,0.16)]">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[30px] w-[30px]">
                  <path d="M9 6l9 6-9 6V6z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-[34px] font-extrabold leading-[1.05]">เริ่ม</span>
              {canStart && <span className="text-[11px] font-bold text-slate-600">เริ่มการทดลอง</span>}
            </button>

            {shouldShowHint && (
              <div className="absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl border border-slate-400/50 bg-white px-3 py-2 text-xs font-extrabold text-slate-900 shadow-[0_10px_18px_rgba(17,24,39,0.14)]">
                กรุณาเลือกการทดลอง
              </div>
            )}

            {allTrialsCompleted && (
              <button
                className="mt-2 hidden w-full cursor-pointer rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 px-3 py-2.5 text-[13px] font-black text-white shadow-[0_12px_20px_rgba(37,99,235,0.26)] transition hover:-translate-y-0.5"
                type="button"
                onClick={() => navigate("/p6/experiment/electric-generation/summary")}
              >
                สรุปผล
              </button>
            )}

            {isRunning && (
              <button
                className="mt-2.5 hidden w-full cursor-pointer rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 px-3 py-2.5 text-[13px] font-black text-white shadow-[0_12px_20px_rgba(234,88,12,0.3)] transition hover:-translate-y-0.5"
                type="button"
                onClick={handleSkip}
              >
                ข้าม
              </button>
            )}

            {canShowResult && (
              <button
                className="mt-2.5 hidden w-full cursor-pointer rounded-xl border border-slate-400/50 bg-gradient-to-br from-white to-[#eef4ff] px-3 py-2.5 text-[13px] font-black text-slate-800 shadow-[0_10px_18px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5"
                type="button"
                onClick={handleShowResult}
              >
                ดูผลการทดลอง
              </button>
            )}

            <div
              className={`absolute -top-[132px] left-1/2 min-w-[112px] -translate-x-1/2 rounded-[18px] border border-slate-400/45 bg-gradient-to-br from-white/95 to-[#f1f7ff]/90 px-2 py-2 text-center shadow-[0_10px_18px_rgba(15,23,42,0.12)] ${
                isRunning ? "border-blue-600/50 shadow-[0_12px_22px_rgba(37,99,235,0.2)]" : ""
              }`}
            >
              <div className="text-[34px] font-extrabold leading-[1.05] text-slate-800">จับเวลา</div>
              <div className="my-0.5 text-xl font-black tracking-[1px] text-slate-900">{formatTime(remaining)}</div>
              <div className="hidden text-[11px] font-bold text-slate-500">
                {isRunning
                  ? "กำลังจับเวลา"
                  : isTesting
                    ? "กำลังทดสอบกับเศษกระดาษ"
                    : started
                      ? "ครบเวลา"
                      : "พร้อมเริ่ม"}
              </div>
            </div>
          </div>
        </div>

        <button
          className="hidden absolute right-[38px] top-7 z-[4] h-14 w-14 place-items-center rounded-2xl border-2 border-slate-400/45 bg-gradient-to-br from-white to-[#edf5ff] text-slate-900 shadow-[0_12px_22px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5"
          type="button"
          aria-label="sound"
        >
          <svg viewBox="0 0 64 64" aria-hidden="true" className="h-[34px] w-[34px]">
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

        <div className="p6-sim-mobile-bubble absolute left-[38%] top-[16px] z-[5] max-w-[340px] rounded-[24px] border-[5px] border-slate-900 bg-gradient-to-br from-white to-[#f8fbff] px-6 py-3 text-[20px] font-extrabold text-slate-900 shadow-[0_14px_26px_rgba(15,23,42,0.18)]">
          แรงไฟฟ้าเกิดขึ้นได้อย่างไรนะ
          <span
            className="absolute right-[-10px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 border-b-[3px] border-r-[3px] border-slate-900 bg-white"
            style={{ transform: "translateY(-50%) rotate(-45deg)" }}
          />
        </div>

        <img
          className="p6-sim-mobile-boy absolute bottom-[8%] right-[17%] z-[3] h-[min(500px,78%)] w-auto"
          style={{ filter: "saturate(1.04) drop-shadow(0 18px 22px rgba(15, 23, 42, 0.24))" }}
          src="/images/p4/exp1/character-boy.png"
          alt="นักเรียน"
        />

        <div className="p6-sim-mobile-table absolute bottom-[30%] left-[56%] z-[2] h-[140px] w-[min(860px,76%)] -translate-x-1/2">
          <div
            className="absolute inset-x-0 h-10 rounded-[14px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0)), linear-gradient(180deg, #f5bd79, #d7863f 62%, #ba6a2d 100%)",
              boxShadow:
                "0 12px 18px rgba(84, 51, 19, 0.35), inset 0 -2px 0 rgba(120, 67, 29, 0.35)",
            }}
          />
          <div
            className="absolute bottom-[-10px] left-[70px] h-[120px] w-12 rounded-lg"
            style={{
              background: "linear-gradient(180deg, #c97838, #8a4a1f)",
              boxShadow:
                "0 10px 16px rgba(84, 51, 19, 0.3), inset -2px -2px 0 rgba(88, 45, 17, 0.25)",
              transform: "skewX(-6deg)",
            }}
          />
          <div
            className="absolute bottom-[-10px] right-[70px] h-[120px] w-12 rounded-lg"
            style={{
              background: "linear-gradient(180deg, #c97838, #8a4a1f)",
              boxShadow:
                "0 10px 16px rgba(84, 51, 19, 0.3), inset -2px -2px 0 rgba(88, 45, 17, 0.25)",
              transform: "skewX(6deg)",
            }}
          />
        </div>

        <div
          className="absolute bottom-[39%] left-[53%] z-[3] h-[140px] w-[140px] rounded-full"
          style={{
            ...balloonStyle,
            background:
              "radial-gradient(circle at 28% 24%, rgba(255, 255, 255, 0.9) 0 16%, rgba(255, 255, 255, 0.14) 32%, transparent 46%), radial-gradient(circle at 56% 50%, #ffc68c 0%, #f29a5b 45%, #dc7a38 100%)",
          }}
        >
          <span className="absolute left-[26px] top-[18px] h-[34px] w-[34px] rounded-full bg-white/60" />
          <span className="absolute bottom-[-16px] left-1/2 h-[42px] w-0.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-slate-500/95 to-slate-400/40" />

          <div
            className={`absolute left-1/2 top-[-18px] h-9 w-[70px] -translate-x-1/2 rounded-[11px] ${
              selectedTrial && selectedTrial !== "trial-1" ? "" : "opacity-50 grayscale-[0.2]"
            }`}
            style={{
              background:
                "linear-gradient(145deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0)), repeating-linear-gradient(90deg, rgba(30, 64, 175, 0.08) 0 2px, transparent 2px 7px), linear-gradient(135deg, #91cdff, #4f9be7)",
              boxShadow:
                selectedTrial && selectedTrial !== "trial-1"
                  ? "0 0 0 3px rgba(255, 255, 255, 0.8), 0 10px 18px rgba(19, 60, 110, 0.25)"
                  : "0 8px 12px rgba(19, 60, 110, 0.2), inset -4px -5px 8px rgba(30, 64, 175, 0.15)",
              transform: isTesting
                ? "translateX(-50%) translateY(-8px) scale(0.88) rotate(-8deg)"
                : "translateX(-50%) rotate(-12deg)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
              opacity: isTesting ? 0 : 1,
              animation: isRubbing ? "p6-cloth-rub 1.1s ease-in-out infinite" : undefined,
            }}
          />

          <div className="absolute bottom-[6px] right-2 h-[14px] w-[14px] rounded-full bg-[#df7e3c] shadow-[0_4px_8px_rgba(84,51,19,0.2)]" />
        </div>

        <div
          className="pointer-events-none absolute bottom-[35%] left-[53%] z-[2] h-[84px] w-[130px]"
          style={papersStyle}
        >
          {PAPER_BASE.map((_, idx) => (
            <span
              key={idx}
              className="absolute h-[10px] w-5 rounded-[3px] border border-slate-400/45 bg-gradient-to-br from-white/90 to-slate-100/95 shadow-[0_6px_10px_rgba(17,24,39,0.18)]"
              style={getPaperStyle({ index: idx, trialLevel, isTesting })}
            />
          ))}
        </div>

        <div className="p6-sim-mobile-lang absolute bottom-3 left-4 z-[9] inline-flex items-center gap-2 rounded-[18px] border border-sky-200 bg-white/90 p-2 shadow-[0_10px_16px_rgba(15,23,42,0.12)]">
          <button className="rounded-full bg-sky-500 px-4 py-2 text-xl font-bold text-white" type="button">
            ไทย
          </button>
          <button className="rounded-full bg-sky-100 px-4 py-2 text-xl font-bold text-sky-700" type="button">
            อังกฤษ
          </button>
          <button className="rounded-full bg-sky-100 px-4 py-2 text-xl font-bold text-sky-700" type="button">
            มลายู
          </button>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-sky-300 bg-gradient-to-br from-white to-sky-100 text-sky-700"
            type="button"
            aria-label="sound"
          >
            <svg viewBox="0 0 64 64" aria-hidden="true" className="h-5 w-5">
              <path d="M14 26h12l14-10v32l-14-10H14z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
              <path d="M46 22c4 4 4 16 0 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {canShowResult && (
          <button
            className="p6-sim-mobile-next absolute bottom-4 right-4 z-[10] cursor-pointer rounded-full border border-red-500/40 bg-gradient-to-b from-[#ff7676] to-[#e83e3e] px-6 py-2.5 text-[38px] font-extrabold text-white shadow-[0_12px_18px_rgba(185,28,28,0.28)] transition hover:-translate-y-0.5"
            type="button"
            onClick={handleShowResult}
          >
            ต่อไป »
          </button>
        )}

        <div
          className="absolute inset-x-0 bottom-0 z-[1] h-[32%] origin-top"
          style={{
            background:
              "linear-gradient(180deg, rgba(188, 226, 246, 0.74), rgba(141, 194, 226, 0.92)), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.62) 0 40px, rgba(132, 179, 209, 0.72) 40px 42px), repeating-linear-gradient(0deg, transparent 0 34px, rgba(132, 179, 209, 0.72) 34px 36px)",
            transform: "perspective(700px) rotateX(12deg)",
            boxShadow: "inset 0 10px 18px rgba(51, 65, 85, 0.08)",
          }}
        />

        <style>{`
          @keyframes p6-balloon-mid {
            0%, 100% { transform: translateX(-50%) translateY(-4px); }
            50% { transform: translateX(-50%) translateY(-10px); }
          }
          @keyframes p6-balloon-high {
            0%, 100% { transform: translateX(-50%) translateY(-8px); }
            50% { transform: translateX(-50%) translateY(-20px); }
          }
          @keyframes p6-paper-float-mid {
            0%, 100% { transform: translateX(-40%) translateY(-6px); }
            50% { transform: translateX(-40%) translateY(-16px); }
          }
          @keyframes p6-paper-float-high {
            0%, 100% { transform: translateX(-40%) translateY(-12px); }
            50% { transform: translateX(-40%) translateY(-30px); }
          }
          @keyframes p6-cloth-rub {
            0%, 100% { transform: translateX(-50%) rotate(-12deg); }
            50% { transform: translateX(calc(-50% + 10px)) translateY(2px) rotate(0deg); }
          }
          @media (max-width: 1200px) {
            .p6-sim-mobile-left {
              left: 18px !important;
              top: 72px !important;
              width: 120px !important;
            }
            .p6-sim-mobile-bubble {
              left: 34% !important;
              top: 16px !important;
              max-width: 300px !important;
              font-size: 18px !important;
            }
            .p6-sim-mobile-boy {
              right: 12% !important;
              bottom: 8% !important;
              height: min(460px, 72%) !important;
            }
            .p6-sim-mobile-table {
              left: 56% !important;
              bottom: 30% !important;
              width: min(780px, 78%) !important;
            }
            .p6-sim-mobile-lang {
              transform: scale(0.9);
              transform-origin: left bottom;
            }
          }
          @media (max-width: 900px) {
            .p6-sim-mobile-left {
              left: 10px !important;
              top: 78px !important;
              width: 112px !important;
            }
            .p6-sim-mobile-bubble {
              left: 30% !important;
              top: 12px !important;
              max-width: 260px !important;
              font-size: 16px !important;
              border-width: 4px !important;
            }
            .p6-sim-mobile-boy {
              right: 8% !important;
              bottom: 7% !important;
              height: min(390px, 66%) !important;
            }
            .p6-sim-mobile-table {
              left: 56% !important;
              bottom: 31% !important;
              width: min(700px, 84%) !important;
            }
            .p6-sim-mobile-menu {
              width: min(260px, 58vw) !important;
            }
            .p6-sim-mobile-lang {
              left: 8px !important;
              bottom: 8px !important;
              transform: scale(0.8);
              transform-origin: left bottom;
            }
            .p6-sim-mobile-next {
              font-size: 24px !important;
              padding: 8px 18px !important;
            }
          }
          @media (max-width: 640px) {
            .p6-sim-mobile-left {
              left: 8px !important;
              right: auto !important;
              top: 84px !important;
              width: 108px !important;
            }
            .p6-sim-mobile-bubble {
              left: 28% !important;
              top: 8px !important;
              max-width: min(220px, 58vw) !important;
              font-size: 14px !important;
              padding: 10px 12px !important;
            }
            .p6-sim-mobile-boy {
              right: 3% !important;
              bottom: 7% !important;
              height: min(290px, 48%) !important;
            }
            .p6-sim-mobile-table {
              left: 58% !important;
              bottom: 30% !important;
              width: min(520px, 92%) !important;
            }
            .p6-sim-mobile-menu {
              left: 0 !important;
              top: calc(100% + 8px) !important;
              width: min(220px, 72vw) !important;
            }
            .p6-sim-mobile-lang {
              transform: scale(0.72);
            }
            .p6-sim-mobile-next {
              right: 8px !important;
              bottom: 8px !important;
              font-size: 20px !important;
              padding: 7px 14px !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

