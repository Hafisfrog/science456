import { useState } from "react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import LessonContent from "./components/LessonContent"
import lessons from "./data/lessons"

function App() {
  const [currentLesson, setCurrentLesson] = useState(0)

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
        <Sidebar
          lessons={lessons}
          currentLesson={currentLesson}
          onSelect={setCurrentLesson}
        />

        <div className="md:col-span-3">
          <LessonContent lesson={lessons[currentLesson]} />
        </div>
      </div>
    </div>
  )
}

export default App
