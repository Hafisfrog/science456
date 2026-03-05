import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const SCENE_ITEMS = [
  {
    key: "hawk",
    label: "เหยี่ยว/ผู้บริโภค",
    img: "/images/p5/y.png",
    containerClass: "top-[10%] left-[22%]",
    imageClass: "w-40 md:w-44",
    labelClass: "top-[102%] left-1/2 -translate-x-1/2",
    motionClass: "motion-fly",
  },
  {
    key: "bird",
    label: "นก/ผู้บริโภค",
    img: "/images/p5/nog.png",
    containerClass: "top-[13%] right-[9%]",
    imageClass: "w-24 md:w-28",
    labelClass: "-top-10 left-1/2 -translate-x-1/2",
    motionClass: "motion-fly-alt",
  },
  {
    key: "rice",
    label: "ต้นข้าว/ผู้ผลิต",
    img: "/images/p5/kaw.png",
    containerClass: "top-[28%] left-[6%]",
    imageClass: "w-40 md:w-44",
    labelClass: "top-[88%] left-1/2 -translate-x-1/2",
    motionClass: "motion-sway",
  },
  {
    key: "rat",
    label: "หนูนา/ผู้บริโภค",
    img: "/images/p5/n.png",
    containerClass: "top-[35%] left-[53%]",
    imageClass: "w-24 md:w-28",
    labelClass: "-top-10 left-1/2 -translate-x-1/2",
    motionClass: "motion-breathe",
  },
  {
    key: "worm",
    label: "หนอน/ผู้บริโภค",
    img: "/images/p5/non.png",
    containerClass: "top-[39%] right-[9%]",
    imageClass: "w-20 md:w-24",
    labelClass: "-top-10 left-1/2 -translate-x-1/2",
    motionClass: "motion-wiggle",
  },
  {
    key: "snake",
    label: "งู/ผู้บริโภค",
    img: "/images/p5/snack.png",
    containerClass: "top-[52%] left-[30%]",
    imageClass: "w-40 md:w-44",
    labelClass: "-top-12 left-1/2 -translate-x-1/2",
    motionClass: "motion-slither",
  },
  {
    key: "fish",
    label: "ปลา/ผู้บริโภค",
    img: "/images/p5/pla.png",
    containerClass: "top-[57%] right-[9%]",
    imageClass: "w-32 md:w-36",
    labelClass: "top-[102%] left-1/2 -translate-x-1/2",
    motionClass: "motion-swim",
  },
  {
    key: "grass",
    label: "หญ้า/ผู้ผลิต",
    img: "/images/p5/ya.png",
    containerClass: "top-[63%] left-[8%]",
    imageClass: "w-32 md:w-36",
    labelClass: "top-[102%] left-1/2 -translate-x-1/2",
    motionClass: "motion-sway-alt",
  },
  {
    key: "frog",
    label: "กบ/ผู้บริโภค",
    img: "/images/p5/gop.png",
    containerClass: "bottom-[8%] left-[22%]",
    imageClass: "w-36 md:w-40",
    labelClass: "top-[102%] left-1/2 -translate-x-1/2",
    motionClass: "motion-hop",
  },
  {
    key: "grasshopper",
    label: "ตั๊กแตน/ผู้บริโภค",
    img: "/images/p5/tag.png",
    containerClass: "bottom-[12%] left-[40%]",
    imageClass: "w-28 md:w-32",
    labelClass: "top-[102%] left-1/2 -translate-x-1/2",
    motionClass: "motion-crawl",
  },
  {
    key: "larva",
    label: "ลูกน้ำ/ผู้บริโภค",
    img: "/images/p5/lunam.png",
    containerClass: "bottom-[18%] right-[24%]",
    imageClass: "w-20 md:w-24",
    labelClass: "top-[102%] left-1/2 -translate-x-1/2",
    motionClass: "motion-wiggle",
  },
  {
    key: "water-plant",
    label: "พืชน้ำ/ผู้ผลิต",
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
  const particles = useMemo(() => createParticles(16), []);

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

      <h1 className="absolute left-1/2 top-4 z-30 -translate-x-1/2 rounded-full bg-white/55 px-6 py-2 text-center text-xl font-bold text-slate-900 shadow-sm md:text-2xl">
        แผนภาพระบบนิเวศและห่วงโซ่อาหาร
      </h1>

      {SCENE_ITEMS.map((item) => (
        <div key={item.key} className={`absolute z-20 ${item.containerClass}`}>
          <img
            src={item.img}
            alt={item.label}
            className={`${item.imageClass} ${item.motionClass} select-none object-contain drop-shadow-xl`}
          />
          <p
            className={`absolute z-30 whitespace-nowrap text-lg font-extrabold text-slate-900 md:text-2xl ${item.labelClass}`}
            style={{ textShadow: "0 2px 8px rgba(255,255,255,0.85)" }}
          >
            {item.label}
          </p>
        </div>
      ))}

      <div className="absolute bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigate("/p5/life/foodchain/vocab")}
          className="rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-slate-800 shadow hover:bg-white"
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

      <button
        type="button"
        onClick={() => setShowParticles((prev) => !prev)}
        className="absolute bottom-4 left-4 z-40 rounded-full bg-white/70 px-3 py-1 text-lg text-slate-700 hover:bg-white"
        aria-label="toggle-particles"
      >
        {showParticles ? "✨" : "💨"}
      </button>

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
