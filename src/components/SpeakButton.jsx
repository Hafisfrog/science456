const BUTTONS = [
  {
    key: "th",
    label: "🇹🇭 Thai",
    lang: "th-TH",
    textProp: "th",
    className:
      "bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:bg-blue-50 disabled:text-blue-300",
  },
  {
    key: "en",
    label: "🇬🇧 English",
    lang: "en-US",
    textProp: "en",
    className:
      "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 disabled:bg-emerald-50 disabled:text-emerald-300",
  },
  {
    key: "ms",
    label: "🇲🇾 Malay",
    lang: "ms-MY",
    textProp: "ms",
    className:
      "bg-amber-100 text-amber-800 hover:bg-amber-200 disabled:bg-amber-50 disabled:text-amber-300",
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

    // Chrome on some machines has no ms voice but has Indonesian voice.
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

export default function SpeakButton({
  th,
  en,
  ms,
  activeLang = "th",
  onLanguageChange,
}) {
  const textByLang = { th, en, ms };

  const handleClick = (button) => {
    const text = textByLang[button.textProp];
    onLanguageChange?.(button.key);
    speakWithBestVoice(text, button.lang, button.key);
  };

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {BUTTONS.map((button) => {
        const text = textByLang[button.textProp];
        const isActive = activeLang === button.key;

        return (
          <button
            key={button.key}
            type="button"
            onClick={() => handleClick(button)}
            disabled={!text}
            aria-pressed={isActive}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${button.className} ${
              isActive ? "ring-2 ring-offset-2 ring-slate-500" : ""
            }`}
          >
            {button.label}
          </button>
        );
      })}
    </div>
  );
}
