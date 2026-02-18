import { useNavigate } from "react-router-dom";
import LabLayout from "../../../components/LabLayout";

export default function P4LightIntro() {
  const navigate = useNavigate();

  return (
    <LabLayout
      title="การทดลองที่ 4 เรื่อง ตัวกลางของแสง"
      onNext={() => navigate("/p4/light/vocab")}
    >
      {/* กระดานเนื้อหา */}
      <div className="space-y-6">
        {/* คำถามสถานการณ์ปัญหา */}
        <div className="bg-white border-4 border-black rounded-xl p-4 shadow">
          <p className="text-lg font-semibold">
            ❓ คำถามชวนคิด
          </p>
          <p className="mt-2">
            ทำไมวัสดุแต่ละชนิดจึงทำให้เรามองเห็นสิ่งของข้างใน
            ได้ชัดเจนไม่เท่ากัน?
          </p>
        </div>

        {/* หัวข้อขั้นตอน */}
        <div className="inline-block bg-white border-4 border-black px-6 py-2 font-bold">
          ขั้นตอนการทดลอง
        </div>

        {/* รายการขั้นตอน */}
        <div className="space-y-3">
          <StepItem
            number={1}
            text="เลือกวัตถุทดลอง"
          />
          <StepItem
            number={2}
            text="สังเกตผลที่แสดง"
          />
          <StepItem
            number={3}
            text="เปลี่ยนชนิดวัตถุและทำการทดลองซ้ำ"
          />
          <StepItem
            number={4}
            text="บันทึกผลการทดลอง"
          />
        </div>

        {/* ปุ่มเริ่มการทดลอง */}
        <div className="flex justify-end pt-6">
          <button
            onClick={() => navigate("/p4/light/vocab")}
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 shadow"
          >
            ▶ เริ่มการทดลอง
          </button>
        </div>
      </div>
    </LabLayout>
  );
}

/* ------------------------- */
/* Component ขั้นตอนย่อย */
/* ------------------------- */
function StepItem({ number, text }) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-full px-4 py-3 shadow border">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
        {number}
      </div>
      <div className="text-gray-800 font-medium">
        {text}
      </div>
    </div>
  );
}
