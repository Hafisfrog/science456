import { useNavigate } from "react-router-dom";
import "./P4LightIntro.css";

export default function P4LightIntro() {
  const navigate = useNavigate();

  return (
    <div className="intro">

      {/* TITLE */}
      <div className="top-title">
        การทดลองที่ 4 เรื่อง ตัวกลางของแสง
      </div>

      {/* LABEL */}
      <div className="step-label">
        ขั้นตอนการทดลอง
      </div>

      {/* STEP BOARD */}
      <div className="board">
        <Step number={1} text="เลือกวัตถุทดลอง" />
        <Step number={2} text="สังเกตผลที่แสดง" />
        <Step number={3} text="เปลี่ยนชนิดวัตถุและทำการทดลองซ้ำ" />
        <Step number={4} text="บันทึกผลการทดลอง" />
      </div>

      {/* LANGUAGE */}
      <div className="lang">
        ไทย อังกฤษ มลายู 🔊
      </div>

      {/* ปุ่มขวาล่าง */}
      <div className="nav-buttons">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ◀ ย้อนกลับ
        </button>

        <button
          className="next-btn"
          onClick={() => navigate("/p4/light/thinking")}
        >
          ▶ เริ่มการทดลอง
        </button>
      </div>

    </div>
  );
}

function Step({ number, text }) {
  return (
    <div className="step">
      <div className="circle">{number}</div>
      <div className="step-text">{text}</div>
    </div>
  );
}