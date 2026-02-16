import { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./P4GravityExp2Result.css";

export default function P4GravityExp2Result() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ paths
  const BACK_ACTION = "/p4/gravity/exp2/action";
  const NEXT_PATH = "/p4/gravity/exp2/answer"; // ปรับได้

  const state = location.state || {};
  const [lang, setLang] = useState(state.lang || "th");
  const g = state.g || 9.81;

  const items = state.items || [];
  const records = state.records || [];
  const selectedIds = state.selectedIds || []; // ✅ มาจาก Action

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
        colMeasured: "น้ำหนักที่ชั่งได้",
        t1: "ครั้งที่ 1",
        t2: "ครั้งที่ 2",
        t3: "ครั้งที่ 3",
        avg: "น้ำหนัก\nเฉลี่ย",
        summaryTitle: "สรุปผลการทดลอง",
        retry: "ทดลองอีกครั้ง",
        // next: "ต่อไป",
        next: "",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        speakAll: "ฟังทั้งหน้า",
        speak: "ฟัง",
        ball: "ลูกบอล",
        bocce: "ลูกเปตอง",
        feather: "ขนนก",
        unitN: "N",
        summary:
          "จากการทำกิจกรรม พบว่า มวลของวัตถุมีผลต่อแรงโน้มถ่วงของโลก โดยสังเกตได้จากการยืดของสปริง\nในเครื่องชั่งสปริง\nโดยมวลมาก แรงโน้มถ่วงมาก > น้ำหนักมาก\nมวลน้อย แรงโน้มถ่วงน้อย - น้ำหนักน้อย\nดังนั้น แรงโน้มถ่วงของโลกที่กระทำต่อวัตถุแต่ละชนิดจึงมีค่าต่างกัน",
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
        // next: "Next",
        next: "",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        speakAll: "Listen to this page",
        speak: "Listen",
        ball: "Ball",
        bocce: "Bocce Ball",
        feather: "Feather",
        unitN: "N",
        summary:
          "From this activity, we found that an object's mass affects Earth's gravity (weight). This can be observed from how much the spring stretches\nin the spring scale.\nGreater mass → greater gravitational force → greater weight.\nSmaller mass → smaller gravitational force → smaller weight.\nTherefore, the gravitational force acting on different objects is different.",
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
        // next: "Seterusnya",
        next: "",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        speakAll: "Dengar seluruh halaman",
        speak: "Dengar",
        ball: "Bola",
        bocce: "Bola Bocce",
        feather: "Bulu",
        unitN: "N",
        summary:
          "Daripada aktiviti ini, kita dapati jisim objek mempengaruhi graviti Bumi (berat). Ini boleh diperhatikan melalui kadar regangan spring\npada penimbang spring.\nJisim lebih besar → daya graviti lebih besar → berat lebih besar.\nJisim lebih kecil → daya graviti lebih kecil → berat lebih kecil.\nOleh itu, daya graviti yang bertindak pada objek yang berbeza adalah berbeza.",
      },
    };
  }, []);

  const t = text[lang];

  const typeName = (type) => {
    if (type === "ball") return t.ball;
    if (type === "bocce") return t.bocce;
    return t.feather;
  };

  const fmtN = (n) => {
    const num = Number(n);
    if (!Number.isFinite(num)) return "";
    return num < 0.1 ? num.toFixed(3) : num.toFixed(2);
  };

  // latest record per itemId
  const latestRecordByItemId = useMemo(() => {
    const map = {};
    records.forEach((r) => (map[r.itemId] = r));
    return map;
  }, [records]);

  // ตาราง 3 แถว (ชนิด) × 3 ครั้ง (ชิ้น 1-3)
  const tableRows = useMemo(() => {
    const types = ["ball", "bocce", "feather"];

    const findItem = (type, piece) =>
      (items || []).find((x) => x.type === type && Number(x.piece) === Number(piece)) || null;

    const getCell = (type, piece) => {
      const it = findItem(type, piece);
      if (!it) return { show: false, val: null };

      const wasSelected = selectedIds.includes(it.id);
      if (!wasSelected) return { show: false, val: null };

      const rec = latestRecordByItemId[it.id];
      if (!rec || !Number.isFinite(Number(rec.weightN))) return { show: false, val: null };

      return { show: true, val: Number(rec.weightN) };
    };

    return types.map((type) => {
      const c1 = getCell(type, 1);
      const c2 = getCell(type, 2);
      const c3 = getCell(type, 3);

      const vals = [c1, c2, c3].filter((c) => c.show).map((c) => c.val);
      const avg = vals.length ? vals.reduce((s, x) => s + x, 0) / vals.length : null;

      return {
        type,
        label: typeName(type),
        cells: [c1, c2, c3],
        avg,
      };
    });
  }, [items, selectedIds, latestRecordByItemId, lang]);

  const speakPage = () => {
    const rowText = tableRows
      .map((r) => {
        const trials = r.cells.map((c) => (c.show ? `${fmtN(c.val)} ${t.unitN}` : "—")).join(", ");
        const avg = Number.isFinite(r.avg) ? `${fmtN(r.avg)} ${t.unitN}` : "—";
        return `${r.label}: ${trials}. Avg: ${avg}`;
      })
      .join("\n");

    speak(`${t.title}\n\n${rowText}\n\n${t.summaryTitle}\n${t.summary}`);
  };

  const retry = () => {
    navigate(BACK_ACTION, { state: { lang } });
  };

  return (
    <div className="exp2r2-page">
      <div className="exp2r2-bg" />

      <div className="exp2r2-sheet">
        <div className="exp2r2-title">{t.title}</div>

        <div className="exp2r2-tableWrap">
          <div className="exp2r2-table">
            {/* header row 1 */}
            <div className="exp2r2-h exp2r2-h-obj">{t.colObj}</div>
            <div className="exp2r2-h exp2r2-h-mid">{t.colMeasured}</div>
            <div className="exp2r2-h exp2r2-h-avg">{t.avg}</div>

            {/* header row 2 */}
            <div className="exp2r2-subh exp2r2-subh-obj" />
            <div className="exp2r2-subh exp2r2-subh-t">{t.t1}</div>
            <div className="exp2r2-subh exp2r2-subh-t">{t.t2}</div>
            <div className="exp2r2-subh exp2r2-subh-t">{t.t3}</div>
            <div className="exp2r2-subh exp2r2-subh-avg" />

            {/* rows */}
            {tableRows.map((r) => (
              <div className="exp2r2-row" key={r.type}>
                <div className="exp2r2-cell exp2r2-objCell">{r.label}</div>

                {r.cells.map((c, idx) => (
                  <div className="exp2r2-cell exp2r2-valCell" key={idx}>
                    {c.show ? (
                      <span className="exp2r2-val">{fmtN(c.val)}</span>
                    ) : (
                      <span className="exp2r2-dots">........................</span>
                    )}
                  </div>
                ))}

                <div className="exp2r2-cell exp2r2-avgCell">
                  {Number.isFinite(r.avg) ? (
                    <span className="exp2r2-val">{fmtN(r.avg)}</span>
                  ) : (
                    <span className="exp2r2-dots">........................</span>
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
            title={t.speak}
          >
            🔊
          </button>
        </div>
      </div>

      {/* bottom-left language + speaker */}
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

      {/* ✅ center bottom: retry */}
      <button className="exp2r2-retry" type="button" onClick={retry}>
        ↻ {t.retry}
      </button>

      {/* ✅ keep only NEXT (ลบปุ่มกลับไปทดลองออกแล้ว) */}
      <button className="exp2r2-next" type="button" onClick={() => navigate(NEXT_PATH)}>
        {t.next} »
      </button>
    </div>
  );
}
