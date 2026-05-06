import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";

const CONTENT = {
  th: {
    title: "วงจรไฟฟ้าใกล้ตัว",
    section: "จุดประสงค์การเรียนรู้",
    obj1: "อธิบายส่วนประกอบของวงจรไฟฟ้าอย่างง่ายได้",
    obj2: "ต่อวงจรไฟฟ้าอย่างง่าย และตรวจสอบวงจรเปิด-ปิดได้",
    back: "ย้อนกลับ",
    next: "ต่อไป",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    title: "Everyday Electric Circuits",
    section: "Learning Objectives",
    obj1: "Describe the components of a simple electric circuit. ",
    obj2: "Build a simple circuit and identify open/closed circuits. ",
    back: "Back",
    next: "Next",
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    title: "Litar Elektrik Sekeliling Kita",
    section: "Objektif Pembelajaran",
    obj1: "Menerangkan komponen litar elektrik yang ringkas.",
    obj2: "Membina litar ringkas dan mengenal pasti litar terbuka/tertutup. ",
    back: "Kembali",
    next: "Seterusnya",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

const LANGUAGE_OPTIONS = [
  { id: "th", speechLang: "th-TH", label: "ไทย" },
  { id: "ms", speechLang: "ms-MY", label: "มลายู" },
  { id: "en", speechLang: "en-US", label: "อังกฤษ" },
];

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;

  const voices = synth.getVoices();
  const voice =
    voices.find((item) => item.lang === lang) ||
    voices.find((item) => item.lang.startsWith(lang.split("-")[0]));

  if (voice) utterance.voice = voice;
  synth.speak(utterance);
}

export default function P6ElectricCircuitObjectives() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");

  const t = CONTENT[lang] ?? CONTENT.th;
  const speechLang = LANGUAGE_OPTIONS.find((item) => item.id === lang)?.speechLang ?? "th-TH";

  const pageBg = {
    background:
      "radial-gradient(46% 27% at 8% 41%, #cdebf4 0 61%, transparent 62%), radial-gradient(40% 26% at 94% 42%, #cdebf4 0 60%, transparent 61%), radial-gradient(72% 35% at 50% 33%, #f7f0ef 0 63%, transparent 64%), radial-gradient(80% 50% at 50% 75%, #f7f0ef 0 62%, transparent 63%), linear-gradient(180deg, #fbf5f2 0%, #fbf5f2 100%)",
  };

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  return (
    <div
      className="relative h-[100svh] overflow-hidden px-3 pb-[104px] pt-4 text-slate-900 sm:px-4 sm:pb-[96px] md:px-6 md:pb-[86px] md:pt-5"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <HomeButton />

      <div className="pointer-events-none absolute left-[-92px] top-[24%] h-[310px] w-[255px] rotate-[-10deg] rounded-[52%_52%_46%_46%] border-[7px] border-black bg-[#fff773] shadow-[inset_24px_22px_0_rgba(255,255,255,.48)] max-[900px]:left-[-150px]">
        <div className="absolute bottom-[-38px] left-[40px] h-[70px] w-[82px] rotate-[12deg] rounded-[14px] border-[7px] border-black bg-[#111]" />
        <div className="absolute bottom-[-4px] left-[56px] h-[84px] w-[54px] rotate-[18deg] rounded-[10px] border-[5px] border-black bg-[#fff7a3]" />
        <div className="absolute left-[102px] top-[76px] h-[126px] w-[98px] rounded-[50%] border-[4px] border-slate-500/35" />
      </div>

      <div className="pointer-events-none absolute right-[-116px] top-[27%] h-[260px] w-[230px] rotate-[12deg] rounded-[52%_52%_46%_46%] border-[7px] border-black bg-[#fff773] shadow-[inset_24px_22px_0_rgba(255,255,255,.48)] max-[900px]:right-[-170px]">
        <div className="absolute bottom-[-26px] right-[46px] h-[58px] w-[72px] rotate-[-10deg] rounded-[12px] border-[7px] border-black bg-[#111]" />
        <div className="absolute left-[64px] top-[70px] h-[110px] w-[92px] rounded-[50%] border-[4px] border-slate-500/35" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(180px,18vw,360px)] top-[-14px] h-[clamp(160px,18vw,270px)] w-[clamp(88px,9vw,150px)] bg-[#ffc84b]"
        style={{
          clipPath: "polygon(0 0, 44% 0, 68% 36%, 93% 9%, 100% 39%, 78% 54%, 100% 100%, 57% 54%, 38% 70%)",
        }}
      />

      <div className="pointer-events-none absolute right-[10%] top-[15%] h-11 w-11 bg-[#ffc84b]" style={{ clipPath: "polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)" }} />
      <div className="pointer-events-none absolute right-[22%] top-[16%] h-12 w-12 bg-[#ffc84b]" style={{ clipPath: "polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)" }} />
      <div className="pointer-events-none absolute left-[6%] bottom-[22%] text-[92px] leading-none opacity-75 max-[900px]:hidden">🧲</div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1540px] flex-col">
        <div className="w-fit rounded-[30px] bg-[#8fc8df] px-[clamp(18px,2.4vw,34px)] py-[clamp(8px,1vw,13px)] shadow-[inset_0_-4px_0_rgba(255,255,255,.2)]">
          <div className="text-[clamp(24px,2.8vw,50px)] font-black leading-none text-white [text-shadow:_0_4px_0_#3f91bd,_2px_0_0_#3f91bd,_-2px_0_0_#3f91bd,_0_-2px_0_#3f91bd]">
            ชั้นประถมศึกษาปีที่ 6
          </div>
        </div>

        <section className="mx-auto flex w-full flex-1 flex-col items-center justify-center gap-[clamp(18px,2.6vw,38px)] py-[clamp(8px,1.4vw,18px)]">
          <div className="relative w-[min(72vw,860px)] rounded-full border-[clamp(3px,.45vw,5px)] border-black bg-white px-[clamp(66px,8vw,120px)] py-[clamp(9px,1.25vw,18px)] text-center shadow-[clamp(9px,1vw,14px)_clamp(9px,1vw,14px)_0_rgba(0,0,0,.28)] max-[640px]:w-full">
            <div className="absolute left-[clamp(14px,1.8vw,26px)] top-1/2 h-[clamp(48px,6vw,82px)] w-[clamp(48px,6vw,82px)] -translate-y-1/2 rounded-full border-[clamp(3px,.45vw,5px)] border-black bg-[#f76525]" />
            <h1 className="m-0 text-[clamp(30px,3.55vw,62px)] font-black leading-tight text-black">
              {t.title}
            </h1>
          </div>

          <div className="w-full max-w-[980px] px-1">
            <div className="mb-[clamp(14px,2vw,28px)] ml-[clamp(6px,1.5vw,20px)] text-[clamp(24px,2.25vw,38px)] font-black leading-none text-black">
              {t.section}
            </div>

            <div className="space-y-[clamp(12px,1.8vw,24px)]">
              {[t.obj1, t.obj2].map((objective, index) => (
                <div
                  key={objective}
                  className="grid grid-cols-[clamp(44px,4.8vw,64px)_minmax(0,1fr)] items-center gap-[clamp(10px,1.5vw,20px)]"
                >
                  <div className="grid aspect-square w-[clamp(44px,4.8vw,64px)] place-items-center rounded-full bg-[#ee7447] text-[clamp(22px,2.4vw,32px)] font-black text-white">
                    {index + 1}
                  </div>
                  <div className="flex min-w-0 items-center gap-[clamp(8px,1vw,14px)] rounded-[clamp(20px,2vw,32px)] border-[clamp(7px,.9vw,12px)] border-[#7caf44] bg-[#f2f5f4] px-[clamp(14px,1.8vw,28px)] py-[clamp(8px,.9vw,12px)] text-[clamp(21px,2.25vw,38px)] font-normal leading-tight text-black [overflow-wrap:anywhere]">
                    <span className="min-w-0 flex-1">{objective}</span>
                    <button
                      onClick={() => speakText(objective, speechLang)}
                      className="grid h-[clamp(38px,4vw,54px)] w-[clamp(38px,4vw,54px)] shrink-0 place-items-center rounded-full bg-[#f47c4b] text-[clamp(18px,1.8vw,26px)] text-white shadow-[0_8px_18px_rgba(0,0,0,.18)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_22px_rgba(0,0,0,.2)] active:translate-y-[1px]"
                      type="button"
                      aria-label={`Play objective ${index + 1}`}
                      title="ฟังเสียง"
                    >
                      🔊
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

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

      <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-7 md:right-7">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6")}
          type="button"
        >
          &laquo; {t.back}
        </button>

        <button
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/electric-circuit/vocab")}
          type="button"
        >
          {t.next} &raquo;
        </button>
      </div>
    </div>
  );
}
