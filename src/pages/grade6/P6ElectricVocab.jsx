import { useNavigate } from "react-router-dom";
import "./P6ElectricVocab.css";

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
    ms: "cas atau P",
    en: "Electric Charge",
  },
  {
    th: "แรงไฟฟ้า",
    ms: "daya QP",
    en: "Electric Force",
  },
  {
    th: "ความชื้น",
    ms: "kelembapan",
    en: "Humidity",
  },
];

export default function P6ElectricVocab() {
  const navigate = useNavigate();
  const groups = [VOCAB.slice(0, 3), VOCAB.slice(3)];

  return (
    <div className="p6-vocab-page">
      <div className="p6-vocab-header">
        <h1>คำศัพท์น่ารู้</h1>
      </div>

      <div className="p6-vocab-grid">
        {groups.map((group, idx) => (
          <div className="p6-vocab-paper" key={idx}>
            <div className="p6-vocab-tape" />
            <table className="p6-vocab-table">
              <thead>
                <tr>
                  <th>ภาษาไทย</th>
                  <th>ภาษามลายู</th>
                  <th>ภาษาอังกฤษ</th>
                </tr>
              </thead>
              <tbody>
                {group.map((row, rowIndex) => (
                  <tr key={`${idx}-${rowIndex}`}>
                    <td>{row.th}</td>
                    <td>{row.ms}</td>
                    <td>{row.en}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div className="p6-vocab-actions">
        <button className="p6-vocab-btn ghost" onClick={() => navigate("/p6/experiment/electric-generation")} type="button">
          ← กลับหน้าจุดประสงค์
        </button>
        <button
          className="p6-vocab-btn primary"
          onClick={() => navigate("/p6/experiment/electric-generation/steps")}
          type="button"
        >
          ไปหน้าถัดไป →
        </button>
      </div>
    </div>
  );
}
