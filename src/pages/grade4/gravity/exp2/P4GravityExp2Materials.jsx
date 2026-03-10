import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp2Materials.css";

export default function P4GravityExp2Materials() {
  const navigate = useNavigate();

  const BACK_PATH = "/p4/gravity/exp2/vocab";
  const NEXT_PATH = "/p4/gravity/exp2/steps";

  const [lang, setLang] = useState("th");
  const speakingKeyRef = useRef(null);

  const assets = useMemo(() => {
    return {
      bg: "/images/p4/exp1/bg-lab.jpg",
      character: "/images/p4/exp2/ajang.png",
      ball: "/images/p4/exp1/soccer-ball.png",
      bocce: "/images/p4/exp1/bocce.png",
      feather: "/images/p4/exp1/feather.png",
      springScale: "/images/p4/exp2/spring-scale.png",
    };
  }, []);

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

  return (
    <div className="exp2m-page">
      <img className="exp2m-bg" src={assets.bg} alt="bg" />
      <div className="exp2m-overlay" />

      <div className="exp2m-topTitle">
        <div className="exp2m-titleBox">
          <div className="exp2m-titleText">{t.title}</div>
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

      <div className="exp2m-badge">
        <span className="exp2m-badgeText">{t.badge}</span>
        <button
          className={`exp2m-speak mini ${isSpeaking("badge") ? "speaking" : ""}`}
          type="button"
          onClick={() => speak(t.badge, "badge")}
          title="Speak"
        >
          🔊
        </button>
      </div>

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

      <img
        className="exp2m-character"
        src={assets.character}
        alt="character"
        draggable="false"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />

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
      </div>

      <div className="exp2m-actionRow">
        <button className="exp2m-backBtn" type="button" onClick={() => navigate(BACK_PATH)}>
          ← {t.back}
        </button>

        <button className="exp2m-nextBtn" type="button" onClick={() => navigate(NEXT_PATH)}>
          {t.next} »
        </button>
      </div>
    </div>
  );
}
