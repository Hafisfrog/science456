import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4Summarize.css";

const SPEAKER_ICON = "\u{1F50A}";

export default function P4Summarize() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");

  const assets = useMemo(
    () => ({  
      earth: "/images/p4/log.png",
      scale: "/images/p4/logjang.png",
      // ruler: "/images/p4/logjang.png",
      branchFall: "/images/p4/applong.png",
      cityGround: "/images/p4/logmeng.png",
      massBalance: "/images/p4/loglog.png",
      distanceGravity: "/images/p4/logjaw.png",
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
            title: "ทำให้วัตถุทุกชนิดตกลงสู่พื้นโลกเสมอ",
            body: "เป็นแรงที่ดึงดูดวัตถุต่าง ๆ เข้าหาศูนย์กลางของโลก",
          },
          {
            title: "ทำให้วัตถุมีน้ำหนัก",
            body: "สามารถวัดค่าน้ำหนักของวัตถุได้โดยใช้เครื่องชั่งสปริง",
          },
          {
            title: "ทำให้เราและสิ่งต่าง ๆ อยู่บนพื้นโลกได้",
            body: "ยึดเหนี่ยวทุกสิ่งไม่ให้ลอยหลุดออกไปในอวกาศ",
          },
        ],
        massTitle: "มวลของวัตถุ",
        massBody: "วัตถุที่มีมวลมาก จะมีแรงโน้มถ่วงกระทำมากกว่าวัตถุที่มีมวลน้อย",
        massLeftTop: "มวลมาก",
        massLeftBottom: "แรงโน้มถ่วงมาก",
        massRightTop: "มวลน้อย",
        massRightBottom: "แรงโน้มถ่วงน้อย",
        distanceTitle: "ระยะห่างจากจุดศูนย์กลางของโลก",
        distanceBody: "เมื่อวัตถุอยู่ห่างจากจุดศูนย์กลางโลกมากขึ้น แรงโน้มถ่วงจะยิ่งลดลง",
        distanceNear: "ระยะใกล้\nแรงโน้มถ่วงมาก",
        distanceFar: "ระยะไกล\nแรงโน้มถ่วงน้อย",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        back: "ย้อนกลับ",
        next: "ต่อไป",
        // listenAll: "ฟังทั้งหมด",
      },
      en: {
        title: "Key Summary: Earth's Gravity",
        leftTitle: "Effects of Gravity",
        rightTitle: "Factors Affecting Gravity",
        leftBlocks: [
          {
            title: "Objects always fall toward Earth",
            body: "Gravity pulls all objects toward the center of Earth.",
          },
          {
            title: "Gravity gives objects weight",
            body: "A spring scale can be used to measure weight.",
          },
          {
            title: "It keeps us and everything on Earth",
            body: "Gravity prevents things from floating away into space.",
          },
        ],
        massTitle: "Mass of an object",
        massBody: "Objects with greater mass experience a stronger gravitational force than objects with less mass.",
        massLeftTop: "More mass",
        massLeftBottom: "More gravity",
        massRightTop: "Less mass",
        massRightBottom: "Less gravity",
        distanceTitle: "Distance from Earth's center",
        distanceBody: "The farther an object is from Earth's center, the weaker gravity becomes.",
        distanceNear: "Near\nStronger gravity",
        distanceFar: "Far\nWeaker gravity",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        back: "Back",
        next: "Next",
        // listenAll: "Listen all",
      },
      ms: {
        title: "Ringkasan Utama: Daya Graviti Bumi",
        leftTitle: "Kesan Graviti",
        rightTitle: "Faktor Yang Mempengaruhi Graviti",
        leftBlocks: [
          {
            title: "Objek sentiasa jatuh ke permukaan Bumi",
            body: "Graviti menarik objek ke arah pusat Bumi.",
          },
          {
            title: "Graviti memberi berat pada objek",
            body: "Berat objek boleh diukur menggunakan penimbang spring.",
          },
          {
            title: "Mengekalkan kita dan benda lain di Bumi",
            body: "Graviti menghalang benda daripada terapung ke angkasa.",
          },
        ],
        massTitle: "Jisim objek",
        massBody: "Objek yang mempunyai jisim lebih besar menerima daya graviti lebih kuat berbanding objek berjisim kecil.",
        massLeftTop: "Jisim besar",
        massLeftBottom: "Graviti kuat",
        massRightTop: "Jisim kecil",
        massRightBottom: "Graviti lemah",
        distanceTitle: "Jarak dari pusat Bumi",
        distanceBody: "Semakin jauh objek dari pusat Bumi, semakin lemah daya graviti.",
        distanceNear: "Dekat\nGraviti kuat",
        distanceFar: "Jauh\nGraviti lemah",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        back: "Kembali",
        next: "Seterusnya",
        // listenAll: "Dengar semua",
      },
    }),
    []
  );

  const t = content[lang];

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const speakAll = () => {
    const left = t.leftBlocks.map((item) => `${item.title}. ${item.body}`).join(" ");
    const right = `${t.massTitle}. ${t.massBody}. ${t.distanceTitle}. ${t.distanceBody}`;
    speak(`${t.title}. ${t.leftTitle}. ${left}. ${t.rightTitle}. ${right}`);
  };

  const renderSpeakButton = (text) => (
    <button
      className="p4sum-inlineSpeak"
      type="button"
      onClick={() => speak(text)}
      title={t.listenAll}
      // aria-label={t.listenAll}
    >
      {SPEAKER_ICON}
    </button>
  );

  return (
    <div className="p4sum-page">
      <div className="p4sum-bgShapes" />

      <div className="p4sum-wrap">
        <h1 className="p4sum-title">{t.title}</h1>

        <div className="p4sum-stage">
          <section className="p4sum-side p4sum-side-left">
            <div className="p4sum-badge">{t.leftTitle}</div>

            <article className="p4sum-feature">
              <div className="p4sum-branch">
                <img src={assets.branchFall} alt="" className="p4sum-branchImage" />
              </div>
              <div className="p4sum-copy">
                <h2>{t.leftBlocks[0].title}</h2>
                <p>{t.leftBlocks[0].body}</p>
                {renderSpeakButton(`${t.leftBlocks[0].title}. ${t.leftBlocks[0].body}`)}
              </div>
            </article>

            <article className="p4sum-mini p4sum-mini-scale">
              <div className="p4sum-miniMedia">
                <img src={assets.scale} alt="" className="p4sum-scaleImage" />
              </div>
              <div className="p4sum-copy">
                <h3>{t.leftBlocks[1].title}</h3>
                <p>{t.leftBlocks[1].body}</p>
                {renderSpeakButton(`${t.leftBlocks[1].title}. ${t.leftBlocks[1].body}`)}
              </div>
            </article>

            <article className="p4sum-mini p4sum-mini-ground">
              <div className="p4sum-miniMedia">
                <img src={assets.cityGround} alt="" className="p4sum-groundImage" />
              </div>
              <div className="p4sum-copy">
                <h3>{t.leftBlocks[2].title}</h3>
                <p>{t.leftBlocks[2].body}</p>
                {renderSpeakButton(`${t.leftBlocks[2].title}. ${t.leftBlocks[2].body}`)}
              </div>
            </article>
          </section>

          <section className="p4sum-center">
            <div className="p4sum-earthShell">
              <img src={assets.earth} alt="Earth" className="p4sum-earth" />
            </div>
          </section>

          <section className="p4sum-side p4sum-side-right">
            <div className="p4sum-badge p4sum-badge-right">{t.rightTitle}</div>

            <article className="p4sum-mass">
              <div className="p4sum-copy p4sum-copy-right">
                <h2>{t.massTitle}</h2>
                <p>{t.massBody}</p>
                {renderSpeakButton(`${t.massTitle}. ${t.massBody}`)}
              </div>

              <div className="p4sum-massDiagram">
                <div className="p4sum-massLabel p4sum-massLabel-left">
                  <strong>{t.massLeftTop}</strong>
                  <span>{t.massLeftBottom}</span>
                </div>
                <img src={assets.massBalance} alt="" className="p4sum-massVisual" />
                <div className="p4sum-massLabel p4sum-massLabel-right">
                  <strong>{t.massRightTop}</strong>
                  <span>{t.massRightBottom}</span>
                </div>
              </div>
            </article>

            <article className="p4sum-distance">
              <div className="p4sum-copy p4sum-copy-right">
                <h3>{t.distanceTitle}</h3>
                <p>{t.distanceBody}</p>
                {renderSpeakButton(`${t.distanceTitle}. ${t.distanceBody}`)}
              </div>

              <div className="p4sum-distanceDiagram">
                <div className="p4sum-distanceMeta p4sum-distanceMeta-top">{t.distanceFar}</div>
                <img src={assets.distanceGravity} alt="" className="p4sum-distanceVisual" />
                <div className="p4sum-distanceMeta p4sum-distanceMeta-bottom">{t.distanceNear}</div>
              </div>
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
        {/* <button className="p4sum-chipAudio" type="button" onClick={speakAll} title={t.listenAll}>
          {SPEAKER_ICON}
        </button> */}
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
          « {t.back}
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
