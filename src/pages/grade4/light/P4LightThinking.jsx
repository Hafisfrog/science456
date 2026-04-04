import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LightLanguageSwitcher } from "./LightControls";

// Change image paths here (images should be under public/)
const PERSON_IMAGE_SRC = "/images/p4/ko.png";
const BOX_IMAGE_SRC = "/images/p4/op.png";

const UI = {
  th: {
    classLabel: "ห้องเรียนวิทยาศาสตร์",
    title: "คำถามชวนคิด",
    question: "1.ทำไมวัสดุแต่ละชนิดถึงทำให้เรามองเห็นสิ่งของข้างในได้ชัดเจนไม่เท่ากัน ?",
    answer: "มาหาคำตอบกัน",
    start: "ไปต่อ",
    back: "ย้อนกลับ",
    langLabel: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
    speakText:
      "คำถามชวนคิด ข้อที่ 1 ทำไมวัสดุแต่ละชนิดถึงทำให้เรามองเห็นสิ่งของข้างในได้ชัดเจนไม่เท่ากัน มาหาคำตอบกัน",
  },
  en: {
    classLabel: "Science Classroom",
    title: "Thinking Question",
    question: "1. Why do different materials let us see inside objects with different clarity?",
    answer: "Let's find the answer",
    start: "Start Experiment",
    back: "Back",
    langLabel: { th: "Thai", en: "English", ms: "Malay" },
    speakText:
      "Thinking question number one. Why do different materials allow us to see objects inside with different clarity? Let's find the answer.",
  },
  ms: {
    classLabel: "Bilik Sains",
    title: "Soalan Pemikiran",
    question:
      "1. Mengapa bahan yang berbeza membolehkan kita melihat objek di dalam dengan tahap kejelasan yang berbeza?",
    answer: "Mari cari jawapannya",
    start: "Mula Eksperimen",
    back: "Kembali",
    langLabel: { th: "Thai", en: "Inggeris", ms: "Melayu" },
    speakText:
      "Soalan pemikiran nombor satu. Mengapa bahan yang berbeza membolehkan kita melihat objek di dalam dengan tahap kejelasan yang berbeza? Mari cari jawapannya.",
  },
};

const LANG_CONFIG = {
  th: { voice: "th-TH", toneClass: "bg-sky-200 text-sky-700" },
  en: { voice: "en-US", toneClass: "bg-cyan-200 text-cyan-700" },
  ms: { voice: "ms-MY", toneClass: "bg-teal-200 text-teal-700" },
};

const BOX_TONES = ["brightness-110", "brightness-95", "brightness-75"];
const hasPersonImage = Boolean(PERSON_IMAGE_SRC);

function ImageSlot({ src, alt, className }) {
  const [hasError, setHasError] = useState(false);
  if (!src || hasError) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}

function BoxOnly({ toneClass, showPerson }) {
  return (
    <div className="w-full max-w-[390px]">
      <div className="mx-auto flex items-end justify-center gap-2 sm:gap-3">
        {showPerson && (
          <ImageSlot
            src={PERSON_IMAGE_SRC}
            alt="Pointing student"
            className="h-[185px] w-[120px] object-contain sm:h-[250px] sm:w-[160px]"
          />
        )}
        <div className="h-52 w-44 sm:h-72 sm:w-60">
          <ImageSlot
            src={BOX_IMAGE_SRC}
            alt="Mystery box"
            className={`h-full w-full object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.25)] ${toneClass}`}
          />
        </div>
      </div>
    </div>
  );
}

function StartExperimentButton({ label, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full max-w-[205px] flex-col items-center rounded-[20px] border border-white/70 bg-white/92 px-3.5 py-2.5 text-slate-900 shadow-[0_14px_30px_rgba(15,23,42,0.16)] transition hover:brightness-[1.02] sm:w-[205px] sm:py-3 ${className}`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#cfe0f7] text-[1.3rem] leading-none text-black shadow-[inset_0_-4px_0_rgba(148,163,184,0.35),0_8px_18px_rgba(148,163,184,0.22)]">
        <span className="ml-1">{"\u25B6"}</span>
      </span>
      <span className="mt-2 text-center text-[0.86rem] font-black leading-tight sm:text-[0.95rem]">
        {label}
      </span>
    </button>
  );
}

function AnswerPromptButton({ label, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-fit rounded-[20px] border-2 border-black bg-white px-3.5 py-2.5 text-sm font-bold text-slate-800 shadow-[0_10px_20px_rgba(0,0,0,0.18)] sm:px-4 sm:py-3 sm:text-[1rem] ${className}`}
    >
      {label}
      <span className="absolute -top-3 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-black bg-yellow-400 text-sm font-extrabold text-black sm:h-7 sm:w-7 sm:text-base">
        ?
      </span>
    </button>
  );
}

export default function P4LightThinking() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const content = UI[language] ?? UI.th;
  const startButtonLabel =
    language === "th" ? "เริ่มการทดลอง" : content.start;
  const nextButtonLabel =
    language === "th" ? "ต่อไป" : language === "ms" ? "Seterusnya" : "Next";

  const speak = () => {
    if (
      typeof window === "undefined" ||
      typeof SpeechSynthesisUtterance === "undefined" ||
      !window.speechSynthesis
    ) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(content.speakText);
    utterance.lang = LANG_CONFIG[language]?.voice ?? "th-TH";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-100 via-cyan-100 to-blue-200 font-['Prompt',sans-serif]">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/materials/back.png')" }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.7),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(186,230,253,0.8),transparent_40%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1360px] flex-col px-3 pb-6 pt-4 sm:px-6 sm:pb-8">
        <div className="mb-3 ml-auto text-right text-lg font-semibold text-sky-700 sm:text-xl">
          {content.classLabel}
        </div>

        <div className="relative mx-auto w-full">
          <div className="relative ml-0 w-full max-w-[620px] rounded-[28px] border-[4px] border-slate-900 bg-white px-4 py-3 shadow-[0_8px_18px_rgba(0,0,0,0.12)] sm:ml-10 sm:rounded-[34px] sm:border-[6px] sm:px-6 sm:py-4">
            <p className="text-xl font-bold text-slate-700 sm:text-2xl">{content.title}</p>
            <p className="mt-1 text-[clamp(1.3rem,2.2vw,2.1rem)] font-medium leading-snug text-slate-700">
              {content.question}
            </p>
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={speak}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 transition hover:bg-blue-200 sm:h-9 sm:w-9 sm:text-base"
                aria-label="Speak prompt"
              >
                {"\uD83D\uDD0A"}
              </button>
            </div>

            <div className="absolute -bottom-5 left-6 h-8 w-8 rotate-45 rounded-[8px] border-b-[4px] border-r-[4px] border-slate-900 bg-white sm:-bottom-6 sm:left-9 sm:h-10 sm:w-10 sm:border-b-[6px] sm:border-r-[6px]" />
          </div>
        </div>

        <div className="relative mt-3 flex-1">
          <div className="flex h-full flex-wrap items-end justify-center gap-2 pb-2 sm:gap-4 sm:pb-4 lg:flex-nowrap lg:justify-between lg:px-4">
            {BOX_TONES.map((tone) => (
              <BoxOnly key={tone} toneClass={tone} showPerson={hasPersonImage} />
            ))}
          </div>

          <AnswerPromptButton
            label={content.answer}
            onClick={speak}
            className="z-20 ml-auto mt-2 lg:absolute lg:bottom-4 lg:right-4 xl:right-8"
          />
        </div>

        <div className="-mt-1 flex flex-col gap-3 sm:-mt-2 lg:-mt-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2 sm:self-end">
            <LightLanguageSwitcher
              value={language}
              onChange={setLanguage}
              labels={content.langLabel}
            />
          </div>

          <div className="ml-auto flex w-full flex-col gap-2 lg:max-w-[380px]">
            <div className="flex justify-center">
              <StartExperimentButton
                label={startButtonLabel}
                onClick={() => navigate("/p4/light/experiment")}
              />
            </div>

            <div className="grid w-full gap-2 sm:grid-cols-2 sm:gap-3">
              <div className="flex sm:justify-start">
                <button
                  type="button"
                  onClick={() => navigate("/p4/light/intro")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#505b73] px-3.5 py-2 text-[0.86rem] font-black tracking-tight text-white shadow-[0_10px_20px_rgba(51,65,85,0.2)] transition hover:-translate-y-0.5 hover:bg-[#475167] sm:min-h-[50px] sm:px-5 sm:text-[1rem]"
                >
                  <span aria-hidden="true" className="text-[1.1em] leading-none">
                    {"\u25C0"}
                  </span>
                  <span>{language === "th" ? "ย้อนกลับ" : content.back}</span>
                </button>
              </div>

              <div className="flex sm:justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/p4/light/experiment")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2d79ff] to-[#27bde9] px-3.5 py-2 text-[0.86rem] font-black tracking-tight text-white shadow-[0_10px_20px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:brightness-105 sm:min-h-[50px] sm:px-5 sm:text-[1rem]"
                >
                  <span>{language === "th" ? "ไปต่อ" : nextButtonLabel}</span>
                  <span aria-hidden="true" className="text-[1.1em] leading-none">
                    {"\u25B6"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
