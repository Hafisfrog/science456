import { useNavigate } from "react-router-dom";
import { LANG_BUTTON_TEXT, useP5GeneticsLang } from "./p5GeneticsI18n";
import "./P5GeneticsSelect.css";

const PAGE_TEXT = {
  th: {
    chip: "\u0e0a\u0e31\u0e49\u0e19\u0e1b\u0e23\u0e30\u0e16\u0e21\u0e28\u0e36\u0e01\u0e29\u0e32\u0e1b\u0e35\u0e17\u0e35\u0e48 5",
    title: "\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e17\u0e32\u0e07\u0e1e\u0e31\u0e19\u0e18\u0e38\u0e01\u0e23\u0e23\u0e21",
    back: "\u2190 \u0e40\u0e25\u0e37\u0e2d\u0e01\u0e0a\u0e31\u0e49\u0e19",
    experiments: [
      {
        id: 6,
        title: "\u0e01\u0e32\u0e23\u0e17\u0e14\u0e25\u0e2d\u0e07\u0e17\u0e35\u0e48 6",
        label:
          "\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e17\u0e32\u0e07\u0e1e\u0e31\u0e19\u0e18\u0e38\u0e01\u0e23\u0e23\u0e21\u0e02\u0e2d\u0e07\u0e2a\u0e31\u0e15\u0e27\u0e4c",
        path: "/p5/life/genetics/animals",
        tone: "exp-red",
      },
      {
        id: 7,
        title: "\u0e01\u0e32\u0e23\u0e17\u0e14\u0e25\u0e2d\u0e07\u0e17\u0e35\u0e48 7",
        label:
          "\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e17\u0e32\u0e07\u0e1e\u0e31\u0e19\u0e18\u0e38\u0e01\u0e23\u0e23\u0e21\u0e02\u0e2d\u0e07\u0e1e\u0e37\u0e0a",
        path: "/p5/life/genetics/plants",
        tone: "exp-green",
      },
      {
        id: 8,
        title: "\u0e01\u0e32\u0e23\u0e17\u0e14\u0e25\u0e2d\u0e07\u0e17\u0e35\u0e48 8",
        label:
          "\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e17\u0e32\u0e07\u0e1e\u0e31\u0e19\u0e18\u0e38\u0e01\u0e23\u0e23\u0e21\u0e02\u0e2d\u0e07\u0e04\u0e19",
        path: "/p5/life/genetics/humans",
        tone: "exp-blue",
      },
    ],
  },
  en: {
    chip: "Grade 5",
    title: "Genetic Traits",
    back: "<- Back to Grades",
    experiments: [
      {
        id: 6,
        title: "Experiment 6",
        label: "Genetic Traits of Animals",
        path: "/p5/life/genetics/animals",
        tone: "exp-red",
      },
      {
        id: 7,
        title: "Experiment 7",
        label: "Genetic Traits of Plants",
        path: "/p5/life/genetics/plants",
        tone: "exp-green",
      },
      {
        id: 8,
        title: "Experiment 8",
        label: "Genetic Traits of Humans",
        path: "/p5/life/genetics/humans",
        tone: "exp-blue",
      },
    ],
  },
  ms: {
    chip: "Tahun 5",
    title: "Ciri Genetik",
    back: "<- Kembali ke Pilih Tahun",
    experiments: [
      {
        id: 6,
        title: "Eksperimen 6",
        label: "Ciri Genetik Haiwan",
        path: "/p5/life/genetics/animals",
        tone: "exp-red",
      },
      {
        id: 7,
        title: "Eksperimen 7",
        label: "Ciri Genetik Tumbuhan",
        path: "/p5/life/genetics/plants",
        tone: "exp-green",
      },
      {
        id: 8,
        title: "Eksperimen 8",
        label: "Ciri Genetik Manusia",
        path: "/p5/life/genetics/humans",
        tone: "exp-blue",
      },
    ],
  },
};

export default function P5GeneticsSelect() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const t = PAGE_TEXT[lang];
  const labels = LANG_BUTTON_TEXT[lang];

  return (
    <div className="p5gen-page">
      <div className="p5gen-sky" />
      <div className="p5gen-cloud cloud-a" />
      <div className="p5gen-cloud cloud-b" />
      <div className="p5gen-sun" />
      <div className="p5gen-halo" />
      <div className="p5gen-ground" />
      <div className="p5gen-fence left" />
      <div className="p5gen-fence right" />

      <button type="button" className="p5gen-back" onClick={() => navigate("/grades")}>
        {t.back}
      </button>

      <main className="p5gen-main">
        <div className="p5gen-chip">{t.chip}</div>

        <div className="p5gen-titlebox">
          <span className="p5gen-dot" />
          <h1>{t.title}</h1>
        </div>

        <section className="p5gen-map">
          <img className="p5gen-character" src="/images/p4/exp1/character-girl.png" alt="student" />

          <div className="p5gen-rail" />
          <div className="p5gen-list">
            {t.experiments.map((exp) => (
              <button
                key={exp.id}
                type="button"
                className={`p5gen-row ${exp.tone}`}
                onClick={() => navigate(exp.path)}
              >
                <span className="p5gen-row-title">{exp.title}</span>
                <span className="p5gen-row-label">{exp.label}</span>
              </button>
            ))}
          </div>
        </section>
      </main>

      <div className="p5gen-lang">
        <button
          type="button"
          className={lang === "th" ? "is-active" : ""}
          onClick={() => setLang("th")}
        >
          {labels.th}
        </button>
        <button
          type="button"
          className={lang === "en" ? "is-active" : ""}
          onClick={() => setLang("en")}
        >
          {labels.en}
        </button>
        <button
          type="button"
          className={lang === "ms" ? "is-active" : ""}
          onClick={() => setLang("ms")}
        >
          {labels.ms}
        </button>
        <button type="button" aria-label="audio" className="p5gen-audio">{"\uD83D\uDD0A"}</button>
      </div>
    </div>
  );
}

