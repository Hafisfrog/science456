import { useNavigate } from "react-router-dom";
import "./P6.css";

export default function P6() {
  const navigate = useNavigate();

  return (
    <div className="p6-page">
      <button className="back-home-btn" onClick={() => navigate("/grades")}>
        ← กลับหน้าเลือกชั้นเรียน
      </button>

      <header className="p6-header">
        <h1>วิทยาศาสตร์ ป.6</h1>
        <p>เลือกหน่วยการเรียนรู้</p>
      </header>

      <section className="p6-grid">
        <div className="p6-card" onClick={() => navigate("/p6/electric-force")}>
          <img src="/images/p6.png" alt="แรงไฟฟ้าน่ารู้" className="p6-card-img" />
          <div className="p6-card-body">
            <h2>แรงไฟฟ้าน่ารู้</h2>
          </div>
        </div>

        <div className="p6-card" onClick={() => navigate("/p6/electric-circuit")}>
          <img src="/images/p6.png" alt="วงจรไฟฟ้าใกล้ตัว" className="p6-card-img" />
          <div className="p6-card-body">
            <h2>วงจรไฟฟ้าใกล้ตัว</h2>
          </div>
        </div>
      </section>
    </div>
  );
}
