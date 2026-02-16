import { useNavigate, useSearchParams } from "react-router-dom";
import "./P6ElectricGenerationSteps.css";
import "./P6ElectricCircuitSteps.css";

const RESULTS = [
  {
    cells: 1,
    level: "low",
    note: "หลอดไฟฟ้าสว่างเล็กน้อย",
  },
  {
    cells: 2,
    level: "mid",
    note: "หลอดไฟฟ้าสว่างเพิ่มขึ้น",
  },
  {
    cells: 3,
    level: "mid-high",
    note: "หลอดไฟฟ้าสว่างเพิ่มขึ้นอีก",
  },
  {
    cells: 4,
    level: "high",
    note: "หลอดไฟฟ้าสว่างมากที่สุด",
  },
];

function CircuitIcon({ cells, level }) {
  const glowMap = {
    low: 0.2,
    mid: 0.5,
    "mid-high": 0.75,
    high: 1,
  };
  const glow = glowMap[level] ?? 0.6;
  const cellPositions = Array.from({ length: cells }, (_, index) => 26 + index * 10);

  return (
    <svg viewBox="0 0 140 80" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`bulbGlow-${cells}`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={`rgba(255, 214, 102, ${glow})`} />
          <stop offset="1" stopColor="rgba(255, 214, 102, 0)" />
        </radialGradient>
      </defs>
      <rect x="12" y="22" width="48" height="36" rx="8" fill="#1f2937" />
      {cellPositions.map((x) => (
        <rect key={x} x={x} y="28" width="8" height="24" rx="3" fill="#f59e0b" />
      ))}
      <circle cx="108" cy="30" r="24" fill={`rgba(255, 214, 102, ${glow * 0.35})`} />
      <circle cx="108" cy="30" r="16" fill={`url(#bulbGlow-${cells})`} />
      <circle cx="108" cy="30" r="10" fill="#ffd166" stroke="#1f2937" strokeWidth="2" />
      <path d="M102 40h12v8h-12z" fill="#94a3b8" />
      <path d="M104 48h8v8h-8z" fill="#64748b" />
      <path d="M60 40c20 0 28-10 38-10" stroke="#2563eb" strokeWidth="3" fill="none" />
      <path d="M12 40c12 0 18 10 28 10" stroke="#ef4444" strokeWidth="3" fill="none" />
      <rect x="64" y="50" width="16" height="8" rx="3" fill="#e2e8f0" stroke="#1f2937" strokeWidth="2" />
    </svg>
  );
}

export default function P6ElectricCircuitResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCells = Number(searchParams.get("cells")) || 0;

  return (
    <div className="p6-gen-page">
      <div className="p6-gen-container">
        <div className="p6-gen-tag">วงจรไฟฟ้าใกล้ตัว</div>
        <div className="p6-gen-title">เรื่อง วงจรไฟฟ้าอย่างง่าย</div>

        <div className="p6-gen-card p6-circuit-card">
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

          <div className="p6-circuit-panel p6-circuit-results">
            <div className="p6-circuit-heading">ผลการทดลอง</div>
            <div className="p6-circuit-result-table" role="table" aria-label="ผลการทดลองวงจรไฟฟ้า">
              <div className="p6-circuit-result-row head" role="row">
                <div role="columnheader">รูปภาพการต่อวงจรไฟฟ้า</div>
                <div role="columnheader">ผลการสังเกตความสว่างของหลอดไฟ</div>
              </div>
              {RESULTS.map((row) => (
                <div
                  className={`p6-circuit-result-row ${selectedCells === row.cells ? "active" : ""}`}
                  role="row"
                  key={row.cells}
                >
                  <div className="p6-circuit-result-icon" role="cell">
                    <CircuitIcon cells={row.cells} level={row.level} />
                    <div className="p6-circuit-result-label">{row.cells} ถ่าน</div>
                  </div>
                  <div className="p6-circuit-result-text" role="cell">
                    {row.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p6-gen-actions">
          <button className="p6-gen-btn ghost" onClick={() => navigate("/p6/electric-circuit/steps")} type="button">
            ← กลับอุปกรณ์และขั้นตอน
          </button>
          <button className="p6-gen-btn primary" onClick={() => navigate("/p6/electric-circuit/intro")} type="button">
            กลับเลือกบทเรียน →
          </button>
        </div>
      </div>
    </div>
  );
}
