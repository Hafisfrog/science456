import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../exp1/P4GravityExp1Answer.css";

export default function P4GravityExp2Answer() {
  const navigate = useNavigate();

  const BACK_PATH = "/p4/gravity/exp2/result";
  const NEXT_PATH = "/p4/gravity";

  const [lang, setLang] = useState("th");
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const assets = useMemo(
    () => ({
      bg: "/images/p4/exp2/bg-lab.jpg",
    }),
    []
  );

  const text = useMemo(
    () => ({
      th: {
        title: "คำถามนี้มีคำตอบ",
        sub: "อ่านเฉลยแล้วลองอธิบายด้วยคำพูดของตัวเองดูนะ",
        q1: "1. ทำไมวัตถุทุกชนิดจึงตกลงสู่พื้นโลก และเหตุใดวัตถุแต่ละชนิดจึงมีน้ำหนักไม่เท่ากัน?",
        a1:
          "วัตถุทุกชนิดตกลงสู่พื้นโลก เพราะมีแรงโน้มถ่วงของโลกดึงไว้\nวัตถุมีน้ำหนักไม่เท่ากัน เพราะวัตถุแต่ละชนิดมีมวลไม่เท่ากัน",
        speakAll: "ฟังทั้งหมด",
        speak: "ฟัง",
        back: "ย้อนกลับ",
        next: "ต่อไป",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        reveal: "เฉลยคำตอบ",
        hide: "ซ่อนคำตอบ",
      },
      en: {
        title: "Answers",
        sub: "Read the explanation and try to explain it in your own words.",
        q1: "1. Why do all objects fall to the ground, and why do different objects have different weights?",
        a1:
          "All objects fall to the ground because of Earth's gravity.\nObjects have different weights because their masses are different.",
        speakAll: "Listen to all",
        speak: "Listen",
        back: "Back",
        next: "Next",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        reveal: "Show answer",
        hide: "Hide answer",
      },
      ms: {
        title: "Jawapan",
        sub: "Baca penjelasan ini dan cuba terangkan semula dengan kata-kata sendiri.",
        q1: "1. Mengapa semua objek jatuh ke tanah, dan mengapa objek yang berbeza mempunyai berat yang berbeza?",
        a1:
          "Semua objek jatuh ke tanah kerana graviti Bumi.\nObjek mempunyai berat yang berbeza kerana jisim setiap objek tidak sama.",
        speakAll: "Dengar semua",
        speak: "Dengar",
        back: "Kembali",
        next: "Seterusnya",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Melayu",
        reveal: "Tunjuk jawapan",
        hide: "Sembunyikan jawapan",
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
    const message = revealedAnswers.q1 ? `${t.q1}\n${t.a1}` : t.q1;
    speak(message);
  };

  const toggleAnswer = (id) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="ans2-page">
      <img
        src="/images/p4/backgrounds-p4.jpg"
        alt="Laboratory background"
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.9]"
      />
      <div className="ans2-overlay" />

      <div className="ans2-langFloating">
        <div className="ans2-lang">
          <button className={`ans2-chip ${lang === "th" ? "active" : ""}`} onClick={() => setLang("th")} type="button">
            {t.chipTh}
          </button>
          <button className={`ans2-chip ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")} type="button">
            {t.chipEn}
          </button>
          <button className={`ans2-chip ${lang === "ms" ? "active" : ""}`} onClick={() => setLang("ms")} type="button">
            {t.chipMs}
          </button>
        </div>
      </div>

      <div className="ans2-stage">
        <div className="ans2-board">
          <div className="ans2-boardInner">
            <div className="ans2-header">
              <div className="ans2-titleWrap">
                <div>
                  <div className="ans2-title">{t.title}</div>
                  <div className="ans2-sub">{t.sub}</div>
                </div>
              </div>

              {/* <button className="ans2-btn soft" type="button" onClick={speakAll}>
                {"\uD83D\uDD0A"} {t.speakAll}
              </button> */}
            </div>

            <div className="ans2-cards">
              <div className="ans2-card yellow">
                <div className="ans2-cardTop">
                  <div className="ans2-q">{t.q1}</div>
                  <button className="ans2-miniSpeak" type="button" onClick={() => speak(t.q1)} title={t.speak}>
                    {"\uD83D\uDD0A"}
                  </button>
                </div>
                <div className="ans2-answerActions">
                  <button className="ans2-revealBtn" type="button" onClick={() => toggleAnswer("q1")}>
                    {revealedAnswers.q1 ? t.hide : t.reveal}
                  </button>
                </div>
                {revealedAnswers.q1 && (
                  <div className="ans2-a">
                    <button className="ans2-answerSpeak" type="button" onClick={() => speak(t.a1)} title={t.speak}>
                      {"\uD83D\uDD0A"}
                    </button>
                    {t.a1.split("\n").map((line, idx) => (
                      <div className="ans2-line" key={idx}>
                        {line}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ans2-navDock">
        <div className="ans2-navMiniRow">
          <button className="ans2-navMiniBtn ans2-navBackBtn" type="button" onClick={() => navigate(BACK_PATH)} title={t.back}>
            <span className="ans2-navArrow">«</span>
            <span>{t.back}</span>
          </button>
          <button className="ans2-navMiniBtn ans2-navNextBtn" type="button" onClick={() => navigate(NEXT_PATH)} title={t.next}>
            <span>{t.next}</span>
            <span className="ans2-navArrow">»</span>
          </button>
        </div>
      </div>
    </div>
  );
}
