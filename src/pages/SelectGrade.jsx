import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SelectGrade() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");

  const copy = useMemo(
    () => ({
      th: {
        // lab: "Science Lab",
        title: "เลือกชั้นเรียน",
        subtitle: "เลือกชั้นเพื่อเริ่มการทดลองวิทยาศาสตร์",
        back: "ย้อนกลับ",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        cards: [
          { id: "p4", label: "ประถมศึกษาปีที่ 4", subtitle: "แรงโน้มถ่วงและตัวกลางของแสง", image: "/images/pp4.jpg", to: "/p4" },
          { id: "p5", label: "ประถมศึกษาปีที่ 5", subtitle: "ชีวิตสัมพันธ์และพันธุกรรม", image: "/images/pp5.jpg", to: "/p5/life" },
          { id: "p6", label: "ประถมศึกษาปีที่ 6", subtitle: "แรงไฟฟ้าและวงจรไฟฟ้า", image: "/images/pp6.jpg", to: "/p6" },
        ],
      },
      en: {
        // lab: "Science Lab",
        title: "Choose a Grade",
        subtitle: "Choose a grade level to start the science activities",
        back: "Back",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        cards: [
          { id: "p4", label: "Grade 4", subtitle: "Gravity and the medium of light", image: "/images/pp4.jpg", to: "/p4" },
          { id: "p5", label: "Grade 5", subtitle: "Life and Genetics", image: "/images/pp5.jpg", to: "/p5/life" },
          { id: "p6", label: "Grade 6", subtitle: "Electric Force and Circuits", image: "/images/pp6.jpg", to: "/p6" },
        ],
      },
      ms: {
        // lab: "Science Lab",
        title: "Pilih Tahun",
        subtitle: "Pilih tahap untuk memulakan aktiviti sains",
        back: "Kembali",
        chipTh: "Thai",
        chipEn: "English",
        chipMs: "Malay",
        cards: [
          { id: "p4", label: "Tahun 4", subtitle: "Graviti dan medium cahaya", image: "/images/pp4.jpg", to: "/p4" },
          { id: "p5", label: "Tahun 5", subtitle: "Hidupan dan Genetik", image: "/images/pp5.jpg", to: "/p5/life" },
          { id: "p6", label: "Tahun 6", subtitle: "Daya Elektrik dan Litar", image: "/images/pp6.jpg", to: "/p6" },
        ],
      },
    }),
    []
  );

  const t = copy[lang];

  const bgStyle = {
    background:
      "radial-gradient(1px 1px at 20px 20px, rgba(44,112,201,0.12) 1px, transparent 1px), radial-gradient(1px 1px at 60px 50px, rgba(44,112,201,0.12) 1px, transparent 1px), radial-gradient(1px 1px at 90px 90px, rgba(255,107,74,0.2) 1px, transparent 1px), repeating-linear-gradient(0deg, transparent 0 24px, rgba(44,112,201,0.08) 24px 25px), repeating-linear-gradient(90deg, transparent 0 24px, rgba(44,112,201,0.08) 24px 25px), radial-gradient(600px 600px at 100% -20%, rgba(255,183,95,0.2), transparent 60%), radial-gradient(520px 520px at -10% 80%, rgba(66,164,255,0.2), transparent 60%), linear-gradient(135deg, #e6f6ff, #f7fbff 45%, #fff1dc)",
    backgroundSize: "120px 120px,120px 120px,120px 120px,48px 48px,48px 48px,auto,auto,auto",
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden px-5 pb-28 pt-8 text-center text-slate-900 md:px-10 md:pt-10"
      style={bgStyle}
    >
      <img
        src="/images/backgroundss.jpg"
        alt="Laboratory background"
        className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.9]"
      />
      <div className="pointer-events-none absolute -right-36 -top-40 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.75),rgba(255,202,153,0.35))] opacity-70" />
      <div className="pointer-events-none absolute -bottom-36 -left-36 h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.7),rgba(141,210,255,0.3))] opacity-90" />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="mb-8 flex flex-col items-center gap-2 md:mb-10">
          {/* <span className="inline-flex items-center rounded-full bg-[#2c70c9]/12 px-4 py-1.5 text-sm font-bold tracking-[0.4px] text-[#2c70c9] sm:text-base">
            {t.lab}
          </span> */}
          <h1 className="m-0 text-4xl font-extrabold text-[#eef5ff] drop-shadow-[0_10px_24px_rgba(8,15,35,0.55)] sm:text-5xl">
            {t.title}
          </h1>
          <p className="m-0 text-base text-[#d7e6ff] drop-shadow-[0_6px_18px_rgba(8,15,35,0.45)] sm:text-xl">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {t.cards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => navigate(card.to)}
              className="overflow-hidden rounded-[26px] border border-white/80 bg-white/85 text-left shadow-[0_18px_36px_rgba(23,60,110,0.14)] transition duration-200 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_rgba(23,60,110,0.2)]"
            >
              <img
                src={card.image}
                alt={card.label}
                className="h-[240px] w-full object-cover bg-[#f1f4f9] md:h-[280px]"
              />
              <div className="px-5 pb-6 pt-4">
                <div className="text-[2rem] font-extrabold leading-tight text-slate-900 md:text-[2.2rem]">
                  {card.label}
                </div>
                <div className="mt-2 text-[1.3rem] leading-snug text-slate-650 md:text-[1.3rem]">
                  {card.subtitle}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
        <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
          <button
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "th"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
            onClick={() => setLang("th")}
            type="button"
          >
            {t.chipTh}
          </button>
          <button
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "en"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
            onClick={() => setLang("en")}
            type="button"
          >
            {t.chipEn}
          </button>
          <button
            className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold transition ${
              lang === "ms"
                ? "bg-[#bfe0ff] text-slate-900"
                : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
            }`}
            onClick={() => setLang("ms")}
            type="button"
          >
            {t.chipMs}
          </button>
        </div>
      </div>

      <div className="fixed bottom-3 right-3 z-20 md:bottom-7 md:right-7">
        <button
          type="button"
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/")}
        >
          « {t.back}
        </button>
      </div>
    </div>
  );
}
