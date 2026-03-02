import { useNavigate } from "react-router-dom";
import "./P6ElectricGenerationSteps.css";
import "./P6ElectricCircuitSteps.css";
import "./P6ElectricCircuitResults.css";

export default function P6ElectricCircuitResults() {
  const navigate = useNavigate();

  return (
    <div className="p6-gen-page p6-circuit-results-page">
      <div className="p6-gen-container p6-circuit-results-container">
        <div className="p6-gen-tag">วงจรไฟฟ้าใกล้ตัว</div>
        <div className="p6-gen-title">เรื่อง วงจรไฟฟ้าอย่างง่าย</div>

        <div className="p6-gen-card p6-circuit-card p6-circuit-results-cardWrap">
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

          <div className="p6-circuit-panel p6-circuit-results-panel">
            <div className="p6-circuit-heading">สรุปผลการทดลอง</div>

            <section className="p6-circuit-summary-board" aria-label="ข้อสรุปการทดลอง">
              <p className="p6-circuit-summary-text">
                จากการทำกิจกรรม พบว่า เมื่อนำเซลล์ไฟฟ้าหลายเซลล์มาเรียงต่อกันแบบอนุกรม กระแสไฟฟ้าในวงจรจะมากขึ้น
                ส่งผลให้หลอดไฟสว่างมากขึ้นตามจำนวนเซลล์ไฟฟ้าที่เพิ่มขึ้น
              </p>
            </section>
          </div>
        </div>

        <div className="p6-gen-actions">
          <button className="p6-gen-btn ghost" onClick={() => navigate("/p6/electric-circuit/steps")} type="button">
            ← กลับอุปกรณ์และขั้นตอน
          </button>
          <button className="p6-gen-btn primary" onClick={() => navigate("/p6/electric-circuit/intro")} type="button">
            กลับเลือกบทเรียน →
          </button>
        </div>
      </div>
    </div>
  );
}
