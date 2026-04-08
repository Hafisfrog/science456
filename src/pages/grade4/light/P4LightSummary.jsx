import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LightLanguageSwitcher, LightNavButtons } from "./LightControls";

const SPEECH_LOCALES = {
  th: "th-TH",
  en: "en-US",
  ms: "ms-MY",
};

const MATERIAL_NAMES = {
  "/images/materials/l1.png": { th: "กระจกใส", en: "Clear Glass", ms: "Kaca Jernih" },
  "/images/materials/l10.png": { th: "แก้วใส", en: "Clear Cup", ms: "Gelas Jernih" },
  "/images/materials/l3.png": { th: "พลาสติกใส", en: "Clear Plastic", ms: "Plastik Jernih" },
  "/images/materials/l8.png": { th: "หมอก", en: "Fog", ms: "Kabus" },
  "/images/materials/l4.png": { th: "กระดาษไข", en: "Wax Paper", ms: "Kertas Surih" },
  "/images/materials/l2.png": { th: "กระจกฝ้า", en: "Frosted Glass", ms: "Kaca Kabur" },
  "/images/materials/l5.png": { th: "แผ่นไม้", en: "Wooden Board", ms: "Papan Kayu" },
  "/images/materials/l7.webp": { th: "ผนังปูน", en: "Cement Wall", ms: "Dinding Simen" },
  "/images/materials/l6.png": { th: "เหล็ก", en: "Steel", ms: "Besi" },
};

const FALLBACK_BY_TYPE = {
  transparent: {
    th: ["กระจกใส", "พลาสติกใส", "แก้วใส"],
    en: ["Clear Glass", "Clear Plastic", "Clear Cup"],
    ms: ["Kaca Jernih", "Plastik Jernih", "Gelas Jernih"],
  },
  translucent: {
    th: ["กระจกฝ้า", "กระดาษไข", "หมอก"],
    en: ["Frosted Glass", "Wax Paper", "Fog"],
    ms: ["Kaca Kabur", "Kertas Surih", "Kabus"],
  },
  opaque: {
    th: ["แผ่นไม้", "เหล็ก", "ผนังปูน"],
    en: ["Wooden Board", "Steel", "Cement Wall"],
    ms: ["Papan Kayu", "Besi", "Dinding Simen"],
  },
};

const UI = {
  th: {
    title: "สรุปผลการทดลอง",
    intro1: "จากการทำกิจกรรม พบว่า เมื่อนำวัตถุต่าง ๆ มากั้นแสง วัตถุแต่ละชนิดจะยอมให้แสงผ่านได้ต่าง",
    intro2: "กัน ซึ่งจำแนกวัตถุตามลักษณะที่กั้นแสงได้ ดังนี้",
    summaryBullets: [
      "วัตถุที่ยอมให้แสงผ่านได้ดี ได้แก่ กระจกใส พลาสติกใส และแก้วใส",
      "วัตถุที่ยอมให้แสงผ่านได้บ้าง ได้แก่ กระจกฝ้า กระดาษไข และ หมอก",
      "วัตถุที่ไม่ยอมให้แสงผ่านได้ ได้แก่ แผ่นไม้ เหล็ก และผนังปูน",
    ],
    lineTransparent: "วัสดุที่ให้แสงผ่านได้ดี:",
    lineTranslucent: "วัสดุที่ให้แสงผ่านได้บางส่วน:",
    lineOpaque: "วัสดุที่ไม่ให้แสงผ่าน:",
    andWord: "และ",
    listenSummary: "🔊 ฟังข้อความสรุป",
    noMalayVoice: "ไม่พบเสียงภาษามลายู (ms-MY) ในอุปกรณ์นี้ จึงงดอ่านเพื่อป้องกันเสียงเพี้ยน",
    back: "ย้อนกลับ",
    next: "ต่อไป",
  },
  en: {
    title: "Experiment Summary",
    intro1:
      "From this activity, we found that when different materials block light, each material lets light pass differently.",
    intro2: "The materials can be grouped by how much light they allow through:",
    lineTransparent: "Materials that let light pass well:",
    lineTranslucent: "Materials that let some light pass:",
    lineOpaque: "Materials that do not let light pass:",
    andWord: "and",
    listenSummary: "🔊 Listen to summary",
    noMalayVoice: "Malay voice (ms-MY) is not available on this device, so reading is skipped to avoid mispronunciation.",
    back: "Back",
    next: "Next",
  },
  ms: {
    title: "Ringkasan Eksperimen",
    intro1:
      "Daripada aktiviti ini, didapati apabila bahan yang berbeza menghalang cahaya, setiap bahan membenarkan cahaya menembusi pada tahap berbeza.",
    intro2: "Bahan boleh dikelaskan mengikut keupayaan menembusi cahaya seperti berikut:",
    lineTransparent: "Bahan yang membenarkan cahaya menembusi dengan baik:",
    lineTranslucent: "Bahan yang membenarkan sebahagian cahaya menembusi:",
    lineOpaque: "Bahan yang tidak membenarkan cahaya menembusi:",
    andWord: "dan",
    listenSummary: "🔊 Dengar ringkasan",
    noMalayVoice: "Suara Bahasa Melayu (ms-MY) tidak ditemui pada peranti ini, bacaan dihentikan untuk elak sebutan tersalah.",
    back: "Kembali",
    next: "Seterusnya",
  },
};

function formatList(items, fallbackItems, language, andWord) {
  const names = (items?.length ? items : fallbackItems).filter(Boolean);
  const uniqueNames = [...new Set(names)];

  if (uniqueNames.length === 0) return "-";
  if (uniqueNames.length === 1) return uniqueNames[0];
  if (uniqueNames.length === 2) return `${uniqueNames[0]} ${andWord} ${uniqueNames[1]}`;

  if (language === "th") {
    return `${uniqueNames.slice(0, -1).join(" ")} ${andWord} ${uniqueNames[uniqueNames.length - 1]}`;
  }
  return `${uniqueNames.slice(0, -1).join(", ")}, ${andWord} ${uniqueNames[uniqueNames.length - 1]}`;
}

export default function P4LightSummary() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [language, setLanguage] = useState("th");
  const allResults = useMemo(() => state?.allResults ?? [], [state]);
  const ui = UI[language] ?? UI.th;

  useEffect(() => {
    if (!allResults.length) {
      navigate("/p4/light/experiment");
    }
  }, [allResults.length, navigate]);

  const groupedNames = useMemo(() => {
    const grouped = {
      transparent: [],
      translucent: [],
      opaque: [],
    };

    allResults.forEach((item) => {
      const type = item.material?.type || item.type || "opaque";
      if (!grouped[type]) return;

      const imgName = MATERIAL_NAMES[item.material?.img]?.[language];
      let name = imgName || item.material?.name;

      if (name && typeof name === "object") {
        name = name[language] || name.th || name.en || name.ms;
      }
      if (!name) return;

      if (!grouped[type].includes(name)) {
        grouped[type].push(name);
      }
    });

    return grouped;
  }, [allResults, language]);

  const buildSummarySpeechText = () => {
    if (language === "th") {
      return `${ui.title} ${ui.intro1} ${ui.intro2} ${ui.summaryBullets.join(" ")}`;
    }

    const transparentText = formatList(
      groupedNames.transparent,
      FALLBACK_BY_TYPE.transparent[language] || FALLBACK_BY_TYPE.transparent.th,
      language,
      ui.andWord
    );
    const translucentText = formatList(
      groupedNames.translucent,
      FALLBACK_BY_TYPE.translucent[language] || FALLBACK_BY_TYPE.translucent.th,
      language,
      ui.andWord
    );
    const opaqueText = formatList(
      groupedNames.opaque,
      FALLBACK_BY_TYPE.opaque[language] || FALLBACK_BY_TYPE.opaque.th,
      language,
      ui.andWord
    );

    return `${ui.title}. ${ui.intro1} ${ui.intro2} ${ui.lineTransparent} ${transparentText}. ${ui.lineTranslucent} ${translucentText}. ${ui.lineOpaque} ${opaqueText}.`;
  };

  const speakSummary = () => {
    if (
      typeof window === "undefined" ||
      typeof SpeechSynthesisUtterance === "undefined" ||
      !window.speechSynthesis
    ) {
      return;
    }

    const synth = window.speechSynthesis;
    const text = buildSummarySpeechText();
    const targetLocale = SPEECH_LOCALES[language] || "th-TH";

    const doSpeak = () => {
      const voices = synth.getVoices();
      const localeLower = targetLocale.toLowerCase();
      const prefix = localeLower.split("-")[0];

      let voice =
        voices.find((v) => v.lang?.toLowerCase() === localeLower) ||
        voices.find((v) => v.lang?.toLowerCase().startsWith(prefix));

      if (language === "ms") {
        // Prefer Malay voice, then Indonesian as the closest fallback, then any available voice.
        voice =
          voices.find((v) => v.lang?.toLowerCase() === "ms-my") ||
          voices.find((v) => v.lang?.toLowerCase().startsWith("ms")) ||
          voices.find((v) => /malay|melayu/i.test(v.name || "")) ||
          voices.find((v) => v.lang?.toLowerCase() === "id-id") ||
          voices.find((v) => v.lang?.toLowerCase().startsWith("id")) ||
          voices.find((v) => /indonesian|bahasa/i.test(v.name || "")) ||
          voices.find((v) => v.lang?.toLowerCase().startsWith("en")) ||
          voices[0];
      }

      const utterance = new SpeechSynthesisUtterance(text);
      if (voice) utterance.voice = voice;
      utterance.lang = voice?.lang || targetLocale;
      utterance.rate = language === "ms" ? 0.9 : 0.92;
      utterance.pitch = 1;

      synth.cancel();
      synth.speak(utterance);
    };

    const voices = synth.getVoices();
    if (voices.length) {
      doSpeak();
      return;
    }

    let spoke = false;
    const speakOnce = () => {
      if (spoke) return;
      spoke = true;
      doSpeak();
    };
    const onVoicesChanged = () => {
      synth.removeEventListener("voiceschanged", onVoicesChanged);
      speakOnce();
    };

    synth.addEventListener("voiceschanged", onVoicesChanged);
    setTimeout(() => {
      synth.removeEventListener("voiceschanged", onVoicesChanged);
      speakOnce();
    }, 500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#dceaf5] via-[#d6e6f2] to-[#c7d9e8] font-['Prompt',sans-serif]">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: "url('/images/materials/back.png')" }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-45 [background:radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.84),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(220,235,246,0.88),transparent_40%),linear-gradient(180deg,rgba(238,246,252,0.4),rgba(201,219,235,0.32))]" />

      <div className="relative z-10 min-h-screen overflow-y-auto p-3 pb-28 sm:h-screen sm:min-h-0 sm:overflow-hidden sm:p-4 sm:pb-32">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 sm:h-full sm:gap-4">
          <div className="overflow-hidden rounded-[28px] border border-[#bfd3e3] bg-[linear-gradient(180deg,rgba(244,248,251,0.88),rgba(228,237,245,0.82))] shadow-[0_16px_38px_rgba(106,138,165,0.16)] backdrop-blur-md sm:flex sm:min-h-0 sm:flex-1 sm:flex-col">
            <div className="flex items-center justify-between gap-3 border-b border-[#bed3e3] bg-gradient-to-r from-[#91bad6] via-[#89b4d1] to-[#7ca7c6] p-3 text-[#133149] sm:p-4">
              <h2 className="text-lg font-bold drop-shadow-[0_1px_0_rgba(255,255,255,0.35)] sm:text-xl">{ui.title}</h2>
              <button
                type="button"
                onClick={speakSummary}
                aria-label={ui.listenSummary}
                title={ui.listenSummary}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#a9c6dc] bg-[#edf4fa] text-xl text-[#537391] transition hover:bg-[#dfeaf3] hover:shadow-[0_8px_18px_rgba(122,146,167,0.18)] sm:h-14 sm:w-14 sm:text-2xl"
              >
                🔊
              </button>
            </div>

            <div className="p-4 text-[14px] leading-7 text-[#1f3d58] sm:flex-1 sm:overflow-y-auto sm:p-6 sm:text-base sm:leading-8">
              <p>{ui.intro1}</p>
              <p>{ui.intro2}</p>

              {language === "th" ? (
                <ul className="mt-2 space-y-2 sm:mt-3">
                  {ui.summaryBullets.map((text) => (
                    <li key={text}>• {text}</li>
                  ))}
                </ul>
              ) : (
                <ul className="mt-2 space-y-2 sm:mt-3">
                  <li>
                    • {ui.lineTransparent}{" "}
                    {formatList(
                      groupedNames.transparent,
                      FALLBACK_BY_TYPE.transparent[language] || FALLBACK_BY_TYPE.transparent.th,
                      language,
                      ui.andWord
                    )}
                  </li>
                  <li>
                    • {ui.lineTranslucent}{" "}
                    {formatList(
                      groupedNames.translucent,
                      FALLBACK_BY_TYPE.translucent[language] || FALLBACK_BY_TYPE.translucent.th,
                      language,
                      ui.andWord
                    )}
                  </li>
                  <li>
                    • {ui.lineOpaque}{" "}
                    {formatList(
                      groupedNames.opaque,
                      FALLBACK_BY_TYPE.opaque[language] || FALLBACK_BY_TYPE.opaque.th,
                      language,
                      ui.andWord
                    )}
                  </li>
                </ul>
              )}

            </div>
          </div>

        </div>
      </div>

      <div className="fixed bottom-4 left-4 z-30 sm:bottom-6 sm:left-6">
        <LightLanguageSwitcher value={language} onChange={setLanguage} />
      </div>

      <div className="fixed bottom-4 right-4 z-30 sm:bottom-6 sm:right-6">
        <LightNavButtons
          className="sm:shrink-0"
          backLabel={ui.back}
          nextLabel={ui.next}
          onBack={() => navigate("/p4/light/record", { state: { pendingResults: allResults } })}
          onNext={() => navigate("/p4/light/qa")}
        />
      </div>
    </div>
  );
}
