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
        back: "ย้อนกลับ",
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
        back: "Back",
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
        back: "Kembali",
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
        type="button"
        className="fixed left-[18px] top-[18px] z-20 grid h-16 w-16 place-items-center rounded-[14px] border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,.96),rgba(226,242,255,.9))] text-[#202124] shadow-[0_18px_36px_rgba(8,15,35,.25),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-md transition duration-150 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-[linear-gradient(145deg,#ffffff,#dbeafe)] hover:text-gray-900 hover:shadow-[0_24px_44px_rgba(8,15,35,.3),inset_0_1px_0_rgba(255,255,255,.95)] active:translate-y-px active:scale-[.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-sky-300/80 max-[900px]:left-3 max-[900px]:top-3 max-[900px]:h-[54px] max-[900px]:w-[54px] max-[900px]:rounded-xl"
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
          <div className={cardClass} onClick={() => navigate("/p4/gravity/exp1/objectives")}>
            <img src="/images/pp4.jpg" alt="" className={imageClass} />
            <div className="p-4">
              <div className="text-[30px] font-extrabold text-gray-900 max-[900px]:text-[26px] max-[640px]:text-[22px]">{t.exp1Title}</div>
              <div className="mt-2 text-[18px] font-medium text-gray-700 max-[900px]:text-[16px] max-[640px]:text-[15px]">{t.exp1Desc}</div>
            </div>
          </div>

          <div className={cardClass} onClick={() => navigate("/p4/gravity/exp2/objectives")}>
            <img src="/images/p4/action.jpg" alt="" className={imageClass} />
            <div className="p-4">
              <div className="text-[30px] font-extrabold text-gray-900 max-[900px]:text-[26px] max-[640px]:text-[22px]">{t.exp2Title}</div>
              <div className="mt-2 text-[18px] font-medium text-gray-700 max-[900px]:text-[16px] max-[640px]:text-[15px]">{t.exp2Desc}</div>
            </div>
          </div>

          <div className={cardClass} onClick={() => navigate("/p4/gravity/exp3/objectives")}>
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
            className={`${chipClass} ${lang === "ms" ? "bg-[#bfe0ff]" : "bg-[#e6f2ff]"}`}
            onClick={() => setLang("ms")}
            type="button"
          >
            {t.chipMs}
          </button>
          <button
            className={`${chipClass} ${lang === "en" ? "bg-[#bfe0ff]" : "bg-[#e6f2ff]"}`}
            onClick={() => setLang("en")}
            type="button"
          >
            {t.chipEn}
          </button>
        </div>
      </div>

      <div className="fixed bottom-[18px] right-[18px] z-20 max-[640px]:bottom-[10px] max-[640px]:right-[10px]">
        <button
          className="rounded-[18px] bg-[linear-gradient(135deg,#ffffff,#f0f9ff)] px-[22px] py-[14px] text-[20px] font-extrabold text-[#1e3a8a] shadow-[0_8px_18px_rgba(0,0,0,.15)] transition duration-150 hover:-translate-y-0.5 hover:bg-[linear-gradient(135deg,#e0f2fe,#ffffff)] hover:shadow-[0_12px_24px_rgba(0,0,0,.2)] active:translate-y-px active:shadow-[0_6px_14px_rgba(0,0,0,.18)] max-[640px]:px-[14px] max-[640px]:py-[10px] max-[640px]:text-[14px]"
          onClick={() => navigate("/p4/gravity/objectives")}
          type="button"
        >
          « {t.back}
        </button>
      </div>
    </div>
  );
}
