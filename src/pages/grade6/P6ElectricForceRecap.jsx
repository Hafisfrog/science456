import { useNavigate } from "react-router-dom";

export default function P6ElectricForceRecap() {
  const navigate = useNavigate();

  const pageBg = {
    background:
      "radial-gradient(circle at 12% 14%, rgba(255, 255, 255, 0.75), transparent 55%), radial-gradient(circle at 92% 18%, rgba(255, 255, 255, 0.55), transparent 52%), repeating-linear-gradient(0deg, transparent 0 26px, rgba(44, 112, 201, 0.06) 26px 27px), repeating-linear-gradient(90deg, transparent 0 26px, rgba(44, 112, 201, 0.06) 26px 27px), linear-gradient(135deg, #e8f7ff, #fff3df)",
  };

  return (
    <div
      className="min-h-screen p-[clamp(20px,4vw,54px)] text-slate-900"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <button
            className="cursor-pointer rounded-2xl bg-white/90 px-[18px] py-3 font-black shadow-[0_14px_24px_rgba(17,24,39,0.12)]"
            type="button"
            onClick={() => navigate("/p6/electric-force/experiments")}
          >
            ← กลับหน้าเลือกการทดลอง
          </button>

          <button
            className="grid h-14 w-14 cursor-pointer place-items-center rounded-[18px] border-2 border-slate-900/30 bg-white/80 shadow-[0_14px_22px_rgba(17,24,39,0.16)]"
            type="button"
            aria-label="sound"
          >
            <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
              <path
                d="M14 26h12l14-10v32l-14-10H14z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M46 22c4 4 4 16 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M52 16c7 7 7 25 0 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="relative grid justify-items-center gap-2 pb-[14px] pt-1.5">
          <div className="absolute left-1/2 top-[54%] h-14 w-[min(560px,88vw)] -translate-x-1/2 -translate-y-1/2 rotate-[-1.4deg] rounded-[18px] bg-gradient-to-r from-[#ffad67] to-[#ff7a57] opacity-90 shadow-[0_18px_28px_rgba(255,107,74,0.24)]" />
          <h1 className="relative z-[1] m-0 text-[clamp(28px,4vw,46px)] font-black leading-[1.05] tracking-[0.3px]">
            สรุปแรงไฟฟ้าน่ารู้
          </h1>
        </div>

        <div className="relative mt-[18px] grid grid-cols-1 items-start gap-[clamp(16px,3vw,26px)] min-[901px]:grid-cols-2">
          <div className="pointer-events-none absolute bottom-[10px] left-1/2 top-[10px] hidden w-2.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/35 to-indigo-500/35 shadow-[0_18px_30px_rgba(17,24,39,0.08)] min-[901px]:block" />

          <section className="relative rounded-[22px] border-2 border-white/80 bg-white/80 p-[clamp(18px,3vw,26px)] shadow-[0_26px_54px_rgba(17,24,39,0.12)] backdrop-blur-[10px]">
            <div className="inline-flex items-center gap-2.5 rounded-full border-2 border-indigo-500/20 bg-indigo-500/10 px-[14px] py-2 font-black">
              การเกิดแรงไฟฟ้า
            </div>

            <div className="mb-2.5 mt-[14px] text-xl font-black">แรงไฟฟ้าคืออะไร?</div>
            <p className="m-0 text-base font-bold leading-[1.7] opacity-95">
              แรงไฟฟ้า คือแรงที่เกิดขึ้นระหว่างวัตถุที่มีประจุไฟฟ้า เมื่อวัตถุมีประจุเหมือนกันจะ “ผลักกัน”
              และเมื่อมีประจุต่างกันจะ “ดึงดูดกัน”
            </p>

            <div className="mb-2.5 mt-[14px] text-xl font-black">ประจุไฟฟ้ามี 2 ชนิด</div>
            <div className="mt-[14px] flex flex-wrap items-center gap-3.5">
              <div
                className="grid h-[54px] w-[54px] place-items-center rounded-full text-[26px] font-black text-[#06204a] shadow-[0_14px_22px_rgba(17,24,39,0.14)]"
                style={{ background: "radial-gradient(circle at 30% 30%, #c7f9ff, #3b82f6)" }}
                aria-label="plus"
              >
                +
              </div>
              <div
                className="grid h-[54px] w-[54px] place-items-center rounded-full text-[26px] font-black text-[#2a0a31] shadow-[0_14px_22px_rgba(17,24,39,0.14)]"
                style={{ background: "radial-gradient(circle at 30% 30%, #ffd1ff, #a21caf)" }}
                aria-label="minus"
              >
                −
              </div>
              <p className="m-0 text-base font-bold leading-[1.7] opacity-95">
                ประจุไฟฟ้าบวก (+) และประจุไฟฟ้าลบ (−)
              </p>
            </div>

            <div className="mb-2.5 mt-[14px] text-xl font-black">เกิดได้อย่างไร?</div>
            <p className="m-0 text-base font-bold leading-[1.7] opacity-95">
              เมื่อ “ขัดถู” วัตถุสองชนิดเข้าด้วยกัน จะเกิดการถ่ายโอนอิเล็กตรอน ทำให้วัตถุหนึ่งมีประจุลบมากขึ้น
              และอีกวัตถุหนึ่งมีประจุบวกมากขึ้น วัตถุจึงไม่เป็นกลางทางไฟฟ้า
            </p>
          </section>

          <section className="relative rounded-[22px] border-2 border-white/80 bg-white/80 p-[clamp(18px,3vw,26px)] shadow-[0_26px_54px_rgba(17,24,39,0.12)] backdrop-blur-[10px]">
            <div
              className="inline-flex items-center gap-2.5 rounded-full border-2 px-[14px] py-2 font-black"
              style={{ background: "rgba(250, 204, 21, 0.14)", borderColor: "rgba(250, 204, 21, 0.2)" }}
            >
              ผลของแรงไฟฟ้าที่เกิดขึ้น
            </div>

            <div className="mt-[14px] grid gap-2.5">
              <div className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-[18px] border-2 border-slate-900/15 bg-sky-100/70 px-[14px] py-3">
                <strong>ประจุต่างกัน</strong>
                <div className="inline-flex flex-wrap items-center gap-2.5" aria-label="opposite-charges">
                  <span
                    className="grid h-[42px] w-[42px] place-items-center rounded-full font-black shadow-[0_14px_22px_rgba(17,24,39,0.12)]"
                    style={{ background: "radial-gradient(circle at 30% 30%, #c7f9ff, #3b82f6)" }}
                  >
                    +
                  </span>
                  <span style={{ fontWeight: 1000 }}>ดึงดูดกัน</span>
                  <span
                    className="grid h-[42px] w-[42px] place-items-center rounded-full font-black shadow-[0_14px_22px_rgba(17,24,39,0.12)]"
                    style={{ background: "radial-gradient(circle at 30% 30%, #ffd1ff, #a21caf)" }}
                  >
                    −
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-[18px] border-2 border-slate-900/15 bg-sky-100/70 px-[14px] py-3">
                <strong>ประจุเหมือนกัน</strong>
                <div className="inline-flex flex-wrap items-center gap-2.5" aria-label="same-charges">
                  <span
                    className="grid h-[42px] w-[42px] place-items-center rounded-full font-black shadow-[0_14px_22px_rgba(17,24,39,0.12)]"
                    style={{ background: "radial-gradient(circle at 30% 30%, #c7f9ff, #3b82f6)" }}
                  >
                    +
                  </span>
                  <span
                    className="grid h-[42px] w-[42px] place-items-center rounded-full font-black shadow-[0_14px_22px_rgba(17,24,39,0.12)]"
                    style={{ background: "radial-gradient(circle at 30% 30%, #c7f9ff, #3b82f6)" }}
                  >
                    +
                  </span>
                  <span style={{ fontWeight: 1000 }}>ผลักกัน</span>
                  <span
                    className="grid h-[42px] w-[42px] place-items-center rounded-full font-black shadow-[0_14px_22px_rgba(17,24,39,0.12)]"
                    style={{ background: "radial-gradient(circle at 30% 30%, #ffd1ff, #a21caf)" }}
                  >
                    −
                  </span>
                  <span
                    className="grid h-[42px] w-[42px] place-items-center rounded-full font-black shadow-[0_14px_22px_rgba(17,24,39,0.12)]"
                    style={{ background: "radial-gradient(circle at 30% 30%, #ffd1ff, #a21caf)" }}
                  >
                    −
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-2.5 mt-[14px] text-xl font-black">สรุปจากการทดลอง</div>
            <p className="m-0 text-base font-bold leading-[1.7] opacity-95">
              - ขัดถูลูกโป่งทั้ง 2 ใบด้วยกระดาษเยื่อ: ลูกโป่งมีประจุเหมือนกัน → ผลักกัน
              <br />
              - ขัดถูลูกโป่งแค่ 1 ใบ: อีกใบถูกเหนี่ยวนำให้ประจุแยกตัว → ดึงดูดกัน
            </p>
          </section>
        </div>

        <div className="mt-[clamp(18px,3vw,26px)] grid grid-cols-1 gap-3">
          <div className="rounded-[22px] border-2 border-green-500/20 bg-green-500/10 px-[18px] py-4 shadow-[0_22px_44px_rgba(17,24,39,0.1)]">
            <div className="mb-2.5 mt-0 text-xl font-black">
              ตัวอย่างในชีวิตประจำวัน
            </div>
            <p className="m-0 text-base font-bold leading-[1.7] opacity-95">
              หวีผมด้วยหวีพลาสติกแล้วนำไปใกล้เศษกระดาษ → เศษกระดาษถูกดึงดูดเข้าหาหวี
            </p>
          </div>
        </div>

        <div className="mt-[18px] flex flex-wrap justify-between gap-3">
          <button
            className="cursor-pointer rounded-2xl bg-white/95 px-[18px] py-3 font-black text-slate-900 shadow-[0_16px_28px_rgba(17,24,39,0.14)] transition hover:-translate-y-0.5"
            type="button"
            onClick={() => navigate("/p6/electric-force/vocab")}
          >
            ← กลับคำศัพท์
          </button>
          <button
            className="cursor-pointer rounded-2xl bg-blue-600 px-[18px] py-3 font-black text-white shadow-[0_16px_28px_rgba(17,24,39,0.14)] transition hover:-translate-y-0.5"
            type="button"
            onClick={() => navigate("/p6/experiment/electric-generation/materials?from=unit")}
          >
            ไปทดลองที่ 1 →
          </button>
        </div>
      </div>
    </div>
  );
}
