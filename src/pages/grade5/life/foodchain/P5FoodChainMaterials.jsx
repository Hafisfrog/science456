import { useNavigate } from "react-router-dom";

const topMaterials = [
  { name: "ข้าว", img: "/images/p5/kaw.png", delay: "0s", duration: "3.2s" },
  { name: "พืชน้ำ", img: "/images/p5/lunamm.png", delay: "0.2s", duration: "3.5s" },
  { name: "ตั๊กแตน", img: "/images/p5/tag.png", delay: "0.4s", duration: "3.1s" },
  { name: "หนูนา", img: "/images/p5/n.png", delay: "0.6s", duration: "3.6s" },
  { name: "หนอน", img: "/images/p5/non.png", delay: "0.8s", duration: "3.3s" },
  { name: "หญ้า", img: "/images/p5/ya.png", delay: "1s", duration: "3.7s" },
];

const bottomMaterials = [
  { name: "กบ", img: "/images/p5/gop.png", delay: "0.15s", duration: "3.4s" },
  { name: "ปลาเล็ก", img: "/images/p5/pla.png", delay: "0.35s", duration: "3.2s" },
  { name: "งู", img: "/images/p5/snack.png", delay: "0.55s", duration: "3.8s" },
  { name: "เหยี่ยว", img: "/images/p5/y.png", delay: "0.75s", duration: "3.3s" },
  { name: "นก", img: "/images/p5/nog.png", delay: "0.95s", duration: "3.6s" },
  { name: "ลูกน้ำ", img: "/images/p5/lunam.png", delay: "1.15s", duration: "3.1s" },
];

const materialImageClass =
  "w-44 sm:w-52 md:w-60 lg:w-64 mx-auto drop-shadow-xl";

const getLivingImageStyle = (delay, duration) => ({
  animation: `p5Living ${duration} ease-in-out ${delay} infinite`,
});

export default function P5FoodChainMaterials() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen relative overflow-hidden font-sans">
      {/* ===== Background ===== */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-green-200" />

      {/* ===== ดวงอาทิตย์ ===== */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-400 rounded-full translate-x-10 -translate-y-10" />

      {/* ===== หัวข้อ ===== */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2">
        <div className="bg-green-300 px-14 py-4 text-3xl font-bold rounded">
          การทดลองที่ 5 เรื่อง ห่วงโซ่อาหาร
        </div>
      </div>

      {/* ===== วัสดุอุปกรณ์ ===== */}
      <div className="absolute top-28 left-20">
        <div className="bg-green-300 px-7 py-3 text-2xl font-semibold rounded">
          วัสดุอุปกรณ์
        </div>
      </div>

      {/* ===== แถวบน ===== */}
      <div className="absolute top-[34%] left-1/2 -translate-x-1/2 flex gap-6 items-end">
        {topMaterials.map((item) => (
          <div key={item.name} className="text-center">
            <img
              src={item.img}
              alt={item.name}
              className={materialImageClass}
              style={getLivingImageStyle(item.delay, item.duration)}
            />
            <div className="mt-2 text-xl">{item.name}</div>
          </div>
        ))}
      </div>

      {/* ===== แถวล่าง ===== */}
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex gap-6 items-end">
        {bottomMaterials.map((item) => (
          <div key={item.name} className="text-center">
            <img
              src={item.img}
              alt={item.name}
              className={materialImageClass}
              style={getLivingImageStyle(item.delay, item.duration)}
            />
            <div className="mt-2 text-xl">{item.name}</div>
          </div>
        ))}
      </div>

      {/* ===== ปุ่มนำทาง ===== */}
      <div className="absolute bottom-8 right-10 flex items-center gap-3">
        <button
          onClick={() => navigate("/p5/life/foodchain/scene")}
          className="bg-blue-500 text-white px-5 py-2 text-base rounded-full shadow-md hover:bg-blue-600"
        >
          ← ย้อนกลับ
        </button>

        <button
          onClick={() => navigate("/p5/life/foodchain/steps")}
          className="bg-red-500 text-white px-5 py-2 text-base rounded-full shadow-md hover:bg-red-600"
        >
          ต่อไป →
        </button>
      </div>

      <style>{`
        @keyframes p5Living {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-6px) rotate(1deg) scale(1.02);
          }
          50% {
            transform: translateY(-10px) rotate(0deg) scale(1.04);
          }
          75% {
            transform: translateY(-4px) rotate(-1deg) scale(1.02);
          }
        }
      `}</style>
    </div>
  );
}
