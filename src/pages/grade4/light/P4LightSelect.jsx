import { useNavigate } from "react-router-dom";
import LabLayout from "../../../components/LabLayout";

/* ============================= */
/* MATERIALS */
/* ============================= */
const MATERIALS = [
  { id: 1, name: "กระจกใส", type: "transparent", img: "/images/materials/l1.png", icon: "🔮" },
  { id: 2, name: "กระจกฝ้า", type: "translucent", img: "/images/materials/l2.png", icon: "🌫️" },
  { id: 3, name: "พลาสติกใส", type: "transparent", img: "/images/materials/l3.png", icon: "🧴" },
  { id: 4, name: "กระดาษไข", type: "translucent", img: "/images/materials/l4.png", icon: "📃" },
  { id: 5, name: "แผ่นไม้", type: "opaque", img: "/images/materials/l5.png", icon: "🪵" },
  { id: 6, name: "เหล็ก", type: "opaque", img: "/images/materials/l6.png", icon: "⚙️" },
  { id: 7, name: "ผนังปูน", type: "opaque", img: "/images/materials/l7.webp", icon: "🧱" },
  { id: 8, name: "หมอก", type: "translucent", img: "/images/materials/l8.png", icon: "☁️" },
];

export default function P4LightSelect() {
  const navigate = useNavigate();

  return (
    <LabLayout title="เลือกวัตถุทดลอง">
      {/* Water-like background */}
      <div className="min-h-screen relative overflow-hidden">
        
        {/* Water gradient - light blue to aqua */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/90 via-blue-200/90 to-teal-200/90"></div>
        
        {/* Water ripple effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large ripple */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-white/30 rounded-full blur-3xl animate-pulse"></div>
          {/* Medium ripple */}
          <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-cyan-200/40 rounded-full blur-3xl animate-pulse delay-700"></div>
          {/* Small ripples */}
          <div className="absolute top-2/3 left-1/4 w-64 h-64 bg-teal-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-10 right-1/4 w-40 h-40 bg-white/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        {/* Floating bubbles for water effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/20 blur-sm"
              style={{
                width: `${Math.random() * 40 + 20}px`,
                height: `${Math.random() * 40 + 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                opacity: 0.3
              }}
            />
          ))}
        </div>

        {/* Main container */}
        <div className="relative min-h-screen flex flex-col">
          
          {/* Water-like header - simplified */}
          <div className="px-6 pt-12 pb-4">
            <div className="backdrop-blur-md bg-white/20 rounded-3xl p-6 border border-white/40 shadow-lg">
              <div className="flex items-center gap-3">
                <span className="text-4xl drop-shadow-lg">💧</span>
                <div>
                  <h1 className="text-3xl font-medium tracking-tight text-cyan-900">
                    เลือกวัตถุ
                  </h1>
                  <p className="text-sm text-cyan-700/80 font-light mt-1">
                    กดที่วัตถุเพื่อเริ่มการทดลอง
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Grid with water-like cards */}
          <div className="flex-1 px-6 pb-6 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {MATERIALS.map((material) => (
                <div
                  key={material.id}
                  onClick={() => navigate("/p4/light/experiment", { state: { material } })}
                  className="group relative cursor-pointer"
                >
                  {/* Water drop card */}
                  <div className="
                    relative
                    backdrop-blur-sm
                    bg-white/20
                    rounded-[2rem]
                    p-5
                    border border-white/30
                    shadow-[0_8px_20px_rgba(0,50,80,0.15)]
                    transition-all
                    duration-500
                    hover:scale-105
                    hover:bg-white/30
                    hover:shadow-[0_12px_30px_rgba(0,80,120,0.25)]
                    active:scale-95
                    overflow-hidden
                  ">
                    {/* Water ripple effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    {/* Image container */}
                    <div className="aspect-square flex items-center justify-center relative">
                      {/* Water-like reflection effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent opacity-50"></div>
                      
                      {/* Fallback emoji */}
                      <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                        {material.icon}
                      </div>
                      <img
                        src={material.img}
                        alt={material.name}
                        className="w-full h-full object-contain relative z-10 drop-shadow-md"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Text with water-like color */}
                    <div className="mt-4 text-center relative">
                      <p className="text-base font-medium text-cyan-900 tracking-tight">
                        {material.name}
                      </p>
                      <p className="text-xs text-cyan-700/70 mt-1 font-light">
                        {material.type === 'transparent' && '💎 โปร่งใส'}
                        {material.type === 'translucent' && '🌊 โปร่งแสง'}
                        {material.type === 'opaque' && '🪨 ทึบแสง'}
                      </p>
                    </div>

                    {/* Water droplet indicator */}
                    <div className="absolute top-3 right-3">
                      <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        💧
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Water-like back button */}
          <div className="relative px-6 pb-8">
            <button
              onClick={() => navigate("/p4/light/vocab")}
              className="
                w-full
                backdrop-blur-md
                bg-white/20
                border border-white/30
                rounded-2xl
                py-4
                text-cyan-900
                font-medium
                text-lg
                shadow-[0_8px_20px_rgba(0,50,80,0.15)]
                transition-all
                duration-500
                hover:bg-white/30
                hover:shadow-[0_12px_30px_rgba(0,80,120,0.25)]
                active:scale-[0.98]
                flex
                items-center
                justify-center
                gap-2
                group
              "
            >
              {/* Water drop icon */}
              <span className="text-xl transition-transform group-hover:-translate-x-1 group-hover:scale-110">
                💧
              </span>
              <span>ย้อนกลับ</span>
            </button>
            
            {/* Gentle wave indicator */}
            <div className="mt-4 flex justify-center gap-1">
              <div className="w-8 h-1 bg-cyan-300/40 rounded-full backdrop-blur-sm animate-pulse"></div>
              <div className="w-8 h-1 bg-cyan-300/30 rounded-full backdrop-blur-sm animate-pulse delay-150"></div>
              <div className="w-8 h-1 bg-cyan-300/20 rounded-full backdrop-blur-sm animate-pulse delay-300"></div>
            </div>
          </div>

        </div>
      </div>

      {/* Add keyframe animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-30px) translateX(-10px); }
          75% { transform: translateY(-10px) translateX(5px); }
        }
      `}</style>
    </LabLayout>
  );
}