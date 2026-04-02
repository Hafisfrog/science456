import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const LANGUAGE_BUTTONS = [
  { key: "th", label: "Thai", className: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
  { key: "en", label: "English", className: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" },
  { key: "ms", label: "Malay", className: "bg-amber-100 text-amber-800 hover:bg-amber-200" },
];

const LANGUAGE_LABELS = {
  th: { th: "\u0E44\u0E17\u0E22", en: "\u0E2D\u0E31\u0E07\u0E01\u0E24\u0E29", ms: "\u0E21\u0E25\u0E32\u0E22\u0E39" },
  en: { th: "Thai", en: "English", ms: "Malay" },
  ms: { th: "Thai", en: "Inggeris", ms: "Melayu" },
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cyan-300 via-sky-500 to-sky-800 px-3 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-5">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/materials/back.png')" }}
      />
      <div className="pointer-events-none absolute left-1/2 top-[-13rem] h-[28rem] w-[140%] -translate-x-1/2 rounded-b-[100%] bg-sky-100/70" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background:repeating-linear-gradient(90deg,rgba(15,23,42,0.35)_0px,rgba(15,23,42,0.35)_10px,transparent_10px,transparent_190px)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <h1 className="mx-auto mb-3 w-fit rounded-xl border-4 border-sky-700 bg-white/95 px-5 py-2 text-center text-lg font-extrabold text-sky-900 shadow-[0_8px_22px_rgba(14,116,144,0.28)] sm:text-xl">
          {ui.title}
        </h1>

        <div className="mb-3 w-fit rounded-lg border-2 border-sky-700 bg-white/95 px-3 py-1.5 text-base font-bold text-sky-900 shadow-[0_6px_14px_rgba(14,116,144,0.24)]">
          {ui.label}
        </div>

        <div className="mx-auto grid w-full max-w-4xl grid-cols-3 justify-items-center gap-4">
          {MATERIALS.map((material) => (
            <div
              key={material.id}
              className="w-full max-w-[250px] rounded-lg border border-sky-200 bg-sky-50/95 p-1.5 text-center shadow-[0_6px_14px_rgba(14,116,144,0.22)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(14,116,144,0.32)]"
            >
              <div className="flex h-20 items-center justify-center sm:h-24">
                <img
                  src={material.img}
                  alt={material.name[language] ?? material.name.th}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="mt-1 text-xs font-bold text-slate-800 sm:text-sm">
                {material.name[language] ?? material.name.th}
              </p>
              <button
                type="button"
                className="mt-1.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sm text-sky-700 shadow-[0_4px_8px_rgba(14,116,144,0.2)] transition hover:-translate-y-0.5 hover:bg-sky-200 sm:h-9 sm:w-9 sm:text-base"
                onClick={() => speakMaterial(material.name[language] ?? material.name.th)}
                aria-label={`Speak ${material.name[language] ?? material.name.th}`}
              >
                {"\uD83D\uDD0A"}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-300 bg-slate-100/95 px-2 py-1.5 shadow-[0_8px_20px_rgba(59,130,246,0.18)]">
            {LANGUAGE_BUTTONS.map((button) => (
              <button
                key={button.key}
                type="button"
                onClick={() => setLanguage(button.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${button.className} ${
                  language === button.key ? "ring-2 ring-offset-2 ring-slate-500" : ""
                }`}
              >
                {LANGUAGE_LABELS[language]?.[button.key] ?? button.label}
              </button>
            ))}
          </div>

          <div className="ml-auto flex gap-3">
            <button
              type="button"
              className="rounded-full bg-sky-700 px-6 py-3 text-base font-semibold text-white shadow-[0_6px_14px_rgba(14,116,144,0.3)] transition hover:bg-sky-800"
              onClick={() => navigate("/p4/light/situation")}
            >
              {ui.back}
            </button>

            <button
              type="button"
              className="rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-7 py-3 text-base font-bold text-white shadow-[0_8px_18px_rgba(14,116,144,0.35)] transition hover:scale-105 hover:opacity-90"
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
