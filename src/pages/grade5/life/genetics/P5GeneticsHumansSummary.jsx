import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";
import { LANG_BUTTON_TEXT, useP5GeneticsLang } from "./p5GeneticsI18n";
import "./P5GeneticsHumansSummary.css";

const TEXT = {
  th: {
    title: "\u0e2a\u0e23\u0e38\u0e1b\u0e1c\u0e25\u0e01\u0e32\u0e23\u0e17\u0e14\u0e25\u0e2d\u0e07",
    intro:
      "\u0e08\u0e32\u0e01\u0e20\u0e32\u0e1e\u0e01\u0e32\u0e23\u0e17\u0e14\u0e25\u0e2d\u0e07 \u0e1e\u0e1a\u0e27\u0e48\u0e32 \u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e02\u0e2d\u0e07\u0e04\u0e19\u0e41\u0e1a\u0e48\u0e07\u0e2d\u0e2d\u0e01\u0e44\u0e14\u0e49\u0e40\u0e1b\u0e47\u0e19 2 \u0e1b\u0e23\u0e30\u0e40\u0e20\u0e17 \u0e04\u0e37\u0e2d",
    box1Title: "\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e17\u0e32\u0e07\u0e1e\u0e31\u0e19\u0e18\u0e38\u0e01\u0e23\u0e23\u0e21\u0e02\u0e2d\u0e07\u0e04\u0e19",
    box1Desc:
      "\u0e40\u0e1b\u0e47\u0e19\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e17\u0e35\u0e48 \u0e16\u0e48\u0e32\u0e22\u0e17\u0e2d\u0e14\u0e21\u0e32\u0e08\u0e32\u0e01\u0e1e\u0e48\u0e2d\u0e41\u0e21\u0e48 \u0e41\u0e25\u0e30\u0e15\u0e34\u0e14\u0e15\u0e31\u0e27\u0e21\u0e32\u0e15\u0e31\u0e49\u0e07\u0e41\u0e15\u0e48\u0e40\u0e01\u0e34\u0e14 \u0e40\u0e0a\u0e48\u0e19",
    box1Items: [
      "\u0e15\u0e32 2 \u0e0a\u0e31\u0e49\u0e19",
      "\u0e08\u0e21\u0e39\u0e01",
      "\u0e23\u0e39\u0e1b\u0e23\u0e48\u0e32\u0e07\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32",
      "\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e1c\u0e21 (\u0e2b\u0e22\u0e34\u0e01 / \u0e15\u0e23\u0e07)",
    ],
    box2Title: "\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e17\u0e35\u0e48\u0e40\u0e01\u0e34\u0e14\u0e08\u0e32\u0e01\u0e01\u0e32\u0e23\u0e40\u0e23\u0e35\u0e22\u0e19\u0e23\u0e39\u0e49",
    box2Desc:
      "\u0e40\u0e1b\u0e47\u0e19\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e17\u0e35\u0e48\u0e44\u0e21\u0e48\u0e44\u0e14\u0e49\u0e16\u0e48\u0e32\u0e22\u0e17\u0e2d\u0e14\u0e17\u0e32\u0e07\u0e1e\u0e31\u0e19\u0e18\u0e38\u0e01\u0e23\u0e23\u0e21 \u0e41\u0e15\u0e48\u0e40\u0e01\u0e34\u0e14\u0e08\u0e32\u0e01\u0e01\u0e32\u0e23\u0e1d\u0e36\u0e01\u0e1d\u0e19\u0e2b\u0e23\u0e37\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e0a\u0e2d\u0e1a \u0e40\u0e0a\u0e48\u0e19",
    box2Items: [
      "\u0e0a\u0e2d\u0e1a\u0e27\u0e32\u0e14\u0e23\u0e39\u0e1b",
      "\u0e0a\u0e2d\u0e1a\u0e40\u0e25\u0e48\u0e19\u0e14\u0e19\u0e15\u0e23\u0e35",
      "\u0e0a\u0e2d\u0e1a\u0e40\u0e25\u0e48\u0e19\u0e01\u0e35\u0e2c\u0e32",
      "\u0e0a\u0e2d\u0e1a\u0e2a\u0e35\u0e40\u0e02\u0e35\u0e22\u0e27",
    ],
    back: "\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a",
    select: "\u0e01\u0e25\u0e31\u0e1a\u0e44\u0e1b\u0e2b\u0e19\u0e49\u0e32\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e01\u0e32\u0e23\u0e17\u0e14\u0e25\u0e2d\u0e07",
  },
  en: {
    title: "Experiment Summary",
    intro: "From the experiment, human characteristics can be grouped into 2 categories:",
    box1Title: "Inherited Traits",
    box1Desc: "Traits passed down from parents and present from birth, such as:",
    box1Items: ["Double eyelid", "Nose shape", "Face shape", "Hair type (curly / straight)"],
    box2Title: "Learned Traits",
    box2Desc: "Traits not inherited genetically, but developed through learning or preference, such as:",
    box2Items: ["Likes drawing", "Likes playing music", "Likes sports", "Likes green color"],
    back: "Back",
    select: "Back to Experiment Selection",
  },
  ms: {
    title: "Rumusan Eksperimen",
    intro: "Daripada eksperimen, ciri manusia boleh dibahagikan kepada 2 kategori:",
    box1Title: "Ciri Warisan",
    box1Desc: "Ciri yang diwarisi daripada ibu bapa dan ada sejak lahir, contohnya:",
    box1Items: ["Mata 2 kelopak", "Bentuk hidung", "Bentuk muka", "Jenis rambut (kerinting / lurus)"],
    box2Title: "Ciri Pembelajaran",
    box2Desc:
      "Ciri yang tidak diwarisi secara genetik tetapi terbentuk melalui latihan atau minat, contohnya:",
    box2Items: ["Suka melukis", "Suka bermain muzik", "Suka bersukan", "Suka warna hijau"],
    back: "Kembali",
    select: "Kembali ke Pilihan Eksperimen",
  },
};

export default function P5GeneticsHumansSummary() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const labels = LANG_BUTTON_TEXT[lang];
  const t = TEXT[lang];

  return (
    <LabLayout title={t.title} showTeacher={false}>
      <div className="p5ghs-page">
        <div className="p5ghs-sun" />

        <section className="p5ghs-panel">
          <h1>{t.title}</h1>
          <p className="p5ghs-intro">{t.intro}</p>

          <div className="p5ghs-grid">
            <article className="p5ghs-note">
              <div className="p5ghs-tab" aria-hidden="true" />
              <h2>{t.box1Title}</h2>
              <p>{t.box1Desc}</p>
              <ul>
                {t.box1Items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="p5ghs-note">
              <div className="p5ghs-tab" aria-hidden="true" />
              <h2>{t.box2Title}</h2>
              <p>{t.box2Desc}</p>
              <ul>
                {t.box2Items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <footer className="p5ghs-ground">
          <div className="p5ghs-lang">
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
            <button type="button" className="p5ghs-audio" aria-label="audio">
              {"\uD83D\uDD0A"}
            </button>
          </div>

          <div className="p5ghs-actions">
            <button type="button" className="p5ghs-back" onClick={() => navigate("/p5/life/genetics/humans")}>
              {t.back}
            </button>
            <button type="button" className="p5ghs-select" onClick={() => navigate("/p5/life/genetics")}>
              {t.select}
            </button>
          </div>
        </footer>
      </div>
    </LabLayout>
  );
}
