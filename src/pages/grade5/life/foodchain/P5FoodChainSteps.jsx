import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";

const stepsStyles = `
.steps-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #87CEEB 0%, #98FB98 100%);
  overflow: hidden;
  font-family: 'Prompt', sans-serif;
}
.particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: float-particle 15s infinite linear;
  z-index: 1;
}
@keyframes float-particle {
  0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
  10% { opacity: 0.8; }
  90% { opacity: 0.6; }
  100% { transform: translateY(-100vh) translateX(100px) rotate(360deg); opacity: 0; }
}
.sun {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 120px;
  height: 120px;
  z-index: 2;
}
.sun-core {
  position: absolute;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, #FFD700 0%, #FFA500 100%);
  border-radius: 50%;
  box-shadow: 0 0 50px #FFA500;
  animation: pulse 3s ease-in-out infinite;
}
.sun-rays {
  position: absolute;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(255,165,0,0) 70%);
  border-radius: 50%;
  animation: rotate 20s linear infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.cloud {
  position: absolute;
  font-size: 4rem;
  opacity: 0.6;
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));
  z-index: 2;
  animation: float-cloud 20s linear infinite;
}
.cloud-1 { top: 15%; left: -10%; animation-delay: 0s; }
.cloud-2 { top: 25%; right: -10%; font-size: 5rem; animation: float-cloud 25s linear infinite reverse; }
.cloud-3 { top: 40%; left: -15%; font-size: 3.5rem; animation: float-cloud 18s linear infinite; }
@keyframes float-cloud {
  from { transform: translateX(-100px); }
  to { transform: translateX(calc(100vw + 100px)); }
}
.tree {
  position: absolute;
  font-size: 5rem;
  filter: drop-shadow(0 20px 20px rgba(0,0,0,0.2));
  animation: sway 6s ease-in-out infinite;
  transform-origin: bottom center;
  z-index: 3;
}
.tree-1 { bottom: 5%; left: 2%; font-size: 7rem; }
.tree-2 { bottom: 3%; right: 3%; font-size: 6rem; animation-delay: -1s; }
.tree-3 { bottom: 7%; left: 10%; font-size: 4rem; animation-delay: -2s; }
@keyframes sway {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(3deg); }
  75% { transform: rotate(-3deg); }
}
.grass-field {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: linear-gradient(180deg, #90EE90 0%, #32CD32 100%);
  z-index: 5;
  clip-path: polygon(0 30%, 100% 0, 100% 100%, 0% 100%);
}
.grass-blade {
  position: absolute;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #228B22 0%, #006400 100%);
  transform-origin: bottom;
  animation: wave 3s ease-in-out infinite;
  border-radius: 2px 2px 0 0;
}
@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
}
.fence {
  position: absolute;
  bottom: 50px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
  z-index: 6;
}
.fence-post {
  width: 12px;
  height: 40px;
  background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
  border-radius: 4px 4px 0 0;
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  animation: fence-sway 4s ease-in-out infinite;
  transform-origin: bottom;
}
.fence-post:nth-child(even) { animation-delay: -1s; }
@keyframes fence-sway {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(1deg); }
  75% { transform: rotate(-1deg); }
}
.title-container {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 30px;
  z-index: 10;
  animation: slide-down 0.8s ease-out;
}
.main-title {
  font-size: 3rem;
  font-weight: bold;
  color: #14532d;
  text-shadow: 0 2px 0 rgba(255,255,255,0.7), 0 8px 20px rgba(20,83,45,0.25);
  margin-bottom: 10px;
}
.title-icon {
  margin: 0 15px;
  filter: drop-shadow(0 4px 4px rgba(0,0,0,0.2));
  display: inline-block;
  animation: bounce 2s ease-in-out infinite;
}
.title-sub {
  font-size: 1.2rem;
  color: rgba(255,255,255,0.9);
  letter-spacing: 2px;
  text-transform: uppercase;
}
.steps-wrapper {
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 30px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border-radius: 60px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1), inset 0 0 30px rgba(255,255,255,0.3);
  border: 1px solid rgba(255,255,255,0.3);
  z-index: 20;
  animation: fade-in 1s ease-out;
}
.steps-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  position: relative;
}
.step-card {
  position: relative;
  display: flex;
  gap: 20px;
  padding: 25px;
  background: white;
  border-radius: 30px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid transparent;
  animation: card-appear 0.6s ease-out backwards;
}
.step-card:nth-child(1) { animation-delay: 0.1s; }
.step-card:nth-child(2) { animation-delay: 0.3s; }
.step-card:nth-child(3) { animation-delay: 0.5s; }
.step-card:nth-child(4) { animation-delay: 0.7s; }
.step-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 30px 40px rgba(0,0,0,0.2);
  border-color: #FFD700;
}
.step-card.hovered { background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%); }
.step-number {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 30px;
  color: white;
  font-weight: bold;
  box-shadow: 0 10px 15px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}
.step-card:hover .step-number { transform: rotate(5deg) scale(1.1); }
.step-icon {
  font-size: 1.8rem;
  margin-bottom: 5px;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));
}
.step-index {
  font-size: 1.2rem;
  background: rgba(255,255,255,0.3);
  padding: 2px 8px;
  border-radius: 20px;
}
.step-content { flex: 1; }
.step-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
}
.step-description {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
}
.step-connector {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 30;
}
.connector-dot {
  width: 8px;
  height: 8px;
  background: #FFD700;
  border-radius: 50%;
  animation: pulse-dot 1.5s ease-in-out infinite;
}
.connector-line {
  width: 50px;
  height: 2px;
  background: linear-gradient(90deg, #FFD700, #FFA500, #FFD700);
  animation: flow-line 2s linear infinite;
}
@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
}
@keyframes flow-line {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
.nav-buttons {
  position: fixed;
  bottom: 40px;
  right: 40px;
  display: flex;
  gap: 20px;
  z-index: 100;
}
.nav-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 30px;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255,255,255,0.3);
}
.nav-btn.prev { background: rgba(255, 255, 255, 0.9); color: #333; }
.nav-btn.next { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
.nav-btn:hover { transform: translateY(-5px) scale(1.05); box-shadow: 0 20px 30px rgba(0,0,0,0.3); }
.nav-btn.prev:hover { background: white; }
.nav-btn.next:hover { background: linear-gradient(135deg, #764ba2 0%, #667eea 100%); }
.btn-icon { font-size: 1.3rem; transition: transform 0.3s ease; }
.nav-btn:hover .btn-icon { transform: translateX(3px); }
.nav-btn.prev:hover .btn-icon { transform: translateX(-3px); }
.language-selector {
  position: fixed;
  bottom: 40px;
  left: 40px;
  display: flex;
  gap: 10px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  padding: 10px 15px;
  border-radius: 50px;
  border: 1px solid rgba(255,255,255,0.3);
  z-index: 100;
  animation: slide-up 0.8s ease-out;
}
.lang-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  background: transparent;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}
.lang-btn.active {
  background: white;
  color: #333;
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
}
.lang-btn:hover:not(.active) { background: rgba(255,255,255,0.2); }
.sound-toggle {
  position: fixed;
  top: 40px;
  right: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  animation: slide-right 0.8s ease-out;
}
.sound-toggle:hover {
  background: rgba(255,255,255,0.4);
  transform: scale(1.1) rotate(90deg);
}
.progress-indicator {
  position: fixed;
  top: 40px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  padding: 12px 20px;
  border-radius: 50px;
  border: 1px solid rgba(255,255,255,0.3);
  z-index: 100;
  animation: slide-left 0.8s ease-out;
}
.progress-bar {
  width: 150px;
  height: 8px;
  background: rgba(255,255,255,0.3);
  border-radius: 10px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FFD700, #FFA500);
  border-radius: 10px;
  animation: progress-pulse 2s ease-in-out infinite;
}
.progress-text {
  color: white;
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
@keyframes progress-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
@keyframes slide-down {
  from { opacity: 0; transform: translateY(-50px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slide-up {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slide-left {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes slide-right {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes card-appear {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
@media (max-width: 768px) {
  .steps-grid { grid-template-columns: 1fr; }
  .main-title { font-size: 2rem; }
  .nav-buttons { bottom: 20px; right: 20px; flex-direction: column; }
  .language-selector { bottom: 20px; left: 20px; flex-wrap: wrap; max-width: 200px; }
  .progress-indicator { top: 20px; left: 20px; }
  .sound-toggle { top: 20px; right: 20px; }
}
`;
import SpeakButton from "../../../../components/SpeakButton";

const PAGE_COPY = {
  th: {
    mainTitle: "ขั้นตอนการทดลอง",
    subTitle: "ขั้นตอนการทดลองห่วงโซ่อาหาร",
    back: "ย้อนกลับ",
    next: "เริ่มการทดลอง",
    progress: "ขั้นตอน 1/4",
  },
  en: {
    mainTitle: "Experiment Steps",
    subTitle: "Food Chain Experiment Procedure",
    back: "Back",
    next: "Start Experiment",
    progress: "Step 1/4",
  },
  ms: {
    mainTitle: "Langkah Eksperimen",
    subTitle: "Prosedur Eksperimen Rantaian Makanan",
    back: "Kembali",
    next: "Mula Eksperimen",
    progress: "Langkah 1/4",
  },
};

const STEPS = [
  {
    icon: "🔍",
    color: "from-blue-500 to-blue-600",
    title: {
      th: "สำรวจสิ่งมีชีวิตในระบบนิเวศ",
      en: "Observe organisms in the ecosystem",
      ms: "Perhati hidupan dalam ekosistem",
    },
    description: {
      th: "สังเกตและจดบันทึกสิ่งมีชีวิตต่าง ๆ ที่พบในพื้นที่",
      en: "Observe and record the organisms found in the area.",
      ms: "Perhati dan catat hidupan yang ditemui di kawasan kajian.",
    },
  },
  {
    icon: "📊",
    color: "from-green-500 to-green-600",
    title: {
      th: "จำแนกเป็นผู้ผลิตและผู้บริโภค",
      en: "Classify producers and consumers",
      ms: "Kelaskan pengeluar dan pengguna",
    },
    description: {
      th: "แยกกลุ่มสิ่งมีชีวิตตามบทบาทในการสร้างและใช้พลังงาน",
      en: "Group organisms by their role in making or using energy.",
      ms: "Asingkan hidupan mengikut peranan dalam penghasilan dan penggunaan tenaga.",
    },
  },
  {
    icon: "🔄",
    color: "from-amber-500 to-orange-500",
    title: {
      th: "สร้างห่วงโซ่อาหาร",
      en: "Build the food chain",
      ms: "Bina rantaian makanan",
    },
    description: {
      th: "เชื่อมโยงความสัมพันธ์การกินกันเป็นลำดับ",
      en: "Connect feeding relationships in sequence.",
      ms: "Hubungkan hubungan pemakanan secara berurutan.",
    },
  },
  {
    icon: "📝",
    color: "from-violet-500 to-purple-600",
    title: {
      th: "บันทึกและสรุปผล",
      en: "Record and summarize results",
      ms: "Catat dan rumuskan keputusan",
    },
    description: {
      th: "สรุปสิ่งที่เรียนรู้จากการทดลอง",
      en: "Summarize what you learned from the experiment.",
      ms: "Rumuskan perkara yang dipelajari daripada eksperimen.",
    },
  },
];

function makeParticles(count = 20) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 7 + 2}px`,
    opacity: Math.random() * 0.45 + 0.2,
    delay: `${Math.random() * 2}s`,
    duration: `${Math.random() * 2 + 1.5}s`,
  }));
}

export default function P5FoodChainSteps() {
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("th");
  const particles = useMemo(() => makeParticles(20), []);

  const t = PAGE_COPY[activeLang];
  const speechByLang = {
    th: `${PAGE_COPY.th.mainTitle}. ${STEPS.map((s) => s.title.th).join(". ")}`,
    en: `${PAGE_COPY.en.mainTitle}. ${STEPS.map((s) => s.title.en).join(". ")}`,
    ms: `${PAGE_COPY.ms.mainTitle}. ${STEPS.map((s) => s.title.ms).join(". ")}`,
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-200 via-lime-100 to-green-200 font-sans">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,245,170,0.55),transparent_45%)]" />
      <div className="pointer-events-none absolute right-8 top-8 h-24 w-24 rounded-full bg-yellow-300 shadow-[0_0_60px_rgba(253,224,71,0.7)]" />

      {particles.map((particle) => (
        <span
          key={particle.id}
          className="pointer-events-none absolute animate-pulse rounded-full bg-white"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-36 pt-10">
        <div className="mb-6 rounded-3xl bg-white/70 px-6 py-5 shadow-xl backdrop-blur">
          <h1 className="text-center text-3xl font-black text-emerald-900 md:text-5xl">
            {t.mainTitle}
          </h1>
          <p className="mt-1 text-center text-sm font-semibold tracking-wide text-emerald-700 md:text-base">
            {t.subTitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {STEPS.map((step, index) => (
            <div
              key={step.title.th}
              className="relative rounded-3xl border border-white/60 bg-white p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="mb-4 flex items-center gap-4">
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-3xl text-white shadow-lg`}
                >
                  {step.icon}
                </div>
                <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-extrabold text-slate-800">
                {step.title[activeLang]}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                {step.description[activeLang]}
              </p>
            </div>
          ))}
        </div>

      </div>

      <div className="absolute left-6 top-6 z-20 rounded-full bg-white/75 px-4 py-2 text-sm font-bold text-emerald-800 shadow-md backdrop-blur">
        {t.progress}
      </div>

      <div className="absolute bottom-6 left-6 z-20 rounded-2xl bg-white/75 p-3 shadow-lg backdrop-blur">
        <div className="-mt-3">
          <SpeakButton
            th={speechByLang.th}
            en={speechByLang.en}
            ms={speechByLang.ms}
            activeLang={activeLang}
            onLanguageChange={setActiveLang}
          />
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-20 flex gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-700 shadow-md transition hover:bg-slate-50 md:text-base"
        >
          ← {t.back}
        </button>
        <button
          type="button"
          onClick={() => navigate("/p5/life/foodchain/select")}
          className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2 text-sm font-bold text-white shadow-md transition hover:opacity-95 md:text-base"
        >
          {t.next} →
        </button>
      </div>

      <style>{stepsStyles}</style>
    </div>
  );
}
