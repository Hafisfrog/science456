import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../HomeButton";
import { LightLanguageSwitcher, LightNavButtons } from "./LightControls";

const CONTENT = {
  th: {
    gradeLabel: "ชั้นประถมศึกษาปีที่ 4",
    title: "ตัวกลางของแสง",
    sectionTitle: "ทักษะกระบวนการทางวิทยาศาสตร์",
    skills: [
      "ทักษะการสังเกต",
      "ทักษะการจำแนกประเภท",
      "ทักษะการพยากรณ์",
      "ทักษะการลงความเห็น\nจากข้อมูล",
    ],
    back: "ย้อนกลับ",
    next: "ต่อไป",
    speak: "ฟัง",
  },
  en: {
    gradeLabel: "Grade 4",
    title: "Medium of Light",
    sectionTitle: "Science Process Skills",
    skills: [
      "Observation skill",
      "Classification skill",
      "Prediction skill",
      "Inferring from data",
    ],
    back: "Back",
    next: "Next",
    speak: "Listen",
  },
  ms: {
    gradeLabel: "Tahun 4",
    title: "Medium Cahaya",
    sectionTitle: "Kemahiran Proses Sains",
    skills: [
      "Kemahiran memerhati",
      "Kemahiran mengelaskan",
      "Kemahiran meramal",
      "Membuat inferens\ndaripada data",
    ],
    back: "Kembali",
    next: "Seterusnya",
    speak: "Dengar",
  },
};

export default function P4LightScienceSkills() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const audioRef = useRef(null);
  const t = CONTENT[lang] ?? CONTENT.th;

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const speakText = (text) => {
    try {
      stopAudio();
      if (!window.speechSynthesis || !text) return;
      const utterance = new SpeechSynthesisUtterance(text.replace(/\n/g, " "));
      utterance.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-b from-cyan-300 via-sky-500 to-sky-800 font-['Prompt',sans-serif]">
      <HomeButton />

      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/materials/back.png')" }}
      />
      <div className="pointer-events-none absolute left-1/2 top-[-13rem] h-[28rem] w-[140%] -translate-x-1/2 rounded-b-[100%] bg-sky-100/70" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background:repeating-linear-gradient(90deg,rgba(15,23,42,0.35)_0px,rgba(15,23,42,0.35)_10px,transparent_10px,transparent_190px)]" />

      <div className="relative h-full w-full p-6 max-[640px]:p-4">
        <div className="mt-[22px] text-center">
          <div className="inline-block rounded-2xl bg-white/90 px-[18px] py-[10px] text-2xl font-black text-blue-900 shadow-[0_10px_22px_rgba(0,0,0,.14)] max-[640px]:text-lg">
            {t.gradeLabel}
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <h1 className="m-0 text-6xl font-black text-gray-900 [text-shadow:0_4px_0_rgba(255,255,255,.6)] max-[900px]:text-[42px] max-[640px]:text-[34px]">
              {t.title}
            </h1>
            <button
              className="h-[54px] w-[54px] cursor-pointer rounded-2xl border-none bg-white/90 text-[22px] shadow-[0_12px_22px_rgba(0,0,0,.16)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(0,0,0,.20)] max-[640px]:h-12 max-[640px]:w-12"
              onClick={() => speakText(t.title)}
              type="button"
              title={t.speak}
            >
              {"\uD83D\uDD0A"}
            </button>
          </div>
        </div>

        <main className="ml-[250px] mt-[26px] max-w-[900px] rounded-[28px] border border-white/40 bg-white/90 px-6 py-[22px] shadow-[0_18px_36px_rgba(0,0,0,.18)] max-[1100px]:ml-[215px] max-[900px]:ml-[185px] max-[900px]:mt-5 max-[640px]:m-[18px_0_0] max-[640px]:p-[18px]">
          <div className="mb-4 flex items-center justify-start">
            <div className="inline-block rounded-[14px] bg-gradient-to-br from-blue-600 to-blue-700 px-[18px] py-[10px] text-2xl font-black text-white shadow-[0_12px_24px_rgba(0,0,0,.14)] max-[640px]:text-xl">
              {t.sectionTitle}
            </div>
          </div>

          <div>
            {t.skills.map((skill, index) => (
              <div
                className="mb-[14px] flex items-center gap-[14px] rounded-[22px] border-4 border-sky-200 bg-sky-50 p-4"
                key={skill}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-400 text-[22px] font-black text-white shadow-[0_10px_18px_rgba(0,0,0,.16)]">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1 whitespace-pre-line text-2xl font-black leading-[1.25] text-gray-900 max-[900px]:text-xl max-[640px]:text-lg">
                  {skill}
                </div>
                <button
                  className="h-[46px] w-[46px] shrink-0 cursor-pointer rounded-[14px] border-none bg-white/90 text-xl shadow-[0_12px_22px_rgba(0,0,0,.16)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(0,0,0,.20)]"
                  onClick={() => speakText(skill)}
                  type="button"
                  title={t.speak}
                >
                  {"\uD83D\uDD0A"}
                </button>
              </div>
            ))}
          </div>
        </main>

        <img
          className="pointer-events-none absolute bottom-[30px] left-[-20px] h-auto w-[min(22%,300px)] select-none [filter:drop-shadow(0_18px_20px_rgba(0,0,0,.22))] max-[1100px]:w-[min(24%,280px)] max-[900px]:bottom-16 max-[900px]:w-[min(26%,250px)] max-[900px]:opacity-95 max-[640px]:hidden"
          src="/images/p4/exp3/teacher.png"
          alt="character"
          draggable="false"
        />

        <div className="absolute bottom-[18px] left-[18px] z-20">
          <LightLanguageSwitcher value={lang} onChange={setLang} />
        </div>

        <div className="absolute bottom-[18px] right-[18px] z-20">
          <LightNavButtons
            backLabel={t.back}
            nextLabel={t.next}
            onBack={() => navigate("/p4/light/objective")}
            onNext={() => navigate("/p4/light/vocab")}
          />
        </div>
      </div>
    </div>
  );
}
