import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FoodChainLanguageSwitcher, FoodChainNavButtons } from "./FoodChainControls";

const PAGE_COPY = {
  th: {
    mainTitle: "การทดลองที่ 5 เรื่อง ห่วงโซ่อาหาร",
    stepLabel: "ขั้นตอนการทดลอง",
    back: "ย้อนกลับ",
    next: "เริ่มการทดลอง",
  },
  en: {
    mainTitle: "Experiment 5: Food Chain",
    stepLabel: "Experiment Steps",
    back: "Back",
    next: "Start Experiment",
  },
  ms: {
    mainTitle: "Eksperimen 5: Rantaian Makanan",
    stepLabel: "Langkah Eksperimen",
    back: "Kembali",
    next: "Mula Eksperimen",
  },
};

const STEPS = [
  {
    th: "สำรวจสิ่งมีชีวิตในระบบนิเวศ",
    en: "Observe organisms in the ecosystem",
    ms: "Perhati hidupan dalam ekosistem",
  },
  {
    th: "จำแนกสิ่งมีชีวิตออกเป็นกลุ่ม ผู้ผลิตและผู้บริโภค",
    en: "Classify producers and consumers",
    ms: "Kelaskan pengeluar dan pengguna",
  },
  {
    th: "สร้างห่วงโซ่อาหาร",
    en: "Build the food chain",
    ms: "Bina rantaian makanan",
  },
  {
    th: "บันทึกผลการทดลอง",
    en: "Record experiment results",
    ms: "Catat keputusan eksperimen",
  },
];

export default function P5FoodChainSteps() {
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("th");
  const t = PAGE_COPY[activeLang] ?? PAGE_COPY.th;

  const speakStep = (text, index) => {
    try {
      if (!text || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${index + 1}. ${text}`);
      utterance.lang = activeLang === "th" ? "th-TH" : activeLang === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[url('/images/p5/back.png')] bg-cover bg-center bg-no-repeat font-['Prompt',sans-serif]">
      <div className="absolute inset-0 bg-white/5" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-8 pt-8">
        <div className="mx-auto w-fit rounded-md bg-[#b7f0a4] px-6 py-2 text-center text-xl font-extrabold text-slate-900 shadow-[0_4px_10px_rgba(0,0,0,0.15)] sm:text-2xl">
          {t.mainTitle}
        </div>

        <div className="mt-4 flex items-end gap-5">
          <img
            className="pointer-events-none h-auto w-[min(26%,260px)] select-none drop-shadow-[0_10px_14px_rgba(0,0,0,0.25)] max-[900px]:w-[min(30%,230px)] max-[640px]:hidden"
            src="/images/p4/exp3/teacher.png"
            alt="teacher"
          />

          <div className="flex-1">
            <div className="mb-3 w-fit rounded-md bg-[#b7f0a4] px-4 py-2 text-lg font-bold text-slate-900 shadow-[0_4px_8px_rgba(0,0,0,0.12)]">
              {t.stepLabel}
            </div>

            <div className="space-y-3">
              {STEPS.map((step, index) => (
                <div
                  key={`${index + 1}-${step.th}`}
                  className="flex items-center gap-3 rounded-full border-2 border-slate-800 bg-white px-5 py-2.5 shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#b7f0a4] text-lg font-extrabold text-slate-900 shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                    {index + 1}
                  </div>
                  <div className="text-base font-semibold text-slate-800 sm:text-lg">
                    {step[activeLang] ?? step.th}
                  </div>
                  <button
                    type="button"
                    className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef7ff] text-lg text-blue-600 shadow-[0_4px_10px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:bg-[#e3f0ff]"
                    onClick={() => speakStep(step[activeLang] ?? step.th, index)}
                    aria-label={`Speak step ${index + 1}`}
                  >
                    {"\uD83D\uDD0A"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <FoodChainLanguageSwitcher value={activeLang} onChange={setActiveLang} />

          <FoodChainNavButtons
            className="ml-auto"
            backLabel={t.back}
            nextLabel={t.next}
            onBack={() => navigate("/p5/life/foodchain/materials")}
            onNext={() => navigate("/p5/life/foodchain/select")}
          />
        </div>
      </div>
    </div>
  );
}
