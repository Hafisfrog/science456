import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import { FoodChainLanguageSwitcher } from "./FoodChainControls";

const SCORE_PER_ROW = 2;
const getSlotKey = (row, col) => `${row}-${col}`;

const getRowScore = (answer, studentAnswer, rowIndex, lockedSlotSet, hasLockedSlots) => {
  if (!hasLockedSlots) {
    return JSON.stringify(answer) === JSON.stringify(studentAnswer) ? SCORE_PER_ROW : 0;
  }

  return answer.reduce((score, answerName, colIndex) => {
    if (lockedSlotSet.has(getSlotKey(rowIndex, colIndex))) {
      return score;
    }

    return score + (studentAnswer[colIndex] === answerName ? 1 : 0);
  }, 0);
};

const ANSWERS = [
  ["ต้นข้าว", "ตั๊กแตน", "กบ", "งู"],
  ["ต้นข้าว", "หนูนา", "งู", "เหยี่ยว"],
  ["หญ้า", "หนอน", "นก", "งู"],
  ["ต้นข้าว", "หนูนา", "นก", "เหยี่ยว"],
  ["พืชน้ำ", "ลูกน้ำ", "ปลา", "นก"]
];

const ANIMAL_IMAGES = {
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

const ANIMAL_LABELS = {
  "ต้นข้าว": { th: "ต้นข้าว", en: "Rice Plant", ms: "Pokok Padi" },
  "หญ้า": { th: "หญ้า", en: "Grass", ms: "Rumput" },
  "พืชน้ำ": { th: "พืชน้ำ", en: "Water Plant", ms: "Tumbuhan Air" },
  "ตั๊กแตน": { th: "ตั๊กแตน", en: "Grasshopper", ms: "Belalang" },
  "หนูนา": { th: "หนูนา", en: "Field Mouse", ms: "Tikus Sawah" },
  "หนอน": { th: "หนอน", en: "Caterpillar", ms: "Ulat" },
  "ลูกน้ำ": { th: "ลูกน้ำ", en: "Mosquito Larva", ms: "Jentik-jentik" },
  "ปลา": { th: "ปลา", en: "Fish", ms: "Ikan" },
  "กบ": { th: "กบ", en: "Frog", ms: "Katak" },
  "นก": { th: "นก", en: "Bird", ms: "Burung" },
  "งู": { th: "งู", en: "Snake", ms: "Ular" },
  "เหยี่ยว": { th: "เหยี่ยว", en: "Hawk", ms: "Helang" }
};

const UI = {
  th: {
    badge: "หน้าเฉลยกิจกรรมห่วงโซ่อาหาร",
    title: "เฉลย",
    score: "คะแนนรวม",
    chain: "ห่วงโซ่ที่",
    correct: "ถูกต้อง",
    wrong: "ผิด",
    studentAnswer: "คำตอบของเรา",
    correctAnswer: "เฉลยที่ถูกต้อง",
    noAnswer: "ยังไม่มีคำตอบ",
    back: "ย้อนกลับ",
    next: "ต่อไป",
    listen: "ฟังเสียง",
    studentAnswerSpeech: "คำตอบของเรา",
    correctAnswerSpeech: "เฉลยที่ถูกต้อง",
  },
  en: {
    badge: "Food Chain Answer Page",
    title: "Answers",
    score: "Total Score",
    chain: "Chain",
    correct: "Correct",
    wrong: "Incorrect",
    studentAnswer: "answer",
    correctAnswer: "Correct Answer",
    noAnswer: "No answer yet",
    back: "Back",
    next: "Next",
    listen: "Listen",
    studentAnswerSpeech: "Our answer",
    correctAnswerSpeech: "Correct answer",
  },
  ms: {
    badge: "Halaman Jawapan Rantai Makanan",
    title: "Jawapan",
    score: "Jumlah Markah",
    chain: "Rantaian",
    correct: "Betul",
    wrong: "Salah",
    studentAnswer: "Jawapan ",
    correctAnswer: "Jawapan Betul",
    noAnswer: "Belum ada jawapan",
    back: "Kembali",
    next: "Seterusnya",
    listen: "Dengar",
    studentAnswerSpeech: "Jawapan kami",
    correctAnswerSpeech: "Jawapan betul",
  }
};

const LANGUAGE_LABELS = { th: "ไทย", en: "อังกฤษ", ms: "มลายู" };

const getAnimalLabel = (name, language) =>
  ANIMAL_LABELS[name]?.[language] ?? ANIMAL_LABELS[name]?.th ?? name;

const getSpeechLang = (language) => {
  if (language === "en") return "en-US";
  if (language === "ms") return "ms-MY";
  return "th-TH";
};

export default function P5FoodChainSim() {
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState("th");
  const ui = UI[language] ?? UI.th;
  const studentChains = location.state?.chains || [];
  const lockedSlotSet = new Set(location.state?.lockedSlots || []);
  const hasLockedSlots = lockedSlotSet.size > 0;
  const rowScoreLabel =
    language === "en" ? "Score" : language === "ms" ? "Markah" : "คะแนน";
  const totalPossibleScore = ANSWERS.length * SCORE_PER_ROW;
  const rowScores = ANSWERS.map((answer, index) =>
    getRowScore(answer, studentChains[index] || [], index, lockedSlotSet, hasLockedSlots)
  );
  const score = rowScores.reduce((total, rowScore) => total + rowScore, 0);
  const getQuestionLabel = (index) =>
    language === "th" ? `ข้อที่ ${index + 1}` : `${ui.chain} ${index + 1}`;
  const getStudentAnswerLabel = (index) =>
    language === "th" ? `คำตอบข้อที่ ${index + 1}` : ui.studentAnswer;

  const speakChainSummary = (index, studentAnswer, correctAnswer, correct) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const studentText =
      studentAnswer.length > 0
        ? studentAnswer.map((name) => getAnimalLabel(name, language)).join(" , ")
        : ui.noAnswer;
    const correctText = correctAnswer.map((name) => getAnimalLabel(name, language)).join(" , ");

    const speechText =
      language === "en"
        ? `Chain ${index + 1}. ${correct ? "Correct." : "Incorrect."} ${ui.studentAnswerSpeech}: ${studentText}. ${ui.correctAnswerSpeech}: ${correctText}.`
        : language === "ms"
          ? `Rantaian ${index + 1}. ${correct ? "Betul." : "Salah."} ${ui.studentAnswerSpeech}: ${studentText}. ${ui.correctAnswerSpeech}: ${correctText}.`
          : `ข้อที่ ${index + 1} ${correct ? "ถูกต้อง" : "ผิด"} ${ui.studentAnswerSpeech} ${studentText} ${ui.correctAnswerSpeech} ${correctText}`;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = getSpeechLang(language);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[url('/images/p5/back.png')] bg-cover bg-center bg-no-repeat font-['Prompt',sans-serif]">
      <HomeButton />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-950/25 via-emerald-700/10 to-slate-950/15" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-8 h-56 w-56 rounded-full bg-lime-200/45 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-cyan-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-200/35 blur-3xl" />
      </div>

      <div className="pointer-events-none absolute right-8 top-8 hidden text-7xl opacity-85 sm:block">☀️</div>
      <div className="pointer-events-none absolute left-8 top-24 hidden text-6xl opacity-30 lg:block">☁️</div>
      <div className="pointer-events-none absolute bottom-16 right-16 hidden text-7xl opacity-25 lg:block">☁️</div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-28 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <div className="rounded-[32px] border border-emerald-50/80 bg-gradient-to-br from-white/62 via-emerald-50/52 to-lime-50/58 p-5 shadow-[0_22px_60px_rgba(15,23,42,0.14)] backdrop-blur-md sm:p-7">
          <div className="grid gap-4 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:gap-6">
            <div className="md:justify-self-start">
              <div className="inline-flex items-center rounded-[28px] bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-4 text-2xl font-extrabold text-white shadow-xl sm:text-3xl">
                {"\uD83C\uDF1F"} {ui.title} {"\uD83C\uDF1F"}
              </div>
            </div>

            <div className="md:justify-self-end">
              <div className="rounded-[28px] border border-emerald-200/80 bg-gradient-to-br from-white/75 to-emerald-100/70 px-8 py-5 text-center shadow-sm backdrop-blur-sm">
                <div className="text-sm font-semibold text-emerald-700">{ui.score}</div>
                <span className="mt-1 block text-3xl font-black text-emerald-800 sm:text-4xl">
                  {score} / {totalPossibleScore}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 space-y-6">
          {ANSWERS.map((answer, index) => {
            const studentAnswer = studentChains[index] || [];
            const rowScore = rowScores[index];
            const correct = rowScore === SCORE_PER_ROW;

            return (
              <div
                key={index}
                className="rounded-[30px] border border-emerald-50/85 bg-gradient-to-r from-white/62 via-white/54 to-emerald-50/58 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:p-6"
              >
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex w-fit items-center rounded-[22px] bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 text-lg font-extrabold text-white shadow-lg">
                    {getQuestionLabel(index)}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-sky-700">
                      {rowScoreLabel} {rowScore}/{SCORE_PER_ROW}
                    </div>
                    <div className="text-xl font-bold">
                      {correct ? (
                        <span className="text-green-600">✅ {ui.correct}</span>
                      ) : (
                        <span className="text-red-600">❌ {ui.wrong}</span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => speakChainSummary(index, studentAnswer, answer, correct)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 bg-white/85 text-lg text-emerald-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-white"
                      aria-label={`${ui.listen} ${getQuestionLabel(index)}`}
                      title={`${ui.listen} ${getQuestionLabel(index)}`}
                    >
                      🔊
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 xl:grid-cols-2">
                  <div className="rounded-[24px] border border-emerald-200/80 bg-gradient-to-br from-white/80 to-emerald-50/78 p-4 shadow-sm">
                    <div className="mb-3 text-sm font-semibold text-emerald-700">🧑‍🎓 {getStudentAnswerLabel(index)}</div>
                    <div className="flex flex-nowrap items-center gap-3 overflow-x-auto overflow-y-hidden rounded-2xl bg-white/60 p-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                      {studentAnswer.length > 0 ? (
                        studentAnswer.map((name, itemIndex) => (
                          <div key={`${name}-${itemIndex}`} className="flex shrink-0 items-center gap-3">
                            <div className="text-center">
                              <img
                                src={ANIMAL_IMAGES[name]}
                                className="h-20 w-20 rounded-2xl border-2 border-emerald-300 bg-white p-2 object-contain"
                                alt={getAnimalLabel(name, language)}
                              />
                              <div className="mt-1 text-xs font-medium text-slate-700">
                                {getAnimalLabel(name, language)}
                              </div>
                            </div>
                            {itemIndex < studentAnswer.length - 1 && (
                              <span className="text-xl font-black text-emerald-600">→</span>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-slate-500">{ui.noAnswer}</div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-amber-200/80 bg-gradient-to-br from-white/80 to-amber-50/78 p-4 shadow-sm">
                    <div className="mb-3 text-sm font-semibold text-amber-700">📚 {ui.correctAnswer}</div>
                    <div className="flex flex-nowrap items-center gap-3 overflow-x-auto overflow-y-hidden rounded-2xl bg-white/60 p-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                      {answer.map((name, itemIndex) => (
                        <div key={`${name}-${itemIndex}`} className="flex shrink-0 items-center gap-3">
                          <div className="text-center">
                            <img
                              src={ANIMAL_IMAGES[name]}
                              className="h-20 w-20 rounded-2xl border-2 border-amber-300 bg-white p-2 object-contain"
                              alt={getAnimalLabel(name, language)}
                            />
                            <div className="mt-1 text-xs font-medium text-slate-700">
                              {getAnimalLabel(name, language)}
                            </div>
                          </div>
                          {itemIndex < answer.length - 1 && (
                            <span className="text-xl font-black text-amber-600">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-[18px] left-[18px] z-40">
        <FoodChainLanguageSwitcher
          size="materials"
          value={language}
          onChange={setLanguage}
          labels={LANGUAGE_LABELS}
        />
      </div>

      <div className="fixed bottom-[18px] right-[18px] z-40 flex items-center gap-3 max-[720px]:bottom-[12px] max-[720px]:right-[12px] max-[720px]:gap-2">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-['Prompt',sans-serif] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate(-1)}
          type="button"
        >
          {"\u00AB"} {ui.back}
        </button>

        <button
          className="rounded-[18px] bg-[#08c95a] px-[18px] py-[14px] text-[20px] font-['Prompt',sans-serif] font-black text-white shadow-[0_22px_46px_rgba(8,201,90,.24)] transition hover:-translate-y-0.5 hover:bg-[#07b351] hover:shadow-[0_28px_56px_rgba(8,201,90,.30)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p5/life/foodchain/summary")}
          type="button"
        >
          {ui.next} {"\u00BB"}
        </button>
      </div>
    </div>
  );
}

