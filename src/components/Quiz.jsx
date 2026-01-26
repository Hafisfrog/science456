import { useState } from "react"

function Quiz({ quiz }) {
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)

  const checkAnswer = () => {
    if (selected === quiz.answer) {
      setResult("correct")
    } else {
      setResult("wrong")
    }
  }

  return (
    <div className="bg-slate-50 p-5 rounded-xl border">
      <h3 className="font-semibold text-lg mb-3">แบบทดสอบ</h3>
      <p className="mb-4">{quiz.question}</p>

      <div className="space-y-3">
        {quiz.options.map((option, index) => (
          <label
            key={index}
            className={`block p-3 rounded-lg border cursor-pointer
              ${
                selected === index
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-gray-100"
              }
            `}
          >
            <input
              type="radio"
              className="hidden"
              checked={selected === index}
              onChange={() => setSelected(index)}
            />
            {option}
          </label>
        ))}
      </div>

      <button
        onClick={checkAnswer}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ตรวจคำตอบ
      </button>

      {result === "correct" && (
        <p className="mt-3 text-green-600 font-medium">✅ ถูกต้อง!</p>
      )}

      {result === "wrong" && (
        <p className="mt-3 text-red-600 font-medium">❌ ยังไม่ถูก</p>
      )}
    </div>
  )
}

export default Quiz
