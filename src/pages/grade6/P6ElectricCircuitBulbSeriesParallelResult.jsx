import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";

const TEXT = {
  th: {
    section: "\u0e2a\u0e23\u0e38\u0e1b\u0e1c\u0e25\u0e01\u0e32\u0e23\u0e17\u0e14\u0e25\u0e2d\u0e07",
    intro:
      "\u0e08\u0e32\u0e01\u0e01\u0e32\u0e23\u0e17\u0e33\u0e01\u0e34\u0e08\u0e01\u0e23\u0e23\u0e21 \u0e1e\u0e1a\u0e27\u0e48\u0e32 \u0e40\u0e21\u0e37\u0e48\u0e2d\u0e15\u0e48\u0e2d\u0e27\u0e07\u0e08\u0e23\u0e44\u0e1f\u0e1f\u0e49\u0e32\u0e41\u0e1a\u0e1a\u0e2d\u0e19\u0e38\u0e01\u0e23\u0e21\u0e41\u0e25\u0e30\u0e41\u0e1a\u0e1a\u0e02\u0e19\u0e32\u0e19 \u0e2b\u0e25\u0e2d\u0e14\u0e44\u0e1f\u0e21\u0e35\u0e01\u0e32\u0e23\u0e17\u0e33\u0e07\u0e32\u0e19\u0e41\u0e15\u0e01\u0e15\u0e48\u0e32\u0e07\u0e01\u0e31\u0e19",
    series: {
      heading: "\u0e01\u0e32\u0e23\u0e15\u0e48\u0e2d\u0e41\u0e1a\u0e1a\u0e2d\u0e19\u0e38\u0e01\u0e23\u0e21",
      body:
        "\u0e40\u0e21\u0e37\u0e48\u0e2d\u0e2b\u0e25\u0e2d\u0e14\u0e44\u0e1f\u0e14\u0e27\u0e07\u0e2b\u0e19\u0e36\u0e48\u0e07\u0e14\u0e31\u0e1a \u0e2b\u0e25\u0e2d\u0e14\u0e44\u0e1f\u0e2d\u0e35\u0e01\u0e14\u0e27\u0e07\u0e08\u0e30\u0e14\u0e31\u0e1a\u0e15\u0e32\u0e21\u0e44\u0e1b\u0e14\u0e49\u0e27\u0e22 \u0e40\u0e1e\u0e23\u0e32\u0e30\u0e27\u0e07\u0e08\u0e23\u0e16\u0e39\u0e01\u0e15\u0e31\u0e14\u0e02\u0e32\u0e14 \u0e01\u0e23\u0e30\u0e41\u0e2a\u0e44\u0e1f\u0e1f\u0e49\u0e32\u0e44\u0e21\u0e48\u0e2a\u0e32\u0e21\u0e32\u0e23\u0e16\u0e44\u0e2b\u0e25\u0e1c\u0e48\u0e32\u0e19\u0e44\u0e14\u0e49\u0e04\u0e23\u0e1a\u0e27\u0e07\u0e08\u0e23",
    },
    parallel: {
      heading: "\u0e01\u0e32\u0e23\u0e15\u0e48\u0e2d\u0e41\u0e1a\u0e1a\u0e02\u0e19\u0e32\u0e19",
      body:
        "\u0e40\u0e21\u0e37\u0e48\u0e2d\u0e2b\u0e25\u0e2d\u0e14\u0e44\u0e1f\u0e14\u0e27\u0e07\u0e2b\u0e19\u0e36\u0e48\u0e07\u0e14\u0e31\u0e1a \u0e2b\u0e25\u0e2d\u0e14\u0e44\u0e1f\u0e2d\u0e35\u0e01\u0e14\u0e27\u0e07\u0e22\u0e31\u0e07\u0e04\u0e07\u0e2a\u0e27\u0e48\u0e32\u0e07\u0e2d\u0e22\u0e39\u0e48 \u0e40\u0e1e\u0e23\u0e32\u0e30\u0e22\u0e31\u0e07\u0e21\u0e35\u0e2d\u0e35\u0e01\u0e40\u0e2a\u0e49\u0e19\u0e17\u0e32\u0e07\u0e2b\u0e19\u0e36\u0e48\u0e07\u0e43\u0e2b\u0e49\u0e01\u0e23\u0e30\u0e41\u0e2a\u0e44\u0e1f\u0e1f\u0e49\u0e32\u0e44\u0e2b\u0e25\u0e1c\u0e48\u0e32\u0e19\u0e44\u0e14\u0e49",
    },
    listen: "\u0e1f\u0e31\u0e07\u0e2a\u0e23\u0e38\u0e1b",
    back: "\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a",
    next: "\u0e15\u0e48\u0e2d\u0e44\u0e1b",
    lang: {
      th: "\u0e44\u0e17\u0e22",
      en: "\u0e2d\u0e31\u0e07\u0e01\u0e24\u0e29",
      ms: "\u0e21\u0e25\u0e32\u0e22\u0e39",
    },
  },
  en: {
    section: "Experiment Summary",
    intro: "From the activity, we found that bulbs work differently in series and parallel circuits.",
    series: {
      heading: "Series connection",
      body: "When one bulb goes out, the other bulb also goes out because the circuit is broken and current cannot flow through the whole circuit.",
    },
    parallel: {
      heading: "Parallel connection",
      body: "When one bulb goes out, the other bulb stays lit because there is still another path for electric current to flow.",
    },
    listen: "Listen",
    back: "Back",
    next: "Next",
    lang: {
      th: "Thai",
      en: "English",
      ms: "Malay",
    },
  },
  ms: {
    section: "Rumusan eksperimen",
    intro: "Daripada aktiviti ini, didapati bahawa mentol berfungsi secara berbeza dalam litar siri dan selari.",
    series: {
      heading: "Sambungan siri",
      body: "Apabila satu mentol padam, mentol yang satu lagi turut padam kerana litar terputus dan arus elektrik tidak dapat mengalir dengan lengkap.",
    },
    parallel: {
      heading: "Sambungan selari",
      body: "Apabila satu mentol padam, mentol yang satu lagi masih menyala kerana masih ada satu lagi laluan untuk arus elektrik mengalir.",
    },
    listen: "Dengar rumusan",
    back: "Kembali",
    next: "Seterusnya",
    lang: {
      th: "Thai",
      en: "Inggeris",
      ms: "Melayu",
    },
  },
};

const LANGS = [
  { id: "th", label: "ไทย" },
  { id: "ms", label: "มลายู" },
  { id: "en", label: "อังกฤษ" },
];

function speakText(text, lang) {
  if (typeof window === "undefined" || !window.speechSynthesis || !text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
  utterance.rate = 0.95;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function Spark({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bg-[#ffc333] ${className}`}
      style={{
        clipPath:
          "polygon(50% 0, 62% 36%, 100% 50%, 62% 64%, 50% 100%, 38% 64%, 0 50%, 38% 36%)",
      }}
    />
  );
}

export default function P6ElectricCircuitBulbSeriesParallelResult() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TEXT[lang] ?? TEXT.th, [lang]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const pageBg = {
    background:
      "radial-gradient(46% 27% at 8% 41%, #cdebf4 0 61%, transparent 62%), radial-gradient(40% 26% at 94% 42%, #cdebf4 0 60%, transparent 61%), radial-gradient(72% 35% at 50% 33%, #f7f0ef 0 63%, transparent 64%), radial-gradient(80% 50% at 50% 75%, #f7f0ef 0 62%, transparent 63%), linear-gradient(180deg, #fbf5f2 0%, #fbf5f2 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-5 pt-8 text-slate-900 md:px-8 md:pt-20"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <HomeButton />

      <div className="pointer-events-none absolute left-[-92px] top-[24%] z-0 h-[310px] w-[255px] rotate-[-10deg] rounded-[52%_52%_46%_46%] border-[7px] border-black bg-[#fff773] shadow-[inset_24px_22px_0_rgba(255,255,255,.48)] max-[900px]:left-[-150px]">
        <div className="absolute bottom-[-38px] left-[40px] h-[70px] w-[82px] rotate-[12deg] rounded-[14px] border-[7px] border-black bg-[#111]" />
        <div className="absolute bottom-[-4px] left-[56px] h-[84px] w-[54px] rotate-[18deg] rounded-[10px] border-[5px] border-black bg-[#fff7a3]" />
        <div className="absolute left-[102px] top-[76px] h-[126px] w-[98px] rounded-[50%] border-[4px] border-slate-500/35" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(70px,14vw,290px)] top-[-20px] z-0 h-[clamp(150px,18vw,270px)] w-[clamp(82px,9vw,150px)] bg-[#ffc84b] max-[700px]:opacity-55"
        style={{
          clipPath:
            "polygon(0 0,44% 0,68% 36%,93% 9%,100% 39%,78% 54%,100% 100%,57% 54%,38% 70%)",
          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.15))",
        }}
      />
      <Spark className="right-[10%] top-[16%] z-0 h-11 w-11 max-[760px]:hidden" />
      <Spark className="right-[22%] top-[17%] z-0 h-12 w-12 max-[760px]:hidden" />
      <Spark className="right-[18%] top-[25%] z-0 h-5 w-5 max-[760px]:hidden" />
      <div className="pointer-events-none absolute left-[6%] bottom-[20%] z-0 text-[92px] leading-none opacity-75 max-[900px]:hidden">
        🧲
      </div>

      <div className="relative z-[1] mx-auto grid h-full w-full max-w-[1380px] grid-rows-[1fr_auto] gap-2">
        <div className="relative grid gap-4 rounded-[30px] border border-[#eadfce] bg-[#fffaf3]/90 p-[clamp(16px,2vw,24px)] shadow-[0_18px_34px_rgba(92,72,49,0.12)] backdrop-blur-[1px]">
          <div className="pointer-events-none absolute bottom-[-120px] right-[-100px] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.3),rgba(255,255,255,0))]" />

          <div className="relative z-[1] flex flex-wrap items-center justify-start gap-3">
            <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#e5d4bd] bg-[#f6efe4] px-5 py-2 text-[clamp(22px,1.6vw,30px)] font-black text-slate-900 shadow-[0_8px_18px_rgba(92,72,49,0.08)]">
              {t.section}
            </div>
          </div>

          <p className="relative z-[1] m-0 text-[clamp(18px,1.6vw,26px)] font-bold leading-[1.4] text-slate-900">{t.intro}</p>

          <div className="relative z-[1] space-y-3 rounded-[18px] border-[3px] border-[#26324a] bg-white/95 p-4 shadow-[0_14px_28px_rgba(92,72,49,0.1)]">
            <div className="flex items-center justify-between gap-3">
              <div className="text-[clamp(18px,1.5vw,24px)] font-black text-slate-900">{t.series.heading}</div>
              <button
                type="button"
                onClick={() => speakText(`${t.series.heading} ${t.series.body}`, lang)}
                aria-label={t.listen}
                title={t.listen}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-2xl text-orange-700 shadow transition hover:scale-105"
              >
                {"🔊"}
              </button>
            </div>
            <div className="text-[clamp(16px,1.3vw,22px)] font-semibold text-slate-900">{t.series.body}</div>
          </div>

          <div className="relative z-[1] space-y-3 rounded-[18px] border-[3px] border-[#26324a] bg-white/95 p-4 shadow-[0_14px_28px_rgba(92,72,49,0.1)]">
            <div className="flex items-center justify-between gap-3">
              <div className="text-[clamp(18px,1.5vw,24px)] font-black text-slate-900">{t.parallel.heading}</div>
              <button
                type="button"
                onClick={() => speakText(`${t.parallel.heading} ${t.parallel.body}`, lang)}
                aria-label={t.listen}
                title={t.listen}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-2xl text-orange-700 shadow transition hover:scale-105"
              >
                {"🔊"}
              </button>
            </div>
            <div className="text-[clamp(16px,1.3vw,22px)] font-semibold text-slate-900">{t.parallel.body}</div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-7 md:right-7">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/summary")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          &laquo; {t.back}
        </button>
        <button
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/electric-circuit/key-summary")}
          type="button"
          aria-label={t.next}
          title={t.next}
        >
          {t.next} &raquo;
        </button>
      </div>

      <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
        <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
          {LANGS.map((item) => (
            <button
              key={item.id}
              onClick={() => setLang(item.id)}
              className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold text-slate-900 transition ${
                lang === item.id
                  ? "bg-[#bfe0ff] text-slate-900"
                  : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
              }`}
              title={item.label}
              type="button"
            >
              <span className="notranslate" translate="no">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
