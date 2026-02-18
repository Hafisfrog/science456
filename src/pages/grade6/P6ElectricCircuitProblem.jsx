import { useNavigate } from "react-router-dom";
import "./P6ElectricGenerationSteps.css";

export default function P6ElectricCircuitProblem() {
  const navigate = useNavigate();

  return (
    <div className="p6-gen-page">
      <div className="p6-gen-container">
        <div className="p6-gen-tag">วงจรไฟฟ้าใกล้ตัว</div>
        <div className="p6-gen-title">เรื่อง วงจรไฟฟ้าอย่างง่าย</div>

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
              จำนวนถ่านไฟฉายที่เรียงต่อกันมีความสัมพันธ์กับความสว่างของหลอดไฟฟ้าอย่างไร
            </p>
          </div>

        </div>

        <div className="p6-gen-actions">
          <button className="p6-gen-btn ghost" onClick={() => navigate("/p6/electric-circuit/experiments")} type="button">
            ← กลับคำศัพท์
          </button>
          <button className="p6-gen-btn primary" onClick={() => navigate("/p6/electric-circuit/steps")} type="button">
            ไปอุปกรณ์และขั้นตอนการทดลอง →
          </button>
        </div>
      </div>
    </div>
  );
}

