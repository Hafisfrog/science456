import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp1Answer.css";

export default function P4GravityExp1Answer() {
  const navigate = useNavigate();

  const BACK_PATH = "/p4/gravity/exp1/result";
  const NEXT_PATH = "/p4/gravity";

  const [lang, setLang] = useState("th");
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const assets = useMemo(
    () => ({
      bg: "/images/p4/exp1/bg-lab.jpg",
    }),
    []
  );

  const text = useMemo(
    () => ({
      th: {
        title: "คำถามนี้มีคำตอบ",
        sub: "อ่านเฉลยแล้วลองอธิบายด้วยคำพูดของตัวเองดูนะ",
        q1: "1. เคยสงสัยไหมว่า ทำไมลูกบอลถึงตกลงพื้น ไม่ลอยขึ้นฟ้า?",
        a1:
          "โลกของเรามีแรงดึงดูดที่เรียกว่า แรงโน้มถ่วง ซึ่งดึงวัตถุทุกชนิดเข้าหาศูนย์กลางของโลก เมื่อเราปล่อยลูกบอลจากมือ แรงโน้มถ่วงของโลกจะดึงลูกบอลลงด้านล่าง จึงทำให้ลูกบอลตกลงสู่พื้นดิน",
        q2: "2. เมื่อปล่อยวัตถุ วัตถุจะเคลื่อนที่ไปทางใด และอะไรเป็นแรงที่ทำให้วัตถุตกลงสู่พื้น?",
        a2a_b: "ทิศทางการเคลื่อนที่ของวัตถุ:",
        a2a: "ลงสู่พื้นโลก",
        a2b_b: "แรงที่ทำให้วัตถุตก:",
        a2b: "แรงโน้มถ่วงของโลก",
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
        q1: "1. Have you ever wondered why a ball falls down instead of floating upward?",
        a1:
          "Earth has an attractive force called gravity. It pulls objects toward the center of Earth. When we release a ball, gravity pulls it downward, so it falls to the ground.",
        q2: "2. When an object is released, which direction does it move? What force makes it fall?",
        a2a_b: "Direction of motion:",
        a2a: "Down toward Earth",
        a2b_b: "Force that makes it fall:",
        a2b: "Earth's gravity",
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
        q1: "1. Pernah tertanya-tanya mengapa bola jatuh ke tanah dan tidak terapung ke atas?",
        a1:
          "Bumi mempunyai daya tarikan yang dipanggil graviti. Daya ini menarik objek ke arah pusat Bumi. Apabila bola dilepaskan, graviti menariknya ke bawah lalu bola jatuh ke tanah.",
        q2: "2. Apabila objek dilepaskan, ia bergerak ke arah mana? Daya apa yang menyebabkan ia jatuh?",
        a2a_b: "Arah pergerakan:",
        a2a: "Ke bawah menuju tanah",
        a2b_b: "Daya yang menyebabkan jatuh:",
        a2b: "Graviti Bumi",
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
    const q1Message = revealedAnswers.q1 ? `${t.q1}\n${t.a1}` : t.q1;
    const q2Message = revealedAnswers.q2
      ? `${t.q2}\n${t.a2a_b} ${t.a2a}\n${t.a2b_b} ${t.a2b}`
      : t.q2;
    const message = `${q1Message}\n\n${q2Message}`;
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
        {/* <img className="ans2-character" src={assets.character} alt="character" draggable="false" /> */}

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
                🔊 {t.speakAll}
              </button> */}
            </div>

            <div className="ans2-cards">
              <div className="ans2-card yellow">
                <div className="ans2-cardTop">
                  <div className="ans2-q">{t.q1}</div>
                  <button
                    className="ans2-miniSpeak"
                    type="button"
                    onClick={() => speak(t.q1)}
                    title={t.speak}
                  >
                    🔊
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
                      🔊
                    </button>
                    <div>{t.a1}</div>
                  </div>
                )}
              </div>

              <div className="ans2-card blue">
                <div className="ans2-cardTop">
                  <div className="ans2-q">{t.q2}</div>
                  <button
                    className="ans2-miniSpeak"
                    type="button"
                    onClick={() => speak(t.q2)}
                    title={t.speak}
                  >
                    🔊
                  </button>
                </div>
                <div className="ans2-answerActions">
                  <button className="ans2-revealBtn" type="button" onClick={() => toggleAnswer("q2")}>
                    {revealedAnswers.q2 ? t.hide : t.reveal}
                  </button>
                </div>
                {revealedAnswers.q2 && (
                  <div className="ans2-a">
                    <button
                      className="ans2-answerSpeak"
                      type="button"
                      onClick={() => speak(`${t.a2a_b} ${t.a2a}\n${t.a2b_b} ${t.a2b}`)}
                      title={t.speak}
                    >
                      🔊
                    </button>
                    <div className="ans2-line">
                      <span className="ans2-bold">{t.a2a_b}</span> {t.a2a}
                    </div>
                    <div className="ans2-line">
                      <span className="ans2-bold">{t.a2b_b}</span> {t.a2b}
                    </div>
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
