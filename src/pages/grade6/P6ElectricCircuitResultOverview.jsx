import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const DEVICE_MEDIA = {
  cell: {
    image: "/images/p6/tanfaichai.jpg",
    fallbackImage: "/images/p6/electric-circuit/batteries.svg",
  },
  bulb: {
    image: "/images/p6/electric-circuit/bulb-base-photo.webp",
    fallbackImage: "/images/p6/electric-circuit/bulb-base.svg",
  },
  switch: {
    image: "/images/p6/electric-circuit/switch-photo.webp",
    fallbackImage: "/images/p6/electric-circuit/switch.svg",
  },
};

const TEXT = {
  th: {
    section: "ผลการทดลอง",
    colCircuit: "รูปภาพการต่อวงจรไฟฟ้า",
    colObserve: "ผลการสังเกตความสว่างของหลอดไฟฟ้า",
    rows: [
      "หลอดไฟสว่างเล็กน้อย",
      "หลอดไฟสว่างเพิ่มขึ้น",
      "หลอดไฟสว่างเพิ่มขึ้นอีก",
      "หลอดไฟสว่างมากที่สุด",
    ],
    rowVoice: [
      "ใส่ถ่านหนึ่งก้อน หลอดไฟสว่างเล็กน้อย",
      "ใส่ถ่านสองก้อน หลอดไฟสว่างเพิ่มขึ้น",
      "ใส่ถ่านสามก้อน หลอดไฟสว่างเพิ่มขึ้นอีก",
      "ใส่ถ่านสี่ก้อน หลอดไฟสว่างมากที่สุด",
    ],
    listen: "ฟังคำอธิบายแถวนี้",
    back: "ย้อนกลับ",
    next: "ต่อไป",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    section: "Experiment Results",
    colCircuit: "Circuit Setup",
    colObserve: "Observed Bulb Brightness",
    rows: ["Bulb glows dim", "Bulb gets brighter", "Bulb brighter again", "Bulb brightest"],
    rowVoice: [
      "With one cell, the bulb glows dim.",
      "With two cells, the bulb gets brighter.",
      "With three cells, the bulb gets brighter again.",
      "With four cells, the bulb is brightest.",
    ],
    listen: "Listen to this row",
    back: "Back",
    next: "Next",
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    section: "Hasil Eksperimen",
    colCircuit: "Susunan Litar",
    colObserve: "Pemerhatian Kecerahan Mentol",
    rows: ["Mentol menyala malap", "Mentol bertambah terang", "Mentol lebih terang lagi", "Mentol paling terang"],
    rowVoice: [
      "Dengan satu sel, mentol menyala malap.",
      "Dengan dua sel, mentol bertambah terang.",
      "Dengan tiga sel, mentol lebih terang lagi.",
      "Dengan empat sel, mentol paling terang.",
    ],
    listen: "Dengar baris ini",
    back: "Kembali",
    next: "Seterusnya",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

const LANGS = [
  { id: "th", label: "ไทย" },
  { id: "ms", label: "มลายู" },
  { id: "en", label: "อังกฤษ" },
 
];
function EquipmentImage({ src, fallbackSrc, alt, className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(event) => {
        if (event.currentTarget.dataset.fallbackApplied === "true") return;
        event.currentTarget.dataset.fallbackApplied = "true";
        event.currentTarget.src = fallbackSrc;
      }}
    />
  );
}

function ClipHead({ x, y, rotate = 0, color = "black" }) {
  const isRed = color === "red";
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} aria-hidden="true">
      <rect x={-8} y={-2.8} width={7.8} height={5.6} rx={2.6} fill={isRed ? "#dc2626" : "#111827"} />
      <rect x={-1.3} y={-1.7} width={4.8} height={3.4} rx={1.2} fill="#475569" />
      <path d="M3.2 -2.4 L8.8 -1.4 L8.8 1.4 L3.2 2.4 Z" fill="#cbd5e1" />
      <path d="M8.8 -1.4 L11.2 0 L8.8 1.4 Z" fill="#94a3b8" />
      <path d="M3.2 -0.6 L8 -0.2 M3.2 0.6 L8 0.2" stroke="#e2e8f0" strokeWidth={0.45} strokeLinecap="round" />
    </g>
  );
}

function BatteryToken({ filled = true }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[5px] border h-[46px] w-[18px] ${
        filled ? "border-slate-400 bg-white/80" : "border-slate-300 bg-slate-100/90"
      }`}
      aria-hidden="true"
    >
      {filled ? (
        <EquipmentImage
          src={DEVICE_MEDIA.cell.image}
          fallbackSrc={DEVICE_MEDIA.cell.fallbackImage}
          alt="battery"
          className="h-full w-full object-cover object-center mix-blend-multiply"
        />
      ) : null}
    </div>
  );
}

function SlideSwitchStatic() {
  return (
    <div className="relative h-[64px] w-[38px] rounded-[13px] border-[2.5px] border-slate-600 bg-gradient-to-b from-slate-100 to-slate-200 p-[5px] shadow-[0_8px_14px_rgba(15,23,42,0.18)]">
      <div className="relative h-full w-full overflow-hidden rounded-[9px] bg-gradient-to-b from-slate-300 to-slate-400">
        <div className="absolute left-1/2 top-[3px] -translate-x-1/2 text-[8px] font-black text-slate-700">ON</div>
        <div className="absolute left-1/2 top-[8px] h-[22px] w-[18px] -translate-x-1/2 rounded-[7px] border border-slate-500 bg-gradient-to-b from-slate-700 to-slate-800 shadow-[inset_0_2px_3px_rgba(255,255,255,0.2)]" />
      </div>
    </div>
  );
}

function CircuitThumb({ cells }) {
  const glow = cells === 1 ? 0.22 : cells === 2 ? 0.48 : cells === 3 ? 0.74 : 1;
  const slots = Array.from({ length: 4 }, (_, idx) => idx < cells);
  const holder = { x: 16, y: 18, w: 124, h: 74 };
  const switcher = { x: 198, y: 70, w: 38, h: 64 };
  const bulb = { x: 252, y: 2, w: 72, h: 72 };
  const topWireStart = { x: holder.x + holder.w - 10, y: holder.y + 28 };
  const topWireEnd = { x: bulb.x + 36, y: bulb.y + 48 };
  const redWireLeftStart = { x: holder.x + holder.w - 28, y: holder.y + 56 };
  const redWireLeftEnd = { x: switcher.x + 2, y: switcher.y + 20 };
  const redWireRightStart = { x: switcher.x + switcher.w - 2, y: switcher.y + 20 };
  const redWireRightEnd = { x: topWireEnd.x + 8, y: topWireEnd.y + 8 };
  const redBusY = redWireLeftEnd.y;
  const topWirePath = `M ${topWireStart.x} ${topWireStart.y}
    L ${topWireEnd.x - 18} ${topWireStart.y}
    L ${topWireEnd.x} ${topWireEnd.y}`;
  const redWireLeftPath = `M ${redWireLeftStart.x} ${redWireLeftStart.y}
    L ${redWireLeftStart.x} ${redBusY}
    L ${redWireLeftEnd.x} ${redBusY}
    L ${redWireLeftEnd.x} ${redWireLeftEnd.y}`;
  const redWireRightPath = `M ${redWireRightStart.x} ${redWireRightStart.y}
    L ${redWireRightEnd.x} ${redWireRightStart.y}
    L ${redWireRightEnd.x} ${redWireRightEnd.y}`;
  return (
    <div className="relative h-[150px] w-[360px]">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 360 118" aria-hidden="true">
        <path d={topWirePath} stroke="#111827" strokeOpacity="0.25" strokeWidth="6" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
        <path d={topWirePath} stroke="#0b1020" strokeWidth="3.5" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
        <path d={redWireLeftPath} stroke="#111827" strokeOpacity="0.22" strokeWidth="6" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
        <path d={redWireLeftPath} stroke="#ef4444" strokeWidth="3.5" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
        <path d={redWireRightPath} stroke="#111827" strokeOpacity="0.22" strokeWidth="6" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
        <path d={redWireRightPath} stroke="#ef4444" strokeWidth="3.5" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
        <ClipHead x={topWireStart.x} y={topWireStart.y} rotate={180} color="black" />
        <ClipHead x={topWireEnd.x} y={topWireEnd.y} rotate={0} color="black" />
        <ClipHead x={redWireLeftStart.x} y={redWireLeftStart.y} rotate={-90} color="red" />
        <ClipHead x={redWireLeftEnd.x} y={redWireLeftEnd.y} rotate={0} color="red" />
        <ClipHead x={redWireRightStart.x} y={redWireRightStart.y} rotate={180} color="red" />
        <ClipHead x={redWireRightEnd.x} y={redWireRightEnd.y} rotate={-90} color="red" />
      </svg>

      <div className="absolute left-[16px] top-[18px] h-[74px] w-[124px]">
        <div className="absolute inset-0 rounded-[14px] border-[2px] border-[#2f4561] bg-gradient-to-b from-[#5d7697] to-[#2f4561]" />
        <div className="absolute inset-x-[8px] top-[6px] h-[6px] rounded-full bg-[#23354b]/70" />
        <div className="absolute left-1/2 top-[14px] flex -translate-x-1/2 gap-[3px]">
          {slots.map((filled, idx) => (
            <div
              key={`result-slot-${cells}-${idx}`}
              className={`grid h-[52px] w-[24px] place-items-center rounded-[6px] border ${
                filled ? "border-transparent bg-transparent" : "border-slate-300/80 bg-slate-100/90"
              }`}
            >
              <BatteryToken filled={filled} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-[198px] top-[70px]">
        <SlideSwitchStatic />
      </div>

      <div className="absolute left-[252px] top-[2px] h-[72px] w-[72px]">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[86px] w-[86px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(255,214,102,${glow}) 0%, rgba(255,214,102,0) 68%)`,
            filter: "blur(2px)",
          }}
        />
        <EquipmentImage
          src={DEVICE_MEDIA.bulb.image}
          fallbackSrc={DEVICE_MEDIA.bulb.fallbackImage}
          alt="bulb"
          className="relative z-10 h-full w-full object-contain"
        />
      </div>
    </div>
  );
}

function speak(text, lang) {
  if (!("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
  const voices = synth.getVoices();
  const picked = voices.find((voice) => voice.lang?.toLowerCase().startsWith(utterance.lang.slice(0, 2).toLowerCase()));
  if (picked) utterance.voice = picked;
  synth.speak(utterance);
}

export default function P6ElectricCircuitResultOverview() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TEXT[lang] || TEXT.th, [lang]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const pageBg = {
    background:
      "linear-gradient(180deg, #cde9f7 0%, #e9f5ff 32%, #d7ecf7 60%, #c2dbe9 100%), radial-gradient(120% 70% at 50% 20%, rgba(255,255,255,0.65), transparent 45%), radial-gradient(90% 60% at 20% 10%, rgba(255,255,255,0.35), transparent 40%)",
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-8 pt-8 text-slate-900 md:px-8 md:pt-20" style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-4 right-4 top-[18%] h-[42%] rounded-[48%] bg-white/38 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-[160px] bg-gradient-to-t from-[#9fc5d8] via-[#b1d4e6] to-transparent" />
        <div className="absolute inset-x-0 bottom-[110px] h-4 rounded-full bg-[repeating-linear-gradient(90deg,#7aa3c7_0_40px,#6d94b8_40px_44px)] opacity-50" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(110px,10vw,180px)] top-[10px] h-[clamp(96px,10vw,136px)] w-[clamp(60px,6vw,92px)] bg-[#f7bd2b]"
        style={{
          clipPath: "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
        }}
      />

      <div className="relative z-[1] mx-auto w-full max-w-[1380px]">
        <div className="relative mt-3 rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] p-[clamp(14px,1.6vw,20px)] shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <div className="rounded-[26px] bg-[#efe8dd] p-[clamp(16px,2vw,26px)] shadow-[0_14px_26px_rgba(0,0,0,0.14)]">
              <div className="text-[clamp(34px,2.6vw,52px)] font-black text-slate-900">{t.section}</div>

              <div className="mt-4 overflow-x-auto rounded-[10px] border-2 border-slate-900 bg-[#f6f1e8]">
                <table className="w-full min-w-[860px] border-collapse text-slate-900">
                  <thead>
                    <tr className="bg-[#efe6da]">
                      <th className="w-[44%] border border-slate-900 px-4 py-3 text-center text-[clamp(16px,1.2vw,24px)] font-black">
                        {t.colCircuit}
                      </th>
                      <th className="border border-slate-900 px-4 py-3 text-center text-[clamp(16px,1.2vw,24px)] font-black">{t.colObserve}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4].map((cells, idx) => (
                      <tr key={cells}>
                        <td className="border border-slate-900 px-4 py-2">
                          <div className="flex justify-center">
                            <CircuitThumb cells={cells} />
                          </div>
                        </td>
                        <td className="border border-slate-900 px-4 py-2">
                          <div className="flex items-center justify-center gap-3">
                            <div className="text-center text-[clamp(18px,1.35vw,30px)] font-bold">{t.rows[idx]}</div>
                            <button
                              type="button"
                              onClick={() => speak(t.rowVoice[idx], lang)}
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-700 shadow transition hover:scale-105"
                              aria-label={t.listen}
                              title={t.listen}
                            >
                              {"\uD83D\uDD0A"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </div>
        </div>
      </div>

     
 <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-7 md:right-7">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/electric-circuit/sim")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          &laquo; {t.back}
        </button>
        <button
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/electric-circuit/result-summary")}
          type="button"
          aria-label={t.next}
          title={t.next}
        >
          {t.next} &raquo;
        </button>
      </div>

      <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
        <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
          {LANGS.map((item) => (
            <button
              key={item.id}
              onClick={() => setLang(item.id)}
              className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold text-slate-900 transition ${
                lang === item.id
                  ? "bg-[#bfe0ff] text-slate-900"
                  : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
              }`}
              title={item.label}
              type="button"
            >
              <span className="notranslate" translate="no">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}




