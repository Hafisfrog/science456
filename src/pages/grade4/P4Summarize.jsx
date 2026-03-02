import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4Summarize.css";

export default function P4Summarize() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");

  // Change `bg` to your own file in `public/images/...`
  const assets = useMemo(
    () => ({
      bg: "/images/p4/gravity.png",
      earth: "/images/p4-gravity.png",
      scale: "/images/p4/exp2/spring-scale.png",
      ruler: "/images/p4/exp1/ruler1.png",
    }),
    []
  );

  const content = useMemo(
    () => ({
      th: {
        title: "สรุปสาระสำคัญ : แรงโน้มถ่วงของโลก",
        leftTitle: "ผลของแรงโน้มถ่วง",
        rightTitle: "ปัจจัยที่ส่งผลต่อแรงโน้มถ่วง",
        leftBlocks: [
          {
            h: "ทำให้วัตถุทุกชนิดตกลงสู่พื้นโลกเสมอ",
            b: "เป็นแรงที่ดึงดูดวัตถุต่าง ๆ เข้าหาศูนย์กลางของโลก",
          },
          {
            h: "ทำให้วัตถุมีน้ำหนัก",
            b: "สามารถวัดค่าน้ำหนักของวัตถุได้โดยใช้เครื่องชั่งสปริง",
          },
          {
            h: "ทำให้เราและสิ่งต่าง ๆ อยู่บนพื้นโลกได้",
            b: "ยึดเหนี่ยวทุกสิ่งไม่ให้ลอยหลุดออกไปในอวกาศ",
          },
        ],
        rightBlocks: [
          {
            h: "มวลของวัตถุ",
            b: "วัตถุที่มีมวลมาก จะมีแรงโน้มถ่วงกระทำมากกว่าวัตถุที่มีมวลน้อย",
          },
          {
            h: "ระยะห่างจากจุดศูนย์กลางของโลก",
            b: "เมื่อวัตถุอยู่ห่างจากจุดศูนย์กลางโลกมากขึ้น แรงโน้มถ่วงจะยิ่งลดลง",
          },
        ],
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        next: "ต่อไป",
        back: "ย้อนกลับ",
        speakAll: "ฟังทั้งหมด",
      },
      en: {
        title: "Key Summary: Earth's Gravity",
        leftTitle: "Effects of Gravity",
        rightTitle: "Factors Affecting Gravity",
        leftBlocks: [
          {
            h: "Objects always fall toward Earth",
            b: "Gravity pulls objects toward the center of Earth.",
          },
          {
            h: "Gravity gives objects weight",
            b: "We can measure weight using a spring scale.",
          },
          {
            h: "It keeps us on Earth",
            b: "Gravity prevents things from floating away into space.",
          },
        ],
        rightBlocks: [
          {
            h: "Object mass",
            b: "Objects with greater mass experience stronger gravitational force.",
          },
          {
            h: "Distance from Earth's center",
            b: "The farther from Earth's center, the weaker gravity becomes.",
          },
        ],
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        next: "Next",
        back: "Back",
        speakAll: "Listen all",
      },
      ms: {
        title: "Ringkasan Utama: Graviti Bumi",
        leftTitle: "Kesan Graviti",
        rightTitle: "Faktor Yang Mempengaruhi Graviti",
        leftBlocks: [
          {
            h: "Objek sentiasa jatuh ke Bumi",
            b: "Graviti menarik objek ke arah pusat Bumi.",
          },
          {
            h: "Graviti memberi berat pada objek",
            b: "Berat objek boleh diukur dengan penimbang spring.",
          },
          {
            h: "Mengekalkan kita di Bumi",
            b: "Graviti menghalang objek daripada terapung ke angkasa.",
          },
        ],
        rightBlocks: [
          {
            h: "Jisim objek",
            b: "Objek yang berjisim besar menerima daya graviti lebih kuat.",
          },
          {
            h: "Jarak dari pusat Bumi",
            b: "Semakin jauh dari pusat Bumi, semakin lemah daya graviti.",
          },
        ],
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        next: "Seterusnya",
        back: "Kembali",
        speakAll: "Dengar semua",
      },
    }),
    []
  );

  const t = content[lang];

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
    window.speechSynthesis.speak(utter);
  };

  const speakAll = () => {
    const left = t.leftBlocks.map((item) => `${item.h}. ${item.b}`).join(" ");
    const right = t.rightBlocks.map((item) => `${item.h}. ${item.b}`).join(" ");
    speak(`${t.title}. ${t.leftTitle}. ${left}. ${t.rightTitle}. ${right}`);
  };

  return (
    <div className="p4sum-page">
      <img className="p4sum-bg" src={assets.bg} alt="background" />
      <div className="p4sum-overlay" />

      <div className="p4sum-wrap">
        <h1 className="p4sum-title">{t.title}</h1>

        <div className="p4sum-grid">
          <section className="p4sum-col">
            <div className="p4sum-badge">{t.leftTitle}</div>
            {t.leftBlocks.map((item, idx) => (
              <article className="p4sum-card" key={`left-${idx}`}>
                {idx === 1 ? <img src={assets.scale} alt="" className="p4sum-icon" /> : null}
                <div className="p4sum-text">
                  <h3>{item.h}</h3>
                  <p>{item.b}</p>
                </div>
                <button
                  type="button"
                  className="p4sum-speak p4sum-speak-small"
                  onClick={() => speak(`${item.h}. ${item.b}`)}
                  title={t.speakAll}
                >
                  🔊
                </button>
              </article>
            ))}
          </section>

          <div className="p4sum-earthWrap">
            <img src={assets.earth} alt="earth" className="p4sum-earth" />
          </div>

          <section className="p4sum-col">
            <div className="p4sum-badge">{t.rightTitle}</div>
            <article className="p4sum-card">
              <div className="p4sum-text">
                <h3>{t.rightBlocks[0].h}</h3>
                <p>{t.rightBlocks[0].b}</p>
              </div>
              <button
                type="button"
                className="p4sum-speak p4sum-speak-small"
                onClick={() => speak(`${t.rightBlocks[0].h}. ${t.rightBlocks[0].b}`)}
                title={t.speakAll}
              >
                🔊
              </button>
            </article>
            <article className="p4sum-card">
              <img src={assets.ruler} alt="" className="p4sum-icon" />
              <div className="p4sum-text">
                <h3>{t.rightBlocks[1].h}</h3>
                <p>{t.rightBlocks[1].b}</p>
              </div>
              <button
                type="button"
                className="p4sum-speak p4sum-speak-small"
                onClick={() => speak(`${t.rightBlocks[1].h}. ${t.rightBlocks[1].b}`)}
                title={t.speakAll}
              >
                🔊
              </button>
            </article>
          </section>
        </div>
      </div>

      <div className="p4sum-langDock">
        <button className={`p4sum-chip ${lang === "th" ? "active" : ""}`} type="button" onClick={() => setLang("th")}>
          {t.chipTh}
        </button>
        <button className={`p4sum-chip ${lang === "en" ? "active" : ""}`} type="button" onClick={() => setLang("en")}>
          {t.chipEn}
        </button>
        <button className={`p4sum-chip ${lang === "ms" ? "active" : ""}`} type="button" onClick={() => setLang("ms")}>
          {t.chipMs}
        </button>
        <button className="p4sum-chipAudio" type="button" onClick={speakAll} title={t.speakAll}>
          🔊
        </button>
      </div>

      <div className="p4sum-actions">
        <button
          className="p4sum-btn p4sum-btn-back"
          type="button"
          onClick={() => {
            window.speechSynthesis?.cancel();
            navigate(-1);
          }}
        >
          ← {t.back}
        </button>
        <button
          className="p4sum-btn p4sum-btn-next"
          type="button"
          onClick={() => {
            window.speechSynthesis?.cancel();
            navigate("/p4");
          }}
        >
          {t.next} »
        </button>
      </div>
    </div>
  );
}

