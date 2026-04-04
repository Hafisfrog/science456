import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LightLanguageSwitcher, LightNavButtons } from "./LightControls";

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
    start: "▶ ไปต่อ",
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

const LANGUAGE_LABELS = {
  th: { th: "\u0E44\u0E17\u0E22", en: "\u0E2D\u0E31\u0E07\u0E01\u0E24\u0E29", ms: "\u0E21\u0E25\u0E32\u0E22\u0E39" },
  en: { th: "Thai", en: "English", ms: "Malay" },
  ms: { th: "Thai", en: "Inggeris", ms: "Melayu" },
};

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

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cyan-300 via-sky-500 to-sky-800 px-4 pb-10 pt-6 font-['Prompt',sans-serif] sm:px-8">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/materials/back.png')" }}
      />
      <div className="pointer-events-none absolute left-1/2 top-[-13rem] h-[28rem] w-[140%] -translate-x-1/2 rounded-b-[100%] bg-sky-100/70" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background:repeating-linear-gradient(90deg,rgba(15,23,42,0.35)_0px,rgba(15,23,42,0.35)_10px,transparent_10px,transparent_190px)]" />

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
          <LightLanguageSwitcher
            value={language}
            onChange={setLanguage}
            labels={LANGUAGE_LABELS[language]}
          />

          <LightNavButtons
            className="ml-auto"
            backLabel={content.back}
            nextLabel={content.start}
            onBack={() => navigate("/p4/light/select")}
            onNext={() => navigate("/p4/light/thinking")}
          />
        </div>
      </div>
    </div>
  );
}
