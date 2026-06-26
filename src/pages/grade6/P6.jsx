import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";
import { useState } from "react";

const LESSONS = [
  {
    id: "force",
    title: {
      th: "แรงไฟฟ้าน่ารู้",
      en: "Electric Force",
      ms: "Kenali Dayo Letrik",
    },
    image: "/images/p6/fifanarup6.png",
    to: "/p6/electric-force",
  },
  {
    id: "circuit",
    title: {
      th: "วงจรไฟฟ้าอย่างง่าย",
      en: "Simple electric circuit",
      ms: "Litar Letrik Hok Mudah",
    },
    image: "/images/p6/wongjon.png",
    to: "/p6/electric-circuit",
  },
];

const PAGE_TEXT = {
  th: {
    title: "วิทยาศาสตร์ ป.6",
    subtitle: "เลือกหน่วยการเรียนรู้",
    back: "ย้อนกลับ",
    langLabels: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    title: "Science Grade 6",
    subtitle: "Choose a learning unit",
    back: "Back",
    langLabels: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  ms: {
    title: "Sains Kelah 6",
    subtitle: "Pilih Unit Pembelajare",
    back: "Pusing semula",
    langLabels: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
};

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;

  window.speechSynthesis.speak(utterance);
}

function Spark({ className }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bg-[#ffc84b] ${className}`}
      style={{
        clipPath:
          "polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)",
      }}
    />
  );
}

export default function P6() {
  const navigate = useNavigate();

  const [lang, setLang] = useState("th");

  const voiceMap = {
    th: "th-TH",
    en: "en-US",
    ms: "ms-MY",
  };

  const pageBg = {
    background:
      "radial-gradient(46% 27% at 8% 41%, #cdebf4 0 61%, transparent 62%), radial-gradient(40% 26% at 94% 42%, #cdebf4 0 60%, transparent 61%), radial-gradient(72% 35% at 50% 33%, #f7f0ef 0 63%, transparent 64%), radial-gradient(80% 50% at 50% 75%, #f7f0ef 0 62%, transparent 63%), linear-gradient(180deg, #fbf5f2 0%, #fbf5f2 100%)",
  };

  const t = PAGE_TEXT[lang] ?? PAGE_TEXT.th;

  return (
    <div
      className="relative h-[100svh] overflow-hidden px-4 pb-6 pt-7 text-center md:px-6 md:pt-8"
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

      {/* Header */}
      <header className="relative z-10 mb-5">
        <h1 className="text-4xl font-extrabold text-blue-600 md:text-[46px]">
          {t.title}
        </h1>

        <p className="mt-2 text-lg text-slate-700 md:text-xl">
          {t.subtitle}
        </p>
      </header>

      {/* Lesson Cards */}
      <section className="relative z-10 mx-auto mt-3 flex w-full flex-1 items-start justify-center">
        <div className="grid w-full max-w-[1280px] grid-cols-1 justify-items-center gap-6 lg:grid-cols-2 lg:gap-7">

          {LESSONS.map((lesson) => (

            <div
              key={lesson.id}
              className="group flex h-[clamp(400px,52vh,480px)] w-[min(600px,94vw)] max-w-[94vw] flex-col overflow-hidden rounded-[26px] bg-white shadow-[0_16px_34px_rgba(33,53,95,0.15)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.2)] lg:w-[min(600px,43vw)]"
            >

              {/* Image */}
              <div
                onClick={() => navigate(lesson.to)}
                className="flex h-[clamp(255px,34vh,315px)] cursor-pointer items-center justify-center overflow-hidden bg-slate-200"
              >
                <img
                  src={lesson.image}
                  alt={lesson.title[lang]}
                  className="block h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Title */}
              <div className="flex min-h-[92px] flex-1 items-center justify-center gap-3 px-5 py-3 text-center">

                <h2 className="text-[clamp(28px,2.4vw,44px)] font-extrabold leading-[1.15] text-slate-900">
                  {lesson.title[lang]}
                </h2>

                <button
                  type="button"
                  onClick={() => speakText(lesson.title[lang], voiceMap[lang])}
                  className="inline-grid h-14 w-14 shrink-0 place-items-center rounded-full bg-sky-100 text-[26px] text-sky-700 shadow-[0_10px_22px_rgba(59,130,246,0.18)] transition hover:-translate-y-0.5 hover:bg-sky-200"
                  aria-label={lesson.title[lang]}
                  title={lesson.title[lang]}
                >
                  {"\u{1F50A}"}
                </button>

              </div>

            </div>

          ))}

        </div>
      </section>

      {/* Language Buttons */}
      <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
        <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">

          <button
            onClick={() => setLang("th")}
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "th"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
          >
            {t.langLabels.th}
          </button>

          <button
            onClick={() => setLang("ms")}
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "ms"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
          >
            {t.langLabels.ms}
          </button>

          <button
            onClick={() => setLang("en")}
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "en"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
          >
            {t.langLabels.en}
          </button>

        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-3 right-3 z-20 md:bottom-7 md:right-7">

        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/grades")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          « {t.back}
        </button>

      </div>

    </div>
  );
}
