import { useNavigate } from "react-router-dom";
import "./P4LightSituation.css";

export default function P4LightSituation() {
  const navigate = useNavigate();

  return (
    <div className="situation-scene">
      <div className="situation-container">

        {/* Header */}
        <div className="header-card">
          <h1>สถานการณ์ปัญหา</h1>
        </div>

        {/* Content */}
        <div className="content-card">
          <p>
            ผู้เรียนสวมบทบาทเป็น <strong>"นักวิทยาศาสตร์"</strong>
            ที่ต้องระบุสิ่งของภายในกล่องผ่านตัวกลางชนิดต่าง ๆ
          </p>

          <p>
            นักเรียนอยู่ในห้องเรียนวิทยาศาสตร์ที่มืดสนิท
            มีกล่องปริศนา <strong>3 ใบ</strong>
            แต่ละใบมีแผ่นวัสดุปิดช่องมองด้านหน้า
          </p>

          <p>
            นักเรียนต้องสังเกตแสงที่ผ่านวัสดุแต่ละชนิด
            เพื่อค้นหาว่าในกล่องมีอะไรอยู่
          </p>
        </div>

        {/* Footer */}
        <div className="footer-bar">
          <div className="lang-bar">
            ไทย • อังกฤษ • มลายู 🔊
          </div>

          <div className="button-group">
            <button
              className="back-btn"
              onClick={() => navigate(-1)}
            >
              ◀ ย้อนกลับ
            </button>

            <button
              className="next-btn"
              onClick={() => navigate("/p4/light/select")}
            >
              ต่อไป ▶
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}