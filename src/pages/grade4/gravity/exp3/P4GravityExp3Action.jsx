import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp3Action.css";

export default function P4GravityExp3Action() {
  const navigate = useNavigate();

  // โ… เธเธฃเธฑเธ path เนเธซเนเธ•เธฃเธเนเธเธฃเน€เธเธเธ•เนเธเธธเธ“
  const BACK_PATH = "/p4/gravity/exp3/question";
  const RESULT_PATH = "/p4/gravity/exp3/result";

  // เธ เธฒเธฉเธฒ
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

  // โ… assets
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
        // toastSaved: "เธเธฑเธเธ—เธถเธเธเธฅเน€เธฃเธตเธขเธเธฃเนเธญเธขเนเธฅเนเธง",
        // toastReset: "เธฃเธตเน€เธเนเธ•เธเธฅเธเธฒเธฃเธ—เธ”เธฅเธญเธเน€เธฃเธตเธขเธเธฃเนเธญเธข",
      },
      en: {
        title: "Earth's gravity vs the Moon's gravity",
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
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
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
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
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
  const readout = useMemo(() => {
    if (!selected) return null;
    return {
      earthN: selected.massKg * gEarth,
      moonN: selected.massKg * gMoon,
    };
  }, [selected]);

  // records
  const [records, setRecords] = useState([]); // [{itemId, massKg, earthN, moonN, ts}]

  // โ… Toast state
  const [toast, setToast] = useState(null); // { title, detail }
  const toastTimerRef = useRef(null);
  const showToast = (title, detail = "") => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    setToast({ title, detail });
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2200);
  };

  // โ… helper: เน€เธเนเธเธงเนเธฒเธเธดเนเธเธเธตเนเธเธฑเธเธ—เธถเธเนเธฅเนเธงเนเธซเธก
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
    // showToast(`${objName} โ€ข ${t.toastSaved}`, `${t.wEarth}: ${fmtN(earthN)} N โ€ข ${t.wMoon}: ${fmtN(moonN)} N`);
    // speak(`${objName} ${t.toastSaved}`);
  };

  // โ… RESET
  const resetAll = () => {
    setRecords([]);
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
      {/* 2 เธเนเธญเธเนเธซเธเน */}
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

          {/* โ… SCALE + OBJECT (เนเธชเธ”เธเธงเธฑเธ•เธ–เธธเธเธเธ•เธฒเธเธฑเนเธ) */}
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

          {/* โ… SCALE + OBJECT (เนเธชเธ”เธเธงเธฑเธ•เธ–เธธเธเธเธ•เธฒเธเธฑเนเธ) */}
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
            {"\uD83D\uDD0A"}
          </button>
        </div>
      </div>

      {/* โ… bottom chooser */}
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

          {/* โ… เธเธธเนเธกเธเธฑเนเธเธเธงเธฒ: 3 เนเธ–เธงเธ•เธฒเธกเธ—เธตเนเธเธญ */}
          <div className="e3a-actions">
            <button className="e3a-btn primary" type="button" onClick={saveRecord}>
              {t.save}
            </button>

            <button className="e3a-btn soft" type="button" onClick={resetAll} title={t.reset}>
              ↺ {t.reset}
            </button>

            <button className="e3a-btn danger" type="button" onClick={goResult}>
              {t.view}
            </button>
            {/* <button className="e3a-btn ghost e3a-backAction" type="button" onClick={() => navigate(BACK_PATH)}>
              ← {t.back}
            </button> */}
          </div>
        </div>
      </div>

      {/* bottom-left language + audio */}
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
          {lang === "th" ? "ต่อไป" : lang === "ms" ? "Seterusnya" : "Next"} »
        </button>
      </div>

      {/* โ… Toast */}
      {toast ? (
        <div className="e3a-toast" role="status" aria-live="polite">
          <div className="e3a-toastTitle">{toast.title}</div>
          {toast.detail ? <div className="e3a-toastDetail">{toast.detail}</div> : null}
        </div>
      ) : null}
    </div>
  );
}

