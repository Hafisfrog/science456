import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import LabLayout from "../../../../components/LabLayout";
import { useP5GeneticsLang } from "./p5GeneticsI18n";
import "./P5GeneticsAnimals.css";
import "./p5GeneticsLangShared.css";
import "./P5GeneticsAnimalsSummaryOverrides.css";

const kittens = Array.from({ length: 4 }, (_, index) => ({
  id: index,
  genotype: "Aa",
}));

const GENOTYPE_OPTIONS = ["AA", "Aa", "aa"];

const BLACK_CAT_IMG = "/images/p5/cats/black-18.jpg";
const WHITE_CAT_IMG = "/images/p5/cats/white-6.jpg";

const TEXT = {
  th: {
    title:
      "การถ่ายทอดลักษณะทางพันธุกรรมของแมว",
    parent: "รุ่นพ่อแม่",
    child: "รุ่นลูก",
    geneText:
      "ยีนควบคุมสีขนของแมวมี\n2 แอลลีล คือ",
    badgeA:
      "A แทนแอลลีลของขนแมวสีดำ",
    badgeB:
      "a แทนแอลลีลของขนแมวสีขาว",
    sideNote:
      "เลือก AA, Aa หรือ aa ให้ลูกแมวแต่ละตัว แล้วกดปุ่มเฉลย",
    reset: "รีเซ็ต",
    resetAria: "รีเซ็ตคำตอบรุ่นลูก",
    reveal: "เฉลย",
    revealAria: "เฉลยคำตอบรุ่นลูก",
    blackCatAlt: "แมวสีดำ",
    whiteCatAlt: "แมวสีขาว",
    kittenAlt: "ลูกแมวสีดำ",
    optionAlt: "ตัวเลือกจีนของลูกแมว",
    correct: "ถูก",
    incorrect: "ผิด",
    correctAnswer: "เฉลย",
    noAnswer: "ยังไม่ได้เลือก",
    back: "<< ย้อนกลับ",
  },
  en: {
    title: "Inheritance of Cat Fur Traits",
    parent: "Parents",
    child: "Offspring",
    geneText: "The fur trait is controlled by\n2 alleles:",
    badgeA: "A represents black fur allele",
    badgeB: "a represents white fur allele",
    sideNote: "Choose AA, Aa, or aa for each kitten, then press Reveal",
    reset: "Reset",
    resetAria: "Reset offspring answers",
    reveal: "Reveal",
    revealAria: "Reveal offspring answers",
    blackCatAlt: "black cat",
    whiteCatAlt: "white cat",
    kittenAlt: "black kitten",
    optionAlt: "kitten genotype option",
    correct: "Correct",
    incorrect: "Incorrect",
    correctAnswer: "Answer",
    noAnswer: "No answer selected",
    back: "<< Back",
  },
  ms: {
    title: "Pewarisan Ciri Bulu Kucing",
    parent: "Induk",
    child: "Anak",
    geneText: "Ciri bulu dikawal oleh\n2 alel:",
    badgeA: "A mewakili alel bulu hitam",
    badgeB: "a mewakili alel bulu putih",
    sideNote: "Pilih AA, Aa, atau aa bagi setiap anak kucing, kemudian tekan Jawapan",
    reset: "Set semula",
    resetAria: "Set semula jawapan anak",
    reveal: "Jawapan",
    revealAria: "Tunjukkan jawapan anak",
    blackCatAlt: "kucing hitam",
    whiteCatAlt: "kucing putih",
    kittenAlt: "anak kucing hitam",
    optionAlt: "pilihan genotip anak kucing",
    correct: "Betul",
    incorrect: "Salah",
    correctAnswer: "Jawapan",
    noAnswer: "Belum pilih",
    back: "<< Kembali",
  },
};

export default function P5GeneticsAnimals() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const [selectedGenotypes, setSelectedGenotypes] = useState(() => kittens.map(() => ""));
  const [showAnswers, setShowAnswers] = useState(false);
  const [activeKittenId, setActiveKittenId] = useState(null);
  const [lineLayout, setLineLayout] = useState(null);
  const stageRef = useRef(null);
  const parentGenotypeRefs = useRef([]);
  const alleleRefs = useRef([]);
  const kittenRefs = useRef([]);

  useEffect(() => {
    const stageNode = stageRef.current;
    if (!stageNode) return undefined;

    const readPoint = (node, anchorX = 0.5, anchorY = 0.5) => {
      if (!node) return null;
      const stageRect = stageNode.getBoundingClientRect();
      const rect = node.getBoundingClientRect();
      return {
        x: rect.left - stageRect.left + rect.width * anchorX,
        y: rect.top - stageRect.top + rect.height * anchorY,
      };
    };

    const measure = () => {
      const stageRect = stageNode.getBoundingClientRect();
      const parentGenotype = [
        readPoint(parentGenotypeRefs.current[0], 0.5, 1),
        readPoint(parentGenotypeRefs.current[1], 0.5, 1),
      ];
      const alleleTop = [
        readPoint(alleleRefs.current[0]),
        readPoint(alleleRefs.current[1]),
        readPoint(alleleRefs.current[2]),
        readPoint(alleleRefs.current[3]),
      ];
      const kitten = [
        readPoint(kittenRefs.current[0], 0.5, 0),
        readPoint(kittenRefs.current[1], 0.5, 0),
        readPoint(kittenRefs.current[2], 0.5, 0),
        readPoint(kittenRefs.current[3], 0.5, 0),
      ];

      if ([...parentGenotype, ...alleleTop, ...kitten].some((point) => !point)) return;

      setLineLayout({
        width: stageRect.width,
        height: stageRect.height,
        parentGenotype,
        alleleTop,
        kitten,
      });
    };

    measure();
    const rafId = requestAnimationFrame(measure);
    const timeoutId = setTimeout(measure, 0);
    window.addEventListener("resize", measure);
    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    resizeObserver?.observe(stageNode);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      window.removeEventListener("resize", measure);
      resizeObserver?.disconnect();
    };
  }, []);

  const shift = (point, dx = 0, dy = 0) => ({ x: point.x + dx, y: point.y + dy });
  const hasSelections = selectedGenotypes.some(Boolean);
  const hasAllSelections = selectedGenotypes.every(Boolean);
  const getGenotypeImage = (genotype) => (genotype === "aa" ? WHITE_CAT_IMG : BLACK_CAT_IMG);
  const selectGenotype = (id, genotype) => {
    setSelectedGenotypes((prev) => {
      if (prev[id] === genotype) return prev;
      const next = [...prev];
      next[id] = genotype;
      return next;
    });
    setActiveKittenId(null);
  };
  const resetKittens = () => {
    setSelectedGenotypes(kittens.map(() => ""));
    setShowAnswers(false);
    setActiveKittenId(null);
  };
  const revealAnswers = () => {
    if (!hasAllSelections) return;
    setShowAnswers(true);
    setActiveKittenId(null);
  };

  const lineSegments = lineLayout
    ? [
        [shift(lineLayout.parentGenotype[0], 0, 2), shift(lineLayout.alleleTop[0]), "red"],
        [shift(lineLayout.parentGenotype[0], 0, 2), shift(lineLayout.alleleTop[1]), "red"],
        [shift(lineLayout.parentGenotype[1], 0, 2), shift(lineLayout.alleleTop[2]), "yellow"],
        [shift(lineLayout.parentGenotype[1], 0, 2), shift(lineLayout.alleleTop[3]), "yellow"],
        [shift(lineLayout.alleleTop[0]), shift(lineLayout.kitten[0], 0, -2), "red"],
        [shift(lineLayout.alleleTop[0]), shift(lineLayout.kitten[1], 0, -2), "red"],
        [shift(lineLayout.alleleTop[1]), shift(lineLayout.kitten[2], 0, -2), "red"],
        [shift(lineLayout.alleleTop[1]), shift(lineLayout.kitten[3], 0, -2), "red"],
        [shift(lineLayout.alleleTop[2]), shift(lineLayout.kitten[0], 0, -2), "yellow"],
        [shift(lineLayout.alleleTop[2]), shift(lineLayout.kitten[2], 0, -2), "yellow"],
        [shift(lineLayout.alleleTop[3]), shift(lineLayout.kitten[1], 0, -2), "yellow"],
        [shift(lineLayout.alleleTop[3]), shift(lineLayout.kitten[3], 0, -2), "yellow"],
      ]
    : [];

  const t = TEXT[lang];
  const labels = { th: "ไทย", en: "อังกฤษ", ms: "มลายู" };
  const backLabel = "« ย้อนกลับ";
  const nextLabel = "ต่อไป »";
  const [lineA, lineB] = t.geneText.split("\n");

  return (
    <LabLayout title={t.title} showTeacher={false}>
      <HomeButton />

      <div className="p5ga-page">
        <section className="p5ga-board">
          <h1>{t.title}</h1>

          <div ref={stageRef} className="p5ga-stage">
            <p className="p5ga-level p5ga-level-parent">{t.parent}</p>

            <div className="p5ga-parent-row">
              <div className="p5ga-parent-block">
                <div className="p5ga-cat p5ga-cat-black">
                  <img src={BLACK_CAT_IMG} alt={t.blackCatAlt} className="p5ga-cat-img" />
                </div>
                <p ref={(node) => (parentGenotypeRefs.current[0] = node)} className="p5ga-genotype">
                  AA
                </p>
              </div>
              <div className="p5ga-parent-block">
                <div className="p5ga-cat p5ga-cat-white">
                  <img src={WHITE_CAT_IMG} alt={t.whiteCatAlt} className="p5ga-cat-img" />
                </div>
                <p ref={(node) => (parentGenotypeRefs.current[1] = node)} className="p5ga-genotype">
                  aa
                </p>
              </div>
            </div>

            <div className="p5ga-allele-row">
              <span ref={(node) => (alleleRefs.current[0] = node)}>A</span>
              <span ref={(node) => (alleleRefs.current[1] = node)}>A</span>
              <span ref={(node) => (alleleRefs.current[2] = node)}>a</span>
              <span ref={(node) => (alleleRefs.current[3] = node)}>a</span>
            </div>

            {lineLayout ? (
              <svg
                className="p5ga-lines"
                viewBox={`0 0 ${lineLayout.width} ${lineLayout.height}`}
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {lineSegments.map(([from, to, tone], index) => (
                  <line
                    key={`${tone}-${index}`}
                    className={tone}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                  />
                ))}
              </svg>
            ) : null}

            <p className="p5ga-level p5ga-level-child">{t.child}</p>

            <div className="p5ga-kitten-row">
              {kittens.map((kitten) => {
                const selectedGenotype = selectedGenotypes[kitten.id];
                const displayedGenotype = showAnswers ? kitten.genotype : selectedGenotype;
                const displayedImage = displayedGenotype ? getGenotypeImage(displayedGenotype) : null;
                const isChooserOpen = activeKittenId === kitten.id && !showAnswers;
                const isCorrect = selectedGenotype === kitten.genotype;
                return (
                  <div key={kitten.id} className="p5ga-kitten-block">
                    <button
                      type="button"
                      className="p5ga-kitten-trigger"
                      onClick={() => setActiveKittenId((prev) => (prev === kitten.id ? null : kitten.id))}
                      disabled={showAnswers}
                    >
                      <div
                        className={`p5ga-kitten ${displayedImage ? "is-revealed" : ""} ${isChooserOpen ? "is-active" : ""}`}
                        ref={(node) => (kittenRefs.current[kitten.id] = node)}
                      >
                        {displayedImage ? <img src={displayedImage} alt={t.kittenAlt} className="p5ga-kitten-img" /> : null}
                      </div>
                    </button>
                    <p className="p5ga-kitten-genotype">{displayedGenotype || ".........."}</p>
                    {showAnswers ? (
                      <div className={`p5ga-feedback ${isCorrect ? "is-correct" : "is-incorrect"}`}>
                        <p className="p5ga-feedback-status">{isCorrect ? t.correct : t.incorrect}</p>
                        {!isCorrect ? (
                          <p className="p5ga-feedback-answer">
                            {selectedGenotype ? null : `${t.noAnswer} `}
                            {t.correctAnswer}: {kitten.genotype}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                    {isChooserOpen ? (
                      <div className="p5ga-choice-row" role="group" aria-label={t.optionAlt}>
                        {GENOTYPE_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={`p5ga-choice ${selectedGenotype === option ? "is-selected" : ""}`}
                            onClick={() => selectGenotype(kitten.id, option)}
                          >
                            <img
                              src={getGenotypeImage(option)}
                              alt={t.optionAlt}
                              className="p5ga-choice-img"
                            />
                            <span>{option}</span>
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="p5ga-side">
            <p className="p5ga-side-text">
              {lineA}
              <br />
              {lineB}
            </p>
            <p className="p5ga-badge badge-a">{t.badgeA}</p>
            <p className="p5ga-badge badge-b">{t.badgeB}</p>

            <button
              type="button"
              className="p5ga-reset"
              onClick={resetKittens}
              disabled={!hasSelections && !showAnswers}
              aria-label={t.resetAria}
            >
              {t.reset}
            </button>
            <button
              type="button"
              className="p5ga-reveal"
              onClick={revealAnswers}
              disabled={showAnswers || !hasAllSelections}
              aria-label={t.revealAria}
            >
              {t.reveal}
            </button>
            <p className="p5ga-side-note">{t.sideNote}</p>
          </aside>
        </section>

        <footer className="p5ga-ground">
          <div className="p5gas-lang p5gas-lang-p4">
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

          <div className="p5ga-actions">
            <button
              type="button"
              className="p5ga-back"
              onClick={() => navigate("/p5/life/genetics/animals/skills")}
            >
              {backLabel}
            </button>
            <button
              type="button"
              className="p5ga-next"
              onClick={() => navigate("/p5/life/genetics/animals/summary")}
            >
              {nextLabel}
            </button>
          </div>
        </footer>
      </div>
    </LabLayout>
  );
}

