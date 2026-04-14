import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../exp1/P4GravityExp1Materials.css";
import "../exp2/P4GravityExp2Materials.css";

export default function P4GravityExp3Materials() {
  const navigate = useNavigate();

  const BACK_PATH = "/p4/gravity/exp3/vocab";
  const NEXT_PATH = "/p4/gravity/exp3/steps";

  const [lang, setLang] = useState("th");
  const speakingKeyRef = useRef(null);

  const assets = useMemo(() => {
    return {
      book: "/images/p4/exp3/book.png",
      rock: "/images/p4/exp3/rock.png",
      mango: "/images/p4/exp3/mango.png",
      springScale: "/images/p4/exp3/spring-scale.png",
    };
  }, []);

  const text = useMemo(() => {
    return {
      th: {
        title: "การทดลองที่ 3 เรื่อง แรงดึงดูดของโลกกับแรงดึงดูดของดวงจันทร์",
        badge: "วัสดุอุปกรณ์",
        back: "ย้อนกลับ",
        next: "ต่อไป",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        items: [
          { key: "book", name: "หนังสือ" },
          { key: "rock", name: "ก้อนหิน" },
          { key: "mango", name: "มะม่วง" },
          { key: "springScale", name: "เครื่องชั่งสปริง" },
        ],
      },
      en: {
        title: "Experiment 3: Earth's Gravity and the Moon's Gravity",
        badge: "Materials",
        back: "Back",
        next: "Next",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        items: [
          { key: "book", name: "Book" },
          { key: "rock", name: "Rock" },
          { key: "mango", name: "Mango" },
          { key: "springScale", name: "Spring Scale" },
        ],
      },
      ms: {
        title: "Eksperimen 3: Graviti Bumi dan Graviti Bulan",
        badge: "Bahan & Peralatan",
        back: "Kembali",
        next: "Seterusnya",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        items: [
          { key: "book", name: "Buku" },
          { key: "rock", name: "Batu" },
          { key: "mango", name: "Mangga" },
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

  const imgOf = (key) => assets[key] || "";

  return (
    <div className="exp1m-page exp2m-page">
      <img
        src="/images/p4/backgrounds-p4.jpg"
        alt="Laboratory background"
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.9]"
      />
      <div className="exp1m-overlay" />

      <div className="absolute left-[18px] right-[18px] top-[18px] z-[6] flex items-center justify-center">
        <div className="flex max-w-[min(1260px,calc(100%-180px))] items-center gap-3 rounded-[18px] border-2 border-slate-900/10 bg-white/95 px-[24px] py-[16px] shadow-[0_18px_40px_rgba(0,0,0,.22)] max-[980px]:max-w-[min(1120px,calc(100%-140px))] max-[720px]:max-w-[calc(100%-40px)] max-[720px]:px-[18px]">
          <div className="text-[32px] font-black leading-tight text-slate-900 max-[980px]:text-[24px] max-[720px]:text-[20px]">
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

      <div className="absolute left-[132px] top-[138px] z-[6] flex items-center gap-[10px] rounded-2xl border-2 border-slate-900/15 bg-white/90 px-[18px] py-3 shadow-[0_16px_34px_rgba(0,0,0,.18)] max-[980px]:left-[36px] max-[980px]:top-[126px] max-[720px]:left-[18px] max-[720px]:top-[132px]">
        <span className="text-[28px] font-black text-slate-900 max-[980px]:text-[25px] max-[720px]:text-[22px]">{t.badge}</span>
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
          className={`exp1m-chip ${lang === "ms" ? "active" : ""}`}
          onClick={() => setLang("ms")}
          type="button"
        >
          {t.chipMs}
        </button>
        <button
          className={`exp1m-chip ${lang === "en" ? "active" : ""}`}
          onClick={() => setLang("en")}
          type="button"
        >
          {t.chipEn}
        </button>
      </div>

      <div className="absolute bottom-[18px] right-[18px] z-[30] flex items-center gap-3 max-[720px]:bottom-[12px] max-[720px]:right-[12px] max-[720px]:gap-2">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[10px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          type="button"
          onClick={() => navigate(BACK_PATH)}
        >
          « {t.back}
        </button>

        <button
          className="rounded-[18px] bg-[linear-gradient(135deg,#ef4444,#b91c1c)] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[12px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          type="button"
          onClick={() => navigate(NEXT_PATH)}
        >
          {t.next} »
        </button>
      </div>
    </div>
  );
}
