import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

/* ---------------- LANGUAGE ---------------- */

const LANG = {
  th: {
    title: "การทดลองที่ 9 เรื่อง การเกิดแรงไฟฟ้า",
    equipment: "อุปกรณ์",
    balloon: "ลูกโป่ง",
    cloth: "ผ้าแห้ง",
    paper: "เศษกระดาษ",
  },
  en: {
    title: "Experiment 9: Electric Force Generation",
    equipment: "Equipment",
    balloon: "Balloon",
    cloth: "Dry Cloth",
    paper: "Paper Bits",
  },
  ms: {
    title: "Eksperimen 9: Penghasilan Daya Elektrik",
    equipment: "Peralatan",
    balloon: "Belon",
    cloth: "Kain Kering",
    paper: "Kertas Kecil",
  },
};

/* ---------------- EQUIPMENT ---------------- */

const EQUIPMENT_ITEMS = [
  { id: "balloon", image: "/images/p6/equipment/balloons-real.svg" },
  { id: "cloth", image: "/images/p6/equipment/markers-real.svg" },
  { id: "paper", image: "/images/p6/equipment/tissue-real.svg" },
];

/* ---------------- SPEECH FUNCTION ---------------- */

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window))
    return;

  const synth = window.speechSynthesis;

  synth.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.9;

  const voices = synth.getVoices();

  const voice =
    voices.find((v) => v.lang === lang) ||
    voices.find((v) => v.lang.startsWith(lang.split("-")[0]));

  if (voice) utter.voice = voice;

  synth.speak(utter);
}

/* ---------------- EQUIPMENT CARD ---------------- */

function EquipmentCard({ item, label, lang, failed, onError }) {
  const speak = () => {
    const langMap = {
      th: "th-TH",
      en: "en-US",
      ms: "ms-MY",
    };

    speakText(label, langMap[lang]);
  };

  return (
    <div
      className="w-[240px] shrink-0 cursor-pointer transition hover:scale-105"
      onClick={speak}
    >
      <div className="relative flex h-[240px] items-center justify-center rounded-sm border-[4px] border-[#2d356e] bg-[#e1cbab] p-3 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.6)]">

        <span className="absolute left-[6px] top-[6px] h-7 w-7 border-[3px] border-[#2d356e]" />
        <span className="absolute right-[6px] top-[6px] h-7 w-7 border-[3px] border-[#2d356e]" />
        <span className="absolute bottom-[6px] left-[6px] h-7 w-7 border-[3px] border-[#2d356e]" />
        <span className="absolute bottom-[6px] right-[6px] h-7 w-7 border-[3px] border-[#2d356e]" />

        {failed ? (
          <div className="text-center text-lg font-bold text-slate-600">
            Image error
          </div>
        ) : (
          <img
            src={item.image}
            alt={label}
            className="max-h-[170px] max-w-[170px] object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.2)]"
            onError={onError}
          />
        )}
      </div>

      <p className="mt-4 text-center text-[42px] font-bold text-slate-900">
        {label}
      </p>
    </div>
  );
}

/* ---------------- MAIN PAGE ---------------- */

export default function P6ElectricGenerationMaterials() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [lang, setLang] = useState("th");
  const [broken, setBroken] = useState({});

  const t = LANG[lang];

  const from = searchParams.get("from");

  const backPath =
    from === "unit"
      ? "/p6/electric-force/vocab"
      : "/p6/experiment/electric-generation/vocab";

  const nextPath =
    from === "unit"
      ? "/p6/experiment/electric-generation/steps?from=unit"
      : "/p6/experiment/electric-generation/steps";

  /* โหลดเสียง */
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const loadVoices = () => window.speechSynthesis.getVoices();

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const pageBg = {
    background:
      "radial-gradient(80% 58% at 50% 36%, #f5efef 0 62%, transparent 63%), radial-gradient(30% 22% at 12% 35%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 88% 35%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #b9d8e9 0%, #c7deeb 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden px-6 pb-24 pt-6"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      {/* Header */}
      <div className="relative z-10 mx-auto w-full max-w-[1220px]">

        <h1 className="text-center text-[52px] font-bold text-black">
          {t.title}
        </h1>

        <h2 className="mt-8 text-[64px] font-bold">{t.equipment}</h2>

        {/* Equipment */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-16 gap-y-8">
          {EQUIPMENT_ITEMS.map((item) => (
            <EquipmentCard
              key={item.id}
              item={item}
              label={t[item.id]}
              lang={lang}
              failed={Boolean(broken[item.id])}
              onError={() =>
                setBroken((prev) => ({ ...prev, [item.id]: true }))
              }
            />
          ))}
        </div>
      </div>

      {/* Language Button */}
      <div className="fixed bottom-6 left-6 z-20 flex gap-3 rounded-2xl bg-white p-2 shadow-lg">

        <button
          onClick={() => setLang("th")}
          className={`px-4 py-2 rounded-xl font-bold ${
            lang === "th" ? "bg-sky-500 text-white" : "bg-sky-100"
          }`}
        >
          ไทย
        </button>

        <button
          onClick={() => setLang("en")}
          className={`px-4 py-2 rounded-xl font-bold ${
            lang === "en" ? "bg-sky-500 text-white" : "bg-sky-100"
          }`}
        >
          English
        </button>

        <button
          onClick={() => setLang("ms")}
          className={`px-4 py-2 rounded-xl font-bold ${
            lang === "ms" ? "bg-sky-500 text-white" : "bg-sky-100"
          }`}
        >
          Melayu
        </button>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3">

        <button
          className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-[28px] font-black text-slate-900 shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
          onClick={() => navigate(backPath)}
        >
          ←
        </button>

        <button
          className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-blue-600 text-[28px] font-black text-white shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
          onClick={() => navigate(nextPath)}
        >
          →
        </button>

      </div>
    </div>
  );
}