import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";

const LANG = {
  th: {
    title: "วงจรไฟฟ้าอย่างง่าย",
    subtitle: "เลือกการทดลอง",
    exp1: "การทดลองที่ 1",
    exp1sub: "การต่อวงจรไฟฟ้าอย่างง่าย",
    exp2: "การทดลองที่ 2",
    exp2sub: "การต่อหลอดไฟฟ้าแบบอนุกรมและแบบขนาน",
    back: "ย้อนกลับ",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    title: "Simple electric circuit",
    subtitle: "Select Experiment",
    exp1: "Experiment 1",
    exp1sub: "Connecting a simple electric circuit",
    exp2: "Experiment 2",
    exp2sub: "Series and Parallel Bulb Circuits",
    back: "Back",
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    title: "Litar elektrik mudah",
    subtitle: "Pilih Eksperimen",
    exp1: "Eksperimen 1",
    exp1sub: "Menyambung litar elektrik mudah",
    exp2: "Eksperimen 2",
    exp2sub: "Litar Mentol Bersiri dan Selari",
    back: "Kembali",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

const LANGUAGE_OPTIONS = [
  { id: "th", voice: "th-TH", label: "ไทย" },
  { id: "ms", voice: "ms-MY", label: "มลายู" },
  { id: "en", voice: "en-US", label: "อังกฤษ" },
];

function speakText(text, lang) {
  if (!text || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.95;

  window.speechSynthesis.speak(utter);
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

export default function P6ElectricCircuitExperimentSelect() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");

  const t = LANG[lang] ?? LANG.th;
  const speechLang = LANGUAGE_OPTIONS.find((item) => item.id === lang)?.voice ?? "th-TH";
  const experiments = [
    {
      id: "exp-1",
      title: t.exp1,
      subtitle: t.exp1sub,
      image: "/images/p6/anukromp6.png",
      path: "/p6/electric-circuit/experiment-1/objectives",
    },
    {
      id: "exp-2",
      title: t.exp2,
      subtitle: t.exp2sub,
      image: "/images/p6/faifa2.2.png",
      path: "/p6/electric-circuit/experiment-2/objectives",
    },
  ];

  const backPath = "/p6/electric-circuit/vocab";

  const pageBg = {
    background:
      "radial-gradient(46% 27% at 8% 41%, #cdebf4 0 61%, transparent 62%), radial-gradient(40% 26% at 94% 42%, #cdebf4 0 60%, transparent 61%), radial-gradient(72% 35% at 50% 33%, #f7f0ef 0 63%, transparent 64%), radial-gradient(80% 50% at 50% 75%, #f7f0ef 0 62%, transparent 63%), linear-gradient(180deg, #fbf5f2 0%, #fbf5f2 100%)",
  };

  return (
    <div
      className="relative h-[100svh] overflow-hidden px-4 pb-6 pt-7 text-center text-slate-900 md:px-6 md:pb-8 md:pt-8"
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
        }}
      />
      <Spark className="right-[10%] top-[16%] z-0 h-11 w-11 max-[760px]:hidden" />
      <Spark className="right-[22%] top-[17%] z-0 h-12 w-12 max-[760px]:hidden" />
      <Spark className="right-[18%] top-[25%] z-0 h-5 w-5 max-[760px]:hidden" />
      <div className="pointer-events-none absolute left-[6%] bottom-[20%] z-0 text-[92px] leading-none opacity-75 max-[900px]:hidden">
        🧲
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-col">

        <h1 className="text-4xl font-extrabold text-blue-600 md:text-[72px]">
          {t.title}
        </h1>

        <p className="mt-2 text-base text-slate-700 md:text-[30px]">
          {t.subtitle}
        </p>

        <section className="mx-auto -mt-30 flex w-full flex-1 items-center justify-center">
          <div className="grid w-full max-w-[940px] grid-cols-1 justify-items-center gap-5 lg:grid-cols-2">

            {experiments.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.path)}
                className="group flex h-[320px] w-[430px] max-w-[92vw] flex-col overflow-hidden rounded-[26px] bg-white shadow-[0_14px_30px_rgba(0,0,0,0.12)] transition hover:-translate-y-2"
              >

                <div className="flex h-[190px] items-center justify-center overflow-hidden bg-slate-200">
                  <img
                    src={item.image}
                    alt={item.subtitle}
                    className="block h-full w-full scale-[1.08] object-cover object-center"
                  />
                </div>

                <div className="px-4 pt-2 pb-2 text-center">

                  <div className="flex items-center justify-center gap-2 text-[clamp(22px,1.85vw,34px)] font-extrabold leading-[1.1]">

                    {item.title}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(`${item.title} ${item.subtitle}`, speechLang);
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-700"
                    >
                      🔊
                    </button>

                  </div>

                  <div className="mt-1 text-[clamp(14px,1vw,20px)] text-slate-700">
                    {item.subtitle}
                  </div>

                </div>

              </button>
            ))}

          </div>
        </section>
      </div>

      {/* Language */}
    <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
      <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
        {LANGUAGE_OPTIONS.map((item) => (
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

      {/* Navigation */}
      <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-7 md:right-7">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate(backPath)}
          type="button"
          aria-label={t.back}
        >
          &laquo; {t.back}
        </button>
      </div>
    </div>
  );
}
