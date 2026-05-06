import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import { useState } from "react";
import "./P4GravityExp2Vocab.css";
import "../exp1/P4GravityExp1Materials.css";

const VOCAB = [
  {
    th: "มวลของวัตถุ",
    ms: "Jisim objek",
    en: "Mass of an object",
    // audio: {
    //   th: "/audio/p4/gravity/gravity_th.mp3",
    //   ms: "/audio/p4/gravity/gravity_ms.mp3",
    //   en: "/audio/p4/gravity/gravity_en.mp3",
    // },
  },
  {
    th: "แรงดึงดูดของโลก",
    ms: "Daya tarikan graviti Bumi",
    en: "Earth’s gravity",
    // audio: {
    //   th: "/audio/p4/gravity/center_th.mp3",
    //   ms: "/audio/p4/gravity/center_ms.mp3",
    //   en: "/audio/p4/gravity/center_en.mp3",
    // },
  },
  {
    th: "เครื่องชั่งสปริง",
    ms: "Penimbang spring",
    en: "Spring Scale",
    // audio: {
    //   th: "/audio/p4/gravity/weight_th.mp3",
    //   ms: "/audio/p4/gravity/weight_ms.mp3",
    //   en: "/audio/p4/gravity/weight_en.mp3",
    // },
  },
  {
    th: "การยืดของสปริง",
    ms: "Pemanjangan spring",
    en: "Spring Extension",
    // audio: {
    //   th: "/audio/p4/gravity/mass_th.mp3",
    //   ms: "/audio/p4/gravity/mass_ms.mp3",
    //   en: "/audio/p4/gravity/mass_en.mp3",
    // },
  },
];

export default function P4GravityExp2Vocab() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [lang, setLang] = useState("th");

  const text = {
    th: {
      title: "คำศัพท์วิทยาศาสตร์น่ารู้",
      subtitle: "เรื่อง แรงดึงดูดของโลกกับน้ำหนักของวัตถุ",
      colTh: "ภาษาไทย",
      colMs: "ภาษามลายู",
      colEn: "ภาษาอังกฤษ",
      colAudio: "ฟังเสียง",
      chipTh: "ไทย",
      chipEn: "อังกฤษ",
      chipMs: "มลายู",
      back: "ย้อนกลับ",
      next: "ต่อไป",
      listenTh: "ฟังภาษาไทย",
      listenMs: "ฟังภาษามลายู",
      listenEn: "ฟังภาษาอังกฤษ",
    },
    en: {
      title: "Science Vocabulary",
      subtitle: "Topic: Earth's Gravity and Object Weight",
      colTh: "Thai",
      colMs: "Malay",
      colEn: "English",
      colAudio: "Audio",
      chipTh: "Thai",
      chipEn: "English",
      chipMs: "Malay",
      back: "Back",
      next: "Next",
      listenTh: "Listen in Thai",
      listenMs: "Listen in Malay",
      listenEn: "Listen in English",
    },
    ms: {
      title: "Kosa Kata Sains",
      subtitle: "Topik: Graviti Bumi dan berat objek",
      colTh: "Bahasa Thai",
      colMs: "Bahasa Melayu",
      colEn: "Bahasa Inggeris",
      colAudio: "Audio",
      chipTh: "Thai",
      chipEn: "English",
      chipMs: "Melayu",
      back: "Kembali",
      next: "Seterusnya",
      listenTh: "Dengar bahasa Thai",
      listenMs: "Dengar bahasa Melayu",
      listenEn: "Dengar bahasa Inggeris",
    },
  };

  const t = text[lang];

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const speakFallback = (text, langKey) => {
    try {
      if (!window.speechSynthesis) return;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = langKey === "th" ? "th-TH" : langKey === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.speak(u);
    } catch {
      // ignore
    }
  };

  const playWord = (row, langKey) => {
    const src = row.audio?.[langKey];
    const text = row[langKey];

    stopAudio();

    if (src) {
      const audio = new Audio(src);
      audioRef.current = audio;
      audio.play().catch(() => speakFallback(text, langKey));
      return;
    }

    speakFallback(text, langKey);
  };

  return (
    <div className="vocab-page" style={{ position: "relative" }}>
      <HomeButton />

      <header className="vocab-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </header>

      <div className="vocab-card">
        <table className="vocab-table">
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
                  <button className="audio-btn th" type="button" onClick={() => playWord(row, "th")} title={t.listenTh}>
                    TH
                  </button>
                  <button className="audio-btn ms" type="button" onClick={() => playWord(row, "ms")} title={t.listenMs}>
                    MY
                  </button>
                  <button className="audio-btn en" type="button" onClick={() => playWord(row, "en")} title={t.listenEn}>
                    EN
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="exp1m-langBar">
        <button className={`exp1m-chip ${lang === "th" ? "active" : ""}`} onClick={() => setLang("th")} type="button">
          {t.chipTh}
        </button>
        <button className={`exp1m-chip ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")} type="button">
          {t.chipEn}
        </button>
        <button className={`exp1m-chip ${lang === "ms" ? "active" : ""}`} onClick={() => setLang("ms")} type="button">
          {t.chipMs}
        </button>
      </div> */}

      <div className="absolute bottom-[18px] right-[18px] z-[30] flex items-center gap-3 max-[720px]:bottom-[12px] max-[720px]:right-[12px] max-[720px]:gap-2">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[10px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          type="button"
          onClick={() => navigate("/p4/gravity/exp2/skills")}
        >
          « {t.back}
        </button>

        <button
          className="rounded-[18px] bg-[linear-gradient(135deg,#ef4444,#b91c1c)] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[12px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          type="button"
          onClick={() => navigate("/p4/gravity/exp2/materials")}
        >
          {t.next} »
        </button>
      </div>
    </div>
  );
}
