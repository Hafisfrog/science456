import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const TEXT = {
  th: {
    title: "สรุปผลการทดลอง",
    summaryLines: [
      "เมื่อลูกโป่งทั้ง 2 ใบถูกขัดด้วยผ้าแห้ง ลูกโป่งทั้งสองจะมีประจุชนิดเดียวกัน เมื่อนำมาเข้าใกล้กันจึงเกิดแรงผลักกัน",
      "เมื่อขัดลูกโป่งเพียง 1 ใบ อีกใบไม่ถูกขัด จะเกิดการเหนี่ยวนำประจุ เมื่อนำมาเข้าใกล้กันจึงเกิดแรงดึงดูดกัน",
    ],
    back: "ย้อนกลับ",
    next: "ต่อไป",
    visualTitle: "ภาพประกอบการทดลอง",
    level0Label: "ไม่ถู (0 นาที): ยังไม่ดูดเศษกระดาษ",
    level2Label: "ถู 2 นาที: ดูดเศษกระดาษเล็กน้อย",
    level5Label: "ถู 5 นาที: ดูดเศษกระดาษมากขึ้น",
  },
  en: {
    title: "Experiment Summary",
    summaryLines: [
      "When both balloons are rubbed with dry cloth, they get the same type of charge, so they repel each other when brought close.",
      "When only one balloon is rubbed, charge induction occurs and the balloons attract each other when brought close.",
    ],
    back: "Back",
    next: "Next",
    visualTitle: "Experiment Illustration",
    level0Label: "No rub (0 min): no visible paper attraction",
    level2Label: "Rub 2 min: slight attraction",
    level5Label: "Rub 5 min: stronger attraction",
  },
  ms: {
    title: "Ringkasan Eksperimen",
    summaryLines: [
      "Apabila kedua-dua belon digosok dengan kain kering, kedua-duanya bercas sama lalu menolak apabila didekatkan.",
      "Apabila hanya satu belon digosok, aruhan cas berlaku dan kedua-duanya akan menarik apabila didekatkan.",
    ],
    back: "Kembali",
    next: "Seterusnya",
    visualTitle: "Ilustrasi Eksperimen",
    level0Label: "Tidak digosok (0 min): belum menarik kertas",
    level2Label: "Gosok 2 minit: menarik sedikit",
    level5Label: "Gosok 5 minit: menarik lebih banyak",
  },
};

export default function P6ElectricGenerationKeySummary() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TEXT[lang] ?? TEXT.th, [lang]);
  const langLabels = { th: "ไทย", en: "อังกฤษ", ms: "มลายู" };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-6 pt-3 text-slate-900 md:px-8"
      style={{
        fontFamily: "Prompt, sans-serif",
        background:
          "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
      }}
    >
      <div className="relative z-[1] mx-auto flex w-full max-w-[1200px] flex-col gap-4">
        <div className="relative overflow-hidden rounded-[26px] border border-white/90 bg-[#e8f5ff]/95 p-[clamp(22px,3vw,34px)] shadow-[0_18px_30px_rgba(17,24,39,0.14)]">
          <h1 className="m-0 text-[clamp(28px,3.2vw,40px)] font-black text-slate-900">{t.title}</h1>

          <div className="mt-4 grid gap-4 text-[clamp(16px,1.6vw,18px)] font-semibold leading-[1.7] text-slate-900">
            {t.summaryLines.map((line, idx) => (
              <p key={idx} className="m-0">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-2 rounded-[22px] border border-white/90 bg-white/85 p-4 shadow-[0_14px_24px_rgba(17,24,39,0.12)]">
          <p className="m-0 text-[clamp(16px,1.3vw,20px)] font-black text-slate-900">{t.visualTitle}</p>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            <article className="rounded-[16px] bg-[linear-gradient(180deg,#f4f8ff_0%,#e8f1ff_100%)] p-3">
              <p className="mb-2 mt-0 text-[clamp(13px,1vw,16px)] font-bold text-slate-700">{t.level0Label}</p>
              <div className="relative h-[142px] overflow-hidden rounded-[12px] bg-[#dbe8f7]">
                <img
                  src="/images/p6/equipment/lukpong-cut.png"
                  alt="balloon"
                  className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_10px_18px_rgba(15,23,42,0.22)]"
                />
              </div>
            </article>

            <article className="rounded-[16px] bg-[linear-gradient(180deg,#f4f8ff_0%,#e8f1ff_100%)] p-3">
              <p className="mb-2 mt-0 text-[clamp(13px,1vw,16px)] font-bold text-slate-700">{t.level2Label}</p>
              <div className="relative h-[142px] overflow-hidden rounded-[12px] bg-[#dbe8f7]">
                <img
                  src="/images/p6/equipment/lukpong-cut.png"
                  alt="balloon"
                  className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_10px_18px_rgba(15,23,42,0.22)]"
                />
                <div className="pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[26px] w-[24px] -translate-x-1/2 -translate-y-1/2">
                  <img src="/images/p6/equipment/tissue-real.svg" alt="" className="absolute left-[4px] top-[2px] h-[11px] w-auto rotate-[8deg] opacity-86" />
                  <img src="/images/p6/equipment/tissue-real.svg" alt="" className="absolute left-[8px] top-[9px] h-[11px] w-auto rotate-[-14deg] opacity-82" />
                  <img src="/images/p6/equipment/tissue-real.svg" alt="" className="absolute left-[12px] top-[13px] h-[11px] w-auto rotate-[16deg] opacity-80" />
                </div>
              </div>
            </article>

            <article className="rounded-[16px] bg-[linear-gradient(180deg,#f4f8ff_0%,#e8f1ff_100%)] p-3">
              <p className="mb-2 mt-0 text-[clamp(13px,1vw,16px)] font-bold text-slate-700">{t.level5Label}</p>
              <div className="relative h-[142px] overflow-hidden rounded-[12px] bg-[#dbe8f7]">
                <img
                  src="/images/p6/equipment/lukpong-cut.png"
                  alt="balloon"
                  className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_10px_18px_rgba(15,23,42,0.22)]"
                />
                <div className="pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[30px] w-[28px] -translate-x-1/2 -translate-y-1/2">
                  <img src="/images/p6/equipment/tissue-real.svg" alt="" className="absolute left-[3px] top-[1px] h-[11px] w-auto rotate-[8deg] opacity-90" />
                  <img src="/images/p6/equipment/tissue-real.svg" alt="" className="absolute left-[8px] top-[4px] h-[11px] w-auto rotate-[-14deg] opacity-88" />
                  <img src="/images/p6/equipment/tissue-real.svg" alt="" className="absolute left-[13px] top-[10px] h-[11px] w-auto rotate-[18deg] opacity-86" />
                  <img src="/images/p6/equipment/tissue-real.svg" alt="" className="absolute left-[5px] top-[14px] h-[11px] w-auto rotate-[-10deg] opacity-84" />
                  <img src="/images/p6/equipment/tissue-real.svg" alt="" className="absolute left-[12px] top-[18px] h-[11px] w-auto rotate-[6deg] opacity-82" />
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-20 inline-flex gap-2 rounded-[20px] bg-white/95 px-3 py-[10px] shadow-[0_18px_40px_rgba(111,144,186,0.2)]">
        <button
          onClick={() => setLang("th")}
          className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
            lang === "th" ? "bg-[#bdd9f8]" : "bg-[#eaf3ff]"
          }`}
        >
          {langLabels.th}
        </button>

        <button
          onClick={() => setLang("en")}
          className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
            lang === "en" ? "bg-[#bdd9f8]" : "bg-[#eaf3ff]"
          }`}
        >
          {langLabels.en}
        </button>

        <button
          onClick={() => setLang("ms")}
          className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
            lang === "ms" ? "bg-[#bdd9f8]" : "bg-[#eaf3ff]"
          }`}
        >
          {langLabels.ms}
        </button>
      </div>

      <div className="pointer-events-auto fixed bottom-6 right-6 z-20 flex gap-3">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-white/90 px-[18px] py-[14px] font-black text-[#213a8f] shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
          onClick={() => navigate("/p6/experiment/electric-generation/summary")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          <span className="text-[20px] leading-none">&laquo;</span>
          <span className="text-[20px] leading-none">{t.back}</span>
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-[#2563eb] px-[18px] py-[14px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
          onClick={() => navigate("/p6/experiment/electric-generation/summary-2")}
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
