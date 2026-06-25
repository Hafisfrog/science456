import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import LabLayout from "../../../../components/LabLayout";
import { useP5GeneticsLang } from "./p5GeneticsI18n";
import "./p5GeneticsLangShared.css";
import "./P5GeneticsAnimalsSummaryOverrides.css";

const TEXT = {
  th: {
    title: "สรุปผลการทดลอง",
    p1: "จากการทดลอง เรานำแมวพ่อและแม่ที่มีสีขนต่างกันมาผสมกัน",
    father: "แมวพ่อ",
    fatherDesc: "ขนสีดำ",
    mother: "แมวแม่",
    motherDesc: "ขนสีขาว",
    p2: "เมื่อลูกแมวเกิดขึ้น พบว่า",
    result: "ลูกแมวทุกตัวมีขนสีดำ",
    listen: "ฟังสรุป",
    back: "ย้อนกลับ",
    select: "ต่อไป",
  },
  en: {
    title: "Experiment Summary",
    p1: "In this experiment, we crossed a male and female cat with different fur colors.",
    father: "Father cat",
    fatherDesc: "black fur",
    mother: "Mother cat",
    motherDesc: "white fur",
    p2: "When kittens were born, we found that",
    result: "all kittens had black fur.",
    listen: "Listen",
    back: "Back",
    select: "Next",
  },
  ms: {
    title: "Kesimpule Hasil Kajiye",
    p1: "Dari kajiye, kito amek bapak kucing dan ibu kucing hok warno bulu tak samo mari kawen.",
    father: "Bapak Kucing ",
    fatherDesc: "Bulu Warno Hite",
    mother: "Ibu Kucing ",
    motherDesc: "Bulu Warno Putih",
    p2: "Bilo beranok tubek, terlihat bahawo",
    result: "Anok kucing semuwo ado bulu warno hite.",
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

export default function P5GeneticsAnimalsSummary() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const labels = { th: "ไทย", en: "อังกฤษ", ms: "มลายู" };
  const t = TEXT[lang];
  const speakSummary = () => {
    speakText(
      [t.p1, `${t.father} ${t.fatherDesc}`, `${t.mother} ${t.motherDesc}`, t.p2, t.result].join(". "),
      lang
    );
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
              <li>
                <strong>{t.father}</strong> {t.fatherDesc}
              </li>
              <li>
                <strong>{t.mother}</strong> {t.motherDesc}
              </li>
            </ul>
            <p className="text-3xl leading-relaxed text-slate-900 max-[1180px]:text-2xl">{t.p2}</p>
            <p className="mt-3 text-3xl font-extrabold text-slate-900 max-[1180px]:text-2xl">{t.result}</p>
          </div>
        </section>

        <footer className="fixed bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-3 max-[1180px]:flex-col max-[1180px]:items-stretch">
          <div className="p5gas-lang p5gas-lang-p4 max-[1180px]:justify-center">
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

          <div className="p5gas-actions flex items-center gap-2 max-[1180px]:flex-wrap max-[1180px]:justify-end">
            <button
              type="button"
              className="p5gas-back-btn"
              onClick={() => navigate("/p5/life/genetics/animals")}
            >
              &laquo; {t.back}
            </button>
            <button
              type="button"
              className="p5gas-next-btn"
              onClick={() => navigate("/p5/life/genetics")}
            >
              {t.select} &raquo;
            </button>
          </div>
        </footer>
      </div>
    </LabLayout>
  );
}

