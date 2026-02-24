import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function P4LightRecord() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [pendingResults, setPendingResults] = useState([]);

  useEffect(() => {
    if (state?.pendingResults) {
      setPendingResults(state.pendingResults);
    } else {
      navigate("/p4/light/experiment");
    }
  }, [state, navigate]);

  const goToNext = () => {
    navigate("/p4/light/summary", {
      state: {
        allResults: pendingResults,
        fromRecord: true,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 mb-6 shadow-lg border border-blue-200">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">📋 บันทึกผลการทดลองที่ 4</h1>
          <p className="text-blue-600">เรื่อง ตัวกลางของแสง • ทดลองทั้งหมด {pendingResults.length} ครั้ง</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-300 mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4">
            <h2 className="text-xl font-bold">ผลการทดลอง</h2>
          </div>

          <div className="overflow-x-auto p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border-2 border-blue-300 p-3 text-left" rowSpan="2">ชื่อวัตถุ</th>
                  <th className="border-2 border-blue-300 p-3 text-center" colSpan="3">แสงที่ผ่านวัตถุ</th>
                  <th className="border-2 border-blue-300 p-3 text-center" colSpan="3">จำแนกวัตถุเป็น</th>
                </tr>
                <tr className="bg-blue-50">
                  <th className="border-2 border-blue-300 p-2 text-center">ผ่านได้ดี</th>
                  <th className="border-2 border-blue-300 p-2 text-center">ผ่านได้บ้าง</th>
                  <th className="border-2 border-blue-300 p-2 text-center">ผ่านไม่ได้</th>
                  <th className="border-2 border-blue-300 p-2 text-center">วัตถุโปร่งใส</th>
                  <th className="border-2 border-blue-300 p-2 text-center">วัตถุโปร่งแสง</th>
                  <th className="border-2 border-blue-300 p-2 text-center">วัตถุทึบแสง</th>
                </tr>
              </thead>
              <tbody>
                {pendingResults.map((item, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition">
                    <td className="border-2 border-blue-300 p-3 font-medium">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded ${
                            item.material.type === "transparent"
                              ? "bg-blue-100"
                              : item.material.type === "translucent"
                              ? "bg-yellow-100"
                              : "bg-gray-100"
                          } p-1`}
                        >
                          <img src={item.material.img} alt="" className="w-full h-full object-contain" />
                        </div>
                        {item.material.name}
                      </div>
                    </td>

                    <td className="border-2 border-blue-300 p-3 text-center text-2xl">
                      {item.result === "เห็นชัดเจน" && "✓"}
                    </td>
                    <td className="border-2 border-blue-300 p-3 text-center text-2xl">
                      {item.result === "เห็นไม่ชัด" && "~"}
                    </td>
                    <td className="border-2 border-blue-300 p-3 text-center text-2xl">
                      {item.result === "มองไม่เห็น" && "✗"}
                    </td>

                    <td className="border-2 border-blue-300 p-3 text-center text-2xl">
                      {item.material.type === "transparent" && "✓"}
                    </td>
                    <td className="border-2 border-blue-300 p-3 text-center text-2xl">
                      {item.material.type === "translucent" && "✓"}
                    </td>
                    <td className="border-2 border-blue-300 p-3 text-center text-2xl">
                      {item.material.type === "opaque" && "✓"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-4 border-2 border-green-300 mb-6">
          <h3 className="font-bold text-green-800 mb-2">📌 สรุปผลการทดลอง</h3>
          <ul className="space-y-1 text-sm">
            <li>• วัตถุโปร่งใส แสงผ่านได้ดี มองเห็นได้ชัดเจน</li>
            <li>• วัตถุโปร่งแสง แสงผ่านได้บางส่วน มองเห็นไม่ชัด</li>
            <li>• วัตถุทึบแสง แสงผ่านไม่ได้ มองไม่เห็น</li>
          </ul>
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => navigate("/p4/light/experiment")}
            className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition flex items-center gap-2"
          >
            <span>◀</span>
            ทดลองเพิ่ม
          </button>

          <button
            onClick={goToNext}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition flex items-center gap-2"
          >
            <span>📖</span>
            เรียนรู้เพิ่มเติม
            <span>▶</span>
          </button>
        </div>

      </div>
    </div>
  );
}
