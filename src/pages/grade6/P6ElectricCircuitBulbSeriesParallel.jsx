import { useNavigate } from "react-router-dom";
import "./P6ElectricGenerationSteps.css";
import "./P6ElectricCircuitExperimentSelect.css";

const ACTIVITY_STEPS = [
  {
    title: "1. ออกแบบวงจร",
    detail: "แบ่งกลุ่มแล้วออกแบบการต่อหลอดไฟ 2 แบบ คือแบบอนุกรมและแบบขนาน",
  },
  {
    title: "2. คาดคะเนผล",
    detail: "คาดการณ์ว่าหลอดไฟแต่ละแบบจะสว่างมากหรือน้อยแตกต่างกันอย่างไร",
  },
  {
    title: "3. ทดลองและบันทึกผล",
    detail: "ทดลองต่อจริงทั้งสองแบบ แล้วสังเกตความสว่างและบันทึกผลที่พบ",
  },
  {
    title: "4. สรุปผลการทดลอง",
    detail: "อภิปรายร่วมกันว่าการต่อแบบใดทำให้หลอดไฟสว่างกว่ากันและเพราะเหตุใด",
  },
];

export default function P6ElectricCircuitBulbSeriesParallel() {
  const navigate = useNavigate();

  return (
    <div className="p6-gen-page">
      <div className="p6-gen-container">
        <div className="p6-gen-tag">วงจรไฟฟ้าใกล้ตัว</div>
        <div className="p6-gen-title">การต่อหลอดไฟฟ้าแบบอนุกรมและแบบขนาน</div>

        <div className="p6-gen-card p6-circuit-exp-card-wrap">
          <div className="p6-circuit-exp-coming">กำลังเตรียมการทดลอง</div>
          <div className="p6-gen-section">
            <div className="p6-gen-heading">หัวข้อทดลอง</div>
            <p className="p6-gen-text">
              เปรียบเทียบความสว่างของหลอดไฟเมื่อเปลี่ยนรูปแบบการต่อเป็นแบบอนุกรมและแบบขนาน
            </p>
          </div>
        </div>

        <div className="p6-gen-card p6-circuit-activity-wrap">
          <div className="p6-circuit-activity-title">กิจกรรม : การต่อหลอดไฟฟ้าแบบอนุกรมและแบบขนาน</div>

          <div className="p6-circuit-activity-top">
            <div className="p6-circuit-activity-box">
              <div className="p6-circuit-activity-box-title">เป้าหมายกิจกรรม</div>
              <p className="p6-circuit-activity-box-text">
                ออกแบบและทดลองวงจรไฟฟ้า เพื่ออธิบายความแตกต่างของการต่อแบบอนุกรมและแบบขนาน
              </p>
            </div>
            <div className="p6-circuit-activity-box">
              <div className="p6-circuit-activity-box-title">อุปกรณ์ที่ต้องเตรียม</div>
              <ul className="p6-circuit-activity-list">
                <li>ถ่านไฟฉาย 2 ก้อนพร้อมรางถ่าน</li>
                <li>หลอดไฟ 2 ดวงพร้อมฐานหลอด</li>
                <li>สายไฟพร้อมคลิปหนีบ 3–4 เส้น</li>
                <li>แผ่นไม้หรือฐานสำหรับวางอุปกรณ์</li>
              </ul>
            </div>
          </div>

          <div className="p6-circuit-activity-steps">
            {ACTIVITY_STEPS.map((step) => (
              <div key={step.title} className="p6-circuit-activity-step">
                <div className="p6-circuit-activity-step-title">{step.title}</div>
                <div className="p6-circuit-activity-step-text">{step.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p6-gen-actions">
          <button
            className="p6-gen-btn ghost"
            onClick={() => navigate("/p6/electric-circuit/experiments")}
            type="button"
          >
            ← กลับเลือกการทดลอง
          </button>
          <button className="p6-gen-btn primary" onClick={() => navigate("/p6/electric-circuit")} type="button">
            กลับหน้าคำศัพท์ →
          </button>
        </div>
      </div>
    </div>
  );
}
