import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./P4GravityExp1Result.css";

export default function P4GravityExp1Result() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ กลับหน้าชั้นเรียน (หน้า P4Gravity.jsx)
  const CLASSROOM_PATH = "/p4/gravity/exp1/answer";
  const RETRY_PATH = "/p4/gravity/exp1/action";

  // ✅ รับค่าจากหน้า Action
  const state = location.state || {};
  const selected = state.selected || { ball: true, bocce: false, feather: false };
  const heightM = Number(state.heightM ?? 2);
  const totalMs = Number(state.time ?? 0); // เวลา "รวม" จากหน้า Action (หยุดเมื่อทุกชิ้นตกถึงพื้น)

  // ✅ ภาษา
  const [lang, setLang] = useState("th");

  // ✅ dictionary
  const text = useMemo(() => {
    return {
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
          "เมื่อปล่อยวัตถุจากที่สูง วัตถุจะตกลงสู่พื้นโลกเสมอ เพราะโลกมีแรงโน้มถ่วงดึงดูดวัตถุ วัตถุที่มีแรงต้านอากาศมาก (เช่น ขนนก) จะใช้เวลานานกว่าและอาจแกว่งไปมาได้",
        // listen: "ฟังสรุป",
        retry: "ทดลองใหม่",
        backClass: "กลับหน้าชั้นเรียน",
        th: "ไทย",
        en: "อังกฤษ",
        ms: "มลายู",
      },
      en: {
        title: "Experiment Results",
        subtitle: "The table shows only the objects you selected",
        height: "Height",
        objCol: "Object",
        resultCol: "Result",
        timeCol: "Time (s)",
        dirCol: "Motion Direction",
        hitGround: "Reached ground",
        summaryTitle: "Summary",
        summary:
          "When objects are released from a height, they fall to the ground due to Earth's gravity. Objects with greater air resistance (like feathers) take longer and may drift sideways.",
        // listen: "Listen",
        retry: "Try again",
        backClass: "Back to classroom",
        th: "ไทย",
        en: "อังกฤษ",
        ms: "มลายู",
      },
      ms: {
        title: "Keputusan Eksperimen",
        subtitle: "Jadual hanya memaparkan objek yang anda pilih",
        height: "Ketinggian",
        objCol: "Objek",
        resultCol: "Keputusan",
        timeCol: "Masa (s)",
        dirCol: "Arah Pergerakan",
        hitGround: "Sampai tanah",
        summaryTitle: "Ringkasan",
        summary:
          "Apabila objek dilepaskan dari ketinggian, ia jatuh ke tanah kerana graviti Bumi. Objek dengan rintangan udara lebih besar (seperti bulu) mengambil masa lebih lama dan boleh melayang.",
        // listen: "Dengar",
        retry: "Cuba lagi",
        backClass: "Kembali ke kelas",
        th: "ไทย",
        en: "อังกฤษ",
        ms: "มลายู",
        // th: "Thai",
        // en: "English",
        // ms: "Melayu",
      },
    };
  }, []);

  const t = text[lang];

  // ✅ assets (ปรับรูปได้เอง)
  const assets = useMemo(() => {
    return {
      bg: "/images/p4/exp1/bg-result.jpg",
      ball: "/images/p4/exp1/soccer-ball.png",
      bocce: "/images/p4/exp1/bocce.png",
      feather: "/images/p4/exp1/feather.png",
    };
  }, []);

  // ✅ สูตรเดียวกับหน้า Action (ให้สอดคล้องกัน)
  const durationSec = (type) => {
    const base = Math.sqrt(Math.max(0.5, heightM));
    if (type === "ball") return 0.9 * base;
    if (type === "bocce") return 0.85 * base;
    if (type === "feather") return 1.6 * base;
    return 1.1 * base;
  };

  // ✅ รายการวัตถุที่เลือกจริง
  const rows = useMemo(() => {
    const items = [
      { key: "ball", name: { th: "ลูกบอล", en: "Ball", ms: "Bola" }, img: assets.ball, motion: "straight" },
      { key: "bocce", name: { th: "ลูกเปตอง", en: "Bocce Ball", ms: "Bola Bocce" }, img: assets.bocce, motion: "straight" },
      { key: "feather", name: { th: "ขนนก", en: "Feather", ms: "Bulu" }, img: assets.feather, motion: "feather" },
    ].filter((it) => selected?.[it.key]);

    return items;
  }, [assets.ball, assets.bocce, assets.feather, selected]);

  // ✅ คำนวณเวลาแต่ละชิ้นให้ “สัมพันธ์กับ totalMs” และ “สอดคล้อง durationSec”
  // - ถ้าเลือกหลายชิ้น หน้า Action จะหยุดเมื่อ "ชิ้นที่ช้าที่สุด" ถึงพื้น
  // - ดังนั้น totalTime ≈ max(durationSec ของชิ้นที่เลือก) (+นิดหน่อยจากการเด้ง/หน่วง)
  // - เราจึง map เวลาแต่ละชิ้น = totalTime * (durationSec(type) / maxDuration)
  const timePerObjectSec = useMemo(() => {
    const totalSec = Math.max(0, totalMs / 1000);
    if (!rows.length) return {};

    const durations = rows.reduce((acc, r) => {
      acc[r.key] = durationSec(r.key);
      return acc;
    }, {});

    const maxDur = Math.max(...Object.values(durations));

    // กันกรณี time = 0 (เช่นเข้าหน้านี้ตรง ๆ)
    const effectiveTotal = totalSec > 0 ? totalSec : maxDur;

    const per = {};
    rows.forEach((r) => {
      const ratio = durations[r.key] / maxDur;
      per[r.key] = Number((effectiveTotal * ratio).toFixed(2));
    });

    return per;
  }, [rows, totalMs, heightM]);

  // ✅ ปุ่มเสียงสรุป (TTS)
  const speakSummary = () => {
    try {
      const u = new SpeechSynthesisUtterance(t.summary);
      // เลือกเสียงให้พอเหมาะ (ถ้ามี)
      u.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (e) {
      // เงียบไว้ ไม่ให้พัง
    }
  };

  const heightLabel = `${t.height}: ${heightM.toFixed(0)} m`;

  return (
    <div className="res-page">
      <img className="res-bg" src={assets.bg} alt="bg" />

      <div className="res-shell">
        {/* header */}
        <div className="res-head">
          <div className="res-title">{t.title}</div>
          <div className="res-sub">{t.subtitle}</div>

          <div className="res-pill">{heightLabel}</div>
        </div>

        {/* table */}
        <div className="res-card">
          <div className="res-table">
            <div className="res-thead">
              <div>{t.objCol}</div>
              <div>{t.resultCol}</div>
              <div className="center">{t.timeCol}</div>
              <div className="center">{t.dirCol}</div>
            </div>

            <div className="res-tbody">
              {rows.map((r) => (
                <div className="res-row" key={r.key}>
                  <div className="objcell">
                    <img className="objimg" src={r.img} alt={r.name[lang]} />
                    <div className="objname">{r.name[lang]}</div>
                  </div>

                  <div>
                    <span className="badge green">{t.hitGround}</span>
                  </div>

                  <div className="center timecell">
                    {timePerObjectSec?.[r.key]?.toFixed(2)}
                  </div>

                  <div className="center">
                    {r.motion === "straight" ? (
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

              {!rows.length && (
                <div className="res-empty">
                  ไม่พบวัตถุที่เลือก (กรุณากลับไปเลือกวัตถุ)
                </div>
              )}
            </div>
          </div>
        </div>

        {/* summary */}
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

      {/* bottom left: language */}
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

      {/* bottom center: retry */}
      <button className="res-retry" onClick={() => navigate(RETRY_PATH)} type="button">
        ↻ {t.retry}
      </button>

      {/* bottom right: back classroom (RED) */}
      <button className="res-backClass" onClick={() => navigate(CLASSROOM_PATH)} type="button">
        ← {t.backClass}
      </button>
    </div>
  );
}
