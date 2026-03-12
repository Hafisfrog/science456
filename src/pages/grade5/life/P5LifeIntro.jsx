import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const LANGS = [
  { id: "th", label: "ไทย", voice: "th-TH" },
  { id: "en", label: "English", voice: "en-US" },
  { id: "ms", label: "Melayu", voice: "ms-MY" },
];

const TEXT = {
  th: {
    grade: "ชั้นประถมศึกษาปีที่ 5",
    heading: "เลือกบทเรียน\nชีวิตและการถ่ายทอดลักษณะ",
    sub: "เลือกรายวิชาเพื่อเข้าสู่กิจกรรมและสื่อการเรียนรู้",
    topics: [
      { id: "foodchain", title: "ชีวิตสัมพันธ์", to: "/p5/life/foodchain" },
      { id: "genetics", title: "ลักษณะทางพันธุกรรม", to: "/p5/life/genetics" },
    ],
    back: "ย้อนกลับ",
    listen: "ฟังหัวข้อทั้งหมด",
  },
  en: {
    grade: "Grade 5",
    heading: "Choose a Lesson\nLife & Heredity",
    sub: "Pick a topic to enter its activities and learning media.",
    topics: [
      { id: "foodchain", title: "Food Chain", to: "/p5/life/foodchain" },
      { id: "genetics", title: "Genetics", to: "/p5/life/genetics" },
    ],
    back: "Back",
    listen: "Play all titles",
  },
  ms: {
    grade: "Tahun 5",
    heading: "Pilih Pelajaran\nKehidupan & Keturunan",
    sub: "Pilih topik untuk masuk aktiviti dan bahan pembelajaran.",
    topics: [
      { id: "foodchain", title: "Rantaian Makanan", to: "/p5/life/foodchain" },
      { id: "genetics", title: "Genetik", to: "/p5/life/genetics" },
    ],
    back: "Kembali",
    listen: "Dengar semua tajuk",
  },
};

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;
  const voices = synth.getVoices();
  const voice =
    voices.find((item) => item.lang === lang) ||
    voices.find((item) => item.lang.startsWith(lang.split("-")[0]));
  if (voice) utterance.voice = voice;
  synth.speak(utterance);
}

export default function P5LifeIntro() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const content = TEXT[lang];
  const voice = useMemo(() => LANGS.find((item) => item.id === lang)?.voice || "th-TH", [lang]);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const preload = () => window.speechSynthesis.getVoices();
    preload();
    window.speechSynthesis.onvoiceschanged = preload;
  }, []);

  const handleSpeakAll = () => {
    const titles = content.topics.map((t) => t.title).join(", ");
    speakText(`${content.grade}. ${titles}`, voice);
  };

  const pageBg =
    "linear-gradient(180deg, #e8fff3 0%, #d3f7e2 40%, #b8edc9 80%), radial-gradient(120% 80% at 20% 20%, rgba(255,255,255,0.6), transparent 55%)";

  return (
    <div
      className="relative min-h-screen overflow-hidden px-4 py-5 text-slate-900 md:px-10"
      style={{ fontFamily: "Prompt, Noto Sans Thai, sans-serif", background: pageBg }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-yellow-300 shadow-[0_0_0_14px_#f59e0b] sm:h-48 sm:w-48" />
        <div className="absolute left-0 right-0 top-[32%] h-[46%] bg-[radial-gradient(circle_at_center,_#c8e7c7_0%,_#c8e7c7_45%,_transparent_55%)]" />
        <div className="absolute left-0 right-0 bottom-0 h-[220px] bg-gradient-to-t from-[#74c665] via-[#7ccf6d] to-transparent" />
        <div className="absolute inset-x-0 bottom-[140px] h-12 bg-[repeating-linear-gradient(90deg,#c0763c_0_24px,#a15d2d_24px_30px)] rounded-full opacity-90 blur-[1px]" />
        <div className="absolute inset-x-0 bottom-[110px] h-8 bg-[repeating-linear-gradient(90deg,#f9b24e_0_22px,#d68632_22px_28px)] rounded-full opacity-85" />
        <div className="absolute bottom-[82px] left-0 right-0 flex justify-around px-8">
          {Array.from({ length: 14 }).map((_, idx) => (
            <div key={idx} className="h-10 w-5 rounded-[4px] bg-[#8c5b2c] shadow-[inset_0_-2px_0_rgba(0,0,0,0.12)]" />
          ))}
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-40px)] max-w-5xl flex-col">
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/grades")}
            className="rounded-full bg-white/85 px-4 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
          >
            {content.back}
          </button>
          <div className="rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-emerald-700 shadow">
            {content.grade}
          </div>
        </div>

        <div className="mb-8 text-center">
          <h1 className="whitespace-pre-line text-[clamp(34px,4vw,56px)] font-black leading-tight text-[#0f2b21] drop-shadow-[0_2px_0_rgba(255,255,255,0.7)]">
            {content.heading}
          </h1>
          <p className="mt-3 text-[clamp(16px,1.6vw,20px)] font-semibold text-[#1e3a2f]">
            {content.sub}
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 pb-20 md:grid-cols-2">
          {content.topics.map((topic) => (
            <button
              key={topic.id}
              type="button"
              onClick={() => navigate(topic.to)}
              className="group relative overflow-hidden rounded-[22px] border-2 border-[#f3c262] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.95),rgba(255,255,255,0.9))] px-7 py-10 text-left shadow-[0_14px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-1.5"
            >
              <span className="pointer-events-none absolute inset-y-2 left-2 text-4xl text-[#2b2b2b]">“</span>
              <span className="pointer-events-none absolute inset-y-2 right-3 text-4xl text-[#2b2b2b]">”</span>
              <div className="absolute right-4 top-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(topic.title, voice);
                  }}
                  className="inline-grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700 shadow hover:scale-105"
                  aria-label={topic.title}
                  title={topic.title}
                >
                  🔊
                </button>
              </div>
              <div className="ml-6 mr-12 text-center text-[clamp(26px,3vw,34px)] font-black leading-tight text-[#1f2a36]">
                {topic.title}
              </div>
            </button>
          ))}
        </div>

        <div className="fixed bottom-4 left-4 z-20 inline-flex items-center gap-2 rounded-[18px] border border-[#7ccf6d]/40 bg-white/92 p-2 shadow-[0_10px_16px_rgba(15,23,42,0.16)] backdrop-blur-[2px]">
          {LANGS.map((item) => (
            <button
              key={item.id}
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                lang === item.id ? "bg-emerald-500 text-white shadow" : "bg-emerald-50 text-emerald-800"
              }`}
              type="button"
              onClick={() => setLang(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
