import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp1Steps.css";

export default function P4GravityExp1Steps() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");

  const BACK_PATH = "/p4/gravity/exp1/materials";
  const NEXT_PATH = "/p4/gravity/exp1/question";

  const speakingRef = useRef(false);

  const text = useMemo(() => {
    return {
      th: {
        topic: "เรื่อง ผลของแรงโน้มถ่วง",
        label: "ขั้นตอนการทดลอง",
        step1: "เลือกวัตถุทดลอง",
        step2: "วางวัตถุบนแท่นวางวัตถุ",
        step3: "กดปล่อยวัตถุและสังเกตการตก",
        step4: "ปรับความสูงแล้วทดลองซ้ำ",
        back: "ย้อนกลับ",
        next: "ต่อไป",
        speak: "ฟัง",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
      },
      en: {
        topic: "Effect of Gravity",
        label: "Experiment Steps",
        step1: "Choose the object",
        step2: "Place the object on the platform",
        step3: "Release the object and observe the fall",
        step4: "Change the height and repeat the experiment",
        back: "Back",
        next: "Next",
        speak: "Listen",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
      },
      ms: {
        topic: "Kesan Graviti",
        label: "Langkah Eksperimen",
        step1: "Pilih objek",
        step2: "Letakkan objek di atas platform",
        step3: "Lepaskan objek dan perhatikan kejatuhan",
        step4: "Ubah ketinggian dan ulangi eksperimen",
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

  const speak = (msg) => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();

      const u = new SpeechSynthesisUtterance(msg);
      u.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      u.onstart = () => (speakingRef.current = true);
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
    <div className="exp1s-page">
      <img className="exp1s-bg" src="/images/p4/exp1/bg-lab.jpg" alt="bg" />
      <div className="exp1s-overlay" />

      <button className="exp1s-backBtn" type="button" onClick={() => navigate(BACK_PATH)}>
        ⟵ {t.back}
      </button>

      <div className="exp1s-topTitle">
        <div className="exp1s-titlePill">{t.topic}</div>
      </div>

      <div className="exp1s-badge">{t.label}</div>

      <div className="exp1s-board">
        <div className="exp1s-boardInner">
          <div className="exp1s-steps">
            {steps.map((s) => (
              <div className="exp1s-stepRow" key={s.n}>
                <div className="exp1s-num">{s.n}</div>
                <div className="exp1s-stepPill">
                  <div className="exp1s-stepText">{s.text}</div>
                  <button className="exp1s-speakBtn" type="button" onClick={() => speak(s.text)} title={t.speak}>
                    🔊
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="exp1s-characterWrap">
            <img className="exp1s-character" src="/images/p4/exp1/character-boy.png" alt="character" draggable="false" />
          </div>
        </div>
      </div>

      <div className="exp1s-bottomBar">
        <div className="exp1s-langGroup">
          <button className={`exp1s-chip ${lang === "th" ? "active" : ""}`} onClick={() => setLang("th")} type="button">
            {t.chipTh}
          </button>
          <button className={`exp1s-chip ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")} type="button">
            {t.chipEn}
          </button>
          <button className={`exp1s-chip ${lang === "ms" ? "active" : ""}`} onClick={() => setLang("ms")} type="button">
            {t.chipMs}
          </button>
        </div>

        <div className="exp1s-nav">
          <button className="exp1s-btn primary" type="button" onClick={() => navigate(NEXT_PATH)}>
            {t.next} »
          </button>
        </div>
      </div>
    </div>
  );
}
