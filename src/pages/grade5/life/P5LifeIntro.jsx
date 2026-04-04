import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const LANGS = [
  { id: "th", label: "ไทย", voice: "th-TH" },
  { id: "en", label: "English", voice: "en-US" },
  { id: "ms", label: "Melayu", voice: "ms-MY" },
];

const TOPIC_MEDIA = {
  foodchain: {
    image:
      "https://images.pexels.com/photos/7264786/pexels-photo-7264786.jpeg?auto=compress&cs=tinysrgb&w=1200&h=720&fit=crop",
    fallbackImage: "/images/p5-life.png",
    imagePosition: "center center",
    accent: "from-emerald-500 to-lime-500",
  },
  genetics: {
    image:
      "C:\Users\ASUS\Pictures\img project\familytree.png",
    fallbackImage: "/images/p5-genetic.png",
    imagePosition: "center 28%",
    accent: "from-sky-500 to-blue-600",
  },
};

const TEXT = {
  th: {
    grade: "ชั้นประถมศึกษาปีที่ 5",
    heading: "วิทยาศาสตร์ ป.5",
    sub: "เลือกหน่วยการเรียนรู้",
    back: "ย้อนกลับ",
    open: "เข้าสู่บทเรียน",
    topics: [
      {
        id: "foodchain",
        title: "ชีวิตสัมพันธ์",
        description: "เรียนรู้ความสัมพันธ์ของสิ่งมีชีวิต ผู้ผลิต ผู้บริโภค และผู้ย่อยสลายในธรรมชาติ",
        to: "/p5/life/foodchain",
      },
      {
        id: "genetics",
        title: "ลักษณะทางพันธุกรรม",
        description: "สำรวจลักษณะที่ถ่ายทอดจากพ่อแม่สู่ลูกในสัตว์ พืช และมนุษย์",
        to: "/p5/life/genetics",
      },
    ],
  },
  en: {
    grade: "Grade 5",
    heading: "Science P.5",
    subheading: "Choose a Lesson",
    sub: "Pick a topic to enter its activities and learning media.",
    back: "Back",
    open: "Open Lesson",
    topics: [
      {
        id: "foodchain",
        title: "Food Chain",
        description: "Explore producers, consumers, decomposers, and how living things depend on one another.",
        to: "/p5/life/foodchain",
      },
      {
        id: "genetics",
        title: "Genetic Traits",
        description: "Investigate traits passed from parents to offspring in animals, plants, and humans.",
        to: "/p5/life/genetics",
      },
    ],
  },
  ms: {
    grade: "Tahun 5",
    heading: "Sains Tahun 5",
    subheading: "Pilih Pelajaran",
    sub: "Pilih topik untuk masuk aktiviti dan bahan pembelajaran.",
    back: "Kembali",
    open: "Masuk Pelajaran",
    topics: [
      {
        id: "foodchain",
        title: "Rantaian Makanan",
        description: "Terokai pengeluar, pengguna, pengurai, dan hubungan hidupan dalam alam semula jadi.",
        to: "/p5/life/foodchain",
      },
      {
        id: "genetics",
        title: "Genetik",
        description: "Kaji ciri yang diwarisi daripada ibu bapa kepada anak dalam haiwan, tumbuhan, dan manusia.",
        to: "/p5/life/genetics",
      },
    ],
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

function TopicCard({ topic, voice, openLabel, onOpen }) {
  const media = TOPIC_MEDIA[topic.id];

  return (
    <article
      className="cursor-pointer overflow-hidden rounded-[34px] bg-[#f7fbff]/92 shadow-[0_22px_40px_rgba(15,23,42,0.16)] backdrop-blur-[2px] transition hover:-translate-y-1"
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="relative h-[250px] overflow-hidden bg-[#dbe4f1]">
        <img
          src={media.image}
          alt={topic.title}
          className="h-full w-full object-cover"
          style={{ objectPosition: media.imagePosition }}
          referrerPolicy="no-referrer"
          onError={(event) => {
            event.currentTarget.src = media.fallbackImage;
          }}
        />
      </div>

      <div className="px-8 pb-7 pt-7">
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <h2 className="text-[clamp(28px,2.4vw,44px)] font-black leading-[1.05] text-slate-900">
              {topic.title}
            </h2>
            <p className="mt-4 max-w-[28rem] text-[clamp(15px,1vw,18px)] font-semibold leading-6 text-slate-600">
              {topic.description}
            </p>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              speakText(topic.title, voice);
            }}
            className="inline-grid h-14 w-14 shrink-0 place-items-center rounded-full bg-sky-100 text-[26px] text-sky-700 shadow-[0_10px_22px_rgba(59,130,246,0.18)] transition hover:-translate-y-0.5 hover:bg-sky-200"
            aria-label={topic.title}
            title={topic.title}
          >
            🔊
          </button>
        </div>

      </div>
    </article>
  );
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

  const pageBg =
    "linear-gradient(180deg, #eefdf4 0%, #d9f9e8 34%, #baf0cf 70%, #7acb67 100%), radial-gradient(120% 80% at 20% 20%, rgba(255,255,255,0.64), transparent 55%)";

  return (
    <div
      className="relative min-h-screen overflow-hidden px-4 py-5 text-slate-900 md:px-10"
      style={{ fontFamily: "Prompt, Noto Sans Thai, sans-serif", background: pageBg }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-yellow-300 shadow-[0_0_0_14px_#f59e0b] sm:h-48 sm:w-48" />
        <div className="absolute left-0 right-0 top-[10%] mx-auto h-[66%] w-[96%] rounded-[50%] bg-white/52 blur-[2px]" />
        <div className="absolute left-0 right-0 top-[34%] h-[40%] bg-[radial-gradient(circle_at_center,_rgba(176,223,173,0.88)_0%,_rgba(176,223,173,0.78)_38%,_transparent_68%)]" />
        <div className="absolute left-0 right-0 bottom-0 h-[240px] bg-gradient-to-t from-[#74c665] via-[#7ccf6d] to-transparent" />
        <div className="absolute inset-x-0 bottom-[140px] h-12 rounded-full bg-[repeating-linear-gradient(90deg,#c0763c_0_24px,#a15d2d_24px_30px)] opacity-90 blur-[1px]" />
        <div className="absolute inset-x-0 bottom-[110px] h-8 rounded-full bg-[repeating-linear-gradient(90deg,#f9b24e_0_22px,#d68632_22px_28px)] opacity-85" />
        <div className="absolute bottom-[82px] left-0 right-0 flex justify-around px-8">
          {Array.from({ length: 14 }).map((_, idx) => (
            <div key={idx} className="h-10 w-5 rounded-[4px] bg-[#8c5b2c] shadow-[inset_0_-2px_0_rgba(0,0,0,0.12)]" />
          ))}
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-40px)] max-w-[1460px] flex-col">
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/grades")}
            className="rounded-full bg-white/90 px-6 py-3 text-[clamp(18px,1.2vw,24px)] font-extrabold shadow-[0_10px_20px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:bg-white"
          >
            {content.back}
          </button>
          <div className="rounded-full bg-white/88 px-6 py-3 text-[clamp(18px,1.1vw,24px)] font-extrabold text-emerald-700 shadow-[0_10px_20px_rgba(15,23,42,0.12)]">
            {content.grade}
          </div>
        </div>

        <div className="mb-10 pt-2 text-center">
          <h1 className="text-[clamp(42px,4.2vw,72px)] font-black leading-none text-[#2563eb]">
            {content.heading}
          </h1>
          <p className="mt-3 text-[clamp(18px,1.8vw,34px)] font-semibold text-slate-800">{content.subheading}</p>
          <p className="mt-2 text-[clamp(15px,1vw,20px)] font-semibold text-slate-600">{content.sub}</p>
        </div>

        <div className="mx-auto grid w-full max-w-[1240px] gap-8 pb-24 lg:grid-cols-2">
          {content.topics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              voice={voice}
              openLabel={content.open}
              onOpen={() => navigate(topic.to)}
            />
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
