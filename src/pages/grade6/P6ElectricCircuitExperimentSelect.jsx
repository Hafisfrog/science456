import { useNavigate } from "react-router-dom";
import "./P6ElectricGenerationSteps.css";
import "./P6ElectricCircuitExperimentSelect.css";

const EXPERIMENT_OPTIONS = [
  {
    id: "series-circuit",
    title: "การทดลองที่ 1",
    subtitle: "การต่อวงจรไฟฟ้าแบบอนุกรม",
    detail: "ทดลองผลของการเพิ่มจำนวนถ่านในวงจรไฟฟ้าแบบอนุกรม",
    path: "/p6/electric-circuit/problem",
  },
  {
    id: "bulb-series-parallel",
    title: "การทดลองที่ 2",
    subtitle: "การต่อหลอดไฟฟ้าแบบอนุกรมและแบบขนาน",
    detail: "เปรียบเทียบการสว่างของหลอดไฟเมื่อเปลี่ยนรูปแบบการต่อวงจร",
    path: "/p6/electric-circuit/bulb-series-parallel",
  },
];

export default function P6ElectricCircuitExperimentSelect() {
  const navigate = useNavigate();

  return (
    <div className="p6-gen-page">
      <div className="p6-gen-container">
        <div className="p6-gen-tag">วงจรไฟฟ้าใกล้ตัว</div>
        <div className="p6-gen-title">เลือกการทดลอง</div>

        <div className="p6-gen-card p6-circuit-exp-card-wrap">
          <p className="p6-circuit-exp-lead">
            เลือกหัวข้อการทดลองที่ต้องการเรียนรู้
          </p>

          <div className="p6-circuit-exp-grid">
            {EXPERIMENT_OPTIONS.map((item) => (
              <button
                key={item.id}
                className="p6-circuit-exp-card"
                type="button"
                onClick={() => navigate(item.path)}
              >
                <div className="p6-circuit-exp-title">{item.title}</div>
                <div className="p6-circuit-exp-subtitle">{item.subtitle}</div>
                <div className="p6-circuit-exp-detail">{item.detail}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="p6-gen-actions">
          <button className="p6-gen-btn ghost" onClick={() => navigate("/p6/electric-circuit")} type="button">
            ← กลับคำศัพท์
          </button>
        </div>
      </div>
    </div>
  );
}
