import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const LANGUAGE_CONTENT = {
  th: {
    locale: "th-TH",
    grade: "ชั้นประถมศึกษาปีที่ 5",
    topic: "ชีวิตสัมพันธ์",
    experiment: "การทดลองที่ 5",
    lesson: "ห่วงโซ่อาหาร",
    back: "ย้อนกลับ",
    next: "ไปต่อ",
    text: "ชั้นประถมศึกษาปีที่ 5 ชีวิตสัมพันธ์ การทดลองที่ 5 ห่วงโซ่อาหาร",
  },
  en: {
    locale: "en-US",
    grade: "Grade 5",
    topic: "Interdependence",
    experiment: "Experiment 5",
    lesson: "Food Chain",
    back: "Back",
    next: "Next",
    text: "Grade 5. Interdependent Life. Experiment 5. Food Chain.",
  },
  ms: {
    locale: "ms-MY",
    grade: "Tahun 5",
    topic: "Hidupan Berkait",
    experiment: "Eksperimen 5",
    lesson: "Rantaian",
    back: "Kembali",
    next: "Seterusnya",
    text: "Tahun 5. Hidupan Saling Bergantung. Eksperimen 5. Rantaian Makanan.",
  },
};

const LANGUAGE_BUTTONS = [
  { key: "th", label: "🇹🇭 ไทย" },
  { key: "en", label: "EN English" },
  { key: "ms", label: "🇲🇾 Melayu" },
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

    // Chrome บางเครื่องไม่มี ms voice โดยตรง ใช้ id เป็น fallback
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

export default function P5FoodChainIntro() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [activeLang, setActiveLang] = useState("th");
  const nextPath = "/p5/life/foodchain/vocab";

  const t = LANGUAGE_CONTENT[activeLang] || LANGUAGE_CONTENT.th;
  const isThai = activeLang === "th";

  useEffect(() => {
    // แสดงลูกศรหลังจากโหลดหน้า 2 วินาที
    const timer = setTimeout(() => setShowArrow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSpeak = (langKey = activeLang) => {
    const selected = LANGUAGE_CONTENT[langKey] || LANGUAGE_CONTENT.th;
    speakWithBestVoice(selected.text, selected.locale, langKey);
  };

  const handleSelectLanguage = (langKey) => {
    setActiveLang(langKey);
    handleSpeak(langKey);
  };

  return (
    <div className="
    relative
    w-screen
    h-screen
    overflow-hidden
    bg-gradient-to-b from-green-100 via-green-200 to-green-300
    animate-gradientFlow">

      {/* ===== ดวงอาทิตย์ ===== */}
      <div className="
      absolute top-10 right-10
      w-48 h-48
      bg-yellow-300
      rounded-full
      animate-pulse
      shadow-[0_0_60px_#fcd34d]">
        {/* รังสีแสงอาทิตย์ */}
        <div className="absolute inset-0 animate-spinSlow">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 w-2 h-16 bg-yellow-200"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-60px)`,
                opacity: 0.6
              }}
            />
          ))}
        </div>
      </div>

      {/* ===== เมฆเคลื่อนที่ ===== */}
      <div className="
      absolute top-20 left-[-200px]
      w-[600px] h-[200px]
      bg-white
      rounded-full
      blur-xl
      opacity-60
      animate-cloudMove
      z-10"/>

      <div className="
      absolute top-40 right-[-200px]
      w-[600px] h-[200px]
      bg-white
      rounded-full
      blur-xl
      opacity-60
      animate-cloudMoveReverse
      z-10"/>

      {/* ===== พุ่มไม้ ===== */}
      <div className="
      absolute bottom-32
      w-full
      h-40
      bg-green-400
      rounded-t-[100%]
      animate-sway
      z-10"/>

      {/* ===== พื้นสนาม ===== */}
      <div className="
      absolute bottom-0
      w-full
      h-32
      bg-gradient-to-t from-green-600 to-green-400
      border-t-4 border-green-700"/>

      {/* ===== รั้วซ้าย ===== */}
      <div className="absolute bottom-0 left-20 flex gap-3 z-20">
        {Array.from({length:6}).map((_,i)=>(
          <div
            key={i}
            className="w-8 h-16 bg-orange-700 border-t-4 border-orange-800 transform -skew-x-6"
            style={{
              animation: `fencePop 0.5s ${i * 0.1}s both`
            }}
          />
        ))}
      </div>

      {/* ===== รั้วขวา ===== */}
      <div className="absolute bottom-0 right-20 flex gap-3 z-20">
        {Array.from({length:6}).map((_,i)=>(
          <div
            key={i}
            className="w-8 h-16 bg-orange-700 border-t-4 border-orange-800 transform skew-x-6"
            style={{
              animation: `fencePop 0.5s ${i * 0.1}s both`
            }}
          />
        ))}
      </div>

      {/* ===== ป้าย ป5 ===== */}
      <div className="
      absolute top-10 left-10
      bg-gradient-to-r from-green-400 to-green-300
      px-10 py-4
      rounded-full
      text-3xl
      font-bold
      text-white
      shadow-lg
      border-2 border-white
      animate-float
      z-30">
        🌱 {t.grade}
      </div>

      {/* ===== กล่องชีวิตสัมพันธ์ ===== */}
      <div className={`
      absolute
      left-[120px]
      top-[260px]
      bg-gradient-to-br from-yellow-100 to-yellow-200
      border-4 border-yellow-600
      px-20 py-8
      ${isThai ? "text-4xl" : "text-3xl"}
      font-bold
      rounded-2xl
      shadow-2xl
      animate-float
      hover:scale-105
      transition-all
      z-30`}>
        <span className="text-green-700">🌿</span> {t.topic}
      </div>

      {/* ===== เส้นเชื่อมเคลื่อนที่ ===== */}
      <div className="
      absolute
      top-[320px]
      left-[430px]
      w-[420px]
      h-[4px]
      bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500
      animate-pulse
      z-20"/>

      {/* ===== ลูกศรเคลื่อนที่ ===== */}
      {showArrow && (
        <div className="
        absolute
        top-[300px]
        left-[640px]
        text-6xl
        animate-bounce
        z-30">
          ➡️
        </div>
      )}

      {/* ===== กล่องทดลอง ===== */}
      <div
        onClick={() => navigate(nextPath)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="
        cursor-pointer
        absolute
        right-[120px]
        top-[260px]
        bg-gradient-to-br from-white to-blue-50
        border-4 border-blue-600
        rounded-2xl
        px-12 py-6
        shadow-2xl
        hover:scale-110
        hover:rotate-1
        transition-all
        duration-300
        z-30">

        <div className={`text-green-600 font-bold mb-2 ${isThai ? "text-2xl" : "text-xl"}`}>
          🔬 {t.experiment}
        </div>

        <div className={`font-bold text-blue-800 flex items-center gap-2 ${isThai ? "text-3xl" : "text-2xl"}`}>
          {t.lesson}
          {isHovered && (
            <span className="text-4xl animate-pulse">🐛</span>
          )}
        </div>

        {/* เอฟเฟกต์ sparkling */}
        {isHovered && (
          <div className="absolute -top-2 -right-2 w-6 h-6">
            <div className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-ping" />
            <div className="absolute w-2 h-2 bg-blue-300 rounded-full animate-ping delay-100 left-2" />
          </div>
        )}
      </div>

      {/* ===== ปุ่มภาษา ===== */}
      <div className="
      absolute
      bottom-8
      left-8
      flex gap-3
      z-30">

        {LANGUAGE_BUTTONS.map((lang, i) => (
          <button
            key={lang.key}
            type="button"
            onClick={() => handleSelectLanguage(lang.key)}
            className={`
            backdrop-blur
            px-6
            py-3
            rounded-full
            text-lg
            font-medium
            shadow-lg
            hover:bg-blue-100
            hover:scale-110
            hover:shadow-xl
            transition-all
            border-2
            hover:border-blue-300
            animate-fadeInUp
            ${activeLang === lang.key ? "bg-blue-100 border-blue-400" : "bg-white/90 border-transparent"}
            `}
            style={{ animationDelay: `${i * 0.1}s` }}>
            {lang.label}
          </button>
        ))}

        <button
          type="button"
          onClick={() => handleSpeak()}
          className="
          bg-blue-500
          px-6
          py-3
          rounded-full
          text-white
          text-xl
          font-bold
          shadow-lg
          hover:bg-blue-600
          hover:scale-110
          hover:rotate-12
          transition-all
          animate-fadeInUp
          ">
          🔊
        </button>

      </div>

      {/* ===== องค์ประกอบตกแต่ง ===== */}
      {/* ===== Navigation Buttons ===== */}
      <div className="
      absolute
      bottom-8
      right-8
      flex
      gap-3
      z-40">
        <button
          onClick={() => navigate("/p5/life")}
          className="
          bg-white/95
          backdrop-blur
          px-6
          py-3
          rounded-full
          text-lg
          font-semibold
          text-blue-700
          border-2 border-blue-300
          shadow-lg
          hover:bg-blue-50
          hover:scale-105
          transition-all">
          {t.back}
        </button>
        <button
          onClick={() => navigate(nextPath)}
          className="
          bg-blue-600
          px-6
          py-3
          rounded-full
          text-lg
          font-bold
          text-white
          shadow-lg
          hover:bg-blue-700
          hover:scale-105
          transition-all">
          {t.next}
        </button>
      </div>

      <div className="absolute bottom-40 left-40 text-4xl animate-float">
        🦋
      </div>
      <div className="absolute bottom-32 right-60 text-5xl animate-float delay-300">
        🐝
      </div>
      <div className="absolute bottom-24 left-80 text-4xl animate-float delay-700">
        🐞
      </div>

      <style jsx>{`
        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes cloudMove {
          0% { transform: translateX(0); }
          50% { transform: translateX(300px); }
          100% { transform: translateX(0); }
        }

        @keyframes cloudMoveReverse {
          0% { transform: translateX(0); }
          50% { transform: translateX(-300px); }
          100% { transform: translateX(0); }
        }

        @keyframes sway {
          0%, 100% { transform: rotate(0deg); }
          33% { transform: rotate(1deg); }
          66% { transform: rotate(-1deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes fencePop {
          0% { transform: scaleY(0); opacity: 0; }
          100% { transform: scaleY(1); opacity: 1; }
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-gradientFlow {
          background-size: 200% 200%;
          animation: gradientFlow 10s ease infinite;
        }

        .animate-cloudMove {
          animation: cloudMove 20s linear infinite;
        }

        .animate-cloudMoveReverse {
          animation: cloudMoveReverse 20s linear infinite;
        }

        .animate-sway {
          animation: sway 6s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-spinSlow {
          animation: spinSlow 20s linear infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-700 { animation-delay: 0.7s; }
      `}</style>

    </div>
  );
}
