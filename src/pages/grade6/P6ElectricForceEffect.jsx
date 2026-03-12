import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LANG = {
  th: {
    title: "การทดลองที่ 10 เรื่อง ผลของแรงไฟฟ้า",
    equipment: "อุปกรณ์",
    hint: "กดที่อุปกรณ์เพื่อฟังชื่อ",
    balloons: "ลูกโป่งที่เป่าให้พอง 2 ลูก",
    markers: "ปากกาเมจิก 2 ด้าม",
    tissue: "กระดาษเยื่อ",
    back: "กลับหน้าเลือกการทดลอง",
    next: "ไปหน้าถัดไป",
  },
  en: {
    title: "Experiment 10: Effects of Electric Force",
    equipment: "Equipment",
    hint: "Tap an item to hear its name",
    balloons: "2 inflated balloons",
    markers: "2 marker pens",
    tissue: "Tissue paper",
    back: "Back to experiment selection",
    next: "Go to next page",
  },
  ms: {
    title: "Eksperimen 10: Kesan Daya Elektrik",
    equipment: "Peralatan",
    hint: "Tekan peralatan untuk dengar nama",
    balloons: "2 belon yang ditiup",
    markers: "2 batang pen marker",
    tissue: "Kertas tisu",
    back: "Kembali ke pilihan eksperimen",
    next: "Pergi ke halaman seterusnya",
  },
};

const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย", speechLang: "th-TH" },
  { id: "en", label: "English", speechLang: "en-US" },
  { id: "ms", label: "Melayu", speechLang: "ms-MY" },
];

const EQUIPMENT_ITEMS = [
  { id: "balloons", image: "/images/p6/equipment/balloons-real.svg" },
  { id: "markers", image: "/images/p6/equipment/markers-real.svg" },
  { id: "tissue", image: "/images/p6/equipment/tissue-real.svg" },
];

function speakText(text, lang) {
  if (!text || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.9;

  window.speechSynthesis.speak(utter);
}

function EquipmentCard({ item, label, lang }) {
  return (
    <div className="flex w-[clamp(220px,22vw,280px)] shrink-0 flex-col items-center">

      <div className="relative flex h-[clamp(190px,24vh,250px)] w-full items-center justify-center rounded-sm border-[4px] border-[#2d356e] bg-[#e1cbab] p-3 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.6)]">

        <span className="absolute left-[6px] top-[6px] h-7 w-7 border-[3px] border-[#2d356e]" />
        <span className="absolute right-[6px] top-[6px] h-7 w-7 border-[3px] border-[#2d356e]" />
        <span className="absolute bottom-[6px] left-[6px] h-7 w-7 border-[3px] border-[#2d356e]" />
        <span className="absolute bottom-[6px] right-[6px] h-7 w-7 border-[3px] border-[#2d356e]" />

        <img
          src={item.image}
          alt={label}
          className="max-h-[72%] max-w-[72%] object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.2)]"
        />
      </div>

      {/* TEXT + SPEAKER */}
      <div className="mt-3 flex items-center justify-center gap-2">

        <p className="text-center text-[clamp(18px,2.2vw,30px)] font-bold text-slate-900">
          {label}
        </p>

        <button
          onClick={() => speakText(label, lang)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-700 shadow hover:scale-105 transition"
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

  const t = LANG[lang];
  const speechLang =
    LANGUAGE_OPTIONS.find((item) => item.id === lang)?.speechLang || "th-TH";

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
      className="h-[100dvh] overflow-hidden px-[clamp(14px,1.6vw,24px)] py-[clamp(12px,1.6vw,20px)]"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="mx-auto flex h-full w-full max-w-[1240px] flex-col">

        <h1 className="text-center text-[clamp(34px,4vw,62px)] font-bold">
          {t.title}
        </h1>

        <div className="flex flex-1 flex-col pt-[20px]">

          <h2 className="text-[clamp(40px,4.2vw,64px)] font-bold">{t.equipment}</h2>

          <p className="mt-2 text-[clamp(16px,1.8vw,24px)] font-bold text-slate-700">
            {t.hint}
          </p>

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

        {/* LANGUAGE BUTTONS */}
        <div className="mt-auto flex items-end justify-between">

          <div className="flex gap-3 rounded-2xl bg-white p-2 shadow-lg">

            {LANGUAGE_OPTIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => setLang(item.id)}
                className={`rounded-xl px-4 py-2 font-bold ${
                  lang === item.id ? "bg-sky-500 text-white" : "bg-sky-100"
                }`}
              >
                {item.label}
              </button>
            ))}

          </div>

          {/* NAVIGATION */}
          <div className="flex gap-3">

            <button
              className="h-16 w-16 rounded-[20px] bg-white text-[28px] font-black shadow"
              onClick={() => navigate("/p6/electric-force/experiments")}
            >
              ←
            </button>

            <button
              className="h-16 w-16 rounded-[20px] bg-blue-600 text-[28px] font-black text-white shadow"
              onClick={() =>
                navigate("/p6/experiment/electric-force-effect/steps")
              }
            >
              →
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}