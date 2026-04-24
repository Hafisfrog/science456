import { useNavigate } from "react-router-dom";

export default function HomeButton({ className = "" }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={`fixed left-[18px] top-[18px] z-[80] grid h-16 w-16 place-items-center rounded-[14px] border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,.96),rgba(226,242,255,.9))] text-[#202124] shadow-[0_18px_36px_rgba(8,15,35,.25),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-md transition duration-150 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-[linear-gradient(145deg,#ffffff,#dbeafe)] hover:text-gray-900 hover:shadow-[0_24px_44px_rgba(8,15,35,.3),inset_0_1px_0_rgba(255,255,255,.95)] active:translate-y-px active:scale-[.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-sky-300/80 max-[900px]:left-3 max-[900px]:top-3 max-[900px]:h-[54px] max-[900px]:w-[54px] max-[900px]:rounded-xl ${className}`}
      onClick={() => navigate("/grades")}
      aria-label="SelectGrade"
      title="SelectGrade"
    >
      <svg
        aria-hidden="true"
        className="h-11 w-11 drop-shadow-[0_5px_7px_rgba(0,0,0,.22)] max-[900px]:h-[37px] max-[900px]:w-[37px]"
        viewBox="0 0 128 128"
        focusable="false"
      >
        <path
          d="M13 65.5 57.8 28.2c3.7-3.1 8.7-3.1 12.4 0L115 65.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="11"
        />
        <path
          d="M27.5 69.4 58.3 43.8c3.4-2.8 8-2.8 11.4 0l30.8 25.6v34.8c0 6.5-5.3 11.8-11.8 11.8H76.8V88.4c0-4.7-3.8-8.4-8.4-8.4h-8.8c-4.7 0-8.4 3.8-8.4 8.4V116H39.3c-6.5 0-11.8-5.3-11.8-11.8V69.4Z"
          fill="currentColor"
        />
        <path d="M88 33h17v29.5L88 48.4V33Z" fill="currentColor" />
      </svg>
    </button>
  );
}
