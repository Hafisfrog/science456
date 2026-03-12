import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./P6ElectricCircuitBulbSeriesParallelSim.css";

const TEXT = {
  th: {
    badge: "ไฟฟ้ารอบตัวคุณ",
    title: "จำลองการต่อหลอดไฟแบบอนุกรมและขนาน",
    instruction: "คลิกที่หลอดไฟเพื่อถอดออกหรือใส่กลับ แล้วดูผลที่เกิดขึ้น",
    series: {
      heading: "ต่อแบบอนุกรม",
      on: "วงจรปิด → ทั้งสองหลอดสว่าง",
      off: "ถอดหลอดหนึ่งออก → วงจรเปิด ทั้งสองหลอดดับ",
    },
    parallel: {
      heading: "ต่อแบบขนาน",
      on: "วงจรปิด → ทั้งสองหลอดสว่าง",
      oneOn: "ถอดหลอดหนึ่งออก → อีกหลอดยังสว่าง เพราะยังมีทางเดินกระแส",
    },
    reset: "เริ่มใหม่",
    back: "ย้อนกลับ",
    next: "ต่อไป",
    lang: { th: "ไทย", en: "English", ms: "Melayu" },
  },
  en: {
    badge: "Electricity Around You",
    title: "Simulate Series vs Parallel Bulb Circuits",
    instruction: "Click a bulb to remove or attach it, then observe the result.",
    series: {
      heading: "Series connection",
      on: "Circuit closed → both bulbs light up",
      off: "Remove one bulb → circuit opens, both bulbs go off",
    },
    parallel: {
      heading: "Parallel connection",
      on: "Circuit closed → both bulbs light up",
      oneOn: "Remove one bulb → the other stays on because its path is still complete",
    },
    reset: "Reset",
    back: "Back",
    next: "Next",
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    badge: "Litar elektrik dekat kita",
    title: "Simulasi sambungan mentol siri dan selari",
    instruction: "Klik mentol untuk tanggal atau pasang semula, kemudian lihat kesannya.",
    series: {
      heading: "Sambungan siri",
      on: "Litar tertutup → kedua‑dua mentol menyala",
      off: "Tanggal satu mentol → litar terbuka, kedua‑dua mentol padam",
    },
    parallel: {
      heading: "Sambungan selari",
      on: "Litar tertutup → kedua‑dua mentol menyala",
      oneOn: "Tanggal satu mentol → mentol lain masih menyala kerana laluan masih lengkap",
    },
    reset: "Set semula",
    back: "Kembali",
    next: "Seterusnya",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

function LanguagePills({ lang, setLang, labels }) {
  const pills = [
    { code: "th", label: labels.th },
    { code: "en", label: labels.en },
    { code: "ms", label: labels.ms },
  ];

  return (
    <div className="p6-circuit-bsp-sim-lang shadow-[0_12px_24px_rgba(0,0,0,0.12)] ring-2 ring-white/85">
      {pills.map((p) => (
        <button
          key={p.code}
          type="button"
          onClick={() => setLang(p.code)}
          className={`rounded-full px-2 py-1 text-[15px] font-black transition ${
            lang === p.code
              ? "bg-blue-600 text-white shadow-[0_8px_16px_rgba(37,99,235,0.35)]"
              : "text-slate-800 hover:bg-white"
          }`}
        >
          <span>{p.label}</span>
        </button>
      ))}
    </div>
  );
}

function Bulb({ cx, cy, isOn, onToggle, clickable = true }) {
  const glassId = `glass-${cx}-${cy}`;
  const glowId = `glow-${cx}-${cy}`;

  return (
    <g
      className={`p6-circuit-bsp-sim-bulb ${clickable ? "is-clickable" : ""} ${!isOn && clickable ? "is-removed" : ""}`}
      onClick={clickable ? onToggle : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.8" />
          <stop offset="55%" stopColor="#fbbf24" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={glassId} cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor={isOn ? "#fff7d6" : "#f8fafc"} />
          <stop offset="60%" stopColor={isOn ? "#fde047" : "#e2e8f0"} />
          <stop offset="100%" stopColor={isOn ? "#facc15" : "#cbd5e1"} />
        </radialGradient>
      </defs>

      {isOn && <circle cx={cx} cy={cy} r={34} fill={`url(#${glowId})`} className="bulb-glow" />}

      <circle cx={cx} cy={cy} r={26} fill={`url(#${glassId})`} stroke={isOn ? "#f59e0b" : "#94a3b8"} strokeWidth={3} />

      <path
        d={`M ${cx - 6} ${cy + 4} q 6 -6 12 0`}
        fill="none"
        stroke={isOn ? "#ca8a04" : "#475569"}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <path
        d={`M ${cx - 12} ${cy + 10} h 24`}
        stroke="#0f172a"
        strokeWidth={3}
        strokeLinecap="round"
      />

      <rect x={cx - 12} y={cy + 18} width={24} height={15} rx={4} fill="#0f172a" />
      <rect x={cx - 12} y={cy + 18} width={24} height={7} rx={4} fill="#1e293b" />
      <rect x={cx - 8} y={cy + 12} width={16} height={8} rx={3} fill="#e2e8f0" opacity={0.85} />
    </g>
  );
}

function SeriesCircuit({ removed, onToggle }) {
  const bulbOn = !removed;

  return (
    <svg className="p6-circuit-bsp-sim-svg" viewBox="0 0 360 190" aria-label="Series circuit">
      <rect x="18" y="70" width="26" height="70" rx="6" fill="#0ea5e9" />
      <rect x="44" y="70" width="24" height="70" rx="6" fill="#0284c7" />
      <path
        d="M68 78 H120 L120 94 M120 116 L120 134 H68 V154 H292 V134"
        fill="none"
        stroke="#0f172a"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M292 134 V78 H220"
        fill="none"
        stroke="#0f172a"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Bulb cx={160} cy={106} isOn={bulbOn} onToggle={onToggle} />
      <Bulb cx={240} cy={106} isOn={bulbOn} onToggle={onToggle} />
    </svg>
  );
}

function ParallelCircuit({ removed, onToggle }) {
  const bulb1On = !removed;
  const bulb2On = true;

  return (
    <svg className="p6-circuit-bsp-sim-svg" viewBox="0 0 360 190" aria-label="Parallel circuit">
      <rect x="18" y="70" width="26" height="70" rx="6" fill="#0ea5e9" />
      <rect x="44" y="70" width="24" height="70" rx="6" fill="#0284c7" />
      <path
        d="M68 86 H140 V66 H280 V86 M140 146 V166 H280 V146"
        fill="none"
        stroke="#0f172a"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M140 86 V146 M280 86 V146"
        fill="none"
        stroke="#0f172a"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Bulb cx={190} cy={106} isOn={bulb1On} onToggle={onToggle} />
      <Bulb cx={230} cy={146} isOn={bulb2On} onToggle={() => {}} clickable={false} />
    </svg>
  );
}

export default function P6ElectricCircuitBulbSeriesParallelSim() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const [seriesRemoved, setSeriesRemoved] = useState(false);
  const [parallelRemoved, setParallelRemoved] = useState(false);

  const t = useMemo(() => TEXT[lang] ?? TEXT.en, [lang]);

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  const handleReset = () => {
    setSeriesRemoved(false);
    setParallelRemoved(false);
  };

  return (
    <div
      className="p6-circuit-bsp-sim-page relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-5 pt-3 text-slate-900 md:px-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="relative z-[1] mx-auto grid h-full w-full max-w-[1380px] grid-rows-[auto_auto_1fr_auto] gap-2">
        <div className="inline-flex w-fit items-center rounded-full bg-gradient-to-br from-[#6bc3f0] to-[#4c9ee1] px-[18px] py-2 text-base font-black text-white shadow-[0_12px_22px_rgba(16,24,39,0.14)]">
          {t.badge}
        </div>
        <h1 className="m-0 text-[clamp(32px,2.3vw,50px)] font-black leading-[1.05]">{t.title}</h1>

        <div className="p6-circuit-bsp-sim-card relative rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] px-[clamp(14px,1.6vw,20px)] pb-4 pt-4 shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <div className="pointer-events-none absolute bottom-[-120px] right-[-100px] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.3),rgba(255,255,255,0))]" />

          <div className="p6-circuit-bsp-sim-inner shadow-[inset_0_0_0_2px_rgba(255,255,255,0.85),0_16px_26px_rgba(17,24,39,0.16)]">
            <div className="p6-circuit-bsp-sim-toolbar">
              <button
                type="button"
                className="p6-circuit-bsp-sim-play rounded-2xl bg-white shadow-[0_10px_18px_rgba(17,24,39,0.16)]"
                onClick={handleReset}
                title={t.reset}
                aria-label={t.reset}
              >
                <svg viewBox="0 0 72 72" aria-hidden="true" focusable="false">
                  <circle cx="36" cy="36" r="34" fill="#1d4ed8" />
                  <path d="M30 24 L50 36 L30 48 Z" fill="#e0f2fe" />
                </svg>
              </button>
              <div className="p6-circuit-bsp-sim-label">{t.instruction}</div>
            </div>

            <div className="p6-circuit-bsp-sim-table">
              <div className="p6-circuit-bsp-sim-head">{t.series.heading}</div>
              <div className="p6-circuit-bsp-sim-head">{t.parallel.heading}</div>

              <div className="p6-circuit-bsp-sim-cell">
                <SeriesCircuit removed={seriesRemoved} onToggle={() => setSeriesRemoved((v) => !v)} />
                <div className="p6-circuit-bsp-sim-status">{seriesRemoved ? t.series.off : t.series.on}</div>
              </div>

              <div className="p6-circuit-bsp-sim-cell">
                <ParallelCircuit removed={parallelRemoved} onToggle={() => setParallelRemoved((v) => !v)} />
                <div className="p6-circuit-bsp-sim-status">{parallelRemoved ? t.parallel.oneOn : t.parallel.on}</div>
              </div>
            </div>

            <div className="p6-circuit-bsp-sim-bottom">
              <LanguagePills lang={lang} setLang={setLang} labels={t.lang} />
            </div>
          </div>
        </div>

        <div className="mt-1 flex flex-nowrap justify-end gap-2">
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-[26px] font-black leading-none text-slate-900 shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
            onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/steps")}
            type="button"
            aria-label={t.back}
            title={t.back}
          >
            ←
          </button>
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-blue-600 text-[26px] font-black leading-none text-white shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
            onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/result")}
            type="button"
            aria-label={t.next}
            title={t.next}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
