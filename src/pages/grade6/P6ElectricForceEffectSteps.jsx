import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";

const LANGUAGE_OPTIONS = [
  { id: "th", speechLang: "th-TH", label: "ไทย" },
    { id: "ms", speechLang: "ms-MY", label: "มลายู" },
  { id: "en", speechLang: "en-US", label: "อังกฤษ" },
];

const CONTENT = {
  th: {
    heading: "ขั้นตอนการทดลอง",
    hint: "",
    steps: [
      "ถูลูกโป่ง 2 ใบ ด้วยกระดาษเยื่อ",
      "วางลูกโป่งลูกหนึ่งบนฝาขวด นำลูกโป่งอีกลูกหนึ่งเข้าใกล้ลูกโป่งที่อยู่บนฝาขวด",
      "ถูลูกโป่ง 1 ใบ ด้วยกระดาษเยื่อ และอีกลูกไม่ต้องถู",
      "เปลี่ยนวัตถุแล้วทำตามขั้นตอนเหมือนเดิมตั้งแต่แรก",
      "สังเกตผล",
    ],
    back: "ย้อนกลับ",
    next: "ต่อไป",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    heading: "Experiment Steps",
    // hint: "Press the speaker to hear",
    steps: [
      "Rub 2 balloons with tissue paper.",
      "Place one balloon on a bottle cap and bring another balloon close to it.",
      "Rub only one balloon with tissue paper, and leave the other balloon unrubbed.",
      "Change the object and repeat the same steps from the beginning.",
      "Observe the results.",
    ],
    back: "Back",
    next: "Next",
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    heading: "Langkoh Kajiye",
    // hint: "Tekan pembesar suara",
    steps: [
      "Gesek  duwo biji  buwoh gelemong ngan kertah tisu.",
      "Letok sebiji buwoh gelemong atah tudung botol, amek sebiji buwoh gelemong hok lain mari letok dekak ngan buwoh gelemong hok duk atah tudung botol.",
      "Gesek sebiji buwoh gelemong ngan kertah tisu dan sebiji lagi tak keno gesek.",
      "Tukar beno, lepahtu buwak ikut langkoh serupo dengan pertamo.",
      "Perati hasil.",
    ],
    back: "Pusing semula",
    next: "Teruh",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

function Spark({ className }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bg-[#ffc84b] ${className}`}
      style={{
        clipPath:
          "polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)",
      }}
    />
  );
}

export default function P6ElectricForceEffectSteps() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");

  const t = CONTENT[language] ?? CONTENT.th;
  const speechLang = LANGUAGE_OPTIONS.find((item) => item.id === language)?.speechLang ?? "th-TH";
  const steps = useMemo(() => t.steps, [t.steps]);

  const speakStep = useCallback(
    (stepText) => {
      speakText(stepText, speechLang);
    },
    [speechLang],
  );

  const pageBg = {
    background:
      "radial-gradient(46% 27% at 8% 41%, #cdebf4 0 61%, transparent 62%), radial-gradient(40% 26% at 94% 42%, #cdebf4 0 60%, transparent 61%), radial-gradient(72% 35% at 50% 33%, #f7f0ef 0 63%, transparent 64%), radial-gradient(80% 50% at 50% 75%, #f7f0ef 0 62%, transparent 63%), linear-gradient(180deg, #fbf5f2 0%, #fbf5f2 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden px-[clamp(14px,2vw,24px)] pb-[clamp(16px,2.2vw,24px)] pt-[clamp(35px,5.5vw,75px)]"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <HomeButton />

      <div className="pointer-events-none absolute left-[-92px] top-[24%] h-[310px] w-[255px] rotate-[-10deg] rounded-[52%_52%_46%_46%] border-[7px] border-black bg-[#fff773] shadow-[inset_24px_22px_0_rgba(255,255,255,.48)] max-[900px]:left-[-150px]">
        <div className="absolute bottom-[-38px] left-[40px] h-[70px] w-[82px] rotate-[12deg] rounded-[14px] border-[7px] border-black bg-[#111]" />
        <div className="absolute bottom-[-4px] left-[56px] h-[84px] w-[54px] rotate-[18deg] rounded-[10px] border-[5px] border-black bg-[#fff7a3]" />
        <div className="absolute left-[102px] top-[76px] h-[126px] w-[98px] rounded-[50%] border-[4px] border-slate-500/35" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(70px,14vw,290px)] top-[-20px] h-[clamp(150px,18vw,270px)] w-[clamp(82px,9vw,150px)] bg-[#ffc84b] max-[700px]:opacity-55"
        style={{
          clipPath:
            "polygon(0 0,44% 0,68% 36%,93% 9%,100% 39%,78% 54%,100% 100%,57% 54%,38% 70%)",
        }}
      />
      <Spark className="right-[10%] top-[16%] h-11 w-11 max-[760px]:hidden" />
      <Spark className="right-[22%] top-[17%] h-12 w-12 max-[760px]:hidden" />
      <Spark className="right-[18%] top-[25%] h-5 w-5 max-[760px]:hidden" />
      <div className="pointer-events-none absolute left-[6%] bottom-[20%] text-[92px] leading-none opacity-75 max-[900px]:hidden">
        🧲
      </div>

      <div className="relative z-10 mx-auto max-w-[1260px]">
        <section className="rounded-3xl bg-[#e6f3ff] p-5 shadow-lg">
          <div className="text-[clamp(30px,3vw,44px)] font-black">{t.heading}</div>
          {t.hint ? <div className="mb-4 text-lg font-bold text-slate-600">{t.hint}</div> : null}

          <div className="grid gap-3">
            {steps.map((text, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-full border-2 border-black bg-white px-4 py-2.5 shadow"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-yellow-400 text-[34px] leading-none font-black text-white">
                  {idx + 1}
                </span>

                <span className="flex-1 text-[clamp(16px,1.6vw,24px)] font-bold">{text}</span>

                <button
                  onClick={() => speakStep(text)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-lg text-orange-700 shadow transition hover:scale-105"
                  type="button"
                  aria-label={text}
                  title={text}
                >
                  🔊
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
          <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
            {LANGUAGE_OPTIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => setLanguage(item.id)}
                className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold text-slate-900 transition ${
                  language === item.id
                    ? "bg-[#bfe0ff] text-slate-900"
                    : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
                }`}
                type="button"
              >
                <span className="notranslate" translate="no">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-7 md:right-7">
          <button
            className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
            onClick={() => navigate("/p6/experiment/electric-force-effect")}
            type="button"
            aria-label={t.back}
            title={t.back}
          >
            &laquo; {t.back}
          </button>

          <button
            className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
            onClick={() => navigate("/p6/experiment/electric-force-effect/sim")}
            type="button"
            aria-label={t.next}
            title={t.next}
          >
            {t.next} &raquo;
          </button>
        </div>
      </div>
    </div>
  );
}
