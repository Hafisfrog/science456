import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import LabLayout from "../../../../components/LabLayout";
import { useP5GeneticsLang } from "./p5GeneticsI18n";
import "./P5GeneticsPlants.css";
import "./p5GeneticsLangShared.css";
import "./P5GeneticsPlantsSummaryOverrides.css";

const TALL_PLANT_IMG = "/images/p5/tall.png";
const SHORT_PLANT_IMG = "/images/p5/short.png";

const removeTreeBackground = (src) =>
  new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(src);
        return;
      }

      ctx.drawImage(image, 0, 0);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = frame.data;

      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const sat = max === 0 ? 0 : (max - min) / max;
        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        const isNeutralLight = luma > 206 && sat < 0.2;
        const isPaleGreen = luma > 188 && sat < 0.26 && g >= r && g >= b - 4;

        if (isNeutralLight || isPaleGreen) {
          const neutralFade = isNeutralLight ? (luma - 198) / 57 : 0;
          const greenFade = isPaleGreen ? (luma - 180) / 75 : 0;
          const fade = Math.max(neutralFade, greenFade);
          const nextAlpha = Math.round(a * (1 - Math.min(1, fade * 1.35)));
          pixels[i + 3] = nextAlpha < 18 ? 0 : nextAlpha;
        }
      }

      ctx.putImageData(frame, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };

    image.onerror = () => resolve(src);
    image.src = src;
  });

const seedlings = [
  { id: 0, genotype: "Aa" },
  { id: 1, genotype: "Aa" },
  { id: 2, genotype: "aa" },
  { id: 3, genotype: "aa" },
];

const GENOTYPE_OPTIONS = ["AA", "Aa", "aa"];

const TEXT = {
  th: {
    title:
      "การถ่ายทอดลักษณะทางพันธุกรรมของพืช",
    parent: "รุ่นพ่อแม่",
    child: "รุ่นลูก",
    sideText:
      "ยีนควบคุมความสูงของพืช\nมี 2 แอลลีล คือ",
    badgeA:
      "A แทนแอลลีลความสูงของพืช",
    badgeB:
      "a แทนแอลลีลความเตี้ยของพืช",
    sideNote:
      "เลือก AA, Aa หรือ aa ให้ลูกพืชแต่ละต้น แล้วกดปุ่มเฉลย",
    reset: "รีเซ็ต",
    resetAria: "รีเซ็ตคำตอบรุ่นลูก",
    reveal: "เฉลย",
    revealAria: "เฉลยคำตอบรุ่นลูก",
    tallAlt: "พืชสูง",
    shortAlt: "พืชเตี้ย",
    childAlt: "ลูกพืช",
    optionAlt: "ตัวเลือกจีนของลูกพืช",
    correct: "ถูก",
    incorrect: "ผิด",
    correctAnswer: "เฉลย",
    noAnswer: "ยังไม่ได้เลือก",
    back: "<< ย้อนกลับ",
  },
  en: {
    title: "Inheritance of Plant Traits",
    parent: "Parents",
    child: "Offspring",
    sideText: "Plant height is controlled by genes\nwith 2 alleles:",
    badgeA: "A represents tall allele",
    badgeB: "a represents short allele",
    sideNote: "Choose AA, Aa, or aa for each plant, then press Reveal",
    reset: "Reset",
    resetAria: "Reset offspring answers",
    reveal: "Reveal",
    revealAria: "Reveal offspring answers",
    tallAlt: "tall plant",
    shortAlt: "short plant",
    childAlt: "offspring plant",
    optionAlt: "offspring genotype option",
    correct: "Correct",
    incorrect: "Incorrect",
    correctAnswer: "Answer",
    noAnswer: "No answer selected",
    back: "<< Back",
  },
  ms: {
    title: "Pewarisan Ciri Tumbuhan",
    parent: "Induk",
    child: "Anak",
    sideText: "Ketinggian tumbuhan dikawal gen\ndengan 2 alel:",
    badgeA: "A mewakili alel tinggi",
    badgeB: "a mewakili alel rendah",
    sideNote: "Pilih AA, Aa, atau aa bagi setiap anak tumbuhan, kemudian tekan Jawapan",
    reset: "Set semula",
    resetAria: "Set semula jawapan anak",
    reveal: "Jawapan",
    revealAria: "Tunjukkan jawapan anak",
    tallAlt: "tumbuhan tinggi",
    shortAlt: "tumbuhan rendah",
    childAlt: "anak tumbuhan",
    optionAlt: "pilihan genotip anak tumbuhan",
    correct: "Betul",
    incorrect: "Salah",
    correctAnswer: "Jawapan",
    noAnswer: "Belum pilih",
    back: "<< Kembali",
  },
};

export default function P5GeneticsPlants() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const [selectedGenotypes, setSelectedGenotypes] = useState(() => seedlings.map(() => ""));
  const [showAnswers, setShowAnswers] = useState(false);
  const [activeSeedlingId, setActiveSeedlingId] = useState(null);
  const [plantImages, setPlantImages] = useState({
    tall: TALL_PLANT_IMG,
    short: SHORT_PLANT_IMG,
  });
  const [lineLayout, setLineLayout] = useState(null);
  const stageRef = useRef(null);
  const parentGenotypeRefs = useRef([]);
  const alleleRefs = useRef([]);
  const childRefs = useRef([]);

  useEffect(() => {
    let isActive = true;
    Promise.all([removeTreeBackground(TALL_PLANT_IMG), removeTreeBackground(SHORT_PLANT_IMG)]).then(
      ([tall, short]) => {
        if (!isActive) return;
        setPlantImages({ tall, short });
      },
    );
    return () => {
      isActive = false;
    };
  }, []);

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
      const allele = [
        readPoint(alleleRefs.current[0]),
        readPoint(alleleRefs.current[1]),
        readPoint(alleleRefs.current[2]),
        readPoint(alleleRefs.current[3]),
      ];
      const child = [
        readPoint(childRefs.current[0], 0.5, 0),
        readPoint(childRefs.current[1], 0.5, 0),
        readPoint(childRefs.current[2], 0.5, 0),
        readPoint(childRefs.current[3], 0.5, 0),
      ];

      if ([...parentGenotype, ...allele, ...child].some((point) => !point)) return;

      setLineLayout({
        width: stageRect.width,
        height: stageRect.height,
        parentGenotype,
        allele,
        child,
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

  const lineSegments = lineLayout
    ? [
        [lineLayout.parentGenotype[0], lineLayout.allele[0], "red"],
        [lineLayout.parentGenotype[0], lineLayout.allele[1], "red"],
        [lineLayout.parentGenotype[1], lineLayout.allele[2], "yellow"],
        [lineLayout.parentGenotype[1], lineLayout.allele[3], "yellow"],
        [lineLayout.allele[0], lineLayout.child[0], "red"],
        [lineLayout.allele[0], lineLayout.child[1], "red"],
        [lineLayout.allele[1], lineLayout.child[2], "red"],
        [lineLayout.allele[1], lineLayout.child[3], "red"],
        [lineLayout.allele[2], lineLayout.child[0], "yellow"],
        [lineLayout.allele[2], lineLayout.child[2], "yellow"],
        [lineLayout.allele[3], lineLayout.child[1], "yellow"],
        [lineLayout.allele[3], lineLayout.child[3], "yellow"],
      ]
    : [];

  const t = TEXT[lang];
  const labels = { th: "ไทย", en: "อังกฤษ", ms: "มลายู" };
  const backLabel = "« ย้อนกลับ";
  const nextLabel = "ต่อไป »";
  const [lineA, lineB] = t.sideText.split("\n");
  const hasSelections = selectedGenotypes.some(Boolean);
  const hasAllSelections = selectedGenotypes.every(Boolean);
  const getGenotypeImage = (genotype) => (genotype === "aa" ? plantImages.short : plantImages.tall);
  const selectGenotype = (id, genotype) => {
    setSelectedGenotypes((prev) => {
      if (prev[id] === genotype) return prev;
      const next = [...prev];
      next[id] = genotype;
      return next;
    });
    setActiveSeedlingId(null);
  };
  const resetChildren = () => {
    setSelectedGenotypes(seedlings.map(() => ""));
    setShowAnswers(false);
    setActiveSeedlingId(null);
  };
  const revealAnswers = () => {
    if (!hasAllSelections) return;
    setShowAnswers(true);
    setActiveSeedlingId(null);
  };

  return (
    <LabLayout title={t.title} showTeacher={false}>
      <HomeButton />

      <div className="p5gp-page">
        <section className="p5gp-board">
          <h1>{t.title}</h1>

          <div ref={stageRef} className="p5gp-stage">
            <p className="p5gp-level p5gp-level-parent">{t.parent}</p>

            <div className="p5gp-parent-row">
              <div className="p5gp-parent-block">
                <div className="p5gp-parent-plant">
                  <img src={plantImages.tall} alt={t.tallAlt} className="p5gp-parent-plant-img is-tall" />
                </div>
                <p ref={(node) => (parentGenotypeRefs.current[0] = node)} className="p5gp-genotype">
                  Aa
                </p>
              </div>
              <div className="p5gp-parent-block">
                <div className="p5gp-parent-plant">
                  <img src={plantImages.short} alt={t.shortAlt} className="p5gp-parent-plant-img is-short" />
                </div>
                <p ref={(node) => (parentGenotypeRefs.current[1] = node)} className="p5gp-genotype">
                  aa
                </p>
              </div>
            </div>

            <div className="p5gp-allele-row">
              <span ref={(node) => (alleleRefs.current[0] = node)}>A</span>
              <span ref={(node) => (alleleRefs.current[1] = node)}>a</span>
              <span ref={(node) => (alleleRefs.current[2] = node)}>a</span>
              <span ref={(node) => (alleleRefs.current[3] = node)}>a</span>
            </div>

            {lineLayout ? (
              <svg
                className="p5gp-lines"
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

            <p className="p5gp-level p5gp-level-child">{t.child}</p>

            <div className="p5gp-child-row">
              {seedlings.map((seedling) => {
                const selectedGenotype = selectedGenotypes[seedling.id];
                const displayedGenotype = showAnswers ? seedling.genotype : selectedGenotype;
                const displayedImage = displayedGenotype ? getGenotypeImage(displayedGenotype) : null;
                const isChooserOpen = activeSeedlingId === seedling.id && !showAnswers;
                const isCorrect = selectedGenotype === seedling.genotype;
                return (
                  <div key={seedling.id} className="p5gp-child-block">
                    <button
                      type="button"
                      className="p5gp-child-trigger"
                      onClick={() => setActiveSeedlingId((prev) => (prev === seedling.id ? null : seedling.id))}
                      disabled={showAnswers}
                    >
                      <div
                        className={`p5gp-child ${displayedImage ? "is-revealed" : ""} ${isChooserOpen ? "is-active" : ""}`}
                        ref={(node) => (childRefs.current[seedling.id] = node)}
                      >
                        {displayedImage ? (
                          <img
                            src={displayedImage}
                            alt={t.childAlt}
                            className="p5gp-child-img"
                          />
                        ) : null}
                      </div>
                    </button>
                    <p className="p5gp-child-genotype">{displayedGenotype || ".........."}</p>
                    {showAnswers ? (
                      <div className={`p5gp-feedback ${isCorrect ? "is-correct" : "is-incorrect"}`}>
                        <p className="p5gp-feedback-status">{isCorrect ? t.correct : t.incorrect}</p>
                        {!isCorrect ? (
                          <p className="p5gp-feedback-answer">
                            {selectedGenotype ? null : `${t.noAnswer} `}
                            {t.correctAnswer}: {seedling.genotype}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                    {isChooserOpen ? (
                      <div className="p5gp-choice-row" role="group" aria-label={t.optionAlt}>
                        {GENOTYPE_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={`p5gp-choice ${selectedGenotype === option ? "is-selected" : ""}`}
                            onClick={() => selectGenotype(seedling.id, option)}
                          >
                            <img src={getGenotypeImage(option)} alt={t.optionAlt} className="p5gp-choice-img" />
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

          <aside className="p5gp-side">
            <p className="p5gp-side-text">
              {lineA}
              <br />
              {lineB}
            </p>
            <p className="p5gp-badge badge-a">{t.badgeA}</p>
            <p className="p5gp-badge badge-b">{t.badgeB}</p>

            <button
              type="button"
              className="p5gp-reset"
              onClick={resetChildren}
              disabled={!hasSelections && !showAnswers}
              aria-label={t.resetAria}
            >
              {t.reset}
            </button>
            <button
              type="button"
              className="p5gp-reveal"
              onClick={revealAnswers}
              disabled={showAnswers || !hasAllSelections}
              aria-label={t.revealAria}
            >
              {t.reveal}
            </button>
            <p className="p5gp-side-note">{t.sideNote}</p>
          </aside>
        </section>

        <footer className="p5gp-ground">
          <div className="p5gps-lang p5gps-lang-p4">
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

          <div className="p5gps-actions p5gp-actions">
            <button
              type="button"
              className="p5gps-back-btn"
              onClick={() => navigate("/p5/life/genetics/plants/skills")}
            >
              {backLabel}
            </button>
            <button
              type="button"
              className="p5gps-next-btn"
              onClick={() => navigate("/p5/life/genetics/plants/summary")}
            >
              {nextLabel}
            </button>
          </div>
        </footer>
      </div>
    </LabLayout>
  );
}

