import { useNavigate } from "react-router-dom";
import "../SelectGrade.css";
import "./P6ElectricForce.css";

const EXPERIMENTS = [
  {
    id: "exp-1",
    title: "การทดลองที่ 1",
    subtitle: "การเกิดแรงไฟฟ้า",
    image: "/images/p6.png",
    path: "/p6/experiment/electric-generation/steps?from=unit",
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

  return (
    <div className="grade-wrap p6-exp-wrap">
      <button className="back-home-btn p6-exp-back" onClick={() => navigate("/p6/electric-force/vocab")}>
        ← กลับคำศัพท์
      </button>

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

      <div className="p6-exp-recap">
        <button className="back-home-btn" type="button" onClick={() => navigate("/p6/electric-force/recap")}>
          สรุปการเกิดแรงไฟฟ้าและผลของแรงไฟฟ้า →
        </button>
      </div>
    </div>
  );
}
