import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4Gravity.css";

export default function P4Gravity() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");

  const copy = useMemo(() => {
    return {
      th: {
        title: "แรงโน้มถ่วงของโลก",
        sub: "เลือกการทดลอง",
        back: "กลับหน้า ป.4",
        exp1Title: "การทดลองที่ 1",
        exp1Desc: "ผลของแรงโน้มถ่วง",
        exp2Title: "การทดลองที่ 2",
        exp2Desc: "แรงดึงดูดของโลกกับน้ำหนักของวัตถุ",
        exp3Title: "การทดลองที่ 3",
        exp3Desc: "แรงดึงดูดของโลกกับแรงดึงดูดของดวงจันทร์",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
      },
      en: {
        title: "Earth's Gravity",
        sub: "Choose an experiment",
        back: "Back to Grade 4",
        exp1Title: "Experiment 1",
        exp1Desc: "Effects of Gravity",
        exp2Title: "Experiment 2",
        exp2Desc: "Earth's Gravity and Object Weight",
        exp3Title: "Experiment 3",
        exp3Desc: "Earth's Gravity vs Moon's Gravity",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
      },
      ms: {
        title: "Graviti Bumi",
        sub: "Pilih eksperimen",
        back: "Kembali ke Tahun 4",
        exp1Title: "Eksperimen 1",
        exp1Desc: "Kesan Graviti",
        exp2Title: "Eksperimen 2",
        exp2Desc: "Graviti Bumi dan Berat Objek",
        exp3Title: "Eksperimen 3",
        exp3Desc: "Graviti Bumi dan Graviti Bulan",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
      },
    };
  }, []);

  const t = copy[lang];

  return (
    <div className="grade-wrap" style={{ position: "relative" }}>
      <h1 className="grade-title">{t.title}</h1>
      <p className="grade-sub">{t.sub}</p>

      <div className="grade-grid">
        <div className="grade-card" onClick={() => navigate("/p4/gravity/vocab")}>
          <img src="/images/p4.png" alt="" className="grade-image" />
          <div className="grade-content">
            <div className="grade-big">{t.exp1Title}</div>
            <div className="grade-small">{t.exp1Desc}</div>
          </div>
        </div>

        <div className="grade-card" onClick={() => navigate("/p4/gravity/exp2/vocab")}>
          <img src="/images/p4/action.png" alt="" className="grade-image" />
          <div className="grade-content">
            <div className="grade-big">{t.exp2Title}</div>
            <div className="grade-small">{t.exp2Desc}</div>
          </div>
        </div>

        <div className="grade-card" onClick={() => navigate("/p4/gravity/exp3/vocab")}>
          <img src="/images/p4/earth-moon.png" alt="" className="grade-image" />
          <div className="grade-content">
            <div className="grade-big">{t.exp3Title}</div>
            <div className="grade-small">{t.exp3Desc}</div>
          </div>
        </div>
      </div>

      <div className="grade-langDock">
        <div className="grade-langbar">
          <button className={`grade-chip ${lang === "th" ? "active" : ""}`} onClick={() => setLang("th")} type="button">
            {t.chipTh}
          </button>
          <button className={`grade-chip ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")} type="button">
            {t.chipEn}
          </button>
          <button className={`grade-chip ${lang === "ms" ? "active" : ""}`} onClick={() => setLang("ms")} type="button">
            {t.chipMs}
          </button>
        </div>
      </div>

      <div className="grade-navDock">
        <button className="back-home-btn" onClick={() => navigate("/p4/gravity/objectives")} type="button">
          ◀ {t.back}
        </button>
      </div>
    </div>
  );
}
