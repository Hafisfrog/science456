import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GRADE6_LANG_BAR_CLASS, grade6LangButtonClass } from "./grade6LangStyles";

const LANGUAGES = [
  { key: "th", label: "ไทย" },
  { key: "en", label: "English" },
  { key: "ms", label: "Melayu" },
];

const EXPERIMENTS = [
  {
    id: "exp-1",
    title: {
      th: "การทดลองที่ 7",
      en: "Experiment 7",
      ms: "Eksperimen 7",
    },
    subtitle: {
      th: "การเกิดแรงไฟฟ้า",
      en: "Generating Electric Force",
      ms: "Penghasilan Daya Elektrik",
    },
    image: "/images/p6/home/electric-force-card.png",
    path: "/p6/experiment/electric-generation/materials?from=unit",
  },
  {
    id: "exp-2",
    title: {
      th: "การทดลองที่ 8",
      en: "Experiment 8",
      ms: "Eksperimen 8",
    },
    subtitle: {
      th: "ผลของแรงไฟฟ้า",
      en: "Effects of Electric Force",
      ms: "Kesan Daya Elektrik",
    },
    image: "/images/p6/home/electric-force-effect-card.png",
    path: "/p6/experiment/electric-force-effect",
  },
];

const PAGE_COPY = {
  th: {
    title: "แรงไฟฟ้าน่ารู้",
    subtitle: "เลือกการทดลอง",
    backLabel: "ย้อนกลับ",
    languageLabel: "เลือกภาษา",
  },
  en: {
    title: "Electric Force",
    subtitle: "Choose an Experiment",
    backLabel: "Back",
    languageLabel: "Choose language",
  },
  ms: {
    title: "Daya Elektrik",
    subtitle: "Pilih Eksperimen",
    backLabel: "Kembali",
    languageLabel: "Pilih bahasa",
  },
};

export default function Grade6() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const backPath = "/p6/electric-force/vocab";
  const copy = PAGE_COPY[language];
  const langLabels = {
    th: { th: "ไทย", en: "English", ms: "Melayu" },
    en: { th: "Thai", en: "English", ms: "Melayu" },
    ms: { th: "Thai", en: "English", ms: "Melayu" },
  }[language];

  const pageBg = {
    background:
      "radial-gradient(80% 60% at 50% 34%, #f6efef 0 62%, transparent 63%), radial-gradient(31% 24% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(31% 24% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="relative h-[100svh] overflow-hidden px-4 pb-6 pt-7 text-center text-slate-900 md:px-6 md:pb-8 md:pt-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(120px,11vw,190px)] top-3 h-[clamp(108px,11vw,150px)] w-[clamp(70px,7vw,102px)] bg-[#f7bd2b]"
        style={{
          clipPath:
            "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[170px] bg-[linear-gradient(180deg,rgba(199,227,242,0),rgba(190,217,233,0.72))]"
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-col">
        <h1 className="m-0 text-4xl font-extrabold text-blue-600 md:text-[72px]">
          {copy.title}
        </h1>
        <p className="mt-2 text-lg text-slate-700 md:text-[45px]">{copy.subtitle}</p>

        <section className="mx-auto mt-2 flex w-full flex-1 items-center justify-center">
          <div className="grid w-full max-w-[1120px] grid-cols-1 justify-items-center gap-8 lg:translate-x-4 lg:grid-cols-2 xl:translate-x-5">
            {EXPERIMENTS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.path)}
                className="group flex h-[430px] w-[520px] max-w-[92vw] flex-col overflow-hidden rounded-[30px] bg-white/95 text-left shadow-[0_14px_30px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.2)]"
              >
                <div className="flex h-[260px] items-center justify-center overflow-hidden bg-slate-200">
                  <img
                    src={item.image}
                    alt={item.subtitle[language]}
                    className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 px-5 pb-5 pt-4 text-center">
                  <div className="text-[clamp(18px,1.8vw,30px)] font-extrabold leading-[1.12] text-slate-900">
                    {item.title[language]}
                  </div>
                  <div className="mt-2 text-sm text-slate-700 md:text-base">
                    {item.subtitle[language]}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className={`fixed bottom-3 left-3 z-20 md:bottom-6 md:left-6 ${GRADE6_LANG_BAR_CLASS}`}>
        <div className="flex items-center gap-2" role="group" aria-label={copy.languageLabel}>
          {LANGUAGES.map((option) => {
            const isActive = option.key === language;

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setLanguage(option.key)}
                className={grade6LangButtonClass(isActive)}
                aria-pressed={isActive}
                title={option.key === "th" ? langLabels.th : option.key === "en" ? langLabels.en : langLabels.ms}
              >
                {option.key === "th" ? langLabels.th : option.key === "en" ? langLabels.en : langLabels.ms}
              </button>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-3 right-3 z-20 flex items-center md:bottom-6 md:right-6">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-slate-700 shadow-[0_12px_26px_rgba(23,34,49,0.2)] transition hover:-translate-y-0.5"
          type="button"
          onClick={() => navigate(backPath)}
          aria-label={copy.backLabel}
          title={copy.backLabel}
        >
          <span className="text-2xl leading-none">&lt;&lt;</span>
          <span className="text-sm font-bold leading-none">{copy.backLabel}</span>
        </button>
      </div>
    </div>
  );
}
