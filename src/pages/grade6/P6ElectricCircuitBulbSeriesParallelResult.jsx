import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const TEXT = {
  th: {
    badge: "วงจรไฟฟ้าใกล้ตัว",
    title: "เรื่อง วงจรไฟฟ้าอย่างง่าย",
    section: "สรุปผลการทดลอง",
    intro: "จากการทดลองต่อหลอดไฟฟ้าในวงจรไฟฟ้าแบบอนุกรมและขนาน พบว่า",
    series: {
      heading: "การต่อแบบอนุกรม",
      body: "เมื่อหลอดไฟดวงหนึ่งดับ หลอดไฟดวงที่เหลือจะดับตามไปด้วย เพราะวงจรเปิด",
    },
    parallel: {
      heading: "การต่อแบบขนาน",
      body: "เมื่อหลอดไฟดวงหนึ่งดับ หลอดไฟอีกดวงที่เหลือยังสว่างอยู่ เพราะยังมีทางเดินกระแสไฟฟ้า",
    },
    back: "ย้อนกลับ",
    next: "สรุปสาระสำคัญ",
  },
  en: {
    badge: "Electricity Around You",
    title: "Simple Electric Circuits",
    section: "Experiment Summary",
    intro: "From experimenting with series and parallel bulb circuits, we found that",
    series: {
      heading: "Series connection",
      body: "If one bulb goes out, the remaining bulb also turns off because the circuit is open.",
    },
    parallel: {
      heading: "Parallel connection",
      body: "If one bulb goes out, the other bulb stays lit because its path is still complete.",
    },
    back: "Back",
    next: "Key Summary",
  },
  ms: {
    badge: "Litar elektrik dekat kita",
    title: "Litar elektrik mudah",
    section: "Rumusan eksperimen",
    intro: "Daripada ujian sambungan mentol siri dan selari, didapati bahawa",
    series: {
      heading: "Sambungan siri",
      body: "Apabila satu mentol padam, mentol lain turut padam kerana litar terbuka.",
    },
    parallel: {
      heading: "Sambungan selari",
      body: "Apabila satu mentol padam, mentol lain masih menyala kerana laluan masih lengkap.",
    },
    back: "Kembali",
    next: "Ringkasan Utama",
  },
};

function LanguagePills({ lang, setLang }) {
  const pills = [
    { code: "th", label: "ไทย" },
    { code: "en", label: "English" },
    { code: "ms", label: "Melayu" },
  ];

  return (
    <div className="inline-flex items-center gap-1 rounded-2xl bg-white p-2 shadow">
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

export default function P6ElectricCircuitBulbSeriesParallelResult() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TEXT[lang] ?? TEXT.th, [lang]);

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
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
          clipPath: "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.15))",
        }}
      />

      <div className="relative z-[1] mx-auto grid h-full w-full max-w-[1380px] grid-rows-[auto_auto_1fr_auto] gap-2">
        <div className="inline-flex w-fit items-center rounded-full bg-gradient-to-br from-[#6bc3f0] to-[#4c9ee1] px-[18px] py-2 text-base font-black text-white shadow-[0_12px_22px_rgba(16,24,39,0.14)]">
          {t.badge}
        </div>
        <h1 className="m-0 text-[clamp(32px,2.4vw,50px)] font-black leading-[1.05]">{t.title}</h1>

        <div className="relative rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] px-[clamp(14px,1.6vw,20px)] pb-4 pt-4 shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <div className="pointer-events-none absolute bottom-[-120px] right-[-100px] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.3),rgba(255,255,255,0))]" />

          <div className="grid gap-3 rounded-3xl border-2 border-white/75 bg-white/70 p-[clamp(16px,2vw,24px)]">
            <div className="inline-flex w-fit items-center gap-2.5 rounded-full bg-blue-600/20 px-4 py-1.5 text-[clamp(22px,1.6vw,30px)] font-black text-slate-900">
              {t.section}
            </div>

            <p className="m-0 text-[clamp(18px,1.6vw,26px)] font-bold leading-[1.4] text-slate-900">{t.intro}</p>

            <div className="space-y-3 rounded-[18px] border-4 border-slate-900 bg-[#fdfbf7] p-4 shadow-[0_12px_22px_rgba(0,0,0,0.16)]">
              <div className="text-[clamp(18px,1.5vw,24px)] font-black text-slate-900">{t.series.heading}</div>
              <div className="text-[clamp(16px,1.3vw,22px)] font-semibold text-slate-900">{t.series.body}</div>
            </div>

            <div className="space-y-3 rounded-[18px] border-4 border-slate-900 bg-[#fdfbf7] p-4 shadow-[0_12px_22px_rgba(0,0,0,0.16)]">
              <div className="text-[clamp(18px,1.5vw,24px)] font-black text-slate-900">{t.parallel.heading}</div>
              <div className="text-[clamp(16px,1.3vw,22px)] font-semibold text-slate-900">{t.parallel.body}</div>
            </div>
          </div>
        </div>

      </div>

      <div className="fixed bottom-3 right-3 z-20 flex flex-nowrap gap-2">
        <button
          className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-base font-bold text-slate-900 shadow"
          onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/summary")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          <span className="text-xl leading-none">←</span>
          <span>{t.back}</span>
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-base font-bold text-white shadow"
          onClick={() => navigate("/p6/electric-circuit/key-summary")}
          type="button"
          aria-label={t.next}
          title={t.next}
        >
          <span>{t.next}</span>
          <span className="text-xl leading-none">→</span>
        </button>
      </div>

      <div className="pointer-events-auto fixed bottom-4 left-4 z-20 max-sm:bottom-3 max-sm:left-3">
        <LanguagePills lang={lang} setLang={setLang} />
      </div>
    </div>
  );
}
