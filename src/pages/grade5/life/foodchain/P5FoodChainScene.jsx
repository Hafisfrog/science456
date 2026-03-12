// import { useState } from "react";

const sceneStyles = `
.organism-img {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
  cursor: pointer;
  z-index: 10;
}
.organism-img:hover {
  transform: scale(1.25) translateY(-8px);
  filter: drop-shadow(0 20px 30px rgba(0,0,0,0.25));
  z-index: 50;
}
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-12px) rotate(1deg); }
  75% { transform: translateY(8px) rotate(-1deg); }
}
.fly { animation: float 5s ease-in-out infinite; }
@keyframes snakeMove {
  0% { transform: translateX(0) translateY(0) rotate(0deg); }
  25% { transform: translateX(15px) translateY(-5px) rotate(2deg); }
  50% { transform: translateX(25px) translateY(0) rotate(0deg); }
  75% { transform: translateX(15px) translateY(5px) rotate(-2deg); }
  100% { transform: translateX(0) translateY(0) rotate(0deg); }
}
.snakeMove { animation: snakeMove 6s ease-in-out infinite; }
@keyframes frogJump {
  0%, 100% { transform: translateY(0) scale(1); }
  40% { transform: translateY(-20px) scale(1.1); }
  60% { transform: translateY(5px) scale(0.95); }
}
.frogMove { animation: frogJump 2.5s ease-in-out infinite; }
@keyframes fishSwim {
  0% { transform: translateX(0) translateY(0) rotate(0deg); }
  25% { transform: translateX(20px) translateY(-8px) rotate(3deg); }
  50% { transform: translateX(35px) translateY(0) rotate(0deg); }
  75% { transform: translateX(20px) translateY(8px) rotate(-3deg); }
  100% { transform: translateX(0) translateY(0) rotate(0deg); }
}
.fishMove { animation: fishSwim 7s ease-in-out infinite; }
@keyframes plantSway {
  0%, 100% { transform: rotate(0deg) translateY(0); }
  25% { transform: rotate(2deg) translateY(-3px); }
  75% { transform: rotate(-2deg) translateY(3px); }
}
.plantMove { animation: plantSway 5s ease-in-out infinite; transform-origin: bottom center; }
.water-ripple {
  position: absolute;
  bottom: 0;
  left: 30%;
  right: 0;
  height: 25%;
  background: linear-gradient(180deg, rgba(96, 165, 250, 0.3) 0%, rgba(37, 99, 235, 0.5) 100%);
  animation: ripple 3s ease-in-out infinite;
}
@keyframes ripple {
  0%, 100% { opacity: 0.5; transform: scaleY(1); }
  50% { opacity: 0.7; transform: scaleY(1.02); }
}
.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  pointer-events: none;
  animation: particleFloat 8s infinite;
}
@keyframes particleFloat {
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  10% { opacity: 0.8; }
  90% { opacity: 0.6; }
  100% { transform: translateY(-100vh) translateX(100px); opacity: 0; }
}
.sun-rays {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255,255,190,0.4) 0%, rgba(255,255,200,0) 70%);
  border-radius: 50%;
  animation: sunPulse 4s ease-in-out infinite;
}
@keyframes sunPulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}
.nav-button {
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  letter-spacing: 0.5px;
}
.nav-button.next { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
.nav-button.prev { background: linear-gradient(135deg, #f6d365 0%, #fda085 100%); color: #333; }
.nav-button:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,0,0,0.3); }
.nav-button.next:hover { background: linear-gradient(135deg, #764ba2 0%, #667eea 100%); }
.nav-button.prev:hover { background: linear-gradient(135deg, #fda085 0%, #f6d365 100%); }
.nav-button:active { transform: translateY(1px); box-shadow: 0 2px 10px rgba(0,0,0,0.2); }
.selected-display {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 12px 30px;
  border-radius: 50px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  animation: slideDown 0.5s ease;
}
@keyframes slideDown {
  from { opacity: 0; transform: translate(-50%, -20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
.legend {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  padding: 12px 20px;
  border-radius: 50px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.5);
  animation: fadeIn 1s ease;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.back-button {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255,255,255,0.3);
  padding: 8px 20px;
  border-radius: 50px;
  color: #333;
  font-weight: 500;
  transition: all 0.3s ease;
}
.back-button:hover { background: rgba(255, 255, 255, 0.4); transform: translateX(-5px); }
`;
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const SCENE_ITEMS = [
  {
    key: "hawk",
    label: {
      th: "เหยี่ยว/ผู้บริโภค",
      en: "Hawk / Consumer",
      ms: "Helang / Pengguna",
    },
    img: "/images/p5/y.png",
    containerClass: "top-[10%] left-[22%]",
    imageClass: "w-40 md:w-44",
    labelClass: "top-[102%] left-1/2 -translate-x-1/2",
    motionClass: "motion-fly",
  },
  {
    key: "bird",
    label: {
      th: "นก/ผู้บริโภค",
      en: "Bird / Consumer",
      ms: "Burung / Pengguna",
    },
    img: "/images/p5/nog.png",
    containerClass: "top-[13%] right-[9%]",
    imageClass: "w-24 md:w-28",
    labelClass: "-top-10 left-1/2 -translate-x-1/2",
    motionClass: "motion-fly-alt",
  },
  {
    key: "rice",
    label: {
      th: "ต้นข้าว/ผู้ผลิต",
      en: "Rice Plant / Producer",
      ms: "Pokok Padi / Pengeluar",
    },
    img: "/images/p5/kaw.png",
    containerClass: "top-[28%] left-[6%]",
    imageClass: "w-40 md:w-44",
    labelClass: "top-[88%] left-1/2 -translate-x-1/2",
    motionClass: "motion-sway",
  },
  {
    key: "rat",
    label: {
      th: "หนูนา/ผู้บริโภค",
      en: "Field Rat / Consumer",
      ms: "Tikus Sawah / Pengguna",
    },
    img: "/images/p5/n.png",
    containerClass: "top-[35%] left-[53%]",
    imageClass: "w-24 md:w-28",
    labelClass: "-top-10 left-1/2 -translate-x-1/2",
    motionClass: "motion-breathe",
  },
  {
    key: "worm",
    label: {
      th: "หนอน/ผู้บริโภค",
      en: "Caterpillar / Consumer",
      ms: "Ulat / Pengguna",
    },
    img: "/images/p5/non.png",
    containerClass: "top-[39%] right-[9%]",
    imageClass: "w-20 md:w-24",
    labelClass: "-top-10 left-1/2 -translate-x-1/2",
    motionClass: "motion-wiggle",
  },
  {
    key: "snake",
    label: {
      th: "งู/ผู้บริโภค",
      en: "Snake / Consumer",
      ms: "Ular / Pengguna",
    },
    img: "/images/p5/snack.png",
    containerClass: "top-[52%] left-[30%]",
    imageClass: "w-40 md:w-44",
    labelClass: "-top-12 left-1/2 -translate-x-1/2",
    motionClass: "motion-slither",
  },
  {
    key: "fish",
    label: {
      th: "ปลา/ผู้บริโภค",
      en: "Fish / Consumer",
      ms: "Ikan / Pengguna",
    },
    img: "/images/p5/pla.png",
    containerClass: "top-[57%] right-[9%]",
    imageClass: "w-32 md:w-36",
    labelClass: "top-[102%] left-1/2 -translate-x-1/2",
    motionClass: "motion-swim",
  },
  {
    key: "grass",
    label: {
      th: "หญ้า/ผู้ผลิต",
      en: "Grass / Producer",
      ms: "Rumput / Pengeluar",
    },
    img: "/images/p5/ya.png",
    containerClass: "top-[63%] left-[8%]",
    imageClass: "w-32 md:w-36",
    labelClass: "top-[102%] left-1/2 -translate-x-1/2",
    motionClass: "motion-sway-alt",
  },
  {
    key: "frog",
    label: {
      th: "กบ/ผู้บริโภค",
      en: "Frog / Consumer",
      ms: "Katak / Pengguna",
    },
    img: "/images/p5/gop.png",
    containerClass: "bottom-[8%] left-[22%]",
    imageClass: "w-36 md:w-40",
    labelClass: "top-[102%] left-1/2 -translate-x-1/2",
    motionClass: "motion-hop",
  },
  {
    key: "grasshopper",
    label: {
      th: "ตั๊กแตน/ผู้บริโภค",
      en: "Grasshopper / Consumer",
      ms: "Belalang / Pengguna",
    },
    img: "/images/p5/tag.png",
    containerClass: "bottom-[12%] left-[40%]",
    imageClass: "w-28 md:w-32",
    labelClass: "top-[102%] left-1/2 -translate-x-1/2",
    motionClass: "motion-crawl",
  },
  {
    key: "larva",
    label: {
      th: "ลูกน้ำ/ผู้บริโภค",
      en: "Larva / Consumer",
      ms: "Jentik-jentik / Pengguna",
    },
    img: "/images/p5/lunam.png",
    containerClass: "bottom-[18%] right-[24%]",
    imageClass: "w-20 md:w-24",
    labelClass: "top-[102%] left-1/2 -translate-x-1/2",
    motionClass: "motion-wiggle",
  },
  {
    key: "water-plant",
    label: {
      th: "พืชน้ำ/ผู้ผลิต",
      en: "Aquatic Plant / Producer",
      ms: "Tumbuhan Air / Pengeluar",
    },
    img: "/images/p5/lunamm.png",
    containerClass: "top-[50%] left-[52%]",
    imageClass: "w-36 md:w-40",
    labelClass: "top-[102%] left-1/2 -translate-x-1/2",
    motionClass: "motion-sway-alt",
  },
];

function createParticles(count = 16) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 5 + 2}px`,
    opacity: Math.random() * 0.4 + 0.15,
    delay: `${Math.random() * 2}s`,
    duration: `${Math.random() * 2 + 2}s`,
  }));
}

export default function P5FoodChainScene() {
  const navigate = useNavigate();
  const [showParticles, setShowParticles] = useState(true);
  const [activeLang, setActiveLang] = useState("th");
  const particles = useMemo(() => createParticles(16), []);

  const speakText = (text) => {
    try {
      if (!text || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = activeLang === "th" ? "th-TH" : activeLang === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-sky-200 via-lime-100 to-green-200">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,200,0.6),transparent_42%)]" />

      <div className="pointer-events-none absolute bottom-[38%] left-0 h-20 w-full bg-lime-300/80" />
      <div className="pointer-events-none absolute bottom-[27%] left-0 h-16 w-full bg-lime-400/75" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[31%] w-full bg-gradient-to-r from-cyan-300/75 via-sky-400/70 to-cyan-300/75" />

      {showParticles &&
        particles.map((particle) => (
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

      <h1 className="absolute left-1/2 top-4 z-30 -translate-x-1/2 rounded-full bg-white/55 px-6 py-2 text-center text-lg font-bold text-slate-900 shadow-sm md:text-xl">
        แผนภาพระบบนิเวศและห่วงโซ่อาหาร
      </h1>

      {SCENE_ITEMS.map((item) => (
        <div key={item.key} className={`absolute z-20 ${item.containerClass}`}>
          <img
            src={item.img}
            alt={item.label[activeLang] ?? item.label.th}
            className={`${item.imageClass} ${item.motionClass} select-none object-contain drop-shadow-xl`}
          />
          <p
            className={`absolute z-30 whitespace-nowrap text-base font-extrabold text-slate-900 md:text-xl ${item.labelClass}`}
            style={{ textShadow: "0 2px 8px rgba(255,255,255,0.85)" }}
          >
            <span className="rounded-full px-2 py-1">
              {item.label[activeLang] ?? item.label.th}
            </span>
            <button
              type="button"
              onClick={() => speakText(item.label[activeLang] ?? item.label.th)}
              className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#cfe4ff] text-sm text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-[#b7d6ff]"
              aria-label={`Speak ${item.label[activeLang] ?? item.label.th}`}
            >
              {"\uD83D\uDD0A"}
            </button>
          </p>
        </div>
      ))}

      <div className="absolute bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigate("/p5/life/foodchain/vocab")}
          className="rounded-full bg-[#dfefff] px-4 py-2 text-sm font-semibold text-blue-800 shadow hover:bg-[#cfe4ff]"
        >
          ← ย้อนกลับ
        </button>
        <button
          type="button"
          onClick={() => navigate("/p5/life/foodchain/materials")}
          className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700"
        >
          ไปต่อ →
        </button>
      </div>

      <div className="absolute bottom-4 left-4 z-40 flex items-center gap-2 rounded-full bg-transparent p-1.5">
        {[
          { key: "th", label: "Thai" },
          { key: "en", label: "English" },
          { key: "ms", label: "Malay" },
        ].map((lang) => (
          <button
            key={lang.key}
            type="button"
            onClick={() => setActiveLang(lang.key)}
            className={`rounded-full px-3 py-1 text-sm font-bold transition ${
              activeLang === lang.key
                ? "bg-[#dcecff] text-slate-900"
                : "bg-white text-slate-700 hover:bg-blue-50"
            }`}
          >
            {lang.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() =>
            speakText(
              SCENE_ITEMS.map((item) => item.label[activeLang] ?? item.label.th).join(", ")
            )
          }
          className="rounded-full bg-[#dcecff] px-3 py-1 text-sm font-bold text-blue-700 shadow-md transition hover:bg-[#cfe4ff]"
          aria-label="speak-all"
        >
          {"\uD83D\uDD0A"}
        </button>
      </div>

      <button
        type="button"
        onClick={() => setShowParticles((prev) => !prev)}
        className="absolute top-4 left-4 z-40 rounded-full bg-[#dfefff] px-3 py-1 text-sm text-blue-800 shadow hover:bg-[#cfe4ff]"
        aria-label="toggle-particles"
      >
        {showParticles ? "??" : "??"}
      </button>

      <style>{sceneStyles}</style>
      <style>{`
        @keyframes fly {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1.5deg); }
        }
        @keyframes flyAlt {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(-1.5deg); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes swayAlt {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-2deg); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes slither {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(8px) rotate(1deg); }
        }
        @keyframes swim {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
        @keyframes hop {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes crawl {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(6deg); }
        }
        .motion-fly { animation: fly 4.2s ease-in-out infinite; }
        .motion-fly-alt { animation: flyAlt 4.8s ease-in-out infinite; }
        .motion-sway { animation: sway 4.6s ease-in-out infinite; transform-origin: bottom center; }
        .motion-sway-alt { animation: swayAlt 4.9s ease-in-out infinite; transform-origin: bottom center; }
        .motion-breathe { animation: breathe 2.6s ease-in-out infinite; }
        .motion-slither { animation: slither 3.2s ease-in-out infinite; }
        .motion-swim { animation: swim 3s ease-in-out infinite; }
        .motion-hop { animation: hop 2.4s ease-in-out infinite; }
        .motion-crawl { animation: crawl 3.3s ease-in-out infinite; }
        .motion-wiggle { animation: wiggle 1.8s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

