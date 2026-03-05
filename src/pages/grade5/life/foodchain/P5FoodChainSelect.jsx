import { useNavigate } from "react-router-dom";
import { useState } from "react";

const getSlotKey = (row, col) => `${row}-${col}`;

const ANSWER_CHAINS = [
  ["ต้นข้าว", "ตั๊กแตน", "กบ", "งู"],
  ["ต้นข้าว", "หนูนา", "งู", "เหยี่ยว"],
  ["หญ้า", "หนอน", "นก", "งู"],
  ["ต้นข้าว", "หนูนา", "นก", "เหยี่ยว"],
  ["พืชน้ำ", "ลูกน้ำ", "ปลา", "นก"]
];

const DEFAULT_LOCKED_SLOT_KEYS = [
  getSlotKey(0, 0), getSlotKey(0, 3),
  getSlotKey(1, 1), getSlotKey(1, 3),
  getSlotKey(2, 1), getSlotKey(2, 2),
  getSlotKey(3, 0), getSlotKey(3, 1), getSlotKey(3, 3),
  getSlotKey(4, 1), getSlotKey(4, 2)
];

const createQuestionChains = (lockedSet) =>
  ANSWER_CHAINS.map((row, rowIndex) =>
    row.map((name, colIndex) =>
      lockedSet.has(getSlotKey(rowIndex, colIndex)) ? name : ""
    )
  );

const getRandomLockedSlots = () => {
  const nextLockedSlots = new Set();

  for (let rowIndex = 0; rowIndex < ANSWER_CHAINS.length; rowIndex++) {
    const columns = [0, 1, 2, 3];

    for (let i = columns.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [columns[i], columns[j]] = [columns[j], columns[i]];
    }

    const clueCount = 2 + Math.floor(Math.random() * 2); // 2 หรือ 3 ช่องใบ้ต่อ 1 โซ่
    for (let i = 0; i < clueCount; i++) {
      nextLockedSlots.add(getSlotKey(rowIndex, columns[i]));
    }
  }

  return nextLockedSlots;
};

export default function P5FoodChainSelect() {
  const navigate = useNavigate();

  // Animals data with more vibrant names
  const animals = [
    { name: "ต้นข้าว", img: "/images/p5/kaw.png", color: "from-amber-300 to-yellow-400" },
    { name: "หญ้า", img: "/images/p5/ya.png", color: "from-lime-300 to-green-400" },
    { name: "พืชน้ำ", img: "/images/p5/lunamm.png", color: "from-emerald-300 to-teal-400" },
    { name: "ตั๊กแตน", img: "/images/p5/tag.png", color: "from-yellow-300 to-amber-400" },
    { name: "หนูนา", img: "/images/p5/n.png", color: "from-orange-300 to-amber-500" },
    { name: "หนอน", img: "/images/p5/non.png", color: "from-red-300 to-rose-400" },
    { name: "ลูกน้ำ", img: "/images/p5/lunam.png", color: "from-cyan-300 to-blue-400" },
    { name: "ปลา", img: "/images/p5/pla.png", color: "from-sky-300 to-indigo-400" },
    { name: "กบ", img: "/images/p5/gop.png", color: "from-lime-300 to-green-500" },
    { name: "นก", img: "/images/p5/nog.png", color: "from-purple-300 to-violet-400" },
    { name: "งู", img: "/images/p5/snack.png", color: "from-emerald-400 to-teal-500" },
    { name: "เหยี่ยว", img: "/images/p5/y.png", color: "from-amber-400 to-orange-500" }
  ];

  const [lockedSlots, setLockedSlots] = useState(() => new Set(DEFAULT_LOCKED_SLOT_KEYS));
  const [chains, setChains] = useState(() =>
    createQuestionChains(new Set(DEFAULT_LOCKED_SLOT_KEYS))
  );

  // Panel state
  const [showPanel, setShowPanel] = useState(false);
  const [activeSlot, setActiveSlot] = useState({ row: null, col: null });

  // Locked slots
  const isLocked = (row, col) => lockedSlots.has(getSlotKey(row, col));

  // Handle slot click
  const handleSlotClick = (row, col) => {
    if (isLocked(row, col)) return;
    setActiveSlot({ row, col });
    setShowPanel(true);
  };

  // Handle animal selection
  const handleSelectAnimal = (animal) => {
    if (activeSlot.row === null || activeSlot.col === null) return;

    setChains(prev =>
      prev.map((row, rowIndex) =>
        row.map((item, colIndex) =>
          rowIndex === activeSlot.row && colIndex === activeSlot.col
            ? animal.name
            : item
        )
      )
    );

    setShowPanel(false);
  };

  const handleClearActiveSlot = () => {
    if (activeSlot.row === null || activeSlot.col === null) return;

    setChains(prev =>
      prev.map((row, rowIndex) =>
        row.map((item, colIndex) =>
          rowIndex === activeSlot.row && colIndex === activeSlot.col
            ? ""
            : item
        )
      )
    );

    setShowPanel(false);
  };

  // สุ่มโจทย์ใหม่: สุ่มเฉพาะช่องที่เป็น "ตัวใบ้" และเป็นคำตอบที่ถูกต้องเสมอ
  const handleRandomQuestion = () => {
    const nextLockedSlots = getRandomLockedSlots();
    setLockedSlots(nextLockedSlots);
    setChains(createQuestionChains(nextLockedSlots));
    setShowPanel(false);
  };

  // Check if all slots are filled
  const isComplete = () => {
    for (let row of chains) {
      for (let item of row) {
        if (item === "") return false;
      }
    }
    return true;
  };

  // Get image path
  const getImage = (name) => {
    const animal = animals.find(a => a.name === name);
    return animal ? animal.img : "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-100 via-green-100 to-lime-100 font-sans relative overflow-hidden">
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200 rounded-full filter blur-3xl opacity-40"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-lime-200 rounded-full filter blur-3xl opacity-30"></div>
      </div>

      {/* Sun decoration - Enhanced */}
      <div className="absolute top-8 right-16 animate-pulse">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full shadow-2xl 
            border-4 border-yellow-200 flex items-center justify-center text-5xl transform hover:rotate-12 
            transition-transform duration-300">
            ☀️
          </div>
          <div className="absolute -inset-2 bg-yellow-200 rounded-full filter blur-xl opacity-50 -z-10"></div>
        </div>
      </div>

      {/* Floating clouds */}
      <div className="absolute top-20 left-8 opacity-20 text-7xl">☁️</div>
      <div className="absolute bottom-20 right-20 opacity-20 text-8xl">☁️</div>

      {/* Title - Enhanced */}
      <div className="pt-8 text-center relative z-10">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-green-400 rounded-2xl filter blur-lg opacity-50"></div>
          <div className="relative bg-gradient-to-r from-green-300 via-green-400 to-green-300 
            px-10 py-5 rounded-3xl text-2xl font-bold shadow-2xl border-4 border-white
            text-white transform hover:scale-105 transition-transform duration-300">
            🌿 สร้างห่วงโซ่อาหารโดยเรียงลำดับการกินของสิ่งมีชีวิต 🌿
          </div>
        </div>
      </div>

      {/* Food Chains - Enhanced Cards */}
      <div className="mt-12 ml-10 space-y-6 relative z-10">
        {chains.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center gap-6">
            <div className="w-32 text-2xl font-bold text-white bg-gradient-to-r from-green-600 to-green-500 
              py-4 px-4 rounded-2xl shadow-lg text-center border-2 border-white transform hover:scale-105 
              transition-transform duration-300">
              🌟 โซ่ {rowIndex + 1}
            </div>
            <div className="flex gap-4">
              {row.map((item, colIndex) => (
                <div
                  key={colIndex}
                  onClick={() => handleSlotClick(rowIndex, colIndex)}
                  className={`w-48 h-32 bg-white rounded-2xl shadow-xl 
                    flex items-center justify-center cursor-pointer
                    transform hover:scale-105 transition-all duration-300
                    ${isLocked(rowIndex, colIndex) 
                      ? 'border-4 border-gray-400 bg-gradient-to-br from-gray-100 to-gray-200 cursor-not-allowed opacity-80' 
                      : 'border-4 border-yellow-400 hover:border-yellow-500 bg-gradient-to-br from-amber-50 to-yellow-50'}`}
                >
                  {item ? (
                    <div className="text-center">
                      <img src={getImage(item)} className="w-24 h-24 object-contain mx-auto" alt={item} />
                      <div className="text-sm mt-1 font-medium text-gray-600">{item}</div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <span className="text-6xl text-yellow-400">❓</span>
                      <div className="text-sm mt-1 text-gray-400">คลิกเพื่อเลือก</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selection Panel Modal - Enhanced with colored cards */}
      {showPanel && (
        <div
          className="fixed inset-0 z-50 bg-gradient-to-b from-emerald-200 via-green-100 to-lime-100 overflow-y-auto"
          onClick={() => setShowPanel(false)}
        >
          <div className="min-h-full w-full flex items-start justify-center p-4 sm:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="w-full max-w-6xl bg-gradient-to-b from-green-300 via-green-200 to-emerald-200 rounded-2xl shadow-2xl border-4 border-green-100 p-4 sm:p-6 md:p-8">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-green-500 rounded-lg filter blur-md opacity-50"></div>
                  <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 rounded-lg text-xl sm:text-2xl font-bold text-white border-2 border-green-100 shadow-lg">
                    เลือกสิ่งมีชีวิต
                  </div>
                </div>

                <button
                  onClick={() => setShowPanel(false)}
                  className="px-4 py-2 rounded-lg bg-white/80 border-2 border-green-300 text-green-700 font-bold hover:bg-white"
                >
                  ปิด
                </button>
              </div>

              {/* Animal Grid - Square Green Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <button
                  onClick={handleClearActiveSlot}
                  className="aspect-square bg-white/90 rounded-md p-4 border-2 border-red-200
                    hover:border-red-400 hover:bg-red-50 transition-all duration-200
                    flex flex-col items-center justify-center"
                >
                  <span className="text-5xl mb-2">🧹</span>
                  <span className="text-base font-bold text-red-600">ลบคำตอบ</span>
                </button>

                {animals.map((animal, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectAnimal(animal)}
                    className="aspect-square bg-green-50 rounded-md p-4 cursor-pointer
                      border-2 border-green-300 shadow-md hover:shadow-xl
                      hover:border-green-500 hover:bg-green-100 transition-all duration-200
                      flex flex-col items-center justify-center"
                  >
                    <div className="bg-white rounded-md p-2 w-full h-[68%] flex items-center justify-center">
                      <img
                        src={animal.img}
                        className="w-24 h-24 mx-auto object-contain"
                        alt={animal.name}
                      />
                    </div>
                    <span className="mt-2 text-base font-bold text-gray-700 text-center">{animal.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Action Buttons */}
      {!showPanel && (
      <>
        <button
          onClick={handleRandomQuestion}
          className="fixed top-6 left-6 z-[60] bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4
            rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl 
            transition-all duration-300 border-4 border-purple-300
            transform hover:scale-105
            flex items-center gap-2"
        >
          <span className="text-2xl">🎲</span>
          สุ่มโจทย์
        </button>

        <div className="fixed bottom-8 right-8 flex gap-3 z-[60]">
        <button
          onClick={() => navigate(-1)}
          className="bg-gradient-to-r from-sky-600 to-blue-600 text-white px-5 py-2.5 
            rounded-full text-base font-bold shadow-xl hover:shadow-2xl 
            transition-all duration-300 border-2 border-sky-300
            transform hover:scale-105
            flex items-center gap-2"
        >
          <span className="text-lg">←</span>
          ย้อนกลับ
        </button>

        <button
          onClick={() => {
            if (!isComplete()) {
              alert("กรุณาทำให้ครบก่อน");
              return;
            }
            navigate("/p5/life/foodchain/sim", { state: { chains } });
          }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-2.5 
            rounded-full text-base font-bold shadow-xl hover:shadow-2xl 
            transition-all duration-300 border-2 border-green-300
            transform hover:scale-105 hover:-translate-y-0.5
            flex items-center gap-2"
        >
          <span className="text-lg">➡️</span>
          ต่อไป
        </button>
        </div>
      </>
      )}
    </div>
  );
}
