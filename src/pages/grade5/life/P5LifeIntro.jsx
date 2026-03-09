import { useNavigate } from "react-router-dom";
import LabLayout from "../../../components/LabLayout";

const TOPICS = [
  { id: "foodchain", label: "ชีวิตสัมพันธ์", to: "/p5/life/foodchain" },
  { id: "genetics", label: "ลักษณะทางพันธุกรรม", to: "/p5/life/genetics" },
];

export default function P5LifeIntro() {
  const navigate = useNavigate();

  return (
    <LabLayout title="ชั้นประถมศึกษาปีที่ 5" showTeacher={false}>
      <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-green-50 to-green-100">
        <div className="pointer-events-none absolute right-10 top-8 h-24 w-24 rounded-full bg-yellow-300 opacity-90 shadow-lg" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-green-400/70" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
          <div className="mb-8 rounded-full bg-white/85 px-10 py-4 text-3xl font-extrabold text-green-700 shadow-lg">
            ชั้นประถมศึกษาปีที่ 5
          </div>

          <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            {TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => navigate(topic.to)}
                className="rounded-3xl border-4 border-black bg-white px-10 py-10 text-2xl font-bold shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
              >
                “ {topic.label} ”
              </button>
            ))}
          </div>

          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-2xl border-2 border-blue-300 bg-white/80 p-2 shadow-md">
            <button className="rounded-full bg-blue-200 px-4 py-2 font-bold text-cyan-700" type="button">
              ไทย
            </button>
            <button className="rounded-full bg-blue-200 px-4 py-2 font-bold text-cyan-700" type="button">
              อังกฤษ
            </button>
            <button className="rounded-full bg-blue-200 px-4 py-2 font-bold text-cyan-700" type="button">
              มลายู
            </button>
            <button className="rounded-full bg-blue-400 px-4 py-2 text-white" type="button" aria-label="audio">
              🔊
            </button>
          </div>
        </div>
      </div>
    </LabLayout>
  );
}
