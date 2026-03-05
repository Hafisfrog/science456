import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeakButton from "../../../../components/SpeakButton";

const PAGE_COPY = {
  th: {
    mainTitle: "ขั้นตอนการทดลอง",
    subTitle: "ขั้นตอนการทดลองห่วงโซ่อาหาร",
    back: "ย้อนกลับ",
    next: "เริ่มการทดลอง",
    progress: "ขั้นตอน 1/4",
  },
  en: {
    mainTitle: "Experiment Steps",
    subTitle: "Food Chain Experiment Procedure",
    back: "Back",
    next: "Start Experiment",
    progress: "Step 1/4",
  },
  ms: {
    mainTitle: "Langkah Eksperimen",
    subTitle: "Prosedur Eksperimen Rantaian Makanan",
    back: "Kembali",
    next: "Mula Eksperimen",
    progress: "Langkah 1/4",
  },
};

const STEPS = [
  {
    icon: "🔍",
    color: "from-blue-500 to-blue-600",
    title: {
      th: "สำรวจสิ่งมีชีวิตในระบบนิเวศ",
      en: "Observe organisms in the ecosystem",
      ms: "Perhati hidupan dalam ekosistem",
    },
    description: {
      th: "สังเกตและจดบันทึกสิ่งมีชีวิตต่าง ๆ ที่พบในพื้นที่",
      en: "Observe and record the organisms found in the area.",
      ms: "Perhati dan catat hidupan yang ditemui di kawasan kajian.",
    },
  },
  {
    icon: "📊",
    color: "from-green-500 to-green-600",
    title: {
      th: "จำแนกเป็นผู้ผลิตและผู้บริโภค",
      en: "Classify producers and consumers",
      ms: "Kelaskan pengeluar dan pengguna",
    },
    description: {
      th: "แยกกลุ่มสิ่งมีชีวิตตามบทบาทในการสร้างและใช้พลังงาน",
      en: "Group organisms by their role in making or using energy.",
      ms: "Asingkan hidupan mengikut peranan dalam penghasilan dan penggunaan tenaga.",
    },
  },
  {
    icon: "🔄",
    color: "from-amber-500 to-orange-500",
    title: {
      th: "สร้างห่วงโซ่อาหาร",
      en: "Build the food chain",
      ms: "Bina rantaian makanan",
    },
    description: {
      th: "เชื่อมโยงความสัมพันธ์การกินกันเป็นลำดับ",
      en: "Connect feeding relationships in sequence.",
      ms: "Hubungkan hubungan pemakanan secara berurutan.",
    },
  },
  {
    icon: "📝",
    color: "from-violet-500 to-purple-600",
    title: {
      th: "บันทึกและสรุปผล",
      en: "Record and summarize results",
      ms: "Catat dan rumuskan keputusan",
    },
    description: {
      th: "สรุปสิ่งที่เรียนรู้จากการทดลอง",
      en: "Summarize what you learned from the experiment.",
      ms: "Rumuskan perkara yang dipelajari daripada eksperimen.",
    },
  },
];

function makeParticles(count = 20) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 7 + 2}px`,
    opacity: Math.random() * 0.45 + 0.2,
    delay: `${Math.random() * 2}s`,
    duration: `${Math.random() * 2 + 1.5}s`,
  }));
}

export default function P5FoodChainSteps() {
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("th");
  const particles = useMemo(() => makeParticles(20), []);

  const t = PAGE_COPY[activeLang];
  const speechByLang = {
    th: `${PAGE_COPY.th.mainTitle}. ${STEPS.map((s) => s.title.th).join(". ")}`,
    en: `${PAGE_COPY.en.mainTitle}. ${STEPS.map((s) => s.title.en).join(". ")}`,
    ms: `${PAGE_COPY.ms.mainTitle}. ${STEPS.map((s) => s.title.ms).join(". ")}`,
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-200 via-lime-100 to-green-200 font-sans">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,245,170,0.55),transparent_45%)]" />
      <div className="pointer-events-none absolute right-8 top-8 h-24 w-24 rounded-full bg-yellow-300 shadow-[0_0_60px_rgba(253,224,71,0.7)]" />

      {particles.map((particle) => (
        <span
          key={particle.id}
          className="pointer-events-none absolute animate-pulse rounded-full bg-white"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-36 pt-10">
        <div className="mb-6 rounded-3xl bg-white/70 px-6 py-5 shadow-xl backdrop-blur">
          <h1 className="text-center text-3xl font-black text-emerald-900 md:text-5xl">
            {t.mainTitle}
          </h1>
          <p className="mt-1 text-center text-sm font-semibold tracking-wide text-emerald-700 md:text-base">
            {t.subTitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {STEPS.map((step, index) => (
            <div
              key={step.title.th}
              className="relative rounded-3xl border border-white/60 bg-white p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="mb-4 flex items-center gap-4">
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-3xl text-white shadow-lg`}
                >
                  {step.icon}
                </div>
                <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-extrabold text-slate-800">
                {step.title[activeLang]}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                {step.description[activeLang]}
              </p>
            </div>
          ))}
        </div>

      </div>

      <div className="absolute left-6 top-6 z-20 rounded-full bg-white/75 px-4 py-2 text-sm font-bold text-emerald-800 shadow-md backdrop-blur">
        {t.progress}
      </div>

      <div className="absolute bottom-6 left-6 z-20 rounded-2xl bg-white/75 p-3 shadow-lg backdrop-blur">
        <div className="-mt-3">
          <SpeakButton
            th={speechByLang.th}
            en={speechByLang.en}
            ms={speechByLang.ms}
            activeLang={activeLang}
            onLanguageChange={setActiveLang}
          />
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-20 flex gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-700 shadow-md transition hover:bg-slate-50 md:text-base"
        >
          ← {t.back}
        </button>
        <button
          type="button"
          onClick={() => navigate("/p5/life/foodchain/select")}
          className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2 text-sm font-bold text-white shadow-md transition hover:opacity-95 md:text-base"
        >
          {t.next} →
        </button>
      </div>
    </div>
  );
}
