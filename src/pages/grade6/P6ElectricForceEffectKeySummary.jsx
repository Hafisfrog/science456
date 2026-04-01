import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const TEXT = {
  th: {
    title: "สรุปสาระสำคัญ : แรงไฟฟ้าน่ารู้",
    sectionCause: "การเกิดแรงไฟฟ้า",
    sectionEffect: "ผลของแรงไฟฟ้าที่เกิดขึ้น",
    sectionExamples: "ตัวอย่างในชีวิตประจำวัน",
    causeIntro:
      "แรงไฟฟ้า คือ แรงที่เกิดขึ้นระหว่างประจุไฟฟ้าด้วยกัน มีทั้งแรงดึงดูดและแรงผลัก",
    chargeKinds: "ประจุไฟฟ้ามี 2 ชนิด คือ ประจุไฟฟ้าบวก (+) และประจุไฟฟ้าลบ (-)",
    chargeInduction:
      "เกิดขึ้นเมื่อมีวัตถุบางชิ้นทำให้เกิดการถ่ายโอนประจุ ทำให้วัตถุไม่เป็นกลางทางไฟฟ้า",
    effectAttract:
      "ประจุต่างกัน “ดึงดูดกัน” วัตถุที่มีประจุต่างชนิดจะออกแรงดึงดูดซึ่งกันและกัน",
    effectRepel:
      "ประจุเหมือนกัน “ผลักกัน” วัตถุที่มีประจุชนิดเดียวกันจะออกแรงผลักกัน",
    example: "การใช้หวีพลาสติกบนผ้าแล้วทำให้เส้นผมติดหวีขึ้นมาได้",
    back: "ย้อนกลับ",
    next: "กลับเลือกการทดลอง",
    lang: { th: "ไทย", en: "English", ms: "Melayu" },
  },
  en: {
    title: "Key Takeaways: Electric Force",
    sectionCause: "How Electric Force Happens",
    sectionEffect: "Effects of Electric Force",
    sectionExamples: "Everyday Example",
    causeIntro:
      "Electric force is a force between electric charges. It can attract or repel.",
    chargeKinds: "There are two kinds of charges: positive (+) and negative (-).",
    chargeInduction:
      "Charge transfer can make an object no longer electrically neutral.",
    effectAttract: "Unlike charges attract each other.",
    effectRepel: "Like charges repel each other.",
    example: "Rubbing a plastic comb on cloth can make hair stick to the comb.",
    back: "Back",
    next: "Back to Experiment Selection",
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    title: "Ringkasan Penting: Daya Elektrik",
    sectionCause: "Bagaimana Daya Elektrik Terjadi",
    sectionEffect: "Kesan Daya Elektrik",
    sectionExamples: "Contoh Harian",
    causeIntro:
      "Daya elektrik ialah daya antara cas elektrik. Ia boleh menarik atau menolak.",
    chargeKinds: "Terdapat dua jenis cas: positif (+) dan negatif (-).",
    chargeInduction:
      "Pemindahan cas boleh membuat objek tidak neutral secara elektrik.",
    effectAttract: "Cas berlainan saling menarik.",
    effectRepel: "Cas sejenis saling menolak.",
    example: "Menggosok sikat plastik pada kain boleh membuat rambut melekat.",
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

export default function P6ElectricForceEffectKeySummary() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TEXT[lang] ?? TEXT.th, [lang]);

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-6 pt-3 text-slate-900 md:px-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div className="relative z-[1] mx-auto w-full max-w-[1280px]">
        <div className="inline-flex items-center rounded-[12px] bg-blue-600 px-4 py-1.5 text-[clamp(22px,2.4vw,34px)] font-black text-white shadow-[0_10px_18px_rgba(37,99,235,0.35)]">
          {t.title}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-[20px] border-2 border-white/80 bg-white/85 p-5 shadow-[0_16px_26px_rgba(17,24,39,0.12)]">
            <div className="inline-flex items-center rounded-full bg-[#cfe9ff] px-4 py-1 text-[18px] font-black">
              {t.sectionCause}
            </div>
            <p className="mt-4 text-[16px] font-semibold leading-[1.6]">{t.causeIntro}</p>
            <div className="mt-4 flex items-center gap-3">
              <img
                src="/images/p6/force-effect/charges-attract.svg"
                alt=""
                className="h-20 w-32 object-contain"
              />
              <p className="text-[16px] font-semibold leading-[1.6]">{t.chargeKinds}</p>
            </div>
            <p className="mt-3 text-[16px] font-semibold leading-[1.6]">{t.chargeInduction}</p>
          </div>

          <div className="rounded-[20px] border-2 border-white/80 bg-white/85 p-5 shadow-[0_16px_26px_rgba(17,24,39,0.12)]">
            <div className="inline-flex items-center rounded-full bg-[#ffe7a3] px-4 py-1 text-[18px] font-black">
              {t.sectionEffect}
            </div>
            <div className="mt-4 flex items-start gap-3">
              <img
                src="/images/p6/force-effect/charges-attract.svg"
                alt=""
                className="h-20 w-32 object-contain"
              />
              <p className="text-[16px] font-semibold leading-[1.6]">{t.effectAttract}</p>
            </div>
            <div className="mt-3 flex items-start gap-3">
              <img
                src="/images/p6/force-effect/charges-repel.svg"
                alt=""
                className="h-20 w-32 object-contain"
              />
              <p className="text-[16px] font-semibold leading-[1.6]">{t.effectRepel}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-[760px] rounded-[20px] border-2 border-white/80 bg-white/85 p-5 shadow-[0_16px_26px_rgba(17,24,39,0.12)]">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center rounded-full bg-[#d2f7c1] px-4 py-1 text-[18px] font-black">
                {t.sectionExamples}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <p className="text-[16px] font-semibold leading-[1.6]">{t.example}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-auto fixed bottom-6 left-6 z-20">
        <LanguagePills lang={lang} setLang={setLang} labels={t.lang} />
      </div>

      <div className="pointer-events-auto fixed bottom-6 right-6 z-20 flex gap-3">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-white px-4 py-3 text-slate-900 shadow"
          onClick={() => navigate("/p6/experiment/electric-force-effect/summary")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          <span className="text-[22px] leading-none">←</span>
          <span className="text-sm font-black leading-none">{t.back}</span>
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-blue-600 px-4 py-3 text-white shadow"
          onClick={() => navigate("/p6/electric-force/experiments")}
          type="button"
          aria-label={t.next}
          title={t.next}
        >
          <span className="text-sm font-black leading-none">{t.next}</span>
          <span className="text-[22px] leading-none">→</span>
        </button>
      </div>
    </div>
  );
}


