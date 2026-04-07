import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CONTENT = {
  th: {
    grade: "ชั้นประถมศึกษาปีที่ 6",
    title: "แรงไฟฟ้าน่ารู้",
    section: "จุดประสงค์การเรียนรู้",
    obj1: "อธิบายการเกิดแรงไฟฟ้าได้",
    obj2: "สังเกตและอธิบายผลของแรงไฟฟ้าได้",
    back: "ย้อนกลับ",
    next: "หน้าคำศัพท์",
  },
  en: {
    grade: "Grade 6",
    title: "Electric Force Basics",
    section: "Learning Objectives",
    obj1: "Explain how electric force is generated.",
    obj2: "Observe and explain the effects of electric force.",
    back: "Back",
    next: "Vocabulary",
  },
  ms: {
    grade: "Tahun 6",
    title: "Daya Elektrik",
    section: "Objektif Pembelajaran",
    obj1: "Menerangkan bagaimana daya elektrik terhasil.",
    obj2: "Memerhati dan menerangkan kesan daya elektrik.",
    back: "Kembali",
    next: "Kosa Kata",
  },
};

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;

  const voices = synth.getVoices();
  const voice =
    voices.find((item) => item.lang === lang) ||
    voices.find((item) => item.lang.startsWith(lang.split("-")[0]));

  if (voice) utterance.voice = voice;

  synth.speak(utterance);
}

export default function P6ElectricObjectives() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [lang, setLang] = useState("th");

  const t = CONTENT[lang];
  const isUnitFlow = pathname === "/p6/electric-force" || pathname.startsWith("/p6/electric-force/");
  const backPath = isUnitFlow ? "/p6" : "/p6/electric-force/experiments";
  const nextPath = isUnitFlow ? "/p6/electric-force/vocab" : "/p6/experiment/electric-generation/vocab";
  const langLabels = {
    th: { th: "ไทย", en: "English", ms: "Melayu" },
    en: { th: "Thai", en: "English", ms: "Melayu" },
    ms: { th: "Thai", en: "English", ms: "Melayu" },
  }[lang];

  const speechLang = lang === "th" ? "th-TH" : lang === "en" ? "en-US" : "ms-MY";

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

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
        <div className="mb-4 text-center">
          <div className="mb-3 inline-flex rounded-2xl bg-white/80 px-6 py-2 text-3xl font-extrabold text-blue-800 shadow">
            {t.grade}
          </div>

          <h1 className="text-[clamp(44px,5vw,76px)] font-black leading-none">{t.title}</h1>
        </div>

        <div className="mx-auto max-w-[980px] rounded-[32px] bg-white/90 p-5 shadow-lg">
          <div className="mb-4 inline-flex rounded-2xl bg-blue-600 px-5 py-3 text-2xl font-extrabold text-white shadow">
            {t.section}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 rounded-3xl border-4 border-sky-200 bg-slate-100 px-4 py-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-4xl font-black text-white">
                  1
                </div>

                <div className="text-3xl font-bold leading-snug">{t.obj1}</div>
              </div>

              <button
                onClick={() => speakText(t.obj1, speechLang)}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl text-orange-700 shadow transition hover:scale-105"
                type="button"
              >
                {"\uD83D\uDD0A"}
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-3xl border-4 border-sky-200 bg-slate-100 px-4 py-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-4xl font-black text-white">
                  2
                </div>

                <div className="text-3xl font-bold leading-snug">{t.obj2}</div>
              </div>

              <button
                onClick={() => speakText(t.obj2, speechLang)}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl text-orange-700 shadow transition hover:scale-105"
                type="button"
              >
                {"\uD83D\uDD0A"}
              </button>
            </div>
          </div>
        </div>

        <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-6 md:right-6">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-slate-700 shadow"
            onClick={() => navigate(backPath)}
            type="button"
            aria-label={t.back}
            title={t.back}
          >
            <span className="text-2xl leading-none">&lt;&lt;</span>
            <span className="text-sm font-bold leading-none">{t.back}</span>
          </button>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-white shadow"
            onClick={() => navigate(nextPath)}
            type="button"
            aria-label={t.next}
            title={t.next}
          >
            <span className="text-2xl leading-none">&gt;&gt;</span>
            <span className="text-sm font-bold leading-none">{t.next}</span>
          </button>
        </div>

        <div className="fixed bottom-3 left-3 z-50 flex max-w-[calc(100vw-24px)] flex-wrap items-center gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_10px_22px_rgba(0,0,0,0.12)]">
          <button
            className={`whitespace-nowrap rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
              lang === "th" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
            }`}
            onClick={() => setLang("th")}
          >
            {langLabels.th}
          </button>

          <button
            className={`whitespace-nowrap rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
              lang === "en" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
            }`}
            onClick={() => setLang("en")}
          >
            {langLabels.en}
          </button>

          <button
            className={`whitespace-nowrap rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
              lang === "ms" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
            }`}
            onClick={() => setLang("ms")}
          >
            {langLabels.ms}
          </button>
        </div>
      </div>
    </div>
  );
}
