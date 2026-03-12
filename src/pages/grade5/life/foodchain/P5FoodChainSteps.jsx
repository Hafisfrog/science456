import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeakButton from "../../../../components/SpeakButton";

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

  const speechByLang = useMemo(
    () => ({
      th: `${PAGE_COPY.th.stepLabel}. ${STEPS.map((s) => s.th).join(". ")}`,
      en: `${PAGE_COPY.en.stepLabel}. ${STEPS.map((s) => s.en).join(". ")}`,
      ms: `${PAGE_COPY.ms.stepLabel}. ${STEPS.map((s) => s.ms).join(". ")}`,
    }),
    []
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f5fff1] via-[#e7f6d9] to-[#cfe9b6] font-['Prompt',sans-serif]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 h-56 w-full bg-[#eef8e7]" />
        <div className="absolute left-0 top-6 h-36 w-full opacity-70 [background:radial-gradient(circle_at_15%_40%,rgba(255,255,255,0.9),transparent_50%),radial-gradient(circle_at_45%_35%,rgba(255,255,255,0.85),transparent_55%),radial-gradient(circle_at_75%_45%,rgba(255,255,255,0.9),transparent_50%)]" />
        <div className="absolute right-8 top-6 h-24 w-24 rounded-full bg-[#ffd84d] shadow-[0_0_40px_rgba(255,216,77,0.8)]" />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-[#7dbb4f] to-[#a6d469]" />
      <div className="pointer-events-none absolute bottom-6 left-0 h-8 w-full [background:repeating-linear-gradient(90deg,#8b5a2b_0_12px,transparent_12px_26px)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-28 pt-10">
        <div className="mx-auto w-fit rounded-md bg-[#b7f0a4] px-6 py-2 text-center text-xl font-extrabold text-slate-900 shadow-[0_4px_10px_rgba(0,0,0,0.15)] sm:text-2xl">
          {t.mainTitle}
        </div>

        <div className="mt-5 flex items-end gap-6">
          <img
            className="pointer-events-none h-auto w-[min(26%,260px)] select-none drop-shadow-[0_10px_14px_rgba(0,0,0,0.25)] max-[900px]:w-[min(30%,230px)] max-[640px]:hidden"
            src="/images/p4/exp3/teacher.png"
            alt="teacher"
          />

          <div className="flex-1">
            <div className="mb-3 w-fit rounded-md bg-[#b7f0a4] px-4 py-2 text-lg font-bold text-slate-900 shadow-[0_4px_8px_rgba(0,0,0,0.12)]">
              {t.stepLabel}
            </div>

            <div className="space-y-4">
              {STEPS.map((step, index) => (
                <div
                  key={`${index + 1}-${step.th}`}
                  className="flex items-center gap-3 rounded-full border-2 border-slate-800 bg-white px-5 py-3 shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
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

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div className="rounded-2xl bg-white/90 p-3 shadow-[0_6px_16px_rgba(0,0,0,0.18)]">
            <SpeakButton
              th={speechByLang.th}
              en={speechByLang.en}
              ms={speechByLang.ms}
              activeLang={activeLang}
              onLanguageChange={setActiveLang}
            />
          </div>

          <div className="ml-auto flex gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-700 shadow-md transition hover:bg-slate-50 md:text-base"
            >
              ◀ {t.back}
            </button>
            <button
              type="button"
              onClick={() => navigate("/p5/life/foodchain/select")}
              className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-5 py-2 text-sm font-bold text-white shadow-md transition hover:opacity-95 md:text-base"
            >
              {t.next} ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
