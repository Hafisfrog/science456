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
    back: "ย้อนกลับ",
    next: "ไปต่อ",
  },
  en: {
    section: "Experiment Summary",
    summary:
      "From the activity, we found that connecting more cells in series increases the current in the circuit, making the bulb brighter as the number of cells increases.",
    listen: "Listen",
    back: "Back",
    next: "Next",
  },
  ms: {
    section: "Rumusan Eksperimen",
    summary:
      "Daripada aktiviti ini, didapati bahawa apabila lebih banyak sel disusun secara siri, arus dalam litar bertambah dan mentol menjadi lebih terang apabila bilangan sel meningkat.",
    listen: "Dengar rumusan",
    back: "Kembali",
    next: "Seterusnya",
  },
};

const LANGS = [
  { id: "th", label: "ไทย" },
  { id: "en", label: "อังกฤษ" },
  { id: "ms", label: "มลายู" },
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

function CircuitSummaryVisual({ cells }) {
  const glow = cells === 1 ? 0.22 : cells === 2 ? 0.5 : cells === 3 ? 0.75 : 1;
  return (
    <div className="relative mx-auto mt-5 h-[150px] w-full max-w-[560px]">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 560 150" aria-hidden="true">
        <path d="M210 62 C 282 48, 340 48, 398 58" stroke="#111827" strokeOpacity="0.22" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M210 62 C 282 48, 340 48, 398 58" stroke="#0b1020" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M210 90 C 258 122, 302 134, 322 130" stroke="#111827" strokeOpacity="0.2" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M210 90 C 258 122, 302 134, 322 130" stroke="#ef4444" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M356 130 C 404 142, 444 134, 436 92" stroke="#111827" strokeOpacity="0.2" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M356 130 C 404 142, 444 134, 436 92" stroke="#ef4444" strokeWidth="5" fill="none" strokeLinecap="round" />
      </svg>

      <div className="absolute left-[36px] top-[28px] h-[88px] w-[174px]">
        <div className="absolute inset-0 rounded-[16px] border-[2px] border-[#2f4561] bg-gradient-to-b from-[#5d7697] to-[#2f4561]" />
        <div className="absolute inset-x-[10px] top-[6px] h-[8px] rounded-full bg-[#23354b]/70" />
        <div className="absolute left-1/2 top-[16px] flex -translate-x-1/2 gap-[4px]">
          {[0, 1, 2, 3].map((idx) => (
            <div key={idx} className="h-[56px] w-[27px] overflow-hidden rounded-[6px] border border-slate-300 bg-white/80">
              {idx < cells ? (
                <EquipmentImage
                  src={DEVICE_MEDIA.cell.image}
                  fallbackSrc={DEVICE_MEDIA.cell.fallbackImage}
                  alt={`battery ${idx + 1}`}
                  className="h-full w-full object-cover object-center mix-blend-multiply"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-[300px] top-[58px] h-[92px] w-[64px]">
        <EquipmentImage
          src={DEVICE_MEDIA.switch.image}
          fallbackSrc={DEVICE_MEDIA.switch.fallbackImage}
          alt="switch"
          className="h-full w-full object-contain"
        />
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
  const t = useMemo(() => TEXT[lang] || TEXT.th, [lang]);
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
                {"\uD83D\uDD0A"}
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
              <div className="min-w-[110px] text-center text-[20px] font-black text-slate-800">
                {summaryCells} ก้อน
              </div>
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

      <div className="fixed bottom-6 right-6 z-20 flex items-center gap-3">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-white/90 px-[18px] py-[14px] font-black text-[#213a8f] shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
          onClick={() => navigate("/p6/electric-circuit/result")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          <span className="text-[20px] leading-none">&laquo;</span>
          <span className="text-[20px] leading-none">{t.back}</span>
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-[#2563eb] px-[18px] py-[14px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
          onClick={() => navigate("/p6/electric-circuit/experiments")}
          type="button"
          aria-label={t.next}
          title={t.next}
        >
          <span className="text-[20px] leading-none">{t.next}</span>
          <span className="text-[20px] leading-none">&raquo;</span>
        </button>
      </div>
    </div>
  );
}

