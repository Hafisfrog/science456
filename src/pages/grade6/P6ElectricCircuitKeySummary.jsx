import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const TEXT = {
  th: {
    badge: "วงจรไฟฟ้าใกล้ตัว",
    title: "สรุปสาระสำคัญ : วงจรไฟฟ้าใกล้ตัว",
    sectionParts: "องค์ประกอบของวงจรไฟฟ้า",
    parts: [
      { heading: "แหล่งกำเนิดไฟฟ้า", body: "ให้พลังงานไฟฟ้า เช่น ถ่านไฟฉาย แบตเตอรี", icon: "🔋" },
      { heading: "สายไฟฟ้า", body: "เชื่อมต่อวงจรให้กระแสไฟไหลผ่าน เช่น สายทองแดง", icon: "⚡" },
      { heading: "อุปกรณ์ไฟฟ้า", body: "เปลี่ยนพลังงานไฟฟ้าเป็นพลังงานอื่น เช่น หลอดไฟ มอเตอร์", icon: "💡" },
    ],
    compareTitle: "เปรียบเทียบการต่อวงจรไฟฟ้า",
    table: {
      head: ["หัวข้อ", "แบบอนุกรม", "แบบขนาน"],
      rows: [
        ["ลักษณะการต่อ", "ต่อเรียงกันทางเดียว", "ต่อแยกเป็นหลายทาง"],
        ["ความสว่างของหลอดไฟ", "ยิ่งเพิ่มหลอด ยิ่งสว่างน้อยลง", "แต่ละหลอดสว่างเท่ากัน"],
        ["ถ้าหลอดหนึ่งเสีย", "ดับทั้งวงจร", "ดวงอื่นยังติดได้"],
        ["ตัวอย่างการใช้", "ไฟฉาย", "ไฟฟ้าในบ้าน"],
      ],
    },
    back: "ย้อนกลับ",
    next: "ต่อไป",
  },
  en: {
    badge: "Electricity Around You",
    title: "Key Takeaways: Everyday Circuits",
    sectionParts: "Parts of an Electric Circuit",
    parts: [
      { heading: "Power source", body: "Provides energy, e.g., batteries", icon: "🔋" },
      { heading: "Wires", body: "Carry current between components, e.g., copper wire", icon: "⚡" },
      { heading: "Electrical device", body: "Converts electrical energy, e.g., bulb, motor", icon: "💡" },
    ],
    compareTitle: "Compare Series vs Parallel",
    table: {
      head: ["Topic", "Series", "Parallel"],
      rows: [
        ["Connection", "One single path", "Multiple paths"],
        ["Brightness", "More bulbs → dimmer", "Each bulb equally bright"],
        ["If one bulb fails", "All go out", "Others stay lit"],
        ["Example use", "Flashlight", "Home wiring"],
      ],
    },
    back: "Back",
    next: "Next",
  },
  ms: {
    badge: "Litar elektrik dekat kita",
    title: "Ringkasan penting: litar harian",
    sectionParts: "Bahagian litar elektrik",
    parts: [
      { heading: "Sumber kuasa", body: "Membekal tenaga, cth bateri", icon: "🔋" },
      { heading: "Wayar", body: "Mengalirkan arus antara komponen, cth wayar kuprum", icon: "⚡" },
      { heading: "Peranti elektrik", body: "Menukar tenaga elektrik, cth mentol, motor", icon: "💡" },
    ],
    compareTitle: "Banding siri vs selari",
    table: {
      head: ["Perkara", "Siri", "Selari"],
      rows: [
        ["Sambungan", "Satu laluan sahaja", "Banyak laluan"],
        ["Kecerahan", "Lebih banyak mentol → makin malap", "Setiap mentol sama terang"],
        ["Jika satu mentol rosak", "Semua padam", "Yang lain masih menyala"],
        ["Contoh guna", "Lampu suluh", "Pendawaian rumah"],
      ],
    },
    back: "Kembali",
    next: "Seterusnya",
  },
};

function LanguagePills({ lang, setLang }) {
  const pills = [
    { code: "th", label: "ไทย" },
    { code: "en", label: "English" },
    { code: "ms", label: "Malay" },
  ];
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 shadow-[0_12px_24px_rgba(0,0,0,0.12)] ring-2 ring-white/85 backdrop-blur-md">
      {pills.map((p) => (
        <button
          key={p.code}
          type="button"
          onClick={() => setLang(p.code)}
          className={`rounded-full px-4 py-2 text-[15px] font-black transition ${
            lang === p.code
              ? "bg-blue-600 text-white shadow-[0_8px_16px_rgba(37,99,235,0.35)]"
              : "text-slate-800 hover:bg-white"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

function PartCard({ icon, heading, body }) {
  return (
    <div className="flex min-w-[220px] flex-1 items-center gap-3 rounded-[18px] border-2 border-white/70 bg-white/85 px-4 py-3 shadow-[0_12px_22px_rgba(0,0,0,0.12)]">
      <div className="grid h-[64px] w-[64px] place-items-center rounded-full bg-gradient-to-br from-amber-200 to-yellow-300 text-2xl shadow-[inset_0_4px_8px_rgba(255,255,255,0.8),0_8px_14px_rgba(0,0,0,0.12)]">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-[18px] font-black text-slate-900">{heading}</div>
        <div className="text-[15px] font-semibold text-slate-800 leading-tight">{body}</div>
      </div>
    </div>
  );
}

export default function P6ElectricCircuitKeySummary() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TEXT[lang] ?? TEXT.th, [lang]);

  const pageBg = {
    background:
      "radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-6 pt-3 text-slate-900 md:px-8"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(110px,10vw,180px)] top-[10px] h-[clamp(96px,10vw,136px)] w-[clamp(60px,6vw,92px)] bg-[#f7bd2b]"
        style={{
          clipPath: "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.15))",
        }}
      />

      <div className="relative z-[1] mx-auto flex w-full max-w-[1380px] flex-col gap-3">
        <div className="inline-flex w-fit items-center rounded-full bg-gradient-to-br from-[#6bc3f0] to-[#4c9ee1] px-[18px] py-2 text-base font-black text-white shadow-[0_12px_22px_rgba(16,24,39,0.14)]">
          {t.badge}
        </div>
        <h1 className="m-0 text-[clamp(32px,2.4vw,50px)] font-black leading-[1.05]">{t.title}</h1>

        <div className="rounded-[28px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] p-[clamp(16px,2vw,26px)] shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <div className="grid gap-4 rounded-3xl border-2 border-white/75 bg-white/75 p-[clamp(14px,1.6vw,20px)]">
            <div className="text-[clamp(22px,1.8vw,30px)] font-black text-slate-900">{t.sectionParts}</div>
            <div className="grid gap-3 min-[900px]:grid-cols-3">
              {t.parts.map((p) => (
                <PartCard key={p.heading} {...p} />
              ))}
            </div>

            <div className="mt-1 text-center text-[clamp(22px,1.8vw,30px)] font-black text-slate-900">
              {t.compareTitle}
            </div>

            <div className="overflow-x-auto rounded-[18px] border-2 border-slate-900 bg-white shadow-[0_14px_24px_rgba(0,0,0,0.14)]">
              <table className="w-full border-collapse text-[15px] font-semibold text-slate-900">
                <thead className="bg-[#e7f7ff] text-[16px]">
                  <tr>
                    {t.table.head.map((h) => (
                      <th key={h} className="border border-slate-900 px-3 py-2 text-left">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.table.rows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#f8fbff]"}>
                      {row.map((cell, i) => (
                        <td key={i} className="border border-slate-900 px-3 py-2 align-top">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-1 flex justify-end gap-2">
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-[28px] font-black leading-none text-slate-900 shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
            onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/result")}
            type="button"
            aria-label={t.back}
            title={t.back}
          >
            ←
          </button>
          <button
            className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-blue-600 text-[28px] font-black leading-none text-white shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
            onClick={() => navigate("/p6/electric-circuit/experiments")}
            type="button"
            aria-label={t.next}
            title={t.next}
          >
            →
          </button>
        </div>
      </div>

      <div className="pointer-events-auto fixed left-4 bottom-4 z-20 max-sm:left-3 max-sm:bottom-3">
        <LanguagePills lang={lang} setLang={setLang} />
      </div>
    </div>
  );
}
