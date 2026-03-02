import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";
import { LANG_BUTTON_TEXT, NEXT_LABEL, useP5GeneticsLang } from "./p5GeneticsI18n";
import "./P5GeneticsHumansSummary.css";

const TEXT = {
  th: {
    title: "สรุปผลการทดลอง",
    intro: "จากภาพการทดลอง พบว่า ลักษณะของคนแบ่งออกได้เป็น 2 ประเภท คือ",
    box1Title: "ลักษณะทางพันธุกรรมของคน",
    box1Desc: "เป็นลักษณะที่ถ่ายทอดมาจากพ่อแม่ และติดตัวมาตั้งแต่เกิด เช่น",
    box1Items: ["ตา 2 ชั้น", "จมูก", "รูปร่างใบหน้า", "ลักษณะผม (หยิก / ตรง)"],
    box2Title: "ลักษณะที่เกิดจากการเรียนรู้",
    box2Desc: "เป็นลักษณะที่ไม่ได้ถ่ายทอดทางพันธุกรรม แต่เกิดจากการฝึกฝนหรือความชอบ เช่น",
    box2Items: ["ชอบวาดรูป", "ชอบเล่นดนตรี", "ชอบเล่นกีฬา", "ชอบสีเขียว"],
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
  },
  ms: {
    title: "Rumusan Eksperimen",
    intro: "Daripada eksperimen, ciri manusia boleh dibahagikan kepada 2 kategori:",
    box1Title: "Ciri Warisan",
    box1Desc: "Ciri yang diwarisi daripada ibu bapa dan ada sejak lahir, contohnya:",
    box1Items: ["Mata 2 kelopak", "Bentuk hidung", "Bentuk muka", "Jenis rambut (kerinting / lurus)"],
    box2Title: "Ciri Pembelajaran",
    box2Desc: "Ciri yang tidak diwarisi secara genetik tetapi terbentuk melalui latihan atau minat, contohnya:",
    box2Items: ["Suka melukis", "Suka bermain muzik", "Suka bersukan", "Suka warna hijau"],
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
        <div className="p5ghs-sun" aria-hidden="true" />

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
            <button type="button" className={lang === "th" ? "is-active" : ""} onClick={() => setLang("th")}>
              {labels.th}
            </button>
            <button type="button" className={lang === "en" ? "is-active" : ""} onClick={() => setLang("en")}>
              {labels.en}
            </button>
            <button type="button" className={lang === "ms" ? "is-active" : ""} onClick={() => setLang("ms")}>
              {labels.ms}
            </button>
            <button type="button" className="p5ghs-audio" aria-label="audio">
              🔊
            </button>
          </div>

          <button className="p5ghs-next" onClick={() => navigate("/p5/life/genetics")}>
            {NEXT_LABEL[lang]}
          </button>
        </footer>
      </div>
    </LabLayout>
  );
}
