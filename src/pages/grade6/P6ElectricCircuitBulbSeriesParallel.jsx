import { useNavigate } from "react-router-dom";
import "./P6ElectricGenerationSteps.css";
import "./P6ElectricCircuitSteps.css";
import "./P6ElectricCircuitBulbSeriesParallel.css";

const EQUIPMENT = [
  { id: "cell", title: "ถ่านไฟฉาย", subtitle: "4 ก้อน" },
  { id: "wire", title: "สายไฟพร้อมหัวหนีบ", subtitle: "4 เส้น" },
  { id: "holder", title: "กระบะใส่ถ่านไฟฉาย", subtitle: "สำหรับ 4 ก้อน" },
  { id: "bulb", title: "หลอดไฟพร้อมฐาน", subtitle: "1 ชุด" },
];

function EquipmentIcon({ id }) {
  if (id === "cell") {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <rect x="20" y="18" width="20" height="58" rx="8" fill="#f59e0b" />
        <rect x="48" y="18" width="20" height="58" rx="8" fill="#f59e0b" />
        <rect x="22" y="14" width="16" height="8" rx="4" fill="#cbd5e1" />
        <rect x="50" y="14" width="16" height="8" rx="4" fill="#cbd5e1" />
        <rect x="20" y="44" width="20" height="7" rx="3.5" fill="#111827" opacity="0.35" />
        <rect x="48" y="44" width="20" height="7" rx="3.5" fill="#111827" opacity="0.35" />
      </svg>
    );
  }

  if (id === "wire") {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <path d="M14 58c18-24 50-24 68 0" fill="none" stroke="#1f2937" strokeWidth="6" strokeLinecap="round" />
        <path d="M14 34c18-20 50-20 68 0" fill="none" stroke="#1f2937" strokeWidth="6" strokeLinecap="round" />
        <path d="M14 58c18-24 50-24 68 0" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
        <path d="M14 34c18-20 50-20 68 0" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
        <rect x="8" y="52" width="14" height="10" rx="3" fill="#0f172a" />
        <rect x="74" y="52" width="14" height="10" rx="3" fill="#0f172a" />
        <rect x="8" y="28" width="14" height="10" rx="3" fill="#0f172a" />
        <rect x="74" y="28" width="14" height="10" rx="3" fill="#0f172a" />
      </svg>
    );
  }

  if (id === "holder") {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <rect x="10" y="24" width="76" height="48" rx="12" fill="#1f2937" />
        <rect x="14" y="28" width="68" height="40" rx="9" fill="#111827" />
        <rect x="18" y="32" width="14" height="30" rx="6" fill="#f59e0b" />
        <rect x="34" y="32" width="14" height="30" rx="6" fill="#f59e0b" />
        <rect x="50" y="32" width="14" height="30" rx="6" fill="#f59e0b" />
        <rect x="66" y="32" width="14" height="30" rx="6" fill="#f59e0b" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" focusable="false">
      <circle cx="48" cy="34" r="22" fill="#ffe38b" stroke="#334155" strokeWidth="3" />
      <ellipse cx="40" cy="24" rx="8" ry="5" fill="#ffffff" opacity="0.55" />
      <path d="M40 52h16v8H40z" fill="#8b98aa" />
      <path d="M38 60h20v4H38zm1 6h18v4H39zm2 6h14v5H41z" fill="#64748b" />
    </svg>
  );
}

export default function P6ElectricCircuitBulbSeriesParallel() {
  const navigate = useNavigate();

  return (
    <div className="p6-gen-page p6-circuit-bsp-page">
      <div className="p6-gen-container p6-circuit-bsp-container">
        <div className="p6-gen-tag">วงจรไฟฟ้าใกล้ตัว</div>
        <div className="p6-gen-title">การต่อหลอดไฟฟ้าแบบอนุกรมและแบบขนาน</div>

        <div className="p6-gen-card p6-circuit-card p6-circuit-bsp-cardWrap">
          <div className="p6-gen-sound" title="ฟังเสียง" aria-hidden="true">
            <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
              <path
                d="M12 26h12l14-10v32l-14-10H12z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path d="M44 22c4 4 4 16 0 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M50 16c7 7 7 25 0 32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          <div className="p6-gen-stepsLayout p6-gen-stepsLayout--single">
            <div className="p6-circuit-panel p6-circuit-bsp-panel">
              <div className="p6-circuit-heading">อุปกรณ์ที่ต้องเตรียม</div>

              <div className="p6-circuit-grid p6-circuit-bsp-grid">
                {EQUIPMENT.map((item) => (
                  <div key={item.id} className="p6-circuit-item p6-circuit-bsp-item">
                    <div className="p6-circuit-icon">
                      <EquipmentIcon id={item.id} />
                    </div>
                    <div className="p6-circuit-meta">
                      <div className="p6-circuit-title">{item.title}</div>
                      <div className="p6-circuit-sub">{item.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p6-gen-actions">
          <button className="p6-gen-btn ghost" onClick={() => navigate("/p6/electric-circuit/experiments")} type="button">
            ← กลับเลือกการทดลอง
          </button>
          <button
            className="p6-gen-btn primary"
            onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/steps")}
            type="button"
          >
            ไปขั้นตอนการทดลอง →
          </button>
        </div>
      </div>
    </div>
  );
}
