import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";

const TEXT = {
  th: {
    heading: "ขั้นตอนการทดลอง",
    hint: "กดที่ลำโพงเพื่อฟังเสียง",
    back: "ย้อนกลับ",
    next: "ต่อไป",
    speech: "th-TH",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
    steps: [
      "ออกแบบและต่อวงจร: ต่อถ่านไฟฉาย 2 ก้อนแบบอนุกรม แล้วเชื่อมกับหลอดไฟและสวิตช์ให้ครบวงจร",
      "ทดลองและสังเกต: เปิดสวิตช์ สังเกตความสว่างของหลอดไฟ และเปรียบเทียบผล",
      "ทดลองซ้ำ: เปลี่ยนเป็นต่อถ่าน 4 ก้อน แล้วสังเกตความสว่างอีกครั้ง",
      "บันทึกผล: จดบันทึกสิ่งที่สังเกตได้และสรุปความสัมพันธ์ของจำนวนถ่านกับความสว่าง",
    ],
  },
  en: {
    heading: "Experiment Steps",
    hint: "Tap the speaker to hear the step",
    back: "Back",
    next: "Next",
    speech: "en-US",
    lang: { th: "Thai", en: "English", ms: "Malay" },
    steps: [
      "Design and build the circuit: Connect 2 batteries in series, then connect them to the bulb and switch to complete the circuit.",
      "Test and observe: Turn on the switch, observe the bulb brightness, and compare the result.",
      "Test again: Change to 4 batteries, then observe the brightness again.",
      "Record results: Write down your observations and summarize the relationship between battery number and brightness.",
    ],
  },
  ms: {
    heading: "Langkah Eksperimen",
    hint: "Tekan ikon pembesar suara untuk mendengar",
    back: "Kembali",
    next: "Seterusnya",
    speech: "ms-MY",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
    steps: [
      "Rancang dan bina litar: Sambungkan 2 bateri secara siri, kemudian sambungkan kepada mentol dan suis sehingga litar lengkap.",
      "Uji dan perhati: Hidupkan suis, perhatikan kecerahan mentol, dan bandingkan hasilnya.",
      "Uji lagi: Tukar kepada 4 bateri, kemudian perhatikan kecerahan sekali lagi.",
      "Catat hasil: Tulis pemerhatian kamu dan rumuskan hubungan antara bilangan bateri dengan kecerahan.",
    ],
  },
};

const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย" },
   { id: "ms", label: "มลายู" },
  { id: "en", label: "อังกฤษ" },
];

function speakText(text, lang) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.95;

  window.speechSynthesis.speak(utter);
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

export default function P6ElectricCircuitSteps() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TEXT[lang] ?? TEXT.th, [lang]);

  const pageBg = {
    background:
      "radial-gradient(46% 27% at 8% 41%, #cdebf4 0 61%, transparent 62%), radial-gradient(40% 26% at 94% 42%, #cdebf4 0 60%, transparent 61%), radial-gradient(72% 35% at 50% 33%, #f7f0ef 0 63%, transparent 64%), radial-gradient(80% 50% at 50% 75%, #f7f0ef 0 62%, transparent 63%), linear-gradient(180deg, #fbf5f2 0%, #fbf5f2 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-5 pt-8 text-slate-900 md:px-8 md:pt-15"
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

      <div className="relative z-[1] mx-auto flex min-h-[calc(100vh-170px)] w-full max-w-[1380px] items-center">
        <div className="w-full rounded-[30px] border border-[#eadfce] bg-[#fffaf3]/90 p-[20px] shadow-[0_18px_34px_rgba(92,72,49,0.12)] backdrop-blur-[1px]">
          <header className="mb-3">
            <h2 className="text-[clamp(38px,2.8vw,64px)] font-black">{t.heading}</h2>
          </header>
            <ol className="grid list-none gap-3 p-0">
              {t.steps.map((text, index) => (
                <li
                  key={`${lang}-${index}`}
                  className="grid grid-cols-[58px_1fr_auto] items-center gap-3 rounded-full border-[3px] border-slate-700 bg-slate-100 px-[18px] py-2 shadow-[6px_7px_0_rgba(15,23,42,0.18)]"
                >
                  <span className="grid h-[50px] w-[50px] place-items-center rounded-full bg-[#edbe42] text-[38px] font-black text-white">
                    {index + 1}
                  </span>

                  <span className="text-[clamp(21px,1.45vw,30px)] font-black leading-[1.24]">{text}</span>

                  <button
                    type="button"
                    onClick={() => speakText(text, t.speech)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-700 transition hover:scale-105"
                    aria-label={t.hint}
                    title={t.hint}
                  >
                    🔊
                  </button>
                </li>
            ))}
          </ol>
        </div>

        <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-7 md:right-7">
          <button
            className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
            onClick={() => navigate("/p6/electric-circuit/materials")}
            type="button"
            aria-label={t.back}
            title={t.back}
          >
            &laquo; {t.back}
          </button>

          <button
            className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
            onClick={() => navigate("/p6/electric-circuit/sim")}
            type="button"
            aria-label={t.next}
            title={t.next}
          >
            {t.next} &raquo;
          </button>
        </div>
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
    </div>
  );
}

