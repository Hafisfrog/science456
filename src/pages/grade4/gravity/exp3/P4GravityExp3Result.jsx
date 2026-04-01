import { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./P4GravityExp3Result.css";

export default function P4GravityExp3Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const BACK_ACTION = "/p4/gravity/exp3/action";
  const NEXT_PATH = "/p4/gravity/exp3/answer";

  const state = location.state || {};
  const [lang, setLang] = useState(state.lang || "th");

  const items = state.items || [];
  const records = state.records || [];

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

  const text = useMemo(
    () => ({
      th: {
        title: "ผลการทดลอง",
        colObj: "วัตถุ",
        sec: "สถานที่ทดลอง",
        colEarth: "น้ำหนักบนโลก",
        colMoon: "น้ำหนักบนดวงจันทร์",
        summaryTitle: "สรุปผลการทดลอง",
        summary:
          "วัตถุชนิดเดียวกันมีมวลเท่ากัน แต่จะมีน้ำหนักต่างกันเมื่ออยู่ในบริเวณที่มีแรงดึงดูดต่างกัน โลกมีแรงดึงดูดมากกว่าดวงจันทร์ จึงทำให้วัตถุมีน้ำหนักบนโลกมากกว่าบนดวงจันทร์",
        retry: "ทดลองอีกครั้ง",
        next: "ต่อไป »",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        speakAll: "ฟังทั้งหน้า",
        unitN: "นิวตัน",
        noData: "ยังไม่มีข้อมูล",
      },
      en: {
        title: "Results",
        colObj: "Object",
        sec: "Experiment place",
        colEarth: "Weight on Earth",
        colMoon: "Weight on the Moon",
        summaryTitle: "Conclusion",
        summary:
          "An object with the same mass can have different weight under different gravity. Earth's gravity is stronger than the Moon's, so objects weigh more on Earth than on the Moon.",
        retry: "Try again",
        next: "Next »",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        speakAll: "Listen to page",
        unitN: "N",
        noData: "No data",
      },
      ms: {
        title: "Keputusan Eksperimen",
        colObj: "Objek",
        sec: "Tempat eksperimen",
        colEarth: "Berat di Bumi",
        colMoon: "Berat di Bulan",
        summaryTitle: "Kesimpulan",
        summary:
          "Objek dengan jisim yang sama boleh mempunyai berat berbeza apabila graviti berbeza. Graviti Bumi lebih kuat daripada graviti Bulan, jadi objek lebih berat di Bumi berbanding di Bulan.",
        retry: "Cuba lagi",
        next: "Seterusnya »",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Melayu",
        speakAll: "Dengar satu halaman",
        unitN: "N",
        noData: "Tiada data",
      },
    }),
    []
  );

  const t = text[lang];
  const fmtN = (value) => {
    const num = Number(value);
    if (!Number.isFinite(num)) return "";
    return num < 0.1 ? num.toFixed(3) : num.toFixed(1);
  };

  const recMap = useMemo(() => {
    const map = {};
    records.forEach((record) => {
      map[record.itemId] = record;
    });
    return map;
  }, [records]);

  const rows = useMemo(
    () =>
      items.map((item) => {
        const record = recMap[item.id];
        return {
          id: item.id,
          label: item.label || item.id,
          earthN: record ? record.earthN : null,
          moonN: record ? record.moonN : null,
        };
      }),
    [items, recMap]
  );

  const speakAll = () => {
    const list = rows
      .map((row) => {
        const earth = row.earthN == null ? t.noData : `${fmtN(row.earthN)} ${t.unitN}`;
        const moon = row.moonN == null ? t.noData : `${fmtN(row.moonN)} ${t.unitN}`;
        return `${row.label}: ${t.colEarth} ${earth}, ${t.colMoon} ${moon}`;
      })
      .join("\n");

    speak(`${t.title}\n${t.summaryTitle}\n${t.summary}\n\n${list}`);
  };

  return (
    <div className="e3r-page">
      <img
        src="/images/p4/backgrounds-p4.jpg"
        alt="Laboratory background"
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.9]"
      />

      <div className="e3r-title">{t.title}</div>

      <div className="e3r-sheet">
        <div className="e3r-tableWrap">
          <div className="e3r-table">
            <div className="e3r-h e3r-h-obj">{t.colObj}</div>
            <div className="e3r-h e3r-h-mid">{t.sec}</div>

            <div className="e3r-subh e3r-subh-earth">{t.colEarth}</div>
            <div className="e3r-subh e3r-subh-moon">{t.colMoon}</div>

            {rows.map((row, idx) => (
              <div className="e3r-row" key={row.id} style={{ gridRow: idx + 3 }}>
                <div className="e3r-cell e3r-cell-obj">
                  <span className="e3r-mobileLabel">{t.colObj}</span>
                  {row.label}
                </div>

                <div className="e3r-cell">
                  <span className="e3r-mobileLabel">{t.colEarth}</span>
                  {row.earthN == null ? (
                    <span className="e3r-dot">{t.noData}</span>
                  ) : (
                    <span className="e3r-val">{fmtN(row.earthN)} {t.unitN}</span>
                  )}
                </div>

                <div className="e3r-cell e3r-last">
                  <span className="e3r-mobileLabel">{t.colMoon}</span>
                  {row.moonN == null ? (
                    <span className="e3r-dot">{t.noData}</span>
                  ) : (
                    <span className="e3r-val">{fmtN(row.moonN)} {t.unitN}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="e3r-sumTitle">{t.summaryTitle}</div>
        <div className="e3r-sumBox">
          <div className="e3r-sumText">{t.summary}</div>
          <button className="e3r-sumSpeak" type="button" onClick={() => speak(t.summary)} title={t.speakAll}>
            🔊
          </button>
        </div>
      </div>

      <div className="e3r-langDock">
        <button className={`e3r-chip ${lang === "th" ? "active" : ""}`} onClick={() => setLang("th")} type="button">
          {t.chipTh}
        </button>
        <button className={`e3r-chip ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")} type="button">
          {t.chipEn}
        </button>
        <button className={`e3r-chip ${lang === "ms" ? "active" : ""}`} onClick={() => setLang("ms")} type="button">
          {t.chipMs}
        </button>
        {/* <button className="e3r-chipAudio" type="button" onClick={speakAll} title={t.speakAll}>
          🔊
        </button> */}
      </div>

      <button className="e3r-retryCenter" type="button" onClick={() => navigate(BACK_ACTION)}>
        {t.retry}
      </button>

      <div className="e3r-actions">
        <button className="e3r-btn danger" type="button" onClick={() => navigate(NEXT_PATH)}>
          {t.next}
        </button>
      </div>
    </div>
  );
}
