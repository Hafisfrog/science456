// P4GravityExp2Action.jsx
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp2Action.css";

export default function P4GravityExp2Action() {
  const navigate = useNavigate();

  const BACK_PATH = "/p4/gravity/exp2/question";
  const RESULT_PATH = "/p4/gravity/exp2/result";

  // language
  const [lang, setLang] = useState("th"); // th | en | ms

  // speech
  const speakingRef = useRef(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (msg) => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();

      const u = new SpeechSynthesisUtterance(msg);
      u.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      speakingRef.current = true;
      setIsSpeaking(true);

      u.onend = () => {
        speakingRef.current = false;
        setIsSpeaking(false);
      };
      u.onerror = () => {
        speakingRef.current = false;
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(u);
    } catch {
      // ignore
    }
  };

  const stopSpeak = () => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      speakingRef.current = false;
      setIsSpeaking(false);
    } catch {
      // ignore
    }
  };

  // text dictionary
  const text = useMemo(() => {
    return {
      th: {
        topTitle:
          "ลงมือทดลองจริง: เลือกวัตถุ → วางบนเครื่องชั่งสปริง → อ่านค่าน้ำหนัก (N)",
        back: "ย้อนกลับ",
        chooseTitle: "เลือกอุปกรณ์/วัตถุ",
        chooseSub: "เลือก “ชิ้น” ที่ต้องการวางบนเครื่องชั่ง",
        selected: "วัตถุที่เลือก",
        mass: "มวล",
        weight: "น้ำหนัก (N)",
        hint: "* น้ำหนักขึ้นกับ “มวล” และแรงดึงดูดของโลก",
        recordTitle: "บันทึกผล",
        recordSub: "เก็บค่าเพื่อเปรียบเทียบ",
        colObj: "วัตถุ",
        colMass: "มวล",
        colW: "น้ำหนัก (N)",
        empty: "ยังไม่มีข้อมูล\nกด “บันทึกค่าน้ำหนัก” เพื่อเพิ่มแถว",
        save: "+ บันทึกค่าน้ำหนัก",
        clear: "รีเซ็ตตาราง",
        viewAll: "ดูผลลัพธ์ทั้งหมด →",
        note:
          "ลองเลือกและบันทึกหลายชิ้น แล้วสังเกตว่า “มวลมากกว่า” จะมี “น้ำหนักมากกว่า”",
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
        selectedMark: "เลือกแล้ว",
        stop: "หยุดเสียง",
      },
      en: {
        topTitle:
          "Real Experiment: Choose → Place on spring scale → Read weight (N)",
        back: "Back",
        chooseTitle: "Choose an Object",
        chooseSub: "Select a specific piece to place on the scale",
        selected: "Selected",
        mass: "Mass",
        weight: "Weight (N)",
        hint: "* Weight depends on mass and Earth's gravity",
        recordTitle: "Records",
        recordSub: "Save values to compare",
        colObj: "Object",
        colMass: "Mass",
        colW: "Weight (N)",
        empty: "No records yet.\nPress “Save weight” to add a row",
        save: "+ Save weight",
        clear: "Clear table",
        viewAll: "View all results →",
        note:
          "Try selecting and recording multiple pieces: larger mass → larger weight.",
        groupBall: "Ball",
        groupBocce: "Bocce Ball",
        groupFeather: "Feather",
        piece1: "Piece 1",
        piece2: "Piece 2",
        piece3: "Piece 3",
        approxMass: "Approx. mass",
        speakAll: "Listen to page",
        speak: "Listen",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        placedOnScale: "Placed on scale",
        recordedMark: "Recorded",
        selectedMark: "Selected",
        stop: "Stop audio",
      },
      ms: {
        topTitle:
          "Eksperimen Sebenar: Pilih → Letak pada penimbang spring → Baca berat (N)",
        back: "Kembali",
        chooseTitle: "Pilih Objek",
        chooseSub: "Pilih satu ‘keping’ untuk diletakkan pada penimbang",
        selected: "Dipilih",
        mass: "Jisim",
        weight: "Berat (N)",
        hint: "* Berat bergantung pada jisim dan graviti Bumi",
        recordTitle: "Rekod",
        recordSub: "Simpan nilai untuk banding",
        colObj: "Objek",
        colMass: "Jisim",
        colW: "Berat (N)",
        empty: "Belum ada rekod.\nTekan “Simpan berat” untuk tambah baris",
        save: "+ Simpan berat",
        clear: "Kosongkan jadual",
        viewAll: "Lihat semua keputusan →",
        note:
          "Cuba pilih dan rekod beberapa keping: jisim lebih besar → berat lebih besar.",
        groupBall: "Bola",
        groupBocce: "Bola Bocce",
        groupFeather: "Bulu",
        piece1: "Keping 1",
        piece2: "Keping 2",
        piece3: "Keping 3",
        approxMass: "Anggaran jisim",
        speakAll: "Dengar satu halaman",
        speak: "Dengar",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        placedOnScale: "Diletak pada penimbang",
        recordedMark: "Direkod",
        selectedMark: "Dipilih",
        stop: "Henti audio",
      },
    };
  }, []);

  const t = text[lang];

  const speakAll = () => {
    const msg =
      `${t.topTitle}\n\n` +
      `${t.chooseTitle}: ${t.chooseSub}\n\n` +
      `${t.hint}\n\n` +
      `${t.recordTitle}: ${t.recordSub}\n` +
      `${t.note}`;
    speak(msg);
  };

  // assets
  const assets = useMemo(() => {
    return {
      bg: "/images/p4/exp2/bg-lab.jpg",
      scale: "/images/p4/exp2/spring-scale.png",
      ball1: "/images/p4/exp2/ball1.png",
      ball2: "/images/p4/exp2/ball2.png",
      ball3: "/images/p4/exp2/ball3.png",
      bocce1: "/images/p4/exp2/bocce1.png",
      bocce2: "/images/p4/exp2/bocce2.png",
      bocce3: "/images/p4/exp2/bocce3.png",
      feather1: "/images/p4/exp2/feather1.png",
      feather2: "/images/p4/exp2/feather2.png",
      feather3: "/images/p4/exp2/feather3.png",
    };
  }, []);

  // data
  const g = 9.81;
  const items = useMemo(() => {
    return [
      { id: "ball-1", type: "ball", piece: 1, massKg: 0.42, img: assets.ball1 },
      { id: "ball-2", type: "ball", piece: 2, massKg: 0.44, img: assets.ball2 },
      { id: "ball-3", type: "ball", piece: 3, massKg: 0.43, img: assets.ball3 },

      { id: "bocce-1", type: "bocce", piece: 1, massKg: 0.7, img: assets.bocce1 },
      { id: "bocce-2", type: "bocce", piece: 2, massKg: 0.73, img: assets.bocce2 },
      { id: "bocce-3", type: "bocce", piece: 3, massKg: 0.71, img: assets.bocce3 },

      { id: "feather-1", type: "feather", piece: 1, massKg: 0.0025, img: assets.feather1 },
      { id: "feather-2", type: "feather", piece: 2, massKg: 0.0032, img: assets.feather2 },
      { id: "feather-3", type: "feather", piece: 3, massKg: 0.0028, img: assets.feather3 },
    ];
  }, [assets]);

  // selected
  const [selectedId, setSelectedId] = useState("ball-1");
  const [selectedIds, setSelectedIds] = useState(["ball-1"]);

  const selected = useMemo(
    () => items.find((x) => x.id === selectedId) || items[0],
    [items, selectedId]
  );

  const weightN = useMemo(() => (selected ? selected.massKg * g : 0), [selected, g]);

  // needle: map 0..8N => -70..70deg
  const needleDeg = useMemo(() => {
    const maxN = 8;
    const clamped = Math.max(0, Math.min(weightN, maxN));
    const ratio = clamped / maxN;
    return -70 + ratio * 140;
  }, [weightN]);

  // records (latest per item)
  const [records, setRecords] = useState([]);

  const addRecord = () => {
    if (!selected) return;

    const rec = {
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
      const next = prev.filter((r) => r.itemId !== selected.id);
      next.push(rec);
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

  const fmtN = (n) => (n < 0.1 ? n.toFixed(3) : n.toFixed(2));
  const fmtKg = (kg) => (kg < 0.01 ? `${(kg * 1000).toFixed(1)} g` : `${kg.toFixed(2)} kg`);

  const grouped = useMemo(() => {
    const map = { ball: [], bocce: [], feather: [] };
    items.forEach((it) => map[it.type].push(it));
    return map;
  }, [items]);

  const latestRecordById = useMemo(() => {
    const m = {};
    records.forEach((r) => (m[r.itemId] = r));
    return m;
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
    speak(`${t.weight}. ${fmtN(weightN)} ${lang === "th" ? "นิวตัน" : "newton"}`);
  };

  return (
    <div className="exp2a-page">
      <img className="exp2a-bg" src={assets.bg} alt="bg" />
      <div className="exp2a-overlay" />

      {/* TOP BAR */}
      <div className="exp2a-topbar">
        {/* ✅ back: round icon only */}
        <button
          className="exp2a-backCircle"
          type="button"
          onClick={() => navigate(BACK_PATH)}
          aria-label={t.back}
          title={t.back}
        >
          ←
        </button>

        {/* ✅ title centered & not too wide */}
        <div className="exp2a-titleCard">
          <div className="exp2a-titleText">{t.topTitle}</div>
          <button
            className="exp2a-iconBtn"
            type="button"
            onClick={isSpeaking ? stopSpeak : speakAll}
            title={isSpeaking ? t.stop : t.speakAll}
            aria-label={isSpeaking ? t.stop : t.speakAll}
          >
            {isSpeaking ? "⏹️" : "🔊"}
          </button>
        </div>
      </div>

      <div className="exp2a-wrap">
        {/* LEFT */}
        <section className="exp2a-pane">
          <header className="exp2a-paneHead">
            <div className="exp2a-paneTitle">
              {t.chooseTitle}
              <button
                className="exp2a-miniIcon"
                type="button"
                onClick={() => speak(`${t.chooseTitle}. ${t.chooseSub}`)}
                title={t.speak}
                aria-label={t.speak}
                disabled={isSpeaking}
              >
                🔊
              </button>
            </div>
            <div className="exp2a-paneSub">{t.chooseSub}</div>
          </header>

          <div className="exp2a-groups">
            {(["ball", "bocce", "feather"]).map((type) => (
              <div className="exp2a-group" key={type}>
                <div className="exp2a-groupHead">
                  <div className="exp2a-groupName">{typeLabel(type)}</div>
                </div>

                <div className="exp2a-cards">
                  {grouped[type].map((it) => {
                    const active = it.id === selectedId;
                    const wasSelected = selectedIds.includes(it.id);
                    const recorded = !!latestRecordById[it.id];

                    return (
                      <button
                        key={it.id}
                        className={`exp2a-card ${active ? "active" : ""}`}
                        type="button"
                        onClick={() => onSelect(it.id)}
                        aria-pressed={active}
                      >
                        <img
                          className="exp2a-thumb"
                          src={it.img}
                          alt={`${typeLabel(type)} ${pieceLabel(it.piece)}`}
                          draggable="false"
                        />
                        <div className="exp2a-cardInfo">
                          <div className="exp2a-cardTitle">{pieceLabel(it.piece)}</div>
                          <div className="exp2a-cardMeta">
                            {t.approxMass}: {fmtKg(it.massKg)}
                          </div>

                          <div className="exp2a-tags">
                            {wasSelected && <span className="exp2a-tag blue">✓ {t.selectedMark}</span>}
                            {recorded && <span className="exp2a-tag green">✓ {t.recordedMark}</span>}
                          </div>
                        </div>

                        <div className="exp2a-check" aria-hidden="true">
                          {active ? "✓" : ""}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* ✅ language dock: left-bottom, inside pane, never fall off-screen */}
          <div className="exp2a-langDock">
            <div className="exp2a-lang">
              <button
                className={`exp2a-chip ${lang === "th" ? "active" : ""}`}
                onClick={() => setLang("th")}
                type="button"
              >
                {t.chipTh}
              </button>
              <button
                className={`exp2a-chip ${lang === "en" ? "active" : ""}`}
                onClick={() => setLang("en")}
                type="button"
              >
                {t.chipEn}
              </button>
              <button
                className={`exp2a-chip ${lang === "ms" ? "active" : ""}`}
                onClick={() => setLang("ms")}
                type="button"
              >
                {t.chipMs}
              </button>

              {/* <button
                className="exp2a-audioBtn"
                type="button"
                onClick={isSpeaking ? stopSpeak : speakAll}
                title={isSpeaking ? t.stop : t.speakAll}
                aria-label={isSpeaking ? t.stop : t.speakAll}
              >
                {isSpeaking ? "⏹️" : "🔊"}
              </button> */}
            </div>
          </div>
        </section>

        {/* CENTER */}
        <section className="exp2a-stage">
          <div className="exp2a-stageHead">
            <div className="exp2a-pill">
              {t.selected}:{" "}
              <span className="b">
                {typeLabel(selected.type)} ({pieceLabel(selected.piece)})
              </span>
            </div>
            <div className="exp2a-pill soft">
              {t.mass}: <span className="b">{fmtKg(selected.massKg)}</span>
            </div>
          </div>

          <div className="exp2a-stageGrid">
            {/* SCALE */}
            <div className="exp2a-scaleCard">
              <div className="exp2a-scaleFrame" title={t.placedOnScale}>
                {assets.scale ? (
                  <img className="exp2a-scaleImg" src={assets.scale} alt="spring scale" />
                ) : (
                  <div className="exp2a-scalePlaceholder">SPRING SCALE</div>
                )}

                <div className="exp2a-pan">
                  <img
                    className={`exp2a-object ${selected.type}`}
                    src={selected.img}
                    alt="object"
                    draggable="false"
                  />
                </div>
              </div>

              <div className="exp2a-hint">{t.hint}</div>
            </div>

            {/* GAUGE */}
            <div className="exp2a-gauge">
              <div className="exp2a-gaugeFace">
                <div className="exp2a-gaugeTicks" />
                <div
                  className="exp2a-needle"
                  style={{ transform: `translate(-50%, -90%) rotate(${needleDeg}deg)` }}
                />
                <div className="exp2a-needleHub" />
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
              </div>

              <div className="exp2a-actionsInline">
                <button className="exp2a-btn primary" type="button" onClick={addRecord}>
                  {t.save}
                </button>
                <button className="exp2a-btn ghost" type="button" onClick={clearRecords}>
                  {t.clear}
                </button>
                <button className="exp2a-btn danger" type="button" onClick={goResult}>
                  {t.viewAll}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT */}
        <section className="exp2a-pane">
          <header className="exp2a-paneHead">
            <div className="exp2a-paneTitle">
              {t.recordTitle}
              <button
                className="exp2a-miniIcon"
                type="button"
                onClick={() => speak(`${t.recordTitle}. ${t.recordSub}`)}
                title={t.speak}
                aria-label={t.speak}
                disabled={isSpeaking}
              >
                🔊
              </button>
            </div>
            <div className="exp2a-paneSub">{t.recordSub}</div>
          </header>

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
                  .map((r) => (
                    <div className="exp2a-tr" key={r.rid}>
                      <div className="exp2a-td name">
                        {typeLabel(r.type)} ({pieceLabel(r.piece)})
                      </div>
                      <div className="exp2a-td">{fmtKg(r.massKg)}</div>
                      <div className="exp2a-td r">{fmtN(r.weightN)}</div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="exp2a-note">✅ {t.note}</div>
        </section>
      </div>

      {/* bottom bar for mobile */}
      <div className="exp2a-bottomBar">
        <button className="exp2a-btn primary" type="button" onClick={addRecord}>
          {t.save}
        </button>
        <button className="exp2a-btn ghost" type="button" onClick={clearRecords}>
          {t.clear}
        </button>
        <button className="exp2a-btn danger" type="button" onClick={goResult}>
          {t.viewAll}
        </button>
      </div>
    </div>
  );
}
