import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const TEXT = {
  th: {
    badge: "วงจรไฟฟ้าใกล้ตัว",
    title: "เรื่อง วงจรไฟฟ้าอย่างง่าย",
    chooseTitle: "เลือกจำนวนถ่านเพื่อลอง",
    chooseHint: "เลือก 1–4 ถ่าน แล้วสังเกตความสว่างของหลอดไฟ",
    sectionTitle: "ตัวอย่างการต่อวงจร",
    dragTip: "ลากสายไปต่อที่จุดวงกลม",
    connectedLabel: (connected, total) => `เชื่อมต่อ ${connected}/${total}`,
    selectedLabel: (n) => `เลือก ${n} ถ่าน`,
    expectedPrefix: "ผลคาดว่าจะเห็น:",
    optionLabels: ["1 ถ่าน", "2 ถ่าน", "3 ถ่าน", "4 ถ่าน"],
    optionNotes: [
      "หลอดไฟสว่างเล็กน้อย",
      "หลอดไฟสว่างเพิ่มขึ้น",
      "หลอดไฟสว่างเพิ่มขึ้นอีก",
      "หลอดไฟสว่างมากที่สุด",
    ],
    back: "โ",
    next: "โ’",
    langLabel: { th: "ไทย", en: "English", ms: "Melayu" },
  },
  en: {
    badge: "Everyday Circuits",
    title: "Simple Electric Circuit",
    chooseTitle: "Choose number of cells",
    chooseHint: "Pick 1–4 cells and observe bulb brightness",
    sectionTitle: "Circuit Connection Example",
    dragTip: "Drag wires to the round anchors",
    connectedLabel: (connected, total) => `Connected ${connected}/${total}`,
    selectedLabel: (n) => `Selected ${n} cell${n > 1 ? "s" : ""}`,
    expectedPrefix: "Expected:",
    optionLabels: ["1 cell", "2 cells", "3 cells", "4 cells"],
    optionNotes: [
      "Bulb glows dim",
      "Bulb gets brighter",
      "Bulb brighter again",
      "Bulb brightest",
    ],
    back: "โ",
    next: "โ’",
    langLabel: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    badge: "Litar Harian",
    title: "Litar Elektrik Mudah",
    chooseTitle: "Pilih bilangan sel bateri",
    chooseHint: "Pilih 1–4 sel dan perhati kecerahan mentol",
    sectionTitle: "Contoh sambungan litar",
    dragTip: "Seret wayar ke bulatan sambungan",
    connectedLabel: (connected, total) => `Disambung ${connected}/${total}`,
    selectedLabel: (n) => `Pilih ${n} sel`,
    expectedPrefix: "Jangkaan:",
    optionLabels: ["1 sel", "2 sel", "3 sel", "4 sel"],
    optionNotes: [
      "Mentol menyala malap",
      "Mentol bertambah terang",
      "Mentol lebih terang lagi",
      "Mentol paling terang",
    ],
    back: "โ",
    next: "โ’",
    langLabel: { th: "Thai", en: "Inggeris", ms: "Melayu" },
  },
};

const LANGS = [
  { id: "th", label: TEXT.th.langLabel.th },
  { id: "en", label: TEXT.en.langLabel.en },
  { id: "ms", label: TEXT.ms.langLabel.ms },
];

const BASE_OPTIONS = [
  { cells: 1, level: "low" },
  { cells: 2, level: "mid" },
  { cells: 3, level: "mid-high" },
  { cells: 4, level: "high" },
];

const getOptions = (content) =>
  BASE_OPTIONS.map((item, idx) => ({
    ...item,
    label: content.optionLabels[idx],
    note: content.optionNotes[idx],
  }));

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
    <svg className="block h-auto w-full" viewBox="0 0 120 64" aria-hidden="true" focusable="false">
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
    <svg className="block h-auto w-full" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
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
    <svg className="block h-auto w-full" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect x="16" y="10" width="32" height="44" rx="10" fill="#e2e8f0" stroke="#1f2937" strokeWidth="2" />
      <rect x="22" y="18" width="20" height="12" rx="6" fill="#cbd5f5" />
      <rect x="22" y="34" width="20" height="12" rx="6" fill="#94a3b8" />
      <circle cx="32" cy="24" r="3" fill="#1f2937" />
      <circle cx="32" cy="40" r="3" fill="#1f2937" />
    </svg>
  );
}

function getBulbPieceStyle(level) {
  const map = {
    off: "0 8px 14px rgba(15, 23, 42, 0.12)",
    low: "0 8px 14px rgba(15, 23, 42, 0.12), 0 0 12px rgba(255, 214, 102, 0.35)",
    mid: "0 10px 18px rgba(15, 23, 42, 0.14), 0 0 18px rgba(255, 214, 102, 0.55)",
    "mid-high": "0 12px 20px rgba(15, 23, 42, 0.16), 0 0 24px rgba(255, 214, 102, 0.75)",
    high: "0 14px 24px rgba(15, 23, 42, 0.18), 0 0 32px rgba(255, 214, 102, 0.95)",
  };
  return { boxShadow: map[level] || map.mid };
}

export default function P6ElectricCircuitSim() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const content = TEXT[lang] || TEXT.th;
  const options = useMemo(() => getOptions(content), [content]);

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
  const current = useMemo(() => options.find((item) => item.cells === selected), [options, selected]);
  const levelClass = current?.level || "mid";

  useLayoutEffect(() => {
    if (!dragAreaRef.current) return undefined;

    const element = dragAreaRef.current;
    const syncArea = () => {
      const { width, height } = element.getBoundingClientRect();
      setArea((currentArea) => {
        if (currentArea.width === width && currentArea.height === height) {
          return currentArea;
        }
        return { width, height };
      });
    };

    syncArea();

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setArea((currentArea) => {
        if (currentArea.width === width && currentArea.height === height) {
          return currentArea;
        }
        return { width, height };
      });
    });

    observer.observe(element);
    window.addEventListener("resize", syncArea);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncArea);
    };
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
    if (!layout || initializedRef.current === true) return undefined;
    initializedRef.current = true;
    const initialEndpoints = buildLooseEndpoints(anchors);

    const frameId = window.requestAnimationFrame(() => {
      setEndpoints(initialEndpoints);
      endpointsByCellsRef.current[selected] = cloneEndpoints(initialEndpoints);
    });

    return () => window.cancelAnimationFrame(frameId);
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
          {content.badge}
        </div>
        <div className="m-0 text-[clamp(32px,2.5vw,54px)] font-black leading-[1.08]">{content.title}</div>

        <div className="relative min-h-0 rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] p-[clamp(14px,1.6vw,20px)] shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <div className="mb-4">
            <div className="text-[clamp(20px,2.6vw,26px)] font-black text-slate-900">{content.chooseTitle}</div>
            <div className="mt-1 font-semibold text-slate-800">{content.chooseHint}</div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {options.map((item) => (
              <button
                key={item.cells}
                className={`cursor-pointer rounded-[18px] border-2 bg-white p-3 text-left shadow-[0_12px_20px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 ${
                  selected === item.cells
                    ? "border-blue-600/80 bg-gradient-to-b from-white to-blue-50 shadow-[0_16px_26px_rgba(37,99,235,0.18)]"
                    : "border-slate-400/45 hover:border-blue-600/40"
                }`}
                type="button"
                onClick={() => handleSelectCells(item.cells)}
              >
                <div className="grid place-items-center rounded-[14px] border border-slate-400/40 bg-[radial-gradient(circle_at_30%_30%,#e0f2fe,#ffffff)] p-1.5">
                  <CircuitPreview cells={item.cells} level={item.level} />
                </div>
                <div className="mt-2.5 text-lg font-black text-slate-900">{item.label}</div>
                <div className="mt-1 text-sm font-bold text-slate-800">{item.note}</div>
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-[18px] border border-slate-900/25 bg-white/75 p-3.5">
            <div className="inline-flex items-center rounded-full bg-blue-600/15 px-[14px] py-1.5 font-black text-slate-900">
              {content.sectionTitle}
            </div>

            <div className="mt-3 grid grid-cols-1 items-center gap-4 lg:grid-cols-[minmax(220px,1fr)_1fr]">
              <div
                className="relative h-[220px] overflow-hidden rounded-2xl border border-dashed border-slate-900/20"
                style={{
                  background:
                    "radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.8), transparent 60%), linear-gradient(135deg, rgba(224, 242, 254, 0.8), rgba(255, 255, 255, 0.9))",
                }}
                ref={dragAreaRef}
              >
                <div className="absolute left-3 top-2.5 rounded-full bg-blue-600/15 px-2.5 py-1 text-xs font-extrabold text-slate-900">
                  {content.dragTip}
                </div>
                <div
                  className={`absolute right-3 top-2.5 rounded-full px-2.5 py-1 text-xs font-extrabold text-slate-900 ${
                    isCircuitReady ? "bg-green-500/25" : "bg-slate-400/30"
                  }`}
                >
                  {content.connectedLabel(connectedCount, WIRE_CONFIG.length)}
                </div>

                <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${area.width} ${area.height}`} aria-hidden="true">
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
                      className="absolute z-10 w-[128px] -translate-x-1/2 -translate-y-1/2 rounded-[14px] border border-slate-400/50 bg-white px-2 py-1.5 shadow-[0_10px_18px_rgba(15,23,42,0.12)]"
                      style={{ left: `${layout.battery.x}px`, top: `${layout.battery.y}px` }}
                    >
                      <BatteryIcon cells={selected} />
                    </div>
                    <div
                      className="absolute z-10 w-[76px] -translate-x-1/2 -translate-y-1/2 rounded-[14px] border border-slate-400/50 bg-white px-2 py-1.5"
                      style={{
                        left: `${layout.bulb.x}px`,
                        top: `${layout.bulb.y}px`,
                        ...getBulbPieceStyle(bulbLevel),
                      }}
                    >
                      <BulbIcon level={bulbLevel} />
                    </div>
                    <div
                      className="absolute z-10 w-[76px] -translate-x-1/2 -translate-y-1/2 rounded-[14px] border border-slate-400/50 bg-white px-2 py-1.5 shadow-[0_10px_18px_rgba(15,23,42,0.12)]"
                      style={{ left: `${layout.switcher.x}px`, top: `${layout.switcher.y}px` }}
                    >
                      <SwitchIcon />
                    </div>
                    {Object.entries(anchors).map(([key, point]) => (
                      <div
                        key={key}
                        className="absolute z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate-900/60 bg-white"
                        style={{ left: `${point.x}px`, top: `${point.y}px` }}
                      />
                    ))}
                  </>
                )}

                {Object.entries(endpoints).map(([id, endpoint]) => {
                  const pos = endpoint.anchor && anchors[endpoint.anchor] ? anchors[endpoint.anchor] : endpoint.pos;
                  const colorClass = id.startsWith("a")
                    ? "bg-red-500"
                    : id.startsWith("b")
                    ? "bg-blue-600"
                    : "bg-emerald-500";
                  return (
                    <div
                      key={id}
                      className={`absolute z-30 h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-white shadow-[0_8px_14px_rgba(15,23,42,0.2)] active:cursor-grabbing ${colorClass}`}
                      style={{
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                        boxShadow: endpoint.anchor
                          ? "0 0 0 3px rgba(255,255,255,0.9), 0 0 12px rgba(37,99,235,0.5)"
                          : "0 8px 14px rgba(15,23,42,0.2)",
                      }}
                      onPointerDown={(event) => handleEndpointDown(id, event)}
                      onPointerMove={(event) => handleEndpointMove(id, event)}
                      onPointerUp={(event) => handleEndpointUp(id, event)}
                    />
                  );
                })}
              </div>

              <div>
                <div className="text-lg font-black text-slate-900">{content.selectedLabel(selected)}</div>
                <div className="mt-1.5 font-bold text-slate-800">
                  {content.expectedPrefix} {current?.note}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-1 flex flex-nowrap justify-end gap-2">
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-[28px] font-black leading-none text-slate-900 shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
            onClick={() => navigate("/p6/electric-circuit/steps")}
            type="button"
            aria-label={content.back}
            title={content.back}
          >
            {content.back}
          </button>
          <button
            className={`inline-flex h-16 w-16 items-center justify-center rounded-[20px] text-[28px] font-black leading-none shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition ${
              isCircuitReady
                ? "bg-blue-600 text-white hover:-translate-y-0.5"
                : "cursor-not-allowed bg-slate-300 text-slate-500"
            }`}
            onClick={() => navigate(`/p6/electric-circuit/result?cells=${selected}`)}
            type="button"
            disabled={!isCircuitReady}
            aria-label={content.next}
            title={content.next}
          >
            {content.next}
          </button>
        </div>
      </div>

      <div className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-[18px] border border-[#6ca9d7]/40 bg-white/92 p-2 shadow-[0_10px_20px_rgba(15,23,42,0.18)] backdrop-blur-[2px]">
        {LANGS.map((item) => (
          <button
            key={item.id}
            className={`rounded-full px-4 py-2 text-[18px] font-bold ${
              lang === item.id
                ? "bg-gradient-to-b from-[#2cb0ff] to-[#178dd4] text-white shadow-[0_4px_10px_rgba(14,116,194,0.35)]"
                : "bg-[#d7edff] text-sky-700"
            }`}
            type="button"
            onClick={() => setLang(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
