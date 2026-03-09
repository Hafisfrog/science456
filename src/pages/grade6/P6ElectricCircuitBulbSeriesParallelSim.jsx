import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function LanguagePills() {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#9fc3ea] bg-white/80 p-[7px]"
      aria-hidden="true"
    >
      <span className="inline-flex h-[38px] min-w-[54px] items-center justify-center rounded-full bg-sky-300 text-xl font-extrabold leading-none text-sky-700 max-[980px]:h-[34px] max-[980px]:min-w-[46px] max-[980px]:text-[17px]">
        ไทย
      </span>
      <span className="inline-flex h-[38px] min-w-[54px] items-center justify-center rounded-full bg-sky-300 text-xl font-extrabold leading-none text-sky-700 max-[980px]:h-[34px] max-[980px]:min-w-[46px] max-[980px]:text-[17px]">
        อังกฤษ
      </span>
      <span className="inline-flex h-[38px] min-w-[54px] items-center justify-center rounded-full bg-sky-300 text-xl font-extrabold leading-none text-sky-700 max-[980px]:h-[34px] max-[980px]:min-w-[46px] max-[980px]:text-[17px]">
        มลายู
      </span>
    </div>
  );
}

function PlayBadge() {
  return (
    <div className="grid h-[60px] w-[60px] place-items-center" aria-hidden="true">
      <svg
        viewBox="0 0 64 64"
        focusable="false"
        className="h-[56px] w-[56px]"
        style={{ filter: "drop-shadow(0 8px 14px rgba(15, 23, 42, 0.2))" }}
      >
        <circle cx="32" cy="32" r="30" fill="#f7c1c1" />
        <circle cx="32" cy="32" r="21" fill="#f3a8a8" />
        <path d="M27 22l16 10-16 10z" fill="#fff" />
      </svg>
    </div>
  );
}

function Bulb({ x, y, on, removed = false, clickable = false, onToggle, label }) {
  return (
    <g
      transform={`translate(${x} ${y})`}
      className={`${clickable ? "cursor-pointer" : ""} ${removed ? "opacity-80" : ""}`}
      onClick={clickable ? onToggle : undefined}
    >
      <title>{label}</title>
      {on && (
        <g stroke="#fbbf24" strokeWidth="3" strokeLinecap="round">
          <path d="M-14 -24l-6 -7" />
          <path d="M0 -28v-8" />
          <path d="M14 -24l6 -7" />
        </g>
      )}
      <circle cx="0" cy="-6" r="15" fill={on ? "#fcd34d" : "#f8fafc"} stroke="#5b4636" strokeWidth="2.5" />
      <path d="M-7 7h14v7H-7z" fill="#a8b3c6" stroke="#5b4636" strokeWidth="1.2" />
      <path d="M-10 14h20" stroke="#5b4636" strokeWidth="2" />
      {removed && (
        <g stroke="#ef4444" strokeWidth="3.2" strokeLinecap="round">
          <path d="M-10 -16l20 20" />
          <path d="M10 -16l-20 20" />
        </g>
      )}
    </g>
  );
}

function BatteryPair({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-36" y="-8" width="32" height="16" fill="#ef4444" stroke="#111827" strokeWidth="1.5" />
      <rect x="-4" y="-8" width="32" height="16" fill="#22c1f1" stroke="#111827" strokeWidth="1.5" />
      <rect x="28" y="-8" width="32" height="16" fill="#ef4444" stroke="#111827" strokeWidth="1.5" />
      <rect x="60" y="-8" width="32" height="16" fill="#22c1f1" stroke="#111827" strokeWidth="1.5" />
      <text x="-28" y="3" fontSize="12" fontWeight="700" fill="#111827">
        +
      </text>
      <text x="36" y="3" fontSize="12" fontWeight="700" fill="#111827">
        +
      </text>
    </g>
  );
}

function SeriesCircuit({ mode = "design", removedBulb = null, onToggleBulb }) {
  const leftOn = mode === "design" ? true : removedBulb === null;
  const rightOn = mode === "design" ? true : removedBulb === null;

  return (
    <svg viewBox="0 0 320 200" className="h-auto w-[min(92%,320px)]" aria-hidden="true" focusable="false">
      <path d="M70 145V72h180v73" fill="none" stroke="#5b4636" strokeWidth="3" />
      <path d="M120 72h80" fill="none" stroke="#5b4636" strokeWidth="3" />
      <path d="M70 145h40m100 0h40" fill="none" stroke="#5b4636" strokeWidth="3" />
      <Bulb
        x={120}
        y={82}
        on={leftOn}
        removed={mode === "remove" && removedBulb === "left"}
        clickable={mode === "remove"}
        onToggle={() => onToggleBulb?.("left")}
        label="หลอดซ้าย"
      />
      <Bulb
        x={200}
        y={82}
        on={rightOn}
        removed={mode === "remove" && removedBulb === "right"}
        clickable={mode === "remove"}
        onToggle={() => onToggleBulb?.("right")}
        label="หลอดขวา"
      />
      <BatteryPair x={114} y={145} />
    </svg>
  );
}

function ParallelCircuit({ mode = "design", removedBulb = null, onToggleBulb }) {
  const topOn = mode === "design" ? true : removedBulb !== "top";
  const bottomOn = mode === "design" ? true : removedBulb !== "bottom";

  return (
    <svg viewBox="0 0 320 200" className="h-auto w-[min(92%,320px)]" aria-hidden="true" focusable="false">
      <path d="M80 145V55h160v90" fill="none" stroke="#5b4636" strokeWidth="3" />
      <path d="M80 85h160m-160 45h160" fill="none" stroke="#5b4636" strokeWidth="3" />
      <Bulb
        x={160}
        y={66}
        on={topOn}
        removed={mode === "remove" && removedBulb === "top"}
        clickable={mode === "remove"}
        onToggle={() => onToggleBulb?.("top")}
        label="หลอดบน"
      />
      <Bulb
        x={160}
        y={111}
        on={bottomOn}
        removed={mode === "remove" && removedBulb === "bottom"}
        clickable={mode === "remove"}
        onToggle={() => onToggleBulb?.("bottom")}
        label="หลอดล่าง"
      />
      <BatteryPair x={114} y={145} />
    </svg>
  );
}

function ExperimentTable({ phase, removedBulb, onToggleBulb }) {
  const isSeries = phase === "series";
  const leftTitle = isSeries ? "ออกแบบการต่อวงจรแบบอนุกรม" : "ออกแบบการต่อวงจรแบบขนาน";
  const rightTitle = "เมื่อถอดหลอดไฟออก 1 ดวง";

  return (
    <div className="grid min-h-0 grid-cols-1 overflow-hidden rounded border-[3px] border-slate-900/85 bg-white/30 min-[721px]:grid-cols-2">
      <div className="grid place-items-center border-b-[3px] border-slate-900/85 p-[10px_14px] text-center text-[clamp(20px,1.35vw,26px)] font-black leading-[1.25] text-slate-900 min-[721px]:border-r-[3px]">
        {leftTitle}
      </div>
      <div className="grid place-items-center border-b-[3px] border-slate-900/85 p-[10px_14px] text-center text-[clamp(20px,1.35vw,26px)] font-black leading-[1.25] text-slate-900">
        {rightTitle}
      </div>
      <div className="grid place-items-center p-2 min-[721px]:border-r-[3px] min-[721px]:border-slate-900/85">
        {isSeries ? <SeriesCircuit mode="design" /> : <ParallelCircuit mode="design" />}
      </div>
      <div className="grid place-items-center p-2">
        {isSeries ? (
          <SeriesCircuit mode="remove" removedBulb={removedBulb} onToggleBulb={onToggleBulb} />
        ) : (
          <ParallelCircuit mode="remove" removedBulb={removedBulb} onToggleBulb={onToggleBulb} />
        )}
      </div>
    </div>
  );
}

export default function P6ElectricCircuitBulbSeriesParallelSim() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const phase = useMemo(() => {
    const query = new URLSearchParams(search);
    return query.get("phase") === "parallel" ? "parallel" : "series";
  }, [search]);

  const isSeries = phase === "series";
  const pageTitle = isSeries ? "การต่อหลอดไฟฟ้าแบบอนุกรม" : "การต่อหลอดไฟฟ้าแบบขนาน";
  const [removedBulb, setRemovedBulb] = useState(null);

  useEffect(() => {
    setRemovedBulb(null);
  }, [phase]);

  const statusText = isSeries
    ? removedBulb
      ? "วงจรขาด หลอดทั้งสองดวงดับ"
      : "ลองแตะหลอดไฟในช่องขวาเพื่อถอดออก 1 ดวง"
    : removedBulb
      ? "อีกดวงยังสว่าง เพราะวงจรขนานมีทางเดินกระแสไฟมากกว่า 1 ทาง"
      : "ลองแตะหลอดไฟในช่องขวาเพื่อถอดออก 1 ดวง";

  const handleToggleBulb = (id) => {
    setRemovedBulb((prev) => (prev === id ? null : id));
  };

  const handleBack = () => {
    if (isSeries) {
      navigate("/p6/electric-circuit/bulb-series-parallel/steps");
      return;
    }
    navigate("/p6/electric-circuit/bulb-series-parallel/sim?phase=series");
  };

  const handleNext = () => {
    if (isSeries) {
      navigate("/p6/electric-circuit/bulb-series-parallel/sim?phase=parallel");
      return;
    }
    navigate("/p6/electric-circuit/experiments");
  };

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
        <h1 className="m-0 text-[clamp(32px,2.3vw,50px)] font-black leading-[1.08]">{pageTitle}</h1>

        <div className="relative min-h-0 rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] pb-3 pl-[clamp(14px,1.6vw,20px)] pr-[18px] pt-[clamp(14px,1.6vw,20px)] shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <div className="rounded-3xl border-2 border-white/75 bg-[#f3efef]/90 p-[12px_16px_10px]">
            <div className="mb-2 flex items-center gap-2.5">
              <PlayBadge />
              <div className="text-[clamp(24px,1.9vw,32px)] font-black text-slate-900">เลือกอุปกรณ์</div>
            </div>

            <ExperimentTable phase={phase} removedBulb={removedBulb} onToggleBulb={handleToggleBulb} />

            <div className="mt-2 rounded-[14px] border border-dashed border-slate-900/40 bg-white/45 px-3 py-2 text-center text-[clamp(18px,1.15vw,22px)] font-extrabold text-slate-900">
              {statusText}
            </div>

            <div className="mt-2 flex items-center justify-start">
              <LanguagePills />
            </div>
          </div>
        </div>

        <div className="mt-1 flex flex-nowrap justify-end gap-2">
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-[28px] font-black leading-none text-slate-900 shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
            onClick={handleBack}
            type="button"
            aria-label="ย้อนกลับ"
            title="ย้อนกลับ"
          >
            ←
          </button>
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-blue-600 text-[28px] font-black leading-none text-white shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
            onClick={handleNext}
            type="button"
            aria-label="ต่อไป"
            title="ต่อไป"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
