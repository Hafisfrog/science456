import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4Summarize.css";

export default function P4Summarize() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");

  const assets = useMemo(
    () => ({  
      earth: "/images/p4/log.png",
      scale: "/images/p4/logjang.png",
      // ruler: "/images/p4/logjang.png",
      branchFall: "/images/p4/applong.png",
      cityGround: "/images/p4/logmeng.png",
      massBalance: "/images/p4/loglog.png",
      distanceGravity: "/images/p4/logjaw.png",
    }),
    []
  );

  const content = useMemo(
    () => ({
      th: {
        title: "สรุปสาระสำคัญ : แรงโน้มถ่วงของโลก",
        leftTitle: "ผลของแรงโน้มถ่วง",
        rightTitle: "ปัจจัยที่ส่งผลต่อแรงโน้มถ่วง",
        leftBlocks: [
          {
            title: "ทำให้วัตถุทุกชนิดตกลงสู่พื้นโลกเสมอ",
            body: "เป็นแรงที่ดึงดูดวัตถุต่าง ๆ เข้าหาศูนย์กลางของโลก",
          },
          {
            title: "ทำให้วัตถุมีน้ำหนัก",
            body: "สามารถวัดค่าน้ำหนักของวัตถุได้โดยใช้เครื่องชั่งสปริง",
          },
          {
            title: "ทำให้เราและสิ่งต่าง ๆ อยู่บนพื้นโลกได้",
            body: "ยึดเหนี่ยวทุกสิ่งไม่ให้ลอยหลุดออกไปในอวกาศ",
          },
        ],
        massTitle: "มวลของวัตถุ",
        massBody: "วัตถุที่มีมวลมาก จะมีแรงโน้มถ่วงกระทำมากกว่าวัตถุที่มีมวลน้อย",
        massLeftTop: "มวลมาก",
        massLeftBottom: "แรงโน้มถ่วงมาก",
        massRightTop: "มวลน้อย",
        massRightBottom: "แรงโน้มถ่วงน้อย",
        distanceTitle: "ระยะห่างจากจุดศูนย์กลางของโลก",
        distanceBody: "เมื่อวัตถุอยู่ห่างจากจุดศูนย์กลางโลกมากขึ้น\n แรงโน้มถ่วงจะยิ่งลดลง",
        distanceNear: "ระยะใกล้\nแรงโน้มถ่วงมาก",
        distanceFar: "ระยะไกล\nแรงโน้มถ่วงน้อย",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายูถิ่น",
        back: "ย้อนกลับ",
        next: "จบบทเรียน",
        // listenAll: "ฟังทั้งหมด",
      },
      en: {
        title: "Key Summary: Earth's Gravity",
        leftTitle: "Effects of Gravity",
        rightTitle: "Factors Affecting Gravity",
        leftBlocks: [
          {
            title: "Objects always fall toward Earth",
            body: "Gravity pulls all objects toward the center of Earth.",
          },
          {
            title: "Gravity gives objects weight",
            body: "A spring scale can be used to measure weight.",
          },
          {
            title: "It keeps us and everything on Earth",
            body: "Gravity prevents things from floating away into space.",
          },
        ],
        massTitle: "Mass of an object",
        massBody: "Objects with greater mass experience a stronger gravitational force than objects with less mass.",
        massLeftTop: "More mass",
        massLeftBottom: "More gravity",
        massRightTop: "Less mass",
        massRightBottom: "Less gravity",
        distanceTitle: "Distance from Earth's center",
        distanceBody: "The farther an object is from Earth's center, the weaker gravity becomes.",
        distanceNear: "Near\nStronger gravity",
        distanceFar: "Far\nWeaker gravity",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายูถิ่น",
        back: "Back",
        next: "Next",
        // listenAll: "Listen all",
      },
      ms: {
        title: "กือซีปูแล อีซี เปอติง: แร็ง บูมี ตาเระ บือนอ",
        leftTitle: "ฮาเซ แร็ง ตาเระ บูมี",
        rightTitle: "ซือบะ เฮาะ วี กือแซ ปาดอ แร็ง ตาเระ บือนอ",
        leftBlocks: [
          {
            title: "บูวะ วี ตียะ บือนอ ยาโตะฮ โกะ บูมี เซาะมอ",
            body: "ยาดี แร็ง ตาเระ ตียะ ๆ มาโซะ สารี ปูซัต บูมี",
          },
          {
            title: "บูวะ วี บือนอ ตู บือระ",
            body: "บูเละฮ อูโก บือระ บือนอ ดืองา กูนอ แกโล สปริง",
          },
          {
            title: "บูวะ วี กีตอ ดืองา บือนอ ลา-เอ็ง บูเละฮ ดูโดะ อาตะฮ บูมี",
            body: "ตาเระ ซือมอ บือนอ เตาะเซ วี นาแย นา-อิ โกะ อาตะฮ ลางิ",
          },
        ],
        massTitle: "จีซีม บือนอ",
        massBody: "บือนอ จีซีม บาเยาะ อาดอ ตาเระ บาเยาะ ดารีอาปอ บือนอ เฮาะ อาดอ จีซีม ซีกิ",
        massLeftTop: "จีซีม บือนอ บาเญาะ",
        massLeftBottom: "แร็ง ตาเระ บือนอ บาเญาะ ",
        massRightTop: "จีซีม บือนอ ซีกิ",
        massRightBottom: "แร็ง ตาเระ บือนอ ซีกิ",
        distanceTitle: "ยาเราะ ยา-โอะฮ ดารี ปูซะ บูมี",
        distanceBody: "กาลู บือนอ ดูโดะ ยา-โอะฮ ดารี ปูซะ บูมี บาเญาะ,แร็ง ตาเระ บือนอ เนาะ กูแร ซีกิ",
        distanceNear: "ยาเราะ เดอกัต\nแฆง ตาแฆะ บือนอ บาญอ",
        distanceFar: "ยาเราะ ยา-โอะฮ\nแร็ง ตาเระ บือนอ ซีกิ",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายูถิ่น",
        back: "ฮูโนกือเละ",
        next: "ตือรุฮ",
        // listenAll: "Dengar semua",
      },
    }),
    []
  );

  const t = content[lang];

  return (
    <div className="p4sum-page">
      <div className="p4sum-bgShapes" />

      <div className="p4sum-wrap">
        <h1 className="p4sum-title">{t.title}</h1>

        <div className="p4sum-stage">
          <section className="p4sum-side p4sum-side-left">
            <div className="p4sum-badge">{t.leftTitle}</div>

            <article className="p4sum-feature">
              <div className="p4sum-branch">
                <img src={assets.branchFall} alt="" className="p4sum-branchImage" />
              </div>
              <div className="p4sum-copy">
                <h2>{t.leftBlocks[0].title}</h2>
                <p>{t.leftBlocks[0].body}</p>
              </div>
            </article>

            <article className="p4sum-mini p4sum-mini-scale">
              <div className="p4sum-miniMedia">
                <img src={assets.scale} alt="" className="p4sum-scaleImage" />
              </div>
              <div className="p4sum-copy">
                <h3>{t.leftBlocks[1].title}</h3>
                <p>{t.leftBlocks[1].body}</p>
              </div>
            </article>

            <article className="p4sum-mini p4sum-mini-ground">
              <div className="p4sum-miniMedia">
                <img src={assets.cityGround} alt="" className="p4sum-groundImage" />
              </div>
              <div className="p4sum-copy">
                <h3>{t.leftBlocks[2].title}</h3>
                <p>{t.leftBlocks[2].body}</p>
              </div>
            </article>
          </section>

          <section className="p4sum-center">
            <div className="p4sum-earthShell">
              <img src={assets.earth} alt="Earth" className="p4sum-earth" />
            </div>
          </section>

          <section className="p4sum-side p4sum-side-right">
            <div className="p4sum-badge p4sum-badge-right">{t.rightTitle}</div>

            <article className="p4sum-mass">
              <div className="p4sum-copy p4sum-copy-right">
                <h2>{t.massTitle}</h2>
                <p>{t.massBody}</p>
              </div>

              <div className="p4sum-massDiagram">
                <div className="p4sum-massLabel p4sum-massLabel-left">
                  <strong>{t.massLeftTop}</strong>
                  <span>{t.massLeftBottom}</span>
                </div>
                <img src={assets.massBalance} alt="" className="p4sum-massVisual" />
                <div className="p4sum-massLabel p4sum-massLabel-right">
                  <strong>{t.massRightTop}</strong>
                  <span>{t.massRightBottom}</span>
                </div>
              </div>
            </article>

            <article className="p4sum-distance">
              <div className="p4sum-copy p4sum-copy-right">
                <h3>{t.distanceTitle}</h3>
                <p>{t.distanceBody}</p>
              </div>

              <div className="p4sum-distanceDiagram">
                <div className="p4sum-distanceMeta p4sum-distanceMeta-top">{t.distanceFar}</div>
                <img src={assets.distanceGravity} alt="" className="p4sum-distanceVisual" />
                <div className="p4sum-distanceMeta p4sum-distanceMeta-bottom">{t.distanceNear}</div>
              </div>
            </article>
          </section>
        </div>
      </div>

      <div className="fixed bottom-[18px] left-[18px] z-[30] flex items-center gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_18px_40px_rgba(0,0,0,.22)] backdrop-blur-sm max-[720px]:bottom-[12px] max-[720px]:left-[12px] max-[720px]:gap-[6px] max-[720px]:rounded-[12px] max-[720px]:p-[7px]">
        <button
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition ${
            lang === "th"
              ? "bg-[#bfe0ff] text-slate-900"
              : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
          } max-[720px]:rounded-[10px] max-[720px]:px-[10px] max-[720px]:py-[8px] max-[720px]:text-[13px]`}
          type="button"
          onClick={() => setLang("th")}
        >
          {t.chipTh}
        </button>
        <button
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition ${
            lang === "ms"
              ? "bg-[#bfe0ff] text-slate-900"
              : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
          } max-[720px]:rounded-[10px] max-[720px]:px-[10px] max-[720px]:py-[8px] max-[720px]:text-[13px]`}
          type="button"
          onClick={() => setLang("ms")}
        >
          {t.chipMs}
        </button>
        <button
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition ${
            lang === "en"
              ? "bg-[#bfe0ff] text-slate-900"
              : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
          } max-[720px]:rounded-[10px] max-[720px]:px-[10px] max-[720px]:py-[8px] max-[720px]:text-[13px]`}
          type="button"
          onClick={() => setLang("en")}
        >
          {t.chipEn}
        </button>
      </div>

      <div className="fixed bottom-[18px] right-[18px] z-[30] flex items-center gap-3 max-[720px]:bottom-[12px] max-[720px]:right-[12px] max-[720px]:gap-2">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[10px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          type="button"
          onClick={() => navigate(-1)}
        >
          « {t.back}
        </button>
        <button
          className="rounded-[18px] bg-[linear-gradient(135deg,#ef4444,#b91c1c)] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[12px] max-[720px]:px-[12px] max-[720px]:py-[10px] max-[720px]:text-[15px]"
          type="button"
          onClick={() => navigate("/p4")}
        >
          {t.next} »
        </button>
      </div>
    </div>
  );
}
