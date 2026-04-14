import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp2Action.css";
import "../exp1/P4GravityExp1Materials.css";

export default function P4GravityExp2Action() {
  const navigate = useNavigate();

  const BACK_PATH = "/p4/gravity/exp2/question";
  const RESULT_PATH = "/p4/gravity/exp2/result";

  const [lang, setLang] = useState("th");
  const speakingRef = useRef(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (msg) => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      speakingRef.current = true;
      setIsSpeaking(true);

      utterance.onend = () => {
        speakingRef.current = false;
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        speakingRef.current = false;
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore speech errors
    }
  };

  const stopSpeak = () => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      speakingRef.current = false;
      setIsSpeaking(false);
    } catch {
      // ignore speech errors
    }
  };

  const text = useMemo(
    () => ({
      th: {
        topTitle:
          "ลงมือทดลองจริง: เลือกวัตถุ → วางบนเครื่องชั่งสปริง → บันทึกค่าน้ำหนัก",
        chooseTitle: "เลือกอุปกรณ์/วัตถุ",
        // chooseSub: "เลือกชิ้นที่ต้องการวางบนเครื่องชั่ง",
        selected: "วัตถุที่เลือก",
        mass: "มวล",
        weight: "น้ำหนัก",
        // hint: "น้ำหนักขึ้นกับมวลและแรงดึงดูดของโลก",
        recordTitle: "บันทึกผล",
        // recordSub: "เก็บค่าเพื่อเปรียบเทียบ",
        colObj: "วัตถุ",
        colMass: "มวล",
        colW: "น้ำหนัก ",
        empty: "ยังไม่มีข้อมูล\nกด \"บันทึกค่าน้ำหนัก\" เพื่อเพิ่มแถว",
        save: "+ บันทึกค่าน้ำหนัก",
        clear: "รีเซ็ตตาราง",
        viewAll: "ดูผลลัพธ์ทั้งหมด",
        back: "ย้อนกลับ",
        next: "ต่อไป",
        note:
          "ลองเลือกและบันทึกหลายชิ้น แล้วสังเกตว่าเมื่อมวลมากขึ้น น้ำหนักก็จะมากขึ้นตาม",
        groupBall: "ลูกบอล",
        groupBocce: "ลูกเปตอง",
        groupFeather: "ขนนก",
        piece1: "ชิ้นที่ 1",
        piece2: "ชิ้นที่ 2",
        piece3: "ชิ้นที่ 3",
        approxMass: "มวลประมาณ",
        speakAll: "ฟังทั้งหน้า",
        speak: "ฟัง",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        placedOnScale: "วางบนเครื่องชั่ง",
        recordedMark: "บันทึกแล้ว",
        stop: "หยุดเสียง",
        unitNewton: "นิวตัน",
        noteLabel: "หมายเหตุ",
      },
      en: {
        topTitle:
          "Hands-on experiment: Choose an object → Place it on a spring balance → Record the weight",
        chooseTitle: "Choose an Object",
        // chooseSub: "Select one piece to place on the scale",
        selected: "Selected Object",
        mass: "Mass",
        weight: "Weight",
        // hint: "Weight depends on mass and Earth's gravity.",
        recordTitle: "Records",
        // recordSub: "Save values for comparison",
        colObj: "Object",
        colMass: "Mass",
        colW: "Weight",
        empty: "No records yet.\nPress \"Save weight\" to add a row.",
        save: "+ Save weight",
        clear: "Clear table",
        viewAll: "View all results",
        back: "Back",
        next: "Next",
        note:
          "Select and record several pieces, then compare how greater mass leads to greater weight.",
        groupBall: "Ball",
        groupBocce: "Bocce Ball",
        groupFeather: "Feather",
        piece1: "Piece 1",
        piece2: "Piece 2",
        piece3: "Piece 3",
        approxMass: "Approx. mass",
        speakAll: "Listen to page",
        speak: "Listen",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        placedOnScale: "Placed on scale",
        recordedMark: "Recorded",
        stop: "Stop audio",
        unitNewton: "newton",
        noteLabel: "Note",
      },
      ms: {
        topTitle:
          "Eksperimen secara praktikal: Pilih objek → Letakkan pada penimbang spring → Catat nilai berat",
        chooseTitle: "Pilih Objek",
        // chooseSub: "Pilih satu keping untuk diletakkan pada penimbang",
        selected: "Objek Dipilih",
        mass: "Jisim",
        weight: "Berat",
        // hint: "Berat bergantung pada jisim dan graviti Bumi.",
        recordTitle: "Rekod",
        // recordSub: "Simpan nilai untuk perbandingan",
        colObj: "Objek",
        colMass: "Jisim",
        colW: "Berat",
        empty: "Belum ada rekod.\nTekan \"Simpan berat\" untuk tambah baris.",
        save: "+ Simpan berat",
        clear: "Kosongkan jadual",
        viewAll: "Lihat semua keputusan",
        back: "Kembali",
        next: "Seterusnya",
        note:
          "Pilih dan rekod beberapa keping supaya anda dapat melihat bahawa jisim yang lebih besar memberi berat yang lebih besar.",
        groupBall: "Bola",
        groupBocce: "Bola Bocce",
        groupFeather: "Bulu",
        piece1: "Keping 1",
        piece2: "Keping 2",
        piece3: "Keping 3",
        approxMass: "Anggaran jisim",
        speakAll: "Dengar satu halaman",
        speak: "Dengar",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        placedOnScale: "Diletakkan pada penimbang",
        recordedMark: "Direkod",
        stop: "Henti audio",
        unitNewton: "newton",
        noteLabel: "Nota",
      },
    }),
    []
  );

  const t = text[lang];

  const speakAll = () => {
    const message = [
      t.topTitle,
      `${t.chooseTitle}`,
      `${t.recordTitle}`,
      t.note,
    ].join("\n\n");

    speak(message);
  };

  const assets = useMemo(
    () => ({
      bg: "/images/p4/exp2/bg-lab.jpg",
      ball1: "/images/p4/exp2/ball1.png",
      ball2: "/images/p4/exp2/ball2.png",
      ball3: "/images/p4/exp2/ball3.png",
      bocce1: "/images/p4/exp2/bocce1.png",
      bocce2: "/images/p4/exp2/bocce2.png",
      bocce3: "/images/p4/exp2/bocce3.png",
      feather1: "/images/p4/exp2/feather1.png",
      feather2: "/images/p4/exp2/feather2.png",
      feather3: "/images/p4/exp2/feather3.png",
    }),
    []
  );

  const g = 9.81;
  const gaugeMaxN = 8;

  const items = useMemo(
    () => [
      { id: "ball-1", type: "ball", piece: 1, massKg: 0.42, img: assets.ball1 },
      { id: "ball-2", type: "ball", piece: 2, massKg: 0.44, img: assets.ball2 },
      { id: "ball-3", type: "ball", piece: 3, massKg: 0.43, img: assets.ball3 },
      { id: "bocce-1", type: "bocce", piece: 1, massKg: 0.7, img: assets.bocce1 },
      { id: "bocce-2", type: "bocce", piece: 2, massKg: 0.73, img: assets.bocce2 },
      { id: "bocce-3", type: "bocce", piece: 3, massKg: 0.71, img: assets.bocce3 },
      { id: "feather-1", type: "feather", piece: 1, massKg: 0.0025, img: assets.feather1 },
      { id: "feather-2", type: "feather", piece: 2, massKg: 0.0032, img: assets.feather2 },
      { id: "feather-3", type: "feather", piece: 3, massKg: 0.0028, img: assets.feather3 },
    ],
    [assets]
  );

  const [selectedId, setSelectedId] = useState("ball-1");
  const [selectedIds, setSelectedIds] = useState(["ball-1"]);
  const [records, setRecords] = useState([]);

  const selected = useMemo(
    () => items.find((item) => item.id === selectedId) || items[0],
    [items, selectedId]
  );

  const weightN = useMemo(() => (selected ? selected.massKg * g : 0), [selected]);

  const needleDeg = useMemo(() => {
    const clamped = Math.max(0, Math.min(weightN, gaugeMaxN));
    return -70 + (clamped / gaugeMaxN) * 140;
  }, [gaugeMaxN, weightN]);

  const gaugeMarks = useMemo(
    () =>
        Array.from({ length: gaugeMaxN + 1 }, (_, value) => {
          const angleDeg = -70 + (value / gaugeMaxN) * 140;
          const angleRad = (angleDeg * Math.PI) / 180;
          const radiusX = 41;
          const radiusY = 41;
          const centerX = 50;
          const centerY = 76;

          return {
            value,
            left: `${centerX + Math.sin(angleRad) * radiusX}%`,
          top: `${centerY - Math.cos(angleRad) * radiusY}%`,
          rotate: `${angleDeg * 0.18}deg`,
        };
      }),
    [gaugeMaxN]
  );

  const addRecord = () => {
    if (!selected) return;

    const record = {
      rid: `${selected.id}-${Date.now()}`,
      itemId: selected.id,
      type: selected.type,
      piece: selected.piece,
      massKg: selected.massKg,
      weightN: selected.massKg * g,
      img: selected.img,
      at: Date.now(),
    };

    setRecords((prev) => {
      const next = prev.filter((entry) => entry.itemId !== selected.id);
      next.push(record);
      return next;
    });
  };

  const clearRecords = () => setRecords([]);

  const typeLabel = (type) => {
    if (type === "ball") return t.groupBall;
    if (type === "bocce") return t.groupBocce;
    return t.groupFeather;
  };

  const pieceLabel = (piece) => {
    if (piece === 1) return t.piece1;
    if (piece === 2) return t.piece2;
    return t.piece3;
  };

  const fmtN = (value) => (value < 0.1 ? value.toFixed(3) : value.toFixed(2));
  const fmtKg = (value) => (value < 0.01 ? `${(value * 1000).toFixed(1)} g` : `${value.toFixed(2)} kg`);

  const grouped = useMemo(() => {
    const map = { ball: [], bocce: [], feather: [] };
    items.forEach((item) => map[item.type].push(item));
    return map;
  }, [items]);

  const latestRecordById = useMemo(() => {
    const map = {};
    records.forEach((record) => {
      map[record.itemId] = record;
    });
    return map;
  }, [records]);

  const onSelect = (id) => {
    setSelectedId(id);
    setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const goResult = () => {
    navigate(RESULT_PATH, {
      state: {
        lang,
        g,
        items,
        records,
        selectedIds,
      },
    });
  };

  const speakWeight = () => {
    speak(`${t.weight}. ${fmtN(weightN)} ${t.unitNewton}`);
  };

  return (
    <div className="exp2a-page">
      <img className="exp2a-bg" src={assets.bg} alt="background" />
      <div className="exp2a-overlay" />

      <div className="exp2a-topbar">
        <div className="exp2a-titleCard">
          <div className="exp2a-titleText">{t.topTitle}</div>
          {/* <button
            className="exp2a-iconBtn"
            type="button"
            onClick={isSpeaking ? stopSpeak : speakAll}
            title={isSpeaking ? t.stop : t.speakAll}
            aria-label={isSpeaking ? t.stop : t.speakAll}
          >
            {isSpeaking ? "■" : "🔊"}
          </button> */}
        </div>
      </div>

      <div className="exp2a-wrap">
        <section className="exp2a-pane exp2a-paneLeft">
          <header className="exp2a-paneHead">
            <div className="exp2a-paneTitle">
              {t.chooseTitle}
              <button
                className="exp2a-miniIcon"
                type="button"
                onClick={() => speak(`${t.chooseTitle}`)}
                title={t.speak}
                aria-label={t.speak}
                disabled={isSpeaking}
              >
                🔊
              </button>
            </div>
            {/* <div className="exp2a-paneSub">{t.chooseSub}</div> */}
          </header>

          <div className="exp2a-groups">
            {["ball", "bocce", "feather"].map((type) => (
              <div className="exp2a-group" key={type}>
                <div className="exp2a-groupHead">
                  <div className="exp2a-groupName">{typeLabel(type)}</div>
                </div>

                <div className="exp2a-cards">
                  {grouped[type].map((item) => {
                    const active = item.id === selectedId;
                    const recorded = Boolean(latestRecordById[item.id]);

                    return (
                      <button
                        key={item.id}
                        className={`exp2a-card ${active ? "active" : ""}`}
                        type="button"
                        onClick={() => onSelect(item.id)}
                        aria-pressed={active}
                      >
                        <img
                          className="exp2a-thumb"
                          src={item.img}
                          alt={`${typeLabel(type)} ${pieceLabel(item.piece)}`}
                          draggable="false"
                        />
                        <div className="exp2a-cardInfo">
                          <div className="exp2a-cardTitle">{pieceLabel(item.piece)}</div>
                          <div className="exp2a-tags">
                            {recorded && <span className="exp2a-tag green">✓ {t.recordedMark}</span>}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </section>

        <section className="exp2a-stage">
          <div className="exp2a-stageHead">
            <div className="exp2a-pill">
              {t.selected}: <span className="b">{typeLabel(selected.type)} ({pieceLabel(selected.piece)})</span>
            </div>
            <div className="exp2a-pill soft">
              {t.mass}: <span className="b">{fmtKg(selected.massKg)}</span>
            </div>
          </div>

          <div className="exp2a-stageGrid">
            <div className="exp2a-experimentCard">
              <div className="exp2a-selectedObjectTop" title={t.placedOnScale}>
                <div className="exp2a-selectedObjectPlate" aria-hidden="true" />
                <img
                  className={`exp2a-selectedObject ${selected.type}`}
                  src={selected.img}
                  alt="object on scale"
                  draggable="false"
                />
              </div>

              <div className="exp2a-scaleBody">
                <div className="exp2a-scaleTop">
                  <div className="exp2a-gaugeFace">
                    <div className="exp2a-gaugeTicks" />
                    <div className="exp2a-gaugeArc" aria-hidden="true" />
                    <div className="exp2a-gaugeLabels" aria-hidden="true">
                      {gaugeMarks.map((mark) => (
                        <span
                          key={mark.value}
                          className="exp2a-gaugeLabel"
                          style={{
                            left: mark.left,
                            top: mark.top,
                            transform: `translate(-50%, -50%) rotate(${mark.rotate})`,
                          }}
                        >
                          {mark.value}
                        </span>
                      ))}
                    </div>
                    <div
                      className="exp2a-needle"
                      style={{ transform: `translate(-50%, -90%) rotate(${needleDeg}deg)` }}
                    />
                    <div className="exp2a-needleHub" />
                  </div>
                </div>

                <div className="exp2a-readout">
                  <div className="exp2a-readLabel">
                    {t.weight}
                    <button
                      className="exp2a-miniIcon"
                      type="button"
                      onClick={speakWeight}
                      title={t.speak}
                      aria-label={t.speak}
                      disabled={isSpeaking}
                    >
                      🔊
                    </button>
                  </div>
                  <div className="exp2a-readValue">{fmtN(weightN)}</div>
                  <div className="exp2a-readUnit">{t.unitNewton}</div>
                </div>
              </div>

              {/* <div className="exp2a-hint">{t.hint}</div> */}

              <button className="exp2a-btn primary exp2a-saveBottomBtn" type="button" onClick={addRecord}>
                {t.save}
              </button>
            </div>
          </div>
        </section>

        <section className="exp2a-pane exp2a-paneRight">
          <header className="exp2a-paneHead">
            <div className="exp2a-paneTitle">
              {t.recordTitle}
              <button
                className="exp2a-miniIcon"
                type="button"
                onClick={() => speak(`${t.recordTitle}`)}
                title={t.speak}
                aria-label={t.speak}
                disabled={isSpeaking}
              >
                🔊
              </button>
            </div>
            {/* <div className="exp2a-paneSub">{t.recordSub}</div> */}
          </header>

          <div className="exp2a-tableTools">
            <button className="exp2a-btn ghost exp2a-tableResetBtn" type="button" onClick={clearRecords}>
              {t.clear}
            </button>
          </div>

          <div className="exp2a-table">
            <div className="exp2a-thead">
              <div>{t.colObj}</div>
              <div>{t.colMass}</div>
              <div className="r">{t.colW}</div>
            </div>

            {records.length === 0 ? (
              <div className="exp2a-empty">{t.empty}</div>
            ) : (
              <div className="exp2a-tbody">
                {records
                  .slice()
                  .sort((a, b) => (a.type + a.piece).localeCompare(b.type + b.piece))
                  .map((record) => (
                    <div className="exp2a-tr" key={record.rid}>
                      <div className="exp2a-td name">
                        {typeLabel(record.type)} ({pieceLabel(record.piece)})
                      </div>
                      <div className="exp2a-td">{fmtKg(record.massKg)}</div>
                      <div className="exp2a-td r">{fmtN(record.weightN)}</div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="exp2a-actionsInline exp2a-sideActions">
            <div className="exp2a-sideBottomRow">
              <button className="exp2a-btn danger" type="button" onClick={goResult}>
                {t.viewAll}
              </button>
            </div>
          </div>
        </section>
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

      <div className="absolute bottom-[18px] right-[18px] z-[30] flex items-center gap-3 max-[720px]:bottom-[12px] max-[720px]:right-[12px] max-[720px]:gap-2">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[10px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          type="button"
          onClick={() => navigate(BACK_PATH)}
        >
          « {t.back}
        </button>
        <button
          className="rounded-[18px] bg-[linear-gradient(135deg,#ef4444,#b91c1c)] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[12px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          type="button"
          onClick={goResult}
        >
          {t.next} »
        </button>
      </div>
    </div>
  );
}
