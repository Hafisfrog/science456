import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";

const TEXT = {
  th: {
    title: "สรุปผลการทดลอง",
    summaryLines: [
      "เมื่อลูกโป่งทั้ง 2 ใบถูกขัดด้วยผ้าแห้ง ลูกโป่งทั้งสองจะมีประจุชนิดเดียวกัน เมื่อนำมาเข้าใกล้กันจึงเกิดแรงผลักกัน",
      "เมื่อขัดลูกโป่งเพียง 1 ใบ อีกใบไม่ถูกขัด จะเกิดการเหนี่ยวนำประจุ เมื่อนำมาเข้าใกล้กันจึงเกิดแรงดึงดูดกัน",
    ],
    back: "ย้อนกลับ",
    next: "ต่อไป",
    visualTitle: "ภาพประกอบการทดลอง",
    level0Label: "ไม่ถู (0 นาที): ยังไม่ดูดเศษกระดาษ",
    level2Label: "ถู 2 นาที: ดูดเศษกระดาษเล็กน้อย",
    level5Label: "ถู 5 นาที: ดูดเศษกระดาษมากขึ้น",
  },
  en: {
    title: "Experiment Summary",
    summaryLines: [
      "When both balloons are rubbed with dry cloth, they get the same type of charge, so they repel each other when brought close.",
      "When only one balloon is rubbed, charge induction occurs and the balloons attract each other when brought close.",
    ],
    back: "Back",
    next: "Next",
    visualTitle: "Experiment Illustration",
    level0Label: "No rub (0 min): no visible paper attraction",
    level2Label: "Rub 2 min: slight attraction",
    level5Label: "Rub 5 min: stronger attraction",
  },
  ms: {
    title: "กือซีปูแลฮาเซ ปือจูบอแอ",
    summaryLines: [
      "กาลู ดูวอ บูเต บูเวาะฮ กือลือมง กือนอ แกแซะ ดืองา กา-เอ็ง กือริง เฮาะ อาดอ จะฮ อาปีเฮาะ ซามอ, ลือปะฮ ตูอาเมะ มารีลือเตาะ ดือกะ, เนาะ บูวะ วี ยาดีแร็ง ตอเลาะ",
      "กาลู แกแซะ บูเวาะฮ กือลือมง เซอบูเต, ลือปะฮ ตูอาเมะ มารีลือเตาะ ดือกะ, เนาะ บูวะ วี ยาดีแร็งตาเระ",
    ],
    back: "ฮูโนกือเละ",
    next: "ตือรุฮ",
    visualTitle: "กามา ฮูราแย ปือจูบอแอ",
    level0Label: "ตะเดาะ แกแซะ (0 แมแนะ): เตาะบือรูเบาะฮ",
    level2Label: "แกแซะ 2 แมแนะ: กือรือตะฮ กือนอ ซือเราะ ซีกิ",
    level5Label: "แกแซะ 5 แมแนะ: กือรือตะฮ กือนอ ซือเราะ บาเญาะ ซือกาลี",
  },
};

const LISTEN_LABELS = {
  th: "ฟังสรุป",
  en: "Listen",
  ms: "Dengar ringkasan",
};

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.92;
  const voices = synth.getVoices();
  const voice =
    voices.find((v) => v.lang === lang) ||
    voices.find((v) => v.lang.startsWith(lang.split("-")[0]));
  if (voice) utter.voice = voice;
  synth.speak(utter);
}

function Spark({ className }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bg-[#ffc84b] ${className}`}
      style={{
        clipPath:
          "polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)",
      }}
    />
  );
}

export default function P6ElectricGenerationKeySummary() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TEXT[lang] ?? TEXT.th, [lang]);
  const listenLabel = LISTEN_LABELS[lang] ?? LISTEN_LABELS.th;
  const langMap = { th: "th-TH", en: "en-US", ms: "ms-MY" };
  const speakSummary = () => {
    window.speechSynthesis?.cancel();

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (lang === "ms") {
      const audio = new Audio("/audio/p6/9.1.mp3");
      audioRef.current = audio;
      audio.play();
      return;
    }

    const content = [t.title, ...t.summaryLines].join(". ");
    speakText(content, langMap[lang] || "th-TH");
  };
  const langLabels = { th: "ไทย", ms: "มลายู",en: "อังกฤษ" };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-6 pt-8 text-slate-900 md:px-8 md:pt-20"
      style={{
        fontFamily: "Prompt, sans-serif",
        background:
          "radial-gradient(46% 27% at 8% 41%, #cdebf4 0 61%, transparent 62%), radial-gradient(40% 26% at 94% 42%, #cdebf4 0 60%, transparent 61%), radial-gradient(72% 35% at 50% 33%, #f7f0ef 0 63%, transparent 64%), radial-gradient(80% 50% at 50% 75%, #f7f0ef 0 62%, transparent 63%), linear-gradient(180deg, #fbf5f2 0%, #fbf5f2 100%)",
      }}
    >
      <HomeButton />

      <div className="pointer-events-none absolute left-[-92px] top-[24%] h-[310px] w-[255px] rotate-[-10deg] rounded-[52%_52%_46%_46%] border-[7px] border-black bg-[#fff773] shadow-[inset_24px_22px_0_rgba(255,255,255,.48)] max-[900px]:left-[-150px]">
        <div className="absolute bottom-[-38px] left-[40px] h-[70px] w-[82px] rotate-[12deg] rounded-[14px] border-[7px] border-black bg-[#111]" />
        <div className="absolute bottom-[-4px] left-[56px] h-[84px] w-[54px] rotate-[18deg] rounded-[10px] border-[5px] border-black bg-[#fff7a3]" />
        <div className="absolute left-[102px] top-[76px] h-[126px] w-[98px] rounded-[50%] border-[4px] border-slate-500/35" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(70px,14vw,290px)] top-[-20px] h-[clamp(150px,18vw,270px)] w-[clamp(82px,9vw,150px)] bg-[#ffc84b] max-[700px]:opacity-55"
        style={{
          clipPath:
            "polygon(0 0,44% 0,68% 36%,93% 9%,100% 39%,78% 54%,100% 100%,57% 54%,38% 70%)",
        }}
      />
      <Spark className="right-[10%] top-[16%] h-11 w-11 max-[760px]:hidden" />
      <Spark className="right-[22%] top-[17%] h-12 w-12 max-[760px]:hidden" />
      <Spark className="right-[18%] top-[25%] h-5 w-5 max-[760px]:hidden" />
      <div className="pointer-events-none absolute left-[6%] bottom-[20%] text-[92px] leading-none opacity-75 max-[900px]:hidden">
        🧲
      </div>

      <div className="relative z-[1] mx-auto flex w-full max-w-[1200px] flex-col gap-4">
        <div className="relative overflow-hidden rounded-[26px] border border-white/90 bg-[#e8f5ff]/95 p-[clamp(22px,3vw,34px)] shadow-[0_18px_30px_rgba(17,24,39,0.14)]">
          <div className="flex items-start justify-between gap-3">
            <h1 className="m-0 text-[clamp(28px,3.2vw,40px)] font-black text-slate-900">{t.title}</h1>
            <button
              type="button"
              onClick={speakSummary}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-700 shadow transition hover:scale-105"
              aria-label={listenLabel}
              title={listenLabel}
            >
              {"\uD83D\uDD0A"}
            </button>
          </div>

          <div className="mt-4 grid gap-4 text-[clamp(16px,1.6vw,18px)] font-semibold leading-[1.7] text-slate-900">
            {t.summaryLines.map((line, idx) => (
              <p key={idx} className="m-0">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-2 rounded-[22px] border border-white/90 bg-white/85 p-4 shadow-[0_14px_24px_rgba(17,24,39,0.12)]">
          <p className="m-0 text-[clamp(16px,1.3vw,20px)] font-black text-slate-900">{t.visualTitle}</p>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            <article className="rounded-[16px] bg-[linear-gradient(180deg,#f4f8ff_0%,#e8f1ff_100%)] p-3">
              <p className="mb-2 mt-0 text-[clamp(13px,1vw,16px)] font-bold text-slate-700">{t.level0Label}</p>
              <div className="relative h-[142px] overflow-hidden rounded-[12px] bg-[#dbe8f7]">
                <img
                  src="/images/p6/equipment/lukpong-cut.png"
                  alt="balloon"
                  className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_10px_18px_rgba(15,23,42,0.22)]"
                />
              </div>
            </article>

            <article className="rounded-[16px] bg-[linear-gradient(180deg,#f4f8ff_0%,#e8f1ff_100%)] p-3">
              <p className="mb-2 mt-0 text-[clamp(13px,1vw,16px)] font-bold text-slate-700">{t.level2Label}</p>
              <div className="relative h-[142px] overflow-hidden rounded-[12px] bg-[#dbe8f7]">
                <img
                  src="/images/p6/equipment/lukpong-cut.png"
                  alt="balloon"
                  className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_10px_18px_rgba(15,23,42,0.22)]"
                />
                <div className="pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[26px] w-[24px] -translate-x-1/2 -translate-y-1/2">
                  <img src="/images/p6/equipment/tissue-real.svg" alt="" className="absolute left-[4px] top-[2px] h-[11px] w-auto rotate-[8deg] opacity-86" />
                  <img src="/images/p6/equipment/tissue-real.svg" alt="" className="absolute left-[8px] top-[9px] h-[11px] w-auto rotate-[-14deg] opacity-82" />
                  <img src="/images/p6/equipment/tissue-real.svg" alt="" className="absolute left-[12px] top-[13px] h-[11px] w-auto rotate-[16deg] opacity-80" />
                </div>
              </div>
            </article>

            <article className="rounded-[16px] bg-[linear-gradient(180deg,#f4f8ff_0%,#e8f1ff_100%)] p-3">
              <p className="mb-2 mt-0 text-[clamp(13px,1vw,16px)] font-bold text-slate-700">{t.level5Label}</p>
              <div className="relative h-[142px] overflow-hidden rounded-[12px] bg-[#dbe8f7]">
                <img
                  src="/images/p6/equipment/lukpong-cut.png"
                  alt="balloon"
                  className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_10px_18px_rgba(15,23,42,0.22)]"
                />
                <div className="pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[30px] w-[28px] -translate-x-1/2 -translate-y-1/2">
                  <img src="/images/p6/equipment/tissue-real.svg" alt="" className="absolute left-[3px] top-[1px] h-[11px] w-auto rotate-[8deg] opacity-90" />
                  <img src="/images/p6/equipment/tissue-real.svg" alt="" className="absolute left-[8px] top-[4px] h-[11px] w-auto rotate-[-14deg] opacity-88" />
                  <img src="/images/p6/equipment/tissue-real.svg" alt="" className="absolute left-[13px] top-[10px] h-[11px] w-auto rotate-[18deg] opacity-86" />
                  <img src="/images/p6/equipment/tissue-real.svg" alt="" className="absolute left-[5px] top-[14px] h-[11px] w-auto rotate-[-10deg] opacity-84" />
                  <img src="/images/p6/equipment/tissue-real.svg" alt="" className="absolute left-[12px] top-[18px] h-[11px] w-auto rotate-[6deg] opacity-82" />
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
        <div className="inline-flex gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
          <button
            onClick={() => setLang("th")}
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "th"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
          >
            {langLabels.th}
          </button>

            <button
            onClick={() => setLang("ms")}
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "ms"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
          >
            {langLabels.ms}
          </button>

          <button
            onClick={() => setLang("en")}
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "en"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
          >
            {langLabels.en}
          </button>

        </div>
      </div>

      <div className="pointer-events-auto fixed bottom-3 right-3 z-20 flex gap-3 md:bottom-7 md:right-7">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/experiment/electric-generation/summary")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          &laquo; {t.back}
        </button>
        <button
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/experiment/electric-generation/summary-2")}
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
