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

function BoxOnly({ toneClass, showPerson }) {
  return (
    <div className="w-full max-w-[390px]">
      <div className="mx-auto flex items-end justify-center gap-2 sm:gap-3">
        {showPerson && (
          <ImageSlot
            src={PERSON_IMAGE_SRC}
            alt="Pointing student"
            className="h-[155px] w-[100px] object-contain sm:h-[210px] sm:w-[135px]"
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
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/materials/back.png')" }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.7),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(186,230,253,0.8),transparent_40%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1360px] flex-col px-3 pb-32 pt-4 sm:px-6">
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

        <div className="mt-3 flex flex-1 flex-wrap items-end justify-center gap-2 pb-2 sm:gap-4 sm:pb-4 lg:flex-nowrap lg:justify-between lg:px-4">
          {BOX_TONES.map((tone) => (
            <BoxOnly key={tone} toneClass={tone} showPerson={hasPersonImage} />
          ))}
        </div>

        <div className="fixed bottom-3 left-3 z-20 flex w-auto max-w-[calc(100vw-1.5rem)] flex-wrap items-center justify-start gap-1.5 rounded-2xl border border-slate-300 bg-slate-100/95 px-2 py-1.5 shadow-[0_8px_20px_rgba(59,130,246,0.18)]">
          {["th", "en", "ms"].map((langKey) => (
            <button
              key={langKey}
              type="button"
              onClick={() => setLanguage(langKey)}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition sm:px-3 sm:py-1.5 sm:text-sm ${
                language === langKey
                  ? LANG_CONFIG[langKey].toneClass
                  : "bg-slate-200 text-slate-600 hover:bg-slate-300"
              }`}
            >
              {content.langLabel[langKey]}
            </button>
          ))}
        </div>

        <div className="fixed bottom-3 right-3 z-20 flex w-auto max-w-[calc(100vw-1.5rem)] flex-col items-end gap-2">
          <button
            type="button"
            onClick={speak}
            className="relative w-auto rounded-lg border-2 border-black bg-white px-3 py-2 text-base font-bold text-slate-800 shadow-[0_10px_20px_rgba(0,0,0,0.18)] sm:px-4 sm:text-xl"
          >
            {content.answer}
            <span className="absolute -top-3 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-black bg-yellow-400 text-sm font-extrabold text-black sm:h-7 sm:w-7 sm:text-base">
              ?
            </span>
          </button>

          <div className="flex w-auto flex-col gap-1.5 sm:flex-row sm:items-end">
            <button
              type="button"
              onClick={() => navigate("/p4/light/intro")}
              className="w-full rounded-full border border-slate-300 bg-white px-3 py-1.5 text-center text-xs font-medium text-slate-700 shadow-[0_8px_18px_rgba(0,0,0,0.15)] transition hover:bg-slate-100 sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
            >
              ◀ {content.back}
            </button>

            <button
              type="button"
              onClick={() => navigate("/p4/light/experiment")}
              className="w-full rounded-xl border-2 border-slate-300 bg-white px-3 py-1.5 text-center shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition hover:bg-slate-50 sm:w-auto sm:px-4 sm:py-2"
            >
              <div className="mx-auto mb-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-sky-200 text-base text-sky-700 shadow-inner sm:h-8 sm:w-8 sm:text-lg">
                ▶
              </div>
              <div className="text-xs font-medium leading-tight text-slate-700 sm:text-sm">
                {content.start}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

