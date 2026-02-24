import { useNavigate } from "react-router-dom";
import "./P4LightSelect.css";

const MATERIALS = [
  { id: 1, name: "กระจกใส", img: "/images/materials/l1.png" },
  { id: 2, name: "แก้วใส", img: "/images/materials/l10.png" },
  { id: 3, name: "พลาสติกใส", img: "/images/materials/l3.png" },
  { id: 4, name: "หมอก", img: "/images/materials/l8.png" },
  { id: 5, name: "กระดาษไข", img: "/images/materials/l4.png" },
  { id: 6, name: "กระจกฝ้า", img: "/images/materials/l2.png" },
  { id: 7, name: "แผ่นไม้", img: "/images/materials/l5.png" },
  { id: 8, name: "ผนังปูน", img: "/images/materials/l7.webp" },
  { id: 9, name: "เหล็ก", img: "/images/materials/l6.png" },
];

export default function P4LightSelect() {
  const navigate = useNavigate();

  return (
    <div className="lab">

      <div className="main-title">
        การทดลองที่ 4 เรื่อง ตัวกลางของแสง
      </div>

      <div className="material-label">วัสดุอุปกรณ์</div>

      <div className="grid">
        {MATERIALS.map(m => (
          <div key={m.id} className="card">
            <div className="img-box">
              <img src={m.img} alt={m.name} />
            </div>
            <div className="name">{m.name}</div>
          </div>
        ))}
      </div>

      <div className="lang">
        ไทย อังกฤษ มลายู 🔊
      </div>

      <div className="nav-buttons">
        <button
          className="back-btn"
          onClick={() => navigate("/p4/light/Situation")}
        >
          ← ย้อนกลับ
        </button>

        <button
          className="next-btn"
          onClick={() => navigate("/p4/light/intro")}
        >
          ต่อไป »
        </button>
      </div>

    </div>
  );
}