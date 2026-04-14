import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const LANG = {
  th: {
    title: "การทดลองที่ 1 เรื่อง การเกิดแรงไฟฟ้า",
    equipment: "วัสดุอุปกรณ์",
    balloon: "ลูกโป่ง",
    cloth: "ผ้าแห้ง",
    paper: "เศษกระดาษ",
    back: "ย้อนกลับ",
    next: "ต่อไป",
  },
  en: {
    title: "Experiment 1: Electric Force Generation",
    equipment: "Materials and Equipment",
    balloon: "Balloon",
    cloth: "Dry Cloth",
    paper: "Paper Bits",
    back: "Back",
    next: "Next",
  },
  ms: {
    title: "Eksperimen 1: Penghasilan Daya Elektrik",
    equipment: "Bahan dan Peralatan",
    balloon: "Belon",
    cloth: "Kain Kering",
    paper: "Kertas Kecil",
    back: "Kembali",
    next: "Seterusnya",
  },
};

const EQUIPMENT_ITEMS = [
  { id: "balloon", image: "/images/p6/equipment/lukpong-cut.png" },
  { id: "cloth", image: "/images/p6/equipment/pahang-cut.png" },
  { id: "paper", image: "/images/p6/equipment/paper-bits-real.svg" },
];

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;

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
    <div className="w-[250px] shrink-0 transition-transform duration-200 hover:-translate-y-1">
      <div className="relative flex h-[246px] items-center justify-center rounded-[24px] border-[2px] border-[#7587af] bg-[linear-gradient(180deg,#ecdfc3_0%,#dfccaa_100%)] p-4 shadow-[0_12px_20px_rgba(20,33,64,0.2),inset_0_1px_0_rgba(255,255,255,0.72)]">
        <div className="absolute inset-[7px] rounded-[18px] border border-[#f8f0dd]/70" />
        <div className="absolute inset-[7px] rounded-[18px] bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.12),transparent_58%)]" />

        {failed ? (
          <div className="text-center text-lg font-bold text-slate-600">Image error</div>
        ) : (
          <img
            src={item.image}
            alt={label}
            className="max-h-[176px] max-w-[176px] object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.3)]"
            style={{ filter: "contrast(1.08) saturate(1.14)" }}
            onError={onError}
          />
        )}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <p className="whitespace-nowrap text-[clamp(28px,3vw,42px)] font-bold text-slate-900">{label}</p>
        <button
          onClick={speak}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-700 shadow transition hover:scale-105"
          type="button"
        >
          {"\uD83D\uDD0A"}
        </button>
      </div>
    </div>
  );
}

export default function P6ElectricGenerationMaterials() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [lang, setLang] = useState("th");
  const [broken, setBroken] = useState({});

  const t = LANG[lang];
  const langLabels = { th: "ไทย", en: "อังกฤษ", ms: "มลายู" };

  const from = searchParams.get("from");
  const backPath = from === "unit" ? "/p6/electric-force/experiments" : "/p6/experiment/electric-generation/vocab";
  const nextPath =
    from === "unit"
      ? "/p6/experiment/electric-generation/steps?from=unit"
      : "/p6/experiment/electric-generation/steps";

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
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
        <h1 className="text-center text-[52px] font-bold text-black">{t.title}</h1>
        <h2 className="mt-8 text-[64px] font-bold">{t.equipment}</h2>

        <div className="mt-8">
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-8">
            {EQUIPMENT_ITEMS.map((item) => (
              <EquipmentCard
                key={item.id}
                item={item}
                label={t[item.id]}
                lang={lang}
                failed={Boolean(broken[item.id])}
                onError={() => setBroken((prev) => ({ ...prev, [item.id]: true }))}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-20 inline-flex gap-2 rounded-[20px] bg-white/95 px-3 py-[10px] shadow-[0_18px_40px_rgba(111,144,186,0.2)]">
        <button
          onClick={() => setLang("th")}
          className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
            lang === "th" ? "bg-[#bdd9f8]" : "bg-[#eaf3ff]"
          }`}
        >
          {langLabels.th}
        </button>

        <button
          onClick={() => setLang("en")}
          className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
            lang === "en" ? "bg-[#bdd9f8]" : "bg-[#eaf3ff]"
          }`}
        >
          {langLabels.en}
        </button>

        <button
          onClick={() => setLang("ms")}
          className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
            lang === "ms" ? "bg-[#bdd9f8]" : "bg-[#eaf3ff]"
          }`}
        >
          {langLabels.ms}
        </button>
      </div>

      <div className="fixed bottom-6 right-6 z-20 flex items-center gap-3">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-white/90 px-[18px] py-[14px] font-black text-[#213a8f] shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
          onClick={() => navigate(backPath)}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          <span className="text-[20px] leading-none">&laquo;</span>
          <span className="text-[20px] leading-none">{t.back}</span>
        </button>

        <button
          className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-[#2563eb] px-[18px] py-[14px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
          onClick={() => navigate(nextPath)}
          type="button"
          aria-label={t.next}
          title={t.next}
        >
          <span className="text-[20px] leading-none">{t.next}</span>
          <span className="text-[20px] leading-none">&raquo;</span>
        </button>
      </div>
    </div>
  );
}
