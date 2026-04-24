import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function P4GravityObjectives() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const audioRef = useRef(null);

  const content = useMemo(() => {
    return {
      th: {
        grade: "ชั้นประถมศึกษาปีที่ 4",
        title: "แรงโน้มถ่วงของโลก",
        section: "จุดประสงค์การเรียนรู้",
        obj1: "ระบุผลของแรงโน้มถ่วงที่มีต่อวัตถุได้",
        obj2: "สังเกตผลของแรงโน้มถ่วงที่มีต่อวัตถุได้",
        obj3: "ปฏิบัติการทดลองเกี่ยวกับผลของแรงโน้มถ่วงที่มีต่อวัตถุได้ครบทุกขั้นตอน",
        back: "ย้อนกลับ",
        next: "ต่อไป",
        speak: "ฟัง",
        langTh: "ไทย",
        langEn: "อังกฤษ",
        langMs: "มลายู",
      },
      en: {
        grade: "Grade 4",
        title: "Earth's Gravity",
        section: "Learning Objectives",
        obj1: "Identify the effect of gravity on objects.",
        obj2: "Observe the effect of gravity on objects.",
        obj3: "Carry out an experiment about the effect of gravity on objects by following all steps.",
        back: "Back",
        next: "Next",
        speak: "Listen",
        langTh: "ไทย",
        langEn: "อังกฤษ",
        langMs: "มลายู",
      },
      ms: {
        grade: "Tahun 4",
        title: "Graviti Bumi",
        section: "Objektif Pembelajaran",
        obj1: "Mengenal pasti kesan graviti terhadap objek.",
        obj2: "Memerhati kesan graviti terhadap objek.",
        obj3: "Menjalankan eksperimen tentang kesan graviti terhadap objek dengan mengikuti semua langkah.",
        back: "Kembali",
        next: "Seterusnya",
        speak: "Dengar",
        langTh: "ไทย",
        langEn: "อังกฤษ",
        langMs: "มลายู",
      },
    };
  }, []);

  const t = content[lang];
  const objectives = [t.obj1, t.obj2, t.obj3];

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const speakText = (text) => {
    try {
      stopAudio();
      if (!window.speechSynthesis) return;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.speak(u);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden font-['Prompt',sans-serif]">
      <img
        src="/images/p4/backgrounds-p4.jpg"
        alt="Laboratory background"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.9]"
      />

      <div className="relative h-full w-full bg-[linear-gradient(180deg,rgba(255,255,255,.10),rgba(255,255,255,.02))] p-6 max-[640px]:p-4">
        <button
          type="button"
          className="fixed left-[18px] top-[18px] z-20 grid h-16 w-16 place-items-center rounded-[14px] border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,.96),rgba(226,242,255,.9))] text-[#202124] shadow-[0_18px_36px_rgba(8,15,35,.25),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-md transition duration-150 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-[linear-gradient(145deg,#ffffff,#dbeafe)] hover:text-gray-900 hover:shadow-[0_24px_44px_rgba(8,15,35,.3),inset_0_1px_0_rgba(255,255,255,.95)] active:translate-y-px active:scale-[.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-sky-300/80 max-[900px]:left-3 max-[900px]:top-3 max-[900px]:h-[54px] max-[900px]:w-[54px] max-[900px]:rounded-xl"
          onClick={() => navigate("/grades")}
          aria-label="SelectGrade"
          title="SelectGrade"
        >
          <svg
            aria-hidden="true"
            className="h-11 w-11 drop-shadow-[0_5px_7px_rgba(0,0,0,.22)] max-[900px]:h-[37px] max-[900px]:w-[37px]"
            viewBox="0 0 128 128"
            focusable="false"
          >
            <path
              d="M13 65.5 57.8 28.2c3.7-3.1 8.7-3.1 12.4 0L115 65.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="11"
            />
            <path
              d="M27.5 69.4 58.3 43.8c3.4-2.8 8-2.8 11.4 0l30.8 25.6v34.8c0 6.5-5.3 11.8-11.8 11.8H76.8V88.4c0-4.7-3.8-8.4-8.4-8.4h-8.8c-4.7 0-8.4 3.8-8.4 8.4V116H39.3c-6.5 0-11.8-5.3-11.8-11.8V69.4Z"
              fill="currentColor"
            />
            <path d="M88 33h17v29.5L88 48.4V33Z" fill="currentColor" />
          </svg>
        </button>

        <div className="mt-[22px] text-center">
          <div className="inline-block rounded-2xl bg-white/90 px-[18px] py-[10px] text-2xl font-black text-blue-900 shadow-[0_10px_22px_rgba(0,0,0,.14)] max-[640px]:text-lg">
            {t.grade}
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <h1 className="m-0 text-6xl font-black text-[#eef5ff] drop-shadow-[0_10px_24px_rgba(8,15,35,0.55)] max-[900px]:text-[42px] max-[640px]:text-[34px]">
              {t.title}
            </h1>
            <button
              className="h-[54px] w-[54px] cursor-pointer rounded-2xl border-none bg-white/90 text-[22px] shadow-[0_12px_22px_rgba(0,0,0,.16)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(0,0,0,.20)] max-[640px]:h-12 max-[640px]:w-12"
              onClick={() => speakText(t.title)}
              type="button"
              title={t.speak}
            >
              {"\uD83D\uDD0A"}
            </button>
          </div>
        </div>

        <div className="ml-[155px] mt-[26px] max-w-[900px] rounded-[28px] border border-white/40 bg-white/90 px-6 py-[22px] shadow-[0_18px_36px_rgba(0,0,0,.18)] max-[900px]:mr-[220px] max-[900px]:ml-6 max-[900px]:mt-5 max-[640px]:m-[18px_0_0] max-[640px]:p-[18px]">
          <div className="mb-4 flex items-center justify-start">
            <div className="inline-block rounded-[14px] bg-gradient-to-br from-blue-600 to-blue-700 px-[18px] py-[10px] text-2xl font-black text-white shadow-[0_12px_24px_rgba(0,0,0,.14)] max-[640px]:text-xl">
              {t.section}
            </div>
          </div>

          <div className="mb-[14px] flex items-center gap-[14px] rounded-[22px] border-4 border-sky-200 bg-sky-50 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-400 text-[22px] font-black text-white shadow-[0_10px_18px_rgba(0,0,0,.16)]">
              1
            </div>
            <div className="flex-1 text-2xl font-black leading-[1.25] text-gray-900 max-[900px]:text-xl max-[640px]:text-lg">
              {objectives[0]}
            </div>
            <button
              className="h-[46px] w-[46px] cursor-pointer rounded-[14px] border-none bg-white/90 text-xl shadow-[0_12px_22px_rgba(0,0,0,.16)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(0,0,0,.20)]"
              onClick={() => speakText(objectives[0])}
              type="button"
              title={t.speak}
            >
              {"\uD83D\uDD0A"}
            </button>
          </div>

          <div className="mb-[14px] flex items-center gap-[14px] rounded-[22px] border-4 border-sky-200 bg-sky-50 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-400 text-[22px] font-black text-white shadow-[0_10px_18px_rgba(0,0,0,.16)]">
              2
            </div>
            <div className="flex-1 text-2xl font-black leading-[1.25] text-gray-900 max-[900px]:text-xl max-[640px]:text-lg">
              {objectives[1]}
            </div>
            <button
              className="h-[46px] w-[46px] cursor-pointer rounded-[14px] border-none bg-white/90 text-xl shadow-[0_12px_22px_rgba(0,0,0,.16)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(0,0,0,.20)]"
              onClick={() => speakText(objectives[1])}
              type="button"
              title={t.speak}
            >
              {"\uD83D\uDD0A"}
            </button>
          </div>

          <div className="mb-[14px] flex items-center gap-[14px] rounded-[22px] border-4 border-sky-200 bg-sky-50 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-400 text-[22px] font-black text-white shadow-[0_10px_18px_rgba(0,0,0,.16)]">
              3
            </div>
            <div className="flex-1 text-2xl font-black leading-[1.25] text-gray-900 max-[900px]:text-xl max-[640px]:text-lg">
              {objectives[2]}
            </div>
            <button
              className="h-[46px] w-[46px] cursor-pointer rounded-[14px] border-none bg-white/90 text-xl shadow-[0_12px_22px_rgba(0,0,0,.16)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(0,0,0,.20)]"
              onClick={() => speakText(objectives[2])}
              type="button"
              title={t.speak}
            >
              {"\uD83D\uDD0A"}
            </button>
          </div>
        </div>

        <img
          className="pointer-events-none absolute bottom-[35px] right-[-30px] h-auto w-[min(28%,380px)] select-none [filter:drop-shadow(0_18px_20px_rgba(0,0,0,.22))] max-[900px]:bottom-20 max-[900px]:w-[min(34%,320px)] max-[900px]:opacity-95 max-[640px]:hidden"
          src="/images/p4/exp1/gunkru.png"
          alt="character"
        />

        <div className="absolute bottom-[18px] left-[18px] z-[7] flex items-center gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_18px_40px_rgba(0,0,0,.22)] max-[720px]:bottom-[12px] max-[720px]:left-[12px] max-[720px]:gap-[6px] max-[720px]:rounded-[12px] max-[720px]:p-[7px]">
          <button
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition ${
              lang === "th"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
            onClick={() => setLang("th")}
            type="button"
          >
            {t.langTh}
          </button>
          <button
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition ${
              lang === "ms"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
            onClick={() => setLang("ms")}
            type="button"
          >
            {t.langMs}
          </button>
          <button
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition ${
              lang === "en"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
            onClick={() => setLang("en")}
            type="button"
          >
            {t.langEn}
          </button>
        </div>

        <div className="absolute bottom-[18px] right-[18px] z-[7] flex items-center gap-3 max-[720px]:bottom-[12px] max-[720px]:right-[12px] max-[720px]:gap-2">
          <button
            className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
            onClick={() => navigate("/p4")}
            type="button"
          >
            « {t.back}
          </button>
          <button
            className="rounded-[18px] bg-[linear-gradient(135deg,#ef4444,#b91c1c)] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
            onClick={() => navigate("/p4/gravity")}
            type="button"
          >
            {t.next} »
          </button>
        </div>
      </div>
    </div>
  );
}
