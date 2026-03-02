import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P6ElectricForceEffectSim.css";

const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย", speechLang: "th-TH" },
  { id: "en", label: "English", speechLang: "en-US" },
  { id: "ms", label: "Melayu", speechLang: "ms-MY" },
];

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
    backTop: "← ย้อนกลับ",
    selectTrial: "เลือกการทดลอง",
    start: "เริ่ม",
    progress: "ความคืบหน้า",
    menuTitle: "เลือกอุปกรณ์และการทดลอง (ทำทีละอย่าง)",
    done: "เสร็จแล้ว",
    waiting: "รอคิว",
    selected: "ตัวเลือก",
    hiddenSummary: 'ซ่อนผลสรุปไว้ก่อน กด "สรุปผลการทดลอง" เพื่อดูผลทั้งหมด',
    backSteps: "← กลับขั้นตอน",
    summary: "สรุปผลการทดลอง",
    reset: "เริ่มใหม่",
    stop: "หยุด",
    time: "เวลาการถู",
    listen: "ฟังข้อความหน้านี้",
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
  },
  en: {
    backTop: "← Back",
    selectTrial: "Select Trial",
    start: "Start",
    progress: "Progress",
    menuTitle: "Select equipment and trial (one by one)",
    done: "done",
    waiting: "queued",
    selected: "Selected",
    hiddenSummary: 'Summary is hidden. Press "Experiment Summary" to view all results.',
    backSteps: "← Back to steps",
    summary: "Experiment Summary",
    reset: "Reset",
    stop: "Stop",
    time: "Rubbing time",
    listen: "Read this screen",
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
  },
  ms: {
    backTop: "← Kembali",
    selectTrial: "Pilih Ujian",
    start: "Mula",
    progress: "Kemajuan",
    menuTitle: "Pilih peralatan dan ujian (satu demi satu)",
    done: "selesai",
    waiting: "menunggu",
    selected: "Pilihan",
    hiddenSummary: 'Ringkasan disorok. Tekan "Ringkasan Eksperimen" untuk lihat semua hasil.',
    backSteps: "← Kembali ke langkah",
    summary: "Ringkasan Eksperimen",
    reset: "Mula semula",
    stop: "Berhenti",
    time: "Masa menggosok",
    listen: "Baca skrin ini",
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

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;

  const voices = window.speechSynthesis.getVoices();
  const exact = voices.find((voice) => voice.lang.toLowerCase() === lang.toLowerCase());
  const fallback = voices.find((voice) =>
    voice.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase()),
  );

  if (exact || fallback) {
    utterance.voice = exact || fallback;
  }

  window.speechSynthesis.speak(utterance);
}

export default function P6ElectricForceEffectSim() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedTrial, setSelectedTrial] = useState(null);
  const [showTrialMenu, setShowTrialMenu] = useState(false);
  const [started, setStarted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [charged, setCharged] = useState(false);
  const [sequenceNotice, setSequenceNotice] = useState("");
  const [trialResults, setTrialResults] = useState({});
  const t = UI_TEXT[language];
  const speechLang = LANGUAGE_OPTIONS.find((item) => item.id === language)?.speechLang || "th-TH";

  const activeTrials = useMemo(
    () => (selectedEquipment ? TRIAL_OPTIONS.filter((trial) => trial.equipment === selectedEquipment) : []),
    [selectedEquipment]
  );
  const totalTrials = selectedEquipment ? activeTrials.length : 2;
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
  const notSelectedLabel = language === "th" ? "ยังไม่ได้เลือก" : language === "en" ? "Not selected" : "Belum dipilih";
  const currentResult = selectedTrial ? trialResults[selectedTrial] : null;
  const totalExperimentTime = useMemo(
    () => activeTrials.reduce((sum, trial) => sum + (trialResults[trial.id]?.time || 0), 0),
    [activeTrials, trialResults]
  );

  const selectedMode = selectedTrialMeta?.mode || null;
  const usingMarker = selectedEquipment === "marker";
  const leftCharged = charged && started && Boolean(selectedTrial);
  const rightCharged = charged && started && selectedMode === "both";
  const isRubbing = started && isRunning && Boolean(selectedTrial);
  const mode = !charged || !started ? "idle" : selectedMode === "both" ? "repel" : "attract";

  const hint = useMemo(() => {
    if (!selectedEquipment) return t.tapSelectFirst;
    if (!selectedTrial) return t.tapTrialFirst;
    if (!started)
      return `${language === "th" ? "พร้อมทดลอง" : language === "en" ? "Ready" : "Sedia"}: ${selectedTrialLabel}`;
    if (isRunning) return t.rubbing;
    if (currentResult) return t.recorded;
    return t.pressStart;
  }, [currentResult, isRunning, language, selectedEquipment, selectedTrial, selectedTrialLabel, started, t.pressStart, t.recorded, t.rubbing, t.tapSelectFirst, t.tapTrialFirst]);

  const summaryText = useMemo(() => {
    if (!selectedEquipment) return t.chooseEquipForExperiment;
    if (isRunning) return "";
    if (allTrialsCompleted)
      return language === "th"
        ? `ทำครบทั้ง ${totalTrials} การทดลองของ${getEquipmentLabel(selectedEquipment, language)}แล้ว กด "${t.summary}" เพื่อดูผล`
        : language === "en"
          ? `Completed ${totalTrials} trials for ${getEquipmentLabel(selectedEquipment, language)}. Press "${t.summary}" to view results.`
          : `Selesai ${totalTrials} ujian untuk ${getEquipmentLabel(selectedEquipment, language)}. Tekan "${t.summary}" untuk lihat hasil.`;
    if (nextPendingTrial) {
      const nextLabel = getTrialLabel(nextPendingTrial, language);
      return language === "th"
        ? `ทำการทดลองทีละอย่างในชุด${getEquipmentLabel(selectedEquipment, language)}: ทำแล้ว ${completedCount}/${totalTrials} (ถัดไป: ${nextLabel})`
        : language === "en"
          ? `Run one trial at a time in ${getEquipmentLabel(selectedEquipment, language)} set: ${completedCount}/${totalTrials} done (next: ${nextLabel}).`
          : `Lakukan ujian satu demi satu untuk set ${getEquipmentLabel(selectedEquipment, language)}: ${completedCount}/${totalTrials} siap (seterusnya: ${nextLabel}).`;
    }
    return "";
  }, [allTrialsCompleted, completedCount, isRunning, language, nextPendingTrial, selectedEquipment, t.chooseEquipForExperiment, t.summary, totalTrials]);

  const bubbleText = useMemo(() => {
    if (!selectedEquipment) return t.chooseEquipFirst;
    if (!selectedTrial && nextPendingTrial) {
      const nextLabel = getTrialLabel(nextPendingTrial, language);
      return language === "th"
        ? `เริ่มจาก ${nextLabel} ก่อนนะ`
        : language === "en"
          ? `Start with "${nextLabel}" first.`
          : `Mula dengan "${nextLabel}" dahulu.`;
    }
    if (!selectedTrial) return t.chooseTrialInEquip;
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
  }, [allTrialsCompleted, language, nextPendingTrial, selectedEquipment, selectedTrial, selectedTrialLabel, selectedTrialMeta?.id, t.chooseEquipFirst, t.chooseTrialInEquip, t.oneBalloonHint, t.oneMarkerHint, trialResults]);

  useEffect(() => {
    if (!isRunning) return undefined;
    const timerId = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(timerId);
  }, [isRunning]);

  useEffect(() => {
    setSequenceNotice("");
  }, [language]);

  const canPickTrial = (trialId) => {
    const trial = TRIAL_OPTIONS.find((item) => item.id === trialId);
    if (!trial) return false;
    if (selectedEquipment && trial.equipment !== selectedEquipment) return false;
    const alreadyDone = Boolean(trialResults[trialId]);
    if (alreadyDone) return true;
    if (!nextPendingTrial) return true;
    return nextPendingTrial.id === trialId;
  };

  const handleSelectTrial = (id) => {
    const trial = TRIAL_OPTIONS.find((item) => item.id === id);
    if (!trial) return;
    if (selectedEquipment && trial.equipment !== selectedEquipment) {
      setSequenceNotice(
        language === "th"
          ? `ตอนนี้เลือกชุด${getEquipmentLabel(selectedEquipment, language)}อยู่ กด "${t.reset}" หากต้องการเปลี่ยนอุปกรณ์`
          : language === "en"
            ? `You are using ${getEquipmentLabel(selectedEquipment, language)} set. Press "${t.reset}" to change equipment.`
            : `Anda sedang guna set ${getEquipmentLabel(selectedEquipment, language)}. Tekan "${t.reset}" untuk tukar peralatan.`
      );
      return;
    }
    if (!canPickTrial(id) && nextPendingTrial) {
      const nextLabel = getTrialLabel(nextPendingTrial, language);
      setSequenceNotice(
        language === "th"
          ? `กรุณาทดลอง "${nextLabel}" ก่อน`
          : language === "en"
            ? `Please run "${nextLabel}" first.`
            : `Sila jalankan "${nextLabel}" dahulu.`
      );
      return;
    }
    setSequenceNotice("");
    if (!selectedEquipment) {
      setSelectedEquipment(trial.equipment);
    }
    setSelectedTrial(id);
    setShowTrialMenu(false);
    setStarted(false);
    setCharged(false);
    setIsRunning(false);
    setSeconds(0);
  };

  const handleStart = () => {
    if (!selectedEquipment) {
      setShowTrialMenu(true);
      setSequenceNotice(t.chooseEquipAndTrial);
      return;
    }
    if (!selectedTrial) {
      setShowTrialMenu(true);
      setSequenceNotice(t.chooseTrialFirst);
      return;
    }
    if (!allTrialsCompleted && trialResults[selectedTrial] && nextPendingTrial) {
      const nextLabel = getTrialLabel(nextPendingTrial, language);
      setSequenceNotice(
        language === "th"
          ? `การทดลองนี้เสร็จแล้ว ให้ทำ "${nextLabel}" ต่อ`
          : language === "en"
            ? `This trial is complete. Please continue with "${nextLabel}".`
            : `Ujian ini selesai. Sila teruskan dengan "${nextLabel}".`
      );
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
    const currentTrial = TRIAL_OPTIONS.find((trial) => trial.id === selectedTrial);
    const currentLabel = getTrialLabel(currentTrial, language);
    const nextAfterCurrent = activeTrials.find(
      (trial) => trial.id !== selectedTrial && !trialResults[trial.id]
    );

    setIsRunning(false);
    setCharged(true);
    setTrialResults((prev) => ({
      ...prev,
      [selectedTrial]: {
        result: RESULT_BY_MODE[currentTrial?.mode || "one"][language] || RESULT_BY_MODE[currentTrial?.mode || "one"].th,
        time: seconds,
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
  };

  const handleGoSummary = () => {
    if (!selectedEquipment || !allTrialsCompleted || isRunning) {
      setSequenceNotice(
        language === "th"
          ? `ยังทำไม่ครบ ${completedCount}/${totalTrials} การทดลอง`
          : language === "en"
            ? `Incomplete: ${completedCount}/${totalTrials} trials.`
            : `Belum lengkap: ${completedCount}/${totalTrials} ujian.`
      );
      return;
    }
    navigate(`/p6/experiment/electric-force-effect/summary?time=${totalExperimentTime}&equipment=${selectedEquipment}`);
  };

  const handleReset = () => {
    setSelectedEquipment(null);
    setSelectedTrial(null);
    setTrialResults({});
    setStarted(false);
    setCharged(false);
    setIsRunning(false);
    setSeconds(0);
    setShowTrialMenu(false);
    setSequenceNotice("");
  };

  const pageSpeech = useMemo(
    () =>
      [
        hint,
        `${t.selected}: ${selectedTrialLabel || notSelectedLabel}`,
        summaryText,
        sequenceNotice,
        bubbleText,
      ]
        .filter(Boolean)
        .join(". "),
    [bubbleText, hint, notSelectedLabel, selectedTrialLabel, sequenceNotice, summaryText, t.selected]
  );

  return (
    <div className="p6-force-sim-page">
      <div className="p6-force-sim-stage">
        <button
          className="p6-force-sim-backTop"
          type="button"
          onClick={() => navigate("/p6/experiment/electric-force-effect/steps")}
        >
          {t.backTop}
        </button>

        <div className="p6-force-sim-langbar">
          {LANGUAGE_OPTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`p6-force-sim-langchip ${language === item.id ? "active" : ""}`}
              onClick={() => setLanguage(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            className="p6-force-sim-lang-audio"
            onClick={() => speakText(pageSpeech, speechLang)}
            aria-label={t.listen}
            title={t.listen}
          >
            <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
              <path
                d="M12 26h12l14-10v32l-14-10H12z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M44 22c4 4 4 16 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

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
              <span>{t.selectTrial}</span>
            </button>

            {showTrialMenu && (
              <div className="p6-force-sim-menu" role="dialog" aria-label={t.selectTrial}>
                <div className="p6-force-sim-menu-title">{t.menuTitle}</div>

                {(["balloon", "marker"]).map((equipment) => (
                  <div key={equipment} className="p6-force-sim-menu-group">
                    <div className="p6-force-sim-menu-group-title">{getEquipmentLabel(equipment, language)}</div>
                    {TRIAL_OPTIONS.filter((opt) => opt.equipment === equipment).map((opt) => {
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
                            {getTrialLabel(opt, language)}
                            {done ? ` (${t.done})` : locked ? ` (${t.waiting})` : ""}
                          </span>
                          {selectedTrial === opt.id && <span aria-hidden="true">✓</span>}
                        </button>
                      );
                    })}
                  </div>
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
            <span>{t.start}</span>
          </button>

          <div className="p6-force-sim-timer">
            {t.progress}
            {selectedEquipment ? ` (${getEquipmentLabel(selectedEquipment, language)})` : ""}: {completedCount}/{totalTrials}
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

            <div className="p6-force-sim-instruction">
              {hint}
              <div className="p6-force-sim-toast">
                {t.selected}: {selectedTrialLabel || notSelectedLabel}
              </div>

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
                <div className="p6-force-sim-toast">{t.hiddenSummary}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p6-force-sim-right">
          <div className="p6-force-sim-bubble">{bubbleText}</div>
          <img className="p6-force-sim-character" src="/images/p4/exp1/character-boy.png" alt="นักเรียน" />
          {started && (
            <div className="p6-force-sim-timer">
              {t.time}: {formatTime(seconds)}
            </div>
          )}

          <div className="p6-force-sim-actions">
            <div className="p6-force-sim-actions-row">
              <button
                className="p6-force-sim-action"
                type="button"
                onClick={() => navigate("/p6/experiment/electric-force-effect/steps")}
              >
                {t.backSteps}
              </button>
              <button
                className="p6-force-sim-action"
                type="button"
                onClick={handleGoSummary}
                disabled={!allTrialsCompleted || isRunning}
              >
                {t.summary}
              </button>
              <button className="p6-force-sim-action" type="button" onClick={handleReset}>
                {t.reset}
              </button>
            </div>
            <button
              className="p6-force-sim-action primary"
              type="button"
              onClick={isRunning ? handleStop : handleStart}
            >
              {isRunning ? t.stop : t.start}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
