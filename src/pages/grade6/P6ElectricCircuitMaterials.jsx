import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const EQUIPMENT_MEDIA = {
  cell: {
    image: "/images/p6/tanfaichai.jpg",
    fallbackImage: "/images/p6/electric-circuit/batteries.svg",
    imageClassName: "max-w-[56px] min-[1400px]:max-w-[62px]",
  },
  wire: {
    image: "/images/p6/electric-circuit/wire-clips-photo.png",
    fallbackImage: "/images/p6/electric-circuit/wire-clips.svg",
    imageClassName: "max-w-[122px] min-[1400px]:max-w-[134px]",
  },
  holder: {
    image: "/images/p6/electric-circuit/battery-holder-empty.svg",
    fallbackImage: "/images/p6/electric-circuit/battery-holder.svg",
    imageClassName: "max-w-[132px] min-[1400px]:max-w-[144px]",
  },
  bulb: {
    image: "/images/p6/electric-circuit/bulb-base-photo.webp",
    fallbackImage: "/images/p6/electric-circuit/bulb-base.svg",
    imageClassName: "max-w-[98px] min-[1400px]:max-w-[108px]",
  },
  switch: {
    image: "/images/p6/electric-circuit/switch-photo.webp",
    fallbackImage: "/images/p6/electric-circuit/switch.svg",
    imageClassName: "max-w-[96px] min-[1400px]:max-w-[106px]",
  },
};

const TRANSLATIONS = {
    th: {
    badge: "วงจรไฟฟ้าใกล้ตัว",
    title: "เรื่อง วงจรไฟฟ้าอย่างง่าย",
    equipmentHeading: "อุปกรณ์",
    back: "ย้อนกลับ",
    next: "ขั้นตอน",
    equipment: {
      cell: { title: "ถ่านไฟฉาย", subtitle: "4 ก้อน" },
      wire: { title: "สายไฟพร้อมหัวหนีบ", subtitle: "4 เส้น" },
      holder: { title: "กระบะใส่ถ่านไฟฉาย", subtitle: "สำหรับ 4 ก้อน" },
      bulb: { title: "หลอดไฟพร้อมฐาน", subtitle: "1 ชุด" },
      switch: { title: "สวิตช์", subtitle: "1 อัน" },
    },
  },
  en: {
    badge: "Electricity Around You",
    title: "Simple Electric Circuit",
    equipmentHeading: "Equipment",
    back: "Back",
    next: "Go to steps",
    equipment: {
      cell: { title: "Battery", subtitle: "4 cells" },
      wire: { title: "Wires with clips", subtitle: "4 wires" },
      holder: { title: "Battery holder", subtitle: "for 4 cells" },
      bulb: { title: "Bulb with base", subtitle: "1 set" },
      switch: { title: "Switch", subtitle: "1 pc" },
    },
  },
  ms: {
    badge: "Litar elektrik dekat kita",
    title: "Litar elektrik mudah",
    equipmentHeading: "Peralatan",
    back: "Kembali",
    next: "Pergi ke langkah",
    equipment: {
      cell: { title: "Bateri", subtitle: "4 biji" },
      wire: { title: "Wayar dengan klip", subtitle: "4 utas" },
      holder: { title: "Bekas bateri", subtitle: "untuk 4 biji" },
      bulb: { title: "Mentol dengan tapak", subtitle: "1 set" },
      switch: { title: "Suis", subtitle: "1 unit" },
    },
  },
};

const EQUIPMENT_ORDER = ["cell", "wire", "holder", "bulb", "switch"];

const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย", speechLang: "th-TH" },
  { id: "en", label: "English", speechLang: "en-US" },
  { id: "ms", label: "Melayu", speechLang: "ms-MY" },
];

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window))
    return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;

  window.speechSynthesis.speak(utterance);
}

function handleEquipmentImageError(event, fallbackImage, onImageError) {
  if (fallbackImage && event.currentTarget.dataset.fallbackApplied !== "true") {
    event.currentTarget.dataset.fallbackApplied = "true";
    event.currentTarget.src = fallbackImage;
    return;
  }

  onImageError();
}

function EquipmentCard({ item, imageBroken, onImageError, onSpeak }) {
  const isBatteryCellGroup = item.id === "cell";

  return (
    <div className="group flex h-full w-full flex-col items-center gap-3 rounded-[28px] border-[3px] border-white/80 bg-white/95 px-4 py-5 text-center shadow-[0_16px_28px_rgba(15,23,42,0.14)] transition-transform duration-200 hover:-translate-y-1">

      <div className="grid h-[134px] w-[134px] place-items-center rounded-[26px] border-[4px] border-[#ddecf7] bg-[linear-gradient(180deg,#ffffff_0%,#f6fbff_100%)] p-3 shadow-[inset_0_6px_12px_rgba(255,255,255,0.55),0_12px_18px_rgba(17,24,39,0.14)]">
        {imageBroken ? (
          <div className="text-sm font-bold text-slate-500">
            Image unavailable
          </div>
        ) : (
          isBatteryCellGroup ? (
            <div className="flex items-end justify-center gap-0">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="-mx-[1px] h-[64px] w-[24px] overflow-hidden rounded-[5px]"
                >
                  <img
                    src={item.image}
                    alt={`${item.title} ${index + 1}`}
                    data-fallback-applied="false"
                    className="h-[64px] w-[24px] object-cover object-center mix-blend-multiply"
                    onError={(event) =>
                      handleEquipmentImageError(
                        event,
                        item.fallbackImage,
                        onImageError
                      )
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            <img
              src={item.image}
              alt={item.title}
              data-fallback-applied="false"
              className={`h-auto max-h-[102px] w-full object-contain ${item.imageClassName}`}
              onError={(event) =>
                handleEquipmentImageError(
                  event,
                  item.fallbackImage,
                  onImageError
                )
              }
            />
          )
        )}
      </div>

      <div className="flex items-center gap-2 text-[20px] font-black">

        {item.title}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSpeak();
          }}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-700 text-lg hover:scale-105"
        >
          🔊
        </button>

      </div>

      <div className="text-[16px] font-bold text-slate-700">
        {item.subtitle}
      </div>

    </div>
  );
}

export default function P6ElectricCircuitMaterials() {
  const navigate = useNavigate();
  const [brokenImages, setBrokenImages] = useState({});
  const [lang, setLang] = useState("th");

  const t = useMemo(() => TRANSLATIONS[lang], [lang]);

  const speechLang =
    LANGUAGE_OPTIONS.find((item) => item.id === lang)?.speechLang ||
    "th-TH";
  const langLabels = {
    th: { th: "ไทย", en: "English", ms: "Melayu" },
    en: { th: "Thai", en: "English", ms: "Melayu" },
    ms: { th: "Thai", en: "English", ms: "Melayu" },
  }[lang];

  const onSpeak = useCallback(
    (text) => speakText(text, speechLang),
    [speechLang]
  );

  const markImageBroken = useCallback((id) => {
    setBrokenImages((current) =>
      current[id] ? current : { ...current, [id]: true }
    );
  }, []);

  const equipmentData = useMemo(
    () =>
      EQUIPMENT_ORDER.map((id) => ({
        ...t.equipment[id],
        ...EQUIPMENT_MEDIA[id],
        id,
      })),
    [t]
  );

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden px-4 pb-6 pt-4 text-slate-900 md:px-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >

      <div className="mx-auto flex max-w-[1380px] flex-col gap-3">

        <div className="text-[32px] font-black">
          {t.title}
        </div>

        <div className="rounded-[34px] bg-sky-200 p-6">

          <div className="mb-4 text-xl font-black">
            {t.equipmentHeading}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

            {equipmentData.map((item) => (
              <EquipmentCard
                key={item.id}
                item={item}
                imageBroken={Boolean(brokenImages[item.id])}
                onImageError={() => markImageBroken(item.id)}
                onSpeak={() =>
                  onSpeak(`${item.title} ${item.subtitle}`)
                }
              />
            ))}

          </div>
        </div>

              <div className="fixed bottom-3 right-3 z-20 flex gap-3">
        <button
          className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-base font-bold text-slate-900 shadow"
          onClick={() => navigate("/p6/electric-circuit/experiments")}
          type="button"
        >
          <span className="text-xl leading-none">&lt;&lt;</span>
          <span>{t.back}</span>
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-base font-bold text-white shadow"
          onClick={() => navigate("/p6/electric-circuit/steps")}
          type="button"
        >
          <span>{t.next}</span>
          <span className="text-xl leading-none">&gt;&gt;</span>
        </button>
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
    </div>
  );
}




