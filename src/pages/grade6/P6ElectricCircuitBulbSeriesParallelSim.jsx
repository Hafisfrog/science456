import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./P6ElectricGenerationSteps.css";
import "./P6ElectricCircuitBulbSeriesParallelSim.css";

function LanguagePills() {
  return (
    <div className="p6-circuit-bsp-sim-lang" aria-hidden="true">
      <span>ไทย</span>
      <span>อังกฤษ</span>
      <span>มลายู</span>
    </div>
  );
}

function PlayBadge() {
  return (
    <div className="p6-circuit-bsp-sim-play" aria-hidden="true">
      <svg viewBox="0 0 64 64" focusable="false">
        <circle cx="32" cy="32" r="30" fill="#f7c1c1" />
        <circle cx="32" cy="32" r="21" fill="#f3a8a8" />
        <path d="M27 22l16 10-16 10z" fill="#fff" />
      </svg>
    </div>
  );
}

function Bulb({ x, y, on, removed = false, clickable = false, onToggle, label }) {
  const className = [
    "p6-circuit-bsp-sim-bulb",
    clickable ? "is-clickable" : "",
    removed ? "is-removed" : "",
  ]
    .join(" ")
    .trim();

  return (
    <g transform={`translate(${x} ${y})`} className={className} onClick={clickable ? onToggle : undefined}>
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
    <svg viewBox="0 0 320 200" className="p6-circuit-bsp-sim-svg" aria-hidden="true" focusable="false">
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
    <svg viewBox="0 0 320 200" className="p6-circuit-bsp-sim-svg" aria-hidden="true" focusable="false">
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
    <div className="p6-circuit-bsp-sim-table">
      <div className="p6-circuit-bsp-sim-head">{leftTitle}</div>
      <div className="p6-circuit-bsp-sim-head">{rightTitle}</div>
      <div className="p6-circuit-bsp-sim-cell">
        {isSeries ? <SeriesCircuit mode="design" /> : <ParallelCircuit mode="design" />}
      </div>
      <div className="p6-circuit-bsp-sim-cell">
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

  return (
    <div className="p6-gen-page p6-circuit-bsp-sim-page">
      <div className="p6-gen-container p6-circuit-bsp-sim-container">
        <div className="p6-gen-tag">วงจรไฟฟ้าใกล้ตัว</div>
        <h1 className="p6-gen-title">{pageTitle}</h1>

        <div className="p6-gen-card p6-circuit-bsp-sim-card">
          <div className="p6-circuit-bsp-sim-inner">
            <div className="p6-circuit-bsp-sim-toolbar">
              <PlayBadge />
              <div className="p6-circuit-bsp-sim-label">เลือกอุปกรณ์</div>
            </div>
            <ExperimentTable phase={phase} removedBulb={removedBulb} onToggleBulb={handleToggleBulb} />
            <div className="p6-circuit-bsp-sim-status">{statusText}</div>
            <div className="p6-circuit-bsp-sim-bottom">
              <LanguagePills />
            </div>
          </div>
        </div>

        <div className="p6-gen-actions">
          <button className="p6-gen-btn ghost" onClick={handleBack} type="button">
            ย้อนกลับ
          </button>
          <button className="p6-gen-btn primary" onClick={handleNext} type="button">
            ต่อไป
          </button>
        </div>
      </div>
    </div>
  );
}
