import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";
import { LANG_BUTTON_TEXT, NEXT_LABEL, useP5GeneticsLang } from "./p5GeneticsI18n";
import "./P5GeneticsHumansSummary.css";

const TEXT = {
  th: {
    title: "สรุปผลการทดลอง",
    summary:
      "จากภาพการทดลอง พบว่า\nลักษณะของคนแบ่งออกได้เป็น 2 ประเภท คือ\n1. ลักษณะทางพันธุกรรม\n2. ลักษณะที่เกิดจากการเรียนรู้หรือความชอบส่วนตัว",
    back: "ย้อนกลับ",
  },
  en: {
    title: "Experiment Summary",
    summary:
      "From the experiment, human traits can be grouped into 2 types:\n1. Inherited traits\n2. Traits formed by learning or personal preference",
    back: "Back",
  },
  ms: {
    title: "Rumusan Eksperimen",
    summary:
      "Daripada eksperimen, ciri manusia boleh dibahagikan kepada 2 jenis:\n1. Ciri warisan\n2. Ciri yang terbentuk melalui pembelajaran atau minat peribadi",
    back: "Kembali",
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

        <main className="p5ghs-main">
          <h1>{t.title}</h1>

          <section className="p5ghs-note">
            <div className="p5ghs-tapes" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <pre className="p5ghs-summary">{t.summary}</pre>
          </section>
        </main>

        <footer className="p5ghs-ground">
          <div className="p5ghs-fence left" aria-hidden="true" />
          <div className="p5ghs-fence right" aria-hidden="true" />

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
            <button type="button" className="p5ghs-next" onClick={() => navigate("/p5/life/genetics/humans/summary-2")}>
              {NEXT_LABEL[lang]}
            </button>
          </div>
        </footer>
      </div>
    </LabLayout>
  );
}
