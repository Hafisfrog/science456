import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";

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
      feather: "/images/p4/exp2/feather2.png",
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
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
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
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
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
    <div className="relative h-screen w-screen overflow-hidden bg-[#eef2ff] font-['Prompt',sans-serif]">
      <HomeButton />

      <img
        src="/images/p4/backgrounds-p4.jpg"
        alt="Laboratory background"
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.9]"
      />

      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(1100px 700px at 50% 35%, rgba(255,255,255,.35), rgba(255,255,255,0) 65%), linear-gradient(180deg, rgba(10,16,32,.25), rgba(10,16,32,.70))",
        }}
      />

      {/* top title */}
      <div className="absolute left-[18px] right-[18px] top-[18px] z-[6] flex items-center justify-center">
        <div className="flex max-w-[min(1240px,calc(100%-180px))] items-center gap-4 rounded-[20px] border-2 border-slate-900/10 bg-white/95 px-[24px] py-[16px] shadow-[0_18px_40px_rgba(0,0,0,.22)] max-[720px]:max-w-[calc(100%-40px)]">
          <div className="text-[32px] font-black leading-tight text-slate-900 max-[980px]:text-[24px]">
            {t.title}
          </div>

          <button
            className={`h-12 w-12 shrink-0 rounded-[14px] text-[20px] shadow-[inset_0_-4px_0_rgba(0,0,0,.12),0_16px_28px_rgba(0,0,0,.16)] transition hover:-translate-y-0.5 hover:shadow-[inset_0_-4px_0_rgba(0,0,0,.12),0_20px_34px_rgba(0,0,0,.20)] active:translate-y-[1px] ${
              isSpeaking("title") ? "bg-green-200 saturate-110" : "bg-blue-100"
            }`}
            type="button"
            onClick={() => speak(t.title, "title")}
            title="Speak"
          >
            🔊
          </button>
        </div>
      </div>

      {/* badge */}
      <div className="absolute left-[140px] top-[118px] z-[6] flex items-center gap-[10px] rounded-2xl border-2 border-slate-900/15 bg-white/90 px-[14px] py-3 shadow-[0_16px_34px_rgba(0,0,0,.18)] max-[980px]:left-[36px] max-[980px]:top-[126px] max-[720px]:left-[18px] max-[720px]:top-[132px]">
        <span className="text-[28px] font-black text-slate-900">{t.badge}</span>
      </div>

      {/* center */}
      <div className="absolute bottom-[110px] left-[18px] right-[18px] top-[182px] z-[3] flex items-center justify-center max-[980px]:top-[210px] max-[720px]:bottom-[140px] max-[720px]:top-[220px]">
        <div className="max-h-full overflow-y-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="grid w-[min(760px,88vw)] grid-cols-3 justify-items-center gap-[12px] max-[980px]:w-[min(640px,90vw)] max-[980px]:grid-cols-2 max-[720px]:w-[min(420px,88vw)] max-[720px]:grid-cols-1 max-[720px]:gap-[14px]">
            {t.items.map((it) => (
              <div key={it.key} className="flex w-full max-w-[220px] justify-center">
                <div className="flex w-[82%] flex-col items-center rounded-[16px] border-[3px] border-slate-600/45 bg-white/90 px-[12px] pb-[10px] pt-[12px] shadow-[0_18px_36px_rgba(0,0,0,.16)]">
                  <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border-[3px] border-slate-600/35 bg-[linear-gradient(180deg,#fff,#f3f4f6)]">
                    <img
                      className="h-full w-full select-none object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,.18)]"
                      src={imgOf(it.key)}
                      alt={it.name}
                      draggable="false"
                      onError={(e) => {
                        e.currentTarget.style.opacity = "0";
                      }}
                    />
                  </div>

                  <div className="mt-[10px] flex items-center justify-center gap-[10px]">
                    <div className="whitespace-nowrap text-center text-[18px] font-black leading-tight tracking-[-0.02em] text-slate-900 max-[980px]:text-[17px] max-[720px]:text-[16px]">
                      {it.name}
                    </div>

                    <button
                      className={`h-10 w-10 rounded-xl text-base shadow-[inset_0_-4px_0_rgba(0,0,0,.12),0_16px_28px_rgba(0,0,0,.16)] transition hover:-translate-y-0.5 hover:shadow-[inset_0_-4px_0_rgba(0,0,0,.12),0_20px_34px_rgba(0,0,0,.20)] active:translate-y-[1px] ${
                        isSpeaking(it.key) ? "bg-green-200 saturate-110" : "bg-blue-100"
                      }`}
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

      {/* lang bar */}
      <div className="absolute bottom-[18px] left-[18px] z-[7] flex items-center gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_18px_40px_rgba(0,0,0,.22)]">
        <button
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition ${
            lang === "th"
              ? "bg-[#bfe0ff] text-slate-900"
              : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
          }`}
          onClick={() => setLang("th")}
          type="button"
        >
          {t.chipTh}
        </button>

        <button
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition ${
            lang === "ms"
              ? "bg-[#bfe0ff] text-slate-900"
              : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
          }`}
          onClick={() => setLang("ms")}
          type="button"
        >
          {t.chipMs}
        </button>

        <button
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition ${
            lang === "en"
              ? "bg-[#bfe0ff] text-slate-900"
              : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
          }`}
          onClick={() => setLang("en")}
          type="button"
        >
          {t.chipEn}
        </button>

        {/* <button
          className={`h-[46px] w-[46px] rounded-2xl text-[20px] shadow-[inset_0_-4px_0_rgba(0,0,0,.12),0_16px_28px_rgba(0,0,0,.16)] transition hover:-translate-y-0.5 hover:shadow-[inset_0_-4px_0_rgba(0,0,0,.12),0_20px_34px_rgba(0,0,0,.20)] active:translate-y-[1px] ${
            isSpeaking("all") ? "bg-green-200 saturate-110" : "bg-blue-100"
          }`}
          type="button"
          onClick={speakAll}
          title={t.speakAll}
        >
          🔊
        </button> */}
      </div>

      <div className="absolute bottom-[18px] right-[18px] z-[7] flex items-center gap-3 max-[720px]:bottom-[12px] max-[720px]:right-[12px] max-[720px]:gap-2">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          type="button"
          onClick={() => navigate(BACK_PATH)}
        >
          « {t.back}
        </button>

        <button
          className="rounded-[18px] bg-[linear-gradient(135deg,#ef4444,#b91c1c)] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          type="button"
          onClick={() => navigate(NEXT_PATH)}
        >
          {t.next} »
        </button>
      </div>
    </div>
  );
}
