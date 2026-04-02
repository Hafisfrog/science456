import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp3Action.css";

export default function P4GravityExp3Action() {
  const navigate = useNavigate();

  // ✅ ปรับ path ให้ตรงโปรเจกต์คุณ
  const BACK_PATH = "/p4/gravity/exp3/question";
  const RESULT_PATH = "/p4/gravity/exp3/result";

  // ภาษา
  const [lang, setLang] = useState("th"); // th | en | ms

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

  // ✅ assets
  const assets = useMemo(() => {
    return {
      earthBg: "/images/p4/exp3/earth-side.png",
      moonBg: "/images/p4/exp3/moon-side.png",
      boyEarth: "/images/p4/exp3/boy-boy.png",
      boyMoon: "/images/p4/exp3/boy-boy.png",
      // scale: "/images/p4/exp2/spring-scale.png",
      book: "/images/p4/exp3/book.png",
      rock: "/images/p4/exp3/rock.png",
      mango: "/images/p4/exp3/mango.png",
    };
  }, []);

  // physics
  const gEarth = 9.81;
  const gMoon = 1.62;

  // objects
  const items = useMemo(() => {
    return [
      { id: "book", massKg: 0.6, img: assets.book },
      { id: "rock", massKg: 1.2, img: assets.rock },
      { id: "mango", massKg: 0.3, img: assets.mango },
    ];
  }, [assets]);

  // text
  const text = useMemo(() => {
    return {
      th: {
        title: "แรงดึงดูดของโลกกับแรงดึงดูดของดวงจันทร์",
        choose: "เลือกวัตถุ",
        read: "อ่านค่าการทดลอง",
        save: "บันทึกผล",
        reset: "รีเซ็ต",
        view: "ดูผลการทดลอง",
        back: "ย้อนกลับ",
        earth: "โลก",
        moon: "ดวงจันทร์",
        wEarth: "น้ำหนักบนโลก",
        wMoon: "น้ำหนักบนดวงจันทร์",
        mass: "มวล",
        unitN: "นิวตัน",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        speakAll: "ฟังทั้งหน้า",
        obj_book: "หนังสือ",
        obj_rock: "ก้อนหิน",
        obj_mango: "มะม่วง",
        selected: "วัตถุที่เลือก",
        savedTag: "บันทึกแล้ว",
        // toastSaved: "บันทึกผลเรียบร้อยแล้ว",
        // toastReset: "รีเซ็ตผลการทดลองเรียบร้อย",
      },
      en: {
        title: "Earth’s gravity vs the Moon’s gravity",
        choose: "Choose an object",
        read: "Read measurement",
        save: "Save result",
        reset: "Reset",
        view: "View results",
        back: "Back",
        earth: "Earth",
        moon: "Moon",
        wEarth: "Weight on Earth",
        wMoon: "Weight on the Moon",
        mass: "Mass",
        unitN: "newton",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        speakAll: "Listen to page",
        obj_book: "Book",
        obj_rock: "Rock",
        obj_mango: "Mango",
        selected: "Selected",
        savedTag: "Saved",
        // toastSaved: "Saved successfully",
        // toastReset: "Reset completed",
      },
      ms: {
        title: "Graviti Bumi vs graviti Bulan",
        choose: "Pilih objek",
        read: "Baca bacaan",
        save: "Simpan keputusan",
        reset: "Tetapkan semula",
        view: "Lihat keputusan",
        back: "Kembali",
        earth: "Bumi",
        moon: "Bulan",
        wEarth: "Berat di Bumi",
        wMoon: "Berat di Bulan",
        mass: "Jisim",
        unitN: "newton",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        speakAll: "Dengar satu halaman",
        obj_book: "Buku",
        obj_rock: "Batu",
        obj_mango: "Mangga",
        selected: "Dipilih",
        savedTag: "Disimpan",
        // toastSaved: "Berjaya disimpan",
        // toastReset: "Berjaya ditetapkan semula",
      },
    };
  }, []);

  const t = text[lang];

  const labelOf = (id) => {
    if (id === "book") return t.obj_book;
    if (id === "rock") return t.obj_rock;
    return t.obj_mango;
  };

  const fmtKg = (kg) => (kg < 0.01 ? `${(kg * 1000).toFixed(0)} g` : `${kg.toFixed(2)} kg`);
  const fmtN = (n) => (n < 0.1 ? n.toFixed(3) : n.toFixed(1));

  const [selectedId, setSelectedId] = useState("book");
  const selected = useMemo(() => items.find((x) => x.id === selectedId), [items, selectedId]);

  // readout
  const [readout, setReadout] = useState(null); // { earthN, moonN }
  const doRead = () => {
    if (!selected) return;
    const earthN = selected.massKg * gEarth;
    const moonN = selected.massKg * gMoon;
    setReadout({ earthN, moonN });

    speak(
      `${t.selected}: ${labelOf(selected.id)}\n` +
        `${t.mass}: ${fmtKg(selected.massKg)}\n` +
        `${t.wEarth}: ${fmtN(earthN)} ${lang === "th" ? t.unitN : "N"}\n` +
        `${t.wMoon}: ${fmtN(moonN)} ${lang === "th" ? t.unitN : "N"}`
    );
  };

  // records
  const [records, setRecords] = useState([]); // [{itemId, massKg, earthN, moonN, ts}]

  // ✅ Toast state
  const [toast, setToast] = useState(null); // { title, detail }
  const toastTimerRef = useRef(null);
  const showToast = (title, detail = "") => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    setToast({ title, detail });
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2200);
  };

  // ✅ helper: เช็คว่าชิ้นนี้บันทึกแล้วไหม
  const isSaved = (itemId) => records.some((r) => r.itemId === itemId);

  const saveRecord = () => {
    if (!selected) return;

    const earthN = selected.massKg * gEarth;
    const moonN = selected.massKg * gMoon;

    setRecords((prev) => {
      const filtered = prev.filter((r) => r.itemId !== selected.id);
      return [...filtered, { itemId: selected.id, massKg: selected.massKg, earthN, moonN, ts: Date.now() }];
    });

    // const objName = labelOf(selected.id);
    // showToast(`${objName} • ${t.toastSaved}`, `${t.wEarth}: ${fmtN(earthN)} N • ${t.wMoon}: ${fmtN(moonN)} N`);
    // speak(`${objName} ${t.toastSaved}`);
  };

  // ✅ RESET
  const resetAll = () => {
    setRecords([]);
    setReadout(null);
    setToast(null);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    setSelectedId("book");
    // showToast(t.toastReset);
    // speak(t.toastReset);
  };

  const speakAll = () => speak(`${t.title}\n${t.choose}`);

  const goResult = () => {
    const itemsWithLabel = items.map((it) => ({ ...it, label: labelOf(it.id) }));
    navigate(RESULT_PATH, {
      state: { lang, items: itemsWithLabel, records, gEarth, gMoon },
    });
  };

  return (
    <div className="e3a-page">
      {/* 2 ช่องใหญ่ */}
      <div className="e3a-split">
        {/* LEFT: EARTH */}
        <section className="e3a-panel earth" aria-label="Earth panel">
          <img className="e3a-panelBg" src={assets.earthBg} alt="earth background" />

          <div className="e3a-panelTop">
            <div className="e3a-badge earth">
              <span>{t.earth}</span>
              <span className="e3a-badgeEmoji" aria-hidden="true">
                🌍
              </span>
            </div>
            <div className="e3a-measure">
              <div className="k">{t.wEarth}</div>
              <div className="v">{readout ? `${fmtN(readout.earthN)} ${lang === "th" ? t.unitN : "N"}` : "—"}</div>
            </div>
          </div>

          {assets.boyEarth ? (
            <img className="e3a-boy earth" src={assets.boyEarth} alt="boy earth" draggable="false" />
          ) : null}

          {/* ✅ SCALE + OBJECT (แสดงวัตถุบนตาชั่ง) */}
          <div className="e3a-scaleWrap">
            {selected ? (
              <div className="e3a-objectOnScale" aria-label="selected object on earth scale">
                <img className="e3a-objectImg" src={selected.img} alt={labelOf(selected.id)} draggable="false" />
              </div>
            ) : null}

            {assets.scale ? <img className="e3a-scale" src={assets.scale} alt="scale" draggable="false" /> : null}
          </div>
        </section>

        {/* RIGHT: MOON */}
        <section className="e3a-panel moon" aria-label="Moon panel">
          <img className="e3a-panelBg" src={assets.moonBg} alt="moon background" />

          <div className="e3a-panelTop">
            <div className="e3a-badge moon">
              <span>{t.moon}</span>
              <span className="e3a-badgeEmoji" aria-hidden="true">
                🌙
              </span>
            </div>
            <div className="e3a-measure">
              <div className="k">{t.wMoon}</div>
              <div className="v">{readout ? `${fmtN(readout.moonN)} ${lang === "th" ? t.unitN : "N"}` : "—"}</div>
            </div>
          </div>

          {assets.boyMoon ? (
            <img className="e3a-boy moon" src={assets.boyMoon} alt="boy moon" draggable="false" />
          ) : null}

          {/* ✅ SCALE + OBJECT (แสดงวัตถุบนตาชั่ง) */}
          <div className="e3a-scaleWrap">
            {selected ? (
              <div className="e3a-objectOnScale" aria-label="selected object on moon scale">
                <img className="e3a-objectImg" src={selected.img} alt={labelOf(selected.id)} draggable="false" />
              </div>
            ) : null}

            {assets.scale ? <img className="e3a-scale" src={assets.scale} alt="scale" draggable="false" /> : null}
          </div>
        </section>
      </div>

      {/* TOP title */}
      <div className="e3a-titleBar">
        <div className="e3a-title">
          {t.title}
          <button className="e3a-audioInline" type="button" onClick={speakAll} title={t.speakAll}>
            🔊
          </button>
        </div>
      </div>

      {/* ✅ bottom chooser */}
      <div className="e3a-chooser">
        <div className="e3a-chooserHeader">
          <div className="e3a-chooserTitle">
            {t.choose}: <span className="b">{labelOf(selected.id)}</span>
            <span className="m">
              • {t.mass}: {fmtKg(selected.massKg)}
            </span>
            {selected && isSaved(selected.id) ? <span className="e3a-savedPill">✓ {t.savedTag}</span> : null}
          </div>
        </div>

        <div className="e3a-chooserMain">
          <div className="e3a-objRow" role="list">
            {items.map((it) => {
              const active = it.id === selectedId;
              const saved = isSaved(it.id);
              return (
                <button
                  key={it.id}
                  className={`e3a-objCard ${active ? "active" : ""} ${saved ? "saved" : ""}`}
                  type="button"
                  onClick={() => {
                    setSelectedId(it.id);
                    setReadout(null);
                  }}
                  role="listitem"
                >
                  <div className="e3a-objImgWrap">
                    <img className="e3a-objImg" src={it.img} alt={labelOf(it.id)} draggable="false" />
                  </div>

                  <div className="e3a-objInfo">
                    <div className="e3a-objName">{labelOf(it.id)}</div>
                    <div className="e3a-objMeta">{fmtKg(it.massKg)}</div>
                  </div>

                  {active ? <div className="e3a-check">✓</div> : null}
                  {saved ? <div className="e3a-savedBadge">{t.savedTag}</div> : null}
                </button>
              );
            })}
          </div>

          {/* ✅ ปุ่มฝั่งขวา: 3 แถวตามที่ขอ */}
          <div className="e3a-actions">
            <button className="e3a-btn ghost" type="button" onClick={doRead}>
              {t.read}
            </button>

            <button className="e3a-btn soft" type="button" onClick={resetAll} title={t.reset}>
              ↺ {t.reset}
            </button>

            <div className="e3a-actBottom">
              <button className="e3a-btn primary" type="button" onClick={saveRecord}>
                {t.save}
              </button>

              <button className="e3a-btn danger" type="button" onClick={goResult}>
                {t.view}
              </button>
            </div>
            <button className="e3a-btn ghost e3a-backAction" type="button" onClick={() => navigate(BACK_PATH)}>
              ← {t.back}
            </button>
          </div>
        </div>
      </div>

      {/* bottom-left language + audio */}
      <div className="e3a-langDock">
        <button className={`e3a-chip ${lang === "th" ? "active" : ""}`} onClick={() => setLang("th")} type="button">
          {t.chipTh}
        </button>
        <button className={`e3a-chip ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")} type="button">
          {t.chipEn}
        </button>
        <button className={`e3a-chip ${lang === "ms" ? "active" : ""}`} onClick={() => setLang("ms")} type="button">
          {t.chipMs}
        </button>
        {/* <button className="e3a-chipAudio" type="button" onClick={speakAll} title={t.speakAll}>
          🔊
        </button> */}
      </div>

      {/* ✅ bottom-right back */}
      <button className="e3a-backBR" type="button" onClick={() => navigate(BACK_PATH)} title={t.back}>
        <span className="ico">«</span>
      </button>

      {/* ✅ Toast */}
      {toast ? (
        <div className="e3a-toast" role="status" aria-live="polite">
          <div className="e3a-toastTitle">{toast.title}</div>
          {toast.detail ? <div className="e3a-toastDetail">{toast.detail}</div> : null}
        </div>
      ) : null}
    </div>
  );
}
