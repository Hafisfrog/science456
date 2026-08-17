import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import "../exp1/P4GravityExp1Answer.css";

export default function P4GravityExp3Answer() {
  const navigate = useNavigate();

  const BACK_PATH = "/p4/gravity/exp3/result";
  const NEXT_PATH = "/p4/gravity/summarize";

  const [lang, setLang] = useState("th");
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const assets = useMemo(
    () => ({
      bg: "/images/p4/exp1/bg-lab.jpg",
    }),
    []
  );

  const text = useMemo(
    () => ({
      th: {
        title: "คำถามนี้มีคำตอบ",
        // sub: "อ่านเฉลยแล้วลองอธิบายด้วยคำพูดของตัวเองดูนะ",
        q1: "1. วัตถุเดียวกันจะมีน้ำหนักเท่ากันหรือไม่เมื่ออยู่บนโลกและบนดวงจันทร์?",
        a1:
          "ไม่เท่ากัน แม้จะเป็นวัตถุชิ้นเดียวกันและมีมวลเท่ากัน\nแต่แรงโน้มถ่วงของโลกและดวงจันทร์ไม่เท่ากัน\nบนโลก: แรงโน้มถ่วงมาก จึงทำให้วัตถุมีน้ำหนักมาก\nบนดวงจันทร์: แรงโน้มถ่วงน้อยกว่าโลกมาก จึงทำให้วัตถุมีน้ำหนักน้อยกว่า",
        speak: "ฟัง",
        speakAll: "ฟังทั้งหมด",
        back: "ย้อนกลับ",
        next: "ต่อไป",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายูถิ่น",
        reveal: "เฉลยคำตอบ",
        hide: "ซ่อนคำตอบ",
      },
      en: {
        title: "Answers",
        // sub: "Read and explain it in your own words.",
        q1: "1. Does the same object have the same weight on Earth and on the Moon?",
        a1:
          "No. Even if it is the same object with the same mass, gravity on Earth and on the Moon is different.\nOn Earth: gravity is stronger, so the object has greater weight.\nOn the Moon: gravity is weaker, so the object has less weight.",
        speak: "Listen",
        speakAll: "Listen all",
        back: "Back",
        next: "Next",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายูถิ่น",
        reveal: "Show answer",
        hide: "Hide answer",
      },
      ms: {
        title: "ซออาแล นิง อาดอ ยาวะแป",
        // sub: "Baca dan terangkan semula dengan kata-kata sendiri.",
        q1: "1.	บือนอ เฮาะ ซามอ, กาลู โดะ อาตะฮ บูมี ดืองา บูแล, บือระ บือนอ เนาะ ซามอ กือเดาะ?",
        a1:
          "เตาะ ซามอ, กาลูปง บือนอตูซูปอ ดัน บือระ บือนอ ปง ซามอ. \n ซือบะ แร็ง บูมี ตาเระ บือนอ ดืองา แร็ง บูแล ตาเระ บือนอ เตาะ ซามอ. \n อาตะฮ บูมี: แร็ง บูมี ตาเระ บือนอ บาเญาะ, บูวะ วี บือนอ ตู คอฮอ บือระ. \nอาตะฮ บูแล: แร็ง บูแล ตาเระ บือนอ ซีกิ ดารีปาดอ บูมี บูวะวีบือนอ ตู บือระ ซีก",
        speak: "Dengar",
        speakAll: "Dengar semua",
        back: "ฮูโนกือเละ",
        next: "ตือรุฮ",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายูถิ่น",
        reveal: "ยาวะแป",
        hide: "ซูซุ ยาวะแป",
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
