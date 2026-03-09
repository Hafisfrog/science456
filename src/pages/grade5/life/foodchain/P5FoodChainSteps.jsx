import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const stepsStyles = `
.steps-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #87CEEB 0%, #98FB98 100%);
  overflow: hidden;
  font-family: 'Prompt', sans-serif;
}
.particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: float-particle 15s infinite linear;
  z-index: 1;
}
@keyframes float-particle {
  0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
  10% { opacity: 0.8; }
  90% { opacity: 0.6; }
  100% { transform: translateY(-100vh) translateX(100px) rotate(360deg); opacity: 0; }
}
.sun {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 120px;
  height: 120px;
  z-index: 2;
}
.sun-core {
  position: absolute;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, #FFD700 0%, #FFA500 100%);
  border-radius: 50%;
  box-shadow: 0 0 50px #FFA500;
  animation: pulse 3s ease-in-out infinite;
}
.sun-rays {
  position: absolute;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(255,165,0,0) 70%);
  border-radius: 50%;
  animation: rotate 20s linear infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.cloud {
  position: absolute;
  font-size: 4rem;
  opacity: 0.6;
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));
  z-index: 2;
  animation: float-cloud 20s linear infinite;
}
.cloud-1 { top: 15%; left: -10%; animation-delay: 0s; }
.cloud-2 { top: 25%; right: -10%; font-size: 5rem; animation: float-cloud 25s linear infinite reverse; }
.cloud-3 { top: 40%; left: -15%; font-size: 3.5rem; animation: float-cloud 18s linear infinite; }
@keyframes float-cloud {
  from { transform: translateX(-100px); }
  to { transform: translateX(calc(100vw + 100px)); }
}
.tree {
  position: absolute;
  font-size: 5rem;
  filter: drop-shadow(0 20px 20px rgba(0,0,0,0.2));
  animation: sway 6s ease-in-out infinite;
  transform-origin: bottom center;
  z-index: 3;
}
.tree-1 { bottom: 5%; left: 2%; font-size: 7rem; }
.tree-2 { bottom: 3%; right: 3%; font-size: 6rem; animation-delay: -1s; }
.tree-3 { bottom: 7%; left: 10%; font-size: 4rem; animation-delay: -2s; }
@keyframes sway {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(3deg); }
  75% { transform: rotate(-3deg); }
}
.grass-field {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: linear-gradient(180deg, #90EE90 0%, #32CD32 100%);
  z-index: 5;
  clip-path: polygon(0 30%, 100% 0, 100% 100%, 0% 100%);
}
.grass-blade {
  position: absolute;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #228B22 0%, #006400 100%);
  transform-origin: bottom;
  animation: wave 3s ease-in-out infinite;
  border-radius: 2px 2px 0 0;
}
@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
}
.fence {
  position: absolute;
  bottom: 50px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
  z-index: 6;
}
.fence-post {
  width: 12px;
  height: 40px;
  background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
  border-radius: 4px 4px 0 0;
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  animation: fence-sway 4s ease-in-out infinite;
  transform-origin: bottom;
}
.fence-post:nth-child(even) { animation-delay: -1s; }
@keyframes fence-sway {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(1deg); }
  75% { transform: rotate(-1deg); }
}
.title-container {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 30px;
  z-index: 10;
  animation: slide-down 0.8s ease-out;
}
.main-title {
  font-size: 3rem;
  font-weight: bold;
  color: #14532d;
  text-shadow: 0 2px 0 rgba(255,255,255,0.7), 0 8px 20px rgba(20,83,45,0.25);
  margin-bottom: 10px;
}
.title-icon {
  margin: 0 15px;
  filter: drop-shadow(0 4px 4px rgba(0,0,0,0.2));
  display: inline-block;
  animation: bounce 2s ease-in-out infinite;
}
.title-sub {
  font-size: 1.2rem;
  color: rgba(255,255,255,0.9);
  letter-spacing: 2px;
  text-transform: uppercase;
}
.steps-wrapper {
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 30px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border-radius: 60px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1), inset 0 0 30px rgba(255,255,255,0.3);
  border: 1px solid rgba(255,255,255,0.3);
  z-index: 20;
  animation: fade-in 1s ease-out;
}
.steps-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  position: relative;
}
.step-card {
  position: relative;
  display: flex;
  gap: 20px;
  padding: 25px;
  background: white;
  border-radius: 30px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid transparent;
  animation: card-appear 0.6s ease-out backwards;
}
.step-card:nth-child(1) { animation-delay: 0.1s; }
.step-card:nth-child(2) { animation-delay: 0.3s; }
.step-card:nth-child(3) { animation-delay: 0.5s; }
.step-card:nth-child(4) { animation-delay: 0.7s; }
.step-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 30px 40px rgba(0,0,0,0.2);
  border-color: #FFD700;
}
.step-card.hovered { background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%); }
.step-number {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 30px;
  color: white;
  font-weight: bold;
  box-shadow: 0 10px 15px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}
.step-card:hover .step-number { transform: rotate(5deg) scale(1.1); }
.step-icon {
  font-size: 1.8rem;
  margin-bottom: 5px;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));
}
.step-index {
  font-size: 1.2rem;
  background: rgba(255,255,255,0.3);
  padding: 2px 8px;
  border-radius: 20px;
}
.step-content { flex: 1; }
.step-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
}
.step-description {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
}
.step-connector {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 30;
}
.connector-dot {
  width: 8px;
  height: 8px;
  background: #FFD700;
  border-radius: 50%;
  animation: pulse-dot 1.5s ease-in-out infinite;
}
.connector-line {
  width: 50px;
  height: 2px;
  background: linear-gradient(90deg, #FFD700, #FFA500, #FFD700);
  animation: flow-line 2s linear infinite;
}
@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
}
@keyframes flow-line {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
.nav-buttons {
  position: fixed;
  bottom: 40px;
  right: 40px;
  display: flex;
  gap: 20px;
  z-index: 100;
}
.nav-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 30px;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255,255,255,0.3);
}
.nav-btn.prev { background: rgba(255, 255, 255, 0.9); color: #333; }
.nav-btn.next { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
.nav-btn:hover { transform: translateY(-5px) scale(1.05); box-shadow: 0 20px 30px rgba(0,0,0,0.3); }
.nav-btn.prev:hover { background: white; }
.nav-btn.next:hover { background: linear-gradient(135deg, #764ba2 0%, #667eea 100%); }
.btn-icon { font-size: 1.3rem; transition: transform 0.3s ease; }
.nav-btn:hover .btn-icon { transform: translateX(3px); }
.nav-btn.prev:hover .btn-icon { transform: translateX(-3px); }
.language-selector {
  position: fixed;
  bottom: 40px;
  left: 40px;
  display: flex;
  gap: 10px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  padding: 10px 15px;
  border-radius: 50px;
  border: 1px solid rgba(255,255,255,0.3);
  z-index: 100;
  animation: slide-up 0.8s ease-out;
}
.lang-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  background: transparent;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}
.lang-btn.active {
  background: white;
  color: #333;
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
}
.lang-btn:hover:not(.active) { background: rgba(255,255,255,0.2); }
.sound-toggle {
  position: fixed;
  top: 40px;
  right: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  animation: slide-right 0.8s ease-out;
}
.sound-toggle:hover {
  background: rgba(255,255,255,0.4);
  transform: scale(1.1) rotate(90deg);
}
.progress-indicator {
  position: fixed;
  top: 40px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  padding: 12px 20px;
  border-radius: 50px;
  border: 1px solid rgba(255,255,255,0.3);
  z-index: 100;
  animation: slide-left 0.8s ease-out;
}
.progress-bar {
  width: 150px;
  height: 8px;
  background: rgba(255,255,255,0.3);
  border-radius: 10px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FFD700, #FFA500);
  border-radius: 10px;
  animation: progress-pulse 2s ease-in-out infinite;
}
.progress-text {
  color: white;
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
@keyframes progress-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
@keyframes slide-down {
  from { opacity: 0; transform: translateY(-50px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slide-up {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slide-left {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes slide-right {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes card-appear {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
@media (max-width: 768px) {
  .steps-grid { grid-template-columns: 1fr; }
  .main-title { font-size: 2rem; }
  .nav-buttons { bottom: 20px; right: 20px; flex-direction: column; }
  .language-selector { bottom: 20px; left: 20px; flex-wrap: wrap; max-width: 200px; }
  .progress-indicator { top: 20px; left: 20px; }
  .sound-toggle { top: 20px; right: 20px; }
}
`;

export default function P5FoodChainSteps() {
  const navigate = useNavigate();
  const audioCtxRef = useRef(null);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [showAmbient, setShowAmbient] = useState(true);

  const steps = [
    {
      title: "สำรวจสิ่งมีชีวิตในระบบนิเวศ",
      description: "สังเกตและจดบันทึกสิ่งมีชีวิตต่างๆ ในระบบนิเวศ",
      icon: "🔍",
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "จำแนกสิ่งมีชีวิตออกเป็นกลุ่ม ผู้ผลิตและผู้บริโภค",
      description: "แยกแยะบทบาทของสิ่งมีชีวิตแต่ละชนิด",
      icon: "📊",
      color: "from-green-400 to-green-600"
    },
    {
      title: "สร้างห่วงโซ่อาหาร",
      description: "เชื่อมโยงความสัมพันธ์ของสิ่งมีชีวิต",
      icon: "🔄",
      color: "from-yellow-400 to-yellow-600"
    },
    {
      title: "บันทึกผลการทดลอง",
      description: "สรุปและบันทึกสิ่งที่ได้เรียนรู้",
      icon: "📝",
      color: "from-purple-400 to-purple-600"
    },
  ];

  // สร้าง Audio Context ตอนหน้าโหลด
  useEffect(() => {
    if (!showAmbient) return;
    
    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();

    // เล่นเสียงพื้นหลังเบา ๆ (ambient tone)
    const playBackground = () => {
      const ctx = audioCtxRef.current;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = 120;
      gain.gain.value = 0.02;

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start();
    };

    playBackground();

    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, [showAmbient]);

  // ฟังก์ชันเสียง "คลิก"
  const playClick = () => {
    if (!audioCtxRef.current) return;
    
    const ctx = audioCtxRef.current;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "square";
    oscillator.frequency.value = 1200;
    gain.gain.value = 0.1;

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.08);
  };

  // สร้างอนุภาคลอย
  const particles = [...Array(30)].map((_, i) => (
    <div
      key={i}
      className="particle"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`,
        width: `${Math.random() * 8 + 2}px`,
        height: `${Math.random() * 8 + 2}px`,
        background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 100, ${Math.random() * 0.5 + 0.3})`,
      }}
    />
  ));

  return (
    <div className="steps-container">
      {/* อนุภาคลอย */}
      {particles}

      {/* ดวงอาทิตย์แบบมีรัศมี */}
      <div className="sun">
        <div className="sun-core"></div>
        <div className="sun-rays"></div>
      </div>

      {/* เมฆลอย */}
      <div className="cloud cloud-1">☁️</div>
      <div className="cloud cloud-2">☁️</div>
      <div className="cloud cloud-3">☁️</div>

      {/* ต้นไม้ตกแต่ง */}
      <div className="tree tree-1">🌳</div>
      <div className="tree tree-2">🌲</div>
      <div className="tree tree-3">🌿</div>

      {/* พื้นหญ้าพร้อมเอฟเฟกต์ */}
      <div className="grass-field">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="grass-blade"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${i * 0.1}s`,
              height: `${Math.random() * 30 + 20}px`,
            }}
          />
        ))}
      </div>

      {/* รั้วไม้ตกแต่ง */}
      <div className="fence">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="fence-post" />
        ))}
      </div>

      {/* หัวเรื่องหลัก */}
      <div className="title-container">
        <h1 className="main-title">
          <span className="title-icon">🧪</span>
          ขั้นตอนการทดลอง
          <span className="title-icon">🔬</span>
        </h1>
        <p className="title-sub">Experimental Procedure</p>
      </div>

      {/* Steps Container */}
      <div className="steps-wrapper">
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step-card ${hoveredStep === index ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
              onClick={() => {
                playClick();
                // เลื่อนไปยังขั้นตอนนั้นๆ
              }}
            >
              <div className={`step-number bg-gradient-to-r ${step.color}`}>
                <span className="step-icon">{step.icon}</span>
                <span className="step-index">{index + 1}</span>
              </div>
              
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>

              {/* เอฟเฟกต์เส้นทางเชื่อม */}
              {index < steps.length - 1 && (
                <div className="step-connector">
                  <div className="connector-dot" />
                  <div className="connector-line" />
                  <div className="connector-dot" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ปุ่มควบคุมเสียง */}
      <button
        onClick={() => {
          playClick();
          setShowAmbient(!showAmbient);
          if (!showAmbient) {
            audioCtxRef.current?.resume();
          } else {
            audioCtxRef.current?.suspend();
          }
        }}
        className="sound-toggle"
      >
        {showAmbient ? '🔊' : '🔈'}
      </button>

      {/* Navigation Buttons */}
      <div className="nav-buttons">
        <button
          onClick={() => {
            playClick();
            navigate(-1);
          }}
          className="nav-btn prev"
        >
          <span className="btn-icon">←</span>
          <span className="btn-text">ย้อนกลับ</span>
        </button>

        <button
          onClick={() => {
            playClick();
            navigate("/p5/life/foodchain/select");
          }}
          className="nav-btn next"
        >
          <span className="btn-text">เริ่มการทดลอง</span>
          <span className="btn-icon">→</span>
        </button>
      </div>

      {/* Language Selector */}
      <div className="language-selector">
        <button onClick={playClick} className="lang-btn active">🇹🇭 ไทย</button>
        <button onClick={playClick} className="lang-btn">🇬🇧 ENG</button>
        <button onClick={playClick} className="lang-btn">🇲🇾 MLY</button>
      </div>

      {/* Progress Indicator */}
      <div className="progress-indicator">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '25%' }} />
        </div>
        <span className="progress-text">ขั้นตอนที่ 1/4</span>
      </div>

      <style>{stepsStyles}</style>
    </div>
  );
}
