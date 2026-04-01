import { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./P4GravityExp2Result.css";

export default function P4GravityExp2Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const BACK_ACTION = "/p4/gravity/exp2/action";
  const NEXT_PATH = "/p4/gravity/exp2/answer";

  const state = location.state || {};
  const [lang, setLang] = useState(state.lang || "th");

  const items = state.items || [];
  const records = state.records || [];
  const selectedIds = state.selectedIds || [];

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
        colMeasured: "น้ำหนักที่ชั่งได้",
        t1: "ครั้งที่ 1",
        t2: "ครั้งที่ 2",
        t3: "ครั้งที่ 3",
        avg: "น้ำหนัก\nเฉลี่ย",
        summaryTitle: "สรุปผลการทดลอง",
        retry: "ทดลองอีกครั้ง",
        next: "ต่อไป »",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        speakAll: "ฟังทั้งหน้า",
        ball: "ลูกบอล",
        bocce: "ลูกเปตอง",
        feather: "ขนนก",
        unitN: "นิวตัน",
        noData: "ยังไม่มีข้อมูล",
        summary:
          "จากกิจกรรมนี้จะเห็นได้ว่ามวลของวัตถุมีผลต่อแรงโน้มถ่วงของโลกและน้ำหนักที่ชั่งได้ วัตถุที่มีมวลมากจะมีน้ำหนักมากกว่า ส่วนวัตถุที่มีมวลน้อยจะมีน้ำหนักน้อยกว่า",
      },
      en: {
        title: "Experiment Results",
        colObj: "Object",
        colMeasured: "Measured Weight",
        t1: "Trial 1",
        t2: "Trial 2",
        t3: "Trial 3",
        avg: "Average\nWeight",
        summaryTitle: "Conclusion",
        retry: "Try again",
        next: "Next »",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        speakAll: "Listen to page",
        ball: "Ball",
        bocce: "Bocce Ball",
        feather: "Feather",
        unitN: "N",
        noData: "No data",
        summary:
          "This activity shows that an object's mass affects gravity and the weight measured by the spring scale. Greater mass gives greater weight, while smaller mass gives smaller weight.",
      },
      ms: {
        title: "Keputusan Eksperimen",
        colObj: "Objek",
        colMeasured: "Berat Diukur",
        t1: "Cubaan 1",
        t2: "Cubaan 2",
        t3: "Cubaan 3",
        avg: "Purata\nBerat",
        summaryTitle: "Rumusan",
        retry: "Cuba lagi",
        next: "Seterusnya »",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Melayu",
        speakAll: "Dengar satu halaman",
        ball: "Bola",
        bocce: "Bola Bocce",
        feather: "Bulu",
        unitN: "N",
        noData: "Tiada data",
        summary:
          "Aktiviti ini menunjukkan bahawa jisim objek mempengaruhi graviti dan berat yang diukur dengan penimbang spring. Jisim yang lebih besar memberi berat yang lebih besar, manakala jisim yang lebih kecil memberi berat yang lebih kecil.",
      },
    }),
    []
  );

  const t = text[lang];

  const typeName = (type) => {
    if (type === "ball") return t.ball;
    if (type === "bocce") return t.bocce;
    return t.feather;
  };

  const fmtN = (value) => {
    const num = Number(value);
    if (!Number.isFinite(num)) return "";
    return num < 0.1 ? num.toFixed(3) : num.toFixed(2);
  };

  const latestRecordByItemId = useMemo(() => {
    const map = {};
    records.forEach((record) => {
      map[record.itemId] = record;
    });
    return map;
  }, [records]);

  const tableRows = useMemo(() => {
    const types = ["ball", "bocce", "feather"];

    const findItem = (type, piece) =>
      items.find((item) => item.type === type && Number(item.piece) === Number(piece)) || null;

    const getCell = (type, piece) => {
      const item = findItem(type, piece);
      if (!item || !selectedIds.includes(item.id)) return { show: false, val: null };

      const record = latestRecordByItemId[item.id];
      if (!record || !Number.isFinite(Number(record.weightN))) return { show: false, val: null };
      return { show: true, val: Number(record.weightN) };
    };

    return types.map((type) => {
      const c1 = getCell(type, 1);
      const c2 = getCell(type, 2);
      const c3 = getCell(type, 3);
      const values = [c1, c2, c3].filter((cell) => cell.show).map((cell) => cell.val);
      const avg = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;

      return {
        type,
        label: typeName(type),
        cells: [c1, c2, c3],
        avg,
      };
    });
  }, [items, latestRecordByItemId, selectedIds, t]);

  const speakPage = () => {
    const rowText = tableRows
      .map((row) => {
        const trials = row.cells
          .map((cell) => (cell.show ? `${fmtN(cell.val)} ${t.unitN}` : t.noData))
          .join(", ");
        const avg = Number.isFinite(row.avg) ? `${fmtN(row.avg)} ${t.unitN}` : t.noData;
        return `${row.label}: ${trials}. ${t.avg.replace("\n", " ")} ${avg}`;
      })
      .join("\n");

    speak(`${t.title}\n${t.summaryTitle}\n${t.summary}\n\n${rowText}`);
  };

  return (
    <div className="exp2r2-page">
      <img
        src="/images/p4/backgrounds-p4.jpg"
        alt="Laboratory background"
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.9]"
      />

      <div className="exp2r2-title">{t.title}</div>

      <div className="exp2r2-sheet">
        <div className="exp2r2-tableWrap">
          <div className="exp2r2-table">
            <div className="exp2r2-h exp2r2-h-obj">{t.colObj}</div>
            <div className="exp2r2-h exp2r2-h-mid">{t.colMeasured}</div>
            <div className="exp2r2-h exp2r2-h-avg">{t.avg}</div>

            <div className="exp2r2-subh exp2r2-subh-t1">{t.t1}</div>
            <div className="exp2r2-subh exp2r2-subh-t2">{t.t2}</div>
            <div className="exp2r2-subh exp2r2-subh-t3">{t.t3}</div>

            {tableRows.map((row) => (
              <div className="exp2r2-row" key={row.type}>
                <div className="exp2r2-cell exp2r2-objCell">
                  <span className="exp2r2-mobileLabel">{t.colObj}</span>
                  {row.label}
                </div>
                {row.cells.map((cell, idx) => (
                  <div className="exp2r2-cell" key={idx}>
                    <span className="exp2r2-mobileLabel">{[t.t1, t.t2, t.t3][idx]}</span>
                    {cell.show ? (
                      <span className="exp2r2-val">
                        {fmtN(cell.val)} {t.unitN}
                      </span>
                    ) : (
                      <span className="exp2r2-dots">{t.noData}</span>
                    )}
                  </div>
                ))}
                <div className="exp2r2-cell exp2r2-avgCell">
                  <span className="exp2r2-mobileLabel">{t.avg.replace("\n", " ")}</span>
                  {Number.isFinite(row.avg) ? (
                    <span className="exp2r2-val">
                      {fmtN(row.avg)} {t.unitN}
                    </span>
                  ) : (
                    <span className="exp2r2-dots">{t.noData}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="exp2r2-summaryTitle">{t.summaryTitle}</div>
        <div className="exp2r2-summaryBox">
          <div className="exp2r2-summaryText">{t.summary}</div>
          <button
            className="exp2r2-summarySpeak"
            type="button"
            onClick={() => speak(t.summary)}
            title={t.speakAll}
          >
            🔊
          </button>
        </div>
      </div>

      <div className="exp2r2-langbar">
        <button className={`exp2r2-chip ${lang === "th" ? "active" : ""}`} onClick={() => setLang("th")} type="button">
          {t.chipTh}
        </button>
        <button className={`exp2r2-chip ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")} type="button">
          {t.chipEn}
        </button>
        <button className={`exp2r2-chip ${lang === "ms" ? "active" : ""}`} onClick={() => setLang("ms")} type="button">
          {t.chipMs}
        </button>
        {/* <button className="exp2r2-speakBtn" type="button" onClick={speakPage} title={t.speakAll}>
          🔊
        </button> */}
      </div>

      <button className="exp2r2-retry" type="button" onClick={() => navigate(BACK_ACTION, { state: { lang } })}>
        {t.retry}
      </button>

      <button className="exp2r2-next" type="button" onClick={() => navigate(NEXT_PATH)}>
        {t.next}
      </button>
    </div>
  );
}
