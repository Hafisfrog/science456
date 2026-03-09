import { useNavigate } from "react-router-dom";

export default function Start() {
  const navigate = useNavigate();

  const bgStyle = {
    background:
      "radial-gradient(1px 1px at 20px 20px, rgba(44,112,201,0.12) 1px, transparent 1px), radial-gradient(1px 1px at 60px 50px, rgba(44,112,201,0.12) 1px, transparent 1px), radial-gradient(1px 1px at 90px 90px, rgba(255,107,74,0.2) 1px, transparent 1px), repeating-linear-gradient(0deg, transparent 0 24px, rgba(44,112,201,0.08) 24px 25px), repeating-linear-gradient(90deg, transparent 0 24px, rgba(44,112,201,0.08) 24px 25px), radial-gradient(600px 600px at 90% -10%, rgba(255,183,95,0.25), transparent 60%), radial-gradient(520px 520px at -10% 70%, rgba(66,164,255,0.22), transparent 60%), linear-gradient(135deg, #e6f6ff, #f7fbff 45%, #fff1dc)",
    backgroundSize: "120px 120px,120px 120px,120px 120px,48px 48px,48px 48px,auto,auto,auto",
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-900" style={bgStyle}>
      <div className="pointer-events-none absolute -right-28 -top-36 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.75),rgba(255,202,153,0.35))] opacity-80" />
      <div className="pointer-events-none absolute -bottom-36 -left-40 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.75),rgba(141,210,255,0.35))] opacity-90" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] flex-col items-center justify-center gap-8 px-6 py-8 md:flex-row md:gap-12 md:px-10 lg:px-14">
        <div className="flex flex-1 items-center justify-center">
          <img
            src="/images/start-lab.png"
            alt="Virtual Science Lab"
            className="h-auto w-[min(520px,88%)] drop-shadow-[0_22px_35px_rgba(23,60,110,0.2)]"
          />
        </div>

        <div className="w-full max-w-[520px] flex-1 rounded-[32px] border border-white/80 bg-white/80 p-7 text-left shadow-[0_24px_60px_rgba(23,60,110,0.15)] sm:p-10">
          <h1 className="mb-3 text-4xl font-extrabold tracking-[0.5px] text-[#2c70c9] sm:text-5xl">
            Virtual Science Lab
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-slate-600 sm:text-2xl">ผจญภัยในห้องแล็บเสมือนจริง</p>

          <button
            className="inline-flex rounded-full bg-gradient-to-br from-[#ff6b4a] to-[#ff8b5b] px-14 py-4 text-2xl font-bold text-white shadow-[0_14px_30px_rgba(255,107,74,0.35)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(255,107,74,0.45)] active:translate-y-[2px] active:shadow-[0_10px_24px_rgba(255,107,74,0.35)]"
            onClick={() => navigate("/grades")}
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
}
