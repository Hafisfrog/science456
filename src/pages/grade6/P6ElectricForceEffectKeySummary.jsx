import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";

const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย" },
    { id: "ms", label: "มลายู" },
  { id: "en", label: "อังกฤษ" },

];

const TEXT = {
  th: {
    title: "สรุปสาระสำคัญ : แรงไฟฟ้าน่ารู้",
    sectionCause: "การเกิดแรงไฟฟ้า",
    sectionEffect: "ผลของแรงไฟฟ้าที่เกิดขึ้น",
    sectionExamples: "ตัวอย่างในชีวิตประจำวัน",
    causeIntro:
      "แรงไฟฟ้า คือ แรงที่เกิดขึ้นระหว่างประจุไฟฟ้าด้วยกัน มีทั้งแรงดึงดูดและแรงผลัก",
    chargeKinds: "ประจุไฟฟ้ามี 2 ชนิด คือ ประจุไฟฟ้าบวก (+) และประจุไฟฟ้าลบ (-)",
    chargeInduction:
      "เกิดขึ้นเมื่อมีวัตถุบางชิ้นทำให้เกิดการถ่ายโอนประจุ ทำให้วัตถุไม่เป็นกลางทางไฟฟ้า",
    effectAttract:
      "ประจุต่างกัน “ดึงดูดกัน” วัตถุที่มีประจุต่างชนิดจะออกแรงดึงดูดซึ่งกันและกัน",
    effectRepel:
      "ประจุเหมือนกัน “ผลักกัน” วัตถุที่มีประจุชนิดเดียวกันจะออกแรงผลักกัน",
    example: "การใช้หวีพลาสติกบนผ้าแล้วทำให้เส้นผมติดหวีขึ้นมาได้",
    back: "ย้อนกลับ",
    next: "ต่อไป",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    title: "Key Takeaways: Electric Force",
    sectionCause: "How Electric Force Happens",
    sectionEffect: "Effects of Electric Force",
    sectionExamples: "Everyday Example",
    causeIntro:
      "Electric force is a force between electric charges. It can attract or repel.",
    chargeKinds: "There are two kinds of charges: positive (+) and negative (-).",
    chargeInduction:
      "Charge transfer can make an object no longer electrically neutral.",
    effectAttract: "Unlike charges attract each other.",
    effectRepel: "Like charges repel each other.",
    example: "Rubbing a plastic comb on cloth can make hair stick to the comb.",
    back: "Back",
    next: "Next",
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    title: "Ringkasan Penting: Daya Elektrik",
    sectionCause: "Bagaimana Daya Elektrik Terjadi",
    sectionEffect: "Kesan Daya Elektrik",
    sectionExamples: "Contoh Harian",
    causeIntro:
      "Daya elektrik ialah daya antara cas elektrik. Ia boleh menarik atau menolak.",
    chargeKinds: "Terdapat dua jenis cas: positif (+) dan negatif (-).",
    chargeInduction:
      "Pemindahan cas boleh membuat objek tidak neutral secara elektrik.",
    effectAttract: "Cas berlainan saling menarik.",
    effectRepel: "Cas sejenis saling menolak.",
    example: "Menggosok sikat plastik pada kain boleh membuat rambut melekat.",
    back: "Kembali",
    next: "Seterusnya",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

const LISTEN_LABELS = {
  th: "ฟัง",
  en: "Listen",
  ms: "Dengar",
};

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.92;
  const voices = synth.getVoices();
  const voice =
    voices.find((v) => v.lang === lang) ||
    voices.find((v) => v.lang.startsWith(lang.split("-")[0]));
  if (voice) utter.voice = voice;
  synth.speak(utter);
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

function LanguagePills({ lang, setLang }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
      {LANGUAGE_OPTIONS.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => setLang(p.id)}
          className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold text-slate-900 transition ${
            lang === p.id
              ? "bg-[#bfe0ff] text-slate-900"
              : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
          }`}
        >
          <span className="notranslate" translate="no">{p.label}</span>
        </button>
      ))}
    </div>
  );
}

export default function P6ElectricForceEffectKeySummary() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TEXT[lang] ?? TEXT.th, [lang]);
  const listenLabel = LISTEN_LABELS[lang] ?? LISTEN_LABELS.th;
  const speechLang = { th: "th-TH", en: "en-US", ms: "ms-MY" }[lang] || "th-TH";
  const speakCause = () => speakText([t.sectionCause, t.causeIntro, t.chargeKinds, t.chargeInduction].join(". "), speechLang);
  const speakEffect = () => speakText([t.sectionEffect, t.effectAttract, t.effectRepel].join(". "), speechLang);
  const speakExample = () => speakText([t.sectionExamples, t.example].join(". "), speechLang);

  const pageBg = {
    background:
      "radial-gradient(46% 27% at 8% 41%, #cdebf4 0 61%, transparent 62%), radial-gradient(40% 26% at 94% 42%, #cdebf4 0 60%, transparent 61%), radial-gradient(72% 35% at 50% 33%, #f7f0ef 0 63%, transparent 64%), radial-gradient(80% 50% at 50% 75%, #f7f0ef 0 62%, transparent 63%), linear-gradient(180deg, #fbf5f2 0%, #fbf5f2 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-28 pt-8 text-slate-900 md:px-8 md:pb-32 md:pt-27"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <HomeButton />

      <div className="pointer-events-none absolute left-[-92px] top-[24%] h-[310px] w-[255px] rotate-[-10deg] rounded-[52%_52%_46%_46%] border-[7px] border-black bg-[#fff773] shadow-[inset_24px_22px_0_rgba(255,255,255,.48)] max-[900px]:left-[-150px]">
        <div className="absolute bottom-[-38px] left-[40px] h-[70px] w-[82px] rotate-[12deg] rounded-[14px] border-[7px] border-black bg-[#111]" />
        <div className="absolute bottom-[-4px] left-[56px] h-[84px] w-[54px] rotate-[18deg] rounded-[10px] border-[5px] border-black bg-[#fff7a3]" />
        <div className="absolute left-[102px] top-[76px] h-[126px] w-[98px] rounded-[50%] border-[4px] border-slate-500/35" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(70px,14vw,290px)] top-[-20px] h-[clamp(150px,18vw,270px)] w-[clamp(82px,9vw,150px)] bg-[#ffc84b] max-[700px]:opacity-55"
        style={{
          clipPath:
            "polygon(0 0,44% 0,68% 36%,93% 9%,100% 39%,78% 54%,100% 100%,57% 54%,38% 70%)",
        }}
      />
      <Spark className="right-[10%] top-[16%] h-11 w-11 max-[760px]:hidden" />
      <Spark className="right-[22%] top-[17%] h-12 w-12 max-[760px]:hidden" />
      <Spark className="right-[18%] top-[25%] h-5 w-5 max-[760px]:hidden" />
      <div className="pointer-events-none absolute left-[6%] bottom-[20%] text-[92px] leading-none opacity-75 max-[900px]:hidden">
        🧲
      </div>

      <div className="relative z-[1] mx-auto w-full max-w-[1280px]">
        <div className="inline-flex items-center rounded-[16px] border border-[#eadfce] bg-[#fffaf3]/95 px-5 py-2 text-[clamp(22px,2.4vw,34px)] font-black text-[#1f2937] shadow-[0_12px_24px_rgba(92,72,49,0.12)]">
          {t.title}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-[20px] border border-[#eadfce] bg-[#fffaf3]/92 p-5 shadow-[0_14px_28px_rgba(92,72,49,0.12)]">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center rounded-full border border-[#e5d4bd] bg-[#f6efe4] px-4 py-1 text-[18px] font-black text-[#2f3a45]">
                {t.sectionCause}
              </div>
              <button
                type="button"
                onClick={speakCause}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f5eadc] text-xl text-[#a35c2a] shadow-[0_8px_16px_rgba(92,72,49,0.12)] transition hover:scale-105 hover:bg-[#efe0cc]"
                aria-label={listenLabel}
                title={listenLabel}
              >
                {"\uD83D\uDD0A"}
              </button>
            </div>
            <p className="mt-4 text-[16px] font-semibold leading-[1.6]">{t.causeIntro}</p>
            <div className="mt-4 flex items-center gap-3">
              <img
                src="/images/p6/force-effect/charges-attract.svg"
                alt=""
                className="h-20 w-32 object-contain"
              />
              <p className="text-[16px] font-semibold leading-[1.6]">{t.chargeKinds}</p>
            </div>
            <p className="mt-3 text-[16px] font-semibold leading-[1.6]">{t.chargeInduction}</p>
          </div>

          <div className="rounded-[20px] border border-[#eadfce] bg-[#fffaf3]/92 p-5 shadow-[0_14px_28px_rgba(92,72,49,0.12)]">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center rounded-full border border-[#e5d4bd] bg-[#f6efe4] px-4 py-1 text-[18px] font-black text-[#2f3a45]">
                {t.sectionEffect}
              </div>
              <button
                type="button"
                onClick={speakEffect}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f5eadc] text-xl text-[#a35c2a] shadow-[0_8px_16px_rgba(92,72,49,0.12)] transition hover:scale-105 hover:bg-[#efe0cc]"
                aria-label={listenLabel}
                title={listenLabel}
              >
                {"\uD83D\uDD0A"}
              </button>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <img
                src="/images/p6/force-effect/charges-attract.svg"
                alt=""
                className="h-20 w-32 object-contain"
              />
              <p className="text-[16px] font-semibold leading-[1.6]">{t.effectAttract}</p>
            </div>
            <div className="mt-3 flex items-start gap-3">
              <img
                src="/images/p6/force-effect/charges-repel.svg"
                alt=""
                className="h-20 w-32 object-contain"
              />
              <p className="text-[16px] font-semibold leading-[1.6]">{t.effectRepel}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-[760px] rounded-[20px] border border-[#eadfce] bg-[#fffaf3]/92 p-5 shadow-[0_14px_28px_rgba(92,72,49,0.12)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center rounded-full border border-[#e5d4bd] bg-[#f6efe4] px-4 py-1 text-[18px] font-black text-[#2f3a45]">
                {t.sectionExamples}
              </div>
              <button
                type="button"
                onClick={speakExample}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f5eadc] text-xl text-[#a35c2a] shadow-[0_8px_16px_rgba(92,72,49,0.12)] transition hover:scale-105 hover:bg-[#efe0cc]"
                aria-label={listenLabel}
                title={listenLabel}
              >
                {"\uD83D\uDD0A"}
              </button>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <p className="text-[16px] font-semibold leading-[1.6]">{t.example}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
        <LanguagePills lang={lang} setLang={setLang} />
      </div>

      <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-7 md:right-7">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/experiment/electric-force-effect/summary")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          &laquo; {t.back}
        </button>
        <button
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6")}
          type="button"
          aria-label={t.next}
          title={t.next}
        >
          {t.next} &raquo;
        </button>
      </div>
    </div>
  );
}



