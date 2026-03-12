import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeakButton from "../../../components/SpeakButton";

const MATERIALS = [
  {
    id: 1,
    img: "/images/materials/l1.png",
    name: { th: "กระจกใส", en: "Clear Glass", ms: "Kaca Jernih" },
  },
  {
    id: 2,
    img: "/images/materials/l10.png",
    name: { th: "แก้วใส", en: "Clear Cup", ms: "Gelas Jernih" },
  },
  {
    id: 3,
    img: "/images/materials/l3.png",
    name: { th: "พลาสติกใส", en: "Clear Plastic", ms: "Plastik Jernih" },
  },
  {
    id: 4,
    img: "/images/materials/l8.png",
    name: { th: "หมอก", en: "Fog", ms: "Kabus" },
  },
  {
    id: 5,
    img: "/images/materials/l4.png",
    name: { th: "กระดาษไข", en: "Wax Paper", ms: "Kertas Surih" },
  },
  {
    id: 6,
    img: "/images/materials/l2.png",
    name: { th: "กระจกฝ้า", en: "Frosted Glass", ms: "Kaca Kabur" },
  },
  {
    id: 7,
    img: "/images/materials/l5.png",
    name: { th: "แผ่นไม้", en: "Wooden Board", ms: "Papan Kayu" },
  },
  {
    id: 8,
    img: "/images/materials/l7.webp",
    name: { th: "ผนังปูน", en: "Cement Wall", ms: "Dinding Simen" },
  },
  {
    id: 9,
    img: "/images/materials/l6.png",
    name: { th: "เหล็ก", en: "Steel", ms: "Besi" },
  },
];

const UI = {
  th: {
    title: "การทดลองที่ 4 เรื่อง ตัวกลางของแสง",
    label: "วัสดุอุปกรณ์",
    back: "◀ ย้อนกลับ",
    next: "ต่อไป ▶",
    speakText:
      "หน้าวัสดุอุปกรณ์การทดลองเรื่องตัวกลางของแสง ประกอบด้วยวัสดุโปร่งใส โปร่งแสง และทึบแสงหลายชนิด",
  },
  en: {
    title: "Experiment 4: Medium of Light",
    label: "Materials",
    back: "◀ Back",
    next: "Next ▶",
    speakText:
      "This materials page includes transparent, translucent, and opaque items used in the medium of light experiment.",
  },
  ms: {
    title: "Eksperimen 4: Medium Cahaya",
    label: "Bahan",
    back: "◀ Kembali",
    next: "Seterusnya ▶",
    speakText:
      "Halaman bahan ini mengandungi objek lut sinar, separa lut sinar, dan legap untuk eksperimen medium cahaya.",
  },
};

export default function P4LightSelect() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const ui = UI[language] ?? UI.th;

  const speakMaterial = (text) => {
    try {
      if (!text || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === "th" ? "th-TH" : language === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cyan-300 via-sky-500 to-sky-800 px-4 pb-28 pt-8 sm:px-8">
      <div className="pointer-events-none absolute left-1/2 top-[-13rem] h-[28rem] w-[140%] -translate-x-1/2 rounded-b-[100%] bg-slate-200/80" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background:repeating-linear-gradient(90deg,rgba(15,23,42,0.35)_0px,rgba(15,23,42,0.35)_10px,transparent_10px,transparent_190px)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <h1 className="mx-auto mb-6 w-fit rounded-xl border-4 border-black bg-white px-6 py-3 text-center text-xl font-extrabold text-slate-900 shadow-[0_8px_22px_rgba(0,0,0,0.25)] sm:text-2xl">
          {ui.title}
        </h1>

        <div className="mb-4 w-fit rounded-lg border-2 border-black bg-white px-4 py-2 text-lg font-bold text-slate-800 shadow-[0_6px_14px_rgba(0,0,0,0.2)]">
          {ui.label}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {MATERIALS.map((material) => (
            <div
              key={material.id}
              className="rounded-xl border-[10px] border-orange-700 bg-amber-100/95 p-3 text-center shadow-[0_8px_18px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_14px_24px_rgba(0,0,0,0.35)]"
            >
              <div className="flex h-28 items-center justify-center">
                <img
                  src={material.img}
                  alt={material.name[language] ?? material.name.th}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="mt-2 text-base font-bold text-slate-800">
                {material.name[language] ?? material.name.th}
              </p>
              <button
                type="button"
                className="mt-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-lg text-blue-600 shadow-[0_4px_10px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-blue-50"
                onClick={() => speakMaterial(material.name[language] ?? material.name.th)}
                aria-label={`Speak ${material.name[language] ?? material.name.th}`}
              >
                {"\uD83D\uDD0A"}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <SpeakButton
            th={UI.th.speakText}
            en={UI.en.speakText}
            ms={UI.ms.speakText}
            activeLang={language}
            onLanguageChange={setLanguage}
          />

          <div className="ml-auto flex gap-3">
            <button
              type="button"
              className="rounded-full bg-slate-600 px-6 py-3 text-base font-semibold text-white shadow-[0_6px_14px_rgba(0,0,0,0.25)] transition hover:bg-slate-700"
              onClick={() => navigate("/p4/light/situation")}
            >
              {ui.back}
            </button>

            <button
              type="button"
              className="rounded-full bg-red-500 px-7 py-3 text-base font-bold text-white shadow-[0_8px_18px_rgba(0,0,0,0.3)] transition hover:scale-105 hover:bg-red-600"
              onClick={() => navigate("/p4/light/intro")}
            >
              {ui.next}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
