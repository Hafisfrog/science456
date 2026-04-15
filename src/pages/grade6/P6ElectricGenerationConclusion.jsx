import { useEffect, useMemo, useState } from "react";
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
    next: "ต่อไป",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    title: "Experiment Summary",
    body: [
      "From the experiment, a balloon that was not rubbed with a dry cloth showed no noticeable change or attraction to paper bits.",
      "In contrast, a balloon rubbed with a dry cloth could attract nearby small paper bits.",
      "This suggests that a longer rubbing time tends to increase the electric force produced.",
    ],
    back: "Back",
    next: "Next",
    listen: "Read screen",
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
    next: "Seterusnya",
    listen: "Baca skrin",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

const SPEECH_LANG = { th: "th-TH", en: "en-US", ms: "ms-MY" };

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

function LanguagePills({ lang, setLang, labels }) {
  const pills = [
    { code: "th", label: labels.th },
    { code: "en", label: labels.en },
    { code: "ms", label: labels.ms },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-20 inline-flex gap-2 rounded-[20px] bg-white/95 px-3 py-[10px] shadow-[0_18px_40px_rgba(111,144,186,0.2)]">
      {pills.map((p) => (
        <button
          key={p.code}
          type="button"
          onClick={() => setLang(p.code)}
          className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
            lang === p.code ? "bg-[#bdd9f8]" : "bg-[#eaf3ff]"
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
  const speechLang = SPEECH_LANG[lang] ?? "th-TH";
  const listenLabel = lang === "th" ? "ฟังข้อความ" : t.listen ?? "Listen";
  const readAllText = useMemo(() => [t.title, ...t.body].join(". "), [t]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-28 pt-6 text-slate-900 md:px-8 md:pb-32"
      style={{
        fontFamily: "Prompt, sans-serif",
        background:
          "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
      }}
    >
      <div className="relative z-[1] mx-auto flex min-h-[calc(100vh-180px)] w-full max-w-[1240px] items-center">
        <div className="relative w-full overflow-hidden rounded-[28px] border border-white/90 bg-[#e8f5ff]/95 p-[clamp(22px,2.8vw,36px)] shadow-[0_18px_30px_rgba(17,24,39,0.16)]">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="m-0 text-[clamp(28px,3.1vw,40px)] font-black text-slate-900">
              {t.title}
            </h1>
            <button
              type="button"
              onClick={() => speakText(readAllText, speechLang)}
              aria-label={listenLabel}
              title={listenLabel}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-700 shadow transition hover:scale-105"
            >
              🔊
            </button>
          </div>
          <div className="mt-6 grid gap-4 text-[clamp(18px,1.5vw,24px)] font-semibold leading-[1.7] text-slate-900">
            {t.body.map((line, idx) => (
              <p key={idx} className="m-0">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      <LanguagePills lang={lang} setLang={setLang} labels={t.lang} />

      <div className="pointer-events-auto fixed bottom-6 right-6 z-20 flex gap-3">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-white/90 px-[18px] py-[14px] font-black text-[#213a8f] shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
          onClick={() => navigate("/p6/experiment/electric-generation/key-summary")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          <span className="text-[20px] leading-none">&laquo;</span>
          <span className="text-[20px] leading-none">{t.back}</span>
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-[#2563eb] px-[18px] py-[14px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
          onClick={() => navigate("/p6/experiment/electric-generation/summary-3")}
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

