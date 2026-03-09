import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CONTENT = {
  th: {
    grade: "ชั้นประถมศึกษาปีที่ 6",
    title: "แรงไฟฟ้าน่ารู้",
    section: "จุดประสงค์การเรียนรู้",
    obj1: "อธิบายการเกิดแรงไฟฟ้าได้ (K)",
    obj2: "สังเกตและอธิบายผลของแรงไฟฟ้าได้ (K, P)",
    back: "← ",
    next: " →",
  },
  en: {
    grade: "Grade 6",
    title: "Electric Force Basics",
    section: "Learning Objectives",
    obj1: "Explain how electric force is generated. (K)",
    obj2: "Observe and explain the effects of electric force. (K, P)",
    back: "← Back",
    next: "Go to Vocabulary →",
  },
  ms: {
    grade: "Tahun 6",
    title: "Daya Elektrik",
    section: "Objektif Pembelajaran",
    obj1: "Menerangkan bagaimana daya elektrik terhasil. (K)",
    obj2: "Memerhati dan menerangkan kesan daya elektrik. (K, P)",
    back: "← Kembali",
    next: "Pergi Kosa Kata →",
  },
};

export default function P6ElectricObjectives() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [lang, setLang] = useState("th");
  const t = CONTENT[lang];
  const isIconNav = t.back.trim() === "←" && t.next.trim() === "→";
  const isUnitFlow = pathname === "/p6/electric-force" || pathname.startsWith("/p6/electric-force/");
  const backPath = isUnitFlow ? "/p6" : "/p6/electric-force/experiments";
  const nextPath = isUnitFlow ? "/p6/electric-force/vocab" : "/p6/experiment/electric-generation/vocab";
  const languageLabels = { th: "Thai", en: "English", ms: "Malay" };

  return (
    <div
      className="min-h-screen overflow-hidden px-4 py-5 text-slate-900 md:px-6"
      style={{
        fontFamily: "Prompt, sans-serif",
        background:
          "radial-gradient(80% 58% at 50% 34%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-4 flex justify-start">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 p-2 shadow">
            <button className={`rounded-xl px-4 py-2 font-semibold ${lang === "th" ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-700"}`} onClick={() => setLang("th")} type="button">
              {languageLabels.th}
            </button>
            <button className={`rounded-xl px-4 py-2 font-semibold ${lang === "en" ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-700"}`} onClick={() => setLang("en")} type="button">
              {languageLabels.en}
            </button>
            <button className={`rounded-xl px-4 py-2 font-semibold ${lang === "ms" ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-700"}`} onClick={() => setLang("ms")} type="button">
              {languageLabels.ms}
            </button>
          </div>
        </div>

        <div className="mb-4 text-center">
          <div className="mb-3 inline-flex rounded-2xl bg-white/80 px-6 py-2 text-3xl font-extrabold text-blue-800 shadow">{t.grade}</div>
          <h1 className="m-0 text-[clamp(44px,5vw,76px)] font-black leading-none text-slate-900">{t.title}</h1>
        </div>

        <div className="mx-auto max-w-[980px] rounded-[32px] bg-white/90 p-5 shadow-lg">
          <div className="mb-4 inline-flex rounded-2xl bg-blue-600 px-5 py-3 text-2xl font-extrabold text-white shadow">{t.section}</div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-3xl border-4 border-sky-200 bg-slate-100 px-4 py-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-4xl font-black text-white">1</div>
              <div className="text-3xl font-bold leading-snug">{t.obj1}</div>
            </div>
            <div className="flex items-center gap-4 rounded-3xl border-4 border-sky-200 bg-slate-100 px-4 py-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-4xl font-black text-white">2</div>
              <div className="text-3xl font-bold leading-snug">{t.obj2}</div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-6 md:right-6">
          <button
            className={`inline-flex h-14 items-center justify-center rounded-2xl px-5 text-2xl font-bold shadow ${isIconNav ? "w-14 bg-white text-slate-700" : "bg-white text-slate-700"}`}
            onClick={() => navigate(backPath)}
            type="button"
          >
            {isIconNav ? "←" : t.back}
          </button>
          <button
            className={`inline-flex h-14 items-center justify-center rounded-2xl px-5 text-2xl font-bold text-white shadow ${isIconNav ? "w-14 bg-blue-600" : "bg-blue-600"}`}
            onClick={() => navigate(nextPath)}
            type="button"
          >
            {isIconNav ? "→" : t.next}
          </button>
        </div>
      </div>
    </div>
  );
}
