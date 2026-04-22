import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import "./P4GravityExp3Vocab.css";

const VOCAB = [
  { th: "การเปลี่ยนแปลง", ms: "Perubahan", en: "Change" },
  { th: "การเคลื่อนที่ของวัตถุ", ms: "Pergerakan objek", en: "Object motion" },
  { th: "เคลื่อนย้าย", ms: "Menggerakkan", en: "Move" },
];

export default function P4GravityExp3Vocab() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");

  const text = useMemo(
    () => ({
      th: {
        title: "คำศัพท์วิทยาศาสตร์น่ารู้",
        subtitle: "เรื่อง แรงดึงดูดของโลกกับแรงดึงดูดของดวงจันทร์",
        colTh: "ภาษาไทย",
        colMs: "ภาษามลายู",
        colEn: "ภาษาอังกฤษ",
        colAudio: "ฟังเสียง",
        back: "ย้อนกลับ",
        next: "ต่อไป",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
      },
      en: {
        title: "Science Vocabulary",
        subtitle: "Topic: Earth's gravity and the Moon's gravity",
        colTh: "Thai",
        colMs: "Malay",
        colEn: "English",
        colAudio: "Audio",
        back: "Back",
        next: "Next",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
      },
      ms: {
        title: "Kosa Kata Sains",
        subtitle: "Topik: Graviti Bumi dan graviti Bulan",
        colTh: "Bahasa Thai",
        colMs: "Bahasa Melayu",
        colEn: "Bahasa Inggeris",
        colAudio: "Audio",
        back: "Kembali",
        next: "Seterusnya",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Melayu",
      },
    }),
    []
  );

  const t = text[lang];

  const speak = (textValue, voiceLang) => {
    try {
      if (!window.speechSynthesis || !textValue) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(textValue);
      utter.lang = voiceLang === "th" ? "th-TH" : voiceLang === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.speak(utter);
    } catch {
      // ignore
    }
  };

  return (
    <div className="exp3-vocab-page">
      <HomeButton />

      <header className="exp3-vocab-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </header>

      <div className="exp3-vocab-card">
        <table className="exp3-vocab-table">
          <thead>
            <tr>
              <th className="col-th">{t.colTh}</th>
              <th className="col-ms">{t.colMs}</th>
              <th className="col-en">{t.colEn}</th>
              <th className="col-audio">{t.colAudio}</th>
            </tr>
          </thead>
          <tbody>
            {VOCAB.map((row, idx) => (
              <tr key={idx}>
                <td className="cell-th">{row.th}</td>
                <td className="cell-ms">{row.ms}</td>
                <td className="cell-en">{row.en}</td>
                <td className="cell-audio">
                  <button className="audio-btn th" onClick={() => speak(row.th, "th")} type="button">
                    TH
                  </button>
                  <button className="audio-btn ms" onClick={() => speak(row.ms, "ms")} type="button">
                    MY
                  </button>
                  <button className="audio-btn en" onClick={() => speak(row.en, "en")} type="button">
                    EN
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="absolute bottom-[18px] left-[18px] z-[30] flex items-center gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_18px_40px_rgba(0,0,0,.22)] max-[720px]:bottom-[12px] max-[720px]:left-[12px] max-[720px]:gap-[6px] max-[720px]:rounded-[12px] max-[720px]:p-[7px]">
        <button
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition ${
            lang === "th"
              ? "bg-[#bfe0ff] text-slate-900"
              : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
          } max-[720px]:rounded-[10px] max-[720px]:px-[10px] max-[720px]:py-[8px] max-[720px]:text-[13px]`}
          onClick={() => setLang("th")}
          type="button"
        >
          {t.chipTh}
        </button>
        <button
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition ${
            lang === "en"
              ? "bg-[#bfe0ff] text-slate-900"
              : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
          } max-[720px]:rounded-[10px] max-[720px]:px-[10px] max-[720px]:py-[8px] max-[720px]:text-[13px]`}
          onClick={() => setLang("en")}
          type="button"
        >
          {t.chipEn}
        </button>
        <button
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition ${
            lang === "ms"
              ? "bg-[#bfe0ff] text-slate-900"
              : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
          } max-[720px]:rounded-[10px] max-[720px]:px-[10px] max-[720px]:py-[8px] max-[720px]:text-[13px]`}
          onClick={() => setLang("ms")}
          type="button"
        >
          {t.chipMs}
        </button>
      </div> */}

      <div className="absolute bottom-[18px] right-[18px] z-[30] flex items-center gap-3 max-[720px]:bottom-[12px] max-[720px]:right-[12px] max-[720px]:gap-2">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[10px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          onClick={() => navigate("/p4/gravity")}
          type="button"
        >
          « {t.back}
        </button>

        <button
          className="rounded-[18px] bg-[linear-gradient(135deg,#ef4444,#b91c1c)] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[12px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          onClick={() => navigate("/p4/gravity/exp3/materials")}
          type="button"
        >
          {t.next} »
        </button>
      </div>
    </div>
  );
}
