import { useNavigate, useParams } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import LabLayout from "../../../../components/LabLayout";

const topicMap = {
  animals: "ลักษณะทางพันธุกรรมของสัตว์",
  plants: "ลักษณะทางพันธุกรรมของพืช",
  humans: "ลักษณะทางพันธุกรรมของคน",
};

export default function P5GeneticsTopicPlaceholder() {
  const navigate = useNavigate();
  const { topic } = useParams();
  const title = topicMap[topic] || "บทเรียนพันธุกรรม";

  return (
    <LabLayout title="ชั้นประถมศึกษาปีที่ 5">
      <HomeButton />

      <div className="flex h-full items-center justify-center bg-gradient-to-b from-[#f3f7ff] to-[#e5eefb] px-4">
        <div className="w-full max-w-2xl rounded-3xl border-4 border-black bg-white p-8 text-center shadow-[10px_12px_0_#9eb7e6]">
          <h1 className="text-4xl font-black">{title}</h1>
          <p className="mt-4 text-xl font-semibold text-slate-700">
            หน้านี้กำลังจัดทำเนื้อหา
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => navigate("/p5/life/genetics")}
              className="rounded-full bg-slate-200 px-5 py-2 text-lg font-bold hover:bg-slate-300"
            >
              กลับหน้ารายการทดลอง
            </button>
            <button
              onClick={() => navigate("/p5/life")}
              className="rounded-full bg-blue-500 px-5 py-2 text-lg font-bold text-white hover:bg-blue-600"
            >
              กลับหน้า ป.5
            </button>
          </div>
        </div>
      </div>
    </LabLayout>
  );
}
