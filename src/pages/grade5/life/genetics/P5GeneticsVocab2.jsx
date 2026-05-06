import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import { FoodChainNavButtons } from "../foodchain/FoodChainControls";
import { useP5GeneticsLang } from "./p5GeneticsI18n";
import "./P5GeneticsVocab.css";

const VOCAB = [
  { th: "การสืบพันธุ์", ms: "บิญัก", en: "Reproduction" },
  { th: "ลักษณะของขน", ms: "จีรี บูลู", en: "Hair Characteristics" },
  { th: "ลักษณะใบหู", ms: "จีรี ตือลิงอ", en: "Ear Shape" },
  { th: "สีดอก", ms: "วารนอ บูงอ", en: "Flower Color" },
  { th: "เพิ่มจำนวน", ms: "ตามะ บีลาแง", en: "Proliferate" },
];

const CONTENT = {
  th: {
    title: "คำศัพท์วิทยาศาสตร์น่ารู้",
    subtitle: "เรื่อง ลักษณะทางพันธุกรรม",
    colTh: "ภาษาไทย",
    colMs: "ภาษามลายู",
    colEn: "ภาษาอังกฤษ",
    colAudio: "ฟังเสียง",
    back: "ย้อนกลับ",
    next: "ต่อไป",
    speak: "ฟัง",
    langLabel: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    title: "Science Vocabulary",
    subtitle: "Topic: Genetic traits",
    colTh: "Thai",
    colMs: "Malay",
    colEn: "English",
    colAudio: "Audio",
    back: "Back",
    next: "Next",
    speak: "Listen",
    langLabel: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    title: "Kosa Kata Sains",
    subtitle: "Topik: Ciri genetik",
    colTh: "Bahasa Thai",
    colMs: "Bahasa Melayu",
    colEn: "Bahasa Inggeris",
    colAudio: "Audio",
    back: "Kembali",
    next: "Seterusnya",
    speak: "Dengar",
    langLabel: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

const VOICE_LANG = { th: "th-TH", en: "en-US", ms: "ms-MY" };

export default function P5GeneticsVocab2() {
  const navigate = useNavigate();
  const { lang } = useP5GeneticsLang();
  const content = CONTENT[lang] ?? CONTENT.th;

  const tableSpeech = useMemo(
    () => ({
      th: `${content.title}. ${VOCAB.map((row) => row.th).join(". ")}`,
      ms: `${content.title}. ${VOCAB.map((row) => row.ms).join(". ")}`,
      en: `${content.title}. ${VOCAB.map((row) => row.en).join(". ")}`,
    }),
    [content.title]
  );

  const speak = (text, voiceKey = lang) => {
    try {
      if (!text || typeof window === "undefined" || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = VOICE_LANG[voiceKey] ?? VOICE_LANG.th;
      utterance.rate = 0.92;
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore speech errors
    }
  };

  return (
    <div className="p5gv-page">
      <HomeButton />

      <header className="p5gv-header">
        <h1>{content.title}</h1>
        <p>{content.subtitle}</p>
        {/* <button
          className="p5gv-titleAudio"
          type="button"
          title={content.speak}
          onClick={() => speak(tableSpeech[lang], lang)}
        >
          {"\uD83D\uDD0A"}
        </button> */}
      </header>

      <main className="p5gv-card">
        <table className="p5gv-table">
          <thead>
            <tr>
              <th className="p5gv-colTh">{content.colTh}</th>
              <th className="p5gv-colMs">{content.colMs}</th>
              <th className="p5gv-colEn">{content.colEn}</th>
              <th className="p5gv-colAudio">{content.colAudio}</th>
            </tr>
          </thead>
          <tbody>
            {VOCAB.map((row) => (
              <tr key={row.en}>
                <td className="p5gv-cellTh">{row.th}</td>
                <td className="p5gv-cellMs">{row.ms}</td>
                <td className="p5gv-cellEn">{row.en}</td>
                <td className="p5gv-cellAudio">
                  <button className="p5gv-audioBtn th" type="button" onClick={() => speak(row.th, "th")}>
                    TH
                  </button>
                  <button className="p5gv-audioBtn ms" type="button" onClick={() => speak(row.ms, "ms")}>
                    MY
                  </button>
                  <button className="p5gv-audioBtn en" type="button" onClick={() => speak(row.en, "en")}>
                    EN
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <div className="p5gv-nav">
        <FoodChainNavButtons
          size="materials"
          backLabel={content.back}
          nextLabel={content.next}
          onBack={() => navigate("/p5/life/genetics/vocab")}
          onNext={() => navigate("/p5/life/genetics")}
          nextArrow={"\u00BB"}
        />
      </div>
    </div>
  );
}
