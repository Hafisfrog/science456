import { useLocation } from "react-router-dom";

function LabLayout({ title, children, onNext, showTeacher = true, showHeader = true }) {
  const location = useLocation();
  const shouldShowHeader = showHeader && !location.pathname.startsWith("/p5");

  return (
    <div className="relative w-screen h-screen bg-gradient-to-b from-sky-300 to-sky-100 flex flex-col overflow-hidden">

      {/* HEADER */}
      {shouldShowHeader && (
        <div className="bg-white px-10 py-3 text-xl font-bold text-center shadow shrink-0 z-10">
          {title}
        </div>
      )}

      {/* CONTENT */}
      <div className="relative flex-1 overflow-hidden">

        {/* main */}
        <div className="w-full h-full overflow-hidden">
          {children}
        </div>

        {/* teacher */}
        {showTeacher && (
          <img
            src="/images/p4/exp3/teacher.png"
            alt="teacher"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            className="
              absolute
              left-0
              bottom-0
              w-[160px]
              object-contain
              pointer-events-none
              z-20
            "
          />
        )}

        {/* next */}
        {onNext && (
          <div className="absolute right-6 bottom-6 z-20">
            <button
              onClick={onNext}
              className="bg-red-500 text-white px-6 py-3 rounded-full text-lg hover:bg-red-600 shadow-lg"
            >
              ต่อไป ▶
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default LabLayout;
