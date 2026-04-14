import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LANG = {
  th: {
    title: "การทดลองที่ 2 เรื่อง ผลของแรงไฟฟ้า",
    equipment: "วัสดุอุปกรณ์",
    balloons: "ลูกโป่งที่เป่าให้พอง 2 ลูก",
    markers: "ปากกาเมจิก 2 ด้าม",
    tissue: "กระดาษเยื่อ",
    back: "ย้อนกลับ",
    next: "ต่อไป",
  },
  en: {
    title: "Experiment 2: Effects of Electric Force",
    equipment: "Materials and Equipment",
    balloons: "2 inflated balloons",
    markers: "2 marker pens",
    tissue: "Tissue paper",
    back: "Back",
    next: "Next",
  },
  ms: {
    title: "Eksperimen 2: Kesan Daya Elektrik",
    equipment: "Bahan dan Peralatan",
    balloons: "2 belon yang ditiup",
    markers: "2 batang pen marker",
    tissue: "Kertas tisu",
    back: "Kembali",
    next: "Seterusnya",
  },
};

const LANGUAGE_OPTIONS = [
  { id: "th", speechLang: "th-TH" },
  { id: "en", speechLang: "en-US" },
  { id: "ms", speechLang: "ms-MY" },
];

const EQUIPMENT_ITEMS = [
  { id: "balloons", image: "/images/p6/equipment/lukpong-cut.png" },
  { id: "markers", image: "/images/p6/equipment/markers-real.svg" },
  { id: "tissue", image: "/images/p6/equipment/tissue-real.svg" },
];

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.9;
  window.speechSynthesis.speak(utter);
}

function EquipmentCard({ item, label, lang }) {
  const isBalloons = item.id === "balloons";
  return (
    <div className="flex w-[clamp(220px,22vw,280px)] shrink-0 flex-col items-center">
      <div className="relative flex h-[clamp(190px,24vh,250px)] w-full items-center justify-center rounded-[24px] border-[2px] border-[#7587af] bg-[linear-gradient(180deg,#ecdfc3_0%,#dfccaa_100%)] p-4 shadow-[0_12px_20px_rgba(20,33,64,0.2),inset_0_1px_0_rgba(255,255,255,0.72)]">
        <div className="absolute inset-[7px] rounded-[18px] border border-[#f8f0dd]/70" />
        <div className="absolute inset-[7px] rounded-[18px] bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.12),transparent_58%)]" />

        {isBalloons ? (
          <div className="flex items-end justify-center gap-2">
            {[0, 1].map((idx) => (
              <img
                key={idx}
                src={item.image}
                alt={`${label} ${idx + 1}`}
                className="max-h-[74%] w-[36%] object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.3)]"
                style={{ filter: "contrast(1.08) saturate(1.14)" }}
              />
            ))}
          </div>
        ) : (
          <img
            src={item.image}
            alt={label}
            className="max-h-[74%] max-w-[74%] object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.3)]"
            style={{ filter: "contrast(1.08) saturate(1.14)" }}
          />
        )}
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        <p className="text-center text-[clamp(18px,2.2vw,30px)] font-bold text-slate-900">
          {label}
        </p>

        <button
          onClick={() => speakText(label, lang)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-700 shadow transition hover:scale-105"
          type="button"
          aria-label={label}
          title={label}
        >
          {"\uD83D\uDD0A"}
        </button>
      </div>
    </div>
  );
}

export default function P6ElectricForceEffect() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");

  const t = LANG[lang];
  const langLabels = { th: "ไทย", en: "อังกฤษ", ms: "มลายู" };
  const speechLang = LANGUAGE_OPTIONS.find((item) => item.id === lang)?.speechLang || "th-TH";

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
      className="h-[100dvh] overflow-hidden px-[clamp(14px,1.6vw,24px)] py-[clamp(12px,1.6vw,20px)]"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="mx-auto flex h-full w-full max-w-[1240px] flex-col">
        <h1 className="text-center text-[clamp(34px,4vw,62px)] font-bold">
          {t.title}
        </h1>

        <div className="flex flex-1 flex-col pt-[20px]">
          <h2 className="text-[clamp(40px,4.2vw,64px)] font-bold">
            {t.equipment}
          </h2>

          <div className="flex flex-1 items-center justify-center">
            <div className="flex w-full max-w-[1020px] justify-center gap-[40px]">
              {EQUIPMENT_ITEMS.map((item) => (
                <EquipmentCard
                  key={item.id}
                  item={item}
                  label={t[item.id]}
                  lang={speechLang}
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
            type="button"
          >
            {langLabels.th}
          </button>

          <button
            onClick={() => setLang("en")}
            className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
              lang === "en" ? "bg-[#bdd9f8]" : "bg-[#eaf3ff]"
            }`}
            type="button"
          >
            {langLabels.en}
          </button>

          <button
            onClick={() => setLang("ms")}
            className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
              lang === "ms" ? "bg-[#bdd9f8]" : "bg-[#eaf3ff]"
            }`}
            type="button"
          >
            {langLabels.ms}
          </button>
        </div>

        <div className="fixed bottom-6 right-6 z-20 flex items-center gap-3">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-white/90 px-[18px] py-[14px] font-black text-[#213a8f] shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
            onClick={() => navigate("/p6/electric-force/experiments")}
            type="button"
            aria-label={t.back}
            title={t.back}
          >
            <span className="text-[20px] leading-none">&laquo;</span>
            <span className="text-[20px] leading-none">{t.back}</span>
          </button>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-[#2563eb] px-[18px] py-[14px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
            onClick={() => navigate("/p6/experiment/electric-force-effect/steps")}
            type="button"
            aria-label={t.next}
            title={t.next}
          >
            <span className="text-[20px] leading-none">{t.next}</span>
            <span className="text-[20px] leading-none">&raquo;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
