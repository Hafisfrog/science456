import { useState } from "react"

function ExperimentForce() {
  const [move, setMove] = useState(false)

  return (
    <div className="mt-6 bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">
        การทดลอง: แรงทำให้วัตถุเคลื่อนที่
      </h3>

      {/* พื้นทดลอง */}
      <div className="relative h-24 bg-gray-100 rounded overflow-hidden mb-4">
        <div
          className={`absolute top-7 w-10 h-10 rounded-full bg-blue-500
            transition-all duration-700 ease-in-out
            ${move ? "left-64" : "left-4"}
          `}
        />
      </div>

      <button
        onClick={() => setMove(!move)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ใช้แรง
      </button>
    </div>
  )
}

export default ExperimentForce
