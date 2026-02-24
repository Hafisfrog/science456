import { useNavigate } from "react-router-dom";

export default function P4LightObjective() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-blue-200 text-center mb-8">
          <div className="inline-block px-6 py-2 bg-blue-100 border-2 border-blue-300 rounded-full text-lg font-bold text-blue-800 mb-4">
            ชั้นประถมศึกษาปีที่ 4
          </div>

          <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
            ตัวกลางของแสง
          </h1>

          <div className="inline-block px-6 py-2 bg-cyan-100 border-2 border-cyan-300 rounded-xl text-xl font-bold text-cyan-800">
            จุดประสงค์การเรียนรู้
          </div>
        </div>

        {/* Objectives */}
        <div className="space-y-6 mb-10">

          <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-300 p-8 flex items-start gap-6">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white text-xl font-bold rounded-full">
              1
            </div>
            <p className="text-2xl font-semibold text-gray-700 leading-relaxed">
              สังเกตการมองเห็นแสงผ่านวัตถุต่าง ๆ ได้
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-300 p-8 flex items-start gap-6">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white text-xl font-bold rounded-full">
              2
            </div>
            <p className="text-2xl font-semibold text-gray-700 leading-relaxed">
              จำแนกวัตถุที่นำมาใช้กั้นแสงได้ เป็นวัตถุโปร่งใส
              วัตถุโปร่งแสง และวัตถุทึบแสง
            </p>
          </div>

        </div>

        {/* Footer Controls */}
        <div className="flex justify-between items-center">

          <div className="bg-blue-100 px-6 py-3 rounded-full text-lg font-medium text-blue-800 shadow">
            ไทย • อังกฤษ • มลายู 🔊
          </div>

          <button
            onClick={() => navigate("/p4/light/vocab")}
            className="px-8 py-4 text-xl font-bold text-white rounded-full 
                       bg-gradient-to-r from-blue-500 to-cyan-500 
                       hover:shadow-xl transition"
          >
            ต่อไป ▶▶
          </button>

        </div>

      </div>
    </div>
  );
}