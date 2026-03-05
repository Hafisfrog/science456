import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function P5LifeIntro() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showLeaves, setShowLeaves] = useState(false);

  useEffect(() => {
    setShowLeaves(true);
  }, []);

  return (
    <div className="
    w-screen
    h-screen
    bg-gradient-to-br from-green-100 via-green-200 to-emerald-300
    px-8 py-4
    relative
    overflow-hidden">

      {/* ===== เอฟเฟกต์ใบไม้ร่วง ===== */}
      {showLeaves && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-green-600/20 animate-leafFall"
              style={{
                fontSize: Math.random() * 30 + 20 + 'px',
                top: -50 + 'px',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: Math.random() * 5 + 8 + 's'
              }}
            >
              {['🌿', '🍃', '🌱', '🍂'][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
      )}

      {/* ===== แสงอาทิตย์ ===== */}
      <div className="
      absolute top-10 right-10
      w-40 h-40
      bg-yellow-200
      rounded-full
      blur-3xl
      opacity-60
      animate-pulse" />

      {/* ===== เมฆ ===== */}
      <div className="
      absolute top-20 left-10
      w-96 h-24
      bg-white/40
      rounded-full
      blur-2xl
      animate-cloudMove" />
      
      <div className="
      absolute top-40 right-20
      w-80 h-20
      bg-white/40
      rounded-full
      blur-2xl
      animate-cloudMoveReverse" />

      {/* ===== ภูเขา ===== */}
      <div className="
      absolute bottom-0 left-0
      w-64 h-48
      bg-green-600/30
      transform skew-x-12
      rounded-tl-[100%]" />
      
      <div className="
      absolute bottom-0 right-0
      w-64 h-48
      bg-green-600/30
      transform -skew-x-12
      rounded-tr-[100%]" />

      {/* ===== ต้นไม้ ===== */}
      <div className="absolute bottom-0 left-20 z-10">
        <div className="w-8 h-32 bg-amber-800" />
        <div className="absolute -top-16 -left-8 w-24 h-24 bg-green-500 rounded-full blur-sm opacity-70" />
      </div>
      
      <div className="absolute bottom-0 right-20 z-10">
        <div className="w-8 h-32 bg-amber-800" />
        <div className="absolute -top-16 -left-8 w-24 h-24 bg-green-500 rounded-full blur-sm opacity-70" />
      </div>

      {/* ===== การ์ดทั้งหมด ===== */}
      <div className="relative z-10 flex flex-col items-center gap-8 mt-8">
        {/* การ์ดหัวข้อใหญ่ 2 ใบ */}
        <div className="flex gap-8">
          {/* การ์ด ชีวิตสัมพันธ์ */}
          <div
            onMouseEnter={() => setHoveredCard('life')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate("/p5/life/foodchain")}
            className="
            group
            cursor-pointer
            bg-gradient-to-br from-white to-green-50
            rounded-2xl
            shadow-xl
            hover:shadow-2xl
            w-[380px]
            overflow-hidden
            hover:scale-105
            hover:-translate-y-2
            transition-all
            duration-300
            relative
            border-2 border-green-200/50
            hover:border-green-400"
          >
            {/* ===== รูปภาพ ===== */}
            <div className="relative h-[220px] overflow-hidden">
              <img
                src="/images/p5-life.png"
                className="
                w-full
                h-full
                object-cover
                group-hover:scale-110
                transition-transform
                duration-500"
                alt="ชีวิตสัมพันธ์"
              />
              
              {/* ===== โอเวอร์เลย์ ===== */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* ===== ไอคอนลอย ===== */}
              {hoveredCard === 'life' && (
                <div className="absolute inset-0">
                  <div className="absolute top-4 right-4 text-3xl animate-spin-slow">🌿</div>
                  <div className="absolute bottom-4 left-4 text-3xl animate-bounce">🐛</div>
                </div>
              )}
            </div>

            {/* ===== เนื้อหา ===== */}
            <div className="p-5">
              <h2 className="
              text-2xl
              font-bold
              text-gray-800
              mb-2
              flex
              items-center
              gap-2">
                <span className="text-green-500">🌿</span>
                ชีวิตสัมพันธ์
              </h2>

              <p className="text-sm text-gray-600 mb-3">
                ศึกษาความสัมพันธ์ของสิ่งมีชีวิตในระบบนิเวศ
              </p>

              {/* ===== แถบความก้าวหน้า ===== */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>ระดับ</span>
                  <span>ป.5</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-green-400 h-1.5 rounded-full w-3/4" />
                </div>
              </div>

              {/* ===== ปุ่มเริ่มเรียน ===== */}
              <button className="
                mt-4
                bg-green-500
                text-white
                text-sm
                px-4
                py-2
                rounded-xl
                font-medium
                opacity-0
                group-hover:opacity-100
                transform
                translate-y-2
                group-hover:translate-y-0
                transition-all
                duration-300
                hover:bg-green-600
                w-full">
                เริ่มเรียน →
              </button>
            </div>
          </div>

          {/* การ์ด ลักษณะทางพันธุกรรม */}
          <div
            onMouseEnter={() => setHoveredCard('genetic')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate("/p5/genetic")}
            className="
            group
            cursor-pointer
            bg-gradient-to-br from-white to-purple-50
            rounded-2xl
            shadow-xl
            hover:shadow-2xl
            w-[380px]
            overflow-hidden
            hover:scale-105
            hover:-translate-y-2
            transition-all
            duration-300
            relative
            border-2 border-purple-200/50
            hover:border-purple-400"
          >
            {/* ===== รูปภาพ ===== */}
            <div className="relative h-[220px] overflow-hidden">
              <img
                src="/images/p5-genetic.png"
                className="
                w-full
                h-full
                object-cover
                group-hover:scale-110
                transition-transform
                duration-500"
                alt="ลักษณะทางพันธุกรรม"
              />
              
              {/* ===== โอเวอร์เลย์ ===== */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* ===== ไอคอนลอย ===== */}
              {hoveredCard === 'genetic' && (
                <div className="absolute inset-0">
                  <div className="absolute top-4 right-4 text-3xl animate-spin-slow">🧬</div>
                  <div className="absolute bottom-4 left-4 text-3xl animate-bounce">🔬</div>
                </div>
              )}
            </div>

            {/* ===== เนื้อหา ===== */}
            <div className="p-5">
              <h2 className="
              text-2xl
              font-bold
              text-gray-800
              mb-2
              flex
              items-center
              gap-2">
                <span className="text-purple-500">🧬</span>
                ลักษณะทางพันธุกรรม
              </h2>

              <p className="text-sm text-gray-600 mb-3">
                ศึกษาการถ่ายทอดลักษณะทางพันธุกรรม
              </p>

              {/* ===== แถบความก้าวหน้า ===== */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>ระดับ</span>
                  <span>ป.5</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-purple-400 h-1.5 rounded-full w-1/2" />
                </div>
              </div>

              {/* ===== ปุ่มเริ่มเรียน ===== */}
              <button className="
                mt-4
                bg-purple-500
                text-white
                text-sm
                px-4
                py-2
                rounded-xl
                font-medium
                opacity-0
                group-hover:opacity-100
                transform
                translate-y-2
                group-hover:translate-y-0
                transition-all
                duration-300
                hover:bg-purple-600
                w-full">
                เริ่มเรียน →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== ข้อความท้ายหน้า ===== */}
      <div className="
      absolute
      bottom-4
      left-1/2
      transform
      -translate-x-1/2
      text-green-600/40
      text-xs
      flex
      gap-2
      z-20">
        <span>🌱</span>
        <span>พร้อมเรียนรู้หรือยัง?</span>
        <span>🌱</span>
      </div>

      <style jsx>{`
        @keyframes leafFall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes cloudMove {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(30px); }
        }
        
        @keyframes cloudMoveReverse {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-30px); }
        }
        
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-leafFall {
          animation: leafFall 12s linear infinite;
        }
        
        .animate-cloudMove {
          animation: cloudMove 15s ease-in-out infinite;
        }
        
        .animate-cloudMoveReverse {
          animation: cloudMoveReverse 18s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spinSlow 5s linear infinite;
        }
      `}</style>

    </div>
  )
}