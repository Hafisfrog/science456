import { useNavigate } from "react-router-dom";
import "./P6.css";

export default function P6() {
  const navigate = useNavigate();

  return (
    <div className="p6-page">
      <div className="p6-decor" aria-hidden="true">
        <span className="p6-bulb p6-bulb-left" />
        <span className="p6-bulb p6-bulb-right" />
        <span className="p6-spark p6-spark-a" />
        <span className="p6-spark p6-spark-b" />
      </div>

      <button className="back-home-btn" onClick={() => navigate("/grades")}>
        ← กลับหน้าเลือกชั้นเรียน
      </button>

      <header className="p6-header">
        <h1>วิทยาศาสตร์ ป.6</h1>
        <p>เลือกหน่วยการเรียนรู้</p>
      </header>

      <section className="p6-grid">
        <div className="p6-card" onClick={() => navigate("/p6/electric-force")}>
          <div className="p6-card-media">
            <img src="/images/p6.png" alt="แรงไฟฟ้าน่ารู้" className="p6-card-img" />
          </div>
          <div className="p6-card-body">
            <h2>แรงไฟฟ้าน่ารู้</h2>
          </div>
        </div>

        <div className="p6-card" onClick={() => navigate("/p6/electric-circuit")}>
          <div className="p6-card-media">
            <img src="/images/p6.png" alt="วงจรไฟฟ้าใกล้ตัว" className="p6-card-img" />
          </div>
          <div className="p6-card-body">
            <h2>วงจรไฟฟ้าใกล้ตัว</h2>
          </div>
        </div>
      </section>
    </div>
  );
}
