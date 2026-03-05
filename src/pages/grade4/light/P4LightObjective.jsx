import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeakButton from "../../../components/SpeakButton";

const CONTENT = {
  th: {
    gradeLabel: "ชั้นประถมศึกษาปีที่ 4",
    title: "ตัวกลางของแสง",
    sectionTitle: "จุดประสงค์การเรียนรู้",
    objectives: [
      "สังเกตการมองเห็นแสงผ่านวัตถุต่าง ๆ ได้",
      "จำแนกวัตถุที่นำมากั้นแสงได้เป็นวัตถุโปร่งใส วัตถุโปร่งแสง และวัตถุทึบแสง",
    ],
    back: "← ย้อนกลับ",
    next: "ไปต่อ →",
    speakPrefix: "จุดประสงค์การเรียนรู้",
    speakDivider: "ข้อที่",
  },
  en: {
    gradeLabel: "Grade 4",
    title: "Medium of Light",
    sectionTitle: "Learning Objectives",
    objectives: [
      "Observe how light can be seen through different objects.",
      "Classify objects into transparent, translucent, and opaque types.",
    ],
    back: "← Back",
    next: "Next →",
    speakPrefix: "Learning objectives",
    speakDivider: "Objective",
  },
  ms: {
    gradeLabel: "Tahun 4",
    title: "Medium Cahaya",
    sectionTitle: "Objektif Pembelajaran",
    objectives: [
      "Memerhati bagaimana cahaya dapat dilihat melalui pelbagai objek.",
      "Mengelaskan objek kepada lutsinar, separa lut sinar, dan legap.",
    ],
    back: "← Kembali",
    next: "Seterusnya →",
    speakPrefix: "Objektif pembelajaran",
    speakDivider: "Objektif",
  },
};

function buildObjectiveSpeakText(content) {
  return content.objectives
    .slice(0, 2)
    .map((objective, index) => `${content.speakDivider} ${index + 1} ${objective}`)
    .reduce((acc, part) => `${acc} ${part}`, content.speakPrefix)
    .trim();
}

export default function P4LightObjective() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const content = CONTENT[language] ?? CONTENT.th;

  const speakTextByLang = useMemo(
    () => ({
      th: buildObjectiveSpeakText(CONTENT.th),
      en: buildObjectiveSpeakText(CONTENT.en),
      ms: buildObjectiveSpeakText(CONTENT.ms),
    }),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4 sm:p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-2xl border border-blue-200 bg-white/85 p-6 text-center shadow-lg backdrop-blur-md sm:p-8">
          <div className="mb-4 inline-block rounded-full border-2 border-blue-300 bg-blue-100 px-6 py-2 text-base font-bold text-blue-800 sm:text-lg">
            {content.gradeLabel}
          </div>

          <h1 className="mb-4 text-3xl font-extrabold text-blue-700 sm:text-5xl">{content.title}</h1>

          <div className="inline-block rounded-xl border-2 border-cyan-300 bg-cyan-100 px-5 py-2 text-lg font-bold text-cyan-800 sm:px-6 sm:text-xl">
            {content.sectionTitle}
          </div>
        </div>

        <div className="mb-10 space-y-4 sm:space-y-6">
          {content.objectives.map((objective, index) => (
            <div
              key={objective}
              className="flex items-start gap-4 rounded-2xl border-2 border-blue-300 bg-white p-5 shadow-xl sm:gap-6 sm:p-8"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-lg font-bold text-white sm:h-12 sm:w-12 sm:text-xl">
                {index + 1}
              </div>
              <p className="text-lg font-semibold leading-relaxed text-slate-700 sm:text-2xl">{objective}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SpeakButton
            th={speakTextByLang.th}
            en={speakTextByLang.en}
            ms={speakTextByLang.ms}
            activeLang={language}
            onLanguageChange={setLanguage}
          />

          <div className="ml-auto flex w-full flex-wrap justify-end gap-3 sm:w-auto">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-full border border-blue-300 bg-white px-6 py-3 text-base font-bold text-blue-700 transition hover:bg-blue-50 hover:shadow-lg sm:px-7 sm:py-4 sm:text-lg"
            >
              {content.back}
            </button>

            <button
              type="button"
              onClick={() => navigate("/p4/light/vocab")}
              className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-7 py-3 text-lg font-bold text-white transition hover:shadow-xl sm:px-8 sm:py-4 sm:text-xl"
            >
              {content.next}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
