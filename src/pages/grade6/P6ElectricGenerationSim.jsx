import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const COMPLETED_TRIALS_KEY = "p6_electric_generation_completed_trials";

const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย", speechLang: "th-TH" },
  { id: "en", label: "English", speechLang: "en-US" },
  { id: "ms", label: "Melayu", speechLang: "ms-MY" },
];

const UI_TEXT = {
  th: {
    back: "← ย้อนกลับ",
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
    next: "ต่อไป »",
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
  },
  en: {
    back: "← Back",
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
    next: "Next »",
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
  },
  ms: {
    back: "← Kembali",
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
    next: "Seterusnya »",
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
  const [showTrialMenu, setShowTrialMenu] = useState(false);
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
  const canShowResult = Boolean(selectedTrial && started && isTesting);

  const markTrialCompleted = () => {
    if (!selectedTrial) return;
    const next = Array.from(new Set([...readCompletedTrials(), selectedTrial]));
    persistCompletedTrials(next);
    setCompletedTrials(next);
    return next;
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
    setIsRunning(false);
    setRemaining(0);
    startPaperTesting();
  };

  const handleShowResult = () => {
    if (!selectedTrial || !trialIndex || !isTesting) return;
    markTrialCompleted();
    setResultTrialId(selectedTrial);
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
    setResultTrialId(null);
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
  const resultData = resultTrialId ? TRIAL_RESULTS[resultTrialId] : null;
  const resultCompletedCount = resultTrialId
    ? Array.from(new Set([...completedTrials, resultTrialId])).length
    : completedCount;
  const resultAllTrialsCompleted = resultCompletedCount === totalTrials;
  const readScreenText = [
    t.title,
    t.selectTrial,
    selectedTrialLabel,
    t.timer,
    formatTime(remaining),
    isRunning ? t.timerRunning : isTesting ? t.timerTesting : started ? t.timerDone : t.timerReady,
  ].join(". ");

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
        className="p6-sim-mobile-stage relative isolate z-[1] h-[min(720px,92vh)] w-[min(1220px,96vw)] overflow-hidden rounded-[30px] border border-white/95 shadow-[0_24px_44px_rgba(15,23,42,0.2),inset_0_1px_0_rgba(255,255,255,0.82)]"
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
          className="p6-sim-mobile-back absolute left-6 top-[18px] z-[6] cursor-pointer rounded-2xl border border-slate-400/35 bg-gradient-to-br from-white via-[#eef5ff] to-[#e1f0ff] px-[17px] py-2.5 text-[15px] font-black text-slate-800 shadow-[0_12px_22px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5"
          type="button"
          onClick={() => navigate("/p6/experiment/electric-generation/steps")}
        >
          {t.back}
        </button>

        <div className="p6-sim-mobile-left absolute left-8 top-[80px] z-[8] grid w-[150px] justify-items-center gap-4">
          <div className="w-full rounded-[18px] border border-slate-400/40 bg-gradient-to-br from-white/95 via-[#eef5ff] to-[#e1eeff] px-3 py-3 text-blue-900 shadow-[0_10px_16px_rgba(15,23,42,0.1)]">
            <div className="flex items-center justify-between gap-2">
              <div className="text-[13px] font-black">{t.progress}</div>
              <button
                className="cursor-pointer rounded-[11px] border border-red-500/30 bg-gradient-to-br from-white via-[#fff3f3] to-[#ffe8e8] px-2.5 py-1.5 text-[11px] font-black text-red-700 shadow-[0_8px_14px_rgba(17,24,39,0.08)] transition hover:-translate-y-0.5"
                type="button"
                onClick={handleResetProgress}
              >
                {t.reset}
              </button>
            </div>

            <div className="mt-2 flex items-end justify-between">
              <div className="text-[26px] font-black leading-none">
                {completedCount}/{totalTrials}
              </div>
              <div className="text-[11px] font-bold text-slate-500">
                {allTrialsCompleted ? t.summary : t.summaryLocked}
              </div>
            </div>

            <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-600 transition-[width] duration-300"
                style={{ width: `${(completedCount / totalTrials) * 100}%` }}
              />
            </div>
          </div>

          <div className="relative">
            <button
              className="grid w-full cursor-pointer justify-items-center gap-1.5 text-center text-slate-900 transition hover:-translate-y-0.5"
              type="button"
              onClick={handleToggleTrial}
            >
              <div className="grid h-[66px] w-[66px] place-items-center rounded-full border-[6px] border-[#f8d8d8] bg-[radial-gradient(circle_at_30%_30%,#ffd7dc,#ef97a3)] text-white shadow-[0_10px_18px_rgba(15,23,42,0.16)]">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[28px] w-[28px]">
                  <path d="M9 6l9 6-9 6V6z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-[22px] font-extrabold leading-[1.05]">{t.selectTrial}</span>
              <span className="block max-w-full text-[12px] font-bold leading-4 text-slate-600">{selectedTrialLabel}</span>
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
                    {item.label[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <div
              className={`mb-4 w-full rounded-[18px] border border-slate-400/45 bg-gradient-to-br from-white/95 to-[#f1f7ff]/90 px-3 py-3 text-center shadow-[0_10px_18px_rgba(15,23,42,0.12)] ${
                isRunning ? "border-blue-600/50 shadow-[0_12px_22px_rgba(37,99,235,0.2)]" : ""
              }`}
            >
              <div className="text-[20px] font-extrabold leading-tight text-slate-800">{t.timer}</div>
              <div className="my-1 text-[30px] font-black tracking-[1px] text-slate-900">{formatTime(remaining)}</div>
              <div className="text-[11px] font-bold text-slate-500">
                {isRunning
                  ? t.timerRunning
                  : isTesting
                    ? t.timerTesting
                    : started
                      ? t.timerDone
                      : t.timerReady}
              </div>
            </div>

            <button
              className={`grid w-full justify-items-center gap-1.5 text-center transition ${
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
              <span className="text-[22px] font-extrabold leading-[1.05]">{t.start}</span>
              {canStart && <span className="text-[11px] font-bold text-slate-600">{t.startHint}</span>}
            </button>

            {isRunning && (
              <button
                className="mt-2.5 w-full cursor-pointer rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 px-3 py-2.5 text-[13px] font-black text-white shadow-[0_12px_20px_rgba(234,88,12,0.3)] transition hover:-translate-y-0.5"
                type="button"
                onClick={handleSkip}
              >
                {t.skip}
              </button>
            )}

            {canShowResult && (
              <button
                className="mt-2.5 w-full cursor-pointer rounded-xl border border-slate-400/50 bg-gradient-to-br from-white to-[#eef4ff] px-3 py-2.5 text-[13px] font-black text-slate-800 shadow-[0_10px_18px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5"
                type="button"
                onClick={handleShowResult}
              >
                {t.result}
              </button>
            )}

          </div>
        </div>

        <button
          className="hidden absolute right-[38px] top-7 z-[4] h-14 w-14 place-items-center rounded-2xl border-2 border-slate-400/45 bg-gradient-to-br from-white to-[#edf5ff] text-slate-900 shadow-[0_12px_22px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5"
          type="button"
          aria-label="sound"
          title={t.listen}
          onClick={() => speakText(readScreenText, speechLang)}
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
          className="p6-sim-mobile-balloon absolute bottom-[39%] left-[53%] z-[3] h-[140px] w-[140px] rounded-full"
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
          className="p6-sim-mobile-papers pointer-events-none absolute bottom-[35%] left-[53%] z-[2] h-[84px] w-[130px]"
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

<div className="p6-sim-mobile-lang absolute bottom-1 left-6 z-[20] inline-flex items-center gap-2 rounded-[18px] border border-sky-200 bg-white/90 p-2 shadow-[0_10px_16px_rgba(15,23,42,0.12)]">
            {LANGUAGE_OPTIONS.map((option) => (
              <button
                key={option.id}
                className={`rounded-full px-3 py-2 text-sm font-bold sm:px-4 sm:text-xl ${
                  lang === option.id ? "bg-sky-500 text-white" : "bg-sky-100 text-sky-700"
                }`}
                type="button"
                onClick={() => setLang(option.id)}
              >
                {option.label}
              </button>
            ))}
          <button
            className="grid h-9 w-9 place-items-center rounded-full border border-sky-300 bg-gradient-to-br from-white to-sky-100 text-sky-700 sm:h-10 sm:w-10"
            type="button"
            aria-label="sound"
            title={t.listen}
            onClick={() => speakText(readScreenText, speechLang)}
          >
            <svg viewBox="0 0 64 64" aria-hidden="true" className="h-5 w-5">
              <path d="M14 26h12l14-10v32l-14-10H14z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
              <path d="M46 22c4 4 4 16 0 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="p6-sim-mobile-actions absolute bottom-4 right-4 z-[10] flex flex-col items-end gap-2">
          {isRunning && (
            <button
              className="cursor-pointer rounded-full border border-orange-500/40 bg-gradient-to-b from-[#ffb347] to-[#ff8c00] px-4 py-2 text-base font-extrabold text-white shadow-[0_12px_18px_rgba(249,115,22,0.35)] transition hover:-translate-y-0.5 sm:px-6 sm:py-2.5 sm:text-[26px]"
              type="button"
              onClick={handleSkip}
            >
              {t.skip}
            </button>
          )}

          {canShowResult && (
            <button
              className="max-w-[180px] cursor-pointer rounded-xl border border-blue-500/40 bg-gradient-to-b from-[#60a5fa] to-[#2563eb] px-4 py-2 text-sm font-bold text-white shadow-[0_10px_16px_rgba(37,99,235,0.35)] transition hover:-translate-y-0.5 sm:max-w-none sm:px-5 sm:text-[18px]"
              type="button"
              onClick={handleShowResult}
            >
              {t.result}
            </button>
          )}
        </div>

        <div
          className="absolute inset-x-0 bottom-0 z-[1] h-[32%] origin-top"
          style={{
            background:
              "linear-gradient(180deg, rgba(188, 226, 246, 0.74), rgba(141, 194, 226, 0.92)), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.62) 0 40px, rgba(132, 179, 209, 0.72) 40px 42px), repeating-linear-gradient(0deg, transparent 0 34px, rgba(132, 179, 209, 0.72) 34px 36px)",
            transform: "perspective(700px) rotateX(12deg)",
            boxShadow: "inset 0 10px 18px rgba(51, 65, 85, 0.08)",
          }}
        />

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
                        className="relative h-[54px] w-[54px] rounded-full"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 30%, #ffd7b0 0%, #f3a86e 45%, #e18a54 100%)",
                          boxShadow: "inset -4px -6px 10px rgba(102, 52, 25, 0.35)",
                        }}
                      >
                        <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-[#e18a54]" />
                      </div>

                      <div className="absolute bottom-[18px] left-1/2 h-[84px] w-[130px] -translate-x-1/2">
                        {PAPER_BASE.map((_, idx) => (
                          <span
                            key={`result-paper-${idx}`}
                            className="absolute h-[10px] w-5 rounded-[3px] border border-slate-400/45 bg-gradient-to-br from-white/90 to-slate-100/95 shadow-[0_6px_10px_rgba(17,24,39,0.18)]"
                            style={getPaperStyle({
                              index: idx,
                              trialLevel: resultData.intensity,
                              isTesting: true,
                            })}
                          />
                        ))}
                      </div>

                      <div className="absolute bottom-[8px] left-1/2 h-[30px] w-0 -translate-x-1/2 border-l-2 border-dashed border-slate-800">
                        <span
                          className="absolute left-[-6px] top-[-6px] h-3 w-3 border-l-2 border-t-2 border-slate-800"
                          style={{ transform: "rotate(45deg)" }}
                        />
                      </div>
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
          @media (max-width: 1200px) {
            .p6-sim-mobile-left {
              left: 18px !important;
              top: 72px !important;
              width: 120px !important;
            }
            .p6-sim-mobile-table {
              left: 56% !important;
              bottom: 30% !important;
              width: min(780px, 78%) !important;
            }
            .p6-sim-mobile-lang {
              left: 12px !important;
              bottom: 4px !important;
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
              bottom: 4px !important;
              transform: scale(0.8);
              transform-origin: left bottom;
            }
            .p6-sim-mobile-next {
              font-size: 24px !important;
              padding: 8px 18px !important;
            }
          }
          @media (max-width: 640px) {
            .p6-sim-mobile-stage {
              width: min(390px, calc(100vw - 14px)) !important;
              height: min(844px, calc(100dvh - 14px)) !important;
              border-radius: 26px !important;
            }
            .p6-sim-mobile-back {
              left: 10px !important;
              top: 10px !important;
              padding: 8px 12px !important;
              font-size: 13px !important;
            }
            .p6-sim-mobile-left {
              left: 8px !important;
              right: auto !important;
              top: 76px !important;
              width: 104px !important;
              gap: 10px !important;
            }
            .p6-sim-mobile-table {
              left: 59% !important;
              bottom: 150px !important;
              width: 80% !important;
              height: 122px !important;
            }
            .p6-sim-mobile-balloon {
              left: 57% !important;
              bottom: 242px !important;
              width: 120px !important;
              height: 120px !important;
            }
            .p6-sim-mobile-papers {
              left: 57% !important;
              bottom: 220px !important;
              width: 116px !important;
              height: 76px !important;
            }
            .p6-sim-mobile-menu {
              left: 0 !important;
              top: calc(100% + 8px) !important;
              width: min(230px, 72vw) !important;
            }
            .p6-sim-mobile-lang {
              left: 8px !important;
              bottom: 2px !important;
              gap: 6px !important;
              padding: 6px !important;
              transform: none !important;
            }
            .p6-sim-mobile-actions {
              right: 8px !important;
              bottom: 10px !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

