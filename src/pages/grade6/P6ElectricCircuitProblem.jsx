import { useNavigate } from "react-router-dom";

export default function P6ElectricCircuitProblem() {
  const navigate = useNavigate();

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-5 pt-3 text-slate-900 md:px-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(110px,10vw,180px)] top-[10px] h-[clamp(96px,10vw,136px)] w-[clamp(60px,6vw,92px)] bg-[#f7bd2b]"
        style={{
          clipPath:
            "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
        }}
      />

      <div className="relative z-[1] mx-auto grid h-full w-full max-w-[1380px] grid-rows-[auto_auto_1fr_auto] gap-2">
        <div className="inline-flex w-fit items-center rounded-full bg-gradient-to-br from-[#6bc3f0] to-[#4c9ee1] px-[18px] py-2 text-base font-black text-white shadow-[0_12px_22px_rgba(16,24,39,0.14)]">
          วงจรไฟฟ้าใกล้ตัว
        </div>
        <div className="m-0 text-[clamp(32px,2.5vw,54px)] font-black leading-[1.08]">
          เรื่อง วงจรไฟฟ้าอย่างง่าย
        </div>

        <div className="relative min-h-0 overflow-hidden rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] p-[clamp(14px,1.6vw,20px)] pr-[clamp(68px,10vw,116px)] shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <div className="pointer-events-none absolute bottom-[-120px] right-[-100px] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.3),rgba(255,255,255,0))]" />

          <div
            className="absolute right-[22px] top-3 grid h-[52px] w-[52px] place-items-center rounded-2xl border-2 border-slate-900/40 bg-white/75 text-slate-800 shadow-[0_10px_18px_rgba(17,24,39,0.16)]"
            title="ฟังเสียง"
            aria-hidden="true"
          >
            <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
              <path
                d="M12 26h12l14-10v32l-14-10H12z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M44 22c4 4 4 16 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M50 16c7 7 7 25 0 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 gap-4 min-[1001px]:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)]">
            <div className="grid min-h-0 grid-rows-[auto_auto] gap-3">
              <section className="rounded-[18px] border-2 border-white/85 bg-white/75 px-4 py-[14px] shadow-[0_12px_20px_rgba(15,23,42,0.1)]">
                <h2 className="mb-1.5 mt-0 text-[clamp(22px,1.8vw,32px)] font-black leading-[1.1] text-slate-900">
                  สถานการณ์ปัญหา
                </h2>
                <p className="m-0 text-[clamp(18px,1.2vw,24px)] font-semibold leading-[1.38] text-slate-800">
                  ระหว่างทำกิจกรรมไฟฟ้าในห้องเรียน นักเรียนพบว่าเมื่อเพิ่มจำนวนถ่านไฟฉายที่ต่อในวงจร
                  ความสว่างของหลอดไฟดูเหมือนจะเปลี่ยนไป แต่ยังไม่มีใครสรุปได้ชัดเจนว่ามีความสัมพันธ์อย่างไร
                </p>
              </section>

              <section className="rounded-[18px] border-2 border-dashed border-blue-700/40 bg-white/75 px-4 py-[14px] shadow-[0_12px_20px_rgba(15,23,42,0.1)]">
                <div className="mb-2 inline-flex items-center rounded-full bg-blue-700/15 px-3 py-1.5 text-[clamp(18px,1.3vw,24px)] font-black text-blue-900">
                  คำถามตั้งต้น
                </div>
                <p className="m-0 text-[clamp(21px,1.45vw,30px)] font-black leading-[1.25] text-slate-900">
                  จำนวนถ่านไฟฉายที่เรียงต่อกัน มีผลต่อความสว่างของหลอดไฟฟ้าอย่างไร?
                </p>
                <ul className="mb-0 ml-[18px] mt-2.5 grid gap-1 p-0 max-[720px]:ml-4">
                  <li className="text-[clamp(17px,1.06vw,21px)] font-semibold leading-[1.35] text-slate-800">
                    ถ้าใช้ถ่าน 2 ก้อน กับ 4 ก้อน ความสว่างจะต่างกันหรือไม่
                  </li>
                  <li className="text-[clamp(17px,1.06vw,21px)] font-semibold leading-[1.35] text-slate-800">
                    เราจะออกแบบการทดลองอย่างไรเพื่อพิสูจน์คำตอบ
                  </li>
                </ul>
              </section>
            </div>

            <aside className="grid min-h-0 items-end justify-items-center gap-2 [grid-template-rows:auto_1fr_auto] max-[1000px]:[grid-template-rows:auto_auto_auto]">
              <div className="relative max-w-[92%] rounded-[18px] border-2 border-slate-800/20 bg-white/90 px-3 py-2.5 text-[clamp(16px,1.02vw,20px)] font-extrabold leading-[1.28] text-slate-900 shadow-[0_10px_18px_rgba(15,23,42,0.14)]">
                หนูสงสัยว่า... ทำไมพอเพิ่มถ่านแล้วหลอดไฟถึงสว่างขึ้น?
                <span
                  className="absolute bottom-[-10px] left-1/2 h-4 w-4 -translate-x-1/2 border-b-2 border-r-2 border-slate-800/20 bg-white/90"
                  style={{ transform: "translateX(-50%) rotate(45deg)" }}
                />
              </div>
              <img
                src="/images/p4/exp1/character-boy.png"
                alt="นักเรียนตั้งคำถาม"
                className="max-h-full w-[min(100%,260px)] object-contain max-[1000px]:w-[min(100%,230px)]"
                style={{ filter: "drop-shadow(0 14px 18px rgba(15, 23, 42, 0.24))" }}
              />
              <div className="rounded-full bg-white/80 px-3 py-1 text-sm font-bold text-slate-800">
                เด็กนักเรียนตั้งคำถาม
              </div>
            </aside>
          </div>
        </div>

        <div className="mt-1 flex flex-nowrap justify-end gap-2">
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-[28px] font-black leading-none text-slate-900 shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
            onClick={() => navigate("/p6/electric-circuit/experiments")}
            type="button"
            aria-label="กลับหน้าเลือกการทดลอง"
            title="กลับหน้าเลือกการทดลอง"
          >
            ←
          </button>
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-blue-600 text-[28px] font-black leading-none text-white shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
            onClick={() => navigate("/p6/electric-circuit/materials")}
            type="button"
            aria-label="ไปหน้าอุปกรณ์"
            title="ไปหน้าอุปกรณ์"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
