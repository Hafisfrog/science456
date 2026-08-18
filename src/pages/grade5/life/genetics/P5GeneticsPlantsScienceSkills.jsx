import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import { FoodChainLanguageSwitcher, FoodChainNavButtons } from "../foodchain/FoodChainControls";
import { useP5GeneticsLang } from "./p5GeneticsI18n";

const VOICE_LANG = { th: "th-TH", en: "en-US", ms: "ms-MY" };
const MALAY_SKILL_AUDIO = [
  "/audio/p5/20.1.mp3",
  "/audio/p5/20.2.mp3",
  "/audio/p5/20.3.mp3",
  "/audio/p5/20.4.mp3",
];

const CONTENT = {
  th: {
    exp: "การทดลองที่ 2",
    title: "เรื่อง ลักษณะทางพันธุกรรมของพืช",
    section: "ทักษะกระบวนการทางวิทยาศาสตร์",
    skills: [
      "ทักษะการสังเกต",
      "ทักษะการจำแนกประเภท",
      "ทักษะการพยากรณ์",
      "ทักษะการลงความเห็นจากข้อมูล",
    ],
    back: "ย้อนกลับ",
    next: "ต่อไป",
    langLabel: { th: "ไทย", en: "อังกฤษ", ms: "มลายูถิ่น" },
  },
  en: {
    exp: "Experiment 2",
    title: "Genetic Traits of Plants",
    section: "Science Process Skills",
    skills: [
      "Observation Skills",
      "Classification Skills",
      "Prediction Skills",
      "Inferring from Data",
    ],
    back: "Back",
    next: "Next",
    speak: "Listen",
    langLabel: { th: "ไทย", en: "อังกฤษ", ms: "มลายูถิ่น" },
  },
  ms: {
    exp: "ปือจูบอแอ 2 ",
    title: "ตาโยะ; ซีฟะ บากอ ยือนิฮ ตูมูแฮ ",
    section: "กือมาฮีแร ดาแล ปือจูบอแอ วิตายาซะ ",
    skills: [
      "กือมาฮีแร ปือราต",
      " กือมาฮีแร บากี ยือนิฮ ",
      "กือมาฮีแร มือนือกอ ",
      "กือมาฮีแร บูวี ปาแนแง ดารี มะลูมะ ",
    ],
    back: "ฮูโน กือเละ",
    next: "ตือรุฮ",
    speak: "Dengar",
    langLabel: { th: "ไทย", en: "อังกฤษ", ms: "มลายูถิ่น" },
  },
};

export default function P5GeneticsPlantsScienceSkills() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const audioRef = useRef(null);
  const content = CONTENT[lang] ?? CONTENT.th;

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const speak = (text, index) => {
    try {
      stopAudio();

      const audioSrc = lang === "ms" ? MALAY_SKILL_AUDIO[index] : undefined;
      if (audioSrc) {
        const audio = new Audio(audioSrc);
        audioRef.current = audio;
        audio.play().catch(() => {});
        return;
      }

      if (
        !text ||
        typeof window === "undefined" ||
        typeof SpeechSynthesisUtterance === "undefined" ||
        !window.speechSynthesis
      ) {
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = VOICE_LANG[lang] ?? VOICE_LANG.th;
      utterance.rate = 0.95;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore speech errors
    }
  };

  useEffect(() => {
    return () => stopAudio();
  }, []);

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-[url('/images/p5/back.png')] bg-cover bg-center bg-no-repeat font-['Prompt',sans-serif]">
      <HomeButton />

      <div className="absolute inset-0 bg-white/10" />

      <div className="relative z-10 flex h-full flex-col justify-center px-[clamp(14px,3vw,32px)] pb-[104px] pt-4 sm:pb-[96px] md:pb-[86px] md:pt-5">
        <header className="text-center">
          <h2 className="m-0 text-[clamp(34px,4.7vw,72px)] font-black leading-none text-[#4f8d6e] [-webkit-text-stroke:clamp(4px,0.55vw,8px)_#b9efaa] drop-shadow-[0_5px_0_rgba(255,255,255,.7)] [paint-order:stroke_fill]">
            {content.exp}
          </h2>
          <h1 className="mx-auto mt-[clamp(8px,1.4vh,16px)] max-w-[min(1180px,94vw)] text-[clamp(24px,3.4vw,50px)] font-black leading-tight text-black">
            {content.title}
          </h1>
        </header>

        <main className="mx-auto mt-[clamp(14px,2.4vh,28px)] w-full max-w-[min(1200px,94vw)]">
          <div className="inline-block max-w-full rounded-[14px] border-[clamp(3px,0.42vw,5px)] border-[#151936] bg-[#fff8eb] px-[clamp(14px,2vw,30px)] py-[clamp(8px,1vw,14px)] text-[clamp(20px,2.05vw,36px)] font-black leading-tight text-black shadow-[clamp(4px,0.6vw,8px)_clamp(4px,0.6vw,8px)_0_rgba(68,118,93,.55)]">
            {content.section}
          </div>

          <div className="mx-auto mt-[clamp(16px,2.8vh,32px)] grid w-full max-w-[min(1120px,86vw)] grid-cols-2 gap-x-[clamp(22px,4vw,64px)] gap-y-[clamp(12px,2.2vh,26px)] max-[860px]:max-w-[720px] max-[860px]:grid-cols-1">
            {content.skills.map((skill, index) => (
              <div
                className="flex min-h-[clamp(52px,6.2vh,76px)] items-center rounded-[clamp(20px,3vw,999px)] border-[clamp(6px,0.72vw,10px)] border-[#78aa3f] bg-white/92 px-[clamp(12px,1.6vw,24px)] py-[clamp(7px,0.9vw,12px)] shadow-[0_10px_24px_rgba(75,111,42,.16)]"
                key={skill}
              >
                <div className="mr-[clamp(10px,1.4vw,18px)] grid h-[clamp(40px,4vw,56px)] w-[clamp(40px,4vw,56px)] shrink-0 place-items-center rounded-full bg-[#f47c4b] text-[clamp(20px,2vw,29px)] font-black text-white shadow-[0_10px_18px_rgba(0,0,0,.14)]">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1 text-[clamp(18px,1.85vw,30px)] font-black leading-[1.15] text-black">
                  {skill}
                </div>
                <button
                  className="grid h-[clamp(36px,3.3vw,44px)] w-[clamp(36px,3.3vw,44px)] shrink-0 place-items-center rounded-[14px] border-none bg-[#f4fbef] text-lg shadow-[0_10px_18px_rgba(0,0,0,.13)] transition duration-150 hover:-translate-y-0.5 hover:bg-white max-[640px]:text-sm"
                  onClick={() => speak(skill, index)}
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
            value={lang}
            onChange={setLang}
            labels={content.langLabel}
          />
        </div>

        <div className="fixed bottom-[18px] right-[18px] z-40 max-[720px]:bottom-[12px] max-[720px]:left-[12px] max-[720px]:right-[12px]">
          <FoodChainNavButtons
            size="materials"
            backLabel={content.back}
            nextLabel={content.next}
            onBack={() => navigate("/p5/life/genetics/plants/objectives")}
            onNext={() => navigate("/p5/life/genetics/plants")}
            nextArrow={"\u00BB"}
          />
        </div>
      </div>
    </div>
  );
}
