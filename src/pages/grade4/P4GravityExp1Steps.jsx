import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp1Steps.css";

export default function P4GravityExp1Steps() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const audioRef = useRef(null);

  const content = useMemo(() => {
    return {
      th: {
        title: "เรื่อง ผลของแรงโน้มถ่วง",
        section: "ขั้นตอนการทดลอง",
        steps: [
          "เลือกวัตถุทดลอง",
          "วางวัตถุบนแท่นวางวัตถุ",
          "กดปล่อยวัตถุและสังเกตการตก",
          "ปรับความสูงแล้วทดลองซ้ำ",
        ],
        back: "← ย้อนกลับ",
        next: "ต่อไป »",
      },
      en: {
        title: "Effect of Gravity",
        section: "Experiment Steps",
        steps: [
          "Choose the object",
          "Place the object on the platform",
          "Release the object and observe the fall",
          "Change the height and repeat the experiment",
        ],
        back: "← Back",
        next: "Next »",
      },
      ms: {
        title: "Kesan Graviti",
        section: "Langkah Eksperimen",
        steps: [
          "Pilih objek",
          "Letakkan objek di atas platform",
          "Lepaskan objek dan perhatikan kejatuhan",
          "Ubah ketinggian dan ulangi eksperimen",
        ],
        back: "← Kembali",
        next: "Seterusnya »",
      },
    };
  }, []);

  const t = content[lang];

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const playAudio = (key, index = null) => {
    const base =
      index === null
        ? `title`
        : `step${index + 1}`;

    const src = {
      th: `/audio/p4/exp1/${base}_th.mp3`,
      en: `/audio/p4/exp1/${base}_en.mp3`,
      ms: `/audio/p4/exp1/${base}_ms.mp3`,
    }[lang];

    stopAudio();
    const audio = new Audio(src);
    audioRef.current = audio;
    audio.play().catch(() => {});
  };

  return (
    <div className="step-page">
      {/* พื้นหลัง */}
      <img
        className="step-bg"
        src="/images/p4/exp1/bg-lab.jpg"
        alt="bg"
      />

      <div className="step-stage">
        {/* Back */}
        <button
          className="step-back"
          onClick={() => navigate("/p4/gravity/exp1/materials")}
        >
          {t.back}
        </button>

        {/* Title */}
        <div className="step-titlebox">
          <div className="step-titleRow">
            <div className="step-title">{t.title}</div>
            <button
              className="step-sound"
              onClick={() => playAudio("title")}
              title="ฟังเสียง"
            >
              🔊
            </button>
          </div>
        </div>

        {/* Section label */}
        <div className="step-lefttag">{t.section}</div>

        {/* Steps box */}
        <div className="step-card">
          {t.steps.map((text, i) => (
            <div className="step-item" key={i}>
              <div className="step-num">{i + 1}</div>
              <div className="step-text">{text}</div>
              {/* 🔊 ปุ่มเสียงหลังข้อความทุกข้อ */}
              <button
                className="step-sound small"
                onClick={() => playAudio("step", i)}
              >
                🔊
              </button>
            </div>
          ))}
        </div>

        {/* ตัวละคร (เปลี่ยนรูปเองได้) */}
        <img
          className="step-character"
          src="/images/p4/exp1/character-boy.png"
          alt="character"
        />

        {/* Language bar */}
        <div className="step-langbar">
          <button
            className={`step-chip ${lang === "th" ? "active" : ""}`}
            onClick={() => setLang("th")}
          >
            ไทย
          </button>
          <button
            className={`step-chip ${lang === "en" ? "active" : ""}`}
            onClick={() => setLang("en")}
          >
            อังกฤษ
          </button>
          <button
            className={`step-chip ${lang === "ms" ? "active" : ""}`}
            onClick={() => setLang("ms")}
          >
            มลายู
          </button>
        </div>

        {/* Next */}
        <button
          className="step-next"
          onClick={() => navigate("/p4/gravity/exp1/question")}
        >
          {t.next}
        </button>
      </div>
    </div>
  );
}
