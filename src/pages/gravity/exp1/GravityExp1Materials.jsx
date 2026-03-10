import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const MATERIALS = {
  th: {
    pageTitle: "การทดลองที่ 1 เรื่อง ผลของแรงโน้มถ่วง",
    sectionTitle: "วัสดุอุปกรณ์",
    languageLabel: { th: "ไทย", ms: "มลายู", en: "อังกฤษ" },
    back: "ย้อนกลับ",
    next: "ไปต่อ",
    speak: "อ่านออกเสียง",
    translate: "แปลภาษา",
    items: [
      { id: "soccer", name: "ลูกบอล", image: "/images/p4/exp1/soccer-ball.png" },
      { id: "bocce", name: "ลูกเปตอง", image: "/images/p4/exp1/bocce.png" },
      { id: "feather", name: "ขนนก", image: "/images/p4/exp1/feather.png" },
      { id: "timer", name: "นาฬิกาจับเวลา", image: "/images/p4/exp1/timer.png" },
      { id: "ruler", name: "ไม้วัดความสูง", image: "/images/p4/exp1/ruler1.png" },
      { id: "platform", name: "แผ่นรองไม้", image: "/images/p4/exp1/platform.png" },
    ],
  },
  ms: {
    pageTitle: "Eksperimen 1: Kesan Daya Graviti",
    sectionTitle: "Bahan dan Peralatan",
    languageLabel: { th: "Thai", ms: "Melayu", en: "Inggeris" },
    back: "Kembali",
    next: "Terus",
    speak: "Baca suara",
    translate: "Terjemah",
    items: [
      { id: "soccer", name: "Bola", image: "/images/p4/exp1/soccer-ball.png" },
      { id: "bocce", name: "Bola Bocce", image: "/images/p4/exp1/bocce.png" },
      { id: "feather", name: "Bulu", image: "/images/p4/exp1/feather.png" },
      { id: "timer", name: "Jam Randik", image: "/images/p4/exp1/timer.png" },
      { id: "ruler", name: "Pembaris Ketinggian", image: "/images/p4/exp1/ruler1.png" },
      { id: "platform", name: "Papan Alas", image: "/images/p4/exp1/platform.png" },
    ],
  },
  en: {
    pageTitle: "Experiment 1: Effects of Gravity",
    sectionTitle: "Materials",
    languageLabel: { th: "Thai", ms: "Malay", en: "English" },
    back: "Back",
    next: "Next",
    speak: "Speak",
    translate: "Translate",
    items: [
      { id: "soccer", name: "Soccer Ball", image: "/images/p4/exp1/soccer-ball.png" },
      { id: "bocce", name: "Bocce Ball", image: "/images/p4/exp1/bocce.png" },
      { id: "feather", name: "Feather", image: "/images/p4/exp1/feather.png" },
      { id: "timer", name: "Stopwatch", image: "/images/p4/exp1/timer.png" },
      { id: "ruler", name: "Height Ruler", image: "/images/p4/exp1/ruler1.png" },
      { id: "platform", name: "Wooden Platform", image: "/images/p4/exp1/platform.png" },
    ],
  },
};

const VOICE_LANG = {
  th: "th-TH",
  ms: "ms-MY",
  en: "en-US",
};

export default function GravityExp1Materials() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const [speakingId, setSpeakingId] = useState("");

  const copy = useMemo(() => MATERIALS[language], [language]);

  const stopSpeaking = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setSpeakingId("");
  };

  const speak = (text, id) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = VOICE_LANG[language];
    utterance.onstart = () => setSpeakingId(id);
    utterance.onend = () => setSpeakingId("");
    utterance.onerror = () => setSpeakingId("");

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    stopSpeaking();

    return () => {
      stopSpeaking();
    };
  }, [language]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#111827] font-['Prompt',sans-serif] text-slate-900">
      <img
        src="/images/p4/sim/sball.png"
        alt="Laboratory background"
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.9]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-slate-800/30 via-slate-900/35 to-slate-950/65" />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] flex-col px-4 pb-28 pt-5 sm:px-8 sm:pt-8">
        <header className="mx-auto w-fit rounded-2xl border-4 border-[#1e2b49] bg-white/95 px-4 py-3 text-center shadow-[0_14px_38px_rgba(15,23,42,0.3)] sm:px-8">
          <h1 className="text-lg font-extrabold leading-tight text-[#0f172a] sm:text-3xl">{copy.pageTitle}</h1>
        </header>

        <div className="mt-5 w-fit rounded-xl border-4 border-[#1e2b49] bg-white/95 px-4 py-2 shadow-[0_14px_38px_rgba(15,23,42,0.3)] sm:mt-7 sm:px-6 sm:py-3">
          <h2 className="text-xl font-extrabold text-[#0f172a] sm:text-4xl">{copy.sectionTitle}</h2>
        </div>

        <div className="mt-6 grid grid-cols-1 justify-items-center gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
          {copy.items.map((item) => (
            <article
              key={item.id}
              className="w-full max-w-[250px] rounded-2xl border-[10px] border-[#7586aa] bg-[#e5e7eb]/95 p-3 shadow-[0_16px_34px_rgba(2,6,23,0.4)] backdrop-blur-[2px]"
            >
              <div className="flex aspect-square items-center justify-center rounded-lg bg-[#e8e4d8] p-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain drop-shadow-[0_8px_14px_rgba(15,23,42,0.22)]"
                />
              </div>

              <div className="mt-3 rounded-lg bg-[#e8e4d8] p-2 text-center">
                <p className="text-2xl font-bold leading-tight text-[#0f172a] sm:text-3xl">{item.name}</p>
              </div>

              <button
                type="button"
                onClick={() => speak(item.name, item.id)}
                className={`mt-3 w-full rounded-xl px-3 py-2 text-xl font-bold text-white shadow-sm transition ${
                  speakingId === item.id ? "bg-emerald-600" : "bg-[#2f88d0] hover:bg-[#256ca6]"
                }`}
              >
                {copy.speak}
              </button>
            </article>
          ))}
        </div>
      </section>

      <div className="absolute bottom-4 left-4 z-20 sm:bottom-6 sm:left-8">
        <div className="rounded-2xl border-2 border-[#c6d4eb] bg-white/90 p-2 shadow-[0_10px_28px_rgba(15,23,42,0.3)] backdrop-blur-sm">
          <div className="mb-2 flex items-center gap-2 rounded-xl bg-[#eef5ff] px-3 py-2 text-sm font-bold text-[#1e3a8a]">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm6.93 9h-3.06a15.8 15.8 0 00-1.23-5.02A8.03 8.03 0 0118.93 11zM12 4c.95 1.37 1.73 3.53 2.01 6H9.99C10.27 7.53 11.05 5.37 12 4zM4.07 13h3.06c.13 1.76.56 3.47 1.23 5.02A8.03 8.03 0 014.07 13zm3.06-2H4.07a8.03 8.03 0 014.29-5.02A15.8 15.8 0 007.13 11zM12 20c-.95-1.37-1.73-3.53-2.01-6h4.02c-.28 2.47-1.06 4.63-2.01 6zm2.64-1.98A15.8 15.8 0 0015.87 13h3.06a8.03 8.03 0 01-4.29 5.02z" />
            </svg>
            <span>{copy.translate}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(["th", "ms", "en"]).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLanguage(code)}
                className={`rounded-full px-3 py-2 text-sm font-bold transition sm:text-base ${
                  language === code
                    ? "bg-[#7ec3ff] text-[#0f172a]"
                    : "bg-[#deedff] text-[#1e3a8a] hover:bg-[#c6e1ff]"
                }`}
              >
                {copy.languageLabel[code]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <nav className="absolute bottom-4 right-4 z-20 sm:bottom-6 sm:right-8">
        <div className="ml-auto flex w-full gap-2 sm:w-auto">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-full bg-rose-500 px-6 py-3 text-2xl font-extrabold text-white shadow-[0_10px_24px_rgba(136,19,55,0.45)] transition hover:bg-rose-600"
          >
            {copy.back}
          </button>

          <button
            type="button"
            onClick={() => navigate("/p4/gravity/exp1/steps")}
            className="rounded-full bg-red-600 px-6 py-3 text-2xl font-extrabold text-white shadow-[0_10px_24px_rgba(127,29,29,0.45)] transition hover:bg-red-700"
          >
            {copy.next}
          </button>
        </div>
      </nav>
    </main>
  );
}

