import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";
import "./P6ElectricGenerationObjectives.css";

const CONTENT = {
  th: {
    exp: "การทดลองที่ 1",
    title: "เรื่อง การเกิดแรงไฟฟ้า",
    section: "ทักษะกระบวนการทางวิทยาศาสตร์",
    skills: [
      "ทักษะการสังเกต",
      "ทักษะการวัด",
      "ทักษะการทดลอง",
      "ทักษะการลงความเห็นจากข้อมูล",
    ],
    back: "ย้อนกลับ",
    next: "ต่อไป",
    langLabel: { th: "ไทย", ms: "มลายู", en: "อังกฤษ" },
  },
  en: {
    exp: "Experiment 1",
    title: "Electric Force Generation",
    section: "Science Process Skills",
    skills: [
      "Observation Skills",
      "Measurement Skills",
      "Experimentation Skills",
      "Inferring from Data",
    ],
    back: "Back",
    next: "Next",
    langLabel: { th: "Thai", ms: "Malay", en: "English" },
  },
  ms: {
    exp: "Eksperimen 1",
    title: "Penghasilan Daya Elektrik",
    section: "Kemahiran Proses Sains",
    skills: [
      "Kemahiran Memerhati",
      "Kemahiran Mengukur",
      "Kemahiran Mengeksperimen",
      "Membuat Inferens daripada Data",
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

export default function P6ElectricGenerationScienceSkills() {
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

        <section className="p6gen-obj-content p6gen-skills-content">
          <div className="p6gen-obj-label">{t.section}</div>

          <div className="p6gen-skills-grid">
            {t.skills.map((skill, index) => (
              <div className="p6gen-skill-pill p6gen-skill-pill-with-audio" key={skill}>
                <div className="p6gen-obj-num">{index + 1}</div>
                <div className="p6gen-skill-text">{skill}</div>
                <button
                  className="p6gen-obj-audio"
                  onClick={() => speakText(skill, lang)}
                  type="button"
                  aria-label={skill}
                  title={skill}
                >
                  {"\uD83D\uDD0A"}
                </button>
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
          onClick={() => navigate("/p6/experiment/electric-generation")}
          type="button"
        >
          {"\u00AB"} {t.back}
        </button>
        <button
          className="next"
          onClick={() => navigate("/p6/experiment/electric-generation/materials?from=unit")}
          type="button"
        >
          {t.next} {"\u00BB"}
        </button>
      </div>
    </div>
  );
}
