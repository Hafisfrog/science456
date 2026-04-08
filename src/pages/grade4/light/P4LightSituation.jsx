import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LightLanguageSwitcher, LightNavButtons } from "./LightControls";

const CONTENT = {
  th: {
    title: "สถานการณ์ปัญหา",
    paragraphs: [
      'ผู้เรียนสวมบทบาทเป็น "นักวิทยาศาสตร์" ที่ต้องระบุสิ่งของภายในกล่องผ่านตัวกลางชนิดต่าง ๆ',
      "นักเรียนอยู่ในห้องเรียนวิทยาศาสตร์ที่มืดสนิท มีกล่องปริศนา 3 ใบ แต่ละใบมีแผ่นวัสดุปิดช่องมองด้านหน้า",
      "นักเรียนต้องสังเกตแสงที่ผ่านวัสดุแต่ละชนิด เพื่อค้นหาว่าในกล่องมีอะไรอยู่",
    ],
    speakText:
      "สถานการณ์ปัญหา นักเรียนสวมบทบาทเป็นนักวิทยาศาสตร์ เพื่อสังเกตแสงที่ผ่านวัสดุแต่ละชนิด แล้วทายว่าสิ่งของในกล่องคืออะไร",
    back: "ย้อนกลับ",
    next: "ต่อไป",
  },
  en: {
    title: "Problem Situation",
    paragraphs: [
      'Students take the role of a "scientist" who must identify objects inside a box through different light media.',
      "The class is in a dark science room with 3 mystery boxes. Each box has a different material covering the viewing window.",
      "Students observe how light passes through each material to determine what object is inside each box.",
    ],
    speakText:
      "Problem situation: students act as scientists and observe light through different materials to identify objects inside mystery boxes.",
    back: "Back",
    next: "Next",
  },
  ms: {
    title: "Situasi Masalah",
    paragraphs: [
      'Murid memainkan peranan sebagai "saintis" yang perlu mengenal pasti objek di dalam kotak melalui medium cahaya yang berbeza.',
      "Murid berada di dalam bilik sains yang gelap dengan 3 kotak misteri. Setiap kotak mempunyai bahan penutup pada ruang melihat.",
      "Murid memerhati cahaya yang melalui setiap bahan untuk menentukan objek yang berada di dalam kotak.",
    ],
    speakText:
      "Situasi masalah: murid bertindak sebagai saintis dan memerhati cahaya melalui bahan yang berbeza untuk mengenal pasti objek dalam kotak misteri.",
    back: "Kembali",
    next: "Seterusnya",
  },
};

const LANGUAGE_LABELS = {
  th: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  en: { th: "Thai", en: "English", ms: "Malay" },
  ms: { th: "Thai", en: "Inggeris", ms: "Melayu" },
};

export default function P4LightSituation() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const content = CONTENT[language] ?? CONTENT.th;

  const speak = (text) => {
    try {
      if (!text || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === "th" ? "th-TH" : language === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-cyan-300 via-sky-500 to-sky-800 px-4 pb-28 pt-8 font-['Prompt',sans-serif] sm:px-8">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/materials/back.png')" }}
      />
      <div className="pointer-events-none absolute left-1/2 top-[-13rem] h-[28rem] w-[140%] -translate-x-1/2 rounded-b-[100%] bg-slate-200/80" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background:repeating-linear-gradient(90deg,rgba(15,23,42,0.35)_0px,rgba(15,23,42,0.35)_10px,transparent_10px,transparent_190px)]" />

      <div className="relative z-10 w-full max-w-5xl">
        <div className="relative mb-8 rounded-3xl border-2 border-blue-200 bg-white/95 p-8 text-center shadow-[0_8px_22px_rgba(0,0,0,0.08)] sm:p-10">
          <h1 className="text-3xl font-extrabold text-blue-700 sm:text-4xl">{content.title}</h1>
          <button
            type="button"
            onClick={() => speak(content.title)}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-base text-blue-700 shadow-[0_4px_10px_rgba(14,116,144,0.2)] transition hover:bg-blue-200"
            aria-label="Speak title"
          >
            {"\uD83D\uDD0A"}
          </button>
        </div>

        <div className="relative mb-10 rounded-3xl border-2 border-sky-300 bg-white p-7 text-base leading-8 text-slate-600 shadow-[0_10px_24px_rgba(0,0,0,0.08)] sm:p-10 sm:text-xl sm:leading-9">
          {content.paragraphs.map((text) => (
            <p key={text} className="mb-4 last:mb-0">
              {text}
            </p>
          ))}
          <button
            type="button"
            onClick={() => speak(content.paragraphs.join(" "))}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-base text-sky-700 shadow-[0_4px_10px_rgba(14,116,144,0.2)] transition hover:bg-sky-200"
            aria-label="Speak content"
          >
            {"\uD83D\uDD0A"}
          </button>
        </div>

      </div>

      <div className="absolute bottom-4 left-4 z-20 sm:bottom-6 sm:left-6">
        <LightLanguageSwitcher
          value={language}
          onChange={setLanguage}
          labels={LANGUAGE_LABELS[language]}
        />
      </div>

      <div className="absolute bottom-4 right-4 z-20 sm:bottom-6 sm:right-6">
        <LightNavButtons
          backLabel={content.back}
          nextLabel={content.next}
          onBack={() => navigate("/p4/light/basic")}
          onNext={() => navigate("/p4/light/select")}
        />
      </div>
    </div>
  );
}
