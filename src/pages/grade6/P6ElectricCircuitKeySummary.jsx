import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const TEXT = {
  th: {
    sectionParts: "องค์ประกอบของวงจรไฟฟ้า",
    parts: [
      { heading: "แหล่งกำเนิดไฟฟ้า", body: "ให้พลังงานไฟฟ้า เช่น ถ่านไฟฉาย แบตเตอรี่" },
      { heading: "สายไฟฟ้า", body: "เชื่อมต่อวงจรให้กระแสไฟไหลผ่าน เช่น สายทองแดง" },
      { heading: "อุปกรณ์ไฟฟ้า", body: "เปลี่ยนพลังงานไฟฟ้าเป็นพลังงานอื่น เช่น หลอดไฟ มอเตอร์" },
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
    next: "ไปต่อ",
  },
  en: {
    sectionParts: "Parts of an Electric Circuit",
    parts: [
      { heading: "Power source", body: "Provides energy, e.g. batteries" },
      { heading: "Wire", body: "Carries current through the circuit, e.g. copper wire" },
      { heading: "Electrical device", body: "Converts electrical energy, e.g. bulb, motor" },
    ],
    compareTitle: "Compare Circuit Connections",
    table: {
      head: ["Topic", "Series", "Parallel"],
      rows: [
        ["Connection", "Single path", "Multiple paths"],
        ["Brightness", "More bulbs -> dimmer", "Each bulb equally bright"],
        ["If one bulb fails", "All go out", "Others stay lit"],
        ["Example", "Flashlight", "Home wiring"],
      ],
    },
    back: "Back",
    next: "Next",
  },
  ms: {
    sectionParts: "Komponen litar elektrik",
    parts: [
      { heading: "Sumber kuasa", body: "Membekalkan tenaga, contohnya bateri" },
      { heading: "Wayar", body: "Menyambung litar supaya arus mengalir, contohnya wayar kuprum" },
      { heading: "Peranti elektrik", body: "Menukar tenaga elektrik, contohnya mentol, motor" },
    ],
    compareTitle: "Perbandingan sambungan litar",
    table: {
      head: ["Topik", "Siri", "Selari"],
      rows: [
        ["Sambungan", "Satu laluan", "Banyak laluan"],
        ["Kecerahan", "Lebih banyak mentol -> lebih malap", "Setiap mentol sama terang"],
        ["Jika satu mentol rosak", "Semua padam", "Mentol lain masih menyala"],
        ["Contoh", "Lampu suluh", "Pendawaian rumah"],
      ],
    },
    back: "Kembali",
    next: "Seterusnya",
  },
};

const LANGS = [
  { id: "th", label: "ไทย" },
  { id: "en", label: "อังกฤษ" },
  { id: "ms", label: "มลายู" },
];

const PART_MEDIA = {
  battery: {
    image: "/images/p6/tanfaichai.jpg",
    fallbackImage: "/images/p6/electric-circuit/batteries.svg",
  },
  wire: {
    image: "/images/p6/electric-circuit/wire-clips-photo.png",
    fallbackImage: "/images/p6/electric-circuit/wire-clips.svg",
  },
  bulb: {
    image: "/images/p6/electric-circuit/bulb-base-photo.webp",
    fallbackImage: "/images/p6/electric-circuit/bulb-base.svg",
  },
};

const PART_ICON_KEYS = ["battery", "wire", "bulb"];

function EquipmentImage({ src, fallbackSrc, alt, className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(event) => {
        if (event.currentTarget.dataset.fallbackApplied === "true") return;
        event.currentTarget.dataset.fallbackApplied = "true";
        event.currentTarget.src = fallbackSrc;
      }}
    />
  );
}

function PartCard({ iconKey, heading, body }) {
  const media = PART_MEDIA[iconKey] ?? PART_MEDIA.battery;
  const plainIcon = iconKey === "battery" || iconKey === "wire";
  return (
    <div className="flex min-w-[220px] flex-1 items-center gap-3 rounded-[18px] border-2 border-white/70 bg-white/85 px-4 py-3 shadow-[0_12px_22px_rgba(0,0,0,0.12)]">
      <div
        className={`grid h-[64px] w-[64px] place-items-center ${
          plainIcon
            ? ""
            : "rounded-full bg-gradient-to-br from-amber-200 to-yellow-300 shadow-[inset_0_4px_8px_rgba(255,255,255,0.8),0_8px_14px_rgba(0,0,0,0.12)]"
        }`}
      >
        <EquipmentImage
          src={media.image}
          fallbackSrc={media.fallbackImage}
          alt={heading}
          className="h-[44px] w-[44px] object-contain"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-[18px] font-black text-slate-900">{heading}</div>
        <div className="text-[15px] font-semibold leading-tight text-slate-800">{body}</div>
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
        <div className="rounded-[28px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] p-[clamp(16px,2vw,26px)] shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <div className="grid gap-4 rounded-3xl border-2 border-white/75 bg-white/75 p-[clamp(14px,1.6vw,20px)]">
            <div className="text-[clamp(22px,1.8vw,30px)] font-black text-slate-900">{t.sectionParts}</div>
            <div className="grid gap-3 min-[900px]:grid-cols-3">
              {t.parts.map((p, index) => (
                <PartCard key={p.heading} iconKey={PART_ICON_KEYS[index] ?? "battery"} {...p} />
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
      </div>

      <div className="fixed bottom-6 left-6 z-20 inline-flex gap-2 rounded-[20px] bg-white/95 px-3 py-[10px] shadow-[0_18px_40px_rgba(111,144,186,0.2)]">
        {LANGS.map((item) => (
          <button
            key={item.id}
            onClick={() => setLang(item.id)}
            className={`min-w-[88px] rounded-[16px] px-[14px] py-[11px] text-[15px] font-extrabold leading-none text-[#172033] transition duration-150 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(111,144,186,0.14)] ${
              lang === item.id ? "bg-[#bdd9f8]" : "bg-[#eaf3ff]"
            }`}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="fixed bottom-6 right-6 z-20 flex items-center gap-3">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-white/90 px-[18px] py-[14px] font-black text-[#213a8f] shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
          onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/result")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          <span className="text-[20px] leading-none">&laquo;</span>
          <span className="text-[20px] leading-none">{t.back}</span>
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[18px] border-0 bg-[#2563eb] px-[18px] py-[14px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition duration-150 hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(0,0,0,0.26)] active:translate-y-[1px] active:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
          onClick={() => navigate("/p6/electric-circuit/experiments")}
          type="button"
          aria-label={t.next}
          title={t.next}
        >
          <span className="text-[20px] leading-none">{t.next}</span>
          <span className="text-[20px] leading-none">&raquo;</span>
        </button>
      </div>
    </div>
  );
}
