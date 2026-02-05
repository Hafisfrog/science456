import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4GravityExp1Action.css";

export default function P4GravityExp1Action() {
  const navigate = useNavigate();

  // ✅ ปรับ path ให้ตรงโปรเจกต์คุณ
  const BACK_PATH = "/p4/gravity/exp1/question";
  const RESULT_PATH = "/p4/gravity/exp1/result";

  // ✅ ภาษา
  const [lang, setLang] = useState("th"); // th | en | ms

  // เลือกวัตถุ (เลือกได้หลายชิ้น)
  const [selected, setSelected] = useState({
    ball: true,
    bocce: false,
    feather: false,
  });

  // ความสูง (เมตร)
  const [heightM, setHeightM] = useState(2);

  // สถานะ: idle | countdown | dropping | done
  const [phase, setPhase] = useState("idle");
  const [countdown, setCountdown] = useState(3);
  const [runId, setRunId] = useState(0);

  // stopwatch
  const [elapsedMs, setElapsedMs] = useState(0);
  const timerRef = useRef(null);
  const startAtRef = useRef(0);

  // track object done
  const doneRef = useRef({});
  const activeKeys = useMemo(
    () => Object.keys(selected).filter((k) => selected[k]),
    [selected]
  );

  // ✅ text dictionary (แปลภาษา)
  const text = useMemo(() => {
    return {
      th: {
        topTitle: "ลงมือทดลองจริง: เลือกวัตถุ • ปรับความสูง • ปล่อย • จับเวลา",
        back: "← ย้อนกลับ",
        chooseTitle: "เลือกวัตถุ",
        chooseSub: "เลือกได้หลายชิ้น (เลือกอย่างน้อย 1 ชิ้น)",
        objBall: "ลูกบอล",
        objBocce: "ลูกเปตอง",
        objFeather: "ขนนก",
        heightTitle: "ปรับความสูง",
        heightHint: "ยิ่งสูง → ระยะตกมากขึ้น และใช้เวลานานขึ้น",
        launcherTitle: "ตัวปล่อยวัตถุ",
        launcherSub: "กด ▶ เพื่อเริ่ม (มีนับถอยหลัง 3 วิ)",
        dropBtn: "กดปล่อยวัตถุ",
        preparing: "เตรียมปล่อยวัตถุ...",
        stopwatch: "นาฬิกาจับเวลา",
        reset: "รีเซ็ต",
        stateIdle: "พร้อมทดลอง",
        stateCountdown: "กำลังนับถอยหลัง",
        stateDropping: "กำลังตก...",
        stateDone: "เสร็จแล้ว! ดูผลได้เลย",
        viewResult: "ดูผลการทดลอง →",
        ground: "พื้น",
        heightLabel: "ความสูง",
        mUnit: "m",
        langTitle: "ภาษา",
        langSub: "เลือกภาษาที่ต้องการ",
      },
      en: {
        topTitle: "Real Experiment: Choose • Height • Drop • Time",
        back: "← Back",
        chooseTitle: "Choose Objects",
        chooseSub: "Select multiple (at least 1)",
        objBall: "Ball",
        objBocce: "Bocce Ball",
        objFeather: "Feather",
        heightTitle: "Adjust Height",
        heightHint: "Higher → longer distance and time",
        launcherTitle: "Drop Controller",
        launcherSub: "Press ▶ to start (3s countdown)",
        dropBtn: "Release Objects",
        preparing: "Releasing soon...",
        stopwatch: "Stopwatch",
        reset: "Reset",
        stateIdle: "Ready",
        stateCountdown: "Counting down",
        stateDropping: "Dropping...",
        stateDone: "Done! View results",
        viewResult: "View Results →",
        ground: "Ground",
        heightLabel: "Height",
        mUnit: "m",
        langTitle: "Language",
        langSub: "Choose a language",
      },
      ms: {
        topTitle: "Eksperimen Sebenar: Pilih • Tinggi • Lepas • Masa",
        back: "← Kembali",
        chooseTitle: "Pilih Objek",
        chooseSub: "Boleh pilih banyak (sekurang-kurangnya 1)",
        objBall: "Bola",
        objBocce: "Bola Bocce",
        objFeather: "Bulu",
        heightTitle: "Laraskan Ketinggian",
        heightHint: "Lebih tinggi → jarak & masa lebih lama",
        launcherTitle: "Pengawal Lepas",
        launcherSub: "Tekan ▶ untuk mula (kiraan 3s)",
        dropBtn: "Lepaskan Objek",
        preparing: "Bersedia untuk lepas...",
        stopwatch: "Jam Randik",
        reset: "Set Semula",
        stateIdle: "Sedia",
        stateCountdown: "Mengira turun",
        stateDropping: "Sedang jatuh...",
        stateDone: "Siap! Lihat keputusan",
        viewResult: "Lihat Keputusan →",
        ground: "Tanah",
        heightLabel: "Ketinggian",
        mUnit: "m",
        langTitle: "Bahasa",
        langSub: "Pilih bahasa",
      },
    };
  }, []);

  const t = text[lang];

  // ✅ รูปต่างๆ เปลี่ยนเองได้ (public/images/...)
  const assets = useMemo(() => {
    return {
      bg: "/images/p4/exp1/bg-lab.jpg",

      // วัตถุ
      ball: "/images/p4/exp1/soccer-ball.png",
      bocce: "/images/p4/exp1/bocce.png",
      feather: "/images/p4/exp1/feather.png",

      // แท่นวางวัตถุ
      platform: "/images/p4/exp1/platform.png",
    };
  }, []);

  const canChangeSelection = phase === "idle";

  const toggleObj = (key) => {
    if (!canChangeSelection) return;
    setSelected((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const any = Object.values(next).some(Boolean);
      return any ? next : { ...next, ball: true };
    });
  };

  // ---------- physics-ish (ห้ามเปลี่ยนเพื่อไม่ให้กระทบหน้า Result) ----------
  const durationSec = (type) => {
    const base = Math.sqrt(Math.max(0.5, heightM));
    if (type === "ball") return 0.9 * base;
    if (type === "bocce") return 0.85 * base;
    if (type === "feather") return 1.6 * base;
    return 1.1 * base;
  };

  const layout = useMemo(() => {
    const basePlatform = 170;
    const baseGround = 470;

    const platformY = basePlatform - (heightM - 2) * 40;
    const groundY = baseGround + (heightM - 2) * 18;

    const p = Math.max(80, Math.min(platformY, 260));
    const g = Math.max(320, Math.min(groundY, 560));
    const fallY = Math.max(120, g - p);

    return { platformY: p, groundY: g, fallY };
  }, [heightM]);

  // ---------- stopwatch ----------
  const formatTime = (ms) => {
    const total = Math.max(0, ms);
    const s = Math.floor(total / 1000);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    const cs = Math.floor((total % 1000) / 10);
    const pad2 = (n) => String(n).padStart(2, "0");
    return `${pad2(m)}:${pad2(sec)}.${pad2(cs)}`;
  };

  const resetStopwatch = () => {
    setElapsedMs(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    startAtRef.current = 0;
  };

  const startStopwatch = () => {
    resetStopwatch();
    startAtRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setElapsedMs(Date.now() - startAtRef.current);
    }, 33);
  };

  const stopStopwatch = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  // ---------- run control ----------
  const prepareDoneTracker = () => {
    doneRef.current = {};
    activeKeys.forEach((k) => (doneRef.current[k] = false));
  };

  const markDone = (key) => {
    if (!doneRef.current[key]) doneRef.current[key] = true;
    const allDone = Object.keys(doneRef.current).every((k) => doneRef.current[k]);
    if (allDone) {
      stopStopwatch();
      setPhase("done");
    }
  };

  const handleDrop = () => {
    if (phase !== "idle") return;
    if (activeKeys.length === 0) return;

    prepareDoneTracker();
    setCountdown(3);
    setPhase("countdown");
  };

  useEffect(() => {
    if (phase !== "countdown") return;

    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          setPhase("dropping");
          setRunId((v) => v + 1);
          startStopwatch();
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const handleReset = () => {
    setPhase("idle");
    setRunId((v) => v + 1);
    resetStopwatch();
  };

  const handleViewResult = () => {
    // ✅ ส่งค่าเดิมเหมือนเดิม (ไม่กระทบ Result)
    navigate(RESULT_PATH, {
      state: { selected, heightM, time: elapsedMs },
    });
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const showViewResult = phase === "done";

  return (
    <div className="lab2-page">
      <img className="lab2-bg" src={assets.bg} alt="bg" />

      <div className="lab2-wrap">
        {/* Top bar */}
        <div className="lab2-topbar">
          <button className="btn ghost" onClick={() => navigate(BACK_PATH)} type="button">
            {t.back}
          </button>

          <div className="lab2-top-title">{t.topTitle}</div>

          {/* ✅ เอาพื้นที่ด้านขวาไว้บาลานซ์ (ไม่ให้ title ดูเอียง) */}
          <div className="topbar-spacer" aria-hidden="true" />
        </div>

        {/* LEFT COLUMN (แยก 2 กล่อง: วัตถุ + ภาษา) */}
        <div className="left-column">
          {/* กล่องที่ 1: เลือกวัตถุ + ความสูง */}
          <div className="pane left">
            <div className="pane-head">
              <div className="pane-title">{t.chooseTitle}</div>
              <div className="pane-sub">{t.chooseSub}</div>
            </div>

            <div className="choose-grid">
              <button
                className={`choose-card ${selected.ball ? "active" : ""}`}
                onClick={() => toggleObj("ball")}
                type="button"
                disabled={!canChangeSelection}
              >
                <img src={assets.ball} alt={t.objBall} />
                <div className="choose-name">{t.objBall}</div>
                <div className="choose-check">{selected.ball ? "✓" : ""}</div>
              </button>

              <button
                className={`choose-card ${selected.bocce ? "active" : ""}`}
                onClick={() => toggleObj("bocce")}
                type="button"
                disabled={!canChangeSelection}
              >
                <img src={assets.bocce} alt={t.objBocce} />
                <div className="choose-name">{t.objBocce}</div>
                <div className="choose-check">{selected.bocce ? "✓" : ""}</div>
              </button>

              <button
                className={`choose-card ${selected.feather ? "active" : ""}`}
                onClick={() => toggleObj("feather")}
                type="button"
                disabled={!canChangeSelection}
              >
                <img src={assets.feather} alt={t.objFeather} />
                <div className="choose-name">{t.objFeather}</div>
                <div className="choose-check">{selected.feather ? "✓" : ""}</div>
              </button>
            </div>

            <div className="height-box">
              <div className="height-row">
                <div className="height-title">{t.heightTitle}</div>
                <div className="height-value">
                  {heightM.toFixed(0)} {t.mUnit}
                </div>
              </div>

              <input
                className="height-slider"
                type="range"
                min="1"
                max="10"
                step="1"
                value={heightM}
                onChange={(e) => setHeightM(Number(e.target.value))}
                disabled={!canChangeSelection}
              />

              <div className="height-hint">{t.heightHint}</div>
            </div>
          </div>

          {/* กล่องที่ 2: ภาษา */}
          <div className="pane lang-pane">
            <div className="pane-head">
              <div className="pane-title">{t.langTitle}</div>
              <div className="pane-sub">{t.langSub}</div>
            </div>

            <div className="lang-grid">
              <button
                className={`lang-btn ${lang === "th" ? "active" : ""}`}
                onClick={() => setLang("th")}
                type="button"
              >
                ไทย
              </button>
              <button
                className={`lang-btn ${lang === "en" ? "active" : ""}`}
                onClick={() => setLang("en")}
                type="button"
              >
                มลายู
              </button>
              <button
                className={`lang-btn ${lang === "ms" ? "active" : ""}`}
                onClick={() => setLang("ms")}
                type="button"
              >
                อังกฤษ
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: ปล่อย + เวลา + ผล */}
        <div className="pane right">
          <div className="pane-head">
            <div className="pane-title">{t.launcherTitle}</div>
            <div className="pane-sub">{t.launcherSub}</div>
          </div>

          <button className="play-btn" onClick={handleDrop} type="button" disabled={phase !== "idle"}>
            <div className="play-icon">▶</div>
            <div className="play-text">{t.dropBtn}</div>
          </button>

          {phase === "countdown" && (
            <div className="countdown">
              <div className="count-num">{countdown}</div>
              <div className="count-text">{t.preparing}</div>
            </div>
          )}

          <div className="stopwatch">
            <div className="sw-label">{t.stopwatch}</div>

            <div className="sw-row">
              <div className={`sw-time ${phase === "dropping" ? "running" : ""}`}>
                {formatTime(elapsedMs)}
              </div>

              <button
                className="reset-btn"
                onClick={handleReset}
                disabled={phase === "countdown" || phase === "dropping"}
                type="button"
              >
                {t.reset}
              </button>
            </div>

            <div className="sw-note">
              {phase === "idle" && t.stateIdle}
              {phase === "countdown" && t.stateCountdown}
              {phase === "dropping" && t.stateDropping}
              {phase === "done" && t.stateDone}
            </div>
          </div>

          <button className="result-btn" onClick={handleViewResult} type="button" disabled={!showViewResult}>
            {t.viewResult}
          </button>
        </div>

        {/* CENTER: พื้นที่ปล่อย/แท่น/พื้น */}
        <div
          className="arena2"
          style={{
            ["--platformY"]: `${layout.platformY}px`,
            ["--groundY"]: `${layout.groundY}px`,
            ["--fallY"]: `${layout.fallY}px`,
          }}
        >
          <div className="arena2-inner">
            <div className="drop-label">
              {t.heightLabel}: {heightM.toFixed(0)} {t.mUnit}
            </div>

            <div className="drop-line" style={{ height: `${layout.fallY}px` }} />

            <div className="platform" title="platform">
              <img src={assets.platform} alt="platform" />
            </div>

            <div className="ground" title="ground">
              {t.ground}
            </div>
          </div>

          {/* วัตถุตก */}
          <div className="drop-layer">
            {selected.ball && (
              <FallingObject
                key={`ball-${runId}`}
                type="ball"
                img={assets.ball}
                duration={durationSec("ball")}
                runPhase={phase}
                x={-140}
                onDone={() => markDone("ball")}
              />
            )}
            {selected.bocce && (
              <FallingObject
                key={`bocce-${runId}`}
                type="bocce"
                img={assets.bocce}
                duration={durationSec("bocce")}
                runPhase={phase}
                x={0}
                onDone={() => markDone("bocce")}
              />
            )}
            {selected.feather && (
              <FallingObject
                key={`feather-${runId}`}
                type="feather"
                img={assets.feather}
                duration={durationSec("feather")}
                runPhase={phase}
                x={140}
                onDone={() => markDone("feather")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FallingObject({ type, img, duration, runPhase, x, onDone }) {
  const isDropping = runPhase === "dropping";
  const isSettled = runPhase === "done";

  const style = {
    ["--dur"]: `${duration}s`,
    ["--x"]: `${x}px`,
  };

  return (
    <div
      className={`obj ${type} ${isDropping ? "drop" : ""} ${isSettled ? "settled" : ""}`}
      style={style}
      onAnimationEnd={(e) => {
        if (e.animationName === "fallStraight" || e.animationName === "fallFeather") {
          onDone?.();
        }
      }}
    >
      <img src={img} alt={type} draggable="false" />
    </div>
  );
}
