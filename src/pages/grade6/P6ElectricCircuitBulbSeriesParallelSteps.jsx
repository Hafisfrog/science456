import { useNavigate } from "react-router-dom";
import "./P6ElectricGenerationSteps.css";
import "./P6ElectricCircuitSteps.css";
import "./P6ElectricCircuitBulbSeriesParallel.css";

const STEPS = [
  {
    title: "ออกแบบการต่อวงจร",
    detail: "ออกแบบการต่อหลอดไฟฟ้า 2 แบบ คือแบบอนุกรมและแบบขนาน",
  },
  {
    title: "คาดคะเนผล",
    detail: "หากถอดหลอดไฟหนึ่งดวงออกจากวงจรแต่ละแบบ จะเกิดผลอย่างไร",
  },
  {
    title: "ทดลองและบันทึกผล",
    detail: "ทดลองต่อวงจรจริง สังเกตความสว่างของหลอดไฟ และบันทึกผลที่พบ",
  },
];

export default function P6ElectricCircuitBulbSeriesParallelSteps() {
  const navigate = useNavigate();

  return (
    <div className="p6-gen-page p6-circuit-bsp-page">
      <div className="p6-gen-container p6-circuit-bsp-container">
        <div className="p6-gen-tag">วงจรไฟฟ้าใกล้ตัว</div>
        <div className="p6-gen-title">การต่อหลอดไฟฟ้าแบบอนุกรมและแบบขนาน</div>

        <div className="p6-gen-card p6-circuit-card p6-circuit-bsp-cardWrap">
          <div className="p6-gen-sound" title="ฟังเสียง" aria-hidden="true">
            <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
              <path
                d="M12 26h12l14-10v32l-14-10H12z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path d="M44 22c4 4 4 16 0 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M50 16c7 7 7 25 0 32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          <div className="p6-gen-stepsLayout p6-gen-stepsLayout--single">
            <div className="p6-circuit-panel p6-circuit-bsp-panel">
              <div className="p6-circuit-heading">ขั้นตอนการทดลอง</div>

              <div className="p6-circuit-steps">
                {STEPS.map((step, index) => (
                  <div key={step.title} className="p6-circuit-step p6-circuit-bsp-step">
                    <div className="p6-circuit-badge">{index + 1}</div>
                    <div>
                      <div className="p6-circuit-title">{step.title}</div>
                      <div className="p6-circuit-desc">{step.detail}</div>
                    </div>
                  </div>
                ))}
                <div className="p6-circuit-note">เปรียบเทียบผลการทดลองแบบอนุกรมและแบบขนาน แล้วสรุปความแตกต่าง</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p6-gen-actions">
          <button
            className="p6-gen-btn ghost"
            onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel")}
            type="button"
          >
            ← กลับหน้าอุปกรณ์
          </button>
          <button
            className="p6-gen-btn primary"
            onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/sim")}
            type="button"
          >
            เริ่มทดลอง →
          </button>
        </div>
      </div>
    </div>
  );
}
