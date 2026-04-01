import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const DEVICE_MEDIA = {
  holder: {
    image: "/images/p6/electric-circuit/battery-holder-photo.webp",
    fallbackImage: "/images/p6/electric-circuit/battery-holder.svg",
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
    badge: "วงจรไฟฟ้าใกล้ตัว",
    title: "เรื่อง วงจรไฟฟ้าอย่างง่าย",
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
    next: "สรุปผลการทดลอง",
    langLabel: { th: "ไทย", en: "English", ms: "Melayu" },
  },
  en: {
    badge: "Everyday Circuits",
    title: "Simple Electric Circuit",
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
    next: "Experiment Summary",
    langLabel: { th: "Thai", en: "English", ms: "Malay" },
  },
  ms: {
    badge: "Litar Harian",
    title: "Litar Elektrik Mudah",
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
    next: "Rumusan Eksperimen",
    langLabel: { th: "Thai", en: "Inggeris", ms: "Melayu" },
  },
};
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
  const glow = cells === 1 ? 0.28 : cells === 2 ? 0.5 : cells === 3 ? 0.72 : 0.95;
  return (
    <div className="relative h-[98px] w-[340px]">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 340 98" aria-hidden="true">
        <path d="M96 52 C 126 52, 152 51, 174 50" stroke="#ef4444" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M196 50 C 218 50, 238 50, 258 50" stroke="#2563eb" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>

      <div className="absolute left-[6px] top-[20px] h-[62px] w-[142px]">
        <div className="relative h-full w-full">
          <EquipmentImage
            src={DEVICE_MEDIA.holder.image}
            fallbackSrc={DEVICE_MEDIA.holder.fallbackImage}
            alt="battery holder"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div className="absolute left-[158px] top-[20px] h-[62px] w-[52px]">
        <EquipmentImage
          src={DEVICE_MEDIA.switch.image}
          fallbackSrc={DEVICE_MEDIA.switch.fallbackImage}
          alt="switch"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="absolute left-[252px] top-[10px] h-[72px] w-[72px]">
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
        <div className="inline-flex w-fit items-center rounded-full bg-gradient-to-br from-[#6bc3f0] to-[#4c9ee1] px-[18px] py-2 text-base font-black text-white shadow-[0_12px_22px_rgba(16,24,39,0.14)]">
          {t.badge}
        </div>
        <h1 className="mt-2 text-[clamp(32px,2.5vw,52px)] font-black leading-[1.08] text-slate-900">{t.title}</h1>

        <div className="relative mt-3 rounded-[30px] border-2 border-white/80 bg-gradient-to-br from-[#74cdea] via-[#7fd7f3] to-[#6dc5e8] p-[clamp(14px,1.6vw,20px)] shadow-[0_20px_36px_rgba(17,24,39,0.18)]">
          <div className="rounded-[24px] border border-white/70 bg-[linear-gradient(180deg,rgba(200,238,250,0.85),rgba(176,224,245,0.78))] p-3">
            <div className="rounded-[26px] bg-[#efe8dd] p-[clamp(16px,2vw,26px)] shadow-[0_14px_26px_rgba(0,0,0,0.14)]">
              <div className="text-[clamp(24px,1.8vw,34px)] font-black text-slate-900">{t.section}</div>

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
                              className="grid h-10 w-10 place-items-center rounded-xl border-2 border-slate-900/35 bg-white/85 text-slate-800 shadow-[0_6px_12px_rgba(17,24,39,0.12)] transition hover:-translate-y-0.5"
                              aria-label={t.listen}
                              title={t.listen}
                            >
                              <svg viewBox="0 0 64 64" className="h-6 w-6" aria-hidden="true" focusable="false">
                                <path d="M12 26h12l14-10v32l-14-10H12z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
                                <path d="M44 22c4 4 4 16 0 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
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
      </div>

            <div className="fixed bottom-3 left-3 z-40 inline-flex items-center gap-3 rounded-2xl bg-white p-2 shadow">
        {[
          { id: "th", label: t.langLabel?.th || "ไทย" },
          { id: "en", label: t.langLabel?.en || "English" },
          { id: "ms", label: t.langLabel?.ms || "Melayu" },
        ].map((item) => (
          <button
            key={item.id}
            className={`rounded-xl px-4 py-2 font-bold ${
              lang === item.id ? "bg-sky-500 text-white" : "bg-sky-100"
            }`}
            type="button"
            onClick={() => setLang(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

            <div className="fixed bottom-3 right-3 z-40 flex gap-3">
        <button
          className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-base font-bold text-slate-900 shadow"
          onClick={() => navigate("/p6/electric-circuit/sim")}
          type="button"
          aria-label={t.back}
          title={t.back}
        >
          <span className="text-xl leading-none">←</span>
          <span>{t.back}</span>
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-base font-bold text-white shadow"
          onClick={() => navigate("/p6/electric-circuit/result-summary")}
          type="button"
          aria-label={t.next}
          title={t.next}
        >
          <span>{t.next}</span>
          <span className="text-xl leading-none">→</span>
        </button>
      </div>
    </div>
  );
}



