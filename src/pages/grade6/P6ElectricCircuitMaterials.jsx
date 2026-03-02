import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./P6ElectricGenerationSteps.css";
import "./P6ElectricCircuitSteps.css";

const EQUIPMENT = [
  {
    id: "bulb",
    title: "หลอดไฟฟ้าพร้อมฐาน",
    subtitle: "1 ชุด",
    icon: (
      <svg viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="bulbGlassMat" cx="35%" cy="28%" r="68%">
            <stop offset="0%" stopColor="#fff9d7" />
            <stop offset="58%" stopColor="#ffe38b" />
            <stop offset="100%" stopColor="#f3b94d" />
          </radialGradient>
          <linearGradient id="bulbMetalMat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c7d0dc" />
            <stop offset="45%" stopColor="#8b98aa" />
            <stop offset="100%" stopColor="#5f6d81" />
          </linearGradient>
        </defs>
        <ellipse cx="48" cy="33" rx="22" ry="23" fill="url(#bulbGlassMat)" stroke="#334155" strokeWidth="3" />
        <ellipse cx="41" cy="24" rx="8" ry="5" fill="#ffffff" opacity="0.55" />
        <path d="M39 41l5 5m8-5l-5 5m-3 0h4" stroke="#6b4f1d" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M40 50h16v8H40z" fill="url(#bulbMetalMat)" />
        <path d="M38 58h20v4H38zm1 6h18v4H39zm2 6h14v5H41z" fill="url(#bulbMetalMat)" />
        <rect x="45" y="75" width="6" height="9" rx="2" fill="#475569" />
      </svg>
    ),
  },
  {
    id: "wire",
    title: "สายไฟพร้อมหัวหนีบ",
    subtitle: "2 เส้น",
    icon: (
      <svg viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <path d="M14 58c18-24 50-24 68 0" fill="none" stroke="#1f2937" strokeWidth="6" strokeLinecap="round" />
        <path d="M14 34c18-20 50-20 68 0" fill="none" stroke="#1f2937" strokeWidth="6" strokeLinecap="round" />
        <path d="M14 58c18-24 50-24 68 0" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
        <path d="M14 34c18-20 50-20 68 0" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
        <rect x="8" y="52" width="14" height="10" rx="3" fill="#0f172a" />
        <rect x="74" y="52" width="14" height="10" rx="3" fill="#0f172a" />
        <rect x="8" y="28" width="14" height="10" rx="3" fill="#0f172a" />
        <rect x="74" y="28" width="14" height="10" rx="3" fill="#0f172a" />
        <rect x="9" y="52" width="5" height="10" rx="2" fill="#e2e8f0" />
        <rect x="79" y="52" width="5" height="10" rx="2" fill="#e2e8f0" />
        <rect x="9" y="28" width="5" height="10" rx="2" fill="#e2e8f0" />
        <rect x="79" y="28" width="5" height="10" rx="2" fill="#e2e8f0" />
      </svg>
    ),
  },
  {
    id: "holder",
    title: "กระบะใส่ถ่านไฟฉาย",
    subtitle: "สำหรับ 4 ก้อน",
    icon: (
      <svg viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="holderBodyMat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#29364a" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>
        <rect x="10" y="24" width="76" height="48" rx="12" fill="url(#holderBodyMat)" />
        <rect x="14" y="28" width="68" height="40" rx="9" fill="#111827" />
        <rect x="18" y="32" width="14" height="30" rx="6" fill="#f59e0b" />
        <rect x="34" y="32" width="14" height="30" rx="6" fill="#f59e0b" />
        <rect x="50" y="32" width="14" height="30" rx="6" fill="#f59e0b" />
        <rect x="66" y="32" width="14" height="30" rx="6" fill="#f59e0b" />
        <rect x="21" y="30" width="8" height="4" rx="2" fill="#cbd5e1" />
        <rect x="37" y="30" width="8" height="4" rx="2" fill="#cbd5e1" />
        <rect x="53" y="30" width="8" height="4" rx="2" fill="#cbd5e1" />
        <rect x="69" y="30" width="8" height="4" rx="2" fill="#cbd5e1" />
      </svg>
    ),
  },
  {
    id: "switch",
    title: "สวิตช์",
    subtitle: "1 อัน",
    icon: (
      <svg viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="switchPlateMat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#edf2f7" />
            <stop offset="100%" stopColor="#b8c2d3" />
          </linearGradient>
        </defs>
        <rect x="28" y="14" width="40" height="68" rx="12" fill="url(#switchPlateMat)" stroke="#334155" strokeWidth="3" />
        <rect x="35" y="22" width="26" height="24" rx="7" fill="#dbe4f2" />
        <rect x="35" y="50" width="26" height="24" rx="7" fill="#9aa8bf" />
        <circle cx="48" cy="34" r="3.5" fill="#475569" />
        <circle cx="48" cy="62" r="3.5" fill="#475569" />
        <circle cx="34" cy="22" r="2" fill="#64748b" />
        <circle cx="62" cy="74" r="2" fill="#64748b" />
      </svg>
    ),
  },
  {
    id: "cell",
    title: "ถ่านไฟฉาย",
    subtitle: "4 ก้อน",
    icon: (
      <svg viewBox="0 0 96 96" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="cellBodyMat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffbf3a" />
            <stop offset="100%" stopColor="#e28a08" />
          </linearGradient>
          <linearGradient id="cellCapMat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>
        <rect x="22" y="18" width="20" height="58" rx="8" fill="url(#cellBodyMat)" />
        <rect x="50" y="18" width="20" height="58" rx="8" fill="url(#cellBodyMat)" />
        <rect x="24" y="14" width="16" height="8" rx="4" fill="url(#cellCapMat)" />
        <rect x="52" y="14" width="16" height="8" rx="4" fill="url(#cellCapMat)" />
        <rect x="22" y="44" width="20" height="7" rx="3.5" fill="#111827" opacity="0.35" />
        <rect x="50" y="44" width="20" height="7" rx="3.5" fill="#111827" opacity="0.35" />
        <path d="M29 18v58M57 18v58" stroke="#ffd973" strokeWidth="1.8" />
      </svg>
    ),
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

export default function P6ElectricCircuitMaterials() {
  const navigate = useNavigate();
  const onSpeak = useCallback((text) => speakText(text), []);

  return (
    <div className="p6-gen-page p6-circuit-materials-page">
      <div className="p6-gen-container p6-circuit-materials-container">
        <div className="p6-gen-tag">วงจรไฟฟ้าใกล้ตัว</div>
        <div className="p6-gen-title">เรื่อง วงจรไฟฟ้าอย่างง่าย</div>

        <div className="p6-gen-card p6-circuit-card p6-circuit-materials-cardWrap">
          <div className="p6-gen-sound" title="ฟังเสียง" aria-hidden="true">
            <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
              <path
                d="M12 26h12l14-10v32l-14-10H12z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M44 22c4 4 4 16 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M50 16c7 7 7 25 0 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="p6-gen-stepsLayout p6-gen-stepsLayout--single">
            <section className="p6-gen-block p6-gen-block-equipment p6-circuit-materials-block">
              <header className="p6-gen-blockHeader">
                <h2 className="p6-gen-blockTitle">อุปกรณ์</h2>
                <p className="p6-gen-blockHint">กดที่อุปกรณ์เพื่อฟังชื่อ</p>
              </header>

              <div className="p6-circuit-materials-showcase">
                {EQUIPMENT.map((item) => (
                  <button
                    className="p6-circuit-materials-card"
                    key={item.id}
                    type="button"
                    onClick={() => onSpeak(`${item.title} ${item.subtitle}`)}
                  >
                    <div className="p6-circuit-materials-visual">{item.icon}</div>
                    <div className="p6-circuit-materials-name">{item.title}</div>
                    <div className="p6-circuit-materials-sub">{item.subtitle}</div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="p6-gen-actions">
          <button className="p6-gen-btn ghost" onClick={() => navigate("/p6/electric-circuit/problem")} type="button">
            ← กลับสถานการณ์ปัญหา
          </button>
          <button className="p6-gen-btn primary" onClick={() => navigate("/p6/electric-circuit/steps")} type="button">
            ไปขั้นตอนการทดลอง →
          </button>
        </div>
      </div>
    </div>
  );
}
