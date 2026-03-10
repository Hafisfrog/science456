import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function P4GravityExp1Steps() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");

  const BACK_PATH = "/p4/gravity/exp1/materials";
  const NEXT_PATH = "/p4/gravity/exp1/question";

  const speakingRef = useRef(false);

  const text = useMemo(() => {
    return {
      th: {
        topic: "เรื่อง ผลของแรงโน้มถ่วง",
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
        topic: "Effect of Gravity",
        label: "Experiment Steps",
        step1: "Choose the object",
        step2: "Place the object on the platform",
        step3: "Release the object and observe the fall",
        step4: "Change the height and repeat the experiment",
        back: "Back",
        next: "Next",
        speak: "Listen",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
      },
      ms: {
        topic: "Kesan Graviti",
        label: "Langkah Eksperimen",
        step1: "Pilih objek",
        step2: "Letakkan objek di atas platform",
        step3: "Lepaskan objek dan perhatikan kejatuhan",
        step4: "Ubah ketinggian dan ulangi eksperimen",
        back: "Kembali",
        next: "Seterusnya",
        speak: "Dengar",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
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
      <img
        className="fixed inset-0 -z-[3] h-full w-full scale-[1.03] object-cover [filter:blur(2px)_brightness(.88)]"
        src="/images/p4/exp1/bg-lab.jpg"
        alt="bg"
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

            <div className="flex min-w-0 flex-[0.75] items-end justify-center p-px max-[980px]:hidden">
              <img
                className="h-auto w-[min(430px,100%)] translate-y-48 select-none [filter:drop-shadow(0_18px_28px_rgba(0,0,0,.22))]"
                src="/images/p4/exp1/character-boy.png"
                alt="character"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-[10px] left-[10px] right-[10px] z-[25] flex items-center justify-between gap-3 min-[641px]:bottom-[18px] min-[641px]:left-[18px] min-[641px]:right-[18px] max-[640px]:flex-col max-[640px]:items-stretch max-[640px]:gap-[8px]">
        <div className="flex flex-wrap gap-[6px] rounded-[12px] bg-white/90 px-2 py-2 shadow-[0_18px_40px_rgba(0,0,0,.22)] min-[641px]:gap-[10px] min-[641px]:rounded-[18px] min-[641px]:px-3 min-[641px]:py-[10px]">
          <button
            className={`cursor-pointer rounded-[10px] px-[10px] py-[8px] text-[13px] font-black text-slate-900 transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)] min-[641px]:rounded-[14px] min-[641px]:px-[18px] min-[641px]:py-[10px] min-[641px]:text-[16px] ${
              lang === "th" ? "bg-[#bfe0ff]" : "bg-[#e6f2ff]"
            }`}
            onClick={() => setLang("th")}
            type="button"
          >
            {t.chipTh}
          </button>
          <button
            className={`cursor-pointer rounded-[10px] px-[10px] py-[8px] text-[13px] font-black text-slate-900 transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)] min-[641px]:rounded-[14px] min-[641px]:px-[18px] min-[641px]:py-[10px] min-[641px]:text-[16px] ${
              lang === "en" ? "bg-[#bfe0ff]" : "bg-[#e6f2ff]"
            }`}
            onClick={() => setLang("en")}
            type="button"
          >
            {t.chipEn}
          </button>
          <button
            className={`cursor-pointer rounded-[10px] px-[10px] py-[8px] text-[13px] font-black text-slate-900 transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)] min-[641px]:rounded-[14px] min-[641px]:px-[18px] min-[641px]:py-[10px] min-[641px]:text-[16px] ${
              lang === "ms" ? "bg-[#bfe0ff]" : "bg-[#e6f2ff]"
            }`}
            onClick={() => setLang("ms")}
            type="button"
          >
            {t.chipMs}
          </button>
        </div>

        <div className="flex items-center gap-2 max-[640px]:justify-end min-[641px]:gap-3">
          <button
            className="cursor-pointer rounded-xl bg-white/95 px-[12px] py-[10px] text-[14px] font-black text-slate-900 shadow-[0_18px_40px_rgba(0,0,0,.22)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(0,0,0,.26)] active:translate-y-px min-[641px]:rounded-2xl min-[641px]:px-[18px] min-[641px]:py-3 min-[641px]:text-[16px]"
            type="button"
            onClick={() => navigate(BACK_PATH)}
          >
            {"\u2190"} {t.back}
          </button>
          <button
            className="cursor-pointer rounded-xl bg-[linear-gradient(135deg,#ef4444,#b91c1c)] px-[14px] py-[10px] text-[14px] font-black text-white shadow-[0_18px_40px_rgba(0,0,0,.22)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(0,0,0,.26)] active:translate-y-px min-[641px]:rounded-2xl min-[641px]:px-[18px] min-[641px]:py-3 min-[641px]:text-[16px]"
            type="button"
            onClick={() => navigate(NEXT_PATH)}
          >
            {t.next} {"\u00BB"}
          </button>
        </div>
      </div>
    </div>
  );
}
