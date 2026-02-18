import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";

/* === รูปการ์ตูนสัตว์แบบสวยงาม === */
const createCreatureImage = (type, emoji, bgColor, details) => {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="white"/>
        <stop offset="100%" stop-color="${bgColor}"/>
      </linearGradient>
      <filter id="shadow">
        <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="rgba(0,0,0,0.2)"/>
      </filter>
      ${details}
    </defs>
    
    <!-- พื้นหลังวงกลม -->
    <circle cx="100" cy="100" r="85" fill="url(#bg)" filter="url(#shadow)"/>
    
    <!-- ลายพื้นหลังพิเศษ -->
    <circle cx="100" cy="100" r="80" fill="none" stroke="white" stroke-width="2" stroke-opacity="0.3"/>
    
    <!-- วงกลมกลางสำหรับอีโมจิ -->
    <circle cx="100" cy="100" r="60" fill="white" fill-opacity="0.9"/>
    
    <!-- อีโมจิสัตว์ -->
    <text x="100" y="125" text-anchor="middle" font-size="80" font-family="Arial, sans-serif">
      ${emoji}
    </text>
    
    <!-- รายละเอียดเพิ่มเติม -->
    <text x="100" y="180" text-anchor="middle" font-size="16" font-weight="bold" fill="#333" font-family="Arial, sans-serif">
      ${type}
    </text>
  </svg>
  `;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

// รูปภาพแต่ละสัตว์
const CREATURE_IMAGES = {
  rice: createCreatureImage(
    "ข้าว", 
    "🌾", 
    "#C6F6D5",
    `<linearGradient id="riceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9AE6B4"/>
      <stop offset="100%" stop-color="#68D391"/>
     </linearGradient>`
  ),
  water_plant: createCreatureImage(
    "พืชน้ำ", 
    "🌿", 
    "#B2F5EA",
    `<linearGradient id="plantGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#81E6D9"/>
      <stop offset="100%" stop-color="#4FD1C5"/>
     </linearGradient>`
  ),
  grass: createCreatureImage(
    "หญ้า", 
    "🌱", 
    "#9AE6B4",
    `<linearGradient id="grassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#68D391"/>
      <stop offset="100%" stop-color="#38A169"/>
     </linearGradient>`
  ),
  caterpillar: createCreatureImage(
    "หนอน", 
    "🐛", 
    "#FED7D7",
    `<linearGradient id="caterpillarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FC8181"/>
      <stop offset="100%" stop-color="#E53E3E"/>
     </linearGradient>
     <circle cx="70" cy="70" r="5" fill="white" opacity="0.8"/>
     <circle cx="130" cy="70" r="5" fill="white" opacity="0.8"/>`
  ),
  grasshopper: createCreatureImage(
    "ตั๊กแตน", 
    "🦗", 
    "#C6F6D5",
    `<linearGradient id="grasshopperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9AE6B4"/>
      <stop offset="100%" stop-color="#38A169"/>
     </linearGradient>
     <line x1="60" y1="60" x2="40" y2="40" stroke="#4A5568" stroke-width="2"/>
     <line x1="140" y1="60" x2="160" y2="40" stroke="#4A5568" stroke-width="2"/>`
  ),
  frog: createCreatureImage(
    "กบ", 
    "🐸", 
    "#9AE6B4",
    `<linearGradient id="frogGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#68D391"/>
      <stop offset="100%" stop-color="#38A169"/>
     </linearGradient>
     <circle cx="80" cy="80" r="8" fill="white"/>
     <circle cx="120" cy="80" r="8" fill="white"/>
     <circle cx="80" cy="80" r="4" fill="#2D3748"/>
     <circle cx="120" cy="80" r="4" fill="#2D3748"/>`
  ),
  small_fish: createCreatureImage(
    "ปลาเล็ก", 
    "🐟", 
    "#BEE3F8",
    `<linearGradient id="fishGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#90CDF4"/>
      <stop offset="100%" stop-color="#4299E1"/>
     </linearGradient>
     <path d="M60,100 Q80,80 100,100 Q80,120 60,100" fill="rgba(255,255,255,0.3)"/>
     <path d="M140,100 Q120,80 100,100 Q120,120 140,100" fill="rgba(255,255,255,0.3)"/>`
  ),
  mouse: createCreatureImage(
    "หนูนา", 
    "🐭", 
    "#FED7E2",
    `<linearGradient id="mouseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBB6CE"/>
      <stop offset="100%" stop-color="#ED64A6"/>
     </linearGradient>
     <circle cx="80" cy="80" r="6" fill="white"/>
     <circle cx="120" cy="80" r="6" fill="white"/>
     <circle cx="80" cy="80" r="3" fill="#4A5568"/>
     <circle cx="120" cy="80" r="3" fill="#4A5568"/>
     <line x1="90" y1="110" x2="90" y2="125" stroke="#4A5568" stroke-width="2"/>
     <line x1="110" y1="110" x2="110" y2="125" stroke="#4A5568" stroke-width="2"/>`
  ),
  snake: createCreatureImage(
    "งู", 
    "🐍", 
    "#C6F6D5",
    `<linearGradient id="snakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9AE6B4"/>
      <stop offset="100%" stop-color="#38A169"/>
     </linearGradient>
     <path d="M70,100 Q85,85 100,100 Q115,115 130,100" stroke="white" stroke-width="4" fill="none"/>
     <circle cx="80" cy="95" r="4" fill="#2D3748"/>
     <circle cx="120" cy="95" r="4" fill="#2D3748"/>`
  ),
  bird: createCreatureImage(
    "นก", 
    "🐦", 
    "#FEFCBF",
    `<linearGradient id="birdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF089"/>
      <stop offset="100%" stop-color="#ECC94B"/>
     </linearGradient>
     <path d="M70,90 Q60,70 70,50" stroke="#4A5568" stroke-width="3" fill="none"/>
     <path d="M130,90 Q140,70 130,50" stroke="#4A5568" stroke-width="3" fill="none"/>
     <circle cx="85" cy="80" r="5" fill="#2D3748"/>
     <circle cx="115" cy="80" r="5" fill="#2D3748"/>`
  ),
  hawk: createCreatureImage(
    "เหยี่ยว", 
    "🦅", 
    "#FED7D7",
    `<linearGradient id="hawkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FC8181"/>
      <stop offset="100%" stop-color="#E53E3E"/>
     </linearGradient>
     <path d="M60,70 Q40,50 60,30" stroke="#4A5568" stroke-width="4" fill="none"/>
     <path d="M140,70 Q160,50 140,30" stroke="#4A5568" stroke-width="4" fill="none"/>
     <circle cx="85" cy="80" r="6" fill="#2D3748"/>
     <circle cx="115" cy="80" r="6" fill="#2D3748"/>
     <circle cx="85" cy="80" r="3" fill="white"/>
     <circle cx="115" cy="80" r="3" fill="white"/>`
  ),
  larva: createCreatureImage(
    "ลูกน้ำ", 
    "🦟", 
    "#E9D8FD",
    `<linearGradient id="larvaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D6BCFA"/>
      <stop offset="100%" stop-color="#9F7AEA"/>
     </linearGradient>
     <line x1="70" y1="70" x2="60" y2="60" stroke="#4A5568" stroke-width="2"/>
     <line x1="130" y1="70" x2="140" y2="60" stroke="#4A5568" stroke-width="2"/>
     <line x1="70" y1="110" x2="60" y2="120" stroke="#4A5568" stroke-width="2"/>
     <line x1="130" y1="110" x2="140" y2="120" stroke="#4A5568" stroke-width="2"/>`
  ),
};

const CREATURES = [
  { id: "rice", name: "ข้าว", img: CREATURE_IMAGES.rice },
  { id: "water_plant", name: "พืชน้ำ", img: CREATURE_IMAGES.water_plant },
  { id: "grass", name: "หญ้า", img: CREATURE_IMAGES.grass },
  { id: "caterpillar", name: "หนอน", img: CREATURE_IMAGES.caterpillar },
  { id: "grasshopper", name: "ตั๊กแตน", img: CREATURE_IMAGES.grasshopper },
  { id: "frog", name: "กบ", img: CREATURE_IMAGES.frog },
  { id: "small_fish", name: "ปลาเล็ก", img: CREATURE_IMAGES.small_fish },
  { id: "mouse", name: "หนูนา", img: CREATURE_IMAGES.mouse },
  { id: "snake", name: "งู", img: CREATURE_IMAGES.snake },
  { id: "bird", name: "นก", img: CREATURE_IMAGES.bird },
  { id: "hawk", name: "เหยี่ยว", img: CREATURE_IMAGES.hawk },
  { id: "larva", name: "ลูกน้ำ", img: CREATURE_IMAGES.larva },
];

export default function P5FoodChainSelect() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  const toggleSelect = (creature) => {
    setSelected((prev) =>
      prev.some((c) => c.id === creature.id)
        ? prev.filter((c) => c.id !== creature.id)
        : [...prev, creature]
    );
  };

  const handleNext = () => {
    if (selected.length < 2) {
      alert("กรุณาเลือกสิ่งมีชีวิตอย่างน้อย 2 ชนิด");
      return;
    }

    navigate("/p5/life/foodchain/sim", {
      state: { creatures: selected },
    });
  };

  return (
    <LabLayout title="เลือกสิ่งมีชีวิตสำหรับสร้างห่วงโซ่อาหาร">
      <div className="space-y-6 bg-gradient-to-b from-green-50 to-green-100 p-6 rounded-2xl shadow-xl">

        {/* คำแนะนำ */}
        <div className="bg-white border-4 border-black rounded-xl p-4 shadow-lg">
          <p className="font-bold text-lg">
            🌿 เลือกสิ่งมีชีวิตอย่างน้อย 2 ชนิด เพื่อสร้างห่วงโซ่อาหาร
          </p>
          <p className="text-gray-700 text-sm">
            (คลิกเพื่อเลือก / คลิกซ้ำเพื่อยกเลิก)
          </p>
        </div>

        {/* Grid สิ่งมีชีวิต */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {CREATURES.map((c) => (
            <CreatureCard
              key={c.id}
              creature={c}
              selected={selected.some((s) => s.id === c.id)}
              onClick={() => toggleSelect(c)}
            />
          ))}
        </div>

        {/* แสดงที่เลือก */}
        <div className="bg-white border-2 rounded-xl p-4 shadow">
          <p className="font-semibold mb-2">สิ่งมีชีวิตที่เลือก:</p>
          {selected.length === 0 ? (
            <p className="text-gray-500">ยังไม่ได้เลือก</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selected.map((c) => (
                <span
                  key={c.id}
                  className="bg-green-100 border border-green-400 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2"
                >
                  <img 
                    src={c.img} 
                    alt={c.name} 
                    className="w-6 h-6"
                  />
                  {c.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ปุ่มนำทาง */}
        <div className="flex justify-between pt-4">
          <button
            onClick={() => navigate("/p5/life/foodchain/steps")}
            className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 shadow flex items-center gap-2"
          >
            <span>◀</span>
            <span>ย้อนกลับ</span>
          </button>

          <button
            onClick={handleNext}
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 shadow flex items-center gap-2"
          >
            <span>ต่อไป</span>
            <span>▶</span>
          </button>
        </div>
      </div>
    </LabLayout>
  );
}

/* การ์ดสิ่งมีชีวิต — เวอร์ชันล้ำ */
function CreatureCard({ creature, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer border-4 rounded-2xl p-4 text-center shadow-lg transition-all duration-300 transform
        flex flex-col items-center justify-between h-full
        ${
          selected
            ? "border-blue-600 bg-gradient-to-b from-blue-50 to-blue-100 scale-105 ring-4 ring-blue-400 ring-opacity-50"
            : "border-orange-400 bg-white hover:scale-105 hover:shadow-xl hover:border-orange-500"
        }
      `}
    >
      {/* วงกลมสีพื้นหลังสำหรับรูป */}
      <div className={`
        w-32 h-32 rounded-full flex items-center justify-center mb-4
        ${selected ? "bg-gradient-to-br from-blue-100 to-blue-200" : "bg-gradient-to-br from-gray-50 to-gray-100"}
      `}>
        <img
          src={creature.img}
          alt={creature.name}
          className="w-24 h-24 drop-shadow-lg"
        />
        {selected && (
          <div className="absolute top-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">✓</span>
          </div>
        )}
      </div>
      
      <div className="mt-2">
        <p className="font-bold text-lg text-gray-800">{creature.name}</p>
        <div className="flex justify-center mt-2">
          {selected ? (
            <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              ✓ เลือกแล้ว
            </span>
          ) : (
            <span className="text-xs text-gray-500">
              คลิกเพื่อเลือก
            </span>
          )}
        </div>
      </div>
    </div>
  );
}