import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp3Answer.css";

export default function P4GravityExp3Answer() {
  const navigate = useNavigate();

  const BACK_PATH = "/p4/gravity/exp3/result";
  const NEXT_PATH = "/p4/gravity/summarize";
  const [lang, setLang] = useState("th");

  const assets = useMemo(
    () => ({
      bg: "/images/p4/exp1/bg-lab.jpg",
      boardFrame: "/images/p4/exp1/board-frame.png",
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
        q1: "1. วัตถุเดียวกันจะมีน้ำหนักเท่ากันหรือไม่เมื่ออยู่บนโลกและบนดวงจันทร์?",
        aTitle: "เฉลย",
        a1:
          "ไม่เท่ากัน แม้จะเป็นวัตถุชิ้นเดียวกันและมีมวลเท่ากัน\nแต่แรงโน้มถ่วงของโลกและดวงจันทร์ไม่เท่ากัน\nบนโลก: แรงโน้มถ่วงมาก จึงทำให้วัตถุมีน้ำหนักมาก\nบนดวงจันทร์: แรงโน้มถ่วงน้อยกว่าโลกมาก จึงทำให้วัตถุมีน้ำหนักน้อยกว่า",
        speak: "ฟัง",
        speakAll: "ฟังทั้งหมด",
        back: "ย้อนกลับ",
        next: "ต่อไป",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
      },
      en: {
        title: "Answer",
        sub: "Read and explain it in your own words.",
        q1: "1. Does the same object have the same weight on Earth and on the Moon?",
        aTitle: "Answer",
        a1:
          "No. Even if it is the same object with the same mass, gravity on Earth and on the Moon is different.\nOn Earth: gravity is stronger, so the object has greater weight.\nOn the Moon: gravity is weaker, so the object has less weight.",
        speak: "Listen",
        speakAll: "Listen all",
        back: "Back",
        next: "Next",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
      },
      ms: {
        title: "Jawapan",
        sub: "Baca dan terangkan semula dengan kata-kata sendiri.",
        q1: "1. Adakah objek yang sama mempunyai berat yang sama di Bumi dan di Bulan?",
        aTitle: "Jawapan",
        a1:
          "Tidak sama. Walaupun objek itu sama dan mempunyai jisim yang sama, daya graviti di Bumi dan di Bulan adalah berbeza.\nDi Bumi: graviti lebih kuat, jadi berat objek lebih besar.\nDi Bulan: graviti lebih lemah, jadi berat objek lebih kecil.",
        speak: "Dengar",
        speakAll: "Dengar semua",
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
    <div className="ans3a-page">
      <img className="ans3a-bg" src={assets.bg} alt="background" />
      <div className="ans3a-overlay" />

      <div className="ans3a-langFloating">
        <div className="ans3a-lang">
          <button className={`ans3a-chip ${lang === "th" ? "active" : ""}`} onClick={() => setLang("th")} type="button">
            {t.chipTh}
          </button>
          <button className={`ans3a-chip ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")} type="button">
            {t.chipEn}
          </button>
          <button className={`ans3a-chip ${lang === "ms" ? "active" : ""}`} onClick={() => setLang("ms")} type="button">
            {t.chipMs}
          </button>
        </div>
      </div>

      <div className="ans3a-stage">
        <img className="ans3a-character" src={assets.character} alt="character" draggable="false" />

        <div className="ans3a-board">
          {assets.boardFrame ? <img className="ans3a-frame" src={assets.boardFrame} alt="frame" /> : null}

          <div className="ans3a-boardInner">
            <div className="ans3a-header">
              <div className="ans3a-titleWrap">
                {assets.sticker ? (
                  <img className="ans3a-sticker" src={assets.sticker} alt="sticker" />
                ) : (
                  <span className="ans3a-stickerEmoji">📣</span>
                )}
                <div>
                  <div className="ans3a-title">{t.title}</div>
                  <div className="ans3a-sub">{t.sub}</div>
                </div>
              </div>

              <button className="ans3a-btn soft" type="button" onClick={speakAll}>
                🔊 {t.speakAll}
              </button>
            </div>

            <div className="ans3a-cards">
              <div className="ans3a-card yellow">
                <div className="ans3a-cardTop">
                  <div className="ans3a-q">{t.q1}</div>
                  <button className="ans3a-miniSpeak" type="button" onClick={() => speak(t.q1)} title={t.speak}>
                    🔊
                  </button>
                </div>
              </div>

              <div className="ans3a-card green">
                <div className="ans3a-cardTop">
                  <div className="ans3a-q">{t.aTitle}</div>
                  <button className="ans3a-miniSpeak" type="button" onClick={() => speak(t.a1)} title={t.speak}>
                    🔊
                  </button>
                </div>
                <div className="ans3a-a">
                  {t.a1.split("\n").map((line, idx) => (
                    <div className="ans3a-line" key={idx}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ans3a-navDock">
        <div className="ans3a-navMiniRow">
          <button className="ans3a-navMiniBtn" type="button" onClick={() => navigate(BACK_PATH)} title={t.back}>
            ←
          </button>
          <button className="ans3a-navMiniBtn" type="button" onClick={() => navigate(NEXT_PATH)} title={t.next}>
            →
          </button>
        </div>
      </div>
    </div>
  );
}
