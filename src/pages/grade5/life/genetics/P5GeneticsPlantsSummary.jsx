import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import LabLayout from "../../../../components/LabLayout";
import { useP5GeneticsLang } from "./p5GeneticsI18n";
import "./p5GeneticsLangShared.css";
import "./P5GeneticsPlantsSummaryOverrides.css";

const TEXT = {
  th: {
    title: "สรุปผลการทดลอง",
    p1: "จากการทดลอง พบว่า",
    items: [
      "ลักษณะความสูงของพืช ถูกควบคุมด้วยยีน 1 คู่",
      "ยีนมี 2 แบบ คือ",
    ],
    a: "A = ยีนเด่น แสดงลักษณะ พืชสูง",
    b: "a = ยีนด้อย แสดงลักษณะ พืชเตี้ย",
    result:
      "เมื่อนำมาผสมกันพบว่า พืชทุกต้นแสดงลักษณะต้นสูง",
    listen: "ฟังสรุป",
    back: "ย้อนกลับ",
    select: "ต่อไป",
  },
  en: {
    title: "Experiment Summary",
    p1: "From the experiment, we found:",
    items: ["Plant height is controlled by one gene pair.", "There are 2 alleles:"],
    a: "A = dominant allele, shows tall trait",
    b: "a = recessive allele, shows short trait",
    result: "When crossed, all offspring showed the tall trait.",
    listen: "Listen",
    back: "Back",
    select: "Next",
  },
  ms: {
    title: "Kesimpule Hasil Kajiye",
    p1: "Dari kajiye, Terlihat bahawo:",
    items: ["Sifat tingi hok tumbuhe keno kawal ngan gen 1 pase.", "Gen ado 2 bahagiye:"],
    a: "A = Gen lebih sifatnyo tumbuhe tingi",
    b: "a = Gen kughe sifatnyo tumbuhe renoh",
    result: "Jika amek mari kawen terdapat bahawo tumbuhe jadi tingi semuwo.",
    listen: "Dengar rumusan",
    back: "Pusing semula",
    select: "Teruh",
  },
};

const LANG_TO_VOICE = {
  th: "th-TH",
  en: "en-US",
  ms: "ms-MY",
};

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = LANG_TO_VOICE[lang] || "th-TH";
  synth.speak(utterance);
}

export default function P5GeneticsPlantsSummary() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const labels = { th: "ไทย", en: "อังกฤษ", ms: "มลายู" };
  const t = TEXT[lang];
  const backLabel = `« ${t.back}`;
  const nextLabel = `${t.select} »`;
  const speakSummary = () => {
    speakText([t.p1, ...t.items, t.a, t.b, t.result].join(". "), lang);
  };

  return (
    <LabLayout title={t.title} showTeacher={false}>
      <HomeButton />

      <div
        className="relative min-h-full overflow-hidden px-6 pb-24 pt-7"
        style={{
          backgroundImage: "url('/images/p5/back.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-white/10" />

        <section className="relative z-10 mx-auto max-w-5xl">
          <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-slate-900">{t.title}</h1>

          <div className="relative rounded-[30px] border border-emerald-400/90 bg-[linear-gradient(180deg,rgba(187,247,208,0.98)_0%,rgba(220,252,231,0.97)_34%,rgba(255,255,255,0.98)_70%,rgba(255,255,255,0.98)_100%)] px-7 pb-7 pt-6 shadow-[0_22px_40px_rgba(21,128,61,0.22)] backdrop-blur-sm max-[1180px]:px-5 max-[1180px]:pb-5 max-[1180px]:pt-5">
            <button
              type="button"
              className="absolute right-4 top-4 inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border-none bg-[#eff6ff] text-[22px] leading-none text-[#1d4ed8] shadow-[0_8px_16px_rgba(37,99,235,0.18)] transition hover:-translate-y-[1px] hover:bg-[#dbeafe] hover:shadow-[0_10px_18px_rgba(37,99,235,0.22)]"
              aria-label={t.listen}
              title={t.listen}
              onClick={speakSummary}
            >
              {"🔊"}
            </button>
            <p className="text-3xl leading-relaxed text-slate-900 max-[1180px]:text-2xl">{t.p1}</p>
            <ul className="my-3 list-disc pl-8 text-3xl leading-relaxed text-slate-900 max-[1180px]:text-2xl">
              <li>{t.items[0]}</li>
              <li>{t.items[1]}</li>
            </ul>
            <p className="pl-6 text-3xl leading-relaxed text-slate-900 max-[1180px]:text-2xl">{"•"} {t.a}</p>
            <p className="pl-6 text-3xl leading-relaxed text-slate-900 max-[1180px]:text-2xl">{"•"} {t.b}</p>
            <p className="mt-3 text-3xl font-extrabold text-slate-900 max-[1180px]:text-2xl">{t.result}</p>
          </div>
        </section>

        <footer className="fixed bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-3 max-[1180px]:flex-col max-[1180px]:items-stretch">
          <div className="p5gps-lang p5gps-lang-p4 max-[1180px]:justify-center">
            <button
              type="button"
              className={lang === "th" ? "is-active" : ""}
              onClick={() => setLang("th")}
            >
              {labels.th}
            </button>
            <button
              type="button"
              className={lang === "ms" ? "is-active" : ""}
              onClick={() => setLang("ms")}
            >
              {labels.ms}
            </button>
            <button
              type="button"
              className={lang === "en" ? "is-active" : ""}
              onClick={() => setLang("en")}
            >
              {labels.en}
            </button>
          </div>

          <div className="p5gps-actions flex items-center gap-2 max-[1180px]:flex-wrap max-[1180px]:justify-end">
            <button
              type="button"
              className="p5gps-back-btn"
              onClick={() => navigate("/p5/life/genetics/plants")}
            >
              {backLabel}
            </button>
            <button
              type="button"
              className="p5gps-next-btn"
              onClick={() => navigate("/p5/life/genetics")}
            >
              {nextLabel}
            </button>
          </div>
        </footer>
      </div>
    </LabLayout>
  );
}

