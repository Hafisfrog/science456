import { useNavigate, useSearchParams } from "react-router-dom";
import "./P6ElectricForceEffectSummary.css";

const formatTime = (totalSeconds) => {
  const safe = Number.isFinite(totalSeconds) && totalSeconds >= 0 ? totalSeconds : 0;
  const minutes = Math.floor(safe / 60);
  const seconds = Math.floor(safe % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export default function P6ElectricForceEffectSummary() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const timeParam = Number(searchParams.get("time") || 0);

  return (
    <div className="p6-force-summary-page">
      <div className="p6-force-summary-stage">
        <div className="p6-force-summary-card">
          <button className="p6-force-summary-sound" type="button" aria-label="sound">
            <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
              <path
                d="M14 26h12l14-10v32l-14-10H14z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M46 22c4 4 4 16 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M52 16c7 7 7 25 0 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <h1 className="p6-force-summary-title">สรุปผลการทดลอง</h1>

          <ol className="p6-force-summary-list">
            <li>
              เมื่อขัดถูลูกโป่งทั้ง 2 ใบด้วยกระดาษเยื่อ จะเกิดการถ่ายโอนประจุไฟฟ้าระหว่างลูกโป่งกับกระดาษเยื่อ
              และเมื่อลูกโป่งทั้งสองถูกขัดถูด้วยวัสดุชนิดเดียวกัน ทำให้มีประจุไฟฟ้าชนิดเดียวกัน
              เมื่อนำลูกโป่งมาเข้าใกล้กัน จึงเกิดแรงผลักกัน
            </li>
            <li>
              เมื่อขัดถูลูกโป่งแค่ 1 ใบด้วยกระดาษเยื่อ อีกใบไม่ได้ขัดถู ลูกโป่งที่ถูกขัดถูจะมีประจุไฟฟ้า
              ส่วนลูกโป่งที่ไม่ถูกขัดถูยังเป็นกลาง แต่เกิดการเหนี่ยวนำให้ประจุภายในแยกตัว
              เมื่อนำลูกโป่งมาเข้าใกล้กัน จึงเกิดแรงดึงดูดกัน
            </li>
          </ol>

          {timeParam > 0 && <div className="p6-force-summary-time">เวลาการถู: {formatTime(timeParam)}</div>}
        </div>

        <div className="p6-force-summary-actions">
          <button
            className="p6-force-summary-btn ghost"
            type="button"
            onClick={() => navigate("/p6/experiment/electric-force-effect/sim")}
          >
            ← กลับหน้าจำลอง
          </button>
          <button
            className="p6-force-summary-btn primary"
            type="button"
            onClick={() => navigate("/p6/electric-force/experiments")}
          >
            กลับหน้าเลือกการทดลอง →
          </button>
        </div>

        <div className="p6-force-summary-floor" aria-hidden="true" />
      </div>
    </div>
  );
}

