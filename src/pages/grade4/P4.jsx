import { useNavigate } from "react-router-dom";
import "./P4.css";

export default function P4() {
  const navigate = useNavigate();

  return (
    <div className="p4-page" style={{ position: "relative" }}>
      {/* <BackButton /> */}
      <button className="back-home-btn" onClick={() => navigate("/grades")}>
          ← กลับหน้าเลือกชั้นเรียน
      </button>

      {/* Header */}
      <header className="p4-header">
        <h1>วิทยาศาสตร์ ป.4</h1>
        <p>เลือกหน่วยการเรียนรู้</p>
      </header>

      {/* Content */}
      <section className="p4-grid">
        {/* การ์ด แรงโน้มถ่วง */}
        <div
          className="p4-card"
          onClick={() => navigate("/p4/gravity/objectives")}
        >
          <img
            src="/images/p4/gravity.png"
            alt="แรงโน้มถ่วงของโลก"
            className="p4-card-img"
          />

          <div className="p4-card-body">
            <h2>แรงโน้มถ่วงของโลก</h2>
            {/* <p>
              เรียนรู้ว่าทำไมวัตถุจึงตกลงสู่พื้น
              ผ่านการจำลองและการทดลอง
            </p>

            <div className="p4-card-footer">
              <span className="tag">การทดลอง</span>
              <span className="tag">Simulation</span>
              <span className="tag">คำศัพท์</span>
            </div> */}
          </div>
        </div>

        <div
          className="p4-card"
          onClick={() => navigate("/p4/light/intro")}
        >
          <img
            src="/images/p4/light.png"
            alt="แรงโน้มถ่วงของโลก"
            className="p4-card-img"
          />

          <div className="p4-card-body">
            <h2>ตัวกลางของแสง</h2>
            {/* <p>
              เรียนรู้ว่าทำไมวัตถุจึงตกลงสู่พื้น
              ผ่านการจำลองและการทดลอง
            </p>

            <div className="p4-card-footer">
              <span className="tag">การทดลอง</span>
              <span className="tag">Simulation</span>
              <span className="tag">คำศัพท์</span>
            </div> */}
          </div>
        </div>

      </section>
    </div>
  );
}
