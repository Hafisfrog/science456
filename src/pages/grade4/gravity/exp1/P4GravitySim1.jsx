import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";

export default function P4GravitySim1() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const audioRef = useRef(null);

  const copy = useMemo(() => {
    return {
      th: {
        bubble: 'เคยสงสัยไหมว่า...ทำไมลูกบอลถึงตกลงพื้น ไม่ลอยขึ้นฟ้า ?',
        caption: "เริ่มการทดลอง",
        back: "ย้อนกลับ",
        next: "ต่อไป",
        // hint: "กด 🔊 เพื่อฟังคำถาม หรือกด ▶ เพื่อเริ่มการทดลอง",
        speakTitle: "ฟังเสียง",
      },
      en: {
        bubble: 'Have you ever wondered... why does a ball fall to the ground instead of floating up ? ',
        caption: "Start Experiment",
        back: "Back",
        next: "Next",
        // hint: "Tap 🔊 to listen, or press ▶ to start",
        speakTitle: "Listen",
      },
      ms: {
        bubble: 'Pernah terfikir... kenapa bola jatuh ke tanah, bukan terapung ke langit ?',
        caption: "Mula Eksperimen",
        back: "Kembali",
        next: "Seterusnya",
        // hint: "Tekan 🔊 untuk dengar, atau ▶ untuk mula",
        speakTitle: "Dengar",
      },
    };
  }, []);

  const t = copy[lang];
  const langLabels = {
    th: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
    en: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
    ms: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const speakFallback = () => {
    try {
      if (!window.speechSynthesis) return;
      const utter = new SpeechSynthesisUtterance(`${t.bubble} ${t.hint}`);
      utter.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.speak(utter);
    } catch {
      // ignore
    }
  };

  const playNarration = () => {
    const audioSrc = {
      th: "/audio/sim/p4_gravity_intro_th.mp3",
      en: "/audio/sim/p4_gravity_intro_en.mp3",
      ms: "/audio/sim/p4_gravity_intro_ms.mp3",
    }[lang];

    stopAudio();

    if (!audioSrc) {
      speakFallback();
      return;
    }

    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    audio.play().catch(() => {
      speakFallback();
    });
  };

  const handleStart = () => {
    stopAudio();
    navigate("/p4/gravity/exp1/materials");
  };

  const handleBack = () => {
    stopAudio();
    navigate("/p4/gravity/vocab");
  };

  const handleNext = () => {
    stopAudio();
    navigate("/p4/gravity/exp1/materials");
  };

  return (
    <div className="m-0 h-screen min-h-screen w-screen overflow-hidden bg-[radial-gradient(circle_at_20%_10%,#ffffff_0%,#e8f6ff_35%,#d8efff_100%)] p-0 font-['Prompt',sans-serif]">
      <HomeButton />

      <div className="relative h-full w-full overflow-hidden bg-[#cfe9f6]">
        <img
          className="absolute inset-0 h-full w-full object-cover saturate-105"
          src="/images/p4/sim/sball.png"
          alt="background"
        />

        <div className="absolute left-[7%] right-[7%] top-[12%] z-[15] rounded-[20px] bg-[rgba(191,219,240,.92)] px-[18px] py-[18px] text-[#0b1020] shadow-[0_14px_28px_rgba(0,0,0,.20)] backdrop-blur-[4px]">
          <div className="flex items-start gap-3">
            <div className="flex-1 text-[26px] font-black leading-[1.25] max-[900px]:text-[20px]">
              {t.bubble}
            </div>
            <button
              className="h-[46px] w-[46px] shrink-0 cursor-pointer rounded-[14px] bg-white/90 text-[20px] shadow-[0_10px_18px_rgba(0,0,0,.16)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.20)]"
              onClick={playNarration}
              type="button"
              title={t.speakTitle}
              aria-label={t.speakTitle}
            >
              🔊
            </button>
          </div>

          {/* <div className="mt-[10px] text-[15px] font-extrabold opacity-90">
            {t.hint}
          </div> */}
        </div>

        <img
          className="pointer-events-none absolute bottom-[5%] right-[11%] z-[13] h-auto w-[min(44vw,480px)] select-none [filter:drop-shadow(0_14px_20px_rgba(0,0,0,.26))] max-[900px]:bottom-[14%] max-[900px]:right-[5%] max-[900px]:w-[min(22vw,160px)] max-[640px]:hidden"
          src="/images/p4/exp1/boy-soccer.png"
          alt="teacher"
        />

        <button
          className="absolute left-1/2 top-[58%] z-[16] flex h-[130px] w-[130px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-[3px] border-[rgba(255,255,255,.55)] bg-[rgba(170,220,255,.96)] shadow-[0_18px_34px_rgba(0,0,0,.20)] transition duration-150 hover:-translate-y-[52%] hover:shadow-[0_22px_40px_rgba(0,0,0,.22)] max-[900px]:top-[78%] max-[900px]:h-[104px] max-[900px]:w-[104px]"
          onClick={handleStart}
          type="button"
          aria-label="start"
        >
          <span className="text-[54px] font-black leading-none max-[900px]:text-[46px]">
            ▶
          </span>
        </button>

        <div className="absolute left-1/2 top-[68%] z-[16] -translate-x-1/2 text-[22px] font-black text-[#0b1020] [text-shadow:0_2px_0_rgba(255,255,255,.75)] max-[900px]:top-[88%] max-[900px]:text-[18px]">
          {t.caption}
        </div>

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
              {langLabels[lang].th}
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
              {langLabels[lang].ms}
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
              {langLabels[lang].en}
            </button>
        </div>

        <div className="absolute bottom-[18px] right-[18px] z-[7] flex items-center gap-3 max-[720px]:bottom-[12px] max-[720px]:right-[12px] max-[720px]:gap-2">
          <button
            className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
            onClick={handleBack}
            type="button"
          >
            « {t.back}
          </button>

          <button
            className="rounded-[18px] bg-[linear-gradient(135deg,#ef4444,#b91c1c)] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
            onClick={handleNext}
            type="button"
          >
            {t.next} »
          </button>
        </div>
      </div>
    </div>
  );
}
