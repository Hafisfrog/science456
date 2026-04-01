import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const TEXT = {
    th: {
    badge: "วงจรไฟฟ้าใกล้ตัว",
    title: "เรื่อง วงจรไฟฟ้าอย่างง่าย",
    heading: "ขั้นตอนการทดลอง",
    hint: "กดที่ลำโพงเพื่อฟังเสียง",
    back: "ย้อนกลับ",
    next: "ทดลอง",
    lang: { th: "ไทย", en: "English", ms: "Melayu" },
    speech: "th-TH",
    steps: [
      "ออกแบบและต่อวงจร: ต่อถ่านไฟฉาย 2 ก้อนแบบอนุกรม แล้วเชื่อมกับหลอดไฟและสวิตช์ให้ครบวงจร",
      "ทดลองและสังเกต: เปิดสวิตช์ สังเกตความสว่างของหลอดไฟ และเปรียบเทียบผล",
      "ทดลองซ้ำ: เปลี่ยนเป็นต่อถ่าน 4 ก้อน แล้วสังเกตความสว่างอีกครั้ง",
      "บันทึกผล: จดบันทึกสิ่งที่สังเกตได้และสรุปความสัมพันธ์ของจำนวนถ่านกับความสว่าง",
    ],
  },
  en: {
    badge: "Everyday Circuits",
    title: "Simple Electric Circuit",
    heading: "Experiment Steps",
    hint: "Tap the speaker to hear the step",
    back: "Back",
    next: "Next",
    lang: { th: "Thai", en: "English", ms: "Malay" },
    speech: "en-US",
    steps: [
      "Design and build the circuit: Connect 2 batteries in series, then connect them to the bulb and switch to complete the circuit.",
      "Test and observe: Turn on the switch, observe the bulb brightness, and compare the result.",
      "Test again: Change to 4 batteries, then observe the brightness again.",
      "Record results: Write down your observations and summarize the relationship between battery number and brightness.",
    ],
  },
  ms: {
    badge: "Litar Harian",
    title: "Litar Elektrik Mudah",
    heading: "Langkah eksperimen",
    hint: "Tekan ikon pembesar suara untuk mendengar",
    back: "Kembali",
    next: "Seterusnya",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
    speech: "ms-MY",
    steps: [
      "Rancang dan bina litar: Sambungkan 2 bateri secara siri, kemudian sambungkan kepada mentol dan suis sehingga litar lengkap.",
      "Uji dan perhati: Hidupkan suis, perhatikan kecerahan mentol, dan bandingkan hasilnya.",
      "Uji lagi: Tukar kepada 4 bateri, kemudian perhatikan kecerahan sekali lagi.",
      "Catat hasil: Tulis pemerhatian kamu dan rumuskan hubungan antara bilangan bateri dengan kecerahan.",
    ],
  },
};

function speakText(text, lang) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.95;

  window.speechSynthesis.speak(utter);
}

export default function P6ElectricCircuitSteps() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TEXT[lang] ?? TEXT.th, [lang]);

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  const languageOptions = [
    { id: "th", label: t.lang.th },
    { id: "en", label: t.lang.en },
    { id: "ms", label: t.lang.ms },
  ];

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-5 pt-3 text-slate-900 md:px-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(110px,10vw,180px)] top-[10px] h-[clamp(96px,10vw,136px)] w-[clamp(60px,6vw,92px)] bg-[#f7bd2b]"
        style={{
          clipPath:
            "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
        }}
      />

      <div className="relative z-[1] mx-auto grid h-full w-full max-w-[1380px] grid-rows-[auto_auto_1fr_auto] gap-2">
        <div className="inline-flex w-fit items-center rounded-full bg-gradient-to-br from-[#6bc3f0] to-[#4c9ee1] px-[18px] py-2 text-base font-black text-white shadow-[0_12px_22px_rgba(16,24,39,0.14)]">
          {t.badge}
        </div>

        <div className="text-[clamp(32px,2.5vw,54px)] font-black">{t.title}</div>

        <div className="rounded-[30px] bg-sky-200 p-[20px] shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <header className="mb-3">
              <h2 className="text-[clamp(38px,2.8vw,64px)] font-black">{t.heading}</h2>
              <p className="mt-2 text-[18px] font-bold text-slate-700">{t.hint}</p>
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

                <div className="fixed bottom-3 right-3 z-40 flex gap-3">
          <button
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-base font-bold text-slate-900 shadow"
            onClick={() => navigate("/p6/electric-circuit/materials")}
            type="button"
            aria-label={t.back}
            title={t.back}
          >
            <span className="text-xl leading-none">←</span>
            <span>{t.back}</span>
          </button>

          <button
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-base font-bold text-white shadow"
            onClick={() => navigate("/p6/electric-circuit/sim")}
            type="button"
            aria-label={t.next}
            title={t.next}
          >
            <span>{t.next}</span>
            <span className="text-xl leading-none">→</span>
          </button>
        </div>
      </div>

            <div className="fixed bottom-3 left-3 z-40 inline-flex items-center gap-3 rounded-2xl bg-white p-2 shadow">
        {languageOptions.map((item) => (
          <button
            key={item.id}
            className={`rounded-xl px-4 py-2 font-bold ${
              lang === item.id ? "bg-sky-500 text-white" : "bg-sky-100"
            }`}
            type="button"
            onClick={() => setLang(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

