import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function P4Gravity() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");

  const copy = useMemo(() => {
    return {
      th: {
        title: "แรงโน้มถ่วงของโลก",
        sub: "เลือกการทดลอง",
        exp1Title: "การทดลองที่ 1",
        exp1Desc: "ผลของแรงโน้มถ่วง",
        exp2Title: "การทดลองที่ 2",
        exp2Desc: "แรงดึงดูดของโลกกับน้ำหนักของวัตถุ",
        exp3Title: "การทดลองที่ 3",
        exp3Desc: "แรงดึงดูดของโลกกับแรงดึงดูดของดวงจันทร์",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
      },
      en: {
        title: "Earth's Gravity",
        sub: "Choose an experiment",
        exp1Title: "Experiment 1",
        exp1Desc: "Effects of Gravity",
        exp2Title: "Experiment 2",
        exp2Desc: "Earth's Gravity and Object Weight",
        exp3Title: "Experiment 3",
        exp3Desc: "Earth's Gravity vs Moon's Gravity",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
      },
      ms: {
        title: "Graviti Bumi",
        sub: "Pilih eksperimen",
        exp1Title: "Eksperimen 1",
        exp1Desc: "Kesan Graviti",
        exp2Title: "Eksperimen 2",
        exp2Desc: "Graviti Bumi dan Berat Objek",
        exp3Title: "Eksperimen 3",
        exp3Desc: "Graviti Bumi dan Graviti Bulan",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
      },
    };
  }, []);

  const t = copy[lang];

  const cardClass =
    "cursor-pointer overflow-hidden rounded-[22px] bg-white shadow-[0_10px_20px_rgba(0,0,0,.08)] transition duration-150 hover:-translate-y-1.5 hover:shadow-[0_18px_30px_rgba(0,0,0,.14)]";
  const imageClass = "h-[300px] w-full object-cover max-[900px]:h-[260px]";
  const chipClass =
    "rounded-[14px] px-4 py-3 text-base font-extrabold transition duration-150 hover:-translate-y-0.5 max-[640px]:px-[11px] max-[640px]:py-[9px] max-[640px]:text-sm";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#eaf7fb] px-6 pb-[140px] pt-12 text-center max-[640px]:px-[14px] max-[640px]:pb-[150px] max-[640px]:pt-7">
      <img
        src="/images/backgroundss.jpg"
        alt="Laboratory background"
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.9]"
      />

      <button
        className="fixed left-[18px] top-[18px] z-20 flex h-[64px] items-center gap-3 rounded-[18px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,.96),rgba(191,224,255,.9))] px-5 text-[#1e3a8a] shadow-[0_14px_30px_rgba(8,15,35,.28)] backdrop-blur-md transition duration-150 hover:-translate-y-0.5 hover:bg-[linear-gradient(135deg,#ffffff,#dbeafe)] hover:text-[#0f2f75] hover:shadow-[0_18px_38px_rgba(8,15,35,.34)] active:translate-y-px max-[640px]:left-[12px] max-[640px]:top-[12px] max-[640px]:h-[52px] max-[640px]:gap-2 max-[640px]:rounded-[14px] max-[640px]:px-3"
        type="button"
        onClick={() => navigate("/grades")}
        aria-label="Go to SelectGrade"
        title="SelectGrade"
      >
        <svg
          aria-hidden="true"
          className="h-[34px] w-[34px] shrink-0 max-[640px]:h-[28px] max-[640px]:w-[28px]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M3 10.6 12 3l9 7.6v8.8a1.6 1.6 0 0 1-1.6 1.6H15v-6.2a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1V21H4.6A1.6 1.6 0 0 1 3 19.4v-8.8Z" />
          <path d="M1.8 10.6a1 1 0 0 1 .1-1.4l9.5-8a1 1 0 0 1 1.3 0l9.5 8a1 1 0 1 1-1.3 1.5L12 3.2l-8.8 7.5a1 1 0 0 1-1.4-.1Z" />
        </svg>
        <span className="whitespace-nowrap text-[20px] font-extrabold max-[640px]:text-[16px]">หน้าหลัก</span>
      </button>

      <div className="relative z-10">
        <h1 className="text-[48px] font-extrabold text-[#edf4ff] drop-shadow-[0_10px_24px_rgba(8,15,35,0.55)] max-[900px]:text-[40px] max-[640px]:text-[32px]">
          {t.title}
        </h1>
        <p className="mt-3 text-[24px] font-semibold text-[#d7e6ff] drop-shadow-[0_6px_18px_rgba(8,15,35,0.45)] max-[900px]:text-[20px] max-[640px]:text-[18px]">
          {t.sub}
        </p>

        <div
          className="mx-auto mt-10 grid max-w-[1200px] gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
        >
          <div className={cardClass} onClick={() => navigate("/p4/gravity/vocab")}>
            <img src="/images/pp4.jpg" alt="" className={imageClass} />
            <div className="p-4">
              <div className="text-[30px] font-extrabold text-gray-900 max-[900px]:text-[26px] max-[640px]:text-[22px]">{t.exp1Title}</div>
              <div className="mt-2 text-[18px] font-medium text-gray-700 max-[900px]:text-[16px] max-[640px]:text-[15px]">{t.exp1Desc}</div>
            </div>
          </div>

          <div className={cardClass} onClick={() => navigate("/p4/gravity/exp2/vocab")}>
            <img src="/images/p4/action.jpg" alt="" className={imageClass} />
            <div className="p-4">
              <div className="text-[30px] font-extrabold text-gray-900 max-[900px]:text-[26px] max-[640px]:text-[22px]">{t.exp2Title}</div>
              <div className="mt-2 text-[18px] font-medium text-gray-700 max-[900px]:text-[16px] max-[640px]:text-[15px]">{t.exp2Desc}</div>
            </div>
          </div>

          <div className={cardClass} onClick={() => navigate("/p4/gravity/exp3/vocab")}>
            <img src="/images/p4/earth-moon.png" alt="" className={imageClass} />
            <div className="p-4">
              <div className="text-[30px] font-extrabold text-gray-900 max-[900px]:text-[26px] max-[640px]:text-[22px]">{t.exp3Title}</div>
              <div className="mt-2 text-[18px] font-medium text-gray-700 max-[900px]:text-[16px] max-[640px]:text-[15px]">{t.exp3Desc}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-[18px] left-[18px] z-20 max-[640px]:bottom-[10px] max-[640px]:left-[10px]">
        <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)] max-[640px]:gap-1.5 max-[640px]:p-2">
          <button
            className={`${chipClass} ${lang === "th" ? "bg-[#bfe0ff]" : "bg-[#e6f2ff]"}`}
            onClick={() => setLang("th")}
            type="button"
          >
            {t.chipTh}
          </button>
          <button
            className={`${chipClass} ${lang === "en" ? "bg-[#bfe0ff]" : "bg-[#e6f2ff]"}`}
            onClick={() => setLang("en")}
            type="button"
          >
            {t.chipEn}
          </button>
          <button
            className={`${chipClass} ${lang === "ms" ? "bg-[#bfe0ff]" : "bg-[#e6f2ff]"}`}
            onClick={() => setLang("ms")}
            type="button"
          >
            {t.chipMs}
          </button>
        </div>
      </div>
    </div>
  );
}
