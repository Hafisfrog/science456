import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";
import { LANG_BUTTON_TEXT, NEXT_LABEL, useP5GeneticsLang } from "./p5GeneticsI18n";
import "./P5GeneticsHumansSummary2.css";

const TEXT = {
  th: {
    title: "สรุปผลการทดลอง",
    back: "ย้อนกลับ",
    inheritedTitle: "ลักษณะทางพันธุกรรมของคน",
    inheritedDesc: "เป็นลักษณะที่ถ่ายทอดมาจากพ่อแม่ และติดตัวมาตั้งแต่เกิด เช่น",
    inheritedItems: ["ตา 2 ชั้น", "จมูก", "รูปร่างใบหน้า", "ลักษณะผม (หยิก / ตรง)"],
    learnedTitle: "ลักษณะที่เกิดจากการเรียนรู้",
    learnedDesc: "เป็นลักษณะที่ไม่ได้ถ่ายทอดทางพันธุกรรม แต่เกิดจากการฝึกฝนหรือความชอบ เช่น",
    learnedItems: ["ชอบวาดรูป", "ชอบเล่นดนตรี", "ชอบเล่นกีฬา", "ชอบสีเขียว"],
  },
  en: {
    title: "Experiment Summary",
    back: "Back",
    inheritedTitle: "Inherited Human Traits",
    inheritedDesc: "These are traits passed down from parents and present since birth, such as:",
    inheritedItems: ["Double eyelid", "Nose shape", "Face shape", "Hair type (curly / straight)"],
    learnedTitle: "Traits From Learning",
    learnedDesc: "These are traits not inherited genetically, but formed through practice or preference, such as:",
    learnedItems: ["Likes drawing", "Likes music", "Likes sports", "Likes green"],
  },
  ms: {
    title: "Rumusan Eksperimen",
    back: "Kembali",
    inheritedTitle: "Ciri Warisan Manusia",
    inheritedDesc: "Ciri ini diwarisi daripada ibu bapa dan ada sejak lahir, contohnya:",
    inheritedItems: ["Mata 2 kelopak", "Bentuk hidung", "Bentuk muka", "Jenis rambut (kerinting / lurus)"],
    learnedTitle: "Ciri Daripada Pembelajaran",
    learnedDesc: "Ciri ini tidak diwarisi secara genetik tetapi terbentuk melalui latihan atau minat, contohnya:",
    learnedItems: ["Suka melukis", "Suka muzik", "Suka bersukan", "Suka warna hijau"],
  },
};

export default function P5GeneticsHumansSummary2() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const labels = LANG_BUTTON_TEXT[lang];
  const t = TEXT[lang];

  return (
    <LabLayout title={t.title} showTeacher={false}>
      <div className="p5ghs2-page notranslate" translate="no">
        <div className="p5ghs2-sun" aria-hidden="true" />

        <main className="p5ghs2-main">
          <h1 className="notranslate" translate="no">{t.title}</h1>

          <section className="p5ghs2-grid">
            <article className="p5ghs2-note">
              <div className="p5ghs2-tape" aria-hidden="true" />
              <h2 className="notranslate" translate="no">{t.inheritedTitle}</h2>
              <p className="notranslate" translate="no">{t.inheritedDesc}</p>
              <ul className="notranslate" translate="no">
                {t.inheritedItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="p5ghs2-note">
              <div className="p5ghs2-tape" aria-hidden="true" />
              <h2 className="notranslate" translate="no">{t.learnedTitle}</h2>
              <p className="notranslate" translate="no">{t.learnedDesc}</p>
              <ul className="notranslate" translate="no">
                {t.learnedItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </section>
        </main>

        <footer className="p5ghs2-ground">
          <div className="p5ghs2-fence left" aria-hidden="true" />
          <div className="p5ghs2-fence right" aria-hidden="true" />

          <div className="p5ghs2-lang">
            <button
              type="button"
              className={lang === "th" ? "is-active notranslate" : "notranslate"}
              translate="no"
              onClick={() => setLang("th")}
            >
              {labels.th}
            </button>
            <button
              type="button"
              className={lang === "en" ? "is-active notranslate" : "notranslate"}
              translate="no"
              onClick={() => setLang("en")}
            >
              {labels.en}
            </button>
            <button
              type="button"
              className={lang === "ms" ? "is-active notranslate" : "notranslate"}
              translate="no"
              onClick={() => setLang("ms")}
            >
              {labels.ms}
            </button>
          </div>

          <div className="p5ghs2-actions">
            <button
              type="button"
              className="p5ghs2-back notranslate"
              translate="no"
              onClick={() => navigate("/p5/life/genetics/humans/summary")}
            >
              {/* <span aria-hidden="true">←</span> */}
              <span>{t.back}</span>
            </button>
            <button
              type="button"
              className="p5ghs2-next notranslate"
              translate="no"
              onClick={() => navigate("/p5/life/genetics/humans/summary-3")}
            >
              <span>{NEXT_LABEL[lang]}</span>
              {/* <span aria-hidden="true">→</span> */}
            </button>
          </div>
        </footer>
      </div>
    </LabLayout>
  );
}
