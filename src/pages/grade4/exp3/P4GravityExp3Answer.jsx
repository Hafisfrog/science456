import { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./P4GravityExp3Answer.css";

export default function P4GravityExp3Answer() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ ปรับ path ตามโปรเจกต์คุณ
  const BACK_ACTION = "/p4/gravity/exp3/action";
  const NEXT_PATH = "/p4/gravity"; // หรือหน้าถัดไป

  const state = location.state || {};
  const [lang, setLang] = useState(state.lang || "th");

  const items = state.items || [];     // [{id,label,massKg,img}]
  const records = state.records || []; // [{itemId, earthN, moonN, massKg, ts}]

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
        title: "ผลการทดลอง",
        colObj: "วัตถุ",
        sec: "สถานที่ทำการทดลอง",
        colEarth: "น้ำหนักบนโลก",
        colMoon: "น้ำหนักบนดวงจันทร์",
        summaryTitle: "สรุปผลการทดลอง",
        summary:
          "วัตถุชนิดเดียวกันมีมวลเท่ากัน แต่มีน้ำหนักต่างกันเมื่ออยู่ในบริเวณที่มีแรงดึงดูดต่างกัน เพราะโลกมีแรงดึงดูดมากกว่าดวงจันทร์ จึงดึงวัตถุได้แรงกว่า ทำให้วัตถุมีน้ำหนักมากกว่า",
        retry: "ทดลองอีกครั้ง",
        next: "ต่อไป »",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        speakAll: "ฟังทั้งหน้า",
        unitN: "นิวตัน",
        emptyDot: "................................",
      },
      en: {
        title: "Results",
        colObj: "Object",
        sec: "Experiment place",
        colEarth: "Weight on Earth",
        colMoon: "Weight on the Moon",
        summaryTitle: "Conclusion",
        summary:
          "An object with the same mass can have different weight in different gravity. Earth’s gravity is stronger than the Moon’s, so objects weigh more on Earth.",
        retry: "Try again",
        next: "Next »",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        speakAll: "Listen to page",
        unitN: "N",
        emptyDot: "................................",
      },
      ms: {
        title: "Keputusan Eksperimen",
        colObj: "Objek",
        sec: "Tempat eksperimen",
        colEarth: "Berat di Bumi",
        colMoon: "Berat di Bulan",
        summaryTitle: "Kesimpulan",
        summary:
          "Objek dengan jisim yang sama boleh mempunyai berat berbeza apabila graviti berbeza. Graviti Bumi lebih kuat daripada Bulan, jadi objek lebih berat di Bumi.",
        retry: "Cuba lagi",
        next: "Seterusnya »",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        speakAll: "Dengar satu halaman",
        unitN: "N",
        emptyDot: "................................",
      },
    };
  }, []);

  const t = text[lang];
  const fmtN = (n) => (n < 0.1 ? n.toFixed(3) : n.toFixed(1));

  // map record by itemId
  const recMap = useMemo(() => {
    const m = {};
    records.forEach((r) => (m[r.itemId] = r));
    return m;
  }, [records]);

  // rows (ถ้าไม่บันทึก -> ว่าง)
  const rows = useMemo(() => {
    return (items || []).map((it) => {
      const r = recMap[it.id];
      return {
        id: it.id,
        label: it.label || it.id,
        earthN: r ? r.earthN : null,
        moonN: r ? r.moonN : null,
      };
    });
  }, [items, recMap]);

  const speakAll = () => {
    const list = rows
      .map((r) => {
        const e = r.earthN == null ? "-" : `${fmtN(r.earthN)} ${t.unitN}`;
        const m = r.moonN == null ? "-" : `${fmtN(r.moonN)} ${t.unitN}`;
        return `${r.label}: ${t.colEarth} ${e}, ${t.colMoon} ${m}`;
      })
      .join("\n");
    speak(`${t.title}\n${t.summaryTitle}\n${t.summary}\n\n${list}`);
  };

  return (
    <div className="e3r-page">
      <div className="e3r-bg" />

      <div className="e3r-title">{t.title}</div>

      <div className="e3r-sheet">
        <div className="e3r-table">
          {/* header */}
          <div className="e3r-h e3r-h-obj">{t.colObj}</div>
          <div className="e3r-h e3r-h-mid">{t.sec}</div>

          <div className="e3r-subh e3r-subh-earth">{t.colEarth}</div>
          <div className="e3r-subh e3r-subh-moon">{t.colMoon}</div>

          {/* body */}
          {rows.map((r, idx) => (
            <div className="e3r-row" key={r.id} style={{ gridRow: idx + 3 }}>
              <div className="e3r-cell e3r-cell-obj">{r.label}</div>

              <div className="e3r-cell">
                {r.earthN == null ? (
                  <span className="e3r-dot">{t.emptyDot}</span>
                ) : (
                  <span className="e3r-val">{fmtN(r.earthN)} {lang === "th" ? t.unitN : "N"}</span>
                )}
              </div>

              <div className="e3r-cell e3r-last">
                {r.moonN == null ? (
                  <span className="e3r-dot">{t.emptyDot}</span>
                ) : (
                  <span className="e3r-val">{fmtN(r.moonN)} {lang === "th" ? t.unitN : "N"}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="e3r-sumTitle">{t.summaryTitle}</div>
        <div className="e3r-sumBox">
          <div className="e3r-sumText">{t.summary}</div>
        </div>
      </div>

      {/* bottom-left lang + audio */}
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
        <button className="e3r-chipAudio" type="button" onClick={speakAll} title={t.speakAll}>
          🔊
        </button>
      </div>

      {/* ✅ ปุ่มทดลองอีกครั้ง “ล่างตรงกลาง” */}
      <button className="e3r-retryCenter" type="button" onClick={() => navigate(BACK_ACTION)}>
        {t.retry}
      </button>

      {/* bottom-right next */}
      <div className="e3r-actions">
        <button className="e3r-btn danger" type="button" onClick={() => navigate(NEXT_PATH)}>
          {t.next}
        </button>
      </div>
    </div>
  );
}
