import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";

function speakText(text, lang) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.95;

  window.speechSynthesis.speak(utter);
}

function Spark({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bg-[#ffc333] ${className}`}
      style={{
        clipPath:
          "polygon(50% 0, 62% 36%, 100% 50%, 62% 64%, 50% 100%, 38% 64%, 0 50%, 38% 36%)",
      }}
    />
  );
}

const TRANSLATIONS = {
  th: {
    title: "การทดลองที่ 2 เรื่อง การต่อหลอดไฟฟ้าแบบอนุกรมและแบบขนาน",
    equipmentHeading: "วัสดุอุปกรณ์",
    back: "ย้อนกลับ",
    next: "ต่อไป",
    sound: "เปิดเสียง",
    speech: "th-TH",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายูถิ่น" },
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
    title: "ปือจูบอแอ 2 ตาโยะ; จารอ ฮูบง โบ ปือลีตอ ซือจารอ แดแระ ดืองา ซือลารี",
    equipmentHeading: "อาละ-อาละ",
    back: "ฮูโนกือเละ",
    next: "ตือรุฮ",
    sound: "Bunyi",
    speech: "ms-MY",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
    equipment: {
      cell: { title: "แบะตือรี ปือลีตอ แปเจะ ", subtitle: "4 ตอกอ" },
      wire: { title: " ตาลี อาปี ซือกาลี ดืองา งือเปะ ", subtitle: "4 ออระ" },
      holder: { title: "บือกะฮ ลือเตาะ แบะตือรี ปือลีตอ แปเจะ", subtitle: "อูโตะ 4 ตอกอ" },
      bulb: { title: "โบ ปือลีตอ ซือกาลี ดืองา ตาเปาะ", subtitle: "1 ชุ" },
    },
  },
};

const LANGS = [
  { id: "th", label: "ไทย" },
  { id: "ms", label: "มลายูถิ่น" },
    { id: "en", label: "อังกฤษ" },
];

const EQUIPMENT = ["cell", "wire", "holder", "bulb"];

const MALAY_EQUIPMENT_AUDIO = {
  cell: "/audio/p6/26.1.mp3",
  wire: "/audio/p6/26.2.mp3",
  holder: "/audio/p6/26.3.mp3",
  bulb: "/audio/p6/26.4.mp3",
};

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
  const audioRef = useRef(null);
  const t = useMemo(() => TRANSLATIONS[lang] ?? TRANSLATIONS.th, [lang]);

  const stopAudio = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }, []);

  useEffect(() => {
    return () => {
      stopAudio();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [stopAudio]);

  const speakEquipment = useCallback(
    (id) => {
      stopAudio();
      const text = `${t.equipment[id].title} ${t.equipment[id].subtitle}`;

      if (lang === "ms") {
        const audioSrc = MALAY_EQUIPMENT_AUDIO[id];
        if (!audioSrc) return;
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
        const audio = new Audio(audioSrc);
        audioRef.current = audio;
        audio.play().catch(() => {});
        return;
      }

      speakText(text, t.speech);
    },
    [lang, stopAudio, t.equipment, t.speech],
  );

  const markImageBroken = useCallback((id) => {
    setBrokenImages((current) =>
      current[id] ? current : { ...current, [id]: true }
    );
  }, []);

  const pageBg = {
    background:
      "radial-gradient(46% 27% at 8% 41%, #cdebf4 0 61%, transparent 62%), radial-gradient(40% 26% at 94% 42%, #cdebf4 0 60%, transparent 61%), radial-gradient(72% 35% at 50% 33%, #f7f0ef 0 63%, transparent 64%), radial-gradient(80% 50% at 50% 75%, #f7f0ef 0 62%, transparent 63%), linear-gradient(180deg, #fbf5f2 0%, #fbf5f2 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden px-4 pb-6 pt-4 text-slate-900 md:px-8"
      style={pageBg}
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
          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.15))",
        }}
      />
      <Spark className="right-[10%] top-[16%] z-0 h-11 w-11 max-[760px]:hidden" />
      <Spark className="right-[22%] top-[17%] z-0 h-12 w-12 max-[760px]:hidden" />
      <Spark className="right-[18%] top-[25%] z-0 h-5 w-5 max-[760px]:hidden" />
      <div className="pointer-events-none absolute left-[6%] bottom-[20%] z-0 text-[92px] leading-none opacity-75 max-[900px]:hidden">
        🧲
      </div>

      <div className="relative z-[1] mx-auto flex max-w-[1380px] flex-col gap-3">
        <h1 className="m-0 pb-2 pt-1 text-center text-[clamp(28px,2.2vw,46px)] font-black leading-[1.1] text-slate-900">
          {t.title}
        </h1>

        <div className="rounded-[34px] border border-[#eadfce] bg-[#fffaf3]/90 p-6 shadow-[0_18px_34px_rgba(92,72,49,0.12)] backdrop-blur-[1px]">
          <div className="mb-4 mt-1 text-left text-[clamp(24px,1.8vw,34px)] font-black text-slate-900">
            {t.equipmentHeading}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {EQUIPMENT.map((id) => (
              <div
                key={id}
                className="group relative flex flex-col items-center gap-3 rounded-[28px] border border-[#eadfce] bg-white/95 px-4 py-5 text-center shadow-[0_14px_28px_rgba(92,72,49,0.1)] transition duration-150 hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(92,72,49,0.16)]"
              >
                <div className="grid h-[134px] w-[134px] place-items-center rounded-[26px] border-[3px] border-[#e8dccb] bg-[linear-gradient(180deg,#ffffff_0%,#fff8ef_100%)] p-3 shadow-[inset_0_6px_12px_rgba(255,255,255,0.65),0_10px_18px_rgba(92,72,49,0.1)]">
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
                    onClick={() => speakEquipment(id)}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl text-orange-700 shadow transition hover:scale-105"
                    aria-label={`${t.sound} ${t.equipment[id].title}`}
                    title={t.sound}
                  >
                    {"🔊"}
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
            onClick={() => navigate("/p6/electric-circuit/experiment-2/skills")}
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
