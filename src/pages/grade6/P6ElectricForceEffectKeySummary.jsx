import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const LANGUAGE_OPTIONS = [
  { id: "th" },
  { id: "en" },
  { id: "ms" },
];

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
    next: "ต่อไป",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
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
    next: "Next",
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
    next: "Seterusnya",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

function LanguagePills({ lang, setLang, labels }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
      {LANGUAGE_OPTIONS.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => setLang(p.id)}
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold text-slate-900 transition ${
            lang === p.id
              ? "bg-[#bfe0ff] text-slate-900"
              : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
          }`}
        >
          {labels[p.id]}
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
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-28 pt-3 text-slate-900 md:px-8 md:pb-32"
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

      <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
        <LanguagePills lang={lang} setLang={setLang} labels={t.lang} />
      </div>

      <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-7 md:right-7">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/experiment/electric-force-effect/summary")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          &laquo; {t.back}
        </button>
        <button
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/electric-force/experiments")}
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



