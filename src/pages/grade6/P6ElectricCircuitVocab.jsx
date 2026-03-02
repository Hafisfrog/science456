import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./P6ElectricVocab.css";

const VOCAB = [
  { th: "วงจรไฟฟ้า", ms: "litar elektrik", en: "Electric Circuit" },
  { th: "แหล่งกำเนิดไฟฟ้า", ms: "sumber kuasa", en: "Power Source" },
  { th: "สายไฟฟ้า", ms: "wayar elektrik", en: "Electric Wire" },
  { th: "เครื่องใช้ไฟฟ้า", ms: "peralatan elektrik", en: "Electrical Appliance" },
  { th: "ถ่านไฟฉาย", ms: "bateri lampu suluh", en: "Flashlight Battery" },
  { th: "แบตเตอรี่", ms: "bateri", en: "Battery" },
  { th: "เซลล์ไฟฟ้า", ms: "sel elektrik", en: "Electric Cell" },
  { th: "แบบอนุกรม", ms: "sel bersiri", en: "Electric cells in series" },
  { th: "แบบขนาน", ms: "sel selari", en: "Electric cells in parallel" },
  { th: "วงจรเปิด", ms: "litar terbuka", en: "Open Circuit" },
  { th: "วงจรปิด", ms: "litar tertutup", en: "Closed Circuit" },
  { th: "ตัวนำไฟฟ้า", ms: "konduktor elektrik", en: "Electrical Conductor" },
];

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;

  const voices = window.speechSynthesis.getVoices();
  const exact = voices.find((voice) => voice.lang.toLowerCase() === lang.toLowerCase());
  const fallback = voices.find((voice) =>
    voice.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase()),
  );

  if (exact || fallback) {
    utterance.voice = exact || fallback;
  }

  window.speechSynthesis.speak(utterance);
}

export default function P6ElectricCircuitVocab() {
  const navigate = useNavigate();

  const onSpeak = useCallback((text, lang) => {
    speakText(text, lang);
  }, []);

  return (
    <div className="p6-vocab-page">
      <div className="p6-vocab-shell p6-circuit-vocab-shell">
        <header className="p6-vocab-header">
          <h1>คำศัพท์วิทยาศาสตร์น่ารู้</h1>
          <p className="p6-vocab-sub">เรื่อง วงจรไฟฟ้าใกล้ตัว</p>
        </header>

        <section className="p6-vocab-card">
          <div className="p6-vocab-table-wrap p6-circuit-vocab-tableWrap">
            <table className="p6-vocab-table">
              <thead>
                <tr>
                  <th className="col-th">ภาษาไทย</th>
                  <th className="col-ms">ภาษามลายู</th>
                  <th className="col-en">ภาษาอังกฤษ</th>
                  <th className="col-voice">ฟังเสียง</th>
                </tr>
              </thead>
              <tbody>
                {VOCAB.map((row, index) => (
                  <tr key={index}>
                    <td className="col-th">{row.th}</td>
                    <td className="col-ms">{row.ms}</td>
                    <td className="col-en">{row.en}</td>
                    <td className="col-voice">
                      <div className="p6-vocab-voice-group">
                        <button
                          className="p6-vocab-voice-chip th"
                          onClick={() => onSpeak(row.th, "th-TH")}
                          type="button"
                          aria-label={`ฟังเสียงภาษาไทย: ${row.th}`}
                        >
                          TH
                        </button>
                        <button
                          className="p6-vocab-voice-chip ms"
                          onClick={() => onSpeak(row.ms, "ms-MY")}
                          type="button"
                          aria-label={`ฟังเสียงภาษามลายู: ${row.ms}`}
                        >
                          MY
                        </button>
                        <button
                          className="p6-vocab-voice-chip en"
                          onClick={() => onSpeak(row.en, "en-GB")}
                          type="button"
                          aria-label={`ฟังเสียงภาษาอังกฤษ: ${row.en}`}
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
        </section>

        <div className="p6-vocab-actions">
          <button
            className="p6-vocab-btn icon ghost"
            onClick={() => navigate("/p6/electric-circuit/objectives")}
            type="button"
            aria-label="กลับหน้าหน่วยการเรียนรู้"
            title="กลับหน้าหน่วยการเรียนรู้"
          >
            ←
          </button>
          <button
            className="p6-vocab-btn icon primary"
            onClick={() => navigate("/p6/electric-circuit/experiments")}
            type="button"
            aria-label="ไปหน้าเลือกการทดลอง"
            title="ไปหน้าเลือกการทดลอง"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
