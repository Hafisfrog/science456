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
    next: "ไปต่อ",
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

const LANGUAGE_LABELS = {
  th: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  en: { th: "Thai", en: "English", ms: "Malay" },
  ms: { th: "Thai", en: "English", ms: "Melayu" },
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

const materialImageClass = "w-24 sm:w-28 md:w-32 lg:w-36 mx-auto drop-shadow-xl";

export default function P5FoodChainMaterials() {
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("th");

  const t = PAGE_COPY[activeLang];
  const getName = (item) => item.name[activeLang] || item.name.th;

  const speakItem = (item) => {
    speakWithBestVoice(getName(item), activeLang);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[url('/images/p5/back.png')] bg-cover bg-center bg-no-repeat font-['Prompt',sans-serif]">
      <div className="absolute inset-0 bg-white/5" />

      <div className="absolute left-1/2 top-6 -translate-x-1/2">
        <div className="rounded bg-[#b7f0a4] px-8 py-3 text-xl font-bold text-slate-900 md:px-12 md:text-2xl">
          {t.title}
        </div>
      </div>

      <div className="absolute left-12 top-24">
        <div className="rounded bg-[#b7f0a4] px-6 py-2 text-lg font-semibold text-slate-900 md:text-xl">
          {t.materials}
        </div>
      </div>

      <div className="absolute left-1/2 top-[28%] flex w-[92%] -translate-x-1/2 items-end justify-between gap-3 md:gap-4">
        {topMaterials.map((item) => (
          <div key={item.key} className="text-center">
            <img
              src={item.img}
              alt={getName(item)}
              className={materialImageClass}
            />
            <div className="mt-2 flex items-center justify-center gap-2 text-base font-semibold text-slate-900 md:text-lg">
              <span>{getName(item)}</span>
              <button
                type="button"
                onClick={() => speakItem(item)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#dcecff] text-sm text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-[#cfe4ff]"
                aria-label={`Speak ${getName(item)}`}
              >
                {"\uD83D\uDD0A"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-[20%] left-1/2 flex w-[92%] -translate-x-1/2 items-end justify-between gap-3 md:gap-4">
        {bottomMaterials.map((item) => (
          <div key={item.key} className="text-center">
            <img
              src={item.img}
              alt={getName(item)}
              className={materialImageClass}
            />
            <div className="mt-2 flex items-center justify-center gap-2 text-base font-semibold text-slate-900 md:text-lg">
              <span>{getName(item)}</span>
              <button
                type="button"
                onClick={() => speakItem(item)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#dcecff] text-sm text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-[#cfe4ff]"
                aria-label={`Speak ${getName(item)}`}
              >
                {"\uD83D\uDD0A"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-8 z-20">
        <FoodChainLanguageSwitcher
          value={activeLang}
          onChange={setActiveLang}
          labels={LANGUAGE_LABELS[activeLang] ?? LANGUAGE_LABELS.th}
        />
      </div>
      <div className="absolute bottom-8 right-10">
        <FoodChainNavButtons
          backLabel={t.back}
          nextLabel={t.next}
          onBack={() => navigate("/p5/life/foodchain/scene")}
          onNext={() => navigate("/p5/life/foodchain/steps")}
        />
      </div>
    </div>
  );
}

