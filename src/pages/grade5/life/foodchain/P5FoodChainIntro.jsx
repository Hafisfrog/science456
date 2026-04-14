import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FoodChainLanguageSwitcher } from "./FoodChainControls";

const IMAGE_CARD = {
  src: "/images/p5-life.png",
};

const UI = {
  th: {
    grade: "ชั้นประถมศึกษาปีที่ 5",
    topic: "ชีวิตสัมพันธ์",
    experiment: "วิทยาศาสตร์ ป.5",
    lesson: "ห่วงโซ่อาหาร",
    subtitle: "เลือกหน่วยการเรียนรู้",
    back: "ย้อนกลับ",
    next: "ต่อไป",
    langLabel: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    grade: "Grade 5",
    topic: "Interdependence",
    experiment: "Science Grade 5",
    lesson: "Food Chain",
    subtitle: "Choose a learning unit",
    back: "Back",
    next: "Next",
    langLabel: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    grade: "Tahun 5",
    topic: "Hidupan Saling Bergantung",
    experiment: "Sains Tahun 5",
    lesson: "Rantaian Makanan",
    subtitle: "Pilih unit pembelajaran",
    back: "Kembali",
    next: "Seterusnya",
    langLabel: { th: "Thai", en: "English", ms: "Melayu" },
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
    <div className="relative min-h-screen w-full overflow-hidden bg-[url('/images/p5/back.png')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-[#09101d]/72" />
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_left_10%,rgba(253,230,138,0.95)_0,rgba(253,230,138,0.12)_12%,transparent_26%),radial-gradient(circle_at_right_92%,rgba(251,191,36,0.9)_0,rgba(251,191,36,0.08)_10%,transparent_24%)]" />
      <div className="pointer-events-none absolute left-0 top-[12%] h-[6px] w-full bg-gradient-to-r from-transparent via-[#e9d27a] to-transparent shadow-[0_0_30px_rgba(233,210,122,0.95)]" />
      <div className="pointer-events-none absolute bottom-[8%] left-0 h-[6px] w-full bg-gradient-to-r from-transparent via-[#e9d27a] to-transparent shadow-[0_0_30px_rgba(233,210,122,0.95)]" />

      <div className="relative z-10 flex min-h-screen flex-col px-4 py-4 sm:px-8 sm:py-6">
        {/* <div className="absolute left-4 top-4 z-20 inline-flex w-fit items-center rounded-full bg-[#99e29f] px-3 py-1 text-lg font-extrabold text-[#2d8b57] [text-shadow:0_2px_0_#ffffff] sm:left-8 sm:top-6 sm:px-4 sm:py-1.5 sm:pr-10 sm:text-3xl">
          {content.grade}
          <button
            type="button"
            onClick={() => speak(content.grade)}
            className="absolute bottom-1 right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-[10px] text-[#2163a5] shadow-[0_4px_8px_rgba(0,0,0,0.12)] transition hover:bg-white sm:bottom-1.5 sm:right-1.5 sm:h-6 sm:w-6 sm:text-xs"
            aria-label="Speak grade"
          >
            {"\uD83D\uDD0A"}
          </button>
        </div> */}

        <div className="flex flex-1 flex-col items-center justify-center pb-24 pt-24 sm:pb-28 sm:pt-20">
          <div className="text-center text-white">
            <div className="relative inline-flex items-center justify-center">
              <h1 className="text-4xl font-black tracking-tight drop-shadow-[0_5px_20px_rgba(0,0,0,0.45)] sm:text-6xl">
                {content.experiment}
              </h1>
              {/* <button
                type="button"
                onClick={() => speak(content.experiment)}
                className="absolute -right-10 top-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm text-[#2163a5] shadow-[0_4px_10px_rgba(0,0,0,0.16)] transition hover:bg-white sm:-right-12 sm:h-9 sm:w-9"
                aria-label="Speak experiment"
              >
                {"\uD83D\uDD0A"}
              </button> */}
            </div>
            <p className="mt-3 text-xl font-bold text-white/90 sm:text-3xl">{content.subtitle}</p>
          </div>

          <div className="mt-8 w-full max-w-[620px]">
            <button
              type="button"
              onClick={() => navigate(nextPath)}
              className="group relative w-full overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.34)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(0,0,0,0.42)]"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-[#d7ebff]">
                <img
                  src={IMAGE_CARD.src}
                  alt={content.lesson}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="relative bg-white px-5 py-4 text-center sm:px-7 sm:py-5">
                <p className="text-2xl font-black text-[#17223e] sm:text-[2rem]">{content.lesson}</p>
                <p className="mt-1 text-sm font-semibold text-slate-500 sm:text-base">{content.topic}</p>
                {/* <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    speak(`${content.topic} ${content.lesson}`);
                  }}
                  className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#eef7ff] text-base text-[#2163a5] shadow-[0_4px_10px_rgba(0,0,0,0.12)] transition hover:bg-white"
                  aria-label="Speak topic and lesson"
                >
                  {"\uD83D\uDD0A"}
                </button> */}
              </div>
            </button>
          </div>
        </div>

        <div className="fixed bottom-[18px] left-[18px] z-40">
          <FoodChainLanguageSwitcher
            size="materials"
            value={language}
            onChange={setLanguage}
            labels={content.langLabel}
          />
        </div>

        <div className="fixed bottom-[18px] right-[18px] z-40 flex items-center gap-3 max-[720px]:bottom-[12px] max-[720px]:right-[12px] max-[720px]:gap-2">
          <button
            className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-['Prompt',sans-serif] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
            onClick={() => navigate("/p5/life")}
            type="button"
          >
            {"\u00AB"} {content.back}
          </button>

          <button
            className="rounded-[18px] bg-[#08c95a] px-[18px] py-[14px] text-[20px] font-['Prompt',sans-serif] font-black text-white shadow-[0_22px_46px_rgba(8,201,90,.24)] transition hover:-translate-y-0.5 hover:bg-[#07b351] hover:shadow-[0_28px_56px_rgba(8,201,90,.30)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
            onClick={() => navigate(nextPath)}
            type="button"
          >
            {content.next} {"\u00BB"}
          </button>
        </div>
      </div>
    </div>
  );
}
