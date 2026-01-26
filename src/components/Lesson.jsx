function Lesson({ lesson }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
      <h2 className="text-2xl font-semibold mb-3 text-gray-800">
        {lesson.title}
      </h2>
      <p className="text-gray-600 leading-relaxed">
        {lesson.content}
      </p>
    </div>
  )
}

export default Lesson
