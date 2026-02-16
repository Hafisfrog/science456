import { useNavigate } from "react-router-dom";
import "./P4GravityEXP2Vocab.css";

const VOCAB = [
  {
    th: "มวลของวัตถุ",
    ms: "จีซิม เฮาะ บาแร",
    en: "Object's Mass",
    audio: {
      th: "/audio/p4/gravity/gravity_th.mp3",
      ms: "/audio/p4/gravity/gravity_ms.mp3",
      en: "/audio/p4/gravity/gravity_en.mp3",
    },
  },
  {
    th: "แรงดึงดูดของโลก",
    ms: "ดายอ ตาเระ เฮาะ ดูนียอ",
    en: "Earth's Gravitational Pull",
    audio: {
      th: "/audio/p4/gravity/center_th.mp3",
      ms: "/audio/p4/gravity/center_ms.mp3",
      en: "/audio/p4/gravity/center_en.mp3",
    },
  },
  {
    th: "เครื่องชั่งสปริง",
    ms: "เกโล สปริง",
    en: "Spring Extension",
    audio: {
      th: "/audio/p4/gravity/weight_th.mp3",
      ms: "/audio/p4/gravity/weight_ms.mp3",
      en: "/audio/p4/gravity/weight_en.mp3",
    },
  },
  {
    th: "ยืดของสปริง",
    ms: "รือแง เฮาะ สปริง",
    en: "Spring Scale",
    audio: {
      th: "/audio/p4/gravity/mass_th.mp3",
      ms: "/audio/p4/gravity/mass_ms.mp3",
      en: "/audio/p4/gravity/mass_en.mp3",
    },
  },
];

export default function P4GravityVocab() {
  const navigate = useNavigate();

  const playSound = (src) => {
    const audio = new Audio(src);
    audio.currentTime = 0;
    audio.play();
  };

  return (
    <div className="vocab-page" style={{ position: "relative" }}>
      {/* <BackButton /> */}

      <header className="vocab-header">
        <h1>คำศัพท์วิทยาศาสตร์น่ารู้</h1>
        <p>เรื่อง แรงโน้มถ่วงของโลก</p>
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
                  <button
                    className="audio-btn th"
                    onClick={() => playSound(row.audio.th)}
                  >
                    🇹🇭
                  </button>
                  <button
                    className="audio-btn ms"
                    onClick={() => playSound(row.audio.ms)}
                  >
                    🇲🇾
                  </button>
                  <button
                    className="audio-btn en"
                    onClick={() => playSound(row.audio.en)}
                  >
                    🇬🇧
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="vocab-footer">
        <button className="back-home-btn" onClick={() => navigate("/p4/gravity")}>
          ← กลับหน้าจุดประสงค์
        </button>

        <button
          className="btn-next"
          onClick={() => navigate("/p4/gravity/exp2/materials")}
        >
          ไปหน้าถัดไป →
        </button>
      </div>
    </div>
  );
}
