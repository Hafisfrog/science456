import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravitySim1.css";

export default function P4GravitySim1() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const audioRef = useRef(null);

  const copy = useMemo(() => {
    return {
      th: {
        bubble: '1. "เคยสงสัยไหมว่า...ทำไมลูกบอลถึงตกลงพื้น ไม่ลอยขึ้นฟ้า?"',
        caption: "เริ่มการทดลอง",
        back: "← กลับหน้าคำศัพท์",
        hint: "กด 🔊 เพื่อฟังคำถาม หรือกด ▶ เพื่อเริ่มการทดลอง",
        speakTitle: "ฟังเสียง",
      },
      en: {
        bubble: '1. "Have you ever wondered... why does a ball fall to the ground instead of floating up?"',
        caption: "Start Experiment",
        back: "← Back to Vocabulary",
        hint: "Tap 🔊 to listen, or press ▶ to start",
        speakTitle: "Listen",
      },
      ms: {
        bubble: '1. "Pernah terfikir... kenapa bola jatuh ke tanah, bukan terapung ke langit?"',
        caption: "Mula Eksperimen",
        back: "← Kembali ke Kosa Kata",
        hint: "Tekan 🔊 untuk dengar, atau ▶ untuk mula",
        speakTitle: "Dengar",
      },
    };
  }, []);

  const t = copy[lang];

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const speakFallback = () => {
    try {
      if (!window.speechSynthesis) return;
      const utter = new SpeechSynthesisUtterance(`${t.bubble} ${t.hint}`);
      utter.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.speak(utter);
    } catch {
      // ignore
    }
  };

  const playNarration = () => {
    const audioSrc = {
      th: "/audio/sim/p4_gravity_intro_th.mp3",
      en: "/audio/sim/p4_gravity_intro_en.mp3",
      ms: "/audio/sim/p4_gravity_intro_ms.mp3",
    }[lang];

    stopAudio();

    if (!audioSrc) {
      speakFallback();
      return;
    }

    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    audio.play().catch(() => {
      speakFallback();
    });
  };

  const handleStart = () => {
    stopAudio();
    navigate("/p4/gravity/exp1/materials");
  };

  return (
    <div className="sim-page">
      <div className="sim-stage">
        <img className="sim-bg" src="/images/p4/sim/sball.png" alt="background" />

        <button className="sim-back" onClick={() => navigate("/p4/gravity/vocab")} type="button">
          {t.back}
        </button>

        <div className="sim-bubble">
          <div className="sim-bubble-row">
            <div className="sim-bubble-text">{t.bubble}</div>
            <button
              className="sim-sound-inbubble"
              onClick={playNarration}
              type="button"
              title={t.speakTitle}
              aria-label={t.speakTitle}
            >
              🔊
            </button>
          </div>
          <div className="sim-bubble-hint">{t.hint}</div>
        </div>

        <img className="sim-right-character" src="/images/p4/exp1/boy-soccer.png" alt="teacher" />

        {/* <img className="sim-prop-center" src="/images/soccer.png" alt="ball" /> */}

        <button className="sim-play" onClick={handleStart} type="button" aria-label="start">
          <span className="sim-play-icon">▶</span>
        </button>

        <div className="sim-caption">{t.caption}</div>

        <div className="sim-toolbar">
          <div className="sim-lang">
            <button className={`sim-chip ${lang === "th" ? "active" : ""}`} onClick={() => setLang("th")} type="button">
              ไทย
            </button>
            <button className={`sim-chip ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")} type="button">
              อังกฤษ
            </button>
            <button className={`sim-chip ${lang === "ms" ? "active" : ""}`} onClick={() => setLang("ms")} type="button">
              มลายู
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
