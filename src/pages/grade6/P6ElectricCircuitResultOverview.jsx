import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const DEVICE_MEDIA = {
  cell: {
    image: "/images/p6/tanfaichai.jpg",
    fallbackImage: "/images/p6/electric-circuit/batteries.svg",
  },
  bulb: {
    image: "/images/p6/electric-circuit/bulb-base-photo.webp",
    fallbackImage: "/images/p6/electric-circuit/bulb-base.svg",
  },
  switch: {
    image: "/images/p6/electric-circuit/switch-photo.webp",
    fallbackImage: "/images/p6/electric-circuit/switch.svg",
  },
};

const TEXT = {
  th: {
    section: "ผลการทดลอง",
    colCircuit: "รูปภาพการต่อวงจรไฟฟ้า",
    colObserve: "ผลการสังเกตความสว่างของหลอดไฟฟ้า",
    rows: [
      "หลอดไฟสว่างเล็กน้อย",
      "หลอดไฟสว่างเพิ่มขึ้น",
      "หลอดไฟสว่างเพิ่มขึ้นอีก",
      "หลอดไฟสว่างมากที่สุด",
    ],
    rowVoice: [
      "ใส่ถ่านหนึ่งก้อน หลอดไฟสว่างเล็กน้อย",
      "ใส่ถ่านสองก้อน หลอดไฟสว่างเพิ่มขึ้น",
      "ใส่ถ่านสามก้อน หลอดไฟสว่างเพิ่มขึ้นอีก",
      "ใส่ถ่านสี่ก้อน หลอดไฟสว่างมากที่สุด",
    ],
    listen: "ฟังคำอธิบายแถวนี้",
    back: "ย้อนกลับ",
    next: "ต่อไป",
    lang: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  },
  en: {
    section: "Experiment Results",
    colCircuit: "Circuit Setup",
    colObserve: "Observed Bulb Brightness",
    rows: ["Bulb glows dim", "Bulb gets brighter", "Bulb brighter again", "Bulb brightest"],
    rowVoice: [
      "With one cell, the bulb glows dim.",
      "With two cells, the bulb gets brighter.",
      "With three cells, the bulb gets brighter again.",
      "With four cells, the bulb is brightest.",
    ],
    listen: "Listen to this row",
    back: "Back",
    next: "Next",
    lang: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    section: "Hasil Eksperimen",
    colCircuit: "Susunan Litar",
    colObserve: "Pemerhatian Kecerahan Mentol",
    rows: ["Mentol menyala malap", "Mentol bertambah terang", "Mentol lebih terang lagi", "Mentol paling terang"],
    rowVoice: [
      "Dengan satu sel, mentol menyala malap.",
      "Dengan dua sel, mentol bertambah terang.",
      "Dengan tiga sel, mentol lebih terang lagi.",
      "Dengan empat sel, mentol paling terang.",
    ],
    listen: "Dengar baris ini",
    back: "Kembali",
    next: "Seterusnya",
    lang: { th: "Thai", en: "English", ms: "Melayu" },
  },
};

const LANGS = [
  { id: "th", label: "ไทย" },
  { id: "ms", label: "มลายู" },
  { id: "en", label: "อังกฤษ" },
 
];
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

function CircuitThumb({ cells }) {
  const glow = cells === 1 ? 0.22 : cells === 2 ? 0.48 : cells === 3 ? 0.74 : 1;
  const slots = Array.from({ length: 4 }, (_, idx) => idx < cells);
  return (
    <div className="relative h-[118px] w-[360px]">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 360 118" aria-hidden="true">
        <path d="M138 53 C 182 44, 220 44, 260 51" stroke="#111827" strokeOpacity="0.25" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M138 53 C 182 44, 220 44, 260 51" stroke="#0b1020" strokeWidth="3.5" fill="none" strokeLinecap="round" />

        <path d="M138 72 C 164 90, 190 98, 203 96" stroke="#111827" strokeOpacity="0.22" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M138 72 C 164 90, 190 98, 203 96" stroke="#ef4444" strokeWidth="3.5" fill="none" strokeLinecap="round" />

        <path d="M224 96 C 252 104, 286 100, 284 69" stroke="#111827" strokeOpacity="0.22" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M224 96 C 252 104, 286 100, 284 69" stroke="#ef4444" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      </svg>

      <div className="absolute left-[16px] top-[26px] h-[74px] w-[124px]">
        <div className="absolute inset-0 rounded-[14px] border-[2px] border-[#2f4561] bg-gradient-to-b from-[#5d7697] to-[#2f4561]" />
        <div className="absolute inset-x-[8px] top-[6px] h-[6px] rounded-full bg-[#23354b]/70" />
        <div className="absolute left-1/2 top-[14px] flex -translate-x-1/2 gap-[3px]">
          {slots.map((filled, idx) => (
            <div
              key={`result-slot-${cells}-${idx}`}
              className={`grid h-[52px] w-[24px] place-items-center rounded-[6px] border ${
                filled ? "border-transparent bg-transparent" : "border-slate-300/80 bg-slate-100/90"
              }`}
            >
              {filled ? (
                <div className="h-[46px] w-[18px] overflow-hidden rounded-[4px] border border-slate-300 bg-white/80">
                  <EquipmentImage
                    src={DEVICE_MEDIA.cell.image}
                    fallbackSrc={DEVICE_MEDIA.cell.fallbackImage}
                    alt={`battery ${idx + 1}`}
                    className="h-full w-full object-cover object-center mix-blend-multiply"
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-[198px] top-[56px] h-[64px] w-[44px]">
        <EquipmentImage
          src={DEVICE_MEDIA.switch.image}
          fallbackSrc={DEVICE_MEDIA.switch.fallbackImage}
          alt="switch"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="absolute left-[252px] top-[18px] h-[72px] w-[72px]">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[86px] w-[86px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(255,214,102,${glow}) 0%, rgba(255,214,102,0) 68%)`,
            filter: "blur(2px)",
          }}
        />
        <EquipmentImage
          src={DEVICE_MEDIA.bulb.image}
          fallbackSrc={DEVICE_MEDIA.bulb.fallbackImage}
          alt="bulb"
          className="relative z-10 h-full w-full object-contain"
        />
      </div>
    </div>
  );
}

function speak(text, lang) {
  if (!("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === "th" ? "th-TH" : lang === "ms" ? "ms-MY" : "en-US";
  const voices = synth.getVoices();
  const picked = voices.find((voice) => voice.lang?.toLowerCase().startsWith(utterance.lang.slice(0, 2).toLowerCase()));
  if (picked) utterance.voice = picked;
  synth.speak(utterance);
}

export default function P6ElectricCircuitResultOverview() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");
  const t = useMemo(() => TEXT[lang] || TEXT.th, [lang]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const pageBg = {
    background:
      "linear-gradient(180deg, #cde9f7 0%, #e9f5ff 32%, #d7ecf7 60%, #c2dbe9 100%), radial-gradient(120% 70% at 50% 20%, rgba(255,255,255,0.65), transparent 45%), radial-gradient(90% 60% at 20% 10%, rgba(255,255,255,0.35), transparent 40%)",
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-8 pt-3 text-slate-900 md:px-8" style={{ ...pageBg, fontFamily: "Prompt, sans-serif" }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-4 right-4 top-[18%] h-[42%] rounded-[48%] bg-white/38 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-[160px] bg-gradient-to-t from-[#9fc5d8] via-[#b1d4e6] to-transparent" />
        <div className="absolute inset-x-0 bottom-[110px] h-4 rounded-full bg-[repeating-linear-gradient(90deg,#7aa3c7_0_40px,#6d94b8_40px_44px)] opacity-50" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(110px,10vw,180px)] top-[10px] h-[clamp(96px,10vw,136px)] w-[clamp(60px,6vw,92px)] bg-[#f7bd2b]"
        style={{
          clipPath: "polygon(42% 0, 100% 0, 66% 44%, 84% 44%, 20% 100%, 42% 57%, 21% 57%)",
        }}
      />

      <div className="relative z-[1] mx-auto w-full max-w-[1380px]">
        <div className="relative mt-3 rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] p-[clamp(14px,1.6vw,20px)] shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <div className="rounded-[26px] bg-[#efe8dd] p-[clamp(16px,2vw,26px)] shadow-[0_14px_26px_rgba(0,0,0,0.14)]">
              <div className="text-[clamp(34px,2.6vw,52px)] font-black text-slate-900">{t.section}</div>

              <div className="mt-4 overflow-x-auto rounded-[10px] border-2 border-slate-900 bg-[#f6f1e8]">
                <table className="w-full min-w-[860px] border-collapse text-slate-900">
                  <thead>
                    <tr className="bg-[#efe6da]">
                      <th className="w-[44%] border border-slate-900 px-4 py-3 text-center text-[clamp(16px,1.2vw,24px)] font-black">
                        {t.colCircuit}
                      </th>
                      <th className="border border-slate-900 px-4 py-3 text-center text-[clamp(16px,1.2vw,24px)] font-black">{t.colObserve}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4].map((cells, idx) => (
                      <tr key={cells}>
                        <td className="border border-slate-900 px-4 py-2">
                          <div className="flex justify-center">
                            <CircuitThumb cells={cells} />
                          </div>
                        </td>
                        <td className="border border-slate-900 px-4 py-2">
                          <div className="flex items-center justify-center gap-3">
                            <div className="text-center text-[clamp(18px,1.35vw,30px)] font-bold">{t.rows[idx]}</div>
                            <button
                              type="button"
                              onClick={() => speak(t.rowVoice[idx], lang)}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-slate-900/35 bg-white/90 text-[20px] leading-none text-slate-800 shadow-[0_6px_12px_rgba(17,24,39,0.12)] transition hover:-translate-y-0.5"
                              aria-label={t.listen}
                              title={t.listen}
                            >
                              <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M11 5L6 9H3v6h3l5 4V5z" />
                                <path d="M15 9.5a4 4 0 010 5" />
                                <path d="M17.8 7a7.5 7.5 0 010 10" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </div>
        </div>
      </div>

     
 <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-7 md:right-7">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/electric-circuit/sim")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          &laquo; {t.back}
        </button>
        <button
          className="rounded-[18px] bg-[#2563eb] px-[18px] py-[14px] text-[20px] font-black text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p6/electric-circuit/result-summary")}
          type="button"
          aria-label={t.next}
          title={t.next}
        >
          {t.next} &raquo;
        </button>
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
    </div>
  );
}




