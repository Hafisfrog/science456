import { useNavigate } from "react-router-dom";
import "./P4LightVocab.css";

const VOCAB = [
  {
    th: "แสง",
    ms: "จาฮายอ",
    en: "Light",
  },
  {
    th: "แหล่งกำเนิดแสง",
    ms: "ตีอาปัต ยาง จาฮายอ",
    en: "Light Source",
  },
  {
    th: "เคลื่อนที่ผ่านอากาศ",
    ms: "บีอรา ลือปะ อางิง",
    en: "Move Through Air",
  },
  {
    th: "กั้น",
    ms: "สือกัต",
    en: "Block",
  },
];

export default function P4LightBasicWords() {
  const navigate = useNavigate();

  return (
    <div className="vocab-page">

      <header className="vocab-header">
        <h1>คำศัพท์วิทยาศาสตร์น่ารู้</h1>
        <p>คำศัพท์พื้นฐานเกี่ยวกับแสง</p>
      </header>

      <div className="vocab-card">
        <table className="vocab-table">
          <thead>
            <tr>
              <th className="col-th">ภาษาไทย</th>
              <th className="col-ms">ภาษามลายู</th>
              <th className="col-en">ภาษาอังกฤษ</th>
            </tr>
          </thead>

          <tbody>
            {VOCAB.map((row, idx) => (
              <tr key={idx}>
                <td className="cell-th">{row.th}</td>
                <td className="cell-ms">{row.ms}</td>
                <td className="cell-en">{row.en}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="vocab-footer">
        <button
          className="back-home-btn"
          onClick={() => navigate("/p4/light")}
        >
          ← ย้อนกลับ
        </button>

        <button
          className="btn-next"
          onClick={() => navigate("/p4/light/select")}
        >
          ไปหน้าถัดไป →
        </button>
      </div>

    </div>
  );
}
