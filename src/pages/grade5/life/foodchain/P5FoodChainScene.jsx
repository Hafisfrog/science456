import { useState } from "react";

const sceneStyles = `
.organism-img {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
  cursor: pointer;
  z-index: 10;
}
.organism-img:hover {
  transform: scale(1.25) translateY(-8px);
  filter: drop-shadow(0 20px 30px rgba(0,0,0,0.25));
  z-index: 50;
}
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-12px) rotate(1deg); }
  75% { transform: translateY(8px) rotate(-1deg); }
}
.fly { animation: float 5s ease-in-out infinite; }
@keyframes snakeMove {
  0% { transform: translateX(0) translateY(0) rotate(0deg); }
  25% { transform: translateX(15px) translateY(-5px) rotate(2deg); }
  50% { transform: translateX(25px) translateY(0) rotate(0deg); }
  75% { transform: translateX(15px) translateY(5px) rotate(-2deg); }
  100% { transform: translateX(0) translateY(0) rotate(0deg); }
}
.snakeMove { animation: snakeMove 6s ease-in-out infinite; }
@keyframes frogJump {
  0%, 100% { transform: translateY(0) scale(1); }
  40% { transform: translateY(-20px) scale(1.1); }
  60% { transform: translateY(5px) scale(0.95); }
}
.frogMove { animation: frogJump 2.5s ease-in-out infinite; }
@keyframes fishSwim {
  0% { transform: translateX(0) translateY(0) rotate(0deg); }
  25% { transform: translateX(20px) translateY(-8px) rotate(3deg); }
  50% { transform: translateX(35px) translateY(0) rotate(0deg); }
  75% { transform: translateX(20px) translateY(8px) rotate(-3deg); }
  100% { transform: translateX(0) translateY(0) rotate(0deg); }
}
.fishMove { animation: fishSwim 7s ease-in-out infinite; }
@keyframes plantSway {
  0%, 100% { transform: rotate(0deg) translateY(0); }
  25% { transform: rotate(2deg) translateY(-3px); }
  75% { transform: rotate(-2deg) translateY(3px); }
}
.plantMove { animation: plantSway 5s ease-in-out infinite; transform-origin: bottom center; }
.water-ripple {
  position: absolute;
  bottom: 0;
  left: 30%;
  right: 0;
  height: 25%;
  background: linear-gradient(180deg, rgba(96, 165, 250, 0.3) 0%, rgba(37, 99, 235, 0.5) 100%);
  animation: ripple 3s ease-in-out infinite;
}
@keyframes ripple {
  0%, 100% { opacity: 0.5; transform: scaleY(1); }
  50% { opacity: 0.7; transform: scaleY(1.02); }
}
.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  pointer-events: none;
  animation: particleFloat 8s infinite;
}
@keyframes particleFloat {
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  10% { opacity: 0.8; }
  90% { opacity: 0.6; }
  100% { transform: translateY(-100vh) translateX(100px); opacity: 0; }
}
.sun-rays {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255,255,190,0.4) 0%, rgba(255,255,200,0) 70%);
  border-radius: 50%;
  animation: sunPulse 4s ease-in-out infinite;
}
@keyframes sunPulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}
.nav-button {
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  letter-spacing: 0.5px;
}
.nav-button.next { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
.nav-button.prev { background: linear-gradient(135deg, #f6d365 0%, #fda085 100%); color: #333; }
.nav-button:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,0,0,0.3); }
.nav-button.next:hover { background: linear-gradient(135deg, #764ba2 0%, #667eea 100%); }
.nav-button.prev:hover { background: linear-gradient(135deg, #fda085 0%, #f6d365 100%); }
.nav-button:active { transform: translateY(1px); box-shadow: 0 2px 10px rgba(0,0,0,0.2); }
.selected-display {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 12px 30px;
  border-radius: 50px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  animation: slideDown 0.5s ease;
}
@keyframes slideDown {
  from { opacity: 0; transform: translate(-50%, -20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
.legend {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  padding: 12px 20px;
  border-radius: 50px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.5);
  animation: fadeIn 1s ease;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.back-button {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255,255,255,0.3);
  padding: 8px 20px;
  border-radius: 50px;
  color: #333;
  font-weight: 500;
  transition: all 0.3s ease;
}
.back-button:hover { background: rgba(255, 255, 255, 0.4); transform: translateX(-5px); }
`;

export default function P5FoodChainScene() {
  const [selected, setSelected] = useState("");
  const [showParticles, setShowParticles] = useState(true);

  // สร้างอนุภาคลอย
  const particles = [...Array(20)].map((_, i) => (
    <div
      key={i}
      className="particle"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        width: `${Math.random() * 6 + 2}px`,
        height: `${Math.random() * 6 + 2}px`,
      }}
    />
  ));

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* อนุภาคลอย */}
      {showParticles && particles}

      {/* แสงอาทิตย์ */}
      <div className="sun-rays" />

      {/* ========= Background ========= */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-green-200 to-green-300 animate-gradient" />
      
      {/* น้ำพร้อมเอฟเฟกต์ระลอกคลื่น */}
      <div className="water-ripple" />

      {/* ========= สิ่งมีชีวิต ========= */}

      {/* เหยี่ยว */}
      <img
        src="/images/p5/y.png"
        className="organism-img fly absolute top-[5%] left-[10%] w-48"
        onClick={() => setSelected("เหยี่ยว (ผู้บริโภค)")}
        alt="เหยี่ยว"
      />

      {/* นก */}
      <img
        src="/images/p5/nog.png"
        className="organism-img fly absolute top-[10%] right-[12%] w-40"
        onClick={() => setSelected("นก (ผู้บริโภค)")}
        alt="นก"
      />

      {/* หนูนา */}
      <img
        src="/images/p5/n.png"
        className="organism-img absolute bottom-[30%] left-[30%] w-36"
        onClick={() => setSelected("หนูนา (ผู้บริโภค)")}
        alt="หนูนา"
        style={{ animation: "walk 2s ease-in-out infinite" }}
      />

      {/* งู */}
      <img
        src="/images/p5/snack.png"
        className="organism-img snakeMove absolute bottom-[28%] left-[40%] w-44"
        onClick={() => setSelected("งู (ผู้บริโภค)")}
        alt="งู"
      />

      {/* กบ */}
      <img
        src="/images/p5/gop.png"
        className="organism-img frogMove absolute bottom-[18%] left-[12%] w-40"
        onClick={() => setSelected("กบ (ผู้บริโภค)")}
        alt="กบ"
      />

      {/* ปลา */}
      <img
        src="/images/p5/pla.png"
        className="organism-img fishMove absolute bottom-[10%] right-[18%] w-40"
        onClick={() => setSelected("ปลา (ผู้บริโภค)")}
        alt="ปลา"
      />

      {/* ลูกน้ำ */}
      <img
        src="/images/p5/lunam.png"
        className="organism-img absolute bottom-[12%] right-[28%] w-24"
        onClick={() => setSelected("ลูกน้ำ (ผู้บริโภค)")}
        alt="ลูกน้ำ"
        style={{ animation: "wiggle 1s infinite" }}
      />

      {/* ตั๊กแตน */}
      <img
        src="/images/p5/tag.png"
        className="organism-img absolute bottom-[25%] left-[50%] w-36"
        onClick={() => setSelected("ตั๊กแตน (ผู้บริโภค)")}
        alt="ตั๊กแตน"
        style={{ animation: "crawl 3s ease-in-out infinite" }}
      />

      {/* หนอน */}
      <img
        src="/images/p5/non.png"
        className="organism-img absolute bottom-[32%] right-[20%] w-28"
        onClick={() => setSelected("หนอน (ผู้บริโภค)")}
        alt="หนอน"
        style={{ animation: "crawl 4s linear infinite" }}
      />

      {/* ต้นข้าว */}
      <img
        src="/images/p5/kaw.png"
        className="organism-img plantMove absolute top-[15%] left-[5%] w-56"
        onClick={() => setSelected("ต้นข้าว (ผู้ผลิต)")}
        alt="ต้นข้าว"
      />

      {/* หญ้า */}
      <img
        src="/images/p5/ya.png"
        className="organism-img plantMove absolute bottom-[35%] left-[3%] w-44"
        onClick={() => setSelected("หญ้า (ผู้ผลิต)")}
        alt="หญ้า"
      />

      {/* พืชน้ำ */}
      <img
        src="/images/p5/lunamm.png"
        className="organism-img plantMove absolute bottom-[8%] right-[5%] w-48"
        onClick={() => setSelected("พืชน้ำ (ผู้ผลิต)")}
        alt="พืชน้ำ"
      />

      {/* ========= หัวข้อ ========= */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-3xl font-bold text-white drop-shadow-lg">
        🌿 แผนภาพระบบนิเวศและห่วงโซ่อาหาร 🌿
      </div>

      {/* ========= แสดงชื่อ ========= */}
      {selected && (
        <div className="selected-display absolute top-20 left-1/2 -translate-x-1/2 text-xl font-medium text-gray-800">
          {selected}
        </div>
      )}

      {/* ========= ผู้ผลิต/ผู้บริโภค ========= */}
      <div className="legend absolute bottom-6 left-6 text-lg">
        <span className="text-green-600 font-bold">● ผู้ผลิต</span>
        <span className="mx-3 text-gray-400">|</span>
        <span className="text-amber-700 font-bold">● ผู้บริโภค</span>
      </div>

      {/* ========= Navigation Buttons (ขวามือ) ========= */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        <button 
          onClick={() => window.location.href = "/p5/life/foodchain/materials"}
          className="nav-button next"
        >
          ไปต่อ →
        </button>
        <button 
          onClick={() => window.location.href = "/previous-scene"}
          className="nav-button prev"
        >
          ← ย้อนกลับ
        </button>
      </div>

      {/* ========= ปุ่มกลับ ========= */}
      <button
        onClick={() => window.history.back()}
        className="back-button absolute top-6 left-6 text-lg"
      >
        ← กลับ
      </button>

      {/* ========= Toggle Particles Button ========= */}
      <button
        onClick={() => setShowParticles(!showParticles)}
        className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white hover:bg-white/30 transition-all"
      >
        {showParticles ? '✨' : '💫'}
      </button>

      <style>{sceneStyles}</style>
    </div>
  );
}
