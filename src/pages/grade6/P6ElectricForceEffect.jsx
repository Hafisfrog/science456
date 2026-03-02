import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P6ElectricGenerationSteps.css";
import "./P6ElectricForceEffectMaterials.css";

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
  return <img className="p6-force-mat-image" src={image} alt={alt} loading="lazy" />;
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

  return (
    <div className="p6-gen-page p6-force-mat-page">
      <div className="p6-gen-container p6-force-mat-container">
        <div className="p6-force-mat-head">
          <div className="p6-force-mat-titleWrap">
            <div className="p6-force-mat-title">{t.title}</div>
          </div>

          <button
            type="button"
            className="p6-gen-sound p6-force-mat-sound"
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

        <div className="p6-force-mat-board">
          <div className="p6-force-mat-heading">{t.heading}</div>
          <div className="p6-force-mat-hint">{t.hint}</div>
          <div className="p6-force-mat-grid">
            {EQUIPMENT_ITEMS.map((item) => (
              <article className="p6-force-mat-card" key={item.id}>
                <button
                  type="button"
                  className="p6-force-mat-cardBtn"
                  onClick={() => speakItem(item.name[language] || item.name.th)}
                  aria-label={`${t.speakPrefix}: ${item.name[language] || item.name.th}`}
                  title={`${t.speakPrefix}: ${item.name[language] || item.name.th}`}
                >
                  <div className="p6-force-mat-frame">
                    <span className="p6-force-mat-corner tl" />
                    <span className="p6-force-mat-corner tr" />
                    <span className="p6-force-mat-corner bl" />
                    <span className="p6-force-mat-corner br" />
                    <EquipmentVisual image={item.image} alt={item.alt[language] || item.alt.th} />
                  </div>
                  <div className="p6-force-mat-label">{item.name[language] || item.name.th}</div>
                </button>
              </article>
            ))}
          </div>
        </div>

        <div className="p6-force-mat-bottom">
          <div className="p6-force-mat-langbar">
            {LANGUAGE_OPTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`p6-force-mat-langChip ${language === item.id ? "active" : ""}`}
                onClick={() => setLanguage(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              className="p6-force-mat-langSound"
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

          <div className="p6-gen-actions p6-force-mat-actions">
            <button
              className="p6-gen-btn ghost"
              onClick={() => navigate("/p6/electric-force/experiments")}
              type="button"
              aria-label={t.back}
              title={t.back}
            >
              ←
            </button>
            <button
              className="p6-gen-btn primary"
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
