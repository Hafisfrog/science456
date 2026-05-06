import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import { FoodChainLanguageSwitcher, FoodChainNavButtons } from "./FoodChainControls";

const CONTENT = {
  th: {
    heading: "การทดลองที่ 1",
    title: "ห่วงโซ่อาหาร",
    section: "ทักษะกระบวนการทางวิทยาศาสตร์",
    skills: [
      "ทักษะการสังเกต",
      "ทักษะการจัดกระทำและสื่อความหมายข้อมูล",
      "ทักษะการลงความเห็นจากข้อมูล",
    ],
    back: "ย้อนกลับ",
    next: "ต่อไป",
    speak: "ฟัง",
    langLabel: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    heading: "Experiment 1",
    title: "Food Chain",
    section: "Science Process Skills",
    skills: [
      "Observation skill",
      "Organizing and communicating data",
      "Inferring from data",
    ],
    back: "Back",
    next: "Next",
    speak: "Listen",
    langLabel: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    heading: "Eksperimen 1",
    title: "Rantaian Makanan",
    section: "Kemahiran Proses Sains",
    skills: [
      "Kemahiran memerhati",
      "Mengurus dan menyampaikan maklumat",
      "Membuat inferens daripada data",
    ],
    back: "Kembali",
    next: "Seterusnya",
    speak: "Dengar",
    langLabel: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

const VOICE_LANG = { th: "th-TH", en: "en-US", ms: "ms-MY" };

export default function P5FoodChainScienceSkills() {
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
    <div className="relative min-h-screen w-full overflow-hidden bg-[url('/images/p5/back.png')] bg-cover bg-center bg-no-repeat font-['Prompt',sans-serif]">
      <HomeButton />

      <div className="absolute inset-0 bg-white/10" />

      <div className="relative z-10 min-h-screen px-4 py-5 sm:px-8">
        <header className="pt-[clamp(46px,6vh,72px)] text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="text-[clamp(40px,4.7vw,76px)] font-black leading-none text-[#4f8d6e] [-webkit-text-stroke:9px_#ccfbff] drop-shadow-[0_6px_0_rgba(255,255,255,.65)] [paint-order:stroke_fill] max-[640px]:[-webkit-text-stroke:6px_#ccfbff]">
              {content.heading}
            </div>

            <div className="flex items-center justify-center gap-3">
              <h1 className="m-0 text-[clamp(34px,3.6vw,56px)] font-black leading-none text-black [-webkit-text-stroke:6px_#8b91aa] drop-shadow-[0_4px_0_rgba(255,255,255,.7)] [paint-order:stroke_fill] max-[640px]:[-webkit-text-stroke:4px_#8b91aa]">
                {content.title}
              </h1>
              <button
                className="grid h-[clamp(42px,4vw,54px)] w-[clamp(42px,4vw,54px)] shrink-0 place-items-center rounded-2xl border-none bg-white/90 text-[clamp(18px,1.6vw,22px)] shadow-[0_12px_22px_rgba(0,0,0,.16)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(0,0,0,.20)]"
                onClick={() => speak(`${content.heading} ${content.title}`)}
                type="button"
                title={content.speak}
              >
                {"\uD83D\uDD0A"}
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto mt-[clamp(24px,4vh,46px)] w-full max-w-[min(1160px,88vw)]">
          <div className="ml-[clamp(0px,1vw,10px)] inline-block rounded-[14px] border-[clamp(3px,0.4vw,5px)] border-[#151a3a] bg-[#fff7e9] px-[clamp(12px,2vw,30px)] py-[clamp(8px,1vw,12px)] shadow-[7px_8px_0_rgba(52,101,81,.75)]">
            <div className="text-[clamp(20px,2.25vw,34px)] font-black leading-tight text-black">
              {content.section}
            </div>
          </div>

          <div className="ml-[clamp(0px,8vw,140px)] mt-[clamp(20px,3.6vh,38px)] grid max-w-[840px] gap-[clamp(12px,2vh,22px)]">
            {content.skills.map((skill, index) => (
              <div
                className="flex min-h-[clamp(54px,6.6vh,82px)] items-center gap-[clamp(8px,1.2vw,14px)] rounded-[999px] border-[clamp(5px,0.75vw,10px)] border-[#78aa3f] bg-white/92 py-[clamp(6px,0.8vw,10px)] pl-[clamp(10px,1.4vw,18px)] pr-[clamp(10px,1.4vw,18px)] shadow-[0_10px_24px_rgba(75,111,42,.16)] max-[640px]:rounded-[22px]"
                key={skill}
              >
                <div className="grid h-[clamp(34px,3.8vw,52px)] w-[clamp(34px,3.8vw,52px)] shrink-0 place-items-center rounded-full bg-[#f47c4b] text-[clamp(17px,1.8vw,25px)] font-black text-white shadow-[0_10px_18px_rgba(0,0,0,.14)]">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1 text-[clamp(18px,1.95vw,30px)] font-black leading-[1.24] text-black">
                  {skill}
                </div>
                <button
                  className="grid h-[clamp(36px,3.3vw,44px)] w-[clamp(36px,3.3vw,44px)] shrink-0 place-items-center rounded-[14px] border-none bg-[#f4fbef] text-lg shadow-[0_10px_18px_rgba(0,0,0,.13)] transition duration-150 hover:-translate-y-0.5 hover:bg-white max-[640px]:text-sm"
                  onClick={() => speak(skill)}
                  type="button"
                  title={content.speak}
                >
                  {"\uD83D\uDD0A"}
                </button>
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
            onBack={() => navigate("/p5/life/foodchain/objectives")}
            onNext={() => navigate("/p5/life/foodchain/vocab")}
            nextArrow={"\u00BB"}
          />
        </div>
      </div>
    </div>
  );
}
