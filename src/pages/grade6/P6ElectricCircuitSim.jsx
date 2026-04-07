import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const TEXT = {
  th: {
    badge: "วงจรไฟฟ้าใกล้ตัว",
    title: "ทดลองใส่ถ่านในกระบะ",
    chooseTitle: "เลือก 4 ก้อน",
    chooseHint:
      "เริ่มจากถ่าน 4 ก้อน ลากใส่กระบะ 1-4 ก้อน แล้วเปิดสวิตช์ดูความสว่าง",
    sectionTitle: "ตัวอย่างการต่อวงจร",
    dragTip: "ลากสายไปที่จุดวงกลม",
    wireGuideTitle: "ต่อสายตามลำดับนี้",
    wireGuides: [
      { color: "แดง", text: "ต่อจากขั้วบวกของถ่านไปที่ด้านซ้ายของสวิตช์" },
      { color: "น้ำเงิน", text: "ต่อจากด้านขวาของสวิตช์ไปที่ขั้วล่างของหลอดไฟ" },
      { color: "เขียว", text: "ต่อจากขั้วบนของหลอดไฟกลับไปที่ขั้วลบของถ่าน" },
    ],
    connectedLabel: (connected, total) => `ต่อแล้ว ${connected}/${total}`,
    selectedLabel: (n) => `เลือก ${n} ก้อน`,
    expectedPrefix: "ผลที่ควรจะเห็น:",
    optionLabels: ["1 ก้อน", "2 ก้อน", "3 ก้อน", "4 ก้อน"],
    optionNotes: [
      "หลอดไฟสว่างน้อย",
      "หลอดไฟสว่างขึ้น",
      "หลอดไฟสว่างขึ้นอีก",
      "หลอดไฟสว่างมากที่สุด",
    ],
    switchStatus: {
      off: "สวิตช์ปิด",
      low: "สว่างน้อย",
      mid: "สว่างปานกลาง",
      midHigh: "สว่างมากขึ้น",
      high: "สว่างมากที่สุด",
    },
    looseCellsLabel: "ถ่านแยกก่อนใส่กระบะ:",
    holderSlotTitle: { filled: "แตะเพื่อนำถ่านออก", empty: "ลากถ่านใส่กระบะ" },
    looseCellTitle: "ลากไปใส่กระบะ",
    noCellsInserted: "ยังไม่ได้ใส่ถ่าน",
    bulbOff: "หลอดไฟไม่สว่าง",
    back: "ย้อนกลับ",
    next: "ผลการทดลอง",
    langLabel: { th: "ไทย", en: "English", ms: "Melayu" },
  },
  en: {
    badge: "Everyday Circuits",
    title: "Simple Electric Circuit",
    chooseTitle: "Insert cells into holder",
    chooseHint: "Start with 4 loose cells, insert 1-4 cells, then turn on the switch to observe brightness",
    sectionTitle: "Circuit Connection Example",
    dragTip: "Drag wires to the round anchors",
    wireGuideTitle: "Connect wires in this order",
    wireGuides: [
      { color: "Red", text: "Connect the battery positive terminal to the left side of the switch" },
      { color: "Blue", text: "Connect the right side of the switch to the lower bulb terminal" },
      { color: "Green", text: "Connect the upper bulb terminal back to the battery negative terminal" },
    ],
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
    switchStatus: {
      off: "Switch off",
      low: "Dim",
      mid: "Moderate brightness",
      midHigh: "Brighter",
      high: "Brightest",
    },
    looseCellsLabel: "Loose cells before inserting into holder:",
    holderSlotTitle: { filled: "Tap to remove this cell", empty: "Drag a cell into the holder" },
    looseCellTitle: "Drag to holder",
    noCellsInserted: "No cells inserted yet",
    bulbOff: "Bulb off",
    back: "Back",
    next: "Experiment Results",
    langLabel: { th: "Thai", en: "English", ms: "Malay" },
  },

  ms: {
    badge: "Litar Harian",
    title: "Litar Elektrik Mudah",
    chooseTitle: "Masukkan sel ke dalam bekas bateri",
    chooseHint: "Mula dengan 4 sel terasing, masukkan 1-4 sel, kemudian hidupkan suis untuk lihat kecerahan",
    sectionTitle: "Contoh sambungan litar",
    dragTip: "Seret wayar ke bulatan sambungan",
    wireGuideTitle: "Sambung wayar ikut turutan ini",
    wireGuides: [
      { color: "Merah", text: "Sambung dari terminal positif bateri ke bahagian kiri suis" },
      { color: "Biru", text: "Sambung dari bahagian kanan suis ke terminal bawah mentol" },
      { color: "Hijau", text: "Sambung dari terminal atas mentol kembali ke terminal negatif bateri" },
    ],
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
    switchStatus: {
      off: "Suis dimatikan",
      low: "Malap",
      mid: "Kecerahan sederhana",
      midHigh: "Lebih terang",
      high: "Paling terang",
    },
    looseCellsLabel: "Sel longgar sebelum dimasukkan ke dalam bekas:",
    holderSlotTitle: { filled: "Tekan untuk keluarkan sel", empty: "Seret sel ke dalam bekas" },
    looseCellTitle: "Seret ke bekas",
    noCellsInserted: "Belum masukkan sel",
    bulbOff: "Mentol tidak menyala",
    back: "Kembali",
    next: "Hasil Eksperimen",
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

const createBatteryPlacement = (count) =>
  Array.from({ length: 4 }, (_, batteryId) => (batteryId < count ? batteryId : null));

const DEVICE_MEDIA = {
  cell: {
    image: "/images/p6/tanfaichai.jpg",
    fallbackImage: "/images/p6/electric-circuit/batteries.svg",
  },
  holder: {
    image: "/images/p6/electric-circuit/battery-holder-photo.webp",
    fallbackImage: "/images/p6/electric-circuit/battery-holder.svg",
  },
  bulb: {
    image: "/images/p6/electric-circuit/bulb-base-photo.webp",
    fallbackImage: "/images/p6/electric-circuit/bulb-base.svg",
  },
  switch: {
    image: "/images/p6/electric-circuit/switch-photo.webp",
    fallbackImage: "/images/p6/electric-circuit/switch.svg",
  },
};

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

function EquipmentImage({ src, fallbackSrc, alt, className = "", style }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={(event) => {
        if (event.currentTarget.dataset.fallbackApplied === "true") return;
        event.currentTarget.dataset.fallbackApplied = "true";
        event.currentTarget.src = fallbackSrc;
      }}
    />
  );
}

function BatteryToken({ dimmed = false, compact = false, fill = false }) {
  const sizeClass = fill ? "h-full w-full" : compact ? "h-11 w-5" : "h-12 w-6";

  return (
    <div
      className={`relative overflow-hidden rounded-[6px] border ${sizeClass} ${
        dimmed ? "border-slate-300 bg-slate-100" : "border-slate-500 bg-white"
      }`}
      aria-hidden="true"
    >
      <EquipmentImage
        src={DEVICE_MEDIA.cell.image}
        fallbackSrc={DEVICE_MEDIA.cell.fallbackImage}
        alt="battery"
        className="h-full w-full max-w-none object-cover object-center mix-blend-multiply"
        style={{
          objectPosition: "50% 48%",
          filter: dimmed ? "grayscale(0.45) saturate(0.7) brightness(1.06)" : "none",
        }}
      />
    </div>
  );
}

function BatteryHolderLive({ slotToBattery, onSlotDrop, onRemoveBattery, onHolderDrop, filledTitle, emptyTitle }) {
  return (
    <div
      className="relative h-full w-full"
      onDragOver={(event) => event.preventDefault()}
      onDrop={onHolderDrop}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-x-3 bottom-2 top-2 rounded-[13px] border-[2.5px] border-[#2f4561] bg-gradient-to-b from-[#5d7697] to-[#2f4561]" />
        <div className="absolute inset-x-6 top-3 h-2.5 rounded-full bg-[#23354b]/75" />
      </div>
      <div className="absolute left-1/2 top-[16px] flex -translate-x-1/2 gap-[4px]">
        {Array.from({ length: 4 }).map((_, index) => {
          const batteryId = slotToBattery[index];
          return (
            <button
              key={`holder-slot-${index}`}
              type="button"
              className={`grid h-[70px] w-[38px] place-items-center rounded-[8px] border ${
                batteryId !== null
                  ? "border-transparent bg-transparent"
                  : "border-slate-300/70 bg-slate-100/90"
              }`}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => onSlotDrop(index, event)}
              onClick={() => {
                if (batteryId !== null) onRemoveBattery(batteryId);
              }}
              title={batteryId !== null ? filledTitle : emptyTitle}
            >
              <div className="h-[60px] w-[24px]">
                {batteryId !== null ? <BatteryToken fill /> : null}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SlideSwitch({ isOn, onChange }) {
  return (
    <div
      role="switch"
      aria-checked={isOn}
      tabIndex={0}
      className="relative h-[84px] w-[48px] cursor-pointer rounded-[16px] border-[3px] border-slate-600 bg-gradient-to-b from-slate-100 to-slate-200 p-[6px] shadow-[0_10px_18px_rgba(15,23,42,0.18)]"
      onClick={() => onChange(!isOn)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onChange(!isOn);
        }
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[11px] bg-gradient-to-b from-slate-300 to-slate-400">
        <div className="absolute left-1/2 top-[3px] -translate-x-1/2 text-[9px] font-black text-slate-700">ON</div>
        <div className="absolute bottom-[3px] left-1/2 -translate-x-1/2 text-[9px] font-black text-slate-700">OFF</div>
        <div
          className="absolute left-1/2 h-[28px] w-[22px] -translate-x-1/2 rounded-[8px] border border-slate-500 bg-gradient-to-b from-slate-700 to-slate-800 shadow-[inset_0_2px_3px_rgba(255,255,255,0.2)] transition-all duration-150"
          style={{ top: isOn ? "10px" : "34px" }}
        />
      </div>
    </div>
  );
}

export default function P6ElectricCircuitSim() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const content = TEXT[lang] || TEXT.th;
  const langLabels = content.langLabel;
  const options = useMemo(() => getOptions(content), [content]);

  const [selected, setSelected] = useState(1);
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [batteryPlacement, setBatteryPlacement] = useState(() => createBatteryPlacement(0));
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
  const slotToBattery = useMemo(() => {
    const map = Array(4).fill(null);
    batteryPlacement.forEach((slotIndex, batteryId) => {
      if (slotIndex !== null) map[slotIndex] = batteryId;
    });
    return map;
  }, [batteryPlacement]);
  const insertedCount = useMemo(
    () => batteryPlacement.filter((slotIndex) => slotIndex !== null).length,
    [batteryPlacement],
  );
  const current = useMemo(() => options.find((item) => item.cells === Math.max(1, insertedCount)), [insertedCount, options]);
  const levelClass =
    insertedCount <= 0 ? "off" : insertedCount === 1 ? "low" : insertedCount === 2 ? "mid" : insertedCount === 3 ? "mid-high" : "high";

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
      endpointsByCellsRef.current[1] = cloneEndpoints(initialEndpoints);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [anchors, layout]);

  // Wires are considered pre-connected for this mode.
  const connectedCount = WIRE_CONFIG.length;
  const isCircuitReady = true;
  const bulbLevel = isSwitchOn ? levelClass : "off";
  const bulbLightProfile =
    bulbLevel === "high"
      ? { glowOpacity: 1, glowSize: 176, blur: 5, bulbFilter: "brightness(1.34) saturate(1.26)", bulbScale: 1.08 }
      : bulbLevel === "mid-high"
        ? { glowOpacity: 0.84, glowSize: 154, blur: 4, bulbFilter: "brightness(1.24) saturate(1.18)", bulbScale: 1.05 }
        : bulbLevel === "mid"
          ? { glowOpacity: 0.66, glowSize: 136, blur: 3, bulbFilter: "brightness(1.16) saturate(1.12)", bulbScale: 1.03 }
          : bulbLevel === "low"
            ? { glowOpacity: 0.46, glowSize: 118, blur: 2, bulbFilter: "brightness(1.08) saturate(1.05)", bulbScale: 1.01 }
            : { glowOpacity: 0, glowSize: 112, blur: 1, bulbFilter: "brightness(0.98) saturate(0.95)", bulbScale: 1 };

  const handleBatteryDragStart = (batteryId, event) => {
    event.dataTransfer.setData("text/plain", String(batteryId));
    event.dataTransfer.effectAllowed = "move";
  };

  const placeBatteryToSlot = (batteryId, slotIndex) => {
    setBatteryPlacement((prev) => {
      const next = [...prev];
      const occupiedBattery = next.findIndex((currentSlot, idx) => currentSlot === slotIndex && idx !== batteryId);
      if (occupiedBattery !== -1) next[occupiedBattery] = null;
      next[batteryId] = slotIndex;
      return next;
    });
  };

  const removeBattery = (batteryId) => {
    setBatteryPlacement((prev) => {
      const next = [...prev];
      next[batteryId] = null;
      return next;
    });
  };

  const handleSlotDrop = (slotIndex, event) => {
    event.preventDefault();
    const batteryId = Number(event.dataTransfer.getData("text/plain"));
    if (Number.isNaN(batteryId)) return;
    placeBatteryToSlot(batteryId, slotIndex);
  };

  const handleHolderDrop = (event) => {
    event.preventDefault();
    const batteryId = Number(event.dataTransfer.getData("text/plain"));
    if (Number.isNaN(batteryId)) return;
    const emptySlot = slotToBattery.findIndex((battery) => battery === null);
    if (emptySlot === -1) return;
    placeBatteryToSlot(batteryId, emptySlot);
  };

  const handleLooseDrop = (event) => {
    event.preventDefault();
    const batteryId = Number(event.dataTransfer.getData("text/plain"));
    if (Number.isNaN(batteryId)) return;
    removeBattery(batteryId);
  };

  const placeLooseBatteryToNextSlot = (batteryId) => {
    const freeSlot = slotToBattery.findIndex((battery) => battery === null);
    if (freeSlot === -1) return;
    placeBatteryToSlot(batteryId, freeSlot);
  };

  useEffect(() => {
    const nextSelected = Math.max(1, insertedCount);
    setSelected((currentSelected) => (currentSelected === nextSelected ? currentSelected : nextSelected));
  }, [insertedCount]);

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
      "linear-gradient(180deg, #cde9f7 0%, #e9f5ff 32%, #d7ecf7 60%, #c2dbe9 100%), radial-gradient(120% 70% at 50% 20%, rgba(255,255,255,0.65), transparent 45%), radial-gradient(90% 60% at 20% 10%, rgba(255,255,255,0.35), transparent 40%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-16 pt-3 text-slate-900 md:px-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-4 right-4 top-[18%] h-[42%] rounded-[48%] bg-white/38 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-[160px] bg-gradient-to-t from-[#9fc5d8] via-[#b1d4e6] to-transparent" />
        <div className="absolute inset-x-0 bottom-[110px] h-4 rounded-full bg-[repeating-linear-gradient(90deg,#7aa3c7_0_40px,#6d94b8_40px_44px)] opacity-50" />
      </div>

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

          <div className="mt-4 rounded-[18px] border border-slate-900/25 bg-white/75 p-3.5 shadow-[0_14px_24px_rgba(15,23,42,0.1)]">
            <div className="mt-3">
              <div className="rounded-2xl bg-white/90 p-4 shadow-[0_12px_22px_rgba(15,23,42,0.14)]">
                <div className="flex items-center justify-between">
                  <div className="text-[clamp(18px,1.6vw,26px)] font-black text-slate-900">
                    {content.selectedLabel(insertedCount || selected)}
                  </div>
                  <div
                    className={`rounded-full px-3 py-1 text-xs font-black ${
                      !isSwitchOn
                        ? "bg-slate-100 text-slate-700"
                        : bulbLevel === "high"
                          ? "bg-green-100 text-green-700"
                          : bulbLevel === "mid-high"
                            ? "bg-amber-100 text-amber-700"
                            : bulbLevel === "mid"
                              ? "bg-sky-100 text-sky-700"
                              : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {!isSwitchOn
                      ? content.switchStatus.off
                      : bulbLevel === "high"
                        ? content.switchStatus.high
                        : bulbLevel === "mid-high"
                          ? content.switchStatus.midHigh
                          : bulbLevel === "mid"
                            ? content.switchStatus.mid
                            : content.switchStatus.low}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 rounded-[18px] border border-slate-200 bg-[radial-gradient(circle_at_30%_30%,#e0f2fe,#ffffff)] p-4">
                  <div className="text-sm font-black text-slate-800">{content.looseCellsLabel}</div>
                  <div
                    className="flex min-h-12 w-fit min-w-[232px] flex-wrap items-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white/60 p-2"
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={handleLooseDrop}
                  >
                    {Array.from({ length: 4 }).map((_, batteryId) => {
                      if (batteryPlacement[batteryId] !== null) return null;
                      return (
                        <button
                          key={`loose-${batteryId}`}
                          type="button"
                          draggable
                          onDragStart={(event) => handleBatteryDragStart(batteryId, event)}
                          onClick={() => placeLooseBatteryToNextSlot(batteryId)}
                          className="grid h-14 w-12 place-items-center rounded-md border border-slate-300 bg-white hover:bg-slate-50"
                          title={content.looseCellTitle}
                        >
                          <BatteryToken compact />
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                    <div className="relative mx-auto h-[170px] w-full max-w-[620px]">
                      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 620 170" aria-hidden="true">
                        <path d="M242 106 C 258 106, 272 98, 290 92" stroke="#ef4444" strokeWidth="4" fill="none" strokeLinecap="round" />
                        <path d="M355 92 C 405 92, 435 92, 472 95" stroke="#2563eb" strokeWidth="4" fill="none" strokeLinecap="round" />
                      </svg>

                      <div className="absolute left-[18px] top-[56px] h-[112px] w-[232px] rounded-xl border border-slate-200 bg-white px-2 py-2 shadow-[0_8px_14px_rgba(15,23,42,0.1)]">
                        <BatteryHolderLive
                          slotToBattery={slotToBattery}
                          onSlotDrop={handleSlotDrop}
                          onRemoveBattery={removeBattery}
                          onHolderDrop={handleHolderDrop}
                          filledTitle={content.holderSlotTitle.filled}
                          emptyTitle={content.holderSlotTitle.empty}
                        />
                      </div>

                      <div className="absolute left-[294px] top-[54px]">
                        <SlideSwitch isOn={isSwitchOn} onChange={setIsSwitchOn} />
                      </div>

                      <div className="absolute left-[438px] top-[36px] h-[112px] w-[112px]">
                        <div
                          className="pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                          style={{
                            width: `${bulbLightProfile.glowSize}px`,
                            height: `${bulbLightProfile.glowSize}px`,
                            background: `radial-gradient(circle, rgba(255,214,102,${bulbLightProfile.glowOpacity}) 0%, rgba(255,214,102,0) 70%)`,
                            filter: `blur(${bulbLightProfile.blur}px)`,
                          }}
                        />
                        <div className="relative z-10 h-full w-full">
                          <EquipmentImage
                            src={DEVICE_MEDIA.bulb.image}
                            fallbackSrc={DEVICE_MEDIA.bulb.fallbackImage}
                            alt="bulb"
                            className="h-full w-full object-contain"
                            style={{
                              filter: bulbLightProfile.bulbFilter,
                              transform: `scale(${bulbLightProfile.bulbScale})`,
                              transformOrigin: "50% 50%",
                              transition: "filter 160ms ease, transform 160ms ease",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm font-semibold text-slate-700">
                      <div>{content.expectedPrefix}</div>
                      <div className="text-lg font-black text-slate-900">
                        {isSwitchOn
                          ? insertedCount > 0
                            ? options[insertedCount - 1]?.note
                            : content.noCellsInserted
                          : content.bulbOff}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-auto fixed bottom-3 left-3 z-40 flex gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_10px_22px_rgba(0,0,0,0.12)]">

        <button
          onClick={() => setLang("th")}
          className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
            lang === "th" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
          }`}
        >
          {langLabels.th}
        </button>

        <button
          onClick={() => setLang("en")}
          className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
            lang === "en" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
          }`}
        >
          {langLabels.en}
        </button>

        <button
          onClick={() => setLang("ms")}
          className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
            lang === "ms" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
          }`}
        >
          {langLabels.ms}
        </button>

      </div>

        <div className="fixed bottom-3 right-3 z-40 flex gap-3">
          <button
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-base font-bold text-slate-900 shadow"
            onClick={() => navigate("/p6/electric-circuit/steps")}
            type="button"
            aria-label={content.back}
            title={content.back}
          >
            <span className="text-xl leading-none">&lt;&lt;</span>
            <span>{content.back}</span>
          </button>
          <button
            className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-base font-bold text-white shadow ${
              isCircuitReady ? "bg-blue-600" : "cursor-not-allowed bg-slate-300 text-slate-500"
            }`}
            onClick={() => navigate("/p6/electric-circuit/result")}
            type="button"
            disabled={!isCircuitReady}
            aria-label={content.next}
            title={content.next}
          >
            <span>{content.next}</span>
            <span className="text-xl leading-none">&gt;&gt;</span>
          </button>
        </div>
      </div>

      
    </div>
  );
}



