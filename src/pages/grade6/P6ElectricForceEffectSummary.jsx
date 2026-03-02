import { useNavigate, useSearchParams } from "react-router-dom";
import "./P6ElectricForceEffectSummary.css";

const formatTime = (totalSeconds) => {
  const safe = Number.isFinite(totalSeconds) && totalSeconds >= 0 ? totalSeconds : 0;
  const minutes = Math.floor(safe / 60);
  const seconds = Math.floor(safe % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const SUMMARY_BY_EQUIPMENT = {
  balloon: [
    "เมื่อขัดถูลูกโป่งทั้ง 2 ใบด้วยกระดาษเยื่อ ลูกโป่งทั้งสองจะมีประจุชนิดเดียวกัน เมื่อนำมาเข้าใกล้กันจึงเกิดแรงผลักกัน",
    "เมื่อขัดถูลูกโป่งเพียง 1 ใบ อีกใบไม่ได้ขัดถู จะเกิดการเหนี่ยวนำประจุ เมื่อนำมาเข้าใกล้กันจึงเกิดแรงดึงดูดกัน",
  ],
  marker: [
    "เมื่อขัดถูปากกาเมจิกทั้ง 2 ด้ามด้วยกระดาษเยื่อ ปากกาทั้งสองจะมีประจุชนิดเดียวกัน เมื่อนำมาเข้าใกล้กันจึงเกิดแรงผลักกัน",
    "เมื่อขัดถูปากกาเมจิกเพียง 1 ด้าม อีกด้ามไม่ได้ขัดถู จะเกิดการเหนี่ยวนำประจุ เมื่อนำมาเข้าใกล้กันจึงเกิดแรงดึงดูดกัน",
  ],
};

export default function P6ElectricForceEffectSummary() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const timeParam = Number(searchParams.get("time") || 0);
  const equipmentParam = searchParams.get("equipment");
  const summaryItems = SUMMARY_BY_EQUIPMENT[equipmentParam] || SUMMARY_BY_EQUIPMENT.balloon;

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
            {summaryItems.map((item, idx) => (
              <li key={`${idx}-${item}`}>{item}</li>
            ))}
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
