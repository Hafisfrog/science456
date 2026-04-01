import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ─── Constants ───────────────────────────────────────────────────────────────
const MATERIALS = [
  { id: 1,  name: "กระจกใส",    img: "/images/materials/p1.png",   type: "transparent", emoji: "🪟" },
  { id: 2,  name: "แก้วใส",     img: "/images/materials/l10.png",  type: "transparent", emoji: "🥛" },
  { id: 3,  name: "พลาสติกใส",  img: "/images/materials/l3.png",   type: "transparent", emoji: "🔷" },
  { id: 4,  name: "หมอก",      img: "/images/materials/l8.png",   type: "translucent", emoji: "🌫️" },
  { id: 5,  name: "กระดาษไข",  img: "/images/materials/l4.png",   type: "translucent", emoji: "📄" },
  { id: 6,  name: "กระจกฝ้า",   img: "/images/materials/l2.png",   type: "translucent", emoji: "🔲" },
  { id: 7,  name: "แผ่นไม้",    img: "/images/materials/l5.png",   type: "opaque",      emoji: "🪵" },
  { id: 8,  name: "ผนังปูน",    img: "/images/materials/l7.webp",  type: "opaque",      emoji: "🧱" },
  { id: 9,  name: "เหล็ก",     img: "/images/materials/l6.png",   type: "opaque",      emoji: "⚙️" },
];

const TYPE_META = { 
  transparent: { 
    label: "โปร่งใส",  
    result: "เห็นชัดเจน",    
    color: "#38bdf8", 
    glow: "rgba(56,189,248,0.5)",  
    badge: "#0ea5e9", 
    dim: "rgba(56,189,248,0.15)",
    beamIntensity: 1,
    beamOpacity: 0.9
  },
  translucent: { 
    label: "โปร่งแสง", 
    result: "เห็นไม่ชัด",    
    color: "#fb923c", 
    glow: "rgba(251,146,60,0.4)",   
    badge: "#f97316", 
    dim: "rgba(251,146,60,0.15)",
    beamIntensity: 0.5,
    beamOpacity: 0.5
  },
  opaque:      { 
    label: "ทึบแสง",   
    result: "มองไม่เห็น",    
    color: "#94a3b8", 
    glow: "rgba(148,163,184,0.25)", 
    badge: "#64748b", 
    dim: "rgba(148,163,184,0.12)",
    beamIntensity: 0,
    beamOpacity: 0
  },
};

const clamp01 = (value) => Math.max(0, Math.min(value, 1));

// ─── Beam Canvas ──────────────────────────────────────────────────────────────
function BeamCanvas({ shine, beamProgress, reflectProgress, materialType, objectSize = 190 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    if (!shine || beamProgress <= 0) return;

    const src   = { x: 280,     y: H / 2 };
    const mid   = { x: W * 0.5, y: H / 2 };
    const tgt   = { x: W - 90,  y: H / 2 };
    const objectHalfW = objectSize / 2;
    const objectHalfH = objectSize / 2;

    // beam segment end (animated)
    const bx = src.x + (mid.x - src.x) * Math.min(beamProgress, 1);
    const by = H / 2;

    const drawRay = (x1, y1, x2, y2, opts = {}) => {
      const { 
        wOuter = 120, 
        wInner = 40, 
        alpha = 1, 
        blur = 25, 
        col1 = "#FFD700", 
        col2 = "#FF4500" 
      } = opts;
      
      // เพิ่มความเข้มของแสงตามประเภทวัสดุ
      const intensity = materialType === "transparent" ? 1 : 
                       materialType === "translucent" ? 0.6 : 0.3;
      
      const g = ctx.createLinearGradient(x1, y1, x2, y2);
      g.addColorStop(0,   `${col1}${Math.round(alpha * 0.8 * intensity * 255).toString(16).padStart(2,"0")}`);
      g.addColorStop(0.4, `${col1}${Math.round(alpha * 0.9 * intensity * 255).toString(16).padStart(2,"0")}`);
      g.addColorStop(1,   `${col2}00`);
      
      // Outer glow
      ctx.save();
      ctx.filter = `blur(${blur}px)`;
      ctx.strokeStyle = g;
      ctx.lineWidth = wOuter;
      ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      
      // Inner core
      ctx.filter = `blur(8px)`;
      ctx.strokeStyle = `rgba(255, 255, 220, ${alpha * 0.95 * intensity})`;
      ctx.lineWidth = wInner;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      ctx.restore();
    };

    // Primary ray - ทำให้ใหญ่และสว่างขึ้น
    drawRay(src.x, src.y, bx, by, { 
      wOuter: 150, 
      wInner: 50, 
      alpha: 1,
      blur: 30
    });

    // Impact glow - ทำให้ใหญ่ขึ้น
    if (beamProgress >= 0.95) {
      const rg = ctx.createRadialGradient(mid.x, mid.y, 0, mid.x, mid.y, 200);
      rg.addColorStop(0,   `rgba(255, 215, 0, ${materialType === "transparent" ? 0.6 : materialType === "translucent" ? 0.4 : 0.2})`);
      rg.addColorStop(0.5, `rgba(255, 140, 0, ${materialType === "transparent" ? 0.3 : materialType === "translucent" ? 0.2 : 0.1})`);
      rg.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.save();
      ctx.filter = "blur(20px)";
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.arc(mid.x, mid.y, 180, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Transmitted / secondary ray - แยกตามประเภทวัสดุให้ชัดเจน
    if (beamProgress >= 0.95 && reflectProgress > 0) {
      const rp = Math.min(reflectProgress, 1);
      const throughLevel = Math.max(0, Math.min((rp - 0.08) / 0.92, 1));
      
      if (materialType === "transparent") {
        // แสงผ่านทะลุชัดเจน: คมและเป็นลำตรง
        const tx = mid.x + (tgt.x - mid.x) * rp;
        drawRay(mid.x - 9, mid.y - 4, tx, mid.y - 2, { 
          wOuter: 118, 
          wInner: 32, 
          alpha: 0.95 * throughLevel,
          blur: 20,
          col1: "#FFF7C8",
          col2: "#FFBC56",
        });
        drawRay(mid.x + 9, mid.y + 4, tx, mid.y + 2, { 
          wOuter: 108, 
          wInner: 28, 
          alpha: 0.8 * throughLevel,
          blur: 18,
          col1: "#FFEAA6",
          col2: "#FFA94D",
        });
        drawRay(mid.x, mid.y, tx, mid.y, { 
          wOuter: 88, 
          wInner: 22, 
          alpha: 0.9 * throughLevel,
          blur: 14,
          col1: "#FFF9DB",
          col2: "#FFD474",
        });

        const passGlow = ctx.createRadialGradient(mid.x, mid.y, 0, mid.x, mid.y, 120);
        passGlow.addColorStop(0, `rgba(255,255,230,${0.58 * throughLevel})`);
        passGlow.addColorStop(0.45, `rgba(190,235,255,${0.2 * throughLevel})`);
        passGlow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.save();
        ctx.fillStyle = passGlow;
        ctx.filter = "blur(8px)";
        ctx.fillRect(mid.x - objectHalfW, mid.y - objectHalfH, objectHalfW * 2, objectHalfH * 2);
        ctx.restore();
        
        // เพิ่มแสงสะท้อนที่เป้าหมาย
        if (rp > 0.75) {
          const targetGlow = ctx.createRadialGradient(tgt.x, tgt.y, 0, tgt.x, tgt.y, 150);
          targetGlow.addColorStop(0, "rgba(255, 235, 160, 0.8)");
          targetGlow.addColorStop(0.55, "rgba(255, 188, 80, 0.24)");
          targetGlow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.save();
          ctx.filter = "blur(18px)";
          ctx.fillStyle = targetGlow;
          ctx.beginPath();
          ctx.arc(tgt.x, tgt.y, 120, 0, Math.PI * 2);
          ctx.fill();

          const core = ctx.createRadialGradient(tgt.x, tgt.y, 0, tgt.x, tgt.y, 48);
          core.addColorStop(0, "rgba(255,255,235,0.9)");
          core.addColorStop(1, "rgba(255,255,235,0)");
          ctx.filter = "blur(6px)";
          ctx.fillStyle = core;
          ctx.beginPath();
          ctx.arc(tgt.x, tgt.y, 44, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      } 
      else if (materialType === "translucent") {
        // แสงกระจาย ไม่ชัดเจน: ออกเป็นฝอยและเบลอ
        for (let i = -4; i <= 4; i++) {
          const tx = mid.x + (tgt.x - mid.x) * rp * 0.6;
          const scatter = i * 12;
          const edgeFactor = Math.abs(i) / 4;
          drawRay(
            mid.x + scatter * 0.45, 
            mid.y + scatter * 0.65, 
            tx + scatter * 1.3, 
            mid.y - 16 + scatter * 0.9, 
            { 
              wOuter: 58 - edgeFactor * 14, 
              wInner: 14, 
              alpha: (0.22 - edgeFactor * 0.05) * throughLevel, 
              blur: 34,
              col1: "#FFC067",
              col2: "#FF7F32",
            }
          );
        }

        const haze = ctx.createRadialGradient(mid.x, mid.y, 0, mid.x, mid.y, 135);
        haze.addColorStop(0, `rgba(255, 190, 95, ${0.3 * throughLevel})`);
        haze.addColorStop(0.65, `rgba(255, 140, 0, ${0.14 * throughLevel})`);
        haze.addColorStop(1, "rgba(0,0,0,0)");
        ctx.save();
        ctx.fillStyle = haze;
        ctx.filter = "blur(14px)";
        ctx.beginPath();
        ctx.arc(mid.x, mid.y, 130, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        // แสงสะท้อนที่เป้าหมายเบลอๆ
        if (rp > 0.8) {
          const targetGlow = ctx.createRadialGradient(tgt.x, tgt.y - 10, 0, tgt.x, tgt.y - 10, 120);
          targetGlow.addColorStop(0, "rgba(255, 175, 90, 0.34)");
          targetGlow.addColorStop(0.7, "rgba(255, 110, 35, 0.12)");
          targetGlow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.save();
          ctx.filter = "blur(28px)";
          ctx.fillStyle = targetGlow;
          ctx.beginPath();
          ctx.arc(tgt.x, tgt.y - 10, 100, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      else {
        // opaque - ไม่มีแสงผ่าน: จุดกระทบสว่าง แต่ด้านหลังเกิดเงาเข้ม
        const blockGlow = ctx.createRadialGradient(mid.x - 8, mid.y, 0, mid.x - 8, mid.y, 125);
        blockGlow.addColorStop(0, "rgba(255, 190, 95, 0.4)");
        blockGlow.addColorStop(0.6, "rgba(255, 140, 0, 0.18)");
        blockGlow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.save();
        ctx.filter = "blur(12px)";
        ctx.fillStyle = blockGlow;
        ctx.beginPath();
        ctx.arc(mid.x - 6, mid.y, 110, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        const shadowLen = 280 * throughLevel;
        ctx.save();
        ctx.fillStyle = "rgba(2,6,23,0.55)";
        ctx.filter = "blur(10px)";
        ctx.beginPath();
        ctx.moveTo(mid.x + 14, mid.y - 18);
        ctx.lineTo(mid.x + 14 + shadowLen, mid.y - 75);
        ctx.lineTo(mid.x + 14 + shadowLen, mid.y + 75);
        ctx.lineTo(mid.x + 14, mid.y + 18);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.filter = "blur(15px)";
        ctx.beginPath();
        ctx.arc(tgt.x, tgt.y, 80, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }, [shine, beamProgress, reflectProgress, materialType, objectSize]);

  return (
    <canvas
      ref={canvasRef}
      width={1100}
      height={520}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function P4LightExperiment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  // States
  const [selectedMaterial, setSelectedMaterial] = useState(() => state?.material || MATERIALS[0]);
  const [shine, setShine] = useState(false);
  const [beamProgress, setBeamProgress] = useState(0);
  const [reflectProgress, setReflectProgress] = useState(0);
  const [torchRotation, setTorchRotation] = useState(0);
  const materialSizePercent = 100;
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [isMobile, setIsMobile] = useState(false);
  
  // นับเฉพาะรอบการทดลองปัจจุบัน และรีเซ็ตใหม่เมื่อเข้าเว็บ/เข้าหน้านี้อีกครั้ง
  const [experimentResults, setExperimentResults] = useState([]);

  // Refs
  const beamRef = useRef(null);
  const reflectRef = useRef(null);
  const rotationRef = useRef(null);

  const meta = TYPE_META[selectedMaterial.type];
  const experimentCount = experimentResults.length;
  const isTight = viewportWidth > 0 && viewportWidth <= 420;
  const baseMaterialSize = isTight ? 130 : isMobile ? 150 : 190;
  const baseEmojiSize = isTight ? 78 : isMobile ? 90 : 112;
  const materialSize = Math.round((baseMaterialSize * materialSizePercent) / 100);
  const fallbackEmojiSize = Math.round((baseEmojiSize * materialSizePercent) / 100);
  const isFogMaterial = selectedMaterial.id === 4;
  const beamHitProgress = shine ? clamp01((beamProgress - 0.72) / 0.28) : 0;
  const passThroughProgress = shine ? clamp01(reflectProgress) : 0;
  const surfaceLightLevel =
    selectedMaterial.type === "opaque"
      ? clamp01(beamHitProgress * 0.98)
      : clamp01(beamHitProgress * 0.65 + passThroughProgress * 0.4);
  const internalLightLevel =
    selectedMaterial.type === "transparent"
      ? clamp01(beamHitProgress * 0.45 + passThroughProgress * 1.05)
      : selectedMaterial.type === "translucent"
        ? clamp01(beamHitProgress * 0.8 + passThroughProgress * (isFogMaterial ? 0.95 : 0.75))
        : clamp01(beamHitProgress * 0.3 + passThroughProgress * 0.12);
  const highlightTravel = clamp01(beamHitProgress * 0.45 + passThroughProgress * 0.85);
  const materialMaskStyle = {
    WebkitMaskImage: `url(${selectedMaterial.img})`,
    maskImage: `url(${selectedMaterial.img})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  };
  const materialImageFilter = [
    `drop-shadow(0 0 22px ${meta.glow})`,
    `brightness(${(
      1 +
      internalLightLevel *
        (selectedMaterial.type === "transparent"
          ? 0.22
          : selectedMaterial.type === "translucent"
            ? isFogMaterial
              ? 0.42
              : 0.3
            : 0.1)
    ).toFixed(2)})`,
    `contrast(${(1 + surfaceLightLevel * (selectedMaterial.type === "opaque" ? 0.18 : 0.08)).toFixed(2)})`,
    `saturate(${(selectedMaterial.type === "opaque" ? 1 : 1 + internalLightLevel * 0.16).toFixed(2)})`,
  ].join(" ");
  const materialHotspotStyle = {
    ...S.matLightOverlay,
    ...materialMaskStyle,
    opacity:
      selectedMaterial.type === "opaque"
        ? Math.min(0.65, 0.12 + surfaceLightLevel * 0.58)
        : Math.min(0.9, 0.15 + internalLightLevel * (isFogMaterial ? 0.9 : 0.75)),
    background:
      selectedMaterial.type === "transparent"
        ? "radial-gradient(circle at 34% 50%, rgba(255,250,228,0.98) 0%, rgba(255,231,170,0.8) 18%, rgba(255,195,108,0.32) 42%, rgba(255,185,90,0) 70%)"
        : selectedMaterial.type === "translucent"
          ? "radial-gradient(circle at 34% 50%, rgba(255,248,225,0.95) 0%, rgba(255,234,184,0.72) 22%, rgba(255,196,118,0.3) 48%, rgba(255,190,100,0) 74%)"
          : "radial-gradient(circle at 28% 50%, rgba(255,244,208,0.78) 0%, rgba(255,205,122,0.34) 20%, rgba(255,180,95,0.08) 46%, rgba(255,180,95,0) 68%)",
    filter: `blur(${selectedMaterial.type === "translucent" ? (isFogMaterial ? 16 : 10) : 6}px)`,
  };
  const materialBeamInsideStyle = {
    ...S.matBeamInside,
    ...materialMaskStyle,
    opacity:
      selectedMaterial.type === "opaque"
        ? Math.min(0.32, surfaceLightLevel * 0.34)
        : Math.min(
            selectedMaterial.type === "transparent" ? 0.9 : isFogMaterial ? 0.78 : 0.62,
            0.12 + highlightTravel * (selectedMaterial.type === "transparent" ? 0.92 : 0.7)
          ),
    background:
      selectedMaterial.type === "transparent"
        ? "linear-gradient(92deg, rgba(255,244,205,0) 24%, rgba(255,253,240,0.98) 42%, rgba(255,225,150,0.82) 50%, rgba(255,184,88,0.24) 62%, rgba(255,184,88,0) 74%)"
        : selectedMaterial.type === "translucent"
          ? "linear-gradient(92deg, rgba(255,230,160,0) 16%, rgba(255,249,233,0.82) 42%, rgba(255,214,132,0.6) 56%, rgba(255,183,95,0.14) 72%, rgba(255,183,95,0) 84%)"
          : "linear-gradient(92deg, rgba(255,228,160,0) 12%, rgba(255,246,220,0.56) 28%, rgba(255,211,132,0.24) 42%, rgba(255,180,96,0.04) 56%, rgba(255,180,96,0) 68%)",
    filter: `blur(${selectedMaterial.type === "transparent" ? 1 : selectedMaterial.type === "translucent" ? 10 : 5}px)`,
    transform: `translateX(${(-10 + highlightTravel * 18).toFixed(1)}%)`,
  };
  const materialScatterStyle = {
    ...S.matTextureOverlay,
    ...materialMaskStyle,
    opacity:
      selectedMaterial.type === "transparent"
        ? Math.min(0.22, internalLightLevel * 0.22)
        : selectedMaterial.type === "translucent"
          ? Math.min(isFogMaterial ? 0.86 : 0.52, 0.14 + internalLightLevel * (isFogMaterial ? 0.82 : 0.42))
          : Math.min(0.34, surfaceLightLevel * 0.36),
    background:
      selectedMaterial.type === "transparent"
        ? "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.36) 48%, rgba(255,226,145,0.24) 62%, rgba(255,255,255,0) 100%)"
        : selectedMaterial.type === "translucent"
          ? isFogMaterial
            ? "radial-gradient(circle at 38% 48%, rgba(255,255,255,0.66) 0%, rgba(255,243,210,0.46) 26%, rgba(255,219,150,0.18) 52%, rgba(255,219,150,0) 74%), linear-gradient(90deg, rgba(255,214,125,0.02) 0%, rgba(255,248,234,0.34) 36%, rgba(255,223,158,0.22) 62%, rgba(255,190,100,0.04) 100%)"
            : "radial-gradient(circle at 40% 50%, rgba(255,255,255,0.42) 0%, rgba(255,242,205,0.26) 30%, rgba(255,214,140,0.08) 56%, rgba(255,214,140,0) 72%), linear-gradient(90deg, rgba(255,236,195,0.04) 0%, rgba(255,244,220,0.22) 42%, rgba(255,213,145,0.12) 68%, rgba(255,213,145,0) 100%)"
          : "linear-gradient(90deg, rgba(255,238,196,0.24) 0%, rgba(255,227,178,0.12) 22%, rgba(31,41,55,0) 40%, rgba(15,23,42,0.18) 76%, rgba(15,23,42,0.32) 100%)",
    filter: `blur(${selectedMaterial.type === "translucent" ? (isFogMaterial ? 18 : 12) : selectedMaterial.type === "opaque" ? 2 : 0}px)`,
    mixBlendMode: selectedMaterial.type === "opaque" ? "multiply" : "screen",
  };

  // Cleanup
  useEffect(() => {
    return () => {
      clearInterval(beamRef.current);
      clearInterval(reflectRef.current);
      clearInterval(rotationRef.current);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => {
      const w = window.innerWidth;
      setViewportWidth(w);
      setIsMobile(w <= 768);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const reset = () => {
    clearInterval(beamRef.current);
    clearInterval(reflectRef.current);
    clearInterval(rotationRef.current);
    setShine(false);
    setBeamProgress(0);
    setReflectProgress(0);
    setTorchRotation(0);
  };

  const doShine = () => {
    if (shine) return;
    setShine(true);
    
    let rot = 0;
    rotationRef.current = setInterval(() => {
      rot += 4;
      if (rot >= 135) {
        setTorchRotation(135);
        clearInterval(rotationRef.current);
      } else {
        setTorchRotation(rot);
      }
    }, 14);

    setTimeout(() => {
      let p = 0;
      beamRef.current = setInterval(() => {
        p = Math.min(p + 0.025, 1);
        setBeamProgress(p);
        
        if (p >= 1) {
          clearInterval(beamRef.current);
          
          let r = 0;
          reflectRef.current = setInterval(() => {
            r = Math.min(r + 0.025, 1);
            setReflectProgress(r);
            
            if (r >= 1) {
              clearInterval(reflectRef.current);
              
              // Add result
              const newResult = {
                id: Date.now(),
                material: selectedMaterial,
                result: meta.result,
                type: selectedMaterial.type,
                timestamp: new Date().toISOString()
              };
              
              setExperimentResults((prev) => [newResult, ...prev]);
            }
          }, 16);
        }
      }, 16);
    }, 500);
  };

  const selectMaterial = (m) => {
    setSelectedMaterial(m);
    reset();
  };
  const goToRecordSummary = () => {
    navigate("/p4/light/record", {
      state: {
        pendingResults: experimentResults,
      },
    });
  };
  const resetExperimentCount = () => {
    reset();
    setExperimentResults([]);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  const rootStyle = isMobile
    ? { ...S.root, height: "auto", minHeight: "100vh", overflow: "auto", overflowX: "hidden" }
    : S.root;
  const menuListStyle = isMobile
    ? {
        ...S.menuList,
        gap: isTight ? 10 : 12,
        gridAutoRows: `minmax(${isTight ? 132 : 144}px, auto)`,
      }
    : {
        ...S.menuList,
        gap: 10,
        gridAutoRows: "minmax(124px, auto)",
      };
  const mainStyle = isMobile
    ? { ...S.main, flexDirection: "column", gap: 10, padding: "0 10px 12px", overflow: "visible" }
    : S.main;
  const controlPanelStyle = isMobile
    ? {
        ...S.controlPanel,
        position: "relative",
        left: "auto",
        top: "auto",
        transform: "none",
        width: "100%",
        maxWidth: 560,
        margin: "10px auto 0",
        order: 2,
        padding: isTight ? "12px 10px" : "14px 12px",
        gap: isTight ? 8 : 10,
        borderRadius: 16,
        maxHeight: "none",
        overflow: "visible",
      }
    : S.controlPanel;
  const canvasStyle = isMobile
    ? {
        ...S.canvas,
        order: 1,
        minHeight: isTight ? 320 : 360,
        height: isTight ? "48vh" : "52vh",
        maxHeight: 420,
        borderRadius: 16,
        overflow: "hidden",
      }
    : S.canvas;
  const stageStyle = isMobile
    ? {
        position: "absolute",
        inset: 0,
        transform: `scale(${isTight ? 0.86 : 0.92})`,
        transformOrigin: "center center",
        pointerEvents: "none",
      }
    : { position: "absolute", inset: 0, pointerEvents: "none" };
  const torchStyle = isMobile
    ? { ...S.torch, left: isTight ? 62 : 94 }
    : { ...S.torch, left: 300 };
  const torchGlowStyle = isMobile
    ? isTight
      ? { ...S.torchGlow, width: 200, height: 80 }
      : { ...S.torchGlow, width: 240, height: 96 }
    : { ...S.torchGlow, width: 300, height: 120 };
  const torchWideGlow = isMobile
    ? isTight
      ? { width: 240, height: 100 }
      : { width: 300, height: 120 }
    : { width: 400, height: 160 };
  const torchEmojiSize = isMobile ? (isTight ? 64 : 72) : 96;
  const targetStyle = isMobile ? { ...S.target, right: isTight ? 8 : 16, gap: isTight ? 6 : 8 } : S.target;
  const targetGlowSize = isMobile ? (isTight ? 120 : 150) : 200;
  const statusDotStyle = isMobile
    ? {
        ...S.statusDot,
        bottom: "auto",
        top: isTight ? 8 : 10,
        left: isTight ? 8 : 10,
        padding: isTight ? "4px 8px" : "5px 10px",
      }
    : S.statusDot;
  const shineBtnExtra = isMobile
    ? { bottom: isTight ? 10 : 12, padding: isTight ? "9px 14px" : "10px 16px" }
    : {};
  const pageNavFloatingStyle = isMobile
    ? { ...S.pageNavFloating, right: isTight ? 8 : 12, bottom: isTight ? 8 : 12, gap: isTight ? 6 : 8 }
    : S.pageNavFloating;
  const getMenuImageBtnStyle = (isSelected, isLast) => ({
    ...S.menuImageBtn,
    ...(isLast ? S.menuImageBtnLast : {}),
    opacity: 1,
    transform: isSelected ? "translateY(-2px)" : "translateY(0)",
    background: isSelected
      ? "linear-gradient(180deg, rgba(240,246,252,0.98) 0%, rgba(221,232,245,0.96) 100%)"
      : "linear-gradient(180deg, rgba(233,241,249,0.82) 0%, rgba(219,229,240,0.78) 100%)",
    borderColor: isSelected ? "#93b3cf" : "rgba(166,186,207,0.75)",
    boxShadow: isSelected
      ? "0 12px 24px rgba(124,150,177,0.22), inset 0 1px 0 rgba(255,255,255,0.82)"
      : "0 8px 18px rgba(140,160,182,0.12), inset 0 1px 0 rgba(255,255,255,0.62)",
  });
  const getMenuImageFrameStyle = (isSelected) => ({
    ...S.menuImageFrame,
    maxWidth: isMobile ? (isTight ? 98 : 112) : 100,
    height: isMobile ? (isTight ? 72 : 86) : 76,
    padding: isTight ? "8px 10px" : "10px 12px",
    background: isSelected
      ? "linear-gradient(180deg, rgba(248,252,255,0.98) 0%, rgba(226,237,247,0.96) 100%)"
      : "linear-gradient(180deg, rgba(244,248,252,0.95) 0%, rgba(227,236,245,0.9) 100%)",
    borderColor: isSelected ? "rgba(146,178,205,0.95)" : "rgba(188,206,223,0.95)",
    boxShadow: isSelected
      ? "0 10px 20px rgba(144,168,192,0.2), inset 0 1px 0 rgba(255,255,255,0.86)"
      : "0 6px 14px rgba(154,176,198,0.12), inset 0 1px 0 rgba(255,255,255,0.7)",
  });
  return (
    <div style={rootStyle}>
      <style>{CSS}</style>

      <main style={mainStyle}>

                {/* Floating Control Panel */}
        <div style={controlPanelStyle} className="glass-panel">
          <div style={S.menuHeaderRow}>
            <div style={S.menuInstruction}>เลือกวัตถุข้างบน</div>
            <div style={S.menuCountInline}>({experimentCount}ครั้ง)</div>
          </div>
          <div style={menuListStyle}>
            {MATERIALS.map((m, index) => (
              <button
                key={m.id}
                title={m.name}
                aria-label={m.name}
                style={getMenuImageBtnStyle(
                  selectedMaterial.id === m.id,
                  index === MATERIALS.length - 1
                )}
                onClick={() => selectMaterial(m)}
              >
                <div style={getMenuImageFrameStyle(selectedMaterial.id === m.id)}>
                  <img src={m.img} alt={m.name} style={S.menuImageThumb} />
                </div>
                <span
                  style={{
                    ...S.menuImageName,
                    color: selectedMaterial.id === m.id ? "#254561" : "#3f556d",
                    background: selectedMaterial.id === m.id
                      ? "rgba(232,241,249,0.98)"
                      : "rgba(232,239,246,0.86)",
                  }}
                >
                  {m.id === 9 ? "เหล็ก" : m.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div style={canvasStyle}>
          {/* ambient flash */}
          <button
            style={{
              ...S.bigBtn,
              position: "absolute",
              left: "50%",
              bottom: 20,
              transform: "translateX(-50%)",
              zIndex: 1,
              border: "1px solid #93c5fd",
              boxShadow: "0 12px 30px rgba(59,130,246,0.25)",
              backdropFilter: "blur(8px)",
              padding: "12px 20px",
              fontSize: isTight ? 13 : 14,
              opacity: shine ? 0.45 : 1,
              cursor: shine ? "not-allowed" : "pointer",
              background: shine
                ? "#cbd5e1"
                : "linear-gradient(135deg,#38bdf8,#2563eb)",
              ...shineBtnExtra,
            }}
            onClick={doShine}
            disabled={shine}
          >
            <span style={{ fontSize: isMobile ? 22 : 26 }}>🔦</span>
            <span>ส่องแสง</span>
          </button>

          <div style={stageStyle}>
            <BeamCanvas
              shine={shine}
              beamProgress={beamProgress}
              reflectProgress={reflectProgress}
              materialType={selectedMaterial.type}
              objectSize={materialSize}
            />

          {/* Grid lines (decorative) */}
          <svg style={S.grid} width="100%" height="100%">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`v${i}`} x1={`${i * 5.26}%`} y1="0" x2={`${i * 5.26}%`} y2="100%"
                stroke="rgba(30,64,175,0.08)" strokeWidth="1" />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={`${i * 9.09}%`} x2="100%" y2={`${i * 9.09}%`}
                stroke="rgba(30,64,175,0.08)" strokeWidth="1" />
            ))}
          </svg>

          {/* Torch - ทำให้ใหญ่ขึ้นและเห็นชัด */}
          <div style={{
            ...torchStyle,
            transform: `translateY(-50%) rotate(${torchRotation}deg)`,
            transformOrigin: "82px 70px",
          }}>
            {shine && (
              <>
                <div style={torchGlowStyle} className="glow-pulse" />
                <div style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%,-50%)",
                  ...torchWideGlow,
                  background: "radial-gradient(ellipse, rgba(255,215,0,0.3) 0%, transparent 70%)",
                  borderRadius: "50%",
                  pointerEvents: "none",
                  filter: "blur(30px)",
                }} />
              </>
            )}
            <span style={{ fontSize: torchEmojiSize, position: "relative", zIndex: 2, filter: "drop-shadow(0 0 20px gold)" }}>🔦</span>
          </div>

          {/* Material Object - แสดงรูปภาพเปล่า ไม่มีกล่อง */}
          <div style={S.matObj}>
            <div
              style={{
                ...S.matVisual,
                width: materialSize,
                height: materialSize,
              }}
            >
              <img 
                src={selectedMaterial.img}
                alt={selectedMaterial.name}
                style={{
                  ...S.matImg,
                  filter: materialImageFilter,
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.parentElement.querySelector('.fallback-emoji').style.display = 'block';
                }}
              />
              {shine && beamHitProgress > 0 && <div style={materialHotspotStyle} />}
              {shine && beamHitProgress > 0 && <div style={materialBeamInsideStyle} />}
              {shine && beamHitProgress > 0 && <div style={materialScatterStyle} />}
              <span
                className="fallback-emoji"
                style={{ ...S.matFallback, color: meta.color, fontSize: fallbackEmojiSize }}
              >
                {selectedMaterial.emoji}
              </span>
            </div>
            {shine && beamProgress >= 0.95 && selectedMaterial.type !== "opaque" && (
              <div
                style={{
                  ...S.beamPassOverlay,
                  opacity:
                    selectedMaterial.type === "transparent"
                      ? Math.min(0.95, 0.2 + reflectProgress * 0.85)
                      : Math.min(0.5, reflectProgress * 0.45),
                  background:
                    selectedMaterial.type === "transparent"
                      ? "linear-gradient(90deg, rgba(255,245,200,0) 0%, rgba(255,255,235,0.9) 46%, rgba(255,235,150,0.92) 54%, rgba(255,190,90,0) 100%)"
                      : "linear-gradient(90deg, rgba(255,200,120,0) 0%, rgba(255,165,0,0.55) 50%, rgba(255,120,0,0) 100%)",
                  filter: selectedMaterial.type === "transparent" ? "blur(1px)" : "blur(8px)",
                }}
              />
            )}
            {shine && beamProgress >= 0.95 && selectedMaterial.type === "opaque" && (
              <div style={{ ...S.beamBlockedOverlay, opacity: Math.min(0.85, 0.25 + reflectProgress * 0.5) }} />
            )}
          </div>

          {/* Target */}
          <div style={targetStyle} className="target-block">
            {shine && reflectProgress > 0.6 && (
              <div style={{
                ...S.targetGlow,
                background: selectedMaterial.type === "transparent"
                  ? "radial-gradient(circle, rgba(255,215,0,0.7) 0%, rgba(255,140,0,0.3) 50%, transparent 80%)"
                  : selectedMaterial.type === "translucent"
                  ? "radial-gradient(circle, rgba(255,165,0,0.4) 0%, rgba(255,100,0,0.2) 50%, transparent 80%)"
                  : "radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 80%)",
                width: targetGlowSize,
                height: targetGlowSize,
              }} className="glow-pulse" />
            )}
            <span style={{ fontSize: 80, filter: shine && reflectProgress > 0.8 && selectedMaterial.type === "transparent" ? "drop-shadow(0 0 20px gold)" : "none" }}>🧸</span>
            
            {/* แสดงผลลัพธ์ที่ชัดเจน */}
            {shine && reflectProgress >= 1 && (
              <div style={{ 
                ...S.seeTag,
                background: meta.badge,
                opacity: 1,
                fontSize: 16,
                padding: "8px 16px",
                boxShadow: `0 0 20px ${meta.color}`,
              }} className="pop-in">
                {meta.result}
              </div>
            )}
          </div>

          {/* Status dot */}
          <div style={statusDotStyle} className="status-dot">
            <div style={{ ...S.dot, background: shine ? "#4ade80" : "#475569", boxShadow: shine ? "0 0 8px #4ade80" : "none" }} className={shine ? "glow-pulse" : ""} />
            <span style={{ color: "#475569", fontSize: 13 }}>{shine ? "กำลังทดลอง..." : "พร้อมทดลอง"}</span>
          </div>
        </div>
        </div>
      </main>

      <div style={pageNavFloatingStyle}>
        <button
          type="button"
          style={S.pageBackBtn}
          className="btn-hover"
          onClick={() => navigate("/p4/light/thinking")}
        >
          ย้อนกลับ
        </button>
        <button
          type="button"
          style={S.pageResetBtn}
          className="btn-hover"
          onClick={resetExperimentCount}
        >
          รีเซ็ตนับใหม่
        </button>
        <button
          type="button"
          style={S.pageNextBtn}
          className="btn-hover"
          onClick={goToRecordSummary}
        >
          ไปต่อ / ดูผลสรุป
        </button>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  root: {
    fontFamily: "'Sarabun', 'Noto Sans Thai', sans-serif",
    background: "linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%)",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    color: "#1e293b",
    position: "relative",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    padding: "10px 20px",
    background: "rgba(255,255,255,0.9)",
    borderBottom: "1px solid #bfdbfe",
    backdropFilter: "blur(12px)",
    zIndex: 40,
    flexShrink: 0,
  },
  logo: { display: "flex", alignItems: "center", gap: 12 },
  logoIcon: { fontSize: 28, width: 44, height: 44, background: "linear-gradient(135deg,#7dd3fc,#3b82f6)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" },
  logoTitle: { fontSize: 17, fontWeight: 800, letterSpacing: 0.5 },
  logoSub: { fontSize: 11, color: "#64748b" },

  matSelectorWrap: { position: "relative", marginLeft: "auto" },
  matBtn: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "8px 14px",
    background: "#f8fbff",
    border: "1px solid #bfdbfe",
    borderRadius: 12,
    cursor: "pointer",
    color: "#1e293b",
  },
  matBtnSub: { fontSize: 10, color: "#64748b" },
  matBtnName: { fontSize: 14, fontWeight: 700 },
  typePill: { fontSize: 11, padding: "2px 8px", borderRadius: 20, fontWeight: 600 },

  dropdown: {
    position: "absolute", top: "calc(100% + 8px)", right: 0,
    width: 240,
    background: "#ffffff",
    border: "1px solid #bfdbfe",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 16px 34px rgba(37,99,235,0.2)",
    zIndex: 100,
    padding: "8px 0",
  },
  dropHeader: { padding: "10px 16px 6px", fontSize: 12, color: "#64748b", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" },
  dropGroupLabel: { padding: "6px 16px 2px", fontSize: 11, fontWeight: 700, letterSpacing: 0.5 },
  dropItem: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "8px 16px",
    width: "100%",
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    transition: "background 0.15s",
    color: "#1e293b",
  },

  statsRow: { display: "flex", gap: 8, marginLeft: 16 },
  statPill: { fontSize: 12, padding: "4px 10px", borderRadius: 20, fontWeight: 600, whiteSpace: "nowrap" },

  // Main layout
  main: {
    flex: 1,
    display: "flex",
    position: "relative",
    overflow: "hidden",
  },

  // Canvas
  canvas: {
    flex: 1,
    position: "relative",
    background: "radial-gradient(ellipse at 50% 48%, #f0f9ff 0%, #dbeafe 55%, #bfdbfe 100%)",
  },
  grid: { position: "absolute", inset: 0, pointerEvents: "none" },
  flashOverlay: {
    position: "absolute", inset: 0,
    background: "rgba(255,220,80,0.08)",
    pointerEvents: "none",
    zIndex: 10,
  },

  // Elements
  torch: {
    position: "absolute",
    left: 188,
    top: "50%",
    zIndex: 25,
  },
  torchGlow: {
    position: "absolute", top: "50%", left: "50%",
    transform: "translate(-50%,-50%)",
    width: 250, height: 100,
    background: "radial-gradient(ellipse, rgba(255,215,0,0.5) 0%, transparent 70%)",
    borderRadius: "50%",
    pointerEvents: "none",
  },

  matObj: {
    position: "absolute",
    left: "50%", top: "50%",
    transform: "translate(-50%,-50%)",
    display: "flex", flexDirection: "column", alignItems: "center",
    zIndex: 5,
  },
  matVisual: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  matImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    position: "relative",
    zIndex: 1,
  },
  matLightOverlay: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 2,
    mixBlendMode: "screen",
  },
  matBeamInside: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 3,
    mixBlendMode: "screen",
  },
  matTextureOverlay: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 4,
  },
  matFallback: {
    fontSize: 112,
    display: "none",
    position: "relative",
    zIndex: 5,
  },
  beamPassOverlay: {
    position: "absolute",
    inset: "10% -3%",
    borderRadius: 999,
    pointerEvents: "none",
    mixBlendMode: "screen",
    zIndex: 2,
  },
  beamBlockedOverlay: {
    position: "absolute",
    inset: "20%",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,190,90,0.35) 0%, rgba(255,120,0,0.1) 50%, rgba(0,0,0,0) 80%)",
    pointerEvents: "none",
    filter: "blur(6px)",
    zIndex: 2,
  },
  matLabel: { fontSize: 15, fontWeight: 700 },
  matTypeTag: { fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 600 },

  target: {
    position: "absolute", right: 40, top: "50%",
    transform: "translateY(-50%)",
    display: "flex", flexDirection: "column", alignItems: "center",
    zIndex: 5,
    gap: 12,
  },
  targetGlow: {
    position: "absolute", top: "50%", left: "50%",
    transform: "translate(-50%,-50%)",
    width: 180, height: 180,
    borderRadius: "50%",
    pointerEvents: "none",
  },
  seeTag: {
    color: "#fff",
    fontSize: 14, fontWeight: 700,
    padding: "6px 14px",
    borderRadius: 20,
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
  },

  statusDot: {
    position: "absolute", bottom: 14, left: 14,
    display: "flex", alignItems: "center", gap: 8,
    background: "rgba(255,255,255,0.9)",
    padding: "6px 14px",
    borderRadius: 20,
    border: "1px solid #bfdbfe",
    backdropFilter: "blur(8px)",
  },
  dot: { width: 8, height: 8, borderRadius: "50%", transition: "all 0.3s" },

  // Control Panel
  controlPanel: {
    position: "absolute",
    left: 0, top: 0, bottom: 0,
    transform: "none",
    zIndex: 20,
    width: 270,
    maxHeight: "100%",
    overflow: "hidden",
    background: "linear-gradient(180deg, rgba(225,233,244,0.96) 0%, rgba(212,223,237,0.96) 100%)",
    border: "1px solid #b5cadf",
    borderRadius: "0 20px 20px 0",
    padding: "12px 10px",
    backdropFilter: "blur(18px)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    boxShadow: "0 16px 30px rgba(132,154,180,0.18), inset 0 1px 0 rgba(255,255,255,0.55)",
  },
  panelTitle: { fontSize: 11, color: "#64748b", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", textAlign: "center" },
  menuHeaderRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    gap: 6,
    marginBottom: 2,
  },
  menuInstruction: {
    fontSize: 14,
    fontWeight: 700,
    color: "#334155",
    textAlign: "center",
    marginBottom: 0,
  },
  menuCountInline: {
    fontSize: 11,
    fontWeight: 700,
    color: "#58718a",
    letterSpacing: 0.1,
  },
  menuCurrentCard: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 10px",
    borderRadius: 12,
    border: "1px solid #bfdbfe",
    background: "#f8fbff",
  },
  menuList: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 10,
    gridAutoRows: "minmax(112px, auto)",
    alignContent: "start",
    justifyItems: "stretch",
    paddingTop: 4,
    paddingBottom: 14,
    maxHeight: "none",
    overflowX: "hidden",
    overflowY: "auto",
  },
  menuImageBtn: {
    border: "1px solid transparent",
    borderRadius: 22,
    padding: "10px 8px 8px",
    width: "100%",
    minHeight: 112,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "all 0.2s",
    background: "transparent",
    backdropFilter: "blur(6px)",
  },
  menuImageBtnLast: {
    gridColumn: "1 / -1",
    justifySelf: "center",
    width: "58%",
    minHeight: 124,
    paddingBottom: 12,
  },
  menuImageFrame: {
    width: "100%",
    borderRadius: 18,
    border: "1px solid rgba(188,206,223,0.95)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  menuImageThumb: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
    filter: "drop-shadow(0 8px 14px rgba(148,163,184,0.18))",
  },
  menuImageName: {
    fontSize: 11,
    lineHeight: 1.15,
    fontWeight: 700,
    color: "#334155",
    textAlign: "center",
    whiteSpace: "normal",
    width: "100%",
    borderRadius: 999,
    padding: "5px 8px",
  },
  speechRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    justifyContent: "space-between",
  },
  speechLangBtn: {
    border: "1px solid #bfdbfe",
    background: "#f8fbff",
    color: "#475569",
    borderRadius: 10,
    padding: "6px 8px",
    minWidth: 32,
    fontSize: 11,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  speechLangBtnActive: {
    background: "#dbeafe",
    color: "#1d4ed8",
    borderColor: "#93c5fd",
  },
  speechBtn: {
    border: "1px solid #93c5fd",
    background: "#e0f2fe",
    color: "#1e40af",
    borderRadius: 999,
    width: 34,
    height: 34,
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  bigBtn: {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
    padding: "14px 8px",
    border: "none",
    borderRadius: 14,
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "opacity 0.2s, transform 0.15s",
  },
  secondBtn: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
    padding: "9px 8px",
    border: "1px solid #bfdbfe",
    borderRadius: 12,
    background: "#f8fbff",
    color: "#334155",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 13, fontWeight: 600,
    transition: "background 0.15s",
  },
  divider: { height: 1, background: "#dbeafe", margin: "2px 0" },

  gaugeLabel: { fontSize: 11, color: "#64748b", textAlign: "center" },
  gaugeTrack: { height: 6, background: "#dbeafe", borderRadius: 99, overflow: "hidden" },
  gaugeFill: { height: "100%", borderRadius: 99, transition: "width 0.1s, background 0.4s" },
  gaugeVal: { fontSize: 18, fontWeight: 800, textAlign: "center", letterSpacing: -0.5 },

  resultCard: {
    padding: "12px 10px",
    borderRadius: 14,
    border: "1px solid",
    textAlign: "center",
    transition: "box-shadow 0.4s, border-color 0.4s",
  },
  resultLabel: { fontSize: 11, color: "#64748b", marginBottom: 4 },
  resultValue: { fontSize: 15, fontWeight: 800 },
  panelCount: { fontSize: 11, color: "#475569", textAlign: "center" },
  sizeControl: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  sizeHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sizeLabel: { fontSize: 11, color: "#64748b" },
  sizeValue: { fontSize: 12, fontWeight: 700, color: "#334155" },
  sizeSlider: { width: "100%", cursor: "pointer" },
  sizeHint: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 10,
    color: "#475569",
  },

  // Footer
  footer: {
    flexShrink: 0,
    background: "rgba(255,255,255,0.88)",
    borderTop: "1px solid #bfdbfe",
    padding: "10px 20px",
  },
  footerInner: { display: "flex", alignItems: "center", gap: 14 },
  footerTitle: { fontSize: 12, color: "#64748b", fontWeight: 700, whiteSpace: "nowrap" },
  resultsScroll: {
    display: "flex",
    gap: 8,
    overflowX: "auto",
    flex: 1,
    padding: "2px 0",
  },
  resultChip: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "6px 12px",
    borderRadius: 12,
    border: "1px solid",
    flexShrink: 0,
    minWidth: 120,
    transition: "all 0.2s",
  },
  emptyHint: { fontSize: 12, color: "#64748b", fontStyle: "italic" },
  clearBtn: {
    fontSize: 12, color: "#334155",
    background: "#ffffff", border: "1px solid #bfdbfe",
    borderRadius: 8, padding: "4px 10px",
    cursor: "pointer",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
  },
  pageNav: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginLeft: "auto",
  },
  pageNavFloating: {
    position: "absolute",
    right: 18,
    bottom: 16,
    zIndex: 70,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  pageBackBtn: {
    border: "1px solid #93c5fd",
    background: "#ffffff",
    color: "#1e3a8a",
    borderRadius: 10,
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  pageResetBtn: {
    border: "1px solid #fdba74",
    background: "#fff7ed",
    color: "#9a3412",
    borderRadius: 10,
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  pageNextBtn: {
    border: "1px solid #1d4ed8",
    background: "linear-gradient(135deg, #38bdf8, #2563eb)",
    color: "#ffffff",
    borderRadius: 10,
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 8px 22px rgba(59,130,246,0.35)",
  },
};

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes dropIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes popIn {
    from { opacity: 0; transform: scale(0.8); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.7; }
    50%       { opacity: 1; }
  }

  .dropdown-anim { animation: dropIn 0.18s ease; }
  .pop-in        { animation: popIn 0.3s ease; }
  .glow-pulse    { animation: glowPulse 1.4s ease-in-out infinite; }

  .btn-hover:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.03);
    filter: brightness(1.12);
  }
  .btn-hover:active:not(:disabled) {
    transform: scale(0.97);
  }

  @media (max-width: 768px) {
    .target-block > span {
      font-size: 60px !important;
    }
    .target-block .pop-in {
      font-size: 13px !important;
      padding: 6px 12px !important;
    }
    .status-dot span {
      font-size: 12px !important;
    }
    .mat-btn-sub {
      font-size: 9px !important;
    }
    .mat-btn-name {
      font-size: 13px !important;
    }
    .stat-pill {
      font-size: 11px !important;
      padding: 3px 8px !important;
    }
    .result-chip {
      min-width: 110px !important;
      padding: 6px 10px !important;
    }
    .result-chip .chip-title {
      font-size: 11px !important;
    }
    .result-chip .chip-sub {
      font-size: 10px !important;
    }
  }

  @media (max-width: 420px) {
    .target-block > span {
      font-size: 52px !important;
    }
    .target-block .pop-in {
      font-size: 12px !important;
      padding: 5px 10px !important;
    }
    .status-dot span {
      font-size: 11px !important;
    }
    .stat-pill {
      font-size: 10px !important;
      padding: 3px 7px !important;
    }
    .result-chip {
      min-width: 100px !important;
    }
  }

  ::-webkit-scrollbar { height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.35); border-radius: 99px; }
`;



