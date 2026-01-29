import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp1Materials.css";

export default function P4GravityExp1Materials() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const audioRef = useRef(null);

  const t = useMemo(() => {
    return {
      th: {
        title: "การทดลองที่ 1 เรื่อง ผลของแรงโน้มถ่วง",
        sub: "วัสดุอุปกรณ์",
        items: [
          { key: "ball", label: "ลูกบอล", img: "/images/soccer.png" },
          { key: "marble", label: "ลูกเปตอง", img: "/images/p4/marble.png" },
          { key: "feather", label: "ขนนก", img: "/images/p4/feather.png" },
          { key: "timer", label: "นาฬิกาจับเวลา", img: "/images/p4/timer.png" },
          { key: "ruler1", label: "ไม้วัดความสูง", img: "/images/p4/ruler1.png" },
          { key: "ruler2", label: "ไม้วัดความสูง", img: "/images/p4/ruler2.png" },
        ],
        back: "← ย้อนกลับ",
        next: "ต่อไป »",
        sound: "ฟังเสียง",
      },
      en: {
        title: "Experiment 1: Effect of Gravity",
        sub: "Materials",
        items: [
          { key: "ball", label: "Ball", img: "/images/p4/exp1/ball.png" },
          { key: "marble", label: "Metal ball", img: "/images/p4/exp1/marble.png" },
          { key: "feather", label: "Feather", img: "/images/p4/exp1/feather.png" },
          { key: "timer", label: "Stopwatch", img: "/images/p4/exp1/timer.png" },
          { key: "ruler1", label: "Height ruler", img: "/images/p4/exp1/ruler1.png" },
          { key: "ruler2", label: "Height ruler", img: "/images/p4/exp1/ruler2.png" },
        ],
        back: "← Back",
        next: "Next »",
        sound: "Sound",
      },
      ms: {
        title: "Eksperimen 1: Kesan Graviti",
        sub: "Bahan & Alat",
        items: [
          { key: "ball", label: "Bola", img: "/images/p4/exp1/ball.png" },
          { key: "marble", label: "Bola logam", img: "/images/p4/exp1/marble.png" },
          { key: "feather", label: "Bulu", img: "/images/p4/exp1/feather.png" },
          { key: "timer", label: "Jam randik", img: "/images/p4/exp1/timer.png" },
          { key: "ruler1", label: "Pembaris tinggi", img: "/images/p4/exp1/ruler1.png" },
          { key: "ruler2", label: "Pembaris tinggi", img: "/images/p4/exp1/ruler2.png" },
        ],
        back: "← Kembali",
        next: "Seterusnya »",
        sound: "Bunyi",
      },
    };
  }, []);

  const tr = t[lang];

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const playTitleAudio = () => {
    const src = {
      th: "/audio/p4/exp1/materials_title_th.mp3",
      en: "/audio/p4/exp1/materials_title_en.mp3",
      ms: "/audio/p4/exp1/materials_title_ms.mp3",
    }[lang];

    stopAudio();
    const audio = new Audio(src);
    audioRef.current = audio;
    audio.play().catch(() => {});
  };

  return (
    <div className="mat-page">
      {/* Background (ใส่รูปเองได้) */}
      <img className="mat-bg" src="/images/p4/exp1/bg-lab.jpg" alt="bg" />

      <div className="mat-stage">
        {/* Back */}
        <button
          className="mat-back"
          onClick={() => navigate("/p4/gravity/sim1")}
          type="button"
        >
          {tr.back}
        </button>

        {/* Title (ปุ่มเสียงอยู่ “หลังข้อความ”) */}
        <div className="mat-titlebar">
          <div className="mat-titlebox">
            <div className="mat-titleRow">
              <div className="mat-title">{tr.title}</div>

              {/* ✅ ปุ่มเสียงหลังข้อความ */}
              <button
                className="mat-sound-inline"
                onClick={playTitleAudio}
                type="button"
                title={tr.sound}
              >
                🔊
              </button>
            </div>
          </div>
        </div>

        {/* Left tag */}
        <div className="mat-lefttag">{tr.sub}</div>

        {/* Cards */}
        <div className="mat-grid">
          {tr.items.map((it) => (
            <div className="mat-card" key={it.key}>
              <div className="mat-frame">
                <img className="mat-img" src={it.img} alt={it.label} />
              </div>
              <div className="mat-label">{it.label}</div>
            </div>
          ))}
        </div>

        {/* Language bar */}
        <div className="mat-langbar">
          <button
            className={`mat-chip ${lang === "th" ? "active" : ""}`}
            onClick={() => setLang("th")}
            type="button"
          >
            ไทย
          </button>
          <button
            className={`mat-chip ${lang === "en" ? "active" : ""}`}
            onClick={() => setLang("en")}
            type="button"
          >
            อังกฤษ
          </button>
          <button
            className={`mat-chip ${lang === "ms" ? "active" : ""}`}
            onClick={() => setLang("ms")}
            type="button"
          >
            มลายู
          </button>
        </div>

        {/* Next */}
        <button
          className="mat-next"
          onClick={() => navigate("/p4/gravity/exp1/steps")}
          type="button"
        >
          {tr.next}
        </button>
      </div>
    </div>
  );
}
