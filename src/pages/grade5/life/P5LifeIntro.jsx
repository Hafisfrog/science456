import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../HomeButton";

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
        to: "/p5/life/genetics/objectives",
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
        to: "/p5/life/genetics/objectives",
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
        to: "/p5/life/genetics/objectives",
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
    "linear-gradient(180deg, #bfe1f4 0%, #d6eef9 26%, #d2efdc 52%, #95d27d 74%, #70bf62 100%)";

  return (
    <div
      className="relative min-h-screen overflow-hidden px-4 py-5 text-slate-900 md:px-10"
      style={{ fontFamily: "Prompt, Noto Sans Thai, sans-serif", background: pageBg }}
    >
      <HomeButton />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.2)_35%,transparent_65%)]" />
        <div className="absolute -right-8 -top-12 h-40 w-40 rounded-full bg-[#fde047] shadow-[0_0_0_16px_#f59e0b,0_0_110px_rgba(253,224,71,0.62)] sm:h-48 sm:w-48" />
        <div className="absolute right-[9%] top-[12%] h-[170px] w-[420px] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,241,168,0.4)_0%,rgba(255,241,168,0.08)_58%,transparent_78%)] blur-[2px]" />
        <div className="absolute left-[8%] top-[10%] h-16 w-40 rounded-full bg-white/72 blur-[2px]" />
        <div className="absolute left-[22%] top-[14%] h-12 w-36 rounded-full bg-white/70 blur-[2px]" />
        <div className="absolute right-[18%] top-[12%] h-14 w-44 rounded-full bg-white/72 blur-[2px]" />
        <div className="absolute inset-x-[5%] top-[15%] h-[52%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.18)_50%,transparent_74%)]" />
        <div className="absolute inset-x-0 top-[36%] h-[18%] bg-[radial-gradient(ellipse_at_center,rgba(77,140,102,0.34)_0%,rgba(77,140,102,0.2)_46%,transparent_74%)]" />
        <div className="absolute inset-x-0 top-[43%] h-[20%] bg-[radial-gradient(ellipse_at_center,rgba(66,124,88,0.4)_0%,rgba(66,124,88,0.16)_48%,transparent_76%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[320px] bg-[linear-gradient(180deg,rgba(147,213,123,0)_0%,rgba(131,200,105,0.5)_28%,rgba(118,190,94,0.84)_56%,rgba(103,177,82,1)_100%)]" />
        <div className="absolute inset-x-0 bottom-[168px] h-[86px] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.09)_0_5px,transparent_5px_18px)] opacity-30" />
        <div className="absolute inset-x-0 bottom-[126px] h-[84px] bg-[linear-gradient(180deg,rgba(82,124,55,0.22)_0%,rgba(82,124,55,0.08)_58%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-[148px] h-14 rounded-[20px] bg-[repeating-linear-gradient(90deg,#c98847_0_25px,#ae6f36_25px_31px)] shadow-[inset_0_5px_0_rgba(255,219,157,0.3),0_8px_18px_rgba(85,48,18,0.25)]" />
        <div className="absolute inset-x-0 bottom-[106px] h-10 rounded-[14px] bg-[repeating-linear-gradient(90deg,#f0c15a_0_23px,#d8993d_23px_30px)] shadow-[inset_0_2px_0_rgba(255,240,195,0.45)]" />
        <div className="absolute bottom-[68px] left-0 right-0 flex justify-around px-8">
          {Array.from({ length: 14 }).map((_, idx) => (
            <div key={idx} className="h-12 w-6 rounded-[5px] bg-[#98612e] shadow-[inset_0_-3px_0_rgba(0,0,0,0.14),inset_0_2px_0_rgba(255,213,149,0.24)]" />
          ))}
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_56%,rgba(17,36,24,0.16)_100%)]" />
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
