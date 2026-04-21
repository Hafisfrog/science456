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
    section: "สรุปผลการทดลอง",
    summary:
      "จากการทำกิจกรรม พบว่า เมื่อนำเซลล์ไฟฟ้าหลายเซลล์มาเรียงต่อกันแบบอนุกรม กระแสไฟฟ้าในวงจรจะมากขึ้น ส่งผลให้หลอดไฟสว่างมากขึ้นตามจำนวนเซลล์ไฟฟ้าที่เพิ่มขึ้น",
    listen: "ฟังสรุป",
    cellCount: (n) => `${n} ก้อน`,
    back: "ย้อนกลับ",
    next: "ต่อไป",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    section: "Experiment Summary",
    summary:
      "From the activity, we found that connecting more cells in series increases the current in the circuit, making the bulb brighter as the number of cells increases.",
    listen: "Listen",
    cellCount: (n) => `${n} cells`,
    back: "Back",
    next: "Next",
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    section: "Rumusan Eksperimen",
    summary:
      "Daripada aktiviti ini, didapati bahawa apabila lebih banyak sel disusun secara siri, arus dalam litar bertambah dan mentol menjadi lebih terang apabila bilangan sel meningkat.",
    listen: "Dengar rumusan",
    cellCount: (n) => `${n} sel`,
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

function speakText(text, lang) {
  if (typeof window === "undefined" || !window.speechSynthesis || !text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
  utterance.rate = 0.95;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

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

function CircuitSummaryVisual({ cells }) {
  const glow = cells === 1 ? 0.22 : cells === 2 ? 0.5 : cells === 3 ? 0.75 : 1;
  const slots = Array.from({ length: 4 }, (_, idx) => idx < cells);
  const holder = { x: 36, y: 18, w: 174, h: 88 };
  const switcher = { x: 300, y: 82, w: 38, h: 64 };
  const bulb = { x: 392, y: 10, w: 84, h: 84 };
  const topWireStart = { x: holder.x + holder.w - 14, y: holder.y + 34 };
  const topWireEnd = { x: bulb.x + 42, y: bulb.y + 57 };
  const redWireLeftStart = { x: holder.x + holder.w - 40, y: holder.y + 63 };
  const redWireLeftEnd = { x: switcher.x + 2, y: switcher.y + 20 };
  const redWireRightStart = { x: switcher.x + switcher.w - 2, y: switcher.y + 20 };
  const redWireRightEnd = { x: topWireEnd.x + 10, y: topWireEnd.y + 10 };
  const redBusY = redWireLeftEnd.y;
  const topWirePath = `M ${topWireStart.x} ${topWireStart.y}
    L ${topWireEnd.x - 26} ${topWireStart.y}
    L ${topWireEnd.x} ${topWireEnd.y}`;
  const redWireLeftPath = `M ${redWireLeftStart.x} ${redWireLeftStart.y}
    L ${redWireLeftStart.x} ${redBusY}
    L ${redWireLeftEnd.x} ${redBusY}
    L ${redWireLeftEnd.x} ${redWireLeftEnd.y}`;
  const redWireRightPath = `M ${redWireRightStart.x} ${redWireRightStart.y}
    L ${redWireRightEnd.x} ${redWireRightStart.y}
    L ${redWireRightEnd.x} ${redWireRightEnd.y}`;
  return (
    <div className="relative mx-auto mt-5 h-[150px] w-full max-w-[560px]">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 560 150" aria-hidden="true">
        <path d={topWirePath} stroke="#111827" strokeOpacity="0.25" strokeWidth="8" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
        <path d={topWirePath} stroke="#0b1020" strokeWidth="5" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
        <path d={redWireLeftPath} stroke="#111827" strokeOpacity="0.22" strokeWidth="8" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
        <path d={redWireLeftPath} stroke="#ef4444" strokeWidth="5" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
        <path d={redWireRightPath} stroke="#111827" strokeOpacity="0.22" strokeWidth="8" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
        <path d={redWireRightPath} stroke="#ef4444" strokeWidth="5" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
        <ClipHead x={topWireStart.x} y={topWireStart.y} rotate={180} color="black" />
        <ClipHead x={topWireEnd.x} y={topWireEnd.y} rotate={0} color="black" />
        <ClipHead x={redWireLeftStart.x} y={redWireLeftStart.y} rotate={-90} color="red" />
        <ClipHead x={redWireLeftEnd.x} y={redWireLeftEnd.y} rotate={0} color="red" />
        <ClipHead x={redWireRightStart.x} y={redWireRightStart.y} rotate={180} color="red" />
        <ClipHead x={redWireRightEnd.x} y={redWireRightEnd.y} rotate={-90} color="red" />
      </svg>

      <div className="absolute left-[36px] top-[18px] h-[88px] w-[174px]">
        <div className="absolute inset-0 rounded-[16px] border-[2px] border-[#2f4561] bg-gradient-to-b from-[#5d7697] to-[#2f4561]" />
        <div className="absolute inset-x-[10px] top-[6px] h-[8px] rounded-full bg-[#23354b]/70" />
        <div className="absolute left-1/2 top-[16px] flex -translate-x-1/2 gap-[4px]">
          {slots.map((filled, idx) => (
            <div key={idx} className="h-[56px] w-[27px] overflow-hidden rounded-[6px] border border-slate-300 bg-white/80">
              <div className="grid h-full w-full place-items-center">
                <BatteryToken filled={filled} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-[300px] top-[82px]">
        <SlideSwitchStatic />
      </div>

      <div className="absolute left-[392px] top-[10px] h-[84px] w-[84px]">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(255,214,102,${glow}) 0%, rgba(255,214,102,0) 70%)`,
            filter: "blur(3px)",
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

export default function P6ElectricCircuitResults() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const [summaryCells, setSummaryCells] = useState(4);
  const t = useMemo(() => TEXT[lang] ?? TEXT.th, [lang]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const pageBg = {
    background: "linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-28 pt-8 text-slate-900 md:px-8 md:pb-32 md:pt-20"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(110px,10vw,180px)] top-[10px] h-[clamp(96px,10vw,136px)] w-[clamp(60px,6vw,92px)] bg-[#f7bd2b]"
        style={{
          clipPath: "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
        }}
      />

      <div className="relative z-[1] mx-auto grid h-full w-full max-w-[1380px] grid-rows-[1fr_auto] gap-2">
        <div className="relative grid min-h-0 gap-3 rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] p-[clamp(14px,1.6vw,20px)] shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <div className="relative z-[1] flex flex-wrap items-center justify-start gap-3">
            <div className="mb-0 inline-flex w-fit items-center gap-2.5 rounded-full bg-gradient-to-br from-blue-600/20 to-sky-400/25 px-4 py-1.5 text-[clamp(34px,2.6vw,52px)] font-black text-slate-900">
              {t.section}
            </div>
          </div>

          <section className="relative z-[1] min-h-0 overflow-hidden rounded-[20px] border-4 border-slate-900 bg-[#f7f4f1] p-[clamp(18px,2.1vw,30px)]">
            <div className="flex items-end justify-between gap-4 max-[900px]:flex-col max-[900px]:items-start">
              <p className="m-0 flex-1 text-[clamp(20px,2.1vw,40px)] font-bold leading-[1.6] text-slate-900 max-[720px]:leading-[1.5]">
                {t.summary}
              </p>
              <button
                type="button"
                onClick={() => speakText(t.summary, lang)}
                aria-label={t.listen}
                title={t.listen}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[22px] shadow-[0_10px_18px_rgba(17,24,39,0.18)] transition hover:scale-105"
              >
                🔊
              </button>
            </div>
            <CircuitSummaryVisual cells={summaryCells} />
            <div className="mt-3 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setSummaryCells((prev) => Math.max(1, prev - 1))}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl font-black text-slate-800 shadow"
                aria-label="decrease battery"
                title="decrease battery"
              >
                -
              </button>
              <div className="min-w-[110px] text-center text-[20px] font-black text-slate-800">{t.cellCount(summaryCells)}</div>
              <button
                type="button"
                onClick={() => setSummaryCells((prev) => Math.min(4, prev + 1))}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl font-black text-slate-800 shadow"
                aria-label="increase battery"
                title="increase battery"
              >
                +
              </button>
            </div>
          </section>
        </div>
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

      <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-7 md:right-7">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/electric-circuit/result")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          &laquo; {t.back}
        </button>
        <button
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/electric-circuit/experiments")}
          type="button"
          aria-label={t.next}
          title={t.next}
        >
          {t.next} &raquo;
        </button>
      </div>
    </div>
  );
}
