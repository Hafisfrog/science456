import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp2Question.css";

export default function P4GravityExp2Question() {
  const navigate = useNavigate();

  // ✅ ปรับ path ให้ตรงโปรเจกต์คุณ
  const BACK_PATH = "/p4/gravity/exp2/steps";
  const ACTION_PATH = "/p4/gravity/exp2/action";
  const ANSWER_HINT_PATH = "/p4/gravity/exp2/answer"; // ถ้ามีหน้า “มาหาคำตอบกัน” แยก
  // ถ้าไม่มีหน้า answer ให้เปลี่ยนปุ่ม “มาหาคำตอบกัน” ไป ACTION_PATH ได้เลย

  // ภาษา
  const [lang, setLang] = useState("th"); // th | en | ms

  // ✅ เปลี่ยนรูปเองได้
  const assets = useMemo(() => {
    return {
      bg: "/images/p4/exp1/bg-lab.jpg", // ใช้ BG เดิมได้ หรือเปลี่ยนเป็น exp2 ก็ได้
      character: "/images/p4/exp1/character-girl.png", // เปลี่ยนเป็นรูปตัวละครของคุณ
      // ถ้าไม่มีรูป ให้ใส่เป็น "" แล้วระบบจะไม่แสดง
    };
  }, []);

  // ข้อความหลายภาษา
  const text = useMemo(() => {
    return {
      th: {
        title: "คำถามชวนคิด",
        q1: "1. เคยสงสัยหรือไม่ว่า ทำไมวัตถุทุกชนิดจึงตกลงสู่พื้นโลก และเหตุใดวัตถุแต่ละชนิดจึงมีน้ำหนักไม่เท่ากัน ?",
        langTh: "ไทย",
        langEn: "อังกฤษ",
        langMs: "มลายู",
        btnHint: "มาหาคำตอบ\nกัน",
        btnStart: "เริ่ม\nการทดลอง",
        back: "← ย้อนกลับ",
        speak: "ฟังคำถาม",
      },
      en: {
        title: "Thinking Question",
        q1: "1. Have you ever wondered why all objects fall to the ground, and why different objects have different weights?",
        langTh: "Thai",
        langEn: "English",
        langMs: "Malay",
        btnHint: "Find\nthe answer",
        btnStart: "Start\nExperiment",
        back: "← Back",
        speak: "Listen",
      },
      ms: {
        title: "Soalan Berfikir",
        q1: "1. Pernahkah anda tertanya-tanya mengapa semua objek jatuh ke tanah, dan mengapa objek yang berbeza mempunyai berat yang berbeza?",
        langTh: "Thai",
        langEn: "English",
        langMs: "Malay",
        btnHint: "Cari\njawapan",
        btnStart: "Mulakan\nEksperimen",
        back: "← Kembali",
        speak: "Dengar soalan",
      },
    };
  }, []);

  const t = text[lang];

  // ---------- speech ----------
  const speakingRef = useRef(false);

  const speak = (msg) => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();

      const u = new SpeechSynthesisUtterance(msg);
      u.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      u.rate = 0.98;

      speakingRef.current = true;
      u.onend = () => (speakingRef.current = false);

      window.speechSynthesis.speak(u);
    } catch {
      // ignore
    }
  };

  return (
    <div className="q2-page">
      {/* bg */}
      <img className="q2-bg" src={assets.bg} alt="bg" />
      <div className="q2-overlay" />

      {/* back top-left */}
      <button className="q2-backBtn" type="button" onClick={() => navigate(BACK_PATH)}>
        {t.back}
      </button>

      {/* character */}
      {assets.character ? (
        <img className="q2-character" src={assets.character} alt="character" draggable="false" />
      ) : null}

      {/* bubble */}
      <div className="q2-bubble">
        <div className="q2-bTitle">{t.title}</div>

        <div className="q2-bTextRow">
          <div className="q2-bText">{t.q1}</div>

          {/* ✅ ปุ่มเสียงอยู่ “หลังข้อความ” */}
          <button
            className="q2-speakBtn"
            type="button"
            onClick={() => speak(`${t.title}\n${t.q1}`)}
            title={t.speak}
          >
            🔊
          </button>
        </div>
      </div>

      {/* right actions */}
      <div className="q2-rightActions">
        <button
          className="q2-hintBtn"
          type="button"
          onClick={() => navigate(ANSWER_HINT_PATH)}
          title={t.btnHint.replace("\n", " ")}
        >
          <span className="q2-hIcon">?</span>
          <span className="q2-hText">{t.btnHint}</span>
        </button>

        <button
          className="q2-startBtn"
          type="button"
          onClick={() => navigate(ACTION_PATH)}
          title={t.btnStart.replace("\n", " ")}
        >
          <span className="q2-playCircle">▶</span>
          <span className="q2-startText">{t.btnStart}</span>
        </button>
      </div>

      {/* language bar bottom-left */}
      <div className="q2-langBar">
        <button
          className={`q2-chip ${lang === "th" ? "active" : ""}`}
          onClick={() => setLang("th")}
          type="button"
        >
          {t.langTh}
        </button>
        <button
          className={`q2-chip ${lang === "en" ? "active" : ""}`}
          onClick={() => setLang("en")}
          type="button"
        >
          {t.langEn}
        </button>
        <button
          className={`q2-chip ${lang === "ms" ? "active" : ""}`}
          onClick={() => setLang("ms")}
          type="button"
        >
          {t.langMs}
        </button>
      </div>
    </div>
  );
}
