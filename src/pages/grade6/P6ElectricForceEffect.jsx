import { useNavigate } from "react-router-dom";
import "./P6ElectricGenerationSteps.css";

export default function P6ElectricForceEffect() {
  const navigate = useNavigate();

  return (
    <div className="p6-gen-page">
      <div className="p6-gen-container">
        <div className="p6-gen-tag">แรงไฟฟ้าน่ารู้</div>
        <div className="p6-gen-title">เรื่อง ผลของแรงไฟฟ้า</div>

        <div className="p6-gen-card">
          <div className="p6-gen-sound" title="ฟังเสียง" aria-hidden="true">
            <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
              <path
                d="M12 26h12l14-10v32l-14-10H12z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M44 22c4 4 4 16 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M50 16c7 7 7 25 0 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="p6-gen-section">
            <div className="p6-gen-heading">สถานการณ์ปัญหา</div>
            <p className="p6-gen-text">
              สังเกตการเปลี่ยนแปลงของวัตถุชนิดเดียวกันและต่างชนิดกันที่ถูด้วยกระดาษเยื่อแล้วนำมาเข้าใกล้กัน
            </p>
          </div>

          <div className="p6-gen-section">
            <div className="p6-gen-heading">อุปกรณ์</div>
            <ol className="p6-gen-list">
              <li>ปากกาเมจิก 2 ด้าม</li>
              <li>ลูกโป่งเปล่า 2 ลูก</li>
              <li>กระดาษเยื่อ 1 ม้วน</li>
            </ol>
          </div>
        </div>

        <div className="p6-gen-actions">
          <button
            className="p6-gen-btn ghost"
            onClick={() => navigate("/p6/electric-force/experiments")}
            type="button"
          >
            ← กลับหน้าเลือกการทดลอง
          </button>
          <button
            className="p6-gen-btn primary"
            onClick={() => navigate("/p6/experiment/electric-force-effect/steps")}
            type="button"
          >
            ไปหน้าถัดไป →
          </button>
        </div>
      </div>
    </div>
  );
}
