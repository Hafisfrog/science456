import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityObjectives.css";

export default function P4GravityObjectives() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const audioRef = useRef(null);

  const content = useMemo(() => {
    return {
      th: {
        grade: "ชั้นประถมศึกษาปีที่ 4",
        title: "แรงโน้มถ่วงของโลก",
        section: "จุดประสงค์การเรียนรู้",
        obj1: "สังเกตและระบุผลของแรงโน้มถ่วงที่มีต่อวัตถุได้",
        obj2: "ปฏิบัติการทดลองเกี่ยวกับผลของแรงโน้มถ่วงที่มีต่อวัตถุได้ครบทุกขั้นตอน",
        back: "ย้อนกลับ",
        next: "ไปคำศัพท์",
        speak: "ฟัง",
      },
      en: {
        grade: "Grade 4",
        title: "Earth's Gravity",
        section: "Learning Objectives",
        obj1: "Observe and describe the effect of gravity on objects.",
        obj2: "Carry out a gravity experiment by following all steps.",
        back: "Back",
        next: "Vocabulary",
        speak: "Listen",
      },
      ms: {
        grade: "Tahun 4",
        title: "Graviti Bumi",
        section: "Objektif Pembelajaran",
        obj1: "Memerhati dan menerangkan kesan graviti terhadap objek.",
        obj2: "Menjalankan eksperimen graviti dengan mengikuti semua langkah.",
        back: "Kembali",
        next: "Kosa Kata",
        speak: "Dengar",
      },
    };
  }, []);

  const t = content[lang];

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const speakText = (text) => {
    try {
      stopAudio();
      if (!window.speechSynthesis) return;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.speak(u);
    } catch {
      // ignore
    }
  };

  return (
    <div className="obj-full">
      <img className="obj-bg" src="/images/p4/gravity.png" alt="bg" />

      <div className="obj-shell">
        <div className="obj-header">
          <div className="obj-grade">{t.grade}</div>

          <div className="obj-titleRow">
            <h1 className="obj-title">{t.title}</h1>
            <button className="obj-audio" onClick={() => speakText(t.title)} type="button" title={t.speak}>
              🔊
            </button>
          </div>
        </div>

        <div className="obj-card">
          <div className="obj-card-head">
            <div className="obj-section">{t.section}</div>
          </div>

          <div className="obj-item">
            <div className="obj-num">1</div>
            <div className="obj-text">{t.obj1}</div>
            <button className="obj-audio small" onClick={() => speakText(t.obj1)} type="button" title={t.speak}>
              🔊
            </button>
          </div>

          <div className="obj-item">
            <div className="obj-num">2</div>
            <div className="obj-text">{t.obj2}</div>
            <button className="obj-audio small" onClick={() => speakText(t.obj2)} type="button" title={t.speak}>
              🔊
            </button>
          </div>
        </div>

        <img className="obj-character" src="/images/p4/exp1/gunkru.png" alt="character" />

        <div className="obj-langbar">
          <button className={`obj-chip ${lang === "th" ? "active" : ""}`} onClick={() => setLang("th")} type="button">
            ไทย
          </button>
          <button className={`obj-chip ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")} type="button">
            อังกฤษ
          </button>
          <button className={`obj-chip ${lang === "ms" ? "active" : ""}`} onClick={() => setLang("ms")} type="button">
            มลายู
          </button>
          {/* <button
            className="obj-chipAudio"
            type="button"
            onClick={() => speakText(`${t.title}. ${t.section}. 1. ${t.obj1}. 2. ${t.obj2}`)}
            title={t.speak}
          >
            🔊
          </button> */}
        </div>

        <div className="obj-actions">
          <button className="obj-btn ghost" onClick={() => navigate("/p4")} type="button">
            ◀ {t.back}
          </button>
          <button className="obj-btn primary" onClick={() => navigate("/p4/gravity")} type="button">
            {t.next} ▶
          </button>
        </div>
      </div>
    </div>
  );
}
