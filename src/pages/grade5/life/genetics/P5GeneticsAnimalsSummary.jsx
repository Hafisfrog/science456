import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";
import { LANG_BUTTON_TEXT, NEXT_LABEL, useP5GeneticsLang } from "./p5GeneticsI18n";
import "./P5GeneticsAnimalsSummary.css";

const TEXT = {
  th: {
    title: "สรุปผลการทดลอง",
    p1: "จากการทดลอง เรานำแมวพ่อและแม่ที่มีสีขนต่างกันมาผสมกัน",
    father: "แมวพ่อ",
    fatherDesc: "ขนสีดำ",
    mother: "แมวแม่",
    motherDesc: "ขนสีขาว",
    p2: "เมื่อลูกแมวเกิดขึ้น พบว่า",
    result: "ลูกแมวทุกตัวมีขนสีดำ",
  },
  en: {
    title: "Experiment Summary",
    p1: "In this experiment, we crossed a male and female cat with different fur colors.",
    father: "Father cat",
    fatherDesc: "black fur",
    mother: "Mother cat",
    motherDesc: "white fur",
    p2: "When kittens were born, we found that",
    result: "all kittens had black fur.",
  },
  ms: {
    title: "Rumusan Eksperimen",
    p1: "Dalam eksperimen ini, kami mengacukkan kucing jantan dan betina dengan warna bulu berbeza.",
    father: "Kucing bapa",
    fatherDesc: "bulu hitam",
    mother: "Kucing ibu",
    motherDesc: "bulu putih",
    p2: "Apabila anak kucing dilahirkan, didapati bahawa",
    result: "semua anak kucing berbulu hitam.",
  },
};

export default function P5GeneticsAnimalsSummary() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const labels = LANG_BUTTON_TEXT[lang];
  const t = TEXT[lang];

  return (
    <LabLayout title={t.title} showTeacher={false}>
      <div className="p5gas-page">
        <div className="p5gas-sun" aria-hidden="true" />
        <section className="p5gas-panel">
          <h1>{t.title}</h1>

          <div className="p5gas-note">
            <div className="p5gas-top-tabs" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <p>{t.p1}</p>
            <ul>
              <li>
                <strong>{t.father}</strong> {t.fatherDesc}
              </li>
              <li>
                <strong>{t.mother}</strong> {t.motherDesc}
              </li>
            </ul>
            <p>{t.p2}</p>
            <p className="p5gas-result">{t.result}</p>
          </div>
        </section>

        <footer className="p5gas-ground">
          <div className="p5gas-lang">
            <button type="button" className={lang === "th" ? "is-active" : ""} onClick={() => setLang("th")}>
              {labels.th}
            </button>
            <button type="button" className={lang === "en" ? "is-active" : ""} onClick={() => setLang("en")}>
              {labels.en}
            </button>
            <button type="button" className={lang === "ms" ? "is-active" : ""} onClick={() => setLang("ms")}>
              {labels.ms}
            </button>
            <button type="button" className="p5gas-audio" aria-label="เสียง">
              🔊
            </button>
          </div>

          <button className="p5gas-next" onClick={() => navigate("/p5/life/genetics/plants")}>
            {NEXT_LABEL[lang]}
          </button>
        </footer>
      </div>
    </LabLayout>
  );
}
