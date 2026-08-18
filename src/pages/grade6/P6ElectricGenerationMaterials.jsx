import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HomeButton from "../HomeButton";

const LANG = {
  th: {
    title: "การทดลองที่ 1 เรื่อง การเกิดแรงไฟฟ้า",
    equipment: "วัสดุอุปกรณ์",
    balloon: "ลูกโป่ง",
    cloth: "ผ้าแห้ง",
    paper: "เศษกระดาษ",
    back: "ย้อนกลับ",
    next: "ต่อไป",
  },
  en: {
    title: "Experiment 1 Electric Force Generation",
    equipment: "Materials and Equipment",
    balloon: "Balloon",
    cloth: "Dry Cloth",
    paper: "Paper Bits",
    back: "Back",
    next: "Next",
  },
  ms: {
    title: "ปือจูบอแอ 1 ตาโยะ; กือยาดีแยแร็ง อาปี",
    equipment: "อาละ-อาละ",
    balloon: "บูเวาะฮ กือลือมง",
    cloth: "กา-เอ็ง กือริง",
    paper: "กือรือตะฮ กือจิ-กือจิ",
    back: "ฮูโนกือเละ",
    next: "ตือรุฮ",
  },
};

const EQUIPMENT_ITEMS = [
  { id: "balloon", image: "/images/p6/equipment/lukpong-cut.png" },
  { id: "cloth", image: "/images/p6/pahang.png" },
  { id: "paper", image: "/images/p6/sedkradad.png" },
];

const MALAY_EQUIPMENT_AUDIO = {
  balloon: "/audio/p6/7.1.mp3",
  cloth: "/audio/p6/7.2.mp3",
  paper: "/audio/p6/7.3.mp3",
};

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.9;
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

function EquipmentCard({ item, label, lang, failed, onError, onSpeak }) {
  const speak = () => {
    const langMap = { th: "th-TH", en: "en-US", ms: "ms-MY" };
    onSpeak(label, langMap[lang], lang === "ms" ? MALAY_EQUIPMENT_AUDIO[item.id] : undefined);
  };

  return (
    <div className="w-[250px] shrink-0 transition-transform duration-200 hover:-translate-y-1">
      <div className="relative flex h-[246px] items-center justify-center rounded-[24px] border-[2px] border-[#7587af] bg-[linear-gradient(180deg,#ecdfc3_0%,#dfccaa_100%)] p-4 shadow-[0_12px_20px_rgba(20,33,64,0.2),inset_0_1px_0_rgba(255,255,255,0.72)]">
        <div className="absolute inset-[7px] rounded-[18px] border border-[#f8f0dd]/70" />
        <div className="absolute inset-[7px] rounded-[18px] bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.12),transparent_58%)]" />

        {failed ? (
          <div className="text-center text-lg font-bold text-slate-600">Image error</div>
        ) : (
          <img
            src={item.image}
            alt={label}
            className="max-h-[176px] max-w-[176px] object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.3)]"
            style={{ filter: "contrast(1.08) saturate(1.14)" }}
            onError={onError}
          />
        )}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <p className="whitespace-nowrap text-[clamp(28px,3vw,42px)] font-bold text-slate-900">{label}</p>
        <button
          onClick={speak}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-700 shadow transition hover:scale-105"
          type="button"
        >
          {"\uD83D\uDD0A"}
        </button>
      </div>
    </div>
  );
}

export default function P6ElectricGenerationMaterials() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const audioRef = useRef(null);
  const [lang, setLang] = useState("th");
  const [broken, setBroken] = useState({});

  const t = LANG[lang];
  const langLabels = {
    th: "ไทย",
    ms: "มลายูถิ่น",
    en: "อังกฤษ",
  };

  const from = searchParams.get("from");
  const backPath = from === "unit" ? "/p6/experiment/electric-generation/skills" : "/p6/experiment/electric-generation/vocab";
  const nextPath =
    from === "unit"
      ? "/p6/experiment/electric-generation/steps?from=unit"
      : "/p6/experiment/electric-generation/steps";

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const pageBg = {
    background:
      "radial-gradient(46% 27% at 8% 41%, #cdebf4 0 61%, transparent 62%), radial-gradient(40% 26% at 94% 42%, #cdebf4 0 60%, transparent 61%), radial-gradient(72% 35% at 50% 33%, #f7f0ef 0 63%, transparent 64%), radial-gradient(80% 50% at 50% 75%, #f7f0ef 0 62%, transparent 63%), linear-gradient(180deg, #fbf5f2 0%, #fbf5f2 100%)",
  };

  const stopAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const playAudio = (label, speechLang, audioSrc) => {
    if (typeof window === "undefined") return;

    window.speechSynthesis?.cancel();
    stopAudio();

    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audioRef.current = audio;
      audio.play();
      return;
    }

    speakText(label, speechLang);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden px-6 pb-24 pt-6"
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

      <div className="relative z-10 mx-auto w-full max-w-[1220px]">
        <h1 className="text-center text-[64px] font-bold text-black">{t.title}</h1>
        <h2 className="mt-8 text-[52px] font-bold">{t.equipment}</h2>

        <div className="mt-8">
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-8">
            {EQUIPMENT_ITEMS.map((item) => (
              <EquipmentCard
                key={item.id}
                item={item}
                label={t[item.id]}
                lang={lang}
                failed={Boolean(broken[item.id])}
                onError={() => setBroken((prev) => ({ ...prev, [item.id]: true }))}
                onSpeak={playAudio}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
        <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
          <button
            onClick={() => setLang("th")}
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "th"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
          >
            <span className="notranslate" translate="no">{langLabels.th}</span>
          </button>

          <button
            onClick={() => setLang("ms")}
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "ms"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
          >
            <span className="notranslate" translate="no">{langLabels.ms}</span>
          </button>

          <button
            onClick={() => setLang("en")}
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "en"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
          >
            <span className="notranslate" translate="no">{langLabels.en}</span>
          </button>
        </div>
      </div>

      <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-7 md:right-7">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate(backPath)}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          &laquo; {t.back}
        </button>

        <button
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate(nextPath)}
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

