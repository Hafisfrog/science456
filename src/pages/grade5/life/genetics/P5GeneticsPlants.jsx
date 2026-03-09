import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";
import { LANG_BUTTON_TEXT, NEXT_LABEL, useP5GeneticsLang } from "./p5GeneticsI18n";
import "./P5GeneticsPlants.css";

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

const TEXT = {
  th: {
    title:
      "\u0e01\u0e32\u0e23\u0e16\u0e48\u0e32\u0e22\u0e17\u0e2d\u0e14\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e17\u0e32\u0e07\u0e1e\u0e31\u0e19\u0e18\u0e38\u0e01\u0e23\u0e23\u0e21\u0e02\u0e2d\u0e07\u0e1e\u0e37\u0e0a",
    parent: "\u0e23\u0e38\u0e48\u0e19\u0e1e\u0e48\u0e2d\u0e41\u0e21\u0e48",
    child: "\u0e23\u0e38\u0e48\u0e19\u0e25\u0e39\u0e01",
    sideText:
      "\u0e22\u0e35\u0e19\u0e04\u0e27\u0e1a\u0e04\u0e38\u0e21\u0e04\u0e27\u0e32\u0e21\u0e2a\u0e39\u0e07\u0e02\u0e2d\u0e07\u0e1e\u0e37\u0e0a\n\u0e21\u0e35 2 \u0e41\u0e2d\u0e25\u0e25\u0e35\u0e25 \u0e04\u0e37\u0e2d",
    badgeA:
      "A \u0e41\u0e17\u0e19\u0e41\u0e2d\u0e25\u0e25\u0e35\u0e25\u0e04\u0e27\u0e32\u0e21\u0e2a\u0e39\u0e07\u0e02\u0e2d\u0e07\u0e1e\u0e37\u0e0a",
    badgeB:
      "a \u0e41\u0e17\u0e19\u0e41\u0e2d\u0e25\u0e25\u0e35\u0e25\u0e04\u0e27\u0e32\u0e21\u0e40\u0e15\u0e35\u0e49\u0e22\u0e02\u0e2d\u0e07\u0e1e\u0e37\u0e0a",
    sideNote:
      "\u0e01\u0e14\u0e17\u0e35\u0e48\u0e27\u0e07\u0e01\u0e25\u0e21\u0e23\u0e38\u0e48\u0e19\u0e25\u0e39\u0e01\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e40\u0e09\u0e25\u0e22\u0e17\u0e35\u0e25\u0e30\u0e15\u0e49\u0e19",
    reset: "\u0e23\u0e35\u0e40\u0e0b\u0e47\u0e15",
    tallAlt: "\u0e1e\u0e37\u0e0a\u0e2a\u0e39\u0e07",
    shortAlt: "\u0e1e\u0e37\u0e0a\u0e40\u0e15\u0e35\u0e49\u0e22",
    childAlt: "\u0e25\u0e39\u0e01\u0e1e\u0e37\u0e0a",
  },
  en: {
    title: "Inheritance of Plant Traits",
    parent: "Parents",
    child: "Offspring",
    sideText: "Plant height is controlled by genes\nwith 2 alleles:",
    badgeA: "A represents tall allele",
    badgeB: "a represents short allele",
    sideNote: "Tap each offspring circle to reveal one by one",
    reset: "Reset",
    tallAlt: "tall plant",
    shortAlt: "short plant",
    childAlt: "offspring plant",
  },
  ms: {
    title: "Pewarisan Ciri Tumbuhan",
    parent: "Induk",
    child: "Anak",
    sideText: "Ketinggian tumbuhan dikawal gen\ndengan 2 alel:",
    badgeA: "A mewakili alel tinggi",
    badgeB: "a mewakili alel rendah",
    sideNote: "Tekan setiap bulatan anak untuk lihat satu demi satu",
    reset: "Set semula",
    tallAlt: "tumbuhan tinggi",
    shortAlt: "tumbuhan rendah",
    childAlt: "anak tumbuhan",
  },
};

export default function P5GeneticsPlants() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const [revealedChildren, setRevealedChildren] = useState(() => seedlings.map(() => false));
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
  const labels = LANG_BUTTON_TEXT[lang];
  const [lineA, lineB] = t.sideText.split("\n");
  const hasRevealed = revealedChildren.some(Boolean);
  const revealChild = (id) => {
    setRevealedChildren((prev) => {
      if (prev[id]) return prev;
      const next = [...prev];
      next[id] = true;
      return next;
    });
  };
  const resetChildren = () => {
    setRevealedChildren(seedlings.map(() => false));
  };

  return (
    <LabLayout title={t.title} showTeacher={false}>
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
                const isRevealed = revealedChildren[seedling.id];
                return (
                  <div key={seedling.id} className="p5gp-child-block">
                    <button
                      type="button"
                      className="p5gp-child-btn"
                      onClick={() => revealChild(seedling.id)}
                      disabled={isRevealed}
                      aria-label={t.sideNote}
                    >
                      <div
                        className={`p5gp-child ${isRevealed ? "is-revealed" : ""}`}
                        ref={(node) => (childRefs.current[seedling.id] = node)}
                      >
                        {isRevealed ? (
                          <img
                            src={seedling.genotype === "Aa" ? plantImages.tall : plantImages.short}
                            alt={t.childAlt}
                            className="p5gp-child-img"
                          />
                        ) : null}
                      </div>
                    </button>
                    <p className="p5gp-child-genotype">{isRevealed ? seedling.genotype : ".........."}</p>
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
              disabled={!hasRevealed}
            >
              {t.reset}
            </button>
            <p className="p5gp-side-note">{t.sideNote}</p>
          </aside>
        </section>

        <footer className="p5gp-ground">
          <div className="p5gp-lang">
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
            <button type="button" className="p5gp-audio" aria-label="audio">
              {"\uD83D\uDD0A"}
            </button>
          </div>

          <button
            type="button"
            className="p5gp-next"
            onClick={() => navigate("/p5/life/genetics/plants/summary")}
          >
            {NEXT_LABEL[lang]}
          </button>
        </footer>
      </div>
    </LabLayout>
  );
}
