import { useNavigate } from "react-router-dom";

const STEPS = [
  {
    title: "ออกแบบการต่อวงจร",
    detail: "ออกแบบการต่อหลอดไฟฟ้า 2 แบบ คือแบบอนุกรมและแบบขนาน",
  },
  {
    title: "คาดคะเนผล",
    detail: "หากถอดหลอดไฟหนึ่งดวงออกจากวงจรแต่ละแบบ จะเกิดผลอย่างไร",
  },
  {
    title: "ทดลองและบันทึกผล",
    detail: "ทดลองต่อวงจรจริง สังเกตความสว่างของหลอดไฟ และบันทึกผลที่พบ",
  },
];

export default function P6ElectricCircuitBulbSeriesParallelSteps() {
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
          การต่อหลอดไฟฟ้าแบบอนุกรมและแบบขนาน
        </div>

        <div className="relative min-h-0 overflow-y-auto rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] px-[clamp(14px,1.6vw,20px)] pb-[14px] pt-[14px] pr-[clamp(68px,10vw,116px)] shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
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
              <path d="M44 22c4 4 4 16 0 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M50 16c7 7 7 25 0 32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          <div className="grid h-full min-h-0 grid-cols-1 gap-[14px]">
            <div className="rounded-[20px] border-2 border-white/70 bg-[#c5dfef]/45 p-4 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.9)]">
              <div className="mb-3 inline-flex items-center gap-2.5 rounded-full bg-blue-600/15 px-4 py-1.5 font-black text-slate-900">
                ขั้นตอนการทดลอง
              </div>

              <div className="grid gap-3">
                {STEPS.map((step, index) => (
                  <div
                    key={step.title}
                    className="grid grid-cols-[46px_1fr] gap-3 rounded-2xl border border-slate-400/35 bg-white px-[14px] py-3 shadow-[0_10px_18px_rgba(15,23,42,0.1)]"
                  >
                    <div className="grid h-[46px] w-[46px] place-items-center rounded-[14px] bg-gradient-to-br from-amber-200 to-amber-500 text-[32px] font-black text-slate-900 shadow-[0_8px_14px_rgba(15,23,42,0.15)]">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-2xl font-black">{step.title}</div>
                      <div className="mt-0.5 text-[19px] font-semibold text-slate-900">{step.detail}</div>
                    </div>
                  </div>
                ))}
                <div className="mt-1 rounded-[14px] border border-dashed border-slate-900/20 bg-white/85 px-3 py-2.5 text-sm font-bold text-slate-900">
                  เปรียบเทียบผลการทดลองแบบอนุกรมและแบบขนาน แล้วสรุปความแตกต่าง
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-1 flex flex-nowrap justify-end gap-2">
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-[28px] font-black leading-none text-slate-900 shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
            onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel")}
            type="button"
            aria-label="กลับหน้าอุปกรณ์"
            title="กลับหน้าอุปกรณ์"
          >
            ←
          </button>
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-blue-600 text-[28px] font-black leading-none text-white shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
            onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/sim")}
            type="button"
            aria-label="เริ่มทดลอง"
            title="เริ่มทดลอง"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
