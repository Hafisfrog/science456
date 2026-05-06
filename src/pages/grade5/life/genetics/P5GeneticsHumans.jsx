import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import LabLayout from "../../../../components/LabLayout";
import { useP5GeneticsLang } from "./p5GeneticsI18n";
import "./P5GeneticsHumans.css";
import "./p5GeneticsLangShared.css";
import "./P5GeneticsHumansSummaryOverrides.css";

const IMAGE_VERSION = "20260327-human-v3";

const TEXT = {
  th: {
    title:
      "การถ่ายทอดลักษณะทางพันธุกรรมของคน",
    topic:
      "ลักษณะทางพันธุกรรมต่าง ๆ ของคน",
    tapImage:
      "คำชี้แจง : ให้นักเรียนเลือกรูปที่เป็นลักษณะทางพันธุกรรมของคน",
    reset: "รีเซ็ต",
    reveal: "เฉลย",
    back: "<< ย้อนกลับ",
    correct: "ถูก",
    incorrect: "ผิด",
    score: "ตอบถูก",
    scoreLabel: "คะแนน",
    selectedLabel: "เลือกแล้ว",
    wrongItems: "ข้อที่ยังผิด",
    unansweredItems: "ข้อที่ยังไม่เลือก",
    allCorrect: "เยี่ยม ตอบถูกครบ",
    close: "ปิด",
    traits: {
      "straight-hair": "ผมตรง",
      "double-eyelid": "ตา 2 ชั้น",
      draw: "ชอบวาดรูป",
      dimple: "มีลักยิ้ม",
      "no-dimple": "ไม่มีลักยิ้ม",
      music: "ชอบเล่นดนตรี",
      "curly-hair": "ผมหยิก",
      green: "ชอบสีเขียว",
      nose: "สันจมูกโด่ง",
      tongue: "ม้วนลิ้นได้",
      sports: "ชอบเล่นกีฬา",
      "single-eyelid": "ตาชั้นเดียว",
    },
  },
  en: {
    title: "Inheritance of Human Traits",
    topic: "Different Human Genetic Traits",
    tapImage: "Select Images",
    reset: "Reset",
    reveal: "Reveal",
    back: "<< Back",
    correct: "Correct",
    incorrect: "Incorrect",
    score: "Score",
    scoreLabel: "Score",
    selectedLabel: "Selected",
    wrongItems: "Incorrect Items",
    unansweredItems: "Unanswered Items",
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
    back: "<< Kembali",
    correct: "Betul",
    incorrect: "Salah",
    score: "Skor",
    scoreLabel: "Skor",
    selectedLabel: "Dipilih",
    wrongItems: "Item yang Salah",
    unansweredItems: "Item Belum Dipilih",
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
    localImg: "/images/p6/pomtrong.jpg",
    remoteImg: "/images/p6/pomtrong.jpg",
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
    localImg: "/images/p6/lakyim.jpg",
    remoteImg: "/images/p6/lakyim.jpg",
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
    localImg: "/images/p6/pomyik.jpg",
    remoteImg: "/images/p6/pomyik.jpg",
    imagePosition: "50% 18%",
    useBgFill: true,
  },
  {
    id: "green",
    inherited: false,
    localImg: "/images/p6/green.jpg",
    remoteImg: "/images/p6/green.jpg",
    imagePosition: "50% 42%",
  },
  {
    id: "nose",
    inherited: true,
    localImg: "/images/p6/sanjamukdong.jpg",
    remoteImg: "/images/p6/sanjamukdong.jpg",
    imagePosition: "50% 46%",
    useBgFill: true,
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
  const [touchedTraits, setTouchedTraits] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const t = TEXT[lang];
  const labels = { th: "ไทย", en: "อังกฤษ", ms: "มลายู" };
  const backLabel = "« ย้อนกลับ";
  const nextLabel = "ต่อไป »";
  const hasAnswers = Object.keys(selectedTraits).length > 0;
  const selectedCount = Object.keys(selectedTraits).length;
  const withVersion = (url) => `${url}${url.includes("?") ? "&" : "?"}v=${IMAGE_VERSION}`;

  const toggleTrait = (traitId) => {
    setTouchedTraits((prev) => ({ ...prev, [traitId]: true }));
    setSelectedTraits((prev) => {
      const next = { ...prev };
      if (next[traitId]) {
        delete next[traitId];
      } else {
        next[traitId] = true;
      }
      return next;
    });
    if (showResults) {
      setShowResults(false);
      setShowSummaryModal(false);
    }
  };

  const resetAnswers = () => {
    setSelectedTraits({});
    setTouchedTraits({});
    setShowResults(false);
    setShowSummaryModal(false);
  };

  const revealAnswers = () => {
    setShowResults(true);
    setShowSummaryModal(true);
  };

  const unansweredItems = showResults
    ? TRAITS.filter((trait) => !touchedTraits[trait.id])
    : [];

  const wrongItems = showResults
    ? TRAITS.filter((trait) => {
        if (!touchedTraits[trait.id]) {
          return false;
        }
        const selected = Boolean(selectedTraits[trait.id]);
        return selected !== trait.inherited;
      })
    : [];

  const correctCount = showResults ? TRAITS.length - wrongItems.length - unansweredItems.length : 0;
  const scoreDisplay = showResults ? `${correctCount}/${TRAITS.length}` : `-/${TRAITS.length}`;

  return (
    <LabLayout title={t.title} showTeacher={false}>
      <HomeButton />

      <div className="p5gh-page notranslate" translate="no">
        <section className="p5gh-board">
          <div className="p5gh-topic" translate="no">{t.topic}</div>
          <div className="p5gh-score-box" aria-live="polite">
            <p className="p5gh-score-main">{t.scoreLabel}: {scoreDisplay}</p>
            <p className="p5gh-score-sub">{t.selectedLabel}: {selectedCount}/{TRAITS.length}</p>
          </div>

          <div className="p5gh-content">
            <p className="p5gh-select-hint" translate="no">
              {t.tapImage}
            </p>

            <div className="p5gh-grid">
              {TRAITS.map((trait) => (
                <div key={trait.id} className="p5gh-card">
                  <button
                    type="button"
                    className={`p5gh-choice ${selectedTraits[trait.id] ? "is-selected" : ""}`}
                    onClick={() => toggleTrait(trait.id)}
                  >
                    <div className="p5gh-image-wrap">
                      {trait.useBgFill ? (
                        <div
                          className="p5gh-image p5gh-image-bgfill"
                          role="img"
                          aria-label={t.traits[trait.id]}
                          style={{
                            backgroundImage: `url("${withVersion(trait.localImg)}")`,
                            backgroundPosition: trait.imagePosition,
                          }}
                        />
                      ) : (
                        <img
                          src={withVersion(trait.remoteImg)}
                          alt={t.traits[trait.id]}
                          className="p5gh-image"
                          style={{ objectPosition: trait.imagePosition }}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(event) => {
                            const stage = event.currentTarget.dataset.fallbackStage || "remote";
                            if (stage === "remote") {
                              event.currentTarget.dataset.fallbackStage = "local";
                              event.currentTarget.src = withVersion(trait.localImg);
                              return;
                            }
                            event.currentTarget.src = withVersion("/images/p5.png");
                          }}
                        />
                      )}
                      {selectedTraits[trait.id] && !showResults ? <div className="p5gh-picked" aria-hidden="true" /> : null}
                      {showResults && selectedTraits[trait.id] ? (
                        <div
                          className={`p5gh-mark is-visible ${
                            trait.inherited ? "" : "is-wrong"
                          }`}
                          aria-hidden="true"
                        >
                          {trait.inherited ? "✓" : "✗"}
                        </div>
                      ) : null}
                    </div>
                  </button>
                  <p className="p5gh-label notranslate" translate="no">{t.traits[trait.id]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p5gh-mid-actions">
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
        </section>

        <footer className="p5gh-ground">
          <div className="p5gh-lang p5gh-lang-p4">
            <button
              type="button"
              className={lang === "th" ? "is-active" : ""}
              onClick={() => setLang("th")}
            >
              {labels.th}
            </button>
            <button
              type="button"
              className={lang === "ms" ? "is-active" : ""}
              onClick={() => setLang("ms")}
            >
              {labels.ms}
            </button>
            <button
              type="button"
              className={lang === "en" ? "is-active" : ""}
              onClick={() => setLang("en")}
            >
              {labels.en}
            </button>
          </div>

          <div className="p5gh-actions">
            <button
              type="button"
              className="p5gh-back p5gh-back-btn"
              onClick={() => navigate("/p5/life/genetics/humans/skills")}
            >
              {backLabel}
            </button>
            <button
              type="button"
              className="p5gh-next p5gh-next-btn"
              onClick={() => navigate("/p5/life/genetics/humans/summary")}
            >
              {nextLabel}
            </button>
          </div>
        </footer>

        {showSummaryModal ? (
          <div className="p5gh-modal-backdrop" onClick={() => setShowSummaryModal(false)}>
            <div className="p5gh-modal" onClick={(event) => event.stopPropagation()}>
              <p className="p5gh-summary-score">
                {t.score}: {correctCount}/{TRAITS.length}
              </p>
              {unansweredItems.length ? (
                <p className="p5gh-summary-wrong">
                  {t.unansweredItems}: {unansweredItems.length}
                </p>
              ) : null}
              {wrongItems.length ? (
                <p className="p5gh-summary-wrong">
                  {t.wrongItems}: {wrongItems.map((trait) => t.traits[trait.id]).join(", ")}
                </p>
              ) : null}
              {!wrongItems.length && !unansweredItems.length ? (
                <p className="p5gh-summary-correct">{t.allCorrect}</p>
              ) : null}
              <button type="button" className="p5gh-modal-close" onClick={() => setShowSummaryModal(false)}>
                {t.close}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </LabLayout>
  );
}


