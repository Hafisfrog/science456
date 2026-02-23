import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp1Question.css";

export default function P4GravityExp1Question() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");

  // ✅ ปรับ path ตรงนี้ตามโปรเจกต์คุณ
  const BACK_PATH = "/p4/gravity/exp1/steps";     // หน้าก่อนหน้า
  const NEXT_PATH = "/p4/gravity/exp1/action";    // หน้าถัดไปหลังเริ่มทดลอง

  const content = useMemo(() => {
    return {
      th: {
        title: "คำถามชวนคิด",
        q: '2. เมื่อปล่อยวัตถุ วัตถุจะเคลื่อนที่ไปทางใด?\nและอะไรเป็นแรงที่ทำให้วัตถุตกลงสู่พื้น?',
        hintBtn: "มาหาคำตอบกัน",
        startBtn: "เริ่มการทดลอง",
        backBtn: "← ย้อนกลับ",
        soundTitle: "ฟังเสียง",
      },
      en: {
        title: "Think & Ask",
        q: "2. When you release an object, which direction will it move?\nAnd what force makes it fall to the ground?",
        hintBtn: "Let's find the answer",
        startBtn: "Start Experiment",
        backBtn: "← Back",
        soundTitle: "Sound",
      },
      ms: {
        title: "Soalan Pemikiran",
        q: "2. Apabila objek dilepaskan, ke arah manakah ia bergerak?\nDan apakah daya yang menyebabkan objek jatuh ke tanah?",
        hintBtn: "Mari cari jawapan",
        startBtn: "Mula Eksperimen",
        backBtn: "← Kembali",
        soundTitle: "Bunyi",
      },
    };
  }, []);

  const t = content[lang];

  const playQuestionAudio = () => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(`${t.title}\n${t.q}`);
      utter.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.speak(utter);
    } catch {
      // ignore
    }
  };

  const handleStart = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    navigate(NEXT_PATH);
  };

  const handleHint = () => {
    // ตอนนี้ให้กดแล้ว “เล่นเสียงคำถาม” ก่อน
    // (ถ้าจะทำ popup เฉลย/คำใบ้เพิ่มภายหลังค่อยต่อยอด)
    playQuestionAudio();
  };

  const goBack = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    // ถ้าคุณอยากย้อนแบบ "หน้าที่ผ่านมา" ใช้ navigate(-1) แทนได้
    navigate(BACK_PATH);
  };

  return (
    <div className="q-page">
      {/* พื้นหลัง (ใส่รูปเองได้) */}
      <img className="q-bg" src="/images/p4/exp1/bg-question.jpg" alt="bg" />

      <div className="q-stage">
        {/* ปุ่มย้อนกลับ */}
        <button className="q-back" onClick={goBack} type="button">
          {t.backBtn}
        </button>

        {/* แถบภาษา (แปลภาษา) */}
        <div className="q-langbar">
          <button
            className={`q-chip ${lang === "th" ? "active" : ""}`}
            onClick={() => setLang("th")}
            type="button"
          >
            ไทย
          </button>
          <button
            className={`q-chip ${lang === "en" ? "active" : ""}`}
            onClick={() => setLang("en")}
            type="button"
          >
            อังกฤษ
          </button>
          <button
            className={`q-chip ${lang === "ms" ? "active" : ""}`}
            onClick={() => setLang("ms")}
            type="button"
          >
            มลายู
          </button>
        </div>

        {/* ตัวละคร (ใส่รูปเองได้) */}
        <img
          className="q-character"
          src="/images/p4/exp1/character-girl.png"
          alt="character"
        />

        {/* กล่องคำถาม */}
        <div className="q-bubble">
          <div className="q-bubble-head">
            <div className="q-title">{t.title}</div>

            {/* 🔊 ปุ่มเสียงอยู่ในช่องข้อความ */}
            <button
              className="q-sound"
              onClick={playQuestionAudio}
              type="button"
              title={t.soundTitle}
            >
              🔊
            </button>
          </div>

          <div className="q-text">
            {t.q.split("\n").map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
        </div>

        {/* ปุ่มด้านขวา (ตกแต่งให้สวยขึ้น) */}
        <div className="q-rightpanel">
          <button className="q-hint" onClick={handleHint} type="button">
            <span className="q-hint-icon">?</span>
            <span className="q-hint-text">{t.hintBtn}</span>
          </button>

          <button className="q-start" onClick={handleStart} type="button">
            <div className="q-start-play">▶</div>
            <div className="q-start-text">{t.startBtn}</div>
          </button>
        </div>
      </div>
    </div>
  );
}
