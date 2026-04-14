import { useNavigate } from "react-router-dom";
import { LightNavButtons } from "./LightControls";

const VOCAB = [
  {
    th: "แสง",
    ms: "Cahaya",
    en: "Light",
  },
  {
    th: "แหล่งกำเนิดแสง",
    ms: "Sumber Cahaya",
    en: "Light Source",
  },
  {
    th: "เคลื่อนที่ผ่านอากาศ",
    ms: "Bergerak Melalui Udara",
    en: "Move Through Air",
  },
  {
    th: "กั้น",
    ms: "Menghalang",
    en: "Block",
  },
];

export default function P4LightIntroLearning() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#eef7f6] via-[#e7f2f3] to-[#dcecff] px-4 py-8 pb-28 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-slate-700 sm:text-4xl">
            คำศัพท์วิทยาศาสตร์น่ารู้
          </h1>
          <p className="mt-2 text-base text-slate-600 sm:text-lg">คำศัพท์พื้นฐานเกี่ยวกับแสง</p>
        </header>

        <div className="overflow-hidden rounded-[2rem] border border-[#c7d7d1] bg-[#dfeee8]/80 shadow-lg backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed border-separate border-spacing-0">
              <thead>
                <tr className="bg-[#bfcfc6] text-slate-900">
                  <th className="px-4 py-4 text-center text-lg font-extrabold sm:text-2xl">ภาษาไทย</th>
                  <th className="px-4 py-4 text-center text-lg font-extrabold sm:text-2xl">ภาษามลายู</th>
                  <th className="px-4 py-4 text-center text-lg font-extrabold sm:text-2xl">ภาษาอังกฤษ</th>
                </tr>
              </thead>

              <tbody>
                {VOCAB.map((row) => (
                  <tr
                    key={`${row.th}-${row.en}`}
                    className="[&:not(:last-child)>td]:border-b [&:not(:last-child)>td]:border-[#d5e1dc]"
                  >
                    <td className="bg-[#c8d1de] px-4 py-5 text-base font-semibold text-slate-800 sm:py-6 sm:text-xl">
                      {row.th}
                    </td>
                    <td className="bg-[#e8dfc3] px-4 py-5 text-base font-semibold text-slate-800 sm:py-6 sm:text-xl">
                      {row.ms}
                    </td>
                    <td className="bg-[#dec4d7] px-4 py-5 text-base font-semibold text-slate-800 sm:py-6 sm:text-xl">
                      {row.en}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="fixed bottom-[18px] right-[18px] z-30">
          <LightNavButtons
            backLabel="ย้อนกลับ"
            nextLabel="ไปต่อ"
            onBack={() => navigate("/p4/light")}
            onNext={() => navigate("/p4/light/select")}
          />
        </div>
      </div>
    </div>
  );
}
