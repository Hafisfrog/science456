import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";
import { LANG_BUTTON_TEXT, NEXT_LABEL, useP5GeneticsLang } from "./p5GeneticsI18n";
import "./p5GeneticsLangShared.css";

const TEXT = {
  th: {
    title: "สรุปผลการทดลอง",
    back: "<< ย้อนกลับ",
    inheritedTitle: "ลักษณะทางพันธุกรรมของคน",
    inheritedDesc: "เป็นลักษณะที่ถ่ายทอดมาจากพ่อแม่ และติดตัวมาตั้งแต่เกิด เช่น",
    inheritedItems: ["ตา 2 ชั้น", "จมูก", "รูปร่างใบหน้า", "ลักษณะผม (หยิก / ตรง)"],
    learnedTitle: "ลักษณะที่เกิดจากการเรียนรู้",
    learnedDesc: "เป็นลักษณะที่ไม่ได้ถ่ายทอดทางพันธุกรรม แต่เกิดจากการฝึกฝนหรือความชอบ เช่น",
    learnedItems: ["ชอบวาดรูป", "ชอบเล่นดนตรี", "ชอบเล่นกีฬา", "ชอบสีเขียว"],
  },
  en: {
    title: "Experiment Summary",
    back: "<< Back",
    inheritedTitle: "Inherited Human Traits",
    inheritedDesc: "These are traits passed down from parents and present since birth, such as:",
    inheritedItems: ["Double eyelid", "Nose shape", "Face shape", "Hair type (curly / straight)"],
    learnedTitle: "Traits From Learning",
    learnedDesc: "These are traits not inherited genetically, but formed through practice or preference, such as:",
    learnedItems: ["Likes drawing", "Likes music", "Likes sports", "Likes green"],
  },
  ms: {
    title: "Rumusan Eksperimen",
    back: "<< Kembali",
    inheritedTitle: "Ciri Warisan Manusia",
    inheritedDesc: "Ciri ini diwarisi daripada ibu bapa dan ada sejak lahir, contohnya:",
    inheritedItems: ["Mata 2 kelopak", "Bentuk hidung", "Bentuk muka", "Jenis rambut (kerinting / lurus)"],
    learnedTitle: "Ciri Daripada Pembelajaran",
    learnedDesc: "Ciri ini tidak diwarisi secara genetik tetapi terbentuk melalui latihan atau minat, contohnya:",
    learnedItems: ["Suka melukis", "Suka muzik", "Suka bersukan", "Suka warna hijau"],
  },
};

export default function P5GeneticsHumansSummary2() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const labels = LANG_BUTTON_TEXT[lang];
  const t = TEXT[lang];

  return (
    <LabLayout title={t.title} showTeacher={false}>
      <div
        className="relative min-h-full overflow-hidden px-6 pb-24 pt-7 notranslate"
        translate="no"
        style={{
          background:
            "radial-gradient(54% 38% at 50% 22%, rgba(255,255,255,0.88) 0 50%, rgba(255,255,255,0) 72%), radial-gradient(34% 26% at 18% 74%, rgba(146, 196, 126, 0.28) 0 58%, rgba(146, 196, 126, 0) 59%), radial-gradient(36% 28% at 74% 70%, rgba(180, 216, 150, 0.24) 0 58%, rgba(180, 216, 150, 0) 59%), linear-gradient(180deg, #dff1ff 0%, #eef7f0 42%, #e2f0dc 72%, #d6e8c8 100%)",
        }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-[34%] bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.95),rgba(255,255,255,0.35)_46%,transparent_78%)]" />
          <div className="absolute bottom-[-8%] left-[-6%] h-[34%] w-[40%] rounded-[50%] bg-[radial-gradient(circle_at_50%_40%,rgba(162,201,126,0.34),rgba(162,201,126,0.18)_55%,transparent_74%)] blur-[4px]" />
          <div className="absolute bottom-[-10%] right-[-4%] h-[36%] w-[44%] rounded-[50%] bg-[radial-gradient(circle_at_50%_40%,rgba(144,186,118,0.28),rgba(144,186,118,0.14)_55%,transparent_76%)] blur-[4px]" />
          <div className="absolute bottom-[12%] left-[8%] h-[22%] w-[18%] rounded-[50%] bg-[radial-gradient(circle_at_50%_50%,rgba(234,245,214,0.82),rgba(213,231,191,0.15)_72%,transparent_74%)] blur-xl" />
          <div className="absolute bottom-[16%] right-[12%] h-[18%] w-[16%] rounded-[50%] bg-[radial-gradient(circle_at_50%_50%,rgba(239,248,226,0.74),rgba(217,235,196,0.12)_72%,transparent_74%)] blur-xl" />
        </div>

        <section className="relative z-10 mx-auto max-w-6xl">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 max-[1180px]:text-3xl notranslate" translate="no">{t.title}</h1>

          <section className="grid grid-cols-2 gap-6 max-[1180px]:grid-cols-1">
            <article className="relative rounded-[30px] border border-emerald-400/90 bg-[linear-gradient(180deg,rgba(187,247,208,0.98)_0%,rgba(220,252,231,0.97)_34%,rgba(255,255,255,0.98)_70%,rgba(255,255,255,0.98)_100%)] px-7 pb-6 pt-5 shadow-[0_22px_40px_rgba(21,128,61,0.22)] backdrop-blur-sm max-[1180px]:px-5 max-[1180px]:pb-5 max-[1180px]:pt-5">
              <h2 className="mb-2 text-center text-[34px] font-extrabold leading-[1.2] text-slate-900 max-[1180px]:text-[28px] notranslate" translate="no">{t.inheritedTitle}</h2>
              <p className="text-[24px] leading-relaxed text-slate-900 max-[1180px]:text-[20px] notranslate" translate="no">{t.inheritedDesc}</p>
              <ul className="mt-1 pl-6 text-[24px] leading-relaxed text-slate-900 max-[1180px]:text-[20px] notranslate" translate="no">
                {t.inheritedItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="relative rounded-[30px] border border-emerald-400/90 bg-[linear-gradient(180deg,rgba(187,247,208,0.98)_0%,rgba(220,252,231,0.97)_34%,rgba(255,255,255,0.98)_70%,rgba(255,255,255,0.98)_100%)] px-7 pb-6 pt-5 shadow-[0_22px_40px_rgba(21,128,61,0.22)] backdrop-blur-sm max-[1180px]:px-5 max-[1180px]:pb-5 max-[1180px]:pt-5">
              <h2 className="mb-2 text-center text-[34px] font-extrabold leading-[1.2] text-slate-900 max-[1180px]:text-[28px] notranslate" translate="no">{t.learnedTitle}</h2>
              <p className="text-[24px] leading-relaxed text-slate-900 max-[1180px]:text-[20px] notranslate" translate="no">{t.learnedDesc}</p>
              <ul className="mt-1 pl-6 text-[24px] leading-relaxed text-slate-900 max-[1180px]:text-[20px] notranslate" translate="no">
                {t.learnedItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </section>
        </section>

        <footer className="fixed bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-3 max-[1180px]:flex-col max-[1180px]:items-stretch">
          <div className="p5ghs2-lang max-[1180px]:justify-center">
            <button
              type="button"
              className={lang === "th" ? "is-active notranslate" : "notranslate"}
              translate="no"
              onClick={() => setLang("th")}
            >
              {labels.th}
            </button>
            <button
              type="button"
              className={lang === "en" ? "is-active notranslate" : "notranslate"}
              translate="no"
              onClick={() => setLang("en")}
            >
              {labels.en}
            </button>
            <button
              type="button"
              className={lang === "ms" ? "is-active notranslate" : "notranslate"}
              translate="no"
              onClick={() => setLang("ms")}
            >
              {labels.ms}
            </button>
          </div>

          <div className="flex items-center gap-2 max-[1180px]:flex-wrap max-[1180px]:justify-end">
            <button
              type="button"
              className="rounded-full px-6 py-[10px] text-lg font-extrabold text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_0_0_2px_rgba(203,213,225,0.88),0_4px_0_rgba(148,163,184,0.55),0_12px_18px_rgba(15,23,42,0.12)] transition duration-150 hover:-translate-y-0.5 hover:brightness-[1.02] max-[1180px]:text-base notranslate"
              style={{ background: "linear-gradient(180deg, #ffffff 0%, #f4f7fb 100%)" }}
              translate="no"
              onClick={() => navigate("/p5/life/genetics/humans/summary")}
            >
              <span>{t.back}</span>
            </button>
            <button
              type="button"
              className="rounded-full px-6 py-[10px] text-lg font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_0_0_2px_rgba(205,65,56,0.95),0_4px_0_rgba(182,53,46,0.95),0_12px_18px_rgba(172,46,46,0.28)] transition duration-150 hover:-translate-y-0.5 hover:brightness-[1.02] max-[1180px]:text-base notranslate"
              style={{ background: "linear-gradient(180deg, #ff766d 0%, #f34f44 55%, #e94239 100%)" }}
              translate="no"
              onClick={() => navigate("/p5/life/genetics/humans/summary-3")}
            >
              <span>{NEXT_LABEL[lang]}</span>
              <span className="ml-1 text-[20px] leading-none">&gt;&gt;</span>
            </button>
          </div>
        </footer>
      </div>
    </LabLayout>
  );
}
