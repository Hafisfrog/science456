import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./P5FoodChainSteps.css";

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
    </div>
  );
}