import { useNavigate } from "react-router-dom";

const EXPERIMENTS = [
  {
    id: "exp-1",
    title: "การทดลองที่ 1",
    subtitle: "การต่อวงจรไฟฟ้าแบบอนุกรม",
    image: "/images/p6.png",
    path: "/p6/electric-circuit/problem",
  },
  {
    id: "exp-2",
    title: "การทดลองที่ 2",
    subtitle: "การต่อหลอดไฟฟ้าแบบอนุกรมและแบบขนาน",
    image: "/images/p6.png",
    path: "/p6/electric-circuit/bulb-series-parallel",
  },
];

export default function P6ElectricCircuitExperimentSelect() {
  const navigate = useNavigate();
  const backPath = "/p6/electric-circuit/vocab";
  const nextPath = "/p6/electric-circuit/objectives";

  const pageBg = {
    background:
      "radial-gradient(80% 58% at 50% 34%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="relative h-[100svh] overflow-hidden px-4 pb-6 pt-7 text-center text-slate-900 md:px-6 md:pb-8 md:pt-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(120px,11vw,190px)] top-3 h-[clamp(108px,11vw,150px)] w-[clamp(70px,7vw,102px)] bg-[#f7bd2b]"
        style={{
          clipPath:
            "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[170px] bg-[linear-gradient(180deg,rgba(199,227,242,0),rgba(190,217,233,0.72))]"
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-col">
        <h1 className="m-0 text-4xl font-extrabold text-blue-600 md:text-[72px]">วงจรไฟฟ้าใกล้ตัว</h1>
        <p className="mt-2 text-lg text-slate-700 md:text-[45px]">เลือกการทดลอง</p>

        <section className="mx-auto mt-2 flex w-full flex-1 items-center justify-center">
          <div className="grid w-full max-w-[1120px] grid-cols-1 justify-items-center gap-8 lg:translate-x-4 lg:grid-cols-2 xl:translate-x-5">
            {EXPERIMENTS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.path)}
                className="group flex h-[430px] w-[520px] max-w-[92vw] flex-col overflow-hidden rounded-[30px] bg-white/95 text-left shadow-[0_14px_30px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.2)]"
              >
                <div className="flex h-[260px] items-center justify-center overflow-hidden bg-slate-200 px-3 py-2">
                  <img
                    src={item.image}
                    alt={item.subtitle}
                    className="h-full max-w-full object-contain object-center transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 px-5 pb-5 pt-4 text-center">
                  <div className="text-[clamp(18px,1.8vw,30px)] font-extrabold leading-[1.12] text-slate-900">
                    {item.title}
                  </div>
                  <div className="mt-2 text-sm text-slate-700 md:text-base">{item.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-6 md:right-6">
        <button
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-slate-700 shadow-[0_12px_26px_rgba(23,34,49,0.2)] transition hover:-translate-y-0.5"
          type="button"
          onClick={() => navigate(backPath)}
          aria-label="กลับหน้าคำศัพท์"
          title="กลับหน้าคำศัพท์"
        >
          ←
        </button>
        <button
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-2xl text-white shadow-[0_12px_26px_rgba(23,34,49,0.2)] transition hover:-translate-y-0.5"
          type="button"
          onClick={() => navigate(nextPath)}
          aria-label="ไปหน้าถัดไป"
          title="ไปหน้าถัดไป"
        >
          →
        </button>
      </div>
    </div>
  );
}
