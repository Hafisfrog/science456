import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LANG = {
  th: {
    title: "การทดลองที่ 2 เรื่อง ผลของแรงไฟฟ้า",
    equipment: "วัสดุอุปกรณ์",
    balloons: "ลูกโป่งที่เป่าให้พอง 2 ลูก",
    markers: "ปากกาเมจิก\n2 ด้าม",
    tissue: "กระดาษเยื่อ",
    back: "ย้อนกลับ",
    next: "ต่อไป",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    title: "Experiment 2: Effects of Electric Force",
    equipment: "Materials and Equipment",
    balloons: "2 inflated balloons",
    markers: "2 marker pens",
    tissue: "Tissue paper",
    back: "Back",
    next: "Next",
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    title: "Eksperimen 2: Kesan Daya Elektrik",
    equipment: "Bahan dan Peralatan",
    balloons: "2 belon yang ditiup",
    markers: "2 batang pen marker",
    tissue: "Kertas tisu",
    back: "Kembali",
    next: "Seterusnya",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

const LANGUAGE_OPTIONS = [
  { id: "th", speechLang: "th-TH", label: "ไทย" },
  { id: "ms", speechLang: "ms-MY", label: "มลายู" },
  { id: "en", speechLang: "en-US", label: "อังกฤษ" },
];

const EQUIPMENT_ITEMS = [
  { id: "balloons", image: "/images/p6/equipment/lukpong-cut.png" },
  { id: "markers", image: "/images/p6/kalae.png" },
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
        <p className="whitespace-pre-line text-center text-[clamp(18px,2.2vw,30px)] font-bold text-slate-900">{label}</p>

        <button
          onClick={() => speakText(label, lang)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-700 shadow transition hover:scale-105"
          type="button"
          aria-label={label}
          title={label}
        >
          🔊
        </button>
      </div>
    </div>
  );
}

export default function P6ElectricForceEffect() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");

  const t = LANG[lang] ?? LANG.th;
  const speechLang = LANGUAGE_OPTIONS.find((item) => item.id === lang)?.speechLang ?? "th-TH";

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
        <h1 className="text-center text-[clamp(40px,4.2vw,64px)] font-bold">{t.title}</h1>

        <div className="flex flex-1 flex-col pt-[20px]">
          <h2 className="text-[clamp(34px,4vw,55px)] font-bold">{t.equipment}</h2>

          <div className="flex flex-1 items-center justify-center">
            <div className="flex w-full max-w-[1020px] justify-center gap-[40px]">
              {EQUIPMENT_ITEMS.map((item) => (
                <EquipmentCard key={item.id} item={item} label={t[item.id]} lang={speechLang} />
              ))}
            </div>
          </div>
        </div>

        <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
          <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
            {LANGUAGE_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setLang(option.id)}
                className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold text-slate-900 transition ${
                  lang === option.id
                    ? "bg-[#bfe0ff] text-slate-900"
                    : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
                }`}
                type="button"
              >
                <span className="notranslate" translate="no">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-7 md:right-7">
          <button
            className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
            onClick={() => navigate("/p6/electric-force/experiments")}
            type="button"
            aria-label={t.back}
            title={t.back}
          >
            &laquo; {t.back}
          </button>

          <button
            className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
            onClick={() => navigate("/p6/experiment/electric-force-effect/steps")}
            type="button"
            aria-label={t.next}
            title={t.next}
          >
            {t.next} &raquo;
          </button>
        </div>
      </div>
    </div>
  );
}
