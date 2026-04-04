import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const TEXT = {
  th: {
    title: "สรุปผลการทดลอง",
    body: [
      "ดังนั้นจากการทดลองพบว่า ลูกโป่งที่ไม่ผ่านการขัดด้วยผ้าแห้งไม่แสดงการเปลี่ยนแปลงหรือแรงดึงดูดต่อเศษกระดาษ",
      "ขณะที่ลูกโป่งที่ผ่านการขัดด้วยผ้าแห้งสามารถดึงดูดเศษกระดาษชิ้นเล็กที่อยู่ใกล้ได้",
      "ทั้งนี้แสดงว่าเมื่อมีระยะเวลาการขัดถูด้วยผ้าแห้ง จะส่งผลให้แรงไฟฟ้าที่เกิดขึ้นมีแนวโน้มเพิ่มขึ้น",
    ],
    back: "ย้อนกลับ",
    next: "สรุปคำถาม",
    lang: { th: "ไทย", en: "English", ms: "Melayu" },
  },
  en: {
    title: "Experiment Summary",
    body: [
      "From the experiment, a balloon that was not rubbed with a dry cloth showed no noticeable change or attraction to paper bits.",
      "In contrast, a balloon rubbed with a dry cloth could attract nearby small paper bits.",
      "This suggests that a longer rubbing time tends to increase the electric force produced.",
    ],
    back: "Back",
    next: "Back to Experiment Selection",
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    title: "Rumusan Eksperimen",
    body: [
      "Daripada eksperimen, belon yang tidak digosok dengan kain kering tidak menunjukkan perubahan atau tarikan terhadap cebisan kertas.",
      "Sebaliknya, belon yang digosok dengan kain kering boleh menarik cebisan kertas kecil yang berdekatan.",
      "Ini menunjukkan bahawa masa menggosok yang lebih lama cenderung meningkatkan daya elektrik yang terhasil.",
    ],
    back: "Kembali",
    next: "Kembali ke Pilihan Eksperimen",
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
    <div className="flex max-w-[calc(100vw-24px)] flex-wrap items-center gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_10px_22px_rgba(0,0,0,0.12)]">
      {pills.map((p) => (
        <button
          key={p.code}
          type="button"
          onClick={() => setLang(p.code)}
          className={`whitespace-nowrap rounded-[14px] px-[14px] py-[10px] text-[16px] font-black leading-none transition-transform duration-150 hover:-translate-y-[1px] ${
            lang === p.code ? "bg-[#bae6fd] text-slate-900" : "bg-[#e6f2ff] text-slate-900 hover:bg-[#d9edff]"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

export default function P6ElectricGenerationConclusion() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TEXT[lang] ?? TEXT.th, [lang]);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-6 pt-4 text-slate-900 md:px-8"
      style={{
        fontFamily: "Prompt, sans-serif",
        background:
          "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
      }}
    >
      <div className="relative z-[1] mx-auto w-full max-w-[1200px]">
        <div className="relative overflow-hidden rounded-[28px] border border-white/90 bg-[#e8f5ff]/95 p-[clamp(20px,3vw,36px)] shadow-[0_18px_30px_rgba(17,24,39,0.16)]">
          <h1 className="m-0 text-[clamp(26px,3.1vw,36px)] font-black text-slate-900">
            {t.title}
          </h1>
          <div className="mt-6 grid gap-4 text-[clamp(16px,1.6vw,18px)] font-semibold leading-[1.8] text-slate-900">
            {t.body.map((line, idx) => (
              <p key={idx} className="m-0">
                {line}
              </p>
            ))}
          </div>

        </div>
      </div>

      <div className="pointer-events-auto fixed bottom-3 left-3 z-50">
        <LanguagePills lang={lang} setLang={setLang} labels={t.lang} />
      </div>

      <div className="pointer-events-auto fixed bottom-6 right-6 z-20 flex gap-3">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-white px-4 py-3 text-slate-700 shadow"
          onClick={() => navigate("/p6/experiment/electric-generation/key-summary")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          <span className="text-[22px] leading-none">&lt;&lt;</span>
          <span className="text-sm font-black leading-none">{t.back}</span>
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-blue-600 px-4 py-3 text-white shadow"
          onClick={() => navigate("/p6/experiment/electric-generation/summary-3")}
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
