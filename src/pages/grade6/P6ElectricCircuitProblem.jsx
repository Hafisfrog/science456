import { useNavigate } from "react-router-dom";
import "./P6ElectricGenerationSteps.css";
import "./P6ElectricCircuitProblem.css";

export default function P6ElectricCircuitProblem() {
  const navigate = useNavigate();

  return (
    <div className="p6-gen-page">
      <div className="p6-gen-container">
        <div className="p6-gen-tag">วงจรไฟฟ้าใกล้ตัว</div>
        <div className="p6-gen-title">เรื่อง วงจรไฟฟ้าอย่างง่าย</div>

        <div className="p6-gen-card p6-circuit-problem-card">
          <div className="p6-gen-sound" title="ฟังเสียง" aria-hidden="true">
            <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
              <path
                d="M12 26h12l14-10v32l-14-10H12z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M44 22c4 4 4 16 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M50 16c7 7 7 25 0 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="p6-circuit-problem-content">
            <section className="p6-circuit-problem-story">
              <h2>สถานการณ์ปัญหา</h2>
              <p>
                ระหว่างทำกิจกรรมไฟฟ้าในห้องเรียน นักเรียนพบว่าเมื่อเพิ่มจำนวนถ่านไฟฉายที่ต่อในวงจร
                ความสว่างของหลอดไฟดูเหมือนจะเปลี่ยนไป แต่ยังไม่มีใครสรุปได้ชัดเจนว่ามีความสัมพันธ์อย่างไร
              </p>
            </section>

            <section className="p6-circuit-problem-question">
              <div className="p6-circuit-problem-questionTitle">คำถามตั้งต้น</div>
              <p>จำนวนถ่านไฟฉายที่เรียงต่อกัน มีผลต่อความสว่างของหลอดไฟฟ้าอย่างไร?</p>
              <ul>
                <li>ถ้าใช้ถ่าน 2 ก้อน กับ 4 ก้อน ความสว่างจะต่างกันหรือไม่</li>
                <li>เราจะออกแบบการทดลองอย่างไรเพื่อพิสูจน์คำตอบ</li>
              </ul>
            </section>
          </div>

          <aside className="p6-circuit-problem-kid">
            <div className="p6-circuit-problem-bubble">
              หนูสงสัยว่า... ทำไมพอเพิ่มถ่านแล้วหลอดไฟถึงสว่างขึ้น?
            </div>
            <img src="/images/p4/exp1/character-boy.png" alt="นักเรียนตั้งคำถาม" />
            <div className="p6-circuit-problem-name">เด็กนักเรียนตั้งคำถาม</div>
          </aside>
        </div>

        <div className="p6-gen-actions">
          <button
            className="p6-gen-btn ghost"
            onClick={() => navigate("/p6/electric-circuit/experiments")}
            type="button"
          >
            ← กลับหน้าเลือกการทดลอง
          </button>
          <button
            className="p6-gen-btn primary"
            onClick={() => navigate("/p6/electric-circuit/materials")}
            type="button"
          >
            ไปหน้าอุปกรณ์ →
          </button>
        </div>
      </div>
    </div>
  );
}
