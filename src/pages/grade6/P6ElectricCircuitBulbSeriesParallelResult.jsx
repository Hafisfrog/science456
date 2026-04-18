import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const LANGS = [{ id: "th" }, { id: "en" }, { id: "ms" }];

function speakText(text, lang) {
  if (typeof window === "undefined" || !window.speechSynthesis || !text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
  utterance.rate = 0.95;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
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
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-5 pt-3 text-slate-900 md:px-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(110px,10vw,180px)] top-[10px] h-[clamp(96px,10vw,136px)] w-[clamp(60px,6vw,92px)] bg-[#f7bd2b]"
        style={{
          clipPath: "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.15))",
        }}
      />

      <div className="relative z-[1] mx-auto grid h-full w-full max-w-[1380px] grid-rows-[1fr_auto] gap-2">
        <div className="relative grid gap-4 rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] p-[clamp(16px,2vw,24px)] shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <div className="pointer-events-none absolute bottom-[-120px] right-[-100px] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.3),rgba(255,255,255,0))]" />

          <div className="relative z-[1] flex flex-wrap items-center justify-start gap-3">
            <div className="inline-flex w-fit items-center gap-2.5 rounded-full bg-blue-600/20 px-4 py-1.5 text-[clamp(22px,1.6vw,30px)] font-black text-slate-900">
              {t.section}
            </div>
          </div>

          <p className="relative z-[1] m-0 text-[clamp(18px,1.6vw,26px)] font-bold leading-[1.4] text-slate-900">{t.intro}</p>

          <div className="relative z-[1] space-y-3 rounded-[18px] border-4 border-slate-900 bg-[#fdfbf7] p-4 shadow-[0_12px_22px_rgba(0,0,0,0.16)]">
            <div className="flex items-center justify-between gap-3">
              <div className="text-[clamp(18px,1.5vw,24px)] font-black text-slate-900">{t.series.heading}</div>
              <button
                type="button"
                onClick={() => speakText(`${t.series.heading} ${t.series.body}`, lang)}
                aria-label={t.listen}
                title={t.listen}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[22px] shadow-[0_10px_18px_rgba(17,24,39,0.18)] transition hover:scale-105"
              >
                {"\uD83D\uDD0A"}
              </button>
            </div>
            <div className="text-[clamp(16px,1.3vw,22px)] font-semibold text-slate-900">{t.series.body}</div>
          </div>

          <div className="relative z-[1] space-y-3 rounded-[18px] border-4 border-slate-900 bg-[#fdfbf7] p-4 shadow-[0_12px_22px_rgba(0,0,0,0.16)]">
            <div className="flex items-center justify-between gap-3">
              <div className="text-[clamp(18px,1.5vw,24px)] font-black text-slate-900">{t.parallel.heading}</div>
              <button
                type="button"
                onClick={() => speakText(`${t.parallel.heading} ${t.parallel.body}`, lang)}
                aria-label={t.listen}
                title={t.listen}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[22px] shadow-[0_10px_18px_rgba(17,24,39,0.18)] transition hover:scale-105"
              >
                {"\uD83D\uDD0A"}
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
              type="button"
            >
              {t.lang[item.id]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
