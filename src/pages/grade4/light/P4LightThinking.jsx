import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LightLanguageSwitcher, LightNavButtons } from "./LightControls";

const PERSON_IMAGE_SRC = "/images/p4/ko.png";
const BOX_IMAGE_SRC = "/images/p4/op.png";

const UI = {
  th: {
    title: "คำถามชวนคิด",
    question:
      "ทำไมวัสดุแต่ละชนิดจึงทำให้เรามองเห็นสิ่งของข้างในได้ชัดเจนไม่เท่ากัน ?",
    start: "เริ่มการทดลอง",
    next: "ต่อไป",
    back: "ย้อนกลับ",
    langLabel: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
    speakText:
      "คำถามชวนคิด ข้อที่ 1 ทำไมวัสดุแต่ละชนิดจึงทำให้เรามองเห็นสิ่งของข้างในได้ชัดเจนไม่เท่ากัน",
  },
  en: {
    title: "Thinking Question",
    question: "Why do different materials let us see inside objects with different clarity?",
    start: "Start Experiment",
    next: "Next",
    back: "Back",
    langLabel: { th: "Thai", en: "English", ms: "Malay" },
    speakText:
      "Thinking question number one. Why do different materials allow us to see objects inside with different clarity?",
  },
  ms: {
    title: "Soalan Pemikiran",
    question:
      "Mengapa bahan yang berbeza membolehkan kita melihat objek di dalam dengan tahap kejelasan yang berbeza?",
    start: "Mula Eksperimen",
    next: "Seterusnya",
    back: "Kembali",
    langLabel: { th: "Thai", en: "Inggeris", ms: "Melayu" },
    speakText:
      "Soalan pemikiran nombor satu. Mengapa bahan yang berbeza membolehkan kita melihat objek di dalam dengan tahap kejelasan yang berbeza?",
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
    <div className="w-full max-w-[520px]">
      <div className="mx-auto flex items-end justify-center gap-3 sm:gap-4">
        {showPerson && (
          <ImageSlot
            src={PERSON_IMAGE_SRC}
            alt="Pointing student"
            className="h-[250px] w-[162px] object-contain sm:h-[350px] sm:w-[224px]"
          />
        )}
        <div className="h-[280px] w-[240px] sm:h-[390px] sm:w-[326px]">
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
      className={`flex w-full flex-col items-center rounded-[24px] border-[4px] border-[#616878] bg-white/96 px-3.5 py-3.5 text-slate-900 shadow-[0_14px_26px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:brightness-[1.01] sm:min-h-[136px] sm:rounded-[26px] sm:px-5 sm:py-4 ${className}`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c7daf6] text-[1.45rem] leading-none text-black shadow-[inset_0_-6px_0_rgba(148,163,184,0.35),0_8px_16px_rgba(148,163,184,0.22)] sm:h-[56px] sm:w-[56px] sm:text-[1.7rem]">
        <span className="ml-1.5">{"\u25B6"}</span>
      </span>
      <span className="mt-2.5 text-center text-[0.9rem] font-black leading-tight text-[#0b2246] sm:text-[1.35rem]">
        {label}
      </span>
    </button>
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

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1360px] flex-col px-3 pb-32 pt-4 sm:px-6 sm:pb-36">

        <div className="relative mx-auto w-full">
          <div className="relative ml-0 w-full max-w-[620px] rounded-[28px] border-[4px] border-slate-900 bg-white px-4 py-3 pr-14 shadow-[0_8px_18px_rgba(0,0,0,0.12)] sm:ml-10 sm:rounded-[34px] sm:border-[6px] sm:px-6 sm:py-4 sm:pr-16">
            <p className="text-3xl font-black text-slate-700 sm:text-4xl">{content.title}</p>
            <p className="mt-1 text-[clamp(1.05rem,1.75vw,1.6rem)] font-medium leading-snug text-slate-700">
              {content.question}
            </p>
            <button
              type="button"
              onClick={speak}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-base font-bold text-blue-600 transition hover:bg-blue-200 sm:right-5 sm:top-5 sm:h-10 sm:w-10 sm:text-xl"
              aria-label="Speak prompt"
            >
              {"\uD83D\uDD0A"}
            </button>

            <div className="absolute -bottom-5 left-6 h-8 w-8 rotate-45 rounded-[8px] border-b-[4px] border-r-[4px] border-slate-900 bg-white sm:-bottom-6 sm:left-9 sm:h-10 sm:w-10 sm:border-b-[6px] sm:border-r-[6px]" />
          </div>
        </div>

        <div className="relative mt-3 flex-1">
          <div className="flex h-full flex-wrap items-end justify-center gap-2 pb-2 sm:gap-4 sm:pb-4 lg:flex-nowrap lg:justify-between lg:px-4">
            {BOX_TONES.map((tone) => (
              <BoxOnly key={tone} toneClass={tone} showPerson={hasPersonImage} />
            ))}
          </div>

          <div className="absolute bottom-[-64px] left-1/2 z-20 w-[min(360px,calc(100vw-36px))] -translate-x-1/2 max-[720px]:bottom-12 max-[720px]:w-[min(300px,calc(100vw-36px))]">
            <StartExperimentButton
              label={content.start}
              onClick={() => navigate("/p4/light/experiment")}
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-[18px] left-[18px] z-30">
        <LightLanguageSwitcher
          value={language}
          onChange={setLanguage}
          labels={UI.th.langLabel}
        />
      </div>

      <div className="fixed bottom-[18px] right-[18px] z-30">
        <LightNavButtons
          backLabel={content.back}
          nextLabel={content.next}
          onBack={() => navigate("/p4/light/intro")}
          onNext={() => navigate("/p4/light/experiment")}
        />
      </div>
    </div>
  );
}
