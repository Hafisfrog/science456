import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LabLayout from "../../../components/LabLayout";

export default function P4LightRecord() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const material = state?.material;
  const observedResult = state?.result;

  const [selected, setSelected] = useState(null);

  // ตรวจว่ามีข้อมูลไหม ถ้าไม่มีให้กลับไปหน้าเลือกวัตถุ
  useEffect(() => {
    if (!material || !observedResult) {
      navigate("/p4/light/select");
    }
  }, [material, observedResult, navigate]);

  // ✅ === ตั้งค่าติ๊กอัตโนมัติจากผลการทดลอง ===
  useEffect(() => {
    if (observedResult) {
      if (observedResult === "เห็นชัดเจน") {
        setSelected("เห็นชัด");
      } else if (observedResult === "เห็นไม่ชัด") {
        setSelected("เห็นไม่ชัด");
      } else {
        setSelected("มองไม่เห็น");
      }
    }
  }, [observedResult]);

  const handleNext = () => {
    if (!selected) {
      alert("ไม่พบผลการทดลอง");
      return;
    }

    navigate("/p4/light/check", {
      state: {
        material,
        observedResult,
        studentAnswer: selected,
      },
    });
  };

  return (
    <LabLayout
      title="บันทึกผลการทดลอง"
      onNext={handleNext}
    >
      <div className="space-y-6">
        {/* คำอธิบาย */}
        <div className="bg-white border-4 border-black rounded-xl p-4 shadow">
          <p className="font-semibold">
            📊 บันทึกผลการทดลอง (บันทึกอัตโนมัติจากการสังเกต)
          </p>
          <p className="text-gray-700 mt-1">
            วัตถุที่ทดลอง: <b>{material?.name}</b>
          </p>
          <p className="text-gray-700 mt-1">
            ผลที่สังเกตได้:{" "}
            <span className="font-semibold text-blue-700">
              {observedResult}
            </span>
          </p>
        </div>

        {/* ตารางบันทึกผล */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white border-4 border-black">
            <thead>
              <tr className="bg-green-200">
                <th className="border-2 border-black p-3">วัตถุ</th>
                <th className="border-2 border-black p-3">ผ่านได้ดี</th>
                <th className="border-2 border-black p-3">ผ่านได้บ้าง</th>
                <th className="border-2 border-black p-3">ผ่านไม่ได้</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="border-2 border-black p-3 font-medium">
                  {material?.name}
                </td>

                <ResultCell active={selected === "เห็นชัด"} />
                <ResultCell active={selected === "เห็นไม่ชัด"} />
                <ResultCell active={selected === "มองไม่เห็น"} />
              </tr>
            </tbody>
          </table>
        </div>

        {/* ปุ่มนำทาง */}
        <div className="flex justify-between pt-4">
          <button
            onClick={() =>
              navigate("/p4/light/experiment", {
                state: { material },
              })
            }
            className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600"
          >
            ◀ กลับไปทดลองอีกครั้ง
          </button>

          <button
            onClick={handleNext}
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600"
          >
            ตรวจคำตอบ ▶
          </button>
        </div>
      </div>
    </LabLayout>
  );
}

/* ----------------------------- */
/* ช่องติ๊กผล (Read-Only) */
/* ----------------------------- */
function ResultCell({ active }) {
  return (
    <td
      className={`
        border-2 border-black p-3 text-center transition-all
        ${active ? "bg-green-100 text-green-700 font-bold" : ""}
      `}
    >
      {active ? "✔" : ""}
    </td>
  );
}
