import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const EQUIPMENT_ITEMS = [
  {
    id: "balloons",
    image: "/images/p6/equipment/balloons-real.svg",
    name: {
      th: "ลูกโป่งที่เป่าให้พอง 2 ลูก",
      en: "2 inflated balloons",
      ms: "2 belon yang ditiup",
    },
    alt: {
      th: "ลูกโป่งสีแดง 2 ลูก",
      en: "Two red balloons",
      ms: "Dua belon merah",
    },
  },
  {
    id: "markers",
    image: "/images/p6/equipment/markers-real.svg",
    name: {
      th: "ปากกาเมจิก 2 ด้าม",
      en: "2 marker pens",
      ms: "2 batang pen marker",
    },
    alt: {
      th: "ปากกาเมจิกสีเขียว 2 ด้าม",
      en: "Two green marker pens",
      ms: "Dua pen marker hijau",
    },
  },
  {
    id: "tissue",
    image: "/images/p6/equipment/tissue-real.svg",
    name: {
      th: "กระดาษเยื่อ",
      en: "Tissue paper",
      ms: "Kertas tisu",
    },
    alt: {
      th: "กระดาษเยื่อสำหรับทดลอง",
      en: "Tissue paper for experiment",
      ms: "Kertas tisu untuk eksperimen",
    },
  },
];

const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย", speechLang: "th-TH" },
  { id: "en", label: "English", speechLang: "en-US" },
  { id: "ms", label: "Melayu", speechLang: "ms-MY" },
];

const PAGE_TEXT = {
  th: {
    title: "การทดลองที่ 10 เรื่อง ผลของแรงไฟฟ้า",
    heading: "อุปกรณ์",
    hint: "กดที่อุปกรณ์เพื่อฟังชื่อ",
    listenTitle: "ฟังเสียงหัวข้อ",
    listenItems: "ฟังเสียงรายการอุปกรณ์",
    back: "กลับหน้าเลือกการทดลอง",
    next: "ไปหน้าถัดไป",
    speakPrefix: "ฟังชื่ออุปกรณ์",
  },
  en: {
    title: "Experiment 10: Effects of Electric Force",
    heading: "Equipment",
    hint: "Tap an item to hear its name",
    listenTitle: "Listen to title",
    listenItems: "Listen to equipment list",
    back: "Back to experiment selection",
    next: "Go to next page",
    speakPrefix: "Hear item name",
  },
  ms: {
    title: "Eksperimen 10: Kesan Daya Elektrik",
    heading: "Peralatan",
    hint: "Tekan peralatan untuk dengar nama",
    listenTitle: "Dengar tajuk",
    listenItems: "Dengar senarai peralatan",
    back: "Kembali ke pilihan eksperimen",
    next: "Pergi ke halaman seterusnya",
    speakPrefix: "Dengar nama peralatan",
  },
};

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;

  const voices = window.speechSynthesis.getVoices();
  const exact = voices.find((voice) => voice.lang.toLowerCase() === lang.toLowerCase());
  const fallback = voices.find((voice) =>
    voice.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase()),
  );

  if (exact || fallback) {
    utterance.voice = exact || fallback;
  }

  window.speechSynthesis.speak(utterance);
}

function EquipmentVisual({ image, alt }) {
  return (
    <img
      className="h-[90%] w-[90%] object-contain"
      style={{ filter: "drop-shadow(0 8px 10px rgba(15, 23, 42, 0.16))" }}
      src={image}
      alt={alt}
      loading="lazy"
    />
  );
}

export default function P6ElectricForceEffect() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const t = PAGE_TEXT[language];
  const speechLang = LANGUAGE_OPTIONS.find((item) => item.id === language)?.speechLang || "th-TH";

  const equipmentNames = useMemo(
    () => EQUIPMENT_ITEMS.map((item) => item.name[language] || item.name.th),
    [language],
  );

  const speakItem = useCallback(
    (itemName) => {
      speakText(itemName, speechLang);
    },
    [speechLang],
  );

  const speakTitle = useCallback(() => {
    speakText(`${t.title}. ${t.heading}.`, speechLang);
  }, [speechLang, t.heading, t.title]);

  const speakAllItems = useCallback(() => {
    speakText(`${t.heading}: ${equipmentNames.join(", ")}`, speechLang);
  }, [equipmentNames, speechLang, t.heading]);

  const pageBg = {
    background:
      "radial-gradient(circle at 15% 16%, rgba(210, 236, 247, 0.66), transparent 30%), radial-gradient(circle at 90% 26%, rgba(213, 241, 255, 0.6), transparent 28%), linear-gradient(180deg, #f7f3f2 0%, #f4f8fc 52%, #eef5fb 100%)",
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden px-[clamp(14px,2vw,24px)] pb-[clamp(12px,1.8vw,20px)] pt-[clamp(10px,1.6vw,18px)] text-slate-900"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="mx-auto grid h-full w-full max-w-[1520px] grid-rows-[auto_1fr_auto] gap-[clamp(10px,1.2vw,14px)]">
        <div className="relative pr-[76px] max-[720px]:pr-0">
          <div
            className="rounded-[28px] border-2 border-white/90 px-[clamp(16px,3vw,24px)] py-[clamp(14px,2vw,20px)] shadow-[0_14px_24px_rgba(15,23,42,0.1)]"
            style={{
              background:
                "radial-gradient(circle at 15% 30%, rgba(205, 234, 247, 0.8), transparent 32%), radial-gradient(circle at 86% 18%, rgba(205, 234, 247, 0.65), transparent 30%), linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(249, 251, 255, 0.94))",
            }}
          >
            <div className="text-center text-[clamp(22px,2.4vw,52px)] font-black leading-[1.16] text-slate-900">
              {t.title}
            </div>
          </div>

          <button
            type="button"
            className="absolute right-0 top-1/2 grid h-[58px] w-[58px] -translate-y-1/2 place-items-center rounded-2xl border-2 border-slate-900/40 bg-white/75 text-slate-800 shadow-[0_10px_18px_rgba(17,24,39,0.16)] max-[720px]:static max-[720px]:mt-3 max-[720px]:ml-auto max-[720px]:translate-y-0"
            title={t.listenTitle}
            aria-label={t.listenTitle}
            onClick={speakTitle}
          >
            <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
              <path
                d="M12 26h12l14-10v32l-14-10H12z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M44 22c4 4 4 16 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M50 16c7 7 7 25 0 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="rounded-3xl border-2 border-white/90 bg-white/55 p-[clamp(14px,1.8vw,22px)] shadow-[0_14px_24px_rgba(15,23,42,0.08)]">
          <div className="mb-[clamp(10px,1.2vw,14px)] text-[clamp(24px,2.6vw,46px)] font-black leading-[1.1] text-slate-900 max-[980px]:text-center">
            {t.heading}
          </div>
          <div className="mb-3 mt-[-2px] text-[clamp(14px,1.2vw,17px)] font-bold text-slate-700">{t.hint}</div>

          <div className="grid grid-cols-1 items-start gap-[clamp(10px,1.2vw,16px)] min-[721px]:grid-cols-2 min-[981px]:grid-cols-3">
            {EQUIPMENT_ITEMS.map((item) => (
              <article className="text-center" key={item.id}>
                <button
                  type="button"
                  className="w-full cursor-pointer border-none bg-transparent p-0 text-inherit"
                  onClick={() => speakItem(item.name[language] || item.name.th)}
                  aria-label={`${t.speakPrefix}: ${item.name[language] || item.name.th}`}
                  title={`${t.speakPrefix}: ${item.name[language] || item.name.th}`}
                >
                  <div
                    className="relative aspect-[1/0.66] w-full rounded-lg border-2 border-[#b8862f] bg-[#e9d3b1] p-[clamp(8px,1.2vw,12px)] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_16px_rgba(15,23,42,0.14)] transition hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_14px_20px_rgba(15,23,42,0.18)]"
                  >
                    <span
                      className="absolute left-[-9px] top-[-9px] h-4 w-4 border-2 border-[#24335f] bg-[#fff7e8]"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, transparent 46%, #24335f 46%, #24335f 54%, transparent 54%), linear-gradient(-45deg, transparent 46%, #24335f 46%, #24335f 54%, transparent 54%)",
                        boxShadow: "0 3px 4px rgba(15, 23, 42, 0.16)",
                      }}
                    />
                    <span
                      className="absolute right-[-9px] top-[-9px] h-4 w-4 border-2 border-[#24335f] bg-[#fff7e8]"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, transparent 46%, #24335f 46%, #24335f 54%, transparent 54%), linear-gradient(-45deg, transparent 46%, #24335f 46%, #24335f 54%, transparent 54%)",
                        boxShadow: "0 3px 4px rgba(15, 23, 42, 0.16)",
                      }}
                    />
                    <span
                      className="absolute bottom-[-9px] left-[-9px] h-4 w-4 border-2 border-[#24335f] bg-[#fff7e8]"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, transparent 46%, #24335f 46%, #24335f 54%, transparent 54%), linear-gradient(-45deg, transparent 46%, #24335f 46%, #24335f 54%, transparent 54%)",
                        boxShadow: "0 3px 4px rgba(15, 23, 42, 0.16)",
                      }}
                    />
                    <span
                      className="absolute bottom-[-9px] right-[-9px] h-4 w-4 border-2 border-[#24335f] bg-[#fff7e8]"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, transparent 46%, #24335f 46%, #24335f 54%, transparent 54%), linear-gradient(-45deg, transparent 46%, #24335f 46%, #24335f 54%, transparent 54%)",
                        boxShadow: "0 3px 4px rgba(15, 23, 42, 0.16)",
                      }}
                    />
                    <EquipmentVisual image={item.image} alt={item.alt[language] || item.alt.th} />
                  </div>
                  <div className="mt-2 text-[clamp(18px,1.9vw,34px)] font-black leading-[1.22] text-slate-900 max-[720px]:text-[clamp(22px,7vw,30px)]">
                    {item.name[language] || item.name.th}
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 max-[720px]:justify-center">
          <div className="inline-flex items-center gap-2 rounded-[18px] border border-blue-500/30 bg-white/90 p-2 shadow-[0_12px_20px_rgba(15,23,42,0.14)]">
            {LANGUAGE_OPTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`cursor-pointer rounded-full px-[14px] py-[7px] text-[clamp(15px,1.8vw,18px)] font-black transition ${
                  language === item.id
                    ? "bg-sky-500 text-white"
                    : "bg-[#d7edff] text-sky-700 hover:-translate-y-0.5"
                }`}
                onClick={() => setLanguage(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              className="grid h-[42px] w-[42px] place-items-center rounded-[14px] border border-sky-500/35 bg-gradient-to-b from-[#f8fcff] to-sky-100 text-sky-700"
              aria-label={t.listenItems}
              title={t.listenItems}
              onClick={speakAllItems}
            >
              <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
                <path
                  d="M12 26h12l14-10v32l-14-10H12z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path
                  d="M44 22c4 4 4 16 0 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="ml-auto mt-0 flex flex-nowrap justify-end gap-2 max-[720px]:ml-0">
            <button
              className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-[28px] font-black leading-none text-slate-900 shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
              onClick={() => navigate("/p6/electric-force/experiments")}
              type="button"
              aria-label={t.back}
              title={t.back}
            >
              ←
            </button>
            <button
              className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-blue-600 text-[28px] font-black leading-none text-white shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
              onClick={() => navigate("/p6/experiment/electric-force-effect/steps")}
              type="button"
              aria-label={t.next}
              title={t.next}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
