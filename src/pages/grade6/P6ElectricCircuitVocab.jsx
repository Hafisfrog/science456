import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";
import "../grade4/gravity/exp2/P4GravityExp2Vocab.css";

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

const UI_TEXT = {
  title: "คำศัพท์วิทยาศาสตร์น่ารู้",
  subtitle: "เรื่อง วงจรไฟฟ้าใกล้ตัว",
  headers: {
    th: "ภาษาไทย",
    ms: "ภาษามลายู",
    en: "ภาษาอังกฤษ",
    voice: "ฟังเสียง",
  },
  back: "ย้อนกลับ",
  next: "ต่อไป",
};

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;

  const voices = synth.getVoices();
  const exact = voices.find((voice) => voice.lang.toLowerCase() === lang.toLowerCase());
  const fallback = voices.find((voice) => voice.lang.toLowerCase().startsWith(lang.slice(0, 2)));

  if (exact || fallback) {
    utterance.voice = exact || fallback;
  }

  synth.speak(utterance);
}

export default function P6ElectricCircuitVocab() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const onSpeak = useCallback((text, lang) => {
    speakText(text, lang);
  }, []);

  return (
    <div className="vocab-page" style={{ position: "relative" }}>
      <HomeButton />

      <header className="vocab-header">
        <h1>{UI_TEXT.title}</h1>
        <p>{UI_TEXT.subtitle}</p>
      </header>

      <div className="vocab-card">
        <table className="vocab-table">
          <thead>
            <tr>
              <th className="col-th">{UI_TEXT.headers.th}</th>
              <th className="col-ms">{UI_TEXT.headers.ms}</th>
              <th className="col-en">{UI_TEXT.headers.en}</th>
              <th className="col-audio">{UI_TEXT.headers.voice}</th>
            </tr>
          </thead>
          <tbody>
            {VOCAB.map((row) => (
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
          onClick={() => navigate("/p6/electric-circuit/objectives")}
          type="button"
          aria-label={UI_TEXT.back}
        >
          « {UI_TEXT.back}
        </button>
        <button
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[12px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          onClick={() => navigate("/p6/electric-circuit/experiments")}
          type="button"
          aria-label={UI_TEXT.next}
        >
          {UI_TEXT.next} »
        </button>
      </div>
    </div>
  );
}
