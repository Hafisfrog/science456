import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

function speakWithBestVoice(text, langKey) {
  if (!isSpeechSupported() || !text) return;

  const synth = window.speechSynthesis;
  const locale = LANG_TO_LOCALE[langKey] || "th-TH";

  const doSpeak = () => {
    const voices = synth.getVoices();
    const voice = pickVoice(voices, locale, langKey);
    const utterance = new SpeechSynthesisUtterance(text);

    if (voice) utterance.voice = voice;
    utterance.lang = locale;
    utterance.rate = 0.9;
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

const PAGE_COPY = {
  th: {
    title: "การทดลองที่ 5 เรื่อง ห่วงโซ่อาหาร",
    materials: "วัสดุอุปกรณ์",
    back: "ย้อนกลับ",
    next: "ต่อไป",
  },
  en: {
    title: "Experiment 5: Food Chain",
    materials: "Materials",
    back: "Back",
    next: "Next",
  },
  ms: {
    title: "Eksperimen 5: Rantaian Makanan",
    materials: "Bahan",
    back: "Kembali",
    next: "Seterusnya",
  },
};

const topMaterials = [
  {
    key: "rice",
    name: { th: "ข้าว", en: "Rice Plant", ms: "Padi" },
    img: "/images/p5/kaw.png",
    delay: "0s",
    duration: "3.2s",
  },
  {
    key: "water-plant",
    name: { th: "พืชน้ำ", en: "Aquatic Plant", ms: "Tumbuhan Akuatik" },
    img: "/images/p5/lunamm.png",
    delay: "0.2s",
    duration: "3.5s",
  },
  {
    key: "grasshopper",
    name: { th: "ตั๊กแตน", en: "Grasshopper", ms: "Belalang" },
    img: "/images/p5/tag.png",
    delay: "0.4s",
    duration: "3.1s",
  },
  {
    key: "field-rat",
    name: { th: "หนูนา", en: "Field Rat", ms: "Tikus Sawah" },
    img: "/images/p5/n.png",
    delay: "0.6s",
    duration: "3.6s",
  },
  {
    key: "worm",
    name: { th: "หนอน", en: "Caterpillar", ms: "Ulat" },
    img: "/images/p5/non.png",
    delay: "0.8s",
    duration: "3.3s",
  },
  {
    key: "grass",
    name: { th: "หญ้า", en: "Grass", ms: "Rumput" },
    img: "/images/p5/ya.png",
    delay: "1s",
    duration: "3.7s",
  },
];

const bottomMaterials = [
  {
    key: "frog",
    name: { th: "กบ", en: "Frog", ms: "Katak" },
    img: "/images/p5/gop.png",
    delay: "0.15s",
    duration: "3.4s",
  },
  {
    key: "small-fish",
    name: { th: "ปลาเล็ก", en: "Small Fish", ms: "Ikan Kecil" },
    img: "/images/p5/pla.png",
    delay: "0.35s",
    duration: "3.2s",
  },
  {
    key: "snake",
    name: { th: "งู", en: "Snake", ms: "Ular" },
    img: "/images/p5/snack.png",
    delay: "0.55s",
    duration: "3.8s",
  },
  {
    key: "hawk",
    name: { th: "เหยี่ยว", en: "Hawk", ms: "Helang" },
    img: "/images/p5/y.png",
    delay: "0.75s",
    duration: "3.3s",
  },
  {
    key: "bird",
    name: { th: "นก", en: "Bird", ms: "Burung" },
    img: "/images/p5/nog.png",
    delay: "0.95s",
    duration: "3.6s",
  },
  {
    key: "larva",
    name: { th: "ลูกน้ำ", en: "Larva", ms: "Jentik-jentik" },
    img: "/images/p5/lunam.png",
    delay: "1.15s",
    duration: "3.1s",
  },
];

const materialImageClass = "w-56 sm:w-64 md:w-80 lg:w-[22rem] mx-auto drop-shadow-xl";

const getLivingImageStyle = (delay, duration) => ({
  animation: `p5Living ${duration} ease-in-out ${delay} infinite`,
});

export default function P5FoodChainMaterials() {
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("th");

  const t = PAGE_COPY[activeLang];
  const getName = (item) => item.name[activeLang] || item.name.th;
  const handleSpeak = () => {
    const names = [...topMaterials, ...bottomMaterials]
      .map((item) => getName(item))
      .join(", ");
    const speechText = `${t.title}. ${t.materials}. ${names}`;
    speakWithBestVoice(speechText, activeLang);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden font-sans">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-green-200" />
      <div className="absolute -translate-y-10 translate-x-10 rounded-full bg-yellow-400 h-40 w-40 right-0 top-0" />

      <div className="absolute left-1/2 top-8 -translate-x-1/2">
        <div className="rounded bg-green-300 px-10 py-4 text-2xl font-bold md:px-14 md:text-3xl">
          {t.title}
        </div>
      </div>

      <div className="absolute left-20 top-24">
        <div className="rounded bg-green-300 px-7 py-3 text-xl font-semibold md:text-2xl">
          {t.materials}
        </div>
      </div>

      <div className="absolute left-1/2 top-[27%] flex -translate-x-1/2 items-end gap-2 md:gap-4">
        {topMaterials.map((item) => (
          <div key={item.key} className="text-center">
            <img
              src={item.img}
              alt={getName(item)}
              className={materialImageClass}
              style={getLivingImageStyle(item.delay, item.duration)}
            />
            <div className="mt-2 text-lg md:text-xl">{getName(item)}</div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-[18%] left-1/2 flex -translate-x-1/2 items-end gap-2 md:gap-4">
        {bottomMaterials.map((item) => (
          <div key={item.key} className="text-center">
            <img
              src={item.img}
              alt={getName(item)}
              className={materialImageClass}
              style={getLivingImageStyle(item.delay, item.duration)}
            />
            <div className="mt-2 text-lg md:text-xl">{getName(item)}</div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-8 z-20 flex items-center gap-1.5 rounded-full bg-white/70 p-1.5 shadow-lg backdrop-blur">
        {[
          { key: "th", label: "TH" },
          { key: "en", label: "EN" },
          { key: "ms", label: "MY" },
        ].map((lang) => (
          <button
            key={lang.key}
            type="button"
            onClick={() => setActiveLang(lang.key)}
            className={`rounded-full px-4 py-2 text-lg font-bold shadow-md transition ${
              activeLang === lang.key
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700 hover:bg-blue-50"
            }`}
          >
            {lang.label}
          </button>
        ))}
        <button
          type="button"
          onClick={handleSpeak}
          className="rounded-full bg-blue-100 px-3 py-2 text-lg font-bold text-blue-700 shadow-md transition hover:bg-blue-200"
          aria-label="speak-materials"
        >
          🔊
        </button>
      </div>

      <div className="absolute bottom-8 right-10 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/p5/life/foodchain/scene")}
          className="rounded-full bg-blue-500 px-5 py-2 text-base text-white shadow-md hover:bg-blue-600"
        >
          ← {t.back}
        </button>

        <button
          type="button"
          onClick={() => navigate("/p5/life/foodchain/steps")}
          className="rounded-full bg-red-500 px-5 py-2 text-base text-white shadow-md hover:bg-red-600"
        >
          {t.next} →
        </button>
      </div>

      <style>{`
        @keyframes p5Living {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-6px) rotate(1deg) scale(1.02);
          }
          50% {
            transform: translateY(-10px) rotate(0deg) scale(1.04);
          }
          75% {
            transform: translateY(-4px) rotate(-1deg) scale(1.02);
          }
        }
      `}</style>
    </div>
  );
}
