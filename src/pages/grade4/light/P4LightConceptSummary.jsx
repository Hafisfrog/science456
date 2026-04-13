import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LightLanguageSwitcher, LightNavButtons } from "./LightControls";

const SPEECH_LOCALES = {
  th: "th-TH",
  en: "en-US",
  ms: "ms-MY",
};

const UI = {
  th: {
    pageTitle: "สรุปสาระสำคัญ : ตัวกลางของแสง",
    next: "จบบทเรียน",
    listenTitle: "ฟังหัวข้อด้านบน",
    listen: "ฟังสรุป",
    listenSection: "ฟังบล็อกนี้",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
    sections: {
      transparent: {
        title: "ตัวกลางโปร่งใส",
        description: "แสงผ่านได้ดี มองเห็นสิ่งที่อยู่ด้านหลังได้อย่างชัดเจน เพราะวัตถุยอมให้แสงผ่าน",
        tags: ["แก้วใส", "พลาสติกใส", "กระจกใส"],
      },
      translucent: {
        title: "ตัวกลางโปร่งแสง",
        description: "แสงผ่านได้บางส่วน มองเห็นสิ่งที่อยู่ด้านหลังได้ไม่ชัดเจน เพราะวัตถุยอมให้แสงผ่านได้เพียงบางส่วน",
        tags: ["กระจกฝ้า", "กระดาษไข", "หมอก"],
      },
      opaque: {
        title: "วัตถุทึบแสง",
        description: "แสงผ่านไม่ได้เลย มองไม่เห็นสิ่งที่อยู่ด้านหลังเลย เพราะวัตถุไม่ยอมให้แสงผ่านไปได้",
        tags: ["แผ่นไม้", "เหล็ก", "แผ่นปูน"],
      },
    },
  },
  en: {
    pageTitle: "Key Summary: Medium of Light",
    next: "Next",
    listenTitle: "Listen to the title",
    listen: "Listen",
    listenSection: "Listen to this block",
    lang: { th: "Thai", en: "English", ms: "Malay" },
    sections: {
      transparent: {
        title: "Transparent",
        description: "Light passes through very well, so objects behind can be seen clearly.",
        tags: ["Clear Cup", "Clear Plastic", "Clear Glass"],
      },
      translucent: {
        title: "Translucent",
        description: "Only some light passes through, so objects behind appear blurry.",
        tags: ["Frosted Glass", "Wax Paper", "Fog"],
      },
      opaque: {
        title: "Opaque",
        description: "No light passes through, so objects behind cannot be seen.",
        tags: ["Wooden Board", "Steel", "Cement Wall"],
      },
    },
  },
  ms: {
    pageTitle: "Rumusan Penting: Medium Cahaya",
    next: "Seterusnya",
    listenTitle: "Dengar tajuk di atas",
    listen: "Dengar",
    listenSection: "Dengar blok ini",
    lang: { th: "Thai", en: "Inggeris", ms: "Melayu" },
    sections: {
      transparent: {
        title: "Objek Lutsinar",
        description: "Cahaya menembusi dengan baik, jadi objek di belakang dapat dilihat dengan jelas.",
        tags: ["Gelas Jernih", "Plastik Jernih", "Kaca Jernih"],
      },
      translucent: {
        title: "Objek Lut Separa",
        description: "Sebahagian cahaya menembusi, jadi objek di belakang kelihatan kurang jelas.",
        tags: ["Kaca Kabur", "Kertas Surih", "Kabus"],
      },
      opaque: {
        title: "Objek Legap",
        description: "Cahaya tidak menembusi langsung, jadi objek di belakang tidak dapat dilihat.",
        tags: ["Papan Kayu", "Besi", "Dinding Simen"],
      },
    },
  },
};

function pickVoice(voices, language, targetLocale) {
  const localeLower = targetLocale.toLowerCase();
  const prefix = localeLower.split("-")[0];

  if (language === "ms") {
    return (
      voices.find((v) => v.lang?.toLowerCase() === "ms-my") ||
      voices.find((v) => v.lang?.toLowerCase().startsWith("ms")) ||
      voices.find((v) => /malay|melayu/i.test(v.name || "")) ||
      voices.find((v) => v.lang?.toLowerCase() === "id-id") ||
      voices.find((v) => v.lang?.toLowerCase().startsWith("id")) ||
      voices.find((v) => /indonesian|bahasa/i.test(v.name || "")) ||
      voices.find((v) => v.lang?.toLowerCase().startsWith("en")) ||
      voices[0]
    );
  }

  return (
    voices.find((v) => v.lang?.toLowerCase() === localeLower) ||
    voices.find((v) => v.lang?.toLowerCase().startsWith(prefix)) ||
    voices[0]
  );
}

function MaterialTag({ src, label, className = "", imgClassName = "h-12 w-12 object-contain" }) {
  return (
    <div className={`z-20 flex w-[104px] flex-col items-center text-center ${className}`}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-white/80 p-2 shadow-[0_8px_16px_rgba(15,23,42,0.2)] backdrop-blur-sm">
        <img src={src} alt={label} className={imgClassName} />
      </div>
      <div className="mt-1 w-full rounded-xl bg-white/85 px-2 py-1 text-base font-bold leading-tight text-slate-800 shadow sm:text-lg">
        {label}
      </div>
    </div>
  );
}

function SectionBadge({ children }) {
  return (
    <div className="inline-flex rounded-2xl bg-[#ecd8ac] px-4 py-1 text-3xl font-bold text-black shadow-[0_2px_0_rgba(0,0,0,0.14)]">
      {children}
    </div>
  );
}

export default function P4LightConceptSummary() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const ui = UI[language] ?? UI.th;
  const backLabel = language === "en" ? "Back" : language === "ms" ? "Kembali" : "ย้อนกลับ";
  const transparentExamples = [
    { src: "/images/materials/l10.png", label: ui.sections.transparent.tags[0] },
    { src: "/images/materials/l3.png", label: ui.sections.transparent.tags[1] },
    {
      src: "/images/materials/p1.png",
      label: ui.sections.transparent.tags[2],
      imgClassName: "h-11 w-11 object-contain",
    },
  ];
  const translucentExamples = [
    {
      src: "/images/materials/l2.png",
      label: ui.sections.translucent.tags[0],
      imgClassName: "h-11 w-11 object-contain",
    },
    { src: "/images/materials/l4.png", label: ui.sections.translucent.tags[1] },
    {
      src: "/images/materials/l8.png",
      label: ui.sections.translucent.tags[2],
      imgClassName: "h-12 w-12 object-cover",
    },
  ];
  const opaqueExamples = [
    { src: "/images/materials/l5.png", label: ui.sections.opaque.tags[0] },
    { src: "/images/materials/l6.png", label: ui.sections.opaque.tags[1] },
    {
      src: "/images/materials/l7.webp",
      label: ui.sections.opaque.tags[2],
      imgClassName: "h-12 w-12 object-cover",
    },
  ];

  const summarySpeechText = useMemo(() => {
    const transparent = ui.sections.transparent;
    const translucent = ui.sections.translucent;
    const opaque = ui.sections.opaque;

    return `${ui.pageTitle}. ${transparent.title}. ${transparent.description}. ${transparent.tags.join(", ")}. ${translucent.title}. ${translucent.description}. ${translucent.tags.join(", ")}. ${opaque.title}. ${opaque.description}. ${opaque.tags.join(", ")}.`;
  }, [ui]);

  const buildSectionSpeechText = (section) => {
    if (!section) return "";
    return `${section.title}. ${section.description}. ${section.tags.join(", ")}.`;
  };

  const speakContent = (text) => {
    if (
      typeof window === "undefined" ||
      typeof SpeechSynthesisUtterance === "undefined" ||
      !window.speechSynthesis ||
      !text
    ) {
      return;
    }

    const synth = window.speechSynthesis;
    const targetLocale = SPEECH_LOCALES[language] || "th-TH";

    const doSpeak = () => {
      const voices = synth.getVoices();
      const voice = pickVoice(voices, language, targetLocale);

      const utterance = new SpeechSynthesisUtterance(text);
      if (voice) utterance.voice = voice;
      utterance.lang = voice?.lang || targetLocale;
      utterance.rate = language === "ms" ? 0.9 : 0.92;
      utterance.pitch = 1;

      synth.cancel();
      synth.speak(utterance);
    };

    const voices = synth.getVoices();
    if (voices.length) {
      doSpeak();
      return;
    }

    let spoke = false;
    const speakOnce = () => {
      if (spoke) return;
      spoke = true;
      doSpeak();
    };
    const onVoicesChanged = () => {
      synth.removeEventListener("voiceschanged", onVoicesChanged);
      speakOnce();
    };

    synth.addEventListener("voiceschanged", onVoicesChanged);
    setTimeout(() => {
      synth.removeEventListener("voiceschanged", onVoicesChanged);
      speakOnce();
    }, 500);
  };

  const speakSummary = () => {
    speakContent(summarySpeechText);
  };

  const speakSection = (section) => {
    speakContent(buildSectionSpeechText(section));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#dbedf7] via-[#d4ebf8] to-[#cae1f5] font-['Prompt',sans-serif]">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-85"
        style={{ backgroundImage: "url('/images/materials/back.png')" }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_18%_15%,rgba(255,255,255,0.9),transparent_40%),radial-gradient(circle_at_82%_8%,rgba(223,245,255,0.92),transparent_40%)]" />

      <div className="relative z-10 min-h-screen overflow-y-auto px-3 pb-28 pt-3 sm:px-5 sm:pb-32 sm:pt-4">
        <div className="mx-auto flex w-full max-w-[1260px] flex-col gap-3">
          <div className="flex items-center justify-center gap-3">
            <h1 className="m-0 text-center text-3xl font-extrabold text-black drop-shadow-[0_2px_0_rgba(255,255,255,0.55)] sm:text-5xl">
              {ui.pageTitle}
            </h1>
            {/* <button
              type="button"
              onClick={() => speakContent(ui.pageTitle)}
              aria-label={ui.listenTitle}
              title={ui.listenTitle}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sky-300 bg-white/85 text-lg text-sky-700 shadow-[0_8px_18px_rgba(59,130,246,0.18)] transition hover:-translate-y-0.5 hover:bg-sky-100 sm:h-12 sm:w-12"
            >
              🔊
            </button> */}
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute left-[5%] right-[5%] top-[58%] hidden h-16 -translate-y-1/2 rounded-full bg-gradient-to-r from-white/20 via-white/85 to-white/20 blur-[1px] lg:block" />

            <div className="grid gap-4 lg:grid-cols-3">
              <section className="relative flex min-h-[455px] flex-col overflow-hidden rounded-[52px] bg-[#8fd3e8]/58 p-4 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.45)]">
                <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_18%_75%,#6ee7f9_0,transparent_35%),radial-gradient(circle_at_70%_25%,#d9f8ff_0,transparent_40%)]" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3">
                    <SectionBadge>{ui.sections.transparent.title}</SectionBadge>
                    <button
                      type="button"
                      onClick={() => speakSection(ui.sections.transparent)}
                      aria-label={`${ui.listenSection}: ${ui.sections.transparent.title}`}
                      title={`${ui.listenSection}: ${ui.sections.transparent.title}`}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sky-300 bg-white/85 text-lg text-sky-700 shadow-[0_8px_18px_rgba(59,130,246,0.18)] transition hover:-translate-y-0.5 hover:bg-sky-50"
                    >
                      🔊
                    </button>
                  </div>
                  <p className="mt-2 text-lg leading-snug text-slate-900 sm:text-xl">
                    {ui.sections.transparent.description}
                  </p>
                </div>

                <div className="relative z-10 mt-4 flex flex-1 items-end gap-3">
                  <div className="relative min-h-[260px] flex-1">
                    <div
                      className="pointer-events-none absolute bottom-4 left-0 h-[235px] w-[245px] bg-gradient-to-t from-[#63c45d]/60 via-[#a1de72]/45 to-[#95e7ff]/30"
                      style={{ borderRadius: "58% 42% 52% 48% / 46% 50% 50% 54%" }}
                    />
                    <div className="pointer-events-none absolute bottom-[68px] left-0 h-14 w-14 rounded-full border-2 border-amber-300 bg-gradient-to-br from-yellow-100 to-amber-300 shadow-[0_0_18px_rgba(253,224,71,0.8)]" />
                    <div className="pointer-events-none absolute bottom-2 left-[43%] h-[210px] w-[145px] -translate-x-1/2 rounded-full bg-white/25 blur-2xl" />
                    <img
                      src="/images/materials/l10.png"
                      alt={ui.sections.transparent.tags[0]}
                      className="pointer-events-none absolute bottom-0 left-[43%] h-[278px] w-[158px] -translate-x-1/2 object-contain drop-shadow-[0_16px_24px_rgba(148,163,184,0.35)]"
                    />
                  </div>

                  <div className="flex w-[104px] shrink-0 flex-col items-center justify-end gap-2">
                    {transparentExamples.map((item) => (
                      <MaterialTag
                        key={item.label}
                        src={item.src}
                        label={item.label}
                        imgClassName={item.imgClassName}
                      />
                    ))}
                  </div>
                </div>
              </section>

              <section className="relative flex min-h-[455px] flex-col overflow-hidden rounded-[52px] bg-[#d7d9dc]/64 p-4 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.5)]">
                <div className="pointer-events-none absolute inset-0 opacity-45 [background:radial-gradient(circle_at_20%_80%,#cfd8dc_0,transparent_40%),radial-gradient(circle_at_80%_24%,#eff2f7_0,transparent_44%)]" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3">
                    <SectionBadge>{ui.sections.translucent.title}</SectionBadge>
                    <button
                      type="button"
                      onClick={() => speakSection(ui.sections.translucent)}
                      aria-label={`${ui.listenSection}: ${ui.sections.translucent.title}`}
                      title={`${ui.listenSection}: ${ui.sections.translucent.title}`}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white/85 text-lg text-slate-700 shadow-[0_8px_18px_rgba(100,116,139,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-50"
                    >
                      🔊
                    </button>
                  </div>
                  <p className="mt-2 text-lg leading-snug text-slate-900 sm:text-xl">
                    {ui.sections.translucent.description}
                  </p>
                </div>

                <div className="relative z-10 mt-4 flex flex-1 items-end gap-3">
                  <div className="relative min-h-[260px] flex-1">
                    <div
                      className="pointer-events-none absolute bottom-4 left-3 h-[240px] w-[255px] bg-gradient-to-t from-slate-400/45 via-slate-200/55 to-transparent"
                      style={{ borderRadius: "52% 48% 45% 55% / 42% 44% 56% 58%" }}
                    />
                    <div className="pointer-events-none absolute bottom-8 left-[47%] h-[170px] w-[220px] -translate-x-1/2 rounded-[44%] bg-white/25 blur-xl" />
                    <img
                      src="/images/materials/l4.png"
                      alt={ui.sections.translucent.tags[1]}
                      className="pointer-events-none absolute bottom-2 left-[48%] h-[220px] w-[255px] -translate-x-1/2 rotate-[-10deg] object-contain drop-shadow-[0_18px_28px_rgba(100,116,139,0.35)]"
                    />
                  </div>

                  <div className="flex w-[104px] shrink-0 flex-col items-center justify-end gap-2">
                    {translucentExamples.map((item) => (
                      <MaterialTag
                        key={item.label}
                        src={item.src}
                        label={item.label}
                        imgClassName={item.imgClassName}
                      />
                    ))}
                  </div>
                </div>
              </section>

              <section className="relative flex min-h-[455px] flex-col overflow-hidden rounded-[52px] bg-[#b4c1cc]/66 p-4 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.4)]">
                <div className="pointer-events-none absolute inset-0 opacity-55 [background:radial-gradient(circle_at_25%_82%,#3b4754_0,transparent_48%),radial-gradient(circle_at_75%_38%,#94a3b8_0,transparent_40%)]" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3">
                    <SectionBadge>{ui.sections.opaque.title}</SectionBadge>
                    <button
                      type="button"
                      onClick={() => speakSection(ui.sections.opaque)}
                      aria-label={`${ui.listenSection}: ${ui.sections.opaque.title}`}
                      title={`${ui.listenSection}: ${ui.sections.opaque.title}`}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-400 bg-white/85 text-lg text-slate-800 shadow-[0_8px_18px_rgba(71,85,105,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-50"
                    >
                      🔊
                    </button>
                  </div>
                  <p className="mt-2 text-lg leading-snug text-slate-900 sm:text-xl">
                    {ui.sections.opaque.description}
                  </p>
                </div>

                <div className="relative z-10 mt-4 flex flex-1 items-end gap-3">
                  <div className="relative min-h-[260px] flex-1">
                    <div
                      className="pointer-events-none absolute bottom-4 left-0 h-[250px] w-[255px] bg-gradient-to-t from-slate-900/65 to-slate-600/25"
                      style={{ borderRadius: "58% 42% 60% 40% / 48% 50% 50% 52%" }}
                    />
                    <img
                      src="/images/materials/l5.png"
                      alt={ui.sections.opaque.tags[0]}
                      className="pointer-events-none absolute bottom-2 left-[48%] h-[250px] w-[215px] -translate-x-1/2 object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.3)]"
                    />
                  </div>

                  <div className="flex w-[104px] shrink-0 flex-col items-center justify-end gap-2">
                    {opaqueExamples.map((item) => (
                      <MaterialTag
                        key={item.label}
                        src={item.src}
                        label={item.label}
                        imgClassName={item.imgClassName}
                      />
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>

        </div>
      </div>

      <div className="fixed bottom-4 left-4 z-30 flex items-center gap-3 sm:bottom-6 sm:left-6">
        <LightLanguageSwitcher
          value={language}
          onChange={setLanguage}
          labels={UI.th.lang}
        />

        {/* <button
          type="button"
          onClick={speakSummary}
          aria-label={ui.listen}
          title={ui.listen}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sky-300 bg-sky-50 text-lg text-sky-700 shadow-[0_8px_18px_rgba(59,130,246,0.18)] transition hover:-translate-y-0.5 hover:bg-sky-100"
        >
          🔊
        </button> */}
      </div>

      <div className="fixed bottom-4 right-4 z-30 sm:bottom-6 sm:right-6">
        <LightNavButtons
          backLabel={backLabel}
          nextLabel={ui.next}
          onBack={() => navigate("/p4/light/qa")}
          onNext={() => navigate("/p4")}
        />
      </div>
    </div>
  );
}
