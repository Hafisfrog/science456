import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const COMPLETED_TRIALS_KEY = "p6_electric_generation_completed_trials";

const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย" },
  { id: "en", label: "อังกฤษ" },
  { id: "ms", label: "มลายู" },
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
    next: "ต่อไป",
  },
  en: {
    title: "Experiment Results",
    object: "Object",
    outcome: "Result",
    time: "Time (min)",
    visual: "Paper attraction view",
    balloonPaper: "Balloon + Paper Bits",
    back: "Back",
    next: "Next",
  },
  ms: {
    title: "Hasil Eksperimen",
    object: "Objek",
    outcome: "Hasil",
    time: "Masa (minit)",
    visual: "Paparan tarikan cebisan kertas",
    balloonPaper: "Belon + Cebisan Kertas",
    back: "Kembali",
    next: "Seterusnya",
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
  { left: 6, top: 16, rotate: -12 },
  { left: 14, top: 8, rotate: 10 },
  { left: 20, top: 18, rotate: -6 },
  { left: 24, top: 10, rotate: 16 },
  { left: 10, top: 22, rotate: -18 },
  { left: 18, top: 24, rotate: 8 },
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
  if (intensity === "high") return { opacity: 1, transform: "translateX(-50%) translateY(0px)" };
  if (intensity === "mid") return { opacity: 1, transform: "translateX(-50%) translateY(2px)" };
  return { opacity: 0, transform: "translateX(-50%) translateY(6px)" };
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
                    <div>{t.balloonPaper}</div>
                  </div>

                  <div className="text-center">{row.outcome[lang] || row.outcome.th}</div>
                  <div className="text-center">{row.time}</div>

                  <div className="relative grid h-[110px] place-items-center">
                    <img
                      src="/images/p6/equipment/lukpong-cut.png"
                      alt="balloon"
                      className="h-[84px] w-[84px] object-contain drop-shadow-[0_10px_18px_rgba(15,23,42,0.22)]"
                    />

                    {paperCount > 0 && (
                      <div
                        className="absolute top-[32px] left-1/2 z-[3] h-[36px] w-[42px]"
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
              className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-white/90 px-[18px] py-[14px] font-black text-[#213a8f] shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
              type="button"
              onClick={() => navigate("/p6/experiment/electric-generation/sim")}
            >
              <span className="text-[20px] leading-none">&laquo;</span>
              <span className="text-[20px] leading-none">{t.back}</span>
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-[#2563eb] px-[18px] py-[14px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
              type="button"
              onClick={() => navigate("/p6/experiment/electric-generation/key-summary")}
            >
              <span className="text-[20px] leading-none">{t.next}</span>
              <span className="text-[20px] leading-none">&raquo;</span>
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-20 inline-flex gap-2 rounded-[20px] bg-white/95 px-3 py-[10px] shadow-[0_18px_40px_rgba(111,144,186,0.2)]">
        {LANGUAGE_OPTIONS.map((option) => (
          <button
            key={option.id}
            className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
              lang === option.id ? "bg-[#bdd9f8]" : "bg-[#eaf3ff]"
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
