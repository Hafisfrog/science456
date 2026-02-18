import { useNavigate } from "react-router-dom";
import LabLayout from "../../../components/LabLayout";

export default function P5LifeIntro() {
  const navigate = useNavigate();

  return (
    <LabLayout title="ชั้นประถมศึกษาปีที่ 5">
      <div className="relative min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 overflow-hidden">

        {/* ดวงอาทิตย์ */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full shadow-lg" />

        {/* พื้นหญ้า */}
        <div className="absolute bottom-0 w-full h-32 bg-green-500" />

        {/* รั้วไม้ */}
        <div className="absolute bottom-0 w-full flex justify-between px-8 opacity-80">
          <div className="w-12 h-8 bg-orange-700 rounded-t-lg" />
          <div className="w-12 h-8 bg-orange-700 rounded-t-lg" />
          <div className="w-12 h-8 bg-orange-700 rounded-t-lg" />
          <div className="w-12 h-8 bg-orange-700 rounded-t-lg" />
        </div>

        {/* การ์ดหัวข้อใหญ่ */}
        <div className="flex gap-8 z-10">
          {/* การ์ด 1 */}
          <button
            onClick={() => navigate("/p5/life/foodchain")}
            className="bg-white border-4 border-black rounded-2xl px-12 py-8 shadow-xl text-xl font-bold
                       hover:scale-105 transition transform"
          >
            “ ชีวิตสัมพันธ์ ”
          </button>

          {/* การ์ด 2 */}
          <button
            onClick={() => alert("หน้าลักษณะทางพันธุกรรม (ยังไม่ทำ)")}
            className="bg-white border-4 border-black rounded-2xl px-12 py-8 shadow-xl text-xl font-bold
                       hover:scale-105 transition transform"
          >
            “ ลักษณะทางพันธุกรรม ”
          </button>
        </div>

        {/* ปุ่มภาษา + เสียง (เหมือนของคุณ) */}
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

