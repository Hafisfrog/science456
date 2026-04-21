import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย" },
  { id: "ms", label: "มลายู" },
  { id: "en", label: "อังกฤษ" },
];

const TEXT = {
  th: {
    title: "ผลการทดลอง",
    headers: ["วัสดุ", "ขัดถูด้วยกระดาษเยื่อทั้ง 2", "ขัดถูด้วยกระดาษเยื่อแค่ 1"],
    rows: [
      { label: "ลูกโป่ง", both: "ผลักกัน", one: "ดึงดูดกัน" },
      { label: "ปากกาเมจิก", both: "ผลักกัน", one: "ดึงดูดกัน" },
    ],
    back: "ย้อนกลับ",
    next: "ต่อไป",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    title: "Experiment Results",
    headers: ["Material", "Both rubbed with tissue", "Only 1 rubbed with tissue"],
    rows: [
      { label: "Balloon", both: "Repel", one: "Attract" },
      { label: "Marker pen", both: "Repel", one: "Attract" },
    ],
    back: "Back",
    next: "Next",
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    title: "Hasil Eksperimen",
    headers: ["Bahan", "Kedua-duanya digosok dengan tisu", "Hanya 1 digosok dengan tisu"],
    rows: [
      { label: "Belon", both: "Tolak-menolak", one: "Tarik-menarik" },
      { label: "Pen marker", both: "Tolak-menolak", one: "Tarik-menarik" },
    ],
    back: "Kembali",
    next: "Seterusnya",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

export default function P6ElectricForceEffectResult() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const t = useMemo(() => TEXT[language] ?? TEXT.th, [language]);

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-28 pt-3 text-slate-900 md:px-8 md:pb-32"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="relative z-[1] mx-auto grid h-full w-full max-w-[1380px] grid-rows-[1fr] gap-2">
        <div className="relative rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] px-[clamp(14px,1.6vw,20px)] pb-4 pt-4 shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <h1 className="mb-3 ml-1 mt-0 text-left text-[clamp(34px,2.5vw,54px)] font-black leading-[1.05] text-slate-900">
            {t.title}
          </h1>
          <div className="rounded-[24px] border-2 border-slate-700 bg-[#e5e7eb] p-[6px]">
            <div className="overflow-hidden rounded-[16px] border-2 border-slate-600">
              <div className="grid grid-cols-[1fr_1.3fr_1.3fr] bg-[#d7dbe0] text-center text-[clamp(15px,1.6vw,18px)] font-black">
                {t.headers.map((head) => (
                  <div key={head} className="border-r-2 border-slate-600 px-3 py-5 last:border-r-0">
                    {head}
                  </div>
                ))}
              </div>

              {t.rows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[1fr_1.3fr_1.3fr] bg-[#d7dbe0] text-center text-[clamp(15px,1.6vw,18px)] font-bold"
                >
                  <div className="flex items-center justify-center border-r-2 border-t-2 border-slate-600 px-3 py-10">
                    {row.label}
                  </div>
                  <div className="flex items-center justify-center border-r-2 border-t-2 border-slate-600 px-3 py-10">
                    {row.both}
                  </div>
                  <div className="flex items-center justify-center border-t-2 border-slate-600 px-3 py-10">
                    {row.one}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
        <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
          {LANGUAGE_OPTIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => setLanguage(item.id)}
              className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold text-slate-900 transition ${
                language === item.id
                  ? "bg-[#bfe0ff] text-slate-900"
                  : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
              }`}
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
          type="button"
          onClick={() => navigate("/p6/experiment/electric-force-effect/sim")}
          aria-label={t.back}
          title={t.back}
        >
          &laquo; {t.back}
        </button>
        <button
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          type="button"
          onClick={() => navigate("/p6/experiment/electric-force-effect/key-summary")}
          aria-label={t.next}
          title={t.next}
        >
          {t.next} &raquo;
        </button>
      </div>
    </div>
  );
}

