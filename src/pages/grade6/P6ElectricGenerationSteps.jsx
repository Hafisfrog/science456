import { useNavigate, useSearchParams } from "react-router-dom";
import "./P6ElectricGenerationSteps.css";

const EXPERIMENT_STEPS = [
  "เลือกวัสดุสำหรับทดลอง",
  "นำผ้าแห้งมาขัดลูกโป่ง",
  "ครั้งที่ 1 ไม่ขัดด้วยผ้าแห้ง แล้วสังเกตผล",
  "ครั้งที่ 2 ขัดด้วยผ้าแห้ง 2 นาที แล้วสังเกตผล",
  "ครั้งที่ 3 ขัดด้วยผ้าแห้ง 5 นาที แล้วสังเกตผล",
];

export default function P6ElectricGenerationSteps() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");

  const backPath =
    from === "unit"
      ? "/p6/experiment/electric-generation/materials?from=unit"
      : "/p6/experiment/electric-generation/materials";

  return (
    <div className="p6-gen-page p6-gen-page--generation-steps">
      <div className="p6-gen-container">
        <div className="p6-gen-tag">แรงไฟฟ้าน่ารู้</div>
        <div className="p6-gen-title">เรื่อง การเกิดไฟฟ้า</div>

        <div className="p6-gen-card p6-gen-card--generation-steps">
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

          <div className="p6-gen-stepsLayout p6-gen-stepsLayout--single">
            <section className="p6-gen-block p6-gen-block-procedure">
              <header className="p6-gen-blockHeader">
                <h2 className="p6-gen-blockTitle">ขั้นตอนการทดลอง</h2>
                <p className="p6-gen-blockHint">กดที่ขั้นตอนเพื่อฟังเสียง</p>
              </header>

              <ol className="p6-gen-stepList">
                {EXPERIMENT_STEPS.map((text, index) => (
                  <li className="p6-gen-stepItem" key={text}>
                    <span className="p6-gen-stepNumber">{index + 1}</span>
                    <span className="p6-gen-stepText">{text}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>

        <div className="p6-gen-actions p6-gen-actions--cluster">
          <button
            className="p6-gen-btn ghost"
            onClick={() => navigate(backPath)}
            type="button"
            aria-label="กลับหน้าอุปกรณ์"
            title="กลับหน้าอุปกรณ์"
          >
            ←
          </button>
          <button
            className="p6-gen-btn primary"
            onClick={() => navigate("/p6/experiment/electric-generation/sim")}
            type="button"
            aria-label="ไปหน้าทดลอง"
            title="ไปหน้าทดลอง"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
