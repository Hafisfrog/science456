import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";

const CONTENT = {
  th: {
    experiment: "การทดลองที่ 1",
    title: "เรื่อง ผลของแรงไฟฟ้า",
    section: "ทักษะกระบวนการทางวิทยาศาสตร์",
    skills: ["ทักษะการสังเกต", "ทักษะการทดลอง", "ทักษะการลงความเห็นจากข้อมูล"],
    back: "ย้อนกลับ",
    next: "ต่อไป",
  },
  en: {
    experiment: "Experiment 1",
    title: "Effects of Electric Force",
    section: "Science Process Skills",
    skills: ["Observation Skills", "Experimentation Skills", "Inferring from Data"],
    back: "Back",
    next: "Next",
  },
  ms: {
    experiment: "Eksperimen 1",
    title: "Kesan Daya Elektrik",
    section: "Kemahiran Proses Sains",
    skills: ["Kemahiran Memerhati", "Kemahiran Mengeksperimen", "Membuat Inferens daripada Data"],
    back: "Kembali",
    next: "Seterusnya",
  },
};

const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย" },
  { id: "ms", label: "มลายู" },
  { id: "en", label: "อังกฤษ" },
];

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;

  window.speechSynthesis.speak(utterance);
}

function Spark({ className }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bg-[#ffc84b] ${className}`}
      style={{
        clipPath:
          "polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)",
      }}
    />
  );
}

function SideBulb({ side }) {
  const isLeft = side === "left";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-[clamp(180px,25vh,270px)] h-[clamp(210px,25vw,310px)] w-[clamp(172px,21vw,255px)] rounded-[52%_52%_46%_46%] border-[clamp(5px,.55vw,7px)] border-black bg-[#fff773] shadow-[inset_24px_22px_0_rgba(255,255,255,.48)] max-[640px]:hidden ${
        isLeft
          ? "left-[clamp(-150px,-8vw,-88px)] rotate-[-10deg] max-[900px]:left-[-175px]"
          : "right-[clamp(-158px,-8vw,-96px)] rotate-[12deg] max-[900px]:right-[-185px]"
      }`}
    >
      <div
        className={`absolute bottom-[-12%] h-[22%] w-[32%] rounded-[14px] border-[clamp(5px,.55vw,7px)] border-black bg-[#111] ${
          isLeft ? "left-[40px] rotate-[12deg]" : "right-[42px] rotate-[-10deg]"
        }`}
      />
      <div
        className={`absolute top-[25%] h-[40%] w-[38%] rounded-[50%] border-[4px] border-slate-500/35 ${
          isLeft ? "left-[102px]" : "left-[54px]"
        }`}
      />
    </div>
  );
}

export default function P6ElectricCircuitExperiment1ScienceSkills() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = CONTENT[lang] ?? CONTENT.th;
  const speechLang = { th: "th-TH", ms: "ms-MY", en: "en-US" }[lang] ?? "th-TH";

  const pageBg = {
    background:
      "radial-gradient(46% 27% at 8% 41%, #cdebf4 0 61%, transparent 62%), radial-gradient(40% 26% at 94% 42%, #cdebf4 0 60%, transparent 61%), radial-gradient(72% 35% at 50% 33%, #f7f0ef 0 63%, transparent 64%), radial-gradient(80% 50% at 50% 75%, #f7f0ef 0 62%, transparent 63%), linear-gradient(180deg, #fbf5f2 0%, #fbf5f2 100%)",
  };

  return (
    <div
      className="relative h-[100svh] overflow-hidden px-3 pb-[104px] pt-4 text-slate-900 sm:px-4 sm:pb-[96px] md:px-6 md:pb-[86px] md:pt-5"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <HomeButton />

      <SideBulb side="left" />
      <SideBulb side="right" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(80px,18vw,360px)] top-[-18px] h-[clamp(112px,18vw,270px)] w-[clamp(62px,9vw,150px)] bg-[#ffc84b] max-[520px]:right-5 max-[520px]:opacity-60"
        style={{
          clipPath:
            "polygon(0 0, 44% 0, 68% 36%, 93% 9%, 100% 39%, 78% 54%, 100% 100%, 57% 54%, 38% 70%)",
        }}
      />
      <Spark className="right-[10%] top-[15%] h-[clamp(26px,3vw,44px)] w-[clamp(26px,3vw,44px)] max-[520px]:hidden" />
      <Spark className="right-[22%] top-[16%] h-[clamp(28px,3.2vw,48px)] w-[clamp(28px,3.2vw,48px)] max-[520px]:hidden" />
      <Spark className="right-[18%] top-[25%] h-5 w-5 max-[520px]:hidden" />
      <div className="pointer-events-none absolute left-[5%] bottom-[20%] text-[92px] leading-none opacity-75 max-[900px]:hidden">
        🧲
      </div>

      <main className="relative z-10 mx-auto flex h-full w-full max-w-[1540px] flex-col items-center justify-center py-[clamp(8px,1.4vw,18px)]">
        <header className="w-full max-w-[1280px] text-center">
          <h1 className="m-0 text-balance text-[clamp(34px,4.7vw,78px)] font-black leading-none text-[#b22629] [text-shadow:_0_0_0_#b22629,_0_clamp(4px,.52vw,7px)_0_#f2b4d8,_clamp(3px,.48vw,6px)_0_0_#f2b4d8,_calc(clamp(3px,.48vw,6px)*-1)_0_0_#f2b4d8,_0_calc(clamp(3px,.48vw,6px)*-1)_0_#f2b4d8] max-[520px]:leading-[1.08]">
            {t.experiment}
          </h1>
          <p className="mx-auto mt-[clamp(8px,1.4vw,16px)] max-w-[min(100%,1100px)] text-balance text-[clamp(27px,3.55vw,60px)] font-black leading-tight text-black max-[520px]:leading-[1.12]">
            {t.title}
          </p>
        </header>

        <section className="mt-[clamp(14px,2vw,28px)] w-full max-w-[min(84vw,980px)] max-[640px]:max-w-full">
          <div className="mb-[clamp(14px,2vw,28px)] inline-flex max-w-full rounded-[14px] border-[clamp(3px,.4vw,5px)] border-[#10143c] bg-[#fff8ec] px-[clamp(14px,2vw,30px)] py-[clamp(8px,1vw,14px)] text-[clamp(20px,2.05vw,36px)] font-black leading-tight text-black shadow-[clamp(5px,.6vw,8px)_clamp(5px,.6vw,8px)_0_#5b9b72]">
            {t.section}
          </div>

          <div className="mx-auto flex w-full max-w-[760px] flex-col gap-[clamp(12px,2vw,28px)]">
            {t.skills.map((skill, index) => (
              <div
                key={skill}
                className="flex min-w-0 items-center gap-[clamp(10px,1.4vw,20px)] rounded-[clamp(20px,2vw,32px)] border-[clamp(7px,.9vw,12px)] border-[#7caf44] bg-[#f2f5f4] px-[clamp(12px,1.8vw,28px)] py-[clamp(7px,.9vw,12px)] text-[clamp(21px,2.1vw,36px)] font-normal leading-tight text-black"
              >
                <div className="grid aspect-square w-[clamp(42px,4.2vw,58px)] shrink-0 place-items-center rounded-full bg-[#ee7447] text-[clamp(21px,2.2vw,29px)] font-black text-white">
                  {index + 1}
                </div>
                <span className="min-w-0 flex-1 [overflow-wrap:anywhere]">{skill}</span>
                <button
                  type="button"
                  onClick={() => speakText(skill, speechLang)}
                  className="grid aspect-square w-[clamp(38px,3.6vw,52px)] shrink-0 place-items-center rounded-full bg-orange-100 text-[clamp(18px,1.65vw,25px)] text-orange-700 shadow-[0_8px_18px_rgba(15,23,42,.16)] transition hover:-translate-y-0.5 hover:bg-orange-200 active:translate-y-[1px]"
                  aria-label={skill}
                  title={skill}
                >
                  {"\u{1F50A}"}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div className="fixed bottom-[88px] left-1/2 z-20 -translate-x-1/2 sm:bottom-3 sm:left-3 sm:translate-x-0 md:bottom-7 md:left-7">
        <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2 shadow-[0_12px_24px_rgba(0,0,0,.14)] sm:p-2.5">
          {LANGUAGE_OPTIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => setLang(item.id)}
              className={`rounded-[14px] px-[14px] py-[9px] text-sm font-extrabold text-slate-900 transition sm:px-[18px] sm:py-[10px] sm:text-base ${
                lang === item.id
                  ? "bg-[#bfe0ff] text-slate-900"
                  : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
              }`}
              title={item.label}
              type="button"
            >
              <span className="notranslate" translate="no">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:left-auto sm:right-3 sm:translate-x-0 sm:gap-3 md:bottom-7 md:right-7">
        <button
          className="rounded-[16px] bg-white/92 px-[14px] py-[11px] text-[16px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] sm:rounded-[18px] sm:px-[18px] sm:py-[14px] sm:text-[20px]"
          onClick={() => navigate("/p6/electric-circuit/experiment-1/objectives")}
          type="button"
        >
          &laquo; {t.back}
        </button>

        <button
          className="rounded-[16px] bg-[#2563eb] px-[14px] py-[11px] text-[16px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] sm:rounded-[18px] sm:px-[18px] sm:py-[14px] sm:text-[20px]"
          onClick={() => navigate("/p6/electric-circuit/materials")}
          type="button"
        >
          {t.next} &raquo;
        </button>
      </div>
    </div>
  );
}
