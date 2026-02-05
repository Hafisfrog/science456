import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P6ElectricForceEffectSim.css";

const TRIAL_OPTIONS = [
  { id: "rub-both", label: "ขัดถูลูกโป่งทั้ง 2 ใบด้วยกระดาษเยื่อ" },
  { id: "rub-one", label: "ขัดถูลูกโป่ง 1 ใบด้วยกระดาษเยื่อ" },
];

const CHARGES = {
  left: [
    { kind: "plus", top: "26%", left: "22%" },
    { kind: "plus", top: "40%", left: "62%" },
    { kind: "plus", top: "58%", left: "34%" },
    { kind: "plus", top: "48%", left: "18%" },
    { kind: "minus", top: "28%", left: "58%" },
    { kind: "minus", top: "56%", left: "66%" },
    { kind: "minus", top: "44%", left: "46%" },
  ],
  right: [
    { kind: "plus", top: "30%", left: "26%" },
    { kind: "plus", top: "54%", left: "24%" },
    { kind: "plus", top: "44%", left: "62%" },
    { kind: "plus", top: "60%", left: "60%" },
    { kind: "minus", top: "26%", left: "64%" },
    { kind: "minus", top: "42%", left: "40%" },
    { kind: "minus", top: "58%", left: "40%" },
  ],
};

const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export default function P6ElectricForceEffectSim() {
  const navigate = useNavigate();
  const [selectedTrial, setSelectedTrial] = useState(null);
  const [showTrialMenu, setShowTrialMenu] = useState(false);
  const [started, setStarted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [charged, setCharged] = useState(false);

  const selectedTrialLabel = TRIAL_OPTIONS.find((t) => t.id === selectedTrial)?.label || "ยังไม่ได้เลือก";
  const leftCharged = charged && started && Boolean(selectedTrial);
  const rightCharged = charged && started && selectedTrial === "rub-both";
  const isRubbing = started && isRunning && Boolean(selectedTrial);
  const mode = !charged || !started ? "idle" : selectedTrial === "rub-both" ? "repel" : "attract";
  const resultLabel = selectedTrial === "rub-both" ? "ผลักกัน" : selectedTrial === "rub-one" ? "ดึงดูดกัน" : "";
  const summaryText = useMemo(() => {
    if (!started || !charged || isRunning || !selectedTrial) return "";
    if (selectedTrial === "rub-both") return "สรุป: ขัดถูทั้ง 2 ใบ → ลูกโป่งผลักกัน (ไม่ดึงดูดกัน)";
    return "สรุป: ขัดถูแค่ 1 ใบ → ลูกโป่งดึงดูดกัน";
  }, [charged, isRunning, selectedTrial, started]);

  const hint = useMemo(() => {
    if (!selectedTrial) return "กด “เลือกการทดลอง” ก่อนเริ่มการทดลอง";
    if (!started) {
      if (selectedTrial === "rub-one") return `${selectedTrialLabel} (ขัดที่ลูกโป่งใบซ้าย)`;
      return selectedTrialLabel;
    }
    if (isRunning) return "กำลังขัดถู... กด “หยุด” เพื่อดูผลการทดลอง";
    if (!charged) return "กด “เริ่ม” เพื่อเริ่มขัดถู";
    if (selectedTrial === "rub-both") return "สังเกตการผลักกันของลูกโป่งที่มีประจุชนิดเดียวกัน";
    return "สังเกตการดึงดูดกันระหว่างลูกโป่งที่มีประจุกับลูกโป่งที่ไม่มีประจุ";
  }, [charged, isRunning, selectedTrial, selectedTrialLabel, started]);

  const bubbleText = useMemo(() => {
    if (!selectedTrial) return "เริ่มจากเลือกการทดลองก่อนนะ";
    if (selectedTrial === "rub-one") return `ขัดที่ลูกโป่ง 1 ใบ (ใบซ้าย) ด้วยกระดาษเยื่อ จะเกิดอะไรขึ้นนะ`;
    return `${selectedTrialLabel} จะเกิดอะไรขึ้นนะ`;
  }, [selectedTrial, selectedTrialLabel]);

  useEffect(() => {
    if (!isRunning) return undefined;
    const timerId = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(timerId);
  }, [isRunning]);

  const handleSelectTrial = (id) => {
    setSelectedTrial(id);
    setShowTrialMenu(false);
    setStarted(false);
    setCharged(false);
    setIsRunning(false);
    setSeconds(0);
  };

  const handleStart = () => {
    if (!selectedTrial) {
      setShowTrialMenu(true);
      return;
    }
    setStarted(true);
    setShowTrialMenu(false);
    setCharged(false);
    setSeconds(0);
    setIsRunning(true);
  };

  const handleStop = () => {
    if (!isRunning) return;
    setIsRunning(false);
    setCharged(true);
  };

  const handleGoSummary = () => {
    if (!started || isRunning) return;
    navigate(`/p6/experiment/electric-force-effect/summary?time=${seconds}`);
  };

  const handleReset = () => {
    setStarted(false);
    setCharged(false);
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div className="p6-force-sim-page">
      <div className="p6-force-sim-stage">
        <div className="p6-force-sim-sidebar">
          <div className="p6-force-sim-sidewrap">
            <button
              className="p6-force-sim-sidebtn"
              type="button"
              onClick={() => setShowTrialMenu((p) => !p)}
            >
              <div className="p6-force-sim-icon pink" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                  <path d="M9 6l9 6-9 6V6z" fill="currentColor" />
                </svg>
              </div>
              <span>เลือกการทดลอง</span>
            </button>

            {showTrialMenu && (
              <div className="p6-force-sim-menu" role="dialog" aria-label="เลือกการทดลอง">
                <div className="p6-force-sim-menu-title">เลือกการทดลอง</div>
                {TRIAL_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className={selectedTrial === opt.id ? "active" : ""}
                    onClick={() => handleSelectTrial(opt.id)}
                  >
                    <span>{opt.label}</span>
                    {selectedTrial === opt.id && <span aria-hidden="true">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="p6-force-sim-sidebtn" type="button" onClick={handleStart}>
            <div className="p6-force-sim-icon yellow" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path d="M9 6l9 6-9 6V6z" fill="currentColor" />
              </svg>
            </div>
            <span>เริ่ม</span>
          </button>
        </div>

        <div className="p6-force-sim-center">
          <div className="p6-force-sim-board">
            <div className="p6-force-sim-balloons">
              <div
                className={`p6-force-sim-balloon left ${leftCharged ? `charged ${mode}` : ""}`}
                aria-label="balloon-left"
              >
                {selectedTrial === "rub-one" && isRubbing && (
                  <div className="p6-force-sim-rub rub-left" aria-hidden="true">
                    <div className="p6-force-sim-tissue" />
                  </div>
                )}
                {selectedTrial === "rub-both" && isRubbing && (
                  <div className="p6-force-sim-rub rub-left" aria-hidden="true">
                    <div className="p6-force-sim-tissue" />
                  </div>
                )}
                <div className="p6-force-sim-charges" aria-hidden="true">
                  {CHARGES.left.map((c, idx) => (
                    <span
                      key={`l-${idx}`}
                      className={`p6-force-sim-charge ${c.kind === "minus" ? "minus" : ""}`}
                      style={{ top: c.top, left: c.left }}
                    >
                      {c.kind === "plus" ? "+" : ""}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className={`p6-force-sim-balloon right ${rightCharged ? `charged ${mode}` : mode === "attract" && leftCharged ? "attract" : ""}`}
                aria-label="balloon-right"
              >
                {selectedTrial === "rub-both" && isRubbing && (
                  <div className="p6-force-sim-rub rub-right" aria-hidden="true">
                    <div className="p6-force-sim-tissue" />
                  </div>
                )}
                {rightCharged && (
                  <div className="p6-force-sim-charges" aria-hidden="true">
                    {CHARGES.right.map((c, idx) => (
                      <span
                        key={`r-${idx}`}
                        className={`p6-force-sim-charge ${c.kind === "minus" ? "minus" : ""}`}
                        style={{ top: c.top, left: c.left }}
                      >
                        {c.kind === "plus" ? "+" : ""}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p6-force-sim-instruction">
              {hint}
              <div className="p6-force-sim-toast">ตัวเลือก: {selectedTrialLabel}</div>
              {summaryText && (
                <div className="p6-force-sim-summary" role="status">
                  <span className={`p6-force-sim-summary-chip ${mode}`}>{resultLabel}</span>
                  <span className="p6-force-sim-summary-text">{summaryText}</span>
                </div>
              )}

              {charged && started && !isRunning && (
                <div className="p6-force-sim-result">
                  <table className="p6-force-sim-result-table" aria-label="ตารางสรุปผลการทดลอง">
                    <thead>
                      <tr>
                        <th>วัสดุ</th>
                        <th className={selectedTrial === "rub-both" ? "active" : ""}>ขัดถูด้วยกระดาษเยื่อทั้ง 2</th>
                        <th className={selectedTrial === "rub-one" ? "active" : ""}>ขัดถูด้วยกระดาษเยื่อแค่ 1</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>ลูกโป่ง</td>
                        <td className={selectedTrial === "rub-both" ? "active" : ""}>ผลักกัน</td>
                        <td className={selectedTrial === "rub-one" ? "active" : ""}>ดึงดูดกัน</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p6-force-sim-right">
          <div className="p6-force-sim-bubble">{bubbleText}</div>
          <img
            className="p6-force-sim-character"
            src="/images/p4/exp1/character-boy.png"
            alt="นักเรียน"
          />
          {started && <div className="p6-force-sim-timer">เวลาการถู: {formatTime(seconds)}</div>}

          <div className="p6-force-sim-actions">
            <div className="p6-force-sim-actions-row">
              <button
                className="p6-force-sim-action"
                type="button"
                onClick={() => navigate("/p6/experiment/electric-force-effect/steps")}
              >
                ← กลับขั้นตอน
              </button>
              <button
                className="p6-force-sim-action"
                type="button"
                onClick={handleGoSummary}
                disabled={!charged || isRunning}
              >
                สรุปผลการทดลอง
              </button>
              <button className="p6-force-sim-action" type="button" onClick={handleReset}>
                เริ่มใหม่
              </button>
            </div>
            <button
              className="p6-force-sim-action primary"
              type="button"
              onClick={isRunning ? handleStop : handleStart}
              disabled={!selectedTrial}
            >
              {isRunning ? "หยุด" : "เริ่ม"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
