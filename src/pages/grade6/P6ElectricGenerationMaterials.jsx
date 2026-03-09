import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const EQUIPMENT_ITEMS = [
  { id: "balloon", label: "ลูกโป่ง", image: "/images/p6/equipment/balloons-real.svg" },
  { id: "cloth", label: "ผ้าแห้ง", image: "/images/p6/equipment/markers-real.svg" },
  { id: "paper", label: "เศษกระดาษ", image: "/images/p6/equipment/tissue-real.svg" },
];

function EquipmentCard({ item, failed, onError }) {
  return (
    <div className="w-[240px] shrink-0">
      <div className="relative flex h-[240px] items-center justify-center rounded-sm border-[4px] border-[#2d356e] bg-[#e1cbab] p-3 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.6)]">
        <span className="absolute left-[6px] top-[6px] h-7 w-7 border-[3px] border-[#2d356e]" />
        <span className="absolute right-[6px] top-[6px] h-7 w-7 border-[3px] border-[#2d356e]" />
        <span className="absolute bottom-[6px] left-[6px] h-7 w-7 border-[3px] border-[#2d356e]" />
        <span className="absolute bottom-[6px] right-[6px] h-7 w-7 border-[3px] border-[#2d356e]" />

        {failed ? (
          <div className="text-center text-lg font-bold text-slate-600">รูปไม่พร้อมใช้งาน</div>
        ) : (
          <img
            src={item.image}
            alt={item.label}
            className="max-h-[170px] max-w-[170px] object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.2)]"
            onError={onError}
          />
        )}
      </div>
      <p className="mt-4 text-center text-[48px] font-bold leading-none text-slate-900">{item.label}</p>
    </div>
  );
}

export default function P6ElectricGenerationMaterials() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [broken, setBroken] = useState({});

  const from = searchParams.get("from");
  const backPath = from === "unit" ? "/p6/electric-force/vocab" : "/p6/experiment/electric-generation/vocab";
  const nextPath =
    from === "unit"
      ? "/p6/experiment/electric-generation/steps?from=unit"
      : "/p6/experiment/electric-generation/steps";

  const pageBg = {
    background:
      "radial-gradient(80% 58% at 50% 36%, #f5efef 0 62%, transparent 63%), radial-gradient(30% 22% at 12% 35%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 88% 35%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #b9d8e9 0%, #c7deeb 100%)",
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-6 pb-24 pt-6" style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[150px] top-4 h-[150px] w-[100px] bg-[#f7bd2b]"
        style={{ clipPath: "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)" }}
      />
      <span className="pointer-events-none absolute -left-[48px] top-[220px] h-[165px] w-[128px] rounded-[58%_58%_44%_44%/58%_58%_42%_42%] border-[5px] border-slate-900 bg-[#fff3a2]" />
      <span className="pointer-events-none absolute -right-[48px] top-[220px] h-[165px] w-[128px] scale-x-[-1] rounded-[58%_58%_44%_44%/58%_58%_42%_42%] border-[5px] border-slate-900 bg-[#fff3a2]" />

      <div className="relative z-10 mx-auto w-full max-w-[1220px]">
        <h1 className="text-center text-[52px] font-bold text-black">การทดลองที่ 9 เรื่อง การเกิดแรงไฟฟ้า</h1>
        <h2 className="mt-8 text-[64px] font-bold leading-none text-black">อุปกรณ์</h2>

        <div className="mt-8 flex flex-wrap justify-center gap-x-16 gap-y-8">
          {EQUIPMENT_ITEMS.map((item) => (
            <EquipmentCard
              key={item.id}
              item={item}
              failed={Boolean(broken[item.id])}
              onError={() => setBroken((prev) => ({ ...prev, [item.id]: true }))}
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-6 md:right-6">
        <button
          className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-[28px] font-black leading-none text-slate-900 shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
          onClick={() => navigate(backPath)}
          type="button"
          aria-label="กลับคำศัพท์"
          title="กลับคำศัพท์"
        >
          ←
        </button>
        <button
          className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-blue-600 text-[28px] font-black leading-none text-white shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
          onClick={() => navigate(nextPath)}
          type="button"
          aria-label="ไปหน้าถัดไป"
          title="ไปหน้าถัดไป"
        >
          →
        </button>
      </div>
    </div>
  );
}
