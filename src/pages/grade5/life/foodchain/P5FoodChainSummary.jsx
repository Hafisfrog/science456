import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import { FoodChainLanguageSwitcher, FoodChainNavButtons } from "./FoodChainControls";

const VOICE_LANG = {
  th: "th-TH",
  en: "en-US",
  ms: "ms-MY",
};

const VOICE_LABEL = {
  th: "เล่นเสียง",
  en: "Play audio",
  ms: "Main audio",
};

const LANGUAGE_LABELS = {
  th: { th: "ไทย", en: "อังกฤษ", ms: "มลายูถิ่น" },
  en: { th: "ไทย", en: "อังกฤษ", ms: "มลายูถิ่น" },
  ms: { th: "ไทย", en: "อังกฤษ", ms: "มลายูถิ่น" },
};

const MALAY_SUMMARY_AUDIO = ["/audio/p5/12.1.mp3", "/audio/p5/12.2.mp3"];

const CONTENT = {
  th: {
    title: "สรุปผลการทดลอง",
    paragraph1:
      "จากกิจกรรมนี้ เราพบว่าสิ่งมีชีวิตแต่ละชนิดมีความสัมพันธ์กันเป็นระบบ โดยพลังงานถ่ายทอดจากผู้ผลิตไปยังผู้บริโภคตามลำดับผ่านกระบวนการกินเป็นอาหาร",
    paragraph2:
      "ดังนั้น ห่วงโซ่อาหารจึงเป็นกลไกสำคัญที่ช่วยถ่ายทอดพลังงานและรักษาสมดุลของระบบนิเวศ สิ่งมีชีวิตทุกชนิดล้วนมีบทบาทต่อกัน",
    back: "ย้อนกลับ",
    next: "ต่อไป",
  },
  en: {
    title: "Experiment Summary",
    paragraph1:
      "From this activity, we found that living things are connected as a system. Energy is transferred from producers to consumers in sequence through feeding relationships.",
    paragraph2:
      "Therefore, food chains are a key mechanism for energy transfer and ecosystem balance. Every living organism has an important role in the system.",
    back: "Back",
    next: "Next",
  },
  ms: {
    title: "เกอซีปูลาแอ ฮาเซ ปือจูบอแอ ",
    paragraph1:
      "ดารี ปือจูบอแอ ซากนีง, บือนอ ฮีโดะ ตียะ-ตียะ ยือนิฮ อาดอ ฮูบูแง ซาตู ซามอ ลา-เอ็ง ดาแล ซาตู ซีสเต็ม เฮาะ มานอ ตือนากอ ปีเนาะฮ ดารี ออแร บูวะ กือปาดอ ออแร กูนอ อีโกะ กีลีแร โปรเซะฮ มาแกแน ",
    paragraph2:
      "มากอ ราตา มาแกแน ปือติง ดาแล ซือกี ปีเนาะฮ ตือนากอ ดืองา จารอ กือซืออิมแบแง เอโกะ ซิสเตม (ฮูบูแง อัน ตารา บือนอ ฮีโดะ ดืองา อาแล) ซือมอ ยือนิฮ บือนอ ซามอ-ซามอ อาดอ ปือราแน ",
    back: "ฮูโน กือเละ",
    next: "ตือรุฮ",
  },
};

function SectionVoiceButton({ onClick, label, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#b9d7ef] bg-white/92 text-[#2563eb] shadow-[0_8px_18px_rgba(59,130,246,0.16)] transition hover:-translate-y-0.5 hover:shadow-lg ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          d="M5 10h4l5-4v12l-5-4H5z"
          fill="currentColor"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
        <path
          d="M17 9a5 5 0 0 1 0 6M19.5 7a8 8 0 0 1 0 10"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </svg>
    </button>
  );
}

export default function P5FoodChainSummary() {
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("th");
  const audioRef = useRef(null);

  const content = CONTENT[activeLang] ?? CONTENT.th;
  const voiceLabel = VOICE_LABEL[activeLang] ?? VOICE_LABEL.th;
  const languageLabels = LANGUAGE_LABELS.th;

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const speakText = (text, index) => {
    stopAudio();

    const audioSrc = activeLang === "ms" ? MALAY_SUMMARY_AUDIO[index] : undefined;
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audioRef.current = audio;
      audio.play().catch(() => {});
      return;
    }

    if (typeof window === "undefined" || !window.speechSynthesis || !text) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = VOICE_LANG[activeLang] ?? VOICE_LANG.th;
    utterance.rate = 0.95;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => stopAudio();
  }, []);

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-[url('/images/p5/back.png')] bg-cover bg-center bg-no-repeat font-['Prompt',sans-serif]">
      <HomeButton />

      <div className="absolute inset-0 bg-white/5" />

      <div className="relative z-10 flex min-h-screen flex-col items-center px-4 pb-32 pt-10 sm:px-6 sm:pb-36">
        <h1 className="mb-8 text-center text-3xl font-bold text-slate-900 sm:text-5xl">
          {content.title}
        </h1>

        <div className="w-full max-w-[900px] rounded-[28px] border-[5px] border-black bg-white px-6 py-8 text-lg leading-8 text-slate-900 shadow-[0_10px_24px_rgba(0,0,0,0.2)] sm:px-10 sm:py-10 sm:text-[20px] sm:leading-[1.9]">
          <div className="rounded-[22px] bg-[#f8fbff] px-4 py-4 shadow-[inset_0_0_0_1px_rgba(186,230,253,0.55)] sm:px-5">
            <div className="flex items-start justify-between gap-4">
              <p className="flex-1">{content.paragraph1}</p>
              <SectionVoiceButton
                onClick={() => speakText(content.paragraph1, 0)}
                label={voiceLabel}
                className="h-9 w-9 shrink-0"
              />
            </div>
          </div>

          <div className="mt-5 rounded-[22px] bg-[#fffbea] px-4 py-4 shadow-[inset_0_0_0_1px_rgba(253,224,71,0.35)] sm:px-5">
            <div className="flex items-start justify-between gap-4">
              <p className="flex-1">{content.paragraph2}</p>
              <SectionVoiceButton
                onClick={() => speakText(content.paragraph2, 1)}
                label={voiceLabel}
                className="h-9 w-9 shrink-0"
              />
            </div>
          </div>

        </div>

      </div>

      <div className="fixed bottom-[18px] left-[18px] z-40">
        <FoodChainLanguageSwitcher
          size="materials"
          value={activeLang}
          onChange={setActiveLang}
          labels={languageLabels}
        />
      </div>

      <div className="fixed bottom-[18px] right-[18px] z-40 max-[720px]:bottom-[12px] max-[720px]:right-[12px]">
        <FoodChainNavButtons
          size="materials"
          backLabel={content.back}
          nextLabel={content.next}
          nextArrow={"\u00BB"}
          onBack={() => navigate(-1)}
          onNext={() => navigate("/p5/life/foodchain/summary2")}
        />
      </div>
    </div>
  );
}
