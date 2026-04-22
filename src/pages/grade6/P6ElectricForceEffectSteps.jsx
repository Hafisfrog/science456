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
    hint: "Press the speaker to hear",
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
    heading: "Langkah Eksperimen",
    hint: "Tekan pembesar suara",
    steps: [
      "Gosok 2 belon dengan kertas tisu.",
      "Letakkan satu belon di atas penutup botol dan dekatkan satu lagi belon.",
      "Gosok hanya satu belon, dan satu lagi tidak digosok.",
      "Tukar objek dan ulang langkah yang sama dari awal.",
      "Perhatikan hasil.",
    ],
    back: "Kembali",
    next: "Seterusnya",
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
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden px-[clamp(14px,2vw,24px)] pb-[clamp(16px,2.2vw,24px)] pt-[clamp(35px,5.5vw,75px)]"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <HomeButton />

      <div className="mx-auto max-w-[1260px]">
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
