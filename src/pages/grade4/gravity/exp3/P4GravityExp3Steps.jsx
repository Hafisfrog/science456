import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../exp1/P4GravityExp1Materials.css";

export default function P4GravityExp3Steps() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th"); // th | en | ms

  const BACK_PATH = "/p4/gravity/exp3/materials";
  const NEXT_PATH = "/p4/gravity/exp3/question";

  const assets = useMemo(() => {
    return {
      character: "/images/p4/exp2/nr-man.png",
    };
  }, []);

  // speech
  const speakingRef = useRef(false);
  const speak = (msg) => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(msg);
      u.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      speakingRef.current = true;
      u.onend = () => (speakingRef.current = false);
      window.speechSynthesis.speak(u);
    } catch {
      // ignore
    }
  };

  const text = useMemo(() => {
    return {
      th: {
        topic: "การทดลองที่ 3 เรื่อง แรงดึงดูดของโลกกับแรงดึงดูดของดวงจันทร์",
        label: "ขั้นตอนการทดลอง",
        next: "ต่อไป",
        back: "ย้อนกลับ",

        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        speak: "ฟัง",

        step1: "เลือกวัตถุทดลอง",
        step2: "สังเกตวัตถุที่ชั่งบนโลกกับบนดวงจันทร์",
        step3: "เปลี่ยนชนิดวัตถุและทำการทดลองซ้ำ",
        step4: "บันทึกผลการทดลอง",
      },
      en: {
        topic: "Experiment 3: Earth's Gravity and the Moon's Gravity",
        label: "Experiment Steps",
        next: "Next",
        back: "Back",

        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        speak: "Listen",

        step1: "Choose an object",
        step2: "Observe the object on Earth and on the Moon",
        step3: "Change the object and repeat the experiment",
        step4: "Record the results",
      },
      ms: {
        topic: "Eksperimen 3: Graviti Bumi dan Graviti Bulan",
        label: "Langkah Eksperimen",
        next: "Seterusnya",
        back: "Kembali",

        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        speak: "Dengar",

        step1: "Pilih objek",
        step2: "Perhatikan objek di Bumi dan di Bulan",
        step3: "Tukar objek dan ulang eksperimen",
        step4: "Catat keputusan",
      },
    };
  }, []);

  const t = text[lang];

  const steps = [
    { n: 1, text: t.step1 },
    { n: 2, text: t.step2 },
    { n: 3, text: t.step3 },
    { n: 4, text: t.step4 },
  ];

  return (
    <div className="relative min-h-[100dvh] w-screen overflow-x-hidden overflow-y-auto bg-[#eef2ff] pb-[110px] font-['Prompt',sans-serif]">
      <img
        src="/images/p4/backgrounds-p4.jpg"
        alt="Laboratory background"
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.9]"
      />
      <div className="fixed inset-0 -z-[2] [background:radial-gradient(1000px_650px_at_55%_30%,rgba(255,255,255,.35),rgba(255,255,255,0)_62%),linear-gradient(180deg,rgba(10,16,32,.25),rgba(10,16,32,.72))]" />

      <div className="relative z-[3] mx-auto w-full max-w-[1200px] px-3 pb-4 pt-[18px] min-[641px]:px-5 min-[641px]:pt-[22px]">
        <div className="pointer-events-none flex justify-center">
          <div className="pointer-events-auto w-fit max-w-[calc(100%-76px)] rounded-2xl border-[3px] border-[rgba(0,0,0,.75)] bg-white/95 px-4 py-3 text-center text-[20px] font-black text-slate-900 shadow-[0_18px_40px_rgba(0,0,0,.26)] min-[641px]:max-w-full min-[641px]:px-[22px] min-[641px]:py-[14px] min-[641px]:text-[34px] max-[980px]:text-[28px] max-[640px]:text-[22px]">
            {t.topic}
          </div>
        </div>

        <div className="mt-3 inline-flex rounded-[14px] border-[3px] border-[rgba(0,0,0,.75)] bg-white/95 px-[14px] py-2 text-[20px] font-black text-slate-900 shadow-[0_18px_38px_rgba(0,0,0,.22)] min-[641px]:mt-5 min-[641px]:px-[18px] min-[641px]:py-3 min-[641px]:text-[26px] max-[980px]:text-[22px] max-[640px]:text-[20px]">
          {t.label}
        </div>

        <div className="mt-3 overflow-hidden rounded-[20px] border border-white/20 bg-white/20 shadow-[0_22px_44px_rgba(0,0,0,.30)] backdrop-blur-[10px] min-[641px]:mt-4 min-[641px]:rounded-[26px]">
          <div className="m-3 flex gap-3 rounded-[16px] bg-white/95 p-3 shadow-[inset_0_-6px_0_rgba(0,0,0,.10)] min-[641px]:m-4 min-[641px]:gap-[18px] min-[641px]:rounded-[22px] min-[641px]:p-[18px] max-[980px]:flex-col">
            <div className="flex min-w-0 flex-[1.25] flex-col gap-3 min-[641px]:gap-[18px] min-[641px]:pr-[10px]">
              {steps.map((s) => (
                <div
                  className="flex w-full items-center gap-3 rounded-2xl border border-[rgba(15,23,42,.10)] bg-white/90 px-3 py-[9px] shadow-[0_14px_26px_rgba(0,0,0,.12)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(0,0,0,.16)] min-[641px]:rounded-full min-[641px]:px-4 min-[641px]:py-[10px] min-[641px]:pl-[10px]"
                  key={s.n}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#fbbf24,#f59e0b)] text-[22px] font-black leading-none text-slate-900 shadow-[inset_0_-5px_0_rgba(0,0,0,.12)] min-[641px]:h-14 min-[641px]:w-14 min-[641px]:text-[30px]">
                    {s.n}
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-3">
                    <div className="text-[15px] font-black leading-[1.25] text-gray-900 min-[641px]:text-[clamp(16px,1.25vw,26px)]">
                      {s.text}
                    </div>
                    <button
                      className="h-10 w-10 shrink-0 cursor-pointer rounded-xl bg-[#eef2ff] text-[16px] shadow-[inset_0_-4px_0_rgba(0,0,0,.10),0_14px_22px_rgba(0,0,0,.14)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[inset_0_-4px_0_rgba(0,0,0,.10),0_18px_28px_rgba(0,0,0,.18)] active:translate-y-px min-[641px]:h-[46px] min-[641px]:w-[46px] min-[641px]:rounded-2xl min-[641px]:text-[20px]"
                      type="button"
                      onClick={() => speak(s.text)}
                      title={t.speak}
                    >
                      {"\uD83D\uDD0A"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex min-w-0 flex-[0.55] items-end justify-center p-px max-[980px]:hidden">
              <img
                className="h-auto w-[min(330px,100%)] translate-y-24 select-none [filter:drop-shadow(0_18px_28px_rgba(0,0,0,.22))]"
                src={assets.character}
                alt="character"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-[18px] left-[18px] z-[30] flex items-center gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_18px_40px_rgba(0,0,0,.22)] backdrop-blur-sm max-[720px]:bottom-[12px] max-[720px]:left-[12px] max-[720px]:gap-[6px] max-[720px]:rounded-[12px] max-[720px]:p-[7px]">
        <button
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition ${
            lang === "th"
              ? "bg-[#bfe0ff] text-slate-900"
              : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
          } max-[720px]:rounded-[10px] max-[720px]:px-[10px] max-[720px]:py-[8px] max-[720px]:text-[13px]`}
          onClick={() => setLang("th")}
          type="button"
        >
          {t.chipTh}
        </button>
        <button
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition ${
            lang === "ms"
              ? "bg-[#bfe0ff] text-slate-900"
              : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
          } max-[720px]:rounded-[10px] max-[720px]:px-[10px] max-[720px]:py-[8px] max-[720px]:text-[13px]`}
          onClick={() => setLang("ms")}
          type="button"
        >
          {t.chipMs}
        </button>
        <button
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition ${
            lang === "en"
              ? "bg-[#bfe0ff] text-slate-900"
              : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
          } max-[720px]:rounded-[10px] max-[720px]:px-[10px] max-[720px]:py-[8px] max-[720px]:text-[13px]`}
          onClick={() => setLang("en")}
          type="button"
        >
          {t.chipEn}
        </button>
      </div>

      <div className="fixed bottom-[18px] right-[18px] z-[30] flex items-center gap-3 max-[720px]:bottom-[12px] max-[720px]:right-[12px] max-[720px]:gap-2">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[10px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          type="button"
          onClick={() => navigate(BACK_PATH)}
        >
          « {t.back}
        </button>

        <button
          className="rounded-[18px] bg-[linear-gradient(135deg,#ef4444,#b91c1c)] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[12px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          type="button"
          onClick={() => navigate(NEXT_PATH)}
        >
          {t.next} »
        </button>
      </div>
    </div>
  );
}
