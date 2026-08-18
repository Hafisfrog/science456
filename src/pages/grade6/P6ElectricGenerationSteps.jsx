import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HomeButton from "../HomeButton";

const TEXT = {
  th: {
    title: "การทดลองที่ 1 เรื่อง การเกิดแรงไฟฟ้า",
    heading: "ขั้นตอนการทดลอง",
    steps: [
      "เลือกวัตถุสำหรับทดลอง",
      "นำผ้าแห้งมาขัดถูลูกโป่ง",
      "สังเกตและบันทึกผล",
    ],
    detail: [
      "ครั้งที่ 1 ไม่ขัดถูด้วยผ้าแห้ง",
      "ครั้งที่ 2 ถูด้วยผ้าแห้ง 2 นาที",
      "ครั้งที่ 3 ขัดถูด้วยผ้าแห้ง 5 นาที",
    ],
    start: "เริ่มการทดลอง",
    backToMaterials: "กลับหน้าวัสดุอุปกรณ์",
    back: "ย้อนกลับ",
    next: "ต่อไป",
    langLabel: { th: "ไทย", ms: "มลายูถิ่น", en: "อังกฤษ" },
  },
  en: {
    title: "Experiment 1: Electric Force Generation",
    heading: "Experiment Steps",
    steps: [
      "Choose an object for testing",
      "Rub the balloon with a dry cloth",
      "Observe and record",
    ],
    detail: [
      "Round 1: no rubbing with a dry cloth",
      "Round 2: rub with a dry cloth for 2 minutes",
      "Round 3: rub with a dry cloth for 5 minutes",
    ],
    start: "Start Experiment",
    backToMaterials: "Back to materials and equipment",
    back: "Back",
    next: "Next",
    langLabel: { th: "ไทย", ms: "มลายูถิ่น", en: "อังกฤษ" },
  },
  ms: {
    title: "ปือจูบอแอ 1 ตาโยะ; กือยาดีแยแร็ง อาปี",
    heading: "จารอ บูวะ ปือจูบอแอ",
    steps: [
      "ปีเละฮ บือนอ เฮาะ เนาะ บูวะ ปือจูบอแอ",
      "โบเวาะ กา-เอ็ง กือริง มารีแกแซะ ดืองา บูเวาะฮ กือลือมง",
      "ปือราตีลือปะฮ ตูตานอ ฮาเซ",
    ],
    detail: [
      "กาลี 1 ตะเดาะ แกแซะ ดืองา กา-เอ็ง กือริง",
      "กาลี 2 แกแซะ ดืองา กา-เอ็ง กือริง 2 แมแนะ",
      "กาลี 3 แกแซะ ดืองา กา-เอ็ง กือริง 5 แมแนะ",
    ],
    start: "Mula eksperimen",
    backToMaterials: "Kembali ke bahan dan peralatan",
    back: "ฮูโนกือเละ",
    next: "ตือรุฮ",
    langLabel: { th: "ไทย", ms: "มลายูถิ่น", en: "อังกฤษ" },
  },
};

const SPEECH_LANG = {
  th: "th-TH",
  ms: "ms-MY",
  en: "en-US",
};

const MALAY_STEP_AUDIO = [
  "/audio/p6/8.1.mp3",
  "/audio/p6/8.2.mp3",
  "/audio/p6/8.3.mp3",
];

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
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

function StepPill({ no, text, onSpeak }) {
  return (
    <div className="relative flex min-h-[clamp(56px,7.1vh,82px)] w-full items-center rounded-full border-[clamp(3px,.38vw,4px)] border-black bg-white pl-[clamp(60px,6.4vw,88px)] pr-[clamp(12px,1.5vw,20px)] py-[clamp(8px,1vh,12px)] shadow-[clamp(7px,.75vw,10px)_clamp(7px,.75vw,10px)_0_rgba(0,0,0,.28)]">
      <span className="absolute left-[clamp(8px,1vw,14px)] top-1/2 grid aspect-square w-[clamp(42px,4.2vw,58px)] -translate-y-1/2 place-items-center rounded-full bg-[#6786e8] text-[clamp(26px,2.7vw,40px)] font-black leading-none text-white shadow-[inset_0_-4px_0_rgba(255,255,255,.16)]">
        {no}
      </span>
      <span className="min-w-0 flex-1 text-[clamp(21px,2.25vw,40px)] font-black leading-tight text-black [overflow-wrap:anywhere]">
        {text}
      </span>
      <button
        type="button"
        onClick={onSpeak}
        className="ml-[clamp(8px,1vw,14px)] grid aspect-square w-[clamp(36px,3.5vw,50px)] shrink-0 place-items-center rounded-full bg-orange-100 text-[clamp(17px,1.6vw,24px)] text-orange-700 shadow-[0_8px_18px_rgba(15,23,42,.16)] transition hover:-translate-y-0.5 hover:bg-orange-200 active:translate-y-[1px]"
        aria-label={text}
        title={text}
      >
        {"\u{1F50A}"}
      </button>
    </div>
  );
}

export default function P6ElectricGenerationSteps() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const audioRef = useRef(null);
  const [lang, setLang] = useState("th");

  const content = TEXT[lang] ?? TEXT.th;
  const voice = SPEECH_LANG[lang] ?? "th-TH";

  const from = searchParams.get("from");
  const materialsPath =
    from === "unit"
      ? "/p6/experiment/electric-generation/materials?from=unit"
      : "/p6/experiment/electric-generation/materials";
  const simPath =
    from === "unit"
      ? "/p6/experiment/electric-generation/sim?from=unit&fresh=1"
      : "/p6/experiment/electric-generation/sim?fresh=1";

  const pageBg = {
    background:
      "radial-gradient(46% 27% at 8% 41%, #cdebf4 0 61%, transparent 62%), radial-gradient(40% 26% at 94% 42%, #cdebf4 0 60%, transparent 61%), radial-gradient(72% 35% at 50% 33%, #f7f0ef 0 63%, transparent 64%), radial-gradient(80% 50% at 50% 75%, #f7f0ef 0 62%, transparent 63%), linear-gradient(180deg, #fbf5f2 0%, #fbf5f2 100%)",
  };

  const stopAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const speakStep = (index, text) => {
    if (typeof window === "undefined") return;

    window.speechSynthesis?.cancel();
    stopAudio();

    if (lang === "ms") {
      const audio = new Audio(MALAY_STEP_AUDIO[index]);
      audioRef.current = audio;
      audio.play();
      return;
    }

    speakText(text, voice);
  };

  return (
    <div
      className="relative h-[100svh] overflow-hidden px-3 pb-[104px] pt-4 text-slate-900 sm:px-4 sm:pb-[96px] md:px-6 md:pb-[86px] md:pt-5"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
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

      <main className="relative z-10 mx-auto flex h-full w-full max-w-[1540px] flex-col">
        <header className="flex min-h-[clamp(88px,18vh,164px)] items-end justify-center pb-[clamp(8px,1.5vh,18px)]">
          <h1 className="text-center text-[clamp(26px,3.4vw,58px)] font-black leading-tight text-black">
            {content.title}
          </h1>
        </header>

        <section className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center pb-[clamp(4px,1vh,12px)]">
          <h2 className="mb-[clamp(16px,3vh,44px)] pl-[clamp(0px,1.5vw,24px)] text-[clamp(24px,3vw,50px)] font-black leading-none text-black">
            {content.heading}
          </h2>

          <div className="mx-auto flex w-full max-w-[min(860px,82vw)] flex-col gap-[clamp(16px,2.2vh,28px)] max-[700px]:max-w-full">
            <StepPill no={1} text={content.steps[0]} onSpeak={() => speakStep(0, content.steps[0])} />

            <div>
              <StepPill
                no={2}
                text={content.steps[1]}
                onSpeak={() => speakStep(1, [content.steps[1], ...content.detail].join(" "))}
              />
              <div className="mx-auto mt-[clamp(12px,2vh,24px)] w-[min(760px,78vw)] text-[clamp(20px,2.25vw,38px)] font-black leading-[1.35] text-black max-[700px]:w-full max-[700px]:pl-[68px]">
                {content.detail.map((line) => (
                  <p className="m-0" key={line}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <StepPill no={3} text={content.steps[2]} onSpeak={() => speakStep(2, content.steps[2])} />
          </div>
        </section>
      </main>

      <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
        <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
          <button
            onClick={() => setLang("th")}
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "th"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
            type="button"
          >
            {content.langLabel.th}
          </button>
          <button
            onClick={() => setLang("ms")}
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "ms"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
            type="button"
          >
            {content.langLabel.ms}
          </button>
          <button
            onClick={() => setLang("en")}
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "en"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
            type="button"
          >
            {content.langLabel.en}
          </button>
        </div>
      </div>

      <div className="fixed bottom-3 right-3 z-40 flex items-center gap-3 md:bottom-7 md:right-7">
        <button
          type="button"
          onClick={() => navigate(materialsPath)}
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          aria-label={content.backToMaterials}
          title={content.backToMaterials}
        >
          &laquo; {content.back}
        </button>

        <button
          type="button"
          onClick={() => navigate(simPath)}
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          aria-label={content.start}
          title={content.start}
        >
          {content.next} &raquo;
        </button>
      </div>
    </div>
  );
}
