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

      <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
        <div className="inline-flex gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
          <button
            onClick={() => setLang("th")}
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "th"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
          >
            {langLabels.th}
          </button>

          <button
            onClick={() => setLang("en")}
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "en"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
          >
            {langLabels.en}
          </button>

          <button
            onClick={() => setLang("ms")}
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "ms"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
          >
            {langLabels.ms}
          </button>
        </div>
      </div>

      <div className="pointer-events-auto fixed bottom-3 right-3 z-20 flex gap-3 md:bottom-7 md:right-7">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/experiment/electric-generation/summary")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          &laquo; {t.back}
        </button>
        <button
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/experiment/electric-generation/summary-2")}
          type="button"
          aria-label={t.next}
          title={t.next}
        >
          {t.next} &raquo;
        </button>
      </div>
    </div>
  );
}
