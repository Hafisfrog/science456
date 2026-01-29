import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Grade6.css";

const VOCAB = [
  {
    th: "แรงดึงดูด",
    ms: "gaya tarikan",
    en: "Gravitational Force",
  },
  {
    th: "แรงผลัก",
    ms: "gaya tolakan",
    en: "Push Force",
  },
  {
    th: "แรงไม่มีสัมผัส",
    ms: "daya tanpa sentuhan",
    en: "Non-contact Force",
  },
  {
    th: "ประจุไฟฟ้า",
    ms: "caj elektrik",
    en: "Electric Charge",
  },
  {
    th: "แรงไฟฟ้า",
    ms: "daya elektrik",
    en: "Electric Force",
  },
  {
    th: "ความชื้น",
    ms: "kelembapan",
    en: "Humidity",
  },
];

const LAB_OPTIONS = [
  { id: "exp-1", label: "การเกิดไฟฟ้า", path: "/p6/experiment/electric-generation" },
  { id: "exp-2", label: "ผลของแรงไฟฟ้า", path: "/p6/experiment/electric-force-effect" },
];

export default function Grade6() {
  const navigate = useNavigate();
  const [isLabMenuOpen, setIsLabMenuOpen] = useState(false);
  const [selectedLab, setSelectedLab] = useState("");

  const handleSelectLab = (option) => {
    setSelectedLab(option.label);
    setIsLabMenuOpen(false);
    navigate(option.path);
  };

  return (
    <div className="grade6-wrap">
      <header className="grade6-hero">
        <div className="grade6-hero-text">
          <span className="grade6-chip">Science Lab · Grade 6</span>
          <h1 className="grade6-title">ป.6 แรงไฟฟ้าและวงจรไฟฟ้า</h1>
          <p className="grade6-sub">
            เรียนรู้แรงไฟฟ้า การเกิดประจุ และการต่อวงจรไฟฟ้าแบบต่างๆ
            ผ่านกิจกรรมที่เข้าใจง่ายและปลอดภัย
          </p>
          <div className="grade6-actions">
            <button className="grade6-btn" onClick={() => navigate("/grades")}>
              กลับไปเลือกชั้นเรียน
            </button>
            <a className="grade6-ghost" href="#grade6-content">
              ดูหัวข้อ
            </a>
          </div>
        </div>
        <div className="grade6-hero-image">
          <img src="/images/p6.png" alt="ป.6 แรงไฟฟ้าและวงจรไฟฟ้า" />
        </div>
      </header>

      {/* <section id="grade6-content" className="grade6-content">
        <div className="grade6-section-title">
          <h2>หัวข้อสำคัญ</h2>
          <p>สรุปเนื้อหาที่จะได้เรียนในบทนี้</p>
        </div>

        <div className="grade6-grid">
          <article className="grade6-card">
            <h3>แรงไฟฟ้าและประจุ</h3>
            <ul>
              <li>ประจุบวกและประจุลบ</li>
              <li>การเกิดแรงดึงดูดและแรงผลัก</li>
              <li>การถ่ายเทประจุอย่างง่าย</li>
            </ul>
          </article>

          <article className="grade6-card">
            <h3>วงจรไฟฟ้าเบื้องต้น</h3>
            <ul>
              <li>ส่วนประกอบของวงจรไฟฟ้า</li>
              <li>วงจรปิดและวงจรเปิด</li>
              <li>การต่อวงจรแบบอนุกรม/ขนาน</li>
            </ul>
          </article>

          <article className="grade6-card">
            <h3>ตัวนำและฉนวน</h3>
            <ul>
              <li>วัสดุที่ยอมให้กระแสไฟฟ้าไหลผ่าน</li>
              <li>วัสดุที่ป้องกันกระแสไฟฟ้า</li>
              <li>การเลือกใช้งานให้เหมาะสม</li>
            </ul>
          </article>

          <article className="grade6-card">
            <h3>ความปลอดภัยไฟฟ้า</h3>
            <ul>
              <li>ใช้อุปกรณ์อย่างระมัดระวัง</li>
              <li>หลีกเลี่ยงน้ำและความชื้น</li>
              <li>ปฏิบัติตามกฎความปลอดภัยเสมอ</li>
            </ul>
          </article>
        </div>
      </section> */}

      <section className="grade6-vocab">
        <div className="grade6-section-title">
          <h2>คำศัพท์น่ารู้</h2>
          <p>คำศัพท์สำคัญเกี่ยวกับแรงไฟฟ้าและวงจรไฟฟ้า</p>
        </div>

        <div className="grade6-vocab-grid">
          {[VOCAB.slice(0, 3), VOCAB.slice(3)].map((group, index) => (
            <div className="grade6-vocab-card" key={index}>
              <div className="grade6-vocab-banner">คำศัพท์น่ารู้</div>
              <div className="grade6-vocab-table-wrap">
                <table className="grade6-vocab-table">
                  <thead>
                    <tr>
                      <th>ภาษาไทย</th>
                      <th>ภาษามลายู</th>
                      <th>ภาษาอังกฤษ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.map((row, rowIndex) => (
                      <tr key={`${index}-${rowIndex}`}>
                        <td>{row.th}</td>
                        <td>{row.ms}</td>
                        <td>{row.en}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grade6-lab">
        <div className="grade6-lab-card">
          <div className="grade6-lab-select">
            <button
              className="grade6-lab-btn"
              type="button"
              onClick={() => setIsLabMenuOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isLabMenuOpen}
            >
              {selectedLab || "เริ่มการทดลองงงงงงงงง"}
            </button>
            {isLabMenuOpen && (
              <div className="grade6-lab-menu" role="listbox">
                {LAB_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className="grade6-lab-option"
                    onClick={() => handleSelectLab(option)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
