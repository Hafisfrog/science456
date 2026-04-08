import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LESSONS = [
  {
    id: "force",
    title: {
      th: "แรงไฟฟ้าน่ารู้",
      en: "Electric Force",
      ms: "Daya Elektrik",
    },
    image: "/images/p6/fifanarup6.png",
    to: "/p6/electric-force",
  },
  {
    id: "circuit",
    title: {
      th: "วงจรไฟฟ้าใกล้ตัว",
      en: "Electric Circuit",
      ms: "Litar Elektrik",
    },
    image: "/images/p6/fifawjp6.png",
    to: "/p6/electric-circuit",
  },
];

function speakText(text, lang) {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;

  window.speechSynthesis.speak(utterance);
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
      "radial-gradient(80% 60% at 50% 34%, #f6efef 0 62%, transparent 63%), radial-gradient(31% 24% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(31% 24% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  const backLabel = {
    th: "ย้อนกลับ",
    en: "Back",
    ms: "Kembali",
  }[lang];

  const langLabels = {
    th: { th: "ไทย", en: "English", ms: "Melayu" },
    en: { th: "Thai", en: "English", ms: "Melayu" },
    ms: { th: "Thai", en: "English", ms: "Melayu" },
  }[lang];

  return (
    <div
      className="relative h-[100svh] overflow-hidden px-4 pb-6 pt-7 text-center md:px-6 md:pt-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >

      {/* Lightning */}
      <div
        className="pointer-events-none absolute right-[clamp(126px,11vw,190px)] top-3 h-[150px] w-[100px] bg-[#f7bd2b]"
        style={{
          clipPath:
            "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
        }}
      />

      {/* Header */}
      <header className="mb-5">
        <h1 className="text-4xl font-extrabold text-blue-600 md:text-[46px]">
          วิทยาศาสตร์ ป.6
        </h1>

        <p className="mt-2 text-lg text-slate-700 md:text-xl">
          เลือกหน่วยการเรียนรู้
        </p>
      </header>

      {/* Lesson Cards */}
      <section className="mx-auto mt-3 flex w-full flex-1 items-start justify-center">
        <div className="grid w-full max-w-[1160px] grid-cols-1 justify-items-center gap-6 lg:grid-cols-2 lg:gap-7">

          {LESSONS.map((lesson) => (

            <div
              key={lesson.id}
              className="group flex h-[clamp(360px,45vh,430px)] w-[min(540px,40vw)] max-w-[94vw] flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_14px_30px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.2)]"
            >

              {/* Image */}
              <div
                onClick={() => navigate(lesson.to)}
                className="flex h-[clamp(220px,28vh,270px)] items-center justify-center overflow-hidden bg-slate-200 px-2 pt-2 pb-1 cursor-pointer"
              >
                <img
                  src={lesson.image}
                  alt={lesson.title[lang]}
                  className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Title */}
              <div className="flex min-h-[92px] items-center justify-center gap-3 px-5 py-3 text-center">

                <h2 className="text-[clamp(28px,2.4vw,56px)] font-extrabold leading-[1.15] text-slate-900">
                  {lesson.title[lang]}
                </h2>

                {/* <button
                  onClick={() => speakText(lesson.title[lang], voiceMap[lang])}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl shadow hover:bg-blue-200"
                >
                  🔊
                </button> */}

              </div>

            </div>

          ))}

        </div>
      </section>

      {/* Language Buttons */}
      <div className="fixed bottom-3 left-3 flex gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_10px_22px_rgba(0,0,0,0.12)]">

        <button
          onClick={() => setLang("th")}
          className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
            lang === "th" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
          }`}
        >
          {langLabels.th}
        </button>

        <button
          onClick={() => setLang("en")}
          className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
            lang === "en" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
          }`}
        >
          {langLabels.en}
        </button>

        <button
          onClick={() => setLang("ms")}
          className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
            lang === "ms" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
          }`}
        >
          {langLabels.ms}
        </button>

      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-3 right-3 z-20 flex gap-3 md:bottom-6 md:right-6">

        <button
          className="inline-flex items-center justify-center gap-3 rounded-[22px] bg-white px-6 py-4 text-slate-700 shadow-lg"
          onClick={() => navigate("/grades")}
          type="button"
          aria-label={backLabel}
          title={backLabel}
        >
          <span className="text-[22px] font-black leading-none">&lt;&lt;</span>
          <span className="text-[18px] font-bold leading-none md:text-[20px]">{backLabel}</span>
        </button>

      </div>

    </div>
  );
}
