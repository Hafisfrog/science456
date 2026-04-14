import { useNavigate } from "react-router-dom";
import { useP5GeneticsLang } from "./p5GeneticsI18n";
import "./P5GeneticsSelect.css";
import "./p5GeneticsLangShared.css";

const LANG_TO_VOICE = {
  th: "th-TH",
  en: "en-US",
  ms: "ms-MY",
};

const PAGE_TEXT = {
  th: {
    chip: "\u0e0a\u0e31\u0e49\u0e19\u0e1b\u0e23\u0e30\u0e16\u0e21\u0e28\u0e36\u0e01\u0e29\u0e32\u0e1b\u0e35\u0e17\u0e35\u0e48 5",
    title: "\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e17\u0e32\u0e07\u0e1e\u0e31\u0e19\u0e18\u0e38\u0e01\u0e23\u0e23\u0e21",
    back: "<< \u0e40\u0e25\u0e37\u0e2d\u0e01\u0e0a\u0e31\u0e49\u0e19",
    experiments: [
      {
        id: 6,
        title: "\u0e01\u0e32\u0e23\u0e17\u0e14\u0e25\u0e2d\u0e07\u0e17\u0e35\u0e48 6",
        label:
          "\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e17\u0e32\u0e07\u0e1e\u0e31\u0e19\u0e18\u0e38\u0e01\u0e23\u0e23\u0e21\u0e02\u0e2d\u0e07\u0e2a\u0e31\u0e15\u0e27\u0e4c",
        path: "/p5/life/genetics/animals",
        tone: "exp-red",
        image: "/images/p5/genetics/satp5.png",
        fallbackImage: "/images/p5/genetics/satp5.png",
      },
      {
        id: 7,
        title: "\u0e01\u0e32\u0e23\u0e17\u0e14\u0e25\u0e2d\u0e07\u0e17\u0e35\u0e48 7",
        label:
          "\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e17\u0e32\u0e07\u0e1e\u0e31\u0e19\u0e18\u0e38\u0e01\u0e23\u0e23\u0e21\u0e02\u0e2d\u0e07\u0e1e\u0e37\u0e0a",
        path: "/p5/life/genetics/plants",
        tone: "exp-green",
        image: "/images/p5/genetics/peuchp5.png",
        fallbackImage: "/images/p5/genetics/peuchp5.png",
      },
      {
        id: 8,
        title: "\u0e01\u0e32\u0e23\u0e17\u0e14\u0e25\u0e2d\u0e07\u0e17\u0e35\u0e48 8",
        label:
          "\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e17\u0e32\u0e07\u0e1e\u0e31\u0e19\u0e18\u0e38\u0e01\u0e23\u0e23\u0e21\u0e02\u0e2d\u0e07\u0e04\u0e19",
        path: "/p5/life/genetics/humans",
        tone: "exp-blue",
        image: "/images/p5/genetics/konp5.png",
        fallbackImage: "/images/p5/genetics/konp5.png",
      },
    ],
  },
  en: {
    chip: "Grade 5",
    title: "Genetic Traits",
    back: "<< Back to Grades",
    experiments: [
      {
        id: 6,
        title: "Experiment 6",
        label: "Genetic Traits of Animals",
        path: "/p5/life/genetics/animals",
        tone: "exp-red",
        image: "/images/p5/genetics/satp5.png",
        fallbackImage: "/images/p5/genetics/satp5.png",
      },
      {
        id: 7,
        title: "Experiment 7",
        label: "Genetic Traits of Plants",
        path: "/p5/life/genetics/plants",
        tone: "exp-green",
        image: "/images/p5/genetics/peuchp5.png",
        fallbackImage: "/images/p5/genetics/peuchp5.png",
      },
      {
        id: 8,
        title: "Experiment 8",
        label: "Genetic Traits of Humans",
        path: "/p5/life/genetics/humans",
        tone: "exp-blue",
        image: "/images/p5/genetics/konp5.png",
        fallbackImage: "/images/p5/genetics/konp5.png",
      },
    ],
  },
  ms: {
    chip: "Tahun 5",
    title: "Ciri Genetik",
    back: "<< Kembali ke Pilih Tahun",
    experiments: [
      {
        id: 6,
        title: "Eksperimen 6",
        label: "Ciri Genetik Haiwan",
        path: "/p5/life/genetics/animals",
        tone: "exp-red",
        image: "/images/p5/genetics/satp5.png",
        fallbackImage: "/images/p5/genetics/satp5.png",
      },
      {
        id: 7,
        title: "Eksperimen 7",
        label: "Ciri Genetik Tumbuhan",
        path: "/p5/life/genetics/plants",
        tone: "exp-green",
        image: "/images/p5/genetics/peuchp5.png",
        fallbackImage: "/images/p5/genetics/peuchp5.png",
      },
      {
        id: 8,
        title: "Eksperimen 8",
        label: "Ciri Genetik Manusia",
        path: "/p5/life/genetics/humans",
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
  const labels = { th: "ไทย", en: "อังกฤษ", ms: "มลายู" };
  const backLabel = "<< เลือกชั้น";

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
      <button type="button" className="p5gen-back" onClick={() => navigate("/p5/life")}>
        {backLabel}
      </button>

      <main className="p5gen-main">
        <div className="p5gen-heading">
          <div className="p5gen-chip notranslate" translate="no">Science Lab</div>
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
                  {"\uD83D\uDD0A"}
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
          {labels.th}
        </button>
        <button
          type="button"
          className={lang === "en" ? "is-active" : ""}
          onClick={() => setLang("en")}
        >
          {labels.en}
        </button>
        <button
          type="button"
          className={lang === "ms" ? "is-active" : ""}
          onClick={() => setLang("ms")}
        >
          {labels.ms}
        </button>
      </div>
    </div>
  );
}
