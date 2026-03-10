import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp2Answer.css";

export default function P4GravityExp2Answer() {
  const navigate = useNavigate();

  const BACK_PATH = "/p4/gravity/exp2/result";
  const NEXT_PATH = "/p4/gravity";

  const [lang, setLang] = useState("th");

  const assets = useMemo(
    () => ({
      bg: "/images/p4/exp2/bg-lab.jpg",
      boardFrame: "",
      sticker: "/images/p4/exp2/sticker-megaphone.png",
      character: "/images/p4/exp1/gunkru.png",
    }),
    []
  );

  const text = useMemo(
    () => ({
      th: {
        title: "คำถามนี้มีคำตอบ",
        sub: "อ่านเฉลยแล้วลองอธิบายด้วยคำพูดของตัวเองดูนะ",
        q1: "1. ทำไมวัตถุทุกชนิดจึงตกลงสู่พื้นโลก และเหตุใดวัตถุแต่ละชนิดจึงมีน้ำหนักไม่เท่ากัน?",
        aTitle: "เฉลย",
        a1:
          "วัตถุทุกชนิดตกลงสู่พื้นโลก เพราะมีแรงโน้มถ่วงของโลกดึงไว้\nวัตถุมีน้ำหนักไม่เท่ากัน เพราะวัตถุแต่ละชนิดมีมวลไม่เท่ากัน",
        speakAll: "ฟังทั้งหมด",
        speak: "ฟัง",
        back: "ย้อนกลับ",
        next: "ต่อไป",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
      },
      en: {
        title: "Answers",
        sub: "Read the explanation and try to explain it in your own words.",
        q1: "1. Why do all objects fall to the ground, and why do different objects have different weights?",
        aTitle: "Answer",
        a1:
          "All objects fall to the ground because of Earth's gravity.\nObjects have different weights because their masses are different.",
        speakAll: "Listen to all",
        speak: "Listen",
        back: "Back",
        next: "Next",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
      },
      ms: {
        title: "Jawapan",
        sub: "Baca penjelasan ini dan cuba terangkan semula dengan kata-kata sendiri.",
        q1: "1. Mengapa semua objek jatuh ke tanah, dan mengapa objek yang berbeza mempunyai berat yang berbeza?",
        aTitle: "Jawapan",
        a1:
          "Semua objek jatuh ke tanah kerana graviti Bumi.\nObjek mempunyai berat yang berbeza kerana jisim setiap objek tidak sama.",
        speakAll: "Dengar semua",
        speak: "Dengar",
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
  const speakingRef = useRef(false);

  const speak = (msg) => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      speakingRef.current = true;
      utterance.onend = () => {
        speakingRef.current = false;
      };
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore speech errors
    }
  };

  const speakAll = () => {
    speak(`${t.title}\n${t.sub}\n\n${t.q1}\n\n${t.aTitle}\n${t.a1}`);
  };

  return (
    <div className="ans2e-page">
      <img className="ans2e-bg" src={assets.bg} alt="background" />
      <div className="ans2e-overlay" />

      <div className="ans2e-stage">
        {assets.character ? (
          <img className="ans2e-character" src={assets.character} alt="character" draggable="false" />
        ) : null}

        <div className="ans2e-board">
          {assets.boardFrame ? <img className="ans2e-frame" src={assets.boardFrame} alt="frame" /> : null}

          <div className="ans2e-boardInner">
            <div className="ans2e-header">
              <div className="ans2e-titleWrap">
                {assets.sticker ? (
                  <img className="ans2e-sticker" src={assets.sticker} alt="sticker" />
                ) : (
                  <span className="ans2e-stickerEmoji">📣</span>
                )}

                <div>
                  <div className="ans2e-title">{t.title}</div>
                  <div className="ans2e-sub">{t.sub}</div>
                </div>
              </div>

              <button className="ans2e-btn soft" type="button" onClick={speakAll}>
                🔊 {t.speakAll}
              </button>
            </div>

            <div className="ans2e-cards">
              <div className="ans2e-card yellow">
                <div className="ans2e-cardTop">
                  <div className="ans2e-q">{t.q1}</div>
                  <button className="ans2e-miniSpeak" type="button" onClick={() => speak(t.q1)} title={t.speak}>
                    🔊
                  </button>
                </div>
              </div>

              <div className="ans2e-card green">
                <div className="ans2e-cardTop">
                  <div className="ans2e-q">{t.aTitle}</div>
                  <button className="ans2e-miniSpeak" type="button" onClick={() => speak(t.a1)} title={t.speak}>
                    🔊
                  </button>
                </div>

                <div className="ans2e-a">
                  {t.a1.split("\n").map((line, idx) => (
                    <div className="ans2e-line" key={idx}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ans2e-langDock">
        <button className={`ans2e-chip ${lang === "th" ? "active" : ""}`} onClick={() => setLang("th")} type="button">
          {t.chipTh}
        </button>
        <button className={`ans2e-chip ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")} type="button">
          {t.chipEn}
        </button>
        <button className={`ans2e-chip ${lang === "ms" ? "active" : ""}`} onClick={() => setLang("ms")} type="button">
          {t.chipMs}
        </button>
      </div>

      <div className="ans2e-navDock">
        <div className="ans2e-navMiniRow">
          <button className="ans2e-navMiniBtn" type="button" onClick={() => navigate(BACK_PATH)} title={t.back}>
            ←
          </button>
          <button className="ans2e-navMiniBtn" type="button" onClick={() => navigate(NEXT_PATH)} title={t.next}>
            →
          </button>
        </div>
      </div>
    </div>
  );
}
