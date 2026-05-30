import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";

const TRANSLATIONS = {
  th: {
    stepsHeading: "ขั้นตอนการทดลอง",
    back: "ย้อนกลับ",
    next: "ต่อไป",
    sound: "เปิดเสียง",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
    steps: [
      {
        title: "ออกแบบและต่อวงจร",
        detail: "ต่อถ่านไฟฉาย 2 ก้อนแบบอนุกรม แล้วเชื่อมกับหลอดไฟและสวิตช์ให้ครบวงจร",
      },
      {
        title: "ทดลองและสังเกต",
        detail: "เปิดสวิตช์ สังเกตความสว่างของหลอดไฟ และเปรียบเทียบผล",
      },
      {
        title: "ทดลองซ้ำ",
        detail: "เปลี่ยนเป็นต่อถ่าน 4 ก้อน แล้วสังเกตความสว่างอีกครั้ง",
      },
      {
        title: "บันทึกผล",
        detail: "จดบันทึกสิ่งที่สังเกตได้และสรุปความสัมพันธ์ของจำนวนถ่านกับความสว่าง",
      },
    ],
  },
  en: {
    stepsHeading: "Experiment Steps",
    back: "Back",
    next: "Next",
    sound: "Sound",
    lang: { th: "Thai", en: "English", ms: "Malay" },
    steps: [
      {
        title: "Design and build the circuit",
        detail: "Connect two batteries in series, then link to the bulb and switch to complete the circuit.",
      },
      {
        title: "Test and observe",
        detail: "Turn on the switch, observe bulb brightness, and compare.",
      },
      {
        title: "Test again",
        detail: "Use four batteries, reconnect, and observe brightness again.",
      },
      {
        title: "Record results",
        detail: "Write your observations and relate battery count to brightness.",
      },
    ],
  },
  ms: {
    stepsHeading: "Langkah eksperimen",
    back: "Kembali",
    next: "Seterusnya",
    sound: "Bunyi",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
    steps: [
      {
        title: "Reka dan bina litar",
        detail: "Sambungkan 2 bateri secara siri lalu hubungkan ke mentol dan suis hingga lengkap.",
      },
      {
        title: "Uji dan perhati",
        detail: "Hidupkan suis, perhatikan kecerahan mentol dan bandingkan.",
      },
      {
        title: "Uji lagi",
        detail: "Guna 4 bateri, sambung semula dan perhatikan kecerahan sekali lagi.",
      },
      {
        title: "Catat hasil",
        detail: "Catat pemerhatian dan hubungkan bilangan bateri dengan kecerahan.",
      },
    ],
  },
};

const LANGS = [
  { id: "th", label: "ไทย" },
    { id: "ms", label: "มลายู" },
  { id: "en", label: "อังกฤษ" },
];

const SPEECH_LANGUAGES = {
  th: "th-TH",
  en: "en-US",
  ms: "ms-MY",
};

function speak(text, lang = "th-TH") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.98;
  window.speechSynthesis.speak(u);
}

function Spark({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bg-[#ffc333] ${className}`}
      style={{
        clipPath:
          "polygon(50% 0, 62% 36%, 100% 50%, 62% 64%, 50% 100%, 38% 64%, 0 50%, 38% 36%)",
      }}
    />
  );
}

export default function P6ElectricCircuitBulbSeriesParallelSteps() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TRANSLATIONS[lang] ?? TRANSLATIONS.th, [lang]);
  const speechLang = useMemo(() => SPEECH_LANGUAGES[lang] ?? "th-TH", [lang]);
  const handleSpeak = useCallback((text) => speak(text, speechLang), [speechLang]);

  const pageBg = {
    background:
      "radial-gradient(46% 27% at 8% 41%, #cdebf4 0 61%, transparent 62%), radial-gradient(40% 26% at 94% 42%, #cdebf4 0 60%, transparent 61%), radial-gradient(72% 35% at 50% 33%, #f7f0ef 0 63%, transparent 64%), radial-gradient(80% 50% at 50% 75%, #f7f0ef 0 62%, transparent 63%), linear-gradient(180deg, #fbf5f2 0%, #fbf5f2 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-5 pt-8 text-slate-900 md:px-8 md:pt-20"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <HomeButton />

      <div className="pointer-events-none absolute left-[-92px] top-[24%] z-0 h-[310px] w-[255px] rotate-[-10deg] rounded-[52%_52%_46%_46%] border-[7px] border-black bg-[#fff773] shadow-[inset_24px_22px_0_rgba(255,255,255,.48)] max-[900px]:left-[-150px]">
        <div className="absolute bottom-[-38px] left-[40px] h-[70px] w-[82px] rotate-[12deg] rounded-[14px] border-[7px] border-black bg-[#111]" />
        <div className="absolute bottom-[-4px] left-[56px] h-[84px] w-[54px] rotate-[18deg] rounded-[10px] border-[5px] border-black bg-[#fff7a3]" />
        <div className="absolute left-[102px] top-[76px] h-[126px] w-[98px] rounded-[50%] border-[4px] border-slate-500/35" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(70px,14vw,290px)] top-[-20px] z-0 h-[clamp(150px,18vw,270px)] w-[clamp(82px,9vw,150px)] bg-[#ffc84b] max-[700px]:opacity-55"
        style={{
          clipPath:
            "polygon(0 0,44% 0,68% 36%,93% 9%,100% 39%,78% 54%,100% 100%,57% 54%,38% 70%)",
          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.15))",
        }}
      />
      <Spark className="right-[10%] top-[16%] z-0 h-11 w-11 max-[760px]:hidden" />
      <Spark className="right-[22%] top-[17%] z-0 h-12 w-12 max-[760px]:hidden" />
      <Spark className="right-[18%] top-[25%] z-0 h-5 w-5 max-[760px]:hidden" />
      <div className="pointer-events-none absolute left-[6%] bottom-[20%] z-0 text-[92px] leading-none opacity-75 max-[900px]:hidden">
        🧲
      </div>

      <div className="relative z-[1] mx-auto flex min-h-[calc(100vh-170px)] w-full max-w-[1380px] items-center">
        <div className="relative w-full min-h-0 overflow-hidden rounded-[30px] border border-[#eadfce] bg-[#fffaf3]/90 px-[clamp(16px,1.8vw,26px)] py-[clamp(18px,2vw,28px)] shadow-[0_18px_34px_rgba(92,72,49,0.12)] backdrop-blur-[1px]">
          <h1 className="m-0 pb-3 text-left text-[clamp(34px,2.5vw,54px)] font-black leading-[1.08] text-slate-900">
            {t.stepsHeading}
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              {t.steps.map((step, index) => (
                <div
                  key={`${step.title}-${index}`}
                  className="flex items-center gap-4 rounded-[999px] border-[3px] border-[#26324a] bg-white/95 px-5 py-3 shadow-[0_14px_28px_rgba(92,72,49,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_32px_rgba(92,72,49,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  <div className="flex flex-1 items-center gap-4">
                    <div className="grid h-[56px] w-[56px] place-items-center rounded-full bg-gradient-to-br from-[#f8d67b] to-[#e3a92a] text-[30px] font-black text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.16),0_10px_26px_rgba(12,13,71,0.2)]">
                      {index + 1}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[clamp(20px,1.6vw,26px)] font-black text-slate-900">{step.title}</p>
                      <p className="text-[clamp(14px,1vw,18px)] font-semibold text-slate-700">{step.detail}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSpeak(`${index + 1}. ${step.title}. ${step.detail}`)}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl text-orange-700 shadow transition hover:scale-105"
                    aria-label={`${t.sound} ${index + 1}`}
                    title={t.sound}
                  >
                    {"🔊"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
        <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
          {LANGS.map((item) => (
            <button
              key={item.id}
              onClick={() => setLang(item.id)}
              className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold text-slate-900 transition ${
                lang === item.id
                  ? "bg-[#bfe0ff] text-slate-900"
                  : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
              }`}
              title={item.label}
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
          onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          &laquo; {t.back}
        </button>
        <button
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/sim")}
          type="button"
          aria-label={t.next}
          title={t.next}
        >
          {t.next} &raquo;
        </button>
      </div>
    </div>
  );
}
