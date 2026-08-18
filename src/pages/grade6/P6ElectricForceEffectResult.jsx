import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";

const LANGUAGE_OPTIONS = [
  { id: "th", label: "ไทย" },
  { id: "ms", label: "มลายูถิ่น" },
  { id: "en", label: "อังกฤษ" },
];

const TEXT = {
  th: {
    title: "ผลการทดลอง",
    headers: ["วัสดุ", "ขัดถูด้วยกระดาษเยื่อทั้ง 2", "ขัดถูด้วยกระดาษเยื่อแค่ 1"],
    rows: [
      { label: "ลูกโป่ง", both: "ผลักกัน", one: "ดึงดูดกัน" },
      { label: "ปากกาเมจิก", both: "ผลักกัน", one: "ดึงดูดกัน" },
    ],
    back: "ย้อนกลับ",
    next: "ต่อไป",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายูถิ่น" },
  },
  en: {
    title: "Experiment Results",
    headers: ["Material", "Both rubbed with tissue", "Only 1 rubbed with tissue"],
    rows: [
      { label: "Balloon", both: "Repel", one: "Attract" },
      { label: "Marker pen", both: "Repel", one: "Attract" },
    ],
    back: "Back",
    next: "Next",
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    title: "ฮาเซ ปือจูบอแอ",
    headers: ["บือนอ", "แกแซะ ดืองา กือรือตะฮตีซู กือดูวอ-ดูวอญอ", "แกแซะ ดืองา กือรือตะฮ ตีซู ซาตูซายอ"],
    rows: [
      { label: "บูเวาะฮ กือลือมง", both: "ตอเลาะ ตูเบะ", one: "ตาเระ มาโซะ" },
      { label: "กาแล เมจิ", both: "ตอเลาะ ตูเบะ", one: "ตาเระ มาโซะ" },
    ],
    back: "ฮูโนกือเละ",
    next: "ตือรุฮ",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

function Spark({ className }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bg-[#ffc84b] ${className}`}
      style={{
        clipPath:
          "polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)",
      }}
    />
  );
}

export default function P6ElectricForceEffectResult() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const t = useMemo(() => TEXT[language] ?? TEXT.th, [language]);

  const pageBg = {
    background:
      "radial-gradient(46% 27% at 8% 41%, #cdebf4 0 61%, transparent 62%), radial-gradient(40% 26% at 94% 42%, #cdebf4 0 60%, transparent 61%), radial-gradient(72% 35% at 50% 33%, #f7f0ef 0 63%, transparent 64%), radial-gradient(80% 50% at 50% 75%, #f7f0ef 0 62%, transparent 63%), linear-gradient(180deg, #fbf5f2 0%, #fbf5f2 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-28 pt-8 text-slate-900 md:px-8 md:pb-32 md:pt-30"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <HomeButton />

      <div className="pointer-events-none absolute left-[-92px] top-[24%] h-[310px] w-[255px] rotate-[-10deg] rounded-[52%_52%_46%_46%] border-[7px] border-black bg-[#fff773] shadow-[inset_24px_22px_0_rgba(255,255,255,.48)] max-[900px]:left-[-150px]">
        <div className="absolute bottom-[-38px] left-[40px] h-[70px] w-[82px] rotate-[12deg] rounded-[14px] border-[7px] border-black bg-[#111]" />
        <div className="absolute bottom-[-4px] left-[56px] h-[84px] w-[54px] rotate-[18deg] rounded-[10px] border-[5px] border-black bg-[#fff7a3]" />
        <div className="absolute left-[102px] top-[76px] h-[126px] w-[98px] rounded-[50%] border-[4px] border-slate-500/35" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(70px,14vw,290px)] top-[-20px] h-[clamp(150px,18vw,270px)] w-[clamp(82px,9vw,150px)] bg-[#ffc84b] max-[700px]:opacity-55"
        style={{
          clipPath:
            "polygon(0 0,44% 0,68% 36%,93% 9%,100% 39%,78% 54%,100% 100%,57% 54%,38% 70%)",
        }}
      />
      <Spark className="right-[10%] top-[16%] h-11 w-11 max-[760px]:hidden" />
      <Spark className="right-[22%] top-[17%] h-12 w-12 max-[760px]:hidden" />
      <Spark className="right-[18%] top-[25%] h-5 w-5 max-[760px]:hidden" />
      <div className="pointer-events-none absolute left-[6%] bottom-[20%] text-[92px] leading-none opacity-75 max-[900px]:hidden">
        🧲
      </div>

      <div className="relative z-[1] mx-auto grid h-full w-full max-w-[1380px] grid-rows-[1fr] gap-2">
        <div className="relative rounded-[30px] border border-[#eadfce] bg-[#fffaf3]/90 px-[clamp(14px,1.6vw,20px)] pb-4 pt-4 shadow-[0_18px_34px_rgba(92,72,49,0.12)] backdrop-blur-[1px]">
          <h1 className="mb-3 ml-1 mt-0 text-left text-[clamp(34px,2.5vw,54px)] font-black leading-[1.05] text-slate-900">
            {t.title}
          </h1>
          <div className="rounded-[24px] border border-[#eadfce] bg-white/92 p-[8px] shadow-[0_14px_26px_rgba(92,72,49,0.1)]">
            <div className="overflow-hidden rounded-[16px] border-[3px] border-[#26324a] bg-[#fffdf8]">
              <div className="grid grid-cols-[1fr_1.3fr_1.3fr] bg-[#f6efe4] text-center text-[clamp(15px,1.6vw,18px)] font-black">
                {t.headers.map((head) => (
                  <div key={head} className="border-r-2 border-slate-600 px-3 py-5 last:border-r-0">
                    {head}
                  </div>
                ))}
              </div>

              {t.rows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[1fr_1.3fr_1.3fr] bg-white text-center text-[clamp(15px,1.6vw,18px)] font-bold"
                >
                  <div className="flex items-center justify-center border-r-2 border-t-2 border-slate-600 px-3 py-10">
                    {row.label}
                  </div>
                  <div className="flex items-center justify-center border-r-2 border-t-2 border-slate-600 px-3 py-10">
                    {row.both}
                  </div>
                  <div className="flex items-center justify-center border-t-2 border-slate-600 px-3 py-10">
                    {row.one}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
        <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
          {LANGUAGE_OPTIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => setLanguage(item.id)}
              className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold text-slate-900 transition ${
                language === item.id
                  ? "bg-[#bfe0ff] text-slate-900"
                  : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
              }`}
              type="button"
            >
              <span className="notranslate" translate="no">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-7 md:right-7">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          type="button"
          onClick={() => navigate("/p6/experiment/electric-force-effect/sim")}
          aria-label={t.back}
          title={t.back}
        >
          &laquo; {t.back}
        </button>
        <button
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          type="button"
          onClick={() => navigate("/p6/experiment/electric-force-effect/key-summary")}
          aria-label={t.next}
          title={t.next}
        >
          {t.next} &raquo;
        </button>
      </div>
    </div>
  );
}

