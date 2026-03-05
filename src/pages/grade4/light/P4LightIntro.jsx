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

function StepItem({ number, text }) {
  return (
    <div className="flex items-center rounded-full bg-slate-100 px-5 py-3 shadow-[0_4px_0_rgba(0,0,0,0.22)]">
      <div className="mr-4 flex h-11 w-11 items-center justify-center rounded-full bg-blue-500 text-xl font-extrabold text-white">
        {number}
      </div>
      <p className="text-lg font-semibold text-slate-800 sm:text-xl">{text}</p>
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
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-600 px-4 pb-8 pt-6 font-['Prompt',sans-serif] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mx-auto mb-6 w-fit rounded-xl border-4 border-slate-900 bg-white px-6 py-3 text-center text-xl font-extrabold text-slate-900 shadow-[0_6px_18px_rgba(0,0,0,0.25)] sm:text-3xl">
          {content.title}
        </h1>

        <div className="mb-4 w-fit rounded-lg border-2 border-slate-900 bg-white px-4 py-2 text-lg font-bold text-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
          {content.stepLabel}
        </div>

        <div className="rounded-2xl border-8 border-slate-700 bg-slate-300 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.25)] sm:p-8">
          <div className="space-y-5">
            {content.steps.map((step, index) => (
              <StepItem key={`${index + 1}-${step}`} number={index + 1} text={step} />
            ))}
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
              onClick={() => navigate(-1)}
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
