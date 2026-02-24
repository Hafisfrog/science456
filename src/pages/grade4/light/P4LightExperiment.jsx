import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ─── Constants ───────────────────────────────────────────────────────────────
const MATERIALS = [
  { id: 1,  name: "กระจกใส",    img: "/images/materials/l1.png",   type: "transparent", emoji: "🪟" },
  { id: 2,  name: "แก้วใส",     img: "/images/materials/l10.png",  type: "transparent", emoji: "🥛" },
  { id: 3,  name: "พลาสติกใส",  img: "/images/materials/l3.png",   type: "transparent", emoji: "🔷" },
  { id: 4,  name: "หมอก",       img: "/images/materials/l8.png",   type: "translucent", emoji: "🌫️" },
  { id: 5,  name: "กระดาษไข",  img: "/images/materials/l4.png",   type: "translucent", emoji: "📄" },
  { id: 6,  name: "กระจกฝ้า",   img: "/images/materials/l2.png",   type: "translucent", emoji: "🔲" },
  { id: 7,  name: "แผ่นไม้",    img: "/images/materials/l5.png",   type: "opaque",      emoji: "🪵" },
  { id: 8,  name: "ผนังปูน",    img: "/images/materials/l7.webp",  type: "opaque",      emoji: "🧱" },
  { id: 9,  name: "เหล็ก",      img: "/images/materials/l6.png",   type: "opaque",      emoji: "⚙️" },
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
  const [showMaterialMenu, setShowMaterialMenu] = useState(false);
  const [shine, setShine] = useState(false);
  const [beamProgress, setBeamProgress] = useState(0);
  const [reflectProgress, setReflectProgress] = useState(0);
  const [torchRotation, setTorchRotation] = useState(0);
  const [results, setResults] = useState([]);
  const [flash, setFlash] = useState(false);
  const [materialSizePercent, setMaterialSizePercent] = useState(100);
  
  // โหลดประวัติจาก localStorage
  const [experimentResults, setExperimentResults] = useState(() => {
    const saved = localStorage.getItem('experiment4_results');
    return saved ? JSON.parse(saved) : [];
  });

  // Refs
  const beamRef = useRef(null);
  const reflectRef = useRef(null);
  const rotationRef = useRef(null);
  const menuRef = useRef(null);

  const meta = TYPE_META[selectedMaterial.type];
  const materialSize = Math.round((190 * materialSizePercent) / 100);
  const fallbackEmojiSize = Math.round((112 * materialSizePercent) / 100);

  // Cleanup
  useEffect(() => {
    return () => {
      clearInterval(beamRef.current);
      clearInterval(reflectRef.current);
      clearInterval(rotationRef.current);
    };
  }, []);

  // Click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMaterialMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
              
              // อัปเดตทั้ง results และ experimentResults
              setResults(prev => [newResult, ...prev]);
              
              // เก็บผลการทดลองทั้งหมดไว้ใน localStorage
              const allResults = [newResult, ...experimentResults];
              setExperimentResults(allResults);
              localStorage.setItem('experiment4_results', JSON.stringify(allResults));
              
              setFlash(true);
              setTimeout(() => setFlash(false), 700);
            }
          }, 16);
        }
      }, 16);
    }, 500);
  };

  const selectMaterial = (m) => {
    setSelectedMaterial(m);
    setShowMaterialMenu(false);
    reset();
  };

  const goToRecord = () => {
    // ส่ง results (ผลลัพธ์ล่าสุด) ไปให้หน้าบันทึก
    // results จะมีเฉพาะครั้งที่ทดลองในรอบนี้ เช่น ทดลอง 3 ครั้งก็มี 3 รายการ
    navigate("/p4/light/record", { 
      state: { 
        pendingResults: results  // เปลี่ยนจาก experimentResults เป็น results
      } 
    });
  };

  const clearResults = () => {
    setResults([]);
    setExperimentResults([]);
    localStorage.removeItem('experiment4_results');
  };

  const stats = {
    total: experimentResults.length,
    transparent: experimentResults.filter(r => r.type === "transparent").length,
    translucent: experimentResults.filter(r => r.type === "translucent").length,
    opaque: experimentResults.filter(r => r.type === "opaque").length,
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={S.root}>
      <style>{CSS}</style>

      {/* ── TOP BAR ────────────────────────────────────────────────────── */}
      <header style={S.topBar}>
        {/* Logo */}
        <div style={S.logo}>
          <div style={S.logoIcon}>💡</div>
          <div>
            <div style={S.logoTitle}>Light Lab</div>
            <div style={S.logoSub}>การส่องผ่านของแสง</div>
          </div>
        </div>

        {/* Material Selector */}
        <div style={S.matSelectorWrap} ref={menuRef}>
          <button style={S.matBtn} onClick={() => setShowMaterialMenu(v => !v)}>
            <span style={{ fontSize: 22 }}>{selectedMaterial.emoji}</span>
            <div style={{ lineHeight: 1.2 }}>
              <div style={S.matBtnSub}>วัสดุปัจจุบัน</div>
              <div style={S.matBtnName}>{selectedMaterial.name}</div>
            </div>
            <div style={{ ...S.typePill, background: meta.dim, color: meta.badge }}>
              {meta.label}
            </div>
            <span style={{ fontSize: 12, color: "#64748b", marginLeft: 4 }}>{showMaterialMenu ? "▲" : "▼"}</span>
          </button>

          {showMaterialMenu && (
            <div style={S.dropdown} className="dropdown-anim">
              <div style={S.dropHeader}>เลือกวัสดุทดลอง</div>
              {["transparent","translucent","opaque"].map(grp => (
                <div key={grp}>
                  <div style={{ ...S.dropGroupLabel, color: TYPE_META[grp].badge }}>{TYPE_META[grp].label}</div>
                  {MATERIALS.filter(m => m.type === grp).map(m => (
                    <button
                      key={m.id}
                      style={{ ...S.dropItem, background: selectedMaterial.id === m.id ? TYPE_META[grp].dim : "transparent" }}
                      onClick={() => selectMaterial(m)}
                    >
                      <span style={{ fontSize: 20 }}>{m.emoji}</span>
                      <span style={{ fontWeight: selectedMaterial.id === m.id ? 700 : 500, color: "#e2e8f0" }}>{m.name}</span>
                      {selectedMaterial.id === m.id && <span style={{ marginLeft: "auto", color: TYPE_META[grp].badge }}>✓</span>}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats pills */}
        <div style={S.statsRow}>
          <div style={{ ...S.statPill, background: "#3b82f6", color: "white" }}>
            รวม {stats.total} ครั้ง
          </div>
          {Object.entries(stats).filter(([k]) => k !== 'total').map(([k, v]) => (
            <div key={k} style={{ ...S.statPill, background: TYPE_META[k].dim, color: TYPE_META[k].badge }}>
              {v} {TYPE_META[k].label}
            </div>
          ))}
        </div>
      </header>

      {/* ── MAIN LAB ───────────────────────────────────────────────────── */}
      <main style={S.main}>

        {/* Floating Control Panel */}
        <div style={S.controlPanel} className="glass-panel">
          <div style={S.panelTitle}>ควบคุม</div>
          <button style={S.secondBtn} onClick={reset} className="btn-hover">
            <span>↺</span> เริ่มใหม่
          </button>

          {/* ปุ่มดูสรุปผล - ส่ง results ไปแสดงตามจำนวนที่ทดลอง */}
          <button 
            style={{ ...S.secondBtn, background: "rgba(139, 92, 246, 0.2)", color: "#c084fc" }} 
            onClick={goToRecord} 
            className="btn-hover"
          >
            <span>📊</span> ดูสรุปผล ({results.length})
          </button>

          <div style={S.divider} />

          {/* Image size control */}
          <div style={S.gaugeLabel}>ขนาดรูปทดลอง</div>
          <div style={S.sizeControl}>
            <div style={S.sizeHeader}>
              <span style={S.sizeLabel}>ขนาดรูป</span>
              <span style={S.sizeValue}>{materialSizePercent}%</span>
            </div>
            <input
              style={{ ...S.sizeSlider, accentColor: meta.badge }}
              type="range"
              min="60"
              max="150"
              step="5"
              value={materialSizePercent}
              onChange={(e) => setMaterialSizePercent(Number(e.target.value))}
            />
            <div style={S.sizeHint}>
              <span>60%</span>
              <span>150%</span>
            </div>
          </div>

          <div style={S.divider} />

          <div style={S.gaugeLabel}>ความเข้มแสง</div>
          <div style={S.gaugeTrack}>
            <div style={{ ...S.gaugeFill, width: `${reflectProgress * 100}%`, background: meta.color }} />
          </div>
          <div style={{ ...S.gaugeVal, color: meta.color }}>{Math.round(reflectProgress * 100)}%</div>

          <div style={S.divider} />

          {/* Result card */}
          <div style={{ ...S.resultCard, borderColor: meta.glow, boxShadow: shine && reflectProgress > 0.5 ? `0 0 18px ${meta.glow}` : "none" }}>
            <div style={S.resultLabel}>ผลลัพธ์</div>
            <div style={{ ...S.resultValue, color: meta.color }}>{meta.result}</div>
          </div>

          <div style={S.divider} />
          <div style={S.panelCount}>ทดลองแล้ว {stats.total} ครั้ง</div>
        </div>

        {/* ── CANVAS AREA ─────────────────────────────────────────────── */}
        <div style={S.canvas}>
          {/* ambient flash */}
                    <button
            style={{
              ...S.bigBtn,
              position: "absolute",
              left: "50%",
              bottom: 20,
              transform: "translateX(-50%)",
              zIndex: 1,
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
              backdropFilter: "blur(8px)",
              padding: "12px 20px",
              opacity: shine ? 0.45 : 1,
              cursor: shine ? "not-allowed" : "pointer",
              background: shine
                ? "rgba(30,41,59,0.75)"
                : "linear-gradient(135deg,#f59e0b,#ef4444)",
            }}
            onClick={doShine}
            disabled={shine}
          >
            <span style={{ fontSize: 26 }}>🔦</span>
            <span>ส่องแสง</span>
          </button>

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
                stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={`${i * 9.09}%`} x2="100%" y2={`${i * 9.09}%`}
                stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            ))}
          </svg>

          {/* Torch - ทำให้ใหญ่ขึ้นและเห็นชัด */}
          <div style={{
            ...S.torch,
            transform: `translateY(-50%) rotate(${torchRotation}deg)`,
            transformOrigin: "82px 70px",
          }}>
            {shine && (
              <>
                <div style={{...S.torchGlow, width: 300, height: 120}} className="glow-pulse" />
                <div style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: 400, height: 160,
                  background: "radial-gradient(ellipse, rgba(255,215,0,0.3) 0%, transparent 70%)",
                  borderRadius: "50%",
                  pointerEvents: "none",
                  filter: "blur(30px)",
                }} />
              </>
            )}
            <span style={{ fontSize: 96, position: "relative", zIndex: 2, filter: "drop-shadow(0 0 20px gold)" }}>🔦</span>
          </div>

          {/* Material Object - แสดงรูปภาพเปล่า ไม่มีกล่อง */}
          <div style={S.matObj}>
            <img 
              src={selectedMaterial.img}
              alt={selectedMaterial.name}
              style={{
                ...S.matImg,
                width: materialSize,
                height: materialSize,
                filter: `drop-shadow(0 0 22px ${meta.glow})`,
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.parentElement.querySelector('.fallback-emoji').style.display = 'block';
              }}
            />
            <span
              className="fallback-emoji"
              style={{ ...S.matFallback, color: meta.color, fontSize: fallbackEmojiSize }}
            >
              {selectedMaterial.emoji}
            </span>
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
          <div style={S.target}>
            {shine && reflectProgress > 0.6 && (
              <div style={{
                ...S.targetGlow,
                background: selectedMaterial.type === "transparent"
                  ? "radial-gradient(circle, rgba(255,215,0,0.7) 0%, rgba(255,140,0,0.3) 50%, transparent 80%)"
                  : selectedMaterial.type === "translucent"
                  ? "radial-gradient(circle, rgba(255,165,0,0.4) 0%, rgba(255,100,0,0.2) 50%, transparent 80%)"
                  : "radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 80%)",
                width: 200,
                height: 200,
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
          <div style={S.statusDot}>
            <div style={{ ...S.dot, background: shine ? "#4ade80" : "#475569", boxShadow: shine ? "0 0 8px #4ade80" : "none" }} className={shine ? "glow-pulse" : ""} />
            <span style={{ color: "#94a3b8", fontSize: 13 }}>{shine ? "กำลังทดลอง..." : "พร้อมทดลอง"}</span>
          </div>
        </div>
      </main>

      {/* ── BOTTOM RESULT PANEL ─────────────────────────────────────────── */}
      <footer style={S.footer}>
        <div style={S.footerInner}>
          <div style={S.footerTitle}>ผลการทดลองล่าสุด</div>
          <div style={S.resultsScroll}>
            {results.length === 0
              ? <div style={S.emptyHint}>ยังไม่มีผล – กดส่องแสงเพื่อเริ่ม</div>
              : results.slice(0, 5).map((r, i) => (
                  <div key={r.id}
                    style={{ ...S.resultChip,
                      borderColor: TYPE_META[r.type].color,
                      background:  TYPE_META[r.type].dim,
                      animation: i === 0 ? "popIn 0.3s ease" : "none",
                    }}>
                    <img 
                      src={r.material.img}
                      alt=""
                      style={{ width: 24, height: 24, objectFit: "contain" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.parentElement.querySelector('.chip-emoji').style.display = 'inline';
                      }}
                    />
                    <span className="chip-emoji" style={{ fontSize: 20, display: 'none' }}>{r.material.emoji}</span>
                    <div>
                      <div style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 600 }}>{r.material.name}</div>
                      <div style={{ color: TYPE_META[r.type].badge, fontSize: 11 }}>{r.result}</div>
                    </div>
                  </div>
                ))
            }
          </div>
          {experimentResults.length > 0 && (
            <button style={S.clearBtn} onClick={clearResults}>ล้างประวัติ</button>
          )}
        </div>
      </footer>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  root: {
    fontFamily: "'Sarabun', 'Noto Sans Thai', sans-serif",
    background: "#070e1a",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    color: "#e2e8f0",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    padding: "10px 20px",
    background: "rgba(15,23,42,0.95)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    backdropFilter: "blur(12px)",
    zIndex: 40,
    flexShrink: 0,
  },
  logo: { display: "flex", alignItems: "center", gap: 12 },
  logoIcon: { fontSize: 28, width: 44, height: 44, background: "linear-gradient(135deg,#f59e0b,#ef4444)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" },
  logoTitle: { fontSize: 17, fontWeight: 800, letterSpacing: 0.5 },
  logoSub: { fontSize: 11, color: "#64748b" },

  matSelectorWrap: { position: "relative", marginLeft: "auto" },
  matBtn: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "8px 14px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
    cursor: "pointer",
    color: "#e2e8f0",
  },
  matBtnSub: { fontSize: 10, color: "#64748b" },
  matBtnName: { fontSize: 14, fontWeight: 700 },
  typePill: { fontSize: 11, padding: "2px 8px", borderRadius: 20, fontWeight: 600 },

  dropdown: {
    position: "absolute", top: "calc(100% + 8px)", right: 0,
    width: 240,
    background: "#0f172a",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
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
    color: "#e2e8f0",
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
    background: "radial-gradient(ellipse at 50% 50%, #0d1a2e 0%, #070e1a 100%)",
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
  matImg: {
    width: 190,
    height: 190,
    objectFit: "contain",
  },
  matFallback: {
    fontSize: 112,
    display: "none",
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
    background: "rgba(15,23,42,0.8)",
    padding: "6px 14px",
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.07)",
    backdropFilter: "blur(8px)",
  },
  dot: { width: 8, height: 8, borderRadius: "50%", transition: "all 0.3s" },

  // Control Panel
  controlPanel: {
    position: "absolute",
    left: 14, top: "50%",
    transform: "translateY(-50%)",
    zIndex: 20,
    width: 160,
    background: "rgba(10,20,40,0.88)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: "18px 14px",
    backdropFilter: "blur(18px)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
  },
  panelTitle: { fontSize: 11, color: "#64748b", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", textAlign: "center" },
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
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
    background: "rgba(255,255,255,0.05)",
    color: "#94a3b8",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 13, fontWeight: 600,
    transition: "background 0.15s",
  },
  divider: { height: 1, background: "rgba(255,255,255,0.06)", margin: "2px 0" },

  gaugeLabel: { fontSize: 11, color: "#64748b", textAlign: "center" },
  gaugeTrack: { height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" },
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
  sizeValue: { fontSize: 12, fontWeight: 700, color: "#cbd5e1" },
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
    background: "rgba(10,16,30,0.97)",
    borderTop: "1px solid rgba(255,255,255,0.07)",
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
  emptyHint: { fontSize: 12, color: "#334155", fontStyle: "italic" },
  clearBtn: {
    fontSize: 12, color: "#475569",
    background: "transparent", border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 8, padding: "4px 10px",
    cursor: "pointer",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
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

  ::-webkit-scrollbar { height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 99px; }
`;
