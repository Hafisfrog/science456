import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./P6ElectricObjectives.css";

const CONTENT = {
  th: {
    grade: "ชั้นประถมศึกษาปีที่ 6",
    title: "แรงไฟฟ้าน่ารู้",
    section: "จุดประสงค์การเรียนรู้",
    obj1: "อธิบายการเกิดแรงไฟฟ้าได้ (K)",
    obj2: "สังเกตและอธิบายผลของแรงไฟฟ้าได้ (K, P)",
    back: "← กลับ",
    next: "ไปคำศัพท์ →",
  },
  en: {
    grade: "Grade 6",
    title: "Electric Force Basics",
    section: "Learning Objectives",
    obj1: "Explain how electric force is generated. (K)",
    obj2: "Observe and explain the effects of electric force. (K, P)",
    back: "← Back",
    next: "Go to Vocabulary →",
  },
  ms: {
    grade: "Tahun 6",
    title: "Daya Elektrik",
    section: "Objektif Pembelajaran",
    obj1: "Menerangkan bagaimana daya elektrik terhasil. (K)",
    obj2: "Memerhati dan menerangkan kesan daya elektrik. (K, P)",
    back: "← Kembali",
    next: "Pergi Kosa Kata →",
  },
};

export default function P6ElectricObjectives() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [lang, setLang] = useState("th");
  const t = CONTENT[lang];
  const isUnitFlow = pathname === "/p6/electric-force" || pathname.startsWith("/p6/electric-force/");
  const backPath = isUnitFlow ? "/p6" : "/p6/electric-force/experiments";
  const nextPath = isUnitFlow ? "/p6/electric-force/vocab" : "/p6/experiment/electric-generation/vocab";

  return (
    <div className="obj-full p6-obj-full">
      <div className="obj-shell p6-obj-shell">
        <div className="obj-topbar">
          <div className="obj-langbar">
            <button
              className={`obj-chip ${lang === "th" ? "active" : ""}`}
              onClick={() => setLang("th")}
              type="button"
            >
              ไทย
            </button>
            <button
              className={`obj-chip ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
              type="button"
            >
              อังกฤษ
            </button>
            <button
              className={`obj-chip ${lang === "ms" ? "active" : ""}`}
              onClick={() => setLang("ms")}
              type="button"
            >
              มลายู
            </button>
          </div>
        </div>

        <div className="obj-header">
          <div className="obj-grade">{t.grade}</div>
          <div className="obj-titleRow">
            <h1 className="obj-title">{t.title}</h1>
          </div>
        </div>

        <div className="obj-card p6-obj-card">
          <div className="obj-card-head">
            <div className="obj-section">{t.section}</div>
          </div>

          <div className="obj-item">
            <div className="obj-num">1</div>
            <div className="obj-text">{t.obj1}</div>
          </div>

          <div className="obj-item">
            <div className="obj-num">2</div>
            <div className="obj-text">{t.obj2}</div>
          </div>
        </div>

        <img className="obj-character p6-obj-character" src="/images/p6.png" alt="ป.6" />

        <div className="obj-actions p6-obj-actions">
          <button className="obj-btn ghost" onClick={() => navigate(backPath)} type="button">
            {t.back}
          </button>
          <button
            className="obj-btn primary"
            onClick={() => navigate(nextPath)}
            type="button"
          >
            {t.next}
          </button>
        </div>
      </div>
    </div>
  );
}
