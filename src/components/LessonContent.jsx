import Quiz from "./Quiz"
import Translator from "./Translator"

function LessonContent({ lesson }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">
        {lesson.title}
      </h2>

      <p className="text-gray-700 mb-4">
        {lesson.content}
      </p>

      {/* 🔤 แปล + 🔊 พูด */}
      <Translator text={lesson.content} />

      <Quiz quiz={lesson.quiz} />
    </div>
  )
}

export default LessonContent
