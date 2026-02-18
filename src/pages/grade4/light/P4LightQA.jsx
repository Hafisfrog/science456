import { useNavigate } from "react-router-dom";
import LabLayout from "../../../components/LabLayout";

export default function P4LightQA() {
  const navigate = useNavigate();

  return (
    <LabLayout title="คำถามมีคำตอบ : ตัวกลางของแสง">
      <div className="space-y-8 animate-fadeIn">
        {/* การ์ดคำถามหลัก */}
        <div className="bg-white border-4 border-black rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-300 rounded-full opacity-40 blur-xl" />
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-teal-300 rounded-full opacity-40 blur-xl" />

          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            📣 คำถามชวนคิด
          </h2>

          <p className="text-lg font-semibold text-gray-800">
            1. ทำไมวัสดุแต่ละชนิดจึงทำให้เรามองเห็นสิ่งของข้างในได้ชัดเจนไม่เท่ากัน ?
          </p>
        </div>

        {/* กล่องคำตอบหลัก */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 border-4 border-black rounded-2xl p-6 shadow-xl">
          <p className="text-lg font-semibold mb-4">
            👉 เพราะ <span className="text-blue-700">วัสดุแต่ละชนิดยอมให้แสงผ่านได้ไม่เท่ากัน</span>
          </p>

          <div className="space-y-4">
            <AnswerCard
              number="1"
              title="วัตถุโปร่งใส"
              color="bg-green-100"
              border="border-green-500"
              text={
                <>
                  เช่น กระจกใส แก้วใส พลาสติกใส  
                  <br />
                  <span className="text-green-700 font-semibold">
                    👉 แสงผ่านได้เกือบทั้งหมด
                  </span>
                  <br />
                  <span className="text-sm text-gray-700">
                    ✅ มองเห็นสิ่งของด้านในได้ชัดเจน
                  </span>
                </>
              }
            />

            <AnswerCard
              number="2"
              title="วัตถุโปร่งแสง"
              color="bg-yellow-100"
              border="border-yellow-500"
              text={
                <>
                  เช่น กระจกฝ้า พลาสติกขุ่น กระดาษไข หมอก  
                  <br />
                  <span className="text-yellow-700 font-semibold">
                    👉 แสงผ่านได้บางส่วน
                  </span>
                  <br />
                  <span className="text-sm text-gray-700">
                    ✅ มองเห็นสิ่งของด้านในไม่ชัด เหมือนเงาจาง ๆ
                  </span>
                </>
              }
            />

            <AnswerCard
              number="3"
              title="วัตถุทึบแสง"
              color="bg-red-100"
              border="border-red-500"
              text={
                <>
                  เช่น ไม้ โลหะ หนังสือ กำแพง  
                  <br />
                  <span className="text-red-700 font-semibold">
                    👉 แสงผ่านไม่ได้เลย
                  </span>
                  <br />
                  <span className="text-sm text-gray-700">
                    ❌ ไม่สามารถมองเห็นสิ่งของด้านในได้
                  </span>
                </>
              }
            />
          </div>
        </div>

        {/* ปุ่มนำทาง */}
        <div className="flex justify-between items-center pt-6">
          <button
            onClick={() => navigate("/p4/light/summary")}
            className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 shadow-md transition"
          >
            ◀ ย้อนกลับ
          </button>

          <button
            onClick={() => navigate("/p4/light")}
            className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 shadow-lg text-lg transition"
          >
            🎉 จบบทเรียน ▶
          </button>
        </div>
      </div>
    </LabLayout>
  );
}

/* ========================= */
/* การ์ดคำตอบสวย ๆ */
/* ========================= */
function AnswerCard({ number, title, color, border, text }) {
  return (
    <div
      className={`p-5 rounded-xl border-2 ${border} ${color} shadow transition hover:scale-[1.01]`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-black font-bold">
          {number}
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>

      <p className="pl-12 text-gray-800 leading-relaxed">{text}</p>
    </div>
  );
}
