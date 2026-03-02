import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp3Question.css";

export default function P4GravityExp3Question() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const audioRef = useRef(null);

  const BACK_PATH = "/p4/gravity/exp3/steps";
  const NEXT_PATH = "/p4/gravity/exp3/action";

  const text = useMemo(
    () => ({
      th: {
        title: "คำถามชวนคิด",
        question: "1. วัตถุเดียวกันจะมีน้ำหนักเท่ากันหรือไม่เมื่ออยู่\nบนโลกและดวงจันทร์",
        hintBtn: "มาหาคำตอบกัน",
        startBtn: "เริ่มการทดลอง",
        backBtn: "⟵ ย้อนกลับ",
        thChip: "ไทย",
        enChip: "อังกฤษ",
        msChip: "มลายู",
        soundTitle: "ฟังเสียง",
      },
      en: {
        title: "Think & Ask",
        question: "1. Will the same object have the same weight\non Earth and on the Moon?",
        hintBtn: "Let's find the answer",
        startBtn: "Start Experiment",
        backBtn: "⟵ Back",
        thChip: "Thai",
        enChip: "English",
        msChip: "Malay",
        soundTitle: "Sound",
      },
      ms: {
        title: "Soalan Pemikiran",
        question: "1. Adakah objek yang sama mempunyai berat yang sama\napabila berada di Bumi dan Bulan?",
        hintBtn: "Mari cari jawapan",
        startBtn: "Mula Eksperimen",
        backBtn: "⟵ Kembali",
        thChip: "Thai",
        enChip: "English",
        msChip: "Malay",
        soundTitle: "Bunyi",
      },
    }),
    []
  );

  const t = text[lang];

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const playQuestionAudio = () => {
    try {
      if (!window.speechSynthesis) return;
      stopAudio();
      const utter = new SpeechSynthesisUtterance(`${t.title}\n${t.question}`);
      utter.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.speak(utter);
    } catch {
      // ignore
    }
  };

  const handleStart = () => {
    stopAudio();
    navigate(NEXT_PATH);
  };

  const handleHint = () => {
    playQuestionAudio();
  };

  const goBack = () => {
    stopAudio();
    navigate(BACK_PATH);
  };

  return (
    <div className="q-page">
      <div className="q-bg" />

      <div className="q-stage">
        <button className="q-back" onClick={goBack} type="button">
          {t.backBtn}
        </button>

        <div className="q-langbar">
          <button className={`q-chip ${lang === "th" ? "active" : ""}`} onClick={() => setLang("th")} type="button">
            {t.thChip}
          </button>
          <button className={`q-chip ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")} type="button">
            {t.enChip}
          </button>
          <button className={`q-chip ${lang === "ms" ? "active" : ""}`} onClick={() => setLang("ms")} type="button">
            {t.msChip}
          </button>
        </div>

        <img className="q-character" src="/images/p4/exp1/character-girl.png" alt="character" />

        <div className="q-bubble">
          <div className="q-bubble-head">
            <div className="q-title">{t.title}</div>
            <button className="q-sound" onClick={playQuestionAudio} type="button" title={t.soundTitle}>
              🔊
            </button>
          </div>

          <div className="q-text">
            {t.question.split("\n").map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
        </div>

        <div className="q-rightpanel">
          <button className="q-hint" onClick={handleHint} type="button">
            <span className="q-hint-icon">?</span>
            <span className="q-hint-text">{t.hintBtn}</span>
          </button>

          <button className="q-start" onClick={handleStart} type="button">
            <div className="q-start-play">▶</div>
            <div className="q-start-text">{t.startBtn}</div>
          </button>
        </div>
      </div>
    </div>
  );
}
