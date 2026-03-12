import { useNavigate } from "react-router-dom";

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
      <svg className="h-auto w-16" viewBox="0 0 96 64" aria-hidden="true" focusable="false">
        <rect x="8" y="10" width="60" height="40" rx="10" fill="#1f2937" />
        <rect x="14" y="18" width="12" height="24" rx="4" fill="#f59e0b" />
        <rect x="30" y="18" width="12" height="24" rx="4" fill="#f59e0b" />
        <rect x="46" y="18" width="12" height="24" rx="4" fill="#f59e0b" />
      </svg>
    );
  }
  if (variant === 1) {
    return (
      <svg className="h-auto w-16" viewBox="0 0 96 64" aria-hidden="true" focusable="false">
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
      <svg className="h-auto w-16" viewBox="0 0 96 64" aria-hidden="true" focusable="false">
        <circle cx="28" cy="26" r="14" fill="#ffd166" stroke="#1f2937" strokeWidth="2" />
        <rect x="22" y="40" width="12" height="10" rx="3" fill="#94a3b8" />
        <circle cx="68" cy="26" r="14" fill="#ffd166" stroke="#1f2937" strokeWidth="2" />
        <rect x="62" y="40" width="12" height="10" rx="3" fill="#94a3b8" />
      </svg>
    );
  }
  return (
    <svg className="h-auto w-16" viewBox="0 0 96 64" aria-hidden="true" focusable="false">
      <rect x="14" y="14" width="68" height="36" rx="6" fill="#f5deb3" stroke="#c4a484" strokeWidth="2" />
      <path d="M20 22h56" stroke="#d6b88d" strokeWidth="3" />
      <path d="M20 30h56" stroke="#d6b88d" strokeWidth="3" />
    </svg>
  );
}

function StepIcon({ index }) {
  return (
    <svg className="h-auto w-full" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
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
      <svg className="h-6 w-6" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <circle cx="16" cy="12" r="8" fill="#ffd166" stroke="#1f2937" strokeWidth="2" />
        <path d="M12 20h8v4h-8z" fill="#94a3b8" />
        <path d="M13 24h6v4h-6z" fill="#64748b" />
      </svg>
    );
  }
  return (
    <svg className="h-6 w-6" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M6 18c4-4 10-4 14 0" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <path d="M6 12c4-4 10-4 14 0" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
      <rect x="4" y="16" width="6" height="6" rx="2" fill="#111827" />
      <rect x="20" y="16" width="6" height="6" rx="2" fill="#111827" />
    </svg>
  );
}

export default function P6ElectricCircuitIntro() {
  const navigate = useNavigate();

  const pageBg = {
    background: "linear-gradient(180deg, #f7fbff 0%, #eef7ff 55%, #f8fcff 100%)",
  };

  return (
    <div
      className="relative min-h-screen px-[clamp(18px,4vw,48px)] pb-[70px] pt-[clamp(24px,4vw,56px)] text-slate-900"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 10% 20%, rgba(125, 211, 252, 0.28), transparent 45%), radial-gradient(circle at 90% 30%, rgba(251, 191, 36, 0.22), transparent 45%), repeating-linear-gradient(90deg, transparent 0 28px, rgba(59, 130, 246, 0.08) 28px 29px), repeating-linear-gradient(0deg, transparent 0 28px, rgba(59, 130, 246, 0.08) 28px 29px)",
        }}
      />

      <header className="relative z-[1] mb-[26px] text-center">
        <button
          className="cursor-pointer rounded-full bg-white px-[18px] py-2.5 font-extrabold text-blue-700 shadow-[0_10px_20px_rgba(15,23,42,0.12)]"
          onClick={() => navigate("/p6/electric-circuit/objectives")}
          type="button"
        >
          ← กลับจุดประสงค์
        </button>
        <h1 className="mb-2 mt-[18px] text-[clamp(28px,3.4vw,40px)] font-black">
          กิจกรรม : การต่อหลอดไฟฟ้าแบบอนุกรมและแบบขนาน
        </h1>
        <p className="m-0 text-lg font-semibold text-slate-800">เป้าหมายและอุปกรณ์ที่ต้องใช้</p>
      </header>

      <section className="relative z-[1] mb-6 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
        <div className="rounded-[22px] border border-slate-400/30 bg-white/90 p-[18px] shadow-[0_18px_32px_rgba(15,23,42,0.14)]">
          <div className="inline-flex rounded-full bg-blue-600/15 px-[14px] py-1.5 font-black text-slate-900">
            ออกแบบและทดลองวงจรไฟฟ้า
          </div>
          <div className="mt-[14px] grid gap-3">
            <div className="grid grid-cols-[36px_1fr] items-start gap-3 font-bold text-slate-900">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-sky-100">
                <GoalIcon type="bulb" />
              </div>
              <div>
                เพื่ออธิบายและระบุประโยชน์ของวงจรไฟฟ้าแบบอนุกรมและแบบขนาน
              </div>
            </div>
            <div className="grid grid-cols-[36px_1fr] items-start gap-3 font-bold text-slate-900">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-sky-100">
                <GoalIcon type="plug" />
              </div>
              <div>
                ฝึกการต่อวงจรและสังเกตความแตกต่างของความสว่าง
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[22px] border border-slate-400/30 bg-white/90 p-[18px] shadow-[0_18px_32px_rgba(15,23,42,0.14)]">
          <div className="inline-flex rounded-full bg-blue-600/15 px-[14px] py-1.5 font-black text-slate-900">
            อุปกรณ์ที่ต้องเตรียม
          </div>
          <div className="mt-[14px] grid gap-3">
            {EQUIPMENT.map((item, index) => (
              <div
                className="grid grid-cols-[74px_1fr] items-center gap-3 rounded-2xl border border-slate-400/30 bg-white px-3 py-2.5"
                key={item.title}
              >
                <div className="grid place-items-center rounded-[14px] bg-slate-50 p-1.5">
                  <EquipmentIcon variant={index} />
                </div>
                <div>
                  <div className="font-black">{item.title}</div>
                  <div className="text-sm font-bold text-slate-600">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-[1] grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        {STEPS.map((step, index) => (
          <div
            className="rounded-[20px] border border-slate-400/30 bg-white/95 p-4 text-center shadow-[0_16px_28px_rgba(15,23,42,0.12)]"
            key={step.title}
          >
            <div className="mx-auto mb-2 w-[90px]">
              <StepIcon index={index + 1} />
            </div>
            <div className="text-lg font-black">{step.title}</div>
            <div className="mt-1.5 text-sm font-bold text-slate-800">{step.desc}</div>
          </div>
        ))}
      </section>

      <div className="relative z-[1] mt-[22px] flex flex-wrap justify-center gap-3">
        <button
          className="cursor-pointer rounded-2xl bg-white px-5 py-3 font-black text-slate-800 shadow-[0_10px_20px_rgba(15,23,42,0.12)]"
          onClick={() => navigate("/p6/electric-circuit/objectives")}
          type="button"
        >
          ← กลับจุดประสงค์
        </button>
        <button
          className="cursor-pointer rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 px-5 py-3 font-black text-white shadow-[0_12px_24px_rgba(37,99,235,0.24)]"
          onClick={() => navigate("/p6/electric-circuit/materials")}
          type="button"
        >
          เริ่มกิจกรรม →
        </button>
      </div>
    </div>
  );
}
