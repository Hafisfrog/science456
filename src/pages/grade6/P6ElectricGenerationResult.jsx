import { useNavigate, useSearchParams } from "react-router-dom";
import "./P6ElectricGenerationResult.css";

const COMPLETED_TRIALS_KEY = "p6_electric_generation_completed_trials";
const TOTAL_TRIALS = 3;

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

const readCompletedTrials = () => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.sessionStorage.getItem(COMPLETED_TRIALS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const allowed = new Set(["trial-1", "trial-2", "trial-3"]);
    return Array.from(new Set(parsed.filter((id) => allowed.has(id))));
  } catch {
    return [];
  }
};

export default function P6ElectricGenerationResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selected = searchParams.get("trial") || "1";
  const data = RESULTS[selected] || RESULTS[1];
  const completedCount = readCompletedTrials().length;
  const allTrialsCompleted = completedCount === TOTAL_TRIALS;

  return (
    <div className="p6-result-page">
      <div className="p6-result-stage">
        <h1 className="p6-result-title-main">ผลการทดลอง</h1>

        <div className="p6-result-card">
          <div className="p6-result-row p6-result-head">
            <div>วัตถุ</div>
            <div>ผลการทดลอง</div>
            <div>เวลา (นาที)</div>
            <div>ภาพแสดงการดูดของเศษกระดาษ</div>
          </div>

          <div className="p6-result-row p6-result-body">
            <div className="p6-result-object">
              <div className="p6-result-balloon-icon" />
              <div>ลูกโป่ง + เศษกระดาษ</div>
            </div>
            <div className="p6-result-cell">{data.outcome}</div>
            <div className="p6-result-cell">{data.time}</div>
            <div className="p6-result-motion">
              <div className={`p6-result-mini-balloon ${data.intensity}`} />
              <div className={`p6-result-mini-papers ${data.intensity}`}>
                {Array.from({ length: 6 }).map((_, idx) => (
                  <span key={idx} className={`paper p-${idx + 1}`} />
                ))}
              </div>
              <div className="p6-result-arrow" />
            </div>
          </div>
        </div>

        <div className="p6-result-actions">
          <button
            className="p6-result-back"
            type="button"
            onClick={() => navigate("/p6/experiment/electric-generation/sim")}
          >
            ← ย้อนกลับ
          </button>
          <button
            className="p6-result-retry"
            type="button"
            onClick={() => navigate("/p6/experiment/electric-generation/sim")}
          >
            ทดลองใหม่
          </button>
          {allTrialsCompleted && (
            <button
              className="p6-result-next"
              type="button"
              onClick={() =>
                navigate(`/p6/experiment/electric-generation/summary?trial=${selected}`)
              }
            >
              สรุปผลการทดลอง
            </button>
          )}
        </div>

        {!allTrialsCompleted && (
          <div className="p6-result-progress-note">
            กรุณาทำการทดลองให้ครบทั้ง 3 ครั้งก่อนสรุปผล ({completedCount}/{TOTAL_TRIALS})
          </div>
        )}

        <div className="p6-result-floor" />
      </div>
    </div>
  );
}
