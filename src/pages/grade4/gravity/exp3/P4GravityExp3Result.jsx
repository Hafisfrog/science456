import { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import "../exp2/P4GravityExp2Result.css";
import "../exp1/P4GravityExp1Materials.css";

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
        colMeasured: "สถานที่ทดลอง",
        t1: "น้ำหนักบนโลก",
        t2: "น้ำหนักบนดวงจันทร์",
        summaryTitle: "สรุปผลการทดลอง",
        back: "ย้อนกลับ",
        retry: "ทดลองอีกครั้ง",
        next: "ต่อไป",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        speakAll: "ฟังทั้งหน้า",
        book: "หนังสือ",
        rock: "ก้อนหิน",
        mango: "มะม่วง",
        unitN: "นิวตัน",
        noData: "ยังไม่มีข้อมูล",
        summary:
          "วัตถุชนิดเดียวกันมีมวลเท่ากัน แต่จะมีน้ำหนักต่างกันเมื่ออยู่ในบริเวณที่มีแรงดึงดูดต่างกัน โลกมีแรงดึงดูดมากกว่าดวงจันทร์ \nจึงทำให้วัตถุมีน้ำหนักบนโลกมากกว่าบนดวงจันทร์",
      },
      en: {
        title: "Experiment Results",
        colObj: "Object",
        colMeasured: "Experiment Location",
        t1: "Weight on Earth",
        t2: "Weight on the Moon",
        summaryTitle: "Conclusion",
        back: "Back",
        retry: "Try again",
        next: "Next",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        speakAll: "Listen to page",
        book: "Book",
        rock: "Rock",
        mango: "Mango",
        unitN: "N",
        noData: "No data",
        summary:
          "Objects of the same type have the same mass, but their weight can be different when they are in places with different \ngravitational forces. The Earth has stronger gravity than the Moon, so objects weigh more on Earth than on the Moon.",
      },
      ms: {
        title: "Keputusan Eksperimen",
        colObj: "Objek",
        colMeasured: "Tempat Eksperimen",
        t1: "Berat di Bumi",
        t2: "Berat di Bulan",
        summaryTitle: "Rumusan",
        back: "Kembali",
        retry: "Cuba lagi",
        next: "Seterusnya",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        speakAll: "Dengar satu halaman",
        book: "Buku",
        rock: "Batu",
        mango: "Mangga",
        unitN: "N",
        noData: "Tiada data",
        summary:
          "Objek yang sama mempunyai jisim yang sama, tetapi beratnya berbeza apabila berada di kawasan dengan daya graviti yang berbeza. Bumi mempunyai daya graviti yang lebih kuat daripada Bulan, \noleh itu objek mempunyai berat yang lebih besar di Bumi berbanding di Bulan.",
      },
    }),
    []
  );

  const t = text[lang];

  const labelOf = (id) => {
    if (id === "book") return t.book;
    if (id === "rock") return t.rock;
    return t.mango;
  };

  const fmtN = (value) => {
    const num = Number(value);
    if (!Number.isFinite(num)) return "";
    return num < 0.1 ? num.toFixed(3) : num.toFixed(1);
  };

  const latestRecordByItemId = useMemo(() => {
    const map = {};
    records.forEach((record) => {
      map[record.itemId] = record;
    });
    return map;
  }, [records]);

  const tableRows = useMemo(() => {
    const order = ["book", "rock", "mango"];

    return order.map((id) => {
      const item = items.find((entry) => entry.id === id);
      const record = latestRecordByItemId[id];

      return {
        id,
        label: item?.label || labelOf(id),
        earthN: record?.earthN ?? null,
        moonN: record?.moonN ?? null,
      };
    });
  }, [items, latestRecordByItemId, t]);

  const speakPage = () => {
    const rowText = tableRows
      .map((row) => {
        const earth = row.earthN == null ? t.noData : `${fmtN(row.earthN)} ${t.unitN}`;
        const moon = row.moonN == null ? t.noData : `${fmtN(row.moonN)} ${t.unitN}`;
        return `${row.label}: ${t.t1} ${earth}. ${t.t2} ${moon}`;
      })
      .join("\n");

    speak(`${t.title}\n${t.summaryTitle}\n${t.summary}\n\n${rowText}`);
  };

  return (
    <div className="exp2r2-page">
      <HomeButton />

      <img
        src="/images/p4/backgrounds-p4.jpg"
        alt="Laboratory background"
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.9]"
      />

      <div className="exp2r2-title">{t.title}</div>

      <div className="exp2r2-sheet">
        <div className="exp2r2-tableWrap">
          <div
            className="exp2r2-table"
            style={{ gridTemplateColumns: "260px 1fr 1fr", minWidth: "980px" }}
          >
            <div className="exp2r2-h exp2r2-h-obj">{t.colObj}</div>
            <div className="exp2r2-h" style={{ gridColumn: "2 / span 2", gridRow: "1" }}>
              {t.colMeasured}
            </div>

            <div className="exp2r2-subh exp2r2-subh-t1">{t.t1}</div>
            <div className="exp2r2-subh exp2r2-subh-t2" style={{ gridColumn: "3", borderRight: "none" }}>
              {t.t2}
            </div>

            {tableRows.map((row) => (
              <div className="exp2r2-row" key={row.id}>
                <div className="exp2r2-cell exp2r2-objCell">
                  <span className="exp2r2-mobileLabel">{t.colObj}</span>
                  {row.label}
                </div>
                <div className="exp2r2-cell">
                  <span className="exp2r2-mobileLabel">{t.t1}</span>
                  {row.earthN == null ? (
                    <span className="exp2r2-dots" style={{ color: "#dc2626", letterSpacing: 0 }}>{t.noData}</span>
                  ) : (
                    <span className="exp2r2-val">
                      {fmtN(row.earthN)} {t.unitN}
                    </span>
                  )}
                </div>
                <div className="exp2r2-cell exp2r2-avgCell">
                  <span className="exp2r2-mobileLabel">{t.t2}</span>
                  {row.moonN == null ? (
                    <span className="exp2r2-dots" style={{ color: "#dc2626", letterSpacing: 0 }}>{t.noData}</span>
                  ) : (
                    <span className="exp2r2-val">
                      {fmtN(row.moonN)} {t.unitN}
                    </span>
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

      <div className="exp1m-langBar">
        <button className={`exp1m-chip ${lang === "th" ? "active" : ""}`} onClick={() => setLang("th")} type="button">
          {t.chipTh}
        </button>
        <button className={`exp1m-chip ${lang === "ms" ? "active" : ""}`} onClick={() => setLang("ms")} type="button">
          {t.chipMs}
        </button>
        <button className={`exp1m-chip ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")} type="button">
          {t.chipEn}
        </button>
      </div>

      <button className="exp2r2-retry" type="button" onClick={() => navigate(BACK_ACTION, { state: { lang } })}>
        ↺ {t.retry}
      </button>

      <div className="exp1m-actionRow">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[10px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          type="button"
          onClick={() => navigate(BACK_ACTION, { state: { lang } })}
        >
          « {t.back}
        </button>
        <button className="exp1m-nextBtn" type="button" onClick={() => navigate(NEXT_PATH)}>
          {t.next} »
        </button>
      </div>
    </div>
  );
}
