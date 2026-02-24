import { useNavigate } from "react-router-dom";
import "./P4LightVocab.css";

const VOCAB = [
  {
    th: "แสง",
    ms: "จาฮายอ",
    en: "Light",
    audio: {
      th: "/audio/p4/light/basic_light_th.mp3",
      ms: "/audio/p4/light/basic_light_ms.mp3",
      en: "/audio/p4/light/basic_light_en.mp3",
    },
  },
  {
    th: "แหล่งกำเนิดแสง",
    ms: "ตีอาปัต ยาง จาฮายอ",
    en: "Light Source",
    audio: {
      th: "/audio/p4/light/basic_source_th.mp3",
      ms: "/audio/p4/light/basic_source_ms.mp3",
      en: "/audio/p4/light/basic_source_en.mp3",
    },
  },
  {
    th: "เคลื่อนที่ผ่านอากาศ",
    ms: "บีอรา ลือปะ อางิง",
    en: "Move Through Air",
    audio: {
      th: "/audio/p4/light/basic_move_th.mp3",
      ms: "/audio/p4/light/basic_move_ms.mp3",
      en: "/audio/p4/light/basic_move_en.mp3",
    },
  },
  {
    th: "กั้น",
    ms: "สือกัต",
    en: "Block",
    audio: {
      th: "/audio/p4/light/basic_block_th.mp3",
      ms: "/audio/p4/light/basic_block_ms.mp3",
      en: "/audio/p4/light/basic_block_en.mp3",
    },
  },
];

export default function P4LightBasicWords() {
  const navigate = useNavigate();

  const playSound = (src) => {
    const audio = new Audio(src);
    audio.currentTime = 0;
    audio.play();
  };

  return (
    <div className="vocab-page">

      <header className="vocab-header">
        <h1>คำศัพท์วิทยาศาสตร์น่ารู้</h1>
        <p>คำศัพท์พื้นฐานเกี่ยวกับแสง</p>
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
                  <button className="audio-btn th" onClick={() => playSound(row.audio.th)}>🇹🇭</button>
                  <button className="audio-btn ms" onClick={() => playSound(row.audio.ms)}>🇲🇾</button>
                  <button className="audio-btn en" onClick={() => playSound(row.audio.en)}>🇬🇧</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="vocab-footer">
        <button
          className="back-home-btn"
          onClick={() => navigate("/p4/light/vocab")}
        >
          ← ย้อนกลับ
        </button>

        <button
          className="btn-next"
          onClick={() => navigate("/p4/light/Situation")}
        >
          ไปหน้าถัดไป →
        </button>
      </div>

    </div>
  );
}
