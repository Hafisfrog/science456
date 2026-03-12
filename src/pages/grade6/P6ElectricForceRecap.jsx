import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./P6ElectricForceRecap.css";

const EQUIPMENT_ITEMS = [
  {
    id: "bulb",
    title: "หลอดไฟพร้อมฐาน",
    subtitle: "1 ชุด",
    image: "/images/p6/electric-circuit/bulb-base.svg",
    frameClass: "p6-force-recap-frame-gold",
  },
  {
    id: "wire",
    title: "สายไฟพร้อมหัวหนีบ",
    subtitle: "2 เส้น",
    image: "/images/p6/electric-circuit/wire-clips.svg",
    frameClass: "p6-force-recap-frame-blue",
  },
  {
    id: "switch",
    title: "สวิตช์",
    subtitle: "1 อัน",
    image: "/images/p6/electric-circuit/switch.svg",
    frameClass: "p6-force-recap-frame-green",
  },
  {
    id: "holder",
    title: "กระบะใส่ถ่านไฟฉาย",
    subtitle: "พร้อม 4 ช่อง",
    image: "/images/p6/electric-circuit/battery-holder.svg",
    frameClass: "p6-force-recap-frame-peach",
  },
  {
    id: "cell",
    title: "ถ่านไฟฉาย",
    subtitle: "4 ก้อน",
    image: "/images/p6/electric-circuit/batteries.svg",
    frameClass: "p6-force-recap-frame-rose",
  },
];

function speakText(text) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "th-TH";
  utterance.rate = 0.95;

  window.speechSynthesis.speak(utterance);
}

export default function P6ElectricForceRecap() {
  const navigate = useNavigate();
  const onSpeak = useCallback((text) => speakText(text), []);

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div className="p6-force-recap-page" style={pageBg}>
      <div className="p6-force-recap-lightning" aria-hidden="true" />

      <div className="p6-force-recap-stage">
        <div className="p6-force-recap-hero">
          <span className="p6-force-recap-badge">วงจรไฟฟ้าใกล้ตัว</span>
          <h1>เรื่อง วงจรไฟฟ้าอย่างง่าย</h1>
        </div>

        <div className="p6-force-recap-card">
          <button className="p6-force-recap-sound" type="button" aria-label="เปิดเสียง">
            <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
              <path
                d="M14 26h12l14-10v32l-14-10H14z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M46 22c4 4 4 16 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M52 16c7 7 7 25 0 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="p6-force-recap-card-inner">
            <header>
              <p className="p6-force-recap-card-title">อุปกรณ์</p>
              <p className="p6-force-recap-card-subtitle">กดที่อุปกรณ์เพื่อฟังชื่อ</p>
            </header>

            <div className="p6-force-recap-grid">
              {EQUIPMENT_ITEMS.map((item) => (
                <button
                  key={item.id}
                  className="p6-force-recap-item"
                  type="button"
                  onClick={() => onSpeak(`${item.title} ${item.subtitle}`)}
                  aria-label={`ฟังชื่อ ${item.title}`}
                >
                  <div className={`p6-force-recap-item-icon ${item.frameClass}`}>
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </div>
                  <div className="p6-force-recap-item-title">{item.title}</div>
                  <div className="p6-force-recap-item-subtitle">{item.subtitle}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p6-force-recap-actions">
          <button
            className="p6-force-recap-actionBtn p6-force-recap-actionBtn--ghost"
            type="button"
            onClick={() => navigate("/p6/electric-force/vocab")}
            aria-label="กลับไปคำศัพท์"
          >
            ←
          </button>
          <button
            className="p6-force-recap-actionBtn p6-force-recap-actionBtn--primary"
            type="button"
            onClick={() => navigate("/p6/experiment/electric-generation/materials?from=unit")}
            aria-label="ไปหน้าปฏิบัติการ"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
