import { useNavigate } from "react-router-dom";

const EQUIPMENT = [
  { id: "cell", title: "ถ่านไฟฉาย", subtitle: "4 ก้อน" },
  { id: "wire", title: "สายไฟพร้อมหัวหนีบ", subtitle: "4 เส้น" },
  { id: "holder", title: "กระบะใส่ถ่านไฟฉาย", subtitle: "สำหรับ 4 ก้อน" },
  { id: "bulb", title: "หลอดไฟพร้อมฐาน", subtitle: "1 ชุด" },
];

function EquipmentIcon({ id }) {
  if (id === "cell") {
    return (
      <svg className="h-[50px] w-[50px]" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
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
      <svg className="h-[50px] w-[50px]" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
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
      <svg className="h-[50px] w-[50px]" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
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
    <svg className="h-[50px] w-[50px]" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
      <circle cx="48" cy="34" r="22" fill="#ffe38b" stroke="#334155" strokeWidth="3" />
      <ellipse cx="40" cy="24" rx="8" ry="5" fill="#ffffff" opacity="0.55" />
      <path d="M40 52h16v8H40z" fill="#8b98aa" />
      <path d="M38 60h20v4H38zm1 6h18v4H39zm2 6h14v5H41z" fill="#64748b" />
    </svg>
  );
}

export default function P6ElectricCircuitBulbSeriesParallel() {
  const navigate = useNavigate();

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-5 pt-3 text-slate-900 md:px-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(110px,10vw,180px)] top-[10px] h-[clamp(96px,10vw,136px)] w-[clamp(60px,6vw,92px)] bg-[#f7bd2b]"
        style={{
          clipPath:
            "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
        }}
      />

      <div className="relative z-[1] mx-auto grid h-full w-full max-w-[1380px] grid-rows-[auto_auto_1fr_auto] gap-2">
        <div className="inline-flex w-fit items-center rounded-full bg-gradient-to-br from-[#6bc3f0] to-[#4c9ee1] px-[18px] py-2 text-base font-black text-white shadow-[0_12px_22px_rgba(16,24,39,0.14)]">
          วงจรไฟฟ้าใกล้ตัว
        </div>
        <div className="m-0 text-[clamp(32px,2.5vw,54px)] font-black leading-[1.08]">
          การต่อหลอดไฟฟ้าแบบอนุกรมและแบบขนาน
        </div>

        <div className="relative min-h-0 overflow-y-auto rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] px-[clamp(14px,1.6vw,20px)] pb-[14px] pt-[14px] pr-[clamp(68px,10vw,116px)] shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <div className="pointer-events-none absolute bottom-[-120px] right-[-100px] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.3),rgba(255,255,255,0))]" />

          <div
            className="absolute right-[22px] top-3 grid h-[52px] w-[52px] place-items-center rounded-2xl border-2 border-slate-900/40 bg-white/75 text-slate-800 shadow-[0_10px_18px_rgba(17,24,39,0.16)]"
            title="ฟังเสียง"
            aria-hidden="true"
          >
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

          <div className="grid h-full min-h-0 grid-cols-1 gap-[14px]">
            <div className="rounded-[20px] border-2 border-white/70 bg-[#c5dfef]/45 p-4 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.9)]">
              <div className="mb-3 inline-flex items-center gap-2.5 rounded-full bg-blue-600/15 px-4 py-1.5 font-black text-slate-900">
                อุปกรณ์ที่ต้องเตรียม
              </div>

              <div className="grid grid-cols-1 gap-3 min-[981px]:grid-cols-2">
                {EQUIPMENT.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[58px_1fr] items-center gap-2.5 rounded-2xl border border-slate-400/35 bg-white px-3 py-2.5 shadow-[0_10px_18px_rgba(15,23,42,0.1)]"
                  >
                    <div className="grid h-[58px] w-[58px] place-items-center rounded-[14px] border border-slate-400/35 bg-[radial-gradient(circle_at_30%_30%,#e0f2fe,#ffffff)]">
                      <EquipmentIcon id={item.id} />
                    </div>
                    <div className="grid gap-1 content-center">
                      <div className="text-[17px] font-black text-slate-900">{item.title}</div>
                      <div className="text-[15px] font-bold text-slate-800">{item.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-1 flex flex-nowrap justify-end gap-2">
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-[28px] font-black leading-none text-slate-900 shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
            onClick={() => navigate("/p6/electric-circuit/experiments")}
            type="button"
            aria-label="กลับเลือกการทดลอง"
            title="กลับเลือกการทดลอง"
          >
            ←
          </button>
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-blue-600 text-[28px] font-black leading-none text-white shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
            onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/steps")}
            type="button"
            aria-label="ไปขั้นตอนการทดลอง"
            title="ไปขั้นตอนการทดลอง"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
