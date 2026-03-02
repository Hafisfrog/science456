import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp2Steps.css";

export default function P4GravityExp2Steps() {
  const navigate = useNavigate();

  // ✅ ปรับ path ให้ตรงโปรเจกต์คุณ
  const BACK_PATH = "/p4/gravity/exp2/materials";
  const NEXT_PATH = "/p4/gravity/exp2/question"; // หรือหน้าถัดไปของ exp2

  // language
  const [lang, setLang] = useState("th"); // th | en | ms

  // ✅ เปลี่ยนรูปเองได้ (public/images/...)
  const assets = useMemo(() => {
    return {
      bg: "/images/p4/exp1/bg-lab.jpg", // จะใช้ bg exp1 ก็ได้ หรือทำ bg exp2 ใหม่
      character: "/images/p4/exp2/nr-man.png", // เปลี่ยนเป็นตัวละครของคุณ
    };
  }, []);

  const text = useMemo(() => {
    return {
      th: {
        topic: "เรื่อง แรงดึงดูดของโลกกับน้ำหนักของวัตถุ",
        label: "ขั้นตอนการทดลอง",
        step1: "เลือกวัตถุทดลองและวางบนเครื่องชั่งสปริง",
        step2: "สังเกตและบันทึกค่าน้ำหนักที่แสดงบนเครื่องชั่ง",
        step3: "เปลี่ยนชนิดวัตถุและทำการทดลองซ้ำ",
        step4: "เปรียบเทียบค่าน้ำหนักของวัตถุแต่ละชนิด",
        back: "ย้อนกลับ",
        next: "ต่อไป",
        speak: "ฟัง",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
      },
      en: {
        topic: "Earth’s Gravity and Object Weight",
        label: "Experiment Steps",
        step1: "Choose an object and place it on the spring scale",
        step2: "Observe and record the weight shown on the scale",
        step3: "Change the object and repeat the experiment",
        step4: "Compare the weights of different objects",
        back: "Back",
        next: "Next",
        speak: "Listen",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
      },
      ms: {
        topic: "Graviti Bumi dan Berat Objek",
        label: "Langkah Eksperimen",
        step1: "Pilih objek dan letakkan pada penimbang spring",
        step2: "Perhatikan dan catat bacaan berat pada penimbang",
        step3: "Tukar objek dan ulang eksperimen",
        step4: "Bandingkan nilai berat bagi setiap objek",
        back: "Kembali",
        next: "Seterusnya",
        speak: "Dengar",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
      },
    };
  }, []);

  const t = text[lang];

  // ✅ text-to-speech
  const speakingRef = useRef(false);

  const speak = (msg) => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();

      const u = new SpeechSynthesisUtterance(msg);
      u.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";

      speakingRef.current = true;
      u.onend = () => (speakingRef.current = false);
      u.onerror = () => (speakingRef.current = false);

      window.speechSynthesis.speak(u);
    } catch {
      // ignore
    }
  };

  const steps = [
    { n: 1, text: t.step1 },
    { n: 2, text: t.step2 },
    { n: 3, text: t.step3 },
    { n: 4, text: t.step4 },
  ];

  return (
    <div className="exp2s-page">
      <img className="exp2s-bg" src={assets.bg} alt="bg" />
      <div className="exp2s-overlay" />

      {/* ✅ ปุ่มย้อนกลับ ซ้ายบน */}
      <button
        className="exp2s-backBtn"
        type="button"
        onClick={() => navigate(BACK_PATH)}
      >
        ← {t.back}
      </button>

      {/* Top title */}
      <div className="exp2s-topTitle">
        <div className="exp2s-titlePill">{t.topic}</div>
      </div>

      {/* Label on left */}
      <div className="exp2s-badge">{t.label}</div>

      {/* Main board */}
      <div className="exp2s-board">
        <div className="exp2s-boardInner">
          <div className="exp2s-steps">
            {steps.map((s) => (
              <div className="exp2s-stepRow" key={s.n}>
                <div className="exp2s-num">{s.n}</div>

                <div className="exp2s-stepPill">
                  <div className="exp2s-stepText">{s.text}</div>

                  {/* ✅ ปุ่มเสียงอยู่ "หลังข้อความ" */}
                  <button
                    className="exp2s-speakBtn"
                    type="button"
                    onClick={() => speak(s.text)}
                    title={t.speak}
                  >
                    🔊
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* character */}
          <div className="exp2s-characterWrap">
            <img
              className="exp2s-character"
              src={assets.character}
              alt="character"
              draggable="false"
            />
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="exp2s-bottomBar">
        {/* Language group */}
        <div className="exp2s-langGroup">
          <button
            className={`exp2s-chip ${lang === "th" ? "active" : ""}`}
            onClick={() => setLang("th")}
            type="button"
          >
            {t.chipTh}
          </button>
          <button
            className={`exp2s-chip ${lang === "en" ? "active" : ""}`}
            onClick={() => setLang("en")}
            type="button"
          >
            {t.chipEn}
          </button>
          <button
            className={`exp2s-chip ${lang === "ms" ? "active" : ""}`}
            onClick={() => setLang("ms")}
            type="button"
          >
            {t.chipMs}
          </button>
        </div>

        {/* Navigation */}
        <div className="exp2s-nav">
          {/* <button className="exp2s-btn ghost" type="button" onClick={() => navigate(BACK_PATH)}>
            ← {t.back}
          </button> */}
          <button className="exp2s-btn primary" type="button" onClick={() => navigate(NEXT_PATH)}>
            {t.next} »
          </button>
        </div>
      </div>
    </div>
  );
}
