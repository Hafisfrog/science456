import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./P6ElectricCircuitBulbSeriesParallelSim.css";

const DEVICE_MEDIA = {
  holder: {
    image: "/images/p6/electric-circuit/battery-holder-empty.svg",
    fallbackImage: "/images/p6/electric-circuit/battery-holder.svg",
  },
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
    previewLabel: "ภาพอ้างอิง (แก้ไม่ได้)",
    trialLabel: "พื้นที่ทดลอง (กดได้)",
    steps: "วิธีใช้: 1) ดูภาพอ้างอิง 2) กดหลอดไฟในพื้นที่ทดลอง 3) ดูผลตอนนี้",
    series: {
      heading: "ต่อแบบอนุกรม",
      on: "วงจรปิด -> ทั้งสองหลอดสว่าง",
      off: "ถอดหลอดหนึ่งดวง -> วงจรเปิด ทั้งสองหลอดดับ",
    },
    parallel: {
      heading: "ต่อแบบขนาน",
      on: "วงจรปิด -> ทั้งสองหลอดสว่าง",
      oneOn: "ถอดหลอดหนึ่งดวง -> อีกหลอดยังสว่าง เพราะยังมีทางเดินกระแส",
    },
    back: "ย้อนกลับ",
    next: "ไปต่อ",
  },
  en: {
    badge: "Electricity Around You",
    title: "Simulate Series and Parallel Bulb Circuits",
    previewLabel: "Reference (read-only)",
    trialLabel: "Practice area (interactive)",
    steps: "How to use: 1) See reference 2) Tap bulb in practice area 3) Read current result",
    series: {
      heading: "Series connection",
      on: "Circuit closed -> both bulbs light up",
      off: "Remove one bulb -> circuit opens, both bulbs go off",
    },
    parallel: {
      heading: "Parallel connection",
      on: "Circuit closed -> both bulbs light up",
      oneOn: "Remove one bulb -> the other stays on",
    },
    back: "Back",
    next: "Next",
  },
  ms: {
    badge: "Litar elektrik dekat kita",
    title: "Simulasi sambungan mentol siri dan selari",
    previewLabel: "Rujukan (tidak boleh ubah)",
    trialLabel: "Ruang uji (boleh tekan)",
    steps: "Cara guna: 1) Lihat rujukan 2) Tekan mentol di ruang uji 3) Lihat hasil semasa",
    series: {
      heading: "Sambungan siri",
      on: "Litar tertutup -> kedua-dua mentol menyala",
      off: "Tanggal satu mentol -> litar terbuka, kedua-dua mentol padam",
    },
    parallel: {
      heading: "Sambungan selari",
      on: "Litar tertutup -> kedua-dua mentol menyala",
      oneOn: "Tanggal satu mentol -> mentol lain masih menyala",
    },
    back: "Kembali",
    next: "Seterusnya",
  },
};

const LANGS = [
  { id: "th", label: "ไทย" },
  { id: "en", label: "อังกฤษ" },
  { id: "ms", label: "มลายู" },
];

function LanguagePills({ lang, setLang, labels }) {
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
            lang === p.code
              ? "bg-sky-500 text-white"
              : "bg-sky-100 text-slate-800"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
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

function BulbNode({ isOn, onToggle, clickable = true }) {
  return (
    <button
      type="button"
      className={`p6-circuit-bsp-sim-bulb-node ${clickable ? "is-clickable" : ""} ${!isOn ? "is-removed" : ""}`}
      onClick={clickable ? onToggle : undefined}
      aria-label={clickable ? "toggle bulb" : undefined}
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

function WirePath({ d }) {
  return (
    <>
      <path d={d} fill="none" stroke="rgba(2, 6, 23, 0.26)" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke="#0f172a" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke="rgba(148, 163, 184, 0.55)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function BlueWirePath({ d }) {
  return (
    <>
      <path d={d} fill="none" stroke="rgba(2, 6, 23, 0.26)" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke="#020617" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke="rgba(148, 163, 184, 0.55)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function CablePath({ d, color = "black" }) {
  const isRed = color === "red";
  return (
    <>
      <path d={d} fill="none" stroke="rgba(2,6,23,0.2)" strokeWidth={7.8} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke="#020617" strokeWidth={5.8} strokeLinecap="round" strokeLinejoin="round" />
      <path
        d={d}
        fill="none"
        stroke={isRed ? "#ff3b2a" : "#0b1020"}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

function SeriesCircuit({ removed, onToggle, interactive = true }) {
  const bulbOn = !removed;
  return (
    <div
      className={`p6-circuit-bsp-sim-board ${interactive ? "" : "is-preview"}`}
      aria-label="Series circuit"
    >
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
        <BulbNode isOn={bulbOn} onToggle={onToggle} clickable={interactive} />
      </div>
      <div className="p6-circuit-bsp-sim-bulb-b p6-circuit-bsp-sim-bulb-s2">
        <BulbNode isOn={bulbOn} onToggle={onToggle} clickable={interactive} />
      </div>
      <div className="p6-circuit-bsp-sim-label p6-circuit-bsp-sim-label-a">A</div>
      <div className="p6-circuit-bsp-sim-label p6-circuit-bsp-sim-label-b">B</div>
    </div>
  );
}

function ParallelCircuit({ removed, onToggle, interactive = true }) {
  const bulb1On = !removed;
  const bulb2On = true;
  return (
    <div
      className={`p6-circuit-bsp-sim-board is-parallel-layout ${interactive ? "" : "is-preview"}`}
      aria-label="Parallel circuit"
    >
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
        <BulbNode isOn={bulb1On} onToggle={onToggle} clickable={interactive} />
      </div>
      <div className="p6-circuit-bsp-sim-bulb-p2 p6-circuit-bsp-sim-bulb-p-mid">
        <BulbNode isOn={bulb2On} onToggle={() => {}} clickable={false} />
      </div>
    </div>
  );
}

export default function P6ElectricCircuitBulbSeriesParallelSim() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const [seriesRemoved, setSeriesRemoved] = useState(false);
  const [parallelRemoved, setParallelRemoved] = useState(false);
  const [mode, setMode] = useState("series");
  const t = useMemo(() => TEXT[lang] ?? TEXT.th, [lang]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  const isParallelMode = mode === "parallel";
  const heading = isParallelMode ? t.parallel.heading : t.series.heading;

  return (
    <div
      className="p6-circuit-bsp-sim-page relative min-h-screen overflow-x-hidden overflow-y-scroll text-slate-900"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="p6-circuit-bsp-sim-stage relative z-[1] mx-auto">
        <div className="p6-circuit-bsp-sim-side p6-circuit-bsp-sim-side-left">
          <div className="p6-circuit-bsp-sim-selector">
            <div className="p6-circuit-bsp-sim-mode-tabs is-side">
              <button
                type="button"
                className={`p6-circuit-bsp-sim-mode-tab ${isParallelMode ? "is-active is-parallel" : ""}`}
                onClick={() => setMode("parallel")}
              >
                {t.parallel.heading}
              </button>
              <button
                type="button"
                className={`p6-circuit-bsp-sim-mode-tab ${!isParallelMode ? "is-active is-series" : ""}`}
                onClick={() => setMode("series")}
              >
                {t.series.heading}
              </button>
            </div>

            <div className="p6-circuit-bsp-sim-preview-wrap">
              <div className="p6-circuit-bsp-sim-panel-head">{t.previewLabel}</div>
              {isParallelMode ? (
                <ParallelCircuit removed={false} onToggle={() => {}} interactive={false} />
              ) : (
                <SeriesCircuit removed={false} onToggle={() => {}} interactive={false} />
              )}
              <div className="p6-circuit-bsp-sim-status">
                {isParallelMode ? t.parallel.on : t.series.on}
              </div>
            </div>
          </div>
        </div>

        <div className="p6-circuit-bsp-sim-center">
          <div className="p6-circuit-bsp-sim-inner">
            <div className="p6-circuit-bsp-sim-table">
              <div className={`p6-circuit-bsp-sim-head ${isParallelMode ? "is-parallel" : "is-series"}`}>{heading}</div>
              <div className="p6-circuit-bsp-sim-cell">
                <div className="p6-circuit-bsp-sim-steps">{t.steps}</div>
                <div className="p6-circuit-bsp-sim-trial-only">
                  <div className="p6-circuit-bsp-sim-panel-head">{t.trialLabel}</div>
                  {isParallelMode ? (
                    <ParallelCircuit removed={parallelRemoved} onToggle={() => setParallelRemoved((v) => !v)} />
                  ) : (
                    <SeriesCircuit removed={seriesRemoved} onToggle={() => setSeriesRemoved((v) => !v)} />
                  )}
                  <div className="fixed bottom-3 right-3 z-40 flex gap-3">
                    <button
                      className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-white/90 px-[18px] py-[14px] font-black text-[#213a8f] shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
                      onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/steps")}
                      type="button"
                      aria-label={t.back}
                      title={t.back}
                    >
                      <span className="text-[20px] leading-none">&laquo;</span>
                      <span className="text-[20px] leading-none">{t.back}</span>
                    </button>
                    <button
                      className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-[#2563eb] px-[18px] py-[14px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
                      onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/summary")}
                      type="button"
                      aria-label={t.next}
                      title={t.next}
                    >
                      <span className="text-[20px] leading-none">{t.next}</span>
                      <span className="text-[20px] leading-none">&raquo;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-6 left-6 z-20 inline-flex gap-2 rounded-[20px] bg-white/95 px-3 py-[10px] shadow-[0_18px_40px_rgba(111,144,186,0.2)]">
          {LANGS.map((item) => (
            <button
              key={item.id}
              onClick={() => setLang(item.id)}
              className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
                lang === item.id ? "bg-[#bdd9f8]" : "bg-[#eaf3ff]"
              }`}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>

      </div>

      
    </div>
  );
}
