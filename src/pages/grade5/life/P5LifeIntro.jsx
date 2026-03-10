import { useNavigate } from "react-router-dom";

const TOPICS = [
  {
    id: "foodchain",
    title: "ชีวิตสัมพันธ์",
    subtitle: "Food Chain",
    description: "เรียนรู้ความสัมพันธ์ของสิ่งมีชีวิตในระบบนิเวศ ผ่านห่วงโซ่อาหารและบทบาทของผู้ผลิต ผู้บริโภค และผู้ย่อยสลาย",
    badge: "บทเรียนพร้อมใช้งาน",
    accent: "from-emerald-500 via-green-500 to-lime-400",
    glow: "shadow-emerald-300/50",
    to: "/p5/life/foodchain",
  },
  {
    id: "genetics",
    title: "ลักษณะทางพันธุกรรม",
    subtitle: "Genetics",
    description: "สำรวจลักษณะที่ถ่ายทอดจากพ่อแม่สู่ลูก ทั้งในคน สัตว์ และพืช พร้อมเลือกหัวข้อย่อยที่ต้องการศึกษา",
    badge: "เลือกหัวข้อย่อยได้",
    accent: "from-fuchsia-500 via-pink-500 to-rose-400",
    glow: "shadow-pink-300/50",
    to: "/p5/life/genetics",
  },
];

export default function P5LifeIntro() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_#dcfce7,_#bbf7d0_35%,_#86efac_60%,_#4ade80_100%)] px-6 py-8 text-slate-900 md:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-12 h-48 w-48 rounded-full bg-white/30 blur-3xl" />
        <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-yellow-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
        <div className="mb-10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/grades")}
            className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
          >
            ย้อนกลับ
          </button>

          <div className="rounded-full border border-emerald-200/80 bg-white/70 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
            วิทยาศาสตร์ ป.5
          </div>
        </div>

        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-800/80">
            Grade 5 Life Science
          </p>
          <h1 className="mb-4 text-4xl font-black leading-tight md:text-6xl">
            เลือกบทเรียน
            <span className="block text-emerald-800">ชีวิตและการถ่ายทอดลักษณะ</span>
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-700 md:text-lg">
            หน้านี้รวมบทเรียนหลักของหน่วยชีวิตสัมพันธ์และพันธุกรรม กดเลือกหัวข้อเพื่อเข้าสู่กิจกรรมและสื่อการเรียนรู้ของแต่ละบท
          </p>
        </div>

        <div className="grid flex-1 gap-6 pb-6 lg:grid-cols-2">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              type="button"
              onClick={() => navigate(topic.to)}
              className={`group relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 p-7 text-left shadow-2xl backdrop-blur transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${topic.glow}`}
            >
              <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${topic.accent}`} />
              <div className="absolute right-6 top-6 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white/90">
                {topic.badge}
              </div>

              <div className="mt-10">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {topic.subtitle}
                </p>
                <h2 className="mb-4 text-3xl font-black text-slate-900">{topic.title}</h2>
                <p className="min-h-24 text-sm leading-7 text-slate-600 md:text-base">
                  {topic.description}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className={`rounded-full bg-gradient-to-r px-4 py-2 text-sm font-bold text-white ${topic.accent}`}>
                  เข้าเรียน
                </div>
                <span className="text-2xl text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-700">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
