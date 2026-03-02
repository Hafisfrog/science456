import { useNavigate } from "react-router-dom";
import "./P6ElectricGenerationSteps.css";
import "./P6ElectricCircuitSteps.css";

const STEPS = [
  "ออกแบบและต่อวงจร: ต่อถ่านไฟฉาย 2 ก้อนแบบอนุกรม แล้วเชื่อมกับหลอดไฟและสวิตช์ให้ครบวงจร",
  "ทดลองและสังเกต: เปิดสวิตช์ สังเกตความสว่างของหลอดไฟ และเปรียบเทียบผล",
  "ทดลองซ้ำ: เปลี่ยนเป็นต่อถ่าน 4 ก้อน แล้วสังเกตความสว่างอีกครั้ง",
  "บันทึกผล: จดบันทึกสิ่งที่สังเกตได้และสรุปความสัมพันธ์ของจำนวนถ่านกับความสว่าง",
];

export default function P6ElectricCircuitSteps() {
  const navigate = useNavigate();

  return (
    <div className="p6-gen-page p6-gen-page--generation-steps">
      <div className="p6-gen-container">
        <div className="p6-gen-tag">วงจรไฟฟ้าใกล้ตัว</div>
        <div className="p6-gen-title">เรื่อง วงจรไฟฟ้าอย่างง่าย</div>

        <div className="p6-gen-card p6-gen-card--generation-steps">
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

          <div className="p6-gen-stepsLayout p6-gen-stepsLayout--single">
            <section className="p6-gen-block p6-gen-block-procedure">
              <header className="p6-gen-blockHeader">
                <h2 className="p6-gen-blockTitle">ขั้นตอนการทดลอง</h2>
                <p className="p6-gen-blockHint">กดที่ขั้นตอนเพื่อฟังเสียง</p>
              </header>

              <ol className="p6-gen-stepList">
                {STEPS.map((text, index) => (
                  <li className="p6-gen-stepItem" key={text}>
                    <span className="p6-gen-stepNumber">{index + 1}</span>
                    <span className="p6-gen-stepText">{text}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>

        <div className="p6-gen-actions p6-gen-actions--cluster">
          <button className="p6-gen-btn ghost" onClick={() => navigate("/p6/electric-circuit/materials")} type="button">
            ← กลับหน้าอุปกรณ์
          </button>
          <button className="p6-gen-btn primary" onClick={() => navigate("/p6/electric-circuit/sim")} type="button">
            ไปทดลองต่อวงจร →
          </button>
        </div>
      </div>
    </div>
  );
}
