import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LANG = {
  th: {
    title: "วงจรไฟฟ้าใกล้ตัว",
    subtitle: "เลือกการทดลอง",
    exp1: "การทดลองที่ 1",
    exp1sub: "การต่อวงจรไฟฟ้าแบบอนุกรม",
    exp2: "การทดลองที่ 2",
    exp2sub: "การต่อหลอดไฟฟ้าแบบอนุกรมและแบบขนาน",
    back: "ย้อนกลับ",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    title: "Electric Circuits Around Us",
    subtitle: "Select Experiment",
    exp1: "Experiment 1",
    exp1sub: "Series Electric Circuit",
    exp2: "Experiment 2",
    exp2sub: "Series and Parallel Bulb Circuits",
    back: "Back",
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    title: "Litar Elektrik Sekeliling Kita",
    subtitle: "Pilih Eksperimen",
    exp1: "Eksperimen 1",
    exp1sub: "Litar Elektrik Bersiri",
    exp2: "Eksperimen 2",
    exp2sub: "Litar Mentol Bersiri dan Selari",
    back: "Kembali",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

const LANGUAGE_OPTIONS = [
  { id: "th", voice: "th-TH" },
  { id: "en", voice: "en-US" },
  { id: "ms", voice: "ms-MY" },
];

function speakText(text, lang) {
  if (!text || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.95;

  window.speechSynthesis.speak(utter);
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
      path: "/p6/electric-circuit/materials",
    },
    {
      id: "exp-2",
      title: t.exp2,
      subtitle: t.exp2sub,
      image: "/images/p6/faifa2.2.png",
      path: "/p6/electric-circuit/bulb-series-parallel",
    },
  ];

  const backPath = "/p6/electric-circuit/vocab";

  const pageBg = {
    background:
      "radial-gradient(80% 58% at 50% 34%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="relative h-[100svh] overflow-hidden px-4 pb-6 pt-7 text-center text-slate-900 md:px-6 md:pb-8 md:pt-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(120px,11vw,190px)] top-3 h-[clamp(108px,11vw,150px)] w-[clamp(70px,7vw,102px)] bg-[#f7bd2b]"
        style={{
          clipPath:
            "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-col">

        <h1 className="text-4xl font-extrabold text-blue-600 md:text-[72px]">
          {t.title}
        </h1>

        <p className="mt-2 text-lg text-slate-700 md:text-[45px]">
          {t.subtitle}
        </p>

        <section className="mx-auto mt-2 flex w-full flex-1 items-center justify-center">
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
            type="button"
          >
            {t.lang[item.id]}
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
