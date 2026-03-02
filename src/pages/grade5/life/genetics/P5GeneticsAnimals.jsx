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
    title: "การถ่ายทอดลักษณะทางพันธุกรรมของแมว",
    parent: "รุ่นพ่อแม่",
    child: "รุ่นลูก",
    geneText: "ยีนควบคุมความสูงของขนมี\n2 แอลลีล คือ",
    badgeA: "A แทนแอลลีลของขนแมวสีดำ",
    badgeB: "a แทนแอลลีลของขนแมวสีขาว",
    sideNote: "กดเลือกลักษณะของลูกแมว",
    blackCatAlt: "แมวดำ",
    whiteCatAlt: "แมวขาว",
    kittenAlt: "ลูกแมวสีดำ",
  },
  en: {
    title: "Inheritance of Cat Fur Traits",
    parent: "Parents",
    child: "Offspring",
    geneText: "The fur trait is controlled by\n2 alleles:",
    badgeA: "A represents black fur allele",
    badgeB: "a represents white fur allele",
    sideNote: "Tap to reveal kitten trait",
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
    sideNote: "Tekan untuk pilih ciri anak kucing",
    blackCatAlt: "kucing hitam",
    whiteCatAlt: "kucing putih",
    kittenAlt: "anak kucing hitam",
  },
};

export default function P5GeneticsAnimals() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const [revealed, setRevealed] = useState(false);
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
        readPoint(alleleRefs.current[0], 0.5, 0.5),
        readPoint(alleleRefs.current[1], 0.5, 0.5),
        readPoint(alleleRefs.current[2], 0.5, 0.5),
        readPoint(alleleRefs.current[3], 0.5, 0.5),
      ];
      const alleleBottom = [
        readPoint(alleleRefs.current[0], 0.5, 0.5),
        readPoint(alleleRefs.current[1], 0.5, 0.5),
        readPoint(alleleRefs.current[2], 0.5, 0.5),
        readPoint(alleleRefs.current[3], 0.5, 0.5),
      ];
      const kitten = [
        readPoint(kittenRefs.current[0], 0.5, 0),
        readPoint(kittenRefs.current[1], 0.5, 0),
        readPoint(kittenRefs.current[2], 0.5, 0),
        readPoint(kittenRefs.current[3], 0.5, 0),
      ];

      if ([...parentGenotype, ...alleleTop, ...alleleBottom, ...kitten].some((point) => !point)) return;

      setLineLayout({
        width: stageRect.width,
        height: stageRect.height,
        parentGenotype,
        alleleTop,
        alleleBottom,
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

  const lineSegments = lineLayout
    ? [
        [shift(lineLayout.parentGenotype[0], 0, 2), shift(lineLayout.alleleTop[0], 0, 0), "red"],
        [shift(lineLayout.parentGenotype[0], 0, 2), shift(lineLayout.alleleTop[1], 0, 0), "red"],
        [shift(lineLayout.parentGenotype[1], 0, 2), shift(lineLayout.alleleTop[2], 0, 0), "yellow"],
        [shift(lineLayout.parentGenotype[1], 0, 2), shift(lineLayout.alleleTop[3], 0, 0), "yellow"],
        [shift(lineLayout.alleleBottom[0], 0, 0), shift(lineLayout.kitten[0], 0, -2), "red"],
        [shift(lineLayout.alleleBottom[0], 0, 0), shift(lineLayout.kitten[1], 0, -2), "red"],
        [shift(lineLayout.alleleBottom[1], 0, 0), shift(lineLayout.kitten[2], 0, -2), "red"],
        [shift(lineLayout.alleleBottom[1], 0, 0), shift(lineLayout.kitten[3], 0, -2), "red"],
        [shift(lineLayout.alleleBottom[2], 0, 0), shift(lineLayout.kitten[0], 0, -2), "yellow"],
        [shift(lineLayout.alleleBottom[2], 0, 0), shift(lineLayout.kitten[2], 0, -2), "yellow"],
        [shift(lineLayout.alleleBottom[3], 0, 0), shift(lineLayout.kitten[1], 0, -2), "yellow"],
        [shift(lineLayout.alleleBottom[3], 0, 0), shift(lineLayout.kitten[3], 0, -2), "yellow"],
      ]
    : [];

  const t = TEXT[lang];
  const labels = LANG_BUTTON_TEXT[lang];

  return (
    <LabLayout title={t.title} showTeacher={false}>
      <div className="p5ga-page">
        <section className="p5ga-board">
          <h1>{t.title}</h1>

          <div className="p5ga-stage" ref={stageRef}>
            <p className="p5ga-level p5ga-level-parent">{t.parent}</p>

            <div className="p5ga-parent-row">
              <div className="p5ga-parent-block">
                <div className="p5ga-cat p5ga-cat-black">
                  <img src={BLACK_CAT_IMG} alt={t.blackCatAlt} className="p5ga-cat-img" />
                </div>
                <p className="p5ga-genotype" ref={(node) => (parentGenotypeRefs.current[0] = node)}>AA</p>
              </div>
              <div className="p5ga-parent-block">
                <div className="p5ga-cat p5ga-cat-white">
                  <img src={WHITE_CAT_IMG} alt={t.whiteCatAlt} className="p5ga-cat-img" />
                </div>
                <p className="p5ga-genotype" ref={(node) => (parentGenotypeRefs.current[1] = node)}>aa</p>
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
                  <line key={`${tone}-${index}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} className={tone} />
                ))}
              </svg>
            ) : null}

            <p className="p5ga-level p5ga-level-child">{t.child}</p>

            <div className="p5ga-kitten-row">
              {kittens.map((kitten) => (
                <div key={kitten.id} className="p5ga-kitten-block">
                  <div className={`p5ga-kitten ${revealed ? "is-revealed" : ""}`} ref={(node) => (kittenRefs.current[kitten.id] = node)}>
                    {revealed ? <img src={BLACK_CAT_IMG} alt={t.kittenAlt} className="p5ga-kitten-img" /> : null}
                  </div>
                  <p className="p5ga-kitten-genotype">{revealed ? kitten.genotype : ".........."}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="p5ga-side">
            <p className="p5ga-side-text">
              {t.geneText.split("\n")[0]}
              <br />
              {t.geneText.split("\n")[1]}
            </p>
            <p className="p5ga-badge badge-a">{t.badgeA}</p>
            <p className="p5ga-badge badge-b">{t.badgeB}</p>

            <button className="p5ga-play" onClick={() => setRevealed(true)} aria-label={t.sideNote}>
              &gt;
            </button>
            <p className="p5ga-side-note">{t.sideNote}</p>
          </aside>
        </section>

        <footer className="p5ga-ground">
          <div className="p5ga-lang">
            <button type="button" className={lang === "th" ? "is-active" : ""} onClick={() => setLang("th")}>
              {labels.th}
            </button>
            <button type="button" className={lang === "en" ? "is-active" : ""} onClick={() => setLang("en")}>
              {labels.en}
            </button>
            <button type="button" className={lang === "ms" ? "is-active" : ""} onClick={() => setLang("ms")}>
              {labels.ms}
            </button>
            <button type="button" className="p5ga-audio">🔊</button>
          </div>

          <button className="p5ga-next" onClick={() => navigate("/p5/life/genetics/animals/summary")}>
            {NEXT_LABEL[lang]}
          </button>
        </footer>
      </div>
    </LabLayout>
  );
}
