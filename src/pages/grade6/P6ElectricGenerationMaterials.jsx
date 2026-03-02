import { useNavigate, useSearchParams } from "react-router-dom";
import "./P6ElectricGenerationSteps.css";

const EQUIPMENT_EXAMPLES = [
  { id: "balloon", name: "ลูกโป่ง" },
  { id: "paper", name: "เศษกระดาษ" },
  { id: "cloth", name: "ผ้าแห้ง" },
];

function EquipmentVisual({ type }) {
  if (type === "balloon") {
    return (
      <div className="p6-gen-real p6-gen-real-balloon" aria-hidden="true">
        <span className="p6-gen-real-balloon-string" />
      </div>
    );
  }

  if (type === "paper") {
    return (
      <div className="p6-gen-real p6-gen-real-paper" aria-hidden="true">
        <span className="p6-paper p1" />
        <span className="p6-paper p2" />
        <span className="p6-paper p3" />
        <span className="p6-paper p4" />
        <span className="p6-paper p5" />
        <span className="p6-paper p6" />
      </div>
    );
  }

  return <div className="p6-gen-real p6-gen-real-cloth" aria-hidden="true" />;
}

export default function P6ElectricGenerationMaterials() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");

  const backPath = from === "unit" ? "/p6/electric-force/vocab" : "/p6/experiment/electric-generation/vocab";
  const nextPath =
    from === "unit"
      ? "/p6/experiment/electric-generation/steps?from=unit"
      : "/p6/experiment/electric-generation/steps";

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
            <section className="p6-gen-block p6-gen-block-equipment">
              <header className="p6-gen-blockHeader">
                <h2 className="p6-gen-blockTitle">อุปกรณ์</h2>
                <p className="p6-gen-blockHint">กดที่อุปกรณ์เพื่อฟังชื่อ</p>
              </header>

              <div className="p6-gen-equipShowcase">
                {EQUIPMENT_EXAMPLES.map((item) => (
                  <article className="p6-gen-equipCard" key={item.id}>
                    <div className="p6-gen-equipVisual" aria-hidden="true">
                      <EquipmentVisual type={item.id} />
                    </div>
                    <div className="p6-gen-equipName">{item.name}</div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="p6-gen-actions p6-gen-actions--cluster">
          <button
            className="p6-gen-btn ghost"
            onClick={() => navigate(backPath)}
            type="button"
            aria-label="กลับคำศัพท์"
            title="กลับคำศัพท์"
          >
            ← กลับคำศัพท์
          </button>
          <button
            className="p6-gen-btn primary"
            onClick={() => navigate(nextPath)}
            type="button"
            aria-label="ไปหน้าถัดไป"
            title="ไปหน้าถัดไป"
          >
            ไปหน้าถัดไป →
          </button>
        </div>
      </div>
    </div>
  );
}
