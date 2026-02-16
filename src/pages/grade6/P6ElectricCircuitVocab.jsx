import { useNavigate } from "react-router-dom";
import "./P6ElectricVocab.css";

const VOCAB = [
  { th: "วงจรไฟฟ้า", ms: "litar elektrik", en: "Electric Circuit" },
  { th: "แหล่งกำเนิดไฟฟ้า", ms: "sumber kuasa", en: "Power Source" },
  { th: "สายไฟฟ้า", ms: "wayar elektrik", en: "Electric Wire" },
  { th: "เครื่องใช้ไฟฟ้า", ms: "peralatan elektrik", en: "Electrical Appliance" },
  { th: "ถ่านไฟฉาย", ms: "bateri lampu suluh", en: "Flashlight Battery" },
  { th: "แบตเตอรี่", ms: "bateri", en: "Battery" },
  { th: "เซลล์ไฟฟ้า", ms: "sel elektrik", en: "Electric Cell" },
  { th: "แบบอนุกรม", ms: "sel bersiri", en: "Electric cells in series" },
  { th: "แบบขนาน", ms: "sel selari", en: "Electric cells in parallel" },
  { th: "วงจรเปิด", ms: "litar terbuka", en: "Open Circuit" },
  { th: "วงจรปิด", ms: "litar tertutup", en: "Closed Circuit" },
  { th: "ตัวนำไฟฟ้า", ms: "konduktor elektrik", en: "Electrical Conductor" },
];

export default function P6ElectricCircuitVocab() {
  const navigate = useNavigate();
  const groups = [VOCAB.slice(0, 6), VOCAB.slice(6)];

  return (
    <div className="p6-vocab-page">
      <div className="p6-vocab-header">
        <h1>คำศัพท์น่ารู้</h1>
        <p className="p6-vocab-sub">เรื่อง วงจรไฟฟ้าใกล้ตัว</p>
      </div>

      <div className="p6-vocab-grid">
        {groups.map((group, idx) => (
          <div className="p6-vocab-paper" key={idx}>
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
        <button className="p6-vocab-btn ghost" onClick={() => navigate("/p6")} type="button">
          ← กลับหน้าหน่วยการเรียนรู้
        </button>
        <button
          className="p6-vocab-btn primary"
          onClick={() => navigate("/p6/electric-circuit/problem")}
          type="button"
        >
          ไปสถานการณ์ปัญหา →
        </button>
      </div>
    </div>
  );
}
