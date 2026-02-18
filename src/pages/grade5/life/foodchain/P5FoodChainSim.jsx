import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";

// ฟังก์ชันสร้างรูปภาพ SVG สำหรับสัตว์
const createCreatureImage = (type, emoji, bgColor) => {
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
    </defs>
    
    <!-- พื้นหลังวงกลม -->
    <circle cx="100" cy="100" r="85" fill="url(#bg)" filter="url(#shadow)"/>
    
    <!-- วงกลมกลางสำหรับอีโมจิ -->
    <circle cx="100" cy="100" r="60" fill="white" fill-opacity="0.9"/>
    
    <!-- อีโมจิสัตว์ -->
    <text x="100" y="125" text-anchor="middle" font-size="80" font-family="Arial, sans-serif">
      ${emoji}
    </text>
  </svg>
  `;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

// การแมปรูปภาพตามประเภทสัตว์
const creatureTypeToImage = {
  rice: createCreatureImage("ข้าว", "🌾", "#C6F6D5"),
  water_plant: createCreatureImage("พืชน้ำ", "🌿", "#B2F5EA"),
  grass: createCreatureImage("หญ้า", "🌱", "#9AE6B4"),
  caterpillar: createCreatureImage("หนอน", "🐛", "#FED7D7"),
  grasshopper: createCreatureImage("ตั๊กแตน", "🦗", "#C6F6D5"),
  frog: createCreatureImage("กบ", "🐸", "#9AE6B4"),
  small_fish: createCreatureImage("ปลาเล็ก", "🐟", "#BEE3F8"),
  mouse: createCreatureImage("หนูนา", "🐭", "#FED7E2"),
  snake: createCreatureImage("งู", "🐍", "#C6F6D5"),
  bird: createCreatureImage("นก", "🐦", "#FEFCBF"),
  hawk: createCreatureImage("เหยี่ยว", "🦅", "#FED7D7"),
  larva: createCreatureImage("ลูกน้ำ", "🦟", "#E9D8FD"),
};

export default function P5FoodChainSim() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const creatures = state?.creatures || [];

  // 5 ห่วงโซ่อาหาร (แต่ละห่วงมี 3 ช่อง: ผู้ผลิต → ผู้บริโภคลำดับที่ 1 → ผู้บริโภคลำดับที่ 2)
  const [chains, setChains] = useState(
    Array.from({ length: 5 }, () => [null, null, null])
  );
  const [activePopup, setActivePopup] = useState(null); // [chainIndex, slotIndex]

  useEffect(() => {
    if (!creatures || creatures.length === 0) {
      navigate("/p5/life/foodchain/select");
    }
  }, [creatures, navigate]);

  const setCreature = (chainIndex, slotIndex, creature) => {
    setChains((prev) =>
      prev.map((chain, i) =>
        i === chainIndex
          ? chain.map((c, j) => (j === slotIndex ? creature : c))
          : chain
      )
    );
    setActivePopup(null);
  };

  const clearSlot = (chainIndex, slotIndex) => {
    setChains((prev) =>
      prev.map((chain, i) =>
        i === chainIndex
          ? chain.map((c, j) => (j === slotIndex ? null : c))
          : chain
      )
    );
  };

  const handleNext = () => {
    // ตรวจว่ามีอย่างน้อย 1 ห่วงโซ่อาหารที่ครบ 3 ช่อง
    const hasComplete = chains.some(
      (chain) => chain[0] && chain[1] && chain[2]
    );

    if (!hasComplete) {
      const alertBox = document.createElement('div');
      alertBox.className = 'fixed top-6 right-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-4 rounded-2xl shadow-2xl animate-bounce z-50';
      alertBox.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="text-2xl animate-pulse">⚠️</div>
          <div>
            <div class="font-bold">กรุณาสร้างห่วงโซ่อาหารอย่างน้อย 1 ชุด</div>
            <div class="text-sm opacity-90">ต้องครบทั้ง 3 ช่องใน 1 แถว</div>
          </div>
        </div>
      `;
      document.body.appendChild(alertBox);
      setTimeout(() => {
        alertBox.classList.remove('animate-bounce');
        alertBox.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => alertBox.remove(), 300);
      }, 2500);
      return;
    }

    // เอฟเฟกต์ transition
    document.querySelector('.main-container')?.classList.add('page-exit');
    setTimeout(() => {
      navigate("/p5/life/foodchain/check", {
        state: { chains },
      });
    }, 500);
  };

  // นับห่วงโซ่ที่สร้างแล้ว
  const completedChains = chains.filter(chain => chain[0] && chain[1] && chain[2]).length;

  return (
    <LabLayout title="สร้างห่วงโซ่อาหาร">
      <div className="main-container min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-amber-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-full shadow-lg mb-4">
              <h1 className="text-3xl md:text-4xl font-bold">🔗 สร้างห่วงโซ่อาหาร</h1>
            </div>
            <p className="text-gray-700 text-lg">ลากหรือคลิกเพื่อสร้างความสัมพันธ์ห่วงโซ่อาหาร</p>
          </div>

          {/* คำแนะนำ */}
          <div className="relative bg-white/90 backdrop-blur-sm border-3 border-emerald-400 rounded-2xl p-6 shadow-xl mb-8">
            <div className="absolute -top-4 left-6">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                <span>📝</span>
                <span>วิธีการเล่น</span>
              </div>
            </div>
            <p className="font-bold text-2xl text-gray-800 mb-3 mt-2">
              🔁 สร้างห่วงโซ่อาหารจากสิ่งที่เลือกมา
            </p>
            <p className="text-gray-600 text-lg mb-4">
              คลิกช่องว่าง → เลือกสิ่งมีชีวิต / คลิก ❌ เพื่อลบ
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl border border-emerald-300">
                <div className="text-3xl font-bold text-emerald-600">1</div>
                <div className="text-sm font-medium text-emerald-800 mt-2">ผู้ผลิต</div>
                <div className="text-xs text-gray-600">พืช สาหร่าย</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl border border-amber-300">
                <div className="text-3xl font-bold text-amber-600">2</div>
                <div className="text-sm font-medium text-amber-800 mt-2">ผู้บริโภคที่ 1</div>
                <div className="text-xs text-gray-600">สัตว์กินพืช</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-red-100 to-pink-100 rounded-xl border border-red-300">
                <div className="text-3xl font-bold text-red-600">3</div>
                <div className="text-sm font-medium text-red-800 mt-2">ผู้บริโภคที่ 2</div>
                <div className="text-xs text-gray-600">สัตว์กินสัตว์</div>
              </div>
            </div>
          </div>

          {/* สถานะการสร้าง */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8 border-2 border-emerald-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xl text-gray-800">ความคืบหน้า</h3>
                <p className="text-gray-600">สร้างแล้ว {completedChains} จาก 5 ห่วงโซ่</p>
              </div>
              <div className={`px-4 py-2 rounded-full ${completedChains > 0 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'} font-medium`}>
                {completedChains > 0 ? `✅ ${completedChains} ห่วงโซ่สมบูรณ์` : 'กำลังสร้าง...'}
              </div>
            </div>
            <div className="mt-4">
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 transition-all duration-700"
                  style={{ width: `${(completedChains / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* พื้นที่สร้างห่วงโซ่อาหาร */}
          <div className="space-y-6 mb-10">
            {chains.map((chain, chainIndex) => (
              <ChainRow
                key={chainIndex}
                index={chainIndex}
                chain={chain}
                creatures={creatures}
                setCreature={setCreature}
                clearSlot={clearSlot}
                activePopup={activePopup}
                setActivePopup={setActivePopup}
              />
            ))}
          </div>

          {/* สรุปสิ่งมีชีวิตที่เหลือ */}
          <div className="bg-gradient-to-r from-white to-emerald-50/90 border-3 border-emerald-400 rounded-2xl p-6 shadow-xl mb-10 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">{creatures.length}</span>
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-800">สิ่งมีชีวิตที่เลือกมา</h3>
                <p className="text-gray-600">สามารถใช้ซ้ำได้หลายห่วงโซ่</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {creatures.map((c) => (
                <div
                  key={c.id}
                  className="bg-gradient-to-r from-emerald-100 to-green-100 border-2 border-emerald-400 px-4 py-2 rounded-full text-sm font-bold shadow-md flex items-center gap-2"
                >
                  <img 
                    src={creatureTypeToImage[c.id] || c.img} 
                    alt={c.name} 
                    className="w-6 h-6"
                  />
                  <span>{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ปุ่มนำทาง */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <button
              onClick={() => navigate("/p5/life/foodchain/select", { state: { creatures } })}
              className="group relative bg-gradient-to-r from-gray-700 to-gray-800 text-white px-10 py-3 rounded-full shadow-2xl hover:shadow-3xl transform hover:-translate-x-2 transition-all duration-300 flex items-center gap-3"
            >
              <span className="text-2xl transition-transform group-hover:-translate-x-1">◀</span>
              <div className="text-left">
                <div className="font-bold text-lg">ย้อนกลับ</div>
                <div className="text-sm opacity-80">เลือกสิ่งมีชีวิตใหม่</div>
              </div>
            </button>
            
            <div className="text-center">
              {completedChains === 0 ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-3 text-amber-600 font-bold text-lg animate-pulse">
                    <span className="text-2xl">⚠️</span>
                    <span>ยังไม่ได้สร้างห่วงโซ่อาหาร</span>
                  </div>
                  <div className="text-gray-500 text-sm">ต้องมีอย่างน้อย 1 ห่วงโซ่สมบูรณ์</div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-3 text-green-600 font-bold text-lg">
                    <span className="text-3xl animate-bounce">✅</span>
                    <span>สร้างสำเร็จ {completedChains} ห่วงโซ่</span>
                  </div>
                  <div className="text-gray-500 text-sm">พร้อมตรวจคำตอบแล้ว!</div>
                </div>
              )}
            </div>

            <button
              onClick={handleNext}
              className={`
                group relative overflow-hidden px-12 py-3 rounded-full shadow-2xl 
                transition-all duration-300 flex items-center gap-3
                ${completedChains > 0 
                  ? 'bg-gradient-to-r from-red-500 via-orange-500 to-red-600 hover:shadow-3xl hover:scale-105 text-white' 
                  : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              {completedChains > 0 && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-400 to-orange-400 rounded-full blur opacity-30 group-hover:opacity-50"></div>
                </>
              )}
              <div className="text-right">
                <div className="font-bold text-lg">ตรวจคำตอบ</div>
                <div className="text-sm opacity-90">ไปยังหน้าวิเคราะห์</div>
              </div>
              <span className="text-2xl transition-transform group-hover:translate-x-1">▶</span>
            </button>
          </div>
        </div>

        {/* ฟุตเตอร์ */}
        <div className="mt-12 pt-6 border-t border-emerald-200/50 text-center">
          <p className="text-gray-600">💡 เคล็ดลับ: สัตว์บางชนิดสามารถเป็นได้ทั้งผู้บริโภคลำดับที่ 1 และ 2</p>
          <p className="text-gray-400 text-sm mt-1">ระบบนิเวศจำลอง • วิทยาศาสตร์ ป.5</p>
        </div>

        {/* Popup เลือกสิ่งมีชีวิต - แยกออกมาจาก ChainSlot */}
        {activePopup && (
          <CreaturePopup
            chainIndex={activePopup[0]}
            slotIndex={activePopup[1]}
            creatures={creatures}
            onSelect={(creature) => setCreature(activePopup[0], activePopup[1], creature)}
            onClose={() => setActivePopup(null)}
          />
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes pageExit {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(20px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .page-exit {
          animation: pageExit 0.5s ease forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </LabLayout>
  );
}

/* แถวห่วงโซ่อาหาร */
function ChainRow({
  index,
  chain,
  creatures,
  setCreature,
  clearSlot,
  activePopup,
  setActivePopup,
}) {
  const isComplete = chain[0] && chain[1] && chain[2];
  const arrowColor = isComplete ? 'text-green-500' : 'text-gray-300';
  
  return (
    <div className={`
      relative p-6 rounded-2xl shadow-lg transition-all duration-300
      ${isComplete 
        ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-3 border-emerald-400' 
        : 'bg-white/80 backdrop-blur-sm border-2 border-emerald-200'
      }
    `}>
      {/* หัวแถว */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center font-bold text-white
          ${isComplete 
            ? 'bg-gradient-to-br from-emerald-400 to-green-500 animate-float' 
            : 'bg-gradient-to-br from-gray-400 to-gray-600'
          }
        `}>
          {index + 1}
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-800">
            ห่วงโซ่อาหารที่ {index + 1}
            {isComplete && <span className="ml-2 text-green-600 text-sm">✅ สมบูรณ์</span>}
          </h3>
          <p className="text-sm text-gray-600">ลำดับการกิน: ผู้ผลิต → ผู้บริโภคที่ 1 → ผู้บริโภคที่ 2</p>
        </div>
      </div>

      {/* ช่องใส่สิ่งมีชีวิต */}
      <div className="flex items-center justify-center gap-8">
        {chain.map((slot, slotIndex) => (
          <div key={slotIndex} className="flex items-center">
            <ChainSlot
              slot={slot}
              slotIndex={slotIndex}
              chainIndex={index}
              onClear={() => clearSlot(index, slotIndex)}
              setActivePopup={setActivePopup}
              isActive={activePopup && activePopup[0] === index && activePopup[1] === slotIndex}
            />
            
            {/* ลูกศรระหว่างช่อง (ยกเว้นช่องสุดท้าย) */}
            {slotIndex < 2 && (
              <div className={`mx-4 text-3xl ${arrowColor} transition-colors duration-300`}>
                →
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* คำอธิบาย */}
      <div className="flex justify-between mt-4 text-sm text-gray-500">
        <span>🌿 ผู้ผลิต</span>
        <span>🐛 ผู้บริโภคที่ 1</span>
        <span>🐍 ผู้บริโภคที่ 2</span>
      </div>
    </div>
  );
}

/* ช่องใส่สิ่งมีชีวิต */
function ChainSlot({ slot, slotIndex, chainIndex, onClear, setActivePopup, isActive }) {
  const slotColors = [
    'border-emerald-400 bg-gradient-to-b from-emerald-50 to-emerald-100',
    'border-amber-400 bg-gradient-to-b from-amber-50 to-amber-100',
    'border-red-400 bg-gradient-to-b from-red-50 to-red-100'
  ];
  const label = ['ผู้ผลิต', 'ผู้บริโภคที่ 1', 'ผู้บริโภคที่ 2'][slotIndex];

  const getCreatureImage = (creature) => {
    if (creature.img) return creature.img;
    return creatureTypeToImage[creature.id];
  };

  return (
    <div className="relative">
      <div className="text-center mb-2">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
          slotIndex === 0 ? 'bg-emerald-100 text-emerald-800' :
          slotIndex === 1 ? 'bg-amber-100 text-amber-800' :
          'bg-red-100 text-red-800'
        }`}>
          {label}
        </span>
      </div>
      
      <div
        onClick={() => setActivePopup([chainIndex, slotIndex])}
        className={`
          relative w-36 h-36 rounded-2xl border-3 flex flex-col items-center justify-center 
          cursor-pointer transition-all duration-300 shadow-lg
          ${slot 
            ? slotColors[slotIndex] + ' hover:scale-105 hover:shadow-xl' 
            : 'border-dashed border-gray-400 bg-white/70 hover:bg-white hover:border-solid hover:border-emerald-400'
          }
          ${isActive ? 'ring-4 ring-blue-400 ring-opacity-50 scale-105' : ''}
        `}
      >
        {slot ? (
          <>
            <div className="relative">
              <img
                src={getCreatureImage(slot)}
                alt={slot.name}
                className="w-20 h-20 drop-shadow-lg"
              />
            </div>
            <p className="mt-4 font-bold text-lg text-gray-800">{slot.name}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="absolute -top-3 -right-3 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg hover:scale-125 transition-transform"
              title="ลบออก"
            >
              ✕
            </button>
          </>
        ) : (
          <>
            <div className="text-5xl text-gray-400 mb-3">+</div>
            <p className="text-gray-500 font-medium">คลิกเพื่อเลือก</p>
            <p className="text-gray-400 text-sm mt-1">{label}</p>
          </>
        )}
      </div>
    </div>
  );
}

/* Popup เลือกสิ่งมีชีวิต - แยกเป็น Component ใหม่ */
function CreaturePopup({ chainIndex, slotIndex, creatures, onSelect, onClose }) {
  const label = ['ผู้ผลิต', 'ผู้บริโภคที่ 1', 'ผู้บริโภคที่ 2'][slotIndex];
  
  const getCreatureImage = (creature) => {
    if (creature.img) return creature.img;
    return creatureTypeToImage[creature.id];
  };

  // หาตำแหน่งของช่องที่ถูกคลิก
  const getPopupPosition = () => {
    // ใช้วิธีดึงตำแหน่งจาก DOM หรือคำนวณจาก chainIndex และ slotIndex
    // เพื่อให้ popup เปิดใกล้กับช่องที่ถูกคลิก
    return {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    };
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup Content */}
      <div 
        className="fixed z-50 w-11/12 max-w-md bg-white rounded-2xl shadow-2xl border-3 border-emerald-400 overflow-hidden"
        style={getPopupPosition()}
        onClick={(e) => e.stopPropagation()} // ป้องกันไม่ให้คลิกปิดเมื่อคลิกใน popup
      >
        <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-lg">เลือกสิ่งมีชีวิต</p>
              <p className="text-sm opacity-90">{label} - ห่วงโซ่ที่ {chainIndex + 1}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-emerald-200 text-2xl transition-colors"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto p-3">
          <div className="grid grid-cols-2 gap-3">
            {creatures.map((c) => (
              <div
                key={c.id}
                onClick={() => onSelect(c)}
                className="flex flex-col items-center p-4 bg-gradient-to-b from-gray-50 to-white rounded-xl border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all duration-200 hover:scale-105"
              >
                <img 
                  src={getCreatureImage(c)} 
                  alt={c.name} 
                  className="w-16 h-16 mb-2"
                />
                <p className="font-bold text-gray-800 text-center">{c.name}</p>
                <p className="text-xs text-gray-500 mt-1">คลิกเพื่อเลือก</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl font-medium transition-all duration-300"
          >
            ปิดหน้าต่างนี้
          </button>
        </div>
      </div>
    </>
  );
}