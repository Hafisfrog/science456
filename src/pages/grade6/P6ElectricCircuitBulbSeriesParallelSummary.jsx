import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./P6ElectricCircuitBulbSeriesParallelSim.css";
import "./P6ElectricCircuitBulbSeriesParallelSummary.css";

const DEVICE_MEDIA = {
  battery: {
    image: "/images/p6/tanfaichai-removebg.png",
    fallbackImage: "/images/p6/electric-circuit/batteries.svg",
  },
  bulb: {
    image: "/images/p6/electric-circuit/bulb-base-photo.webp",
    fallbackImage: "/images/p6/electric-circuit/bulb-base.svg",
  },
};

const TEXT = {
  th: {
    badge: "ไฟฟ้ารอบตัวคุณ",
    title: "จำลองการต่อหลอดไฟแบบอนุกรมและขนาน",
    heading: "ผลการทดลอง",
    table: {
      circuit: "รูปแบบวงจร",
      setup: "รูปภาพการต่อวงจรไฟฟ้า",
      remove: "เมื่อถอดหลอดไฟออก 1 ดวง",
      observe: "ผลการสังเกตความสว่างของหลอดไฟ",
      series: "แบบอนุกรม",
      parallel: "แบบขนาน",
      seriesNote: "หลอดไฟอีกดวงหนึ่งดับ",
      parallelNote: "หลอดไฟอีกดวงหนึ่งยังสว่างอยู่",
    },
    nav: {
      back: "ย้อนกลับ",
      next: "สรุปผลการทดลอง",
    },
  },
  en: {
    badge: "Electricity Around You",
    title: "Series and Parallel Bulb Simulation",
    heading: "Experiment Results",
    table: {
      circuit: "Circuit Type",
      setup: "Circuit Connection",
      remove: "When 1 bulb is removed",
      observe: "Brightness Observation",
      series: "Series",
      parallel: "Parallel",
      seriesNote: "The other bulb turns off",
      parallelNote: "The other bulb stays lit",
    },
    nav: {
      back: "Back",
      next: "Experiment Summary",
    },
  },
  ms: {
    badge: "Elektrik di sekeliling kita",
    title: "Simulasi Mentol Siri dan Selari",
    heading: "Hasil Eksperimen",
    table: {
      circuit: "Jenis Litar",
      setup: "Sambungan Litar",
      remove: "Apabila 1 mentol ditanggalkan",
      observe: "Pemerhatian Kecerahan",
      series: "Siri",
      parallel: "Selari",
      seriesNote: "Mentol satu lagi padam",
      parallelNote: "Mentol satu lagi masih menyala",
    },
    nav: {
      back: "Kembali",
      next: "Rumusan Eksperimen",
    },
  },
};

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

function BulbNode({ isOn }) {
  return (
    <div className={`p6-circuit-bsp-sim-bulb-node ${!isOn ? "is-removed" : ""}`}>
      {isOn && <span className="p6-circuit-bsp-sim-bulb-glow" />}
      <EquipmentImage
        src={DEVICE_MEDIA.bulb.image}
        fallbackSrc={DEVICE_MEDIA.bulb.fallbackImage}
        alt="bulb"
        className="p6-circuit-bsp-sim-bulb-img"
      />
    </div>
  );
}

function CablePath({ d, color = "black" }) {
  const isRed = color === "red";
  return (
    <>
      <path d={d} fill="none" stroke="rgba(2,6,23,0.2)" strokeWidth={7.8} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke="#020617" strokeWidth={5.8} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={isRed ? "#ff3b2a" : "#0b1020"} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      <path
        d={d}
        fill="none"
        stroke={isRed ? "rgba(255, 208, 196, 0.78)" : "rgba(148, 163, 184, 0.62)"}
        strokeWidth={0.72}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
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

function SeriesCircuit({ removed }) {
  const bulb1On = !removed;
  const bulb2On = !removed;
  return (
    <div className="p6-circuit-bsp-sim-board p6-circuit-bsp-summary-board is-preview" aria-label="Series circuit">
      <svg className="p6-circuit-bsp-sim-svg" viewBox="0 0 360 190" aria-hidden="true">
        <CablePath d="M136 48 C78 58 42 108 52 142 C62 171 98 174 124 154" color="black" />
        <CablePath d="M246 156 C282 184 322 181 334 144 C344 106 302 60 224 48" color="red" />
        <CablePath d="M140 156 C166 182 194 182 220 159" color="black" />
        <ClipHead x={136} y={49} rotate={20} color="black" />
        <ClipHead x={123} y={154} rotate={-38} color="black" />
        <ClipHead x={243} y={156} rotate={198} color="red" />
        <ClipHead x={224} y={49} rotate={160} color="red" />
        <ClipHead x={140} y={156} rotate={-132} color="black" />
        <ClipHead x={220} y={159} rotate={-48} color="black" />
      </svg>

      <div className="p6-circuit-bsp-sim-battery p6-circuit-bsp-sim-battery-left">
        <EquipmentImage
          src={DEVICE_MEDIA.battery.image}
          fallbackSrc={DEVICE_MEDIA.battery.fallbackImage}
          alt="battery"
          className="p6-circuit-bsp-sim-battery-photo"
        />
      </div>
      <div className="p6-circuit-bsp-sim-battery p6-circuit-bsp-sim-battery-right">
        <EquipmentImage
          src={DEVICE_MEDIA.battery.image}
          fallbackSrc={DEVICE_MEDIA.battery.fallbackImage}
          alt="battery"
          className="p6-circuit-bsp-sim-battery-photo"
        />
      </div>

      <div className="p6-circuit-bsp-sim-bulb-a p6-circuit-bsp-sim-bulb-s1">
        <BulbNode isOn={bulb1On} />
      </div>
      <div className="p6-circuit-bsp-sim-bulb-b p6-circuit-bsp-sim-bulb-s2">
        <BulbNode isOn={bulb2On} />
      </div>
    </div>
  );
}

function ParallelCircuit({ removed }) {
  const bulb1On = !removed;
  const bulb2On = true;
  return (
    <div className="p6-circuit-bsp-sim-board p6-circuit-bsp-summary-board is-parallel-layout is-preview" aria-label="Parallel circuit">
      <svg className="p6-circuit-bsp-sim-svg" viewBox="0 0 360 190" aria-hidden="true">
        <CablePath d="M132 44 C102 60 98 92 126 110 C142 120 154 123 166 126" color="red" />
        <CablePath d="M166 126 C140 136 130 158 146 172 C154 178 162 180 170 176" color="red" />
        <CablePath d="M228 44 C258 60 262 92 234 110 C218 120 206 123 194 126" color="black" />
        <CablePath d="M194 126 C220 136 230 158 214 172 C206 178 198 180 190 176" color="black" />
        <ClipHead x={132} y={44} rotate={-2} color="red" />
        <ClipHead x={228} y={44} rotate={182} color="black" />
        <ClipHead x={166} y={126} rotate={-22} color="red" />
        <ClipHead x={194} y={126} rotate={202} color="black" />
        <ClipHead x={170} y={176} rotate={-14} color="red" />
        <ClipHead x={190} y={176} rotate={194} color="black" />
      </svg>
      <div className="p6-circuit-bsp-sim-battery p6-circuit-bsp-sim-battery-p p6-circuit-bsp-sim-battery-p-left">
        <EquipmentImage
          src={DEVICE_MEDIA.battery.image}
          fallbackSrc={DEVICE_MEDIA.battery.fallbackImage}
          alt="battery"
          className="p6-circuit-bsp-sim-battery-photo"
        />
      </div>
      <div className="p6-circuit-bsp-sim-battery p6-circuit-bsp-sim-battery-p p6-circuit-bsp-sim-battery-p-right">
        <EquipmentImage
          src={DEVICE_MEDIA.battery.image}
          fallbackSrc={DEVICE_MEDIA.battery.fallbackImage}
          alt="battery"
          className="p6-circuit-bsp-sim-battery-photo"
        />
      </div>
      <div className="p6-circuit-bsp-sim-bulb-p1 p6-circuit-bsp-sim-bulb-p-top">
        <BulbNode isOn={bulb1On} />
      </div>
      <div className="p6-circuit-bsp-sim-bulb-p2 p6-circuit-bsp-sim-bulb-p-mid">
        <BulbNode isOn={bulb2On} />
      </div>
    </div>
  );
}

function LanguagePills({ lang, setLang }) {
  const labels = {
    th: { th: "ไทย", en: "English", ms: "Melayu" },
    en: { th: "Thai", en: "English", ms: "Melayu" },
    ms: { th: "Thai", en: "English", ms: "Melayu" },
  }[lang];

  const pills = [
    { code: "th", label: labels.th },
    { code: "en", label: labels.en },
    { code: "ms", label: labels.ms },
  ];

  return (
    <div className="inline-flex items-center gap-1">
      {pills.map((p) => (
        <button
          key={p.code}
          type="button"
          onClick={() => setLang(p.code)}
          className={`rounded-xl px-4 py-2 text-[15px] font-black transition ${
            lang === p.code ? "bg-sky-500 text-white" : "bg-sky-100 text-slate-800"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

export default function P6ElectricCircuitBulbSeriesParallelSummary() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TEXT[lang] ?? TEXT.th, [lang]);

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="p6-circuit-bsp-summary-page relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-5 pt-3 text-slate-900 md:px-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="relative z-[1] mx-auto grid h-full w-full max-w-[1380px] grid-rows-[auto_1fr] gap-2">
        <h1 className="m-0 py-1 text-center text-[clamp(34px,2.5vw,54px)] font-black leading-[1.05]">{t.heading}</h1>
        <div className="p6-circuit-bsp-summary-card relative rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] px-[clamp(14px,1.6vw,20px)] pb-4 pt-4 shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <div className="p6-circuit-bsp-summary-inner">
            <div className="p6-circuit-bsp-summary-table">
              <div className="p6-circuit-bsp-summary-row p6-circuit-bsp-summary-head">
                <div>{t.table.circuit}</div>
                <div>{t.table.setup}</div>
                <div>{t.table.remove}</div>
                <div>{t.table.observe}</div>
              </div>

              <div className="p6-circuit-bsp-summary-row">
                <div className="p6-circuit-bsp-summary-type">{t.table.series}</div>
                <div className="p6-circuit-bsp-summary-visual">
                  <SeriesCircuit removed={false} />
                </div>
                <div className="p6-circuit-bsp-summary-visual">
                  <SeriesCircuit removed />
                </div>
                <div className="p6-circuit-bsp-summary-note">{t.table.seriesNote}</div>
              </div>

              <div className="p6-circuit-bsp-summary-row">
                <div className="p6-circuit-bsp-summary-type">{t.table.parallel}</div>
                <div className="p6-circuit-bsp-summary-visual">
                  <ParallelCircuit removed={false} />
                </div>
                <div className="p6-circuit-bsp-summary-visual">
                  <ParallelCircuit removed />
                </div>
                <div className="p6-circuit-bsp-summary-note">{t.table.parallelNote}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-auto fixed bottom-3 left-3 z-20">
        <LanguagePills lang={lang} setLang={setLang} />
      </div>

      <div className="fixed bottom-3 right-3 z-20 flex gap-3">
        <button
          className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-base font-bold text-slate-900 shadow"
          onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/sim")}
          type="button"
          aria-label={t.nav.back}
          title={t.nav.back}
        >
          <span className="text-xl leading-none">&lt;&lt;</span>
          <span>{t.nav.back}</span>
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-base font-bold text-white shadow"
          onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/result")}
          type="button"
          aria-label={t.nav.next}
          title={t.nav.next}
        >
          <span>{t.nav.next}</span>
          <span className="text-xl leading-none">&gt;&gt;</span>
        </button>
      </div>
    </div>
  );
}
