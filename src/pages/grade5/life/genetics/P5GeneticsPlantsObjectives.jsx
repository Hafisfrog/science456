import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import { FoodChainLanguageSwitcher, FoodChainNavButtons } from "../foodchain/FoodChainControls";
import { useP5GeneticsLang } from "./p5GeneticsI18n";

const CONTENT = {
  th: {
    exp: "การทดลองที่ 2",
    title: "เรื่อง ลักษณะทางพันธุกรรมของพืช",
    section: "จุดประสงค์การเรียนรู้",
    objectives: [
      "ศึกษาการถ่ายทอดลักษณะทางพันธุกรรมของพืชจากรุ่นพ่อแม่สู่รุ่นลูก",
      "อธิบายลักษณะเด่นและลักษณะด้อยของยีน",
    ],
    back: "ย้อนกลับ",
    next: "ต่อไป",
    speak: "ฟัง",
    langLabel: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    exp: "Experiment 2",
    title: "Genetic Traits of Plants",
    section: "Learning Objectives",
    objectives: [
      "Study how genetic traits of plants are passed from parent generation to offspring generation.",
      "Explain dominant and recessive traits of genes.",
    ],
    back: "Back",
    next: "Next",
    speak: "Listen",
    langLabel: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    exp: "Eksperimen 2",
    title: "Ciri Genetik Tumbuhan",
    section: "Objektif Pembelajaran",
    objectives: [
      "Mengkaji pewarisan ciri genetik tumbuhan daripada generasi induk kepada generasi anak.",
      "Menerangkan ciri dominan dan ciri resesif gen.",
    ],
    back: "Kembali",
    next: "Seterusnya",
    speak: "Dengar",
    langLabel: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

const VOICE_LANG = { th: "th-TH", en: "en-US", ms: "ms-MY" };

export default function P5GeneticsPlantsObjectives() {
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
      utterance.lang = VOICE_LANG[lang] ?? VOICE_LANG.th;
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

      <div className="relative z-10 min-h-[100dvh] px-[clamp(14px,3vw,32px)] pb-[clamp(124px,15vh,172px)] pt-5">
        <header className="pt-[clamp(34px,7vh,82px)] text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <h2 className="m-0 text-[clamp(36px,5.1vw,78px)] font-black leading-none text-[#4f8d6e] [-webkit-text-stroke:clamp(4px,0.65vw,9px)_#b9efaa] drop-shadow-[0_5px_0_rgba(255,255,255,.7)] [paint-order:stroke_fill]">
              {content.exp}
            </h2>
            {/* <button
              className="grid h-[clamp(42px,4vw,54px)] w-[clamp(42px,4vw,54px)] shrink-0 place-items-center rounded-2xl border-none bg-white/90 text-[clamp(18px,1.6vw,22px)] shadow-[0_12px_22px_rgba(0,0,0,.16)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(0,0,0,.20)]"
              onClick={() => speak(`${content.exp}. ${content.title}`)}
              type="button"
              title={content.speak}
            >
              {"\uD83D\uDD0A"}
            </button> */}
          </div>
          <h1 className="mx-auto mt-[clamp(10px,1.8vh,22px)] max-w-[min(1180px,94vw)] text-[clamp(26px,4vw,60px)] font-black leading-tight text-black">
            {content.title}
          </h1>
        </header>

        <main className="mx-auto mt-[clamp(22px,4vh,50px)] w-full max-w-[min(1200px,94vw)]">
          <div className="inline-block max-w-full rounded-[14px] border-[clamp(3px,0.5vw,5px)] border-[#151936] bg-[#fff8eb] px-[clamp(16px,2.6vw,38px)] py-[clamp(9px,1.4vw,18px)] text-[clamp(22px,2.7vw,42px)] font-black leading-tight text-black shadow-[clamp(4px,0.7vw,8px)_clamp(4px,0.7vw,8px)_0_rgba(68,118,93,.55)]">
            {content.section}
          </div>

          <div className="mt-[clamp(28px,5vh,60px)] grid gap-[clamp(22px,4vh,54px)]">
            {content.objectives.map((objective, index) => (
              <div
                className="grid grid-cols-[clamp(48px,5vw,78px)_minmax(0,1fr)] items-center gap-[clamp(12px,2vw,30px)] max-[560px]:grid-cols-1"
                key={objective}
              >
                <div className="grid h-[clamp(46px,4.8vw,70px)] w-[clamp(46px,4.8vw,70px)] justify-self-end place-items-center rounded-full bg-[#f47c4b] text-[clamp(20px,2.3vw,34px)] font-black text-white shadow-[0_10px_18px_rgba(0,0,0,.14)] max-[560px]:ml-3 max-[560px]:justify-self-start">
                  {index + 1}
                </div>

                <div className="flex min-h-[clamp(62px,7vh,92px)] w-full items-center gap-[clamp(8px,1.2vw,16px)] rounded-[clamp(24px,4vw,999px)] border-[clamp(6px,0.85vw,12px)] border-[#78aa3f] bg-white/92 py-[clamp(8px,1.2vw,14px)] pl-[clamp(14px,2.4vw,36px)] pr-[clamp(10px,1.4vw,20px)] shadow-[0_10px_24px_rgba(75,111,42,.16)]">
                  <div className="min-w-0 flex-1 text-[clamp(18px,2.1vw,32px)] font-black leading-[1.24] text-black">
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
            onBack={() => navigate("/p5/life/genetics")}
            onNext={() => navigate("/p5/life/genetics/plants/skills")}
            nextArrow={"\u00BB"}
          />
        </div>
      </div>
    </div>
  );
}
