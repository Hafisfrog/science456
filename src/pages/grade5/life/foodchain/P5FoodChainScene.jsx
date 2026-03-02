import { useState } from "react";
import "./P5FoodChainScene.css";

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
    </div>
  );
}