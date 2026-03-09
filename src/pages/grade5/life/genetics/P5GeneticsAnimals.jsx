import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";
import { LANG_BUTTON_TEXT, NEXT_LABEL, useP5GeneticsLang } from "./p5GeneticsI18n";
import "./P5GeneticsAnimals.css";

const kittens = Array.from({ length: 4 }, (_, index) => ({
  id: index,
  genotype: "Aa",
}));

const BLACK_CAT_IMG = "/images/p5/cats/black-18.jpg";
const WHITE_CAT_IMG = "/images/p5/cats/white-6.jpg";

const TEXT = {
  th: {
    title:
      "\u0e01\u0e32\u0e23\u0e16\u0e48\u0e32\u0e22\u0e17\u0e2d\u0e14\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e17\u0e32\u0e07\u0e1e\u0e31\u0e19\u0e18\u0e38\u0e01\u0e23\u0e23\u0e21\u0e02\u0e2d\u0e07\u0e41\u0e21\u0e27",
    parent: "\u0e23\u0e38\u0e48\u0e19\u0e1e\u0e48\u0e2d\u0e41\u0e21\u0e48",
    child: "\u0e23\u0e38\u0e48\u0e19\u0e25\u0e39\u0e01",
    geneText:
      "\u0e22\u0e35\u0e19\u0e04\u0e27\u0e1a\u0e04\u0e38\u0e21\u0e2a\u0e35\u0e02\u0e19\u0e02\u0e2d\u0e07\u0e41\u0e21\u0e27\u0e21\u0e35\n2 \u0e41\u0e2d\u0e25\u0e25\u0e35\u0e25 \u0e04\u0e37\u0e2d",
    badgeA:
      "A \u0e41\u0e17\u0e19\u0e41\u0e2d\u0e25\u0e25\u0e35\u0e25\u0e02\u0e2d\u0e07\u0e02\u0e19\u0e41\u0e21\u0e27\u0e2a\u0e35\u0e14\u0e33",
    badgeB:
      "a \u0e41\u0e17\u0e19\u0e41\u0e2d\u0e25\u0e25\u0e35\u0e25\u0e02\u0e2d\u0e07\u0e02\u0e19\u0e41\u0e21\u0e27\u0e2a\u0e35\u0e02\u0e32\u0e27",
    sideNote:
      "\u0e01\u0e14\u0e17\u0e35\u0e48\u0e27\u0e07\u0e01\u0e25\u0e21\u0e23\u0e38\u0e48\u0e19\u0e25\u0e39\u0e01\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e40\u0e09\u0e25\u0e22\u0e17\u0e35\u0e25\u0e30\u0e15\u0e31\u0e27",
    reset: "\u0e23\u0e35\u0e40\u0e0b\u0e47\u0e15",
    resetAria: "\u0e23\u0e35\u0e40\u0e0b\u0e47\u0e15\u0e04\u0e33\u0e15\u0e2d\u0e1a\u0e23\u0e38\u0e48\u0e19\u0e25\u0e39\u0e01",
    blackCatAlt: "\u0e41\u0e21\u0e27\u0e2a\u0e35\u0e14\u0e33",
    whiteCatAlt: "\u0e41\u0e21\u0e27\u0e2a\u0e35\u0e02\u0e32\u0e27",
    kittenAlt: "\u0e25\u0e39\u0e01\u0e41\u0e21\u0e27\u0e2a\u0e35\u0e14\u0e33",
  },
  en: {
    title: "Inheritance of Cat Fur Traits",
    parent: "Parents",
    child: "Offspring",
    geneText: "The fur trait is controlled by\n2 alleles:",
    badgeA: "A represents black fur allele",
    badgeB: "a represents white fur allele",
    sideNote: "Tap each kitten to reveal one trait at a time",
    reset: "Reset",
    resetAria: "Reset offspring answers",
    blackCatAlt: "black cat",
    whiteCatAlt: "white cat",
    kittenAlt: "black kitten",
  },
  ms: {
    title: "Pewarisan Ciri Bulu Kucing",
    parent: "Induk",
    child: "Anak",
    geneText: "Ciri bulu dikawal oleh\n2 alel:",
    badgeA: "A mewakili alel bulu hitam",
    badgeB: "a mewakili alel bulu putih",
    sideNote: "Tekan setiap anak kucing untuk lihat satu demi satu",
    reset: "Set semula",
    resetAria: "Set semula jawapan anak",
    blackCatAlt: "kucing hitam",
    whiteCatAlt: "kucing putih",
    kittenAlt: "anak kucing hitam",
  },
};

export default function P5GeneticsAnimals() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const [revealedKittens, setRevealedKittens] = useState(() => kittens.map(() => false));
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
  const hasRevealed = revealedKittens.some(Boolean);
  const revealKitten = (id) => {
    setRevealedKittens((prev) => {
      if (prev[id]) return prev;
      const next = [...prev];
      next[id] = true;
      return next;
    });
  };
  const resetKittens = () => {
    setRevealedKittens(kittens.map(() => false));
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
  const labels = LANG_BUTTON_TEXT[lang];
  const [lineA, lineB] = t.geneText.split("\n");

  return (
    <LabLayout title={t.title} showTeacher={false}>
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
                const isRevealed = revealedKittens[kitten.id];
                return (
                  <div key={kitten.id} className="p5ga-kitten-block">
                    <button
                      type="button"
                      className="p5ga-kitten-btn"
                      onClick={() => revealKitten(kitten.id)}
                      disabled={isRevealed}
                      aria-label={t.sideNote}
                    >
                      <div
                        className={`p5ga-kitten ${isRevealed ? "is-revealed" : ""}`}
                        ref={(node) => (kittenRefs.current[kitten.id] = node)}
                      >
                        {isRevealed ? <img src={BLACK_CAT_IMG} alt={t.kittenAlt} className="p5ga-kitten-img" /> : null}
                      </div>
                    </button>
                    <p className="p5ga-kitten-genotype">{isRevealed ? kitten.genotype : ".........."}</p>
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
              disabled={!hasRevealed}
              aria-label={t.resetAria}
            >
              {t.reset}
            </button>
            <p className="p5ga-side-note">{t.sideNote}</p>
          </aside>
        </section>

        <footer className="p5ga-ground">
          <div className="p5ga-lang">
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
            <button type="button" className="p5ga-audio" aria-label="audio">
              {"\uD83D\uDD0A"}
            </button>
          </div>

          <button
            type="button"
            className="p5ga-next"
            onClick={() => navigate("/p5/life/genetics/animals/summary")}
          >
            {NEXT_LABEL[lang]}
          </button>
        </footer>
      </div>
    </LabLayout>
  );
}
