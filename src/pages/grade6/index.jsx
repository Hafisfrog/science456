import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";
import { GRADE6_LANG_BAR_CLASS, grade6LangButtonClass } from "./grade6LangStyles";

const LANGUAGES = [
  { key: "th", label: "ไทย" },
  { key: "ms", label: "มลายู" },
  { key: "en", label: "อังกฤษ" },
];

const EXPERIMENTS = [
  {
    id: "exp-1",
    title: {
      th: "การทดลองที่ 1",
      en: "Experiment 1",
      ms: "Eksperimen 1",
    },
    subtitle: {
      th: "การเกิดแรงไฟฟ้า",
      en: "Generating Electric Force",
      ms: "Penghasilan Daya Elektrik",
    },
    image: "/images/p6/todlong7p6.png",
    // path: "/p6/experiment/electric-generation/materials?from=unit",
    path: "/p6/experiment/electric-generation",
  },
  {
    id: "exp-2",
    title: {
      th: "การทดลองที่ 2",
      en: "Experiment 2",
      ms: "Eksperimen 2",
    },
    subtitle: {
      th: "ผลของแรงไฟฟ้า",
      en: "Effects of Electric Force",
      ms: "Kesan Daya Elektrik",
    },
    image: "/images/p6/todlonf8p6.png",
    path: "/p6/experiment/electric-force-effect/objectives",
  },
];

const PAGE_COPY = {
  th: {
    title: "แรงไฟฟ้าน่ารู้",
    subtitle: "เลือกการทดลอง",
    backLabel: "ย้อนกลับ",
    languageLabel: "เลือกภาษา",
  },
  en: {
    title: "Electric Force",
    subtitle: "Choose an Experiment",
    backLabel: "Back",
    languageLabel: "Choose language",
  },
  ms: {
    title: "Daya Elektrik",
    subtitle: "Pilih Eksperimen",
    backLabel: "Kembali",
    languageLabel: "Pilih bahasa",
  },
};

const LANG_TO_VOICE = {
  th: "th-TH",
  en: "en-US",
  ms: "ms-MY",
};

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = LANG_TO_VOICE[lang] || "th-TH";
  utterance.rate = 0.95;
  const voices = synth.getVoices();
  const voice =
    voices.find((item) => item.lang === utterance.lang) ||
    voices.find((item) => item.lang?.startsWith(utterance.lang.split("-")[0]));
  if (voice) utterance.voice = voice;
  synth.speak(utterance);
}

function Spark({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bg-[#ffc333] ${className}`}
      style={{
        clipPath:
          "polygon(50% 0, 62% 36%, 100% 50%, 62% 64%, 50% 100%, 38% 64%, 0 50%, 38% 36%)",
      }}
    />
  );
}

export default function Grade6() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const backPath = "/p6/electric-force/vocab";
  const copy = PAGE_COPY[language];

  const pageBg = {
    background:
      "radial-gradient(46% 27% at 8% 41%, #cdebf4 0 61%, transparent 62%), radial-gradient(40% 26% at 94% 42%, #cdebf4 0 60%, transparent 61%), radial-gradient(72% 35% at 50% 33%, #f7f0ef 0 63%, transparent 64%), radial-gradient(80% 50% at 50% 75%, #f7f0ef 0 62%, transparent 63%), linear-gradient(180deg, #fbf5f2 0%, #fbf5f2 100%)",
  };

  return (
    <div
      className="relative h-[100svh] overflow-hidden px-4 pb-6 pt-7 text-center text-slate-900 md:px-6 md:pb-8 md:pt-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <HomeButton />

      <div className="pointer-events-none absolute left-[-92px] top-[24%] z-0 h-[310px] w-[255px] rotate-[-10deg] rounded-[52%_52%_46%_46%] border-[7px] border-black bg-[#fff773] shadow-[inset_24px_22px_0_rgba(255,255,255,.48)] max-[900px]:left-[-150px]">
        <div className="absolute bottom-[-38px] left-[40px] h-[70px] w-[82px] rotate-[12deg] rounded-[14px] border-[7px] border-black bg-[#111]" />
        <div className="absolute bottom-[-4px] left-[56px] h-[84px] w-[54px] rotate-[18deg] rounded-[10px] border-[5px] border-black bg-[#fff7a3]" />
        <div className="absolute left-[102px] top-[76px] h-[126px] w-[98px] rounded-[50%] border-[4px] border-slate-500/35" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(70px,14vw,290px)] top-[-20px] z-0 h-[clamp(150px,18vw,270px)] w-[clamp(82px,9vw,150px)] bg-[#ffc84b] max-[700px]:opacity-55"
        style={{
          clipPath:
            "polygon(0 0,44% 0,68% 36%,93% 9%,100% 39%,78% 54%,100% 100%,57% 54%,38% 70%)",
        }}
      />
      <Spark className="right-[10%] top-[16%] z-0 h-11 w-11 max-[760px]:hidden" />
      <Spark className="right-[22%] top-[17%] z-0 h-12 w-12 max-[760px]:hidden" />
      <Spark className="right-[18%] top-[25%] z-0 h-5 w-5 max-[760px]:hidden" />
      <div className="pointer-events-none absolute left-[6%] bottom-[20%] z-0 text-[92px] leading-none opacity-75 max-[900px]:hidden">
        🧲
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-col">
        <h1 className="m-0 text-4xl font-extrabold text-blue-600 md:text-[72px]">{copy.title}</h1>
        <p className="mt-2 text-base text-slate-700 md:text-[32px]">{copy.subtitle}</p>

        <section className="mx-auto mt-2 flex w-full flex-1 items-center justify-center">
          <div className="grid w-full max-w-[1020px] grid-cols-1 justify-items-center gap-6 lg:translate-x-4 lg:grid-cols-2 xl:translate-x-5">
            {EXPERIMENTS.map((item) => (
              <article
                key={item.id}
                onClick={() => navigate(item.path)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate(item.path);
                  }
                }}
                className="group flex h-[360px] w-[470px] max-w-[92vw] flex-col overflow-hidden rounded-[28px] bg-white/95 text-left shadow-[0_14px_30px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.2)]"
                role="button"
                tabIndex={0}
              >
                <div className="flex h-[236px] items-center justify-center overflow-hidden bg-slate-200">
                  <img
                    src={item.image}
                    alt={item.subtitle[language]}
                    className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="px-5 pb-4 pt-3 text-center">
                  <div className="text-[clamp(18px,1.8vw,30px)] font-extrabold leading-[1.12] text-slate-900">
                    {item.title[language]}
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-3 text-sm text-slate-700 md:text-base">
                    <span>{item.subtitle[language]}</span>
                    <button
                      type="button"
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl text-orange-700 shadow transition hover:scale-105"
                      onClick={(event) => {
                        event.stopPropagation();
                        speakText(`${item.title[language]}. ${item.subtitle[language]}`, language);
                      }}
                      aria-label={item.subtitle[language]}
                      title={item.subtitle[language]}
                    >
                      {"\u{1F50A}"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className={`fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7 ${GRADE6_LANG_BAR_CLASS}`}>
        <div className="flex items-center gap-2" role="group" aria-label={copy.languageLabel}>
          {LANGUAGES.map((option) => {
            const isActive = option.key === language;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setLanguage(option.key)}
                className={grade6LangButtonClass(isActive)}
                aria-pressed={isActive}
                title={option.label}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-3 right-3 z-20 flex items-center md:bottom-7 md:right-7">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          type="button"
          onClick={() => navigate(backPath)}
          aria-label={copy.backLabel}
          title={copy.backLabel}
        >
          « {copy.backLabel}
        </button>
      </div>
    </div>
  );
}
