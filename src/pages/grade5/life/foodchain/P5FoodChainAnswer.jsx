import { useNavigate, useLocation } from "react-router-dom";

export default function P5FoodChainAnswer() {
  const navigate = useNavigate();
  const location = useLocation();
  const studentChains = location.state?.chains || [];

  /* ========= Answers ========= */
  const answers = [
    ["ต้นข้าว", "ตั๊กแตน", "กบ", "งู"],
    ["ต้นข้าว", "หนูนา", "งู", "เหยี่ยว"],
    ["หญ้า", "หนอน", "นก", "งู"],
    ["ต้นข้าว", "หนูนา", "นก", "เหยี่ยว"],
    ["พืชน้ำ", "ลูกน้ำ", "ปลา", "นก"]
  ];

  /* ========= Animals ========= */
  const animals = {
    "ต้นข้าว": "/images/p5/kaw.png",
    "หญ้า": "/images/p5/ya.png",
    "พืชน้ำ": "/images/p5/lunamm.png",
    "ตั๊กแตน": "/images/p5/tag.png",
    "หนูนา": "/images/p5/n.png",
    "หนอน": "/images/p5/non.png",
    "ลูกน้ำ": "/images/p5/lunam.png",
    "ปลา": "/images/p5/pla.png",
    "กบ": "/images/p5/gop.png",
    "นก": "/images/p5/nog.png",
    "งู": "/images/p5/snack.png",
    "เหยี่ยว": "/images/p5/y.png"
  };

  /* ========= Score ========= */
  let score = 0;
  answers.forEach((a, i) => {
    if (JSON.stringify(a) === JSON.stringify(studentChains[i])) score++;
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-100 to-green-200 relative font-sans">
      
      {/* Decorative Sun */}
      <div className="absolute top-8 right-16 w-20 h-20 bg-yellow-300 rounded-full 
        shadow-lg border-4 border-yellow-400">
        <div className="absolute inset-0 flex items-center justify-center text-3xl">
          ☀️
        </div>
      </div>

      {/* Title */}
      <div className="text-center pt-10 relative z-10">
        <div className="bg-green-400 inline-block px-12 py-4 text-3xl font-bold rounded-3xl 
          shadow-xl border-4 border-green-500 text-white">
          🌟 เฉลย 🌟
        </div>
      </div>

      {/* Score */}
      <div className="text-center mt-6 relative z-10">
        <div className="bg-white inline-block px-8 py-3 rounded-2xl shadow-lg 
          border-2 border-green-300">
          <span className="text-2xl font-bold text-green-700">
            คะแนน {score} / 5
          </span>
        </div>
      </div>

      {/* Chains */}
      <div className="mt-10 space-y-10 flex flex-col items-center pb-24 relative z-10">
        {answers.map((ans, i) => {
          const correct = JSON.stringify(ans) === JSON.stringify(studentChains[i]);

          return (
            <div key={i} className="bg-white p-6 rounded-3xl shadow-xl w-3/4 
              border-4 border-green-200">
              
              {/* Chain Title */}
              <div className="flex items-center mb-4">
                <div className="text-xl font-bold text-green-800">
                  ห่วงโซ่ที่ {i + 1}
                </div>
                <div className="ml-4 text-2xl">
                  {correct ? (
                    <span className="text-green-600">✅ ถูกต้อง</span>
                  ) : (
                    <span className="text-red-600">❌ ผิด</span>
                  )}
                </div>
              </div>

              {/* Student Answer */}
              <div className="mb-3">
                <div className="text-sm text-gray-500 mb-2">🧑‍🎓 คำตอบของเรา:</div>
                <div className="flex gap-4 bg-green-50 p-4 rounded-xl">
                  {studentChains[i]?.map((x, j) => (
                    <div key={j} className="text-center">
                      <img
                        src={animals[x]}
                        className="w-20 h-20 object-contain border-2 border-green-300 
                          rounded-xl p-2 bg-white"
                        alt={x}
                      />
                      <div className="text-xs mt-1">{x}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Correct Answer */}
              <div>
                <div className="text-sm text-gray-500 mb-2">📚 เฉลยที่ถูกต้อง:</div>
                <div className="flex gap-4 opacity-70 bg-yellow-50 p-4 rounded-xl">
                  {ans.map((x, j) => (
                    <div key={j} className="text-center">
                      <img
                        src={animals[x]}
                        className="w-20 h-20 object-contain border-2 border-yellow-300 
                          rounded-xl p-2 bg-white"
                        alt={x}
                      />
                      <div className="text-xs mt-1">{x}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow Indicators */}
              <div className="flex justify-center gap-4 mt-2 text-2xl text-green-500">
                <span>➡️</span>
                <span>➡️</span>
                <span>➡️</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-10 right-10 flex gap-4 z-20">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-full 
            font-bold text-xl shadow-xl transition-all duration-200 hover:scale-105 
            border-4 border-gray-300"
        >
          ◀ ย้อนกลับ
        </button>

        <button
          onClick={() => navigate("/p5/life/foodchain/summary")}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full 
            font-bold text-xl shadow-xl transition-all duration-200 hover:scale-105 
            border-4 border-green-300"
        >
          ไปต่อ ▶
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="fixed bottom-10 left-10 text-7xl opacity-20">🌿</div>
      <div className="fixed top-40 left-20 text-7xl opacity-20">🐛</div>
    </div>
  );
}
