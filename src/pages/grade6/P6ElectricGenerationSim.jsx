import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import forceEffectSimStyles from "./P6ElectricForceEffectSimStyles";

const COMPLETED_TRIALS_KEY = "p6_electric_generation_completed_trials";

const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย", speechLang: "th-TH" },
  { id: "en", label: "English", speechLang: "en-US" },
  { id: "ms", label: "Melayu", speechLang: "ms-MY" },
];

const UI_TEXT = {
  th: {
    back: "ย้อนกลับ",
    progress: "ความคืบหน้า",
    reset: "รีเซ็ต",
    selectTrial: "เลือกการทดลอง",
    start: "เริ่ม",
    startHint: "เริ่มการทดลอง",
    timer: "จับเวลา",
    timerRunning: "กำลังจับเวลา",
    timerTesting: "กำลังทดสอบกับเศษกระดาษ",
    timerDone: "ครบเวลา",
    timerReady: "พร้อมเริ่ม",
    chooseTrialFirst: "กรุณาเลือกการทดลอง",
    summary: "สรุปผล",
    summaryLocked: "ทำการทดลองให้ครบ 3 ครั้งก่อน",
    skip: "ข้าม",
    result: "ดูผลการทดลอง",
    title: "แรงไฟฟ้าเกิดขึ้นได้อย่างไรนะ",
    trialNotSelected: "ยังไม่เลือก",
    trial1: "ครั้งที่ 1 ไม่ขัดถูกด้วยผ้าแห้ง",
    trial1Short: "ครั้งที่ 1 (ไม่ถู)",
    trial2: "ครั้งที่ 2 ขัดถูด้วยผ้าแห้ง 2 นาที",
    trial2Short: "ครั้งที่ 2 (2 นาที)",
    trial3: "ครั้งที่ 3 ขัดถูด้วยผ้าแห้ง 5 นาที",
    trial3Short: "ครั้งที่ 3 (5 นาที)",
    next: "ต่อไป >>",
    listen: "ฟังข้อความ",
    resultTitle: "ผลการทดลอง",
    objectColumn: "วัตถุ",
    outcomeColumn: "ผลการทดลอง",
    timeColumn: "เวลา (นาที)",
    visualColumn: "ภาพแสดงการดูดของเศษกระดาษ",
    objectValue: "ลูกโป่ง + เศษกระดาษ",
    outcomeNone: "ไม่เกิดการเปลี่ยนแปลง",
    outcomeMid: "เศษกระดาษถูกดูดเล็กน้อย",
    outcomeHigh: "เศษกระดาษถูกดูดมากขึ้น",
    closeResult: "ปิด",
    continueExperiment: "ทดลองต่อ",
    summaryReady: "สรุปผลทั้งหมด",
    summaryProgress: "กรุณาทำการทดลองให้ครบทั้ง 3 ครั้งก่อนสรุปผล",
    summaryDone: "ทดลองครบทั้ง 3 ครั้งแล้ว ไปดูสรุปผลทั้งหมดได้เลย",
    stageTitle: "พื้นที่ทดลองไฟฟ้าสถิต",
    stageHint: "เลือกรอบการทดลอง แล้วสังเกตว่าลูกโป่งดูดเศษกระดาษได้มากขึ้นเมื่อขัดถูนานขึ้น",
  },
  en: {
    back: "Back",
    progress: "Progress",
    reset: "Reset",
    selectTrial: "Select Trial",
    start: "Start",
    startHint: "Start experiment",
    timer: "Timer",
    timerRunning: "Timing",
    timerTesting: "Testing with paper bits",
    timerDone: "Time completed",
    timerReady: "Ready",
    chooseTrialFirst: "Please choose a trial",
    summary: "Summary",
    summaryLocked: "Complete all 3 trials first",
    skip: "Skip",
    result: "See result",
    title: "How is electric force generated?",
    trialNotSelected: "Not selected",
    trial1: "Trial 1: no rubbing with a dry cloth",
    trial1Short: "Trial 1 (no rub)",
    trial2: "Trial 2: rub with a dry cloth for 2 minutes",
    trial2Short: "Trial 2 (2 min)",
    trial3: "Trial 3: rub with a dry cloth for 5 minutes",
    trial3Short: "Trial 3 (5 min)",
    next: "Next >>",
    listen: "Read screen",
    resultTitle: "Experiment Result",
    objectColumn: "Object",
    outcomeColumn: "Result",
    timeColumn: "Time (min)",
    visualColumn: "Paper attraction view",
    objectValue: "Balloon + Paper Bits",
    outcomeNone: "No visible change",
    outcomeMid: "Paper bits are slightly attracted",
    outcomeHigh: "Paper bits are strongly attracted",
    closeResult: "Close",
    continueExperiment: "Continue",
    summaryReady: "View Full Summary",
    summaryProgress: "Complete all 3 trials before viewing the full summary",
    summaryDone: "All 3 trials are complete. Open the full summary.",
    stageTitle: "Static Electricity Zone",
    stageHint: "Choose a trial and observe how the balloon attracts more paper bits when it is rubbed longer.",
  },
  ms: {
    back: "Kembali",
    progress: "Kemajuan",
    reset: "Set semula",
    selectTrial: "Pilih Ujian",
    start: "Mula",
    startHint: "Mula eksperimen",
    timer: "Pemasa",
    timerRunning: "Sedang mengira masa",
    timerTesting: "Menguji cebisan kertas",
    timerDone: "Masa tamat",
    timerReady: "Sedia",
    chooseTrialFirst: "Sila pilih ujian",
    summary: "Ringkasan",
    summaryLocked: "Lengkapkan 3 ujian dahulu",
    skip: "Langkau",
    result: "Lihat hasil",
    title: "Bagaimanakah daya elektrik terhasil?",
    trialNotSelected: "Belum pilih",
    trial1: "Ujian 1: tanpa gosokan kain kering",
    trial1Short: "Ujian 1 (tanpa gosok)",
    trial2: "Ujian 2: gosok dengan kain kering selama 2 minit",
    trial2Short: "Ujian 2 (2 minit)",
    trial3: "Ujian 3: gosok dengan kain kering selama 5 minit",
    trial3Short: "Ujian 3 (5 minit)",
    next: "Seterusnya >>",
    listen: "Baca skrin",
    resultTitle: "Hasil Eksperimen",
    objectColumn: "Objek",
    outcomeColumn: "Hasil",
    timeColumn: "Masa (minit)",
    visualColumn: "Paparan tarikan cebisan kertas",
    objectValue: "Belon + Cebisan Kertas",
    outcomeNone: "Tiada perubahan yang ketara",
    outcomeMid: "Cebisan kertas tertarik sedikit",
    outcomeHigh: "Cebisan kertas tertarik dengan lebih kuat",
    closeResult: "Tutup",
    continueExperiment: "Teruskan",
    summaryReady: "Lihat Ringkasan Penuh",
    summaryProgress: "Lengkapkan 3 ujian dahulu sebelum melihat ringkasan penuh",
    summaryDone: "Semua 3 ujian telah lengkap. Buka ringkasan penuh.",
    stageTitle: "Ruang Eksperimen Elektrik Statik",
    stageHint: "Pilih ujian dan perhatikan bagaimana belon menarik lebih banyak cebisan kertas apabila digosok lebih lama.",
  },
};

const TRIAL_RESULTS = {
  "trial-1": { time: "0", intensity: "none", outcomeKey: "outcomeNone" },
  "trial-2": { time: "2", intensity: "mid", outcomeKey: "outcomeMid" },
  "trial-3": { time: "5", intensity: "high", outcomeKey: "outcomeHigh" },
};

const PAPER_BASE = [
  { left: 0, top: 18, rotate: -12 },
  { left: 20, top: 8, rotate: 10 },
  { left: 38, top: 20, rotate: -6 },
  { left: 56, top: 6, rotate: 16 },
  { left: 72, top: 24, rotate: -18 },
  { left: 90, top: 12, rotate: 8 },
  { left: 48, top: 34, rotate: -4 },
  { left: 76, top: 36, rotate: 14 },
  { left: 12, top: 34, rotate: 9 },
  { left: 30, top: 42, rotate: -10 },
  { left: 62, top: 42, rotate: 7 },
  { left: 96, top: 30, rotate: -14 },
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
    { x: -6, y: 6, opacity: 0.5, scale: 1.02 },
    { x: 4, y: -16, opacity: 0.95, scale: 1.06 },
    { x: 0, y: 4, opacity: 0.45, scale: 1 },
    { x: 8, y: -14, opacity: 0.95, scale: 1.06 },
    { x: 6, y: 10, opacity: 0.38, scale: 1 },
    { x: 10, y: 6, opacity: 0.45, scale: 1 },
    { x: -10, y: -12, opacity: 0.95, scale: 1.06 },
    { x: 6, y: 12, opacity: 0.35, scale: 1 },
  ],
  high: [
    { x: -12, y: -22, opacity: 0.8, scale: 1.06 },
    { x: -6, y: -24, opacity: 0.82, scale: 1.07 },
    { x: 2, y: -18, opacity: 0.82, scale: 1.07 },
    { x: 10, y: -26, opacity: 0.82, scale: 1.07 },
    { x: 16, y: -18, opacity: 0.82, scale: 1.07 },
    { x: 20, y: -14, opacity: 0.82, scale: 1.07 },
    { x: 2, y: -12, opacity: 0.82, scale: 1.07 },
    { x: 8, y: -8, opacity: 0.6, scale: 1.02 },
    { x: -16, y: -10, opacity: 0.8, scale: 1.05 },
    { x: -2, y: -4, opacity: 0.72, scale: 1.04 },
    { x: 14, y: -6, opacity: 0.76, scale: 1.05 },
    { x: 24, y: -10, opacity: 0.78, scale: 1.05 },
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

const speakText = (text, lang) => {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;

  const voices = window.speechSynthesis.getVoices();
  const exact = voices.find((voice) => voice.lang?.toLowerCase() === lang.toLowerCase());
  const fallback = voices.find((voice) =>
    voice.lang?.toLowerCase().startsWith(lang.split("-")[0].toLowerCase()),
  );
  if (exact || fallback) utterance.voice = exact || fallback;

  window.speechSynthesis.speak(utterance);
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
      filter = "none";
    }
  } else if (started) {
    if (trialLevel === "high") {
      transform = "translateX(-40%) translateY(-4px)";
      animation = "p6-paper-float-high 2.4s ease-in-out infinite";
      filter = "none";
    } else if (trialLevel === "mid") {
      transform = "translateX(-40%) translateY(-2px)";
      animation = "p6-paper-float-mid 2.4s ease-in-out infinite";
      filter = "none";
    }
  }

  return { transform, animation, filter };
};

const getPaperStyle = ({ index, trialLevel, isTesting }) => {
  const base = PAPER_BASE[index];
  let x = 0;
  let y = 0;
  let opacity = trialLevel === "none" ? 0.96 : 1;
  let scale = 1;
  let drop = "none";

  if (isTesting) {
    const state = PAPER_TESTING[trialLevel]?.[index] || { x: 0, y: 0, opacity, scale: 1 };
    x = state.x;
    y = state.y;
    opacity = state.opacity;
    scale = state.scale;

    if (trialLevel === "mid") {
      drop = "none";
    }

    if (trialLevel === "high") {
      drop = "none";
    }

    if (trialLevel === "none") {
      drop = "none";
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
  const [searchParams] = useSearchParams();
  const isFreshStart = searchParams.get("fresh") === "1";
  const [lang, setLang] = useState("th");
  const t = UI_TEXT[lang] || UI_TEXT.th;
  const speechLang =
    LANGUAGE_OPTIONS.find((item) => item.id === lang)?.speechLang || LANGUAGE_OPTIONS[0].speechLang;

  const trialOptions = useMemo(
    () => [
      {
        id: "trial-1",
        label: {
          th: UI_TEXT.th.trial1,
          en: UI_TEXT.en.trial1,
          ms: UI_TEXT.ms.trial1,
        },
        short: {
          th: UI_TEXT.th.trial1Short,
          en: UI_TEXT.en.trial1Short,
          ms: UI_TEXT.ms.trial1Short,
        },
      },
      {
        id: "trial-2",
        label: {
          th: UI_TEXT.th.trial2,
          en: UI_TEXT.en.trial2,
          ms: UI_TEXT.ms.trial2,
        },
        short: {
          th: UI_TEXT.th.trial2Short,
          en: UI_TEXT.en.trial2Short,
          ms: UI_TEXT.ms.trial2Short,
        },
      },
      {
        id: "trial-3",
        label: {
          th: UI_TEXT.th.trial3,
          en: UI_TEXT.en.trial3,
          ms: UI_TEXT.ms.trial3,
        },
        short: {
          th: UI_TEXT.th.trial3Short,
          en: UI_TEXT.en.trial3Short,
          ms: UI_TEXT.ms.trial3Short,
        },
      },
    ],
    [],
  );

  const [selectedTrial, setSelectedTrial] = useState(null);
  const [started, setStarted] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completedTrials, setCompletedTrials] = useState(() =>
    isFreshStart ? [] : readCompletedTrials(),
  );
  const [resultTrialId, setResultTrialId] = useState(null);

  const totalTrials = trialOptions.length;
  const completedCount = completedTrials.length;
  const allTrialsCompleted = completedCount === totalTrials;
  const selectedTrialLabel =
    trialOptions.find((item) => item.id === selectedTrial)?.short?.[lang] || t.trialNotSelected;
  const canStart = Boolean(selectedTrial);
  const durationSeconds = useMemo(() => {
    if (selectedTrial === "trial-2") return 120;
    if (selectedTrial === "trial-3") return 300;
    return 0;
  }, [selectedTrial]);

  const trialLevel =
    selectedTrial === "trial-2" ? "mid" : selectedTrial === "trial-3" ? "high" : "none";
  const trialIndex = selectedTrial?.split("-")[1] || "";
  const isRubbing = isRunning && selectedTrial !== "trial-1";
  const canShowResult = Boolean(
    selectedTrial && (isTesting || completedTrials.includes(selectedTrial)),
  );
  const canSkip = Boolean(selectedTrial && durationSeconds > 0 && !isTesting);

  const markTrialCompleted = () => {
    if (!selectedTrial) return;
    const next = Array.from(new Set([...readCompletedTrials(), selectedTrial]));
    persistCompletedTrials(next);
    setCompletedTrials(next);
    return next;
  };

  const handleSelectTrial = (id) => {
    setSelectedTrial(id);
    setStarted(false);
    setIsTesting(false);
    setIsRunning(false);
    setResultTrialId(null);
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
    if (!isFreshStart) return;
    persistCompletedTrials([]);
  }, [isFreshStart]);

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
    setStarted(true);
    setIsRunning(false);
    setRemaining(0);
    startPaperTesting();
  };

  const handleShowResult = () => {
    if (!selectedTrial || !trialIndex) return;
    if (isTesting) {
      markTrialCompleted();
      setResultTrialId(selectedTrial);
      return;
    }
    if (completedTrials.includes(selectedTrial)) {
      setResultTrialId(selectedTrial);
    }
  };

  const handleResetProgress = () => {
    persistCompletedTrials([]);
    setCompletedTrials([]);
    setSelectedTrial(null);
    setStarted(false);
    setIsTesting(false);
    setRemaining(0);
    setIsRunning(false);
    setResultTrialId(null);
  };

  const formatTime = (value) => {
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const balloonStyle = getBalloonStyle({ trialLevel, started, isTesting, selectedTrial });
  const papersStyle = getPapersContainerStyle({ trialLevel, started, isTesting });
  const resultData = resultTrialId ? TRIAL_RESULTS[resultTrialId] : null;
  const resultPaperCount =
    resultData?.intensity === "high" ? 12 : resultData?.intensity === "mid" ? 4 : 0;
  const resultCompletedCount = resultTrialId
    ? Array.from(new Set([...completedTrials, resultTrialId])).length
    : completedCount;
  const resultAllTrialsCompleted = resultCompletedCount === totalTrials;
  const statusText = isRunning
    ? t.timerRunning
    : isTesting
      ? t.timerTesting
      : started
        ? t.timerDone
        : t.timerReady;
  const bubbleText = selectedTrial
    ? `${t.selectTrial}: ${selectedTrialLabel}. ${statusText}`
    : t.chooseTrialFirst;
  const progressPercent = totalTrials ? (completedCount / totalTrials) * 100 : 0;
  const readScreenText = [
    t.title,
    t.selectTrial,
    selectedTrialLabel,
    t.timer,
    formatTime(remaining),
    statusText,
  ].join(". ");

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
        fontFamily: "Prompt, sans-serif",
      }}
    >
      <style>{forceEffectSimStyles}</style>

      <div
        className="p6-sim-mobile-stage relative isolate z-[1] grid h-[100dvh] w-full grid-cols-[420px_minmax(0,1fr)_420px] gap-[clamp(10px,1.6vw,18px)] p-[clamp(10px,1.5vw,16px)]"
        style={{
          background:
            "linear-gradient(180deg, rgba(251, 252, 254, 0.8), rgba(244, 246, 249, 0.8))",
          border: "1px solid rgba(255, 255, 255, 0.9)",
          boxShadow: "0 22px 42px rgba(17, 24, 39, 0.14)",
        }}
      >
        <div className="flex h-full flex-col items-start gap-3 rounded-[24px] border border-slate-200/80 bg-white/92 p-4 shadow-[0_18px_30px_rgba(15,23,42,0.16)]">
          <div className="w-full rounded-[24px] border border-slate-300/50 bg-white/95 p-5 shadow-[0_12px_22px_rgba(15,23,42,0.12)]">
            <div className="mb-4 rounded-[14px] bg-sky-100 px-4 py-3 text-[17px] font-black text-slate-900">
              {t.selectTrial}
            </div>
            <div className="grid gap-4">
              {trialOptions.map((item) => {
                const done = completedTrials.includes(item.id);
                const active = selectedTrial === item.id;
                return (
                  <button
                    key={item.id}
                    className={`flex w-full items-center justify-between gap-3 rounded-[18px] border-2 px-5 py-5 text-left text-[16px] font-bold transition hover:-translate-y-0.5 ${
                      active
                        ? "border-blue-500 bg-blue-100 text-blue-900"
                        : "border-slate-200 bg-slate-50 text-slate-800"
                    }`}
                    type="button"
                    onClick={() => handleSelectTrial(item.id)}
                  >
                    <span>{item.label[lang]}</span>
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-full border text-[13px] font-black ${
                        done ? "border-blue-500 bg-white text-blue-600" : "border-slate-300 text-slate-300"
                      }`}
                    >
                      {done ? "OK" : ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full rounded-[24px] border border-slate-200/80 bg-[#eef5ff] p-5 shadow-[0_12px_22px_rgba(15,23,42,0.12)]">
            <div className="flex items-center justify-between gap-3">
              <div className="text-[17px] font-black text-slate-900">{t.progress}</div>
              <div className="rounded-full bg-blue-100 px-4 py-1.5 text-[15px] font-black text-blue-700">
                {lang === "th" ? `ทำแล้ว ${completedCount}/${totalTrials}` : `${completedCount}/${totalTrials}`}
              </div>
            </div>
            <div className="mt-5 h-5 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#60a5fa,#2563eb)] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-5 text-[14px] font-bold leading-[1.6] text-slate-700">
              {allTrialsCompleted ? t.summaryDone : t.summaryProgress}
            </div>
          </div>

          <div className="fixed bottom-3 left-3 flex gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_10px_22px_rgba(0,0,0,0.12)]">

        <button
          onClick={() => setLang("th")}
          className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
            lang === "th" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
          }`}
        >
          ไทย
        </button>

        <button
          onClick={() => setLang("en")}
          className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
            lang === "en" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
          }`}
        >
          English
        </button>

        <button
          onClick={() => setLang("ms")}
          className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
            lang === "ms" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
          }`}
        >
          Melayu
        </button>

      </div>
        </div>

        <div className="relative h-full overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/92 p-4 shadow-[0_18px_30px_rgba(15,23,42,0.16)]">
          <div className="absolute left-4 top-4 z-[7] max-w-[320px] rounded-[20px] bg-white/90 px-5 py-3.5 text-slate-900 shadow-[0_14px_28px_rgba(15,23,42,0.14)] backdrop-blur-sm">
            <div className="text-[17px] font-black">{t.stageTitle}</div>
            <div className="mt-1 text-[13px] font-semibold leading-[1.5] text-slate-600">{t.stageHint}</div>
          </div>

          <div className="p6-force-sim-balloons p6-gen-balloons absolute bottom-[-20%] left-1/2 z-[3] w-full -translate-x-1/2">
            <div
              className="p6-force-sim-balloon left"
              style={{ "--base": "0px", "--shift": "0px" }}
              aria-label="balloon"
            >
              {isRubbing && (
                <div className="p6-force-sim-rub rub-left" aria-hidden="true">
                  <div className="p6-force-sim-tissue" />
                </div>
              )}
            </div>
          </div>

          {started && isTesting && trialLevel !== "none" && (
            <div
              className="p6-sim-mobile-papers pointer-events-none absolute left-[58%] top-[50%] z-[6] h-[86px] w-[120px] -translate-x-1/2"
              style={{ ...papersStyle, transform: "translateX(-40%) translateY(0px)" }}
            >
              {PAPER_BASE.map((_, idx) => {
                if (trialLevel === "mid" && idx > 4) return null;
                return (
                  <img
                    key={idx}
                    src="/images/p6/equipment/tissue-real.svg"
                    alt="paper"
                    className="absolute h-[22px] w-[28px]"
                    style={getPaperStyle({ index: idx, trialLevel, isTesting })}
                  />
                );
              })}
            </div>
          )}
          {trialLevel === "none" && selectedTrial && started && isTesting && (
            <div
              className="p6-sim-mobile-papers pointer-events-none absolute left-[50%] top-[58%] z-[2] h-[90px] w-[140px] -translate-x-1/2"
              style={{ opacity: 1 }}
            >
              {PAPER_BASE.map((_, idx) => {
                if (idx > 3) return null;
                return (
                  <img
                    key={`none-${idx}`}
                    src="/images/p6/equipment/tissue-real.svg"
                    alt="paper"
                    className="absolute h-[22px] w-[28px]"
                    style={{
                      ...getPaperStyle({ index: idx, trialLevel, isTesting }),
                      filter: "contrast(1.12) saturate(1.1)",
                    }}
                  />
                );
              })}
            </div>
          )}
          {selectedTrial && (
            <div className="absolute bottom-[10%] left-1/2 z-[4] -translate-x-1/2 rounded-full border border-slate-200/80 bg-white px-4 py-2 text-[13px] font-black text-slate-900 shadow-[0_12px_22px_rgba(15,23,42,0.14)]">
              {t.selectTrial}: {selectedTrialLabel}
            </div>
          )}
        </div>

        <div className="flex h-full flex-col items-center gap-4 rounded-[24px] border border-slate-200/80 bg-white/95 p-5 shadow-[0_18px_30px_rgba(15,23,42,0.16)]">
          <div className="w-full rounded-[20px] border-[3px] border-slate-900 bg-white px-5 py-5 text-[18px] font-black text-slate-900 shadow-[0_12px_22px_rgba(15,23,42,0.12)]">
            {bubbleText}
          </div>
          <div className="w-full rounded-[18px] border border-slate-200/80 bg-slate-50 px-4 py-4 text-center text-[16px] font-black text-slate-900 shadow-[0_10px_18px_rgba(15,23,42,0.12)]">
            {t.timer}: {formatTime(remaining)}
          </div>
          <img
            className="h-[240px] w-auto"
            src="/images/p4/exp1/character-boy.png"
            alt="นักเรียน"
          />

          <div className="mt-auto flex flex-wrap items-center justify-center gap-3">
            <button
              className={`grid place-items-center gap-1 ${
                started && durationSeconds > 0 && !isTesting
                  ? "cursor-pointer"
                  : canStart
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-50"
              }`}
              type="button"
              onClick={
                started && durationSeconds > 0 && !isTesting
                  ? handleSkip
                  : handleStart
              }
              aria-disabled={
                started && durationSeconds > 0 && !isTesting ? false : !canStart
              }
            >
              <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-white/60 bg-[radial-gradient(circle_at_30%_30%,#fff2b5,#f59e0b)] text-slate-900 shadow-[0_16px_24px_rgba(15,23,42,0.18)]">
                {started && durationSeconds > 0 && !isTesting ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
                    <path d="M6 5h4v14H6V5zm6 7l6 4V8l-6 4z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
                    <path d="M9 6l9 6-9 6V6z" fill="currentColor" />
                  </svg>
                )}
              </span>
              <span className="text-[16px] font-black">
                {started && durationSeconds > 0 && !isTesting ? t.skip : t.start}
              </span>
            </button>
            <button
              className="grid place-items-center gap-1"
              type="button"
              onClick={handleResetProgress}
            >
              <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-white/60 bg-[radial-gradient(circle_at_30%_30%,#e2e8f0,#94a3b8)] text-slate-900 shadow-[0_16px_24px_rgba(15,23,42,0.18)]">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
                  <path
                    d="M12 6a6 6 0 1 1-5.2 3H5.5a.75.75 0 0 1-.53-1.28l2.1-2.1a.75.75 0 0 1 1.06 0l2.1 2.1a.75.75 0 0 1-.53 1.28H8.05A4.5 4.5 0 1 0 12 7.5V6z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="text-[16px] font-black">{t.reset}</span>
            </button>
            {canShowResult && (
              <button
                className="grid place-items-center gap-1 cursor-pointer"
                type="button"
                onClick={handleShowResult}
              >
                <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-white/60 bg-[radial-gradient(circle_at_30%_30%,#dbeafe,#60a5fa)] text-slate-900 shadow-[0_16px_24px_rgba(15,23,42,0.18)]">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
                    <path
                      d="M4 6h16v12H4zM7 10h10M7 14h6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-[16px] font-black">{t.result}</span>
              </button>
            )}
          </div>
          <button
            className="mt-4 inline-flex items-center gap-2 self-end rounded-[22px] bg-white px-5 py-3 text-[14px] font-black text-slate-700 shadow-[0_12px_22px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5"
            type="button"
            onClick={() => navigate("/p6/experiment/electric-generation/steps")}
            aria-label={t.back}
            title={t.back}
          >
            <span className="text-[18px] leading-none">&lt;&lt;</span>
            {t.back}
          </button>
        </div>

        {resultData && (
          <div className="absolute inset-0 z-[50] flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-[2px]">
            <div
              className="w-[min(980px,92vw)] overflow-hidden rounded-[28px] border border-white/80 bg-[linear-gradient(180deg,#eef8ff_0%,#dff1ff_55%,#cfe7f9_100%)] shadow-[0_26px_60px_rgba(15,23,42,0.28)]"
              role="dialog"
              aria-modal="true"
              aria-label={t.resultTitle}
            >
              <div className="border-b border-slate-300/60 px-6 py-5 text-center">
                <h2 className="m-0 text-[clamp(24px,2.4vw,34px)] font-black text-slate-900">
                  {t.resultTitle}
                </h2>
                <p className="mt-2 text-sm font-bold text-slate-600">
                  {trialOptions.find((item) => item.id === resultTrialId)?.label?.[lang]}
                </p>
              </div>

              <div className="p-5 md:p-7">
                <div className="overflow-hidden rounded-[22px] border border-slate-300/70 bg-white shadow-[0_16px_28px_rgba(15,23,42,0.12)]">
                  <div className="grid grid-cols-1 bg-[#fdeaa1] px-4 py-4 text-center text-sm font-black text-slate-900 md:grid-cols-[1.1fr_1.25fr_0.8fr_1.5fr] md:text-base">
                    <div>{t.objectColumn}</div>
                    <div>{t.outcomeColumn}</div>
                    <div>{t.timeColumn}</div>
                    <div>{t.visualColumn}</div>
                  </div>

                  <div className="grid grid-cols-1 items-center gap-4 px-4 py-5 text-center text-sm font-bold text-slate-900 md:grid-cols-[1.1fr_1.25fr_0.8fr_1.5fr] md:text-base">
                    <div className="flex items-center justify-center gap-3 md:justify-start">
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
                      <div>{t.objectValue}</div>
                    </div>

                    <div>{t[resultData.outcomeKey]}</div>
                    <div>{resultData.time}</div>

                    <div className="relative grid h-[96px] place-items-center">
                      <div
                        className="relative h-[62px] w-[62px] rounded-full"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 25%, #ffd3d3, #ea3b3b 45%, #b91c1c 74%, #7f1d1d)",
                          boxShadow:
                            "inset 0 8px 14px rgba(255, 255, 255, 0.22), inset 0 -12px 18px rgba(0, 0, 0, 0.28), 0 10px 18px rgba(15, 23, 42, 0.18)",
                        }}
                      >
                        <span className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.6),transparent_60%)]" />
                        <span className="absolute -top-[6px] left-1/2 h-[10px] w-[10px] -translate-x-1/2 rounded-[4px] bg-[#991b1b] shadow-[0_4px_8px_rgba(15,23,42,0.2)]" />
                      </div>

                      {resultPaperCount > 0 && (
                        <div className="absolute bottom-[18px] left-1/2 h-[84px] w-[120px] -translate-x-1/2">
                          {PAPER_BASE.slice(0, resultPaperCount).map((_, idx) => (
                            <img
                              key={`result-paper-${idx}`}
                              src="/images/p6/equipment/tissue-real.svg"
                              alt="paper"
                              className="absolute h-[14px] w-[20px]"
                              style={getPaperStyle({
                                index: idx,
                                trialLevel: resultData.intensity,
                                isTesting: true,
                              })}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <button
                    className="rounded-[18px] border border-slate-300/80 bg-white px-6 py-3 text-sm font-black text-slate-800 shadow-[0_12px_24px_rgba(15,23,42,0.1)] transition hover:-translate-y-0.5 md:text-base"
                    type="button"
                    onClick={() => setResultTrialId(null)}
                  >
                    {t.closeResult}
                  </button>
                  <button
                    className="rounded-[18px] bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-[0_12px_24px_rgba(37,99,235,0.24)] transition hover:-translate-y-0.5 md:text-base"
                    type="button"
                    onClick={() => {
                      setResultTrialId(null);
                      if (resultAllTrialsCompleted) {
                        navigate("/p6/experiment/electric-generation/summary");
                      }
                    }}
                  >
                    {resultAllTrialsCompleted ? t.summaryReady : t.continueExperiment}
                  </button>
                </div>

                <p className="mt-4 text-center text-sm font-bold text-blue-900">
                  {resultAllTrialsCompleted
                    ? t.summaryDone
                    : `${t.summaryProgress} (${resultCompletedCount}/${totalTrials})`}
                </p>
              </div>
            </div>
          </div>
        )}

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
        `}</style>
      </div>
    </div>
  );
}

