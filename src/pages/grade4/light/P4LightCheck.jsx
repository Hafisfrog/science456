import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LabLayout from "../../../components/LabLayout";

export default function P4LightCheck() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const material = state?.material;
  const observedResult = state?.observedResult; // ผลจริงจาก STEP 4
  const studentAnswer = state?.studentAnswer;   // คำตอบนักเรียนจาก STEP 5

  useEffect(() => {
    if (!material || !observedResult || !studentAnswer) {
      navigate("/p4/light/select");
    }
  }, [material, observedResult, studentAnswer, navigate]);

  const isCorrect = observedResult === studentAnswer;

  const toSummary = () => {
    navigate("/p4/light/summary", {
      state: {
        material,
        observedResult,
        studentAnswer,
        isCorrect,
      },
    });
  };

  return (
    <LabLayout title="ตรวจคำตอบการทดลอง" onNext={toSummary}>
      <div className="space-y-6">
        {/* สรุปวัตถุ */}
        <div className="bg-white border-4 border-black rounded-xl p-4 shadow">
          <p className="font-semibold">
            🧪 วัตถุที่ทดลอง: <b>{material?.name}</b>
          </p>
        </div>

        {/* ตารางตรวจคำตอบ */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white border-4 border-black">
            <thead>
              <tr className="bg-yellow-200">
                <th className="border-2 border-black p-3">รายการ</th>
                <th className="border-2 border-black p-3">ผลการทดลอง</th>
              </tr>
            </thead>
            <tbody>
              <Row label="ผลที่นักเรียนเลือก" value={studentAnswer} />
              <Row label="ผลที่ถูกต้อง" value={observedResult} />
            </tbody>
          </table>
        </div>

        {/* แสดงถูก–ผิด */}
        <div
          className={`text-center text-xl font-bold p-4 rounded-xl border-4
            ${
              isCorrect
                ? "bg-green-100 border-green-500 text-green-700"
                : "bg-red-100 border-red-500 text-red-700"
            }
          `}
        >
          {isCorrect ? "✅ คำตอบถูกต้อง" : "❌ คำตอบยังไม่ถูก"}
        </div>

        {/* ปุ่มนำทาง */}
        <div className="flex justify-between pt-4">
          <button
            onClick={() =>
              navigate("/p4/light/record", {
                state: { material, observedResult },
              })
            }
            className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600"
          >
            ◀ กลับไปแก้ไข
          </button>

          <button
            onClick={toSummary}
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600"
          >
            สรุปผล ▶
          </button>
        </div>
      </div>
    </LabLayout>
  );
}

/* ----------------------------- */
/* แถวในตาราง */
/* ----------------------------- */
function Row({ label, value }) {
  return (
    <tr className="text-center">
      <td className="border-2 border-black p-3 font-medium">
        {label}
      </td>
      <td className="border-2 border-black p-3">
        {value}
      </td>
    </tr>
  );
}
