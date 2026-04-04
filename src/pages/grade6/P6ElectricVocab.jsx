import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./P6ElectricVocab.css";

const FORCE_VOCAB = [
  { th: "แรงโน้มถ่วงของโลก", ms: "graviti bumi", en: "Earth's Gravity" },
  { th: "สู่ศูนย์กลางของโลก", ms: "ke pusat bumi", en: "To the Center of the Earth" },
  { th: "น้ำหนัก", ms: "berat", en: "Weight" },
  { th: "มวล", ms: "jisim", en: "Mass" },
];

const ELECTRIC_VOCAB = [
  { th: "แรงดึงดูด", ms: "gaya tarikan", en: "Gravitational Force" },
  { th: "แรงผลัก", ms: "gaya tolakan", en: "Push Force" },
  { th: "แรงไม่มีสัมผัส", ms: "daya tanpa sentuhan", en: "Non-contact Force" },
  { th: "ประจุไฟฟ้า", ms: "cas elektrik", en: "Electric Charge" },
  { th: "แรงไฟฟ้า", ms: "daya elektrik", en: "Electric Force" },
  { th: "ความชื้น", ms: "kelembapan", en: "Humidity" },
];

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  const synth = window.speechSynthesis;
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  utterance.pitch = 1;

  const voices = synth.getVoices();
  const voice =
    voices.find((item) => item.lang === lang) ||
    voices.find((item) => item.lang.startsWith(lang.split("-")[0])) ||
    voices[0];

  if (voice) utterance.voice = voice;
  synth.speak(utterance);
}

export default function P6ElectricVocab() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const isUnitFlow =
    pathname === "/p6/electric-force/vocab" ||
    pathname.startsWith("/p6/electric-force/");

  const backPath = isUnitFlow
    ? "/p6/electric-force"
    : "/p6/experiment/electric-generation";

  const nextPath = isUnitFlow
    ? "/p6/electric-force/experiments"
    : "/p6/experiment/electric-generation/materials";

  const backLabel = "ย้อนกลับ";
  const nextLabel = "เลือกการทดลอง";

  const subtitle = isUnitFlow
    ? "เรื่อง แรงไฟฟ้าน่ารู้"
    : "เรื่อง แรงโน้มถ่วงของโลก";

  const rows = isUnitFlow ? ELECTRIC_VOCAB : FORCE_VOCAB;

  const onSpeak = useCallback((text, lang) => {
    speakText(text, lang);
  }, []);

  return (
    <div className="p6-vocab-page">
      <div className={`p6-vocab-shell ${!isUnitFlow ? "p6-circuit-vocab-shell" : ""}`}>
        <header className="p6-vocab-header">
          <h1>คำศัพท์วิทยาศาสตร์น่ารู้</h1>
          <p className="p6-vocab-sub">{subtitle}</p>
        </header>

        <section className="p6-vocab-card">
          <div className={`p6-vocab-table-wrap ${!isUnitFlow ? "p6-circuit-vocab-tableWrap" : ""}`}>
            <table className="p6-vocab-table">
              <thead>
                <tr>
                  <th className="col-th">ภาษาไทย</th>
                  <th className="col-ms">ภาษามลายู</th>
                  <th className="col-en">ภาษาอังกฤษ</th>
                  <th className="col-voice" style={{ textAlign: "center" }}>
                    ฟังเสียง
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={`${row.th}-${row.en}`}>
                    <td className="col-th">{row.th}</td>
                    <td className="col-ms">{row.ms}</td>
                    <td className="col-en">{row.en}</td>
                    <td className="col-voice">
                      <div className="p6-vocab-voice-group" style={{ justifyContent: "center" }}>
                        <button
                          className="p6-vocab-voice-chip th"
                          onClick={() => onSpeak(row.th, "th-TH")}
                          type="button"
                        >
                          TH
                        </button>
                        <button
                          className="p6-vocab-voice-chip ms"
                          onClick={() => onSpeak(row.ms, "ms-MY")}
                          type="button"
                        >
                          MY
                        </button>
                        <button
                          className="p6-vocab-voice-chip en"
                          onClick={() => onSpeak(row.en, "en-GB")}
                          type="button"
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
            className="p6-vocab-btn ghost"
            onClick={() => navigate(backPath)}
            type="button"
            aria-label={backLabel}
          >
            <span className="p6-vocab-btn-icon">&lt;&lt;</span>
            {backLabel}
          </button>
          <button
            className="p6-vocab-btn primary"
            onClick={() => navigate(nextPath)}
            type="button"
            aria-label={nextLabel}
          >
            {nextLabel}
            <span className="p6-vocab-btn-icon">&gt;&gt;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
