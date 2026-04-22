import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import "../exp1/P4GravityExp1Answer.css";
import "../exp1/P4GravityExp1Materials.css";

export default function P4GravityExp2Answer() {
  const navigate = useNavigate();

  const BACK_PATH = "/p4/gravity/exp2/result";
  const NEXT_PATH = "/p4/gravity";

  const [lang, setLang] = useState("th");
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const assets = useMemo(
    () => ({
      bg: "/images/p4/exp2/bg-lab.jpg",
    }),
    []
  );

  const text = useMemo(
    () => ({
      th: {
        title: "คำถามนี้มีคำตอบ",
        // sub: "อ่านเฉลยแล้วลองอธิบายด้วยคำพูดของตัวเองดูนะ",
        q1: "1. ทำไมวัตถุทุกชนิดจึงตกลงสู่พื้นโลก และเหตุใดวัตถุแต่ละชนิดจึงมีน้ำหนักไม่เท่ากัน?",
        a1:
          "วัตถุทุกชนิดตกลงสู่พื้นโลก เพราะมีแรงโน้มถ่วงของโลกดึงไว้\nวัตถุมีน้ำหนักไม่เท่ากัน เพราะวัตถุแต่ละชนิดมีมวลไม่เท่ากัน",
        speakAll: "ฟังทั้งหมด",
        speak: "ฟัง",
        back: "ย้อนกลับ",
        next: "ต่อไป",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        reveal: "เฉลยคำตอบ",
        hide: "ซ่อนคำตอบ",
      },
      en: {
        title: "Answers",
        // sub: "Read the explanation and try to explain it in your own words.",
        q1: "1. Why do all objects fall to the ground, and why do different objects have different weights?",
        a1:
          "All objects fall to the ground because of Earth's gravity.\nObjects have different weights because their masses are different.",
        speakAll: "Listen to all",
        speak: "Listen",
        back: "Back",
        next: "Next",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        reveal: "Show answer",
        hide: "Hide answer",
      },
      ms: {
        title: "Jawapan",
        // sub: "Baca penjelasan ini dan cuba terangkan semula dengan kata-kata sendiri.",
        q1: "1. Mengapa semua objek jatuh ke tanah, dan mengapa objek yang berbeza mempunyai berat yang berbeza?",
        a1:
          "Semua objek jatuh ke tanah kerana graviti Bumi.\nObjek mempunyai berat yang berbeza kerana jisim setiap objek tidak sama.",
        speakAll: "Dengar semua",
        speak: "Dengar",
        back: "Kembali",
        next: "Seterusnya",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        reveal: "Tunjuk jawapan",
        hide: "Sembunyikan jawapan",
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
    const message = revealedAnswers.q1 ? `${t.q1}\n${t.a1}` : t.q1;
    speak(message);
  };

  const toggleAnswer = (id) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="ans2-page">
      <HomeButton />

      <img
        src="/images/p4/backgrounds-p4.jpg"
        alt="Laboratory background"
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.9]"
      />
      <div className="ans2-overlay" />

      <div className="absolute bottom-[18px] left-[18px] z-[30] flex items-center gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_18px_40px_rgba(0,0,0,.22)] max-[720px]:bottom-[12px] max-[720px]:left-[12px] max-[720px]:gap-[6px] max-[720px]:rounded-[12px] max-[720px]:p-[7px]">
        <button
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition ${
            lang === "th"
              ? "bg-[#bfe0ff] text-slate-900"
              : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
          } max-[720px]:rounded-[10px] max-[720px]:px-[10px] max-[720px]:py-[8px] max-[720px]:text-[13px]`}
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
          } max-[720px]:rounded-[10px] max-[720px]:px-[10px] max-[720px]:py-[8px] max-[720px]:text-[13px]`}
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
          } max-[720px]:rounded-[10px] max-[720px]:px-[10px] max-[720px]:py-[8px] max-[720px]:text-[13px]`}
          onClick={() => setLang("en")}
          type="button"
        >
          {t.chipEn}
        </button>
      </div>

      <div className="ans2-stage">
        <div className="ans2-board">
          <div className="ans2-boardInner">
            <div className="ans2-header">
              <div className="ans2-titleWrap">
                <div>
                  <div className="ans2-title">{t.title}</div>
                  {/* <div className="ans2-sub">{t.sub}</div> */}
                </div>
              </div>

              {/* <button className="ans2-btn soft" type="button" onClick={speakAll}>
                {"\uD83D\uDD0A"} {t.speakAll}
              </button> */}
            </div>

            <div className="ans2-cards">
              <div className="ans2-card yellow">
                <div className="ans2-cardTop">
                  <div className="ans2-q">{t.q1}</div>
                  <button className="ans2-miniSpeak" type="button" onClick={() => speak(t.q1)} title={t.speak}>
                    {"\uD83D\uDD0A"}
                  </button>
                </div>
                <div className="ans2-answerActions">
                  <button className="ans2-revealBtn" type="button" onClick={() => toggleAnswer("q1")}>
                    {revealedAnswers.q1 ? t.hide : t.reveal}
                  </button>
                </div>
                {revealedAnswers.q1 && (
                  <div className="ans2-a">
                    <button className="ans2-answerSpeak" type="button" onClick={() => speak(t.a1)} title={t.speak}>
                      {"\uD83D\uDD0A"}
                    </button>
                    {t.a1.split("\n").map((line, idx) => (
                      <div className="ans2-line" key={idx}>
                        {line}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[18px] right-[18px] z-[30] flex items-center gap-3 max-[720px]:bottom-[12px] max-[720px]:right-[12px] max-[720px]:gap-2">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[10px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          type="button"
          onClick={() => navigate(BACK_PATH)}
          title={t.back}
        >
          « {t.back}
        </button>
        <button
          className="rounded-[18px] bg-[linear-gradient(135deg,#ef4444,#b91c1c)] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[12px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          type="button"
          onClick={() => navigate(NEXT_PATH)}
          title={t.next}
        >
          {t.next} »
        </button>
      </div>
    </div>
  );
}
