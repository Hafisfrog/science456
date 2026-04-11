import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp3Steps.css";

export default function P4GravityExp3Steps() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th"); // th | en | ms

  const BACK_PATH = "/p4/gravity/exp3/vocab";
  const NEXT_PATH = "/p4/gravity/exp3/question";

  const assets = useMemo(() => {
    return {
      bg: "/images/p4/exp3/bg-lab.jpg",
      // boardFrame: "/images/p4/sim/sball.png",
      character: "/images/p4/exp3/teacher.png",

      itemBook: "/images/p4/exp3/book.png",
      itemRock: "/images/p4/exp3/rock.png",
      itemMango: "/images/p4/exp3/mango.png",
      itemScale: "/images/p4/exp3/spring-scale.png",
    };
  }, []);

  // speech
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

  const text = useMemo(() => {
    return {
      th: {
        title: "การทดลองที่ 3 เรื่อง แรงดึงดูดของโลกกับแรงดึงดูดของดวงจันทร์",
        materials: "วัสดุอุปกรณ์",
        steps: "ขั้นตอนการทดลอง",
        next: "ต่อไป",
        back: "ย้อนกลับ",

        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        speakTitleOnly: "ฟังหัวข้อ",
        speak: "ฟัง",

        itemBook: "หนังสือ",
        itemRock: "ก้อนหิน",
        itemMango: "มะม่วง",
        itemScale: "เครื่องชั่งสปริง",

        s1: "เลือกวัตถุทดลอง",
        s2: "สังเกตวัตถุที่ชั่งบนโลกกับบนดวงจันทร์",
        s3: "เปลี่ยนชนิดวัตถุและทำการทดลองซ้ำ",
        s4: "บันทึกผลการทดลอง",
      },
      en: {
        title: "Experiment 3: Earth's gravity and the Moon's gravity",
        materials: "Materials",
        steps: "Steps",
        next: "Next",
        back: "Back",

        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        speakTitleOnly: "Listen to title",
        speak: "Listen",

        itemBook: "Book",
        itemRock: "Rock",
        itemMango: "Mango",
        itemScale: "Spring scale",

        s1: "Choose an object",
        s2: "Observe the object on Earth and on the Moon",
        s3: "Change the object and repeat the experiment",
        s4: "Record the results",
      },
      ms: {
        title: "Eksperimen 3: Graviti Bumi dan graviti Bulan",
        materials: "Bahan/Peralatan",
        steps: "Langkah eksperimen",
        next: "Seterusnya",
        back: "Kembali",

        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        speakTitleOnly: "Dengar tajuk",
        speak: "Dengar",

        itemBook: "Buku",
        itemRock: "Batu",
        itemMango: "Mangga",
        itemScale: "Penimbang spring",

        s1: "Pilih objek",
        s2: "Perhatikan objek di Bumi dan di Bulan",
        s3: "Tukar objek dan ulang eksperimen",
        s4: "Catat keputusan",
      },
    };
  }, []);

  const t = text[lang];

  const speakAll = () => {
    const msg =
      `${t.title}\n\n` +
      `${t.materials}: ${t.itemBook}, ${t.itemRock}, ${t.itemMango}, ${t.itemScale}\n\n` +
      `${t.steps}\n` +
      `1) ${t.s1}\n` +
      `2) ${t.s2}\n` +
      `3) ${t.s3}\n` +
      `4) ${t.s4}`;
    speak(msg);
  };

  const speakTitleOnly = () => {
  speak(t.title);
};

  const materials = useMemo(() => {
    return [
      { key: "book", name: t.itemBook, img: assets.itemBook },
      { key: "rock", name: t.itemRock, img: assets.itemRock },
      { key: "mango", name: t.itemMango, img: assets.itemMango },
      { key: "scale", name: t.itemScale, img: assets.itemScale },
    ];
  }, [t, assets]);

  const steps = useMemo(() => [t.s1, t.s2, t.s3, t.s4], [t]);

  return (
    <div className="e3s-page">
      {/* BG */}
      <img
        src="/images/p4/backgrounds-p4.jpg"
        alt="Laboratory background"
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.9]"
      />
      <div className="e3s-overlay" />

      {/* Board stage */}
      <div className="e3s-stage">
        {/* character */}
        {assets.character ? (
          <img className="e3s-character" src={assets.character} alt="character" draggable="false" />
        ) : null}

        <div className="e3s-board">
          {assets.boardFrame ? <img className="e3s-frame" src={assets.boardFrame} alt="frame" /> : null}

          <div className="e3s-boardInner">
            {/* ✅ sticky header */}
            <div className="e3s-head">
              <div className="e3s-title">{t.title}</div>
              {/* <button className="e3s-headSpeak" type="button" onClick={speakTitleOnly} title={t.speakTitleOnly}>
                🔊 <span>{t.speakTitleOnly}</span>
              </button> */}
            </div>

            {/* ✅ scrollable content */}
            <div className="e3s-content">
              {/* materials */}
              <div className="e3s-sectionRow">
                <div className="e3s-sectionLabel">{t.materials}</div>
              </div>

              <div className="e3s-materialGrid">
                {materials.map((m) => (
                  <div className="e3s-matCard" key={m.key}>
                    <div className="e3s-matImgWrap">
                      {m.img ? (
                        <img className="e3s-matImg" src={m.img} alt={m.name} draggable="false" />
                      ) : (
                        <div className="e3s-imgPh">IMG</div>
                      )}
                    </div>

                    <div className="e3s-matFooter">
                      <div className="e3s-matName">{m.name}</div>
                      <button className="e3s-inlineSpeak" type="button" onClick={() => speak(m.name)} title={t.speak}>
                        🔊
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* steps */}
              <div className="e3s-sectionRow">
                <div className="e3s-sectionLabel">{t.steps}</div>
              </div>

              <div className="e3s-steps">
                {steps.map((s, idx) => (
                  <div className="e3s-step" key={idx}>
                    <div className="e3s-stepNum">{idx + 1}</div>

                    <div className="e3s-stepText">
                      <span>{s}</span>
                      <button
                        className="e3s-inlineSpeak"
                        type="button"
                        onClick={() => speak(`${idx + 1}. ${s}`)}
                        title={t.speak}
                      >
                        🔊
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ✅ spacer กันโดนปุ่มล่างทับ */}
              <div className="e3s-bottomSpacer" />
            </div>
          </div>
        </div>
      </div>

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
            lang === "en"
              ? "bg-[#bfe0ff] text-slate-900"
              : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
          } max-[720px]:rounded-[10px] max-[720px]:px-[10px] max-[720px]:py-[8px] max-[720px]:text-[13px]`}
          onClick={() => setLang("en")}
          type="button"
        >
          {t.chipEn}
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
