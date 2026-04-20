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
    title: "การทดลองที่ 2 เรื่อง การต่อหลอดไฟฟ้าแบบอนุกรมและแบบขนาน",
    equipmentHeading: "วัสดุอุปกรณ์",
    back: "ย้อนกลับ",
    next: "ต่อไป",
    sound: "เปิดเสียง",
    speech: "th-TH",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
    equipment: {
      cell: { title: "ถ่านไฟฉาย", subtitle: "4 ก้อน" },
      wire: { title: "สายไฟพร้อมหัวหนีบ", subtitle: "4 เส้น" },
      holder: { title: "กระบะใส่ถ่านไฟฉาย", subtitle: "สำหรับ 4 ก้อน" },
      bulb: { title: "หลอดไฟพร้อมฐาน", subtitle: "1 ชุด" },
    },
  },
  en: {
    title: "Experiment 2: Connecting Bulbs in Series and Parallel",
    equipmentHeading: "Materials and Equipment",
    back: "Back",
    next: "Next",
    sound: "Sound",
    speech: "en-US",
    lang: { th: "Thai", en: "English", ms: "Malay" },
    equipment: {
      cell: { title: "Battery", subtitle: "4 cells" },
      wire: { title: "Wires with clips", subtitle: "4 wires" },
      holder: { title: "Battery holder", subtitle: "for 4 cells" },
      bulb: { title: "Bulb with base", subtitle: "1 set" },
    },
  },
  ms: {
    title: "Eksperimen 2: Sambungan Mentol Secara Siri dan Selari",
    equipmentHeading: "Bahan dan Peralatan",
    back: "Kembali",
    next: "Seterusnya",
    sound: "Bunyi",
    speech: "ms-MY",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
    equipment: {
      cell: { title: "Bateri", subtitle: "4 biji" },
      wire: { title: "Wayar dengan klip", subtitle: "4 utas" },
      holder: { title: "Bekas bateri", subtitle: "untuk 4 biji" },
      bulb: { title: "Mentol dengan tapak", subtitle: "1 set" },
    },
  },
};

const LANGS = [
  { id: "th", label: "ไทย" },
  { id: "ms", label: "มลายู" },
    { id: "en", label: "อังกฤษ" },
];

const EQUIPMENT = ["cell", "wire", "holder", "bulb"];

const EQUIPMENT_MEDIA = {
  cell: {
    image: "/images/p6/tanfaichai.jpg",
    fallbackImage: "/images/p6/electric-circuit/batteries.svg",
    imageClassName: "max-w-[116px] min-[1400px]:max-w-[126px]",
  },
  wire: {
    image: "/images/p6/electric-circuit/wire-clips-photo.png",
    fallbackImage: "/images/p6/electric-circuit/wire-clips.svg",
    imageClassName: "max-w-[122px] min-[1400px]:max-w-[134px]",
  },
  holder: {
    image: "/images/p6/kraba.png",
    fallbackImage: "/images/p6/electric-circuit/battery-holder.svg",
    imageClassName: "max-w-[132px] min-[1400px]:max-w-[144px]",
  },
  bulb: {
    image: "/images/p6/lfai.png",
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
        <h1 className="m-0 pb-2 pt-1 text-center text-[clamp(28px,2.2vw,46px)] font-black leading-[1.1] text-slate-900">
          {t.title}
        </h1>

        <div className="rounded-[34px] bg-sky-200 p-6 shadow-[0_18px_32px_rgba(15,23,42,0.08)]">
          <div className="mb-4 mt-1 text-left text-[clamp(24px,1.8vw,34px)] font-black text-slate-900">
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

        <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
          <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
            {LANGS.map((item) => (
              <button
                key={item.id}
                onClick={() => setLang(item.id)}
                className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold text-slate-900 transition ${
                  lang === item.id
                    ? "bg-[#bfe0ff] text-slate-900"
                    : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
                }`}
                title={item.label}
                type="button"
              >
                <span className="notranslate" translate="no">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-7 md:right-7">
          <button
            className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
            onClick={() => navigate("/p6/electric-circuit/experiments")}
            type="button"
            aria-label={t.back}
            title={t.back}
          >
            &laquo; {t.back}
          </button>
          <button
            className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
            onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/steps")}
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
