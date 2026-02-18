import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./P6ElectricVocab.css";

const VOCAB = [
  { th: "แรงดึงดูด", ms: "gaya tarikan", en: "Gravitational Force" },
  { th: "แรงผลัก", ms: "gaya tolakan", en: "Push Force" },
  { th: "แรงไม่มีสัมผัส", ms: "daya tanpa sentuhan", en: "Non-contact Force" },
  { th: "ประจุไฟฟ้า", ms: "cas atau P", en: "Electric Charge" },
  { th: "แรงไฟฟ้า", ms: "daya QP", en: "Electric Force" },
  { th: "ความชื้น", ms: "kelembapan", en: "Humidity" },
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

export default function P6ElectricVocab() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isUnitFlow = pathname === "/p6/electric-force/vocab" || pathname.startsWith("/p6/electric-force/");
  const backPath = isUnitFlow ? "/p6/electric-force" : "/p6/experiment/electric-generation";
  const nextPath = isUnitFlow ? "/p6/electric-force/experiments" : "/p6/experiment/electric-generation/steps";
  const backLabel = isUnitFlow ? "กลับหน้าหน่วยการเรียนรู้" : "กลับหน้าจุดประสงค์";
  const nextLabel = isUnitFlow ? "ไปหน้าเลือกการทดลอง" : "ไปหน้าถัดไป";
  const subtitle = isUnitFlow ? "เรื่อง แรงไฟฟ้าน่ารู้" : "เรื่อง การเกิดแรงไฟฟ้า";

  const onSpeak = useCallback((text, lang) => {
    speakText(text, lang);
  }, []);

  return (
    <div className="p6-vocab-page">
      <div className="p6-vocab-shell">
        <header className="p6-vocab-header">
          <h1>คำศัพท์วิทยาศาสตร์น่ารู้</h1>
          <p className="p6-vocab-sub">{subtitle}</p>
        </header>

        <section className="p6-vocab-card">
          <div className="p6-vocab-table-wrap">
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
            onClick={() => navigate(backPath)}
            type="button"
            aria-label={backLabel}
            title={backLabel}
          >
            ←
          </button>
          <button
            className="p6-vocab-btn icon primary"
            onClick={() => navigate(nextPath)}
            type="button"
            aria-label={nextLabel}
            title={nextLabel}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
