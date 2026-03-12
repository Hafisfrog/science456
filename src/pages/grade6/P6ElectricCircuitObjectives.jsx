
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CONTENT = {
  th: {
    grade: "ชั้นประถมศึกษาปีที่ 6",
    title: "วงจรไฟฟ้าใกล้ตัว",
    section: "จุดประสงค์การเรียนรู้",
    obj1: "อธิบายส่วนประกอบของวงจรไฟฟ้าอย่างง่ายได้ (K)",
    obj2: "ต่อวงจรไฟฟ้าอย่างง่าย และตรวจสอบวงจรเปิด-ปิดได้ (K, P)",
    back: "← กลับหน้าเลือกบทเรียน",
    next: "ไปคำศัพท์ →",
  },
  en: {
    grade: "Grade 6",
    title: "Everyday Electric Circuits",
    section: "Learning Objectives",
    obj1: "Describe the components of a simple electric circuit. (K)",
    obj2: "Build a simple circuit and identify open/closed circuits. (K, P)",
    back: "← Back to Unit Select",
    next: "Go to Vocabulary →",
  },
  ms: {
    grade: "Tahun 6",
    title: "Litar Elektrik Sekeliling Kita",
    section: "Objektif Pembelajaran",
    obj1: "Menerangkan komponen litar elektrik yang ringkas. (K)",
    obj2: "Membina litar ringkas dan mengenal pasti litar terbuka/tertutup. (K, P)",
    back: "← Kembali Pilih Unit",
    next: "Pergi ke Kosa Kata →",
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

  const pageBg = {
    background:
      "radial-gradient(80% 58% at 50% 34%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="min-h-screen overflow-hidden px-4 py-5 text-slate-900 md:px-6"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="mx-auto max-w-[1200px]">

        {/* HEADER */}
        <div className="mb-4 text-center">
          <div className="mb-3 inline-flex rounded-2xl bg-white/80 px-6 py-2 text-3xl font-extrabold text-blue-800 shadow">
            {t.grade}
          </div>

          <h1 className="text-[clamp(44px,5vw,76px)] font-black">
            {t.title}
          </h1>
        </div>

        {/* OBJECTIVES */}
        <div className="mx-auto max-w-[980px] rounded-[32px] bg-white/90 p-5 shadow-lg">

          <div className="mb-4 inline-flex rounded-2xl bg-blue-600 px-5 py-3 text-2xl font-extrabold text-white shadow">
            {t.section}
          </div>

          <div className="space-y-4">

            {/* OBJECTIVE 1 */}
            <div className="flex items-center gap-4 rounded-3xl border-4 border-sky-200 bg-slate-100 px-4 py-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-4xl font-black text-white">
                1
              </div>

              <div className="flex flex-1 items-center justify-between gap-3">

                <div className="text-3xl font-bold leading-snug">
                  {t.obj1}
                </div>

                <button
                  onClick={() => speakText(t.obj1, speechLang)}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl text-orange-700 shadow hover:scale-105"
                >
                  🔊
                </button>

              </div>

            </div>

            {/* OBJECTIVE 2 */}
            <div className="flex items-center gap-4 rounded-3xl border-4 border-sky-200 bg-slate-100 px-4 py-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-4xl font-black text-white">
                2
              </div>

              <div className="flex flex-1 items-center justify-between gap-3">

                <div className="text-3xl font-bold leading-snug">
                  {t.obj2}
                </div>

                <button
                  onClick={() => speakText(t.obj2, speechLang)}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl text-orange-700 shadow hover:scale-105"
                >
                  🔊
                </button>

              </div>

            </div>

          </div>
        </div>

        {/* LANGUAGE (เหมือนหน้าก่อน) */}
        <div className="fixed bottom-3 left-3 z-20 flex gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow">

          {LANGUAGE_OPTIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => setLang(item.id)}
              className={`rounded-xl px-4 py-2 font-bold ${
                lang === item.id
                  ? "bg-blue-500 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {item.label}
            </button>
          ))}

        </div>

        {/* NAVIGATION */}
        <div className="fixed bottom-3 right-3 flex gap-3">

          <button
            className="h-14 rounded-2xl bg-white px-5 text-2xl font-bold shadow"
            onClick={() => navigate("/p6")}
          >
            {t.back}
          </button>

          <button
            className="h-14 rounded-2xl bg-blue-600 px-5 text-2xl font-bold text-white shadow"
            onClick={() => navigate("/p6/electric-circuit/vocab")}
          >
            {t.next}
          </button>

        </div>

      </div>
    </div>
  );
}
