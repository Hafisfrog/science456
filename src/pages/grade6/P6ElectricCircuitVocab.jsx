import { useCallback, useEffect, useMemo, useState } from "react";
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

const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย" },
  { id: "en", label: "อังกฤษ" },
  { id: "ms", label: "มลายู" },
];

const UI_TEXT = {
  th: {
    title: "คำศัพท์วิทยาศาสตร์น่ารู้",
    subtitle: "เรื่อง วงจรไฟฟ้าใกล้ตัว",
    headers: { th: "ภาษาไทย", ms: "ภาษามลายู", en: "ภาษาอังกฤษ", voice: "ฟังเสียง" },
    back: "ย้อนกลับ",
    next: "ไปต่อ",
  },
  en: {
    title: "Science Vocabulary",
    subtitle: "Topic: Everyday Electric Circuits",
    headers: { th: "Thai", ms: "Malay", en: "English", voice: "Audio" },
    back: "Back",
    next: "Next",
  },
  ms: {
    title: "Kosa Kata Sains",
    subtitle: "Topik: Litar Elektrik Sekeliling Kita",
    headers: { th: "Thai", ms: "Melayu", en: "Inggeris", voice: "Audio" },
    back: "Kembali",
    next: "Seterusnya",
  },
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
  const [language, setLanguage] = useState("th");
  const t = useMemo(() => UI_TEXT[language] ?? UI_TEXT.th, [language]);

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
    <div className="p6-vocab-page">
      <div className="p6-vocab-shell p6-circuit-vocab-shell">
        <header className="p6-vocab-header">
          <h1>{t.title}</h1>
          <p className="p6-vocab-sub">{t.subtitle}</p>
        </header>

        <section className="p6-vocab-card">
          <div className="p6-vocab-table-wrap p6-circuit-vocab-tableWrap">
            <table className="p6-vocab-table">
              <thead>
                <tr>
                  <th className="col-th">{t.headers.th}</th>
                  <th className="col-ms">{t.headers.ms}</th>
                  <th className="col-en">{t.headers.en}</th>
                  <th className="col-voice" style={{ textAlign: "center" }}>
                    {t.headers.voice}
                  </th>
                </tr>
              </thead>
              <tbody>
                {VOCAB.map((row) => (
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
                          EN
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="fixed bottom-6 left-6 z-20 inline-flex gap-2 rounded-[20px] bg-white/95 px-3 py-[10px] shadow-[0_18px_40px_rgba(111,144,186,0.2)]">
          {LANGUAGE_OPTIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => setLanguage(item.id)}
              className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
                language === item.id ? "bg-[#bdd9f8]" : "bg-[#eaf3ff]"
              }`}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="fixed bottom-6 right-6 z-20 flex items-center gap-3">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-white/90 px-[18px] py-[14px] font-black text-[#213a8f] shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
            onClick={() => navigate("/p6/electric-circuit/objectives")}
            type="button"
            aria-label={t.back}
          >
            <span className="text-[20px] leading-none">&laquo;</span>
            <span className="text-[20px] leading-none">{t.back}</span>
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-[#2563eb] px-[18px] py-[14px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
            onClick={() => navigate("/p6/electric-circuit/experiments")}
            type="button"
            aria-label={t.next}
          >
            <span className="text-[20px] leading-none">{t.next}</span>
            <span className="text-[20px] leading-none">&raquo;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
