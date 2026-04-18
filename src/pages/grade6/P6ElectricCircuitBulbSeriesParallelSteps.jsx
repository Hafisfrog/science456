import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const LANGS = [{ id: "th" }, { id: "en" }, { id: "ms" }];

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

export default function P6ElectricCircuitBulbSeriesParallelSteps() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TRANSLATIONS[lang] ?? TRANSLATIONS.th, [lang]);
  const speechLang = useMemo(() => SPEECH_LANGUAGES[lang] ?? "th-TH", [lang]);
  const handleSpeak = useCallback((text) => speak(text, speechLang), [speechLang]);

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-5 pt-3 text-slate-900 md:px-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(110px,10vw,180px)] top-[10px] h-[clamp(96px,10vw,136px)] w-[clamp(60px,6vw,92px)] bg-[#f7bd2b]"
        style={{
          clipPath: "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.15))",
        }}
      />

      <div className="relative z-[1] mx-auto flex min-h-[calc(100vh-170px)] w-full max-w-[1380px] items-center">
        <div className="relative w-full min-h-0 overflow-hidden rounded-[30px] bg-[#e5f3ff] px-[clamp(16px,1.8vw,26px)] py-[clamp(18px,2vw,28px)] shadow-[0_22px_40px_rgba(17,24,39,0.18)]">
          <h1 className="m-0 pb-3 text-left text-[clamp(34px,2.5vw,54px)] font-black leading-[1.08] text-slate-900">
            {t.stepsHeading}
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              {t.steps.map((step, index) => (
                <div
                  key={`${step.title}-${index}`}
                  className="flex items-center gap-4 rounded-[999px] border-[3px] border-slate-900 bg-white px-5 py-3 shadow-[0_18px_28px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
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
                    className="grid h-[52px] w-[52px] place-items-center rounded-full border border-slate-300 bg-[#fff2dc] text-slate-800 shadow-[0_8px_16px_rgba(17,24,39,0.16)] transition hover:-translate-y-0.5 hover:bg-white"
                    aria-label={`${t.sound} ${index + 1}`}
                    title={t.sound}
                  >
                    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className="h-6 w-6">
                      <path
                        d="M12 26h12l14-10v32l-14-10H12z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                      <path d="M44 22c4 4 4 16 0 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      <path d="M50 16c7 7 7 25 0 32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
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
              type="button"
            >
              {t.lang[item.id]}
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
