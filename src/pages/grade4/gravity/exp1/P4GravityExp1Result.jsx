import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./P4GravityExp1Result.css";

export default function P4GravityExp1Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const CLASSROOM_PATH = "/p4/gravity/exp1/answer";
  const RETRY_PATH = "/p4/gravity/exp1/action";

  const state = location.state || {};
  const selected = state.selected || { ball: true, bocce: false, feather: false };
  const heightM = Number(state.heightM ?? 2);
  const totalMs = Number(state.time ?? 0);

  const [lang, setLang] = useState("th");

  const text = useMemo(
    () => ({
      th: {
        title: "ผลการทดลอง",
        subtitle: "ตารางจะแสดงเฉพาะวัตถุที่คุณเลือกไว้",
        height: "ความสูง",
        objCol: "วัตถุ",
        resultCol: "ผลการทดลอง",
        timeCol: "เวลา (วินาที)",
        dirCol: "ทิศทางการเคลื่อนที่",
        hitGround: "ตกพื้น",
        summaryTitle: "สรุปผลการทดลอง",
        summary:
          "เมื่อปล่อยวัตถุจากที่สูง วัตถุจะตกลงสู่พื้นโลกเสมอ เพราะโลกมีแรงโน้มถ่วงดึงดูดวัตถุ วัตถุที่มีแรงต้านอากาศมาก เช่น ขนนก จะใช้เวลานานกว่าและอาจแกว่งไปมาได้",
        listen: "ฟังสรุป",
        retry: "ทดลองใหม่",
        backClass: "กลับหน้าคำตอบ",
        empty: "ไม่พบวัตถุที่เลือก กรุณากลับไปเลือกวัตถุใหม่",
        th: "ไทย",
        en: "อังกฤษ",
        ms: "มลายู",
      },
      en: {
        title: "Experiment Results",
        subtitle: "The table shows only the objects you selected.",
        height: "Height",
        objCol: "Object",
        resultCol: "Result",
        timeCol: "Time (s)",
        dirCol: "Motion Direction",
        hitGround: "Reached ground",
        summaryTitle: "Summary",
        summary:
          "When objects are released from a height, they fall to the ground because of Earth's gravity. Objects with greater air resistance, such as feathers, take longer and may drift sideways.",
        listen: "Listen",
        retry: "Try again",
        backClass: "Back to answer",
        empty: "No selected objects were found. Please go back and choose objects again.",
        th: "Thai",
        en: "English",
        ms: "Malay",
      },
      ms: {
        title: "Keputusan Eksperimen",
        subtitle: "Jadual hanya memaparkan objek yang anda pilih.",
        height: "Ketinggian",
        objCol: "Objek",
        resultCol: "Keputusan",
        timeCol: "Masa (s)",
        dirCol: "Arah Pergerakan",
        hitGround: "Sampai tanah",
        summaryTitle: "Ringkasan",
        summary:
          "Apabila objek dilepaskan dari ketinggian, ia jatuh ke tanah kerana graviti Bumi. Objek yang mempunyai rintangan udara lebih besar seperti bulu mengambil masa lebih lama dan boleh melayang ke sisi.",
        listen: "Dengar",
        retry: "Cuba lagi",
        backClass: "Kembali ke jawapan",
        empty: "Tiada objek yang dipilih. Sila kembali dan pilih objek sekali lagi.",
        th: "Thai",
        en: "English",
        ms: "Melayu",
      },
    }),
    []
  );

  const t = text[lang];

  const assets = useMemo(
    () => ({
      bg: "/images/p4/exp1/bg-result.jpg",
      ball: "/images/p4/exp1/soccer-ball.png",
      bocce: "/images/p4/exp1/bocce.png",
      feather: "/images/p4/exp1/feather.png",
    }),
    []
  );

  const durationSec = (type) => {
    const base = Math.sqrt(Math.max(0.5, heightM));
    if (type === "ball") return 0.9 * base;
    if (type === "bocce") return 0.85 * base;
    if (type === "feather") return 1.6 * base;
    return 1.1 * base;
  };

  const rows = useMemo(
    () =>
      [
        { key: "ball", name: { th: "ลูกบอล", en: "Ball", ms: "Bola" }, img: assets.ball, motion: "straight" },
        {
          key: "bocce",
          name: { th: "ลูกเปตอง", en: "Bocce Ball", ms: "Bola Bocce" },
          img: assets.bocce,
          motion: "straight",
        },
        { key: "feather", name: { th: "ขนนก", en: "Feather", ms: "Bulu" }, img: assets.feather, motion: "feather" },
      ].filter((item) => selected?.[item.key]),
    [assets.ball, assets.bocce, assets.feather, selected]
  );

  const timePerObjectSec = useMemo(() => {
    const totalSec = Math.max(0, totalMs / 1000);
    if (!rows.length) return {};

    const durations = rows.reduce((acc, row) => {
      acc[row.key] = durationSec(row.key);
      return acc;
    }, {});

    const maxDur = Math.max(...Object.values(durations));
    const effectiveTotal = totalSec > 0 ? totalSec : maxDur;

    const perObject = {};
    rows.forEach((row) => {
      const ratio = durations[row.key] / maxDur;
      perObject[row.key] = Number((effectiveTotal * ratio).toFixed(2));
    });

    return perObject;
  }, [rows, totalMs, heightM]);

  const speakSummary = () => {
    try {
      const utterance = new SpeechSynthesisUtterance(t.summary);
      utterance.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore speech errors
    }
  };

  const heightLabel = `${t.height}: ${heightM.toFixed(0)} m`;

  return (
    <div className="res-page">
      <img className="res-bg" src={assets.bg} alt="background" />

      <div className="res-shell">
        <div className="res-head">
          <div className="res-title">{t.title}</div>
          <div className="res-sub">{t.subtitle}</div>
          <div className="res-pill">{heightLabel}</div>
        </div>

        <div className="res-card">
          <div className="res-table">
            <div className="res-thead">
              <div>{t.objCol}</div>
              <div>{t.resultCol}</div>
              <div className="center">{t.timeCol}</div>
              <div className="center">{t.dirCol}</div>
            </div>

            <div className="res-tbody">
              {rows.map((row) => (
                <div className="res-row" key={row.key}>
                  <div className="objcell">
                    <img className="objimg" src={row.img} alt={row.name[lang]} />
                    <div>
                      <div className="res-cellLabel">{t.objCol}</div>
                      <div className="objname">{row.name[lang]}</div>
                    </div>
                  </div>

                  <div>
                    <div className="res-cellLabel">{t.resultCol}</div>
                    <span className="badge green">{t.hitGround}</span>
                  </div>

                  <div className="center timecell">
                    <div className="res-cellLabel">{t.timeCol}</div>
                    {timePerObjectSec?.[row.key]?.toFixed(2)}
                  </div>

                  <div className="center">
                    <div className="res-cellLabel">{t.dirCol}</div>
                    {row.motion === "straight" ? (
                      <div className="dir straight">
                        <div className="arrow">↓</div>
                        <div className="dash" />
                      </div>
                    ) : (
                      <div className="dir feather">
                        <div className="tilde">~</div>
                        <div className="tilde">~</div>
                        <div className="arrow">↓</div>
                        <div className="dash" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {!rows.length && <div className="res-empty">{t.empty}</div>}
            </div>
          </div>
        </div>

        <div className="res-summary">
          <div className="sum-head">
            <div className="sum-title">{t.summaryTitle}</div>
            <button className="sum-audio" onClick={speakSummary} type="button">
              🔊 {t.listen}
            </button>
          </div>
          <div className="sum-text">{t.summary}</div>
        </div>
      </div>

      <div className="res-lang">
        <button className={`res-chip ${lang === "th" ? "active" : ""}`} onClick={() => setLang("th")} type="button">
          {t.th}
        </button>
        <button className={`res-chip ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")} type="button">
          {t.en}
        </button>
        <button className={`res-chip ${lang === "ms" ? "active" : ""}`} onClick={() => setLang("ms")} type="button">
          {t.ms}
        </button>
      </div>

      <button className="res-retry" onClick={() => navigate(RETRY_PATH)} type="button">
        ↻ {t.retry}
      </button>

      <button className="res-backClass" onClick={() => navigate(CLASSROOM_PATH)} type="button">
        ← {t.backClass}
      </button>
    </div>
  );
}
