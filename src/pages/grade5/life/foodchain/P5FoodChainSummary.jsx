import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  th: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  en: { th: "Thai", en: "English", ms: "Malay" },
  ms: { th: "Thai", en: "English", ms: "Melayu" },
};

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
    title: "Ringkasan Eksperimen",
    paragraph1:
      "Daripada aktiviti ini, kita dapati hidupan saling berkaitan dalam satu sistem. Tenaga dipindahkan daripada pengeluar kepada pengguna secara berurutan melalui hubungan pemakanan.",
    paragraph2:
      "Oleh itu, rantai makanan ialah mekanisme penting untuk pemindahan tenaga dan keseimbangan ekosistem. Setiap hidupan mempunyai peranan dalam sistem ini.",
    back: "Kembali",
    next: "Seterusnya",
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

  const content = CONTENT[activeLang] ?? CONTENT.th;
  const voiceLabel = VOICE_LABEL[activeLang] ?? VOICE_LABEL.th;
  const languageLabels = LANGUAGE_LABELS.th;

  const speakText = (text) => {
    if (typeof window === "undefined" || !window.speechSynthesis || !text) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = VOICE_LANG[activeLang] ?? VOICE_LANG.th;
    utterance.rate = 0.95;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-[url('/images/p5/back.png')] bg-cover bg-center bg-no-repeat font-['Prompt',sans-serif]">
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
                onClick={() => speakText(content.paragraph1)}
                label={voiceLabel}
                className="h-9 w-9 shrink-0"
              />
            </div>
          </div>

          <div className="mt-5 rounded-[22px] bg-[#fffbea] px-4 py-4 shadow-[inset_0_0_0_1px_rgba(253,224,71,0.35)] sm:px-5">
            <div className="flex items-start justify-between gap-4">
              <p className="flex-1">{content.paragraph2}</p>
              <SectionVoiceButton
                onClick={() => speakText(content.paragraph2)}
                label={voiceLabel}
                className="h-9 w-9 shrink-0"
              />
            </div>
          </div>

        </div>

      </div>

      <div className="absolute bottom-3 left-3 z-20 sm:bottom-4 sm:left-4 md:bottom-5 md:left-5">
        <FoodChainLanguageSwitcher
          value={activeLang}
          onChange={setActiveLang}
          labels={languageLabels}
        />
      </div>

      <div className="absolute bottom-3 right-3 z-20 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5">
        <FoodChainNavButtons
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
