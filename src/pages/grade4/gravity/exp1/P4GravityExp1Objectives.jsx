import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function P4GravityExp1Objectives() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const audioRef = useRef(null);

  const BACK_PATH = "/p4/gravity";
  const NEXT_PATH = "/p4/gravity/exp1/skills";

  const content = useMemo(() => {
    return {
      th: {
        heading: "การทดลองที่ 1",
        title: "เรื่อง ผลของแรงโน้มถ่วง",
        section: "จุดประสงค์การเรียนรู้",
        objectives: [
          "สังเกตผลของแรงโน้มถ่วงของโลกที่มีต่อวัตถุ",
          "อธิบายผลของแรงโน้มถ่วงที่มีต่อวัตถุ",
          "เปรียบเทียบการตกของวัตถุต่างชนิดกัน",
        ],
        back: "ย้อนกลับ",
        next: "ต่อไป",
        speak: "ฟัง",
        langTh: "ไทย",
        langEn: "อังกฤษ",
        langMs: "มลายู",
      },
      en: {
        heading: "Experiment 1",
        title: "Effect of Gravity",
        section: "Learning Objectives",
        objectives: [
          "Observe the effect of Earth's gravity on objects.",
          "Explain the effect of gravity on objects.",
          "Compare how different kinds of objects fall.",
        ],
        back: "Back",
        next: "Next",
        speak: "Listen",
        langTh: "Thai",
        langEn: "English",
        langMs: "Malay",
      },
      ms: {
        heading: "Eksperimen 1",
        title: "Kesan Graviti",
        section: "Objektif Pembelajaran",
        objectives: [
          "Memerhati kesan graviti Bumi terhadap objek.",
          "Menerangkan kesan graviti terhadap objek.",
          "Membandingkan kejatuhan objek yang berlainan jenis.",
        ],
        back: "Kembali",
        next: "Seterusnya",
        speak: "Dengar",
        langTh: "Thai",
        langEn: "Inggeris",
        langMs: "Melayu",
      },
    };
  }, []);

  const t = content[lang];

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const speakText = (text) => {
    try {
      stopAudio();
      if (!window.speechSynthesis) return;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech synthesis errors.
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden font-['Prompt',sans-serif]">
      <img
        src="/images/p4/backgrounds-p4.jpg"
        alt="Laboratory background"
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.86]"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.12),rgba(255,255,255,.02))]" />

      <div className="relative h-full w-full p-6 max-[640px]:p-4">
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

        <header className="mt-[28px] text-center max-[900px]:mt-[44px]">
          <div className="text-[58px] font-black leading-none text-[#f27f4e] [-webkit-text-stroke:7px_#ffe9cf] drop-shadow-[0_10px_20px_rgba(8,15,35,.34)] [paint-order:stroke_fill] max-[900px]:text-[46px] max-[640px]:text-[34px]">
            {t.heading}
          </div>

          <div className="mt-4 flex items-center justify-center gap-3 max-[640px]:mt-3">
            <h1 className="m-0 text-[48px] font-black leading-tight text-black drop-shadow-[0_6px_10px_rgba(255,255,255,.65)] max-[900px]:text-[36px] max-[640px]:text-[27px]">
              {t.title}
            </h1>
            <button
              className="grid h-[54px] w-[54px] place-items-center rounded-2xl border-none bg-white/90 text-[22px] shadow-[0_12px_22px_rgba(0,0,0,.16)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(0,0,0,.20)] max-[640px]:h-11 max-[640px]:w-11 max-[640px]:text-lg"
              onClick={() => speakText(`${t.heading} ${t.title}`)}
              type="button"
              title={t.speak}
            >
              {"\uD83D\uDD0A"}
            </button>
          </div>
        </header>

        <main className="relative z-[3] ml-[64px] mt-[22px] max-w-[880px] max-[1100px]:ml-[28px] max-[1100px]:max-w-[760px] max-[900px]:mr-[220px] max-[900px]:ml-4 max-[640px]:m-[18px_0_0]">
          <div className="mb-[22px] inline-block bg-[linear-gradient(90deg,#75d7e9,#2f61bf)] p-[10px] pr-[18px] shadow-[0_16px_28px_rgba(8,15,35,.28)]">
            <div className="bg-[#edf2ff] px-[34px] py-[12px] text-[30px] font-black leading-tight text-black max-[900px]:text-[24px] max-[640px]:px-[18px] max-[640px]:text-[20px]">
              {t.section}
            </div>
          </div>

          <div className="space-y-[22px] max-[900px]:space-y-4">
            {t.objectives.map((objective, index) => (
              <div
                className="flex items-center gap-[14px] rounded-full border-[14px] border-[#70c4d9] bg-white/96 py-[10px] pl-[22px] pr-[16px] shadow-[0_16px_28px_rgba(8,15,35,.18)] max-[1100px]:border-[10px] max-[1100px]:pl-[18px] max-[640px]:gap-2 max-[640px]:rounded-[24px] max-[640px]:border-[6px] max-[640px]:py-2 max-[640px]:pl-2 max-[640px]:pr-2"
                key={objective}
              >
                <div className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#f17b4d] text-[28px] font-black text-white shadow-[0_10px_18px_rgba(0,0,0,.14)] max-[900px]:h-[46px] max-[900px]:w-[46px] max-[900px]:text-[23px] max-[640px]:h-[36px] max-[640px]:w-[36px] max-[640px]:text-[18px]">
                  {index + 1}
                </div>
                <div className="flex-1 text-[32px] font-black leading-[1.24] text-black max-[1100px]:text-[26px] max-[900px]:text-[22px] max-[640px]:text-[17px]">
                  {objective}
                </div>
                <button
                  className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-[14px] border-none bg-[#eef7ff] text-xl shadow-[0_12px_20px_rgba(0,0,0,.14)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(0,0,0,.18)] max-[640px]:h-10 max-[640px]:w-10 max-[640px]:text-base"
                  onClick={() => speakText(objective)}
                  type="button"
                  title={t.speak}
                >
                  {"\uD83D\uDD0A"}
                </button>
              </div>
            ))}
          </div>
        </main>

        <img
          className="pointer-events-none absolute bottom-[70px] right-[-18px] z-[2] h-auto w-[min(31%,430px)] select-none [filter:drop-shadow(0_18px_20px_rgba(0,0,0,.20))] max-[1100px]:w-[min(32%,340px)] max-[900px]:bottom-[96px] max-[900px]:w-[min(34%,300px)] max-[640px]:hidden"
          src="/images/p4/exp1/gunkru.png"
          alt="character"
          draggable="false"
        />

        <div className="absolute bottom-[18px] left-[18px] z-[7] flex items-center gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_18px_40px_rgba(0,0,0,.22)] max-[720px]:bottom-[76px] max-[720px]:left-[12px] max-[720px]:right-[12px] max-[720px]:justify-center max-[720px]:gap-[8px] max-[720px]:rounded-[12px] max-[720px]:p-[7px]">
          <button
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition max-[720px]:px-[12px] max-[720px]:text-[14px] ${
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
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition max-[720px]:px-[12px] max-[720px]:text-[14px] ${
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
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition max-[720px]:px-[12px] max-[720px]:text-[14px] ${
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

        <div className="absolute bottom-[18px] right-[18px] z-[7] flex items-center gap-3 max-[720px]:bottom-[12px] max-[720px]:left-[12px] max-[720px]:right-[12px] max-[720px]:gap-2">
          <button
            className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:flex-1 max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
            onClick={() => navigate(BACK_PATH)}
            type="button"
          >
            {"\u00AB"} {t.back}
          </button>
          <button
            className="rounded-[18px] bg-[linear-gradient(135deg,#ef4444,#b91c1c)] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:flex-1 max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
            onClick={() => navigate(NEXT_PATH)}
            type="button"
          >
            {t.next} {"\u00BB"}
          </button>
        </div>
      </div>
    </div>
  );
}
