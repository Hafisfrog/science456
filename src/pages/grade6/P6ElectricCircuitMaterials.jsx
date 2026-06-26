import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";

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
    image: "/images/p6/kraba.png",
    fallbackImage: "/images/p6/electric-circuit/battery-holder.svg",
    imageClassName: "max-w-[132px] min-[1400px]:max-w-[144px]",
  },
  bulb: {
    image: "/images/p6/lfai.png",
    fallbackImage: "/images/p6/electric-circuit/bulb-base.svg",
    imageClassName: "max-w-[98px] min-[1400px]:max-w-[108px]",
  },
  switch: {
    image: "/images/p6/switch.png",
    fallbackImage: "/images/p6/electric-circuit/switch.svg",
    imageClassName: "max-w-[96px] min-[1400px]:max-w-[106px]",
  },
};

const TRANSLATIONS = {
  th: {
    title: "การทดลองที่ 1 เรื่อง การต่อวงจรไฟฟ้าแบบอนุกรม",
    equipmentHeading: "วัสดุอุปกรณ์",
    back: "ย้อนกลับ",
    next: "ต่อไป",
    lang: { th: "ไทย", ms: "มลายู",en: "อังกฤษ" },
    equipment: {
      cell: { title: "ถ่านไฟฉาย", subtitle: "4 ก้อน" },
      wire: { title: "สายไฟพร้อมหัวหนีบ", subtitle: "4 เส้น" },
      holder: { title: "กระบะใส่ถ่านไฟฉาย", subtitle: "สำหรับ 4 ก้อน" },
      bulb: { title: "หลอดไฟพร้อมฐาน", subtitle: "1 ชุด" },
      switch: { title: "สวิตช์", subtitle: "1 อัน" },
    },
  },
  en: {
    title: "Experiment 1 Series Electric Circuit",
    equipmentHeading: "Materials and Equipment",
    back: "Back",
    next: "Next",
    lang: { th: "Thai", en: "English", ms: "Malay" },
    equipment: {
      cell: { title: "Battery", subtitle: "4 cells" },
      wire: { title: "Wires with clips", subtitle: "4 wires" },
      holder: { title: "Battery holder", subtitle: "for 4 cells" },
      bulb: { title: "Bulb with base", subtitle: "1 set" },
      switch: { title: "Switch", subtitle: "1 pc" },
    },
  },
  ms: {
    title: "Kajiye 1 Tajuk Caro Hubung Litar Letrik Berseri",
    equipmentHeading: "Beno",
    back: "Pusing semula",
    next: "Teruh",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
    equipment: {
      cell: { title: "Bateri pelito pecek ", subtitle: "4 Tokol" },
      wire: { title: "Kali api sekali ngepek ", subtitle: "4 Tali" },
      holder: { title: "Bekas letok bateri pelito pecek untuk ", subtitle: "untuk 4 Tokol" },
      bulb: { title: "Bo pelito sekali tapok ", subtitle: "1 Sek" },
      switch: { title: "Suwih ", subtitle: "1 Biji" },
    },
  },
};

const EQUIPMENT_ORDER = ["cell", "wire", "holder", "bulb", "switch"];

const LANGUAGE_OPTIONS = [
  { id: "th", speechLang: "th-TH", label: "ไทย" },
   { id: "ms", speechLang: "ms-MY", label: "มลายู" },
  { id: "en", speechLang: "en-US", label: "อังกฤษ" },
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

function Spark({ className }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bg-[#ffc84b] ${className}`}
      style={{
        clipPath:
          "polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)",
      }}
    />
  );
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
    <div className="group flex h-full w-full flex-col items-center gap-3 rounded-[28px] border border-[#eadfce] bg-white/95 px-4 py-5 text-center shadow-[0_14px_28px_rgba(92,72,49,0.1)] transition-transform duration-200 hover:-translate-y-1">

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

  const t = useMemo(() => TRANSLATIONS[lang] ?? TRANSLATIONS.th, [lang]);

  const speechLang = LANGUAGE_OPTIONS.find((item) => item.id === lang)?.speechLang ?? "th-TH";

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
      "radial-gradient(46% 27% at 8% 41%, #cdebf4 0 61%, transparent 62%), radial-gradient(40% 26% at 94% 42%, #cdebf4 0 60%, transparent 61%), radial-gradient(72% 35% at 50% 33%, #f7f0ef 0 63%, transparent 64%), radial-gradient(80% 50% at 50% 75%, #f7f0ef 0 62%, transparent 63%), linear-gradient(180deg, #fbf5f2 0%, #fbf5f2 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden px-4 pb-6 pt-4 text-slate-900 md:px-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <HomeButton />

      <div className="pointer-events-none absolute left-[-92px] top-[24%] z-0 h-[310px] w-[255px] rotate-[-10deg] rounded-[52%_52%_46%_46%] border-[7px] border-black bg-[#fff773] shadow-[inset_24px_22px_0_rgba(255,255,255,.48)] max-[900px]:left-[-150px]">
        <div className="absolute bottom-[-38px] left-[40px] h-[70px] w-[82px] rotate-[12deg] rounded-[14px] border-[7px] border-black bg-[#111]" />
        <div className="absolute bottom-[-4px] left-[56px] h-[84px] w-[54px] rotate-[18deg] rounded-[10px] border-[5px] border-black bg-[#fff7a3]" />
        <div className="absolute left-[102px] top-[76px] h-[126px] w-[98px] rounded-[50%] border-[4px] border-slate-500/35" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(70px,14vw,290px)] top-[-20px] z-0 h-[clamp(150px,18vw,270px)] w-[clamp(82px,9vw,150px)] bg-[#ffc84b] max-[700px]:opacity-55"
        style={{
          clipPath:
            "polygon(0 0,44% 0,68% 36%,93% 9%,100% 39%,78% 54%,100% 100%,57% 54%,38% 70%)",
        }}
      />
      <Spark className="right-[10%] top-[16%] z-0 h-11 w-11 max-[760px]:hidden" />
      <Spark className="right-[22%] top-[17%] z-0 h-12 w-12 max-[760px]:hidden" />
      <Spark className="right-[18%] top-[25%] z-0 h-5 w-5 max-[760px]:hidden" />
      <div className="pointer-events-none absolute left-[6%] bottom-[20%] z-0 text-[92px] leading-none opacity-75 max-[900px]:hidden">
        🧲
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1380px] flex-col gap-3">
        <h1 className="m-0 py-1 text-center text-[clamp(30px,2.2vw,48px)] font-black leading-[1.08] text-slate-900">
          {t.title}
        </h1>

        <div className="rounded-[34px] border border-[#eadfce] bg-[#fffaf3]/90 p-6 shadow-[0_18px_34px_rgba(92,72,49,0.12)] backdrop-blur-[1px]">
          <div className="mb-4">
            <div className="inline-flex rounded-full border border-[#e5d4bd] bg-[#f6efe4] px-5 py-2 text-[clamp(28px,2vw,40px)] font-black text-[#1f2937]">
              {t.equipmentHeading}
            </div>
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

      <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-7 md:right-7">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/electric-circuit/experiment-1/skills")}
          type="button"
        >
          &laquo; {t.back}
        </button>
        <button
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/electric-circuit/steps")}
          type="button"
        >
          {t.next} &raquo;
        </button>
      </div>
      </div>

      <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
        <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
          {LANGUAGE_OPTIONS.map((item) => (
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
    </div>
  );
}




