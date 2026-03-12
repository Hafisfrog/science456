import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeakButton from "../../../components/SpeakButton";

const UI = {
  th: {
    title: "การทดลองที่ 4 เรื่อง ตัวกลางของแสง",
    stepLabel: "ขั้นตอนการทดลอง",
    steps: [
      "เลือกวัตถุทดลอง",
      "สังเกตผลที่แสดง",
      "เปลี่ยนชนิดวัตถุและทำการทดลองซ้ำ",
      "บันทึกผลการทดลอง",
    ],
    back: "◀ ย้อนกลับ",
    start: "▶ เริ่มการทดลอง",
    speakPrefix: "ขั้นตอนการทดลอง",
    speakDivider: "ข้อที่",
  },
  en: {
    title: "Experiment 4: Medium of Light",
    stepLabel: "Experiment Steps",
    steps: [
      "Choose a material for testing.",
      "Observe the result shown.",
      "Change the material type and repeat the test.",
      "Record the experiment result.",
    ],
    back: "◀ Back",
    start: "▶ Start Experiment",
    speakPrefix: "Experiment steps",
    speakDivider: "Step",
  },
  ms: {
    title: "Eksperimen 4: Medium Cahaya",
    stepLabel: "Langkah Eksperimen",
    steps: [
      "Pilih bahan untuk diuji.",
      "Perhatikan keputusan yang dipaparkan.",
      "Tukar jenis bahan dan ulang eksperimen.",
      "Catat keputusan eksperimen.",
    ],
    back: "◀ Kembali",
    start: "▶ Mula Eksperimen",
    speakPrefix: "Langkah eksperimen",
    speakDivider: "Langkah",
  },
};

function buildSpeakText(content) {
  const joined = content.steps
    .map((step, index) => `${content.speakDivider} ${index + 1} ${step}`)
    .join(" ");
  return `${content.speakPrefix} ${joined}`;
}

function StepItem({ number, text, onSpeak }) {
  return (
    <div className="flex items-center gap-3 rounded-full border-2 border-slate-800 bg-white px-4 py-3 shadow-[0_4px_0_rgba(0,0,0,0.22)] sm:px-5">
      <div className="mr-4 flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-white bg-blue-500 text-xl font-extrabold text-white shadow-[0_3px_0_rgba(0,0,0,0.18)]">
        {number}
      </div>
      <p className="flex-1 text-lg font-semibold text-slate-800 sm:text-xl">{text}</p>
      <button
        type="button"
        onClick={onSpeak}
        aria-label={`Speak step ${number}`}
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef7ff] text-xl text-blue-600 shadow-[0_4px_10px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:bg-[#e3f0ff]"
      >
        {"\uD83D\uDD0A"}
      </button>
    </div>
  );
}

export default function P4LightIntro() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const content = UI[language] ?? UI.th;

  const speakTextByLang = useMemo(
    () => ({
      th: buildSpeakText(UI.th),
      en: buildSpeakText(UI.en),
      ms: buildSpeakText(UI.ms),
    }),
    []
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#8fb1bf] px-4 pb-10 pt-6 font-['Prompt',sans-serif] sm:px-8">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="intro-bg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#a5b2ba" />
            <stop offset="45%" stopColor="#8ab2bf" />
            <stop offset="100%" stopColor="#4f7f97" />
          </linearGradient>
          <linearGradient id="intro-glass" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#c7f2ff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#88d3e8" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#intro-bg)" />
        <path d="M0 0H1440V120C1060 200 380 200 0 120Z" fill="#9aa1a9" />
        <rect x="0" y="120" width="1440" height="170" fill="#6d8698" />
        <rect x="80" y="140" width="150" height="140" rx="10" fill="url(#intro-glass)" />
        <rect x="260" y="140" width="150" height="140" rx="10" fill="url(#intro-glass)" />
        <rect x="440" y="140" width="150" height="140" rx="10" fill="url(#intro-glass)" />
        <rect x="850" y="140" width="150" height="140" rx="10" fill="url(#intro-glass)" />
        <rect x="1030" y="140" width="150" height="140" rx="10" fill="url(#intro-glass)" />
        <rect x="1210" y="140" width="150" height="140" rx="10" fill="url(#intro-glass)" />

        <rect x="300" y="0" width="6" height="120" fill="#2f3c44" />
        <path d="M260 120H350L330 170H280Z" fill="#2f3c44" />
        <polygon points="280,170 330,170 360,270 250,270" fill="rgba(190,230,240,0.35)" />

        <rect x="1134" y="0" width="6" height="120" fill="#2f3c44" />
        <path d="M1094 120H1184L1164 170H1114Z" fill="#2f3c44" />
        <polygon points="1114,170 1164,170 1194,270 1084,270" fill="rgba(190,230,240,0.35)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl">
        <h1 className="mx-auto mb-4 w-fit rounded-md border-4 border-slate-900 bg-white px-6 py-3 text-center text-xl font-extrabold text-slate-900 shadow-[0_6px_18px_rgba(0,0,0,0.25)] sm:text-3xl">
          {content.title}
        </h1>

        <div className="relative">
          <img
            className="pointer-events-none absolute bottom-0 left-[-10px] h-auto w-[min(26%,260px)] select-none drop-shadow-[0_10px_14px_rgba(0,0,0,0.25)] max-[900px]:w-[min(30%,230px)] max-[640px]:hidden"
            src="/images/p4/exp3/teacher.png"
            alt="teacher"
          />

          <div className="ml-[220px] mb-3 w-fit rounded-md border-2 border-slate-900 bg-white px-4 py-2 text-lg font-bold text-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.2)] max-[900px]:ml-[180px] max-[640px]:ml-0">
            {content.stepLabel}
          </div>

          <div className="ml-[220px] rounded-2xl border-[10px] border-slate-800 bg-white p-5 shadow-[0_10px_24px_rgba(0,0,0,0.25)] sm:p-8 max-[900px]:ml-[180px] max-[640px]:ml-0">
            <div className="space-y-5">
              {content.steps.map((step, index) => (
                <StepItem
                  key={`${index + 1}-${step}`}
                  number={index + 1}
                  text={step}
                  onSpeak={() =>
                    window.speechSynthesis?.speak(
                      new SpeechSynthesisUtterance(
                        `${content.speakDivider} ${index + 1} ${step}`
                      )
                    )
                  }
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <SpeakButton
            th={speakTextByLang.th}
            en={speakTextByLang.en}
            ms={speakTextByLang.ms}
            activeLang={language}
            onLanguageChange={setLanguage}
          />

          <div className="ml-auto flex gap-3">
            <button
              type="button"
              className="rounded-full bg-slate-600 px-6 py-3 text-base font-semibold text-white shadow-[0_6px_14px_rgba(0,0,0,0.25)] transition hover:bg-slate-700"
              onClick={() => navigate("/p4/light/select")}
            >
              {content.back}
            </button>

            <button
              type="button"
              className="rounded-full bg-red-500 px-7 py-3 text-base font-bold text-white shadow-[0_8px_18px_rgba(0,0,0,0.3)] transition hover:scale-105 hover:bg-red-600"
              onClick={() => navigate("/p4/light/thinking")}
            >
              {content.start}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
