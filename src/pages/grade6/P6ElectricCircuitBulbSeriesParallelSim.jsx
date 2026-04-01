import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./P6ElectricCircuitBulbSeriesParallelSim.css";

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
    previewLabel: "ตัวอย่าง",
    trialLabel: "ทดลอง",
    series: {
      heading: "ต่อแบบขนาน",
      on: "วงจรปิด -> ทั้งสองหลอดสว่าง",
      off: "ถอดหลอดหนึ่งดวง -> วงจรเปิด ทั้งสองหลอดดับ",
    },
    parallel: {
      heading: "ต่อแบบอนุกรม",
      on: "วงจรปิด -> ทั้งสองหลอดสว่าง",
      oneOn: "ถอดหลอดหนึ่งดวง -> อีกหลอดยังสว่าง เพราะยังมีทางเดินกระแส",
    },
    back: "ย้อนกลับ",
    next: "ต่อไป",
    lang: { th: "ไทย", en: "English", ms: "Melayu" },
  },
  en: {
    badge: "Electricity Around You",
    title: "Simulate Series and Parallel Bulb Circuits",
    previewLabel: "Example",
    trialLabel: "Try It",
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
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    badge: "Litar elektrik dekat kita",
    title: "Simulasi sambungan mentol siri dan selari",
    previewLabel: "Contoh",
    trialLabel: "Uji",
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

function SeriesCircuit({ removed, onToggle, interactive = true }) {
  const bulbOn = !removed;
  return (
    <div
      className={`p6-circuit-bsp-sim-board ${interactive ? "" : "is-preview"}`}
      aria-label="Series circuit"
    >
      <svg className="p6-circuit-bsp-sim-svg" viewBox="0 0 360 190" aria-hidden="true">
        <path d="M116 66 H142" fill="none" stroke="#0f172a" strokeWidth={6} strokeLinecap="round" />
        <path d="M174 66 H206" fill="none" stroke="#0f172a" strokeWidth={6} strokeLinecap="round" />
        <path d="M238 66 H264 V128 H236" fill="none" stroke="#0f172a" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M186 128 H116 V66" fill="none" stroke="#0f172a" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
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
        <BulbNode isOn={bulbOn} onToggle={onToggle} clickable={interactive} />
      </div>
      <div className="p6-circuit-bsp-sim-bulb-b p6-circuit-bsp-sim-bulb-s2">
        <BulbNode isOn={bulbOn} onToggle={onToggle} clickable={interactive} />
      </div>
    </div>
  );
}

function ParallelCircuit({ removed, onToggle, interactive = true }) {
  const bulb1On = !removed;
  const bulb2On = true;
  return (
    <div
      className={`p6-circuit-bsp-sim-board ${interactive ? "" : "is-preview"}`}
      aria-label="Parallel circuit"
    >
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
        <BulbNode isOn={bulb1On} onToggle={onToggle} clickable={interactive} />
      </div>
      <div className="p6-circuit-bsp-sim-bulb-p2 p6-circuit-bsp-sim-bulb-p-mid">
        <BulbNode isOn={bulb2On} onToggle={() => {}} clickable={false} />
      </div>
    </div>
  );
}

function DualPanel({ leftTitle, rightTitle, leftBody, rightBody }) {
  return (
    <div className="p6-circuit-bsp-sim-dual">
      <div className="p6-circuit-bsp-sim-panel">
        <div className="p6-circuit-bsp-sim-panel-head">{leftTitle}</div>
        {leftBody}
      </div>
      <div className="p6-circuit-bsp-sim-panel">
        <div className="p6-circuit-bsp-sim-panel-head">{rightTitle}</div>
        {rightBody}
      </div>
    </div>
  );
}

export default function P6ElectricCircuitBulbSeriesParallelSim() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const [seriesRemoved, setSeriesRemoved] = useState(false);
  const [parallelRemoved, setParallelRemoved] = useState(false);
  const t = useMemo(() => TEXT[lang] ?? TEXT.th, [lang]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="p6-circuit-bsp-sim-page relative min-h-screen overflow-x-hidden overflow-y-scroll text-slate-900"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="p6-circuit-bsp-sim-stage relative z-[1] mx-auto">
        <div className="p6-circuit-bsp-sim-side p6-circuit-bsp-sim-side-left">
          <button
            className="p6-circuit-bsp-sim-back"
            onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/steps")}
            type="button"
            aria-label={t.back}
            title={t.back}
          >
            ← {t.back}
          </button>

          <div className="p6-circuit-bsp-sim-titlecard">
            <div className="p6-circuit-bsp-sim-badge">{t.badge}</div>
            <h1 className="p6-circuit-bsp-sim-title">{t.title}</h1>
          </div>

        </div>

        <div className="p6-circuit-bsp-sim-center">
          <div className="p6-circuit-bsp-sim-inner">
            <div className="p6-circuit-bsp-sim-table">
              <div className="p6-circuit-bsp-sim-head">{t.series.heading}</div>
              <div className="p6-circuit-bsp-sim-cell">
                <DualPanel
                  leftTitle={t.previewLabel}
                  rightTitle={t.trialLabel}
                  leftBody={
                    <>
                      <SeriesCircuit removed={false} onToggle={() => {}} interactive={false} />
                      <div className="p6-circuit-bsp-sim-status">{t.series.on}</div>
                    </>
                  }
                  rightBody={
                    <>
                      <SeriesCircuit removed={seriesRemoved} onToggle={() => setSeriesRemoved((v) => !v)} />
                      <div className="p6-circuit-bsp-sim-status">{seriesRemoved ? t.series.off : t.series.on}</div>
                    </>
                  }
                />
              </div>
              <div className="p6-circuit-bsp-sim-head">{t.parallel.heading}</div>
              <div className="p6-circuit-bsp-sim-cell">
                <DualPanel
                  leftTitle={t.previewLabel}
                  rightTitle={t.trialLabel}
                  leftBody={
                    <>
                      <ParallelCircuit removed={false} onToggle={() => {}} interactive={false} />
                      <div className="p6-circuit-bsp-sim-status">{t.parallel.on}</div>
                    </>
                  }
                  rightBody={
                    <>
                      <ParallelCircuit removed={parallelRemoved} onToggle={() => setParallelRemoved((v) => !v)} />
                      <div className="p6-circuit-bsp-sim-status">{parallelRemoved ? t.parallel.oneOn : t.parallel.on}</div>
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p6-circuit-bsp-sim-side p6-circuit-bsp-sim-side-right">
          <div className="p6-circuit-bsp-sim-bubble">{t.title}</div>
          <img
            className="p6-circuit-bsp-sim-character"
            src="/images/p4/exp1/character-boy.png"
            alt="นักเรียน"
          />
          <div className="mt-auto flex items-center justify-center gap-4">
            <button
              className="p6-circuit-bsp-sim-action p6-circuit-bsp-sim-action-secondary"
              onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/steps")}
              type="button"
            >
              <span>←</span>
              <span>{t.back}</span>
            </button>
            <button
              className="p6-circuit-bsp-sim-action p6-circuit-bsp-sim-action-primary"
              onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/summary")}
              type="button"
            >
              <span>→</span>
              <span>{t.next}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-3 left-3 z-20 flex gap-3 rounded-2xl bg-white p-2 shadow">
        <LanguagePills lang={lang} setLang={setLang} labels={t.lang} />
      </div>
    </div>
  );
}

