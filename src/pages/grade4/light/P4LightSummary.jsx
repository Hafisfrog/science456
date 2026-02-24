import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function P4LightSummary() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const allResults = state?.allResults || [];

  useEffect(() => {
    if (!allResults.length) {
      navigate("/p4/light/experiment");
    }
  }, [allResults, navigate]);

  const getTypeIcon = (type) => {
    if (type === "transparent") return "🔆";
    if (type === "translucent") return "🌫️";
    return "⬛";
  };

  const count = {
    transparent: allResults.filter(r => r.material.type === "transparent").length,
    translucent: allResults.filter(r => r.material.type === "translucent").length,
    opaque: allResults.filter(r => r.material.type === "opaque").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">

      <div className="max-w-6xl mx-auto space-y-6">

        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200">
          <h1 className="text-3xl font-bold text-blue-800">
            🧠 สรุปความรู้เรื่อง ตัวกลางของแสง
          </h1>
          <p className="text-blue-600 mt-1">
            จากการทดลองทั้งหมด {allResults.length} ครั้ง
          </p>
        </div>
        {/* ================= KNOWLEDGE ================= */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200">
          <h2 className="text-xl font-bold text-blue-800 mb-4">
            📘 ความรู้ที่ได้จากการทดลอง
          </h2>

          <ul className="space-y-2 text-gray-700">
            <li>• วัตถุโปร่งใส → แสงผ่านได้ทั้งหมด มองเห็นชัด</li>
            <li>• วัตถุโปร่งแสง → แสงผ่านบางส่วน มองเห็นไม่ชัด</li>
            <li>• วัตถุทึบแสง → แสงผ่านไม่ได้</li>
          </ul>
        </div>


        {/* ================= RESULT LIST ================= */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200">
          <h2 className="text-xl font-bold text-blue-800 mb-4">
            📊 รายการผลการทดลอง
          </h2>

          <div className="space-y-3">
            {allResults.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-3 rounded-xl border border-blue-100 bg-blue-50"
              >
                <img
                  src={item.material.img}
                  className="w-12 h-12 object-contain"
                />

                <div className="flex-1">
                  <div className="font-semibold text-gray-800">
                    {item.material.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {getTypeIcon(item.material.type)} {item.result}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ================= NAV ================= */}
        <div className="flex justify-between pt-2">
          <button
            onClick={() =>
              navigate("/p4/light/record", {
                state: { pendingResults: allResults },
              })
            }
            className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600"
          >
            ◀ กลับ
          </button>

          <button
            onClick={() => navigate("/p4/light/qa")}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg"
          >
            ทำแบบทดสอบ ▶
          </button>
        </div>

      </div>
    </div>
  );
}


/* ================= REUSABLE CARD ================= */

function SummaryCard({ icon, title, desc, count, color }) {

  const colorMap = {
    blue: "bg-blue-50 border-blue-300 text-blue-800",
    amber: "bg-amber-50 border-amber-300 text-amber-800",
    gray: "bg-gray-50 border-gray-300 text-gray-800",
  };

  return (
    <div className={`rounded-2xl p-5 border-2 shadow-md ${colorMap[color]}`}>
      <div className="text-3xl">{icon}</div>
      <div className="font-bold mt-2">{title}</div>
      <div className="text-sm opacity-70">{desc}</div>
      <div className="text-2xl font-bold mt-2">{count}</div>
    </div>
  );
}