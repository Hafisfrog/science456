import { useNavigate } from "react-router-dom";
import "../SelectGrade.css";
import "./P6ElectricForce.css";

const EXPERIMENTS = [
  {
    id: "exp-1",
    title: "การทดลองที่ 1",
    subtitle: "การต่อวงจรไฟฟ้าแบบอนุกรม",
    image: "/images/p6.png",
    path: "/p6/electric-circuit/problem",
  },
  {
    id: "exp-2",
    title: "การทดลองที่ 2",
    subtitle: "การต่อหลอดไฟฟ้าแบบอนุกรมและแบบขนาน",
    image: "/images/p6.png",
    path: "/p6/electric-circuit/bulb-series-parallel",
  },
];

export default function P6ElectricCircuitExperimentSelect() {
  const navigate = useNavigate();
  const backPath = "/p6/electric-circuit/vocab";
  const nextPath = "/p6/electric-circuit/objectives";

  return (
    <div className="grade-wrap p6-exp-wrap">
      <h1 className="grade-title">วงจรไฟฟ้าใกล้ตัว</h1>
      <p className="grade-sub">เลือกการทดลอง</p>

      <div className="grade-grid p6-exp-grid">
        {EXPERIMENTS.map((item) => (
          <div key={item.id} className="grade-card" onClick={() => navigate(item.path)}>
            <img src={item.image} alt={item.subtitle} className="grade-image p6-exp-image" />
            <div className="grade-content">
              <div className="grade-big">{item.title}</div>
              <div className="grade-small">{item.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="p6-exp-actions">
        <button
          className="p6-exp-navBtn ghost"
          type="button"
          onClick={() => navigate(backPath)}
          aria-label="กลับคำศัพท์"
          title="กลับคำศัพท์"
        >
          ←
        </button>
        <button
          className="p6-exp-navBtn primary"
          type="button"
          onClick={() => navigate(nextPath)}
          aria-label="ไปหน้าถัดไป"
          title="ไปหน้าถัดไป"
        >
          →
        </button>
      </div>
    </div>
  );
}
