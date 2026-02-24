import { useNavigate } from "react-router-dom";

export default function P4LightQA() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">

      <div className="max-w-4xl mx-auto space-y-6">

        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200">
          <h1 className="text-3xl font-bold text-blue-800">
            📣 คำถามมีคำตอบ : ตัวกลางของแสง
          </h1>
          <p className="text-blue-600 mt-1">
            ทำไมเรามองเห็นวัตถุด้านหลังไม่เหมือนกัน ?
          </p>
        </div>


        {/* ================= QUESTION ================= */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-blue-200">
          <h2 className="text-lg font-bold text-blue-800 mb-3">
            ❓ คำถามชวนคิด
          </h2>

          <p className="text-lg text-gray-800 font-semibold">
            ทำไมวัสดุแต่ละชนิดจึงทำให้เรามองเห็นสิ่งของด้านในได้ไม่เท่ากัน ?
          </p>
        </div>


        {/* ================= MAIN ANSWER ================= */}
        <div className="bg-blue-50 rounded-2xl p-6 shadow-md border border-blue-200">
          <p className="text-lg font-semibold text-blue-800 mb-4">
            👉 เพราะวัสดุแต่ละชนิดยอมให้แสงผ่านได้ไม่เท่ากัน
          </p>

          <div className="space-y-4">

            <AnswerCard
              number="1"
              title="วัตถุโปร่งใส"
              color="blue"
              text={
                <>
                  เช่น กระจกใส แก้วใส พลาสติกใส <br />
                  <b>แสงผ่านได้เกือบทั้งหมด</b> <br />
                  มองเห็นสิ่งของด้านหลังได้ชัดเจน
                </>
              }
            />

            <AnswerCard
              number="2"
              title="วัตถุโปร่งแสง"
              color="amber"
              text={
                <>
                  เช่น กระจกฝ้า กระดาษไข หมอก <br />
                  <b>แสงผ่านได้บางส่วน</b> <br />
                  มองเห็นสิ่งของด้านหลังไม่ชัด
                </>
              }
            />

            <AnswerCard
              number="3"
              title="วัตถุทึบแสง"
              color="gray"
              text={
                <>
                  เช่น ไม้ โลหะ กำแพง <br />
                  <b>แสงผ่านไม่ได้</b> <br />
                  ไม่สามารถมองเห็นด้านหลังได้
                </>
              }
            />

          </div>
        </div>


        {/* ================= NAVIGATION ================= */}
        <div className="flex justify-between pt-2">
          <button
            onClick={() => navigate("/p4/light/summary")}
            className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600"
          >
            ◀ กลับ
          </button>

          <button
            onClick={() => navigate("/p4")}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg"
          >
            🎉 จบบทเรียน ▶
          </button>
        </div>

      </div>
    </div>
  );
}


/* ================= REUSABLE CARD ================= */

function AnswerCard({ number, title, text, color }) {

  const colorMap = {
    blue: "bg-blue-50 border-blue-300 text-blue-800",
    amber: "bg-amber-50 border-amber-300 text-amber-800",
    gray: "bg-gray-50 border-gray-300 text-gray-800",
  };

  return (
    <div className={`p-5 rounded-xl border-2 shadow-sm ${colorMap[color]}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold">
          {number}
        </div>
        <div className="font-bold">{title}</div>
      </div>

      <div className="pl-12 text-gray-700 leading-relaxed">
        {text}
      </div>
    </div>
  );
}