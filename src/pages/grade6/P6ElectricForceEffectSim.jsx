import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P6ElectricForceEffectSim.css";

const TRIAL_OPTIONS = [
  { id: "rub-both", label: "ขัดถูลูกโป่งทั้ง 2 ใบด้วยกระดาษเยื่อ" },
  { id: "rub-one", label: "ขัดถูลูกโป่ง 1 ใบ (ใบซ้าย) ด้วยกระดาษเยื่อ" },
];

const RESULT_BY_TRIAL = {
  "rub-both": "ผลักกัน",
  "rub-one": "ดึงดูดกัน",
};

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
  const [sequenceNotice, setSequenceNotice] = useState("");
  const [trialResults, setTrialResults] = useState({});

  const completedCount = useMemo(
    () => TRIAL_OPTIONS.filter((trial) => Boolean(trialResults[trial.id])).length,
    [trialResults]
  );
  const totalTrials = TRIAL_OPTIONS.length;
  const allTrialsCompleted = completedCount === totalTrials;
  const nextPendingTrial = useMemo(
    () => TRIAL_OPTIONS.find((trial) => !trialResults[trial.id]) || null,
    [trialResults]
  );
  const selectedTrialLabel =
    TRIAL_OPTIONS.find((t) => t.id === selectedTrial)?.label || "ยังไม่ได้เลือก";
  const currentResult = selectedTrial ? trialResults[selectedTrial] : null;
  const totalExperimentTime = useMemo(
    () =>
      TRIAL_OPTIONS.reduce((sum, trial) => {
        const trialTime = trialResults[trial.id]?.time || 0;
        return sum + trialTime;
      }, 0),
    [trialResults]
  );

  const leftCharged = charged && started && Boolean(selectedTrial);
  const rightCharged = charged && started && selectedTrial === "rub-both";
  const isRubbing = started && isRunning && Boolean(selectedTrial);
  const mode = !charged || !started ? "idle" : selectedTrial === "rub-both" ? "repel" : "attract";

  const hint = useMemo(() => {
    if (!selectedTrial) return "กด \"เลือกการทดลอง\" ก่อนเริ่มการทดลอง";
    if (!started) return `พร้อมทดลอง: ${selectedTrialLabel}`;
    if (isRunning) return "กำลังขัดถู... กด \"หยุด\" เพื่อสิ้นสุดการทดลอง";
    if (currentResult) return "บันทึกผลแล้ว เลือกการทดลองถัดไปได้";
    return "กด \"เริ่ม\" เพื่อเริ่มขัดถู";
  }, [currentResult, isRunning, selectedTrial, selectedTrialLabel, started]);

  const summaryText = useMemo(() => {
    if (isRunning) return "";
    if (allTrialsCompleted) return "ทำครบทั้ง 2 การทดลองแล้ว กด \"สรุปผลการทดลอง\" เพื่อดูผล";
    if (nextPendingTrial) {
      return `ทำการทดลองทีละอย่าง: ทำแล้ว ${completedCount}/${totalTrials} (ถัดไป: ${nextPendingTrial.label})`;
    }
    return "";
  }, [allTrialsCompleted, completedCount, isRunning, nextPendingTrial, totalTrials]);

  const bubbleText = useMemo(() => {
    if (!selectedTrial && nextPendingTrial) return `เริ่มจาก ${nextPendingTrial.label} ก่อนนะ`;
    if (!selectedTrial) return "เริ่มจากเลือกการทดลองก่อนนะ";
    if (!allTrialsCompleted && trialResults[selectedTrial] && nextPendingTrial) {
      return `การทดลองนี้เสร็จแล้ว ต่อไปลอง ${nextPendingTrial.label}`;
    }
    if (selectedTrial === "rub-one") return "ขัดลูกโป่ง 1 ใบ (ใบซ้าย) ด้วยกระดาษเยื่อ จะเกิดอะไรขึ้นนะ";
    return `${selectedTrialLabel} จะเกิดอะไรขึ้นนะ`;
  }, [allTrialsCompleted, nextPendingTrial, selectedTrial, selectedTrialLabel, trialResults]);

  useEffect(() => {
    if (!isRunning) return undefined;
    const timerId = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(timerId);
  }, [isRunning]);

  const canPickTrial = (trialId) => {
    const alreadyDone = Boolean(trialResults[trialId]);
    if (alreadyDone) return true;
    if (!nextPendingTrial) return true;
    return nextPendingTrial.id === trialId;
  };

  const handleSelectTrial = (id) => {
    if (!canPickTrial(id) && nextPendingTrial) {
      setSequenceNotice(`กรุณาทดลอง "${nextPendingTrial.label}" ก่อน`);
      return;
    }
    setSequenceNotice("");
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
      setSequenceNotice("กรุณาเลือกการทดลองก่อนเริ่ม");
      return;
    }
    if (!allTrialsCompleted && trialResults[selectedTrial] && nextPendingTrial) {
      setSequenceNotice(`การทดลองนี้เสร็จแล้ว ให้ทำ "${nextPendingTrial.label}" ต่อ`);
      return;
    }
    setSequenceNotice("");
    setStarted(true);
    setShowTrialMenu(false);
    setCharged(false);
    setSeconds(0);
    setIsRunning(true);
  };

  const handleStop = () => {
    if (!isRunning || !selectedTrial) return;
    const currentLabel = TRIAL_OPTIONS.find((trial) => trial.id === selectedTrial)?.label || "";
    const nextAfterCurrent = TRIAL_OPTIONS.find(
      (trial) => trial.id !== selectedTrial && !trialResults[trial.id]
    );

    setIsRunning(false);
    setCharged(true);
    setTrialResults((prev) => ({
      ...prev,
      [selectedTrial]: {
        result: RESULT_BY_TRIAL[selectedTrial],
        time: seconds,
      },
    }));
    if (nextAfterCurrent) {
      setSequenceNotice(`เสร็จแล้ว: ${currentLabel} | ถัดไป: ${nextAfterCurrent.label}`);
      return;
    }
    setSequenceNotice("ทำครบทุกการทดลองแล้ว กดปุ่ม \"สรุปผลการทดลอง\" ได้เลย");
  };

  const handleGoSummary = () => {
    if (!allTrialsCompleted || isRunning) {
      setSequenceNotice(`ยังทำไม่ครบ ${completedCount}/${totalTrials} การทดลอง`);
      return;
    }
    navigate(`/p6/experiment/electric-force-effect/summary?time=${totalExperimentTime}`);
  };

  const handleReset = () => {
    setSelectedTrial(null);
    setTrialResults({});
    setStarted(false);
    setCharged(false);
    setIsRunning(false);
    setSeconds(0);
    setShowTrialMenu(false);
    setSequenceNotice("");
  };

  return (
    <div className="p6-force-sim-page">
      <div className="p6-force-sim-stage">
        <button
          className="p6-force-sim-backTop"
          type="button"
          onClick={() => navigate("/p6/experiment/electric-force-effect/steps")}
        >
          ← ย้อนกลับ
        </button>

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
                <div className="p6-force-sim-menu-title">เลือกการทดลอง (ทำทีละอย่าง)</div>
                {TRIAL_OPTIONS.map((opt) => {
                  const locked = !canPickTrial(opt.id);
                  const done = Boolean(trialResults[opt.id]);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={selectedTrial === opt.id ? "active" : ""}
                      onClick={() => handleSelectTrial(opt.id)}
                      aria-disabled={locked}
                    >
                      <span>
                        {opt.label}
                        {done ? " (เสร็จแล้ว)" : locked ? " (รอคิว)" : ""}
                      </span>
                      {selectedTrial === opt.id && <span aria-hidden="true">✓</span>}
                    </button>
                  );
                })}
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

          <div className="p6-force-sim-timer">ความคืบหน้า: {completedCount}/{totalTrials}</div>
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
                  <span className="p6-force-sim-summary-text">{summaryText}</span>
                </div>
              )}

              {sequenceNotice && (
                <div className="p6-force-sim-summary">
                  <span className="p6-force-sim-summary-text">{sequenceNotice}</span>
                </div>
              )}

              <div className="p6-force-sim-result">
                <div className="p6-force-sim-toast">ซ่อนผลสรุปไว้ก่อน กด "สรุปผลการทดลอง" เพื่อดูผลทั้งหมด</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p6-force-sim-right">
          <div className="p6-force-sim-bubble">{bubbleText}</div>
          <img className="p6-force-sim-character" src="/images/p4/exp1/character-boy.png" alt="นักเรียน" />
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
                disabled={!allTrialsCompleted || isRunning}
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
            >
              {isRunning ? "หยุด" : "เริ่ม"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
