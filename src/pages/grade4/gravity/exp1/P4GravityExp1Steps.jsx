import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";

export default function P4GravityExp1Steps() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");

  const BACK_PATH = "/p4/gravity/exp1/materials";
  const NEXT_PATH = "/p4/gravity/exp1/question";

  const speakingRef = useRef(false);

  const text = useMemo(() => {
    return {
      th: {
        topic: "การทดลองที่ 1 เรื่อง ผลของแรงโน้มถ่วง",
        label: "ขั้นตอนการทดลอง",
        step1: "เลือกวัตถุทดลอง",
        step2: "วางวัตถุบนแท่นวางวัตถุ",
        step3: "กดปล่อยวัตถุและสังเกตการตก",
        step4: "ปรับความสูงแล้วทดลองซ้ำ",
        back: "ย้อนกลับ",
        next: "ต่อไป",
        speak: "ฟัง",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
      },
      en: {
        topic: "Experiment 1: Effect of Gravity",
        label: "Experiment Steps",
        step1: "Choose the object",
        step2: "Place the object on the platform",
        step3: "Release the object and observe the fall",
        step4: "Change the height and repeat the experiment",
        back: "Back",
        next: "Next",
        speak: "Listen",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
      },
      ms: {
        topic: "Eksperimen 1: Kesan Graviti",
        label: "Langkah Eksperimen",
        step1: "Pilih objek",
        step2: "Letakkan objek di atas platform",
        step3: "Lepaskan objek dan perhatikan kejatuhan",
        step4: "Ubah ketinggian dan ulangi eksperimen",
        back: "Kembali",
        next: "Seterusnya",
        speak: "Dengar",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
      },
    };
  }, []);

  const t = text[lang];

  const speak = (msg) => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();

      const u = new SpeechSynthesisUtterance(msg);
      u.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      u.onstart = () => (speakingRef.current = true);
      u.onend = () => (speakingRef.current = false);
      u.onerror = () => (speakingRef.current = false);
      window.speechSynthesis.speak(u);
    } catch {
      // ignore
    }
  };

  const steps = [
    { n: 1, text: t.step1 },
    { n: 2, text: t.step2 },
    { n: 3, text: t.step3 },
    { n: 4, text: t.step4 },
  ];

  return (
    <div className="relative min-h-[100dvh] w-screen overflow-x-hidden overflow-y-auto bg-[#eef2ff] pb-[110px] font-['Prompt',sans-serif]">
      <HomeButton />

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
                src="/images/p4/exp2/nr-man.png"
                alt="character"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-[18px] left-[18px] z-[25] flex flex-wrap items-center gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_18px_40px_rgba(0,0,0,.22)] max-[640px]:left-[12px] max-[640px]:right-[12px] max-[640px]:bottom-[72px] max-[640px]:justify-center max-[640px]:gap-[8px]">
        <div className="flex flex-wrap gap-[10px]">
          <button
            className={`cursor-pointer rounded-[14px] px-[18px] py-[10px] text-[16px] font-black text-slate-900 transition hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)] max-[640px]:flex-1 max-[640px]:min-w-0 max-[640px]:px-[12px] max-[640px]:text-[14px] ${
              lang === "th" ? "bg-[#bfe0ff]" : "bg-[#e6f2ff]"
            }`}
            onClick={() => setLang("th")}
            type="button"
          >
            {t.chipTh}
          </button>
          <button
            className={`cursor-pointer rounded-[14px] px-[18px] py-[10px] text-[16px] font-black text-slate-900 transition hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)] max-[640px]:flex-1 max-[640px]:min-w-0 max-[640px]:px-[12px] max-[640px]:text-[14px] ${
              lang === "ms" ? "bg-[#bfe0ff]" : "bg-[#e6f2ff]"
            }`}
            onClick={() => setLang("ms")}
            type="button"
          >
            {t.chipMs}
          </button>
          <button
            className={`cursor-pointer rounded-[14px] px-[18px] py-[10px] text-[16px] font-black text-slate-900 transition hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)] max-[640px]:flex-1 max-[640px]:min-w-0 max-[640px]:px-[12px] max-[640px]:text-[14px] ${
              lang === "en" ? "bg-[#bfe0ff]" : "bg-[#e6f2ff]"
            }`}
            onClick={() => setLang("en")}
            type="button"
          >
            {t.chipEn}
          </button>
        </div>

        <div className="fixed bottom-[18px] right-[18px] z-[25] flex items-center gap-3 max-[640px]:left-[12px] max-[640px]:right-[12px] max-[640px]:bottom-[12px] max-[640px]:gap-[8px]">
          <button
            className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[640px]:flex-1 max-[640px]:rounded-[16px] max-[640px]:px-[16px] max-[640px]:py-[12px] max-[640px]:text-[18px]"
            type="button"
            onClick={() => navigate(BACK_PATH)}
          >
            « {t.back}
          </button>
          <button
            className="rounded-[18px] bg-[linear-gradient(135deg,#ef4444,#b91c1c)] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[640px]:flex-1 max-[640px]:rounded-[16px] max-[640px]:px-[16px] max-[640px]:py-[12px] max-[640px]:text-[18px]"
            type="button"
            onClick={() => navigate(NEXT_PATH)}
          >
            {t.next} »
          </button>
        </div>
      </div>
    </div>
  );
}
