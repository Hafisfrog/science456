import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FoodChainLanguageSwitcher, FoodChainNavButtons } from "./FoodChainControls";

const UI = {
  th: {
    grade: "ชั้นประถมศึกษาปีที่ 5",
    topic: "ชีวิตสัมพันธ์",
    experiment: "การทดลองที่ 5",
    lesson: "ห่วงโซ่อาหาร",
    back: "ย้อนกลับ",
    next: "ไปต่อ",
    langLabel: { th: "ไทย", en: "อังกฤษ", ms: "มาลายู" },
  },
  en: {
    grade: "Grade 5",
    topic: "Interdependence",
    experiment: "Experiment 5",
    lesson: "Food Chain",
    back: "Back",
    next: "Next",
    langLabel: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    grade: "Tahun 5",
    topic: "Hidupan Saling Bergantung",
    experiment: "Eksperimen 5",
    lesson: "Rantaian Makanan",
    back: "Kembali",
    next: "Seterusnya",
    langLabel: { th: "Thai", en: "Inggeris", ms: "Melayu" },
  },
};

const VOICE_LANG = { th: "th-TH", en: "en-US", ms: "ms-MY" };

export default function P5FoodChainIntro() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const content = UI[language] ?? UI.th;
  const nextPath = "/p5/life/foodchain/vocab";

  const speak = (text) => {
    try {
      if (
        !text ||
        typeof window === "undefined" ||
        typeof SpeechSynthesisUtterance === "undefined" ||
        !window.speechSynthesis
      ) {
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = VOICE_LANG[language] ?? "th-TH";
      utterance.rate = 0.95;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore speech errors
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[url('/images/p5/back.png')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-white/5" />

      <div className="relative z-10 flex h-full flex-col px-4 py-4 sm:px-8 sm:py-6">
        <div className="absolute left-4 top-4 z-20 inline-flex w-fit items-center rounded-full bg-[#99e29f] px-3 py-1 text-lg font-extrabold text-[#2d8b57] [text-shadow:0_2px_0_#ffffff] sm:left-8 sm:top-6 sm:px-4 sm:py-1.5 sm:pr-10 sm:text-3xl">
          {content.grade}
          <button
            type="button"
            onClick={() => speak(content.grade)}
            className="absolute bottom-1 right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-[10px] text-[#2163a5] shadow-[0_4px_8px_rgba(0,0,0,0.12)] transition hover:bg-white sm:bottom-1.5 sm:right-1.5 sm:h-6 sm:w-6 sm:text-xs"
            aria-label="Speak grade"
          >
            {"\uD83D\uDD0A"}
          </button>
        </div>

        <div className="flex w-full flex-1 flex-col items-start justify-center gap-4 pb-20 pt-16 sm:flex-row sm:items-center sm:justify-center sm:gap-0 sm:pb-24 sm:pt-10">
          <div className="relative w-full max-w-[560px]">
            <div className="absolute -left-2 -top-2 h-5 w-5 rounded-sm border-2 border-[#1e3256] bg-[#f28a26] sm:h-7 sm:w-7 sm:border-[3px]" />
            <div className="absolute -right-2 -top-2 h-5 w-5 rounded-sm border-2 border-[#1e3256] bg-[#f28a26] sm:h-7 sm:w-7 sm:border-[3px]" />
            <div className="absolute -bottom-2 -left-2 h-5 w-5 rounded-sm border-2 border-[#1e3256] bg-[#f28a26] sm:h-7 sm:w-7 sm:border-[3px]" />
            <div className="absolute -bottom-2 -right-2 h-5 w-5 rounded-sm border-2 border-[#1e3256] bg-[#f28a26] sm:h-7 sm:w-7 sm:border-[3px]" />

            <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-sm border-[3px] border-[#167b78] bg-[#2cb3ad] sm:translate-x-2 sm:translate-y-2 sm:border-4" />

            <div className="relative rounded-sm border-[3px] border-[#1e3256] bg-[#f5e9c7] px-5 pt-3 pb-8 text-center text-2xl font-black text-black sm:border-4 sm:px-8 sm:pt-5 sm:pb-10 sm:text-5xl">
              {content.topic}
              <button
                type="button"
                onClick={() => speak(content.topic)}
                className="absolute bottom-2 right-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-xs text-[#2163a5] shadow-[0_4px_8px_rgba(0,0,0,0.12)] transition hover:bg-white sm:h-7 sm:w-7 sm:text-sm"
                aria-label="Speak topic"
              >
                {"\uD83D\uDD0A"}
              </button>
            </div>
          </div>

          <div className="ml-2 hidden h-1 w-[18vw] min-w-[160px] max-w-[340px] rounded-full bg-[#17223e] sm:ml-0 sm:block" />

          <div className="relative w-full max-w-[280px] sm:ml-4">
            <button
              type="button"
              onClick={() => navigate(nextPath)}
              className="w-full rounded-2xl border-[3px] border-[#1a2454] bg-[#f5ecd7] px-4 pt-3 pb-8 text-left shadow-[6px_6px_0_#4a79ff] transition-transform hover:scale-[1.02] sm:border-4 sm:px-5 sm:pt-4 sm:pb-10"
            >
              <p className="text-2xl font-extrabold text-[#49a52f] sm:text-3xl">{content.experiment}</p>
              <p className="mt-1 text-3xl font-black text-black sm:text-4xl">{content.lesson}</p>
            </button>
            <button
              type="button"
              onClick={() => speak(`${content.experiment} ${content.lesson}`)}
              className="absolute bottom-2 right-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-xs text-[#2163a5] shadow-[0_4px_8px_rgba(0,0,0,0.12)] transition hover:bg-white sm:h-7 sm:w-7 sm:text-sm"
              aria-label="Speak experiment"
            >
              {"\uD83D\uDD0A"}
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 z-30">
          <FoodChainLanguageSwitcher
            value={language}
            onChange={setLanguage}
            labels={content.langLabel}
          />
        </div>

        <div className="absolute bottom-4 right-4 z-30 max-sm:bottom-20">
          <FoodChainNavButtons
            backLabel={content.back}
            nextLabel={content.next}
            onBack={() => navigate("/p5/life")}
            onNext={() => navigate(nextPath)}
          />
        </div>
      </div>
    </div>
  );
}
