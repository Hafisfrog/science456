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

  const backLabel = "ย้อนกลับ";

  const langLabels = { th: "ไทย", en: "อังกฤษ", ms: "มลายู" };

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
        <div className="grid w-full max-w-[1280px] grid-cols-1 justify-items-center gap-6 lg:grid-cols-2 lg:gap-7">

          {LESSONS.map((lesson) => (

            <div
              key={lesson.id}
              className="group flex h-[clamp(400px,52vh,480px)] w-[min(600px,94vw)] max-w-[94vw] flex-col overflow-hidden rounded-[26px] bg-white shadow-[0_16px_34px_rgba(33,53,95,0.15)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.2)] lg:w-[min(600px,43vw)]"
            >

              {/* Image */}
              <div
                onClick={() => navigate(lesson.to)}
<<<<<<< HEAD
                className="h-[clamp(220px,28vh,270px)] w-full cursor-pointer overflow-hidden bg-slate-200"
=======
                className="flex h-[clamp(255px,34vh,315px)] cursor-pointer items-center justify-center overflow-hidden bg-slate-200"
>>>>>>> d66394e07c311126b748434114b790e2f23c4454
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
      <div className="fixed bottom-6 left-6 z-20 inline-flex gap-2 rounded-[20px] bg-white/95 px-3 py-[10px] shadow-[0_18px_40px_rgba(111,144,186,0.2)]">

        <button
          onClick={() => setLang("th")}
          className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
            lang === "th" ? "bg-[#bdd9f8]" : "bg-[#eaf3ff]"
          }`}
        >
          {langLabels.th}
        </button>

        <button
          onClick={() => setLang("en")}
          className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
            lang === "en" ? "bg-[#bdd9f8]" : "bg-[#eaf3ff]"
          }`}
        >
          {langLabels.en}
        </button>

        <button
          onClick={() => setLang("ms")}
          className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
            lang === "ms" ? "bg-[#bdd9f8]" : "bg-[#eaf3ff]"
          }`}
        >
          {langLabels.ms}
        </button>

      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-6 right-6 z-20 flex gap-3">

        <button
          className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-white/90 px-[18px] py-[14px] font-black text-[#213a8f] shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
          onClick={() => navigate("/grades")}
          type="button"
          aria-label={backLabel}
          title={backLabel}
        >
          <span className="text-[20px] leading-none">&laquo;</span>
          <span className="text-[20px] leading-none">{backLabel}</span>
        </button>

      </div>

    </div>
  );
}
