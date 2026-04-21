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
      next: "ต่อไป",
    },
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
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
      next: "Next",
    },
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
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
      next: "Seterusnya",
    },
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

function BulbNode({ isOn, clickable = false }) {
  return (
    <button
      type="button"
      className={`p6-circuit-bsp-sim-bulb-node ${clickable ? "is-clickable" : ""} ${!isOn ? "is-removed" : ""}`}
      disabled={!clickable}
    >
      {isOn && <span className="p6-circuit-bsp-sim-bulb-glow" />}
      <EquipmentImage
        src={DEVICE_MEDIA.bulb.image}
        fallbackSrc={DEVICE_MEDIA.bulb.fallbackImage}
        alt="bulb"
        className="p6-circuit-bsp-sim-bulb-img"
      />
    </button>
  );
}

function CablePath({ d, color = "black" }) {
  const isRed = color === "red";
  return (
    <>
      <path d={d} fill="none" stroke="rgba(2,6,23,0.2)" strokeWidth={7.8} strokeLinecap="square" strokeLinejoin="miter" />
      <path d={d} fill="none" stroke="#020617" strokeWidth={5.8} strokeLinecap="square" strokeLinejoin="miter" />
      <path d={d} fill="none" stroke={isRed ? "#ff3b2a" : "#0b1020"} strokeWidth={4} strokeLinecap="square" strokeLinejoin="miter" />
      <path
        d={d}
        fill="none"
        stroke={isRed ? "rgba(255, 208, 196, 0.78)" : "rgba(148, 163, 184, 0.62)"}
        strokeWidth={0.72}
        strokeLinecap="square"
        strokeLinejoin="miter"
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
  const bulbOn = !removed;
  return (
    <div className="p6-circuit-bsp-sim-board p6-circuit-bsp-summary-board is-preview" aria-label="Series circuit">
      <svg className="p6-circuit-bsp-sim-svg" viewBox="0 0 360 190" aria-hidden="true">
        <CablePath d="M136 48 L52 48 L52 154 L123 154" color="black" />
        <CablePath d="M224 48 L334 48 L334 156 L243 156" color="red" />
        <CablePath d="M140 156 L220 156" color="black" />
        <ClipHead x={136} y={48} rotate={8} color="black" />
        <ClipHead x={123} y={154} rotate={-74} color="black" />
        <ClipHead x={243} y={156} rotate={-112} color="red" />
        <ClipHead x={224} y={48} rotate={172} color="red" />
        <ClipHead x={140} y={156} rotate={-106} color="black" />
        <ClipHead x={220} y={156} rotate={-68} color="black" />
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
        <BulbNode isOn={bulbOn} />
      </div>
      <div className="p6-circuit-bsp-sim-bulb-b p6-circuit-bsp-sim-bulb-s2">
        <BulbNode isOn={bulbOn} />
      </div>
      <div className="p6-circuit-bsp-sim-label p6-circuit-bsp-sim-label-a">A</div>
      <div className="p6-circuit-bsp-sim-label p6-circuit-bsp-sim-label-b">B</div>
    </div>
  );
}

function ParallelCircuit({ removed }) {
  const bulb1On = !removed;
  const bulb2On = true;
  return (
    <div className="p6-circuit-bsp-sim-board p6-circuit-bsp-summary-board is-parallel-layout is-preview" aria-label="Parallel circuit">
      <svg className="p6-circuit-bsp-sim-svg" viewBox="0 0 360 190" aria-hidden="true">
        <CablePath d="M132 44 L120 44 L120 126 L166 126" color="red" />
        <CablePath d="M120 126 L120 176 L170 176" color="red" />
        <CablePath d="M228 44 L240 44 L240 126 L194 126" color="black" />
        <CablePath d="M240 126 L240 176 L190 176" color="black" />
        <ClipHead x={132} y={44} rotate={12} color="red" />
        <ClipHead x={228} y={44} rotate={168} color="black" />
        <ClipHead x={166} y={126} rotate={0} color="red" />
        <ClipHead x={194} y={126} rotate={180} color="black" />
        <ClipHead x={170} y={176} rotate={0} color="red" />
        <ClipHead x={190} y={176} rotate={180} color="black" />
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
      className="p6-circuit-bsp-summary-page relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-28 pt-8 text-slate-900 md:px-8 md:pb-32 md:pt-19"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="relative z-[1] mx-auto grid h-full w-full max-w-[1380px] grid-rows-[1fr] gap-2">
        <div className="p6-circuit-bsp-summary-card relative rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] px-[clamp(14px,1.6vw,20px)] pb-4 pt-4 shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <h1 className="mb-3 ml-1 mt-0 text-left text-[clamp(34px,2.5vw,54px)] font-black leading-[1.05] text-slate-900">
            {t.heading}
          </h1>
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
          onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/sim")}
          type="button"
          aria-label={t.nav.back}
          title={t.nav.back}
        >
          &laquo; {t.nav.back}
        </button>
        <button
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/result")}
          type="button"
          aria-label={t.nav.next}
          title={t.nav.next}
        >
          {t.nav.next} &raquo;
        </button>
      </div>
    </div>
  );
}
