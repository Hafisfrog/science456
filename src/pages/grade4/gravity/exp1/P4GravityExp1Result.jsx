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
          "เมื่อเราปล่อยวัตถุให้ตกจากที่สูงหรือโยนวัตถุขึ้นไปในอากาศ วัตถุจะตกลงสู่พื้นโลกเสมอ\nเพราะโลกมีแรงโน้มถ่วงจึงดึงดูดวัตถุต่าง ๆ ให้ตกลงสู่พื้นได้",
        listen: "ฟังสรุป",
        back: "ย้อนกลับ",
        retry: "ทดลองอีกครั้ง",
        next: "ต่อไป",
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
          "When we drop an object from a height or throw it up into the air, it always falls to the ground.\nBecause the Earth has gravity that pulls objects downward.",
        listen: "Listen",
        back: "Back",
        retry: "Try Again",
        next: "Next",
        empty: "No selected objects were found. Please go back and choose objects again.",
        th: "ไทย",
        en: "อังกฤษ",
        ms: "มลายู",
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
          "Apabila kita melepaskan objek dari tempat tinggi atau membaling objek ke udara, objek itu akan sentiasa jatuh ke tanah.\nKerana Bumi mempunyai graviti yang menarik objek ke bawah.",
        listen: "Dengar",
        back: "Kembali",
        retry: "Cuba Lagi",
        next: "Seterusnya",
        empty: "Tiada objek yang dipilih. Sila kembali dan pilih objek sekali lagi.",
        th: "ไทย",
        en: "อังกฤษ",
        ms: "มลายู",
      },
    }),
    []
  );

  const t = text[lang];

  const assets = useMemo(
    () => ({
      ball: "/images/p4/exp1/soccer-ball.png",
      bocce: "/images/p4/exp1/bocce.png",
      feather: "/images/p4/exp2/feather2.png",
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
      <img
        src="/images/p4/backgrounds-p4.jpg"
        alt="Laboratory background"
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.9]"
      />

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
              🔊
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

      <div className="res-retryBar">
        <button className="res-navBtn res-retryBtn" onClick={() => navigate(RETRY_PATH)} type="button">
          ↺ {t.retry}
        </button>
      </div>

      <div className="res-navBar">
        <button className="res-navBtn res-backBtn" onClick={() => navigate(RETRY_PATH)} type="button">
          « {t.back}
        </button>

        <button className="res-navBtn res-nextBtn" onClick={() => navigate(CLASSROOM_PATH)} type="button">
          {t.next} »
        </button>
      </div>
    </div>
  );
}
