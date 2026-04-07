import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CONTENT = {
  th: {
    grade: "ชั้นประถมศึกษาปีที่ 6",
    title: "วงจรไฟฟ้าใกล้ตัว",
    section: "จุดประสงค์การเรียนรู้",
    obj1: "อธิบายส่วนประกอบของวงจรไฟฟ้าอย่างง่ายได้",
    obj2: "ต่อวงจรไฟฟ้าอย่างง่าย และตรวจสอบวงจรเปิด-ปิดได้",
    back: "<< กลับหน้าเลือกบทเรียน",
    next: "ไปคำศัพท์ >>",
  },
  en: {
    grade: "Grade 6",
    title: "Everyday Electric Circuits",
    section: "Learning Objectives",
    obj1: "Describe the components of a simple electric circuit. (K)",
    obj2: "Build a simple circuit and identify open/closed circuits. (K, P)",
    back: "<< Back to Unit Select",
    next: "Go to Vocabulary >>",
  },
  ms: {
    grade: "Tahun 6",
    title: "Litar Elektrik Sekeliling Kita",
    section: "Objektif Pembelajaran",
    obj1: "Menerangkan komponen litar elektrik yang ringkas. (K)",
    obj2: "Membina litar ringkas dan mengenal pasti litar terbuka/tertutup. (K, P)",
    back: "<< Kembali Pilih Unit",
    next: "Pergi ke Kosa Kata >>",
  },
};

const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย", speechLang: "th-TH" },
  { id: "en", label: "English", speechLang: "en-US" },
  { id: "ms", label: "Melayu", speechLang: "ms-MY" },
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
  const langLabels = {
    th: { th: "ไทย", en: "English", ms: "Melayu" },
    en: { th: "Thai", en: "English", ms: "Melayu" },
    ms: { th: "Thai", en: "English", ms: "Melayu" },
  }[lang];

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
          <div className="mb-3 inline-flex rounded-2xl bg-white/80 px-6 py-2 text-3xl font-extrabold text-blue-800 shadow">
            {t.grade}
          </div>

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

      <div className="pointer-events-auto fixed bottom-3 left-3 z-20 flex gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_10px_22px_rgba(0,0,0,0.12)]">
        {LANGUAGE_OPTIONS.map((item) => (
          <button
            key={item.id}
            onClick={() => setLang(item.id)}
            className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
              lang === item.id
                ? "bg-[#bae6fd] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
            }`}
            title={langLabels[item.id]}
            type="button"
          >
            {langLabels[item.id]}
          </button>
        ))}
      </div>

      <div className="fixed bottom-3 right-3 z-20 flex gap-3 pointer-events-auto md:bottom-6 md:right-6">
        <button
          className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-base font-bold text-slate-900 shadow"
          onClick={() => navigate("/p6")}
          type="button"
        >
          {t.back}
        </button>

        <button
          className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-base font-bold text-white shadow"
          onClick={() => navigate("/p6/electric-circuit/vocab")}
          type="button"
        >
          {t.next}
        </button>
      </div>
    </div>
  );
}
