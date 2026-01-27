import { useNavigate } from "react-router-dom";
import "./SelectGrade.css";

export default function SelectGrade() {
  const navigate = useNavigate();

  return (
    <div className="grade-wrap">
        <button className="back-home-btn" onClick={() => navigate("/")}>
            ← กลับหน้าเริ่มต้น
        </button>


      <h1 className="grade-title">เลือกชั้นเรียน</h1>
      <p className="grade-sub">เลือกชั้นเพื่อเริ่มการทดลองวิทยาศาสตร์</p>

      <div className="grade-grid">
        <div className="grade-card" onClick={() => navigate("/p4")}>
          <img src="/images/p4.png" alt="ป.4" className="grade-image" />
          <div className="grade-content">
            <div className="grade-big">ป.4</div>
            <div className="grade-small">แรงโน้มถ่วงและแสง</div>
          </div>
        </div>

        <div className="grade-card" onClick={() => navigate("/p5")}>
          <img src="/images/p5.png" alt="ป.5" className="grade-image" />
          <div className="grade-content">
            <div className="grade-big">ป.5</div>
            <div className="grade-small">ชีวิตสัมพันธ์และพันธุกรรม</div>
          </div>
        </div>

        <div className="grade-card" onClick={() => navigate("/p6")}>
          <img src="/images/p6.png" alt="ป.6" className="grade-image" />
          <div className="grade-content">
            <div className="grade-big">ป.6</div>
            <div className="grade-small">แรงไฟฟ้าและวงจรไฟฟ้า</div>
          </div>
        </div>
      </div>
    </div>
  );
}
