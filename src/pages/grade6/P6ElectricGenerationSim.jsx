import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P6ElectricGenerationSim.css";

export default function P6ElectricGenerationSim() {
  const navigate = useNavigate();
  const trialOptions = useMemo(
    () => [
      { id: "trial-1", label: "ครั้งที่ 1 ไม่ขัดถูด้วยผ้าแห้ง", short: "ครั้งที่ 1 (ไม่ถู)" },
      { id: "trial-2", label: "ครั้งที่ 2 ถูด้วยผ้าแห้ง 2 นาที", short: "ครั้งที่ 2 (2 นาที)" },
      { id: "trial-3", label: "ครั้งที่ 3 ขัดถูด้วยผ้าแห้ง 5 นาที", short: "ครั้งที่ 3 (5 นาที)" },
    ],
    []
  );

  const [selectedTrial, setSelectedTrial] = useState(null);
  const [showTrialMenu, setShowTrialMenu] = useState(false);
  const [started, setStarted] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const selectedTrialLabel =
    trialOptions.find((item) => item.id === selectedTrial)?.short || "ยังไม่เลือก";
  const canStart = Boolean(selectedTrial);
  const shouldShowHint = !canStart;
  const handleToggleTrial = () => {
    setShowTrialMenu((prev) => !prev);
  };

  const durationSeconds = useMemo(() => {
    if (selectedTrial === "trial-2") return 120;
    if (selectedTrial === "trial-3") return 300;
    return 0;
  }, [selectedTrial]);

  const handleSelectTrial = (id) => {
    setSelectedTrial(id);
    setShowTrialMenu(false);
    setStarted(false);
    setIsRunning(false);
    setIsDone(false);
    const nextDuration = id === "trial-2" ? 120 : id === "trial-3" ? 300 : 0;
    setRemaining(nextDuration);
  };

  const handleStart = () => {
    if (!canStart) {
      setShowTrialMenu(true);
      return;
    }
    setShowTrialMenu(false);
    setStarted(true);
    setRemaining(durationSeconds);
    if (durationSeconds > 0) {
      setIsRunning(true);
      setIsDone(false);
    } else {
      setIsRunning(false);
      setIsDone(true);
    }
  };

  const trialLevel =
    selectedTrial === "trial-2" ? "mid" : selectedTrial === "trial-3" ? "high" : "none";
  const trialIndex = selectedTrial?.split("-")[1] || "";

  useEffect(() => {
    if (!isRunning) return undefined;

    const timerId = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          setIsRunning(false);
          setIsDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning]);

  const formatTime = (value) => {
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleShowResult = () => {
    if (!trialIndex) return;
    navigate(`/p6/experiment/electric-generation/result?trial=${trialIndex}`);
  };

  return (
    <div className="p6-sim-page">
      <div className="p6-sim-stage">
        <div className="p6-sim-left">
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

            {shouldShowHint && (
              <div className="p6-sim-hint">กรุณาเลือกการทดลอง</div>
            )}

            {isDone && (
              <button className="p6-sim-result-btn" type="button" onClick={handleShowResult}>
                ดูผลการทดลอง
              </button>
            )}

            <div className={`p6-sim-timer ${isRunning ? "running" : ""}`}>
              <div className="p6-sim-timer-label">จับเวลา</div>
              <div className="p6-sim-timer-value">{formatTime(remaining)}</div>
              <div className="p6-sim-timer-sub">
                {isRunning ? "กำลังจับเวลา" : isDone ? "ครบเวลา" : "พร้อมเริ่ม"}
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

        <img
          className="p6-sim-boy"
          src="/images/p4/exp1/character-boy.png"
          alt="นักเรียน"
        />

        <div className="p6-sim-table">
          <div className="p6-sim-table-top" />
          <div className="p6-sim-table-leg left" />
          <div className="p6-sim-table-leg right" />
        </div>

        <div className={`p6-sim-balloon level-${trialLevel} ${selectedTrial ? "active" : ""} ${started ? "started" : ""}`}>
          <div
            className={`p6-sim-cloth ${selectedTrial && selectedTrial !== "trial-1" ? "active" : "inactive"} ${
              started && selectedTrial && selectedTrial !== "trial-1" ? "rubbing" : ""
            }`}
          />
          <div className="p6-sim-knot" />
        </div>

        <div className={`p6-sim-papers level-${trialLevel} ${selectedTrial ? "active" : ""} ${started ? "started" : ""}`}>
          {Array.from({ length: 8 }).map((_, idx) => (
            <span key={idx} className={`paper p-${idx + 1}`} />
          ))}
        </div>

        <div className="p6-sim-floor" />
      </div>
    </div>
  );
}
