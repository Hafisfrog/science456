import { useNavigate } from "react-router-dom";
import "./P4Gravity.css";

export default function P4Gravity() {
  const navigate = useNavigate();

  return (
    <div className="grade-wrap" style={{ position: "relative" }}>
        {/* <BackButton /> */}
        <button className="back-home-btn" onClick={() => navigate("/p4")}>
          ← กลับหน้า ป.4
        </button>

      <h1 className="grade-title">แรงโน้มถ่วงของโลก</h1>
      <p className="grade-sub">เลือกการทดลอง</p>

      <div className="grade-grid">
        <div className="grade-card" onClick={() => navigate("/p4/gravity/vocab")}>
        <img src="/images/p4.png" alt="" className="grade-image" />
        <div className="grade-content">
            <div className="grade-big">การทดลองที่ 1</div>
            <div className="grade-small">ผลของแรงโน้มถ่วง</div>
        </div>
        </div>

        <div className="grade-card" onClick={() => navigate("/p4")}>
          <img src="/images/p4/action.png" alt="" className="grade-image" />
          <div className="grade-content">
            <div className="grade-big">การทดลองที่ 2</div>
            <div className="grade-small">
              แรงดึงดูดของโลกตกับน้ำหนักของวัตถุ
            </div>
          </div>
        </div>

        <div className="grade-card" onClick={() => navigate("/p4/gravity/earth-moon")}>
          <img src="/images/p4/earth-moon.png" alt="" className="grade-image" />
          <div className="grade-content">
            <div className="grade-big">การทดลองที่ 3</div>
            <div className="grade-small">
              แรงดึงดูดของโลกกับแรงดึงดูดของดวงจันทร์
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
