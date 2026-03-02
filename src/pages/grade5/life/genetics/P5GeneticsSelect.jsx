import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";
import { LANG_BUTTON_TEXT, useP5GeneticsLang } from "./p5GeneticsI18n";
import "./P5GeneticsSelect.css";

const PAGE_TEXT = {
  th: {
    chip: "ชั้นประถมศึกษาปีที่ 5",
    title: "ลักษณะทางพันธุกรรม",
    back: "← เลือกชั้น",
    experiments: [
      { id: 6, title: "การทดลองที่ 6", label: "ลักษณะทางพันธุกรรมของสัตว์", path: "/p5/life/genetics/animals", colorClass: "exp-red" },
      { id: 7, title: "การทดลองที่ 7", label: "ลักษณะทางพันธุกรรมของพืช", path: "/p5/life/genetics/plants", colorClass: "exp-green" },
      { id: 8, title: "การทดลองที่ 8", label: "ลักษณะทางพันธุกรรมของคน", path: "/p5/life/genetics/humans", colorClass: "exp-blue" },
    ],
  },
  en: {
    chip: "Grade 5",
    title: "Genetic Traits",
    back: "← Back to Grades",
    experiments: [
      { id: 6, title: "Experiment 6", label: "Genetic Traits of Animals", path: "/p5/life/genetics/animals", colorClass: "exp-red" },
      { id: 7, title: "Experiment 7", label: "Genetic Traits of Plants", path: "/p5/life/genetics/plants", colorClass: "exp-green" },
      { id: 8, title: "Experiment 8", label: "Genetic Traits of Humans", path: "/p5/life/genetics/humans", colorClass: "exp-blue" },
    ],
  },
  ms: {
    chip: "Tahun 5",
    title: "Ciri Genetik",
    back: "← Kembali ke Pilih Tahun",
    experiments: [
      { id: 6, title: "Eksperimen 6", label: "Ciri Genetik Haiwan", path: "/p5/life/genetics/animals", colorClass: "exp-red" },
      { id: 7, title: "Eksperimen 7", label: "Ciri Genetik Tumbuhan", path: "/p5/life/genetics/plants", colorClass: "exp-green" },
      { id: 8, title: "Eksperimen 8", label: "Ciri Genetik Manusia", path: "/p5/life/genetics/humans", colorClass: "exp-blue" },
    ],
  },
};

export default function P5GeneticsSelect() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const t = PAGE_TEXT[lang];
  const labels = LANG_BUTTON_TEXT[lang];

  return (
    <LabLayout title={t.chip} showTeacher={false}>
      <div className="p5gen-page">
        <div className="p5gen-sun" />
        <div className="p5gen-cloud cloud-a" />
        <div className="p5gen-cloud cloud-b" />
        <div className="p5gen-halo" />
        <button type="button" className="p5gen-back" onClick={() => navigate("/grades")}>
          {t.back}
        </button>

        <section className="p5gen-main">
          <div className="p5gen-chip">{t.chip}</div>

          <div className="p5gen-titlebox">
            <span className="p5gen-dot" />
            <h1>{t.title}</h1>
          </div>

          <div className="p5gen-grid">
            {t.experiments.map((exp) => (
              <button key={exp.id} className="p5gen-card" onClick={() => navigate(exp.path)}>
                <div className="p5gen-card-media">
                  <img src="/images/p5.png" alt={exp.label} className="p5gen-card-img" />
                </div>
                <div className="p5gen-card-body">
                  <p className={`p5gen-exp ${exp.colorClass}`}>{exp.title}</p>
                  <h2>{exp.label}</h2>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="p5gen-lang">
          <button type="button" className={lang === "th" ? "is-active" : ""} onClick={() => setLang("th")}>
            {labels.th}
          </button>
          <button type="button" className={lang === "en" ? "is-active" : ""} onClick={() => setLang("en")}>
            {labels.en}
          </button>
          <button type="button" className={lang === "ms" ? "is-active" : ""} onClick={() => setLang("ms")}>
            {labels.ms}
          </button>
          <button type="button" aria-label="audio">
            🔊
          </button>
        </div>
      </div>
    </LabLayout>
  );
}
