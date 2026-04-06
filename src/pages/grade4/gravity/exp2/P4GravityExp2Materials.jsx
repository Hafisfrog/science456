import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../exp1/P4GravityExp1Materials.css";
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
      ball: "/images/p4/exp1/soccer-ball.png",
      bocce: "/images/p4/exp1/bocce.png",
      feather: "/images/p4/exp1/feather.png",
      springScale: "/images/p4/exp3/spring-scale.png",
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
    <div className="exp1m-page exp2m-page">
      <img
        src="/images/p4/backgrounds-p4.jpg"
        alt="Laboratory background"
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.9]"
      />
      <div className="exp1m-overlay" />

      <div className="absolute left-[18px] right-[18px] top-[18px] z-[6] flex items-center justify-center">
        <div className="flex max-w-[min(1120px,calc(100%-240px))] items-center gap-3 rounded-[18px] border-2 border-slate-900/10 bg-white/95 px-[18px] py-[14px] shadow-[0_18px_40px_rgba(0,0,0,.22)] max-[720px]:max-w-[calc(100%-40px)]">
          <div className="text-[26px] font-black leading-tight text-slate-900 max-[980px]:text-[20px]">
            {t.title}
          </div>
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

      <div className="absolute left-[18px] top-[118px] z-[6] flex items-center gap-[10px] rounded-2xl border-2 border-slate-900/15 bg-white/90 px-[14px] py-3 shadow-[0_16px_34px_rgba(0,0,0,.18)] max-[980px]:top-[126px] max-[720px]:top-[132px]">
        <span className="text-[22px] font-black text-slate-900">{t.badge}</span>
      </div>

      <div className="exp1m-center">
        <div className="max-h-full overflow-y-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="exp1m-grid">
            {t.items.map((it) => (
              <div key={it.key} className="exp1m-card">
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
                    <div className="exp1m-name whitespace-nowrap text-center tracking-[-0.02em]">
                      {it.name}
                    </div>
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
      </div>

      <div className="exp1m-langBar">
        <button
          className={`exp1m-chip ${lang === "th" ? "active" : ""}`}
          onClick={() => setLang("th")}
          type="button"
        >
          {t.chipTh}
        </button>
        <button
          className={`exp1m-chip ${lang === "en" ? "active" : ""}`}
          onClick={() => setLang("en")}
          type="button"
        >
          {t.chipEn}
        </button>
        <button
          className={`exp1m-chip ${lang === "ms" ? "active" : ""}`}
          onClick={() => setLang("ms")}
          type="button"
        >
          {t.chipMs}
        </button>
      </div>

      <div className="exp1m-actionRow">
        <button className="exp1m-backBtn" type="button" onClick={() => navigate(BACK_PATH)}>
          « {t.back}
        </button>

        <button className="exp1m-nextBtn" type="button" onClick={() => navigate(NEXT_PATH)}>
          {t.next} »
        </button>
      </div>
    </div>
  );
}
