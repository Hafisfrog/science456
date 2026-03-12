import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const TRANSLATIONS = {
  th: {
    badge: "วงจรไฟฟ้าใกล้ตัว",
    title: "การต่อหลอดไฟฟ้าแบบอนุกรมและแบบขนาน",
    equipmentHeading: "อุปกรณ์ที่ต้องเตรียม",
    back: "ย้อนกลับ",
    next: "ไปต่อ",
    sound: "เปิดเสียง",
    equipment: {
      cell: { title: "ถ่านไฟฉาย", subtitle: "4 ก้อน" },
      wire: { title: "สายไฟพร้อมหัวหนีบ", subtitle: "4 เส้น" },
      holder: { title: "กระบะใส่ถ่านไฟฉาย", subtitle: "สำหรับ 4 ก้อน" },
      bulb: { title: "หลอดไฟพร้อมฐาน", subtitle: "1 ชุด" },
    },
  },
  en: {
    badge: "Electricity Around You",
    title: "Connecting Bulbs in Series and Parallel",
    equipmentHeading: "Equipment to Prepare",
    back: "Back",
    next: "Next",
    sound: "Sound",
    equipment: {
      cell: { title: "Battery", subtitle: "4 cells" },
      wire: { title: "Wires with clips", subtitle: "4 wires" },
      holder: { title: "Battery holder", subtitle: "for 4 cells" },
      bulb: { title: "Bulb with base", subtitle: "1 set" },
    },
  },
  ms: {
    badge: "Litar elektrik dekat kita",
    title: "Sambungan mentol siri dan selari",
    equipmentHeading: "Peralatan yang perlu disedia",
    back: "Kembali",
    next: "Seterusnya",
    sound: "Bunyi",
    equipment: {
      cell: { title: "Bateri", subtitle: "4 biji" },
      wire: { title: "Wayar dengan klip", subtitle: "4 utas" },
      holder: { title: "Bekas bateri", subtitle: "untuk 4 biji" },
      bulb: { title: "Mentol dengan tapak", subtitle: "1 set" },
    },
  },
};

const EQUIPMENT = ["cell", "wire", "holder", "bulb"];

function EquipmentIcon({ id }) {
  if (id === "cell") {
    return (
      <svg className="h-[86px] w-[86px]" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <rect x="20" y="18" width="20" height="58" rx="8" fill="#f59e0b" />
        <rect x="48" y="18" width="20" height="58" rx="8" fill="#f59e0b" />
        <rect x="22" y="14" width="16" height="8" rx="4" fill="#cbd5e1" />
        <rect x="50" y="14" width="16" height="8" rx="4" fill="#cbd5e1" />
        <rect x="20" y="44" width="20" height="7" rx="3.5" fill="#111827" opacity="0.35" />
        <rect x="48" y="44" width="20" height="7" rx="3.5" fill="#111827" opacity="0.35" />
      </svg>
    );
  }

  if (id === "wire") {
    return (
      <svg className="h-[86px] w-[86px]" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <path d="M14 58c18-24 50-24 68 0" fill="none" stroke="#1f2937" strokeWidth="6" strokeLinecap="round" />
        <path d="M14 34c18-20 50-20 68 0" fill="none" stroke="#1f2937" strokeWidth="6" strokeLinecap="round" />
        <path d="M14 58c18-24 50-24 68 0" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
        <path d="M14 34c18-20 50-20 68 0" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
        <rect x="8" y="52" width="14" height="10" rx="3" fill="#0f172a" />
        <rect x="74" y="52" width="14" height="10" rx="3" fill="#0f172a" />
        <rect x="8" y="28" width="14" height="10" rx="3" fill="#0f172a" />
        <rect x="74" y="28" width="14" height="10" rx="3" fill="#0f172a" />
      </svg>
    );
  }

  if (id === "holder") {
    return (
      <svg className="h-[86px] w-[86px]" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <rect x="10" y="24" width="76" height="48" rx="12" fill="#1f2937" />
        <rect x="14" y="28" width="68" height="40" rx="9" fill="#111827" />
        <rect x="18" y="32" width="14" height="30" rx="6" fill="#f59e0b" />
        <rect x="34" y="32" width="14" height="30" rx="6" fill="#f59e0b" />
        <rect x="50" y="32" width="14" height="30" rx="6" fill="#f59e0b" />
        <rect x="66" y="32" width="14" height="30" rx="6" fill="#f59e0b" />
      </svg>
    );
  }

  return (
    <svg className="h-[86px] w-[86px]" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
      <circle cx="48" cy="34" r="22" fill="#ffe38b" stroke="#334155" strokeWidth="3" />
      <ellipse cx="40" cy="24" rx="8" ry="5" fill="#ffffff" opacity="0.55" />
      <path d="M40 52h16v8H40z" fill="#8b98aa" />
      <path d="M38 60h20v4H38zm1 6h18v4H39zm2 6h14v5H41z" fill="#64748b" />
    </svg>
  );
}

export default function P6ElectricCircuitBulbSeriesParallel() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TRANSLATIONS[lang] ?? TRANSLATIONS.th, [lang]);

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div className="min-h-screen px-4 pb-6 pt-4 text-slate-900 md:px-8" style={pageBg}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(110px,10vw,180px)] top-[10px] h-[clamp(96px,10vw,136px)] w-[clamp(60px,6vw,92px)] bg-[#f7bd2b]"
        style={{
          clipPath: "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.15))",
        }}
      />

      <div className="relative z-[1] mx-auto flex max-w-[1380px] flex-col gap-3">
        <div className="inline-flex w-fit items-center rounded-full bg-gradient-to-br from-[#6bc3f0] to-[#4c9ee1] px-[18px] py-2 text-base font-black text-white shadow-[0_12px_22px_rgba(16,24,39,0.14)]">
          {t.badge}
        </div>
        <div className="m-0 text-[clamp(32px,2.5vw,54px)] font-black leading-[1.08]">
          {t.title}
        </div>

        <div className="relative overflow-visible rounded-[34px] border-[3px] border-white/85 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] p-[clamp(18px,2vw,26px)] shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <div className="pointer-events-none absolute bottom-[-120px] right-[-100px] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.3),rgba(255,255,255,0))]" />

          <div
            className="absolute right-[22px] top-3 grid h-[56px] w-[56px] place-items-center rounded-2xl border-2 border-slate-900/40 bg-white/80 text-slate-800 shadow-[0_10px_18px_rgba(17,24,39,0.16)]"
            title={t.sound}
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
              <path d="M44 22c4 4 4 16 0 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M50 16c7 7 7 25 0 32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          <div className="rounded-[28px] border-2 border-white/80 bg-[#e8f1f8]/95 px-[clamp(16px,1.6vw,22px)] py-[clamp(16px,1.6vw,22px)] shadow-[0_14px_26px_rgba(15,23,42,0.12)]">
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full bg-blue-600/15 px-4 py-1.5 font-black text-slate-900">
              {t.equipmentHeading}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {EQUIPMENT.map((id) => (
                <div
                  key={id}
                  className="group flex flex-col items-center gap-3 rounded-[28px] border-[3px] border-white/80 bg-white/95 px-4 py-5 text-center shadow-[0_16px_28px_rgba(15,23,42,0.14)] transition duration-150 hover:-translate-y-1 hover:shadow-[0_20px_32px_rgba(15,23,42,0.18)]"
                >
                  <div className="grid h-[122px] w-[122px] place-items-center rounded-[26px] border-4 border-[#ddecf7] bg-white shadow-[inset_0_6px_12px_rgba(255,255,255,0.55),0_12px_18px_rgba(17,24,39,0.14)]">
                    <EquipmentIcon id={id} />
                  </div>
                  <div className="text-[20px] font-black leading-tight text-slate-900">{t.equipment[id].title}</div>
                  <div className="text-[16px] font-bold text-slate-700">{t.equipment[id].subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-1 flex justify-end gap-3">
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-[28px] font-black leading-none text-slate-900 shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
            onClick={() => navigate("/p6/electric-circuit/experiments")}
            type="button"
            aria-label={t.back}
            title={t.back}
          >
            ←
          </button>
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-blue-600 text-[28px] font-black leading-none text-white shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
            onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/steps")}
            type="button"
            aria-label={t.next}
            title={t.next}
          >
            →
          </button>
        </div>
      </div>

      <div className="pointer-events-auto fixed left-4 bottom-4 z-20 max-sm:left-3 max-sm:bottom-3">
        <div className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 shadow-[0_14px_26px_rgba(0,0,0,0.14)] ring-2 ring-white/85 backdrop-blur-md">
          {["th", "en", "ms"].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              className={`rounded-full px-4 py-2 text-[15px] font-black transition ${
                lang === code
                  ? "bg-blue-600 text-white shadow-[0_8px_16px_rgba(37,99,235,0.35)]"
                  : "text-slate-800 hover:bg-white"
              }`}
            >
              {code === "th" ? "ไทย" : code === "en" ? "English" : "Melayu"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
