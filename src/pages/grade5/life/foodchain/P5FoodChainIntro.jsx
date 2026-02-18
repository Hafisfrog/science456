import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";

export default function P5FoodChainIntro() {
  const navigate = useNavigate();

  return (
    <LabLayout title="การทดลองที่ 5 เรื่อง ห่วงโซ่อาหาร">
      <div className="relative min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 overflow-hidden">

        {/* ดวงอาทิตย์ */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full shadow-lg" />

        {/* พื้นหญ้า */}
        <div className="absolute bottom-0 w-full h-32 bg-green-500" />

        {/* รั้วไม้ด้านล่าง */}
        <div className="absolute bottom-0 w-full flex justify-between px-8 opacity-80">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-12 h-8 bg-orange-700 rounded-t-lg" />
          ))}
        </div>

        {/* การ์ดหัวข้อหลัก */}
        <div className="bg-green-300 px-12 py-4 rounded-xl shadow-lg mb-8">
          <h1 className="text-3xl font-bold text-black">
            การทดลองที่ 5 เรื่อง ห่วงโซ่อาหาร
          </h1>
        </div>

        {/* ตัวละครครู + หนังสือ */}
        <div className="flex flex-col items-center z-10 mb-10">
          <div className="w-40 h-40 bg-white rounded-full border-4 border-black shadow-md flex items-center justify-center">
            <span className="text-6xl">👩‍🏫</span>
          </div>
          <p className="mt-4 text-lg font-semibold">
            พร้อมเรียนรู้กันหรือยัง?
          </p>
        </div>

        {/* ปุ่มเริ่มการทดลอง */}
        <button
          onClick={() => navigate("/p5/life/foodchain/vocab")}
          className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg
                     hover:bg-blue-600 transition"
        >
          ▶ เริ่มการทดลอง
        </button>

        {/* ปุ่มภาษา + เสียง (เหมือนหน้าอื่น) */}
        <div className="absolute bottom-6 left-6 flex gap-2">
          <button className="bg-blue-200 px-4 py-2 rounded-full">ไทย</button>
          <button className="bg-blue-200 px-4 py-2 rounded-full">อังกฤษ</button>
          <button className="bg-blue-200 px-4 py-2 rounded-full">มลายู</button>
          <button className="bg-blue-400 px-4 py-2 rounded-full">🔊</button>
        </div>
      </div>
    </LabLayout>
  );
}
