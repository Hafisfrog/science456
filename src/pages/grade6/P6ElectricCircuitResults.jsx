import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const TEXT = {
  th: {
    badge: "วงจรไฟฟ้าใกล้ตัว",
    title: "เรื่อง วงจรไฟฟ้าอย่างง่าย",
    section: "สรุปผลการทดลอง",
    summary:
      "จากการทำกิจกรรม พบว่า เมื่อนำเซลล์ไฟฟ้าหลายเซลล์มาเรียงต่อกันแบบอนุกรม กระแสไฟฟ้าในวงจรจะมากขึ้น ส่งผลให้หลอดไฟสว่างมากขึ้นตามจำนวนเซลล์ไฟฟ้าที่เพิ่มขึ้น",
    back: "ย้อนกลับ",
    next: "กลับเลือกการทดลอง",
    langLabel: { th: "ไทย", en: "English", ms: "Melayu" },
  },
  en: {
    badge: "Everyday Circuits",
    title: "Simple Electric Circuit",
    section: "Experiment Summary",
    summary:
      "From the activity, we found that connecting more cells in series increases the current in the circuit, making the bulb brighter as the number of cells increases.",
    back: "Back",
    next: "Back to Experiment Selection",
    langLabel: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    badge: "Litar Harian",
    title: "Litar Elektrik Mudah",
    section: "Rumusan Eksperimen",
    summary:
      "Daripada aktiviti ini, didapati bahawa apabila lebih banyak sel disusun secara siri, arus dalam litar bertambah dan mentol menjadi lebih terang apabila bilangan sel meningkat.",
    back: "Kembali",
    next: "Kembali ke Pilihan Eksperimen",
    langLabel: { th: "Thai", en: "Inggeris", ms: "Melayu" },
  },
};

export default function P6ElectricCircuitResults() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TEXT[lang] || TEXT.th, [lang]);

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

      <div className="relative z-[1] mx-auto grid h-full w-full max-w-[1380px] grid-rows-[auto_auto_1fr_auto] gap-2">
        <div className="inline-flex w-fit items-center rounded-full bg-gradient-to-br from-[#6bc3f0] to-[#4c9ee1] px-[18px] py-2 text-base font-black text-white shadow-[0_12px_22px_rgba(16,24,39,0.14)]">
          {t.badge}
        </div>

        <div className="m-0 text-[clamp(32px,2.5vw,54px)] font-black leading-[1.08]">
          {t.title}
        </div>

        <div className="relative grid min-h-0 rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] px-[clamp(14px,1.6vw,20px)] pb-3 pt-3 shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <div
            className="grid h-full min-h-0 grid-rows-[auto_1fr] gap-3 rounded-3xl border-2 border-white/75 p-[clamp(14px,1.6vw,20px)]"
            style={{
              background:
                "linear-gradient(180deg, rgba(185, 228, 243, 0.5), rgba(168, 219, 241, 0.48))",
            }}
          >
            <div className="mb-0 inline-flex w-fit items-center gap-2.5 rounded-full bg-gradient-to-br from-blue-600/20 to-sky-400/25 px-4 py-1.5 text-[clamp(22px,1.6vw,30px)] font-black text-slate-900">
              {t.section}
            </div>

            <section className="relative min-h-0 overflow-hidden rounded-[20px] border-4 border-slate-900 bg-[#f7f4f1] p-[clamp(18px,2.1vw,30px)]">
              <p className="m-0 text-[clamp(20px,2.1vw,40px)] font-bold leading-[1.6] text-slate-900 max-[720px]:leading-[1.5]">
                {t.summary}
              </p>
            </section>
          </div>
        </div>
      </div>

      <div className="fixed bottom-3 left-3 z-40 inline-flex items-center gap-3 rounded-2xl bg-white p-2 shadow">
        {[
          { id: "th", label: t.langLabel.th },
          { id: "en", label: t.langLabel.en },
          { id: "ms", label: t.langLabel.ms },
        ].map((item) => (
          <button
            key={item.id}
            className={`rounded-xl px-4 py-2 font-bold ${
              lang === item.id ? "bg-sky-500 text-white" : "bg-sky-100"
            }`}
            type="button"
            onClick={() => setLang(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="fixed bottom-3 right-3 z-40 flex gap-3">
        <button
          className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-base font-bold text-slate-900 shadow"
          onClick={() => navigate("/p6/electric-circuit/result")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          <span className="text-xl leading-none">←</span>
          <span>{t.back}</span>
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-base font-bold text-white shadow"
          onClick={() => navigate("/p6/electric-circuit/experiments")}
          type="button"
          aria-label={t.next}
          title={t.next}
        >
          <span>{t.next}</span>
          <span className="text-xl leading-none">→</span>
        </button>
      </div>
    </div>
  );
}
