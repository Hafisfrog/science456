import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FoodChainLanguageSwitcher, FoodChainNavButtons } from "./FoodChainControls";

const MALAY_VOICE_NAME_RE = /(malay|melayu|bahasa malaysia|bahasa melayu|malaysia)/i;
const LANG_TO_LOCALE = {
  th: "th-TH",
  en: "en-US",
  ms: "ms-MY",
};

const isSpeechSupported = () =>
  typeof window !== "undefined" &&
  typeof SpeechSynthesisUtterance !== "undefined" &&
  !!window.speechSynthesis;

const getVoiceTag = (voice) =>
  `${voice?.name ?? ""} ${voice?.voiceURI ?? ""}`.toLowerCase();

function pickVoice(voices, locale, langKey) {
  const lowerLocale = locale.toLowerCase();
  const langPrefix = lowerLocale.split("-")[0];

  const exactMatch = voices.find(
    (voice) => voice.lang?.toLowerCase() === lowerLocale
  );
  if (exactMatch) return exactMatch;

  if (langKey === "ms") {
    const msLangMatch = voices.find((voice) =>
      voice.lang?.toLowerCase().startsWith("ms")
    );
    if (msLangMatch) return msLangMatch;

    const malayNameMatch = voices.find((voice) =>
      MALAY_VOICE_NAME_RE.test(getVoiceTag(voice))
    );
    if (malayNameMatch) return malayNameMatch;

    const indonesiaFallback = voices.find((voice) =>
      voice.lang?.toLowerCase().startsWith("id")
    );
    if (indonesiaFallback) return indonesiaFallback;

    return null;
  }

  return (
    voices.find((voice) => voice.lang?.toLowerCase().startsWith(langPrefix)) ||
    voices[0] ||
    null
  );
}

function formatSpeechText(text, langKey) {
  if (!text) return "";

  const separator =
    langKey === "ms" ? " sebagai " : langKey === "en" ? ", " : ", ";

  return text.replace(/\s*\/\s*/g, separator).replace(/\s+/g, " ").trim();
}

function speakWithBestVoice(text, langKey) {
  if (!isSpeechSupported() || !text) return;

  const synth = window.speechSynthesis;
  const locale = LANG_TO_LOCALE[langKey] || LANG_TO_LOCALE.th;
  const speechText = formatSpeechText(text, langKey);

  const doSpeak = () => {
    const voices = synth.getVoices();
    const voice = pickVoice(voices, locale, langKey);
    const utterance = new SpeechSynthesisUtterance(speechText);

    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang || locale;
    utterance.rate = langKey === "ms" ? 0.88 : 0.92;
    utterance.pitch = 1;

    synth.cancel();
    synth.resume();
    synth.speak(utterance);
  };

  const voices = synth.getVoices();
  if (voices.length) {
    doSpeak();
    return;
  }

  let spoken = false;
  const speakOnce = () => {
    if (spoken) return;
    spoken = true;
    doSpeak();
  };

  const handleVoicesChanged = () => {
    synth.removeEventListener("voiceschanged", handleVoicesChanged);
    speakOnce();
  };

  synth.addEventListener("voiceschanged", handleVoicesChanged);
  setTimeout(() => {
    synth.removeEventListener("voiceschanged", handleVoicesChanged);
    speakOnce();
  }, 700);
}

const UI_COPY = {
  th: {
    listenAll: "ฟังทั้งหมด",
    listenOne: "เล่นเสียง",
    back: "ย้อนกลับ",
    next: "ต่อไป",
    languages: {
      th: "ไทย",
      en: "อังกฤษ",
      ms: "มลายู",
    },
  },
  en: {
    listenAll: "Listen all",
    listenOne: "Play audio",
    back: "Back",
    next: "Next",
    languages: {
      th: "Thai",
      en: "English",
      ms: "Malay",
    },
  },
  ms: {
    listenAll: "Dengar semua",
    listenOne: "Main audio",
    back: "Kembali",
    next: "Seterusnya",
    languages: {
      th: "Thai",
      en: "English",
      ms: "Melayu",
    },
  },
};

const SCENE_ITEMS = [
  {
    key: "hawk",
    role: "consumer",
    img: "/images/p5/y.png",
    label: {
      th: "เหยี่ยว / ผู้บริโภค",
      en: "Hawk / Consumer",
      ms: "Helang / Pengguna",
    },
    containerClass: "top-[7%] left-[14%]",
    imageClass: "w-28 sm:w-32 lg:w-36",
    transformClass: "-rotate-6",
    badgeWidthClass: "max-w-[7.4rem] lg:max-w-[8.2rem]",
    depthClass: "z-40",
  },
  {
    key: "bird",
    role: "consumer",
    img: "/images/p5/nog.png",
    label: {
      th: "นก / ผู้บริโภค",
      en: "Bird / Consumer",
      ms: "Burung / Pengguna",
    },
    containerClass: "top-[20%] right-[7%]",
    labelRowClassByLang: {
      en: "-translate-x-3 sm:-translate-x-4",
      ms: "-translate-x-5 sm:-translate-x-7",
    },
    imageClass: "w-[4.4rem] sm:w-[5.2rem] lg:w-24",
    badgeWidthClass: "max-w-[6.2rem] lg:max-w-[7rem]",
    depthClass: "z-40",
  },
  {
    key: "rice",
    role: "producer",
    img: "/images/p5/kaw.png",
    label: {
      th: "ต้นข้าว / ผู้ผลิต",
      en: "Rice Plant / Producer",
      ms: "Pokok Padi / Pengeluar",
    },
    containerClass: "top-[33%] left-[2%]",
    labelRowClassByLang: {
      en: "translate-x-4 sm:translate-x-6",
      ms: "translate-x-6 sm:translate-x-8",
    },
    imageClass: "w-28 sm:w-32 lg:w-36",
    badgeWidthClass: "max-w-[7.8rem] lg:max-w-[8.8rem]",
    depthClass: "z-30",
  },
  {
    key: "worm",
    role: "consumer",
    img: "/images/p5/non.png",
    label: {
      th: "หนอน / ผู้บริโภค",
      en: "Caterpillar / Consumer",
      ms: "Ulat / Pengguna",
    },
    containerClass: "top-[45%] left-[23%]",
    imageClass: "w-[4.6rem] sm:w-[5.4rem] lg:w-24",
    transformClass: "rotate-6",
    badgeWidthClass: "max-w-[7rem] lg:max-w-[7.6rem]",
    depthClass: "z-30",
  },
  {
    key: "rat",
    role: "consumer",
    img: "/images/p5/n.png",
    label: {
      th: "หนูนา / ผู้บริโภค",
      en: "Field Rat / Consumer",
      ms: "Tikus Sawah / Pengguna",
    },
    containerClass: "top-[29%] left-[47%]",
    imageClass: "w-20 sm:w-24 lg:w-28",
    badgeWidthClass: "max-w-[7rem] lg:max-w-[8rem]",
    depthClass: "z-30",
  },
  {
    key: "snake",
    role: "consumer",
    img: "/images/p5/snack.png",
    label: {
      th: "งู / ผู้บริโภค",
      en: "Snake / Consumer",
      ms: "Ular / Pengguna",
    },
    containerClass: "top-[50%] left-[38%]",
    imageClass: "w-28 sm:w-32 lg:w-36",
    transformClass: "-rotate-2",
    badgeWidthClass: "max-w-[6.4rem] lg:max-w-[7rem]",
    depthClass: "z-30",
  },
  {
    key: "grass",
    role: "producer",
    img: "/images/p5/ya.png",
    label: {
      th: "หญ้า / ผู้ผลิต",
      en: "Grass / Producer",
      ms: "Rumput / Pengeluar",
    },
    containerClass: "top-[81%] left-[28%]",
    imageClass: "w-[5.4rem] sm:w-24 lg:w-28",
    badgeWidthClass: "max-w-[6rem] lg:max-w-[6.8rem]",
    depthClass: "z-20",
  },
  {
    key: "grasshopper",
    role: "consumer",
    img: "/images/p5/tag.png",
    label: {
      th: "ตั๊กแตน / ผู้บริโภค",
      en: "Grasshopper / Consumer",
      ms: "Belalang / Pengguna",
    },
    containerClass: "top-[42%] left-[67%]",
    labelRowClassByLang: {
      en: "-translate-x-3 sm:-translate-x-4",
      ms: "-translate-x-5 sm:-translate-x-7",
    },
    imageClass: "w-[5rem] sm:w-[5.8rem] lg:w-[6.6rem]",
    transformClass: "-rotate-6",
    badgeWidthClass: "max-w-[7rem] lg:max-w-[7.8rem]",
    depthClass: "z-30",
  },
  {
    key: "frog",
    role: "consumer",
    img: "/images/p5/gop.png",
    label: {
      th: "กบ / ผู้บริโภค",
      en: "Frog / Consumer",
      ms: "Katak / Pengguna",
    },
    containerClass: "top-[79%] left-[60%]",
    labelBlockClass: "-translate-y-1 sm:-translate-y-2",
    labelRowClassByLang: {
      en: "-translate-x-2 sm:-translate-x-3",
      ms: "-translate-x-3 sm:-translate-x-5",
    },
    imageClass: "w-24 sm:w-28 lg:w-32",
    transformClass: "-rotate-6",
    badgeWidthClass: "max-w-[6rem] lg:max-w-[6.8rem]",
    depthClass: "z-40",
  },
  {
    key: "larva",
    role: "consumer",
    img: "/images/p5/lunam.png",
    label: {
      th: "ลูกน้ำ / ผู้บริโภค",
      en: "Larva / Consumer",
      ms: "Jentik-jentik / Pengguna",
    },
    containerClass: "top-[64%] left-[66%]",
    labelRowClassByLang: {
      en: "-translate-x-5 sm:-translate-x-7",
      ms: "-translate-x-9 sm:-translate-x-12",
    },
    imageClass: "w-11 sm:w-12 lg:w-14",
    transformClass: "-rotate-12",
    badgeWidthClass: "max-w-[6.8rem] lg:max-w-[7.6rem]",
    depthClass: "z-20",
  },
  {
    key: "water-plant",
    role: "producer",
    img: "/images/p5/lunamm.png",
    label: {
      th: "พืชน้ำ / ผู้ผลิต",
      en: "Water Plant / Producer",
      ms: "Pokok Air / Pengeluar",
    },
    containerClass: "top-[74%] left-[46%]",
    labelBlockClass: "-translate-y-1 sm:-translate-y-2",
    labelRowClassByLang: {
      en: "-translate-x-2 sm:-translate-x-4",
      ms: "-translate-x-3 sm:-translate-x-5",
    },
    imageClass: "w-24 sm:w-28 lg:w-32",
    badgeWidthClass: "max-w-[7rem] lg:max-w-[8rem]",
    depthClass: "z-20",
  },
  {
    key: "fish",
    role: "consumer",
    img: "/images/p5/pla.png",
    label: {
      th: "ปลา / ผู้บริโภค",
      en: "Fish / Consumer",
      ms: "Ikan / Pengguna",
    },
    containerClass: "top-[53%] right-[5%]",
    labelBlockClass: "-translate-y-2 sm:-translate-y-3",
    labelRowClassByLang: {
      en: "-translate-x-3 sm:-translate-x-5",
      ms: "-translate-x-5 sm:-translate-x-7",
    },
    imageClass: "w-24 sm:w-28 lg:w-32",
    transformClass: "-scale-x-100",
    badgeWidthClass: "max-w-[6rem] lg:max-w-[6.8rem]",
    depthClass: "z-20",
  },
];

function SceneItem({
  item,
  activeLang,
  onSpeak,
  voiceLabel,
}) {
  const label = item.label[activeLang] ?? item.label.th;
  const labelRowClass = item.labelRowClassByLang?.[activeLang] ?? "";
  const labelBlockClass = item.labelBlockClass ?? "";
  const badgeTone =
    item.role === "producer"
      ? "border-emerald-200/90 bg-white/78"
      : "border-slate-200/90 bg-white/82";

  return (
    <div
      className={`absolute ${item.containerClass} ${item.depthClass ?? "z-20"} flex flex-col items-center gap-1 select-none`}
    >
      <img
        src={item.img}
        alt={label}
        draggable="false"
        className={`${item.imageClass} ${item.transformClass ?? ""} ${item.role === "consumer" ? "scale-[1.22] sm:scale-[1.26]" : "scale-[1.1] sm:scale-[1.14]"} select-none object-contain drop-shadow-[0_10px_16px_rgba(15,23,42,0.18)]`}
      />

      <div className={`flex items-center justify-center gap-1.5 ${labelBlockClass} ${labelRowClass}`}>
        <div
          className={`w-max max-w-[calc(100vw-4.5rem)] rounded-[15px] border px-2 py-0.5 text-center shadow-[0_8px_20px_rgba(148,163,184,0.14)] backdrop-blur-sm sm:max-w-none ${badgeTone}`}
        >
          <span className="block text-[11px] font-medium leading-tight text-slate-700 sm:whitespace-nowrap sm:text-[13px] lg:text-[15px]">
            {label}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onSpeak(label)}
          aria-label={`${voiceLabel}: ${label}`}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/80 bg-[#eaf3ff]/95 text-xs text-[#2563eb] shadow-[0_6px_14px_rgba(59,130,246,0.18)] transition hover:bg-[#dcecff] sm:h-8 sm:w-8 sm:text-sm"
        >
          {"\uD83D\uDD0A"}
        </button>
      </div>
    </div>
  );
}

export default function P5FoodChainScene() {
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("th");

  const ui = UI_COPY[activeLang] ?? UI_COPY.th;
  const sceneHintText =
    activeLang === "en"
      ? "Observe the living things in the food chain."
      : activeLang === "ms"
        ? "Perhatikan kedudukan hidupan dalam rantaian makanan."
        : "สังเกตตำแหน่งของสิ่งมีชีวิตในห่วงโซ่อาหาร";

  const speakText = (text) => {
    try {
      speakWithBestVoice(text, activeLang);
    } catch {
      // ignore speech issues on unsupported browsers
    }
  };

  const speakAll = () => {
    speakText(SCENE_ITEMS.map((item) => item.label[activeLang] ?? item.label.th).join(". "));
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[url('/images/p5/fos.png')] bg-cover bg-center bg-no-repeat font-['Prompt',sans-serif] text-slate-900">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.08)_58%,rgba(255,255,255,0.03))]" />

      <div className="absolute left-1/2 top-3 z-50 max-w-[min(88vw,30rem)] -translate-x-1/2 rounded-full bg-white/78 px-6 py-3 text-center text-xs font-bold text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.14)] backdrop-blur-sm sm:px-8 sm:py-4 sm:text-lg">
        {sceneHintText}
      </div>

      <div className="fixed bottom-[18px] left-[18px] z-[7]">
        <FoodChainLanguageSwitcher
          size="materials"
          value={activeLang}
          onChange={setActiveLang}
          labels={UI_COPY.th.languages}
        />
      </div>

      {/* <button
        type="button"
        onClick={speakAll}
        className="absolute right-3 top-3 z-50 inline-flex items-center gap-2.5 rounded-full bg-white/78 px-4 py-2.5 text-sm font-bold text-[#2563eb] shadow-[0_10px_24px_rgba(59,130,246,0.14)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white sm:right-4 sm:top-4 sm:px-5 sm:py-3 sm:text-base"
        aria-label={ui.listenAll}
      >
        <span>{"\uD83D\uDD0A"}</span>
        <span>{ui.listenAll}</span>
      </button> */}

      {SCENE_ITEMS.map((item) => (
        <SceneItem
          key={item.key}
          item={item}
          activeLang={activeLang}
          onSpeak={speakText}
          voiceLabel={ui.listenOne}
        />
      ))}

      <div className="fixed bottom-[18px] right-[18px] z-[7] max-[720px]:bottom-[12px] max-[720px]:right-[12px]">
        <FoodChainNavButtons
          size="materials"
          backLabel={ui.back}
          nextLabel={ui.next}
          nextArrow={"\u00BB"}
          onBack={() => navigate("/p5/life/foodchain/vocab")}
          onNext={() => navigate("/p5/life/foodchain/materials")}
        />
      </div>
    </div>
  );
}


