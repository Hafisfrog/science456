import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp2Answer.css";

export default function P4GravityExp2Answer() {
  const navigate = useNavigate();

  // ✅ ปรับ path ให้ตรงโปรเจกต์คุณ
  const BACK_PATH = "/p4/gravity/exp2/result";
  const NEXT_PATH = "/p4/gravity"; // หรือหน้าถัดไปของคุณ

  // language
  const [lang, setLang] = useState("th"); // th | en | ms

  // ✅ เปลี่ยนรูปเองได้ทั้งหมด (public/images/...)
  const assets = useMemo(() => {
    return {
      bg: "/images/p4/exp2/bg-lab.jpg",
      boardFrame: "/images/p4/exp2/ball1.png", // ถ้าไม่มีให้ใส่ ""
      sticker: "/images/p4/exp2/sticker-megaphone.png", // ถ้าไม่มีให้ใส่ ""
      character: "/images/p4/exp1/gunkru.png", // ถ้าไม่มีให้ใส่ ""
    };
  }, []);

  // ✅ text dictionary
  const text = useMemo(() => {
    return {
      th: {
        title: "คำถามนี้มีคำตอบ",
        sub: "อ่านเฉลยแล้วลองอธิบายด้วยคำพูดของตัวเองนะ",
        q1:
          "1. เคยสงสัยหรือไม่ว่า ทำไมวัตถุทุกชนิดจึงตกลงสู่พื้นโลก และเหตุใดวัตถุแต่ละชนิดจึงมีน้ำหนักไม่เท่ากัน",
        aTitle: "เฉลย",
        a1:
          "วัตถุทุกชนิดตกลงสู่พื้นโลก 👉 เพราะ “แรงโน้มถ่วงของโลก”\n" +
          "วัตถุมีน้ำหนักไม่เท่ากัน 👉 เพราะ “มวลของวัตถุไม่เท่ากัน”",
        // tip:
        //   "ทิป: ลองยกตัวอย่างวัตถุใกล้ตัว แล้วเปรียบเทียบว่า “ชิ้นไหนหนักกว่า” เพราะอะไร",
        // speakAll: "ฟังเฉลยทั้งหมด",
        speak: "ฟัง",
        // back: "ย้อนกลับ",
        // next: "ต่อไป",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
      },
      en: {
        title: "Answers",
        sub: "Read and explain in your own words.",
        q1:
          "1. Have you wondered why all objects fall to the ground, and why different objects have different weights?",
        aTitle: "Answer",
        a1:
          "All objects fall to the ground 👉 because of “Earth’s gravity”.\n" +
          "Objects have different weights 👉 because their “masses are different”.",
        // tip: "Tip: Pick objects nearby and compare which one is heavier—and why.",
        // speakAll: "Listen to all",
        speak: "Listen",
        // back: "Back",
        // next: "Next",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
      },
      ms: {
        title: "Jawapan",
        sub: "Baca dan cuba terangkan dengan kata-kata sendiri.",
        q1:
          "1. Pernah tertanya-tanya mengapa semua objek jatuh ke tanah, dan mengapa objek berbeza mempunyai berat yang berbeza?",
        aTitle: "Jawapan",
        a1:
          "Semua objek jatuh ke tanah 👉 kerana “graviti Bumi”.\n" +
          "Objek mempunyai berat berbeza 👉 kerana “jisimnya berbeza”.",
        // tip: "Tip: Pilih objek berdekatan dan bandingkan yang mana lebih berat—dan sebabnya.",
        // speakAll: "Dengar semua",
        speak: "Dengar",
        // back: "Kembali",
        // next: "Seterusnya",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
      },
    };
  }, []);

  const t = text[lang];

  // ✅ speech
  const speakingRef = useRef(false);

  const speak = (msg) => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();

      const u = new SpeechSynthesisUtterance(msg);
      u.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";

      speakingRef.current = true;
      u.onend = () => (speakingRef.current = false);

      window.speechSynthesis.speak(u);
    } catch {
      // ignore
    }
  };

  const speakAll = () => {
    const msg =
      `${t.title}\n${t.sub}\n\n` +
      `${t.q1}\n\n` +
      `${t.aTitle}\n${t.a1}\n\n` +
      `${t.tip}`;
    speak(msg);
  };

  return (
    <div className="ans2e-page">
      {/* BG */}
      <img className="ans2e-bg" src={assets.bg} alt="background" />
      <div className="ans2e-overlay" />

      {/* stage */}
      <div className="ans2e-stage">
        {/* character (optional) */}
        {assets.character ? (
          <img className="ans2e-character" src={assets.character} alt="character" draggable="false" />
        ) : null}

        {/* board */}
        <div className="ans2e-board">
          {assets.boardFrame ? <img className="ans2e-frame" src={assets.boardFrame} alt="frame" /> : null}

          <div className="ans2e-boardInner">
            {/* header */}
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

              {/* ปุ่มฟังทั้งหมด (อยู่บนกระดาน) */}
              {/* <button className="ans2e-btn soft" type="button" onClick={speakAll} title={t.speakAll}>
                🔊 {t.speakAll}
              </button> */}
            </div>

            {/* content */}
            <div className="ans2e-cards">
              {/* Q */}
              <div className="ans2e-card yellow">
                <div className="ans2e-cardTop">
                  <div className="ans2e-q">{t.q1}</div>
                  <button className="ans2e-miniSpeak" type="button" onClick={() => speak(t.q1)} title={t.speak}>
                    🔊
                  </button>
                </div>
              </div>

              {/* A */}
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

              {/* Tip */}
              {/* <div className="ans2e-tip">
                <div className="ans2e-tipIcon">💡</div>
                <div className="ans2e-tipText">{t.tip}</div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ LANG BAR: ซ้ายล่าง */}
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

        {/* <button className="ans2e-audioDock" type="button" onClick={speakAll} title={t.speakAll}>
          🔊
        </button> */}
      </div>

      {/* ✅ NAV: นอกกรอบ ขวาล่าง (ย้อนกลับ + ต่อไป) */}
      <div className="ans2e-navDock">
        <button className="ans2e-navBtn back" type="button" onClick={() => navigate(BACK_PATH)} title={t.back}>
          <span className="ans2e-navIcon">‹</span>
          <span className="ans2e-navText">{t.back}</span>
        </button>

        <button className="ans2e-navBtn next" type="button" onClick={() => navigate(NEXT_PATH)} title={t.next}>
          <span className="ans2e-navText">{t.next}</span>
          <span className="ans2e-navIcon">›</span>
        </button>
      </div>
    </div>
  );
}
