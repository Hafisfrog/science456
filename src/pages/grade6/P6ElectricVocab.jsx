import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";
import "../grade4/gravity/exp2/P4GravityExp2Vocab.css";

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
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

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
  const nextLabel = "ต่อไป";

  const subtitle = isUnitFlow
    ? "เรื่อง แรงไฟฟ้าน่ารู้"
    : "เรื่อง แรงโน้มถ่วงของโลก";

  const rows = isUnitFlow ? ELECTRIC_VOCAB : FORCE_VOCAB;

  const onSpeak = useCallback((text, lang) => {
    speakText(text, lang);
  }, []);

  return (
    <div className="vocab-page" style={{ position: "relative" }}>
      <HomeButton />

      <header className="vocab-header">
        <h1>คำศัพท์วิทยาศาสตร์น่ารู้</h1>
        <p>{subtitle}</p>
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
            {rows.map((row) => (
              <tr key={`${row.th}-${row.en}`}>
                <td className="cell-th">{row.th}</td>
                <td className="cell-ms">{row.ms}</td>
                <td className="cell-en">{row.en}</td>
                <td className="cell-audio">
                  <button className="audio-btn th" onClick={() => onSpeak(row.th, "th-TH")} type="button">
                    TH
                  </button>
                  <button className="audio-btn ms" onClick={() => onSpeak(row.ms, "ms-MY")} type="button">
                    MY
                  </button>
                  <button className="audio-btn en" onClick={() => onSpeak(row.en, "en-GB")} type="button">
                    EN
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="fixed bottom-[18px] right-[18px] z-[40] flex items-center gap-3 max-[720px]:bottom-[12px] max-[720px]:right-[12px] max-[720px]:gap-2">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[10px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          onClick={() => navigate(backPath)}
          type="button"
          aria-label={backLabel}
        >
          « {backLabel}
        </button>
        <button
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[12px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          onClick={() => navigate(nextPath)}
          type="button"
          aria-label={nextLabel}
        >
          {nextLabel} »
        </button>
      </div>
    </div>
  );
}
