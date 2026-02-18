import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";
import { useEffect, useRef } from "react";

export default function P5FoodChainSteps() {
  const navigate = useNavigate();
  const audioCtxRef = useRef(null);

  const steps = [
    "สำรวจสิ่งมีชีวิตในระบบนิเวศ",
    "จำแนกสิ่งมีชีวิตออกเป็นกลุ่ม ผู้ผลิตและผู้บริโภค",
    "สร้างห่วงโซ่อาหาร",
    "บันทึกผลการทดลอง",
  ];

  // สร้าง Audio Context ตอนหน้าโหลด
  useEffect(() => {
    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();

    // เล่นเสียงพื้นหลังเบา ๆ (ambient tone)
    const playBackground = () => {
      const ctx = audioCtxRef.current;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = 120; // โทนต่ำ นุ่ม ๆ
      gain.gain.value = 0.02; // เบามาก

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start();
    };

    playBackground();

    return () => {
      audioCtxRef.current.close();
    };
  }, []);

  // ฟังก์ชันเสียง "คลิก"
  const playClick = () => {
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

  return (
    <LabLayout title="ขั้นตอนการทดลอง">
      <div className="relative min-h-[80vh] flex flex-col items-center bg-gradient-to-b from-green-50 to-green-100 overflow-hidden">

        {/* ดวงอาทิตย์ */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full shadow-lg" />

        {/* พื้นหญ้า */}
        <div className="absolute bottom-0 w-full h-32 bg-green-500" />

        {/* รั้วไม้ */}
        <div className="absolute bottom-0 w-full flex justify-between px-8 opacity-80">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-12 h-8 bg-orange-700 rounded-t-lg" />
          ))}
        </div>

        {/* กล่องหัวเรื่อง */}
        <div className="bg-green-300 px-10 py-3 rounded-xl shadow-lg mt-6 mb-8">
          <h1 className="text-2xl font-bold text-black">
            ขั้นตอนการทดลอง
          </h1>
        </div>

        <div className="bg-white border-4 border-black rounded-2xl p-6 shadow-xl w-[80%] max-w-3xl z-10">
          <div className="space-y-4">
            {steps.map((text, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl border border-gray-300"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white font-bold">
                  {index + 1}
                </div>
                <span className="text-lg font-semibold">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ปุ่มเริ่มการทดลอง */}
        <button
          onClick={() => {
            playClick();
            navigate("/p5/life/foodchain/select");
          }}
          className="mt-8 bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg
                     hover:bg-blue-600 transition z-10"
        >
          ▶ เริ่มการทดลอง
        </button>

        {/* ปุ่มภาษา + เสียง */}
        <div className="absolute bottom-6 left-6 flex gap-2">
          <button onClick={playClick} className="bg-blue-200 px-4 py-2 rounded-full">ไทย</button>
          <button onClick={playClick} className="bg-blue-200 px-4 py-2 rounded-full">อังกฤษ</button>
          <button onClick={playClick} className="bg-blue-200 px-4 py-2 rounded-full">มลายู</button>
          <button onClick={playClick} className="bg-blue-400 px-4 py-2 rounded-full">🔊</button>
        </div>
      </div>
    </LabLayout>
  );
}
