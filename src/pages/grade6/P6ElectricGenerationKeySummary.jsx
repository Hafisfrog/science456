import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const TEXT = {
  th: {
    title: "สรุปผลการทดลอง",
    summaryLines: [
      "เมื่อขัดลูกโป่งทั้ง 2 ใบด้วยกระดาษเช็ด ลูกโป่งทั้งสองจะมีประจุชนิดเดียวกัน เมื่อนำมาเข้าใกล้กันจึงเกิดแรงผลักกัน",
      "เมื่อขัดลูกโป่งเพียง 1 ใบ อีกใบไม่ได้ถู จะเกิดการเหนี่ยวนำประจุ เมื่อนำมาเข้าใกล้กันจึงเกิดแรงดึงดูดกัน",
    ],
    back: "ย้อนกลับ",
    next: "สรุป",
    lang: { th: "ไทย", en: "English", ms: "Melayu" },
  },
  en: {
    title: "Experiment Summary",
    summaryLines: [
      "When both balloons are rubbed with tissue, they carry the same type of charge, so they repel each other when brought close.",
      "When only one balloon is rubbed, induction occurs and the balloons attract each other when brought close.",
    ],
    back: "Back",
    next: "Summary",
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    title: "Ringkasan Eksperimen",
    summaryLines: [
      "Apabila kedua-dua belon digosok dengan tisu, kedua-duanya bercas sama lalu menolak apabila didekatkan.",
      "Apabila hanya satu belon digosok, aruhan cas berlaku dan kedua-duanya akan menarik apabila didekatkan.",
    ],
    back: "Kembali",
    next: "Ringkasan",
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
    <div className="flex gap-3 rounded-2xl bg-white p-2 shadow-lg">
      {pills.map((p) => (
        <button
          key={p.code}
          type="button"
          onClick={() => setLang(p.code)}
          className={`rounded-xl px-4 py-2 font-bold ${
            lang === p.code ? "bg-sky-500 text-white" : "bg-sky-100"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

export default function P6ElectricGenerationKeySummary() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TEXT[lang] ?? TEXT.th, [lang]);
  const visualTitle = lang === "th" ? "ภาพประกอบการทดลอง" : lang === "ms" ? "Ilustrasi Eksperimen" : "Experiment Illustration";
  const level0Label = lang === "th" ? "ไม่ถู (0 นาที): ยังไม่ดูดเศษกระดาษ" : lang === "ms" ? "Tidak digosok (0 min): belum menarik kertas" : "No rub (0 min): no visible paper attraction";
  const level2Label = lang === "th" ? "ถู 2 นาที: ดูดเศษกระดาษเล็กน้อย" : lang === "ms" ? "Gosok 2 minit: menarik sedikit" : "Rub 2 min: slight attraction";
  const level5Label = lang === "th" ? "ถู 5 นาที: ดูดเศษกระดาษมากขึ้น" : lang === "ms" ? "Gosok 5 minit: menarik lebih banyak" : "Rub 5 min: stronger attraction";

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
          <h1 className="m-0 text-[clamp(28px,3.2vw,40px)] font-black text-slate-900">
            {t.title}
          </h1>

          <div className="mt-4 grid gap-4 text-[clamp(16px,1.6vw,18px)] font-semibold leading-[1.7] text-slate-900">
            {(t.summaryLines || []).map((line, idx) => (
              <p key={idx} className="m-0">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-2 rounded-[22px] border border-white/90 bg-white/85 p-4 shadow-[0_14px_24px_rgba(17,24,39,0.12)]">
          <p className="m-0 text-[clamp(16px,1.3vw,20px)] font-black text-slate-900">{visualTitle}</p>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            <article className="rounded-[16px] bg-[linear-gradient(180deg,#f4f8ff_0%,#e8f1ff_100%)] p-3">
              <p className="mb-2 mt-0 text-[clamp(13px,1vw,16px)] font-bold text-slate-700">{level0Label}</p>
              <div className="relative h-[142px] overflow-hidden rounded-[12px] bg-[#dbe8f7]">
                <span className="absolute left-1/2 top-1/2 h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_25%,#ffd3d3,#ea3b3b_45%,#b91c1c_74%,#7f1d1d)] shadow-[inset_0_8px_14px_rgba(255,255,255,0.22),inset_0_-10px_14px_rgba(0,0,0,0.24)]" />
              </div>
            </article>

            <article className="rounded-[16px] bg-[linear-gradient(180deg,#f4f8ff_0%,#e8f1ff_100%)] p-3">
              <p className="mb-2 mt-0 text-[clamp(13px,1vw,16px)] font-bold text-slate-700">{level2Label}</p>
              <div className="relative h-[142px] overflow-hidden rounded-[12px] bg-[#dbe8f7]">
                <span className="absolute left-1/2 top-1/2 h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_25%,#ffd3d3,#ea3b3b_45%,#b91c1c_74%,#7f1d1d)] shadow-[inset_0_8px_14px_rgba(255,255,255,0.22),inset_0_-10px_14px_rgba(0,0,0,0.24)]" />
                <img src="/images/p6/equipment/tissue-real.svg" alt="" className="pointer-events-none absolute left-[43%] top-[54px] h-[13px] w-auto rotate-[8deg] opacity-86" />
                <img src="/images/p6/equipment/tissue-real.svg" alt="" className="pointer-events-none absolute left-[45%] top-[62px] h-[13px] w-auto rotate-[-14deg] opacity-82" />
                <img src="/images/p6/equipment/tissue-real.svg" alt="" className="pointer-events-none absolute left-[49%] top-[68px] h-[13px] w-auto rotate-[16deg] opacity-80" />
              </div>
            </article>

            <article className="rounded-[16px] bg-[linear-gradient(180deg,#f4f8ff_0%,#e8f1ff_100%)] p-3">
              <p className="mb-2 mt-0 text-[clamp(13px,1vw,16px)] font-bold text-slate-700">{level5Label}</p>
              <div className="relative h-[142px] overflow-hidden rounded-[12px] bg-[#dbe8f7]">
                <span className="absolute left-1/2 top-1/2 h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_25%,#ffd3d3,#ea3b3b_45%,#b91c1c_74%,#7f1d1d)] shadow-[inset_0_8px_14px_rgba(255,255,255,0.22),inset_0_-10px_14px_rgba(0,0,0,0.24)]" />
                <img src="/images/p6/equipment/tissue-real.svg" alt="" className="pointer-events-none absolute left-[43%] top-[50px] h-[13px] w-auto rotate-[8deg] opacity-90" />
                <img src="/images/p6/equipment/tissue-real.svg" alt="" className="pointer-events-none absolute left-[45%] top-[54px] h-[13px] w-auto rotate-[-14deg] opacity-88" />
                <img src="/images/p6/equipment/tissue-real.svg" alt="" className="pointer-events-none absolute left-[48%] top-[62px] h-[13px] w-auto rotate-[18deg] opacity-86" />
                <img src="/images/p6/equipment/tissue-real.svg" alt="" className="pointer-events-none absolute left-[43%] top-[66px] h-[13px] w-auto rotate-[-10deg] opacity-84" />
                <img src="/images/p6/equipment/tissue-real.svg" alt="" className="pointer-events-none absolute left-[49%] top-[72px] h-[13px] w-auto rotate-[6deg] opacity-82" />
              </div>
            </article>
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

      <div className="pointer-events-auto fixed bottom-6 right-6 z-20 flex gap-3">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-white px-4 py-3 text-slate-700 shadow"
          onClick={() => navigate("/p6/experiment/electric-generation/summary")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          <span className="text-[22px] leading-none">&lt;&lt;</span>
          <span className="text-sm font-black leading-none">{t.back}</span>
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-blue-600 px-4 py-3 text-white shadow"
          onClick={() => navigate("/p6/experiment/electric-generation/summary-2")}
          type="button"
          aria-label={t.next}
          title={t.next}
        >
          <span className="text-sm font-black leading-none">{t.next}</span>
          <span className="text-[22px] leading-none">&gt;&gt;</span>
        </button>
      </div>
    </div>
  );
}
