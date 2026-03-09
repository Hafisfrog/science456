import { useNavigate } from "react-router-dom";

const LESSONS = [
  {
    id: "force",
    title: "แรงไฟฟ้าน่ารู้",
    image: "/images/p6.png",
    to: "/p6/electric-force",
  },
  {
    id: "circuit",
    title: "วงจรไฟฟ้าใกล้ตัว",
    image: "/images/p6.png",
    to: "/p6/electric-circuit",
  },
];

export default function P6() {
  const navigate = useNavigate();

  const pageBg = {
    background:
      "radial-gradient(80% 60% at 50% 34%, #f6efef 0 62%, transparent 63%), radial-gradient(31% 24% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(31% 24% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="relative h-[100svh] overflow-hidden px-4 pb-6 pt-7 text-center md:px-6 md:pt-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div
        className="pointer-events-none absolute right-[clamp(126px,11vw,190px)] top-3 h-[150px] w-[100px] bg-[#f7bd2b]"
        style={{
          clipPath:
            "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
        }}
      />

      <header className="mb-5">
        <h1 className="text-4xl font-extrabold text-blue-600 md:text-[46px]">
          วิทยาศาสตร์ ป.6
        </h1>
        <p className="mt-2 text-lg text-slate-700 md:text-xl">
          เลือกหน่วยการเรียนรู้
        </p>
      </header>

      <section className="mx-auto mt-4 flex w-full flex-1 items-start justify-center">
        <div className="grid w-full max-w-[1320px] grid-cols-1 justify-items-center gap-8 lg:grid-cols-2 lg:gap-10">
          {LESSONS.map((lesson) => (
            <button
              key={lesson.id}
              type="button"
              onClick={() => navigate(lesson.to)}
              className="group flex h-[clamp(460px,56vh,560px)] w-[min(620px,44vw)] max-w-[94vw] flex-col overflow-hidden rounded-[36px] bg-white shadow-[0_14px_30px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.2)]"
            >
              <div className="flex h-[clamp(250px,32vh,320px)] items-center justify-center overflow-hidden bg-slate-200 px-3 py-2">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 items-center justify-center px-5 py-5 text-center">
                <h2 className="text-[clamp(28px,2.4vw,56px)] font-extrabold leading-[1.15] text-slate-900">
                  {lesson.title}
                </h2>
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="fixed bottom-3 right-3 z-20 flex gap-3 md:bottom-6 md:right-6">
        <button
          className="h-14 w-14 rounded-2xl bg-white text-2xl shadow-lg"
          onClick={() => navigate("/grades")}
        >
          ←
        </button>

        <button
          className="h-14 w-14 rounded-2xl bg-blue-600 text-2xl text-white shadow-lg"
          onClick={() => navigate("/p6/electric-force")}
        >
          →
        </button>
      </div>
    </div>
  );
}
