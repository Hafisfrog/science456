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
    path: "/p6/experiment/electric-generation/materials?from=unit",
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
    path: "/p6/experiment/electric-force-effect",
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

export default function Grade6() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const backPath = "/p6/electric-force/vocab";
  const copy = PAGE_COPY[language];

  const pageBg = {
    background:
      "radial-gradient(80% 60% at 50% 34%, #f6efef 0 62%, transparent 63%), radial-gradient(31% 24% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(31% 24% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="relative h-[100svh] overflow-hidden px-4 pb-6 pt-7 text-center text-slate-900 md:px-6 md:pb-8 md:pt-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <HomeButton />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(120px,11vw,190px)] top-3 h-[clamp(108px,11vw,150px)] w-[clamp(70px,7vw,102px)] bg-[#f7bd2b]"
        style={{
          clipPath:
            "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[170px] bg-[linear-gradient(180deg,rgba(199,227,242,0),rgba(190,217,233,0.72))]"
      />

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
