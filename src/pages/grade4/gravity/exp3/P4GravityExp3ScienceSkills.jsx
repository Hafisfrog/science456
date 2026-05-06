import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function P4GravityExp3ScienceSkills() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const audioRef = useRef(null);

  const BACK_PATH = "/p4/gravity/exp3/objectives";
  const NEXT_PATH = "/p4/gravity/exp3/vocab";

  const content = useMemo(() => {
    return {
      th: {
        heading: "การทดลองที่ 3",
        title: "เรื่อง แรงดึงดูดของโลกกับแรงดึงดูดของดวงจันทร์",
        section: "ทักษะกระบวนการทางวิทยาศาสตร์",
        skills: [
          "ทักษะการสังเกต",
          "ทักษะการวัด",
          "การจำแนกประเภท",
          "ทักษะการใช้จำนวน",
          "ทักษะการพยากรณ์",
          "ทักษะการลงความเห็นจากข้อมูล",
        ],
        back: "ย้อนกลับ",
        next: "ต่อไป",
        speak: "ฟัง",
        langTh: "ไทย",
        langEn: "อังกฤษ",
        langMs: "มลายู",
      },
      en: {
        heading: "Experiment 3",
        title: "Earth's Gravity and the Moon's Gravity",
        section: "Science Process Skills",
        skills: [
          "Observation skill",
          "Measurement skill",
          "Classification",
          "Using numbers",
          "Prediction skill",
          "Inferring from data",
        ],
        back: "Back",
        next: "Next",
        speak: "Listen",
        langTh: "Thai",
        langEn: "English",
        langMs: "Malay",
      },
      ms: {
        heading: "Eksperimen 3",
        title: "Graviti Bumi dan Graviti Bulan",
        section: "Kemahiran Proses Sains",
        skills: [
          "Kemahiran memerhati",
          "Kemahiran mengukur",
          "Mengelaskan",
          "Kemahiran menggunakan nombor",
          "Kemahiran meramal",
          "Membuat inferens daripada data",
        ],
        back: "Kembali",
        next: "Seterusnya",
        speak: "Dengar",
        langTh: "Thai",
        langEn: "Inggeris",
        langMs: "Melayu",
      },
    };
  }, []);

  const t = content[lang];

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
      if (!window.speechSynthesis) return;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech synthesis errors.
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden font-['Prompt',sans-serif]">
      <img
        src="/images/p4/backgrounds-p4.jpg"
        alt="Laboratory background"
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.86]"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.12),rgba(255,255,255,.02))]" />

      <div className="relative h-full w-full p-6 max-[640px]:p-4">
        <button
          type="button"
          className="fixed left-[18px] top-[18px] z-20 grid h-16 w-16 place-items-center rounded-[14px] border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,.96),rgba(226,242,255,.9))] text-[#202124] shadow-[0_18px_36px_rgba(8,15,35,.25),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-md transition duration-150 hover:-translate-y-0.5 hover:scale-[1.03] active:translate-y-px active:scale-[.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-sky-300/80 max-[900px]:left-3 max-[900px]:top-3 max-[900px]:h-[54px] max-[900px]:w-[54px] max-[900px]:rounded-xl"
          onClick={() => navigate("/grades")}
          aria-label="SelectGrade"
          title="SelectGrade"
        >
          <svg
            aria-hidden="true"
            className="h-11 w-11 drop-shadow-[0_5px_7px_rgba(0,0,0,.22)] max-[900px]:h-[37px] max-[900px]:w-[37px]"
            viewBox="0 0 128 128"
            focusable="false"
          >
            <path
              d="M13 65.5 57.8 28.2c3.7-3.1 8.7-3.1 12.4 0L115 65.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="11"
            />
            <path
              d="M27.5 69.4 58.3 43.8c3.4-2.8 8-2.8 11.4 0l30.8 25.6v34.8c0 6.5-5.3 11.8-11.8 11.8H76.8V88.4c0-4.7-3.8-8.4-8.4-8.4h-8.8c-4.7 0-8.4 3.8-8.4 8.4V116H39.3c-6.5 0-11.8-5.3-11.8-11.8V69.4Z"
              fill="currentColor"
            />
            <path d="M88 33h17v29.5L88 48.4V33Z" fill="currentColor" />
          </svg>
        </button>

        <header className="mt-[20px] text-center max-[900px]:mt-[42px]">
          <div className="text-[58px] font-black leading-none text-[#a96db0] [-webkit-text-stroke:7px_#efd5ff] drop-shadow-[0_10px_20px_rgba(8,15,35,.34)] [paint-order:stroke_fill] max-[900px]:text-[46px] max-[640px]:text-[34px]">
            {t.heading}
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 max-[640px]:mt-3">
            <div className="border-[5px] border-black bg-white px-[32px] py-[14px] shadow-[0_12px_24px_rgba(0,0,0,.18)] max-[900px]:px-[20px] max-[900px]:py-[10px] max-[640px]:border-[3px] max-[640px]:px-[10px]">
              <h1 className="m-0 text-[40px] font-black leading-tight text-black max-[1400px]:text-[34px] max-[900px]:text-[25px] max-[640px]:text-[18px]">
                {t.title}
              </h1>
            </div>
            <button
              className="grid h-[54px] w-[54px] shrink-0 place-items-center rounded-2xl border-none bg-white/90 text-[22px] shadow-[0_12px_22px_rgba(0,0,0,.16)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(0,0,0,.20)] max-[640px]:h-11 max-[640px]:w-11 max-[640px]:text-lg"
              onClick={() => speakText(`${t.heading} ${t.title}`)}
              type="button"
              title={t.speak}
            >
              {"\uD83D\uDD0A"}
            </button>
          </div>
        </header>

        <main className="relative z-[3] ml-[42px] mt-[30px] max-w-[1330px] max-[1100px]:ml-[20px] max-[1100px]:max-w-none max-[900px]:ml-4 max-[640px]:m-[18px_0_0]">
          <div className="mb-[32px] inline-block bg-[linear-gradient(90deg,#75d7e9,#2f61bf)] p-[10px] pr-[18px] shadow-[0_16px_28px_rgba(8,15,35,.28)] max-[900px]:mb-5">
            <div className="bg-[#edf2ff] px-[28px] py-[12px] text-[30px] font-black leading-tight text-black max-[900px]:text-[24px] max-[640px]:px-[16px] max-[640px]:text-[19px]">
              {t.section}
            </div>
          </div>

          <div className="grid w-[min(1300px,88vw)] grid-cols-2 items-start gap-x-[90px] gap-y-[24px] pl-[78px] max-[1200px]:gap-x-[38px] max-[1200px]:pl-[28px] max-[760px]:w-full max-[760px]:grid-cols-1 max-[760px]:gap-y-3 max-[760px]:pl-0">
            {t.skills.map((skill, index) => (
              <div
                className="flex min-h-[88px] items-center gap-[12px] rounded-[999px] border-[9px] border-[#70c4d9] bg-white/96 py-[8px] pl-[16px] pr-[14px] shadow-[0_16px_28px_rgba(8,15,35,.16)] max-[900px]:min-h-[72px] max-[900px]:border-[8px] max-[900px]:py-2 max-[640px]:min-h-0 max-[640px]:gap-2 max-[640px]:rounded-[24px] max-[640px]:border-[5px] max-[640px]:pl-2 max-[640px]:pr-2"
                key={skill}
              >
                <div className="grid h-[54px] w-[54px] shrink-0 place-items-center rounded-full bg-[#f17b4d] text-[28px] font-black text-white shadow-[0_10px_18px_rgba(0,0,0,.14)] max-[900px]:h-[46px] max-[900px]:w-[46px] max-[900px]:text-[23px] max-[640px]:h-[36px] max-[640px]:w-[36px] max-[640px]:text-[18px]">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1 text-[clamp(20px,1.55vw,29px)] font-black leading-[1.22] text-black max-[900px]:text-[20px] max-[640px]:text-[17px]">
                  {skill}
                </div>
                <button
                  className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-[14px] border-none bg-[#eef7ff] text-base shadow-[0_12px_20px_rgba(0,0,0,.14)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(0,0,0,.18)] max-[640px]:h-9 max-[640px]:w-9 max-[640px]:text-sm"
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

        <div className="absolute bottom-[18px] left-[18px] z-[7] flex items-center gap-[10px] rounded-[18px] bg-white/90 px-3 py-[10px] shadow-[0_18px_40px_rgba(0,0,0,.22)] max-[720px]:bottom-[76px] max-[720px]:left-[12px] max-[720px]:right-[12px] max-[720px]:justify-center max-[720px]:gap-[8px] max-[720px]:rounded-[12px] max-[720px]:p-[7px]">
          <button
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition max-[720px]:px-[12px] max-[720px]:text-[14px] ${
              lang === "th"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
            onClick={() => setLang("th")}
            type="button"
          >
            {t.langTh}
          </button>
          <button
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition max-[720px]:px-[12px] max-[720px]:text-[14px] ${
              lang === "ms"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
            onClick={() => setLang("ms")}
            type="button"
          >
            {t.langMs}
          </button>
          <button
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-black transition max-[720px]:px-[12px] max-[720px]:text-[14px] ${
              lang === "en"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
            onClick={() => setLang("en")}
            type="button"
          >
            {t.langEn}
          </button>
        </div>

        <div className="absolute bottom-[18px] right-[18px] z-[7] flex items-center gap-3 max-[720px]:bottom-[12px] max-[720px]:left-[12px] max-[720px]:right-[12px] max-[720px]:gap-2">
          <button
            className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:flex-1 max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
            onClick={() => navigate(BACK_PATH)}
            type="button"
          >
            {"\u00AB"} {t.back}
          </button>
          <button
            className="rounded-[18px] bg-[linear-gradient(135deg,#ef4444,#b91c1c)] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:flex-1 max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
            onClick={() => navigate(NEXT_PATH)}
            type="button"
          >
            {t.next} {"\u00BB"}
          </button>
        </div>
      </div>
    </div>
  );
}
