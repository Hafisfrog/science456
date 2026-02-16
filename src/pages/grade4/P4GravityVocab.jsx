import { useNavigate } from "react-router-dom";
import "./P4GravityVocab.css";

const VOCAB = [
  {
    th: "แรงโน้มถ่วงของโลก",
    ms: "กราวีตี ดูนียอ",
    en: "Earth's Gravity",
    audio: {
      th: "/audio/p4/gravity/gravity_th.mp3",
      ms: "/audio/p4/gravity/gravity_ms.mp3",
      en: "/audio/p4/gravity/gravity_en.mp3",
    },
  },
  {
    th: "สู่ศูนย์กลางของโลก",
    ms: "ตูจู ปูสัท ดูนียอ",
    en: "To the Center of the Earth",
    audio: {
      th: "/audio/p4/gravity/center_th.mp3",
      ms: "/audio/p4/gravity/center_ms.mp3",
      en: "/audio/p4/gravity/center_en.mp3",
    },
  },
  {
    th: "น้ำหนัก",
    ms: "เบอรัต",
    en: "Weight",
    audio: {
      th: "/audio/p4/gravity/weight_th.mp3",
      ms: "/audio/p4/gravity/weight_ms.mp3",
      en: "/audio/p4/gravity/weight_en.mp3",
    },
  },
  {
    th: "มวล",
    ms: "จีซิม",
    en: "Mass",
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
          onClick={() => navigate("/p4/gravity/sim1")}
        >
          ไปหน้าถัดไป →
        </button>
      </div>
    </div>
  );
}
