import { useNavigate } from "react-router-dom";
import "./P6ElectricGenerationSteps.css";

export default function P6ElectricGenerationSteps() {
  const navigate = useNavigate();

  return (
    <div className="p6-gen-page">
      <div className="p6-gen-container">
        <div className="p6-gen-tag">แรงไฟฟ้าน่ารู้</div>
        <div className="p6-gen-title">เรื่อง การเกิดไฟฟ้า</div>

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
            <p className="p6-gen-text">ทำไมวัตถุบางอย่างดูเหมือนจะดูดกันได้</p>
          </div>

          <div className="p6-gen-section">
            <div className="p6-gen-heading">อุปกรณ์</div>
            <ol className="p6-gen-list">
              <li>ลูกโป่ง</li>
              <li>เศษกระดาษ</li>
              <li>ผ้าแห้ง</li>
            </ol>
          </div>

          <div className="p6-gen-section">
            <div className="p6-gen-heading">ขั้นตอนการทดลอง</div>
            <ol className="p6-gen-list">
              <li>เลือกวัสดุสำหรับทดลอง</li>
              <li>
                นำผ้าแห้งมาขัดลูกโป่ง
                <div className="p6-gen-substeps">
                  <span>ครั้งที่ 1 ไม่ขัดถูด้วยผ้าแห้ง</span>
                  <span>ครั้งที่ 2 ถูด้วยผ้าแห้ง 2 นาที</span>
                  <span>ครั้งที่ 3 ขัดถูด้วยผ้าแห้ง 5 นาที</span>
                </div>
              </li>
              <li>สังเกตและบันทึกผล</li>
            </ol>
          </div>
        </div>

        <div className="p6-gen-actions">
          <button
            className="p6-gen-btn ghost"
            onClick={() => navigate("/p6/experiment/electric-generation/vocab")}
            type="button"
          >
            ← กลับคำศัพท์
          </button>
          <button
            className="p6-gen-btn primary"
            onClick={() => navigate("/p6/experiment/electric-generation/sim")}
            type="button"
          >
            ไปหน้าถัดไป →
          </button>
        </div>
      </div>
    </div>
  );
}
