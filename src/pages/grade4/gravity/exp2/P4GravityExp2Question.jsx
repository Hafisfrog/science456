import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../exp1/P4GravityExp1Materials.css";

export default function P4GravityExp2Question() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");

  const BACK_PATH = "/p4/gravity/exp2/steps";
  const ACTION_PATH = "/p4/gravity/exp2/action";

  const assets = useMemo(() => {
    return {
      bg: "/images/p4/exp1/bg-lab.jpg",
      character: "/images/p4/exp1/character-girl.png",
    };
  }, []);

  const text = useMemo(() => {
    return {
      th: {
        title: "คำถามชวนคิด",
        q1: "1. เคยสงสัยหรือไม่ว่า ทำไมวัตถุทุกชนิดจึงตกลงสู่พื้นโลก และเหตุใดวัตถุแต่ละชนิดจึงมีน้ำหนักไม่เท่ากัน ?",
        langTh: "ไทย",
        langEn: "อังกฤษ",
        langMs: "มลายู",
        btnHint: "มาหาคำตอบ\nกัน",
        btnStart: "เริ่มการทดลอง",
        back: "ย้อนกลับ",
        next: "ต่อไป",
        speak: "ฟังคำถาม",
      },
      en: {
        title: "Thinking Question",
        q1: "1. Have you ever wondered why all objects fall to the ground, and why different objects have different weights?",
        langTh: "ไทย",
        langEn: "อังกฤษ",
        langMs: "มลายู",
        btnHint: "Find\nthe answer",
        btnStart: "Start Experiment",
        back: "Back",
        next: "Next",
        speak: "Listen",
      },
      ms: {
        title: "Soalan Berfikir",
        q1: "1. Pernahkah anda tertanya-tanya mengapa semua objek jatuh ke tanah, dan mengapa objek yang berbeza mempunyai berat yang berbeza?",
        langTh: "ไทย",
        langEn: "อังกฤษ",
        langMs: "มลายู",
        btnHint: "Cari\njawapan",
        btnStart: "Mulakan Eksperimen",
        back: "Kembali",
        next: "Seterusnya",
        speak: "Dengar soalan",
      },
    };
  }, []);

  const t = text[lang];
  const speakingRef = useRef(false);

  const speak = (msg) => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(msg);
      u.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      u.rate = 0.98;
      speakingRef.current = true;
      u.onend = () => (speakingRef.current = false);
      window.speechSynthesis.speak(u);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative h-[100svh] min-h-[100svh] w-full overflow-hidden bg-[#eef2ff] font-['Prompt',sans-serif] max-[760px]:overflow-y-auto">
      <img
        src="/images/p4/backgrounds-p4.jpg"
        alt="Laboratory background"
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.9]"
      />
      <div className="absolute inset-0 -z-[2] [background:radial-gradient(1200px_720px_at_50%_40%,rgba(255,255,255,.20),rgba(255,255,255,0)_60%),linear-gradient(180deg,rgba(10,16,32,.18),rgba(10,16,32,.55))]" />

      {assets.character ? (
        <img
          className="pointer-events-none absolute bottom-[clamp(56px,8vh,72px)] left-[26px] z-[2] h-auto w-[min(330px,28vw)] select-none [filter:drop-shadow(0_18px_28px_rgba(0,0,0,.30))] max-[720px]:hidden max-[880px]:bottom-[52px] max-[880px]:w-[min(280px,22vw)] max-[760px]:left-3 max-[760px]:bottom-[92px] max-[760px]:block max-[760px]:w-[min(190px,16vw)]"
          src={assets.character}
          alt="character"
          draggable="false"
        />
      ) : null}

      <div className="absolute left-[330px] right-[360px] top-[120px] z-[3] rounded-[32px] border-[5px] border-slate-900/90 bg-white/96 px-[26px] py-[22px] shadow-[0_30px_60px_rgba(0,0,0,.26)] max-[980px]:left-[220px] max-[980px]:w-[min(720px,60vw)] max-[980px]:right-auto max-[720px]:left-[18px] max-[720px]:right-[260px] max-[720px]:top-[100px] max-[680px]:top-[86px] max-[880px]:top-[82px] max-[880px]:border-4 max-[880px]:px-5 max-[880px]:py-[18px] max-[760px]:left-[clamp(170px,13vw,220px)] max-[760px]:right-[230px]">
        <span className="absolute -left-6 bottom-14 h-7 w-7 rotate-45 rounded-bl-lg border-b-[8px] border-l-[8px] border-black/70 bg-[linear-gradient(180deg,#ffffff,#f2f8ff)]" />
        <span className="absolute -left-[52px] bottom-[34px] h-[18px] w-[18px] rounded-full border-[6px] border-black/70 bg-[linear-gradient(180deg,#ffffff,#f2f8ff)]" />

        <div className="mb-[10px] text-[28px] font-black text-slate-900 max-[980px]:text-2xl max-[880px]:mb-2 max-[880px]:text-2xl">
          {t.title}
        </div>

        <div className="flex items-start gap-[14px]">
          <div className="flex-1 rounded-[18px] border-2 border-dashed border-blue-500/30 bg-[linear-gradient(135deg,rgba(255,255,255,.9),rgba(239,246,255,.88)),repeating-linear-gradient(0deg,rgba(148,163,184,.10),rgba(148,163,184,.10)_2px,transparent_2px,transparent_26px)] px-4 py-[14px] text-2xl font-black leading-[1.3] text-slate-900 max-[980px]:text-xl max-[880px]:text-xl">
            {t.q1}
          </div>

          <button
            className="h-[54px] w-[54px] shrink-0 rounded-2xl bg-[linear-gradient(180deg,#ffffff,#e6f0ff)] text-[22px] shadow-[inset_0_-5px_0_rgba(0,0,0,.12),0_18px_34px_rgba(0,0,0,.16)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[inset_0_-5px_0_rgba(0,0,0,.12),0_24px_44px_rgba(0,0,0,.20)] active:translate-y-px max-[880px]:h-12 max-[880px]:w-12 max-[880px]:text-xl"
            type="button"
            onClick={() => speak(`${t.title}\n${t.q1}`)}
            title={t.speak}
          >
            {"\uD83D\uDD0A"}
          </button>
        </div>
      </div>

      <button
        className="absolute left-1/2 top-[56%] z-[12] flex w-[min(380px,24vw)] -translate-x-1/2 flex-col items-center gap-4 rounded-[28px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,.98),rgba(241,247,255,.96))] px-6 py-5 text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,.22)] transition hover:-translate-x-1/2 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(15,23,42,.28)] active:translate-y-[1px] max-[1100px]:w-[min(350px,28vw)] max-[900px]:top-[62%] max-[900px]:w-[min(320px,32vw)] max-[700px]:top-[55%] max-[700px]:w-[min(280px,calc(100%-40px))] max-[700px]:gap-3 max-[700px]:rounded-[24px] max-[700px]:px-5 max-[700px]:py-4"
        type="button"
        onClick={() => navigate(ACTION_PATH)}
        title={t.btnStart.replace("\n", " ")}
      >
        <span className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[linear-gradient(180deg,#dbeafe,#c7dbff)] text-[36px] font-black text-slate-900 shadow-[inset_0_-6px_0_rgba(148,163,184,.35),0_8px_16px_rgba(148,163,184,.20)] max-[700px]:h-[62px] max-[700px]:w-[62px] max-[700px]:text-[30px]">
          {"\u25B6"}
        </span>
        <span className="text-center text-[26px] font-black leading-none tracking-[-0.02em] text-slate-900 max-[900px]:text-[22px] max-[700px]:text-[18px]">
          {t.btnStart}
        </span>
      </button>

      <div className="absolute bottom-[18px] left-[18px] z-20 flex gap-[10px] rounded-[18px] bg-white/92 px-3 py-[10px] shadow-[0_18px_40px_rgba(0,0,0,.22)] max-[700px]:bottom-[12px] max-[700px]:left-[12px] max-[700px]:gap-[6px] max-[700px]:rounded-[12px] max-[700px]:p-[7px]">
        <button
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-black text-slate-900 transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)] ${
            lang === "th" ? "bg-[#bfe0ff]" : "bg-[#e6f2ff]"
          } max-[700px]:rounded-[10px] max-[700px]:px-[10px] max-[700px]:py-[8px] max-[700px]:text-[13px]`}
          onClick={() => setLang("th")}
          type="button"
        >
          {t.langTh}
        </button>
        <button
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-black text-slate-900 transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)] ${
            lang === "ms" ? "bg-[#bfe0ff]" : "bg-[#e6f2ff]"
          } max-[700px]:rounded-[10px] max-[700px]:px-[10px] max-[700px]:py-[8px] max-[700px]:text-[13px]`}
          onClick={() => setLang("ms")}
          type="button"
        >
          {t.langMs}
        </button>
        <button
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-black text-slate-900 transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)] ${
            lang === "en" ? "bg-[#bfe0ff]" : "bg-[#e6f2ff]"
          } max-[700px]:rounded-[10px] max-[700px]:px-[10px] max-[700px]:py-[8px] max-[700px]:text-[13px]`}
          onClick={() => setLang("en")}
          type="button"
        >
          {t.langEn}
        </button>
      </div>

      <div className="absolute bottom-[18px] right-[18px] z-20 flex items-center gap-3 max-[700px]:bottom-[12px] max-[700px]:right-[12px] max-[700px]:gap-2">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[700px]:rounded-[12px] max-[700px]:px-[10px] max-[700px]:py-[10px] max-[700px]:text-[15px]"
          type="button"
          onClick={() => navigate(BACK_PATH)}
        >
          « {t.back}
        </button>
        <button
          className="rounded-[18px] bg-[linear-gradient(135deg,#ef4444,#b91c1c)] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[700px]:rounded-[12px] max-[700px]:px-[12px] max-[700px]:py-[10px] max-[700px]:text-[15px]"
          type="button"
          onClick={() => navigate(ACTION_PATH)}
        >
          {t.next} »
        </button>
      </div>
    </div>
  );
}
