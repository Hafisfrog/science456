import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const VOCAB = [
  {
    th: "แสง",
    ms: "Cahaya",
    en: "Light",
    audio: {
      th: "/audio/p4/light/basic_light_th.mp3",
      ms: "/audio/p4/light/basic_light_ms.mp3",
      en: "/audio/p4/light/basic_light_en.mp3",
    },
  },
  {
    th: "แหล่งกำเนิดแสง",
    ms: "Sumber Cahaya",
    en: "Light Source",
    audio: {
      th: "/audio/p4/light/basic_source_th.mp3",
      ms: "/audio/p4/light/basic_source_ms.mp3",
      en: "/audio/p4/light/basic_source_en.mp3",
    },
  },
  {
    th: "เคลื่อนที่ผ่านอากาศ",
    ms: "Bergerak Melalui Udara",
    en: "Move Through Air",
    audio: {
      th: "/audio/p4/light/basic_move_th.mp3",
      ms: "/audio/p4/light/basic_move_ms.mp3",
      en: "/audio/p4/light/basic_move_en.mp3",
    },
  },
  {
    th: "กั้น",
    ms: "Menghalang",
    en: "Block",
    audio: {
      th: "/audio/p4/light/basic_block_th.mp3",
      ms: "/audio/p4/light/basic_block_ms.mp3",
      en: "/audio/p4/light/basic_block_en.mp3",
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

export default function P4LightBasicWords() {
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
    <div className="min-h-screen bg-gradient-to-b from-[#eef7f6] via-[#e7f2f3] to-[#dcecff] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-600 sm:text-3xl">
            คำศัพท์วิทยาศาสตร์น่ารู้
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">คำศัพท์พื้นฐานเกี่ยวกับแสง</p>
        </header>

        <div className="overflow-hidden rounded-[2rem] border border-[#c7d7d1] bg-[#dfeee8]/80 shadow-lg backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed border-separate border-spacing-0">
              <thead>
                <tr className="bg-[#bfcfc6] text-slate-700">
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
                    className="[&:not(:last-child)>td]:border-b [&:not(:last-child)>td]:border-[#d5e1dc]"
                  >
                    <td className="bg-[#c8d1de] px-4 py-4 text-sm font-medium text-slate-700 sm:py-5 sm:text-lg">
                      {row.th}
                    </td>
                    <td className="bg-[#e8dfc3] px-4 py-4 text-sm font-medium text-slate-700 sm:py-5 sm:text-lg">
                      {row.ms}
                    </td>
                    <td className="bg-[#dec4d7] px-4 py-4 text-sm font-medium text-slate-700 sm:py-5 sm:text-lg">
                      {row.en}
                    </td>
                    <td className="bg-[#dce9e3] px-4 py-5">
                      <div className="flex items-center justify-center gap-3 sm:gap-4">
                        <button
                          type="button"
                          className="h-11 w-11 rounded-2xl bg-[#b9c9e0] text-base font-bold text-slate-800 shadow-[0_6px_12px_rgba(15,23,42,0.1)] transition hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-blue-300 sm:h-12 sm:w-12 sm:text-lg"
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
                          className="h-11 w-11 rounded-2xl bg-[#e8cf62] text-base font-bold text-slate-800 shadow-[0_6px_12px_rgba(15,23,42,0.1)] transition hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-amber-300 sm:h-12 sm:w-12 sm:text-lg"
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
                          className="h-11 w-11 rounded-2xl bg-[#e3b8d6] text-base font-bold text-slate-800 shadow-[0_6px_12px_rgba(15,23,42,0.1)] transition hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-pink-300 sm:h-12 sm:w-12 sm:text-lg"
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

        <div className="mt-7 flex justify-end">
          <div className="flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              className="rounded-full border border-sky-300 bg-white px-5 py-2.5 text-sm font-medium text-sky-600 transition hover:bg-sky-50 hover:shadow"
              onClick={() => navigate("/p4/light/vocab")}
            >
              ย้อนกลับ
            </button>

            <button
              type="button"
              className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-600 hover:shadow"
              onClick={() => navigate("/p4/light/situation")}
            >
              ไปต่อ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
