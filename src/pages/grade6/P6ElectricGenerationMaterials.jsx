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
  { id: "cloth", image: "/images/p6/equipment/cloth-real.svg" },
  { id: "paper", image: "/images/p6/equipment/paper-bits-real.svg" },
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
    <div className="w-[240px] shrink-0 transition hover:scale-105">

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

      {/* TEXT + SPEAKER */}
      <div className="mt-4 flex items-center justify-center gap-3">

        <p className="text-[clamp(28px,3vw,42px)] font-bold text-slate-900 whitespace-nowrap">
          {label}
        </p>

        <button
          onClick={speak}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-700 shadow hover:scale-105 transition"
        >
          🔊
        </button>

      </div>
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
  const backLabel = "ย้อนกลับ";
  const nextLabel = "ขั้นตอน";

  const from = searchParams.get("from");

  const backPath =
    from === "unit"
      ? "/p6/electric-force/experiments"
      : "/p6/experiment/electric-generation/vocab";

  const nextPath =
    from === "unit"
      ? "/p6/experiment/electric-generation/steps?from=unit"
      : "/p6/experiment/electric-generation/steps";

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
      <div className="relative z-10 mx-auto w-full max-w-[1220px]">

        <h1 className="text-center text-[52px] font-bold text-black">
          {t.title}
        </h1>

        <h2 className="mt-8 text-[64px] font-bold">
          {t.equipment}
        </h2>

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

      {/* Language */}
     <div className="fixed bottom-3 left-3 flex gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_10px_22px_rgba(0,0,0,0.12)]">

        <button
          onClick={() => setLang("th")}
          className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
            lang === "th" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
          }`}
        >
          ไทย
        </button>

        <button
          onClick={() => setLang("en")}
          className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
            lang === "en" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
          }`}
        >
          English
        </button>

        <button
          onClick={() => setLang("ms")}
          className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
            lang === "ms" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
          }`}
        >
          Melayu
        </button>

      </div>

      {/* Navigation */}
      <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3">

        <button
          className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-white px-4 py-3 text-slate-900 shadow"
          onClick={() => navigate(backPath)}
          type="button"
          aria-label={backLabel}
        >
          <span className="text-[28px] leading-none">&lt;&lt;</span>
          <span className="text-sm font-black leading-none">{backLabel}</span>
        </button>

        <button
          className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-blue-600 px-4 py-3 text-white shadow"
          onClick={() => navigate(nextPath)}
          type="button"
          aria-label={nextLabel}
        >
          <span className="text-sm font-black leading-none">{nextLabel}</span>
          <span className="text-[28px] leading-none">&gt;&gt;</span>
        </button>

      </div>
    </div>
  );
}
