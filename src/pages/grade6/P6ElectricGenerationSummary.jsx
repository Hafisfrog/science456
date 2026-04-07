import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const COMPLETED_TRIALS_KEY = "p6_electric_generation_completed_trials";

const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย" },
  { id: "en", label: "English" },
  { id: "ms", label: "Melayu" },
];

const UI_TEXT = {
  th: {
    title: "ผลการทดลอง",
    object: "วัตถุ",
    outcome: "ผลการทดลอง",
    time: "เวลา (นาที)",
    visual: "ภาพแสดงการดูดของเศษกระดาษ",
    balloonPaper: "ลูกโป่ง + เศษกระดาษ",
    back: "ย้อนกลับ",
    retry: "ถัดไป",
  },
  en: {
    title: "Experiment Results",
    object: "Object",
    outcome: "Result",
    time: "Time (min)",
    visual: "Paper attraction view",
    balloonPaper: "Balloon + Paper Bits",
    back: "Back",
    retry: "Next",
  },
  ms: {
    title: "Hasil Eksperimen",
    object: "Objek",
    outcome: "Hasil",
    time: "Masa (minit)",
    visual: "Paparan tarikan cebisan kertas",
    balloonPaper: "Belon + Cebisan Kertas",
    back: "Kembali",
    retry: "Seterusnya",
  },
};

const RESULTS = {
  1: {
    outcome: {
      th: "ไม่เกิดการเปลี่ยนแปลง",
      en: "No visible change",
      ms: "Tiada perubahan yang ketara",
    },
    time: "0",
    intensity: "low",
  },
  2: {
    outcome: {
      th: "เศษกระดาษถูกดูดเล็กน้อย",
      en: "Paper bits are slightly attracted",
      ms: "Cebisan kertas tertarik sedikit",
    },
    time: "2",
    intensity: "mid",
  },
  3: {
    outcome: {
      th: "เศษกระดาษถูกดูดมากขึ้น",
      en: "Paper bits are strongly attracted",
      ms: "Cebisan kertas tertarik dengan lebih kuat",
    },
    time: "5",
    intensity: "high",
  },
};

const PAPER_POSITIONS = [
  { left: 0, top: 18, rotate: -12 },
  { left: 14, top: 8, rotate: 10 },
  { left: 28, top: 20, rotate: -6 },
  { left: 42, top: 6, rotate: 16 },
  { left: 56, top: 18, rotate: -18 },
  { left: 70, top: 10, rotate: 8 },
];

const readCompletedTrials = () => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.sessionStorage.getItem(COMPLETED_TRIALS_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const allowed = new Set(["trial-1", "trial-2", "trial-3"]);
    return Array.from(new Set(parsed.filter((id) => allowed.has(id))));
  } catch {
    return [];
  }
};

const getPaperContainerStyle = (intensity) => {
  if (intensity === "high") {
    return {
      opacity: 1,
      transform: "translateX(-50%) translateY(0px)",
    };
  }

  if (intensity === "mid") {
    return {
      opacity: 1,
      transform: "translateX(-50%) translateY(2px)",
    };
  }

  return {
    opacity: 0,
    transform: "translateX(-50%) translateY(6px)",
  };
};

export default function P6ElectricGenerationSummary() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = UI_TEXT[lang] || UI_TEXT.th;
  const completedCount = readCompletedTrials().length;
  const allTrialsCompleted = completedCount === 3;
  const summaryRows = [RESULTS[1], RESULTS[2], RESULTS[3]];

  useEffect(() => {
    if (!allTrialsCompleted) {
      navigate("/p6/experiment/electric-generation/sim", { replace: true });
    }
  }, [allTrialsCompleted, navigate]);

  if (!allTrialsCompleted) return null;

  return (
    <div
      className="flex min-h-screen items-center justify-center p-[clamp(16px,4vw,36px)]"
      style={{
        fontFamily: "Prompt, sans-serif",
        background:
          "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
      }}
    >
      <div className="relative isolate w-[min(1240px,97vw)] p-[clamp(16px,3vw,30px)]">
        <div className="relative z-10 pb-[112px]">
          <h1 className="mb-[14px] mt-0 text-center text-[clamp(30px,3.2vw,44px)] font-black text-slate-900">
            {t.title}
          </h1>

          <div className="overflow-hidden rounded-[24px] border border-slate-400/45 bg-white shadow-[0_20px_36px_rgba(17,24,39,0.14)]">
            <div className="grid grid-cols-1 items-center bg-[#fdeaa1] px-[12px] py-[14px] text-center text-[clamp(20px,1.15vw,28px)] font-black text-slate-900 md:grid-cols-[1.1fr_1.2fr_0.8fr_1.6fr]">
              <div>{t.object}</div>
              <div>{t.outcome}</div>
              <div>{t.time}</div>
              <div>{t.visual}</div>
            </div>

            {summaryRows.map((row, index) => {
              const paperCount = row.intensity === "high" ? 5 : row.intensity === "mid" ? 3 : 0;
              return (
                <div
                  className="grid grid-cols-1 gap-[10px] px-4 py-[14px] text-[clamp(18px,1.05vw,26px)] font-bold text-slate-900 md:grid-cols-[1.1fr_1.2fr_0.8fr_1.6fr] md:items-center"
                  key={`row-${index + 1}`}
                >
                  <div className="flex items-center gap-4 pl-[10px] md:justify-start">
                    <div
                      className="relative h-[52px] w-[52px] rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, #ffd7b0 0%, #f3a86e 45%, #e18a54 100%)",
                        boxShadow: "inset -5px -8px 12px rgba(102, 52, 25, 0.35)",
                      }}
                    >
                      <span className="absolute bottom-[5px] right-[5px] h-[10px] w-[10px] rounded-full bg-[#e18a54]" />
                    </div>
                    <div>{t.balloonPaper}</div>
                  </div>

                  <div className="text-center">{row.outcome[lang] || row.outcome.th}</div>
                  <div className="text-center">{row.time}</div>

                  <div className="relative grid h-[92px] place-items-center">
                    <div
                      className="relative h-[66px] w-[66px] rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 25%, #ffd3d3, #ea3b3b 45%, #b91c1c 74%, #7f1d1d)",
                        boxShadow:
                          "inset 0 8px 14px rgba(255, 255, 255, 0.22), inset 0 -12px 18px rgba(0, 0, 0, 0.28), 0 10px 18px rgba(15, 23, 42, 0.18)",
                      }}
                    >
                      <span className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.6),transparent_60%)]" />
                      <span className="absolute -top-[7px] left-1/2 h-[11px] w-[11px] -translate-x-1/2 rounded-[4px] bg-[#991b1b] shadow-[0_4px_8px_rgba(15,23,42,0.2)]" />
                    </div>

                    {paperCount > 0 && (
                      <div
                        className="absolute top-[20px] left-1/2 z-[2] h-[40px] w-[64px]"
                        style={getPaperContainerStyle(row.intensity)}
                      >
                        {PAPER_POSITIONS.slice(0, paperCount).map((paper, paperIdx) => (
                          <img
                            key={paperIdx}
                            src="/images/p6/equipment/tissue-real.svg"
                            alt="paper"
                            className="absolute h-[10px] w-[14px]"
                            style={{
                              left: `${paper.left}px`,
                              top: `${paper.top}px`,
                              transform: `rotate(${paper.rotate}deg)`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="fixed bottom-6 right-6 z-20 flex gap-3">
            <button
              className="cursor-pointer rounded-[18px] border-2 border-slate-400/50 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-[0_12px_24px_rgba(17,24,39,0.12)]"
              type="button"
              onClick={() => navigate("/p6/experiment/electric-generation/sim")}
            >
              <span className="text-[20px] leading-none">&lt;&lt;</span> {t.back}
            </button>
            <button
              className="cursor-pointer rounded-[18px] bg-[#4b8bd1] px-5 py-3 text-sm font-black text-white shadow-[0_12px_24px_rgba(17,24,39,0.18)]"
              type="button"
              onClick={() => navigate("/p6/experiment/electric-generation/key-summary")}
            >
              {t.retry} <span className="text-[18px] leading-none">&gt;&gt;</span>
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-20 flex items-center gap-[10px] rounded-[18px] bg-white/90 p-[10px_12px] shadow-[0_10px_22px_rgba(0,0,0,.12)] max-[640px]:gap-2 max-[640px]:p-[10px]">
        {LANGUAGE_OPTIONS.map((option) => (
          <button
            key={option.id}
            className={`rounded-[14px] border-none px-[14px] py-[10px] text-base font-black text-slate-900 transition duration-150 hover:-translate-y-0.5 max-[640px]:px-3 max-[640px]:text-[15px] ${
              lang === option.id
                ? "bg-sky-200"
                : "bg-[#e6f2ff]"
            }`}
            type="button"
            onClick={() => setLang(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
