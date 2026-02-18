import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";

// เฉลยตัวอย่าง (คุณสามารถปรับได้ภายหลัง)
const ANSWER_KEY = [
  ["ข้าว", "ตั๊กแตน", "กบ"],
  ["หญ้า", "หนูนา", "งู"],
  ["พืชน้ำ", "ลูกน้ำ", "ปลาเล็ก"],
  ["หญ้า", "หนอน", "นก"],
  ["ข้าว", "หนูนา", "เหยี่ยว"],
];

export default function P5FoodChainCheck() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const chains = state?.chains || [];

  useEffect(() => {
    if (!chains || chains.length === 0) {
      navigate("/p5/life/foodchain/select");
    }
  }, [chains, navigate]);

  const checkChain = (chain, answer) => {
    if (!chain[0] || !chain[1] || !chain[2]) return "incomplete";

    const names = chain.map((c) => c.name);
    return names.every((n, i) => n === answer[i])
      ? "correct"
      : "wrong";
  };

  const results = chains.map((chain, i) =>
    checkChain(chain, ANSWER_KEY[i])
  );

  return (
    <LabLayout title="ตรวจคำตอบ : ห่วงโซ่อาหาร">
      <div className="space-y-6">
        {/* คำอธิบาย */}
        <div className="bg-white border-4 border-black rounded-xl p-4 shadow">
          <p className="font-semibold">
            ✅ ตรวจคำตอบของนักเรียน เปรียบเทียบกับเฉลย
          </p>
        </div>

        {/* ตารางตรวจคำตอบ */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white border-4 border-black">
            <thead>
              <tr className="bg-yellow-200">
                <th className="border-2 border-black p-3">ห่วงโซ่อาหาร</th>
                <th className="border-2 border-black p-3">คำตอบนักเรียน</th>
                <th className="border-2 border-black p-3">เฉลย</th>
                <th className="border-2 border-black p-3">ผล</th>
              </tr>
            </thead>
            <tbody>
              {chains.map((chain, i) => (
                <tr key={i} className="text-center">
                  <td className="border-2 border-black p-3 font-bold">
                    ชุดที่ {i + 1}
                  </td>

                  <td className="border-2 border-black p-3">
                    {chain[0] && chain[1] && chain[2]
                      ? chain.map((c) => c.name).join(" → ")
                      : "ยังไม่ครบ"}
                  </td>

                  <td className="border-2 border-black p-3">
                    {ANSWER_KEY[i].join(" → ")}
                  </td>

                  <td className="border-2 border-black p-3 font-semibold">
                    {results[i] === "correct" && (
                      <span className="text-green-700">✔ ถูกต้อง</span>
                    )}
                    {results[i] === "wrong" && (
                      <span className="text-red-700">✖ ยังไม่ถูก</span>
                    )}
                    {results[i] === "incomplete" && (
                      <span className="text-gray-500">ยังไม่ครบ</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ปุ่มนำทาง */}
        <div className="flex justify-between pt-4">
          <button
            onClick={() =>
              navigate("/p5/life/foodchain/sim", {
                state: { chains },
              })
            }
            className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600"
          >
            ◀ แก้ไขคำตอบ
          </button>

          <button
            onClick={() =>
              navigate("/p5/life/foodchain/summary", {
                state: { chains, results },
              })
            }
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600"
          >
            สรุปผล ▶
          </button>
        </div>
      </div>
    </LabLayout>
  );
}
