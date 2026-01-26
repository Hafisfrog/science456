function Sidebar({ lessons, currentLesson, onSelect }) {
  return (
    <aside className="bg-white rounded-xl shadow p-4">
      <h2 className="font-semibold text-lg mb-4">บทเรียนhhhhhhh</h2>

      <ul className="space-y-2">
        {lessons.map((lesson, index) => (
          <li
            key={lesson.id}
            onClick={() => onSelect(index)}
            className={`p-3 rounded-lg cursor-pointer transition
              ${
                index === currentLesson
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-gray-100"
              }
            `}
          >
            {lesson.title}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
