import { useNavigate } from "react-router-dom";

const GRADE_CARDS = [
  {
    id: "p4",
    label: "ป.4",
    subtitle: "แรงโน้มถ่วงและแสง",
    image: "/images/p4.png",
    to: "/p4",
  },
  {
    id: "p5",
    label: "ป.5",
    subtitle: "ชีวิตสัมพันธ์และพันธุกรรม",
    image: "/images/p5.png",
    to: "/p5/life",
  },
  {
    id: "p6",
    label: "ป.6",
    subtitle: "แรงไฟฟ้าและวงจรไฟฟ้า",
    image: "/images/p6.png",
    to: "/p6",
  },
];

export default function SelectGrade() {
  const navigate = useNavigate();

  const bgStyle = {
    background:
      "radial-gradient(1px 1px at 20px 20px, rgba(44,112,201,0.12) 1px, transparent 1px), radial-gradient(1px 1px at 60px 50px, rgba(44,112,201,0.12) 1px, transparent 1px), radial-gradient(1px 1px at 90px 90px, rgba(255,107,74,0.2) 1px, transparent 1px), repeating-linear-gradient(0deg, transparent 0 24px, rgba(44,112,201,0.08) 24px 25px), repeating-linear-gradient(90deg, transparent 0 24px, rgba(44,112,201,0.08) 24px 25px), radial-gradient(600px 600px at 100% -20%, rgba(255,183,95,0.2), transparent 60%), radial-gradient(520px 520px at -10% 80%, rgba(66,164,255,0.2), transparent 60%), linear-gradient(135deg, #e6f6ff, #f7fbff 45%, #fff1dc)",
    backgroundSize: "120px 120px,120px 120px,120px 120px,48px 48px,48px 48px,auto,auto,auto",
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-5 pb-28 pt-8 text-center text-slate-900 md:px-10 md:pt-10" style={bgStyle}>
      <div className="pointer-events-none absolute -right-36 -top-40 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.75),rgba(255,202,153,0.35))] opacity-70" />
      <div className="pointer-events-none absolute -bottom-36 -left-36 h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.7),rgba(141,210,255,0.3))] opacity-90" />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="mb-8 flex flex-col items-center gap-2 md:mb-10">
          <span className="inline-flex items-center rounded-full bg-[#2c70c9]/12 px-4 py-1.5 text-sm font-bold tracking-[0.4px] text-[#2c70c9] sm:text-base">
            Science Lab
          </span>
          <h1 className="m-0 text-4xl font-extrabold text-[#2c70c9] sm:text-5xl">เลือกชั้นเรียน</h1>
          <p className="m-0 text-base text-slate-600 sm:text-xl">เลือกชั้นเพื่อเริ่มการทดลองวิทยาศาสตร์</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {GRADE_CARDS.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => navigate(card.to)}
              className="overflow-hidden rounded-[26px] border border-white/80 bg-white/85 text-left shadow-[0_18px_36px_rgba(23,60,110,0.14)] transition duration-200 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_rgba(23,60,110,0.2)]"
            >
              <img src={card.image} alt={card.label} className="h-[240px] w-full object-cover bg-[#f1f4f9] md:h-[280px]" />
              <div className="px-5 pb-6 pt-4">
                <div className="text-4xl font-extrabold text-slate-900">{card.label}</div>
                <div className="mt-2 text-base text-slate-700">{card.subtitle}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-3 right-3 z-20 md:bottom-7 md:right-7">
        <button
          type="button"
          className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-blue-900/20 bg-gradient-to-br from-white via-[#e8f4ff] to-[#dcefff] px-5 py-2.5 text-base font-extrabold text-[#133b8a] shadow-[0_10px_22px_rgba(23,60,110,0.25),0_0_0_5px_rgba(255,255,255,0.45)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_15px_28px_rgba(23,60,110,0.3),0_0_0_6px_rgba(255,255,255,0.55)] active:translate-y-px active:shadow-[0_8px_16px_rgba(23,60,110,0.22),0_0_0_4px_rgba(255,255,255,0.4)] md:min-w-[230px] md:px-6 md:py-3 md:text-lg"
          onClick={() => navigate("/")}
        >
          ← กลับหน้าหลัก
        </button>
      </div>
    </div>
  );
}
