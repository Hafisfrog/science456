import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import { FoodChainLanguageSwitcher, FoodChainNavButtons } from "./FoodChainControls";

const CONTENT = {
  th: {
    title: "ห่วงโซ่อาหาร",
    section: "จุดประสงค์การเรียนรู้",
    objectives: [
      "อธิบายความสัมพันธ์ของสิ่งมีชีวิตกับสิ่งมีชีวิตในรูปแบบโซ่อาหารได้",
      "จำแนกสิ่งมีชีวิตออกเป็นผู้ผลิตและผู้บริโภค",
      "เขียนโซ่อาหารในรูปแบบแผนภาพได้",
    ],
    back: "ย้อนกลับ",
    next: "ต่อไป",
    speak: "ฟัง",
    langLabel: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    title: "Food Chain",
    section: "Learning Objectives",
    objectives: [
      "Explain the relationship between living things in a food chain.",
      "Classify living things as producers and consumers.",
      "Draw a food chain as a diagram.",
    ],
    back: "Back",
    next: "Next",
    speak: "Listen",
    langLabel: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    title: "Rantaian Makanan",
    section: "Objektif Pembelajaran",
    objectives: [
      "Menerangkan hubungan antara hidupan dalam bentuk rantaian makanan.",
      "Mengelaskan hidupan kepada pengeluar dan pengguna.",
      "Melukis rantaian makanan dalam bentuk rajah.",
    ],
    back: "Kembali",
    next: "Seterusnya",
    speak: "Dengar",
    langLabel: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

const VOICE_LANG = { th: "th-TH", en: "en-US", ms: "ms-MY" };

export default function P5FoodChainObjectives() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const audioRef = useRef(null);
  const content = CONTENT[language] ?? CONTENT.th;

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const speak = (text) => {
    try {
      stopAudio();
      if (
        !text ||
        typeof window === "undefined" ||
        typeof SpeechSynthesisUtterance === "undefined" ||
        !window.speechSynthesis
      ) {
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = VOICE_LANG[language] ?? VOICE_LANG.th;
      utterance.rate = 0.95;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore speech errors
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden overflow-y-auto bg-[url('/images/p5/back.png')] bg-cover bg-center bg-no-repeat font-['Prompt',sans-serif]">
      <HomeButton />

      <div className="absolute inset-0 bg-white/10" />

      <div className="relative z-10 min-h-[100dvh] px-4 pb-[128px] pt-5 sm:px-8 max-[720px]:pb-[172px]">
        <header className="pt-[clamp(38px,8vh,92px)] text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <h1 className="m-0 text-[clamp(34px,4.8vw,72px)] font-black leading-none text-black [-webkit-text-stroke:clamp(5px,0.6vw,9px)_#8b91aa] drop-shadow-[0_6px_0_rgba(255,255,255,.7)] [paint-order:stroke_fill]">
              {content.title}
            </h1>
            <button
              className="grid h-[clamp(42px,4vw,54px)] w-[clamp(42px,4vw,54px)] shrink-0 place-items-center rounded-2xl border-none bg-white/90 text-[clamp(18px,1.6vw,22px)] shadow-[0_12px_22px_rgba(0,0,0,.16)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(0,0,0,.20)]"
              onClick={() => speak(content.title)}
              type="button"
              title={content.speak}
            >
              {"\uD83D\uDD0A"}
            </button>
          </div>
        </header>

        <main className="mx-auto mt-[clamp(14px,3vh,34px)] w-full max-w-[min(1260px,94vw)]">
          <div className="ml-[clamp(0px,5vw,68px)] inline-block rounded-[14px] border-[clamp(3px,0.45vw,5px)] border-[#151a3a] bg-[#fff7e9] px-[clamp(14px,1.6vw,22px)] py-[clamp(10px,1.2vw,14px)] shadow-[7px_8px_0_rgba(52,101,81,.75)]">
            <div className="text-[clamp(24px,2.9vw,44px)] font-black leading-tight text-black">
              {content.section}
            </div>
          </div>

          <div className="mt-[clamp(16px,3vh,34px)] grid gap-[clamp(10px,1.4vh,16px)]">
            {content.objectives.map((objective, index) => (
              <div
                className="grid grid-cols-[clamp(48px,5vw,80px)_minmax(0,1fr)] items-center gap-[clamp(10px,2vw,28px)] max-[520px]:grid-cols-1 max-[520px]:justify-items-start"
                key={objective}
              >
                <div className="grid h-[clamp(42px,4.8vw,68px)] w-[clamp(42px,4.8vw,68px)] justify-self-end place-items-center rounded-full bg-[#f47c4b] text-[clamp(20px,2.2vw,32px)] font-black text-white shadow-[0_10px_18px_rgba(0,0,0,.14)] max-[520px]:ml-3 max-[520px]:justify-self-start">
                  {index + 1}
                </div>

                <div className="flex min-h-[clamp(62px,7.2vh,92px)] w-full items-center gap-[clamp(8px,1.2vw,16px)] rounded-[999px] border-[clamp(6px,0.9vw,12px)] border-[#78aa3f] bg-white/92 py-[clamp(7px,1vw,12px)] pl-[clamp(12px,2.4vw,36px)] pr-[clamp(10px,1.4vw,20px)] shadow-[0_10px_24px_rgba(75,111,42,.16)] max-[640px]:rounded-[24px]">
                  <div className="min-w-0 flex-1 text-[clamp(18px,2.25vw,36px)] font-black leading-[1.24] text-black">
                    {objective}
                  </div>
                  <button
                    className="grid h-[clamp(36px,3.3vw,44px)] w-[clamp(36px,3.3vw,44px)] shrink-0 place-items-center rounded-[14px] border-none bg-[#f4fbef] text-lg shadow-[0_10px_18px_rgba(0,0,0,.13)] transition duration-150 hover:-translate-y-0.5 hover:bg-white max-[640px]:text-sm"
                    onClick={() => speak(objective)}
                    type="button"
                    title={content.speak}
                  >
                    {"\uD83D\uDD0A"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        <div className="fixed bottom-[18px] left-[18px] z-40 max-[720px]:bottom-[76px] max-[720px]:left-[12px] max-[720px]:right-[12px] max-[720px]:flex max-[720px]:justify-center">
          <FoodChainLanguageSwitcher
            size="materials"
            value={language}
            onChange={setLanguage}
            labels={content.langLabel}
          />
        </div>

        <div className="fixed bottom-[18px] right-[18px] z-40 max-[720px]:bottom-[12px] max-[720px]:left-[12px] max-[720px]:right-[12px]">
          <FoodChainNavButtons
            size="materials"
            backLabel={content.back}
            nextLabel={content.next}
            onBack={() => navigate("/p5/life/foodchain")}
            onNext={() => navigate("/p5/life/foodchain/skills")}
            nextArrow={"\u00BB"}
          />
        </div>
      </div>
    </div>
  );
}
