import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp1Materials.css";

export default function P4GravityExp1Materials() {
  const navigate = useNavigate();

  const BACK_PATH = "/p4/gravity/sim1";
  const NEXT_PATH = "/p4/gravity/exp1/steps";

  const [lang, setLang] = useState("th");
  const speakingKeyRef = useRef(null);

  const assets = useMemo(() => {
    return {
      bg: "/images/p4/sim/sball.png",
      ball: "/images/p4/exp1/soccer-ball.png",
      bocce: "/images/p4/exp1/bocce.png",
      feather: "/images/p4/exp1/feather.png",
      timer: "/images/p4/exp1/timer.png",
      ruler: "/images/p4/exp1/ruler1.png",
      platform: "/images/p4/exp1/platform.png",
    };
  }, []);

  const text = useMemo(() => {
    return {
      th: {
        title: "การทดลองที่ 1 เรื่อง ผลของแรงโน้มถ่วง",
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
          { key: "timer", name: "นาฬิกาจับเวลา" },
          { key: "ruler", name: "ไม้วัดความสูง" },
          { key: "platform", name: "แผ่นไม้รอง" },
        ],
      },
      en: {
        title: "Experiment 1: Effect of Gravity",
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
          { key: "timer", name: "Stopwatch" },
          { key: "ruler", name: "Height Ruler" },
          { key: "platform", name: "Wooden Base" },
        ],
      },
      ms: {
        title: "Eksperimen 1: Kesan Graviti",
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
          { key: "timer", name: "Jam Randik" },
          { key: "ruler", name: "Pembaris Tinggi" },
          { key: "platform", name: "Tapak Kayu" },
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
    if (key === "timer") return assets.timer;
    if (key === "ruler") return assets.ruler;
    if (key === "platform") return assets.platform;
    return "";
  };

  const speakAll = () => {
    const list = t.items.map((x) => x.name).join(", ");
    speak(`${t.title}\n${t.badge}\n${list}`, "all");
  };

  return (
    <div className="exp1m-page">
      <img className="exp1m-bg" src={assets.bg} alt="bg" />
      <div className="exp1m-overlay" />

      <div className="exp1m-topTitle">
        <div className="exp1m-titleBox">
          <div className="exp1m-titleText">{t.title}</div>
          <button
            className={`exp1m-speak ${isSpeaking("title") ? "speaking" : ""}`}
            type="button"
            onClick={() => speak(t.title, "title")}
            title="Speak"
          >
            🔊
          </button>
        </div>
      </div>

      <div className="exp1m-badge">
        <span className="exp1m-badgeText">{t.badge}</span>
      </div>

      <div className="exp1m-center">
        <div className="exp1m-grid">
          {t.items.map((it) => (
            <div className="exp1m-card" key={it.key}>
              <div className="exp1m-cardInner">
                <div className="exp1m-imgBox">
                  <img
                    className="exp1m-img"
                    src={imgOf(it.key)}
                    alt={it.name}
                    draggable="false"
                    onError={(e) => {
                      e.currentTarget.style.opacity = "0";
                    }}
                  />
                </div>

                <div className="exp1m-nameRow">
                  <div className="exp1m-name">{it.name}</div>
                  <button
                    className={`exp1m-itemSpeak ${isSpeaking(it.key) ? "speaking" : ""}`}
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

      <div className="exp1m-langBar">
        <button className={`exp1m-chip ${lang === "th" ? "active" : ""}`} onClick={() => setLang("th")} type="button">
          {t.chipTh}
        </button>
        <button className={`exp1m-chip ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")} type="button">
          {t.chipEn}
        </button>
        <button className={`exp1m-chip ${lang === "ms" ? "active" : ""}`} onClick={() => setLang("ms")} type="button">
          {t.chipMs}
        </button>
        {/* <button
          className={`exp1m-speakAll ${isSpeaking("all") ? "speaking" : ""}`}
          type="button"
          onClick={speakAll}
          title={t.speakAll}
        >
          🔊
        </button> */}
      </div>

      <button className="exp1m-backBtn" type="button" onClick={() => navigate(BACK_PATH)}>
        ← {t.back}
      </button>

      <button className="exp1m-nextBtn" type="button" onClick={() => navigate(NEXT_PATH)}>
        {t.next} »
      </button>
    </div>
  );
}
