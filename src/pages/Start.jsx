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
      <img
        src="/images/background-start.jpg"
        alt="Laboratory background"
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.9]"
      />
      <div className="pointer-events-none absolute -right-28 -top-36 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.75),rgba(255,202,153,0.35))] opacity-80" />
      <div className="pointer-events-none absolute -bottom-36 -left-40 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.75),rgba(141,210,255,0.35))] opacity-90" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1360px] items-center gap-7 px-5 py-8 sm:px-8 md:grid-cols-[minmax(300px,0.9fr)_minmax(0,1fr)] md:gap-10 lg:px-12">
        <div className="flex min-w-0 items-end justify-center md:justify-end">
          <img
            src="/images/start-labb.png"
            alt="Virtual Science Lab"
            className="h-auto w-[min(430px,76vw)] drop-shadow-[0_22px_35px_rgba(23,60,110,0.22)] md:w-[min(470px,100%)]"
          />
        </div>

        <div className="mx-auto w-full min-w-0 max-w-[720px] overflow-hidden rounded-[34px] border border-white/80 bg-white/85 px-6 py-7 text-center shadow-[0_24px_60px_rgba(23,60,110,0.16)] backdrop-blur-sm sm:rounded-[42px] sm:px-9 sm:py-10 md:mx-0 md:text-left lg:px-12">
          <h1 className="mb-4 max-w-full text-balance break-words text-[clamp(2.1rem,5vw,4.25rem)] font-extrabold leading-[1.04] tracking-normal text-[#2c70c9]">
            Virtual Lab Combined with Multilingual Innovation
          </h1>
          <p className="mx-auto mb-7 max-w-[36rem] text-lg font-semibold leading-relaxed text-slate-600 sm:text-2xl md:mx-0">
            นวัตกรรมปฏิบัติการทางวิทยาศาสตร์เสมือนจริงร่วมกับพหุภาษา
          </p>

          <button
            className="inline-flex min-w-[150px] justify-center rounded-full bg-gradient-to-br from-[#ff6b4a] to-[#ff8b5b] px-12 py-4 text-2xl font-bold text-white shadow-[0_14px_30px_rgba(255,107,74,0.35)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(255,107,74,0.45)] active:translate-y-[2px] active:shadow-[0_10px_24px_rgba(255,107,74,0.35)]"
            onClick={() => navigate("/grades")}
            type="button"
          >
            เริ่ม
          </button>
        </div>
      </div>
    </div>
  );
}
