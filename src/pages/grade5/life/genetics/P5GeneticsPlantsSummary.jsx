import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";
import { LANG_BUTTON_TEXT, useP5GeneticsLang } from "./p5GeneticsI18n";

const TEXT = {
  th: {
    title: "\u0e2a\u0e23\u0e38\u0e1b\u0e1c\u0e25\u0e01\u0e32\u0e23\u0e17\u0e14\u0e25\u0e2d\u0e07",
    p1: "\u0e08\u0e32\u0e01\u0e01\u0e32\u0e23\u0e17\u0e14\u0e25\u0e2d\u0e07 \u0e1e\u0e1a\u0e27\u0e48\u0e32",
    items: [
      "\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e04\u0e27\u0e32\u0e21\u0e2a\u0e39\u0e07\u0e02\u0e2d\u0e07\u0e1e\u0e37\u0e0a \u0e16\u0e39\u0e01\u0e04\u0e27\u0e1a\u0e04\u0e38\u0e21\u0e14\u0e49\u0e27\u0e22\u0e22\u0e35\u0e19 1 \u0e04\u0e39\u0e48",
      "\u0e22\u0e35\u0e19\u0e21\u0e35 2 \u0e41\u0e1a\u0e1a \u0e04\u0e37\u0e2d",
    ],
    a: "A = \u0e22\u0e35\u0e19\u0e40\u0e14\u0e48\u0e19 \u0e41\u0e2a\u0e14\u0e07\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30 \u0e1e\u0e37\u0e0a\u0e2a\u0e39\u0e07",
    b: "a = \u0e22\u0e35\u0e19\u0e14\u0e49\u0e2d\u0e22 \u0e41\u0e2a\u0e14\u0e07\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30 \u0e1e\u0e37\u0e0a\u0e40\u0e15\u0e35\u0e49\u0e22",
    result:
      "\u0e40\u0e21\u0e37\u0e48\u0e2d\u0e19\u0e33\u0e21\u0e32\u0e1c\u0e2a\u0e21\u0e01\u0e31\u0e19\u0e1e\u0e1a\u0e27\u0e48\u0e32 \u0e1e\u0e37\u0e0a\u0e17\u0e38\u0e01\u0e15\u0e49\u0e19\u0e41\u0e2a\u0e14\u0e07\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e15\u0e49\u0e19\u0e2a\u0e39\u0e07",
    back: "\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a",
    select: "\u0e01\u0e25\u0e31\u0e1a\u0e44\u0e1b\u0e2b\u0e19\u0e49\u0e32\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e01\u0e32\u0e23\u0e17\u0e14\u0e25\u0e2d\u0e07",
  },
  en: {
    title: "Experiment Summary",
    p1: "From the experiment, we found:",
    items: ["Plant height is controlled by one gene pair.", "There are 2 alleles:"],
    a: "A = dominant allele, shows tall trait",
    b: "a = recessive allele, shows short trait",
    result: "When crossed, all offspring showed the tall trait.",
    back: "Back",
    select: "Back to Experiment Selection",
  },
  ms: {
    title: "Rumusan Eksperimen",
    p1: "Daripada eksperimen, didapati:",
    items: ["Ciri ketinggian tumbuhan dikawal oleh satu pasangan gen.", "Terdapat 2 alel:"],
    a: "A = alel dominan, menunjukkan ciri tinggi",
    b: "a = alel resesif, menunjukkan ciri rendah",
    result: "Apabila dikacukkan, semua anak menunjukkan ciri pokok tinggi.",
    back: "Kembali",
    select: "Kembali ke Pilihan Eksperimen",
  },
};

export default function P5GeneticsPlantsSummary() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const labels = LANG_BUTTON_TEXT[lang];
  const t = TEXT[lang];

  return (
    <LabLayout title={t.title} showTeacher={false}>
      <div
        className="relative min-h-full overflow-hidden px-6 pb-24 pt-7"
        style={{
          background: "linear-gradient(180deg, #80c5ee 0%, #a8daf8 26%, #c8e9fb 52%, #d9efd8 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-45"
          style={{
            backgroundImage:
              "radial-gradient(56% 28% at 18% 18%, rgba(255,255,255,0.66) 0%, transparent 72%), radial-gradient(60% 30% at 72% 14%, rgba(255,255,255,0.52) 0%, transparent 74%)",
          }}
        />

        <div
          className="pointer-events-none absolute right-10 top-6 h-28 w-28 rounded-full"
          style={{
            background: "radial-gradient(circle at 34% 34%, #fff9cf 0 32%, #ffe06a 56%, #f7be38 100%)",
            boxShadow: "0 0 28px rgba(255, 224, 112, 0.75), 0 0 84px rgba(255, 214, 89, 0.45)",
          }}
        />

        <div className="pointer-events-none absolute left-[7%] top-[10%] h-16 w-40 rounded-full bg-white/70 blur-[1px]" />
        <div className="pointer-events-none absolute left-[12%] top-[8.8%] h-12 w-24 rounded-full bg-white/75" />
        <div className="pointer-events-none absolute left-[18%] top-[11.2%] h-11 w-24 rounded-full bg-white/70" />

        <div className="pointer-events-none absolute right-[19%] top-[18%] h-16 w-44 rounded-full bg-white/68 blur-[1px]" />
        <div className="pointer-events-none absolute right-[24%] top-[16.6%] h-12 w-24 rounded-full bg-white/74" />
        <div className="pointer-events-none absolute right-[14%] top-[19.2%] h-11 w-24 rounded-full bg-white/68" />

        <div className="pointer-events-none absolute -left-24 bottom-24 h-72 w-[58%] rounded-[50%] bg-emerald-300/28 blur-[2px]" />
        <div className="pointer-events-none absolute right-[-12%] bottom-20 h-80 w-[62%] rounded-[50%] bg-emerald-300/26 blur-[2px]" />
        <div className="pointer-events-none absolute left-[22%] bottom-24 h-56 w-[34%] rounded-[50%] bg-emerald-200/32 blur-[1px]" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-lime-300/85 via-emerald-400 to-emerald-500" />
        <div className="pointer-events-none absolute inset-x-0 bottom-20 h-10 bg-lime-100/35 blur-sm" />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.26) 0 2px, transparent 2px 22px)",
          }}
        />

        <section className="relative z-10 mx-auto max-w-5xl">
          <h1 className="mb-5 text-4xl font-extrabold text-slate-900">{t.title}</h1>

          <div className="rounded-2xl border-4 border-black bg-white/90 p-6 shadow-lg">
            <div className="mb-4 flex justify-center gap-8" aria-hidden="true">
              <span className="h-3 w-24 rounded border-4 border-black bg-white" />
              <span className="h-3 w-24 rounded border-4 border-black bg-white" />
              <span className="h-3 w-24 rounded border-4 border-black bg-white" />
            </div>

            <p className="text-3xl leading-relaxed">{t.p1}</p>
            <ul className="my-3 list-disc pl-8 text-3xl leading-relaxed">
              <li>{t.items[0]}</li>
              <li>{t.items[1]}</li>
            </ul>
            <p className="pl-6 text-3xl leading-relaxed">{"\u2022"} {t.a}</p>
            <p className="pl-6 text-3xl leading-relaxed">{"\u2022"} {t.b}</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{t.result}</p>
          </div>
        </section>

        <footer className="fixed bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-3 max-[1180px]:flex-col max-[1180px]:items-stretch">
          <div className="flex items-center gap-2 rounded-2xl border-2 border-blue-300 bg-white/90 p-2 shadow-md max-[1180px]:justify-center">
            <button
              type="button"
              className={`rounded-full px-4 py-2 font-bold ${lang === "th" ? "bg-blue-500 text-white" : "bg-blue-200 text-cyan-700"}`}
              onClick={() => setLang("th")}
            >
              {labels.th}
            </button>
            <button
              type="button"
              className={`rounded-full px-4 py-2 font-bold ${lang === "en" ? "bg-blue-500 text-white" : "bg-blue-200 text-cyan-700"}`}
              onClick={() => setLang("en")}
            >
              {labels.en}
            </button>
            <button
              type="button"
              className={`rounded-full px-4 py-2 font-bold ${lang === "ms" ? "bg-blue-500 text-white" : "bg-blue-200 text-cyan-700"}`}
              onClick={() => setLang("ms")}
            >
              {labels.ms}
            </button>
            <button type="button" className="rounded-full bg-blue-400 px-4 py-2 text-white" aria-label="audio">
              {"\uD83D\uDD0A"}
            </button>
          </div>

          <div className="flex items-center gap-2 max-[1180px]:flex-wrap max-[1180px]:justify-end">
            <button
              type="button"
              className="rounded-full bg-white/90 px-5 py-2 text-lg font-bold text-slate-900 shadow-md hover:bg-white max-[1180px]:text-base"
              onClick={() => navigate("/p5/life/genetics/plants")}
            >
              {t.back}
            </button>
            <button
              type="button"
              className="rounded-full bg-sky-500 px-5 py-2 text-lg font-bold text-white shadow-md hover:bg-sky-600 max-[1180px]:text-base"
              onClick={() => navigate("/p5/life/genetics")}
            >
              {t.select}
            </button>
          </div>
        </footer>
      </div>
    </LabLayout>
  );
}
