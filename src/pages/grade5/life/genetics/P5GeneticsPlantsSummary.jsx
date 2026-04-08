import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";
import { LANG_BUTTON_TEXT, useP5GeneticsLang } from "./p5GeneticsI18n";
import "./p5GeneticsLangShared.css";

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
    back: "<< \u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a",
    select: "\u0e15\u0e48\u0e2d\u0e44\u0e1b",
  },
  en: {
    title: "Experiment Summary",
    p1: "From the experiment, we found:",
    items: ["Plant height is controlled by one gene pair.", "There are 2 alleles:"],
    a: "A = dominant allele, shows tall trait",
    b: "a = recessive allele, shows short trait",
    result: "When crossed, all offspring showed the tall trait.",
    back: "<< Back",
    select: "Next",
  },
  ms: {
    title: "Rumusan Eksperimen",
    p1: "Daripada eksperimen, didapati:",
    items: ["Ciri ketinggian tumbuhan dikawal oleh satu pasangan gen.", "Terdapat 2 alel:"],
    a: "A = alel dominan, menunjukkan ciri tinggi",
    b: "a = alel resesif, menunjukkan ciri rendah",
    result: "Apabila dikacukkan, semua anak menunjukkan ciri pokok tinggi.",
    back: "<< Kembali",
    select: "Seterusnya",
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
          <h1 className="mb-5 text-4xl font-extrabold text-slate-900">{t.title}</h1>

          <div className="rounded-[28px] border-4 border-black bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(252,252,248,0.92))] p-6 shadow-[0_18px_34px_rgba(73,88,46,0.18)] backdrop-blur-sm">
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
          <div className="p5gps-lang max-[1180px]:justify-center">
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
          </div>

          <div className="flex items-center gap-2 max-[1180px]:flex-wrap max-[1180px]:justify-end">
            <button
              type="button"
              className="rounded-full px-6 py-[10px] text-lg font-extrabold text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_0_0_2px_rgba(203,213,225,0.88),0_4px_0_rgba(148,163,184,0.55),0_12px_18px_rgba(15,23,42,0.12)] transition duration-150 hover:-translate-y-0.5 hover:brightness-[1.02] max-[1180px]:text-base"
              style={{ background: "linear-gradient(180deg, #ffffff 0%, #f4f7fb 100%)" }}
              onClick={() => navigate("/p5/life/genetics/plants")}
            >
              {t.back}
            </button>
            <button
              type="button"
              className="rounded-full px-6 py-[10px] text-lg font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_0_0_2px_rgba(205,65,56,0.95),0_4px_0_rgba(182,53,46,0.95),0_12px_18px_rgba(172,46,46,0.28)] transition duration-150 hover:-translate-y-0.5 hover:brightness-[1.02] max-[1180px]:text-base"
              style={{ background: "linear-gradient(180deg, #ff766d 0%, #f34f44 55%, #e94239 100%)" }}
              onClick={() => navigate("/p5/life/genetics")}
            >
              <span>{t.select}</span>
              <span className="ml-1 text-[20px] leading-none">&gt;&gt;</span>
            </button>
          </div>
        </footer>
      </div>
    </LabLayout>
  );
}
