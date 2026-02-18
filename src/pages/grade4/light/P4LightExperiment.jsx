import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LabLayout from "../../../components/LabLayout";

/* ─── Beam canvas renderer ─── */
function BeamCanvas({ shine, beamProgress, reflectProgress, isMirror, materialType }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    if (!shine) return;

    const torchTip = { x: 80, y: H / 2 };        
    const mirrorCx = W * 0.5;                    
    const mirrorCy = H / 2;
    const targetX  = W - 100;                    

    /* ── ฟังก์ชันวาดลำแสงสีส้ม ── */
    const drawLightBeam = (x1, y1, x2, y2, options = {}) => {
      const {
        intensity = 1,
        isReflection = false,
        blurAmount = 20
      } = options;

      const len = Math.hypot(x2 - x1, y2 - y1);
      if (len < 1) return;

      // สีส้มทั้งหมด
      const getOrangeStops = (brightness) => ({
        outer: `rgba(255, 140, 0, ${0.2 * brightness})`,     // ส้มเข้ม
        mid: `rgba(255, 165, 0, ${0.5 * brightness})`,       // ส้มกลาง
        core: `rgba(255, 200, 100, ${0.9 * brightness})`,    // ส้มอ่อน
      });

      // แสงชั้นนอกสุด
      for (let i = -2; i <= 2; i++) {
        ctx.save();
        const colors = getOrangeStops(intensity * 0.8);
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, colors.outer);
        gradient.addColorStop(0.6, `rgba(255, 165, 0, ${0.2 * intensity})`);
        gradient.addColorStop(1, 'rgba(255, 140, 0, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = isReflection ? 120 : 150;
        ctx.lineCap = "round";
        ctx.filter = `blur(${blurAmount + 10}px)`;
        ctx.beginPath();
        ctx.moveTo(x1 + i, y1);
        ctx.lineTo(x2 + i, y2);
        ctx.stroke();
        ctx.restore();
      }

      // แสงชั้นกลาง
      ctx.save();
      const colors = getOrangeStops(intensity);
      const midGrad = ctx.createLinearGradient(x1, y1, x2, y2);
      midGrad.addColorStop(0, colors.mid);
      midGrad.addColorStop(0.5, `rgba(255, 200, 100, ${0.6 * intensity})`);
      midGrad.addColorStop(1, 'rgba(255, 140, 0, 0)');
      
      ctx.strokeStyle = midGrad;
      ctx.lineWidth = isReflection ? 60 : 80;
      ctx.lineCap = "round";
      ctx.filter = `blur(${blurAmount - 5}px)`;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();

      // แสงแกนกลาง
      ctx.save();
      const coreGrad = ctx.createLinearGradient(x1, y1, x2, y2);
      coreGrad.addColorStop(0, colors.core);
      coreGrad.addColorStop(0.6, `rgba(255, 255, 200, ${intensity})`);
      coreGrad.addColorStop(1, 'rgba(255, 200, 100, 0)');
      
      ctx.strokeStyle = coreGrad;
      ctx.lineWidth = isReflection ? 30 : 40;
      ctx.lineCap = "round";
      ctx.filter = `blur(${blurAmount - 12}px)`;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    };

    // วาดลำแสงหลัก (สีส้ม)
    const fxEnd = torchTip.x + (mirrorCx - torchTip.x) * beamProgress;
    const fyEnd = mirrorCy + (Math.sin(beamProgress * Math.PI * 2) * 10);
    drawLightBeam(torchTip.x, torchTip.y, fxEnd, fyEnd, { 
      intensity: 1, 
      blurAmount: 20 
    });

    // แสงกระทบกระจก
    if (beamProgress >= 0.95) {
      ctx.save();
      
      // แสงกระจาย
      const gradient = ctx.createRadialGradient(mirrorCx, mirrorCy, 0, mirrorCx, mirrorCy, 200);
      gradient.addColorStop(0, 'rgba(255, 140, 0, 0.4)');
      gradient.addColorStop(0.4, 'rgba(255, 165, 0, 0.2)');
      gradient.addColorStop(0.7, 'rgba(255, 200, 100, 0.1)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      
      ctx.fillStyle = gradient;
      ctx.filter = "blur(25px)";
      ctx.beginPath();
      ctx.arc(mirrorCx, mirrorCy, 200, 0, Math.PI * 2);
      ctx.fill();

      // จุดสว่าง
      ctx.filter = "blur(8px)";
      ctx.fillStyle = 'rgba(255, 200, 100, 0.6)';
      ctx.beginPath();
      ctx.arc(mirrorCx, mirrorCy, 50, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }

    // แสงสะท้อนทะลุไปรูปภาพ
    if (isMirror && beamProgress >= 0.95 && reflectProgress > 0) {
      // คำนวณมุมสะท้อน
      const incidenceAngle = Math.atan2(mirrorCy - torchTip.y, mirrorCx - torchTip.x);
      const reflectionAngle = -incidenceAngle;
      
      const maxLen = Math.hypot(targetX - mirrorCx, 150) * 1.5;
      const rLen = maxLen * reflectProgress;
      
      const rx2 = mirrorCx + Math.cos(reflectionAngle) * rLen;
      const ry2 = mirrorCy + Math.sin(reflectionAngle) * rLen - 20 * reflectProgress;
      
      // วาดลำแสงสะท้อน (สีส้ม)
      drawLightBeam(mirrorCx, mirrorCy, rx2, ry2, { 
        intensity: 0.9, 
        isReflection: true, 
        blurAmount: 15 
      });

      // แสงกระทบรูปภาพ
      if (reflectProgress >= 0.8) {
        ctx.save();
        
        const targetGlow = ctx.createRadialGradient(targetX, H/2 - 15, 0, targetX, H/2 - 15, 250);
        targetGlow.addColorStop(0, 'rgba(255, 140, 0, 0.4)');
        targetGlow.addColorStop(0.3, 'rgba(255, 200, 100, 0.3)');
        targetGlow.addColorStop(0.6, 'rgba(255, 165, 0, 0.2)');
        targetGlow.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = targetGlow;
        ctx.filter = "blur(30px)";
        ctx.beginPath();
        ctx.arc(targetX, H/2 - 15, 250, 0, Math.PI * 2);
        ctx.fill();

        ctx.filter = "blur(15px)";
        ctx.fillStyle = 'rgba(255, 255, 200, 0.7)';
        ctx.beginPath();
        ctx.arc(targetX, H/2 - 15, 60, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    // แสงทะลุผ่านวัตถุโปร่งใส
    if (!isMirror && beamProgress >= 0.95 && reflectProgress > 0) {
      if (materialType === "transparent") {
        const throughX = mirrorCx + (targetX - mirrorCx) * reflectProgress;
        drawLightBeam(mirrorCx, mirrorCy, throughX, mirrorCy - 10, { 
          intensity: 0.9, 
          blurAmount: 18 
        });

        if (reflectProgress >= 0.9) {
          ctx.save();
          const glow = ctx.createRadialGradient(targetX, H/2 - 15, 0, targetX, H/2 - 15, 220);
          glow.addColorStop(0, 'rgba(255, 140, 0, 0.5)');
          glow.addColorStop(0.4, 'rgba(255, 200, 100, 0.3)');
          glow.addColorStop(0.8, 'rgba(255, 255, 200, 0.1)');
          glow.addColorStop(1, 'rgba(0,0,0,0)');
          
          ctx.fillStyle = glow;
          ctx.filter = "blur(25px)";
          ctx.beginPath();
          ctx.arc(targetX, H/2 - 15, 220, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      } else if (materialType === "translucent") {
        const throughX = mirrorCx + (targetX - mirrorCx) * reflectProgress * 0.7;
        for (let i = -2; i <= 2; i++) {
          drawLightBeam(mirrorCx + i*5, mirrorCy + i*3, throughX + i*10, mirrorCy - 15 + i*5, { 
            intensity: 0.3, 
            blurAmount: 25 
          });
        }
      }
    }

  }, [shine, beamProgress, reflectProgress, isMirror, materialType]);

  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={600}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none", zIndex: 10 }}
    />
  );
}

/* ─── อนุภาคแสงสีส้ม ─── */
function GlowParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    y: 5 + Math.random() * 90,
    size: 1 + Math.random() * 3,
    dur: 8 + Math.random() * 12,
    delay: Math.random() * 15,
    opacity: 0.1 + Math.random() * 0.3,
  }));

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {particles.map((p) => (
        <circle
          key={p.id}
          cx={`${p.x}%`}
          cy={`${p.y}%`}
          r={p.size}
          fill="rgba(255, 140, 0, 0.5)"
          filter="url(#glow)"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values={`0;${p.opacity};0`}
            dur={`${p.dur}s`}
            begin={`${p.delay}s`}
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="translate"
            values={`0,0; ${(Math.random() - 0.5) * 40},${(Math.random() - 0.5) * 30}`}
            dur={`${p.dur}s`}
            begin={`${p.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

export default function P4LightExperiment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const material = state?.material;

  const [shine, setShine] = useState(false);
  const [result, setResult] = useState(null);
  const [beamProgress, setBeamProgress] = useState(0);
  const [reflectProgress, setReflectProgress] = useState(0);
  const [torchRotation, setTorchRotation] = useState(0); // 0 องศา

  const beamRef = useRef(null);
  const reflectRef = useRef(null);
  const rotationRef = useRef(null);

  const isMirror = material?.name?.includes("กระจก");

  useEffect(() => {
    if (!material) navigate("/p4/light/select");
  }, [material, navigate]);

  useEffect(() => {
    return () => {
      clearInterval(beamRef.current);
      clearInterval(reflectRef.current);
      clearInterval(rotationRef.current);
    };
  }, []);

  const doShine = () => {
  if (shine) return;
  setShine(true);
  setResult(null);
  
  // คำนวณมุมที่ต้องหมุนให้ชี้ไปที่กระจก
  // จากตำแหน่งไฟฉาย (20, 250) ไปกระจก (500, 250)
  // มุมที่ถูกต้องคือประมาณ 45-50 องศา
  
  let currentRot = 0;
  rotationRef.current = setInterval(() => {
    currentRot += 3; // หมุนเร็วขึ้น
    if (currentRot >= 140) { // หยุดที่ 48 องศา (ชี้ตรงกระจก)
      setTorchRotation(140);
      clearInterval(rotationRef.current);
    } else {
      setTorchRotation(currentRot);
    }
  }, 16); // 16ms = 60fps

  setTimeout(() => {
    let prog = 0;
    beamRef.current = setInterval(() => {
      prog = Math.min(prog + 0.03, 1);
      setBeamProgress(prog);

      if (prog >= 1) {
        clearInterval(beamRef.current);

        let r = 0;
        reflectRef.current = setInterval(() => {
          r = Math.min(r + 0.03, 1);
          setReflectProgress(r);
          
          if (r >= 1) {
            clearInterval(reflectRef.current);
            
            if (material.type === "transparent") {
              setResult("เห็นชัดเจน");
            } else if (material.type === "translucent") {
              setResult("เห็นไม่ชัด");
            } else {
              setResult("มองไม่เห็น");
            }
          }
        }, 16);
      }
    }, 16);
  }, 600); // รอให้หมุนเสร็จก่อนค่อยเริ่มลำแสง
};

  const resetExperiment = () => {
    clearInterval(beamRef.current);
    clearInterval(reflectRef.current);
    clearInterval(rotationRef.current);
    setShine(false);
    setResult(null);
    setBeamProgress(0);
    setReflectProgress(0);
    setTorchRotation(0);
  };

  const goNext = () => navigate("/p4/light/record", { state: { material, result } });

  if (!material) return null;

  const resultConfig = {
    "เห็นชัดเจน": { 
      emoji: "✨", 
      color: "#f97316", 
      bg: "rgba(249,115,22,0.1)", 
      label: "เห็นชัดเจน",
    },
    "เห็นไม่ชัด": { 
      emoji: "🌫️", 
      color: "#f59e0b", 
      bg: "rgba(245,158,11,0.1)", 
      label: "เห็นไม่ชัด",
    },
    "มองไม่เห็น": { 
      emoji: "⚫", 
      color: "#6b7280", 
      bg: "rgba(107,114,128,0.1)", 
      label: "มองไม่เห็น",
    },
  };
  const rc = result ? resultConfig[result] : null;

  return (
    <LabLayout title="ทดลองส่องแสง" onNext={result ? goNext : null}>
      {/* Water theme background (保持不变) */}
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/90 via-blue-200/90 to-teal-200/90"></div>
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-white/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-cyan-200/40 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-2/3 left-1/4 w-64 h-64 bg-teal-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/20 blur-sm"
              style={{
                width: `${Math.random() * 40 + 20}px`,
                height: `${Math.random() * 40 + 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                opacity: 0.2
              }}
            />
          ))}
        </div>

        <div className="relative min-h-screen flex flex-col">
          
          {/* Header */}
          <div className="px-6 pt-12 pb-4">
            <div className="backdrop-blur-md bg-white/20 rounded-3xl p-6 border border-white/40 shadow-lg">
              <div className="flex items-center gap-3">
                <span className="text-4xl drop-shadow-lg">💧</span>
                <div>
                  <h1 className="text-3xl font-medium tracking-tight text-cyan-900">
                    การส่องแสงผ่านวัตถุ
                  </h1>
                  <p className="text-sm text-cyan-700/80 font-light mt-1">
                    วัตถุที่เลือก: <span className="font-medium">{material.name}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Experiment area */}
          <div className="flex-1 px-6 pb-6">
            <div className="relative backdrop-blur-md bg-white/20 rounded-3xl p-6 border border-white/40 shadow-lg">
              <div
                style={{
                  position: "relative",
                  height: 500,
                  borderRadius: 24,
                  overflow: "hidden",
                  background: "linear-gradient(145deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))",
                  backdropFilter: "blur(5px)",
                  border: "2px solid rgba(255,255,255,0.5)",
                }}
              >
                {/* Glow particles */}
                <GlowParticles />

                {/* Light beam canvas */}
                <BeamCanvas
                  shine={shine}
                  beamProgress={beamProgress}
                  reflectProgress={reflectProgress}
                  isMirror={isMirror}
                  materialType={material?.type}
                />

                {/* Torch - หมุนหัวไปที่กระจก */}
                <div
                  style={{
                    position: "absolute",
                    left: 20,
                    top: "50%",
                    transform: `translateY(-50%) rotate(${torchRotation}deg)`,
                    transformOrigin: "45px 50px", // หมุนที่หัวไฟฉาย
                    fontSize: 80,
                    zIndex: 20,
                    transition: "transform 0.3s ease-out",
                    filter: shine 
                      ? "drop-shadow(0 0 30px rgba(255,140,0,0.8))" 
                      : "drop-shadow(2px 4px 6px rgba(0,0,0,0.1))",
                  }}
                >
                  🔦
                </div>

                {/* Material */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                    zIndex: 30,
                    width: 250,
                    height: 250,
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 30,
                      border: isMirror 
                        ? "3px solid rgba(255,140,0,0.6)" 
                        : "2px solid rgba(255,255,255,0.6)",
                      background: isMirror
                        ? "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,200,100,0.2))"
                        : "rgba(255,255,255,0.3)",
                      backdropFilter: "blur(10px)",
                      boxShadow: shine && reflectProgress >= 0.5
                        ? "0 20px 40px rgba(255,140,0,0.3), 0 0 0 3px rgba(255,200,100,0.6) inset"
                        : "0 15px 30px rgba(0,0,0,0.1), 0 0 0 2px rgba(255,255,255,0.5) inset",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 20,
                      position: "relative",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {/* Shimmer effect for mirror */}
                    {isMirror && (
                      <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 30 }}>
                        <div style={{
                          position: "absolute",
                          top: -20,
                          left: "-150%",
                          width: "80%",
                          height: "140%",
                          background: "linear-gradient(105deg, transparent, rgba(255,200,100,0.3), transparent)",
                          animation: "shimmer 4s ease-in-out infinite",
                        }} />
                      </div>
                    )}
                    
                    {/* Material image */}
                    <img
                      src={material.img}
                      alt={material.name}
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "contain", 
                        zIndex: 1,
                        transition: "all 0.3s ease",
                        filter: shine && reflectProgress >= 0.8
                          ? "brightness(1.2) drop-shadow(0 0 15px rgba(255,140,0,0.5))" 
                          : "brightness(1)",
                      }}
                    />
                    
                    {/* Light effect on material */}
                    {shine && reflectProgress >= 0.8 && (
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        background: `radial-gradient(circle at 50% 50%, ${
                          isMirror ? 'rgba(255,200,100,0.2)' : 'rgba(255,140,0,0.2)'
                        } 0%, transparent 70%)`,
                        zIndex: 2,
                        pointerEvents: "none",
                        animation: "pulse 2s ease-in-out infinite",
                      }} />
                    )}
                  </div>
                </div>

                {/* Target image */}
                <div
                  style={{
                    position: "absolute",
                    right: 30,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: 100,
                    zIndex: 20,
                    filter: shine && reflectProgress >= 0.8 && (isMirror || material?.type === "transparent")
                      ? "drop-shadow(0 0 30px rgba(255,140,0,0.8)) brightness(1.2)"
                      : "brightness(0.9)",
                    transition: "all 0.5s ease",
                  }}
                >
                  🧸
                </div>

                {/* Room label */}
                <div style={{
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                  fontSize: "0.75rem",
                  color: "#0e7490",
                  background: "rgba(255,255,255,0.3)",
                  padding: "4px 12px",
                  borderRadius: 20,
                  backdropFilter: "blur(4px)",
                }}>
                  💧 ห้องทดลองแสง
                </div>
              </div>

              {/* Control buttons */}
              <div className="flex gap-3 justify-center mt-6">
                <button
                  onClick={doShine}
                  disabled={shine}
                  className={`
                    px-9 py-3 rounded-full font-medium text-base
                    transition-all duration-300 transform
                    ${shine 
                      ? 'bg-gray-300/50 text-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30'
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    <span>🔦</span>
                    <span>ส่องแสง</span>
                  </span>
                </button>

                <button
                  onClick={resetExperiment}
                  className="
                    px-8 py-3 rounded-full font-medium text-base
                    bg-white/30 backdrop-blur-sm border-2 border-white/40
                    text-cyan-800 hover:bg-white/40 hover:scale-105
                    transition-all duration-300
                  "
                >
                  <span className="flex items-center gap-2">
                    <span>💧</span>
                    <span>เริ่มใหม่</span>
                  </span>
                </button>

                <button
                  onClick={() => navigate("/p4/light/select")}
                  className="
                    px-8 py-3 rounded-full font-medium text-base
                    bg-transparent border-2 border-white/30
                    text-cyan-700 hover:bg-white/20 hover:border-white/40 hover:scale-105
                    transition-all duration-300
                  "
                >
                  <span className="flex items-center gap-2">
                    <span>◀</span>
                    <span>เปลี่ยนวัตถุ</span>
                  </span>
                </button>
              </div>

              {/* Result */}
              {rc && (
                <div
                  className="mt-6 mx-auto max-w-md result-card"
                  style={{
                    border: `2px solid ${rc.color}40`,
                    borderRadius: 24,
                    padding: "16px 24px",
                    textAlign: "center",
                    background: rc.bg,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <span className="text-4xl">{rc.emoji}</span>
                  <div style={{ fontSize: "1.5rem", fontWeight: 600, color: rc.color, marginTop: 4 }}>
                    {rc.label}
                  </div>
                  <div style={{ marginTop: 4, color: "#0e7490", fontSize: "0.9rem" }}>
                    {result === "เห็นชัดเจน" && "✨ แสงผ่านวัตถุได้อย่างสมบูรณ์"}
                    {result === "เห็นไม่ชัด" && "🌫️ แสงผ่านได้บางส่วน"}
                    {result === "มองไม่เห็น" && "⚫ วัตถุทึบแสง แสงไม่ผ่าน"}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer waves */}
          <div className="relative px-6 pb-8">
            <div className="mt-4 flex justify-center gap-1">
              <div className="w-8 h-1 bg-cyan-300/40 rounded-full backdrop-blur-sm animate-pulse"></div>
              <div className="w-8 h-1 bg-cyan-300/30 rounded-full backdrop-blur-sm animate-pulse delay-150"></div>
              <div className="w-8 h-1 bg-cyan-300/20 rounded-full backdrop-blur-sm animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-30px) translateX(-10px); }
          75% { transform: translateY(-10px) translateX(5px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(15deg); opacity: 0.2; }
          50% { opacity: 0.6; }
          100% { transform: translateX(300%) rotate(15deg); opacity: 0.2; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .result-card {
          animation: slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </LabLayout>
  );
}