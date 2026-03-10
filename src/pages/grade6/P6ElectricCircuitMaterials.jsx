import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const EQUIPMENT = [
  {
    id: "bulb",
    title: "หลอดไฟพร้อมฐาน",
    subtitle: "1 ชุด",
    image: "/images/p6/electric-circuit/bulb-base.svg",
    frameClassName: "border-[#e7b45a] bg-gradient-to-b from-[#fff9de] to-[#fff0b3]",
    imageClassName: "max-w-[92px]",
  },
  {
    id: "wire",
    title: "สายไฟพร้อมหัวหนีบ",
    subtitle: "2 เส้น",
    image: "/images/p6/electric-circuit/wire-clips.svg",
    frameClassName: "border-[#9ed3de] bg-gradient-to-b from-[#f9feff] to-[#ddf4f7]",
    imageClassName: "max-w-[122px]",
  },
  {
    id: "switch",
    title: "สวิตช์",
    subtitle: "1 อัน",
    image: "/images/p6/electric-circuit/switch.svg",
    frameClassName: "border-[#bed8a0] bg-gradient-to-b from-[#fcfff9] to-[#edf8df]",
    imageClassName: "max-w-[92px]",
  },
  {
    id: "holder",
    title: "กระบะใส่ถ่านไฟฉาย",
    subtitle: "สำหรับ 4 ก้อน",
    image: "/images/p6/electric-circuit/battery-holder.svg",
    frameClassName: "border-[#e4c39d] bg-gradient-to-b from-[#fffdf8] to-[#f5e4cc]",
    imageClassName: "max-w-[132px]",
  },
  {
    id: "cell",
    title: "ถ่านไฟฉาย",
    subtitle: "4 ก้อน",
    image: "/images/p6/electric-circuit/batteries.svg",
    frameClassName: "border-[#e3b1bf] bg-gradient-to-b from-[#fffafb] to-[#fde9ef]",
    imageClassName: "max-w-[116px]",
  },
];

function speakText(text) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "th-TH";
  utterance.rate = 0.95;

  window.speechSynthesis.speak(utterance);
}

function EquipmentCard({ item, imageBroken, onImageError, onSpeak }) {
  return (
    <button
      className="group flex min-h-[248px] w-full flex-col items-center justify-start rounded-[30px] px-3 py-2 text-center transition duration-200 hover:-translate-y-1"
      type="button"
      onClick={() => onSpeak(`${item.title} ${item.subtitle}`)}
      aria-label={`ฟังชื่ออุปกรณ์ ${item.title}`}
    >
      <div
        className={`grid h-[156px] w-[156px] place-items-center rounded-[28px] border-[4px] p-4 shadow-[0_14px_22px_rgba(15,23,42,0.12)] transition duration-200 group-hover:shadow-[0_20px_28px_rgba(15,23,42,0.18)] ${item.frameClassName}`}
      >
        {imageBroken ? (
          <div className="text-center text-sm font-bold text-slate-500">Image unavailable</div>
        ) : (
          <img
            src={item.image}
            alt={item.title}
            className={`h-auto max-h-[118px] w-full object-contain drop-shadow-[0_10px_12px_rgba(15,23,42,0.18)] ${item.imageClassName}`}
            onError={() => onImageError(item.id)}
          />
        )}
      </div>

      <div className="mt-4 text-[clamp(18px,1.55vw,28px)] font-black leading-[1.1] text-slate-900">
        {item.title}
      </div>
      <div className="mt-1 text-[clamp(14px,1.05vw,20px)] font-bold text-slate-800">{item.subtitle}</div>
    </button>
  );
}

export default function P6ElectricCircuitMaterials() {
  const navigate = useNavigate();
  const [brokenImages, setBrokenImages] = useState({});
  const onSpeak = useCallback((text) => speakText(text), []);

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  const markImageBroken = useCallback((id) => {
    setBrokenImages((current) => {
      if (current[id]) {
        return current;
      }

      return { ...current, [id]: true };
    });
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-5 pt-3 text-slate-900 md:px-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(110px,10vw,180px)] top-[10px] h-[clamp(96px,10vw,136px)] w-[clamp(60px,6vw,92px)] bg-[#f7bd2b]"
        style={{
          clipPath: "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
        }}
      />

      <div className="relative z-[1] mx-auto grid h-full w-full max-w-[1380px] grid-rows-[auto_auto_1fr_auto] gap-2">
        <div className="inline-flex w-fit items-center rounded-full bg-gradient-to-br from-[#6bc3f0] to-[#4c9ee1] px-[18px] py-2 text-base font-black text-white shadow-[0_12px_22px_rgba(16,24,39,0.14)]">
          วงจรไฟฟ้าใกล้ตัว
        </div>

        <div className="m-0 text-[clamp(32px,2.5vw,54px)] font-black leading-[1.08]">เรื่อง วงจรไฟฟ้าอย่างง่าย</div>

        <div className="relative min-h-0 overflow-y-auto rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] p-[clamp(14px,1.6vw,20px)] pr-[clamp(68px,10vw,116px)] shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
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

          <section className="block min-h-0 rounded-3xl border-2 border-white/50 bg-[rgba(233,238,245,0.95)] p-4 shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
            <header className="mb-3">
              <h2 className="m-0 text-[clamp(40px,3.2vw,64px)] font-black leading-[0.98]">อุปกรณ์</h2>
              <p className="mb-0 mt-1 text-[clamp(16px,1.2vw,24px)] font-bold text-slate-700">กดที่อุปกรณ์เพื่อฟังชื่อ</p>
            </header>

            <div className="grid grid-cols-1 justify-items-center gap-y-4 min-[721px]:grid-cols-2 min-[1120px]:grid-cols-3">
              {EQUIPMENT.map((item) => (
                <EquipmentCard
                  key={item.id}
                  item={item}
                  imageBroken={Boolean(brokenImages[item.id])}
                  onImageError={markImageBroken}
                  onSpeak={onSpeak}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="mt-1 flex flex-nowrap justify-end gap-2">
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-[28px] font-black leading-none text-slate-900 shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
            onClick={() => navigate("/p6/electric-circuit/problem")}
            type="button"
            aria-label="กลับสถานการณ์ปัญหา"
            title="กลับสถานการณ์ปัญหา"
          >
            ←
          </button>
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-blue-600 text-[28px] font-black leading-none text-white shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
            onClick={() => navigate("/p6/electric-circuit/steps")}
            type="button"
            aria-label="ไปขั้นตอนการทดลอง"
            title="ไปขั้นตอนการทดลอง"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
