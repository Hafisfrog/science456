import { useNavigate } from "react-router-dom";
import "./P4LightThinking.css";

export default function P4LightThinking() {
  const navigate = useNavigate();

  return (
    <div className="thinking-scene">

      <div className="class-label">ห้องเรียนวิทยาศาสตร์</div>

      <div className="board">
        <div className="speech">
          <b>คำถามชวนคิด</b>
          <br />
          ทำไมวัสดุแต่ละชนิดถึงทำให้เรามองเห็น
          <br />
          สิ่งของข้างในได้ชัดเจนไม่เท่ากัน ?
        </div>
      </div>

      <div className="table-row">
        <LabBox type="light" />
        <LabBox type="medium" />
        <LabBox type="dark" />
      </div>

      <div className="find-answer">มาหาคำตอบกัน</div>

      <div className="lang-bar">
        ไทย อังกฤษ มลายู 🔊
      </div>

      {/* ปุ่มขวา */}
      <div className="nav-buttons">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ◀ ย้อนกลับ
        </button>

        <button
          className="next-btn"
          onClick={() => navigate("/p4/light/experiment")}
        >
          ▶ ไปทดลอง
        </button>
      </div>

    </div>
  );
}

function LabBox({ type }) {
  return (
    <div className="lab-table">
      <div className={`box ${type}`}>
        <div className="lid" />
      </div>
    </div>
  );
}