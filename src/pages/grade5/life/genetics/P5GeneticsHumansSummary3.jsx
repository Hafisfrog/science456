import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";
import { LANG_BUTTON_TEXT, NEXT_LABEL, useP5GeneticsLang } from "./p5GeneticsI18n";
import "./P5GeneticsHumansSummary3.css";

const FAMILY_MEMBERS = {
  top: [
    {
      id: "grandma-1",
      tone: "blue",
      skin: "#f6d1b1",
      hair: "#d9e1ea",
      shirt: "#5ec0cf",
      hairStyle: "short-soft",
    },
    {
      id: "grandpa-1",
      tone: "blue",
      skin: "#e9b488",
      hair: "#f2f2f2",
      shirt: "#f0a538",
      hairStyle: "short-bald",
    },
    {
      id: "grandma-2",
      tone: "teal",
      skin: "#efbd98",
      hair: "#f7d3b6",
      shirt: "#8fd0df",
      hairStyle: "short-part",
    },
    {
      id: "grandpa-2",
      tone: "teal",
      skin: "#9f623f",
      hair: "#5b371f",
      shirt: "#f3be36",
      hairStyle: "close-crop",
    },
  ],
  middle: [
    {
      id: "mother",
      tone: "blue",
      skin: "#e6b18e",
      hair: "#263655",
      shirt: "#4db8c0",
      hairStyle: "long-wave",
    },
    {
      id: "father",
      tone: "teal",
      skin: "#d79a6e",
      hair: "#3d2d24",
      shirt: "#4f9fd4",
      hairStyle: "short-top",
    },
  ],
  bottom: [
    {
      id: "child-1",
      tone: "blue",
      skin: "#efc79d",
      hair: "#6f4f2c",
      shirt: "#51b7c7",
      hairStyle: "short-kid",
    },
    {
      id: "child-2",
      tone: "teal",
      skin: "#f0b582",
      hair: "#5b3928",
      shirt: "#f59f39",
      hairStyle: "ponytail",
    },
    {
      id: "child-3",
      tone: "gold",
      skin: "#b16b3f",
      hair: "#513122",
      shirt: "#f0b332",
      hairStyle: "curly-kid",
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
    back: "ย้อนกลับ",
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
    back: "Back",
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
    back: "Kembali",
  },
};

export default function P5GeneticsHumansSummary3() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const labels = LANG_BUTTON_TEXT[lang];
  const t = TEXT[lang];

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

              <div className="p5ghs3-family">
                <svg className="p5ghs3-tree-lines" viewBox="0 0 520 440" aria-hidden="true">
                  <path d="M55 84V108" />
                  <path d="M143 84V108" />
                  <path d="M231 84V108" />
                  <path d="M319 84V108" />
                  <path d="M55 108H319" />
                  <path d="M187 108V150" />
                  <path d="M155 150H243" />
                  <path d="M155 150V188" />
                  <path d="M243 150V188" />
                  <path d="M155 262V300" />
                  <path d="M243 262V300" />
                  <path d="M155 300H243" />
                  <path d="M199 300V344" />
                  <path d="M51 344H235" />
                  <path d="M51 344V358" />
                  <path d="M143 344V358" />
                  <path d="M235 344V358" />
                </svg>

                <div className="p5ghs3-generation top">
                  {FAMILY_MEMBERS.top.map((member) => (
                    <span
                      key={member.id}
                      className={`p5ghs3-avatar ${member.tone}`}
                      style={{ "--skin": member.skin, "--hair": member.hair, "--shirt": member.shirt }}
                    >
                      <span className="p5ghs3-avatar-inner">
                        <span className={`p5ghs3-hair ${member.hairStyle}`} />
                        <span className="p5ghs3-head" />
                        <span className="p5ghs3-body" />
                      </span>
                    </span>
                  ))}
                </div>

                <div className="p5ghs3-generation middle">
                  {FAMILY_MEMBERS.middle.map((member) => (
                    <span
                      key={member.id}
                      className={`p5ghs3-avatar ${member.tone}`}
                      style={{ "--skin": member.skin, "--hair": member.hair, "--shirt": member.shirt }}
                    >
                      <span className="p5ghs3-avatar-inner">
                        <span className={`p5ghs3-hair ${member.hairStyle}`} />
                        <span className="p5ghs3-head" />
                        <span className="p5ghs3-body" />
                      </span>
                    </span>
                  ))}
                </div>

                <div className="p5ghs3-generation bottom">
                  {FAMILY_MEMBERS.bottom.map((member) => (
                    <span
                      key={member.id}
                      className={`p5ghs3-avatar ${member.tone}`}
                      style={{ "--skin": member.skin, "--hair": member.hair, "--shirt": member.shirt }}
                    >
                      <span className="p5ghs3-avatar-inner">
                        <span className={`p5ghs3-hair ${member.hairStyle}`} />
                        <span className="p5ghs3-head" />
                        <span className="p5ghs3-body" />
                      </span>
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
              {NEXT_LABEL[lang]}
            </button>
          </div>
        </footer>
      </div>
    </LabLayout>
  );
}
