import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const TRANSLATIONS = {
  th: {
    badge: "วงจรไฟฟ้าใกล้ตัว",
    title: "การต่อหลอดไฟฟ้าแบบอนุกรมและแบบขนาน",
    stepsHeading: "ขั้นตอนการทดลอง",
    stepsSub: "กดที่ขั้นตอนเพื่อฟังเสียง",
    summary: "เปรียบเทียบผลการทดลองแบบอนุกรมและแบบขนาน แล้วสรุปความแตกต่าง",
    back: "ย้อนกลับ",
    next: "ไปต่อ",
    sound: "เปิดเสียง",
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
    badge: "Electricity Around You",
    title: "Connecting Bulbs in Series and Parallel",
    stepsHeading: "Experiment Steps",
    stepsSub: "Tap a step to hear it",
    summary: "Compare the series and parallel results, then summarize the differences.",
    back: "Back",
    next: "Next",
    sound: "Sound",
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
    badge: "Litar elektrik dekat kita",
    title: "Sambungan mentol siri dan selari",
    stepsHeading: "Langkah eksperimen",
    stepsSub: "Tekan setiap langkah untuk dengar",
    summary: "Bandingkan keputusan siri dan selari kemudian rumuskan perbezaannya.",
    back: "Kembali",
    next: "Seterusnya",
    sound: "Bunyi",
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

function speak(text) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "th-TH";
  u.rate = 0.98;
  window.speechSynthesis.speak(u);
}

export default function P6ElectricCircuitBulbSeriesParallelSteps() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TRANSLATIONS[lang] ?? TRANSLATIONS.th, [lang]);
  const handleSpeak = useCallback((text) => speak(text), []);

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

      <div className="relative z-[1] mx-auto grid h-full w-full max-w-[1380px] grid-rows-[auto_auto_1fr_auto] gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex w-fit items-center rounded-full bg-gradient-to-br from-[#6bc3f0] to-[#4c9ee1] px-[18px] py-2 text-base font-black text-white shadow-[0_12px_22px_rgba(16,24,39,0.14)]">
            {t.badge}
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 shadow-[0_12px_24px_rgba(0,0,0,0.12)] ring-2 ring-white/85 backdrop-blur-md">
            {["th", "en", "ms"].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                className={`rounded-full px-4 py-2 text-[15px] font-black transition ${
                  lang === code
                    ? "bg-blue-600 text-white shadow-[0_8px_16px_rgba(37,99,235,0.35)]"
                    : "text-slate-800 hover:bg-white"
                }`}
              >
                {code === "th" ? "ไทย" : code === "en" ? "English" : "Melayu"}
              </button>
            ))}
          </div>
        </div>
        <div className="m-0 text-[clamp(32px,2.5vw,54px)] font-black leading-[1.08]">
          {t.title}
        </div>

        <div className="relative min-h-0 overflow-y-auto rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] px-[clamp(14px,1.6vw,20px)] pb-[14px] pt-[14px] pr-[clamp(68px,10vw,116px)] shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <div className="pointer-events-none absolute bottom-[-120px] right-[-100px] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.3),rgba(255,255,255,0))]" />

          <div
            className="absolute right-[22px] top-3 grid h-[52px] w-[52px] place-items-center rounded-2xl border-2 border-slate-900/40 bg-white/75 text-slate-800 shadow-[0_10px_18px_rgba(17,24,39,0.16)]"
            title={t.sound}
            aria-hidden="true"
          >
            <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
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
          </div>

          <section className="grid h-full min-h-0 grid-cols-1 gap-[14px]">
            <div className="rounded-[26px] border-2 border-white/75 bg-[#e8dcc5] px-[clamp(14px,1.6vw,20px)] py-[clamp(14px,1.6vw,20px)] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.9)]">
              <header className="mb-3 flex flex-col gap-1">
                <div className="text-[clamp(30px,2.4vw,44px)] font-black leading-tight">{t.stepsHeading}</div>
                <div className="text-[clamp(14px,1vw,18px)] font-bold text-slate-700">{t.stepsSub}</div>
              </header>

              <div className="grid gap-3.5">
                {t.steps.map((step, index) => (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => handleSpeak(`${index + 1} ${step.title} ${step.detail}`)}
                    className="grid grid-cols-[64px_1fr] items-center gap-3 rounded-[18px] border-[3px] border-slate-700 bg-white px-3.5 py-3 text-left shadow-[0_10px_16px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_20px_rgba(0,0,0,0.18)]"
                  >
                    <div className="grid h-[58px] w-[58px] place-items-center rounded-[16px] bg-amber-300 text-[32px] font-black text-slate-900 shadow-[inset_0_-4px_0_rgba(0,0,0,0.12),0_10px_14px_rgba(0,0,0,0.18)]">
                      {index + 1}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-[clamp(20px,1.6vw,26px)] font-black">{step.title}</div>
                      <div className="text-[clamp(15px,1.1vw,20px)] font-semibold text-slate-900">{step.detail}</div>
                    </div>
                  </button>
                ))}

                <div className="mt-1 rounded-[14px] border border-dashed border-slate-900/20 bg-white/85 px-3 py-2.5 text-sm font-bold text-slate-900">
                  {t.summary}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-1 flex flex-nowrap justify-end gap-2">
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-[28px] font-black leading-none text-slate-900 shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
            onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel")}
            type="button"
            aria-label={t.back}
            title={t.back}
          >
            ←
          </button>
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-blue-600 text-[28px] font-black leading-none text-white shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
            onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/sim")}
            type="button"
            aria-label={t.next}
            title={t.next}
          >
            →
          </button>
        </div>
      </div>

      <div className="pointer-events-auto fixed left-4 bottom-4 z-20 max-sm:left-3 max-sm:bottom-3">
        <div className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 shadow-[0_14px_26px_rgba(0,0,0,0.14)] ring-2 ring-white/85 backdrop-blur-md">
          {["th", "en", "ms"].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              className={`rounded-full px-4 py-2 text-[15px] font-black transition ${
                lang === code
                  ? "bg-blue-600 text-white shadow-[0_8px_16px_rgba(37,99,235,0.35)]"
                  : "text-slate-800 hover:bg-white"
              }`}
            >
              {code === "th" ? "ไทย" : code === "en" ? "English" : "Melayu"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
