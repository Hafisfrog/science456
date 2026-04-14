import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CONTENT = {
  th: {
    title: "วงจรไฟฟ้าใกล้ตัว",
    section: "จุดประสงค์การเรียนรู้",
    obj1: "อธิบายส่วนประกอบของวงจรไฟฟ้าอย่างง่ายได้",
    obj2: "ต่อวงจรไฟฟ้าอย่างง่าย และตรวจสอบวงจรเปิด-ปิดได้",
    back: "ย้อนกลับ",
    next: "ไปต่อ",
  },
  en: {
    title: "Everyday Electric Circuits",
    section: "Learning Objectives",
    obj1: "Describe the components of a simple electric circuit. (K)",
    obj2: "Build a simple circuit and identify open/closed circuits. (K, P)",
    back: "Back",
    next: "Next",
  },
  ms: {
    title: "Litar Elektrik Sekeliling Kita",
    section: "Objektif Pembelajaran",
    obj1: "Menerangkan komponen litar elektrik yang ringkas. (K)",
    obj2: "Membina litar ringkas dan mengenal pasti litar terbuka/tertutup. (K, P)",
    back: "Kembali",
    next: "Seterusnya",
  },
};

const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย", speechLang: "th-TH" },
  { id: "en", label: "อังกฤษ", speechLang: "en-US" },
  { id: "ms", label: "มลายู", speechLang: "ms-MY" },
];

function speakText(text, lang) {
  if (!text || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.95;

  window.speechSynthesis.speak(utter);
}

export default function P6ElectricCircuitObjectives() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");

  const t = CONTENT[lang];
  const speechLang =
    LANGUAGE_OPTIONS.find((item) => item.id === lang)?.speechLang || "th-TH";

  const pageBg = {
    background:
      "radial-gradient(80% 58% at 50% 34%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="relative h-[100svh] overflow-hidden px-4 pb-6 pt-7 text-slate-900 md:px-6 md:pb-8 md:pt-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(120px,11vw,190px)] top-3 h-[clamp(108px,11vw,150px)] w-[clamp(70px,7vw,102px)] bg-[#f7bd2b]"
        style={{
          clipPath:
            "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-col">
        <div className="mb-4 text-center">
          <h1 className="text-4xl font-extrabold text-blue-600 md:text-[72px]">
            {t.title}
          </h1>
        </div>

        <section className="mx-auto mt-2 flex w-full flex-1 items-center justify-center">
          <div className="w-full max-w-[1120px] rounded-[32px] bg-white/90 p-5 shadow-lg">
            <div className="mb-4 inline-flex rounded-2xl bg-blue-600 px-5 py-3 text-2xl font-extrabold text-white shadow">
              {t.section}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-3xl border-4 border-sky-200 bg-slate-100 px-4 py-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-4xl font-black text-white">
                  1
                </div>

                <div className="flex flex-1 items-center justify-between gap-3">
                  <div className="text-3xl font-bold leading-snug">{t.obj1}</div>

                  <button
                    onClick={() => speakText(t.obj1, speechLang)}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl text-orange-700 shadow transition hover:scale-105"
                    type="button"
                  >
                    🔊
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-3xl border-4 border-sky-200 bg-slate-100 px-4 py-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-4xl font-black text-white">
                  2
                </div>

                <div className="flex flex-1 items-center justify-between gap-3">
                  <div className="text-3xl font-bold leading-snug">{t.obj2}</div>

                  <button
                    onClick={() => speakText(t.obj2, speechLang)}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl text-orange-700 shadow transition hover:scale-105"
                    type="button"
                  >
                    🔊
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-6 left-6 z-20 inline-flex gap-2 rounded-[20px] bg-white/95 px-3 py-[10px] shadow-[0_18px_40px_rgba(111,144,186,0.2)]">
        {LANGUAGE_OPTIONS.map((item) => (
          <button
            key={item.id}
            onClick={() => setLang(item.id)}
            className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
              lang === item.id
                ? "bg-[#bdd9f8]"
                : "bg-[#eaf3ff]"
            }`}
            title={item.label}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="fixed bottom-6 right-6 z-20 flex items-center gap-3">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-white/90 px-[18px] py-[14px] font-black text-[#213a8f] shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
          onClick={() => navigate("/p6")}
          type="button"
        >
          <span className="text-[20px] leading-none">&laquo;</span>
          <span className="text-[20px] leading-none">{t.back}</span>
        </button>

        <button
          className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-[#2563eb] px-[18px] py-[14px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
          onClick={() => navigate("/p6/electric-circuit/vocab")}
          type="button"
        >
          <span className="text-[20px] leading-none">{t.next}</span>
          <span className="text-[20px] leading-none">&raquo;</span>
        </button>
      </div>
    </div>
  );
}
