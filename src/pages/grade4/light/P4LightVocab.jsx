import { useNavigate } from "react-router-dom";
import LabLayout from "../../../components/LabLayout";
import Translator from "../../../components/Translator";

const VOCABULARY = [
  {
    th: "ตัวกลางของแสง",
    en: "Light Medium",
    ms: "Medium Cahaya",
    explain:
      "วัตถุหรือสารที่แสงสามารถผ่านเข้าไปได้",
  },
  {
    th: "วัตถุโปร่งใส",
    en: "Transparent Object",
    ms: "Objek Lut Sinar",
    explain:
      "วัตถุที่แสงผ่านได้ดี มองเห็นสิ่งของด้านหลังได้ชัดเจน",
  },
  {
    th: "วัตถุโปร่งแสง",
    en: "Translucent Object",
    ms: "Objek Lut Separa",
    explain:
      "วัตถุที่แสงผ่านได้บางส่วน มองเห็นสิ่งของไม่ชัด",
  },
  {
    th: "วัตถุทึบแสง",
    en: "Opaque Object",
    ms: "Objek Legap",
    explain:
      "วัตถุที่แสงไม่สามารถผ่านได้",
  },
  {
    th: "แหล่งกำเนิดแสง",
    en: "Light Source",
    ms: "Sumber Cahaya",
    explain:
      "สิ่งที่ให้กำเนิดแสง เช่น ดวงอาทิตย์ หลอดไฟ",
  },
];

export default function P4LightVocab() {
  const navigate = useNavigate();

  return (
    <LabLayout
      title="คำศัพท์วิทยาศาสตร์น่ารู้"
      onNext={() => navigate("/p4/light/select")}
    >
      <div className="space-y-6">
        {/* คำอธิบายสั้น */}
        <div className="bg-white border-4 border-black rounded-xl p-4 shadow">
          <p className="font-semibold mb-1">
            📘 คำศัพท์สำคัญเรื่องตัวกลางของแสง
          </p>
          <p className="text-gray-700">
            ให้นักเรียนศึกษาคำศัพท์ พร้อมฟังเสียงและความหมาย
          </p>
        </div>

        {/* ตารางคำศัพท์ */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white border-4 border-black">
            <thead>
              <tr className="bg-pink-200">
                <th className="border-2 border-black p-3">
                  ภาษาไทย
                </th>
                <th className="border-2 border-black p-3">
                  ภาษาอังกฤษ
                </th>
                <th className="border-2 border-black p-3">
                  ภาษามลายู
                </th>
              </tr>
            </thead>
            <tbody>
              {VOCABULARY.map((v, i) => (
                <tr key={i} className="text-center">
                  <td className="border-2 border-black p-3 font-medium">
                    {v.th}
                  </td>
                  <td className="border-2 border-black p-3">
                    {v.en}
                  </td>
                  <td className="border-2 border-black p-3">
                    {v.ms}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* กล่องอธิบาย + ฟังเสียง */}
        <div className="bg-slate-50 border-2 rounded-xl p-4">
          <p className="font-semibold mb-2">
            🔊 ฟังเสียง / แปลเพิ่มเติม
          </p>
          <Translator
            text={VOCABULARY.map((v) => `${v.th} : ${v.explain}`).join(" ")}
          />
        </div>

        {/* ปุ่มนำทาง */}
        <div className="flex justify-between pt-4">
          <button
            onClick={() => navigate("/p4/light/intro")}
            className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600"
          >
            ◀ ย้อนกลับ
          </button>

          <button
            onClick={() => navigate("/p4/light/select")}
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600"
          >
            ต่อไป ▶
          </button>
        </div>
      </div>
    </LabLayout>
  );
}
