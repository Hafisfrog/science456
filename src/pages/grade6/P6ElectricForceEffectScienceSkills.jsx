import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";
import "./P6ElectricGenerationObjectives.css";

const CONTENT = {
  th: {
    exp: "การทดลองที่ 2",
    title: "เรื่อง ผลของแรงไฟฟ้า",
    section: "ทักษะกระบวนการทางวิทยาศาสตร์",
    skills: [
      { number: 1, text: "ทักษะการสังเกต" },
      { number: 2, text: "ทักษะการตีความหมายข้อมูลและลงข้อสรุป" },
      { number: 3, text: "ทักษะการลงความเห็นจากข้อมูล" },
    ],
    back: "ย้อนกลับ",
    next: "ต่อไป",
    langLabel: { th: "ไทย", ms: "มลายู", en: "อังกฤษ" },
  },
  en: {
    exp: "Experiment 2",
    title: "Effects of Electric Force",
    section: "Science Process Skills",
    skills: [
      { number: 1, text: "Observation Skills" },
      { number: 2, text: "Interpreting Data and Drawing Conclusions" },
      { number: 3, text: "Inferring from Data" },
    ],
    back: "Back",
    next: "Next",
    langLabel: { th: "Thai", ms: "Malay", en: "English" },
  },
  ms: {
    exp: "Eksperimen 2",
    title: "Kesan Daya Elektrik",
    section: "Kemahiran Proses Sains",
    skills: [
      { number: 1, text: "Kemahiran Memerhati" },
      { number: 2, text: "Mentafsir Data dan Membuat Kesimpulan" },
      { number: 3, text: "Membuat Inferens daripada Data" },
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

export default function P6ElectricForceEffectScienceSkills() {
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

        <section className="p6gen-obj-content p6gen-force-skills-content">
          <div className="p6gen-obj-label">{t.section}</div>

          <div className="p6gen-force-skills-list">
            {t.skills.map((skill) => (
              <div
                className="p6gen-skill-pill p6gen-force-skill-pill p6gen-skill-pill-with-audio"
                key={skill.number}
              >
                <div className="p6gen-obj-num">{skill.number}</div>
                <div className="p6gen-skill-text">{skill.text}</div>
                <button
                  className="p6gen-obj-audio"
                  onClick={() => speakText(skill.text, lang)}
                  type="button"
                  aria-label={skill.text}
                  title={skill.text}
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
          onClick={() => navigate("/p6/experiment/electric-force-effect/objectives")}
          type="button"
        >
          {"\u00AB"} {t.back}
        </button>
        <button
          className="next"
          onClick={() => navigate("/p6/experiment/electric-force-effect")}
          type="button"
        >
          {t.next} {"\u00BB"}
        </button>
      </div>
    </div>
  );
}
