import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const CHAIN_ACCENTS = [
  "from-emerald-500 via-green-500 to-lime-400",
  "from-sky-500 via-cyan-500 to-blue-500",
  "from-amber-500 via-orange-500 to-yellow-400",
  "from-fuchsia-500 via-pink-500 to-rose-500",
  "from-teal-500 via-emerald-500 to-cyan-500"
];

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

  const totalEditableSlots = ANSWER_CHAINS.reduce(
    (count, row) => count + row.length,
    0
  ) - lockedSlots.size;
  const filledEditableSlots = chains.reduce(
    (count, row, rowIndex) =>
      count + row.filter((item, colIndex) => !isLocked(rowIndex, colIndex) && item).length,
    0
  );
  const activeSlotSummary =
    activeSlot.row !== null && activeSlot.col !== null
      ? `โซ่อาหาร ${activeSlot.row + 1} ช่องที่ ${activeSlot.col + 1}`
      : "";
  const isComplete = chains.every((row) => row.every(Boolean));

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

  const handleRevealRowAnswer = (rowIndex) => {
    setChains((prev) =>
      prev.map((row, index) => (index === rowIndex ? [...ANSWER_CHAINS[rowIndex]] : row))
    );
    setShowPanel(false);
  };

  const handleGoToAnswers = () => {
    if (!isComplete) {
      window.alert("กรุณาเติมคำตอบให้ครบทุกช่องก่อน");
      return;
    }

    navigate("/p5/life/foodchain/sim", { state: { chains } });
  };


  // Get image path
  const getImage = (name) => {
    const animal = animals.find(a => a.name === name);
    return animal ? animal.img : "";
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[url('/images/p5/back.png')] bg-cover bg-center bg-no-repeat font-sans">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-950/25 via-emerald-700/10 to-slate-950/15" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-12 top-10 h-56 w-56 rounded-full bg-lime-200/45 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-cyan-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-200/35 blur-3xl" />
      </div>

      <div className="pointer-events-none absolute right-8 top-8 hidden text-7xl opacity-85 sm:block">☀️</div>
      <div className="pointer-events-none absolute left-8 top-24 hidden text-6xl opacity-30 lg:block">☁️</div>
      <div className="pointer-events-none absolute bottom-16 right-16 hidden text-7xl opacity-25 lg:block">☁️</div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-emerald-50/80 bg-gradient-to-br from-white/62 via-emerald-50/52 to-lime-50/58 p-5 shadow-[0_22px_60px_rgba(15,23,42,0.14)] backdrop-blur-md sm:p-7">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm">
                กิจกรรมฝึกเรียงลำดับห่วงโซ่อาหาร
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                สร้างห่วงโซ่อาหารโดยเรียงลำดับการกินของสิ่งมีชีวิต
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                คลิกช่องที่ยังว่างเพื่อเลือกสิ่งมีชีวิตให้ถูกตำแหน่ง จากนั้นตรวจคำตอบต่อในขั้นถัดไปได้เหมือนเดิม
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-sm font-medium">
                <div className="rounded-full border border-slate-200/70 bg-white/55 px-3 py-1.5 text-slate-700 backdrop-blur-sm">
                  ช่องสีเทา = ช่องใบ้
                </div>
                <div className="rounded-full border border-amber-200/80 bg-amber-50/70 px-3 py-1.5 text-amber-700 backdrop-blur-sm">
                  ช่องสีครีม = ช่องให้เติม
                </div>
                <div className="rounded-full border border-sky-200/80 bg-sky-50/70 px-3 py-1.5 text-sky-700 backdrop-blur-sm">
                  ปุ่มเฉลย = เปิดคำตอบทั้งแถว
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:w-[23rem]">
              <div className="rounded-[28px] border border-emerald-200/80 bg-gradient-to-br from-white/70 to-emerald-100/72 p-4 shadow-sm backdrop-blur-sm">
                <div className="text-sm font-semibold text-emerald-700">ความคืบหน้า</div>
                <div className="mt-1 text-3xl font-black text-emerald-900">
                  {filledEditableSlots}/{totalEditableSlots}
                </div>
                <p className="mt-1 text-sm text-emerald-800/80">จำนวนช่องที่เติมแล้วจากช่องที่ต้องตอบ</p>
              </div>

              <div className="rounded-[28px] border border-sky-200/80 bg-gradient-to-br from-white/70 to-cyan-100/75 p-4 shadow-sm backdrop-blur-sm">
                <div className="text-sm font-semibold text-sky-700">ช่องใบ้เริ่มต้น</div>
                <div className="mt-1 text-3xl font-black text-sky-900">{lockedSlots.size}</div>
                <p className="mt-1 text-sm text-sky-800/80">จำนวนช่องที่ระบบเปิดคำตอบไว้ให้</p>
              </div>

              <button
                type="button"
                onClick={handleRandomQuestion}
                className="inline-flex items-center justify-center gap-2 rounded-[24px] bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 px-5 py-4 text-base font-bold text-white shadow-[0_14px_28px_rgba(219,39,119,0.28)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(219,39,119,0.35)] sm:col-span-2"
              >
                <span className="text-xl">🎲</span>
                สุ่มโจทย์ใหม่
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {chains.map((row, rowIndex) => {
            const editableCount = row.filter((_, colIndex) => !isLocked(rowIndex, colIndex)).length;
            const filledCount = row.filter((item, colIndex) => !isLocked(rowIndex, colIndex) && item).length;
            const isRowComplete = row.every(Boolean);
            const accent = CHAIN_ACCENTS[rowIndex % CHAIN_ACCENTS.length];

            return (
              <div
                key={rowIndex}
                className="rounded-[30px] border border-emerald-50/85 bg-gradient-to-r from-white/62 via-white/54 to-emerald-50/58 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:p-5"
              >
                <div className="flex flex-col gap-4 2xl:flex-row 2xl:items-center">
                  <div
                    className={`inline-flex w-fit items-center rounded-[22px] bg-gradient-to-r ${accent} px-5 py-3 text-lg font-extrabold text-white shadow-lg`}
                  >
                    โซ่อาหาร {rowIndex + 1}
                  </div>

                  <div className="flex flex-1 flex-wrap items-center gap-3">
                    {row.map((item, colIndex) => {
                      const locked = isLocked(rowIndex, colIndex);

                      return (
                        <div key={colIndex} className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleSlotClick(rowIndex, colIndex)}
                            disabled={locked}
                            className={`group relative flex h-32 w-[10.75rem] flex-col items-center justify-center overflow-hidden rounded-[26px] border text-center shadow-[0_10px_24px_rgba(15,23,42,0.1)] transition duration-200 sm:h-36 sm:w-[11.5rem] ${
                              locked
                                ? "cursor-not-allowed border-slate-300/90 bg-gradient-to-br from-slate-100/90 to-slate-200/85 opacity-95"
                                : item
                                  ? "border-emerald-300/90 bg-gradient-to-br from-white/92 to-emerald-50/85 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-[0_16px_30px_rgba(16,185,129,0.18)]"
                                  : "border-amber-300/90 bg-gradient-to-br from-white/88 to-amber-50/80 hover:-translate-y-1 hover:border-amber-500 hover:shadow-[0_16px_30px_rgba(245,158,11,0.18)]"
                            }`}
                          >
                            <div
                              className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold ${
                                locked
                                  ? "bg-slate-700 text-white"
                                  : item
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {locked ? "โจทย์" : item ? "เลือกแล้ว" : "เติมคำตอบ"}
                            </div>

                            {item ? (
                              <div className="px-3">
                                <img
                                  src={getImage(item)}
                                  className="mx-auto h-20 w-20 object-contain drop-shadow-[0_10px_20px_rgba(15,23,42,0.14)] sm:h-24 sm:w-24"
                                  alt={item}
                                />
                                <div className="mt-2 text-sm font-bold text-slate-700">{item}</div>
                              </div>
                            ) : (
                              <div className="px-3 text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/80 text-4xl text-amber-500 shadow-inner">
                                  +
                                </div>
                                <div className="mt-3 text-sm font-semibold text-amber-700">คลิกเพื่อเลือก</div>
                              </div>
                            )}
                          </button>

                          {colIndex < row.length - 1 && (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200/85 bg-emerald-50/75 text-xl font-black text-emerald-700 shadow-sm backdrop-blur-sm">
                              →
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 2xl:justify-end">
                    <div
                      className={`rounded-full px-4 py-2 text-sm font-bold ${
                        isRowComplete
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {isRowComplete ? "เติมครบแล้ว" : `เติมแล้ว ${filledCount}/${editableCount} ช่อง`}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRevealRowAnswer(rowIndex)}
                      className="inline-flex items-center justify-center rounded-full border border-sky-200/85 bg-white/82 px-5 py-2.5 text-sm font-bold text-sky-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-sky-400 hover:bg-sky-50"
                    >
                      เฉลยทั้งแถว
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-3 pb-2 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/p5/life/foodchain/steps")}
            className="inline-flex items-center justify-center rounded-full border border-slate-300/90 bg-white/78 px-6 py-3 text-base font-bold text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.08)] backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white/90"
          >
            ← ย้อนกลับ
          </button>
          <button
            type="button"
            onClick={handleGoToAnswers}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 text-base font-bold text-white shadow-[0_14px_28px_rgba(22,163,74,0.24)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(22,163,74,0.3)]"
          >
            ไปดูเฉลยทั้งหมด →
          </button>
        </div>
      </div>

      {showPanel && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/45 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setShowPanel(false)}
        >
          <div className="flex min-h-full items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-full max-w-6xl rounded-[32px] border border-white/75 bg-gradient-to-br from-white/95 via-lime-50/92 to-emerald-100/88 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.3)] backdrop-blur-md sm:p-7">
              <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
                    เลือกสิ่งมีชีวิต
                  </div>
                  <h2 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                    เติมคำตอบลงใน {activeSlotSummary}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 sm:text-base">
                    แตะการ์ดด้านล่างเพื่อใส่คำตอบ หรือเลือกปุ่มลบเพื่อล้างช่องที่กำลังเลือก
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPanel(false)}
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/85 px-5 py-2.5 font-bold text-slate-700 shadow-sm transition hover:bg-white"
                >
                  ปิด
                </button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <button
                  type="button"
                  onClick={handleClearActiveSlot}
                  className="flex aspect-square flex-col items-center justify-center rounded-[24px] border border-red-200 bg-gradient-to-br from-red-50 to-rose-100 p-4 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:border-red-400 hover:shadow-[0_14px_28px_rgba(244,63,94,0.18)]"
                >
                  <span className="mb-3 text-5xl">🧹</span>
                  <span className="text-lg font-bold text-red-600">ลบคำตอบ</span>
                  <span className="mt-1 text-sm text-red-500">เคลียร์ช่องที่เลือก</span>
                </button>

                {animals.map((animal, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelectAnimal(animal)}
                  className="group relative aspect-square overflow-hidden rounded-[24px] border border-emerald-200/90 bg-white/82 p-4 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-[0_16px_32px_rgba(16,185,129,0.18)]"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br opacity-20 ${animal.color}`} />
                    <div className="relative flex h-full w-full flex-col items-center justify-center">
                      <div className="flex h-[68%] w-full items-center justify-center rounded-[18px] bg-white/55 p-2">
                        <img
                          src={animal.img}
                          className="mx-auto h-24 w-24 object-contain drop-shadow-[0_10px_18px_rgba(15,23,42,0.18)] transition duration-200 group-hover:scale-105"
                          alt={animal.name}
                        />
                      </div>
                      <span className="mt-3 text-base font-bold text-slate-700">{animal.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

