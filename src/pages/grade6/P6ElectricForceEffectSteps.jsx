import { useNavigate } from "react-router-dom";
import "./P6ElectricGenerationSteps.css";
import "./P6ElectricForceEffectSteps.css";

const STEPS = [
  "เตรียมลูกโป่ง 2 ลูก และกระดาษเยื่อ",
  "เลือกการทดลอง",
  "ขัดถูตามตัวเลือก แล้วนำลูกโป่งเข้าใกล้กัน",
  "สังเกตผล",
  "ขัดถูลูกโป่งทั้ง 2 ใบด้วยกระดาษเยื่อ",
  "ขัดถูลูกโป่ง 1 ใบด้วยกระดาษเยื่อ",
];

export default function P6ElectricForceEffectSteps() {
  const navigate = useNavigate();

  return (
    <div className="p6-gen-page">
      <div className="p6-gen-container">
        <div className="p6-gen-tag">แรงไฟฟ้าน่ารู้</div>
        <div className="p6-gen-title">เรื่อง ผลของแรงไฟฟ้า</div>

        <div className="p6-gen-card">
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

          <div className="p6-gen-section">
            <div className="p6-gen-heading">ขั้นตอนการทดลอง</div>
            <div className="p6-force-steps-flow">
              {STEPS.map((text, idx) => (
                <div key={`${idx}-${text}`}>
                  <div className="p6-force-steps-item">{text}</div>
                  {idx < STEPS.length - 1 && (
                    <div className="p6-force-steps-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                        <path
                          d="M12 3v14m0 0l-6-6m6 6l6-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p6-gen-actions">
          <button
            className="p6-gen-btn ghost"
            onClick={() => navigate("/p6/experiment/electric-force-effect")}
            type="button"
          >
            ← กลับหน้าอุปกรณ์
          </button>
          <button
            className="p6-gen-btn primary"
            onClick={() => navigate("/p6/experiment/electric-force-effect/sim")}
            type="button"
          >
            ไปหน้าถัดไป →
          </button>
        </div>
      </div>
    </div>
  );
}
