import { useNavigate } from "react-router-dom";
import "../SelectGrade.css";
import "./P6ElectricForce.css";

const EXPERIMENTS = [
  {
    id: "exp-1",
    title: "การทดลองที่ 1",
    subtitle: "การเกิดแรงไฟฟ้า",
    image: "/images/p6.png",
    path: "/p6/experiment/electric-generation/materials?from=unit",
  },
  {
    id: "exp-2",
    title: "การทดลองที่ 2",
    subtitle: "ผลของแรงไฟฟ้า",
    image: "/images/p6.png",
    path: "/p6/experiment/electric-force-effect",
  },
];

export default function Grade6() {
  const navigate = useNavigate();
  const backPath = "/p6/electric-force/vocab";
  const nextPath = "/p6/electric-force/recap";

  return (
    <div className="grade-wrap p6-exp-wrap">
      <h1 className="grade-title">แรงไฟฟ้าน่ารู้</h1>
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
          aria-label="ไปหน้าสรุป"
          title="ไปหน้าสรุป"
        >
          →
        </button>
      </div>
    </div>
  );
}
