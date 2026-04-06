import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityVocab.css";

const VOCAB = [
  {
    th: "แรงโน้มถ่วงของโลก",
    ms: "Graviti Bumi",
    en: "Earth's Gravity",
    // audio: {
    //   th: "/audio/p4/gravity/gravity_th.mp3",
    //   ms: "/audio/p4/gravity/gravity_ms.mp3",
    //   en: "/audio/p4/gravity/gravity_en.mp3",
    // },
  },
  {
    th: "สู่ศูนย์กลางของโลก",
    ms: "Ke arah pusat Bumi",
    en: "Toward the center of the Earth",
    // audio: {
    //   th: "/audio/p4/gravity/center_th.mp3",
    //   ms: "/audio/p4/gravity/center_ms.mp3",
    //   en: "/audio/p4/gravity/center_en.mp3",
    // },
  },
  {
    th: "น้ำหนัก",
    ms: "Berat",
    en: "Weight",
    // audio: {
    //   th: "/audio/p4/gravity/weight_th.mp3",
    //   ms: "/audio/p4/gravity/weight_ms.mp3",
    //   en: "/audio/p4/gravity/weight_en.mp3",
    // },
  },
  {
    th: "มวล",
    ms: "Jisim",
    en: "Mass",
    // audio: {
    //   th: "/audio/p4/gravity/mass_th.mp3",
    //   ms: "/audio/p4/gravity/mass_ms.mp3",
    //   en: "/audio/p4/gravity/mass_en.mp3",
    // },
  },
];

export default function P4GravityVocab() {
  const navigate = useNavigate();
  const audioRef = useRef(null);

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

  const speakFallback = (text, langKey) => {
    try {
      if (!window.speechSynthesis) return;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langKey === "th" ? "th-TH" : langKey === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore speech errors
    }
  };

  const playWord = (row, langKey) => {
    const src = row.audio?.[langKey];
    const text = row[langKey];

    stopAudio();

    if (src) {
      const audio = new Audio(src);
      audioRef.current = audio;
      audio.play().catch(() => {
        speakFallback(text, langKey);
      });
      return;
    }

    speakFallback(text, langKey);
  };

  return (
    <div className="vocab-page">
      <header className="vocab-header">
        <h1>คำศัพท์วิทยาศาสตร์น่ารู้</h1>
        <p>เรื่อง ผลของแรงโน้มถ่วง</p>
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
            {VOCAB.map((row, idx) => (
              <tr key={idx}>
                <td className="cell-th">{row.th}</td>
                <td className="cell-ms">{row.ms}</td>
                <td className="cell-en">{row.en}</td>
                <td className="cell-audio">
                  <button className="audio-btn th" type="button" onClick={() => playWord(row, "th")} title="ฟังภาษาไทย">
                    TH
                  </button>
                  <button className="audio-btn ms" type="button" onClick={() => playWord(row, "ms")} title="ฟังภาษามลายู">
                    MY
                  </button>
                  <button className="audio-btn en" type="button" onClick={() => playWord(row, "en")} title="ฟังภาษาอังกฤษ">
                    EN
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="vocab-footer">
        <button className="back-home-btn" type="button" onClick={() => navigate("/p4/gravity")}>
          « ย้อนกลับ
        </button>

        <button className="btn-next" type="button" onClick={() => navigate("/p4/gravity/sim1")}>
          ต่อไป »
        </button>
      </div>
    </div>
  );
}
