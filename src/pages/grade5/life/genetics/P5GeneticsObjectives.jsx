import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import { FoodChainLanguageSwitcher, FoodChainNavButtons } from "../foodchain/FoodChainControls";
import { useP5GeneticsLang } from "./p5GeneticsI18n";

const CONTENT = {
  th: {
    grade: "ชั้นประถมศึกษาปีที่ 5",
    title: "ลักษณะทางพันธุกรรม",
    section: "จุดประสงค์การเรียนรู้",
    objectives: [
      "อธิบายลักษณะทางพันธุกรรมที่มีการถ่ายทอดจากพ่อแม่สู่ลูกได้",
      "เปรียบเทียบลักษณะทางพันธุกรรมของสิ่งมีชีวิตได้",
    ],
    back: "ย้อนกลับ",
    next: "ต่อไป",
    speak: "ฟัง",
    langLabel: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    grade: "Grade 5",
    title: "Genetic Traits",
    section: "Learning Objectives",
    objectives: [
      "Explain genetic traits that are passed from parents to offspring.",
      "Compare genetic traits of living things.",
    ],
    back: "Back",
    next: "Next",
    speak: "Listen",
    langLabel: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    grade: "Tahun 5",
    title: "Ciri Genetik",
    section: "Objektif Pembelajaran",
    objectives: [
      "Menerangkan ciri genetik yang diwarisi daripada ibu bapa kepada anak.",
      "Membandingkan ciri genetik hidupan.",
    ],
    back: "Kembali",
    next: "Seterusnya",
    speak: "Dengar",
    langLabel: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

const VOICE_LANG = { th: "th-TH", en: "en-US", ms: "ms-MY" };

export default function P5GeneticsObjectives() {
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

      <div className="relative z-10 min-h-[100dvh] px-4 pb-[128px] pt-5 sm:px-8 max-[720px]:pb-[172px]">
        <div className="ml-[clamp(42px,4vw,92px)] mt-[clamp(46px,5.8vh,72px)] inline-block rounded-[999px] bg-[#b9efaa] px-[clamp(18px,2.4vw,34px)] py-[clamp(10px,1.4vw,16px)] shadow-[0_8px_0_rgba(82,143,98,.28)] max-[640px]:ml-14">
          <div className="text-[clamp(23px,2.6vw,42px)] font-black leading-tight text-[#4f8d6e] [-webkit-text-stroke:5px_#ffffff] [paint-order:stroke_fill] max-[640px]:[-webkit-text-stroke:3px_#ffffff]">
            {content.grade}
          </div>
        </div>

        <header className="pt-[clamp(16px,2.8vh,34px)] text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <h1 className="m-0 text-[clamp(42px,5.8vw,86px)] font-black leading-none text-black [-webkit-text-stroke:clamp(5px,0.7vw,10px)_#b7b7b7] drop-shadow-[0_6px_0_rgba(255,255,255,.7)] [paint-order:stroke_fill]">
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

        <main className="mx-auto mt-[clamp(22px,3.8vh,42px)] w-full max-w-[min(1180px,92vw)]">
          <div className="ml-[clamp(0px,2vw,28px)] text-[clamp(24px,2.8vw,44px)] font-black leading-tight text-black">
            {content.section}
          </div>

          <div className="mt-[clamp(24px,3.7vh,42px)] grid gap-[clamp(18px,2.7vh,34px)]">
            {content.objectives.map((objective, index) => (
              <div
                className="grid grid-cols-[clamp(48px,5vw,80px)_minmax(0,1fr)] items-center gap-[clamp(12px,2vw,30px)] max-[520px]:grid-cols-1"
                key={objective}
              >
                <div className="grid h-[clamp(42px,4.8vw,68px)] w-[clamp(42px,4.8vw,68px)] justify-self-end place-items-center rounded-full bg-[#f47c4b] text-[clamp(20px,2.2vw,32px)] font-black text-white shadow-[0_10px_18px_rgba(0,0,0,.14)] max-[520px]:ml-3 max-[520px]:justify-self-start">
                  {index + 1}
                </div>

                <div className="flex min-h-[clamp(62px,7.2vh,92px)] w-full items-center gap-[clamp(8px,1.2vw,16px)] rounded-[999px] border-[clamp(6px,0.9vw,12px)] border-[#78aa3f] bg-white/92 py-[clamp(7px,1vw,12px)] pl-[clamp(12px,2.4vw,36px)] pr-[clamp(10px,1.4vw,20px)] shadow-[0_10px_24px_rgba(75,111,42,.16)] max-[640px]:rounded-[24px]">
                  <div className="min-w-0 flex-1 text-[clamp(20px,2.2vw,36px)] font-black leading-[1.24] text-black">
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
            onBack={() => navigate("/p5/life")}
            onNext={() => navigate("/p5/life/genetics/vocab")}
            nextArrow={"\u00BB"}
          />
        </div>
      </div>
    </div>
  );
}
