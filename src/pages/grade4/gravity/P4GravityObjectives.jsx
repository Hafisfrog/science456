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
        obj1: "สังเกตและระบุผลของแรงโน้มถ่วงที่มีต่อวัตถุได้",
        obj2: "ปฏิบัติการทดลองเกี่ยวกับผลของแรงโน้มถ่วงที่มีต่อวัตถุได้ครบทุกขั้นตอน",
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
        obj1: "Observe and describe the effect of gravity on objects.",
        obj2: "Carry out a gravity experiment by following all steps.",
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
        obj1: "Memerhati dan menerangkan kesan graviti terhadap objek.",
        obj2: "Menjalankan eksperimen graviti dengan mengikuti semua langkah.",
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
              {t.obj1}
            </div>
            <button
              className="h-[46px] w-[46px] cursor-pointer rounded-[14px] border-none bg-white/90 text-xl shadow-[0_12px_22px_rgba(0,0,0,.16)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(0,0,0,.20)]"
              onClick={() => speakText(t.obj1)}
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
              {t.obj2}
            </div>
            <button
              className="h-[46px] w-[46px] cursor-pointer rounded-[14px] border-none bg-white/90 text-xl shadow-[0_12px_22px_rgba(0,0,0,.16)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(0,0,0,.20)]"
              onClick={() => speakText(t.obj2)}
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

        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-[10px] rounded-[18px] bg-white/90 p-[10px_12px] shadow-[0_10px_22px_rgba(0,0,0,.12)] max-[640px]:bottom-3 max-[640px]:left-3 max-[640px]:gap-2 max-[640px]:p-[10px]">
          <button
            className={`rounded-[14px] border-none px-[14px] py-[10px] text-base font-black transition duration-150 hover:-translate-y-0.5 max-[640px]:px-3 max-[640px]:text-[15px] ${
              lang === "th" ? "bg-sky-200" : "bg-[#e6f2ff]"
            }`}
            onClick={() => setLang("th")}
            type="button"
          >
            {t.langTh}
          </button>
          <button
            className={`rounded-[14px] border-none px-[14px] py-[10px] text-base font-black transition duration-150 hover:-translate-y-0.5 max-[640px]:px-3 max-[640px]:text-[15px] ${
              lang === "en" ? "bg-sky-200" : "bg-[#e6f2ff]"
            }`}
            onClick={() => setLang("en")}
            type="button"
          >
            {t.langEn}
          </button>
          <button
            className={`rounded-[14px] border-none px-[14px] py-[10px] text-base font-black transition duration-150 hover:-translate-y-0.5 max-[640px]:px-3 max-[640px]:text-[15px] ${
              lang === "ms" ? "bg-sky-200" : "bg-[#e6f2ff]"
            }`}
            onClick={() => setLang("ms")}
            type="button"
          >
            {t.langMs}
          </button>
        </div>

        <div className="absolute bottom-6 right-6 z-20 flex gap-3 max-[640px]:bottom-3 max-[640px]:right-3 max-[640px]:gap-2">
          <button
            className="cursor-pointer rounded-[20px] border-none bg-white/90 px-[22px] py-[14px] text-lg font-black text-gray-900 shadow-[0_12px_24px_rgba(0,0,0,.18)] transition duration-150 hover:-translate-y-0.5 max-[640px]:px-[14px] max-[640px]:py-3 max-[640px]:text-base"
            onClick={() => navigate("/p4")}
            type="button"
          >
            « {t.back}
          </button>
          <button
            className="cursor-pointer rounded-[20px] border-none bg-gradient-to-br from-blue-600 to-blue-700 px-[22px] py-[14px] text-lg font-black text-white shadow-[0_12px_24px_rgba(0,0,0,.18)] transition duration-150 hover:-translate-y-0.5 max-[640px]:px-[14px] max-[640px]:py-3 max-[640px]:text-base"
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
