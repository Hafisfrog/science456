import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const EQUIPMENT_MEDIA = {
  cell: {
    image: "/images/p6/electric-circuit/batteries.svg",
    imageClassName: "max-w-[110px] min-[1400px]:max-w-[120px]",
  },
  wire: {
    image: "/images/p6/electric-circuit/wire-clips.svg",
    imageClassName: "max-w-[116px] min-[1400px]:max-w-[126px]",
  },
  holder: {
    image: "/images/p6/electric-circuit/battery-holder.svg",
    imageClassName: "max-w-[126px] min-[1400px]:max-w-[136px]",
  },
  bulb: {
    image: "/images/p6/electric-circuit/bulb-base.svg",
    imageClassName: "max-w-[92px] min-[1400px]:max-w-[102px]",
  },
  switch: {
    image: "/images/p6/electric-circuit/switch.svg",
    imageClassName: "max-w-[90px] min-[1400px]:max-w-[98px]",
  },
};

const TRANSLATIONS = {
  th: {
    badge: "วงจรไฟฟ้าใกล้ตัว",
    title: "เรื่อง วงจรไฟฟ้าอย่างง่าย",
    equipmentHeading: "อุปกรณ์",
    back: "ย้อนกลับ",
    next: "ไปขั้นตอน",
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

function EquipmentCard({ item, imageBroken, onImageError, onSpeak }) {
  return (
    <div className="group flex h-full w-full flex-col items-center gap-3 rounded-[28px] border-[3px] border-white/80 bg-white/95 px-4 py-5 text-center shadow-[0_16px_28px_rgba(15,23,42,0.14)]">

      <div className="grid h-[126px] w-[126px] place-items-center rounded-[24px] border-[4px] border-[#ddecf7] bg-white p-3 shadow-[inset_0_6px_12px_rgba(255,255,255,0.55),0_12px_18px_rgba(17,24,39,0.14)]">
        {imageBroken ? (
          <div className="text-sm font-bold text-slate-500">
            Image unavailable
          </div>
        ) : (
          <img
            src={item.image}
            alt={item.title}
            className={`h-auto max-h-[92px] w-full object-contain ${item.imageClassName}`}
            onError={onImageError}
          />
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

        <div className="inline-flex w-fit rounded-full bg-blue-500 px-4 py-2 font-black text-white">
          {t.badge}
        </div>

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

        <div className="flex justify-end gap-3">

          <button
            className="h-16 w-16 rounded-[20px] bg-white text-[28px] shadow"
            onClick={() =>
              navigate("/p6/electric-circuit/experiments")
            }
          >
            ←
          </button>

          <button
            className="h-16 w-16 rounded-[20px] bg-blue-600 text-[28px] text-white shadow"
            onClick={() =>
              navigate("/p6/electric-circuit/steps")
            }
          >
            →
          </button>

        </div>
      </div>

      <div className="fixed left-4 bottom-4 flex gap-2 bg-white p-2 rounded-full shadow">

        {LANGUAGE_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => setLang(option.id)}
            className={`px-4 py-2 rounded-full font-bold ${
              lang === option.id
                ? "bg-blue-600 text-white"
                : "text-slate-800"
            }`}
          >
            {option.label}
          </button>
        ))}

      </div>
    </div>
  );
}