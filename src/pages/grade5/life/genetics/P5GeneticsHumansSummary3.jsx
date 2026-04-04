import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";
import { LANG_BUTTON_TEXT, useP5GeneticsLang } from "./p5GeneticsI18n";
import "./P5GeneticsHumansSummary3.css";
import "./p5GeneticsLangShared.css";

const FAMILY_TREE_SPRITE = "/images/p5/fam.png";

const FAMILY_MEMBERS = {
  top: [
    {
      id: "grandma-1",
      pos: "0% 0%",
      scale: 1.18,
    },
    {
      id: "grandpa-1",
      pos: "50% 0%",
      scale: 1.16,
    },
    {
      id: "grandma-2",
      pos: "100% 0%",
      scale: 1.18,
    },
    {
      id: "grandpa-2",
      pos: "0% 33.333%",
      scale: 1.18,
    },
  ],
  middle: [
    {
      id: "mother",
      pos: "100% 33.333%",
      scale: 1.22,
    },
    {
      id: "father",
      pos: "50% 33.333%",
      scale: 1.18,
    },
  ],
  bottom: [
    {
      id: "child-1",
      pos: "0% 66.667%",
      scale: 1.22,
    },
    {
      id: "child-2",
      pos: "0% 100%",
      scale: 1.2,
    },
    {
      id: "child-3",
      pos: "50% 100%",
      scale: 1.16,
    },
  ],
};

const ANIMAL_IMAGES = {
  dominant: "/images/p5/cats/black-18.jpg",
  recessive: "/images/p5/cats/white-6.jpg",
};

const PLANT_IMAGES = {
  dominant: "/images/p5/tall.png",
  recessive: "/images/p5/short.png",
};

const TEXT = {
  th: {
    title: "สรุปสาระสำคัญ : ลักษณะทางพันธุกรรม",
    leftTitle: "การถ่ายทอดลักษณะทางมนุษย์",
    leftSub: "ถ่ายทอดจากพ่อแม่สู่ลูก",
    leftBubble: "ลักษณะที่\nถ่ายทอด",
    leftBubbleDesc: "เช่น ลักษณะใบหน้า\nสีผิว รูปร่าง",
    rightTitle: "ลักษณะเด่นและลักษณะด้อย",
    rightSub: "เปรียบเทียบผลลัพธ์ในสัตว์และพืช",
    tableHead1: "สิ่งมีชีวิต",
    tableHead2: "รุ่นลูก (F1)",
    tableHead3: "รุ่นหลาน F2",
    rabbit1: "กระต่ายขนดำ\nลักษณะเด่น",
    rabbit2: "กระต่ายขนขาว\nลักษณะด้อย",
    plant1: "ต้นสูงสีชมพู\nลักษณะเด่น",
    plant2: "ต้นเตี้ยสีชมพู\nลักษณะด้อย",
    f1Text: "เมื่อลักษณะเด่นผสมกับลักษณะด้อย รุ่นลูกจะปรากฏลักษณะเด่นออกมา 100%",
    f2Text: "เมื่อรุ่นลูกผสมกันเอง รุ่นหลานจะปรากฏลักษณะเด่นต่อลักษณะด้อยในอัตราส่วน 3 : 1",
    f1Dom: "แสดงลักษณะเด่นทั้งหมด",
    f2Dom: "แสดงลักษณะเด่น : ด้อย\nในอัตราส่วน 3 : 1",
    back: "<< ย้อนกลับ",
  },
  en: {
    title: "Key Summary: Genetic Traits",
    leftTitle: "Transmission of Human Traits",
    leftSub: "Passed from parents to children",
    leftBubble: "Inherited\nTraits",
    leftBubbleDesc: "For example: face shape,\nskin color, body shape",
    rightTitle: "Dominant and Recessive Traits",
    rightSub: "Compare outcomes in animals and plants",
    tableHead1: "Living Things",
    tableHead2: "Offspring (F1)",
    tableHead3: "Grandchildren F2",
    rabbit1: "Black rabbit\nDominant",
    rabbit2: "White rabbit\nRecessive",
    plant1: "Tall pink plant\nDominant",
    plant2: "Short pink plant\nRecessive",
    f1Text: "When a dominant trait is crossed with a recessive trait, the F1 offspring show the dominant trait 100%.",
    f2Text: "When the F1 generation cross among themselves, the F2 generation shows dominant to recessive traits in a 3:1 ratio.",
    f1Dom: "All show the dominant trait",
    f2Dom: "Dominant : recessive\nratio 3 : 1",
    back: "<< Back",
  },
  ms: {
    title: "Rumusan Utama: Ciri Genetik",
    leftTitle: "Pewarisan Ciri Manusia",
    leftSub: "Diwarisi daripada ibu bapa kepada anak",
    leftBubble: "Ciri yang\nDiwarisi",
    leftBubbleDesc: "Contohnya bentuk muka,\nwarna kulit, bentuk badan",
    rightTitle: "Ciri Dominan dan Resesif",
    rightSub: "Bandingkan hasil pada haiwan dan tumbuhan",
    tableHead1: "Hidupan",
    tableHead2: "Anak (F1)",
    tableHead3: "Cucu F2",
    rabbit1: "Arnab hitam\nDominan",
    rabbit2: "Arnab putih\nResesif",
    plant1: "Pokok tinggi merah jambu\nDominan",
    plant2: "Pokok rendah merah jambu\nResesif",
    f1Text: "Apabila ciri dominan dikacukkan dengan ciri resesif, semua generasi F1 menunjukkan ciri dominan 100%.",
    f2Text: "Apabila generasi F1 dikacukkan sesama sendiri, generasi F2 menunjukkan nisbah dominan kepada resesif 3 : 1.",
    f1Dom: "Semua menunjukkan ciri dominan",
    f2Dom: "Dominan : resesif\nnisbah 3 : 1",
    back: "<< Kembali",
  },
};

export default function P5GeneticsHumansSummary3() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const labels = LANG_BUTTON_TEXT[lang];
  const t = TEXT[lang];
  const familyRef = useRef(null);
  const topRefs = useRef([]);
  const middleRefs = useRef([]);
  const bottomRefs = useRef([]);
  const [treeLines, setTreeLines] = useState([]);
  const selectExperimentsLabel =
    lang === "th"
      ? "กลับไปหน้าเลือกการทดลอง"
      : lang === "ms"
        ? "Kembali ke Pilihan Eksperimen"
        : "Back to Experiment Selection";

  useEffect(() => {
    const familyNode = familyRef.current;
    if (!familyNode) return undefined;

    const readPoint = (node) => {
      if (!node) return null;
      const hostRect = familyNode.getBoundingClientRect();
      const rect = node.getBoundingClientRect();
      return {
        x: rect.left - hostRect.left + rect.width / 2,
        y: rect.top - hostRect.top + rect.height / 2,
        r: rect.width / 2,
      };
    };

    const measure = () => {
      const top = topRefs.current.map(readPoint).filter(Boolean);
      const middle = middleRefs.current.map(readPoint).filter(Boolean);
      const bottom = bottomRefs.current.map(readPoint).filter(Boolean);

      if (top.length !== FAMILY_MEMBERS.top.length || middle.length !== FAMILY_MEMBERS.middle.length || bottom.length !== FAMILY_MEMBERS.bottom.length) {
        return;
      }

      const topRailY = Math.max(...top.map((point) => point.y + point.r)) + 10;
      const topCenterX = (top[0].x + top[top.length - 1].x) / 2;
      const parentUpperRailY = Math.min(...middle.map((point) => point.y - point.r)) - 10;
      const parentLowerRailY = Math.max(...middle.map((point) => point.y + point.r)) + 12;
      const parentCenterX = (middle[0].x + middle[middle.length - 1].x) / 2;
      const childRailY = Math.min(...bottom.map((point) => point.y - point.r)) - 12;

      setTreeLines([
        ...top.flatMap((point) => [{ x1: point.x, y1: point.y + point.r, x2: point.x, y2: topRailY }]),
        { x1: top[0].x, y1: topRailY, x2: top[top.length - 1].x, y2: topRailY },
        { x1: topCenterX, y1: topRailY, x2: topCenterX, y2: parentUpperRailY },
        { x1: middle[0].x, y1: parentUpperRailY, x2: middle[middle.length - 1].x, y2: parentUpperRailY },
        ...middle.flatMap((point) => [
          { x1: point.x, y1: parentUpperRailY, x2: point.x, y2: point.y - point.r },
          { x1: point.x, y1: point.y + point.r, x2: point.x, y2: parentLowerRailY },
        ]),
        { x1: middle[0].x, y1: parentLowerRailY, x2: middle[middle.length - 1].x, y2: parentLowerRailY },
        { x1: parentCenterX, y1: parentLowerRailY, x2: parentCenterX, y2: childRailY },
        { x1: bottom[0].x, y1: childRailY, x2: bottom[bottom.length - 1].x, y2: childRailY },
        ...bottom.flatMap((point) => [{ x1: point.x, y1: childRailY, x2: point.x, y2: point.y - point.r }]),
      ]);
    };

    measure();
    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    resizeObserver?.observe(familyNode);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <LabLayout title={t.title} showTeacher={false}>
      <div className="p5ghs3-page">
        <div className="p5ghs3-sun" aria-hidden="true" />

        <main className="p5ghs3-main">
          <h1>{t.title}</h1>

          <section className="p5ghs3-layout">
            <article className="p5ghs3-left">
              <h2>{t.leftTitle}</h2>
              <p className="p5ghs3-left-sub">{t.leftSub}</p>

              <div ref={familyRef} className="p5ghs3-family">
                <svg className="p5ghs3-tree-lines" viewBox="0 0 520 440" aria-hidden="true">
                  {treeLines.map((line, index) => (
                    <line
                      key={`${line.x1}-${line.y1}-${line.x2}-${line.y2}-${index}`}
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                    />
                  ))}
                </svg>

                <div className="p5ghs3-generation top">
                  {FAMILY_MEMBERS.top.map((member, index) => (
                    <span key={member.id} className="p5ghs3-avatar">
                      <span
                        ref={(node) => (topRefs.current[index] = node)}
                        className="p5ghs3-avatar-image"
                        style={{
                          backgroundImage: `url(${FAMILY_TREE_SPRITE})`,
                          backgroundSize: "300% 400%",
                          backgroundPosition: member.pos,
                          transform: `scale(${member.scale ?? 1.4})`,
                        }}
                      />
                    </span>
                  ))}
                </div>

                <div className="p5ghs3-generation middle">
                  {FAMILY_MEMBERS.middle.map((member, index) => (
                    <span key={member.id} className="p5ghs3-avatar">
                      <span
                        ref={(node) => (middleRefs.current[index] = node)}
                        className="p5ghs3-avatar-image"
                        style={{
                          backgroundImage: `url(${FAMILY_TREE_SPRITE})`,
                          backgroundSize: "300% 400%",
                          backgroundPosition: member.pos,
                          transform: `scale(${member.scale ?? 1.4})`,
                        }}
                      />
                    </span>
                  ))}
                </div>

                <div className="p5ghs3-generation bottom">
                  {FAMILY_MEMBERS.bottom.map((member, index) => (
                    <span key={member.id} className="p5ghs3-avatar">
                      <span
                        ref={(node) => (bottomRefs.current[index] = node)}
                        className="p5ghs3-avatar-image"
                        style={{
                          backgroundImage: `url(${FAMILY_TREE_SPRITE})`,
                          backgroundSize: "300% 400%",
                          backgroundPosition: member.pos,
                          transform: `scale(${member.scale ?? 1.4})`,
                        }}
                      />
                    </span>
                  ))}
                </div>

                <div className="p5ghs3-bubble">
                  <strong>{t.leftBubble}</strong>
                  <span>{t.leftBubbleDesc}</span>
                </div>
              </div>
            </article>

            <article className="p5ghs3-right">
              <h2>{t.rightTitle}</h2>
              <p className="p5ghs3-right-sub">{t.rightSub}</p>

              <div className="p5ghs3-table">
                <div className="head">{t.tableHead1}</div>
                <div className="head">{t.tableHead2}</div>
                <div className="head">{t.tableHead3}</div>

                <div className="cell trio">
                  <div className="mini-pair is-photo">
                    <img src={ANIMAL_IMAGES.dominant} alt="" className="p5ghs3-thumb is-animal" />
                    <img src={ANIMAL_IMAGES.recessive} alt="" className="p5ghs3-thumb is-animal" />
                  </div>
                  <p>{t.rabbit1}</p>
                  <p>{t.rabbit2}</p>
                </div>
                <div className="cell text">{t.f1Text}</div>
                <div className="cell text">{t.f2Text}</div>

                <div className="cell trio">
                  <div className="mini-pair is-photo">
                    <img src={PLANT_IMAGES.dominant} alt="" className="p5ghs3-thumb is-plant" />
                    <img src={PLANT_IMAGES.recessive} alt="" className="p5ghs3-thumb is-plant" />
                  </div>
                  <p>{t.plant1}</p>
                  <p>{t.plant2}</p>
                </div>
                <div className="cell row-icons">
                  <div className="icons is-gallery">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <img key={index} src={ANIMAL_IMAGES.dominant} alt="" className="p5ghs3-mini-thumb is-animal" />
                    ))}
                  </div>
                  <div className="icons plants is-gallery">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <img key={index} src={PLANT_IMAGES.dominant} alt="" className="p5ghs3-mini-thumb is-plant" />
                    ))}
                  </div>
                  <p>{t.f1Dom}</p>
                </div>
                <div className="cell row-icons">
                  <div className="icons is-gallery">
                    {[ANIMAL_IMAGES.dominant, ANIMAL_IMAGES.dominant, ANIMAL_IMAGES.dominant, ANIMAL_IMAGES.dominant, ANIMAL_IMAGES.recessive].map((src, index) => (
                      <img key={index} src={src} alt="" className="p5ghs3-mini-thumb is-animal" />
                    ))}
                  </div>
                  <div className="icons plants is-gallery">
                    {[PLANT_IMAGES.dominant, PLANT_IMAGES.dominant, PLANT_IMAGES.dominant, PLANT_IMAGES.dominant, PLANT_IMAGES.recessive].map((src, index) => (
                      <img key={index} src={src} alt="" className="p5ghs3-mini-thumb is-plant" />
                    ))}
                  </div>
                  <p>{t.f2Dom}</p>
                </div>
              </div>
            </article>
          </section>
        </main>

        <footer className="p5ghs3-ground">
          <div className="p5ghs3-fence left" aria-hidden="true" />
          <div className="p5ghs3-fence right" aria-hidden="true" />

          <div className="p5ghs3-lang">
            <button type="button" className={lang === "th" ? "is-active" : ""} onClick={() => setLang("th")}>
              {labels.th}
            </button>
            <button type="button" className={lang === "en" ? "is-active" : ""} onClick={() => setLang("en")}>
              {labels.en}
            </button>
            <button type="button" className={lang === "ms" ? "is-active" : ""} onClick={() => setLang("ms")}>
              {labels.ms}
            </button>
          </div>

          <div className="p5ghs3-actions">
            <button type="button" className="p5ghs3-back" onClick={() => navigate("/p5/life/genetics/humans/summary-2")}>
              {t.back}
            </button>
            <button type="button" className="p5ghs3-next" onClick={() => navigate("/p5/life/genetics")}>
              {selectExperimentsLabel}
            </button>
          </div>
        </footer>
      </div>
    </LabLayout>
  );
}
