import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function P4GravityExp3Question() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const audioRef = useRef(null);

  const BACK_PATH = "/p4/gravity/exp3/steps";
  const NEXT_PATH = "/p4/gravity/exp3/action";

  const text = useMemo(
    () => ({
      th: {
        title: "คำถามชวนคิด",
        question: "1. วัตถุเดียวกันจะมีน้ำหนักเท่ากันหรือไม่เมื่ออยู่\nบนโลกและดวงจันทร์",
        hintBtn: "มาหาคำตอบกัน",
        startBtn: "เริ่มการทดลอง",
        backBtn: "← ย้อนกลับ",
        thChip: "ไทย",
        enChip: "อังกฤษ",
        msChip: "มลายู",
        soundTitle: "ฟังเสียง",
      },
      en: {
        title: "Think & Ask",
        question: "1. Will the same object have the same weight\non Earth and on the Moon?",
        hintBtn: "Let's find the answer",
        startBtn: "Start Experiment",
        backBtn: "← Back",
        thChip: "Thai",
        enChip: "English",
        msChip: "Malay",
        soundTitle: "Sound",
      },
      ms: {
        title: "Soalan Pemikiran",
        question: "1. Adakah objek yang sama mempunyai berat yang sama\napabila berada di Bumi dan Bulan?",
        hintBtn: "Mari cari jawapan",
        startBtn: "Mula Eksperimen",
        backBtn: "← Kembali",
        thChip: "Thai",
        enChip: "English",
        msChip: "Malay",
        soundTitle: "Bunyi",
      },
    }),
    []
  );

  const t = text[lang];

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const playQuestionAudio = () => {
    try {
      if (!window.speechSynthesis) return;
      stopAudio();
      const utter = new SpeechSynthesisUtterance(`${t.title}\n${t.question}`);
      utter.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.speak(utter);
    } catch {
      // ignore
    }
  };

  const handleStart = () => {
    stopAudio();
    navigate(NEXT_PATH);
  };

  const handleHint = () => {
    playQuestionAudio();
  };

  const goBack = () => {
    stopAudio();
    navigate(BACK_PATH);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#d4deeb] font-['Prompt',sans-serif]">
      <div className="absolute inset-0 -z-10 bg-[#d4deeb]" />

      <div className="relative h-full w-full p-6">
        <button
          className="absolute left-11 top-5 z-20 rounded-[18px] bg-white/95 px-[18px] py-3 text-base font-black text-slate-900 shadow-[0_14px_26px_rgba(0,0,0,.22)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_18px_32px_rgba(0,0,0,.26)] active:translate-y-px max-[700px]:left-[18px] max-[700px]:top-[16px]"
          onClick={goBack}
          type="button"
        >
          {t.backBtn}
        </button>

        <div className="absolute bottom-[22px] left-11 z-20 flex gap-[10px] rounded-[18px] bg-white/92 px-3 py-[10px] shadow-[0_14px_28px_rgba(0,0,0,.22)] max-[700px]:bottom-[16px] max-[700px]:left-[10px]">
          <button
            className={`rounded-[14px] px-[14px] py-[10px] text-base font-black text-slate-900 transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_18px_rgba(0,0,0,.14)] ${
              lang === "th" ? "bg-[#bfe0ff]" : "bg-[#e6f2ff]"
            }`}
            onClick={() => setLang("th")}
            type="button"
          >
            {t.thChip}
          </button>
          <button
            className={`rounded-[14px] px-[14px] py-[10px] text-base font-black text-slate-900 transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_18px_rgba(0,0,0,.14)] ${
              lang === "en" ? "bg-[#bfe0ff]" : "bg-[#e6f2ff]"
            }`}
            onClick={() => setLang("en")}
            type="button"
          >
            {t.enChip}
          </button>
          <button
            className={`rounded-[14px] px-[14px] py-[10px] text-base font-black text-slate-900 transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_18px_rgba(0,0,0,.14)] ${
              lang === "ms" ? "bg-[#bfe0ff]" : "bg-[#e6f2ff]"
            }`}
            onClick={() => setLang("ms")}
            type="button"
          >
            {t.msChip}
          </button>
        </div>

        <img
          className="pointer-events-none absolute bottom-[90px] left-[30px] z-10 h-auto w-[min(22vw,360px)] select-none [filter:drop-shadow(0_18px_20px_rgba(0,0,0,.25))] max-[700px]:hidden"
          src="/images/p4/exp1/character-girl.png"
          alt="character"
        />

        <div className="absolute left-[340px] top-20 z-10 w-[min(860px,62vw)] rounded-[36px] border-[8px] border-black/70 bg-[linear-gradient(180deg,#ffffff,#f8fbff_65%,#f0f7ff_100%)] px-[26px] py-6 shadow-[0_18px_40px_rgba(0,0,0,.22),10px_10px_0_rgba(24,24,27,.72)] max-[980px]:left-[220px] max-[980px]:w-[min(720px,60vw)] max-[700px]:left-[18px] max-[700px]:right-[18px] max-[700px]:top-[86px] max-[700px]:w-auto">
          <span className="absolute -left-6 bottom-14 h-7 w-7 rotate-45 rounded-bl-lg border-b-[8px] border-l-[8px] border-black/70 bg-[linear-gradient(180deg,#ffffff,#f2f8ff)] max-[700px]:hidden" />
          <span className="absolute -left-[52px] bottom-[34px] h-[18px] w-[18px] rounded-full border-[6px] border-black/70 bg-[linear-gradient(180deg,#ffffff,#f2f8ff)] max-[700px]:hidden" />

          <div className="flex items-center gap-3">
            <div className="text-[30px] font-black text-slate-900 max-[980px]:text-[26px]">{t.title}</div>
            <button
              className="ml-auto h-[54px] w-[54px] rounded-2xl border-2 border-blue-600/20 bg-[linear-gradient(180deg,#ffffff,#e6f0ff)] text-[22px] shadow-[0_12px_22px_rgba(0,0,0,.18)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(0,0,0,.22)]"
              onClick={playQuestionAudio}
              type="button"
              title={t.soundTitle}
            >
              {"\uD83D\uDD0A"}
            </button>
          </div>

          <div className="mt-[14px] rounded-[18px] border-2 border-dashed border-blue-500/30 bg-[linear-gradient(135deg,rgba(255,255,255,.9),rgba(239,246,255,.88)),repeating-linear-gradient(0deg,rgba(148,163,184,.10),rgba(148,163,184,.10)_2px,transparent_2px,transparent_26px)] px-4 py-[14px] text-[26px] font-black leading-[1.3] text-slate-900 max-[980px]:text-[22px]">
            {t.question.split("\n").map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-[26px] right-[26px] z-20 flex flex-col gap-[14px] max-[700px]:bottom-[16px] max-[700px]:right-[10px]">
          <button
            className="flex w-[240px] items-center gap-3 rounded-[14px] border-4 border-black/70 bg-white/92 px-4 py-4 shadow-[0_14px_28px_rgba(0,0,0,.22)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(0,0,0,.26)] active:translate-y-px max-[700px]:w-[210px]"
            onClick={handleHint}
            type="button"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f6b73c] text-xl font-black text-slate-900 shadow-[inset_0_-4px_0_rgba(0,0,0,.12)]">
              ?
            </span>
            <span className="text-[22px] font-black leading-[1.1] text-slate-900 max-[700px]:text-xl">{t.hintBtn}</span>
          </button>

          <button
            className="flex w-[240px] flex-col items-center gap-[10px] rounded-[18px] border-4 border-black/70 bg-white/95 px-4 py-[18px] shadow-[0_18px_34px_rgba(0,0,0,.24)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_22px_40px_rgba(0,0,0,.28)] active:translate-y-px max-[700px]:w-[210px]"
            onClick={handleStart}
            type="button"
          >
            <div className="flex h-[66px] w-[66px] items-center justify-center rounded-full bg-[#dbeafe] text-[30px] font-black shadow-[inset_0_-4px_0_rgba(0,0,0,.12)]">
              {"\u25B6"}
            </div>
            <div className="text-[22px] font-black text-slate-900 max-[700px]:text-xl">{t.startBtn}</div>
          </button>
        </div>
      </div>
    </div>
  );
}
