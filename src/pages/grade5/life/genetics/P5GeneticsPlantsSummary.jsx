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
          background:
            "radial-gradient(38% 34% at 24% 66%, rgba(167, 207, 150, 0.2) 0 58%, transparent 59%), radial-gradient(38% 34% at 66% 62%, rgba(167, 207, 150, 0.16) 0 58%, transparent 59%), linear-gradient(180deg, #f4f7f1 0%, #eef4ec 100%)",
        }}
      >
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
          <div
            className="flex items-center gap-2 rounded-[22px] border-2 bg-white/95 p-[6px_8px] shadow-[0_10px_24px_rgba(75,123,92,0.18)] max-[1180px]:justify-center"
            style={{ borderColor: "#bfe5c9" }}
          >
            <button
              type="button"
              className="rounded-full px-[18px] py-2 text-base font-extrabold transition duration-150 hover:-translate-y-px"
              style={
                lang === "th"
                  ? {
                      color: "#fff",
                      background: "linear-gradient(180deg, #12c06d 0%, #06a85d 100%)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.24), 0 8px 16px rgba(6,168,93,0.28)",
                    }
                  : {
                      color: "#0f6c5c",
                      background: "linear-gradient(180deg, #eefaf2 0%, #e5f5ea 100%)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
                    }
              }
              onClick={() => setLang("th")}
            >
              {labels.th}
            </button>
            <button
              type="button"
              className="rounded-full px-[18px] py-2 text-base font-extrabold transition duration-150 hover:-translate-y-px"
              style={
                lang === "en"
                  ? {
                      color: "#fff",
                      background: "linear-gradient(180deg, #12c06d 0%, #06a85d 100%)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.24), 0 8px 16px rgba(6,168,93,0.28)",
                    }
                  : {
                      color: "#0f6c5c",
                      background: "linear-gradient(180deg, #eefaf2 0%, #e5f5ea 100%)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
                    }
              }
              onClick={() => setLang("en")}
            >
              {labels.en}
            </button>
            <button
              type="button"
              className="rounded-full px-[18px] py-2 text-base font-extrabold transition duration-150 hover:-translate-y-px"
              style={
                lang === "ms"
                  ? {
                      color: "#fff",
                      background: "linear-gradient(180deg, #12c06d 0%, #06a85d 100%)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.24), 0 8px 16px rgba(6,168,93,0.28)",
                    }
                  : {
                      color: "#0f6c5c",
                      background: "linear-gradient(180deg, #eefaf2 0%, #e5f5ea 100%)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
                    }
              }
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
              {t.select}
            </button>
          </div>
        </footer>
      </div>
    </LabLayout>
  );
}
