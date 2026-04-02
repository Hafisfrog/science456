import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";
import { LANG_BUTTON_TEXT, NEXT_LABEL, useP5GeneticsLang } from "./p5GeneticsI18n";
import "./P5GeneticsHumans.css";

const IMAGE_VERSION = "20260327-human-v3";

const TEXT = {
  th: {
    title:
      "\u0e01\u0e32\u0e23\u0e16\u0e48\u0e32\u0e22\u0e17\u0e2d\u0e14\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e17\u0e32\u0e07\u0e1e\u0e31\u0e19\u0e18\u0e38\u0e01\u0e23\u0e23\u0e21\u0e02\u0e2d\u0e07\u0e04\u0e19",
    topic:
      "\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e17\u0e32\u0e07\u0e1e\u0e31\u0e19\u0e18\u0e38\u0e01\u0e23\u0e23\u0e21\u0e15\u0e48\u0e32\u0e07 \u0e46 \u0e02\u0e2d\u0e07\u0e04\u0e19",
    tapImage: "\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e23\u0e39\u0e1b",
    reset: "\u0e23\u0e35\u0e40\u0e0b\u0e47\u0e15",
    reveal: "\u0e40\u0e09\u0e25\u0e22",
    back: "\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a",
    correct: "\u0e16\u0e39\u0e01",
    incorrect: "\u0e1c\u0e34\u0e14",
    score: "\u0e15\u0e2d\u0e1a\u0e16\u0e39\u0e01",
    wrongItems: "\u0e02\u0e49\u0e2d\u0e17\u0e35\u0e48\u0e22\u0e31\u0e07\u0e1c\u0e34\u0e14",
    allCorrect: "\u0e40\u0e22\u0e35\u0e48\u0e22\u0e21 \u0e15\u0e2d\u0e1a\u0e16\u0e39\u0e01\u0e04\u0e23\u0e1a",
    close: "\u0e1b\u0e34\u0e14",
    traits: {
      "straight-hair": "\u0e1c\u0e21\u0e15\u0e23\u0e07",
      "double-eyelid": "\u0e15\u0e32 2 \u0e0a\u0e31\u0e49\u0e19",
      draw: "\u0e0a\u0e2d\u0e1a\u0e27\u0e32\u0e14\u0e23\u0e39\u0e1b",
      dimple: "\u0e21\u0e35\u0e25\u0e31\u0e01\u0e22\u0e34\u0e49\u0e21",
      "no-dimple": "\u0e44\u0e21\u0e48\u0e21\u0e35\u0e25\u0e31\u0e01\u0e22\u0e34\u0e49\u0e21",
      music: "\u0e0a\u0e2d\u0e1a\u0e40\u0e25\u0e48\u0e19\u0e14\u0e19\u0e15\u0e23\u0e35",
      "curly-hair": "\u0e1c\u0e21\u0e2b\u0e22\u0e34\u0e01",
      green: "\u0e0a\u0e2d\u0e1a\u0e2a\u0e35\u0e40\u0e02\u0e35\u0e22\u0e27",
      nose: "\u0e2a\u0e31\u0e19\u0e08\u0e21\u0e39\u0e01\u0e42\u0e14\u0e48\u0e07",
      tongue: "\u0e21\u0e49\u0e27\u0e19\u0e25\u0e34\u0e49\u0e19\u0e44\u0e14\u0e49",
      sports: "\u0e0a\u0e2d\u0e1a\u0e40\u0e25\u0e48\u0e19\u0e01\u0e35\u0e2c\u0e32",
      "single-eyelid": "\u0e15\u0e32\u0e0a\u0e31\u0e49\u0e19\u0e40\u0e14\u0e35\u0e22\u0e27",
    },
  },
  en: {
    title: "Inheritance of Human Traits",
    topic: "Different Human Genetic Traits",
    tapImage: "Select Images",
    reset: "Reset",
    reveal: "Reveal",
    back: "Back",
    correct: "Correct",
    incorrect: "Incorrect",
    score: "Score",
    wrongItems: "Incorrect Items",
    allCorrect: "Great, all answers are correct",
    close: "Close",
    traits: {
      "straight-hair": "Straight Hair",
      "double-eyelid": "Double Eyelid",
      draw: "Likes Drawing",
      dimple: "Has Dimple",
      "no-dimple": "No Dimple",
      music: "Likes Music",
      "curly-hair": "Curly Hair",
      green: "Likes Green",
      nose: "High Nose Bridge",
      tongue: "Can Roll Tongue",
      sports: "Likes Sports",
      "single-eyelid": "Single Eyelid",
    },
  },
  ms: {
    title: "Pewarisan Ciri Genetik Manusia",
    topic: "Pelbagai Ciri Genetik Manusia",
    tapImage: "Pilih Gambar",
    reset: "Set semula",
    reveal: "Jawapan",
    back: "Kembali",
    correct: "Betul",
    incorrect: "Salah",
    score: "Skor",
    wrongItems: "Item yang Salah",
    allCorrect: "Bagus, semua jawapan betul",
    close: "Tutup",
    traits: {
      "straight-hair": "Rambut Lurus",
      "double-eyelid": "Mata 2 Kelopak",
      draw: "Suka Melukis",
      dimple: "Ada Lesung Pipit",
      "no-dimple": "Tiada Lesung Pipit",
      music: "Suka Bermain Muzik",
      "curly-hair": "Rambut Kerinting",
      green: "Suka Warna Hijau",
      nose: "Batang Hidung Tinggi",
      tongue: "Boleh Gulung Lidah",
      sports: "Suka Bersukan",
      "single-eyelid": "Mata Satu Kelopak",
    },
  },
};

const TRAITS = [
  {
    id: "straight-hair",
    inherited: true,
    localImg: "/images/p5/humans/straight-hair.jpg",
    remoteImg:
      "https://images.pexels.com/photos/15603371/pexels-photo-15603371.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 18%",
  },
  {
    id: "double-eyelid",
    inherited: true,
    localImg: "/images/p5/humans/double-eyelid.jpg",
    remoteImg:
      "https://images.pexels.com/photos/9769854/pexels-photo-9769854.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 42%",
  },
  {
    id: "draw",
    inherited: false,
    localImg: "/images/p5/humans/draw.jpg",
    remoteImg:
      "https://images.pexels.com/photos/4442090/pexels-photo-4442090.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 44%",
  },
  {
    id: "dimple",
    inherited: true,
    localImg: "/images/p5/humans/dimple.jpg",
    remoteImg:
      "https://images.pexels.com/photos/11495977/pexels-photo-11495977.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 28%",
  },
  {
    id: "no-dimple",
    inherited: true,
    localImg: "/images/p5/humans/no-dimple.jpg",
    remoteImg:
      "https://images.pexels.com/photos/30427604/pexels-photo-30427604.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 22%",
  },
  {
    id: "music",
    inherited: false,
    localImg: "/images/p5/humans/music.jpg",
    remoteImg:
      "https://images.pexels.com/photos/8471931/pexels-photo-8471931.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 34%",
  },
  {
    id: "curly-hair",
    inherited: true,
    localImg: "/images/p5/humans/curly-hair.jpg",
    remoteImg:
      "https://images.pexels.com/photos/1897534/pexels-photo-1897534.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 18%",
  },
  {
    id: "green",
    inherited: false,
    localImg: "/images/p5/humans/green.jpg",
    remoteImg:
      "https://images.pexels.com/photos/15602819/pexels-photo-15602819.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 42%",
  },
  {
    id: "nose",
    inherited: true,
    localImg: "/images/p5/humans/nose.jpg",
    remoteImg:
      "https://images.pexels.com/photos/9164794/pexels-photo-9164794.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 46%",
  },
  {
    id: "tongue",
    inherited: true,
    localImg: "/images/p5/humans/tongue.jpg",
    remoteImg:
      "https://images.pexels.com/photos/4975808/pexels-photo-4975808.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 36%",
  },
  {
    id: "sports",
    inherited: false,
    localImg: "/images/p5/humans/sports.jpg",
    remoteImg:
      "https://images.pexels.com/photos/8034614/pexels-photo-8034614.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 40%",
  },
  {
    id: "single-eyelid",
    inherited: true,
    localImg: "/images/p5/humans/single-eyelid.jpg",
    remoteImg:
      "https://images.pexels.com/photos/7626597/pexels-photo-7626597.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 32%",
  },
];

export default function P5GeneticsHumans() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const [selectedTraits, setSelectedTraits] = useState({});
  const [showResults, setShowResults] = useState(false);
  const t = TEXT[lang];
  const labels = LANG_BUTTON_TEXT[lang];
  const hasAnswers = Object.keys(selectedTraits).length > 0;

  const toggleTrait = (traitId) => {
    setSelectedTraits((prev) => {
      const next = { ...prev };
      if (next[traitId]) {
        delete next[traitId];
      } else {
        next[traitId] = true;
      }
      return next;
    });
    if (showResults) setShowResults(false);
  };

  const resetAnswers = () => {
    setSelectedTraits({});
    setShowResults(false);
  };

  const revealAnswers = () => {
    setShowResults(true);
  };

  const wrongItems = showResults
    ? TRAITS.filter((trait) => {
        const selected = Boolean(selectedTraits[trait.id]);
        return selected !== trait.inherited;
      })
    : [];

  const correctCount = showResults ? TRAITS.length - wrongItems.length : 0;

  return (
    <LabLayout title={t.title} showTeacher={false}>
      <div className="p5gh-page notranslate" translate="no">
        <section className="p5gh-board">
          <h1 translate="no">{t.title}</h1>

          <div className="p5gh-topic" translate="no">{t.topic}</div>

          <div className="p5gh-content">
            <div className="p5gh-toolbar">
              <div className="p5gh-start-wrap">
                <div className="p5gh-start-icon">{"\u25B6"}</div>
                <p translate="no">{t.tapImage}</p>
              </div>
              <div className="p5gh-toolbar-actions">
                <button
                  type="button"
                  className="p5gh-reset"
                  onClick={resetAnswers}
                  disabled={!hasAnswers && !showResults}
                >
                  {t.reset}
                </button>
                <button
                  type="button"
                  className="p5gh-reveal"
                  onClick={revealAnswers}
                  disabled={!hasAnswers}
                >
                  {t.reveal}
                </button>
              </div>
            </div>

            <div className="p5gh-grid">
              {TRAITS.map((trait) => (
                <div key={trait.id} className="p5gh-card">
                  <button
                    type="button"
                    className={`p5gh-choice ${selectedTraits[trait.id] ? "is-selected" : ""}`}
                    onClick={() => toggleTrait(trait.id)}
                  >
                    <div className="p5gh-image-wrap">
                      <img
                        src={`${trait.remoteImg}&v=${IMAGE_VERSION}`}
                        alt={t.traits[trait.id]}
                        className="p5gh-image"
                        style={{ objectPosition: trait.imagePosition }}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(event) => {
                          const stage = event.currentTarget.dataset.fallbackStage || "remote";
                          if (stage === "remote") {
                            event.currentTarget.dataset.fallbackStage = "local";
                            event.currentTarget.src = `${trait.localImg}?v=${IMAGE_VERSION}`;
                            return;
                          }
                          event.currentTarget.src = `/images/p5.png?v=${IMAGE_VERSION}`;
                        }}
                      />
                      {selectedTraits[trait.id] && !showResults ? <div className="p5gh-picked" aria-hidden="true" /> : null}
                      {showResults && selectedTraits[trait.id] ? (
                        <div
                          className={`p5gh-mark is-visible ${
                            trait.inherited ? "" : "is-wrong"
                          }`}
                          aria-hidden="true"
                        >
                          {trait.inherited ? "\u2713" : "\u2717"}
                        </div>
                      ) : null}
                    </div>
                  </button>
                  <p className="p5gh-label notranslate" translate="no">{t.traits[trait.id]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="p5gh-ground">
          <div className="p5gh-lang">
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

          <div className="p5gh-actions">
            <button
              type="button"
              className="p5gh-back"
              onClick={() => navigate("/p5/life/genetics")}
            >
              {t.back}
            </button>
            <button
              type="button"
              className="p5gh-next"
              onClick={() => navigate("/p5/life/genetics/humans/summary")}
            >
              {NEXT_LABEL[lang]}
            </button>
          </div>
        </footer>

        {showResults ? (
          <div className="p5gh-modal-backdrop" onClick={() => setShowResults(false)}>
            <div className="p5gh-modal" onClick={(event) => event.stopPropagation()}>
              <p className="p5gh-summary-score">
                {t.score}: {correctCount}/{TRAITS.length}
              </p>
              {wrongItems.length ? (
                <p className="p5gh-summary-wrong">
                  {t.wrongItems}: {wrongItems.map((trait) => t.traits[trait.id]).join(", ")}
                </p>
              ) : (
                <p className="p5gh-summary-correct">{t.allCorrect}</p>
              )}
              <button type="button" className="p5gh-modal-close" onClick={() => setShowResults(false)}>
                {t.close}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </LabLayout>
  );
}

