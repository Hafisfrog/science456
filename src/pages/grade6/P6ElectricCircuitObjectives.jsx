import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P6ElectricObjectives.css";

const CONTENT = {
  th: {
    grade: "ชั้นประถมศึกษาปีที่ 6",
    title: "วงจรไฟฟ้าใกล้ตัว",
    section: "จุดประสงค์การเรียนรู้",
    obj1: "อธิบายส่วนประกอบของวงจรไฟฟ้าอย่างง่ายได้ (K)",
    obj2: "ต่อวงจรไฟฟ้าอย่างง่าย และตรวจสอบวงจรเปิด-ปิดได้ (K, P)",
    back: "← กลับคำศัพท์",
    next: "ไปเลือกบทเรียน →",
  },
  en: {
    grade: "Grade 6",
    title: "Everyday Electric Circuits",
    section: "Learning Objectives",
    obj1: "Describe the components of a simple electric circuit. (K)",
    obj2: "Build a simple circuit and identify open/closed circuits. (K, P)",
    back: "← Back to Vocabulary",
    next: "Go to Lessons →",
  },
  ms: {
    grade: "Tahun 6",
    title: "Litar Elektrik Sekeliling Kita",
    section: "Objektif Pembelajaran",
    obj1: "Menerangkan komponen litar elektrik yang ringkas. (K)",
    obj2: "Membina litar ringkas dan mengenal pasti litar terbuka/tertutup. (K, P)",
    back: "← Kembali ke Kosa Kata",
    next: "Pergi ke Pelajaran →",
  },
};

export default function P6ElectricCircuitObjectives() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = CONTENT[lang];

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

          <div className="obj-item" style={{ marginBottom: 0 }}>
            <div className="obj-num">2</div>
            <div className="obj-text">{t.obj2}</div>
          </div>
        </div>

        <img className="obj-character p6-obj-character" src="/images/p6.png" alt="ป.6" />

        <div className="obj-actions p6-obj-actions">
          <button
            className="obj-btn ghost"
            onClick={() => navigate("/p6/electric-circuit")}
            type="button"
          >
            {t.back}
          </button>
          <button
            className="obj-btn primary"
            onClick={() => navigate("/p6/electric-circuit/intro")}
            type="button"
          >
            {t.next}
          </button>
        </div>
      </div>
    </div>
  );
}

