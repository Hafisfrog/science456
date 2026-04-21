import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import forceEffectSimStyles from "./P6ElectricForceEffectSimStyles";
const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย" },
   { id: "ms", label: "มลายู" },
  { id: "en", label: "อังกฤษ" },
];
const MIN_RUB_SECONDS = 15;
const TRIAL_OPTIONS = [
  {
    id: "balloon-both",
    equipment: "balloon",
    mode: "both",
    label: {
      th: "ขัดถูลูกโป่งทั้ง 2 ใบด้วยกระดาษเยื่อ",
      en: "Rub both balloons with tissue paper",
      ms: "Gosok kedua-dua belon dengan kertas tisu",
    },
  },
  {
    id: "balloon-one",
    equipment: "balloon",
    mode: "one",
    label: {
      th: "ขัดถูลูกโป่ง 1 ใบ (ใบซ้าย) ด้วยกระดาษเยื่อ",
      en: "Rub 1 balloon (left) with tissue paper",
      ms: "Gosok 1 belon (kiri) dengan kertas tisu",
    },
  },
  {
    id: "marker-both",
    equipment: "marker",
    mode: "both",
    label: {
      th: "ขัดถูปากกาเมจิกทั้ง 2 ด้ามด้วยกระดาษเยื่อ",
      en: "Rub both marker pens with tissue paper",
      ms: "Gosok kedua-dua pen marker dengan kertas tisu",
    },
  },
  {
    id: "marker-one",
    equipment: "marker",
    mode: "one",
    label: {
      th: "ขัดถูปากกาเมจิก 1 ด้าม (ด้ามซ้าย) ด้วยกระดาษเยื่อ",
      en: "Rub 1 marker pen (left) with tissue paper",
      ms: "Gosok 1 pen marker (kiri) dengan kertas tisu",
    },
  },
];
const RESULT_BY_MODE = {
  both: {
    th: "ผลักกัน",
    en: "Repel",
    ms: "Tolak-menolak",
  },
  one: {
    th: "ดึงดูดกัน",
    en: "Attract",
    ms: "Tarik-menarik",
  },
};
const EQUIPMENT_LABEL = {
  balloon: {
    th: "ลูกโป่ง",
    en: "balloon",
    ms: "belon",
  },
  marker: {
    th: "ปากกาเมจิก",
    en: "marker pen",
    ms: "pen marker",
  },
};
const UI_TEXT = {
  th: {
    backTop: "<< ย้อนกลับ",
    selectTrial: "เลือกการทดลอง",
    start: "เริ่ม",
    progress: "ความคืบหน้า",
    menuTitle: "เลือกการทดลอง",
    done: "เสร็จแล้ว",
    waiting: "รอคิว",
    selected: "ตัวเลือก",
    currentTrial: "ตอนนี้ทดลอง",
    hiddenSummary: 'ซ่อนผลสรุปไว้ก่อน กด "สรุปผลการทดลอง" เพื่อดูผลทั้งหมด',
    summary: "สรุปผลการทดลอง",
    reset: "รีเซ็ต",
    stop: "หยุด",
    skip: "ข้าม",
    time: "เวลาการถู",
    result: "ผลการทดลอง",
    chooseEquipAndTrial: "กรุณาเลือกอุปกรณ์และการทดลองก่อนเริ่ม",
    chooseTrialFirst: "กรุณาเลือกการทดลองก่อนเริ่ม",
    chooseEquipFirst: "เลือกอุปกรณ์ก่อนนะ: ลูกโป่ง หรือ ปากกาเมจิก",
    chooseTrialInEquip: "เลือกการทดลองของอุปกรณ์ที่เลือกก่อนนะ",
    chooseEquipForExperiment: "เลือกอุปกรณ์ที่จะทดลองก่อน (ลูกโป่ง หรือ ปากกาเมจิก)",
    tapSelectFirst: 'กด "เลือกการทดลอง" แล้วเลือกอุปกรณ์ก่อนเริ่ม',
    tapTrialFirst: "เลือกการทดลองในอุปกรณ์ที่เลือกก่อนเริ่ม",
    rubbing: 'กำลังขัดถู... กด "หยุด" เพื่อสิ้นสุดการทดลอง',
    recorded: "บันทึกผลแล้ว เลือกการทดลองถัดไปได้",
    pressStart: 'กด "เริ่ม" เพื่อเริ่มขัดถู',
    oneBalloonHint: "ขัดลูกโป่ง 1 ใบ (ใบซ้าย) ด้วยกระดาษเยื่อ จะเกิดอะไรขึ้นนะ",
    oneMarkerHint: "ขัดปากกาเมจิก 1 ด้าม (ด้ามซ้าย) ด้วยกระดาษเยื่อ จะเกิดอะไรขึ้นนะ",
    completeHint: 'ทำครบทุกการทดลองแล้ว กดปุ่ม "สรุปผลการทดลอง" ได้เลย',
    rubTooShort: `เวลาถูยังน้อยเกินไป ต้องถูอย่างน้อย ${MIN_RUB_SECONDS} วินาที จึงจะเห็นผล`,
    timerTitle: "เวลาทดลอง",
    timerHint: `จับเวลา ${MIN_RUB_SECONDS} วินาที`,
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    backTop: "<< Back",
    selectTrial: "Select Trial",
    start: "Start",
    progress: "Progress",
    menuTitle: `Select equipment and trial (one by one) - ${MIN_RUB_SECONDS}s each`,
    done: "done",
    waiting: "queued",
    selected: "Selected",
    currentTrial: "Current trial",
    hiddenSummary: 'Summary is hidden. Press "Experiment Summary" to view all results.',
    backSteps: "<< Back to steps",
    summary: "Experiment Summary",
    reset: "Reset",
    stop: "Stop",
    skip: "Skip",
    time: "Rubbing time",
    result: "Result",
    chooseEquipAndTrial: "Please choose equipment and trial before starting.",
    chooseTrialFirst: "Please choose a trial before starting.",
    chooseEquipFirst: "Choose equipment first: balloon or marker pen.",
    chooseTrialInEquip: "Choose a trial from the selected equipment first.",
    chooseEquipForExperiment: "Choose equipment first (balloon or marker pen).",
    tapSelectFirst: 'Press "Select Trial" and choose equipment first.',
    tapTrialFirst: "Choose a trial from selected equipment first.",
    rubbing: 'Rubbing... press "Stop" to finish.',
    recorded: "Result saved. You can choose the next trial.",
    pressStart: 'Press "Start" to begin rubbing.',
    oneBalloonHint: "What happens if only one balloon (left) is rubbed?",
    oneMarkerHint: "What happens if only one marker pen (left) is rubbed?",
    completeHint: 'All trials are done. Press "Experiment Summary".',
    rubTooShort: `Rubbing is too short. Rub for at least ${MIN_RUB_SECONDS} seconds to see a result.`,
    timerTitle: "Experiment time",
    timerHint: `${MIN_RUB_SECONDS}-second timer`,
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    backTop: "<< Kembali",
    selectTrial: "Pilih Ujian",
    start: "Mula",
    progress: "Kemajuan",
    menuTitle: `Pilih peralatan dan ujian (satu demi satu) - ${MIN_RUB_SECONDS} saat setiap ujian`,
    done: "selesai",
    waiting: "menunggu",
    selected: "Pilihan",
    currentTrial: "Ujian semasa",
    hiddenSummary: 'Ringkasan disorok. Tekan "Ringkasan Eksperimen" untuk lihat semua hasil.',
    backSteps: "<< Kembali ke langkah",
    summary: "Ringkasan Eksperimen",
    reset: "Mula semula",
    stop: "Berhenti",
    skip: "Langkau",
    time: "Masa menggosok",
    result: "Hasil",
    chooseEquipAndTrial: "Sila pilih peralatan dan ujian sebelum mula.",
    chooseTrialFirst: "Sila pilih ujian sebelum mula.",
    chooseEquipFirst: "Pilih peralatan dahulu: belon atau pen marker.",
    chooseTrialInEquip: "Pilih ujian dalam peralatan yang dipilih dahulu.",
    chooseEquipForExperiment: "Pilih peralatan dahulu (belon atau pen marker).",
    tapSelectFirst: 'Tekan "Pilih Ujian" dan pilih peralatan dahulu.',
    tapTrialFirst: "Pilih ujian dalam peralatan yang dipilih dahulu.",
    rubbing: 'Sedang menggosok... tekan "Berhenti" untuk tamat.',
    recorded: "Hasil disimpan. Boleh pilih ujian seterusnya.",
    pressStart: 'Tekan "Mula" untuk mula menggosok.',
    oneBalloonHint: "Apa jadi jika hanya satu belon (kiri) digosok?",
    oneMarkerHint: "Apa jadi jika hanya satu pen marker (kiri) digosok?",
    completeHint: 'Semua ujian selesai. Tekan "Ringkasan Eksperimen".',
    rubTooShort: `Masa gosokan terlalu singkat. Gosok sekurang-kurangnya ${MIN_RUB_SECONDS} saat untuk melihat hasil.`,
    timerTitle: "Masa eksperimen",
    timerHint: `Pemasa ${MIN_RUB_SECONDS} saat`,
    lang: { th: "Thai", en: "Inggeris", ms: "Melayu" },
  },
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
function getTrialLabel(trial, language) {
  return trial?.label?.[language] || trial?.label?.th || "";
}
function getEquipmentLabel(equipment, language) {
  return EQUIPMENT_LABEL[equipment]?.[language] || EQUIPMENT_LABEL[equipment]?.th || "";
}
function getTrialCompactLabel(trial, language) {
  const compact = {
    "balloon-both": {
      th: "ลูกโป่ง 2 ใบ",
      en: "2 balloons",
      ms: "2 belon",
    },
    "balloon-one": {
      th: "ลูกโป่ง 1 ใบ",
      en: "1 balloon",
      ms: "1 belon",
    },
    "marker-both": {
      th: "เมจิก 2 ด้าม",
      en: "2 markers",
      ms: "2 pen marker",
    },
    "marker-one": {
      th: "เมจิก 1 ด้าม",
      en: "1 marker",
      ms: "1 pen marker",
    },
  };
  return compact[trial?.id]?.[language] || compact[trial?.id]?.th || getTrialLabel(trial, language);
}
function getTrialDurationLabel(language) {
  if (language === "en") return `(${MIN_RUB_SECONDS} sec)`;
  if (language === "ms") return `(${MIN_RUB_SECONDS} saat)`;
  return `(${MIN_RUB_SECONDS} วินาที)`;
}
export default function P6ElectricForceEffectSim() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedTrial, setSelectedTrial] = useState(null);
  const [started, setStarted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [charged, setCharged] = useState(false);
  const [sequenceNotice, setSequenceNotice] = useState("");
  const [trialResults, setTrialResults] = useState({});
  const t = UI_TEXT[language] ?? UI_TEXT.th;
  const activeTrials = useMemo(() => TRIAL_OPTIONS, []);
  const totalTrials = TRIAL_OPTIONS.length;
  const completedCount = useMemo(
    () => activeTrials.filter((trial) => Boolean(trialResults[trial.id])).length,
    [activeTrials, trialResults]
  );
  const allTrialsCompleted = completedCount === totalTrials;
  const nextPendingTrial = useMemo(
    () => activeTrials.find((trial) => !trialResults[trial.id]) || null,
    [activeTrials, trialResults]
  );
  const selectedTrialMeta = TRIAL_OPTIONS.find((t) => t.id === selectedTrial) || null;
  const selectedTrialLabel = selectedTrialMeta ? getTrialLabel(selectedTrialMeta, language) : "";
  const notSelectedLabel =
    language === "th" ? "ยังไม่ได้เลือก" : language === "en" ? "Not selected" : "Belum dipilih";
  const currentResult = selectedTrial ? trialResults[selectedTrial] : null;
  const currentResultMode = currentResult?.mode || selectedTrialMeta?.mode || "one";
  const currentResultLabel = currentResult
    ? RESULT_BY_MODE[currentResultMode]?.[language] || RESULT_BY_MODE[currentResultMode]?.th || ""
    : "";
  const totalExperimentTime = useMemo(
    () => activeTrials.reduce((sum, trial) => sum + (trialResults[trial.id]?.time || 0), 0),
    [activeTrials, trialResults]
  );
  const selectedMode = selectedTrialMeta?.mode || null;
  const usingMarker = (selectedTrialMeta?.equipment || selectedEquipment) === "marker";
  const leftCharged = charged && started && Boolean(selectedTrial);
  const rightCharged = charged && started && selectedMode === "both";
  const isRubbing = started && isRunning && Boolean(selectedTrial);
  const mode = !charged || !started ? "idle" : selectedMode === "both" ? "repel" : "attract";
  const hint = useMemo(() => {
    if (!selectedTrial) return t.tapTrialFirst;
    if (!started) return t.pressStart;
    if (isRunning) return t.rubbing;
    if (currentResult) return t.recorded;
    return t.pressStart;
  }, [currentResult, isRunning, selectedTrial, started, t.pressStart, t.recorded, t.rubbing, t.tapTrialFirst]);
  const timerDisplaySeconds = isRunning ? Math.max(MIN_RUB_SECONDS - seconds, 0) : MIN_RUB_SECONDS;
  const summaryText = useMemo(() => {
    if (!selectedTrial) return t.chooseTrialFirst;
    if (isRunning) return "";
    if (allTrialsCompleted)
      return language === "th"
        ? `ทำครบทั้ง ${totalTrials} การทดลองแล้ว กด "${t.summary}" เพื่อดูผล`
        : language === "en"
          ? `Completed all ${totalTrials} trials. Press "${t.summary}" to view results.`
          : `Selesai semua ${totalTrials} ujian. Tekan "${t.summary}" untuk lihat hasil.`;
    if (nextPendingTrial) {
      const nextLabel = getTrialLabel(nextPendingTrial, language);
      return language === "th"
        ? `ทำการทดลองทีละอย่าง: ทำแล้ว ${completedCount}/${totalTrials} (ถัดไป: ${nextLabel})`
        : language === "en"
          ? `Run one trial at a time: ${completedCount}/${totalTrials} done (next: ${nextLabel}).`
          : `Lakukan ujian satu demi satu: ${completedCount}/${totalTrials} siap (seterusnya: ${nextLabel}).`;
    }
    return "";
  }, [allTrialsCompleted, completedCount, isRunning, language, nextPendingTrial, t.chooseTrialFirst, t.summary, totalTrials]);
  const bubbleText = useMemo(() => {
    if (!selectedTrial && nextPendingTrial) {
      const nextLabel = getTrialLabel(nextPendingTrial, language);
      return language === "th"
        ? `เริ่มจาก ${nextLabel} ก่อนนะ`
        : language === "en"
          ? `Start with "${nextLabel}" first.`
          : `Mula dengan "${nextLabel}" dahulu.`;
    }
    if (!selectedTrial) return t.chooseTrialFirst;
    if (!allTrialsCompleted && trialResults[selectedTrial] && nextPendingTrial) {
      const nextLabel = getTrialLabel(nextPendingTrial, language);
      return language === "th"
        ? `การทดลองนี้เสร็จแล้ว ต่อไปลอง ${nextLabel}`
        : language === "en"
          ? `This trial is complete. Next try: ${nextLabel}`
          : `Ujian ini selesai. Seterusnya: ${nextLabel}`;
    }
    if (selectedTrialMeta?.id === "balloon-one") return t.oneBalloonHint;
    if (selectedTrialMeta?.id === "marker-one") return t.oneMarkerHint;
    return language === "th"
      ? `${selectedTrialLabel} จะเกิดอะไรขึ้นนะ`
      : language === "en"
        ? `What will happen in "${selectedTrialLabel}"?`
        : `Apa akan terjadi untuk "${selectedTrialLabel}"?`;
  }, [allTrialsCompleted, language, nextPendingTrial, selectedTrial, selectedTrialLabel, selectedTrialMeta?.id, t.chooseTrialFirst, t.oneBalloonHint, t.oneMarkerHint, trialResults]);
  useEffect(() => {
    if (!isRunning) return undefined;
    const timerId = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(timerId);
  }, [isRunning]);
  useEffect(() => {
    if (!isRunning) return;
    if (seconds >= MIN_RUB_SECONDS) {
      finishTrial(MIN_RUB_SECONDS);
    }
  }, [isRunning, seconds]);
  useEffect(() => {
    setSequenceNotice("");
  }, [language]);
  const canPickTrial = () => true;
  const handleSelectTrial = (id) => {
    const trial = TRIAL_OPTIONS.find((item) => item.id === id);
    if (!trial) return;
    setSequenceNotice("");
    setSelectedEquipment(trial.equipment);
    setSelectedTrial(id);
    setStarted(false);
    setCharged(false);
    setIsRunning(false);
    setSeconds(0);
  };
  const handleStart = () => {
    if (!selectedTrial) {
      setSequenceNotice(t.chooseTrialFirst);
      return;
    }
    setSequenceNotice("");
    setStarted(true);
    setCharged(false);
    setSeconds(0);
    setIsRunning(true);
  };
  const finishTrial = (elapsedSeconds) => {
    if (!selectedTrial) return;
    const safeElapsed = Math.max(0, Math.floor(elapsedSeconds));
    if (safeElapsed < MIN_RUB_SECONDS) {
      setIsRunning(false);
      setCharged(false);
      setStarted(false);
      setSequenceNotice(t.rubTooShort);
      return;
    }
    const currentTrial = TRIAL_OPTIONS.find((trial) => trial.id === selectedTrial);
    const currentLabel = getTrialLabel(currentTrial, language);
    const nextAfterCurrent = activeTrials.find(
      (trial) => trial.id !== selectedTrial && !trialResults[trial.id]
    );
    const willCompleteAll = !nextAfterCurrent;
    setIsRunning(false);
    setCharged(true);
    setTrialResults((prev) => ({
      ...prev,
      [selectedTrial]: {
        mode: currentTrial?.mode || "one",
        time: safeElapsed,
      },
    }));
    if (nextAfterCurrent) {
      const nextLabel = getTrialLabel(nextAfterCurrent, language);
      setSequenceNotice(
        language === "th"
          ? `เสร็จแล้ว: ${currentLabel} | ถัดไป: ${nextLabel}`
          : language === "en"
            ? `Done: ${currentLabel} | Next: ${nextLabel}`
            : `Selesai: ${currentLabel} | Seterusnya: ${nextLabel}`
      );
      return;
    }
    setSequenceNotice(t.completeHint);
    if (willCompleteAll) {
      setSequenceNotice(t.completeHint);
    }
  };
  const handleStop = () => {
    if (!isRunning || !selectedTrial) return;
    finishTrial(seconds);
  };
  const handleSkip = () => {
    if (!isRunning || !selectedTrial) return;
    finishTrial(Math.max(seconds, MIN_RUB_SECONDS));
  };
  const handleGoSummary = () => {
    if (!allTrialsCompleted || isRunning) {
      setSequenceNotice(
        language === "th"
          ? `ยังทำไม่ครบ ${completedCount}/${totalTrials} การทดลอง`
        : language === "en"
            ? `Incomplete: ${completedCount}/${totalTrials} trials.`
            : `Belum lengkap: ${completedCount}/${totalTrials} ujian.`
      );
      return;
    }
    navigate(`/p6/experiment/electric-force-effect/result?time=${totalExperimentTime}`);
  };
  const handleReset = () => {
    setSelectedEquipment(null);
    setSelectedTrial(null);
    setTrialResults({});
    setStarted(false);
    setCharged(false);
    setIsRunning(false);
    setSeconds(0);
    setSequenceNotice("");
  };
  return (
    <div className="p6-force-sim-page">
      <style>{forceEffectSimStyles}</style>
      <div className="p6-force-sim-stage">
        <div className="p6-force-sim-live-timer" role="status" aria-live="polite">
          <div className="p6-force-sim-live-timer-title">{t.timerTitle}</div>
          <div className="p6-force-sim-live-timer-time">{formatTime(timerDisplaySeconds)}</div>
          <div className="p6-force-sim-live-timer-note">{t.timerHint}</div>
        </div>
        {/* ภาษา */}
        <div className="p6-force-sim-langbar">  
          {LANGUAGE_OPTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`p6-force-sim-langchip ${language === item.id ? "active" : ""}`}
              onClick={() => setLanguage(item.id)}
            >
              <span className="notranslate" translate="no">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="p6-force-sim-sidebar">
          <div className="p6-force-sim-sidewrap">
            <div className="p6-force-sim-menu is-static" role="region" aria-label={t.selectTrial}>
              <div
                className="p6-force-sim-menu-title"
                style={{ textAlign: "right", display: "inline-block", width: "fit-content", marginLeft: "auto" }}
              >
                {t.selectTrial}
              </div>
              {TRIAL_OPTIONS.map((opt) => {
                const equipment = opt.equipment;
                const locked = !canPickTrial(opt.id);
                const done = Boolean(trialResults[opt.id]);
                const selected = selectedTrial === opt.id;
                const iconSrc =
                  equipment === "balloon"
                    ? "/images/p6/equipment/balloons-real.svg"
                    : "/images/p6/equipment/markers-real.svg";
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={
                      "p6-force-sim-menu-item" +
                      (selected ? " active" : "") +
                      (locked && !done ? " locked" : "")
                    }
                    onClick={() => handleSelectTrial(opt.id)}
                    aria-disabled={locked}
                    aria-label={getTrialLabel(opt, language)}
                  >
                      <span className="p6-force-sim-menu-item-main">
                        <span className="p6-force-sim-menu-item-icon" aria-hidden="true">
                          <img src={iconSrc} alt="" />
                        </span>
                        <span className="p6-force-sim-menu-item-caption">
                          {`${getTrialCompactLabel(opt, language)} ${getTrialDurationLabel(language)}`}
                        </span>
                      </span>
                    <span
                      className={"p6-force-sim-menu-check" + (done ? " active" : "")}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>
          <div className="p6-force-sim-progress">
            <div className="p6-force-sim-progress-head">
              <div className="p6-force-sim-progress-title">{t.progress}</div>
              <div className="p6-force-sim-progress-pill">
                {language === "th" ? `ทำแล้ว ${completedCount}/${totalTrials}` : `${t.done} ${completedCount}/${totalTrials}`}
              </div>
            </div>
            <div className="p6-force-sim-progress-bar">
              <div
                className="p6-force-sim-progress-fill"
                style={{ width: `${(completedCount / totalTrials) * 100}%` }}
              />
            </div>
            <div className="p6-force-sim-progress-text">{summaryText || sequenceNotice || t.hiddenSummary}</div>
          </div>
        </div>
        <div className="p6-force-sim-center">
          <div className="p6-force-sim-board">
            <div className="p6-force-sim-balloons">
              {!usingMarker ? (
                <>
                  <div
                    className={`p6-force-sim-balloon left ${leftCharged ? `charged ${mode}` : ""}`}
                    aria-label="balloon-left"
                  >
                    {isRubbing && (
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
                    {selectedMode === "both" && isRubbing && (
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
                </>
              ) : (
                <>
                  <div
                    className={`p6-force-sim-marker left ${leftCharged ? `charged ${mode}` : ""}`}
                    aria-label="marker-left"
                  >
                    {isRubbing && (
                      <div className="p6-force-sim-rub rub-left" aria-hidden="true">
                        <div className="p6-force-sim-tissue" />
                      </div>
                    )}
                    <img
                      className="p6-force-sim-marker-image"
                      src="/images/p6/equipment/marker-single-real.svg"
                      alt="ปากกาเมจิกซ้าย"
                      draggable="false"
                    />
                    <div className="p6-force-sim-charges" aria-hidden="true">
                      {CHARGES.left.map((c, idx) => (
                        <span
                          key={`ml-${idx}`}
                          className={`p6-force-sim-charge ${c.kind === "minus" ? "minus" : ""}`}
                          style={{ top: c.top, left: c.left }}
                        >
                          {c.kind === "plus" ? "+" : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    className={`p6-force-sim-marker right ${rightCharged ? `charged ${mode}` : mode === "attract" && leftCharged ? "attract" : ""}`}
                    aria-label="marker-right"
                  >
                    {selectedMode === "both" && isRubbing && (
                      <div className="p6-force-sim-rub rub-right" aria-hidden="true">
                        <div className="p6-force-sim-tissue" />
                      </div>
                    )}
                    <img
                      className="p6-force-sim-marker-image"
                      src="/images/p6/equipment/marker-single-real.svg"
                      alt="ปากกาเมจิกขวา"
                      draggable="false"
                    />
                    {rightCharged && (
                      <div className="p6-force-sim-charges" aria-hidden="true">
                        {CHARGES.right.map((c, idx) => (
                          <span
                            key={`mr-${idx}`}
                            className={`p6-force-sim-charge ${c.kind === "minus" ? "minus" : ""}`}
                            style={{ top: c.top, left: c.left }}
                          >
                            {c.kind === "plus" ? "+" : ""}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="p6-force-sim-current-trial">
              <span className="p6-force-sim-current-trial-label">{t.currentTrial}:</span>{" "}
              <span className="p6-force-sim-current-trial-value">{selectedTrialLabel || notSelectedLabel}</span>
            </div>
            {!isRunning && sequenceNotice === t.rubTooShort && (
              <div className="p6-force-sim-short-warning" role="alert">
                {t.rubTooShort}
              </div>
            )}
            {currentResult && !isRunning && (
              <div className="p6-force-sim-result-card is-center">
                <div className="p6-force-sim-result-title">{t.result}</div>
                <div className="p6-force-sim-result-body">
                  <span className="p6-force-sim-result-chip">{currentResultLabel}</span>
                  <span className="p6-force-sim-result-time">
                    {t.time}: {formatTime(currentResult.time)}
                  </span>
                </div>
              </div>
            )}
            {/* removed per request */}
          </div>
        </div>
        <div className="p6-force-sim-right">
          <div className="p6-force-sim-actions">
            <button
              className="p6-force-sim-start"
              type="button"
              onClick={isRunning ? handleSkip : handleStart}
            >
              <span className="p6-force-sim-start-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                  <path d="M9 6l9 6-9 6V6z" fill="currentColor" />
                </svg>
              </span>
              <span className="p6-force-sim-start-label">{isRunning ? t.skip : t.start}</span>
            </button>
            <button className="p6-force-sim-reset" type="button" onClick={handleReset}>
              <span className="p6-force-sim-reset-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                  <path
                    d="M12 6a6 6 0 1 1-5.2 3H5.5a.75.75 0 0 1-.53-1.28l2.1-2.1a.75.75 0 0 1 1.06 0l2.1 2.1a.75.75 0 0 1-.53 1.28H8.05A4.5 4.5 0 1 0 12 7.5V6z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="p6-force-sim-start-label">{t.reset}</span>
            </button>
          </div>
          {allTrialsCompleted && !isRunning && (
            <button className="p6-force-sim-summary-btn" type="button" onClick={handleGoSummary}>
              {t.summary}
            </button>
          )}
          <button
            className="p6-force-sim-backBottom"
            type="button"
            onClick={() => navigate("/p6/experiment/electric-force-effect/steps")}
          >
            {language === "th" ? "« ย้อนกลับ" : language === "en" ? "« Back" : "« Kembali"}
          </button>
        </div>
      </div>
    </div>
  );
}
