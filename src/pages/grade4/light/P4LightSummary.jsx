import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LabLayout from "../../../components/LabLayout";

export default function P4LightSummary() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const material = state?.material;
  const observedResult = state?.observedResult;
  const studentAnswer = state?.studentAnswer;
  const isCorrect = state?.isCorrect;

  useEffect(() => {
    if (!material || !observedResult) {
      navigate("/p4/light/select");
    }
  }, [material, observedResult, navigate]);

  // สรุปประเภทตัวกลางตามผลที่สังเกต
  const mediumType =
    observedResult === "เห็นชัด"
      ? "โปร่งใส"
      : observedResult === "เห็นไม่ชัด"
      ? "โปร่งแสง"
      : "ทึบแสง";

  return (
    <LabLayout title="สรุปผลการทดลอง">
      <div className="space-y-6">
        {/* สรุปผลเฉพาะกรณีของนักเรียน */}
        <div className="bg-white border-4 border-black rounded-xl p-4 shadow">
          <h3 className="font-bold mb-2">🔎 ผลการทดลองของคุณ</h3>
          <p>
            วัตถุที่ทดลอง: <b>{material?.name}</b>
          </p>
          <p>
            ผลที่สังเกตได้:{" "}
            <span className="font-semibold text-blue-700">
              {observedResult}
            </span>
          </p>
          <p>
            ประเภทตัวกลางของแสง:{" "}
            <span className="font-semibold text-purple-700">
              {mediumType}
            </span>
          </p>

          {isCorrect !== undefined && (
            <p className="mt-2 font-semibold">
              สถานะคำตอบ:{" "}
              <span className={isCorrect ? "text-green-700" : "text-red-700"}>
                {isCorrect ? "✅ ถูกต้อง" : "❌ ยังไม่ถูก"}
              </span>
            </p>
          )}
        </div>

        {/* สรุปความรู้วิทยาศาสตร์ (หลักสูตร ป.4) */}
        <div className="bg-white border-4 border-black rounded-xl p-4 shadow">
          <h3 className="font-bold mb-2">🧠 สรุปความรู้</h3>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <b>วัตถุโปร่งใส</b> → แสงผ่านได้ดี มองเห็นสิ่งของด้านหลังได้ชัด
              <br />
              <span className="text-sm text-gray-600">
                ตัวอย่าง: กระจกใส, น้ำใส, พลาสติกใส
              </span>
            </li>

            <li>
              <b>วัตถุโปร่งแสง</b> → แสงผ่านได้บางส่วน เห็นภาพไม่ชัด
              <br />
              <span className="text-sm text-gray-600">
                ตัวอย่าง: กระจกฝ้า, กระดาษไข, หมอก
              </span>
            </li>

            <li>
              <b>วัตถุทึบแสง</b> → แสงผ่านไม่ได้ มองไม่เห็นสิ่งของด้านหลัง
              <br />
              <span className="text-sm text-gray-600">
                ตัวอย่าง: แผ่นไม้, เหล็ก, ผนังปูน
              </span>
            </li>
          </ul>
        </div>

        {/* ปุ่มนำทางท้ายบท */}
        <div className="flex justify-between pt-4">
          <button
            onClick={() =>
              navigate("/p4/light/experiment", {
                state: { material },
              })
            }
            className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600"
          >
            ◀ ทดลองอีกครั้ง
          </button>

          <button
          onClick={() => navigate("/p4/light/qa")}
          className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600"
          >
          ต่อไป ▶
          </button>

        </div>
      </div>
    </LabLayout>
  );
}
