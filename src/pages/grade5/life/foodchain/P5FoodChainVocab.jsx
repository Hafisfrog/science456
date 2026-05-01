import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import "../../../grade4/gravity/exp2/P4GravityExp2Vocab.css";

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
    th: "ห่วงโซ่อาหาร",
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

  return voices.find((voice) => voice.lang?.toLowerCase().startsWith(langPrefix)) || voices[0] || null;
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
    <div className="vocab-page" style={{ position: "relative" }}>
      <HomeButton />

      <header className="vocab-header">
        <h1>คำศัพท์วิทยาศาสตร์น่ารู้</h1>
        <p>คำศัพท์พื้นฐานเรื่องห่วงโซ่อาหาร</p>
      </header>

      <div className="vocab-card">
        <table className="vocab-table">
          <thead>
            <tr>
              <th className="col-th">ภาษาไทย</th>
              <th className="col-ms">ภาษามลายู</th>
              <th className="col-en">ภาษาอังกฤษ</th>
              <th className="col-audio">ฟังเสียง</th>
            </tr>
          </thead>
          <tbody>
            {VOCAB.map((row) => (
              <tr key={`${row.th}-${row.en}`}>
                <td className="cell-th">{row.th}</td>
                <td className="cell-ms">{row.ms}</td>
                <td className="cell-en">{row.en}</td>
                <td className="cell-audio">
                  <button
                    className="audio-btn th"
                    type="button"
                    onClick={() => playSound({ src: row.audio.th, text: row.th, lang: "th-TH", langKey: "th" })}
                  >
                    TH
                  </button>
                  <button
                    className="audio-btn ms"
                    type="button"
                    onClick={() => playSound({ src: row.audio.ms, text: row.ms, lang: "ms-MY", langKey: "ms" })}
                  >
                    MY
                  </button>
                  <button
                    className="audio-btn en"
                    type="button"
                    onClick={() => playSound({ src: row.audio.en, text: row.en, lang: "en-US", langKey: "en" })}
                  >
                    EN
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="fixed bottom-[18px] right-[18px] z-[40] flex items-center gap-3 max-[720px]:bottom-[12px] max-[720px]:right-[12px] max-[720px]:gap-2">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[10px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          type="button"
          onClick={() => navigate("/p5/life/foodchain")}
        >
          « ย้อนกลับ
        </button>

        <button
          className="rounded-[18px] bg-[#08c95a] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(8,201,90,.24)] transition hover:-translate-y-0.5 hover:bg-[#07b351] hover:shadow-[0_28px_56px_rgba(8,201,90,.30)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[12px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          type="button"
          onClick={() => navigate("/p5/life/foodchain/scene")}
        >
          ต่อไป »
        </button>
      </div>
    </div>
  );
}
