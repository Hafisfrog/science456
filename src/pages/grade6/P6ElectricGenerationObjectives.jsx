import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";
import "./P6ElectricGenerationObjectives.css";

const CONTENT = {
  th: {
    exp: "การทดลองที่ 1",
    title: "เรื่อง การเกิดแรงไฟฟ้า",
    section: "จุดประสงค์การเรียนรู้",
    objectives: [
      "ศึกษาการเกิดแรงไฟฟ้าสถิตจากการเสียดสี",
      "สังเกตผลของแรงไฟฟ้าที่เกิดขึ้น",
      "ศึกษาความสัมพันธ์ระหว่างระยะเวลาในการถูลูกโป่งกับแรงไฟฟ้าที่เกิดขึ้น",
    ],
    back: "ย้อนกลับ",
    next: "ต่อไป",
    langLabel: { th: "ไทย", ms: "มลายู", en: "อังกฤษ" },
  },
  en: {
    exp: "Experiment 1",
    title: "Electric Force Generation",
    section: "Learning Objectives",
    objectives: [
      "Study how static electric force is generated through friction.",
      "Observe the effects of the electric force that occurs.",
      "Study the relationship between rubbing time and the electric force produced.",
    ],
    back: "Back",
    next: "Next",
    langLabel: { th: "Thai", ms: "Malay", en: "English" },
  },
  ms: {
    exp: "Eksperimen 1",
    title: "Penghasilan Daya Elektrik",
    section: "Objektif Pembelajaran",
    objectives: [
      "Mengkaji penghasilan daya elektrik statik melalui geseran.",
      "Memerhati kesan daya elektrik yang terhasil.",
      "Mengkaji hubungan antara tempoh menggosok belon dengan daya elektrik yang terhasil.",
    ],
    back: "Kembali",
    next: "Seterusnya",
    langLabel: { th: "Thai", ms: "Melayu", en: "English" },
  },
};

const SPEECH_LANG = {
  th: "th-TH",
  en: "en-US",
  ms: "ms-MY",
};

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = SPEECH_LANG[lang] ?? "th-TH";
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

export default function P6ElectricGenerationObjectives() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = CONTENT[lang] ?? CONTENT.th;

  return (
    <div className="p6gen-obj-page">
      <HomeButton />

      <div className="p6gen-obj-light left" aria-hidden="true" />
      <div className="p6gen-obj-light right" aria-hidden="true" />
      <div className="p6gen-obj-bolt" aria-hidden="true" />
      <div className="p6gen-obj-magnet" aria-hidden="true" />
      <div className="p6gen-obj-solar left" aria-hidden="true" />
      <div className="p6gen-obj-solar right" aria-hidden="true" />

      <main className="p6gen-obj-shell">
        <header className="p6gen-obj-header">
          <h2>{t.exp}</h2>
          <h1>{t.title}</h1>
        </header>

        <section className="p6gen-obj-content">
          <div className="p6gen-obj-label">{t.section}</div>

          <div className="p6gen-obj-list">
            {t.objectives.map((objective, index) => (
              <div className="p6gen-obj-row" key={objective}>
                <div className="p6gen-obj-num">{index + 1}</div>
                <div className="p6gen-obj-pill p6gen-obj-pill-with-audio">
                  <span>{objective}</span>
                  <button
                    className="p6gen-obj-audio"
                    onClick={() => speakText(objective, lang)}
                    type="button"
                    aria-label={objective}
                    title={objective}
                  >
                    {"\uD83D\uDD0A"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div className="p6gen-obj-lang">
        <button
          className={lang === "th" ? "active" : ""}
          onClick={() => setLang("th")}
          type="button"
        >
          {t.langLabel.th}
        </button>
        <button
          className={lang === "ms" ? "active" : ""}
          onClick={() => setLang("ms")}
          type="button"
        >
          {t.langLabel.ms}
        </button>
        <button
          className={lang === "en" ? "active" : ""}
          onClick={() => setLang("en")}
          type="button"
        >
          {t.langLabel.en}
        </button>
      </div>

      <div className="p6gen-obj-nav">
        <button
          className="back"
          onClick={() => navigate("/p6/electric-force/experiments")}
          type="button"
        >
          {"\u00AB"} {t.back}
        </button>
        <button
          className="next"
          onClick={() => navigate("/p6/experiment/electric-generation/skills")}
          type="button"
        >
          {t.next} {"\u00BB"}
        </button>
      </div>
    </div>
  );
}
