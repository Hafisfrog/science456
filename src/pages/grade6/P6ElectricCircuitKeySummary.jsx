import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../HomeButton";

const TEXT = {
  th: {
    sectionParts: "\u0e2d\u0e07\u0e04\u0e4c\u0e1b\u0e23\u0e30\u0e01\u0e2d\u0e1a\u0e02\u0e2d\u0e07\u0e27\u0e07\u0e08\u0e23\u0e44\u0e1f\u0e1f\u0e49\u0e32",
    parts: [
      {
        heading: "\u0e41\u0e2b\u0e25\u0e48\u0e07\u0e01\u0e33\u0e40\u0e19\u0e34\u0e14\u0e44\u0e1f\u0e1f\u0e49\u0e32",
        body: "\u0e43\u0e2b\u0e49\u0e1e\u0e25\u0e31\u0e07\u0e07\u0e32\u0e19\u0e44\u0e1f\u0e1f\u0e49\u0e32 \u0e40\u0e0a\u0e48\u0e19 \u0e16\u0e48\u0e32\u0e19\u0e44\u0e1f\u0e09\u0e32\u0e22 \u0e41\u0e1a\u0e15\u0e40\u0e15\u0e2d\u0e23\u0e35\u0e48",
      },
      {
        heading: "\u0e2a\u0e32\u0e22\u0e44\u0e1f\u0e1f\u0e49\u0e32",
        body: "\u0e40\u0e0a\u0e37\u0e48\u0e2d\u0e21\u0e15\u0e48\u0e2d\u0e27\u0e07\u0e08\u0e23\u0e43\u0e2b\u0e49\u0e01\u0e23\u0e30\u0e41\u0e2a\u0e44\u0e1f\u0e1f\u0e49\u0e32\u0e44\u0e2b\u0e25\u0e1c\u0e48\u0e32\u0e19 \u0e40\u0e0a\u0e48\u0e19 \u0e2a\u0e32\u0e22\u0e17\u0e2d\u0e07\u0e41\u0e14\u0e07",
      },
      {
        heading: "\u0e2d\u0e38\u0e1b\u0e01\u0e23\u0e13\u0e4c\u0e44\u0e1f\u0e1f\u0e49\u0e32",
        body: "\u0e40\u0e1b\u0e25\u0e35\u0e48\u0e22\u0e19\u0e1e\u0e25\u0e31\u0e07\u0e07\u0e32\u0e19\u0e44\u0e1f\u0e1f\u0e49\u0e32\u0e40\u0e1b\u0e47\u0e19\u0e1e\u0e25\u0e31\u0e07\u0e07\u0e32\u0e19\u0e2d\u0e37\u0e48\u0e19 \u0e40\u0e0a\u0e48\u0e19 \u0e2b\u0e25\u0e2d\u0e14\u0e44\u0e1f \u0e21\u0e2d\u0e40\u0e15\u0e2d\u0e23\u0e4c",
      },
    ],
    compareTitle: "\u0e40\u0e1b\u0e23\u0e35\u0e22\u0e1a\u0e40\u0e17\u0e35\u0e22\u0e1a\u0e01\u0e32\u0e23\u0e15\u0e48\u0e2d\u0e27\u0e07\u0e08\u0e23\u0e44\u0e1f\u0e1f\u0e49\u0e32",
    table: {
      head: [
        "\u0e2b\u0e31\u0e27\u0e02\u0e49\u0e2d",
        "\u0e41\u0e1a\u0e1a\u0e2d\u0e19\u0e38\u0e01\u0e23\u0e21",
        "\u0e41\u0e1a\u0e1a\u0e02\u0e19\u0e32\u0e19",
      ],
      rows: [
        [
          "\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e01\u0e32\u0e23\u0e15\u0e48\u0e2d",
          "\u0e15\u0e48\u0e2d\u0e40\u0e23\u0e35\u0e22\u0e07\u0e01\u0e31\u0e19\u0e17\u0e32\u0e07\u0e40\u0e14\u0e35\u0e22\u0e27",
          "\u0e15\u0e48\u0e2d\u0e41\u0e22\u0e01\u0e40\u0e1b\u0e47\u0e19\u0e2b\u0e25\u0e32\u0e22\u0e17\u0e32\u0e07",
        ],
        [
          "\u0e04\u0e27\u0e32\u0e21\u0e2a\u0e27\u0e48\u0e32\u0e07\u0e02\u0e2d\u0e07\u0e2b\u0e25\u0e2d\u0e14\u0e44\u0e1f",
          "\u0e22\u0e34\u0e48\u0e07\u0e40\u0e1e\u0e34\u0e48\u0e21\u0e2b\u0e25\u0e2d\u0e14 \u0e22\u0e34\u0e48\u0e07\u0e2a\u0e27\u0e48\u0e32\u0e07\u0e19\u0e49\u0e2d\u0e22\u0e25\u0e07",
          "\u0e41\u0e15\u0e48\u0e25\u0e30\u0e2b\u0e25\u0e2d\u0e14\u0e2a\u0e27\u0e48\u0e32\u0e07\u0e40\u0e17\u0e48\u0e32\u0e01\u0e31\u0e19",
        ],
        [
          "\u0e16\u0e49\u0e32\u0e2b\u0e25\u0e2d\u0e14\u0e2b\u0e19\u0e36\u0e48\u0e07\u0e40\u0e2a\u0e35\u0e22",
          "\u0e14\u0e31\u0e1a\u0e17\u0e31\u0e49\u0e07\u0e27\u0e07\u0e08\u0e23",
          "\u0e14\u0e27\u0e07\u0e2d\u0e37\u0e48\u0e19\u0e22\u0e31\u0e07\u0e15\u0e34\u0e14\u0e44\u0e14\u0e49",
        ],
        [
          "\u0e15\u0e31\u0e27\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e01\u0e32\u0e23\u0e43\u0e0a\u0e49",
          "\u0e44\u0e1f\u0e09\u0e32\u0e22",
          "\u0e44\u0e1f\u0e1f\u0e49\u0e32\u0e43\u0e19\u0e1a\u0e49\u0e32\u0e19",
        ],
      ],
    },
    back: "\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a",
    next: "\u0e08\u0e1a\u0e1a\u0e17\u0e40\u0e23\u0e35\u0e22\u0e19",
    lang: {
      th: "\u0e44\u0e17\u0e22",
      en: "\u0e2d\u0e31\u0e07\u0e01\u0e24\u0e29",
      ms: "\u0e21\u0e25\u0e32\u0e22\u0e39",
    },
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
    next: "Finish Lesson",
    lang: {
      th: "Thai",
      en: "English",
      ms: "Malay",
    },
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
    next: "Tamat Pelajaran",
    lang: {
      th: "Thai",
      en: "Inggeris",
      ms: "Melayu",
    },
  },
};

const LANGS = [
  { id: "th", label: "ไทย" },
   { id: "ms", label: "มลายู" },
  { id: "en", label: "อังกฤษ" },
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

function Spark({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bg-[#ffc333] ${className}`}
      style={{
        clipPath:
          "polygon(50% 0, 62% 36%, 100% 50%, 62% 64%, 50% 100%, 38% 64%, 0 50%, 38% 36%)",
      }}
    />
  );
}

function PartCard({ iconKey, heading, body }) {
  const media = PART_MEDIA[iconKey] ?? PART_MEDIA.battery;
  const plainIcon = iconKey === "battery" || iconKey === "wire";
  return (
    <div className="flex min-w-[220px] flex-1 items-center gap-3 rounded-[18px] border border-[#eadfce] bg-white/90 px-4 py-3 shadow-[0_12px_22px_rgba(92,72,49,0.1)]">
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
      "radial-gradient(46% 27% at 8% 41%, #cdebf4 0 61%, transparent 62%), radial-gradient(40% 26% at 94% 42%, #cdebf4 0 60%, transparent 61%), radial-gradient(72% 35% at 50% 33%, #f7f0ef 0 63%, transparent 64%), radial-gradient(80% 50% at 50% 75%, #f7f0ef 0 62%, transparent 63%), linear-gradient(180deg, #fbf5f2 0%, #fbf5f2 100%)",
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-6 pt-3 text-slate-900 md:px-10 md:pb-32 md:pt-15"
      style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}
    >
      <HomeButton />

      <div className="pointer-events-none absolute left-[-92px] top-[24%] z-0 h-[310px] w-[255px] rotate-[-10deg] rounded-[52%_52%_46%_46%] border-[7px] border-black bg-[#fff773] shadow-[inset_24px_22px_0_rgba(255,255,255,.48)] max-[900px]:left-[-150px]">
        <div className="absolute bottom-[-38px] left-[40px] h-[70px] w-[82px] rotate-[12deg] rounded-[14px] border-[7px] border-black bg-[#111]" />
        <div className="absolute bottom-[-4px] left-[56px] h-[84px] w-[54px] rotate-[18deg] rounded-[10px] border-[5px] border-black bg-[#fff7a3]" />
        <div className="absolute left-[102px] top-[76px] h-[126px] w-[98px] rounded-[50%] border-[4px] border-slate-500/35" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(70px,14vw,290px)] top-[-20px] z-0 h-[clamp(150px,18vw,270px)] w-[clamp(82px,9vw,150px)] bg-[#ffc84b] max-[700px]:opacity-55"
        style={{
          clipPath:
            "polygon(0 0,44% 0,68% 36%,93% 9%,100% 39%,78% 54%,100% 100%,57% 54%,38% 70%)",
          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.15))",
        }}
      />
      <Spark className="right-[10%] top-[16%] z-0 h-11 w-11 max-[760px]:hidden" />
      <Spark className="right-[22%] top-[17%] z-0 h-12 w-12 max-[760px]:hidden" />
      <Spark className="right-[18%] top-[25%] z-0 h-5 w-5 max-[760px]:hidden" />
      <div className="pointer-events-none absolute left-[6%] bottom-[20%] z-0 text-[92px] leading-none opacity-75 max-[900px]:hidden">
        🧲
      </div>

      <div className="relative z-[1] mx-auto flex w-full max-w-[1380px] flex-col gap-3">
        <div className="rounded-[28px] border border-[#eadfce] bg-[#fffaf3]/90 p-[clamp(16px,2vw,26px)] shadow-[0_18px_34px_rgba(92,72,49,0.12)] backdrop-blur-[1px]">
          <div className="grid gap-4 rounded-3xl border border-[#eadfce] bg-white/90 p-[clamp(14px,1.6vw,20px)] shadow-[0_14px_26px_rgba(92,72,49,0.1)]">
            <div className="text-[clamp(22px,1.8vw,30px)] font-black text-slate-900">{t.sectionParts}</div>
            <div className="grid gap-3 min-[900px]:grid-cols-3">
              {t.parts.map((p, index) => (
                <PartCard key={p.heading} iconKey={PART_ICON_KEYS[index] ?? "battery"} {...p} />
              ))}
            </div>

            <div className="mt-1 text-center text-[clamp(22px,1.8vw,30px)] font-black text-slate-900">
              {t.compareTitle}
            </div>

            <div className="overflow-x-auto rounded-[18px] border-[3px] border-[#26324a] bg-[#fffdf8] shadow-[0_14px_24px_rgba(92,72,49,0.12)]">
              <table className="w-full border-collapse text-[15px] font-semibold text-slate-900">
                <thead className="bg-[#f6efe4] text-[16px]">
                  <tr>
                    {t.table.head.map((h) => (
                      <th key={h} className="border border-slate-900 px-3 py-2 text-center">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.table.rows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#fff8ef]"}>
                      {row.map((cell, i) => (
                        <td key={i} className="border border-slate-900 px-3 py-2 text-left align-top">
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

      <div className="fixed bottom-3 left-3 z-20 md:bottom-7 md:left-7">
        <div className="flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]">
          {LANGS.map((item) => (
            <button
              key={item.id}
              onClick={() => setLang(item.id)}
              className={`rounded-[14px] px-[18px] py-[10px] text-base font-extrabold text-slate-900 transition ${
                lang === item.id
                  ? "bg-[#bfe0ff] text-slate-900"
                  : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
              }`}
              title={item.label}
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
          onClick={() => navigate("/p6/electric-circuit/bulb-series-parallel/result")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          &laquo; {t.back}
        </button>
        <button
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6")}
          type="button"
          aria-label={t.next}
          title={t.next}
        >
          {t.next} &raquo;
        </button>
      </div>
    </div>
  );
}
