import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P6ElectricGenerationSteps.css";
import "./P6ElectricCircuitSim.css";

const OPTIONS = [
  { cells: 1, label: "1 ถ่าน", note: "หลอดไฟสว่างเล็กน้อย", level: "low" },
  { cells: 2, label: "2 ถ่าน", note: "หลอดไฟสว่างเพิ่มขึ้น", level: "mid" },
  { cells: 3, label: "3 ถ่าน", note: "หลอดไฟสว่างเพิ่มขึ้นอีก", level: "mid-high" },
  { cells: 4, label: "4 ถ่าน", note: "หลอดไฟสว่างมากที่สุด", level: "high" },
];

const WIRE_CONFIG = [
  { id: "wireA", endpoint: "a2", fromAnchor: "batteryPos", toAnchor: "switchLeft", color: "#ef4444" },
  { id: "wireB", endpoint: "b2", fromAnchor: "switchRight", toAnchor: "bulbBottom", color: "#2563eb" },
  { id: "wireC", endpoint: "c2", fromAnchor: "bulbTop", toAnchor: "batteryNeg", color: "#10b981" },
];

function buildLooseEndpoints(anchorMap) {
  return {
    a2: { pos: { x: anchorMap.batteryPos.x + 28, y: anchorMap.batteryPos.y + 8 }, anchor: null },
    b2: { pos: { x: anchorMap.switchRight.x + 26, y: anchorMap.switchRight.y - 8 }, anchor: null },
    c2: { pos: { x: anchorMap.bulbTop.x + 28, y: anchorMap.bulbTop.y - 6 }, anchor: null },
  };
}

function cloneEndpoints(source) {
  return Object.fromEntries(
    Object.entries(source).map(([id, endpoint]) => [
      id,
      { anchor: endpoint.anchor, pos: { x: endpoint.pos.x, y: endpoint.pos.y } },
    ]),
  );
}

function CircuitPreview({ cells, level }) {
  const glowMap = {
    low: 0.2,
    mid: 0.5,
    "mid-high": 0.75,
    high: 1,
  };
  const glow = glowMap[level] ?? 0.6;
  const cellPositions = Array.from({ length: cells }, (_, index) => 30 + index * 12);

  return (
    <svg viewBox="0 0 180 90" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`previewGlow-${cells}`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={`rgba(255, 214, 102, ${glow})`} />
          <stop offset="1" stopColor="rgba(255, 214, 102, 0)" />
        </radialGradient>
      </defs>
      <rect x="14" y="26" width="72" height="40" rx="10" fill="#1f2937" />
      {cellPositions.map((x) => (
        <rect key={x} x={x} y="32" width="10" height="28" rx="3" fill="#f59e0b" />
      ))}
      <circle cx="142" cy="34" r="24" fill={`rgba(255, 214, 102, ${glow * 0.35})`} />
      <circle cx="142" cy="34" r="18" fill={`url(#previewGlow-${cells})`} />
      <circle cx="142" cy="34" r="11" fill="#ffd166" stroke="#1f2937" strokeWidth="2" />
      <path d="M136 46h12v8h-12z" fill="#94a3b8" />
      <path d="M138 54h8v8h-8z" fill="#64748b" />
      <path d="M86 44c22 0 30-12 42-12" stroke="#2563eb" strokeWidth="3" fill="none" />
      <path d="M14 44c14 0 22 12 34 12" stroke="#ef4444" strokeWidth="3" fill="none" />
      <rect x="92" y="56" width="18" height="8" rx="3" fill="#e2e8f0" stroke="#1f2937" strokeWidth="2" />
    </svg>
  );
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function BatteryIcon({ cells }) {
  const cellPositions = Array.from({ length: cells }, (_, index) => 18 + index * 12);
  return (
    <svg viewBox="0 0 120 64" aria-hidden="true" focusable="false">
      <rect x="8" y="10" width="72" height="44" rx="12" fill="#1f2937" />
      {cellPositions.map((x) => (
        <rect key={x} x={x} y="18" width="10" height="28" rx="4" fill="#f59e0b" />
      ))}
      <path d="M8 34c10 0 18 8 28 8" stroke="#ef4444" strokeWidth="4" fill="none" />
    </svg>
  );
}

function BulbIcon({ level }) {
  const glowMap = {
    off: 0,
    low: 0.2,
    mid: 0.5,
    "mid-high": 0.75,
    high: 1,
  };
  const glow = glowMap[level] ?? 0.6;
  const isOff = level === "off";
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`dragGlow-${level}`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={`rgba(255, 214, 102, ${glow})`} />
          <stop offset="1" stopColor="rgba(255, 214, 102, 0)" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="24" r="22" fill={`rgba(255, 214, 102, ${glow * 0.35})`} />
      <circle cx="32" cy="24" r="18" fill={`url(#dragGlow-${level})`} />
      <circle cx="32" cy="24" r="12" fill={isOff ? "#d1d5db" : "#ffd166"} stroke="#1f2937" strokeWidth="2" />
      <path d="M26 36h12v8H26z" fill="#94a3b8" />
      <path d="M28 44h8v8h-8z" fill="#64748b" />
    </svg>
  );
}

function SwitchIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect x="16" y="10" width="32" height="44" rx="10" fill="#e2e8f0" stroke="#1f2937" strokeWidth="2" />
      <rect x="22" y="18" width="20" height="12" rx="6" fill="#cbd5f5" />
      <rect x="22" y="34" width="20" height="12" rx="6" fill="#94a3b8" />
      <circle cx="32" cy="24" r="3" fill="#1f2937" />
      <circle cx="32" cy="40" r="3" fill="#1f2937" />
    </svg>
  );
}

export default function P6ElectricCircuitSim() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(2);
  const dragAreaRef = useRef(null);
  const [area, setArea] = useState({ width: 0, height: 0 });
  const [endpoints, setEndpoints] = useState({
    a2: { pos: { x: 160, y: 120 }, anchor: null },
    b2: { pos: { x: 230, y: 90 }, anchor: null },
    c2: { pos: { x: 40, y: 140 }, anchor: null },
  });
  const endpointsByCellsRef = useRef({});
  const initializedRef = useRef(false);
  const dragRef = useRef(null);
  const current = useMemo(() => OPTIONS.find((item) => item.cells === selected), [selected]);
  const levelClass = current?.level || "mid";

  useLayoutEffect(() => {
    if (!dragAreaRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setArea({ width, height });
    });
    observer.observe(dragAreaRef.current);
    return () => observer.disconnect();
  }, []);

  const layout = useMemo(() => {
    if (!area.width || !area.height) return null;
    const battery = { x: area.width * 0.22, y: area.height * 0.64 };
    const bulb = { x: area.width * 0.72, y: area.height * 0.35 };
    const switcher = { x: area.width * 0.52, y: area.height * 0.7 };
    return {
      battery,
      bulb,
      switcher,
      size: {
        battery: { w: 120, h: 64 },
        bulb: { w: 64, h: 64 },
        switcher: { w: 64, h: 64 },
      },
    };
  }, [area]);

  const anchors = useMemo(() => {
    if (!layout) return {};
    const { battery, bulb, switcher, size } = layout;
    return {
      batteryPos: { x: battery.x + size.battery.w / 2 - 6, y: battery.y },
      batteryNeg: { x: battery.x - size.battery.w / 2 + 6, y: battery.y },
      switchLeft: { x: switcher.x - size.switcher.w / 2 + 6, y: switcher.y },
      switchRight: { x: switcher.x + size.switcher.w / 2 - 6, y: switcher.y },
      bulbTop: { x: bulb.x - size.bulb.w / 2 + 6, y: bulb.y - 12 },
      bulbBottom: { x: bulb.x - size.bulb.w / 2 + 6, y: bulb.y + 12 },
    };
  }, [layout]);

  useEffect(() => {
    if (!layout || initializedRef.current === true) return;
    initializedRef.current = true;
    const initialEndpoints = buildLooseEndpoints(anchors);
    setEndpoints(initialEndpoints);
    endpointsByCellsRef.current[selected] = cloneEndpoints(initialEndpoints);
  }, [anchors, layout, selected]);

  const connectedCount = useMemo(
    () =>
      WIRE_CONFIG.reduce(
        (count, wire) => count + (endpoints[wire.endpoint]?.anchor === wire.toAnchor ? 1 : 0),
        0,
      ),
    [endpoints],
  );
  const isCircuitReady = connectedCount === WIRE_CONFIG.length;
  const bulbLevel = isCircuitReady ? levelClass : "off";

  const handleSelectCells = (cells) => {
    if (cells === selected) return;
    if (anchors.batteryPos && anchors.switchRight && anchors.bulbTop) {
      endpointsByCellsRef.current[selected] = cloneEndpoints(endpoints);
    }
    dragRef.current = null;
    const cachedEndpoints = endpointsByCellsRef.current[cells];
    setSelected(cells);
    if (cachedEndpoints) {
      setEndpoints(cloneEndpoints(cachedEndpoints));
      return;
    }
    if (anchors.batteryPos && anchors.switchRight && anchors.bulbTop) {
      const freshEndpoints = buildLooseEndpoints(anchors);
      endpointsByCellsRef.current[cells] = cloneEndpoints(freshEndpoints);
      setEndpoints(freshEndpoints);
    }
  };

  const getEndpointPos = (id) => {
    const endpoint = endpoints[id];
    if (!endpoint) return { x: 0, y: 0 };
    if (endpoint.anchor && anchors[endpoint.anchor]) {
      return anchors[endpoint.anchor];
    }
    return endpoint.pos;
  };

  const handleEndpointDown = (id, event) => {
    if (!area.width || !area.height) return;
    const currentPos = getEndpointPos(id);
    dragRef.current = {
      id,
      startX: event.clientX,
      startY: event.clientY,
      originX: currentPos.x,
      originY: currentPos.y,
    };
    setEndpoints((prev) => ({
      ...prev,
      [id]: { ...prev[id], anchor: null, pos: currentPos },
    }));
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleEndpointMove = (id, event) => {
    if (!dragRef.current || dragRef.current.id !== id) return;
    const dx = event.clientX - dragRef.current.startX;
    const dy = event.clientY - dragRef.current.startY;
    const nextX = clamp(dragRef.current.originX + dx, 8, area.width - 8);
    const nextY = clamp(dragRef.current.originY + dy, 8, area.height - 8);
    setEndpoints((prev) => ({
      ...prev,
      [id]: { ...prev[id], pos: { x: nextX, y: nextY }, anchor: null },
    }));
  };

  const handleEndpointUp = (id, event) => {
    if (!dragRef.current || dragRef.current.id !== id) return;
    dragRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
    const currentPos = getEndpointPos(id);
    const wire = WIRE_CONFIG.find((item) => item.endpoint === id);
    const targetAnchor = wire ? anchors[wire.toAnchor] : null;
    if (!targetAnchor) return;
    const dx = currentPos.x - targetAnchor.x;
    const dy = currentPos.y - targetAnchor.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist <= 18) {
      setEndpoints((prev) => ({
        ...prev,
        [id]: { ...prev[id], anchor: wire.toAnchor, pos: targetAnchor },
      }));
    }
  };

  const buildPath = (p1, p2) => {
    const midX = (p1.x + p2.x) / 2;
    return `M ${p1.x} ${p1.y} C ${midX} ${p1.y}, ${midX} ${p2.y}, ${p2.x} ${p2.y}`;
  };

  return (
    <div className="p6-gen-page">
      <div className="p6-gen-container">
        <div className="p6-gen-tag">วงจรไฟฟ้าใกล้ตัว</div>
        <div className="p6-gen-title">เรื่อง วงจรไฟฟ้าอย่างง่าย</div>

        <div className="p6-gen-card p6-circuit-sim">
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

          <div className="p6-circuit-sim-top">
            <div className="p6-circuit-sim-title">เลือกจำนวนถ่านเพื่อทดลอง</div>
            <div className="p6-circuit-sim-sub">
              เลือก 1–4 ถ่าน แล้วสังเกตความสว่างของหลอดไฟ
            </div>
          </div>

          <div className="p6-circuit-sim-grid">
            {OPTIONS.map((item) => (
              <button
                key={item.cells}
                className={`p6-circuit-sim-card ${selected === item.cells ? "active" : ""}`}
                type="button"
                onClick={() => handleSelectCells(item.cells)}
              >
                <div className="p6-circuit-sim-icon">
                  <CircuitPreview cells={item.cells} level={item.level} />
                </div>
                <div className="p6-circuit-sim-label">{item.label}</div>
                <div className="p6-circuit-sim-note">{item.note}</div>
              </button>
            ))}
          </div>

          <div className="p6-circuit-sim-preview">
            <div className="p6-circuit-sim-chip">ตัวอย่างการต่อวงจร</div>
            <div className="p6-circuit-sim-preview-body">
              <div className="p6-circuit-drag-area" ref={dragAreaRef}>
                <div className="p6-circuit-drag-hint">ลากสายไปต่อที่จุดวงกลม</div>
                <div className={`p6-circuit-connect-state ${isCircuitReady ? "ready" : ""}`}>
                  Connect {connectedCount}/{WIRE_CONFIG.length}
                </div>
                <svg className="p6-circuit-wire-layer" viewBox={`0 0 ${area.width} ${area.height}`} aria-hidden="true">
                  {WIRE_CONFIG.map((wire) => {
                    const p1 = anchors[wire.fromAnchor];
                    const p2 = getEndpointPos(wire.endpoint);
                    if (!p1) return null;
                    return (
                      <path
                        key={wire.id}
                        d={buildPath(p1, p2)}
                        stroke={wire.color}
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                      />
                    );
                  })}
                </svg>

                {layout && (
                  <>
                    <div
                      className="p6-circuit-piece battery"
                      style={{ left: `${layout.battery.x}px`, top: `${layout.battery.y}px` }}
                    >
                      <BatteryIcon cells={selected} />
                    </div>
                    <div
                      className={`p6-circuit-piece bulb level-${bulbLevel}`}
                      style={{ left: `${layout.bulb.x}px`, top: `${layout.bulb.y}px` }}
                    >
                      <BulbIcon level={bulbLevel} />
                    </div>
                    <div
                      className="p6-circuit-piece switch"
                      style={{ left: `${layout.switcher.x}px`, top: `${layout.switcher.y}px` }}
                    >
                      <SwitchIcon />
                    </div>
                    {Object.entries(anchors).map(([key, point]) => (
                      <div
                        key={key}
                        className="p6-circuit-anchor"
                        style={{ left: `${point.x}px`, top: `${point.y}px` }}
                      />
                    ))}
                  </>
                )}

                {Object.entries(endpoints).map(([id, endpoint]) => {
                  const pos = endpoint.anchor && anchors[endpoint.anchor] ? anchors[endpoint.anchor] : endpoint.pos;
                  const colorClass = id.startsWith("a")
                    ? "red"
                    : id.startsWith("b")
                    ? "blue"
                    : "green";
                  return (
                    <div
                      key={id}
                      className={`p6-circuit-endpoint ${colorClass} ${endpoint.anchor ? "connected" : ""}`}
                      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                      onPointerDown={(event) => handleEndpointDown(id, event)}
                      onPointerMove={(event) => handleEndpointMove(id, event)}
                      onPointerUp={(event) => handleEndpointUp(id, event)}
                    />
                  );
                })}
              </div>
              <div>
                <div className="p6-circuit-sim-preview-title">
                  เลือก {selected} ถ่าน
                </div>
                <div className="p6-circuit-sim-preview-desc">
                  ผลที่คาดว่าจะเห็น: {current?.note}
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="p6-gen-actions">
          <button className="p6-gen-btn ghost" onClick={() => navigate("/p6/electric-circuit/steps")} type="button">
            ← กลับอุปกรณ์และขั้นตอน
          </button>
          <button
            className="p6-gen-btn primary"
            onClick={() => navigate(`/p6/electric-circuit/result?cells=${selected}`)}
            type="button"
            disabled={!isCircuitReady}
          >
            ดูผลการทดลอง →
          </button>
        </div>
      </div>
    </div>
  );
}
