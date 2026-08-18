import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../HomeButton";
import { LightLanguageSwitcher, LightNavButtons } from "./LightControls";

const MATERIALS = [
  {
    id: 1,
    img: "/images/materials/l1.png",
    name: { th: "กระจกใส", en: "Clear Glass", ms: "จูมิง ยือรือนิฮ" },
  },
  {
    id: 2,
    img: "/images/materials/l10.png",
    name: { th: "แก้วใส", en: "Clear Cup", ms: "กือละฮ" },
  },
  {
    id: 3,
    img: "/images/materials/l3.png",
    name: { th: "พลาสติกใส", en: "Clear Plastic", ms: "ปลาสติก" },
  },
  {
    id: 4,
    img: "/images/materials/l8.png",
    name: { th: "หมอก", en: "Fog", ms: "กาโบะ" },
  },
  {
    id: 5,
    img: "/images/materials/l4.png",
    name: { th: "กระดาษไข", en: "Wax Paper", ms: "กือรือตะฮ มีเญาะ" },
  },
  {
    id: 6,
    img: "/images/materials/l2.png",
    name: { th: "กระจกฝ้า", en: "Frosted Glass", ms: "จูมิง กือลาบู" },
  },
  {
    id: 7,
    img: "/images/materials/l5.png",
    name: { th: "แผ่นไม้", en: "Wooden Board", ms: "ปาแป" },
  },
  {
    id: 8,
    img: "/images/materials/l7.webp",
    name: { th: "ผนังปูน", en: "Cement Wall", ms: "ดีเน็ง" },
  },
  {
    id: 9,
    img: "/images/materials/l6.png",
    name: { th: "เหล็ก", en: "Steel", ms: "บือซี" },
  },
];

const UI = {
  th: {
    title: "การทดลองที่ 4 เรื่อง ตัวกลางของแสง",
    label: "วัสดุอุปกรณ์",
    back: "ย้อนกลับ",
    next: "ต่อไป",
    speakText:
      "หน้าวัสดุอุปกรณ์การทดลองเรื่องตัวกลางของแสง ประกอบด้วยวัสดุโปร่งใส โปร่งแสง และทึบแสงหลายชนิด",
  },
  en: {
    title: "Experiment 4 Medium of Light",
    label: "Materials",
    back: "Back",
    next: "Next",
    speakText:
      "This materials page includes transparent, translucent, and opaque items used in the medium of light experiment.",
  },
  ms: {
    title: "ปือจูบอแอ 4 ตาโยะ บือนอ เฮาะ จายอ บูเละฮ ลาล",
    label: "อาละ-อาละ",
    back: "ฮูโนกือเละ",
    next: "ตือรุฮ",
    speakText:
      "Halaman bahan ini mengandungi objek lut sinar, separa lut sinar, dan legap untuk eksperimen medium cahaya.",
  },
};

const LANGUAGE_LABELS = {
  th: { th: "ไทย", en: "อังกฤษ", ms: "มลายูถิ่น" },
  en: { th: "Thai", en: "English", ms: "Malay" },
  ms: { th: "Thai", en: "Inggeris", ms: "Melayu" },
};

const MALAY_MATERIAL_AUDIO = [
  "/audio/p4/34.1.mp3",
  "/audio/p4/34.2.mp3",
  "/audio/p4/34.3.mp3",
  "/audio/p4/34.4.mp3",
  "/audio/p4/34.5.mp3",
  "/audio/p4/34.6.mp3",
  "/audio/p4/34.7.mp3",
  "/audio/p4/34.8.mp3",
  "/audio/p4/34.9.mp3",
];

export default function P4LightSelect() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const audioRef = useRef(null);
  const ui = UI[language] ?? UI.th;

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const speakMaterial = (text, index) => {
    try {
      stopAudio();

      if (language === "ms") {
        const audioSrc = MALAY_MATERIAL_AUDIO[index];
        if (!audioSrc) return;
        const audio = new Audio(audioSrc);
        audioRef.current = audio;
        audio.play().catch(() => {});
        return;
      }

      if (!text || !window.speechSynthesis) return;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === "th" ? "th-TH" : "en-US";
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cyan-300 via-sky-500 to-sky-800 px-3 pb-28 pt-4 sm:px-6 sm:pb-32 sm:pt-5">
      <HomeButton />

      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/materials/back.png')" }}
      />
      <div className="pointer-events-none absolute left-1/2 top-[-13rem] h-[28rem] w-[140%] -translate-x-1/2 rounded-b-[100%] bg-sky-100/70" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background:repeating-linear-gradient(90deg,rgba(15,23,42,0.35)_0px,rgba(15,23,42,0.35)_10px,transparent_10px,transparent_190px)]" />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <h1 className="mx-auto mb-5 w-fit rounded-xl border-4 border-sky-700 bg-white/95 px-11 py-3.5 text-center text-[1.75rem] font-extrabold text-sky-900 shadow-[0_8px_22px_rgba(14,116,144,0.28)] sm:text-[2.25rem]">
          {ui.title}
        </h1>

        <div className="mb-5 w-fit rounded-lg border-2 border-sky-700 bg-white/95 px-6 py-3 text-2xl font-bold text-sky-900 shadow-[0_6px_14px_rgba(14,116,144,0.24)]">
          {ui.label}
        </div>

        <div className="mx-auto grid w-full max-w-[920px] grid-cols-3 justify-items-center gap-5">
          {MATERIALS.map((material, index) => (
            <div
              key={material.id}
              className="w-full max-w-[270px] rounded-xl border border-sky-200 bg-sky-50/95 p-2.5 text-center shadow-[0_6px_14px_rgba(14,116,144,0.22)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(14,116,144,0.32)]"
            >
              <div className="flex h-24 items-center justify-center sm:h-28">
                <img
                  src={material.img}
                  alt={material.name[language] ?? material.name.th}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="mt-2 flex items-center justify-center gap-2">
                <p className="text-base font-bold text-slate-800 sm:text-lg">
                  {material.name[language] ?? material.name.th}
                </p>
                <button
                  type="button"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sm text-sky-700 shadow-[0_4px_8px_rgba(14,116,144,0.2)] transition hover:-translate-y-0.5 hover:bg-sky-200 sm:h-9 sm:w-9 sm:text-base"
                  onClick={() => speakMaterial(material.name[language] ?? material.name.th, index)}
                  aria-label={`Speak ${material.name[language] ?? material.name.th}`}
                >
                  {"\uD83D\uDD0A"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-[18px] left-[18px] z-30">
        <LightLanguageSwitcher
          value={language}
          onChange={setLanguage}
          labels={LANGUAGE_LABELS.th}
        />
      </div>

      <div className="fixed bottom-[18px] right-[18px] z-30">
        <LightNavButtons
          backLabel={ui.back}
          nextLabel={ui.next}
          onBack={() => navigate("/p4/light/situation")}
          onNext={() => navigate("/p4/light/intro")}
        />
      </div>
    </div>
  );
}
