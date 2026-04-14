import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LightLanguageSwitcher, LightNavButtons } from "./LightControls";

const SPEECH_LOCALES = {
  th: "th-TH",
  en: "en-US",
  ms: "ms-MY",
};

const UI = {
  th: {
    header: "คำถามนี้มีคำตอบ",
    headerSpeakLabel: "ฟังหัวข้อด้านบน",
    answerTitle: "👉 เพราะวัสดุแต่ละชนิดยอมให้แสงผ่านได้ไม่เท่ากัน",
    hiddenPlaceholder: "กดปุ่มเฉลยคำตอบเพื่อดูคำอธิบาย",
    reveal: "เฉลยคำตอบ",
    hide: "ซ่อนคำตอบ",
    cards: [
      {
        number: "1",
        title: "วัตถุโปร่งใส",
        color: "blue",
        examples: "เช่น กระจกใส แก้วใส พลาสติกใส",
        pass: "แสงผ่านได้เกือบทั้งหมด",
        result: "มองเห็นสิ่งของด้านหลังได้ชัดเจน",
      },
      {
        number: "2",
        title: "วัตถุโปร่งแสง",
        color: "amber",
        examples: "เช่น กระจกฝ้า กระดาษไข หมอก",
        pass: "แสงผ่านได้บางส่วน",
        result: "มองเห็นสิ่งของด้านหลังไม่ชัด",
      },
      {
        number: "3",
        title: "วัตถุทึบแสง",
        color: "gray",
        examples: "เช่น ไม้ โลหะ กำแพง",
        pass: "แสงผ่านไม่ได้",
        result: "ไม่สามารถมองเห็นด้านหลังได้",
      },
    ],
    topSpeakLabel: "ฟังคำถามด้านบน",
    speakLabel: "ฟังคำอธิบายข้อนี้",
    answerSpeakLabel: "ฟังเฉลยข้อนี้",
    back: "ย้อนกลับ",
    finish: "ต่อไป",
  },
  en: {
    header: "Answers",
    headerSpeakLabel: "Listen to the top heading",
    answerTitle: "👉 Because each material allows light to pass through differently",
    hiddenPlaceholder: "Press show answer to reveal the explanation.",
    reveal: "Show Answer",
    hide: "Hide Answer",
    cards: [
      {
        number: "1",
        title: "Transparent Objects",
        color: "blue",
        examples: "Examples: clear glass, clear cup, clear plastic",
        pass: "Light passes through almost completely",
        result: "Objects behind can be seen clearly",
      },
      {
        number: "2",
        title: "Translucent Objects",
        color: "amber",
        examples: "Examples: frosted glass, wax paper, fog",
        pass: "Light passes through partially",
        result: "Objects behind are not clearly visible",
      },
      {
        number: "3",
        title: "Opaque Objects",
        color: "gray",
        examples: "Examples: wood, metal, wall",
        pass: "Light cannot pass through",
        result: "Objects behind cannot be seen",
      },
    ],
    topSpeakLabel: "Listen to the question above",
    speakLabel: "Listen to this card",
    answerSpeakLabel: "Listen to this answer",
    back: "Back",
    finish: "Next",
  },
  ms: {
    header: "Jawapan",
    headerSpeakLabel: "Dengar tajuk di atas",
    answerTitle: "👉 Kerana setiap bahan membenarkan cahaya melalui pada tahap berbeza",
    hiddenPlaceholder: "Tekan tunjuk jawapan untuk melihat penerangan.",
    reveal: "Tunjuk Jawapan",
    hide: "Sembunyikan Jawapan",
    cards: [
      {
        number: "1",
        title: "Objek Lutsinar",
        color: "blue",
        examples: "Contoh: kaca jernih, gelas jernih, plastik jernih",
        pass: "Cahaya menembusi hampir sepenuhnya",
        result: "Objek di belakang kelihatan jelas",
      },
      {
        number: "2",
        title: "Objek Lut Separa",
        color: "amber",
        examples: "Contoh: kaca kabur, kertas surih, kabus",
        pass: "Cahaya menembusi sebahagian",
        result: "Objek di belakang kurang jelas",
      },
      {
        number: "3",
        title: "Objek Legap",
        color: "gray",
        examples: "Contoh: kayu, logam, dinding",
        pass: "Cahaya tidak menembusi",
        result: "Objek di belakang tidak dapat dilihat",
      },
    ],
    topSpeakLabel: "Dengar soalan di atas",
    speakLabel: "Dengar kad ini",
    answerSpeakLabel: "Dengar jawapan ini",
    back: "Kembali",
    finish: "Seterusnya",
  },
};

const CARD_THEMES = {
  blue: {
    card: "border-sky-200 bg-sky-50/95",
    badge: "bg-sky-200 text-sky-900",
    button: "from-sky-100 to-white text-sky-900 hover:from-sky-200 hover:to-sky-50",
    answer: "border-sky-100 bg-white/95",
    listen: "border-sky-200 bg-white/95 text-sky-800 hover:bg-sky-100",
  },
  amber: {
    card: "border-amber-200 bg-amber-50/95",
    badge: "bg-amber-200 text-amber-900",
    button: "from-amber-100 to-white text-amber-900 hover:from-amber-200 hover:to-amber-50",
    answer: "border-amber-100 bg-white/95",
    listen: "border-amber-200 bg-white/95 text-amber-800 hover:bg-amber-100",
  },
  gray: {
    card: "border-slate-200 bg-slate-50/95",
    badge: "bg-slate-200 text-slate-900",
    button: "from-slate-100 to-white text-slate-900 hover:from-slate-200 hover:to-slate-50",
    answer: "border-slate-200 bg-white/95",
    listen: "border-slate-200 bg-white/95 text-slate-700 hover:bg-slate-100",
  },
};

export default function P4LightQA() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const content = useMemo(() => UI[language] ?? UI.th, [language]);

  const toggleAnswer = (cardNumber) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [cardNumber]: !prev[cardNumber],
    }));
  };

  const buildHeaderSpeechText = () => {
    if (language === "th") {
      return `${content.header}`;
    }
    return `${content.header}.`;
  };

  const buildCardSpeechText = (card) => {
    if (!card) return "";
    if (language === "th") {
      return `${card.title} ${card.examples}`;
    }
    return `${card.title}. ${card.examples}.`;
  };

  const buildAnswerSpeechText = (card) => {
    if (!card) return "";
    if (language === "th") {
      return `${card.pass} ${card.result}`;
    }
    return `${card.pass}. ${card.result}.`;
  };

  const speakText = (text) => {
    if (
      typeof window === "undefined" ||
      typeof SpeechSynthesisUtterance === "undefined" ||
      !window.speechSynthesis
    ) {
      return;
    }

    const synth = window.speechSynthesis;
    const targetLocale = SPEECH_LOCALES[language] || SPEECH_LOCALES.th;

    const doSpeak = () => {
      const voices = synth.getVoices();
      const localeLower = targetLocale.toLowerCase();
      const prefix = localeLower.split("-")[0];

      let voice =
        voices.find((item) => item.lang?.toLowerCase() === localeLower) ||
        voices.find((item) => item.lang?.toLowerCase().startsWith(prefix));

      if (language === "ms") {
        voice =
          voices.find((item) => item.lang?.toLowerCase() === "ms-my") ||
          voices.find((item) => item.lang?.toLowerCase().startsWith("ms")) ||
          voices.find((item) => /malay|melayu/i.test(item.name || "")) ||
          voices.find((item) => item.lang?.toLowerCase() === "id-id") ||
          voices.find((item) => item.lang?.toLowerCase().startsWith("id")) ||
          voices.find((item) => /indonesian|bahasa/i.test(item.name || "")) ||
          voices.find((item) => item.lang?.toLowerCase().startsWith("en")) ||
          voices[0];
      }

      const utterance = new SpeechSynthesisUtterance(text);
      if (voice) utterance.voice = voice;
      utterance.lang = voice?.lang || targetLocale;
      utterance.rate = language === "ms" ? 0.9 : 0.92;
      utterance.pitch = 1;

      synth.cancel();
      synth.speak(utterance);
    };

    const voices = synth.getVoices();
    if (voices.length) {
      doSpeak();
      return;
    }

    let spoke = false;
    const speakOnce = () => {
      if (spoke) return;
      spoke = true;
      doSpeak();
    };
    const onVoicesChanged = () => {
      synth.removeEventListener("voiceschanged", onVoicesChanged);
      speakOnce();
    };

    synth.addEventListener("voiceschanged", onVoicesChanged);
    setTimeout(() => {
      synth.removeEventListener("voiceschanged", onVoicesChanged);
      speakOnce();
    }, 500);
  };

  const speakCard = (card) => {
    speakText(buildCardSpeechText(card));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-100 via-cyan-100 to-blue-200 font-['Prompt',sans-serif]">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/materials/back.png')" }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.7),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(186,230,253,0.8),transparent_40%)]" />

      <div className="relative z-10 min-h-screen overflow-y-auto p-4 pb-28 sm:p-6 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 flex items-center justify-start pl-[240px] max-[900px]:pl-[190px] max-[640px]:justify-center max-[640px]:pl-0">
            <h1 className="m-0 inline-flex w-fit items-center gap-4 rounded-2xl border-2 border-sky-200 bg-white/90 px-6 py-3 text-center text-xl font-extrabold text-sky-900 shadow-[0_10px_22px_rgba(14,116,144,0.2)] backdrop-blur-sm sm:text-3xl">
              <span>{content.header}</span>
              <button
                type="button"
                onClick={() => speakText(buildHeaderSpeechText())}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-sky-200 bg-white/95 text-lg text-sky-800 shadow-[0_10px_20px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:bg-sky-100 sm:h-12 sm:w-12"
                aria-label={content.headerSpeakLabel}
                title={content.headerSpeakLabel}
              >
                🔊
              </button>
            </h1>
          </div>

          <div className="relative">
            <img
              className="pointer-events-none absolute bottom-[-6px] left-[-96px] h-auto w-[min(32%,320px)] select-none drop-shadow-[0_10px_14px_rgba(0,0,0,0.25)] max-[900px]:bottom-[-34px] max-[900px]:w-[min(32%,240px)] max-[640px]:hidden"
              src="/images/p4/exp3/teacher.png"
              alt="teacher"
            />

            <div className="ml-[230px] max-[900px]:ml-[190px] max-[640px]:ml-0">

              <div className="relative">
                <div className="pointer-events-none absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-[28px] bg-cyan-300/70" />
                <div className="rounded-[28px] border-[4px] border-sky-300 bg-white/95 p-5 shadow-[0_12px_26px_rgba(14,116,144,0.22)] backdrop-blur-sm sm:p-6">

                  <div className="grid gap-4">
                    {content.cards.map((card) => {
                      const theme = CARD_THEMES[card.color] ?? CARD_THEMES.blue;
                      const isRevealed = Boolean(revealedAnswers[card.number]);

                      return (
                        <div
                          key={card.number}
                          className={`rounded-[24px] border-2 p-4 shadow-[0_14px_28px_rgba(15,23,42,0.08)] ${theme.card}`}
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex items-start gap-3">
                              <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-base font-black ${theme.badge}`}
                              >
                                {card.number}
                              </div>
                              <div>
                                <div className="text-base font-extrabold text-slate-900 sm:text-lg">
                                  {card.title}
                                </div>
                                <div className="mt-1 text-sm text-slate-700 sm:text-base">
                                  {card.examples}
                                </div>
                              </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-2 self-start sm:self-auto">
                              <button
                                type="button"
                                onClick={() => speakCard(card)}
                                className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border text-lg shadow-[0_10px_20px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 ${theme.listen}`}
                                aria-label={`${content.speakLabel}: ${card.title}`}
                                title={`${content.speakLabel}: ${card.title}`}
                              >
                                🔊
                              </button>

                              <button
                                type="button"
                                onClick={() => toggleAnswer(card.number)}
                                className={`inline-flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b px-4 py-2 text-sm font-black shadow-[0_10px_20px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 ${theme.button}`}
                              >
                                {isRevealed ? content.hide : content.reveal}
                              </button>
                            </div>
                          </div>

                          {isRevealed ? (
                            <div
                              className={`mt-4 rounded-[20px] border px-4 py-4 text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] ${theme.answer}`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-bold text-red-600 sm:text-base">
                                    {card.pass}
                                  </div>
                                  <div className="mt-1 text-sm text-red-600 sm:text-base">
                                    👉 {card.result}
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => speakText(buildAnswerSpeechText(card))}
                                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-red-200 bg-white/95 text-lg text-red-500 shadow-[0_10px_20px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:bg-red-50"
                                  aria-label={`${content.answerSpeakLabel}: ${card.title}`}
                                  title={`${content.answerSpeakLabel}: ${card.title}`}
                                >
                                  🔊
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-4 rounded-[20px] border border-dashed border-slate-300/80 bg-white/70 px-4 py-4 text-sm font-semibold text-slate-500">
                              {content.hiddenPlaceholder}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="fixed bottom-[18px] left-[18px] z-30">
        <LightLanguageSwitcher
          value={language}
          onChange={setLanguage}
          labels={{ th: "ไทย", en: "อังกฤษ", ms: "มลายู" }}
        />
      </div>

      <div className="fixed bottom-[18px] right-[18px] z-30">
        <LightNavButtons
          className="ml-auto"
          backLabel={content.back}
          nextLabel={content.finish}
          onBack={() => navigate("/p4/light/summary")}
          onNext={() => navigate("/p4/light/concept")}
        />
      </div>
    </div>
  );
}
