import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp2Materials.css";

export default function P4GravityExp2Materials() {
  const navigate = useNavigate();

  // ✅ ปรับให้ตรงโปรเจกต์คุณ
  const BACK_PATH = "/p4/gravity/exp2/vocab";
  const NEXT_PATH = "/p4/gravity/exp2/steps";

  // th | en | ms
  const [lang, setLang] = useState("th");

  // ✅ เปลี่ยนรูปเองได้ทั้งหมด (public/images/...)
  const assets = useMemo(() => {
    return {
      bg: "/images/p4/exp1/bg-lab.jpg",
      // หัวข้อด้านบน (ถ้าไม่มีปล่อยว่างได้)
    //   titlePlate: "/images/p4/exp1/gunkru.png",

      // ตัวละคร
      character: "/images/p4/exp2/ajang.png",

      // การ์ดอุปกรณ์ (เปลี่ยนรูปเองได้)
      ball: "/images/p4/exp1/soccer-ball.png",
      bocce: "/images/p4/exp1/bocce.png",
      feather: "/images/p4/exp1/feather.png",
      springScale: "/images/p4/exp2/spring-scale.png",
    };
  }, []);

  // ✅ คำแปล
  const text = useMemo(() => {
    return {
      th: {
        title: "การทดลองที่ 2 เรื่อง แรงดึงดูดของโลกกับน้ำหนักของวัตถุ",
        badge: "วัสดุอุปกรณ์",
        back: "ย้อนกลับ",
        next: "ต่อไป",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        speakAll: "ฟังทั้งหมด",
        items: [
          { key: "ball", name: "ลูกบอล" },
          { key: "bocce", name: "ลูกเปตอง" },
          { key: "feather", name: "ขนนก" },
          { key: "springScale", name: "เครื่องชั่งสปริง" },
        ],
      },
      en: {
        title: "Experiment 2: Earth's Gravity and Object Weight",
        badge: "Materials",
        back: "Back",
        next: "Next",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        speakAll: "Listen all",
        items: [
          { key: "ball", name: "Ball" },
          { key: "bocce", name: "Bocce Ball" },
          { key: "feather", name: "Feather" },
          { key: "springScale", name: "Spring Scale" },
        ],
      },
      ms: {
        title: "Eksperimen 2: Graviti Bumi dan Berat Objek",
        badge: "Bahan & Peralatan",
        back: "Kembali",
        next: "Seterusnya",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        speakAll: "Dengar semua",
        items: [
          { key: "ball", name: "Bola" },
          { key: "bocce", name: "Bola Bocce" },
          { key: "feather", name: "Bulu" },
          { key: "springScale", name: "Penimbang Spring" },
        ],
      },
    };
  }, []);

  const t = text[lang];

  // ======= TTS =======
  const speakingKeyRef = useRef(null);

  const voiceLang = () => (lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US");

  const stopSpeak = () => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      speakingKeyRef.current = null;
    } catch {
      // ignore
    }
  };

  const speak = (msg, key) => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();

      const u = new SpeechSynthesisUtterance(msg);
      u.lang = voiceLang();

      speakingKeyRef.current = key;
      u.onend = () => {
        speakingKeyRef.current = null;
      };

      window.speechSynthesis.speak(u);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    stopSpeak();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const isSpeaking = (key) => speakingKeyRef.current === key;

  const imgOf = (key) => {
    if (key === "ball") return assets.ball;
    if (key === "bocce") return assets.bocce;
    if (key === "feather") return assets.feather;
    if (key === "springScale") return assets.springScale;
    return "";
  };

  const speakAll = () => {
    const list = t.items.map((x) => x.name).join(", ");
    const msg = `${t.title}\n${t.badge}\n${list}`;
    speak(msg, "all");
  };

  return (
    <div className="exp2m-page">
      <img className="exp2m-bg" src={assets.bg} alt="bg" />
      <div className="exp2m-overlay" />

      {/* ===== TOP TITLE (center) ===== */}
      <div className="exp2m-topTitle">
        {/* {assets.titlePlate ? (
          <img className="exp2m-titlePlate" src={assets.titlePlate} alt="title plate" />
        ) : null} */}

        <div className="exp2m-titleBox">
          <div className="exp2m-titleText">{t.title}</div>
          {/* ✅ ปุ่มเสียงอยู่หลังข้อความ */}
          <button
            className={`exp2m-speak ${isSpeaking("title") ? "speaking" : ""}`}
            type="button"
            onClick={() => speak(t.title, "title")}
            title="Speak"
          >
            🔊
          </button>
        </div>
      </div>

      {/* ===== BADGE LEFT TOP ===== */}
      <div className="exp2m-badge">
        <span className="exp2m-badgeText">{t.badge}</span>
        {/* ✅ ปุ่มเสียงอยู่หลังข้อความ */}
        <button
          className={`exp2m-speak mini ${isSpeaking("badge") ? "speaking" : ""}`}
          type="button"
          onClick={() => speak(t.badge, "badge")}
          title="Speak"
        >
          🔊
        </button>
      </div>

      {/* ===== MAIN (cards centered 2x2) ===== */}
      <div className="exp2m-center">
        <div className="exp2m-grid">
          {t.items.map((it) => (
            <div className="exp2m-card" key={it.key}>
              <div className="exp2m-cardInner">
                <div className="exp2m-imgBox">
                  <img
                    className="exp2m-img"
                    src={imgOf(it.key)}
                    alt={it.name}
                    draggable="false"
                    onError={(e) => {
                      e.currentTarget.style.opacity = "0";
                    }}
                  />
                </div>

                <div className="exp2m-nameRow">
                  <div className="exp2m-name">{it.name}</div>
                  {/* ✅ ปุ่มเสียงอยู่หลังข้อความ */}
                  <button
                    className={`exp2m-speak ${isSpeaking(it.key) ? "speaking" : ""}`}
                    type="button"
                    onClick={() => speak(it.name, it.key)}
                    title="Speak"
                  >
                    🔊
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== CHARACTER RIGHT BOTTOM ===== */}
      <img
        className="exp2m-character"
        src={assets.character}
        alt="character"
        draggable="false"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />

      {/* ===== BOTTOM LEFT: LANG + SPEAK ALL ===== */}
      <div className="exp2m-langBar">
        <button
          className={`exp2m-chip ${lang === "th" ? "active" : ""}`}
          onClick={() => setLang("th")}
          type="button"
        >
          {t.chipTh}
        </button>
        <button
          className={`exp2m-chip ${lang === "en" ? "active" : ""}`}
          onClick={() => setLang("en")}
          type="button"
        >
          {t.chipEn}
        </button>
        <button
          className={`exp2m-chip ${lang === "ms" ? "active" : ""}`}
          onClick={() => setLang("ms")}
          type="button"
        >
          {t.chipMs}
        </button>

        {/* <button
          className={`exp2m-speakAll ${isSpeaking("all") ? "speaking" : ""}`}
          type="button"
          onClick={speakAll}
          title={t.speakAll}
        >
          🔊
        </button> */}
      </div>

      {/* ===== BACK (top-left small) ===== */}
      <button className="exp2m-backBtn" type="button" onClick={() => navigate(BACK_PATH)}>
        ← {t.back}
      </button>

      {/* ===== NEXT (bottom-right) ===== */}
      <button className="exp2m-nextBtn" type="button" onClick={() => navigate(NEXT_PATH)}>
        {t.next} »
      </button>
    </div>
  );
}
