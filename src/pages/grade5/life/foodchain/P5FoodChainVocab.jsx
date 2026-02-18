import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";

export default function P5FoodChainVocab() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const vocabPage1 = [
    { th: "การพรางตัว", ms: "อารอ เฆมาย ดีรี", en: "Camouflage" },
    { th: "พืช", ms: "ตูมเบ(ป้อง ทาย)", en: "Plant" },
    { th: "สัตว์", ms: "บีนาตง", en: "Animal" },
    { th: "กลุ่มของสิ่งมีชีวิต", ms: "กุมปูลัน ฮายัต", en: "Group of Organisms" },
    { th: "แหล่งที่อยู่อาศัย", ms: "ตีงกัต ดูดุ", en: "Habitat" },
  ];

  const vocabPage2 = [
    { th: "โซ่อาหาร", ms: "ราตา บากาเน", en: "Food Chain" },
    { th: "การดำรงชีวิต", ms: "อารอ ฮีดูป", en: "Survival" },
    { th: "การถ่ายทอดพลังงาน", ms: "อารอ ปินะห์ ตือนาโก", en: "Energy Transfer" },
    { th: "ผู้ผลิต", ms: "ออเร ปูงั๊ต", en: "Producer" },
    { th: "ผู้บริโภค", ms: "ออเร ซุนอ / ออเร มากัน", en: "Consumer" },
  ];

  const currentData = page === 1 ? vocabPage1 : vocabPage2;

  return (
    <LabLayout title="คำศัพท์วิทยาศาสตร์น่ารู้">
      <div className="bg-[#f7f3ed] p-6 rounded-xl shadow-lg border-2 border-dashed border-blue-300">
        {/* หัวเรื่อง */}
        <h2 className="text-center text-2xl font-bold text-pink-600 mb-4">
          คำศัพท์วิทยาศาสตร์น่ารู้
        </h2>

        {/* ตารางคำศัพท์ */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="text-white">
                <th className="bg-blue-400 border border-gray-400 p-3">
                  ภาษาไทย
                </th>
                <th className="bg-yellow-400 border border-gray-400 p-3">
                  ภาษามลายู
                </th>
                <th className="bg-pink-400 border border-gray-400 p-3">
                  ภาษาอังกฤษ
                </th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((vocab, idx) => (
                <tr key={idx} className="text-center">
                  <td className="bg-blue-50 border border-gray-400 p-3 font-medium">
                    {vocab.th}
                  </td>
                  <td className="bg-yellow-50 border border-gray-400 p-3 font-medium">
                    {vocab.ms}
                  </td>
                  <td className="bg-pink-50 border border-gray-400 p-3 font-medium">
                    {vocab.en}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ปุ่มเปลี่ยนหน้า */}
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(1)}
            className={`px-5 py-2 rounded-full shadow ${
              page === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            ◀ หน้า 1
          </button>

          <span className="font-semibold">
            หน้า {page} / 2
          </span>

          {page === 1 ? (
            <button
              onClick={() => setPage(2)}
              className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 shadow"
            >
              หน้า 2 ▶
            </button>
          ) : (
            <button
              onClick={() => navigate("/p5/life/foodchain/steps")}
              className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 shadow"
            >
              ต่อไป ▶
            </button>
          )}
        </div>
      </div>

      {/* ปุ่มภาษา + เสียง (สไตล์เดียวกับหน้าอื่น) */}
      <div className="absolute bottom-6 left-6 flex gap-2">
        <button className="bg-blue-200 px-4 py-2 rounded-full">ไทย</button>
        <button className="bg-blue-200 px-4 py-2 rounded-full">อังกฤษ</button>
        <button className="bg-blue-200 px-4 py-2 rounded-full">มลายู</button>
        <button className="bg-blue-400 px-4 py-2 rounded-full">🔊</button>
      </div>
    </LabLayout>
  );
}
