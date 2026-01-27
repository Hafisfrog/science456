import { useNavigate } from "react-router-dom";
import "./Grade6.css";

export default function Grade6() {
  const navigate = useNavigate();

  return (
    <div className="grade6-wrap">
      <header className="grade6-hero">
        <div className="grade6-hero-text">
          <span className="grade6-chip">Science Lab · Grade 6</span>
          <h1 className="grade6-title">ป.6 แรงไฟฟ้าและวงจรไฟฟ้า</h1>
          <p className="grade6-sub">
            เรียนรู้แรงไฟฟ้า การเกิดประจุ และการต่อวงจรไฟฟ้าแบบต่างๆ
            ผ่านกิจกรรมที่เข้าใจง่ายและปลอดภัย
          </p>
          <div className="grade6-actions">
            <button className="grade6-btn" onClick={() => navigate("/grades")}>
              กลับไปเลือกชั้นเรียน
            </button>
            <a className="grade6-ghost" href="#grade6-content">
              ดูหัวข้อ
            </a>
          </div>
        </div>
        <div className="grade6-hero-image">
          <img src="/images/p6.png" alt="ป.6 แรงไฟฟ้าและวงจรไฟฟ้า" />
        </div>
      </header>

      <section id="grade6-content" className="grade6-content">
        <div className="grade6-section-title">
          <h2>หัวข้อสำคัญ</h2>
          <p>สรุปเนื้อหาที่จะได้เรียนในบทนี้</p>
        </div>

        <div className="grade6-grid">
          <article className="grade6-card">
            <h3>แรงไฟฟ้าและประจุ</h3>
            <ul>
              <li>ประจุบวกและประจุลบ</li>
              <li>การเกิดแรงดึงดูดและแรงผลัก</li>
              <li>การถ่ายเทประจุอย่างง่าย</li>
            </ul>
          </article>

          <article className="grade6-card">
            <h3>วงจรไฟฟ้าเบื้องต้น</h3>
            <ul>
              <li>ส่วนประกอบของวงจรไฟฟ้า</li>
              <li>วงจรปิดและวงจรเปิด</li>
              <li>การต่อวงจรแบบอนุกรม/ขนาน</li>
            </ul>
          </article>

          <article className="grade6-card">
            <h3>ตัวนำและฉนวน</h3>
            <ul>
              <li>วัสดุที่ยอมให้กระแสไฟฟ้าไหลผ่าน</li>
              <li>วัสดุที่ป้องกันกระแสไฟฟ้า</li>
              <li>การเลือกใช้งานให้เหมาะสม</li>
            </ul>
          </article>

          <article className="grade6-card">
            <h3>ความปลอดภัยไฟฟ้า</h3>
            <ul>
              <li>ใช้อุปกรณ์อย่างระมัดระวัง</li>
              <li>หลีกเลี่ยงน้ำและความชื้น</li>
              <li>ปฏิบัติตามกฎความปลอดภัยเสมอ</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="grade6-lab">
        <div className="grade6-lab-card">
          <div>
            <h2>กิจกรรมแนะนำ</h2>
            <p>
              ทดลองต่อวงจรง่ายๆ และสังเกตผลของการต่อแบบอนุกรม/ขนาน
              พร้อมฝึกแยกตัวนำและฉนวนจากวัสดุรอบตัว
            </p>
          </div>
          <a className="grade6-lab-btn" href="#grade6-content">
            เริ่มสำรวจเนื้อหา
          </a>
        </div>
      </section>
    </div>
  );
}
