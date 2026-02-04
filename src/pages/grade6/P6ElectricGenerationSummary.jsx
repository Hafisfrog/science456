import { useNavigate, useSearchParams } from "react-router-dom";
import "./P6ElectricGenerationSummary.css";

const RESULTS = {
  1: {
    title: "ไม่ถูด้วยผ้า",
    outcome: "ไม่เกิดการเปลี่ยนแปลง",
    time: "0",
    intensity: "low",
  },
  2: {
    title: "ถู 2 นาที",
    outcome: "เศษกระดาษดูดเล็กน้อย",
    time: "2",
    intensity: "mid",
  },
  3: {
    title: "ถู 5 นาที",
    outcome: "เศษกระดาษดูดมากขึ้น",
    time: "5",
    intensity: "high",
  },
};

export default function P6ElectricGenerationSummary() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selected = searchParams.get("trial") || "1";
  const data = RESULTS[selected] || RESULTS[1];

  return (
    <div className="p6-summary-page">
      <div className="p6-summary-stage">
        <h1 className="p6-summary-title-main">ผลการทดลอง</h1>

        <div className="p6-summary-table">
          <div className="p6-summary-row p6-summary-head">
            <div>วัตถุ</div>
            <div>ผลการทดลอง</div>
            <div>เวลา (นาที)</div>
            <div>ภาพแสดงการดูดของเศษกระดาษ</div>
          </div>

          <div className="p6-summary-row p6-summary-body">
            <div className="p6-summary-object">
              <div className="p6-summary-balloon-icon" />
              <div>ลูกโป่ง + เศษกระดาษ</div>
            </div>
            <div className="p6-summary-cell">{data.outcome}</div>
            <div className="p6-summary-cell">{data.time}</div>
            <div className="p6-summary-motion">
              <div className={`p6-summary-mini-balloon ${data.intensity}`} />
              <div className={`p6-summary-mini-papers ${data.intensity}`}>
                {Array.from({ length: 6 }).map((_, idx) => (
                  <span key={idx} className={`paper p-${idx + 1}`} />
                ))}
              </div>
              <div className="p6-summary-arrow" />
            </div>
          </div>
        </div>

        <div className="p6-summary-card">
          <div className="p6-summary-card-head">
            <h2>สรุปผลการทดลอง</h2>
            <button className="p6-summary-sound" type="button" aria-label="sound">
              <svg viewBox="0 0 64 64" aria-hidden="true">
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
          </div>
          <p>
            เมื่อนำผ้าแห้งขัดถูลูกโป่ง จะเกิดไฟฟ้าสถิต ทำให้เศษกระดาษถูกดูดเข้าหา
            ลูกโป่ง ยิ่งขัดถูนาน แรงดึงดูดจะมากขึ้น
          </p>
        </div>

        <button
          className="p6-summary-retry"
          type="button"
          onClick={() => navigate("/p6/experiment/electric-generation/sim")}
        >
          ทดลองใหม่
        </button>

        <div className="p6-summary-floor" />
      </div>
    </div>
  );
}
