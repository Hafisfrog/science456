import { useNavigate } from "react-router-dom";
import LabLayout from "../../../components/LabLayout";

export default function P4LightConceptSummary() {
  const navigate = useNavigate();

  return (
    <LabLayout title="สรุปสาระสำคัญ : ตัวกลางของแสง">
      <div className="h-full flex flex-col space-y-6 animate-fadeIn">
        {/* หัวเรื่องตกแต่ง */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 drop-shadow">
            ตัวกลางของแสง
          </h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto mt-2 rounded-full" />
        </div>

        {/* พื้นที่สรุป 3 ช่อง (เหมือนภาพที่คุณส่ง) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          {/* ================== โปร่งใส ================== */}
          <ConceptCard
            title="ตัวกลางโปร่งใส"
            colorFrom="from-green-50"
            colorTo="to-green-100"
            borderColor="border-green-400"
            description="แสงผ่านได้ดี มองเห็นสิ่งของด้านหลังได้ชัดเจน เพราะวัตถุยอมให้แสงผ่าน"
            images={[
              { src: "/images/glass_clear.png", label: "กระจกใส" },
              { src: "/images/glass_cup.png", label: "แก้วใส" },
              { src: "/images/plastic_clear.png", label: "พลาสติกใส" }
            ]}
            bgScene={
              <div className="absolute inset-0 bg-gradient-to-b from-sky-200 to-green-200 opacity-30" />
            }
          />

          {/* ================== โปร่งแสง ================== */}
          <ConceptCard
            title="ตัวกลางโปร่งแสง"
            colorFrom="from-yellow-50"
            colorTo="to-yellow-100"
            borderColor="border-yellow-400"
            description="แสงผ่านได้บางส่วน มองเห็นสิ่งของด้านหลังได้ไม่ชัด เพราะวัตถุกระจายแสง"
            images={[
              { src: "/images/glass_frost.png", label: "กระจกฝ้า" },
              { src: "/images/wax_paper.png", label: "กระดาษไข" },
              { src: "/images/fog.png", label: "หมอก" }
            ]}
            bgScene={
              <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-yellow-100 opacity-30" />
            }
          />

          {/* ================== ทึบแสง ================== */}
          <ConceptCard
            title="วัตถุทึบแสง"
            colorFrom="from-gray-100"
            colorTo="to-gray-200"
            borderColor="border-gray-500"
            description="แสงผ่านไม่ได้เลย มองไม่เห็นสิ่งของด้านหลัง เพราะวัตถุไม่ยอมให้แสงผ่าน"
            images={[
              { src: "/images/wood.png", label: "แผ่นไม้" },
              { src: "/images/metal.png", label: "เหล็ก" },
              { src: "/images/concrete.png", label: "แผ่นปูน" }
            ]}
            bgScene={
              <div className="absolute inset-0 bg-gradient-to-b from-gray-400 to-gray-600 opacity-20" />
            }
          />
        </div>

        {/* ปุ่มท้ายหน้า */}
        <div className="flex justify-between items-center pt-4">
          <button
            onClick={() => navigate("/p4/light/qa")}
            className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 shadow-md transition"
          >
            ◀ ย้อนกลับ
          </button>

          <button
            onClick={() => navigate("/p4/light")}
            className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 shadow-lg text-lg transition"
          >
            กลับสู่เมนูบทเรียน ▶
          </button>
        </div>
      </div>
    </LabLayout>
  );
}

/* ============================= */
/* การ์ดสรุปแนว “โปสเตอร์” */
/* ============================= */
function ConceptCard({
  title,
  description,
  images,
  colorFrom,
  colorTo,
  borderColor,
  bgScene
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-4 ${borderColor} shadow-xl bg-gradient-to-b ${colorFrom} ${colorTo}`}
    >
      {/* พื้นหลังแนวฉาก */}
      {bgScene}

      <div className="relative z-10 p-5 h-full flex flex-col">
        {/* ชื่อหัวข้อ */}
        <div className="bg-white/80 backdrop-blur-md border-2 border-black rounded-xl px-4 py-2 mb-4 inline-block">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        </div>

        {/* ภาพประกอบ (จัดวางสวย ๆ) */}
        <div className="flex-1 grid grid-cols-3 gap-2 items-center justify-items-center mb-4">
          {images.map((img, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-lg shadow-md flex items-center justify-center p-1">
                <img
                  src={img.src}
                  alt={img.label}
                  className="max-h-16"
                />
              </div>
              <p className="text-sm font-semibold mt-1">{img.label}</p>
            </div>
          ))}
        </div>

        {/* คำอธิบายสรุป */}
        <div className="bg-white/90 backdrop-blur-md border-2 border-black rounded-xl p-3 text-sm text-gray-800 leading-relaxed shadow">
          {description}
        </div>
      </div>
    </div>
  );
}
