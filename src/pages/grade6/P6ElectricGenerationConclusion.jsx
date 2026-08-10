import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";

const TEXT = {
  th: {
    title: "สรุปผลการทดลอง",
    body: [
      "ดังนั้นจากการทดลองพบว่า ลูกโป่งที่ไม่ผ่านการขัดด้วยผ้าแห้งไม่แสดงการเปลี่ยนแปลงหรือแรงดึงดูดต่อเศษกระดาษ",
      "ขณะที่ลูกโป่งที่ผ่านการขัดด้วยผ้าแห้งสามารถดึงดูดเศษกระดาษชิ้นเล็กที่อยู่ใกล้ได้",
      "ทั้งนี้แสดงว่าเมื่อมีระยะเวลาการขัดด้วยผ้าแห้ง จะส่งผลให้แรงไฟฟ้าที่เกิดขึ้นมีแนวโน้มเพิ่มขึ้น",
    ],
    back: "ย้อนกลับ",
    next: "ต่อไป",
    listen: "ฟังข้อความ",
    lang: { th: "ไทย",  ms: "มลายู",en: "อังกฤษ", },
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
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  ms: {
    title: "กือซีปูแลฮาเซ ปือจูบอแอ",
    body: [
      "ดารีฮาเซ ปือจูบอแอ ดีดาปาตี บาฮาวอ, บูเวาะฮ กือลือมง เฮาะ เดาะ กือนอแกแซะ ดืองา กา-เอ็ง กือริงเตาะ บือรูเบาะฮ อาตาวอ แร็ง ตาเระ ดืองา กือรือตะฮ กือจิ",
      "มานอกาลอ บูเวาะฮ กือลือมง เฮาะกือนอแกแซะ ดืองา กา-เอ็ง กือริง บูเละฮ ตาเระ กือรือตะฮกือจิเฮาะ โดะ ดือกะมากอ, อีนี บูเละฮ ตูโญะ กาตอ",
      "กาลู อาดอ ยากอ มาซอ อูโตะ แกแซะ ดืองา กา-เอ็ง กือริง เนาะ บูวะ วี แร็งอาปีตาเมาะฮ บาเญาะ ลากี",
    ],
    back: "ฮูโนกือเละ",
    next: "ตือรุฮ",
    listen: "Baca skrin",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
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

function LanguagePills({ lang, setLang, labels }) {
  const pills = [
    { code: "th", label: labels.th },
    { code: "ms", label: labels.ms },
    { code: "en", label: labels.en },
  ];

  return (
    <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
      <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
        {pills.map((p) => (
          <button
            key={p.code}
            type="button"
            onClick={() => setLang(p.code)}
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold text-slate-900 transition ${
              lang === p.code
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function P6ElectricGenerationConclusion() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TEXT[lang] ?? TEXT.th, [lang]);
  const speechLang = SPEECH_LANG[lang] ?? "th-TH";
  const listenLabel = t.listen ?? "Listen";
  const readAllText = useMemo(() => [t.title, ...t.body].join(". "), [t]);

  const stopAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const speakConclusion = () => {
    if (typeof window === "undefined") return;

    window.speechSynthesis?.cancel();
    stopAudio();

    if (lang === "ms") {
      const audio = new Audio("/audio/p6/10.1.mp3");
      audioRef.current = audio;
      audio.play();
      return;
    }

    speakText(readAllText, speechLang);
  };

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      stopAudio();
    };
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-28 pt-6 text-slate-900 md:px-8 md:pb-32"
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

      <div className="relative z-[1] mx-auto flex min-h-[calc(100vh-180px)] w-full max-w-[1240px] items-center">
        <div className="relative w-full overflow-hidden rounded-[28px] border border-white/90 bg-[#e8f5ff]/95 p-[clamp(22px,2.8vw,36px)] shadow-[0_18px_30px_rgba(17,24,39,0.16)]">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="m-0 text-[clamp(28px,3.1vw,40px)] font-black text-slate-900">{t.title}</h1>
            <button
              type="button"
              onClick={speakConclusion}
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

      <div className="pointer-events-auto fixed bottom-3 right-3 z-20 flex gap-3 md:bottom-7 md:right-7">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/experiment/electric-generation/key-summary")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          &laquo; {t.back}
        </button>
        <button
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/experiment/electric-generation/summary-3")}
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
