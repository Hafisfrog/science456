import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const EQUIPMENT = [
  {
    id: "bulb",
    title: "หลอดไฟฟ้าพร้อมฐาน",
    subtitle: "1 ชุด",
    icon: (
      <svg className="h-auto w-[82px]" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="bulbGlassMat" cx="35%" cy="28%" r="68%">
            <stop offset="0%" stopColor="#fff9d7" />
            <stop offset="58%" stopColor="#ffe38b" />
            <stop offset="100%" stopColor="#f3b94d" />
          </radialGradient>
          <linearGradient id="bulbMetalMat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c7d0dc" />
            <stop offset="45%" stopColor="#8b98aa" />
            <stop offset="100%" stopColor="#5f6d81" />
          </linearGradient>
        </defs>
        <ellipse cx="48" cy="33" rx="22" ry="23" fill="url(#bulbGlassMat)" stroke="#334155" strokeWidth="3" />
        <ellipse cx="41" cy="24" rx="8" ry="5" fill="#ffffff" opacity="0.55" />
        <path d="M39 41l5 5m8-5l-5 5m-3 0h4" stroke="#6b4f1d" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M40 50h16v8H40z" fill="url(#bulbMetalMat)" />
        <path d="M38 58h20v4H38zm1 6h18v4H39zm2 6h14v5H41z" fill="url(#bulbMetalMat)" />
        <rect x="45" y="75" width="6" height="9" rx="2" fill="#475569" />
      </svg>
    ),
  },
  {
    id: "wire",
    title: "สายไฟพร้อมหัวหนีบ",
    subtitle: "2 เส้น",
    icon: (
      <svg className="h-auto w-[82px]" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <path d="M14 58c18-24 50-24 68 0" fill="none" stroke="#1f2937" strokeWidth="6" strokeLinecap="round" />
        <path d="M14 34c18-20 50-20 68 0" fill="none" stroke="#1f2937" strokeWidth="6" strokeLinecap="round" />
        <path d="M14 58c18-24 50-24 68 0" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
        <path d="M14 34c18-20 50-20 68 0" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
        <rect x="8" y="52" width="14" height="10" rx="3" fill="#0f172a" />
        <rect x="74" y="52" width="14" height="10" rx="3" fill="#0f172a" />
        <rect x="8" y="28" width="14" height="10" rx="3" fill="#0f172a" />
        <rect x="74" y="28" width="14" height="10" rx="3" fill="#0f172a" />
        <rect x="9" y="52" width="5" height="10" rx="2" fill="#e2e8f0" />
        <rect x="79" y="52" width="5" height="10" rx="2" fill="#e2e8f0" />
        <rect x="9" y="28" width="5" height="10" rx="2" fill="#e2e8f0" />
        <rect x="79" y="28" width="5" height="10" rx="2" fill="#e2e8f0" />
      </svg>
    ),
  },
  {
    id: "holder",
    title: "กระบะใส่ถ่านไฟฉาย",
    subtitle: "สำหรับ 4 ก้อน",
    icon: (
      <svg className="h-auto w-[82px]" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="holderBodyMat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#29364a" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>
        <rect x="10" y="24" width="76" height="48" rx="12" fill="url(#holderBodyMat)" />
        <rect x="14" y="28" width="68" height="40" rx="9" fill="#111827" />
        <rect x="18" y="32" width="14" height="30" rx="6" fill="#f59e0b" />
        <rect x="34" y="32" width="14" height="30" rx="6" fill="#f59e0b" />
        <rect x="50" y="32" width="14" height="30" rx="6" fill="#f59e0b" />
        <rect x="66" y="32" width="14" height="30" rx="6" fill="#f59e0b" />
        <rect x="21" y="30" width="8" height="4" rx="2" fill="#cbd5e1" />
        <rect x="37" y="30" width="8" height="4" rx="2" fill="#cbd5e1" />
        <rect x="53" y="30" width="8" height="4" rx="2" fill="#cbd5e1" />
        <rect x="69" y="30" width="8" height="4" rx="2" fill="#cbd5e1" />
      </svg>
    ),
  },
  {
    id: "switch",
    title: "สวิตช์",
    subtitle: "1 อัน",
    icon: (
      <svg className="h-auto w-[82px]" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="switchPlateMat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#edf2f7" />
            <stop offset="100%" stopColor="#b8c2d3" />
          </linearGradient>
        </defs>
        <rect x="28" y="14" width="40" height="68" rx="12" fill="url(#switchPlateMat)" stroke="#334155" strokeWidth="3" />
        <rect x="35" y="22" width="26" height="24" rx="7" fill="#dbe4f2" />
        <rect x="35" y="50" width="26" height="24" rx="7" fill="#9aa8bf" />
        <circle cx="48" cy="34" r="3.5" fill="#475569" />
        <circle cx="48" cy="62" r="3.5" fill="#475569" />
        <circle cx="34" cy="22" r="2" fill="#64748b" />
        <circle cx="62" cy="74" r="2" fill="#64748b" />
      </svg>
    ),
  },
  {
    id: "cell",
    title: "ถ่านไฟฉาย",
    subtitle: "4 ก้อน",
    icon: (
      <svg className="h-auto w-[82px]" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="cellBodyMat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffbf3a" />
            <stop offset="100%" stopColor="#e28a08" />
          </linearGradient>
          <linearGradient id="cellCapMat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>
        <rect x="22" y="18" width="20" height="58" rx="8" fill="url(#cellBodyMat)" />
        <rect x="50" y="18" width="20" height="58" rx="8" fill="url(#cellBodyMat)" />
        <rect x="24" y="14" width="16" height="8" rx="4" fill="url(#cellCapMat)" />
        <rect x="52" y="14" width="16" height="8" rx="4" fill="url(#cellCapMat)" />
        <rect x="22" y="44" width="20" height="7" rx="3.5" fill="#111827" opacity="0.35" />
        <rect x="50" y="44" width="20" height="7" rx="3.5" fill="#111827" opacity="0.35" />
        <path d="M29 18v58M57 18v58" stroke="#ffd973" strokeWidth="1.8" />
      </svg>
    ),
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

export default function P6ElectricCircuitMaterials() {
  const navigate = useNavigate();
  const onSpeak = useCallback((text) => speakText(text), []);

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

          <div className="grid h-full min-h-0 grid-cols-1 gap-[14px]">
            <section className="block min-h-0 rounded-3xl border-2 border-white/50 bg-[rgba(233,238,245,0.95)] p-3 shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
              <header className="mb-1">
                <h2 className="m-0 text-[clamp(40px,3.2vw,64px)] font-black leading-[0.98]">อุปกรณ์</h2>
                <p className="mb-0 mt-1 text-[clamp(16px,1.2vw,24px)] font-bold text-slate-700">
                  กดที่อุปกรณ์เพื่อฟังชื่อ
                </p>
              </header>

              <div className="grid grid-cols-1 gap-2.5 min-[721px]:grid-cols-2 min-[1201px]:grid-cols-3">
                {EQUIPMENT.map((item) => (
                  <button
                    className="grid h-[clamp(170px,24vh,210px)] cursor-pointer content-center justify-items-center gap-1 rounded-[22px] border-2 border-[#c4934f] bg-[#dcc8a5] p-2.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] transition hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_10px_16px_rgba(15,23,42,0.14)] max-[720px]:min-h-[180px]"
                    key={item.id}
                    type="button"
                    onClick={() => onSpeak(`${item.title} ${item.subtitle}`)}
                  >
                    <div className="grid min-h-[78px] w-full place-items-center">{item.icon}</div>
                    <div className="text-[clamp(15px,1.35vw,26px)] font-black leading-[1.05] text-slate-900 max-[720px]:text-[clamp(22px,7vw,32px)]">
                      {item.title}
                    </div>
                    <div className="text-[clamp(12px,0.95vw,18px)] font-bold text-slate-800 max-[720px]:text-lg">
                      {item.subtitle}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
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
