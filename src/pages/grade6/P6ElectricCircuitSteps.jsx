import { useNavigate } from "react-router-dom";

const STEPS = [
  "ออกแบบและต่อวงจร: ต่อถ่านไฟฉาย 2 ก้อนแบบอนุกรม แล้วเชื่อมกับหลอดไฟและสวิตช์ให้ครบวงจร",
  "ทดลองและสังเกต: เปิดสวิตช์ สังเกตความสว่างของหลอดไฟ และเปรียบเทียบผล",
  "ทดลองซ้ำ: เปลี่ยนเป็นต่อถ่าน 4 ก้อน แล้วสังเกตความสว่างอีกครั้ง",
  "บันทึกผล: จดบันทึกสิ่งที่สังเกตได้และสรุปความสัมพันธ์ของจำนวนถ่านกับความสว่าง",
];

function speakText(text) {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "th-TH";
  utter.rate = 0.95;

  window.speechSynthesis.speak(utter);
}

export default function P6ElectricCircuitSteps() {
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

        <div className="text-[clamp(32px,2.5vw,54px)] font-black">
          เรื่อง วงจรไฟฟ้าอย่างง่าย
        </div>

        <div className="relative rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] p-[20px] shadow-[0_20px_36px_rgba(17,24,39,0.18)]">

          <section className="rounded-3xl border-2 border-white/50 bg-[rgba(232,223,204,0.96)] p-[18px] shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
            <header className="mb-3">
              <h2 className="text-[clamp(38px,2.8vw,64px)] font-black">
                ขั้นตอนการทดลอง
              </h2>
              <p className="mt-2 text-[18px] font-bold text-slate-700">
                กดที่ลำโพงเพื่อฟังเสียง
              </p>
            </header>

            <ol className="grid list-none gap-3 p-0">
              {STEPS.map((text, index) => (
                <li
                  key={text}
                  className="grid grid-cols-[58px_1fr_auto] items-center gap-3 rounded-full border-[3px] border-slate-700 bg-slate-100 px-[18px] py-2 shadow-[6px_7px_0_rgba(15,23,42,0.18)]"
                >
                  <span className="grid h-[50px] w-[50px] place-items-center rounded-full bg-[#edbe42] text-[38px] font-black text-white">
                    {index + 1}
                  </span>

                  <span className="text-[clamp(21px,1.45vw,30px)] font-black leading-[1.24]">
                    {text}
                  </span>

                  <button
                    onClick={() => speakText(text)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-700 hover:scale-105"
                  >
                    🔊
                  </button>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="h-16 w-16 rounded-[20px] bg-white text-[28px] shadow"
            onClick={() => navigate("/p6/electric-circuit/materials")}
          >
            ←
          </button>

          <button
            className="h-16 w-16 rounded-[20px] bg-blue-600 text-[28px] text-white shadow"
            onClick={() => navigate("/p6/electric-circuit/sim")}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}