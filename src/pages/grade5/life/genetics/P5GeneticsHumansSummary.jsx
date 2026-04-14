import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";
import { useP5GeneticsLang } from "./p5GeneticsI18n";
import "./p5GeneticsLangShared.css";
import "./P5GeneticsHumansSummaryOverrides.css";

const TEXT = {
  th: {
    title: "สรุปผลการทดลอง",
    summary:
      "จากภาพการทดลอง พบว่า\nลักษณะของคนแบ่งออกได้เป็น 2 ประเภท คือ\n1. ลักษณะทางพันธุกรรม\n2. ลักษณะที่เกิดจากการเรียนรู้หรือความชอบส่วนตัว",
    back: "<< ย้อนกลับ",
  },
  en: {
    title: "Experiment Summary",
    summary:
      "From the experiment, human traits can be grouped into 2 types:\n1. Inherited traits\n2. Traits formed by learning or personal preference",
    back: "<< Back",
  },
  ms: {
    title: "Rumusan Eksperimen",
    summary:
      "Daripada eksperimen, ciri manusia boleh dibahagikan kepada 2 jenis:\n1. Ciri warisan\n2. Ciri yang terbentuk melalui pembelajaran atau minat peribadi",
    back: "<< Kembali",
  },
};

export default function P5GeneticsHumansSummary() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const labels = { th: "ไทย", en: "อังกฤษ", ms: "มลายู" };
  const t = TEXT[lang];
  const backLabel = "« ย้อนกลับ";
  const nextLabel = "ต่อไป »";

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

        <section className="relative z-10 mx-auto max-w-5xl">
          <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-slate-900 notranslate" translate="no">{t.title}</h1>

          <div className="relative rounded-[30px] border border-emerald-400/90 bg-[linear-gradient(180deg,rgba(187,247,208,0.98)_0%,rgba(220,252,231,0.97)_34%,rgba(255,255,255,0.98)_70%,rgba(255,255,255,0.98)_100%)] px-7 pb-7 pt-6 shadow-[0_22px_40px_rgba(21,128,61,0.22)] backdrop-blur-sm max-[1180px]:px-5 max-[1180px]:pb-5 max-[1180px]:pt-5">
            <p className="whitespace-pre-line text-3xl leading-relaxed text-slate-900 max-[1180px]:text-2xl notranslate" translate="no">
              {t.summary}
            </p>
          </div>
        </section>

        <footer className="fixed bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-3 max-[1180px]:flex-col max-[1180px]:items-stretch">
          <div className="p5ghs-lang p5ghs-lang-p4 max-[1180px]:justify-center">
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
            <button type="button" className="p5ghs-back-btn notranslate" translate="no" onClick={() => navigate("/p5/life/genetics/humans")}>
              <span>{backLabel}</span>
            </button>
            <button
              type="button"
              className="p5ghs-next-btn notranslate"
              translate="no"
              onClick={() => navigate("/p5/life/genetics/humans/summary-2")}
            >
              <span>{nextLabel}</span>
            </button>
          </div>
        </footer>
      </div>
    </LabLayout>
  );
}
