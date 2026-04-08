import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FoodChainNavButtons } from "./FoodChainControls";

const VOCAB = [
  {
    th: "การพรางตัว",
    ms: "Penyamaran",
    en: "Camouflage",
    audio: {
      th: "/audio/p5/foodchain/camouflage_th.mp3",
      ms: "/audio/p5/foodchain/camouflage_ms.mp3",
      en: "/audio/p5/foodchain/camouflage_en.mp3",
    },
  },
  {
    th: "พืช",
    ms: "Tumbuhan",
    en: "Plant",
    audio: {
      th: "/audio/p5/foodchain/plant_th.mp3",
      ms: "/audio/p5/foodchain/plant_ms.mp3",
      en: "/audio/p5/foodchain/plant_en.mp3",
    },
  },
  {
    th: "สัตว์",
    ms: "Haiwan",
    en: "Animal",
    audio: {
      th: "/audio/p5/foodchain/animal_th.mp3",
      ms: "/audio/p5/foodchain/animal_ms.mp3",
      en: "/audio/p5/foodchain/animal_en.mp3",
    },
  },
  {
    th: "กลุ่มของสิ่งมีชีวิต",
    ms: "Kumpulan Organisma",
    en: "Group of Organisms",
    audio: {
      th: "/audio/p5/foodchain/group_th.mp3",
      ms: "/audio/p5/foodchain/group_ms.mp3",
      en: "/audio/p5/foodchain/group_en.mp3",
    },
  },
  {
    th: "แหล่งที่อยู่อาศัย",
    ms: "Habitat",
    en: "Habitat",
    audio: {
      th: "/audio/p5/foodchain/habitat_th.mp3",
      ms: "/audio/p5/foodchain/habitat_ms.mp3",
      en: "/audio/p5/foodchain/habitat_en.mp3",
    },
  },
  {
    th: "โซ่อาหาร",
    ms: "Rantai Makanan",
    en: "Food Chain",
    audio: {
      th: "/audio/p5/foodchain/foodchain_th.mp3",
      ms: "/audio/p5/foodchain/foodchain_ms.mp3",
      en: "/audio/p5/foodchain/foodchain_en.mp3",
    },
  },
  {
    th: "การดำรงชีวิต",
    ms: "Kelangsungan Hidup",
    en: "Survival",
    audio: {
      th: "/audio/p5/foodchain/survival_th.mp3",
      ms: "/audio/p5/foodchain/survival_ms.mp3",
      en: "/audio/p5/foodchain/survival_en.mp3",
    },
  },
  {
    th: "การถ่ายทอดพลังงาน",
    ms: "Pemindahan Tenaga",
    en: "Energy Transfer",
    audio: {
      th: "/audio/p5/foodchain/energy_th.mp3",
      ms: "/audio/p5/foodchain/energy_ms.mp3",
      en: "/audio/p5/foodchain/energy_en.mp3",
    },
  },
  {
    th: "ผู้ผลิต",
    ms: "Pengeluar",
    en: "Producer",
    audio: {
      th: "/audio/p5/foodchain/producer_th.mp3",
      ms: "/audio/p5/foodchain/producer_ms.mp3",
      en: "/audio/p5/foodchain/producer_en.mp3",
    },
  },
  {
    th: "ผู้บริโภค",
    ms: "Pengguna",
    en: "Consumer",
    audio: {
      th: "/audio/p5/foodchain/consumer_th.mp3",
      ms: "/audio/p5/foodchain/consumer_ms.mp3",
      en: "/audio/p5/foodchain/consumer_en.mp3",
    },
  },
];

const MALAY_VOICE_NAME_RE = /(malay|melayu|bahasa malaysia|bahasa melayu|malaysia)/i;

const isSpeechSupported = () =>
  typeof window !== "undefined" &&
  typeof SpeechSynthesisUtterance !== "undefined" &&
  !!window.speechSynthesis;

const getVoiceTag = (voice) =>
  `${voice?.name ?? ""} ${voice?.voiceURI ?? ""}`.toLowerCase();

function pickVoice(voices, locale, langKey) {
  const lowerLocale = locale.toLowerCase();
  const langPrefix = lowerLocale.split("-")[0];

  const exactMatch = voices.find((voice) => voice.lang?.toLowerCase() === lowerLocale);
  if (exactMatch) return exactMatch;

  if (langKey === "ms") {
    const msLangMatch = voices.find((voice) => voice.lang?.toLowerCase().startsWith("ms"));
    if (msLangMatch) return msLangMatch;

    const malayNameMatch = voices.find((voice) => MALAY_VOICE_NAME_RE.test(getVoiceTag(voice)));
    if (malayNameMatch) return malayNameMatch;

    const indonesiaFallback = voices.find((voice) => voice.lang?.toLowerCase().startsWith("id"));
    if (indonesiaFallback) return indonesiaFallback;

    return null;
  }

  return (
    voices.find((voice) => voice.lang?.toLowerCase().startsWith(langPrefix)) ||
    voices[0] ||
    null
  );
}

function speakWithBestVoice(text, locale, langKey) {
  if (!isSpeechSupported() || !text) return;

  const synth = window.speechSynthesis;
  const targetLocale = locale || "th-TH";

  const doSpeak = () => {
    const voices = synth.getVoices();
    const voice = pickVoice(voices, targetLocale, langKey);
    const utterance = new SpeechSynthesisUtterance(text);

    if (voice) utterance.voice = voice;
    utterance.lang = targetLocale;
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

export default function P5FoodChainVocab() {
  const navigate = useNavigate();
  const currentAudioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
      }
      if (isSpeechSupported()) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const playSound = ({ src, text, lang, langKey }) => {
    if (isSpeechSupported()) {
      window.speechSynthesis.cancel();
    }

    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }

    if (!src) {
      speakWithBestVoice(text, lang, langKey);
      return;
    }

    const audio = new Audio(src);
    currentAudioRef.current = audio;
    audio.currentTime = 0;

    let fallbackCalled = false;
    const onFallback = () => {
      if (fallbackCalled) return;
      fallbackCalled = true;
      speakWithBestVoice(text, lang, langKey);
    };

    audio.addEventListener("error", onFallback, { once: true });
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(onFallback);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef6ff] via-[#e9f2fb] to-[#dbe9f7] px-4 py-8 pb-28 sm:px-6 sm:pb-32">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-600 sm:text-3xl">
            คำศัพท์วิทยาศาสตร์น่ารู้
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            คำศัพท์พื้นฐานเรื่องห่วงโซ่อาหาร
          </p>
        </header>

        <div className="overflow-hidden rounded-[2rem] border border-[#c7d6e6] bg-[#e9f2fb]/80 shadow-lg backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed border-separate border-spacing-0 [&_thead_th:nth-child(1)]:bg-[#b7cfea] [&_thead_th:nth-child(2)]:bg-[#f3cf73] [&_thead_th:nth-child(3)]:bg-[#c486b5] [&_thead_th:nth-child(4)]:bg-[#d6f8e4] [&_tbody_td:nth-child(1)]:bg-[#eaf3ff] [&_tbody_td:nth-child(2)]:bg-[#fdf2d6] [&_tbody_td:nth-child(3)]:bg-[#f5d7e8] [&_tbody_td:nth-child(4)]:bg-[#e8fbef]">
              <thead>
                <tr className="text-slate-800">
                  <th className="px-4 py-3 text-center text-base font-bold sm:text-xl">ภาษาไทย</th>
                  <th className="px-4 py-3 text-center text-base font-bold sm:text-xl">ภาษามลายู</th>
                  <th className="px-4 py-3 text-center text-base font-bold sm:text-xl">ภาษาอังกฤษ</th>
                  <th className="px-4 py-3 text-center text-base font-bold sm:text-xl">ฟังเสียง</th>
                </tr>
              </thead>

              <tbody>
                {VOCAB.map((row) => (
                  <tr
                    key={`${row.th}-${row.en}`}
                    className="[&:not(:last-child)>td]:border-b [&:not(:last-child)>td]:border-[#d8e2ee]"
                  >
                    <td className="bg-[#edf4ff] px-4 py-4 text-sm font-medium text-slate-700 sm:py-5 sm:text-lg">
                      {row.th}
                    </td>
                    <td className="bg-[#edf4ff] px-4 py-4 text-sm font-medium text-slate-700 sm:py-5 sm:text-lg">
                      {row.ms}
                    </td>
                    <td className="bg-[#edf4ff] px-4 py-4 text-sm font-medium text-slate-700 sm:py-5 sm:text-lg">
                      {row.en}
                    </td>
                    <td className="bg-[#edf4ff] px-4 py-5">
                      <div className="flex items-center justify-center gap-3 sm:gap-4">
                        <button
                          type="button"
                          className="h-11 w-11 rounded-2xl bg-[#dcecff] text-base font-bold text-slate-800 shadow-[0_6px_12px_rgba(15,23,42,0.1)] transition hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-[#b7cfea] sm:h-12 sm:w-12 sm:text-lg"
                          onClick={() =>
                            playSound({
                              src: row.audio.th,
                              text: row.th,
                              lang: "th-TH",
                              langKey: "th",
                            })
                          }
                        >
                          TH
                        </button>
                        <button
                          type="button"
                          className="h-11 w-11 rounded-2xl bg-[#ffe08a] text-base font-bold text-slate-800 shadow-[0_6px_12px_rgba(15,23,42,0.1)] transition hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-[#f3cf73] sm:h-12 sm:w-12 sm:text-lg"
                          onClick={() =>
                            playSound({
                              src: row.audio.ms,
                              text: row.ms,
                              lang: "ms-MY",
                              langKey: "ms",
                            })
                          }
                        >
                          MY
                        </button>
                        <button
                          type="button"
                          className="h-11 w-11 rounded-2xl bg-[#f7c6e5] text-base font-bold text-slate-800 shadow-[0_6px_12px_rgba(15,23,42,0.1)] transition hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-[#c486b5] sm:h-12 sm:w-12 sm:text-lg"
                          onClick={() =>
                            playSound({
                              src: row.audio.en,
                              text: row.en,
                              lang: "en-US",
                              langKey: "en",
                            })
                          }
                        >
                          GB
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="fixed bottom-4 right-4 z-30 sm:bottom-6 sm:right-6">
          <FoodChainNavButtons
            backLabel="ย้อนกลับ"
            nextLabel="ไปต่อ"
            onBack={() => navigate("/p5/life/foodchain")}
            onNext={() => navigate("/p5/life/foodchain/scene")}
          />
        </div>
      </div>
    </div>
  );
}
