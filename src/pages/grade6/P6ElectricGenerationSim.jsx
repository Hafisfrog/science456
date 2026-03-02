import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P6ElectricGenerationSim.css";

const COMPLETED_TRIALS_KEY = "p6_electric_generation_completed_trials";

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

export default function P6ElectricGenerationSim() {
  const navigate = useNavigate();

  const trialOptions = useMemo(
    () => [
      {
        id: "trial-1",
        label: "ครั้งที่ 1 ไม่ขัดถูด้วยผ้าแห้ง",
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

  return (
    <div className="p6-sim-page">
      <div className="p6-sim-stage">
        <button
          className="p6-sim-back"
          type="button"
          onClick={() => navigate("/p6/experiment/electric-generation/steps")}
        >
          ← ย้อนกลับ
        </button>

        <div className="p6-sim-left">
          <div className="p6-sim-progressRow">
            <div className="p6-sim-progress">ความคืบหน้า {completedCount}/{totalTrials}</div>
            <button className="p6-sim-resetBtn" type="button" onClick={handleResetProgress}>
              รีเซ็ต
            </button>
          </div>

          <div className="p6-sim-control-wrap">
            <button className="p6-sim-control" type="button" onClick={handleToggleTrial}>
              <div className="p6-sim-icon pink">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 6l9 6-9 6V6z" fill="currentColor" />
                </svg>
              </div>
              <span>เลือกการทดลอง</span>
              <span className="p6-sim-control-sub">{selectedTrialLabel}</span>
            </button>

            {showTrialMenu && (
              <div className="p6-sim-menu">
                {trialOptions.map((item) => (
                  <button
                    key={item.id}
                    className={`p6-sim-menu-btn ${selectedTrial === item.id ? "active" : ""}`}
                    type="button"
                    onClick={() => handleSelectTrial(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p6-sim-control-wrap">
            <button
              className={`p6-sim-control ${canStart ? "" : "disabled"} ${started ? "active" : ""}`}
              type="button"
              onClick={handleStart}
              aria-disabled={!canStart}
            >
              <div className="p6-sim-icon yellow">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 6l9 6-9 6V6z" fill="currentColor" />
                </svg>
              </div>
              <span>เริ่ม</span>
              {canStart && <span className="p6-sim-control-sub">เริ่มการทดลอง</span>}
            </button>

            {shouldShowHint && <div className="p6-sim-hint">กรุณาเลือกการทดลอง</div>}

            {allTrialsCompleted && (
              <button
                className="p6-sim-summary-btn"
                type="button"
                onClick={() => navigate("/p6/experiment/electric-generation/summary")}
              >
                สรุปผล
              </button>
            )}

            {isRunning && (
              <button className="p6-sim-skip-btn" type="button" onClick={handleSkip}>
                ข้าม
              </button>
            )}

            {canShowResult && (
              <button className="p6-sim-result-btn" type="button" onClick={handleShowResult}>
                {"\u0E14\u0E39\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E17\u0E14\u0E25\u0E2D\u0E07"}
              </button>
            )}

            <div className={`p6-sim-timer ${isRunning ? "running" : ""}`}>
              <div className="p6-sim-timer-label">จับเวลา</div>
              <div className="p6-sim-timer-value">{formatTime(remaining)}</div>
              <div className="p6-sim-timer-sub">
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

        <button className="p6-sim-sound" type="button" aria-label="sound">
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

        <div className="p6-sim-bubble">แรงไฟฟ้าเกิดขึ้นได้อย่างไรนะ</div>

        <img className="p6-sim-boy" src="/images/p4/exp1/character-boy.png" alt="นักเรียน" />

        <div className="p6-sim-table">
          <div className="p6-sim-table-top" />
          <div className="p6-sim-table-leg left" />
          <div className="p6-sim-table-leg right" />
        </div>

        <div
          className={`p6-sim-balloon level-${trialLevel} ${selectedTrial ? "active" : ""} ${started ? "started" : ""} ${isTesting ? "testing" : ""}`}
        >
          <div
            className={`p6-sim-cloth ${selectedTrial && selectedTrial !== "trial-1" ? "active" : "inactive"} ${
              isRubbing ? "rubbing" : ""
            } ${isTesting ? "testing" : ""}`}
          />
          <div className="p6-sim-knot" />
        </div>

        <div
          className={`p6-sim-papers level-${trialLevel} ${selectedTrial ? "active" : ""} ${isTesting ? "started" : ""} ${isTesting ? "testing" : ""}`}
        >
          {Array.from({ length: 8 }).map((_, idx) => (
            <span key={idx} className={`paper p-${idx + 1}`} />
          ))}
        </div>

        <div className="p6-sim-floor" />
      </div>
    </div>
  );
}
