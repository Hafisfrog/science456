import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";

const LANG = {
  th: {
    title: "การทดลองที่ 2 เรื่อง ผลของแรงไฟฟ้า",
    equipment: "วัสดุอุปกรณ์",
    balloons: "ลูกโป่งที่เป่าให้พอง 2 ลูก",
    markers: "ปากกาเมจิก\n2 ด้าม",
    tissue: "กระดาษเยื่อ",
    back: "ย้อนกลับ",
    next: "ต่อไป",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    title: "Experiment 2 Effects of Electric Force",
    equipment: "Materials and Equipment",
    balloons: "2 inflated balloons",
    markers: "2 marker pens",
    tissue: "Tissue paper",
    back: "Back",
    next: "Next",
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    title: "ปือจูบอแอ 2 ตาโยะ; ฮาเซ แร็ง อาปี",
    equipment: "อาละ-อาละ",
    balloons: "กือลือมง เฮาะ ซูเดาะฮ ซียุ ยาดี ตือเระ ดูวอ บูเต",
    markers: "กาแล เมจิดูวอ ปูตง",
    tissue: "กือรือตะฮ ตีซู",
    back: "ฮูโนกือเละ",
    next: "ตือรุฮ",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

const LANGUAGE_OPTIONS = [
  { id: "th", speechLang: "th-TH", label: "ไทย" },
  { id: "ms", speechLang: "ms-MY", label: "มลายู" },
  { id: "en", speechLang: "en-US", label: "อังกฤษ" },
];

const EQUIPMENT_ITEMS = [
  { id: "balloons", image: "/images/p6/equipment/lukpong-cut.png" },
  { id: "markers", image: "/images/p6/kalae.png" },
  { id: "tissue", image: "/images/p6/equipment/tissue-real.svg" },
];

const MALAY_EQUIPMENT_AUDIO = {
  balloons: "/audio/p6/14.1.mp3",
  markers: "/audio/p6/14.2.mp3",
  tissue: "/audio/p6/14.3.mp3",
};

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.9;
  window.speechSynthesis.speak(utter);
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

function EquipmentCard({ item, label, lang, activeLang, onSpeak }) {
  const isBalloons = item.id === "balloons";
  const audioSrc = activeLang === "ms" ? MALAY_EQUIPMENT_AUDIO[item.id] : undefined;

  return (
    <div className="flex w-[clamp(220px,22vw,280px)] shrink-0 flex-col items-center">
      <div className="relative flex h-[clamp(190px,24vh,250px)] w-full items-center justify-center rounded-[24px] border-[2px] border-[#7587af] bg-[linear-gradient(180deg,#ecdfc3_0%,#dfccaa_100%)] p-4 shadow-[0_12px_20px_rgba(20,33,64,0.2),inset_0_1px_0_rgba(255,255,255,0.72)]">
        <div className="absolute inset-[7px] rounded-[18px] border border-[#f8f0dd]/70" />
        <div className="absolute inset-[7px] rounded-[18px] bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.12),transparent_58%)]" />

        {isBalloons ? (
          <div className="flex items-end justify-center gap-2">
            {[0, 1].map((idx) => (
              <img
                key={idx}
                src={item.image}
                alt={`${label} ${idx + 1}`}
                className="max-h-[74%] w-[36%] object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.3)]"
                style={{ filter: "contrast(1.08) saturate(1.14)" }}
              />
            ))}
          </div>
        ) : (
          <img
            src={item.image}
            alt={label}
            className="max-h-[74%] max-w-[74%] object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.3)]"
            style={{ filter: "contrast(1.08) saturate(1.14)" }}
          />
        )}
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        <p className="whitespace-pre-line text-center text-[clamp(18px,2.2vw,30px)] font-bold text-slate-900">{label}</p>

        <button
          onClick={() => onSpeak(label, lang, audioSrc)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-700 shadow transition hover:scale-105"
          type="button"
          aria-label={label}
          title={label}
        >
          🔊
        </button>
      </div>
    </div>
  );
}

export default function P6ElectricForceEffect() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [lang, setLang] = useState("th");

  const t = LANG[lang] ?? LANG.th;
  const speechLang = LANGUAGE_OPTIONS.find((item) => item.id === lang)?.speechLang ?? "th-TH";

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const stopAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const playAudio = (text, speechLang, audioSrc) => {
    if (typeof window === "undefined") return;

    window.speechSynthesis?.cancel();
    stopAudio();

    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audioRef.current = audio;
      audio.play();
      return;
    }

    speakText(text, speechLang);
  };

  const pageBg = {
    background:
      "radial-gradient(46% 27% at 8% 41%, #cdebf4 0 61%, transparent 62%), radial-gradient(40% 26% at 94% 42%, #cdebf4 0 60%, transparent 61%), radial-gradient(72% 35% at 50% 33%, #f7f0ef 0 63%, transparent 64%), radial-gradient(80% 50% at 50% 75%, #f7f0ef 0 62%, transparent 63%), linear-gradient(180deg, #fbf5f2 0%, #fbf5f2 100%)",
  };

  return (
    <div
      className="relative h-[100dvh] overflow-hidden px-[clamp(14px,1.6vw,24px)] py-[clamp(12px,1.6vw,20px)]"
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

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1240px] flex-col">
        <h1 className="text-center text-[clamp(40px,4.2vw,64px)] font-bold">{t.title}</h1>

        <div className="flex flex-1 flex-col pt-[20px]">
          <h2 className="text-[clamp(34px,4vw,55px)] font-bold">{t.equipment}</h2>

          <div className="flex flex-1 items-center justify-center">
            <div className="flex w-full max-w-[1020px] justify-center gap-[40px]">
              {EQUIPMENT_ITEMS.map((item) => (
                <EquipmentCard
                  key={item.id}
                  item={item}
                  label={t[item.id]}
                  lang={speechLang}
                  activeLang={lang}
                  onSpeak={playAudio}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
          <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
            {LANGUAGE_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setLang(option.id)}
                className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold text-slate-900 transition ${
                  lang === option.id
                    ? "bg-[#bfe0ff] text-slate-900"
                    : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
                }`}
                type="button"
              >
                <span className="notranslate" translate="no">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-7 md:right-7">
          <button
            className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
            onClick={() => navigate("/p6/experiment/electric-force-effect/skills")}
            type="button"
            aria-label={t.back}
            title={t.back}
          >
            &laquo; {t.back}
          </button>

          <button
            className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
            onClick={() => navigate("/p6/experiment/electric-force-effect/steps")}
            type="button"
            aria-label={t.next}
            title={t.next}
          >
            {t.next} &raquo;
          </button>
        </div>
      </div>
    </div>
  );
}
