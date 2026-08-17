import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import "./P4GravityExp1Answer.css";

const MALAY_ANSWER_AUDIO = {
  q1: "/audio/p4/12.1.mp3",
  a1: "/audio/p4/12.2.mp3",
  q2: "/audio/p4/12.3.mp3",
  a2: "/audio/p4/12.4.mp3",
};

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
        chipMs: "มลายูถิ่น",
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
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายูถิ่น",
        reveal: "Show answer",
        hide: "Hide answer",
      },
      ms: {
        title: "ซออาแล นิง อาดอ ยาวะแป",
        sub: "Baca penjelasan ini dan cuba terangkan semula dengan kata-kata sendiri.",
        q1: "1.	แบซอ ปีเก เกอเดาะ, บะปอ บอลา ยาโตะฮ ตาเนาะฮ เตาะ นาแย นา-อิโกะ อาตะฮ ลางิ?",
        a1:
          "บูมี กีตอ อาดอ แร็ง ตาเระ บือนอ, แร็ง อีตู กีตอ ปาแง แร็ง บูมี ตาเระ บือนอ, บูวะวี บือนอ สมูวอ มาโซะ ซารีปูซะ บูมี, บีลอ กีตอ ลือปะฮ บอลา ดารี ตาแง กีตอ, แร็ง บูมี ตาเระ บือนอ บูวะ บอลา วี ยาโตะฮ บอเวาะฮ.เฮาะ นิง บูวะ วี บอลา ตู ยาโตะฮ ตาเนาะฮ.",
        q2: "2.	กาลู ลือปะฮ บือนอ, บือนอ เนาะ กือเราะ โกะมานอ, ลือปะฮตู กาปอ บูวะ วี บือนอ ตู ยาโตะฮ ตาเนาะฮ?",
        a2a_b: "ยาและ เฮาะ บือนอ กือเราะ:",
        a2a: "ตูรง โกะ บูมี.",
        a2b_b: "แร็ง เฮาะ บูวะ วี บือนอ ยาโตะฮ:",
        a2b: "แร็ง บูมี ตาเระ บือนอ.",
        speakAll: "Dengar semua",
        speak: "Dengar",
        back: "ฮูโนกือเละ",
        next: "ตือรุฮ",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายูถิ่น",
        reveal: "ยาวะแป",
        hide: "ซูซุ ยาวะแป",
      },
    }),
    []
  );

  const t = text[lang];

  const speakingRef = useRef(false);
  const audioRef = useRef(null);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    speakingRef.current = false;
  };

  const speak = (msg) => {
    try {
      stopAudio();
      if (!window.speechSynthesis) return;

      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.lang = lang === "th" ? "th-TH" : "en-US";
      speakingRef.current = true;
      utterance.onend = () => {
        speakingRef.current = false;
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore speech errors
    }
  };

  const speakPart = (msg, audioKey) => {
    try {
      if (lang === "ms") {
        stopAudio();
        const audioSrc = MALAY_ANSWER_AUDIO[audioKey];
        if (!audioSrc) return;
        speakingRef.current = true;
        const audio = new Audio(audioSrc);
        audioRef.current = audio;
        audio.onended = () => {
          speakingRef.current = false;
        };
        audio.play().catch(() => {
          speakingRef.current = false;
        });
        return;
      }

      speak(msg);
    } catch {
      // ignore audio errors
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
      <HomeButton />

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
          <button className={`ans2-chip ${lang === "ms" ? "active" : ""}`} onClick={() => setLang("ms")} type="button">
            {t.chipMs}
          </button>
          <button className={`ans2-chip ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")} type="button">
            {t.chipEn}
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
                  {/* <div className="ans2-sub">{t.sub}</div> */}
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
                    onClick={() => speakPart(t.q1, "q1")}
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
                    <button className="ans2-answerSpeak" type="button" onClick={() => speakPart(t.a1, "a1")} title={t.speak}>
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
                    onClick={() => speakPart(t.q2, "q2")}
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
                      onClick={() => speakPart(`${t.a2a_b} ${t.a2a}\n${t.a2b_b} ${t.a2b}`, "a2")}
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
