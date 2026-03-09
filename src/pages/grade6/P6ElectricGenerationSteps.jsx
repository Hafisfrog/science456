import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const LANGS = [
  { id: "th", label: "ไทย", voice: "th-TH" },
  { id: "en", label: "อังกฤษ", voice: "en-US" },
  { id: "ms", label: "มลายู", voice: "ms-MY" },
];

const TEXT = {
  th: {
    title: "การทดลองที่ 9 เรื่อง การเกิดแรงไฟฟ้า",
    heading: "ขั้นตอนการทดลอง",
    steps: ["เลือกวัตถุสำหรับทดลอง", "นำผ้าแห้งมาขัดลูกโป่ง", "สังเกตและบันทึกผล"],
    detail: [
      "ครั้งที่ 1 ไม่ขัดถูด้วยผ้าแห้ง",
      "ครั้งที่ 2 ถูด้วยผ้าแห้ง 2 นาที",
      "ครั้งที่ 3 ขัดถูด้วยผ้าแห้ง 5 นาที",
    ],
    start: "เริ่ม\nการทดลอง",
    readAll: "ฟังทั้งหมด",
  },
  en: {
    title: "Experiment 9: Electric Force Generation",
    heading: "Experiment Steps",
    steps: ["Choose an object for testing", "Rub balloon with dry cloth", "Observe and record"],
    detail: [
      "Round 1: no rubbing with dry cloth",
      "Round 2: rub with dry cloth for 2 minutes",
      "Round 3: rub with dry cloth for 5 minutes",
    ],
    start: "Start\nExperiment",
    readAll: "Read all",
  },
  ms: {
    title: "Eksperimen 9: Pembentukan Daya Elektrik",
    heading: "Langkah Eksperimen",
    steps: ["Pilih objek untuk uji kaji", "Gosok belon dengan kain kering", "Perhati dan catat"],
    detail: [
      "Pusingan 1: tanpa gosokan kain kering",
      "Pusingan 2: gosok 2 minit",
      "Pusingan 3: gosok 5 minit",
    ],
    start: "Mula\nEksperimen",
    readAll: "Baca semua",
  },
};

const DESIGN = { width: 1280, height: 720 };

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

function StepPill({ no, text, onSpeak }) {
  return (
    <button
      type="button"
      onClick={onSpeak}
      className="group flex h-[60px] w-full items-center gap-3 rounded-full border-[3px] border-[#425679] bg-gradient-to-b from-[#f7fbff] to-[#dce5f1] px-3 py-1 text-left shadow-[0_5px_0_#8e9db3,0_14px_18px_rgba(30,41,59,0.16)] transition duration-200 hover:-translate-y-0.5"
    >
      <span className="inline-grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#7ea5ff] to-[#4f79de] text-[33px] font-black leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
        {no}
      </span>
      <span className="text-[24px] font-bold leading-[1.05] text-[#1b2e53]">{text}</span>
    </button>
  );
}

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path d="M4 9H8L13 5V19L8 15H4V9Z" fill="currentColor" />
      <path d="M16 9C17.3 10.1 17.3 13.9 16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18.5 7C20.8 9.2 20.8 14.8 18.5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function P6ElectricGenerationSteps() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [lang, setLang] = useState("th");
  const [viewport, setViewport] = useState(() => ({
    width: typeof window === "undefined" ? DESIGN.width : window.innerWidth,
    height: typeof window === "undefined" ? DESIGN.height : window.innerHeight,
  }));

  const content = TEXT[lang];
  const voice = LANGS.find((x) => x.id === lang)?.voice || "th-TH";

  const from = searchParams.get("from");
  const simPath =
    from === "unit"
      ? "/p6/experiment/electric-generation/sim?from=unit"
      : "/p6/experiment/electric-generation/sim";

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const onResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const readAll = useMemo(() => {
    const details = content.detail.join(" ");
    return `${content.heading} 1. ${content.steps[0]} 2. ${content.steps[1]} ${details} 3. ${content.steps[2]}`;
  }, [content]);

  const scale = Math.max(
    viewport.width / DESIGN.width,
    viewport.height / DESIGN.height,
  );
  const fitScale = Number.isFinite(scale) && scale > 0 ? scale : 1;
  const scaledWidth = DESIGN.width * fitScale;
  const scaledHeight = DESIGN.height * fitScale;
  const offsetX = (viewport.width - scaledWidth) / 2;
  const offsetY = (viewport.height - scaledHeight) / 2;

  return (
    <div
      className="relative h-[100svh] w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 8%, #d9edf8 0%, #c9e2f0 56%, #bdd8e7 100%)",
      }}
    >
      <style>
        {`
          @keyframes p6Float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          @keyframes p6Pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .p6-lightning {
            animation: p6Float 2.9s ease-in-out infinite;
            filter: drop-shadow(0 8px 10px rgba(255, 191, 0, 0.34));
          }
          .p6-play-badge {
            animation: p6Pulse 2.1s ease-in-out infinite;
          }
        `}
      </style>
      <div className="absolute inset-0">
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: DESIGN.width,
            height: DESIGN.height,
            transform: `translate(${offsetX}px, ${offsetY}px) scale(${fitScale})`,
            fontFamily: "Prompt, Noto Sans Thai, sans-serif",
          }}
        >
          <div
            className="relative h-full w-full"
          >
            <div className="relative h-full w-full overflow-hidden border-t-[6px] border-[#2a94cf] bg-[#cae1ee]">
              <div className="absolute left-[60px] top-[42px] h-[606px] w-[1160px] rounded-[50%] bg-[#f4efef]" />
              <div className="absolute left-[72px] top-[92px] h-[74px] w-[1136px] rounded-[38px] bg-[#f4efef]" />
              <div className="absolute left-[170px] top-[188px] h-[80px] w-[948px] rounded-[40px] bg-[#f4efef]" />
              <div className="absolute left-[170px] top-[286px] h-[80px] w-[948px] rounded-[40px] bg-[#f4efef]" />
              <div className="absolute left-[170px] top-[384px] h-[84px] w-[948px] rounded-[42px] bg-[#f4efef]" />
              <div className="absolute right-[32px] top-[12px] h-[170px] w-[330px] rounded-[80px] bg-white/22 blur-[2px]" />

              <div
                aria-hidden="true"
                className="p6-lightning pointer-events-none absolute right-[165px] top-[20px] h-[150px] w-[100px] bg-[#f7bd2b]"
                style={{ clipPath: "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)" }}
              />
              <span className="absolute right-[286px] top-[90px] text-[28px] text-[#f7bd2b]">✦</span>
              <span className="absolute right-[236px] top-[72px] text-[22px] text-[#f7bd2b]">✦</span>

              <span className="pointer-events-none absolute -left-[50px] top-[200px] h-[174px] w-[132px] rounded-[58%_58%_44%_44%/58%_58%_42%_42%] border-[5px] border-slate-900 bg-[#fff3a2]" />
              <span className="pointer-events-none absolute -right-[50px] top-[200px] h-[174px] w-[132px] scale-x-[-1] rounded-[58%_58%_44%_44%/58%_58%_42%_42%] border-[5px] border-slate-900 bg-[#fff3a2]" />

              <h1 className="absolute left-1/2 top-[74px] w-[880px] -translate-x-1/2 text-center text-[42px] font-bold leading-[0.96] text-black [text-shadow:0_2px_0_rgba(255,255,255,0.35)]">
                {content.title}
              </h1>

              <section className="absolute left-[182px] top-[190px] w-[620px]">
                <h2 className="text-[34px] font-bold leading-none text-[#121826]">{content.heading}</h2>

                <div className="mt-8 w-[490px] space-y-4">
                  <StepPill no={1} text={content.steps[0]} onSpeak={() => speakText(content.steps[0], voice)} />
                  <StepPill no={2} text={content.steps[1]} onSpeak={() => speakText(content.steps[1], voice)} />

                  <div className="pl-[74px] text-[22px] font-medium leading-[1.2] text-[#111827]">
                    {content.detail.map((line) => (
                      <p className="m-0" key={line}>
                        {line}
                      </p>
                    ))}
                  </div>

                  <StepPill no={3} text={content.steps[2]} onSpeak={() => speakText(content.steps[2], voice)} />
                </div>
              </section>

              <div className="absolute left-[78px] top-[430px] text-[42px]">🧲</div>
              <div className="absolute bottom-[102px] left-[36px] text-[40px]">☀</div>

              <div className="absolute bottom-[8px] left-[50px] flex gap-8">
                <div className="relative h-[64px] w-[110px]">
                  <div className="absolute left-[8px] top-[4px] h-[24px] w-[94px] skew-x-[-18deg] rounded-[4px] bg-[#3ea35b]" />
                  <div className="absolute left-0 top-[24px] h-[34px] w-[110px] skew-x-[-18deg] rounded-[4px] border-[3px] border-[#2f6ba0] bg-[repeating-linear-gradient(90deg,#6ed0f6_0_18px,#5db6e6_18px_20px)]" />
                </div>
                <div className="h-[34px] w-[128px] skew-x-[-18deg] rounded-[4px] border-[3px] border-[#2f6ba0] bg-[repeating-linear-gradient(90deg,#6ed0f6_0_18px,#5db6e6_18px_20px)]" />
                <div className="h-[34px] w-[128px] skew-x-[-18deg] rounded-[4px] border-[3px] border-[#2f6ba0] bg-[repeating-linear-gradient(90deg,#6ed0f6_0_18px,#5db6e6_18px_20px)]" />
              </div>

              <div className="absolute bottom-[14px] right-[154px] h-[86px] w-[220px]">
                <div className="absolute bottom-0 left-[16px] h-[58px] w-[6px] rounded-full bg-[#4e4e7f]" />
                <div className="absolute bottom-[58px] left-[4px] h-[6px] w-[42px] rounded-full bg-[#4e4e7f]" />
                <div className="absolute bottom-[66px] left-[12px] h-[20px] w-[10px] rounded-full bg-[#4e4e7f]" />
                <div className="absolute bottom-0 left-[126px] h-[46px] w-[5px] rounded-full bg-[#4e4e7f]" />
                <div className="absolute bottom-[46px] left-[114px] h-[5px] w-[34px] rounded-full bg-[#4e4e7f]" />
                <div className="absolute bottom-[54px] left-[120px] h-[16px] w-[8px] rounded-full bg-[#4e4e7f]" />
                <span className="absolute bottom-[52px] left-[38px] h-[2px] w-[90px] origin-left rotate-[10deg] bg-[#6b75b5]" />
                <span className="absolute bottom-[48px] left-[38px] h-[2px] w-[90px] origin-left rotate-[2deg] bg-[#6b75b5]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-[18px] border border-[#6ca9d7]/40 bg-white/92 p-2 shadow-[0_10px_20px_rgba(15,23,42,0.18)] backdrop-blur-[2px]">
        {LANGS.map((x) => (
          <button
            key={x.id}
            className={`rounded-full px-4 py-2 text-[18px] font-bold ${
              lang === x.id
                ? "bg-gradient-to-b from-[#2cb0ff] to-[#178dd4] text-white shadow-[0_4px_10px_rgba(14,116,194,0.35)]"
                : "bg-[#d7edff] text-sky-700"
            }`}
            type="button"
            onClick={() => setLang(x.id)}
          >
            {x.label}
          </button>
        ))}
        <button
          className="inline-grid h-10 w-10 place-items-center rounded-[14px] border border-sky-500/35 bg-gradient-to-b from-[#f8fcff] to-sky-100 text-sky-700 shadow-[0_4px_8px_rgba(23,60,110,0.2)]"
          type="button"
          onClick={() => speakText(readAll, voice)}
          title={content.readAll}
          aria-label={content.readAll}
        >
          <SpeakerIcon />
        </button>
      </div>

      <div className="fixed bottom-4 right-4 z-40">
        <button
          type="button"
          onClick={() => navigate(simPath)}
          className="flex h-[132px] w-[110px] flex-col items-center rounded-[16px] border-2 border-[#5f6785] bg-gradient-to-b from-white to-[#f2f5fb] px-2 py-2 shadow-[0_12px_24px_rgba(20,28,45,0.26)]"
        >
          <span className="p6-play-badge inline-grid h-[56px] w-[56px] place-items-center rounded-full bg-gradient-to-br from-[#c9dcff] to-[#7ea7ef] text-[36px] text-white shadow-[inset_0_0_0_2px_rgba(64,98,170,0.35),0_4px_10px_rgba(72,105,170,0.4)]">
            ▶
          </span>
          <span className="mt-2 whitespace-pre-line text-center text-[18px] font-black leading-[1.02] text-[#101727]">
            {content.start}
          </span>
        </button>
      </div>
    </div>
  );
}
