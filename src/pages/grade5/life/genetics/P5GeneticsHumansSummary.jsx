import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import LabLayout from "../../../../components/LabLayout";
import { useP5GeneticsLang } from "./p5GeneticsI18n";
import "./p5GeneticsLangShared.css";
import "./P5GeneticsHumansSummaryOverrides.css";

const TEXT = {
  th: {
    title: "สรุปผลการทดลอง",
    summary:
      "จากภาพการทดลอง พบว่า\nลักษณะของคนแบ่งออกได้เป็น 2 ประเภท คือ\n1. ลักษณะทางพันธุกรรม\n2. ลักษณะที่เกิดจากการเรียนรู้หรือความชอบส่วนตัว",
    listen: "ฟังสรุป",
    back: "ย้อนกลับ",
    next: "ต่อไป",
  },
  en: {
    title: "Experiment Summary",
    summary:
      "From the experiment, human traits can be grouped into 2 types:\n1. Inherited traits\n2. Traits formed by learning or personal preference",
    listen: "Listen",
    back: "Back",
    next: "Next",
  },
  ms: {
    title: "Kesimpulae Hasil Kajiye",
    summary:
      "Dari hasil kajiye, terdapat bahawo\nSifat hok ore bagi 2 jenih, yaitu:\n1.	Sifat bako\n2.	Sifat dari hasil belajar atau hok suka peribadi",
    listen: "Dengar rumusan",
    back: "Pusing semula",
    next: "Teruh",
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

export default function P5GeneticsHumansSummary() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const labels = { th: "ไทย", en: "อังกฤษ", ms: "มลายู" };
  const t = TEXT[lang];
  const backLabel = `« ${t.back}`;
  const nextLabel = `${t.next} »`;
  const speakSummary = () => speakText(t.summary, lang);

  return (
    <LabLayout title={t.title} showTeacher={false}>
      <HomeButton />

      <div
        className="relative min-h-full overflow-hidden px-6 pb-24 pt-7 notranslate"
        translate="no"
        style={{
          backgroundImage: "url('/images/p5/back.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-white/10" />

        <section className="relative z-10 mx-auto max-w-5xl">
          <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-slate-900 notranslate" translate="no">{t.title}</h1>

          <div className="relative rounded-[30px] border border-emerald-400/90 bg-[linear-gradient(180deg,rgba(187,247,208,0.98)_0%,rgba(220,252,231,0.97)_34%,rgba(255,255,255,0.98)_70%,rgba(255,255,255,0.98)_100%)] px-7 pb-7 pt-6 shadow-[0_22px_40px_rgba(21,128,61,0.22)] backdrop-blur-sm max-[1180px]:px-5 max-[1180px]:pb-5 max-[1180px]:pt-5">
            <button
              type="button"
              className="absolute right-4 top-4 inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border-none bg-[#eff6ff] text-[22px] leading-none text-[#1d4ed8] shadow-[0_8px_16px_rgba(37,99,235,0.18)] transition hover:-translate-y-[1px] hover:bg-[#dbeafe] hover:shadow-[0_10px_18px_rgba(37,99,235,0.22)]"
              aria-label={t.listen}
              title={t.listen}
              onClick={speakSummary}
            >
              {"\uD83D\uDD0A"}
            </button>
            <p className="whitespace-pre-line text-3xl leading-relaxed text-slate-900 max-[1180px]:text-2xl notranslate" translate="no">
              {t.summary}
            </p>
          </div>
        </section>

        <footer className="fixed bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-3 max-[1180px]:flex-col max-[1180px]:items-stretch">
          <div className="p5ghs-lang p5ghs-lang-p4 max-[1180px]:justify-center">
            <button
              type="button"
              className={lang === "th" ? "is-active notranslate" : "notranslate"}
              translate="no"
              onClick={() => setLang("th")}
            >
              {labels.th}
            </button>
            <button
              type="button"
              className={lang === "ms" ? "is-active notranslate" : "notranslate"}
              translate="no"
              onClick={() => setLang("ms")}
            >
              {labels.ms}
            </button>
            <button
              type="button"
              className={lang === "en" ? "is-active notranslate" : "notranslate"}
              translate="no"
              onClick={() => setLang("en")}
            >
              {labels.en}
            </button>
          </div>

          <div className="p5ghs-actions flex items-center gap-2 max-[1180px]:flex-wrap max-[1180px]:justify-end">
            <button type="button" className="p5ghs-back-btn notranslate" translate="no" onClick={() => navigate("/p5/life/genetics/humans")}>
              <span>{backLabel}</span>
            </button>
            <button
              type="button"
              className="p5ghs-next-btn notranslate"
              translate="no"
              onClick={() => navigate("/p5/life/genetics/humans/summary-2")}
            >
              <span>{nextLabel}</span>
            </button>
          </div>
        </footer>
      </div>
    </LabLayout>
  );
}
