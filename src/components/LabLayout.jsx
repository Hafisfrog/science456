function LabLayout({ title, children, onNext }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-100 flex flex-col items-center">

      {/* HEADER */}
      <div className="bg-white border-4 border-black mt-4 px-14 py-2 text-xl font-bold">
        {title}
      </div>

      {/* CONTENT — กว้างขึ้น แต่ไม่ยืดสูง */}
      <div className="w-[97%] max-w-[1850px] flex gap-4 mt-4">

        {/* ซ้าย */}
        <div className="w-[140px] flex-shrink-0">
          <img src="/teacher.png" alt="teacher" className="w-full" />
        </div>

        {/* กลาง — กว้างสุด */}
        <div className="flex-1 bg-white border-4 border-black p-5">
          {children}
        </div>

        {/* ขวา */}
        <div className="w-[170px] flex items-end justify-center flex-shrink-0">
          {onNext && (
            <button
              onClick={onNext}
              className="bg-red-500 text-white px-6 py-3 rounded-full text-lg hover:bg-red-600 transition"
            >
              ต่อไป ▶
            </button>
          )}
        </div>

      </div>

    </div>
  );
}

export default LabLayout;
