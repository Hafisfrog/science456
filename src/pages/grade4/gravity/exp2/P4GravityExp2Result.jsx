import { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import "./P4GravityExp2Result.css";
import "../exp1/P4GravityExp1Materials.css";

const MALAY_SUMMARY_AUDIO = "/audio/p4/20.1.mp3";

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
  const audioRef = useRef(null);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    speakingRef.current = false;
  };

  const speak = (msg) => {
    try {
      stopAudio();
      if (!window.speechSynthesis) return;
      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.lang = lang === "th" ? "th-TH" : "en-US";
      speakingRef.current = true;
      utterance.onend = () => {
        speakingRef.current = false;
      };
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore speech errors
    }
  };

  const speakSummary = () => {
    try {
      stopAudio();

      if (lang === "ms") {
        speakingRef.current = true;
        const audio = new Audio(MALAY_SUMMARY_AUDIO);
        audioRef.current = audio;
        audio.onended = () => {
          speakingRef.current = false;
        };
        audio.play().catch(() => {
          speakingRef.current = false;
        });
        return;
      }

      speak(t.summary);
    } catch {
      // ignore audio errors
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
        back: "ย้อนกลับ",
        retry: "ทดลองอีกครั้ง",
        next: "ต่อไป",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายูถิ่น",
        speakAll: "ฟังทั้งหน้า",
        ball: "ลูกบอล",
        bocce: "ลูกเปตอง",
        feather: "ขนนก",
        unitN: "นิวตัน",
        noData: "ยังไม่มีข้อมูล",
        summary:
          "จากการทำกิจกรรม พบว่า มวลของวัตถุมีผลต่อแรงโน้มถ่วงของโลก โดยสังเกตได้จากการยืดของสปริง ในเครื่องชั่งสปริง \nโดยมวลมาก → แรงโน้มถ่วงมาก → น้ำหนักมาก \nมวลน้อย → แรงโน้มถ่วงน้อย → น้ำหนักน้อย \nดังนั้น แรงโน้มถ่วงของโลกที่กระทำต่อวัตถุแต่ละชนิดจึงมีค่าต่างกัน",
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
        back: "Back",
        retry: "Try again",
        next: "Next",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายูถิ่น",
        speakAll: "Listen to page",
        ball: "Ball",
        bocce: "Bocce Ball",
        feather: "Feather",
        unitN: "N",
        noData: "No data",
        summary:
          "From the activity, it is found that the mass of an object affects Earth’s gravitational force, which can be observed from the extension of the spring in a spring balance. \nGreater mass → greater gravitational force → greater weight \nLess mass → less gravitational force → less weight \nTherefore, the Earth’s gravitational force acting on different objects is not the same.",
      },
      ms: {
        title: "ฮาเซ ปือจูบอแอ",
        colObj: "บือนอ",
        colMeasured: "บือระตีแมแง",
        t1: "กาลี ยัง 1",
        t2: "กาลี ยัง 2",
        t3: "กาลี ยัง 3",
        avg: "บือระ",
        summaryTitle: "กือซีปูแล ฮาเซ ปือจูบอแอ",
        back: "ฮูโนกือเละ",
        retry: "มูลา",
        next: "ตือรุฮ",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายูถิ่น",
        speakAll: "Dengar satu halaman",
        ball: "บอลา",
        bocce: "บูเวาะฮ เปต็อง",
        feather: "บูลู บูรง",
        unitN: "N",
        noData: "ตาเดาะ ฮาเซ",
        summary:
          "ลือปะฮ บูวะ ปือจูบอแอ, ฮาเซ ญอ บือระ บือนอ บือรี เกอแซ ปาดอ แร็ง บูมี ตาเระ บือนอ ดี มานอ กีตอ บูเละฮ ปือราตีบีลอ สปริง ตู คอฮอ ปาแญ ดี ดาแล แกโล สปริง \n- จีซีม บาเญาะ  → แร็ง บูมี ตาเระ บือนอ บาเญาะ → บือระปง บาเญาะ \n- จีซีม ซีก → แร็ง บูมี ตาเระ บือนอ ซีก → บือระ เดาะ บาเญาะ \nมากอ, แร็ง บูมี ตาเระ บือนอ เฮาะ ตียะ-ตียะ ยือนิฮ บือระ วีเตาะ ซามอ.",
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
      <HomeButton />

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
            onClick={speakSummary}
            title={t.speakAll}
          >
            🔊
          </button>
        </div>
      </div>

      <div className="absolute bottom-[18px] left-[18px] z-[30] flex items-center gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_18px_40px_rgba(0,0,0,.22)] max-[720px]:bottom-[12px] max-[720px]:left-[12px] max-[720px]:gap-[6px] max-[720px]:rounded-[12px] max-[720px]:p-[7px]">
        <button
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition ${
            lang === "th"
              ? "bg-[#bfe0ff] text-slate-900"
              : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
          } max-[720px]:rounded-[10px] max-[720px]:px-[10px] max-[720px]:py-[8px] max-[720px]:text-[13px]`}
          onClick={() => setLang("th")}
          type="button"
        >
          {t.chipTh}
        </button>
        <button
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition ${
            lang === "ms"
              ? "bg-[#bfe0ff] text-slate-900"
              : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
          } max-[720px]:rounded-[10px] max-[720px]:px-[10px] max-[720px]:py-[8px] max-[720px]:text-[13px]`}
          onClick={() => setLang("ms")}
          type="button"
        >
          {t.chipMs}
        </button>
        <button
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition ${
            lang === "en"
              ? "bg-[#bfe0ff] text-slate-900"
              : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
          } max-[720px]:rounded-[10px] max-[720px]:px-[10px] max-[720px]:py-[8px] max-[720px]:text-[13px]`}
          onClick={() => setLang("en")}
          type="button"
        >
          {t.chipEn}
        </button>
      </div>

      <button className="exp2r2-retry" type="button" onClick={() => navigate(BACK_ACTION, { state: { lang } })}>
        ↺ {t.retry}
      </button>

      <div className="absolute bottom-[18px] right-[18px] z-[30] flex items-center gap-3 max-[720px]:bottom-[12px] max-[720px]:right-[12px] max-[720px]:gap-2">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[10px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          type="button"
          onClick={() => navigate(BACK_ACTION, { state: { lang } })}
        >
          « {t.back}
        </button>
        <button
          className="rounded-[18px] bg-[linear-gradient(135deg,#ef4444,#b91c1c)] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[12px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          type="button"
          onClick={() => navigate(NEXT_PATH)}
        >
          {t.next} »
        </button>
      </div>
    </div>
  );
}
