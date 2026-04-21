import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";
import { useP5GeneticsLang } from "./p5GeneticsI18n";
import "./p5GeneticsLangShared.css";
import "./P5GeneticsPlantsSummaryOverrides.css";

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
    listen: "\u0e1f\u0e31\u0e07\u0e2a\u0e23\u0e38\u0e1b",
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
    listen: "Listen",
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
    listen: "Dengar rumusan",
    back: "<< Kembali",
    select: "Seterusnya",
  },
};

const LANG_TO_VOICE = {
  th: "th-TH",
  en: "en-US",
  ms: "ms-MY",
};

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = LANG_TO_VOICE[lang] || "th-TH";
  synth.speak(utterance);
}

export default function P5GeneticsPlantsSummary() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const labels = { th: "ไทย", en: "อังกฤษ", ms: "มลายู" };
  const t = TEXT[lang];
  const backLabel = "« ย้อนกลับ";
  const nextLabel = "ต่อไป »";
  const speakSummary = () => {
    speakText([t.p1, ...t.items, t.a, t.b, t.result].join(". "), lang);
  };

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
          <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-slate-900">{t.title}</h1>

          <div className="relative rounded-[30px] border border-emerald-400/90 bg-[linear-gradient(180deg,rgba(187,247,208,0.98)_0%,rgba(220,252,231,0.97)_34%,rgba(255,255,255,0.98)_70%,rgba(255,255,255,0.98)_100%)] px-7 pb-7 pt-6 shadow-[0_22px_40px_rgba(21,128,61,0.22)] backdrop-blur-sm max-[1180px]:px-5 max-[1180px]:pb-5 max-[1180px]:pt-5">
            <button
              type="button"
              className="absolute right-4 top-4 inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border-none bg-[#eff6ff] text-[22px] leading-none text-[#1d4ed8] shadow-[0_8px_16px_rgba(37,99,235,0.18)] transition hover:-translate-y-[1px] hover:bg-[#dbeafe] hover:shadow-[0_10px_18px_rgba(37,99,235,0.22)]"
              aria-label={t.listen}
              title={t.listen}
              onClick={speakSummary}
            >
              {"\uD83D\uDD0A"}
            </button>
            <p className="text-3xl leading-relaxed text-slate-900 max-[1180px]:text-2xl">{t.p1}</p>
            <ul className="my-3 list-disc pl-8 text-3xl leading-relaxed text-slate-900 max-[1180px]:text-2xl">
              <li>{t.items[0]}</li>
              <li>{t.items[1]}</li>
            </ul>
            <p className="pl-6 text-3xl leading-relaxed text-slate-900 max-[1180px]:text-2xl">{"\u2022"} {t.a}</p>
            <p className="pl-6 text-3xl leading-relaxed text-slate-900 max-[1180px]:text-2xl">{"\u2022"} {t.b}</p>
            <p className="mt-3 text-3xl font-extrabold text-slate-900 max-[1180px]:text-2xl">{t.result}</p>
          </div>
        </section>

        <footer className="fixed bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-3 max-[1180px]:flex-col max-[1180px]:items-stretch">
          <div className="p5gps-lang p5gps-lang-p4 max-[1180px]:justify-center">
            <button
              type="button"
              className={lang === "th" ? "is-active" : ""}
              onClick={() => setLang("th")}
            >
              {labels.th}
            </button>
            <button
              type="button"
              className={lang === "ms" ? "is-active" : ""}
              onClick={() => setLang("ms")}
            >
              {labels.ms}
            </button>
            <button
              type="button"
              className={lang === "en" ? "is-active" : ""}
              onClick={() => setLang("en")}
            >
              {labels.en}
            </button>
          </div>

          <div className="p5gps-actions flex items-center gap-2 max-[1180px]:flex-wrap max-[1180px]:justify-end">
            <button
              type="button"
              className="p5gps-back-btn"
              onClick={() => navigate("/p5/life/genetics/plants")}
            >
              {backLabel}
            </button>
            <button
              type="button"
              className="p5gps-next-btn"
              onClick={() => navigate("/p5/life/genetics")}
            >
              {nextLabel}
            </button>
          </div>
        </footer>
      </div>
    </LabLayout>
  );
}
