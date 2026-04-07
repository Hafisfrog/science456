import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function speakText(text, lang) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.95;

  window.speechSynthesis.speak(utter);
}

const TRANSLATIONS = {
  th: {
    badge: "วงจรไฟฟ้าใกล้ตัว",
    title: "การต่อหลอดไฟฟ้าแบบอนุกรมและแบบขนาน",
    equipmentHeading: "อุปกรณ์",
    back: "ย้อนกลับ",
    next: "ขั้นตอน",
    sound: "เปิดเสียง",
    speech: "th-TH",
    equipment: {
      cell: { title: "ถ่านไฟฉาย", subtitle: "4 ก้อน" },
      wire: { title: "สายไฟพร้อมหัวหนีบ", subtitle: "4 เส้น" },
      holder: { title: "กระบะใส่ถ่านไฟฉาย", subtitle: "สำหรับ 4 ก้อน" },
      bulb: { title: "หลอดไฟพร้อมฐาน", subtitle: "1 ชุด" },
    },
  },
  en: {
    badge: "Electricity Around You",
    title: "Connecting Bulbs in Series and Parallel",
    equipmentHeading: "Equipment to Prepare",
    back: "Back",
    next: "Steps",
    sound: "Sound",
    speech: "en-US",
    equipment: {
      cell: { title: "Battery", subtitle: "4 cells" },
      wire: { title: "Wires with clips", subtitle: "4 wires" },
      holder: { title: "Battery holder", subtitle: "for 4 cells" },
      bulb: { title: "Bulb with base", subtitle: "1 set" },
    },
  },
  ms: {
    badge: "Litar elektrik dekat kita",
    title: "Sambungan mentol siri dan selari",
    equipmentHeading: "Peralatan yang perlu disedia",
    back: "Kembali",
    next: "Langkah",
    sound: "Bunyi",
    speech: "ms-MY",
    equipment: {
      cell: { title: "Bateri", subtitle: "4 biji" },
      wire: { title: "Wayar dengan klip", subtitle: "4 utas" },
      holder: { title: "Bekas bateri", subtitle: "untuk 4 biji" },
      bulb: { title: "Mentol dengan tapak", subtitle: "1 set" },
    },
  },
};

const EQUIPMENT = ["cell", "wire", "holder", "bulb"];

const EQUIPMENT_MEDIA = {
  cell: {
    image: "/images/p6/tanfaichai.jpg",
    fallbackImage: "/images/p6/electric-circuit/batteries.svg",
    imageClassName: "max-w-[116px] min-[1400px]:max-w-[126px]",
  },
  wire: {
    image: "/images/p6/electric-circuit/wire-clips-photo.webp",
    fallbackImage: "/images/p6/electric-circuit/wire-clips.svg",
    imageClassName: "max-w-[122px] min-[1400px]:max-w-[134px]",
  },
  holder: {
    image: "/images/p6/electric-circuit/battery-holder-photo.webp",
    fallbackImage: "/images/p6/electric-circuit/battery-holder.svg",
    imageClassName: "max-w-[132px] min-[1400px]:max-w-[144px]",
  },
  bulb: {
    image: "/images/p6/electric-circuit/bulb-base-photo.webp",
    fallbackImage: "/images/p6/electric-circuit/bulb-base.svg",
    imageClassName: "max-w-[98px] min-[1400px]:max-w-[108px]",
  },
};

function handleEquipmentImageError(event, fallbackImage, onImageError) {
  if (fallbackImage && event.currentTarget.dataset.fallbackApplied !== "true") {
    event.currentTarget.dataset.fallbackApplied = "true";
    event.currentTarget.src = fallbackImage;
    return;
  }

  onImageError();
}

export default function P6ElectricCircuitBulbSeriesParallel() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const [brokenImages, setBrokenImages] = useState({});
  const t = useMemo(() => TRANSLATIONS[lang] ?? TRANSLATIONS.th, [lang]);
  const langLabels = {
    th: { th: "ไทย", en: "English", ms: "Melayu" },
    en: { th: "Thai", en: "English", ms: "Melayu" },
    ms: { th: "Thai", en: "English", ms: "Melayu" },
  }[lang];
  const markImageBroken = useCallback((id) => {
    setBrokenImages((current) =>
      current[id] ? current : { ...current, [id]: true }
    );
  }, []);

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden px-4 pb-6 pt-4 text-slate-900 md:px-8"
      style={pageBg}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(110px,10vw,180px)] top-[10px] z-0 h-[clamp(96px,10vw,136px)] w-[clamp(60px,6vw,92px)] bg-[#f7bd2b]"
        style={{
          clipPath: "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.15))",
        }}
      />

      <div className="relative z-[1] mx-auto flex max-w-[1380px] flex-col gap-3">
        <div className="inline-flex w-fit items-center rounded-full bg-gradient-to-br from-[#6bc3f0] to-[#4c9ee1] px-[18px] py-2 text-base font-black text-white shadow-[0_12px_22px_rgba(16,24,39,0.14)]">
          {t.badge}
        </div>
        <div className="m-0 text-[clamp(32px,2.5vw,54px)] font-black leading-[1.08]">
          {t.title}
        </div>

        <div className="rounded-[34px] bg-sky-200 p-6 shadow-[0_18px_32px_rgba(15,23,42,0.08)]">
          <div className="mb-4 inline-flex items-center gap-2.5 rounded-full bg-blue-600/15 px-4 py-1.5 font-black text-slate-900">
            {t.equipmentHeading}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {EQUIPMENT.map((id) => (
              <div
                key={id}
                className="group relative flex flex-col items-center gap-3 rounded-[28px] border-[3px] border-white/80 bg-white/95 px-4 py-5 text-center shadow-[0_16px_28px_rgba(15,23,42,0.14)] transition duration-150 hover:-translate-y-1 hover:shadow-[0_20px_32px_rgba(15,23,42,0.18)]"
              >
                <div className="grid h-[134px] w-[134px] place-items-center rounded-[26px] border-4 border-[#ddecf7] bg-[linear-gradient(180deg,#ffffff_0%,#f6fbff_100%)] p-3 shadow-[inset_0_6px_12px_rgba(255,255,255,0.55),0_12px_18px_rgba(17,24,39,0.14)]">
                  {brokenImages[id] ? (
                    <div className="text-sm font-bold text-slate-500">
                      Image unavailable
                    </div>
                  ) : (
                    <img
                      src={EQUIPMENT_MEDIA[id].image}
                      alt={t.equipment[id].title}
                      data-fallback-applied="false"
                      className={`h-auto max-h-[102px] w-full object-contain ${EQUIPMENT_MEDIA[id].imageClassName}`}
                      onError={(event) =>
                        handleEquipmentImageError(
                          event,
                          EQUIPMENT_MEDIA[id].fallbackImage,
                          () => markImageBroken(id)
                        )
                      }
                    />
                  )}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="text-[20px] font-black leading-tight text-slate-900">{t.equipment[id].title}</div>
                  <button
                    type="button"
                    onClick={() =>
                      speakText(`${t.equipment[id].title} ${t.equipment[id].subtitle}`, t.speech)
                    }
                    className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-orange-50 text-slate-700 shadow-[0_8px_14px_rgba(17,24,39,0.08)] transition hover:-translate-y-0.5 hover:bg-white"
                    aria-label={`${t.sound} ${t.equipment[id].title}`}
                    title={t.sound}
                  >
                    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className="h-5 w-5">
                      <path
                        d="M12 26h12l14-10v32l-14-10H12z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                      <path d="M44 22c4 4 4 16 0 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      <path d="M50 16c7 7 7 25 0 32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <div className="text-[16px] font-bold text-slate-700">{t.equipment[id].subtitle}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-auto fixed bottom-3 left-3 z-20 flex gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_10px_22px_rgba(0,0,0,0.12)]">

        <button
          onClick={() => setLang("th")}
          className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
            lang === "th" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
          }`}
        >
          {langLabels.th}
        </button>

        <button
          onClick={() => setLang("en")}
          className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
            lang === "en" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
          }`}
        >
          {langLabels.en}
        </button>

        <button
          onClick={() => setLang("ms")}
          className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
            lang === "ms" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
          }`}
        >
          {langLabels.ms}
        </button>

      </div>

        <div className="fixed bottom-3 right-3 z-20 flex gap-3">
          <button
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-base font-bold text-slate-900 shadow"
            onClick={() => navigate("/p6/electric-circuit/experiments")}
            type="button"
            aria-label={t.back}
            title={t.back}
          >
              <span className="text-xl leading-none">&lt;&lt;</span>
            <span>{t.back}</span>
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-base font-bold text-white shadow"
            onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/steps")}
            type="button"
            aria-label={t.next}
            title={t.next}
          >
            <span>{t.next}</span>
              <span className="text-xl leading-none">&gt;&gt;</span>
          </button>
        </div>
      </div>

     
    </div>
  );
}
