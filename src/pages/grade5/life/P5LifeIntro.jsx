import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const LANGS = [
  { id: "th", label: "ไทย", voice: "th-TH" },
  { id: "ms", label: "มลายู", voice: "ms-MY" },
  { id: "en", label: "อังกฤษ", voice: "en-US" },
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
    heading: "วิทยาศาสตร์ ป.5",
    sub: "เลือกหน่วยการเรียนรู้",
    back: "ย้อนกลับ",
    open: "เข้าสู่บทเรียน",
    topics: [
      {
        id: "foodchain",
        title: "ชีวิตสัมพันธ์",
        to: "/p5/life/foodchain",
      },
      {
        id: "genetics",
        title: "ลักษณะทางพันธุกรรม",
        to: "/p5/life/genetics",
      },
    ],
  },
  en: {
    heading: "Science P.5",
    subheading: "Choose a Lesson",
    sub: "Pick a topic to enter its activities and learning media.",
    back: "Back",
    open: "Open Lesson",
    topics: [
      {
        id: "foodchain",
        title: "Food Chain",
        to: "/p5/life/foodchain",
      },
      {
        id: "genetics",
        title: "Genetic Traits",
        to: "/p5/life/genetics",
      },
    ],
  },
  ms: {
    heading: "Sains Tahun 5",
    subheading: "Pilih Pelajaran",
    sub: "Pilih topik untuk masuk aktiviti dan bahan pembelajaran.",
    back: "Kembali",
    open: "Masuk Pelajaran",
    topics: [
      {
        id: "foodchain",
        title: "Rantaian Makanan",
        to: "/p5/life/foodchain",
      },
      {
        id: "genetics",
        title: "Genetik",
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
      className="flex h-[clamp(400px,52vh,480px)] w-[min(600px,94vw)] max-w-[94vw] cursor-pointer flex-col overflow-hidden rounded-[26px] bg-[#f7fbff]/92 shadow-[0_16px_34px_rgba(33,53,95,0.15)] backdrop-blur-[2px] transition hover:-translate-y-1 lg:w-[min(600px,43vw)]"
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
      <div className="relative h-[clamp(255px,34vh,315px)] overflow-hidden bg-[#dbe4f1]">
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

      <div className="flex min-h-[92px] flex-1 items-center justify-center px-5 py-3">
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <h2 className="text-[clamp(28px,2.4vw,44px)] font-black leading-[1.15] text-slate-900">
              {topic.title}
            </h2>
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
            {"\u{1F50A}"}
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
        <div className="mb-6 pt-2 text-center">
          <h1 className="text-4xl font-black leading-none text-[#2563eb] md:text-[46px]">
            {content.heading}
          </h1>
          <p className="mt-2 text-lg font-semibold text-slate-800 md:text-xl">{content.subheading}</p>
          <p className="mt-2 text-[16px] font-semibold text-slate-600">{content.sub}</p>
        </div>

        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 justify-items-center gap-7 pb-24 lg:grid-cols-2">
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

        <div className="fixed bottom-[18px] left-[18px] z-20 inline-flex items-center gap-[10px] rounded-[18px] border-0 bg-white/90 px-[12px] py-[10px] shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
          {LANGS.map((item) => (
            <button
              key={item.id}
              className={`rounded-[14px] px-[18px] py-[10px] text-[16px] font-extrabold leading-6 text-[#0f172a] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,0.14)] ${
                lang === item.id ? "bg-[#bfe0ff]" : "bg-[#e6f2ff]"
              }`}
              type="button"
              onClick={() => setLang(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate("/grades")}
          className="fixed bottom-4 right-4 z-20 rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
        >
          « {content.back}
        </button>
      </div>
    </div>
  );
}
