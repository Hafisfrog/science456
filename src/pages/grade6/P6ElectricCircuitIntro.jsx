import { useNavigate } from "react-router-dom";
import "./P6ElectricCircuitIntro.css";

const EQUIPMENT = [
  { title: "กระบะถ่านไฟฉาย", subtitle: "1 ชุด" },
  { title: "สายไฟพร้อมหัวหนีบ", subtitle: "2 เส้น" },
  { title: "หลอดไฟพร้อมฐาน", subtitle: "2 ชุด" },
  { title: "แผ่นกระดาน", subtitle: "1 แผ่น" },
];

const STEPS = [
  {
    title: "ออกแบบวงจร",
    desc: "แบ่งกลุ่มและออกแบบวงจรไฟฟ้าแบบอนุกรมและแบบขนาน",
  },
  {
    title: "คาดคะเนผล",
    desc: "คาดการณ์ความสว่างของหลอดไฟในแต่ละแบบก่อนทดลองจริง",
  },
  {
    title: "ตรวจสอบและบันทึก",
    desc: "ทดลองต่อวงจรจริง สังเกตและบันทึกผลการเปลี่ยนแปลง",
  },
  {
    title: "สรุปผลการทดลอง",
    desc: "ร่วมกันอภิปรายและสรุปผลการทดลองในชั้นเรียน",
  },
];

function EquipmentIcon({ variant }) {
  if (variant === 0) {
    return (
      <svg viewBox="0 0 96 64" aria-hidden="true" focusable="false">
        <rect x="8" y="10" width="60" height="40" rx="10" fill="#1f2937" />
        <rect x="14" y="18" width="12" height="24" rx="4" fill="#f59e0b" />
        <rect x="30" y="18" width="12" height="24" rx="4" fill="#f59e0b" />
        <rect x="46" y="18" width="12" height="24" rx="4" fill="#f59e0b" />
      </svg>
    );
  }
  if (variant === 1) {
    return (
      <svg viewBox="0 0 96 64" aria-hidden="true" focusable="false">
        <path d="M10 40c20-18 48-18 68 0" fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
        <path d="M10 24c20-18 48-18 68 0" fill="none" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
        <rect x="8" y="34" width="12" height="10" rx="3" fill="#111827" />
        <rect x="76" y="34" width="12" height="10" rx="3" fill="#111827" />
        <rect x="8" y="18" width="12" height="10" rx="3" fill="#111827" />
        <rect x="76" y="18" width="12" height="10" rx="3" fill="#111827" />
      </svg>
    );
  }
  if (variant === 2) {
    return (
      <svg viewBox="0 0 96 64" aria-hidden="true" focusable="false">
        <circle cx="28" cy="26" r="14" fill="#ffd166" stroke="#1f2937" strokeWidth="2" />
        <rect x="22" y="40" width="12" height="10" rx="3" fill="#94a3b8" />
        <circle cx="68" cy="26" r="14" fill="#ffd166" stroke="#1f2937" strokeWidth="2" />
        <rect x="62" y="40" width="12" height="10" rx="3" fill="#94a3b8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 96 64" aria-hidden="true" focusable="false">
      <rect x="14" y="14" width="68" height="36" rx="6" fill="#f5deb3" stroke="#c4a484" strokeWidth="2" />
      <path d="M20 22h56" stroke="#d6b88d" strokeWidth="3" />
      <path d="M20 30h56" stroke="#d6b88d" strokeWidth="3" />
    </svg>
  );
}

function StepIcon({ index }) {
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" focusable="false">
      <circle cx="48" cy="48" r="36" fill="rgba(59,130,246,0.15)" />
      <circle cx="48" cy="48" r="24" fill="rgba(16,185,129,0.18)" />
      <text x="48" y="56" textAnchor="middle" fontSize="28" fontWeight="900" fill="#0f172a">
        {index}
      </text>
    </svg>
  );
}

function GoalIcon({ type }) {
  if (type === "bulb") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <circle cx="16" cy="12" r="8" fill="#ffd166" stroke="#1f2937" strokeWidth="2" />
        <path d="M12 20h8v4h-8z" fill="#94a3b8" />
        <path d="M13 24h6v4h-6z" fill="#64748b" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M6 18c4-4 10-4 14 0" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <path d="M6 12c4-4 10-4 14 0" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
      <rect x="4" y="16" width="6" height="6" rx="2" fill="#111827" />
      <rect x="20" y="16" width="6" height="6" rx="2" fill="#111827" />
    </svg>
  );
}

export default function P6ElectricCircuitIntro() {
  const navigate = useNavigate();

  return (
    <div className="p6-activity-page">
      <header className="p6-activity-header">
        <button className="p6-activity-back" onClick={() => navigate("/p6/electric-circuit/objectives")} type="button">
          ← กลับจุดประสงค์
        </button>
        <h1>กิจกรรม : การต่อหลอดไฟฟ้าแบบอนุกรมและแบบขนาน</h1>
        <p>เป้าหมายและอุปกรณ์ที่ต้องใช้</p>
      </header>

      <section className="p6-activity-top">
        <div className="p6-activity-card">
          <div className="p6-activity-chip">ออกแบบและทดลองวงจรไฟฟ้า</div>
          <div className="p6-activity-card-body">
            <div className="p6-activity-mini">
              <div className="p6-activity-mini-icon">
                <GoalIcon type="bulb" />
              </div>
              <div>
                เพื่ออธิบายและระบุประโยชน์ของวงจรไฟฟ้าแบบอนุกรมและแบบขนาน
              </div>
            </div>
            <div className="p6-activity-mini">
              <div className="p6-activity-mini-icon">
                <GoalIcon type="plug" />
              </div>
              <div>
                ฝึกการต่อวงจรและสังเกตความแตกต่างของความสว่าง
              </div>
            </div>
          </div>
        </div>

        <div className="p6-activity-card">
          <div className="p6-activity-chip">อุปกรณ์ที่ต้องเตรียม</div>
          <div className="p6-activity-equipment">
            {EQUIPMENT.map((item, index) => (
              <div className="p6-activity-equipment-item" key={item.title}>
                <div className="p6-activity-equipment-icon">
                  <EquipmentIcon variant={index} />
                </div>
                <div className="p6-activity-equipment-text">
                  <div className="p6-activity-equipment-title">{item.title}</div>
                  <div className="p6-activity-equipment-sub">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="p6-activity-steps">
        {STEPS.map((step, index) => (
          <div className="p6-activity-step" key={step.title}>
            <div className="p6-activity-step-icon">
              <StepIcon index={index + 1} />
            </div>
            <div className="p6-activity-step-title">{step.title}</div>
            <div className="p6-activity-step-desc">{step.desc}</div>
          </div>
        ))}
      </section>

      <div className="p6-activity-actions">
        <button className="p6-activity-btn ghost" onClick={() => navigate("/p6/electric-circuit/objectives")} type="button">
          ← กลับจุดประสงค์
        </button>
        <button className="p6-activity-btn primary" onClick={() => navigate("/p6/electric-circuit/problem")} type="button">
          เริ่มกิจกรรม →
        </button>
      </div>
    </div>
  );
}
