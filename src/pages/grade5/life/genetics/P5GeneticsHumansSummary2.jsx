import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import LabLayout from "../../../../components/LabLayout";
import { useP5GeneticsLang } from "./p5GeneticsI18n";
import "./p5GeneticsLangShared.css";
import "./P5GeneticsHumansSummaryOverrides.css";

const TEXT = {
  th: {
    title: "สรุปผลการทดลอง",
    back: "ย้อนกลับ",
    next: "ต่อไป",
    inheritedTitle: "ลักษณะทางพันธุกรรมของคน",
    inheritedDesc: "เป็นลักษณะที่ถ่ายทอดมาจากพ่อแม่ และติดตัวมาตั้งแต่เกิด เช่น",
    inheritedItems: ["ตา 2 ชั้น", "จมูก", "รูปร่างใบหน้า", "ลักษณะผม (หยิก / ตรง)"],
    learnedTitle: "ลักษณะที่เกิดจากการเรียนรู้",
    learnedDesc: "เป็นลักษณะที่ไม่ได้ถ่ายทอดทางพันธุกรรม แต่เกิดจากการฝึกฝนหรือความชอบ เช่น",
    learnedItems: ["ชอบวาดรูป", "ชอบเล่นดนตรี", "ชอบเล่นกีฬา", "ชอบสีเขียว"],
    listen: "ฟังสรุป",
  },
  en: {
    title: "Experiment Summary",
    back: "Back",
    next: "Next",
    inheritedTitle: "Inherited Human Traits",
    inheritedDesc: "These are traits passed down from parents and present since birth, such as:",
    inheritedItems: ["Double eyelid", "Nose shape", "Face shape", "Hair type (curly / straight)"],
    learnedTitle: "Traits From Learning",
    learnedDesc: "These are traits not inherited genetically, but formed through practice or preference, such as:",
    learnedItems: ["Likes drawing", "Likes music", "Likes sports", "Likes green"],
    listen: "Listen",
  },
  ms: {
    title: "เกอซีปูแล ปือจูบอแอ ",
    back: "ฮูโน กือเละ",
    next: "ตือรุฮ",
    inheritedTitle: "ซีฟะ บากอ ยือนิฮ ออแร ",
    inheritedDesc: "ซีฟะ เฮาะ นูรง ดารี อีบู บาเปาะ ดัน ดารี  ซือดีรี ซือเยาะ บือราเนาะ ซือปือตี; ",
    inheritedItems: ["มาตอ สลาเปะห มาตอ ดูวอ ลาเปะฮ. ", "ฮีดงมาจง ฮีดงกือแปะ. ", "รูปอ มูกอ ปาแย รูปอ มูกอ บูละ. ", "ซีฟะ ราโมะ (ราโมะ ปือเลาะ/ราโมะ บือโต) "],
    learnedTitle: "ซีฟะ ดารี ฮาเซ ปืองาลาแม",
    learnedDesc: "ซีฟะ เฮาะ บูแก นูรง ดารี อีบู บาเปาะ, ตาปี ดารี ลาตีแฮ ดือ งา มีนัต ซือปือตี; ",
    learnedItems: ["ซูกอ ลูกิฮ กามา ", "ซูกอ มา-อิง กีตา ", "ซูกอ มา-อิง ซูแก ", "ซูกอ จะ ฮียา "],
    listen: "Dengar rumusan",
  },
};

const MALAY_SUMMARY_AUDIO = ["/audio/p5/25.1.mp3", "/audio/p5/25.2.mp3"];

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

export default function P5GeneticsHumansSummary2() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const labels = { th: "ไทย", en: "อังกฤษ", ms: "มลายูถิ่น" };
  const audioRef = useRef(null);
  const t = TEXT[lang];
  const backLabel = `« ${t.back}`;
  const nextLabel = `${t.next} »`;
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const playMalayAudio = (index) => {
    const audioSrc = MALAY_SUMMARY_AUDIO[index];
    if (!audioSrc) return false;

    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    audio.play().catch(() => {});
    return true;
  };

  const speakSection = (text, index) => {
    stopAudio();

    if (lang === "ms" && playMalayAudio(index)) {
      return;
    }

    speakText(text, lang);
  };

  const speakInherited = () =>
    speakSection([t.inheritedTitle, t.inheritedDesc, ...t.inheritedItems].join(". "), 0);
  const speakLearned = () =>
    speakSection([t.learnedTitle, t.learnedDesc, ...t.learnedItems].join(". "), 1);

  useEffect(() => {
    return () => stopAudio();
  }, []);

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

        <section className="relative z-10 mx-auto max-w-6xl">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 max-[1180px]:text-3xl notranslate" translate="no">{t.title}</h1>

          <section className="grid grid-cols-2 gap-6 max-[1180px]:grid-cols-1">
            <article className="relative rounded-[30px] border border-emerald-400/90 bg-[linear-gradient(180deg,rgba(187,247,208,0.98)_0%,rgba(220,252,231,0.97)_34%,rgba(255,255,255,0.98)_70%,rgba(255,255,255,0.98)_100%)] px-7 pb-6 pt-5 shadow-[0_22px_40px_rgba(21,128,61,0.22)] backdrop-blur-sm max-[1180px]:px-5 max-[1180px]:pb-5 max-[1180px]:pt-5">
              <button
                type="button"
                className="absolute right-4 top-4 inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border-none bg-[#eff6ff] text-[22px] leading-none text-[#1d4ed8] shadow-[0_8px_16px_rgba(37,99,235,0.18)] transition hover:-translate-y-[1px] hover:bg-[#dbeafe] hover:shadow-[0_10px_18px_rgba(37,99,235,0.22)]"
                aria-label={t.listen}
                title={t.listen}
                onClick={speakInherited}
              >
                {"\uD83D\uDD0A"}
              </button>
              <h2 className="mb-2 text-center text-[34px] font-extrabold leading-[1.2] text-slate-900 max-[1180px]:text-[28px] notranslate" translate="no">{t.inheritedTitle}</h2>
              <p className="text-[24px] leading-relaxed text-slate-900 max-[1180px]:text-[20px] notranslate" translate="no">{t.inheritedDesc}</p>
              <ul className="mt-1 pl-6 text-[24px] leading-relaxed text-slate-900 max-[1180px]:text-[20px] notranslate" translate="no">
                {t.inheritedItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="relative rounded-[30px] border border-emerald-400/90 bg-[linear-gradient(180deg,rgba(187,247,208,0.98)_0%,rgba(220,252,231,0.97)_34%,rgba(255,255,255,0.98)_70%,rgba(255,255,255,0.98)_100%)] px-7 pb-6 pt-5 shadow-[0_22px_40px_rgba(21,128,61,0.22)] backdrop-blur-sm max-[1180px]:px-5 max-[1180px]:pb-5 max-[1180px]:pt-5">
              <button
                type="button"
                className="absolute right-4 top-4 inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border-none bg-[#eff6ff] text-[22px] leading-none text-[#1d4ed8] shadow-[0_8px_16px_rgba(37,99,235,0.18)] transition hover:-translate-y-[1px] hover:bg-[#dbeafe] hover:shadow-[0_10px_18px_rgba(37,99,235,0.22)]"
                aria-label={t.listen}
                title={t.listen}
                onClick={speakLearned}
              >
                {"\uD83D\uDD0A"}
              </button>
              <h2 className="mb-2 text-center text-[34px] font-extrabold leading-[1.2] text-slate-900 max-[1180px]:text-[28px] notranslate" translate="no">{t.learnedTitle}</h2>
              <p className="text-[24px] leading-relaxed text-slate-900 max-[1180px]:text-[20px] notranslate" translate="no">{t.learnedDesc}</p>
              <ul className="mt-1 pl-6 text-[24px] leading-relaxed text-slate-900 max-[1180px]:text-[20px] notranslate" translate="no">
                {t.learnedItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </section>
        </section>

        <footer className="fixed bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-3 max-[1180px]:flex-col max-[1180px]:items-stretch">
          <div className="p5ghs2-lang p5ghs2-lang-p4 max-[1180px]:justify-center">
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

          <div className="p5ghs2-actions flex items-center gap-2 max-[1180px]:flex-wrap max-[1180px]:justify-end">
            <button
              type="button"
              className="p5ghs2-back-btn notranslate"
              translate="no"
              onClick={() => navigate("/p5/life/genetics/humans/summary")}
            >
              <span>{backLabel}</span>
            </button>
            <button
              type="button"
              className="p5ghs2-next-btn notranslate"
              translate="no"
              onClick={() => navigate("/p5/life/genetics/humans/summary-3")}
            >
              <span>{nextLabel}</span>
            </button>
          </div>
        </footer>
      </div>
    </LabLayout>
  );
}
