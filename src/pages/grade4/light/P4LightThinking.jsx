import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Change image paths here (images should be under public/)
const PERSON_IMAGE_SRC = "/images/p4/ko.png";
const BOX_IMAGE_SRC = "/images/p4/op.png";

const UI = {
  th: {
    classLabel: "ห้องเรียนวิทยาศาสตร์",
    title: "คำถามชวนคิด",
    question: "1.ทำไมวัสดุแต่ละชนิดถึงทำให้เรามองเห็นสิ่งของข้างในได้ชัดเจนไม่เท่ากัน ?",
    answer: "มาหาคำตอบกัน",
    start: "เริ่มการทดลอง",
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

function BoxOnly({ toneClass }) {
  return (
    <div className="w-full max-w-[220px] sm:max-w-[300px]">
      <div className="mx-auto h-48 w-40 sm:h-64 sm:w-56">
        <ImageSlot
          src={BOX_IMAGE_SRC}
          alt="Mystery box"
          className={`h-full w-full object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.25)] ${toneClass}`}
        />
      </div>
    </div>
  );
}

export default function P4LightThinking() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const content = UI[language] ?? UI.th;

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
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.7),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(186,230,253,0.8),transparent_40%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1360px] flex-col px-3 pb-10 pt-4 sm:px-6 sm:pb-32">
        <div className="mb-3 ml-auto text-right text-lg font-semibold text-sky-700 sm:text-xl">
          {content.classLabel}
        </div>

        <div className="relative mx-auto w-full rounded-md border-[6px] border-[#c68449] bg-sky-700/70 px-3 pb-5 pt-3 shadow-[0_10px_24px_rgba(0,0,0,0.15)] sm:border-[8px] sm:px-6 sm:pb-6 sm:pt-4">
          <div className="relative ml-0 w-full max-w-[620px] rounded-[28px] border-[4px] border-slate-900 bg-white px-4 py-3 shadow-[0_8px_18px_rgba(0,0,0,0.12)] sm:ml-10 sm:rounded-[34px] sm:border-[6px] sm:px-6 sm:py-4">
            <p className="text-xl font-bold text-slate-700 sm:text-2xl">{content.title}</p>
            <p className="mt-1 text-[clamp(1.3rem,2.2vw,2.1rem)] font-medium leading-snug text-slate-700">
              {content.question}
            </p>

            <div className="absolute -bottom-5 left-6 h-8 w-8 rotate-45 rounded-[8px] border-b-[4px] border-r-[4px] border-slate-900 bg-white sm:-bottom-6 sm:left-9 sm:h-10 sm:w-10 sm:border-b-[6px] sm:border-r-[6px]" />
          </div>
        </div>

        <div
          className={`mt-3 grid flex-1 gap-3 lg:items-end ${
            hasPersonImage ? "lg:grid-cols-[200px_1fr]" : "lg:grid-cols-1"
          }`}
        >
          {hasPersonImage && (
            <div className="order-2 flex items-end justify-center lg:order-1">
              <ImageSlot
                src={PERSON_IMAGE_SRC}
                alt="Pointing student"
                className="h-[220px] w-[140px] object-contain sm:h-[300px] sm:w-[185px]"
              />
            </div>
          )}

          <div
            className={`order-1 flex flex-wrap items-end justify-center gap-2 pb-2 sm:gap-4 sm:pb-4 lg:order-2 lg:flex-nowrap ${
              hasPersonImage ? "lg:justify-between lg:px-4" : "lg:justify-center"
            }`}
          >
            {BOX_TONES.map((tone) => (
              <BoxOnly key={tone} toneClass={tone} />
            ))}
          </div>
        </div>

        <div className="relative z-20 mx-auto mt-4 flex w-full max-w-[520px] flex-wrap items-center justify-center gap-2 rounded-3xl border-2 border-slate-300 bg-slate-100/95 px-2 py-2 shadow-[0_8px_20px_rgba(59,130,246,0.18)] sm:fixed sm:bottom-4 sm:left-4 sm:mx-0 sm:w-auto sm:flex-nowrap sm:justify-start">
          {["th", "en", "ms"].map((langKey) => (
            <button
              key={langKey}
              type="button"
              onClick={() => setLanguage(langKey)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition sm:px-5 sm:py-2 sm:text-base ${
                language === langKey
                  ? LANG_CONFIG[langKey].toneClass
                  : "bg-slate-200 text-slate-600 hover:bg-slate-300"
              }`}
            >
              {content.langLabel[langKey]}
            </button>
          ))}

          <button
            type="button"
            onClick={speak}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600 transition hover:bg-blue-200 sm:h-11 sm:w-11 sm:text-xl"
            aria-label="Speak prompt"
          >
            🔊
          </button>
        </div>

        <div className="relative z-20 mx-auto mt-3 flex w-full max-w-[520px] flex-col items-stretch gap-3 sm:fixed sm:bottom-4 sm:right-4 sm:mx-0 sm:w-auto sm:items-end">
          <button
            type="button"
            onClick={speak}
            className="relative w-full rounded-xl border-[3px] border-black bg-white px-4 py-3 text-xl font-bold text-slate-800 shadow-[0_10px_20px_rgba(0,0,0,0.18)] sm:w-auto sm:border-[4px] sm:px-6 sm:text-3xl"
          >
            {content.answer}
            <span className="absolute -top-4 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border-[2px] border-black bg-yellow-400 text-base font-extrabold text-black sm:h-8 sm:w-8 sm:border-[3px] sm:text-lg">
              ?
            </span>
          </button>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-end">
            <button
              type="button"
              onClick={() => navigate("/p4/light/intro")}
              className="w-full rounded-full border-2 border-slate-300 bg-white px-4 py-2 text-center text-sm font-medium text-slate-700 shadow-[0_8px_18px_rgba(0,0,0,0.15)] transition hover:bg-slate-100 sm:w-auto"
            >
              ◀ {content.back}
            </button>

            <button
              type="button"
              onClick={() => navigate("/p4/light/experiment")}
              className="w-full rounded-2xl border-[3px] border-slate-300 bg-white px-4 py-2 text-center shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 sm:w-auto sm:border-[4px]"
            >
              <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-sky-200 text-xl text-sky-700 shadow-inner sm:h-10 sm:w-10 sm:text-2xl">
                ▶
              </div>
              <div className="text-sm font-medium leading-tight text-slate-700">
                {content.start}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
