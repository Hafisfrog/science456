import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./P6ElectricCircuitBulbSeriesParallelSim.css";
import "./P6ElectricCircuitBulbSeriesParallelSummary.css";

const DEVICE_MEDIA = {
  holder: {
    image: "/images/p6/electric-circuit/battery-holder-photo.webp",
    fallbackImage: "/images/p6/electric-circuit/battery-holder.svg",
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
      parallelNote: "หลอดไฟอีกดวงยังสว่างอยู่",
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

function SeriesCircuit({ removed }) {
  const bulbOn = !removed;
  return (
    <div className="p6-circuit-bsp-sim-board p6-circuit-bsp-summary-board" aria-label="Series circuit">
      <svg className="p6-circuit-bsp-sim-svg" viewBox="0 0 360 190" aria-hidden="true">
        <path d="M116 66 H142" fill="none" stroke="#0f172a" strokeWidth={6} strokeLinecap="round" />
        <path d="M174 66 H206" fill="none" stroke="#0f172a" strokeWidth={6} strokeLinecap="round" />
        <path
          d="M238 66 H264 V128 H236"
          fill="none"
          stroke="#0f172a"
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M186 128 H116 V66"
          fill="none"
          stroke="#0f172a"
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="p6-circuit-bsp-sim-holder p6-circuit-bsp-sim-holder-s">
        <EquipmentImage
          src={DEVICE_MEDIA.holder.image}
          fallbackSrc={DEVICE_MEDIA.holder.fallbackImage}
          alt="holder"
          className="p6-circuit-bsp-sim-holder-img"
        />
      </div>
      <div className="p6-circuit-bsp-sim-bulb-a p6-circuit-bsp-sim-bulb-s1">
        <BulbNode isOn={bulbOn} />
      </div>
      <div className="p6-circuit-bsp-sim-bulb-b p6-circuit-bsp-sim-bulb-s2">
        <BulbNode isOn={bulbOn} />
      </div>
    </div>
  );
}

function ParallelCircuit({ removed }) {
  const bulb1On = !removed;
  const bulb2On = true;
  return (
    <div className="p6-circuit-bsp-sim-board p6-circuit-bsp-summary-board" aria-label="Parallel circuit">
      <svg className="p6-circuit-bsp-sim-svg" viewBox="0 0 360 190" aria-hidden="true">
        <path d="M116 74 H264 V134 H116 Z" fill="none" stroke="#0f172a" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M190 74 V92" fill="none" stroke="#0f172a" strokeWidth={6} strokeLinecap="round" />
        <path d="M190 112 V134" fill="none" stroke="#0f172a" strokeWidth={6} strokeLinecap="round" />
      </svg>
      <div className="p6-circuit-bsp-sim-holder p6-circuit-bsp-sim-holder-p">
        <EquipmentImage
          src={DEVICE_MEDIA.holder.image}
          fallbackSrc={DEVICE_MEDIA.holder.fallbackImage}
          alt="holder"
          className="p6-circuit-bsp-sim-holder-img"
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
  const pills = [
    { code: "th", label: "ไทย" },
    { code: "en", label: "English" },
    { code: "ms", label: "Melayu" },
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
      <div className="relative z-[1] mx-auto grid h-full w-full max-w-[1380px] grid-rows-[auto_auto_1fr] gap-2">
        <div className="inline-flex w-fit items-center rounded-full bg-gradient-to-br from-[#6bc3f0] to-[#4c9ee1] px-[18px] py-2 text-base font-black text-white shadow-[0_12px_22px_rgba(16,24,39,0.14)]">
          {t.badge}
        </div>
        <h1 className="m-0 text-[clamp(32px,2.3vw,50px)] font-black leading-[1.05]">{t.title}</h1>

        <div className="p6-circuit-bsp-summary-card relative rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] px-[clamp(14px,1.6vw,20px)] pb-4 pt-4 shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <div className="p6-circuit-bsp-summary-inner">
            <div className="p6-circuit-bsp-summary-title">{t.heading}</div>

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

      <div className="fixed bottom-3 left-3 flex gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_10px_22px_rgba(0,0,0,0.12)]">

        <button
          onClick={() => setLang("th")}
          className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
            lang === "th" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
          }`}
        >
          ไทย
        </button>

        <button
          onClick={() => setLang("en")}
          className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
            lang === "en" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
          }`}
        >
          English
        </button>

        <button
          onClick={() => setLang("ms")}
          className={`rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
            lang === "ms" ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
          }`}
        >
          Melayu
        </button>

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
