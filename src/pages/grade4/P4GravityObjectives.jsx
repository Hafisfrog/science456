import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityObjectives.css";

export default function P4GravityObjectives() {
  const navigate = useNavigate();

  // th | en | ms
  const [lang, setLang] = useState("th");

  // กันเสียงซ้อน
  const audioRef = useRef(null);

  const content = useMemo(() => {
    return {
      th: {
        grade: "ชั้นประถมศึกษาปีที่ 4",
        title: "แรงโน้มถ่วงของโลก",
        section: "จุดประสงค์การเรียนรู้",
        obj1: "สังเกตและระบุผลของแรงโน้มถ่วงที่มีต่อวัตถุได้",
        obj2: "ปฏิบัติการทดลองเกี่ยวกับผลของแรงโน้มถ่วงที่มีต่อวัตถุได้ครบทุกขั้นตอน",
        back: "← กลับ",
        next: "ไปคำศัพท์ →",
      },
      en: {
        grade: "Grade 4",
        title: "Earth's Gravity",
        section: "Learning Objectives",
        obj1: "Observe and describe the effect of gravity on objects.",
        obj2: "Carry out a gravity experiment by following all steps.",
        back: "← Back",
        next: "Go to Vocabulary →",
      },
      ms: {
        grade: "Tahun 4",
        title: "Graviti Bumi",
        section: "Objektif Pembelajaran",
        obj1: "Memerhati dan menerangkan kesan graviti terhadap objek.",
        obj2: "Menjalankan eksperimen graviti dengan mengikuti semua langkah.",
        back: "← Kembali",
        next: "Pergi Kosa Kata →",
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

  // เล่นเสียงตาม key: title | obj1 | obj2
  const playAudio = (key) => {
    const srcMap = {
      title: {
        th: "/audio/p4/gravity/objectives_title_th.mp3",
        en: "/audio/p4/gravity/objectives_title_en.mp3",
        ms: "/audio/p4/gravity/objectives_title_ms.mp3",
      },
      obj1: {
        th: "/audio/p4/gravity/objectives_1_th.mp3",
        en: "/audio/p4/gravity/objectives_1_en.mp3",
        ms: "/audio/p4/gravity/objectives_1_ms.mp3",
      },
      obj2: {
        th: "/audio/p4/gravity/objectives_2_th.mp3",
        en: "/audio/p4/gravity/objectives_2_en.mp3",
        ms: "/audio/p4/gravity/objectives_2_ms.mp3",
      },
    };

    const audioSrc = srcMap[key]?.[lang];
    if (!audioSrc) return;

    stopAudio();
    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    audio.play().catch(() => {});
  };

  return (
    <div className="obj-full">
      {/* ✅ พื้นหลังใส่รูปเองได้ */}
      <img className="obj-bg" src="/images/p4/gravity.png" alt="bg" />

      <div className="obj-shell">
        {/* Top bar */}
        <div className="obj-topbar">
          {/* <button className="obj-back" onClick={() => navigate("/p4/gravity")} type="button">
            {t.back}
          </button> */}

          {/* ปุ่มภาษา */}
          <div className="obj-langbar">
            <button
              className={`obj-chip ${lang === "th" ? "active" : ""}`}
              onClick={() => setLang("th")}
              type="button"
            >
              ไทย
            </button>
            <button
              className={`obj-chip ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
              type="button"
            >
              อังกฤษ
            </button>
            <button
              className={`obj-chip ${lang === "ms" ? "active" : ""}`}
              onClick={() => setLang("ms")}
              type="button"
            >
              มลายู
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="obj-header">
          <div className="obj-grade">{t.grade}</div>

          {/* ✅ หัวเรื่อง + ปุ่มเสียงในช่องข้อความ */}
          <div className="obj-titleRow">
            <h1 className="obj-title">{t.title}</h1>
            <button
              className="obj-audio"
              onClick={() => playAudio("title")}
              type="button"
              title="ฟังเสียง"
            >
              🔊
            </button>
          </div>
        </div>

        {/* Card Objectives */}
        <div className="obj-card">
          <div className="obj-card-head">
            <div className="obj-section">{t.section}</div>
          </div>

          {/* Objective 1 */}
          <div className="obj-item">
            <div className="obj-num">1</div>
            <div className="obj-text">{t.obj1}</div>
            {/* ✅ ปุ่มเสียงในช่องข้อความ */}
            <button
              className="obj-audio small"
              onClick={() => playAudio("obj1")}
              type="button"
              title="ฟังเสียง"
            >
              🔊
            </button>
          </div>

          {/* Objective 2 */}
          <div className="obj-item">
            <div className="obj-num">2</div>
            <div className="obj-text">{t.obj2}</div>
            {/* ✅ ปุ่มเสียงในช่องข้อความ */}
            <button
              className="obj-audio small"
              onClick={() => playAudio("obj2")}
              type="button"
              title="ฟังเสียง"
            >
              🔊
            </button>
          </div>
        </div>

        {/* ✅ ตัวละครใส่รูปเองได้ */}
        <img
          className="obj-character"
          src="/images/p4/gunkru.png"
          alt="character"
        />

        {/* Bottom actions */}
        <div className="obj-actions">
          <button className="obj-btn ghost" onClick={() => navigate("/p4/gravity")} type="button">
            {t.back}
          </button>
          <button
            className="obj-btn primary"
            onClick={() => navigate("/p4/gravity/vocab")}
            type="button"
          >
            {t.next}
          </button>
        </div>
      </div>
    </div>
  );
}
