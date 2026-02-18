import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";

export default function P4Light() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-100">
      {/* Header บนสุด */}
      <Header />

      {/* เนื้อหา */}
      <div className="max-w-5xl mx-auto mt-10 bg-white border-4 border-black rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          🌈 บทเรียน ป.4 เรื่อง ตัวกลางของแสง
        </h1>

        <p className="text-center text-gray-700 mb-8">
          นักเรียนจะได้สวมบทบาทเป็น <b>นักสืบวิทยาศาสตร์</b>  
          เพื่อทดลองและค้นหาว่า วัสดุชนิดใดให้แสงผ่านได้อย่างไร
        </p>

        {/* ปุ่มเมนู STEP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MenuButton
            title="STEP 1 : สถานการณ์ปัญหา"
            desc="ทำความเข้าใจปัญหาและขั้นตอนการทดลอง"
            onClick={() => navigate("/p4/light/intro")}
          />

          <MenuButton
            title="STEP 2 : คำศัพท์น่ารู้"
            desc="เรียนรู้คำศัพท์ 3 ภาษา (ไทย–อังกฤษ–มลายู)"
            onClick={() => navigate("/p4/light/vocab")}
          />

          <MenuButton
            title="STEP 3 : เลือกวัตถุทดลอง"
            desc="เลือกวัสดุที่ต้องการนำมาทดลอง"
            onClick={() => navigate("/p4/light/select")}
          />

          <MenuButton
            title="STEP 4 : ทดลองส่องแสง"
            desc="สังเกตผลว่าแสงผ่านวัตถุได้หรือไม่"
            onClick={() => navigate("/p4/light/experiment")}
          />

          <MenuButton
            title="STEP 5 : บันทึกผลการทดลอง"
            desc="บันทึกผลลงในตารางการทดลอง"
            onClick={() => navigate("/p4/light/record")}
          />

          <MenuButton
            title="STEP 6 : ตรวจคำตอบ"
            desc="เปรียบเทียบผลการทดลองกับเฉลย"
            onClick={() => navigate("/p4/light/check")}
          />

          <MenuButton
            title="STEP 7 : สรุปผลการทดลอง"
            desc="สรุปความรู้เรื่องตัวกลางของแสง"
            onClick={() => navigate("/p4/light/summary")}
          />
        </div>

        {/* ปุ่มกลับ */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/p4")}
            className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600"
          >
            ◀ กลับหน้า ป.4
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------- */
/* Component ปุ่มเมนู */
/* -------------------- */
function MenuButton({ title, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left bg-sky-50 border-2 border-sky-400 rounded-xl p-5 hover:bg-sky-100 hover:scale-[1.01] transition shadow"
    >
      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <p className="text-gray-600 text-sm">{desc}</p>
    </button>
  );
}
