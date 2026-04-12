import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FoodChainLanguageSwitcher } from "./FoodChainControls";

const PAGE_COPY = {
  th: {
    mainTitle: "การทดลองที่ 5 เรื่อง ห่วงโซ่อาหาร",
    stepLabel: "ขั้นตอนการทดลอง",
    back: "ย้อนกลับ",
    nextButton: "ต่อไป",
    next: "เริ่มการทดลอง",
    langLabels: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    mainTitle: "Experiment 5: Food Chain",
    stepLabel: "Experiment Steps",
    back: "Back",
    nextButton: "Next",
    next: "Start Experiment",
    langLabels: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    mainTitle: "Eksperimen 5: Rantaian Makanan",
    stepLabel: "Langkah Eksperimen",
    back: "Kembali",
    nextButton: "Seterusnya",
    next: "Mula Eksperimen",
    langLabels: { th: "Thai", en: "Inggeris", ms: "Melayu" },
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

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-32 pt-8 sm:pb-36">
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
      </div>

      <div className="absolute bottom-3 left-3 z-20 sm:bottom-4 sm:left-4 md:bottom-5 md:left-5">
        <FoodChainLanguageSwitcher
          value={activeLang}
          onChange={setActiveLang}
          labels={PAGE_COPY.th.langLabels}
        />
      </div>

      <div className="absolute bottom-3 right-3 z-20 flex flex-col items-end gap-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 lg:right-10">
        <button
          type="button"
          onClick={() => navigate("/p5/life/foodchain/select")}
          className="mr-5 flex w-[260px] flex-col items-center justify-center gap-3 rounded-[20px] bg-white/92 px-5 py-4 text-slate-900 shadow-[0_18px_36px_rgba(0,0,0,.18)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_24px_46px_rgba(0,0,0,.24)] active:translate-y-px"
        >
          <span className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-blue-100 text-[28px] font-black text-slate-900 shadow-[inset_0_-5px_0_rgba(0,0,0,.10)]">
            {"\u25B6"}
          </span>
          <span className="text-center text-[20px] font-black leading-[1.05]">{t.next}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/p5/life/foodchain/materials")}
            className="inline-flex items-center justify-center gap-2 rounded-[16px] bg-white/95 px-8 py-3 text-[18px] font-black text-slate-900 shadow-[0_14px_28px_rgba(0,0,0,.18)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(0,0,0,.22)] active:translate-y-px"
          >
            <span aria-hidden="true">{"\u00AB"}</span>
            <span>{t.back}</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/p5/life/foodchain/select")}
            className="inline-flex items-center justify-center gap-2 rounded-[16px] bg-[#08c95a] px-8 py-3 text-[18px] font-black text-white shadow-[0_14px_28px_rgba(8,201,90,.24)] transition duration-150 hover:-translate-y-0.5 hover:bg-[#07b351] hover:shadow-[0_18px_34px_rgba(8,201,90,.3)] active:translate-y-px"
          >
            <span>{t.nextButton}</span>
            <span aria-hidden="true">{"\u00BB"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

