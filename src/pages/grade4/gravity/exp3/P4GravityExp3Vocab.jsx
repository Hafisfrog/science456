import { useNavigate } from "react-router-dom";
import "./P4GravityExp3Vocab.css";

const VOCAB = [
  {
    th: "การเปลี่ยนแปลง",
    ms: "Perubahan",
    en: "Change",
  },
  {
    th: "การเคลื่อนที่ของวัตถุ",
    ms: "Pergerakan objek",
    en: "Object motion",
  },
  {
    th: "เคลื่อนย้าย",
    ms: "Menggerakkan",
    en: "Move",
  },
];

export default function P4GravityExp3Vocab() {
  const navigate = useNavigate();

  const speak = (text, lang) => {
    try {
      if (!window.speechSynthesis || !text) return;
      window.speechSynthesis.cancel();

      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.speak(utter);
    } catch {
      // ignore
    }
  };

  return (
    <div className="exp3-vocab-page">
      <header className="exp3-vocab-header">
        <h1>คำศัพท์วิทยาศาสตร์น่ารู้</h1>
        <p>เรื่อง การเปลี่ยนแปลงการเคลื่อนที่ของวัตถุ</p>
      </header>

      <div className="exp3-vocab-card">
        <table className="exp3-vocab-table">
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
                  <button className="audio-btn th" onClick={() => speak(row.th, "th")}>
                    TH
                  </button>
                  <button className="audio-btn ms" onClick={() => speak(row.ms, "ms")}>
                    MY
                  </button>
                  <button className="audio-btn en" onClick={() => speak(row.en, "en")}>
                    GB
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="exp3-vocab-footer">
        <button className="back-home-btn" onClick={() => navigate("/p4/gravity")}>
          « ย้อนกลับ
        </button>

        <button className="btn-next" onClick={() => navigate("/p4/gravity/exp3/steps")}>
          ต่อไป »
        </button>
      </div>
    </div>
  );
}
