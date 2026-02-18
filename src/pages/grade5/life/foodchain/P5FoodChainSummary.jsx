import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";

export default function P5FoodChainSummary() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const chains = state?.chains || [];
  const results = state?.results || [];

  useEffect(() => {
    if (!chains || chains.length === 0) {
      navigate("/p5/life/foodchain/select");
    }
  }, [chains, navigate]);

  const correctCount = results.filter(r => r === "correct").length;

  return (
    <LabLayout title="สรุปผลการทดลอง : ห่วงโซ่อาหาร">
      <div className="space-y-6">

        {/* สรุปผลเฉพาะของนักเรียน */}
        <div className="bg-white border-4 border-black rounded-xl p-4 shadow">
          <h3 className="font-bold mb-2">📊 ผลการทดลองของคุณ</h3>
          <p className="font-semibold">
            คุณสร้างห่วงโซ่อาหารถูกต้อง {correctCount} จาก 5 ชุด
          </p>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
            {chains.map((chain, i) => (
              <div
                key={i}
                className="border rounded-lg p-2 bg-slate-50 text-sm"
              >
                <b>ชุดที่ {i + 1}:</b>{" "}
                {chain[0] && chain[1] && chain[2]
                  ? chain.map(c => c.name).join(" → ")
                  : "ยังไม่ครบ"}
                {" "}
                <span className={
                  results[i] === "correct"
                    ? "text-green-700"
                    : results[i] === "wrong"
                    ? "text-red-700"
                    : "text-gray-500"
                }>
                  {results[i] === "correct" && "✔"}
                  {results[i] === "wrong" && "✖"}
                  {results[i] === "incomplete" && "…"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* แผนภาพแนวคิด (Concept Map) */}
        <div className="bg-white border-4 border-black rounded-xl p-4 shadow">
          <h3 className="font-bold mb-3">🧠 แผนภาพแนวคิด (Concept)</h3>

          <div className="flex flex-wrap items-center justify-center gap-3 text-center">
            <ConceptBox color="bg-green-200" title="ผู้ผลิต" detail="พืชสร้างอาหารเองได้" />
            <Arrow />
            <ConceptBox color="bg-yellow-200" title="ผู้บริโภค" detail="กินสิ่งมีชีวิตอื่น" />
            <Arrow />
            <ConceptBox color="bg-purple-200" title="ผู้ย่อยสลาย" detail="จุลินทรีย์ เห็ด รา" />
          </div>
        </div>

        {/* สรุปสาระสำคัญ (หลักสูตร ป.5) */}
        <div className="bg-white border-4 border-black rounded-xl p-4 shadow">
          <h3 className="font-bold mb-2">📚 สรุปสาระสำคัญ</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              ห่วงโซ่อาหารแสดงความสัมพันธ์ของสิ่งมีชีวิตในการกินต่อกัน
            </li>
            <li>
              พลังงานเริ่มจาก <b>ผู้ผลิต (พืช)</b> แล้วถ่ายทอดไปยัง <b>ผู้บริโภค</b>
            </li>
            <li>
              <b>ผู้ย่อยสลาย</b> ช่วยย่อยซากสิ่งมีชีวิตและคืนสารอาหารสู่ธรรมชาติ
            </li>
            <li>
              ในระบบนิเวศจริง ๆ จะมีหลายห่วงโซ่อาหารเชื่อมกันเป็น <b>สายใยอาหาร</b>
            </li>
          </ul>
        </div>

        {/* ปุ่มนำทางท้ายบท */}
        <div className="flex justify-between pt-4">
          <button
            onClick={() =>
              navigate("/p5/life/foodchain/check", {
                state: { chains, results },
              })
            }
            className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600"
          >
            ◀ ดูเฉลยอีกครั้ง
          </button>

          <button
            onClick={() => navigate("/p5/life")}
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600"
          >
            กลับสู่เมนู ป.5 ▶
          </button>
        </div>
      </div>
    </LabLayout>
  );
}

/* ===== ส่วนประกอบ UI เล็ก ๆ ===== */
function ConceptBox({ color, title, detail }) {
  return (
    <div className={`${color} border-2 border-black rounded-xl p-4 w-40 shadow`}>
      <p className="font-bold">{title}</p>
      <p className="text-sm">{detail}</p>
    </div>
  );
}

function Arrow() {
  return (
    <div className="text-2xl font-bold">
      →
    </div>
  );
}
