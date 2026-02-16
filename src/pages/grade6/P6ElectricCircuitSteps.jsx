import { useNavigate } from "react-router-dom";
import "./P6ElectricGenerationSteps.css";
import "./P6ElectricCircuitSteps.css";

const EQUIPMENT = [
  {
    title: "หลอดไฟฟ้าพร้อมฐาน",
    subtitle: "1 ชุด",
    icon: (
      <svg viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="bulbGlow" x1="0" x2="1">
            <stop offset="0" stopColor="#fff4c2" />
            <stop offset="1" stopColor="#ffd166" />
          </linearGradient>
        </defs>
        <circle cx="48" cy="34" r="22" fill="url(#bulbGlow)" stroke="#1f2937" strokeWidth="3" />
        <path d="M38 52h20v8H38z" fill="#94a3b8" />
        <path d="M36 60h24v10H36z" fill="#64748b" />
        <path d="M44 70h8v10h-8z" fill="#475569" />
        <path d="M44 26c0-6 8-6 8 0" fill="none" stroke="#1f2937" strokeWidth="3" />
      </svg>
    ),
  },
  {
    title: "สายไฟพร้อมหัวหนีบ",
    subtitle: "2 เส้น",
    icon: (
      <svg viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <path d="M14 60c20-18 48-18 68 0" fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
        <path d="M14 36c20-18 48-18 68 0" fill="none" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
        <rect x="10" y="54" width="14" height="12" rx="3" fill="#111827" />
        <rect x="72" y="54" width="14" height="12" rx="3" fill="#111827" />
        <rect x="10" y="30" width="14" height="12" rx="3" fill="#111827" />
        <rect x="72" y="30" width="14" height="12" rx="3" fill="#111827" />
      </svg>
    ),
  },
  {
    title: "กระบะใส่ถ่านไฟฉาย",
    subtitle: "สำหรับ 4 ก้อน",
    icon: (
      <svg viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <rect x="14" y="26" width="68" height="40" rx="10" fill="#0f172a" />
        <rect x="20" y="32" width="18" height="28" rx="6" fill="#f59e0b" />
        <rect x="40" y="32" width="18" height="28" rx="6" fill="#f59e0b" />
        <rect x="60" y="32" width="18" height="28" rx="6" fill="#f59e0b" />
        <rect x="22" y="28" width="14" height="6" rx="3" fill="#e2e8f0" />
        <rect x="42" y="28" width="14" height="6" rx="3" fill="#e2e8f0" />
        <rect x="62" y="28" width="14" height="6" rx="3" fill="#e2e8f0" />
      </svg>
    ),
  },
  {
    title: "สวิตช์",
    subtitle: "1 อัน",
    icon: (
      <svg viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <rect x="26" y="18" width="44" height="60" rx="12" fill="#e2e8f0" stroke="#1f2937" strokeWidth="3" />
        <rect x="34" y="26" width="28" height="18" rx="6" fill="#cbd5f5" />
        <rect x="34" y="52" width="28" height="18" rx="6" fill="#94a3b8" />
        <circle cx="48" cy="35" r="4" fill="#1f2937" />
        <circle cx="48" cy="61" r="4" fill="#1f2937" />
      </svg>
    ),
  },
  {
    title: "ถ่านไฟฉาย",
    subtitle: "4 ก้อน",
    icon: (
      <svg viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <rect x="22" y="18" width="20" height="56" rx="8" fill="#f59e0b" />
        <rect x="50" y="18" width="20" height="56" rx="8" fill="#f59e0b" />
        <rect x="24" y="14" width="16" height="8" rx="4" fill="#e2e8f0" />
        <rect x="52" y="14" width="16" height="8" rx="4" fill="#e2e8f0" />
        <rect x="22" y="46" width="20" height="6" rx="3" fill="#0f172a" opacity="0.35" />
        <rect x="50" y="46" width="20" height="6" rx="3" fill="#0f172a" opacity="0.35" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    title: "ออกแบบและต่อวงจร",
    desc: "ต่อถ่านไฟฉาย 2 ก้อนแบบอนุกรม แล้วเชื่อมกับหลอดไฟและสวิตช์ให้ครบวงจร",
  },
  {
    title: "ทดลองและสังเกต",
    desc: "เปิดสวิตช์ สังเกตความสว่างของหลอดไฟ และเปรียบเทียบผล",
  },
  {
    title: "บันทึกผล",
    desc: "จดบันทึกสิ่งที่สังเกตได้และสรุปความสัมพันธ์ของจำนวนถ่านกับความสว่าง",
  },
];

export default function P6ElectricCircuitSteps() {
  const navigate = useNavigate();

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

          <div className="p6-circuit-layout">
            <div className="p6-circuit-panel">
              <div className="p6-circuit-heading">อุปกรณ์ที่ต้องใช้</div>
              <div className="p6-circuit-grid">
                {EQUIPMENT.map((item) => (
                  <div className="p6-circuit-item" key={item.title}>
                    <div className="p6-circuit-icon">{item.icon}</div>
                    <div className="p6-circuit-meta">
                      <div className="p6-circuit-title">{item.title}</div>
                      <div className="p6-circuit-sub">{item.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p6-circuit-panel">
              <div className="p6-circuit-heading">ขั้นตอนการทดลอง</div>
              <div className="p6-circuit-steps">
                {STEPS.map((step, index) => (
                  <div className="p6-circuit-step" key={step.title}>
                    <div className="p6-circuit-badge">{index + 1}</div>
                    <div>
                      <div className="p6-circuit-title">{step.title}</div>
                      <div className="p6-circuit-desc">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p6-circuit-note">
                ทดลอง 2 แบบ: ต่อถ่าน 2 ก้อน และต่อถ่าน 4 ก้อน แล้วเปรียบเทียบความสว่าง
              </div>
            </div>
          </div>

        </div>

        <div className="p6-gen-actions">
          <button className="p6-gen-btn ghost" onClick={() => navigate("/p6/electric-circuit/problem")} type="button">
            ← กลับสถานการณ์ปัญหา
          </button>
          <button className="p6-gen-btn primary" onClick={() => navigate("/p6/electric-circuit/sim")} type="button">
            ไปทดลองต่อวงจร →
          </button>
        </div>
      </div>
    </div>
  );
}

