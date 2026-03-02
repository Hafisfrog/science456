import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp1Answer.css";

export default function P4GravityExp1Answer() {
  const navigate = useNavigate();

  // ✅ ปรับ path ให้ตรงโปรเจกต์คุณ
  const BACK_PATH = "/p4/gravity/exp1/result";
  const NEXT_PATH = "/p4/gravity"; // หรือหน้าถัดไปที่คุณต้องการ

  // ภาษา
  const [lang, setLang] = useState("th"); // th | en | ms

  // ✅ เปลี่ยนรูปเองได้ทั้งหมด (public/images/...)
  const assets = useMemo(() => {
    return {
      bg: "/images/p4/exp1/bg-lab.jpg",               // พื้นหลัง
      boardFrame: "/images/p4/exp1/board-frame.png",  // กรอบกระดาน (ถ้าไม่มีปล่อยว่างได้)
      sticker: "/images/p4/exp1/sticker-star.png",    // สติกเกอร์หัวข้อ (ถ้าไม่มีปล่อยว่างได้)
      character: "/images/p4/exp1/gunkru.png",       // ตัวละคร
    };
  }, []);

  // ข้อความหลายภาษา
  const text = useMemo(() => {
    return {
      th: {
        title: "คำถามนี้มีคำตอบ",
        sub: "อ่านเฉลยแล้วลองอธิบายด้วยคำพูดของตัวเองนะ",
        q1: "1. เคยสงสัยไหมว่า...ทำไมลูกบอลถึงตกลงพื้น ไม่ลอยขึ้นฟ้า?",
        a1:
          "โลกของเรามีแรงดึงดูดที่เรียกว่า “แรงโน้มถ่วง” ซึ่งจะดึงวัตถุทุกชนิดให้เคลื่อนเข้าหาศูนย์กลางของโลก เมื่อเราปล่อยลูกบอลจากมือ แรงโน้มถ่วงของโลกจะดึงลูกบอลลงด้านล่าง ลูกบอลจึงตกลงสู่พื้นดิน",
        q2: "2. เมื่อปล่อยวัตถุ วัตถุจะเคลื่อนที่ไปทางใด? และอะไรเป็นแรงที่ทำให้วัตถุตกลงสู่พื้น?",
        a2a_b: "ทิศทางการเคลื่อนที่ของวัตถุ:",
        a2a: "ลงสู่พื้นโลก",
        a2b_b: "แรงที่ทำให้วัตถุตก:",
        a2b: "แรงโน้มถ่วงของโลก",
        // speakAll: "ฟังเฉลยทั้งหมด",
        speak: "ฟัง",
        back: "ย้อนกลับ",
        next: "ต่อไป",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        // tip: "ทิป: ลองยกตัวอย่างวัตถุใกล้ตัว แล้วบอกว่า “ทำไมถึงตกลงพื้น”",
      },
      en: {
        title: "Answers",
        sub: "Read and explain in your own words.",
        q1: "1. Have you ever wondered… why does a ball fall down instead of floating up?",
        a1:
          "Earth has an attractive force called gravity. It pulls objects toward the center of Earth. When we release a ball, gravity pulls it downward, so it falls to the ground.",
        q2: "2. When an object is released, which direction does it move? What force makes it fall?",
        a2a_b: "Direction of motion:",
        a2a: "Down toward Earth",
        a2b_b: "Force that makes it fall:",
        a2b: "Earth’s gravity",
        // speakAll: "Listen to all",
        speak: "Listen",
        back: "Back",
        next: "Next",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        // tip: "Tip: Pick an object nearby and explain why it falls.",
      },
      ms: {
        title: "Jawapan",
        sub: "Baca dan cuba terangkan dengan kata-kata sendiri.",
        q1: "1. Pernah tertanya-tanya… mengapa bola jatuh ke tanah dan tidak terapung ke atas?",
        a1:
          "Bumi mempunyai daya tarikan yang dipanggil graviti. Ia menarik objek ke arah pusat Bumi. Apabila bola dilepaskan, graviti menariknya ke bawah, lalu bola jatuh ke tanah.",
        q2: "2. Apabila objek dilepaskan, ia bergerak ke arah mana? Daya apa yang menyebabkan ia jatuh?",
        a2a_b: "Arah pergerakan:",
        a2a: "Ke bawah menuju tanah",
        a2b_b: "Daya yang menyebabkan jatuh:",
        a2b: "Graviti Bumi",
        // speakAll: "Dengar semua",
        speak: "Dengar",
        back: "Kembali",
        next: "Seterusnya",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        // tip: "Tip: Pilih objek berdekatan dan jelaskan mengapa ia jatuh.",
      },
    };
  }, []);

  const t = text[lang];

  // ✅ เสียงอ่าน
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
      `${t.q1}\n${t.a1}\n\n` +
      `${t.q2}\n${t.a2a_b} ${t.a2a}\n${t.a2b_b} ${t.a2b}\n\n` +
      `${t.tip}`;
    speak(msg);
  };

  return (
    <div className="ans2-page">
      {/* BG */}
      <img className="ans2-bg" src={assets.bg} alt="background" />

      {/* soft overlay */}
      <div className="ans2-overlay" />

      {/* ✅ แถบแปลภาษา ย้ายไปซ้ายล่าง */}
      <div className="ans2-langFloating">
        <div className="ans2-lang">
          <button
            className={`ans2-chip ${lang === "th" ? "active" : ""}`}
            onClick={() => setLang("th")}
            type="button"
          >
            {t.chipTh}
          </button>
          <button
            className={`ans2-chip ${lang === "en" ? "active" : ""}`}
            onClick={() => setLang("en")}
            type="button"
          >
            {t.chipEn}
          </button>
          <button
            className={`ans2-chip ${lang === "ms" ? "active" : ""}`}
            onClick={() => setLang("ms")}
            type="button"
          >
            {t.chipMs}
          </button>

          {/* <button className="ans2-audioMain" type="button" onClick={speakAll} title={t.speakAll}>
            🔊
          </button> */}
        </div>
      </div>

      {/* stage */}
      <div className="ans2-stage">
        {/* character */}
        <img className="ans2-character" src={assets.character} alt="character" draggable="false" />

        {/* board */}
        <div className="ans2-board">
          {/* optional frame image */}
          {assets.boardFrame && <img className="ans2-frame" src={assets.boardFrame} alt="frame" />}

          <div className="ans2-boardInner">
            {/* header */}
            <div className="ans2-header">
              <div className="ans2-titleWrap">
                {assets.sticker ? (
                  <img className="ans2-sticker" src={assets.sticker} alt="sticker" />
                ) : (
                  <span className="ans2-stickerEmoji">✨</span>
                )}
                <div>
                  <div className="ans2-title">{t.title}</div>
                  <div className="ans2-sub">{t.sub}</div>
                </div>
              </div>

              {/* <button className="ans2-btn soft" type="button" onClick={speakAll}>
                🔊 {t.speakAll}
              </button> */}
            </div>

            {/* cards */}
            <div className="ans2-cards">
              {/* Q1 */}
              <div className="ans2-card yellow">
                <div className="ans2-cardTop">
                  <div className="ans2-q">{t.q1}</div>
                  <button
                    className="ans2-miniSpeak"
                    type="button"
                    onClick={() => speak(`${t.q1}\n${t.a1}`)}
                    title={t.speak}
                  >
                    🔊
                  </button>
                </div>
                <div className="ans2-a">{t.a1}</div>
              </div>

              {/* Q2 */}
              <div className="ans2-card blue">
                <div className="ans2-cardTop">
                  <div className="ans2-q">{t.q2}</div>
                  <button
                    className="ans2-miniSpeak"
                    type="button"
                    onClick={() =>
                      speak(`${t.q2}\n${t.a2a_b} ${t.a2a}\n${t.a2b_b} ${t.a2b}`)
                    }
                    title={t.speak}
                  >
                    🔊
                  </button>
                </div>

                <div className="ans2-a">
                  <div className="ans2-line">
                    <span className="ans2-bold">{t.a2a_b}</span> {t.a2a}
                  </div>
                  <div className="ans2-line">
                    <span className="ans2-bold">{t.a2b_b}</span> {t.a2b}
                  </div>
                </div>
              </div>

              {/* Tip */}
              {/* <div className="ans2-tip">
                <div className="ans2-tipIcon">💡</div>
                <div className="ans2-tipText">{t.tip}</div>
              </div> */}
            </div>

          </div>
        </div>
      </div>

      <div className="ans2-navDock">
        {/* <button className="ans2-next" type="button" onClick={() => navigate(NEXT_PATH)}>
          {t.next} »
        </button> */}

        <div className="ans2-navMiniRow">
          <button className="ans3a-navMiniBtn" type="button" onClick={() => navigate(BACK_PATH)} title={t.back}>
            ◀
          </button>
          <button className="ans3a-navMiniBtn" type="button" onClick={() => navigate(NEXT_PATH)} title={t.next}>
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}
