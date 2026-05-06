import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import { useP5GeneticsLang } from "./p5GeneticsI18n";
import "./P5GeneticsSelect.css";
import "./p5GeneticsLangShared.css";

const BACK_PATH = "/p5/life/genetics/vocab-2";
const NEXT_PATH = "/p5/life/genetics/animals/objectives";

const LANG_TO_VOICE = {
  th: "th-TH",
  en: "en-US",
  ms: "ms-MY",
};

const PAGE_TEXT = {
  th: {
    chip: "ชั้นประถมศึกษาปีที่ 5",
    title: "ลักษณะทางพันธุกรรม",
    back: "ย้อนกลับ",
    next: "ต่อไป",
    chipTh: "ไทย",
    chipEn: "อังกฤษ",
    chipMs: "มลายู",
    experiments: [
      {
        id: 6,
        title: "การทดลองที่ 6",
        label:
          "ลักษณะทางพันธุกรรมของสัตว์",
        path: "/p5/life/genetics/animals/objectives",
        tone: "exp-red",
        image: "/images/p5/genetics/satp5.png",
        fallbackImage: "/images/p5/genetics/satp5.png",
      },
      {
        id: 7,
        title: "การทดลองที่ 7",
        label:
          "ลักษณะทางพันธุกรรมของพืช",
        path: "/p5/life/genetics/plants/objectives",
        tone: "exp-green",
        image: "/images/p5/genetics/peuchp5.png",
        fallbackImage: "/images/p5/genetics/peuchp5.png",
      },
      {
        id: 8,
        title: "การทดลองที่ 8",
        label:
          "ลักษณะทางพันธุกรรมของคน",
        path: "/p5/life/genetics/humans/objectives",
        tone: "exp-blue",
        image: "/images/p5/genetics/konp5.png",
        fallbackImage: "/images/p5/genetics/konp5.png",
      },
    ],
  },
  en: {
    chip: "Grade 5",
    title: "Genetic Traits",
    back: "Back",
    next: "Next",
    chipTh: "ไทย",
    chipEn: "อังกฤษ",
    chipMs: "มลายู",
    experiments: [
      {
        id: 6,
        title: "Experiment 6",
        label: "Genetic Traits of Animals",
        path: "/p5/life/genetics/animals/objectives",
        tone: "exp-red",
        image: "/images/p5/genetics/satp5.png",
        fallbackImage: "/images/p5/genetics/satp5.png",
      },
      {
        id: 7,
        title: "Experiment 7",
        label: "Genetic Traits of Plants",
        path: "/p5/life/genetics/plants/objectives",
        tone: "exp-green",
        image: "/images/p5/genetics/peuchp5.png",
        fallbackImage: "/images/p5/genetics/peuchp5.png",
      },
      {
        id: 8,
        title: "Experiment 8",
        label: "Genetic Traits of Humans",
        path: "/p5/life/genetics/humans/objectives",
        tone: "exp-blue",
        image: "/images/p5/genetics/konp5.png",
        fallbackImage: "/images/p5/genetics/konp5.png",
      },
    ],
  },
  ms: {
    chip: "Tahun 5",
    title: "Ciri Genetik",
    back: "Kembali",
    next: "Seterusnya",
    chipTh: "ไทย",
    chipEn: "อังกฤษ",
    chipMs: "มลายู",
    experiments: [
      {
        id: 6,
        title: "Eksperimen 6",
        label: "Ciri Genetik Haiwan",
        path: "/p5/life/genetics/animals/objectives",
        tone: "exp-red",
        image: "/images/p5/genetics/satp5.png",
        fallbackImage: "/images/p5/genetics/satp5.png",
      },
      {
        id: 7,
        title: "Eksperimen 7",
        label: "Ciri Genetik Tumbuhan",
        path: "/p5/life/genetics/plants/objectives",
        tone: "exp-green",
        image: "/images/p5/genetics/peuchp5.png",
        fallbackImage: "/images/p5/genetics/peuchp5.png",
      },
      {
        id: 8,
        title: "Eksperimen 8",
        label: "Ciri Genetik Manusia",
        path: "/p5/life/genetics/humans/objectives",
        tone: "exp-blue",
        image: "/images/p5/genetics/konp5.png",
        fallbackImage: "/images/p5/genetics/konp5.png",
      },
    ],
  },
};

export default function P5GeneticsSelect() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const t = PAGE_TEXT[lang];

  const speakCard = (event, exp) => {
    event.stopPropagation();
    if (typeof window === "undefined" || !("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(`${exp.title}. ${exp.label}`);
    utterance.lang = LANG_TO_VOICE[lang];
    synth.speak(utterance);
  };

  return (
    <div className="p5gen-page notranslate" translate="no">
      <HomeButton />

      <main className="p5gen-main">
        <div className="p5gen-heading">
          <h1 className="notranslate" translate="no">{t.title}</h1>
          <p className="notranslate" translate="no">{t.chip}</p>
        </div>

        <section className="p5gen-card-grid">
          {t.experiments.map((exp) => (
            <div
              key={exp.id}
              className={`p5gen-card ${exp.tone}`}
              role="button"
              tabIndex={0}
              onClick={() => navigate(exp.path)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  navigate(exp.path);
                }
              }}
            >
              <div className="p5gen-card-media">
                <img
                  src={exp.image}
                  alt={exp.label}
                  className="p5gen-card-image"
                  referrerPolicy="no-referrer"
                  onError={(event) => {
                    event.currentTarget.src = exp.fallbackImage;
                  }}
                />
              </div>
              <div className="p5gen-card-body">
                <button
                  type="button"
                  className="p5gen-card-audio"
                  aria-label={`play ${exp.title}`}
                  onClick={(event) => speakCard(event, exp)}
                >
                  {"🔊"}
                </button>
                <span className="p5gen-card-kicker notranslate" translate="no">{exp.title}</span>
                <span className="p5gen-card-title notranslate" translate="no">{exp.label}</span>
              </div>
            </div>
          ))}
        </section>
      </main>

      <div className="p5gen-lang">
        <button
          type="button"
          className={lang === "th" ? "is-active" : ""}
          onClick={() => setLang("th")}
        >
          {t.chipTh}
        </button>
        <button
          type="button"
          className={lang === "ms" ? "is-active" : ""}
          onClick={() => setLang("ms")}
        >
          {t.chipMs}
        </button>
        <button
          type="button"
          className={lang === "en" ? "is-active" : ""}
          onClick={() => setLang("en")}
        >
          {t.chipEn}
        </button>
      </div>

      <div className="p5gen-action-row">
        <button type="button" className="p5gen-nav-back" onClick={() => navigate(BACK_PATH)}>
          {"«"} {t.back}
        </button>

        {/* <button type="button" className="p5gen-nav-next" onClick={() => navigate(NEXT_PATH)}>
          {t.next} {"»"}
        </button> */}
      </div>
    </div>
  );
}

