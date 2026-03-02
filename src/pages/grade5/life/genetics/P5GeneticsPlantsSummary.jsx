import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";
import { LANG_BUTTON_TEXT, NEXT_LABEL, useP5GeneticsLang } from "./p5GeneticsI18n";
import "./P5GeneticsPlantsSummary.css";

const TEXT = {
  th: {
    title: "สรุปผลการทดลอง",
    p1: "จากการทดลอง พบว่า",
    items: ["ลักษณะ ความสูงของพืช ถูกควบคุมด้วยยีน 1 คู่", "ยีนมี 2 แบบ คือ"],
    a: "A = ยีนเด่น แสดงลักษณะ พืชสูง",
    b: "a = ยีนด้อย แสดงลักษณะ พืชเตี้ย",
    result: "เมื่อนำมาผสมกันพบว่า พืชทุกต้นแสดงลักษณะต้นสูง",
  },
  en: {
    title: "Experiment Summary",
    p1: "From the experiment, we found:",
    items: ["Plant height is controlled by one gene pair.", "There are 2 alleles:"],
    a: "A = dominant allele, shows tall trait",
    b: "a = recessive allele, shows short trait",
    result: "When crossed, all offspring showed the tall trait.",
  },
  ms: {
    title: "Rumusan Eksperimen",
    p1: "Daripada eksperimen, didapati:",
    items: ["Ciri ketinggian tumbuhan dikawal oleh satu pasangan gen.", "Terdapat 2 alel:"],
    a: "A = alel dominan, menunjukkan ciri tinggi",
    b: "a = alel resesif, menunjukkan ciri rendah",
    result: "Apabila dikacukkan, semua anak menunjukkan ciri pokok tinggi.",
  },
};

export default function P5GeneticsPlantsSummary() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const labels = LANG_BUTTON_TEXT[lang];
  const t = TEXT[lang];

  return (
    <LabLayout title={t.title} showTeacher={false}>
      <div className="p5gps-page">
        <div className="p5gps-sun" aria-hidden="true" />
        <section className="p5gps-panel">
          <h1>{t.title}</h1>

          <div className="p5gps-note">
            <div className="p5gps-top-tabs" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <p>{t.p1}</p>
            <ul>
              <li>{t.items[0]}</li>
              <li>{t.items[1]}</li>
            </ul>
            <p className="p5gps-indent">• {t.a}</p>
            <p className="p5gps-indent">• {t.b}</p>
            <p className="p5gps-result">{t.result}</p>
          </div>
        </section>

        <footer className="p5gps-ground">
          <div className="p5gps-lang">
            <button type="button" className={lang === "th" ? "is-active" : ""} onClick={() => setLang("th")}>
              {labels.th}
            </button>
            <button type="button" className={lang === "en" ? "is-active" : ""} onClick={() => setLang("en")}>
              {labels.en}
            </button>
            <button type="button" className={lang === "ms" ? "is-active" : ""} onClick={() => setLang("ms")}>
              {labels.ms}
            </button>
            <button type="button" className="p5gps-audio" aria-label="audio">
              🔊
            </button>
          </div>

          <button className="p5gps-next" onClick={() => navigate("/p5/life/genetics/humans")}>
            {NEXT_LABEL[lang]}
          </button>
        </footer>
      </div>
    </LabLayout>
  );
}
