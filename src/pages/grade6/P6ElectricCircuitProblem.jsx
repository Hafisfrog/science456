import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";

export default function P6ElectricCircuitProblem() {

  const navigate = useNavigate();

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg,#c8deeb 0%,#d7e8f1 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden px-6 pt-6 pb-6"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <HomeButton />


      {/* Lightning */}
      <div
        className="absolute right-[150px] top-[10px] h-[120px] w-[80px] bg-[#f7bd2b]"
        style={{
          clipPath:
            "polygon(42% 0,100% 0,66% 44%,84% 44%,20% 100%,42% 57%,21% 57%)",
        }}
      />

      <div className="mx-auto max-w-[1380px] grid grid-rows-[auto_auto_1fr_auto] gap-4">

        {/* Badge */}
        <div className="inline-flex w-fit rounded-full bg-gradient-to-br from-[#55c6ff] to-[#3f92e6] px-5 py-2 text-white font-black shadow-lg">
          วงจรไฟฟ้าใกล้ตัว
        </div>

        {/* Title */}
        <h1 className="text-[clamp(32px,3vw,56px)] font-black leading-tight">
          เรื่อง วงจรไฟฟ้าอย่างง่าย
        </h1>

        {/* Main Card */}
        <div className="relative rounded-[30px] bg-gradient-to-br from-[#77d4f4] via-[#80d9f6] to-[#69c2e6] p-6 shadow-[0_25px_40px_rgba(0,0,0,0.18)] border border-white/40 backdrop-blur">

          <div className="grid gap-6 min-[1001px]:grid-cols-[1.4fr_0.6fr]">

            {/* LEFT CONTENT */}
            <div className="flex flex-col gap-5">

              {/* Situation */}
              <div className="rounded-2xl bg-white/85 p-5 shadow-lg border border-white">
                <h2 className="text-[28px] font-black mb-2">
                  สถานการณ์ปัญหา
                </h2>

                <p className="text-[20px] leading-relaxed font-semibold text-slate-800">
                  ระหว่างทำกิจกรรมไฟฟ้าในห้องเรียน นักเรียนพบว่าเมื่อเพิ่มจำนวนถ่านไฟฉายที่ต่อในวงจร
                  ความสว่างของหลอดไฟดูเหมือนจะเปลี่ยนไป
                  แต่ยังไม่มีใครสรุปได้ชัดเจนว่ามีความสัมพันธ์อย่างไร
                </p>
              </div>

              {/* Question */}
              <div className="rounded-2xl bg-white/90 p-5 shadow-lg border-2 border-dashed border-blue-400">

                <div className="inline-block mb-3 px-4 py-1 rounded-full bg-blue-100 text-blue-900 font-black text-[20px]">
                  คำถามตั้งต้น
                </div>

                <p className="text-[24px] font-black leading-snug mb-3">
                  จำนวนถ่านไฟฉายที่เรียงต่อกัน
                  มีผลต่อความสว่างของหลอดไฟฟ้าอย่างไร?
                </p>

                <ul className="list-disc ml-6 text-[18px] font-semibold text-slate-800 space-y-1">
                  <li>ถ้าใช้ถ่าน 2 ก้อน กับ 4 ก้อน ความสว่างจะต่างกันหรือไม่</li>
                  <li>เราจะออกแบบการทดลองอย่างไรเพื่อพิสูจน์คำตอบ</li>
                </ul>

              </div>

            </div>

            {/* RIGHT CHARACTER */}
            <div className="flex flex-col items-center justify-end gap-3">

              {/* Speech Bubble */}
              <div className="relative bg-white rounded-xl px-4 py-3 text-[18px] font-bold shadow-lg border">
                สงสัยไหมว่า... ทำไมพอเพิ่มถ่านแล้วหลอดไฟถึงสว่างขึ้น?

                <span
                  className="absolute bottom-[-10px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white border-b border-r"
                />
              </div>

              {/* Character */}
              <img
                src="/images/p4/exp1/character-boy.png"
                alt="student"
                className="w-[240px] drop-shadow-[0_20px_25px_rgba(0,0,0,0.3)]"
              />

              <div className="bg-white/80 rounded-full px-4 py-1 text-sm font-bold">
                เด็กนักเรียนตั้งคำถาม
              </div>

            </div>

          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3">

          <button
            onClick={() => navigate("/p6/electric-circuit/experiments")}
            className="h-16 w-16 rounded-2xl bg-white text-3xl shadow-lg hover:scale-105 transition"
          >
            ←
          </button>

          <button
            onClick={() => navigate("/p6/electric-circuit/materials")}
            className="h-16 w-16 rounded-2xl bg-blue-600 text-white text-3xl shadow-lg hover:scale-105 transition"
          >
            →
          </button>

        </div>

      </div>
    </div>
  );
}